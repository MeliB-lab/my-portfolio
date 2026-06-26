import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface HeroSectionProps {
  id: string;
  onOpenAgent: () => void;
}

// ─── Yarn Ball Paths ──────────────────────────────────────────────────────────
// 7 hand-crafted organic paths that cross and layer like real wound yarn.
// ViewBox: -90 -90 180 180

const YARN_PATHS: { d: string; opacity: number; sw: number }[] = [
  {
    // Large outer irregular loop — slightly tilted
    d: "M -62 5 C -60 -68 20 -72 62 -40 C 88 -12 85 45 52 70 C 25 90 -40 85 -65 55 C -84 30 -64 24 -62 5",
    opacity: 0.42,
    sw: 1.8,
  },
  {
    // Medium loop rotated ~25°
    d: "M -48 -22 C -28 -62 28 -58 58 -28 C 78 -4 72 36 42 58 C 18 74 -30 68 -50 40 C -66 16 -64 2 -48 -22",
    opacity: 0.58,
    sw: 1.6,
  },
  {
    // Cross thread — NW to SE diagonal
    d: "M -60 -38 C -25 -78 32 -72 68 -36 C 90 -4 86 44 55 72",
    opacity: 0.65,
    sw: 1.5,
  },
  {
    // Cross thread — NE to SW diagonal (opposite)
    d: "M 58 -44 C 80 -16 76 34 46 65 C 22 86 -26 80 -56 52 C -78 26 -74 -12 -55 -40",
    opacity: 0.65,
    sw: 1.5,
  },
  {
    // Inner tighter oval — slightly off-center
    d: "M -30 3 C -28 -36 6 -40 34 -22 C 54 -8 52 24 30 40 C 10 52 -18 46 -32 26 C -42 12 -32 10 -30 3",
    opacity: 0.74,
    sw: 1.7,
  },
  {
    // Medium loop rotated ~58° — creates 3D depth
    d: "M -58 18 C -54 -54 10 -64 60 -36 C 84 -10 78 42 46 68 C 18 86 -32 78 -58 50 C -78 28 -62 38 -58 18",
    opacity: 0.46,
    sw: 1.6,
  },
  {
    // Small inner center wrap — the tight core knot
    d: "M -14 -5 C -12 -22 5 -24 18 -13 C 28 -4 26 10 14 20 C 5 26 -9 22 -16 10 C -20 2 -16 -2 -14 -5",
    opacity: 0.88,
    sw: 2.0,
  },
];

// ─── Text animation helpers ───────────────────────────────────────────────────

function UnfoldLetters({ text, startDelay }: { text: string; startDelay: number }) {
  return (
    <span className="inline-flex">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, filter: "blur(7px)", scale: 0.86, y: 5 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1, y: 0 }}
          transition={{
            delay: startDelay + i * 0.042,
            duration: 0.70,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

function UnfoldBlock({
  delay,
  children,
  style,
  className,
}: {
  delay: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(5px)", y: 10 }}
      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      transition={{ delay, duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Chat Reveal Card ─────────────────────────────────────────────────────────

function ChatRevealCard({ onOpen }: { onOpen: () => void }) {
  const starters = [
    "What's your process like?",
    "Tell me about an NDA project",
    "What tools do you use?",
  ];

  return (
    <div
      style={{
        background: "rgba(184,104,64,0.05)",
        border: "1px solid rgba(184,104,64,0.22)",
        borderRadius: 14,
        padding: "24px 26px",
        width: 290,
        boxShadow: "0 0 40px rgba(184,104,64,0.10), 0 4px 20px rgba(42,24,16,0.06)",
      }}
    >
      <p
        className="mb-1 tracking-[0.18em] uppercase"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 9,
          color: "#B86840",
        }}
      >
        ✦ Mel's assistant
      </p>
      <p
        className="mb-5"
        style={{
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontSize: 16,
          color: "var(--foreground)",
          lineHeight: 1.5,
        }}
      >
        "Ask me anything about Melissa's work."
      </p>
      <div className="flex flex-col gap-2">
        {starters.map((s) => (
          <button
            key={s}
            onClick={onOpen}
            className="text-left text-xs px-3 py-2 rounded-lg transition-all hover:opacity-80"
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--muted-foreground)",
              background: "rgba(184,104,64,0.06)",
              border: "1px solid rgba(184,104,64,0.14)",
              fontSize: 11,
            }}
          >
            {s} →
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

export function HeroSection({ id, onOpenAgent }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  // Track scroll progress WITHIN the hero section only
  const { scrollYProgress: heroP } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Each yarn path disappears in staggered sequence as you scroll
  const pLen0 = useTransform(heroP, [0.00, 0.40], [1, 0]);
  const pLen1 = useTransform(heroP, [0.04, 0.44], [1, 0]);
  const pLen2 = useTransform(heroP, [0.07, 0.47], [1, 0]);
  const pLen3 = useTransform(heroP, [0.10, 0.50], [1, 0]);
  const pLen4 = useTransform(heroP, [0.03, 0.43], [1, 0]);
  const pLen5 = useTransform(heroP, [0.08, 0.48], [1, 0]);
  const pLen6 = useTransform(heroP, [0.13, 0.53], [1, 0]);
  const pLens = [pLen0, pLen1, pLen2, pLen3, pLen4, pLen5, pLen6];

  // Ball as a whole fades and shrinks
  const ballOpacity = useTransform(heroP, [0.18, 0.52], [1, 0]);
  const ballScale  = useTransform(heroP, [0.00, 0.52], [1, 0.18]);

  // Chat card reveals from the center of the ball
  const chatOpacity = useTransform(heroP, [0.32, 0.50], [0, 1]);
  const chatScale   = useTransform(heroP, [0.32, 0.50], [0.82, 1]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative min-h-screen overflow-visible"
      style={{ background: "var(--background)" }}
    >
      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Top bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.6 }}
        className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 md:px-16 pt-8 z-10"
      >
        <span
          className="text-xs tracking-[0.24em] uppercase"
          style={{ fontFamily: "var(--font-mono)", color: "var(--muted-foreground)" }}
        >
          Portfolio · 2025
        </span>
        <div className="flex items-center gap-2">
          <motion.span
            animate={{ opacity: [1, 0.25, 1] }}
            transition={{ duration: 2.8, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#4A7A52" }}
          />
          <span
            className="text-xs tracking-[0.12em]"
            style={{ fontFamily: "var(--font-mono)", color: "#4A7A52" }}
          >
            Open to work
          </span>
        </div>
      </motion.div>

      {/* Two-column grid */}
      <div
        className="grid min-h-screen px-8 md:px-16 pt-28 pb-20 z-10 relative"
        style={{ gridTemplateColumns: "55% 45%", alignItems: "center" }}
      >
        {/* ── LEFT: Text ── */}
        <div className="flex flex-col justify-center pr-0 md:pr-10">
          {/* Hi — */}
          <UnfoldBlock delay={0.45} style={{ marginBottom: 10 }}>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "clamp(1rem, 2.2vw, 1.25rem)",
                color: "var(--muted-foreground)",
              }}
            >
              Hi —
            </span>
          </UnfoldBlock>

          {/* Name — letter-by-letter unfold */}
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.8rem, 7.2vw, 7rem)",
              lineHeight: 1.0,
              letterSpacing: "-0.025em",
              color: "var(--foreground)",
              marginBottom: "clamp(1.2rem, 3vw, 2.4rem)",
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0 0.26em", alignItems: "baseline" }}>
              <UnfoldLetters text="I'm" startDelay={0.65} />
              <UnfoldLetters text="Melissa" startDelay={0.82} />
              <UnfoldLetters text="Bisyir." startDelay={1.18} />
            </div>
          </div>

          {/* Divider */}
          <motion.div
            style={{ height: 1, background: "var(--border)", marginBottom: 26 }}
            initial={{ width: 0 }}
            animate={{ width: "76%" }}
            transition={{ delay: 1.88, duration: 0.75, ease: "easeOut" }}
          />

          {/* Title */}
          <UnfoldBlock delay={2.05} style={{ marginBottom: 22 }}>
            <p
              className="tracking-[0.2em] uppercase"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "clamp(0.6rem, 1.3vw, 0.76rem)",
                color: "var(--muted-foreground)",
                lineHeight: 1.9,
              }}
            >
              Senior Product Designer · Problem solver
              <br />
              Mom of two · Tejana at heart
            </p>
          </UnfoldBlock>

          {/* Tagline */}
          <UnfoldBlock delay={2.42} style={{ marginBottom: 38 }}>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(0.95rem, 1.9vw, 1.12rem)",
                color: "var(--foreground)",
                lineHeight: 1.75,
                fontStyle: "italic",
                maxWidth: 430,
                opacity: 0.78,
              }}
            >
              "I turn chaos into clarity —
              <br />
              and I do it in both English and sarcasm."
            </p>
          </UnfoldBlock>

          {/* CTA */}
          <UnfoldBlock delay={2.88}>
            <button
              onClick={() =>
                document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })
              }
              className="group flex items-center gap-3 transition-all"
              style={{
                border: "1px solid var(--border)",
                background: "transparent",
                color: "var(--muted-foreground)",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                padding: "10px 22px",
                borderRadius: 6,
                width: "fit-content",
                transition: "border-color 0.2s, color 0.2s, background 0.2s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "var(--accent)";
                el.style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "var(--border)";
                el.style.color = "var(--muted-foreground)";
              }}
            >
              See the work
              <motion.span
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                style={{ display: "inline-block" }}
              >
                ↓
              </motion.span>
            </button>
          </UnfoldBlock>
        </div>

        {/* ── RIGHT: Yarn ball + chat reveal ── */}
        <div className="hidden md:flex flex-col items-center justify-center relative" style={{ height: "100%" }}>
          {/* Container for both ball and chat — overlapping */}
          <div className="relative flex items-center justify-center" style={{ width: 300, height: 300 }}>

            {/* Yarn ball — scroll unravels each path */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 3.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={{ opacity: ballOpacity, scale: ballScale }}
              className="absolute flex items-center justify-center"
            >
              {/* Idle breathing animation */}
              <motion.svg
                viewBox="-90 -90 180 180"
                width="240"
                height="240"
                animate={{ scale: [1, 1.032, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 4 }}
              >
                {YARN_PATHS.map((p, i) => (
                  <motion.path
                    key={i}
                    d={p.d}
                    stroke="#B86840"
                    strokeWidth={p.sw}
                    fill="none"
                    opacity={p.opacity}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ pathLength: pLens[i] }}
                  />
                ))}
                {/* Center knot */}
                <circle cx="0" cy="0" r="4.5" fill="#B86840" opacity="0.9" />
              </motion.svg>
            </motion.div>

            {/* Chat reveal card — emerges as ball unravels */}
            <motion.div
              className="absolute flex items-center justify-center"
              style={{
                opacity: chatOpacity,
                scale: chatScale,
                pointerEvents: "auto",
              }}
            >
              <ChatRevealCard onOpen={onOpenAgent} />
            </motion.div>
          </div>

          {/* Label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.6, duration: 0.7 }}
            className="mt-6 tracking-[0.2em] uppercase text-center"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              color: "var(--muted-foreground)",
              opacity: 0.45,
            }}
          >
            Scroll to unravel ↓
          </motion.p>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.3, duration: 0.7 }}
        className="absolute bottom-8 left-8 md:left-16 flex items-center gap-3 z-10"
      >
        <motion.div
          animate={{ height: [14, 24, 14] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: 1,
            background:
              "linear-gradient(to bottom, transparent, var(--muted-foreground), transparent)",
            opacity: 0.4,
          }}
        />
        <span
          className="text-xs tracking-[0.2em] uppercase"
          style={{ fontFamily: "var(--font-mono)", color: "var(--muted-foreground)", opacity: 0.45 }}
        >
          Scroll
        </span>
      </motion.div>

      {/* Side label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="absolute bottom-8 right-8 md:right-16 hidden md:block"
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
      >
        <span
          className="text-xs tracking-[0.2em] uppercase"
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--muted-foreground)",
            opacity: 0.35,
          }}
        >
          Mexican–Salvadoran · Los Angeles
        </span>
      </motion.div>
    </section>
  );
}
