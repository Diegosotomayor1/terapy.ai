import openai from 'openai'
import { messageType } from '../../app/layout-chat/layout-chat.component'

const ai = new openai({
  apiKey: process.env['OPEN_AI_API_KEY'],
  dangerouslyAllowBrowser: true,
})

export const openaiService = {
  getCompletion: async (prompt: string) => {
    const response = await ai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
    })
    return response.choices[0].message?.content
  },
}

export const getAssistantList = async (threadUser?: openai.Beta.Threads.Thread) => {
  const thread = threadUser || (await ai.beta.threads.create())

  const run = await ai.beta.threads.runs.createAndPoll(thread.id, {
    assistant_id: 'asst_f2P5EPuWY2HnVEcYj9zv8KwD',
  })

  if (run.status === 'completed') {
    const messages = await ai.beta.threads.messages.list(run.thread_id, {
      order: 'desc',
    })
    return {
      thread,
      messages: messages.data.map((m): messageType => {
        const content = m.content[0]
        if ('text' in content) {
          return {
            message: (content as { text: { value: string } }).text.value,
            date: new Date(m.created_at),
            type: m.role,
          }
        } else {
          // Handle the case where content is not of type TextContentBlock
          return {
            message: '',
            date: new Date(m.created_at),
            type: m.role,
          }
        }
      }),
    }
  } else {
    console.log(run.status)
    return
  }
}

export const sendMessageToAssitant = async (
  message: string,
  threadUser?: openai.Beta.Threads.Thread,
) => {
  const thread = threadUser || (await ai.beta.threads.create())
  const messageSended = await ai.beta.threads.messages.create(thread.id, {
    role: 'user',
    content: message,
  })
  return {
    thread,
    messageSended,
  }
}
