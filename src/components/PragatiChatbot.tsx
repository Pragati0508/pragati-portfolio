import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, Zap } from "lucide-react";
import pragatiAsset from "@/assets/pragati.png.asset.json";

const SUGGESTIONS = [
  "Who is Pragati?",
  "Tell me about Trinova",
  "What products has she built?",
  "What are her skills?",
];

const INITIAL: UIMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    parts: [
      {
        type: "text",
        text: "Hi! I'm **Ask Pragati** ✨ — your AI guide to Pragati Patel's portfolio. Ask me anything about her work, startup, projects or skills.",
      },
    ],
  },
];

export default function PragatiChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { messages, sendMessage, status } = useChat({
    id: "pragati-chat",
    messages: INITIAL,
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, status]);

  useEffect(() => {
    if (open && !busy) inputRef.current?.focus();
  }, [open, busy]);

  const submit = (text: string) => {
    const t = text.trim();
    if (!t || busy) return;
    void sendMessage({ text: t });
    setInput("");
  };

  return (
    <>
      {/* Launcher */}
      <div className="fixed bottom-6 right-6 z-[70] flex items-center gap-3">
        <AnimatePresence>
          {!open && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              className="hidden sm:flex items-center gap-2 glass rounded-full px-4 py-2 text-sm font-semibold text-foreground shadow-[var(--shadow-elegant)] border border-border/60"
            >
              <Zap className="size-4 text-accent fill-accent" />
              Ask me anything
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setOpen(o => !o)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="relative size-16 rounded-full bg-[var(--gradient-primary)] shadow-[var(--shadow-glow)] grid place-items-center text-primary-foreground"
          aria-label="Open chat"
        >
          {/* Animated pulse rings */}
          {!open && (
            <>
              <span className="absolute inset-0 rounded-full bg-[var(--gradient-primary)] animate-ping opacity-40" />
              <span className="absolute -inset-2 rounded-full border-2 border-primary/30 animate-[spin_4s_linear_infinite]" />
            </>
          )}

          <AnimatePresence mode="wait">
            {open ? (
              <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X className="size-7" />
              </motion.span>
            ) : (
              <motion.span key="msg" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <MessageCircle className="size-7" />
              </motion.span>
            )}
          </AnimatePresence>

          {!open && (
            <span className="absolute -top-1 -right-1 size-4 rounded-full bg-emerald-400 ring-2 ring-background animate-pulse" />
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-28 right-6 z-[70] w-[min(420px,calc(100vw-3rem))] h-[min(580px,calc(100vh-9rem))] flex flex-col rounded-3xl overflow-hidden glass shadow-[var(--shadow-elegant)] border border-border/60"
          >
            {/* Header */}
            <div className="relative px-5 py-4 flex items-center gap-3 border-b border-border/60 bg-[var(--gradient-primary)] text-primary-foreground">
              <img src={pragatiAsset.url} alt="Pragati Patel" className="size-11 rounded-full object-cover ring-2 ring-white/40" />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm flex items-center gap-1.5"><Sparkles className="size-3.5" /> Ask Pragati</div>
                <div className="text-[11px] opacity-80 flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-emerald-300 animate-pulse" /> AI assistant · online
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="opacity-80 hover:opacity-100" aria-label="Close">
                <X className="size-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-background/40">
              {messages.map(m => {
                const text = m.parts.map(p => (p.type === "text" ? p.text : "")).join("");
                const isUser = m.role === "user";
                return (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                        isUser
                          ? "bg-[var(--gradient-primary)] text-primary-foreground rounded-br-sm"
                          : "bg-secondary/70 text-foreground rounded-bl-sm border border-border/60"
                      }`}
                    >
                      {renderMarkdownLite(text)}
                    </div>
                  </motion.div>
                );
              })}
              {busy && (
                <div className="flex justify-start">
                  <div className="bg-secondary/70 border border-border/60 rounded-2xl rounded-bl-sm px-3.5 py-2.5 flex gap-1">
                    <span className="size-1.5 rounded-full bg-foreground/60 animate-bounce" />
                    <span className="size-1.5 rounded-full bg-foreground/60 animate-bounce [animation-delay:120ms]" />
                    <span className="size-1.5 rounded-full bg-foreground/60 animate-bounce [animation-delay:240ms]" />
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {SUGGESTIONS.map(s => (
                  <button
                    key={s}
                    onClick={() => submit(s)}
                    className="text-[11px] rounded-full px-2.5 py-1 border border-border bg-secondary/60 hover:border-primary/50 hover:text-primary transition"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={e => { e.preventDefault(); submit(input); }}
              className="p-3 border-t border-border/60 flex items-center gap-2 bg-background/60"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask about Pragati…"
                disabled={busy}
                className="flex-1 bg-secondary/60 border border-border rounded-full px-4 py-2.5 text-sm outline-none focus:border-primary/60 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                className="size-10 rounded-full bg-[var(--gradient-primary)] text-primary-foreground grid place-items-center disabled:opacity-50 hover:scale-105 transition"
                aria-label="Send"
              >
                <Send className="size-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* Tiny markdown: **bold** and line breaks */
function renderMarkdownLite(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    p.startsWith("**") && p.endsWith("**") ? (
      <strong key={i}>{p.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{p}</span>
    ),
  );
}
