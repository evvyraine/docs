/**
 * A minimal, static chat mock for docs examples.
 *
 * Usage in MDX:
 *   import { ChatDemo } from "/snippets/chat-demo.jsx"
 *
 *   <ChatDemo
 *     turns={[
 *       { from: "you", kind: "voice", text: "the transcript", seconds: 12 },
 *       { from: "sky", text: "the reply" },
 *       { from: "sky", kind: "file", name: "plan.md", meta: "markdown" },
 *     ]}
 *   />
 *
 * Turns support: text (default), voice, image, file, code, working, sources.
 * Kept dependency-free and intentionally plain. No avatars, no timestamps.
 */

const TONES = {
  indigo: "from-indigo-100 to-sky-100 dark:from-indigo-500/20 dark:to-sky-500/20",
  violet: "from-violet-100 to-fuchsia-100 dark:from-violet-500/20 dark:to-fuchsia-500/20",
  emerald: "from-emerald-100 to-teal-100 dark:from-emerald-500/20 dark:to-teal-500/20",
  amber: "from-amber-100 to-orange-100 dark:from-amber-500/20 dark:to-orange-500/20",
  rose: "from-rose-100 to-pink-100 dark:from-rose-500/20 dark:to-pink-500/20",
  slate: "from-zinc-100 to-zinc-200 dark:from-zinc-700/40 dark:to-zinc-800/60",
};

const bubble = (from) =>
  from === "you"
    ? "bg-[#5E60CE] text-white"
    : "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100";

const Side = ({ from, children, className }) => (
  <div className={from === "you" ? "flex justify-end" : "flex justify-start"}>
    <div
      className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed ${bubble(
        from,
      )} ${className || ""}`}
    >
      {children}
    </div>
  </div>
);

const Muted = ({ from, children }) => (
  <div className={from === "you" ? "flex justify-end" : "flex justify-start"}>
    <p className="m-0 max-w-[88%] px-1 text-xs text-zinc-400 dark:text-zinc-500">{children}</p>
  </div>
);

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" fill="currentColor" aria-hidden="true">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const FileIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4 shrink-0"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M14 3v5h5" />
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5z" />
  </svg>
);

const ImageIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <circle cx="9" cy="9" r="1.6" />
    <path d="m4 17 4.5-4.5L12 16l3-2.5L20 18" />
  </svg>
);

const WAVE = [7, 12, 9, 16, 11, 6, 14, 10, 5];

const formatSeconds = (seconds) => {
  if (typeof seconds !== "number" || !isFinite(seconds)) return "";
  const minutes = Math.floor(seconds / 60);
  const rest = Math.round(seconds % 60);
  return `${minutes}:${String(rest).padStart(2, "0")}`;
};

const TextBubble = ({ from, text }) => (
  <Side from={from}>
    <span className="whitespace-pre-line">{text}</span>
  </Side>
);

const VoiceBubble = ({ from, seconds, label }) => (
  <Side from={from} className="flex items-center gap-2.5 py-2">
    <PlayIcon />
    <span className="flex h-4 items-center gap-[3px]">
      {WAVE.map((height, index) => (
        <span
          key={index}
          className="w-[2px] rounded-full bg-current opacity-70"
          style={{ height: `${height}px` }}
        />
      ))}
    </span>
    <span className="text-xs tabular-nums opacity-80">{label || formatSeconds(seconds)}</span>
  </Side>
);

const FileBubble = ({ from, name, meta }) => (
  <Side from={from} className="flex items-center gap-2.5">
    <span className="opacity-80">
      <FileIcon />
    </span>
    <span className="flex flex-col leading-tight">
      <span className="font-medium">{name}</span>
      {meta ? <span className="text-xs opacity-70">{meta}</span> : null}
    </span>
  </Side>
);

const CodeBubble = ({ from, text }) => (
  <Side from={from} className="font-mono text-[12px]">
    <pre className="m-0 whitespace-pre-wrap break-words font-mono">{text}</pre>
  </Side>
);

const ImageBubble = ({ from, tone, label, caption }) => (
  <div
    className={
      from === "you"
        ? "flex flex-col items-end gap-1.5"
        : "flex flex-col items-start gap-1.5"
    }
  >
    <div
      className={`flex h-32 w-44 items-center justify-center rounded-2xl border border-black/5 bg-gradient-to-br text-zinc-500/70 dark:border-white/10 dark:text-zinc-300/70 ${
        TONES[tone] || TONES.indigo
      }`}
    >
      <ImageIcon />
    </div>
    {caption || label ? (
      <span className="px-1 text-xs text-zinc-400 dark:text-zinc-500">{caption || label}</span>
    ) : null}
  </div>
);

const WorkingRow = ({ text }) => (
  <div className="flex justify-start">
    <p className="m-0 flex items-center gap-2 px-1 py-0.5 text-xs text-zinc-400 dark:text-zinc-500">
      <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#5E60CE]" />
      <span>{text}</span>
    </p>
  </div>
);

const SourcesRow = ({ links }) => (
  <div className="flex justify-start">
    <div className="flex max-w-[88%] flex-col gap-1 px-1">
      {(links || []).map((link, index) => (
        <a
          key={index}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          className="text-xs text-[#5E60CE] underline underline-offset-2 dark:text-[#9AA0FF]"
        >
          {link.label}
        </a>
      ))}
    </div>
  </div>
);

const Turn = ({ turn }) => {
  const item = turn || {};
  const from = item.from === "you" ? "you" : "sky";
  const kind = item.kind || "text";
  if (kind === "voice") {
    return (
      <>
        <VoiceBubble from={from} seconds={item.seconds} label={item.label} />
        {item.text ? <Muted from={from}>{item.text}</Muted> : null}
      </>
    );
  }
  if (kind === "image") {
    return <ImageBubble from={from} tone={item.tone} label={item.label} caption={item.caption} />;
  }
  if (kind === "file") return <FileBubble from={from} name={item.name} meta={item.meta} />;
  if (kind === "code") return <CodeBubble from={from} text={item.text} />;
  if (kind === "working") return <WorkingRow text={item.text} />;
  if (kind === "sources") return <SourcesRow links={item.links} />;
  return <TextBubble from={from} text={item.text} />;
};

export const ChatDemo = ({ turns = [], note }) => {
  const items = Array.isArray(turns) ? turns : [];
  return (
    <div className="not-prose my-4 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-5">
      <div className="flex flex-col gap-2.5">
        {items.map((turn, index) => (
          <Turn key={index} turn={turn} />
        ))}
      </div>
      {note ? (
        <p className="mb-0 mt-4 text-xs text-zinc-400 dark:text-zinc-500">{note}</p>
      ) : null}
    </div>
  );
};
