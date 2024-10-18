"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { use, useEffect, useState } from 'react'

interface Question {
    question: string
}
interface Answer {
    answer: string
}

const ClientSide = () => {
    const [question, setQuestion] = useState<Question>();
    const [answer, setAnswer] = useState<Answer>()
    const addQuestionDynamic = async () => {
        
        try {
         
          const response = await fetch("/api/testing", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ question }),
          });
    
          if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
          }
          const generatedAnswer: Answer = await response.json();
          console.log(generatedAnswer);
          setAnswer(generatedAnswer);
        } catch (error) {
          console.error("Error generating questions:", error);
        }
        
      };

      const herokuAPI = async () => {
        
        try {
         
          const response = await fetch("https://hackathon-api-0e5cfd5ce4b0.herokuapp.com/", {
            method: "GET",
            // headers: {
            //   "Content-Type": "application/json",
            // },
            // body: JSON.stringify({ question }),
          });
    
          if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
          }
          const generatedAnswer: any = await response.json();
          console.log(generatedAnswer);
       
        } catch (error) {
          console.error("Error generating questions:", error);
        }
        
      };
     
  return (
    <>
    
    <Input 
        type="text" 
        placeholder="Enter your question " 
        onChange={(e) => setQuestion({ question: e.target.value })} 
    />
    <div className="flex gap-4 mt-4"> {/* Added flex container with gap */}
        <Button onClick={addQuestionDynamic}>Add Question</Button>
        <Button onClick={herokuAPI}>Hit api</Button>
    </div>

    {answer && (
        <div className="mt-4 p-4 text-black border rounded-md bg-gray-100 transition-opacity duration-300 ease-in-out"> 
            {answer.answer}
        </div>
    )}
    </>
  )
}

export default ClientSide
