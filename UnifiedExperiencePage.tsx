import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Send } from "lucide-react";
import Lottie from "lottie-react";

// Free sparkle / AI animation from LottieFiles public library
const LOTTIE_URL = "https://lottie.host/4db68bbd-31f6-4cd8-84eb-189de081159a/krHpIfQKBJ.json";

function LottieIcon() {
  const [data, setData] = useState<object | null>(null);
  useEffect(() => {
    fetch(LOTTIE_URL)
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData(null));
  }, []);

  if (!data) {
    return (
      <span style={{ fontSize: 18, color: "var(--accent-foreground)" }}>✦</span>
    );
  }
  return <Lottie animationData={data} loop style={{ width: 32, height: 32 }} />;
}

interface Message {
  role: "user" | "mel";
  text: string;
}

const STARTERS = [
  "What tools do you use?",
  "What's your process like?",
  "Tell me about an NDA project",
  "What's it like working with you?",
];

const RESPONSES: Record<string, string> = {
  "What tools do you use?":
    "Figma is home base — I live in it. Beyond that: FigJam for workshops, Notion for docs and specs, Maze or UserTesting for research, Loom for async walkthroughs, and occasionally a whiteboard when the wifi decides to test me.",
  "What's your process like?":
    "Research first, always. I don't wireframe until I understand the *why* behind the problem. Then I move fast — rough concepts, quick feedback loops, iterate. I believe the best design decisions live in the space between data and gut feeling.",
  "Tell me about an NDA project":
    "There are a couple I can't fully show, but here's what I can say: one involved redesigning how 50k+ enterprise users navigate a complex data platform. The other introduced AI-assisted workflows into a legacy product. Both changed how their teams think about design. Reach out to Melissa directly — she's better in conversation.",
  "What's it like working with you?":
    "Collaborative, direct, and I ask a lot of questions — sometimes more than people expect. I believe in making the invisible visible: assumptions, constraints, tradeoffs. I also genuinely care about the people using the things I build. That's not a line. It's how I was wired before design.",
};

const FALLBACK =
  "Great question — I'd say reach out to Melissa directly and she'll give you the real answer. She's better in conversation than I am in text, though I do my best. ✦";

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("tool") || lower.includes("figma")) return RESPONSES["What tools do you use?"];
  if (lower.includes("process") || lower.includes("workflow") || lower.includes("approach")) return RESPONSES["What's your process like?"];
  if (lower.includes("nda") || lower.includes("confidential") || lower.includes("hidden")) return RESPONSES["Tell me about an NDA project"];
  if (lower.includes("work") && (lower.includes("like") || lower.includes("with") || lower.includes("team"))) return RESPONSES["What's it like working with you?"];
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) return "Hi! I'm Mel's assistant. Ask me anything — or pick one of the starters below.";
  for (const [key, val] of Object.entries(RESPONSES)) {
    if (lower.includes(key.toLowerCase().slice(0, 10))) return val;
  }
  return FALLBACK;
}

export function AIAgentSection({ id }: { id: string }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "mel",
      text: "Hi — I'm Mel's assistant. I know her work, process, and personality pretty well. Ask me anything. ✦",
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
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((m) => [...m, { role: "mel", text: getResponse(text) }]);
    }, 850 + Math.random() * 550);
  };

  return (
    <section
      id={id}
      style={{ background: "var(--secondary)", padding: "6rem 0" }}
    >
      <div style={{ padding: "0 clamp(1.5rem, 5vw, 4rem)", maxWidth: 1200, margin: "0 auto" }}>

        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "var(--muted-foreground)",
            marginBottom: 12,
          }}
        >
          ✦ AI Portfolio Agent
        </motion.p>

        {/* Rule */}
        <motion.div
          style={{ height: 1, background: "var(--border)", marginBottom: 40 }}
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />

        {/* Two-column: heading + chat — stacks on mobile */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2"
          style={{ gap: "3rem", alignItems: "start" }}
        >
          {/* Left: copy */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
                lineHeight: 1.1,
                color: "var(--foreground)",
                marginBottom: 20,
              }}
            >
              Ask me anything.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.2 }}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                lineHeight: 1.75,
                color: "var(--muted-foreground)",
                maxWidth: 380,
                marginBottom: 32,
              }}
            >
              I know Melissa's work, process, tools, and what it's like to collaborate with her. Skip the formalities and ask me something real.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.3 }}
              style={{ display: "flex", flexDirection: "column", gap: 10 }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--muted-foreground)",
                  marginBottom: 8,
                }}
              >
                Try asking
              </p>
              {STARTERS.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  style={{
                    textAlign: "left",
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    color: "var(--muted-foreground)",
                    background: "transparent",
                    border: "1px solid var(--border)",
                    borderRadius: 6,
                    padding: "8px 14px",
                    transition: "border-color 0.2s, color 0.2s",
                    cursor: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--accent)";
                    e.currentTarget.style.color = "var(--accent)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.color = "var(--muted-foreground)";
                  }}
                >
                  {s} →
                </button>
              ))}
            </motion.div>
          </div>

          {/* Right: chat card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: "var(--background)",
              border: "1px solid var(--border)",
              borderRadius: 16,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              height: 480,
              boxShadow: "0 8px 32px rgba(42,24,16,0.07)",
            }}
          >
            {/* Chat header */}
            <div
              style={{
                padding: "16px 20px",
                borderBottom: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: "var(--card)",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "var(--accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  overflow: "hidden",
                }}
              >
                <LottieIcon />
              </div>
              <div>
                <p style={{ fontFamily: "var(--font-display)", fontSize: 14, color: "var(--foreground)", margin: 0 }}>
                  Mel's Assistant
                </p>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted-foreground)", margin: 0, letterSpacing: "0.08em" }}>
                  Knows the work · Speaks the truth
                </p>
              </div>
            </div>

            {/* Messages */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}
                >
                  <div
                    style={{
                      maxWidth: "85%",
                      padding: "10px 14px",
                      fontSize: 13,
                      lineHeight: 1.6,
                      fontFamily: "var(--font-body)",
                      background: msg.role === "user" ? "var(--foreground)" : "var(--card)",
                      color: msg.role === "user" ? "var(--primary-foreground)" : "var(--foreground)",
                      borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
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
                  style={{ display: "flex", justifyContent: "flex-start" }}
                >
                  <div
                    style={{
                      padding: "10px 16px",
                      background: "var(--card)",
                      borderRadius: "16px 16px 16px 4px",
                      display: "flex",
                      gap: 4,
                      alignItems: "center",
                    }}
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--muted-foreground)" }}
                        animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div
              style={{
                padding: "12px 16px",
                borderTop: "1px solid var(--border)",
                display: "flex",
                gap: 8,
                alignItems: "center",
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage(input)}
                placeholder="Ask me anything…"
                style={{
                  flex: 1,
                  fontSize: 13,
                  padding: "9px 13px",
                  borderRadius: 10,
                  border: "1px solid var(--border)",
                  background: "var(--secondary)",
                  color: "var(--foreground)",
                  fontFamily: "var(--font-body)",
                  outline: "none",
                }}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: input.trim() ? "var(--foreground)" : "var(--muted)",
                  color: "var(--primary-foreground)",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "background 0.2s",
                  cursor: "none",
                }}
              >
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
