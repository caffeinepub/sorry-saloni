import { useEffect, useRef, useState } from "react";

// ─── Letter Lines ──────────────────────────────────────────────────────────────

const LETTER_LINES = [
  { text: "Dear Saloni,", type: "salutation" },
  { text: "Sorry Saloni,", type: "salutation" },
  {
    text: "If any of my messages ever hurt you, I am really sorry for that.",
    type: "body",
  },
  {
    text: "Sometimes when you send a message, I reply by teasing you or joking about something, and maybe that made you feel bad. I didn't mean to hurt you.",
    type: "body",
  },
  {
    text: "If I have ever troubled you for no reason, please forgive me.",
    type: "body",
  },
  {
    text: "From now on, I will try to be more careful so that my words never make you feel bad.",
    type: "body",
  },
  { text: "Once again, I am really sorry.", type: "body" },
  { text: "— Sanu", type: "signature" },
];

const CHAR_DELAY_MS = 18; // ms per character
const LINE_PAUSE_MS = 200; // ms pause between lines

// ─── Butterfly Config ─────────────────────────────────────────────────────────

interface ButterflyConfig {
  id: number;
  style: React.CSSProperties;
  animClass: string;
}

const BUTTERFLIES: ButterflyConfig[] = [
  {
    id: 1,
    animClass: "butterfly",
    style: {
      top: "8vh",
      left: 0,
      animation: "butterfly-float-1 18s linear 1s infinite",
      filter: "drop-shadow(0 0 6px #ff9dc8) hue-rotate(0deg)",
    },
  },
  {
    id: 2,
    animClass: "butterfly",
    style: {
      top: "22vh",
      left: 0,
      animation: "butterfly-float-2 22s linear 3.5s infinite",
      filter: "drop-shadow(0 0 6px #c9a0ff) hue-rotate(60deg)",
    },
  },
  {
    id: 3,
    animClass: "butterfly",
    style: {
      top: "55vh",
      left: 0,
      animation: "butterfly-float-1 20s linear 7s infinite",
      filter: "drop-shadow(0 0 7px #ffc0cb) hue-rotate(15deg)",
    },
  },
  {
    id: 4,
    animClass: "butterfly",
    style: {
      top: "75vh",
      left: 0,
      animation: "butterfly-float-3 16s linear 2s infinite",
      filter: "drop-shadow(0 0 6px #ff6fa8) hue-rotate(-10deg)",
    },
  },
  {
    id: 5,
    animClass: "butterfly",
    style: {
      top: "40vh",
      right: 0,
      left: "auto",
      animation: "butterfly-float-2 19s linear 5s infinite",
      filter: "drop-shadow(0 0 7px #e8a0f8) hue-rotate(40deg)",
    },
  },
  {
    id: 6,
    animClass: "butterfly",
    style: {
      top: "15vh",
      left: "10vw",
      animation: "butterfly-float-4 24s linear 4s infinite",
      filter: "drop-shadow(0 0 6px #ffb3cc) hue-rotate(5deg)",
    },
  },
  {
    id: 7,
    animClass: "butterfly",
    style: {
      top: "5vh",
      left: "75vw",
      animation: "butterfly-float-5 21s linear 8.5s infinite",
      filter: "drop-shadow(0 0 6px #d4a0ff) hue-rotate(55deg)",
    },
  },
  {
    id: 8,
    animClass: "butterfly",
    style: {
      top: "60vh",
      left: "60vw",
      animation: "butterfly-float-4 17s linear 11s infinite",
      filter: "drop-shadow(0 0 7px #ff8fb3) hue-rotate(-5deg)",
    },
  },
  {
    id: 9,
    animClass: "butterfly",
    style: {
      top: "85vh",
      left: "20vw",
      animation: "butterfly-float-3 23s linear 6s infinite",
      filter: "drop-shadow(0 0 6px #c8a8ff) hue-rotate(50deg)",
    },
  },
  {
    id: 10,
    animClass: "butterfly",
    style: {
      top: "35vh",
      left: "40vw",
      animation: "butterfly-float-1 26s linear 13s infinite",
      filter: "drop-shadow(0 0 8px #ffc2d4) hue-rotate(10deg)",
    },
  },
];

// ─── Rose Petal Config ────────────────────────────────────────────────────────

interface PetalConfig {
  id: number;
  leftPercent: number;
  animName: string;
  duration: number;
  delay: number;
  size: number;
  gradient: string;
}

const PETAL_ANIM_NAMES = [
  "petal-fall-1",
  "petal-fall-2",
  "petal-fall-3",
  "petal-fall-4",
  "petal-fall-5",
];

const PETAL_GRADIENTS = [
  "radial-gradient(ellipse at 40% 30%, #ff6fa8 0%, #e8397d 60%, #c0155a 100%)",
  "radial-gradient(ellipse at 60% 40%, #ffadc8 0%, #ff6690 60%, #e03575 100%)",
  "radial-gradient(ellipse at 30% 60%, #f9a8d4 0%, #f472b6 60%, #db2777 100%)",
  "radial-gradient(ellipse at 70% 20%, #fda4af 0%, #fb7185 60%, #e11d48 100%)",
  "radial-gradient(ellipse at 50% 50%, #fecdd3 0%, #fda4af 50%, #f43f5e 100%)",
];

const PETALS: PetalConfig[] = Array.from({ length: 28 }, (_, i) => ({
  id: i + 1,
  leftPercent: 2 + ((i * 3.7 + (i % 5) * 6.3 + (i % 7) * 11.1) % 96),
  animName: PETAL_ANIM_NAMES[i % PETAL_ANIM_NAMES.length],
  duration: 9 + (i % 6) * 1.8 + (i % 4) * 1.1,
  delay: i * 0.7 + (i % 5) * 0.4,
  size: 7 + (i % 5) * 2,
  gradient: PETAL_GRADIENTS[i % PETAL_GRADIENTS.length],
}));

// ─── Starfield ────────────────────────────────────────────────────────────────

interface StarConfig {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

const STARS: StarConfig[] = Array.from({ length: 55 }, (_, i) => ({
  id: i,
  x: (i * 1.82 + (i % 7) * 3.3 + (i % 13) * 7.1) % 100,
  y: (i * 1.64 + (i % 5) * 5.7 + (i % 11) * 4.3) % 100,
  size: 1 + (i % 3) * 0.8,
  duration: 2 + (i % 5) * 0.7,
  delay: (i % 7) * 0.4,
}));

// ─── Heart SVG ───────────────────────────────────────────────────────────────

function HeartSVG({ size = 100 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="heartGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ffb3cc" />
          <stop offset="40%" stopColor="#ff6fa8" />
          <stop offset="100%" stopColor="#c91c5a" />
        </radialGradient>
      </defs>
      <path
        d="M50 88 C50 88 10 62 10 38 C10 24 20 14 35 14 C42 14 48 18 50 22 C52 18 58 14 65 14 C80 14 90 24 90 38 C90 62 50 88 50 88 Z"
        fill="url(#heartGrad)"
      />
    </svg>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

// ─── Intro Typewriter ─────────────────────────────────────────────────────────

const INTRO_TEXT = "Saloni...";
const INTRO_CHAR_DELAY = 60; // ms per character for intro

function IntroScreen({ onDone }: { onDone: () => void }) {
  const [displayed, setDisplayed] = useState("");
  const [fadeOut, setFadeOut] = useState(false);
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function typeNext() {
      if (indexRef.current < INTRO_TEXT.length) {
        indexRef.current++;
        setDisplayed(INTRO_TEXT.slice(0, indexRef.current));
        timerRef.current = setTimeout(typeNext, INTRO_CHAR_DELAY);
      } else {
        // Pause, then fade out
        timerRef.current = setTimeout(() => {
          setFadeOut(true);
          timerRef.current = setTimeout(onDone, 900);
        }, 1200);
      }
    }
    timerRef.current = setTimeout(typeNext, 400);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: "linear-gradient(135deg, #0b0f2a 0%, #1a0d2e 100%)",
        transition: "opacity 0.9s ease",
        opacity: fadeOut ? 0 : 1,
        pointerEvents: fadeOut ? "none" : "auto",
      }}
    >
      {/* Stars in intro too */}
      {STARS.map((star) => (
        <div
          key={star.id}
          className="star"
          style={
            {
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              "--twinkle-duration": `${star.duration}s`,
              "--twinkle-delay": `${star.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}

      <div className="relative z-10 text-center px-6" aria-live="polite">
        <p
          style={{
            fontFamily: "Dancing Script, cursive",
            fontSize: "clamp(2.2rem, 7vw, 4rem)",
            color: "#ffd9e6",
            textShadow:
              "0 0 30px rgba(255,111,168,0.6), 0 0 60px rgba(255,111,168,0.25)",
            letterSpacing: "0.04em",
            minHeight: "1.2em",
          }}
        >
          {displayed}
          <span
            className="cursor-blink"
            aria-hidden="true"
            style={{ color: "#ff9dc8" }}
          >
            |
          </span>
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  // Typewriter state
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [typingComplete, setTypingComplete] = useState(false);

  // Ending sequence state
  const [showPetals] = useState(true);
  const [showHeart, setShowHeart] = useState(false);
  const [showEndingMessage, setShowEndingMessage] = useState(false);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const letterRef = useRef<HTMLDivElement>(null);

  // ── Typewriter effect ──────────────────────────────────────────────────────
  useEffect(() => {
    if (currentLineIndex >= LETTER_LINES.length) {
      setTypingComplete(true);
      return;
    }

    const fullLine = LETTER_LINES[currentLineIndex].text;
    let charIndex = currentText.length;

    if (charIndex < fullLine.length) {
      timeoutRef.current = setTimeout(() => {
        setCurrentText(fullLine.slice(0, charIndex + 1));
      }, CHAR_DELAY_MS);
    } else {
      // Line complete — pause then move to next
      timeoutRef.current = setTimeout(() => {
        setCompletedLines((prev) => [...prev, fullLine]);
        setCurrentText("");
        setCurrentLineIndex((prev) => prev + 1);
      }, LINE_PAUSE_MS);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentLineIndex, currentText]);

  // ── Ending sequence trigger ────────────────────────────────────────────────
  useEffect(() => {
    if (!typingComplete) return;

    // Scroll to bottom of letter
    letterRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });

    const t2 = setTimeout(() => setShowHeart(true), 1000);
    const t3 = setTimeout(() => setShowEndingMessage(true), 2200);

    return () => {
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [typingComplete]);

  // ── Line type helper ──────────────────────────────────────────────────────
  const getLineClass = (index: number) => {
    const lineType = LETTER_LINES[index]?.type;
    if (lineType === "salutation") return "letter-text letter-salutation";
    if (lineType === "signature") return "letter-text letter-sign";
    return "letter-text letter-body";
  };

  const getCurrentLineClass = () => {
    const lineType = LETTER_LINES[currentLineIndex]?.type;
    if (lineType === "salutation") return "letter-text letter-salutation";
    if (lineType === "signature") return "letter-text letter-sign";
    return "letter-text letter-body";
  };

  return (
    <div
      className="relative min-h-dvh w-full flex flex-col items-center justify-start overflow-x-hidden"
      style={{ backgroundColor: "#0b0f2a" }}
      data-ocid="apology.page"
    >
      {/* ── Intro typing screen ──────────────────────────────────────────── */}
      {showIntro && <IntroScreen onDone={() => setShowIntro(false)} />}
      {/* ── Starfield ─────────────────────────────────────────────────────── */}
      {STARS.map((star) => (
        <div
          key={star.id}
          className="star"
          style={
            {
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              "--twinkle-duration": `${star.duration}s`,
              "--twinkle-delay": `${star.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}

      {/* ── Butterflies ────────────────────────────────────────────────────── */}
      {BUTTERFLIES.map((b) => (
        <div
          key={b.id}
          className={b.animClass}
          style={b.style}
          aria-hidden="true"
        >
          <span>🦋</span>
        </div>
      ))}

      {/* ── Rose Petals ────────────────────────────────────────────────────── */}
      {showPetals &&
        PETALS.map((petal) => (
          <div
            key={petal.id}
            className="petal"
            aria-hidden="true"
            style={{
              left: `${petal.leftPercent}%`,
              top: 0,
              width: `${petal.size}px`,
              height: `${Math.round(petal.size * 1.5)}px`,
              background: petal.gradient,
              animation: `${petal.animName} ${petal.duration}s ease-in ${petal.delay}s infinite`,
            }}
          />
        ))}

      {/* ── Letter Card ────────────────────────────────────────────────────── */}
      <main
        className="relative z-10 flex flex-col items-center justify-center w-full px-4 py-10 sm:py-16"
        style={{ minHeight: "100dvh" }}
      >
        {/* Corner badge wrapper */}
        <div
          className="letter-wrapper"
          style={{
            width: "100%",
            maxWidth: "672px",
            margin: "0 auto",
            position: "relative",
          }}
        >
          {/* Corner badges */}
          <div className="corner corner-tl" aria-hidden="true">
            Dear Saloni ❤️
          </div>
          <div className="corner corner-tr" aria-hidden="true">
            A message from my heart
          </div>
          <div className="corner corner-bl" aria-hidden="true">
            You mean a lot to me
          </div>
          <div className="corner corner-br" aria-hidden="true">
            Please forgive me
          </div>

          <article
            ref={letterRef}
            className="letter-card rounded-2xl sm:rounded-3xl p-7 sm:p-10 md:p-14 w-full max-w-2xl mx-auto"
            data-ocid="apology.card"
          >
            {/* Decorative top ornament */}
            <div
              className="flex items-center justify-center mb-7 gap-3"
              aria-hidden="true"
            >
              <span
                style={{ color: "#ff6fa8", fontSize: "1.2rem", opacity: 0.7 }}
              >
                ❧
              </span>
              <span
                style={{
                  color: "#e879a0",
                  fontSize: "0.9rem",
                  letterSpacing: "0.3em",
                  fontFamily: "Dancing Script, cursive",
                  opacity: 0.6,
                }}
              >
                with love
              </span>
              <span
                style={{ color: "#ff6fa8", fontSize: "1.2rem", opacity: 0.7 }}
              >
                ❧
              </span>
            </div>

            {/* Completed lines */}
            <div className="space-y-4 sm:space-y-5">
              {completedLines.map((line, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: letter lines are ordered and never reordered
                <p key={index} className={getLineClass(index)}>
                  {line}
                </p>
              ))}

              {/* Currently typing line */}
              {!typingComplete && currentLineIndex < LETTER_LINES.length && (
                <p className={getCurrentLineClass()}>
                  {currentText}
                  <span className="cursor-blink" aria-hidden="true">
                    |
                  </span>
                </p>
              )}
            </div>

            {/* Ending sequence inline */}
            {typingComplete && (
              <div
                className="mt-10 sm:mt-14 flex flex-col items-center gap-5 sm:gap-7"
                data-ocid="apology.section"
              >
                {/* Decorative divider */}
                <div
                  className="w-24 sm:w-32 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, oklch(0.72 0.22 350 / 0.4), transparent)",
                  }}
                  aria-hidden="true"
                />

                {/* Pulsing heart */}
                {showHeart && (
                  <div
                    className="ending-heart"
                    style={{ display: "flex", justifyContent: "center" }}
                    aria-label="Heart"
                    data-ocid="apology.card"
                  >
                    <HeartSVG size={clampHeartSize()} />
                  </div>
                )}

                {/* Ending message */}
                {showEndingMessage && (
                  <p className="ending-message" data-ocid="apology.section">
                    Thank you for visiting this page, Saloni.
                  </p>
                )}
              </div>
            )}

            {/* Decorative bottom ornament */}
            <div
              className="flex items-center justify-center mt-8 gap-2"
              aria-hidden="true"
            >
              <span
                style={{ color: "#ff6fa8", fontSize: "0.85rem", opacity: 0.4 }}
              >
                ✿
              </span>
              <span
                style={{ color: "#e879a0", fontSize: "0.75rem", opacity: 0.3 }}
              >
                ✿
              </span>
              <span
                style={{ color: "#ff6fa8", fontSize: "0.85rem", opacity: 0.4 }}
              >
                ✿
              </span>
            </div>
          </article>
        </div>
        {/* end letter-wrapper */}

        {/* ── Footer ─────────────────────────────────────────────────────── */}
        <footer className="mt-8 pb-6 text-center" aria-label="Footer">
          <p
            style={{
              fontFamily: "Dancing Script, cursive",
              fontSize: "0.85rem",
              color: "oklch(0.65 0.10 350 / 0.55)",
              textShadow: "0 0 8px oklch(0.72 0.22 350 / 0.2)",
              letterSpacing: "0.02em",
            }}
          >
            © {new Date().getFullYear()}.{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.hostname : "",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "oklch(0.72 0.22 350 / 0.65)",
                textDecoration: "none",
              }}
            >
              Built with ♥ using caffeine.ai
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
}

// ─── Helper: responsive heart size ───────────────────────────────────────────

function clampHeartSize(): number {
  if (typeof window === "undefined") return 100;
  const vw = window.innerWidth;
  if (vw < 380) return 80;
  if (vw < 640) return 100;
  return 120;
}
