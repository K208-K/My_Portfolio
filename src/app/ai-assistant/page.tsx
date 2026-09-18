"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Bot, Send, Sparkles, Trash2, ArrowRight, CornerDownLeft, Loader2, ShieldCheck } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestedQuestions = [
  "What does Karrim study at Quantum University?",
  "What are Karrim's technical skills in ML & Python?",
  "Tell me about the Heart Attack Prediction project.",
  "Tell me about the OCR CAPTCHA recognition project.",
  "What is Karrim currently learning?",
  "How can I contact Karrim or view his resume?",
];

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I am **KARRIM AI**, a grounded portfolio assistant. I have full verified knowledge of Karrim's academic background at Quantum University, his machine learning & deep learning projects, technical skills, and current learning roadmap.\n\nAsk me any question below or pick a suggested prompt to get started!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (queryText?: string) => {
    const text = (queryText || input).trim();
    if (!text || loading) return;

    setInput("");
    setError(null);

    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-4),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to generate answer.");
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.answer },
      ]);
    } catch (err: any) {
      setError(err.message || "Failed to reach AI service.");
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I encountered a temporary communication issue. Please check that the server is active or try asking again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        role: "assistant",
        content: "Chat cleared. What else would you like to know about Karrim?",
      },
    ]);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 pt-28 pb-16 flex flex-col h-[calc(100vh-5rem)]">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-violet-500/20">
            <Bot size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white">KARRIM AI</h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <ShieldCheck size={11} />
                Grounded Knowledge
              </span>
            </div>
            <p className="text-xs text-neutral-400">
              Ask anything about Karrim&apos;s portfolio, skills, or projects.
            </p>
          </div>
        </div>

        <button
          onClick={handleClear}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white text-xs border border-white/10 transition-colors"
          title="Clear Conversation"
        >
          <Trash2 size={13} />
          <span className="hidden sm:inline">Clear Chat</span>
        </button>
      </div>

      {/* Suggested Prompts Header */}
      <div className="py-3 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
        <span className="text-[11px] font-mono text-neutral-500 shrink-0 flex items-center gap-1">
          <Sparkles size={11} className="text-violet-400" />
          Suggested:
        </span>
        {suggestedQuestions.map((q) => (
          <button
            key={q}
            onClick={() => handleSend(q)}
            disabled={loading}
            className="text-xs text-neutral-300 bg-slate-900 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-full whitespace-nowrap transition-colors disabled:opacity-50"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 rounded-3xl bg-slate-950/70 border border-white/10 backdrop-blur-md space-y-4 my-2">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex gap-3 ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {m.role === "assistant" && (
              <div className="w-8 h-8 rounded-xl bg-violet-600/30 text-violet-300 border border-violet-500/30 flex items-center justify-center shrink-0 mt-0.5">
                <Bot size={16} />
              </div>
            )}
            <div
              className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed whitespace-pre-line ${
                m.role === "user"
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-900/30"
                  : "bg-slate-900 border border-white/10 text-neutral-200"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2.5 text-neutral-400 text-xs py-2">
            <Loader2 size={16} className="animate-spin text-violet-400" />
            <span>Consulting verified portfolio knowledge base...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {error && <div className="text-xs text-rose-400 py-1 shrink-0">{error}</div>}

      {/* Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="pt-2 flex items-center gap-2 shrink-0"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a technical or background question about Karrim..."
          disabled={loading}
          className="flex-1 bg-slate-900 border border-white/15 rounded-2xl px-5 py-3.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-violet-500 transition-colors disabled:opacity-50 shadow-inner"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-600 hover:opacity-90 text-white font-semibold text-sm transition-all disabled:opacity-40 flex items-center gap-2 shadow-lg shadow-violet-600/25 shrink-0"
        >
          <span>Send</span>
          <Send size={15} />
        </button>
      </form>
    </div>
  );
}
