import openai from 'openai';

const ai = new openai({
    apiKey: process.env['OPENAI_API_KEY'],
});


export const openaiService = {
    getCompletion: async (prompt: string) => {
        const response = await ai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
        });
        return response.choices[0].message?.content
    }
}