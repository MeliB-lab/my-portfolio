import { useState } from "react";
import { motion } from "motion/react";
import { Lock, ExternalLink, Clock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

// Reusable wiggle tag — used across all card types
function WiggleTag({ label }: { label: string }) {
  return (
    <motion.span
      whileHover={{ rotate: [0, -4, 4, -2, 2, 0] }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      style={{
        display: "inline-block",
        fontFamily: "var(--font-mono)",
        fontSize: 9,
        letterSpacing: "0.08em",
        color: "var(--muted-foreground)",
        border: "1px solid var(--border)",
        borderRadius: 4,
        padding: "2px 7px",
      }}
    >
      {label}
    </motion.span>
  );
}

function WiggleTagDark({ label }: { label: string }) {
  return (
    <motion.span
      whileHover={{ rotate: [0, -4, 4, -2, 2, 0] }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      style={{
        display: "inline-block",
        fontFamily: "var(--font-mono)",
        fontSize: 9,
        color: "rgba(244,239,230,0.35)",
        border: "1px solid rgba(244,239,230,0.12)",
        borderRadius: 4,
        padding: "2px 7px",
      }}
    >
      {label}
    </motion.span>
  );
}

interface WorkSectionProps {
  id: string;
  onOpenAgent: () => void;
}

// ─── OneGrants — large featured coming-soon card ──────────────────────────────

function OneGrantsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: 10,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Warm muted header — same deep approach as Strategy card, terracotta-forward */}
      <div
        style={{
          background: "#2A1810",
          minHeight: 180,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          padding: "2rem",
        }}
      >
        {/* Warm radial glow — terracotta warmth, muted */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 38% 50%, rgba(184,104,64,0.22) 0%, transparent 62%), radial-gradient(circle at 72% 55%, rgba(212,160,100,0.10) 0%, transparent 50%)",
          }}
        />
        {/* Site URL pill */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            background: "rgba(244,239,230,0.07)",
            border: "1px solid rgba(244,239,230,0.14)",
            borderRadius: 8,
            padding: "10px 20px",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#4A7A52" }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "rgba(244,239,230,0.55)", letterSpacing: "0.06em" }}>
            onegrants.hhs.gov
          </span>
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: "1.5rem 1.75rem 1.75rem", display: "flex", flexDirection: "column", flex: 1 }}>
        {/* Tags row */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: "1rem" }}>
          {["Federal", "Public-Facing", "Data Visualization", "508 Accessible"].map((tag) => (
            <WiggleTag key={tag} label={tag} />
          ))}
          {/* Coming Soon badge */}
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#B86840",
              border: "1px solid rgba(184,104,64,0.35)",
              borderRadius: 4,
              padding: "2px 8px",
            }}
          >
            <Clock size={9} />
            Coming Soon
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.3rem, 2.5vw, 1.65rem)",
            color: "var(--foreground)",
            margin: "0 0 6px",
            lineHeight: 1.2,
          }}
        >
          OneGrants
        </h3>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: "#B86840",
            margin: "0 0 14px",
            letterSpacing: "0.06em",
          }}
        >
          Health &amp; Human Services · Lead UX/UI Designer · 2026
        </p>

        {/* Description */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.9rem",
            lineHeight: 1.75,
            color: "var(--muted-foreground)",
            margin: 0,
            flex: 1,
          }}
        >
          From early concepts to final designs, I led the UX and UI for the OneGrants public
          experience. The project brings funding opportunities, grant data, and agency information
          together into a single experience designed for discovery and transparency.
        </p>

        {/* Live site link */}
        <div style={{ marginTop: "1.25rem", paddingTop: "1.1rem", borderTop: "1px solid var(--border)" }}>
          <a
            href="https://onegrants.hhs.gov/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#B86840",
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.65")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Explore the live site
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ─── NDA card (smaller) ───────────────────────────────────────────────────────

function NdaCard({
  study,
  index,
  onOpenAgent,
}: {
  study: { id: string; title: string; company: string; year: string; role: string; tags: string[]; teaser: string; accentColor: string; casePath?: string };
  index: number;
  onOpenAgent: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--foreground)",
        border: "1px solid var(--border)",
        borderRadius: 10,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Lock area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.75rem",
          minHeight: 120,
          background: hovered ? "rgba(30,26,22,0.80)" : "rgba(30,26,22,0.97)",
          transition: "background 0.35s",
        }}
      >
        <Lock size={22} style={{ color: "rgba(244,239,230,0.25)" }} />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(244,239,230,0.2)", marginTop: 6 }}>
          NDA Protected
        </span>
      </div>

      {/* Info */}
      <div style={{ padding: "1.25rem 1.5rem 1.5rem", background: "rgba(30,26,22,0.97)" }}>
        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: "0.75rem" }}>
          {study.tags.map((tag) => (
            <WiggleTagDark key={tag} label={tag} />
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
          <div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", color: "rgba(244,239,230,0.88)", margin: "0 0 3px" }}>
              {study.title}
            </h3>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: study.accentColor, margin: 0 }}>
              {study.company} · {study.year}
            </p>
          </div>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", color: "rgba(244,239,230,0.28)", border: "1px solid rgba(244,239,230,0.1)", borderRadius: 4, padding: "2px 7px", flexShrink: 0, marginLeft: 8 }}>
            {study.id}
          </span>
        </div>

        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", lineHeight: 1.65, color: "rgba(244,239,230,0.4)", fontStyle: "italic", margin: "0 0 12px" }}>
          "{study.teaser}"
        </p>
        {study.casePath ? (
          <button
            onClick={() => navigate(study.casePath!)}
            style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", background: "none", border: "none", padding: 0, cursor: "none", display: "flex", alignItems: "center", gap: 5, transition: "opacity 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.65")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            View case study <ArrowRight size={11} />
          </button>
        ) : (
          <button
            onClick={onOpenAgent}
            style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", background: "none", border: "none", padding: 0, cursor: "none", transition: "opacity 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.65")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Ask Mel about this ✦
          </button>
        )}
      </div>
    </motion.div>
  );
}

// ─── Strategy / BD card (large, same size as OneGrants) ──────────────────────

function StrategyCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: 0.1, duration: 0.55, ease: "easeOut" }}
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: 10,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Dark header area */}
      <div
        style={{
          background: "#1C1A18",
          minHeight: 180,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          padding: "2rem",
          gap: 12,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 30% 50%, rgba(184,104,64,0.08) 0%, transparent 60%), radial-gradient(circle at 70% 50%, rgba(74,122,82,0.06) 0%, transparent 60%)",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Lock size={20} style={{ color: "rgba(244,239,230,0.25)" }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(244,239,230,0.28)" }}>
            NDA Protected
          </span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "1.5rem 1.75rem 1.75rem", flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: "1rem" }}>
          {["Pre-Sales Design", "Rapid Prototyping", "Strategy Support", "508 Accessible", "Federal"].map((tag) => (
            <WiggleTag key={tag} label={tag} />
          ))}
        </div>

        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.3rem, 2.5vw, 1.65rem)",
            color: "var(--foreground)",
            margin: "0 0 6px",
            lineHeight: 1.2,
          }}
        >
          Strategy &amp; Business Development
        </h3>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: "var(--muted-foreground)",
            margin: "0 0 14px",
            letterSpacing: "0.06em",
          }}
        >
          Multiple Clients · Strategic Designer · Ongoing
        </p>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.9rem",
            lineHeight: 1.75,
            color: "var(--muted-foreground)",
            margin: 0,
            flex: 1,
          }}
        >
          For years, my design work lived in proposals and pitch rooms. I was brought in when a
          strategy team needed design that could{" "}
          <span style={{ color: "var(--foreground)", fontStyle: "italic" }}>win</span> — fast,
          honest, and built for federal standards despite full ambiguity. Problems that started with
          more questions than answers. Short timelines. High stakes. All while keeping designs 508
          accessible and credible enough to move a room. Most of this work is tightly guarded by
          NDAs, but it sharpened me.
        </p>
      </div>
    </motion.div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const ndaStudies = [
  {
    id: "02",
    title: "Unified Experience",
    company: "Confidential",
    year: "2022–2025",
    role: "Lead Product Designer",
    tags: ["Grant Management", "Legacy Modernization", "Govtech", "508 Accessible"],
    teaser:
      "Modernizing a legacy grant management platform by bringing fragmented workflows, communication, and application management into a more unified experience.",
    accentColor: "#4A7A52",
    casePath: "/work/unified-experience",
  },
  {
    id: "03",
    title: "USDA AMS Progress Reports",
    company: "USDA Agricultural Marketing Service",
    year: "2021–2022",
    role: "Product Designer",
    tags: ["Federal", "Reporting", "Data Design", "508 Accessible"],
    teaser:
      "Redesigning how the USDA's Agricultural Marketing Service tracks, formats, and communicates program performance across a network of federal stakeholders.",
    accentColor: "#6B7E6A",
    casePath: "/work/usda-ams",
  },
];

// ─── Section ──────────────────────────────────────────────────────────────────

export function WorkSection({ id, onOpenAgent }: WorkSectionProps) {
  return (
    <section id={id} style={{ background: "var(--secondary)", padding: "6rem 0 7rem" }}>
      <div style={{ padding: "0 4rem" }}>
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--muted-foreground)", margin: "0 0 12px" }}
        >
          02 — Selected Work
        </motion.p>
        <motion.div
          style={{ height: 1, background: "var(--border)", marginBottom: "2rem" }}
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", lineHeight: 1.15, color: "var(--foreground)", margin: "0 0 2.5rem", maxWidth: 540 }}
        >
          Case studies grounded in research, constraints, and product reality.
        </motion.h2>

        {/* ── Grid: large top, two small, large bottom ── */}
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: "1.25rem" }}
        >
          {/* Row 1: OneGrants — full width */}
          <div className="col-span-1 md:col-span-2">
            <OneGrantsCard />
          </div>

          {/* Row 2: Two NDA cards — side by side */}
          {ndaStudies.map((study, i) => (
            <NdaCard key={study.id} study={study} index={i} onOpenAgent={onOpenAgent} />
          ))}

          {/* Row 3: Strategy card — full width */}
          <div className="col-span-1 md:col-span-2">
            <StrategyCard />
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", color: "var(--muted-foreground)", opacity: 0.5, textAlign: "center", marginTop: "2.5rem" }}
        >
          NDA projects available upon request · References provided
        </motion.p>
      </div>
    </section>
  );
}
