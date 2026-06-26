import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { ShoppingBag, Building2, PenTool } from "lucide-react";

interface AboutSectionProps {
  id: string;
}

const personalityCards = [
  {
    quote: "Retail taught me user experience before I knew it had a name.",
    sub: "Managing 40+ people teaches you empathy faster than any workshop.",
  },
  {
    quote: "I survived Saturday retail rushes.",
    sub: "That's where I learned to solve problems while people were still standing in front of me.",
  },
  {
    quote: "I have 2 kids, 2 dogs, a husband, and 0 patience for vague briefs.",
    sub: "Clarity is a love language in my household and my design process.",
  },
  {
    quote: "I'm Mexican-Salvadoran.",
    sub: "Growing up between cultures taught me to listen, adapt, and understand different perspectives long before I became a designer.",
  },
];

const originCards = [
  {
    num: "01",
    era: "The Beginning",
    years: "9 years",
    role: "Retail Manager",
    color: "#C4A882",
    icon: ShoppingBag,
    desc: "Managed 40+ staff across a high-volume retail floor — returns, rushes, and constant decision-making. I learned to design for humans by managing them.",
  },
  {
    num: "02",
    era: "The Pivot",
    years: "4 years",
    role: "Office Manager",
    color: "#B8A89A",
    icon: Building2,
    desc: "Calendars, onboarding, billing, office operations, and everything in between. I created structure in the background so people could focus on their work in the foreground.",
  },
  {
    num: "03",
    era: "Now",
    years: "4+ years",
    role: "Senior Product Designer",
    color: "#B86840",
    icon: PenTool,
    desc: "Understanding people isn't something I learned in a workshop. It's been my default long before Figma.",
  },
];

const hobbies = [
  "👶 Raising 2 tiny humans",
  "📺 Bad reality TV — no shame",
  "🎵 Cleans house with 80s–90s music",
  "🥾 Shenandoah hikes",
  "🫶 Quality time with family",
  "🏃‍♀️ 5K runs with family",
  "⛺ Camping getaways",
  "📚 Collects more books than I have time to read",
  "🖌️ Shadow Painting",
];

const allHobbies = [...hobbies, ...hobbies];

export function AboutSection({ id }: AboutSectionProps) {
  const [cardIndex, setCardIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-driven card: enters from below as section scrolls in, drifts down as section scrolls out
  // Bidirectional — reversible on scroll up
  const { scrollYProgress: sectionP } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end start"],
  });
  // 60px entry from above → lands at 0 → drifts 40px downward as section exits
  const cardY = useTransform(sectionP, [0, 0.18, 0.75, 1], [-60, 0, 0, 40]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCardIndex((i) => (i + 1) % personalityCards.length);
    }, 4400);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative"
      style={{ background: "var(--background)", paddingTop: "6rem", paddingBottom: "0" }}
    >
      {/* Section label */}
      <div style={{ padding: "0 clamp(1.5rem, 5vw, 4rem) 3rem" }}>
        <motion.p
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--muted-foreground)", margin: "0 0 12px" }}
        >
          01 — Origin Story
        </motion.p>
        <motion.div
          style={{ height: 1, background: "var(--border)" }}
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>

      {/* Two-column layout — stacks on mobile */}
      <div
        className="grid grid-cols-1 lg:grid-cols-[2fr_3fr]"
        style={{ gap: "3.5rem", padding: "0 clamp(1.5rem, 5vw, 4rem) 5rem", alignItems: "start" }}
      >
        {/* ── LEFT: Rotating personality cards ── */}
        <div>
          {/* Desktop: sticky + scroll-driven parallax. Mobile: normal flow. */}
          <div className="lg:sticky lg:top-28">
          <motion.div style={{ y: cardY }}>
            {/* Card */}
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: 10,
                padding: "2rem 2rem 1.75rem",
                minHeight: 240,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                background: "var(--card)",
                border: "1px solid var(--border)",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={cardIndex}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.42, ease: "easeInOut" }}
                  style={{ display: "flex", flexDirection: "column", gap: "1rem", flex: 1 }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontStyle: "italic",
                      fontSize: "1.2rem",
                      lineHeight: 1.42,
                      color: "var(--foreground)",
                      margin: 0,
                    }}
                  >
                    "{personalityCards[cardIndex].quote}"
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.88rem",
                      lineHeight: 1.7,
                      color: "var(--muted-foreground)",
                      margin: 0,
                    }}
                  >
                    {personalityCards[cardIndex].sub}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Dot indicators */}
              <div style={{ display: "flex", gap: 6, marginTop: "1.25rem" }}>
                {personalityCards.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCardIndex(i)}
                    style={{
                      height: 6,
                      width: i === cardIndex ? 20 : 6,
                      borderRadius: 3,
                      background: i === cardIndex ? "var(--accent)" : "var(--muted)",
                      border: "none",
                      padding: 0,
                      transition: "width 0.3s, background 0.3s",
                    }}
                  />
                ))}
              </div>

              {/* Decorative quote mark */}
              <div
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1.25rem",
                  fontFamily: "var(--font-display)",
                  fontSize: "4rem",
                  lineHeight: 1,
                  color: "var(--muted)",
                  opacity: 0.35,
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              >
                "
              </div>
            </div>

            <p
              style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em", color: "var(--muted-foreground)", margin: "0.75rem 0 0", opacity: 0.6 }}
            >
              — Melissa Bisyir
            </p>
          </motion.div>
          </div>
        </div>

        {/* ── RIGHT: Origin story timeline ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ fontFamily: "var(--font-body)", fontSize: "1rem", lineHeight: 1.75, color: "var(--muted-foreground)", margin: "0 0 0.5rem" }}
          >
            Product Designer creating accessible, human-centered experiences for government products.
          </motion.p>

          {originCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.num}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderLeft: `3px solid ${card.color}`,
                  borderRadius: "0 8px 8px 0",
                  padding: "1.4rem 1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem",
                }}
              >
                {/* Header row */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    {/* Icon circle */}
                    <div
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: "50%",
                        background: `${card.color}18`,
                        border: `1px solid ${card.color}30`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={16} style={{ color: card.color }} strokeWidth={1.6} />
                    </div>
                    <div>
                      <span
                        style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: card.color, display: "block", marginBottom: 2 }}
                      >
                        {card.num} — {card.era}
                      </span>
                      <h3
                        style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", color: "var(--foreground)", margin: 0 }}
                      >
                        {card.role}
                      </h3>
                    </div>
                  </div>
                  <span
                    style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em", color: "var(--muted-foreground)", flexShrink: 0, paddingTop: 2 }}
                  >
                    {card.years}
                  </span>
                </div>

                <p
                  style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", lineHeight: 1.7, color: "var(--muted-foreground)", margin: 0 }}
                >
                  {card.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Hobbies ticker ── */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          paddingTop: "1.1rem",
          paddingBottom: "1.1rem",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          background: "var(--secondary)",
        }}
      >
        <div
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            animation: "ticker 32s linear infinite",
            width: "max-content",
          }}
        >
          {allHobbies.map((hobby, i) => (
            <span
              key={i}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "1rem",
                padding: "0 1.5rem",
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                color: "var(--muted-foreground)",
              }}
            >
              {hobby}
              <span style={{ color: "var(--accent)", fontSize: "0.65rem" }}>✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
