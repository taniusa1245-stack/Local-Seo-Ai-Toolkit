
import React, { useState } from 'react';
import Card from '../ui/Card';
import { ReviewIcon } from '../ui/icons';
import { mockGmbQuestions, mockBusinessProfile } from '../../utils/mockData';
import { generateQnaAnswer } from '../../services/geminiService';
import type { GmbQuestion } from '../../types';
import Spinner from '../ui/Spinner';

const QuestionItem: React.FC<{ question: GmbQuestion, onGenerateAnswer: (id: string) => void }> = ({ question, onGenerateAnswer }) => (
    <div className="py-4 border-b last:border-b-0">
      <div className="flex items-start">
        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 font-bold">
            {question.author.charAt(0)}
        </div>
        <div className="ml-4 flex-1">
          <div className="flex justify-between items-center">
            <h5 className="font-semibold text-gray-800">{question.author}</h5>
            <span className="text-xs text-gray-500">{question.timestamp}</span>
          </div>
          <p className="text-sm font-semibold text-gray-700 mt-1">Q: {question.question}</p>
          
          {question.answer ? (
            <div className="mt-3 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm font-semibold text-gray-800">A: Your Answer</p>
              <p className="text-sm text-gray-600 italic">{question.answer}</p>
            </div>
          ) : (
            <button 
              onClick={() => onGenerateAnswer(question.id)}
              disabled={question.isGeneratingAnswer}
              className="mt-3 text-sm bg-brand-blue text-white py-1.5 px-3 rounded-lg hover:bg-brand-blue-dark transition-colors flex items-center justify-center disabled:bg-gray-400"
            >
              {question.isGeneratingAnswer ? <Spinner className="w-4 h-4" /> : "Generate Answer"}
            </button>
          )}
        </div>
      </div>
    </div>
  );

const QandA: React.FC = () => {
    const [questions, setQuestions] = useState<GmbQuestion[]>(mockGmbQuestions);

    const handleGenerateAnswer = async (questionId: string) => {
        setQuestions(prev => prev.map(q => q.id === questionId ? { ...q, isGeneratingAnswer: true } : q));
        const questionToAnswer = questions.find(q => q.id === questionId);
        if (questionToAnswer) {
          const answerText = await generateQnaAnswer(mockBusinessProfile.name, questionToAnswer.question);
          setQuestions(prev => prev.map(q => q.id === questionId ? { ...q, answer: answerText, isGeneratingAnswer: false } : q));
        }
    };

    return (
        <Card title="GMB Q&A Automation" icon={ReviewIcon}>
            {questions.map(q => (
                <QuestionItem key={q.id} question={q} onGenerateAnswer={handleGenerateAnswer} />
            ))}
        </Card>
    );
}

export default QandA;
