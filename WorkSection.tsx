import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "mel";
  text: string;
}

const starters = [
  "What tools do you use?",
  "What's your process like?",
  "Tell me about an NDA project",
  "What's it like working with you?",
];

const responses: Record<string, string> = {
  "What tools do you use?":
    "Figma is home base — I live in it. Beyond that: FigJam for workshops, Notion for docs and specs, Maze or UserTesting for research, Loom for async walkthroughs, and occasionally a whiteboard when the wifi decides to test me.",
  "What's your process like?":
    "Research first, always. I don't wireframe until I understand the *why* behind the problem. Then I move fast — rough concepts, quick feedback loops, iterate. I believe the best design decisions live in the space between data and gut feeling.",
  "Tell me about an NDA project":
    "There are a couple I can't fully show, but here's what I can say: one involved redesigning how 50k+ enterprise users navigate a complex data platform. The other introduced AI-assisted workflows into a legacy product. Both changed how their teams think about design. Want to talk through the details? Reach out to Melissa directly — she's better in conversation than I am.",
  "What's it like working with you?":
    "Collaborative, direct, and I ask a lot of questions — sometimes more than people expect. I believe in making the invisible visible: assumptions, constraints, tradeoffs. I also genuinely care about the people using the things I build. That's not a line. It's how I was wired before design.",
};

const fallback =
  "That's a great question — I'd say reach out to Melissa directly and she'll give you the real answer. She's better in conversation than I am in text, though I do my best. ✦";

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const [key, val] of Object.entries(responses)) {
    if (lower.includes(key.toLowerCase().slice(0, 12))) return val;
  }
  if (lower.includes("tool") || lower.includes("figma") || lower.includes("software")) return responses["What tools do you use?"];
  if (lower.includes("process") || lower.includes("workflow") || lower.includes("approach")) return responses["What's your process like?"];
  if (lower.includes("nda") || lower.includes("confidential") || lower.includes("hidden") || lower.includes("locked")) return responses["Tell me about an NDA project"];
  if (lower.includes("working") || lower.includes("collaborate") || lower.includes("team") || lower.includes("vibe")) return responses["What's it like working with you?"];
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) return "Hi! I'm Mel's assistant. I know her work pretty well. Ask me anything — or pick one of the starters below.";
  return fallback;
}

function OrigamiIcon({ animate: shouldAnimate }: { animate: boolean }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Origami crane silhouette - geometric folded paper bird */}
      <motion.g
        animate={shouldAnimate ? { rotate: [0, -4, 4, -2, 0] } : {}}
        transition={{ duration: 4, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
        style={{ originX: "50%", originY: "50%" }}
      >
        {/* Wings */}
        <motion.path
          d="M24 22 L4 12 L24 20 Z"
          fill="currentColor"
          opacity="0.9"
          animate={shouldAnimate ? { d: ["M24 22 L4 12 L24 20 Z", "M24 22 L4 9 L24 20 Z", "M24 22 L4 12 L24 20 Z"] } : {}}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
        />
        <motion.path
          d="M24 22 L44 12 L24 20 Z"
          fill="currentColor"
          opacity="0.85"
          animate={shouldAnimate ? { d: ["M24 22 L44 12 L24 20 Z", "M24 22 L44 9 L24 20 Z", "M24 22 L44 12 L24 20 Z"] } : {}}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
        />
        {/* Body */}
        <path d="M24 20 L16 30 L24 38 L32 30 Z" fill="currentColor" />
        {/* Tail */}
        <path d="M16 30 L6 40 L24 38" fill="currentColor" opacity="0.6" />
        {/* Head / beak area */}
        <path d="M24 20 L30 10 L34 8 L30 14 L24 20" fill="currentColor" opacity="0.8" />
      </motion.g>
    </svg>
  );
}

interface AIAgentProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  showFloatingButton?: boolean;
}

export function AIAgent({ isOpen, onOpen, onClose, showFloatingButton = true }: AIAgentProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "mel",
      text: "Hi, I'm Mel's assistant. I know her work pretty well — ask me anything, or pick a starter below. ✦",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const reply = getResponse(text);
      setIsTyping(false);
      setMessages((m) => [...m, { role: "mel", text: reply }]);
    }, 900 + Math.random() * 600);
  };

  return (
    <>
      {/* Floating button — hidden on hero, visible after scrolling */}
      <AnimatePresence>
        {!isOpen && showFloatingButton && (
          <motion.button
            key="agent-btn"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ delay: 3.0, type: "spring", damping: 18, stiffness: 260 }}
            onClick={onOpen}
            className="fixed bottom-24 right-6 md:bottom-20 md:right-8 z-50 flex flex-col items-center gap-1.5 group"
            style={{ width: 56 }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 group-hover:shadow-lg"
              style={{
                background: "var(--foreground)",
                color: "var(--primary-foreground)",
                boxShadow: "0 4px 20px rgba(30,26,22,0.2)",
                transform: "rotate(-6deg)",
              }}
            >
              <div className="w-7 h-7">
                <OrigamiIcon animate={true} />
              </div>
            </div>
            <motion.span
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.6 }}
              className="text-xs tracking-[0.1em] whitespace-nowrap"
              style={{ fontFamily: "var(--font-mono)", color: "var(--muted-foreground)" }}
            >
              Ask Mel
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="agent-panel"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", damping: 22, stiffness: 300 }}
            className="fixed bottom-24 right-4 md:bottom-20 md:right-8 z-50 flex flex-col rounded-2xl overflow-hidden"
            style={{
              width: "min(380px, calc(100vw - 32px))",
              height: "min(520px, calc(100vh - 120px))",
              background: "var(--background)",
              border: "1px solid var(--border)",
              boxShadow: "0 16px 48px rgba(30,26,22,0.16)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{
                background: "var(--foreground)",
                color: "var(--primary-foreground)",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7" style={{ color: "var(--primary-foreground)" }}>
                  <OrigamiIcon animate={false} />
                </div>
                <div>
                  <p className="text-sm" style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}>
                    Mel's Assistant
                  </p>
                  <p
                    className="text-xs opacity-50"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    Knows the work. Speaks the truth.
                  </p>
                </div>
              </div>
              <button onClick={onClose} className="opacity-50 hover:opacity-100 transition-opacity">
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className="max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
                    style={{
                      background: msg.role === "user" ? "var(--foreground)" : "var(--card)",
                      color: msg.role === "user" ? "var(--primary-foreground)" : "var(--foreground)",
                      borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                    }}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div
                    className="px-4 py-3 rounded-2xl flex gap-1.5 items-center"
                    style={{ background: "var(--card)", borderRadius: "18px 18px 18px 4px" }}
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: "var(--muted-foreground)" }}
                        animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Starter chips */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {starters.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="text-xs px-3 py-1.5 rounded-full transition-all hover:opacity-80"
                    style={{
                      background: "var(--secondary)",
                      border: "1px solid var(--border)",
                      color: "var(--muted-foreground)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div
              className="px-4 py-3 flex gap-2 items-end"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage(input)}
                placeholder="Ask me anything…"
                className="flex-1 text-sm py-2 px-3 rounded-xl outline-none resize-none"
                style={{
                  background: "var(--secondary)",
                  border: "1px solid var(--border)",
                  color: "var(--foreground)",
                  fontFamily: "var(--font-body)",
                }}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
                className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all disabled:opacity-30"
                style={{ background: "var(--foreground)", color: "var(--primary-foreground)" }}
              >
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
