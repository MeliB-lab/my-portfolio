import { motion } from "motion/react";
import { Mail, Linkedin, ArrowUpRight, FileText } from "lucide-react";

interface ContactSectionProps {
  id: string;
}

export function ContactSection({ id }: ContactSectionProps) {
  return (
    <section
      id={id}
      className="relative min-h-[70vh] flex flex-col justify-between py-24 md:py-32 px-8 md:px-16"
      style={{ background: "var(--background)" }}
    >
      {/* Top rule */}
      <motion.div
        className="h-px mb-16"
        style={{ background: "var(--border)" }}
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />

      <div className="max-w-2xl">
        <motion.p
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs tracking-[0.24em] uppercase mb-8"
          style={{ fontFamily: "var(--font-mono)", color: "var(--muted-foreground)" }}
        >
          03 — Contact
        </motion.p>

        {/* Availability signal */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-3 mb-10"
        >
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{
              background: "#5C8C5C",
              animation: "pulse-dot 2.5s ease-in-out infinite",
              boxShadow: "0 0 0 4px rgba(92,140,92,0.15)",
            }}
          />
          <span
            className="text-sm tracking-[0.1em]"
            style={{ fontFamily: "var(--font-mono)", color: "#5C8C5C" }}
          >
            Currently open to new work
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.55 }}
          className="text-3xl md:text-5xl leading-tight mb-8"
          style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}
        >
          Let's build something worth talking about.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="text-base leading-relaxed mb-12 max-w-md"
          style={{ color: "var(--muted-foreground)" }}
        >
          I'm best in conversation — so reach out. If you have questions before that, my AI assistant is already here and knows my work pretty well.
        </motion.p>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="mailto:melissabisyir@gmail.com"
            className="group flex items-center gap-3 px-6 py-3.5 rounded-lg transition-all hover:opacity-90"
            style={{ background: "var(--foreground)", color: "var(--primary-foreground)" }}
          >
            <Mail size={16} />
            <span className="text-sm tracking-[0.08em]" style={{ fontFamily: "var(--font-mono)" }}>
              melissabisyir@gmail.com
            </span>
            <ArrowUpRight size={14} className="ml-auto opacity-60 group-hover:opacity-100 transition-opacity" />
          </a>

          <a
            href="https://www.linkedin.com/in/melissa-bisyir-cerritos-117238122/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-6 py-3.5 rounded-lg transition-all hover:opacity-80"
            style={{
              background: "transparent",
              border: "1px solid var(--border)",
              color: "var(--foreground)",
            }}
          >
            <Linkedin size={16} />
            <span className="text-sm tracking-[0.08em]" style={{ fontFamily: "var(--font-mono)" }}>
              LinkedIn
            </span>
            <ArrowUpRight size={14} className="ml-auto opacity-40 group-hover:opacity-80 transition-opacity" />
          </a>

          <a
            href="https://acrobat.adobe.com/id/urn:aaid:sc:US:952f9835-e319-47d0-ab87-6554dbc192f2"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-6 py-3.5 rounded-lg transition-all hover:opacity-80"
            style={{
              background: "transparent",
              border: "1px solid var(--border)",
              color: "var(--foreground)",
            }}
          >
            <FileText size={16} />
            <span className="text-sm tracking-[0.08em]" style={{ fontFamily: "var(--font-mono)" }}>
              Résumé
            </span>
            <ArrowUpRight size={14} className="ml-auto opacity-40 group-hover:opacity-80 transition-opacity" />
          </a>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mt-20 pt-8"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <p
          className="text-xs"
          style={{ fontFamily: "var(--font-mono)", color: "var(--muted-foreground)" }}
        >
          © 2025 Melissa Bisyir · Senior Product Designer
        </p>
        <p
          className="text-xs"
          style={{ fontFamily: "var(--font-mono)", color: "var(--muted-foreground)", opacity: 0.5 }}
        >
          Designed with intention · Built with React
        </p>
      </motion.div>
    </section>
  );
}
