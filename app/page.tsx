"use client";

import { motion, type Variants } from "framer-motion";

/* ─── Animation variants ─────────────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65 },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

import outreachData from "../data/outreach.json";

/* ─── Status badge ────────────────────────────────────────────────── */
function StatusBadge({ status }: { status: string }) {
  if (status === "Participating !!!") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
        {status}
      </span>
    );
  }
  if (status === "Not interested") {
    return (
      <span className="inline-flex items-center rounded-full border border-red-100 bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-400">
        {status}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-500">
      {status}
    </span>
  );
}

/* ─── Divider ─────────────────────────────────────────────────────── */
function Divider() {
  return <div className="my-20 h-px bg-zinc-100" />;
}

/* ─── Section label ───────────────────────────────────────────────── */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      variants={fadeUp}
      className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-400"
    >
      {children}
    </motion.p>
  );
}

/* ─── Page ────────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900">
      {/* Top accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-300 to-transparent" />

      <main className="mx-auto max-w-2xl px-6 pb-24 pt-20 md:pt-28">

        {/* ── 1. HERO ─────────────────────────────────────────────── */}
        <motion.section
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <Label>A Billion-Dollar Project</Label>

          <motion.h1
            variants={fadeUp}
            className="mb-6 text-5xl font-bold leading-[1.08] tracking-tight text-zinc-950 md:text-6xl lg:text-7xl"
          >
            Would you like
            <br />
            <span className="text-zinc-300">One Billion</span>
            <br />
            Dollars?
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mb-8 text-xl font-medium leading-relaxed text-zinc-500 md:text-2xl"
          >
            There is a catch. You receive the money today,
            <br className="hidden sm:block" /> but tomorrow you die.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="rounded-2xl border border-zinc-100 bg-zinc-50 p-6 md:p-8"
          >
            <p className="text-base leading-8 text-zinc-600">
              If you said no, you just realized that waking up tomorrow is
              worth at least{" "}
              <strong className="text-zinc-900">$1 Billion</strong>. Yet,
              every 11 minutes, someone in the world takes their own life.
              <br />
              <br />
              If this project creates enough empathy to change just one
              person&apos;s mind, it is officially a{" "}
              <strong className="text-zinc-900">Billion-Dollar Project</strong>.
            </p>
          </motion.div>
        </motion.section>

        <Divider />

        {/* ── 2. ABOUT ────────────────────────────────────────────── */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-20"
        >
          <Label>About</Label>

          <motion.h2
            variants={fadeUp}
            className="mb-8 text-2xl font-semibold tracking-tight text-zinc-900"
          >
            Why this exists.
          </motion.h2>

          <motion.div
            variants={fadeUp}
            className="space-y-5 text-base leading-8 text-zinc-600"
          >
            <p>
              Hi, I&apos;m{" "}
              <strong className="text-zinc-900">Andrea</strong>. I&apos;m 21,
              from Italy.
            </p>
            <p>
              We live in the most connected era in history, yet we&apos;ve
              never been more disconnected. I&apos;ve struggled with shyness
              and group dynamics myself. My little brother is lost behind a
              screen 10 hours a day, and my grandma spends her time dodging
              internet scams.
            </p>
            <p>
              Companies focus only on profit and production. I want to build
              something that focuses purely on what matters:{" "}
              <strong className="text-zinc-900">US. The people.</strong>
            </p>
          </motion.div>
        </motion.section>

        <Divider />

        {/* ── 3. PROJECTS ─────────────────────────────────────────── */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-20"
        >
          <Label>The Projects</Label>

          <motion.h2
            variants={fadeUp}
            className="mb-8 text-2xl font-semibold tracking-tight text-zinc-900"
          >
            Two things launching soon.
          </motion.h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Card 1 */}
            <motion.div
              variants={fadeUp}
              className="group flex flex-col rounded-2xl border border-zinc-200 p-6 transition-all duration-200 hover:border-zinc-300 hover:shadow-sm"
            >
              <div className="mb-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-zinc-900" />
                <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                  Project 01
                </span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-zinc-900">
                Squeak App
              </h3>
              <p className="mb-4 flex-1 text-sm leading-7 text-zinc-500">
                A social experiment launching soon, designed to foster
                real connection between people.
              </p>
              <a
                href="https://squeakapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto text-xs font-medium text-zinc-400 transition-colors hover:text-zinc-900"
              >
                squeakapp.com →
              </a>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              variants={fadeUp}
              className="group flex flex-col rounded-2xl border border-zinc-200 p-6 transition-all duration-200 hover:border-zinc-300 hover:shadow-sm"
            >
              <div className="mb-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-zinc-900" />
                <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                  Marketing Project
                </span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-zinc-900">
                The Billion Contest
              </h3>
              <p className="text-sm leading-7 text-zinc-500">
                For promoting the start of the project. We want to see the real
                journey — the struggles, the reality of life. Not just the
                highlight reel.
              </p>
            </motion.div>
          </div>
        </motion.section>

        <Divider />

        {/* ── 4. THE ASK ──────────────────────────────────────────── */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-20"
        >
          <Label>The Ask</Label>

          <motion.h2
            variants={fadeUp}
            className="mb-6 text-4xl font-bold leading-tight tracking-tight text-zinc-950 md:text-5xl"
          >
            Looking for the
            <br />
            <span className="text-zinc-300">First 10 Faces.</span>
          </motion.h2>

          <motion.div
            variants={fadeUp}
            className="mb-8 space-y-4 text-base leading-8 text-zinc-600"
          >
            <p>
              I&apos;ll not stop reaching out until I find the{" "}
              <strong className="text-zinc-900">first 10 people</strong>{" "}
              available to launch this. The task: create a vlog of your life.
              Show the real journey.
            </p>
            <p>
              The only requirement is to mention or show{" "}
              <strong className="text-zinc-900">
                &ldquo;The Billion Contest&rdquo;
              </strong>{" "}
              in the video. You send it to me, and I share it on the account
              as the official start of the launch.
            </p>
            <p>
              You will get a share of the prizes, my eternal gratitude, and
              be the{" "}
              <strong className="text-zinc-900">
                founding face of a movement
              </strong>
              . Once the first 10 videos are uploaded, this site will evolve
              and invite everyone to participate in the contest and build
              awareness.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
            <a
              href="mailto:mail.project.us@gmail.com"
              className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-zinc-700 hover:shadow-lg"
            >
              Reach me by email →
            </a>
            <a
              href="tel:+393395441023"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 transition-all hover:border-zinc-300 hover:bg-zinc-50"
            >
              Reach me by phone
            </a>
          </motion.div>
        </motion.section>

        <Divider />

        {/* ── 5. ROADMAP ──────────────────────────────────────────── */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-20"
        >
          <Label>Radical Transparency</Label>

          <motion.h2
            variants={fadeUp}
            className="mb-8 text-2xl font-semibold tracking-tight text-zinc-900"
          >
            The Master Plan.
          </motion.h2>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[5.5rem] top-0 h-full w-px bg-zinc-100 sm:left-24" />

            <div className="space-y-0">
              {[
                {
                  period: "Week 1–2",
                  title: "Launch",
                  desc: "Launch Squeak App and The Billion Contest. Get the first 10 creators. Make noise.",
                },
                {
                  period: "Month 3+",
                  title: "Revenue",
                  desc: "Print physical diaries derived from the app. Use the revenue to officially incorporate the company.",
                },
                {
                  period: "Long-term",
                  title: "The Company",
                  desc: "Build a company that pays employees incredibly well so they are motivated to make the world genuinely better.",
                },
                {
                  period: "Personal",
                  title: "The Real Why",
                  desc: "Am I doing this to get rich? Not really. I want to make a living — but my ultimate dream is to study art and become a great artist when I'm older.",
                  muted: true,
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="group flex gap-6 py-7"
                >
                  <div className="relative z-10 w-20 shrink-0 text-right sm:w-24">
                    <span className="text-xs font-semibold text-zinc-400">
                      {item.period}
                    </span>
                  </div>
                  <div className="relative z-10 -mt-0.5 pl-6">
                    {/* Dot on the line */}
                    <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full border-2 border-zinc-200 bg-white transition-colors group-hover:border-zinc-400" />
                    <h3
                      className={`mb-1 text-sm font-semibold ${
                        item.muted ? "text-zinc-400" : "text-zinc-900"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm leading-7 text-zinc-500">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <Divider />

        {/* ── 6. OUTREACH TABLE ───────────────────────────────────── */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-20"
        >
          <Label>Live Tracker</Label>

          <motion.h2
            variants={fadeUp}
            className="mb-1 text-2xl font-semibold tracking-tight text-zinc-900"
          >
            Outreach in progress.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mb-6 text-sm text-zinc-400"
          >
            Updated as we contact creators.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="overflow-hidden rounded-2xl border border-zinc-200"
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-100 bg-zinc-50/80">
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-zinc-400">
                    Creator
                  </th>
                  <th className="hidden px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-zinc-400 sm:table-cell">
                    Niche
                  </th>
                  <th className="hidden px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-zinc-400 md:table-cell">
                    Contact Date
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-zinc-400">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {outreachData.map((row, i) => (
                  <tr
                    key={i}
                    className="transition-colors hover:bg-zinc-50/50"
                  >
                    <td className="px-5 py-4 font-medium text-zinc-800">
                      {row.name}
                    </td>
                    <td className="hidden px-5 py-4 text-zinc-500 sm:table-cell">
                      {row.niche}
                    </td>
                    <td className="hidden px-5 py-4 text-zinc-400 md:table-cell">
                      {row.date}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={row.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </motion.section>

        {/* ── FOOTER ──────────────────────────────────────────────── */}
        <footer className="border-t border-zinc-100 pt-8 text-center text-xs text-zinc-300">
          <p>© 2026 First People &nbsp;·&nbsp; A human project, by Andrea.</p>
        </footer>
      </main>
    </div>
  );
}
