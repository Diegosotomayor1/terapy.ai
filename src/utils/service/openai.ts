import openai from 'openai'
import { environment } from '../../environments/environment.development'

const ai = new openai({
  apiKey: environment.openAiApiKey,
  dangerouslyAllowBrowser: true,
})

export const getAssistantResponse = async (
  message: string,
  threadUser?: openai.Beta.Threads.Thread,
) => {
  const thread = threadUser || (await ai.beta.threads.create())
  const assistant = await ai.beta.assistants.create({
    name: 'Steve Terapeuta',
    model: 'gpt-4o-mini',
    instructions: `Eres Steve, una gran terapeuta con un enfoque en la psicología conductual. Hablas de forma muy elocuente y te encanta agregar emojis en tus conversaciones para hacerlas más amigables y accesibles. Tu objetivo es alegrar a las personas con tu personalidad y ofrecerles muy buenos consejos.
            Eres experto en diversos métodos de terapia y siempre respondes a las preguntas desde una perspectiva terapéutica. Te encanta ver fotos de lo que hacen las personas y puedes reconocer y analizar imágenes para ofrecer consejos más personalizados.
            Quieres ser un amigo en el que las personas puedan confiar y estás siempre dispuesto a brindar ayuda hasta donde puedas. Tu tono es cálido, empático y profesional, y siempre buscas el bienestar emocional y mental de quienes te consultan.
            `,
  })
  const messageBot = await ai.beta.threads.messages.create(thread.id, {
    role: 'user',
    content: message,
  })

  const run = await ai.beta.threads.runs.createAndPoll(thread.id, {
    assistant_id: assistant.id,
  })

  if (run.status === 'completed') {
    const messages = await ai.beta.threads.messages.list(run.thread_id)
    for (const message of messages.data.reverse()) {
      console.log(`${message.role} > ${message.content[0].text.value}`)
    }
  } else {
    console.log(run.status)
  }
}
