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
 *
 * Two Mintlify constraints shape this file:
 *   1. Only the exported symbol is inlined from a snippet, so everything must
 *      live inside ChatDemo.
 *   2. The scoped CSS only picks up class names written as static literals in
 *      a className. Anything in a variable or an interpolation is ignored, so
 *      every className here is a plain literal and all dynamic appearance
 *      (colours, alignment, gradient) uses inline styles instead.
 */

export const ChatDemo = ({ turns = [] }) => {
  const items = Array.isArray(turns) ? turns : [];

  const tones = {
    indigo: ["rgba(99, 102, 241, 0.16)", "rgba(56, 189, 248, 0.16)"],
    violet: ["rgba(139, 92, 246, 0.16)", "rgba(217, 70, 239, 0.14)"],
    emerald: ["rgba(16, 185, 129, 0.16)", "rgba(20, 184, 166, 0.14)"],
    amber: ["rgba(245, 158, 11, 0.18)", "rgba(249, 115, 22, 0.14)"],
    rose: ["rgba(244, 63, 94, 0.14)", "rgba(236, 72, 153, 0.14)"],
    slate: ["rgba(120, 120, 130, 0.14)", "rgba(90, 90, 100, 0.12)"],
  };

  const wave = [7, 12, 9, 16, 11, 6, 14, 10, 5];

  const formatSeconds = (seconds) => {
    if (typeof seconds !== "number" || !isFinite(seconds)) return "";
    const minutes = Math.floor(seconds / 60);
    const rest = Math.round(seconds % 60);
    return `${minutes}:${String(rest).padStart(2, "0")}`;
  };

  const playIcon = () => (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );

  const fileIcon = () => (
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

  const imageIcon = () => (
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

  const renderTurn = (turn) => {
    const item = turn || {};
    const from = item.from === "you" ? "you" : "sky";
    const kind = item.kind || "text";
    const align = { justifyContent: from === "you" ? "flex-end" : "flex-start" };
    const bubble = from === "you"
      ? { backgroundColor: "#5E60CE", color: "#ffffff" }
      : { backgroundColor: "rgba(128, 128, 136, 0.13)" };

    if (kind === "voice") {
      return (
        <div className="flex flex-col gap-1.5">
          <div className="flex" style={align}>
            <div
              className="max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed"
              style={bubble}
            >
              <span className="flex items-center gap-2.5">
                {playIcon()}
                <span className="flex h-4 items-center gap-[3px]">
                  {wave.map((height, bar) => (
                    <span
                      key={bar}
                      className="w-[2px] rounded-full bg-current opacity-70"
                      style={{ height: `${height}px` }}
                    />
                  ))}
                </span>
                <span className="text-xs tabular-nums opacity-80">
                  {item.label || formatSeconds(item.seconds)}
                </span>
              </span>
            </div>
          </div>
          {item.text ? (
            <div className="flex" style={align}>
              <p className="m-0 max-w-[88%] px-1 text-xs text-zinc-400 dark:text-zinc-500">
                {item.text}
              </p>
            </div>
          ) : null}
        </div>
      );
    }

    if (kind === "image") {
      const tone = tones[item.tone] || tones.indigo;
      return (
        <div
          className="flex flex-col gap-1.5"
          style={{ alignItems: from === "you" ? "flex-end" : "flex-start" }}
        >
          <div
            className="flex h-32 w-44 items-center justify-center rounded-2xl border border-black/5 text-zinc-400 dark:border-white/10 dark:text-zinc-500"
            style={{ backgroundImage: `linear-gradient(135deg, ${tone[0]}, ${tone[1]})` }}
          >
            {imageIcon()}
          </div>
          {item.caption || item.label ? (
            <span className="px-1 text-xs text-zinc-400 dark:text-zinc-500">
              {item.caption || item.label}
            </span>
          ) : null}
        </div>
      );
    }

    if (kind === "file") {
      return (
        <div className="flex" style={align}>
          <div
            className="max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed"
            style={bubble}
          >
            <span className="flex items-center gap-2.5">
              <span className="opacity-80">{fileIcon()}</span>
              <span className="flex flex-col leading-tight">
                <span className="font-medium">{item.name}</span>
                {item.meta ? <span className="text-xs opacity-70">{item.meta}</span> : null}
              </span>
            </span>
          </div>
        </div>
      );
    }

    if (kind === "code") {
      return (
        <div className="flex" style={align}>
          <div
            className="max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed"
            style={bubble}
          >
            <pre className="m-0 whitespace-pre-wrap break-words font-mono text-xs">
              {item.text}
            </pre>
          </div>
        </div>
      );
    }

    if (kind === "working") {
      return (
        <div className="flex" style={{ justifyContent: "flex-start" }}>
          <p className="m-0 flex items-center gap-2 px-1 py-0.5 text-xs text-zinc-400 dark:text-zinc-500">
            <span
              className="inline-block h-1.5 w-1.5 animate-pulse rounded-full"
              style={{ backgroundColor: "#5E60CE" }}
            />
            <span>{item.text}</span>
          </p>
        </div>
      );
    }

    if (kind === "sources") {
      return (
        <div className="flex" style={{ justifyContent: "flex-start" }}>
          <div className="flex max-w-[88%] flex-col gap-1 px-1">
            {(item.links || []).map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="text-xs underline underline-offset-2"
                style={{ color: "#7c7ee0" }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="flex" style={align}>
        <div
          className="max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed"
          style={bubble}
        >
          <span className="whitespace-pre-line">{item.text}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="not-prose my-4 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-5">
      <div className="flex flex-col gap-2.5">
        {items.map((turn, index) => (
          <div key={index}>{renderTurn(turn)}</div>
        ))}
      </div>
    </div>
  );
};
