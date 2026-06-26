import { useEffect, useState } from "react";
import { motion } from "motion/react";

interface AdaptiveNavProps {
  activeSection: string;
}

const navItems = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

function playClickTick() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.045);
    osc.type = "sine";
    gain.gain.setValueAtTime(0.055, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.09);
  } catch {}
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Nav button with subtle hover lift + accent color shift
function NavButton({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{ y: hovered && !isActive ? -2 : 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="relative px-4 py-1.5 text-xs tracking-[0.12em] uppercase rounded-full"
      style={{
        fontFamily: "var(--font-mono)",
        color: isActive
          ? "var(--primary-foreground)"
          : hovered
          ? "var(--accent)"
          : "var(--muted-foreground)",
        background: isActive ? "var(--primary)" : "transparent",
        border: "none",
        transition: "color 0.2s, background 0.2s",
      }}
    >
      {label}
    </motion.button>
  );
}

export function AdaptiveNav({ activeSection }: AdaptiveNavProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    playClickTick();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  if (isMobile) {
    return (
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4"
        style={{
          background: scrolled ? "rgba(244,239,230,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(42,24,16,0.08)" : "none",
          transition: "background 0.3s",
        }}
      >
        {/* MB → scrolls to top */}
        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.05 }}
          style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted-foreground)", background: "none", border: "none", padding: 0, transition: "color 0.2s" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted-foreground)")}
        >
          MB
        </motion.button>
        <div className="flex gap-6">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              whileHover={{ y: -1 }}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: activeSection === item.id ? "var(--accent)" : "var(--muted-foreground)",
                background: "none",
                border: "none",
                padding: 0,
                transition: "color 0.2s",
              }}
            >
              {item.label}
            </motion.button>
          ))}
        </div>
      </motion.nav>
    );
  }

  return (
    <motion.nav
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.5, duration: 0.5, ease: "easeOut" }}
      className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2"
    >
      <div
        className="flex items-center gap-1 px-5 py-3 rounded-full"
        style={{
          background: "rgba(244,239,230,0.88)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(42,24,16,0.1)",
          boxShadow: "0 4px 24px rgba(42,24,16,0.08)",
        }}
      >
        {/* MB monogram — clicks to scroll top */}
        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.08 }}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--muted-foreground)",
            background: "none",
            border: "none",
            paddingRight: 16,
            marginRight: 8,
            borderRight: "1px solid rgba(42,24,16,0.15)",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted-foreground)")}
        >
          MB
        </motion.button>

        {navItems.map((item) => (
          <NavButton
            key={item.id}
            label={item.label}
            isActive={activeSection === item.id}
            onClick={() => scrollTo(item.id)}
          />
        ))}
      </div>
    </motion.nav>
  );
}
