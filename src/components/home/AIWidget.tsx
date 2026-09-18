"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Bot, Send, Sparkles, ArrowRight, CornerDownLeft, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestedQuestions = [
  "What does Karrim study?",
  "What are Karrim's skills?",
  "Tell me about Karrim's ML projects.",
  "What is Karrim currently learning?",
  "How can I contact Karrim?",
];

export default function AIWidget() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Karrim's AI portfolio assistant, grounded in verified data. Ask me anything about his studies, machine learning projects, skills, or learning roadmap!",
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

    const userMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
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
      setError(err.message || "Failed to reach AI assistant. Please try again.");
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm sorry, I encountered a problem communicating with the service. Please try asking again, or explore the navigation tabs above.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-md shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/10 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-violet-500/20">
              <Bot size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-white">Ask About Karrim</h2>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  Grounded AI
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Trained &amp; verified on portfolio data &bull; No hallucinations
              </p>
            </div>
          </div>

          <Link
            href="/ai-assistant"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors self-start md:self-auto group"
          >
            <span>Open Full Screen AI Assistant</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Suggested Quick Questions */}
        <div className="py-4 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[11px] font-mono text-neutral-500 shrink-0 flex items-center gap-1">
            <Sparkles size={11} className="text-violet-400" />
            Suggestions:
          </span>
          {suggestedQuestions.map((q) => (
            <button
              key={q}
              onClick={() => handleSend(q)}
              disabled={loading}
              className="text-xs text-neutral-300 bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-full whitespace-nowrap transition-colors disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Messages Box */}
        <div className="h-72 overflow-y-auto p-4 rounded-2xl bg-slate-950/60 border border-white/5 space-y-4 my-2">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {m.role === "assistant" && (
                <div className="w-7 h-7 rounded-lg bg-violet-600/30 text-violet-300 border border-violet-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot size={14} />
                </div>
              )}
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                  m.role === "user"
                    ? "bg-violet-600 text-white shadow-md shadow-violet-900/30"
                    : "bg-slate-900 border border-white/10 text-neutral-200"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-neutral-400 text-xs py-2">
              <Loader2 size={14} className="animate-spin text-violet-400" />
              <span>Checking verified portfolio knowledge...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Error message */}
        {error && (
          <div className="text-xs text-rose-400 py-1 px-2">{error}</div>
        )}

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="mt-3 flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Karrim's skills, projects, studies..."
            disabled={loading}
            className="flex-1 bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-violet-500 transition-colors disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-4 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm transition-all disabled:opacity-40 flex items-center gap-1.5 shadow-lg shadow-violet-600/20"
            aria-label="Send message"
          >
            <span>Ask</span>
            <Send size={14} />
          </button>
        </form>
      </div>
    </section>
  );
}
