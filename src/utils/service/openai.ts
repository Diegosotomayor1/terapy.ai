import openai from 'openai';
import { environment } from '../../environments/environment.development';

const ai = new openai({
    apiKey: environment.openAiApiKey,
    dangerouslyAllowBrowser: true
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