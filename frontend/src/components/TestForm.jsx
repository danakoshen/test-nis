import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api/api.js';

const TestForm = () => {
  const { id } = useParams(); // For edit mode
  const navigate = useNavigate();
  const [test, setTest] = useState({
    title: '',
    description: '',
    questions: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTest({ ...test, [name]: value });
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...test.questions];
    updatedQuestions[index][field] = value;
    setTest({ ...test, questions: updatedQuestions });
  };

  const addQuestion = () => {
    setTest({
      ...test,
      questions: [
        ...test.questions,
        {
          type: 'single',
          question: '',
          options: [],
          answer: [],
        },
      ],
    });
  };

  const removeQuestion = (index) => {
    const updatedQuestions = test.questions.filter((_, i) => i !== index);
    setTest({ ...test, questions: updatedQuestions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      // Edit existing test
      await api.updateTest(id, test);
    } else {
      // Create new test
      await api.createTest(test);
    }
    navigate('/');
  };

  // Helper function to shuffle an array
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{id ? 'Edit Test' : 'Создать Тест'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-white-700">Название</label>
          <input
            type="text"
            name="title"
            value={test.title}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white-700">Описание</label>
          <textarea
            name="description"
            value={test.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Вопросы</h2>
          {test.questions.map((question, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold">Вопрос {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeQuestion(index)}
                  className="bg-red-500 text-black px-2 py-1 rounded"
                >
                  Удалить
                </button>
              </div>
              <div className="mb-2">
                <label className="block text-white-700">Текст вопроса</label>
                <input
                  type="text"
                  value={question.question}
                  onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                  className="w-full px-4 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-white-700">Тип вопроса</label>
                <select
                  value={question.type}
                  onChange={(e) => {
                    const updatedQuestions = [...test.questions];
                    updatedQuestions[index].type = e.target.value;
                    if (e.target.value === 'sorting') {
                      updatedQuestions[index].answer = [...updatedQuestions[index].options];
                    } else {
                      updatedQuestions[index].answer = '';
                    }
                    setTest({ ...test, questions: updatedQuestions });
                  }}
                  className="w-full px-4 py-2 border rounded bg-white"
                >
                  <option value="single">Single Choice</option>
                  <option value="multiple">Multiple Choice</option>
                  <option value="drag-and-drop">Drag and Drop</option>
                  <option value="sorting">Sorting</option>
                </select>
              </div>
              {question.type === 'sorting' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-white-700">Варианты для сортировки</label>
                    {question.options.map((option, optIndex) => (
                      <div key={optIndex} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => {
                            const updatedQuestions = [...test.questions];
                            updatedQuestions[index].options[optIndex] = e.target.value;
                            const answerIndex = updatedQuestions[index].answer.indexOf(option);
                            if (answerIndex !== -1) {
                              updatedQuestions[index].answer[answerIndex] = e.target.value;
                            }
                            setTest({ ...test, questions: updatedQuestions });
                          }}
                          className="flex-1 px-2 py-1 border rounded"
                          placeholder={`Вариант ${optIndex + 1}`}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updatedQuestions = [...test.questions];
                            const removedOption = updatedQuestions[index].options[optIndex];
                            updatedQuestions[index].options.splice(optIndex, 1);
                            updatedQuestions[index].answer = updatedQuestions[index].answer.filter(
                              (ans) => ans !== removedOption
                            );
                            setTest({ ...test, questions: updatedQuestions });
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        const updatedQuestions = [...test.questions];
                        updatedQuestions[index].options.push('');
                        updatedQuestions[index].answer.push('');
                        setTest({ ...test, questions: updatedQuestions });
                      }}
                      className="bg-blue-500 text-black px-2 py-1 rounded"
                    >
                      Добавить вариант
                    </button>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-white-700">Правильный порядок</label>
                    {question.answer.map((option, optIndex) => (
                      <div key={optIndex} className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            if (optIndex > 0) {
                              const updatedQuestions = [...test.questions];
                              const answer = updatedQuestions[index].answer;
                              [answer[optIndex], answer[optIndex - 1]] = [answer[optIndex - 1], answer[optIndex]];
                              setTest({ ...test, questions: updatedQuestions });
                            }
                          }}
                          className="bg-gray-500 text-black px-2 py-1 rounded"
                        >
                          ⬆
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (optIndex < question.answer.length - 1) {
                              const updatedQuestions = [...test.questions];
                              const answer = updatedQuestions[index].answer;
                              [answer[optIndex], answer[optIndex + 1]] = [answer[optIndex + 1], answer[optIndex]];
                              setTest({ ...test, questions: updatedQuestions });
                            }
                          }}
                          className="bg-gray-500 text-black px-2 py-1 rounded"
                        >
                          ⬇
                        </button>
                        <span>{option}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {question.type === 'drag-and-drop' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-white-700">Пары ключ-значение</label>
                    {Object.entries(question.options || {}).map(([key, value], optIndex) => (
                      <div key={optIndex} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={key}
                          onChange={(e) => {
                            const updatedQuestions = [...test.questions];
                            const options = { ...updatedQuestions[index].options };
                            delete options[key];
                            options[e.target.value] = value;
                            updatedQuestions[index].options = options;
                            setTest({ ...test, questions: updatedQuestions });
                          }}
                          className="flex-1 px-2 py-1 border rounded"
                          placeholder={`Ключ ${optIndex + 1}`}
                          required
                        />
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => {
                            const updatedQuestions = [...test.questions];
                            updatedQuestions[index].options[key] = e.target.value;
                            setTest({ ...test, questions: updatedQuestions });
                          }}
                          className="flex-1 px-2 py-1 border rounded"
                          placeholder={`Значение ${optIndex + 1}`}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updatedQuestions = [...test.questions];
                            const options = { ...updatedQuestions[index].options };
                            delete options[key];
                            updatedQuestions[index].options = options;
                            setTest({ ...test, questions: updatedQuestions });
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        const updatedQuestions = [...test.questions];
                        updatedQuestions[index].options = {
                          ...updatedQuestions[index].options,
                          ['Новый ключ']: 'Новое значение',
                        };
                        setTest({ ...test, questions: updatedQuestions });
                      }}
                      className="bg-blue-500 text-black px-2 py-1 rounded"
                    >
                      Добавить пару
                    </button>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-white-700">Перетащите значения в соответствующие ключи</label>
                    {Object.entries(question.options || {}).map(([key, value]) => (
                      <div
                        key={key}
                        className="p-2 border rounded"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          const draggedValue = e.dataTransfer.getData('text/plain');
                          const updatedQuestions = [...test.questions];
                          updatedQuestions[index].answer = {
                            ...updatedQuestions[index].answer,
                            [key]: draggedValue,
                          };
                          setTest({ ...test, questions: updatedQuestions });
                        }}
                      >
                        <strong>{key}:</strong>{' '}
                        {question.answer?.[key] || 'Перетащите значение сюда'}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-white-700">Значения для перетаскивания</label>
                    {Object.values(question.options || {}).map((value, optIndex) => (
                      <div
                        key={optIndex}
                        draggable
                        onDragStart={(e) => e.dataTransfer.setData('text/plain', value)}
                        className="p-2 border rounded bg-gray-100 cursor-grab"
                      >
                        {value}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {(question.type === 'single' || question.type === 'multiple') && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-white-700">Варианты ответа (до 4)</label>
                    {question.options.map((option, optIndex) => (
                      <div key={optIndex} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => {
                            const updatedQuestions = [...test.questions];
                            updatedQuestions[index].options[optIndex] = e.target.value;
                            setTest({ ...test, questions: updatedQuestions });
                          }}
                          className="flex-1 px-2 py-1 border rounded"
                          placeholder={`Вариант ${optIndex + 1}`}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updatedQuestions = [...test.questions];
                            updatedQuestions[index].options.splice(optIndex, 1);
                            setTest({ ...test, questions: updatedQuestions });
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        if (question.options.length < 4) {
                          const updatedQuestions = [...test.questions];
                          updatedQuestions[index].options.push('');
                          setTest({ ...test, questions: updatedQuestions });
                        }
                      }}
                      className="bg-blue-500 text-black px-2 py-1 rounded"
                      disabled={question.options.length >= 4}
                    >
                      Добавить вариант
                    </button>
                  </div>

                  {question.type === 'single' && (
                    <div className="space-y-2">
                      <label className="block text-white-700">Правильный ответ</label>
                      <select
                        value={question.answer}
                        onChange={(e) => {
                          const updatedQuestions = [...test.questions];
                          updatedQuestions[index].answer = e.target.value;
                          setTest({ ...test, questions: updatedQuestions });
                        }}
                        className="w-full px-4 py-2 border rounded bg-white"
                        required
                      >
                        <option value="">Выберите правильный ответ</option>
                        {question.options.map((option, optIndex) => (
                          <option key={optIndex} value={option}>
                            {option || `Вариант ${optIndex + 1}`}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {question.type === 'multiple' && (
                    <div className="space-y-2">
                      <label className="block text-white-700">Правильные ответы</label>
                      {question.options.map((option, optIndex) => (
                        <label key={optIndex} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={question.answer?.includes(option)}
                            onChange={(e) => {
                              const updatedQuestions = [...test.questions];
                              let currentAnswers = updatedQuestions[index].answer || [];

                              if (e.target.checked) {
                                currentAnswers = [...currentAnswers, option];
                              } else {
                                currentAnswers = currentAnswers.filter((ans) => ans !== option);
                              }

                              updatedQuestions[index].answer = [...new Set(currentAnswers)];
                              setTest({ ...test, questions: updatedQuestions });
                            }}
                          />
                          <span>{option || `Option ${optIndex + 1}`}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addQuestion}
            className="bg-blue-500 text-black px-4 py-2 rounded"
          >
            Добавить вопрос
          </button>
        </div>
        <button type="submit" className="bg-green-500 text-black px-4 py-2 rounded">
          {id ? 'Обновить тест' : 'Создать тест'}
        </button>
      </form>
    </div>
  );
};

export default TestForm;