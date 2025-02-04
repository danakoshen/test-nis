import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const TestResultsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const results = location.state?.results || {
    correct: 1,
    percentage: 50,
    details: [
      {
        isCorrect: true,
        question: "Вопрос 1",
        userAnswer: "ответ",
        correctAnswer: "правильный ответ"
      },
      {
        isCorrect: false,
        question: "Вопрос 2",
        userAnswer: { "Франция": "Париж", "Казахстан": "Астана", "Япония": "Токио" },
        correctAnswer: { "Франция": "Париж", "Казахстан": "Астана", "Япония": "Токио" }
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Test Results</h1>
          <div className="mb-6">
            <p className="text-lg">
              Правильных ответов: {results.correctAnswers}
            </p>
            <p className="text-lg">
              Процент выполнения: {results.percentage}%
            </p>
          </div>

          <div className="space-y-4">
            {results.details.map((detail, index) => (
              <div
                key={index}
                className={`p-4 border rounded ${detail.isCorrect ? 'bg-grey-100 border-green-500' : 'bg-grey-100 border-red-500'}`}
              >
                <h3 className="font-bold mb-2">{detail.question}</h3>
                <p>Ваш ответ: {typeof detail.userAnswer === 'object' ? JSON.stringify(detail.userAnswer) : detail.userAnswer}</p>
                {!detail.isCorrect && (
                  <p>Правильный ответ: {typeof detail.correctAnswer === 'object' ? JSON.stringify(detail.correctAnswer) : detail.correctAnswer}</p>
                )}
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => navigate('/')}
              className="bg-blue-500 hover:bg-blue-600 text-black font-bold py-2 px-4 rounded"
            >
              Вернуться на главную страницу
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestResultsPage;
