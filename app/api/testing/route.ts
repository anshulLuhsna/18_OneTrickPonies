// src/app/api/quiz/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { question } = await request.json();
console.log(question.question)

  try {
    const options = {
      method: 'POST',
      url: 'https://api.worqhat.com/api/ai/content/v4',
      headers: {
        'User-Agent': 'Apidog/1.0.0 (https://apidog.com)',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sk-80ff24131aac402a8259ea750678ed47',
      },
      body: JSON.stringify({
        question: `question: ${question.question}. Respond with only field in the json: answer.
        `,
        preserve_history: true,
        "model": "aicon-v4-large-160824",
       
        randomness: 0.1,
        stream_data: false,
        
        response_type: 'json',
      }),
    };

    const response = await fetch(options.url, {
      method: options.method,
      headers: options.headers,
      body: options.body,
    });

     
      const reader = response.body?.getReader();
      
      const decoder = new TextDecoder('utf-8');
      let result = '';

      while (true) {
        if (reader) {
            const { done, value } = await reader.read();
            if (done) break;
            result += decoder.decode(value);
          }
       
      }

      const jsonResult = JSON.parse(result);
    const generatedText = jsonResult.content.trim();

    console.log(JSON.parse(generatedText).correct_answers);
    // const questions = generatedText.split('\n').map((question: string) => question.trim());

      return NextResponse.json(JSON.parse(generatedText));
    
  } catch (error) {
    console.error('Error generating quiz questions:', error);
    return NextResponse.json(
      { error: 'An error occurred while generating quiz questions.' },
      { status: 500 }
    );
  }
}
