"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// ✅ Define types
type Question = {
  question: string;
  options: string[];
  answer: string;
};

type Quiz = {
  title: string;
  questions: Question[];
};

export default function QuizViewPage() {
  const params = useParams();
  const link = params?.link as string;

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [feedback, setFeedback] = useState<{ [key: number]: "correct" | "wrong" | null }>({});

  useEffect(() => {
    if (!link) return;

    const fetchQuiz = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/public/${link}`);
        const data: Quiz = await res.json();
        setQuiz(data);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };

    fetchQuiz();
  }, [link]);

  const handleAnswer = (qIndex: number, selected: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [qIndex]: selected }));

    const isCorrect = quiz?.questions[qIndex].answer === selected;
    setFeedback((prev) => ({ ...prev, [qIndex]: isCorrect ? "correct" : "wrong" }));
  };

  if (!quiz) return <p className="p-4">Loading quiz...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">{quiz.title}</h1>

      {quiz.questions.map((q, idx) => (
        <div key={idx} className="mb-8 p-4 border rounded shadow">
          <p className="font-semibold mb-2">
            {idx + 1}. {q.question}
          </p>
          <div className="grid grid-cols-2 gap-2">
            {q.options.map((opt, i) => {
              const isSelected = selectedAnswers[idx] === opt;
              const result = feedback[idx];

              const baseStyle = "px-4 py-2 rounded text-left border";

              let btnStyle = baseStyle;
              if (isSelected) {
                if (result === "correct") btnStyle += " bg-green-500 text-white border-none";
                else if (result === "wrong") btnStyle += " bg-red-500 text-white border-none";
              } else {
                btnStyle += " bg-gray-100 hover:bg-blue-100";
              }

              return (
                <button
                  key={i}
                  className={btnStyle}
                  onClick={() => handleAnswer(idx, opt)}
                  disabled={!!feedback[idx]} // disable after one selection
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Feedback Message */}
          {feedback[idx] && (
            <p className={`mt-2 font-medium ${feedback[idx] === "correct" ? "text-green-600" : "text-red-600"}`}>
              {feedback[idx] === "correct" ? "✅ Correct!" : `❌ Wrong! Correct answer: ${q.answer}`}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
