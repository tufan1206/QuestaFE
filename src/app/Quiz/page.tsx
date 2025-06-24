"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], answer: "" },
  ]);
  const [link, setLink] = useState("");

  // Authentication check
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("name");

    if (!token) {
      router.push("/");
    }

    if (userName) {
      setName(userName);
    }
  }, [router]);

  // Logout
  const handleLogout = () => {
    localStorage.clear();
    router.push("/Login");
  };

  // Handle input changes
  const handleQuestionChange = (index: number, field: "question" | "answer", value: string) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex: number, oIndex: number, value: string) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], answer: "" },
    ]);
  };

  // Submit quiz
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:4000/api/products/createQuiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token || "",
        },
        body: JSON.stringify({ title, questions }),
      });

      const data = await res.json();

      if (res.ok) {
        setLink(`http://localhost:3000/Quiz/${data.publicLink}`);
      } else {
        alert(data.message || "Failed to create quiz");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Logout Bar */}
      <div className="absolute top-4 right-4 flex items-center gap-4">
        <span className="text-gray-700 font-medium">Welcome, {name}</span>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-4">Create Quiz</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Quiz Title */}
        <input
          type="text"
          placeholder="Enter Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />

        {/* Questions */}
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="border p-4 rounded space-y-2">
            <input
              type="text"
              placeholder={`Question ${qIndex + 1}`}
              value={q.question}
              onChange={(e) =>
                handleQuestionChange(qIndex, "question", e.target.value)
              }
              required
              className="w-full p-2 border rounded"
            />

            {q.options.map((opt, oIndex) => (
              <input
                key={oIndex}
                type="text"
                placeholder={`Option ${oIndex + 1}`}
                value={opt}
                onChange={(e) =>
                  handleOptionChange(qIndex, oIndex, e.target.value)
                }
                required
                className="w-full p-2 border rounded"
              />
            ))}

            <input
              type="text"
              placeholder="Correct Answer"
              value={q.answer}
              onChange={(e) =>
                handleQuestionChange(qIndex, "answer", e.target.value)
              }
              required
              className="w-full p-2 border rounded"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addQuestion}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          ➕ Add Another Question
        </button>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          ✅ Submit Quiz
        </button>
      </form>

      {link && (
        <div className="mt-6">
          <p className="text-green-700 font-semibold">Quiz Public Link:</p>
          <a href={link} target="_blank" className="text-blue-600 underline">
            {link}
          </a>
        </div>
      )}
    </div>
  );
};

export default Page;
