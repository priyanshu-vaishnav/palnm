import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    type: "image",
    src: "/images/main.jpg",
    title: "GLOBAL ICON",
    subtitle: "Building teams. Scaling income. Real results.",
  },
  {
    type: "video",
    src: "/videos/video1.mp4",
    title: "MY TEAM WORK",
    subtitle: "Execution > Motivation",
  },
  {
    type: "video",
    src: "/videos/video2.mp4",
    title: "FIELD ACTION",
    subtitle: "Consistency compounds",
  },
];

const SLIDE_DURATION = 5000;

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const videoRef = useRef(null);

  // auto slide + progress
  useEffect(() => {
    if (paused) return;

    let start = Date.now();

    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      setProgress(pct);

      if (elapsed >= SLIDE_DURATION) {
        setIndex((prev) => (prev + 1) % slides.length);
        setProgress(0);
        start = Date.now();
      }
    };

    const interval = setInterval(tick, 50);
    return () => clearInterval(interval);
  }, [index, paused]);

  // video control
  useEffect(() => {
    if (slides[index].type === "video" && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [index]);

  const next = () => {
    setIndex((i) => (i + 1) % slides.length);
    setProgress(0);
  };

  const prev = () => {
    setIndex((i) => (i - 1 + slides.length) % slides.length);
    setProgress(0);
  };

  return (
    <div
      style={{
        position: "relative",
        height: "90vh",
        overflow: "hidden",
        background: "#000",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          style={{ width: "100%", height: "100%", position: "absolute" }}
        >
          {slides[index].type === "image" ? (
            <img
              src={slides[index].src}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <video
              ref={videoRef}
              src={slides[index].src}
              muted
              loop
              playsInline
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          )}

          {/* Overlay gradient */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.2))",
            }}
          />

          {/* Text */}
          <div
            style={{
              position: "absolute",
              bottom: "15%",
              left: "8%",
              color: "#fff",
              maxWidth: "600px",
            }}
          >
            <h1
              style={{
                fontSize: "3rem",
                fontWeight: 800,
                letterSpacing: "2px",
              }}
            >
              {slides[index].title}
            </h1>
            <p style={{ opacity: 0.8, marginTop: "10px" }}>
              {slides[index].subtitle}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "4px",
          width: `${progress}%`,
          background: "#C9A84C",
          transition: "width 0.1s linear",
        }}
      />

      {/* Arrows */}
      <button onClick={prev} style={arrow("left")}>‹</button>
      <button onClick={next} style={arrow("right")}>›</button>

      {/* Dots */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "8px",
        }}
      >
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            style={{
              width: i === index ? "18px" : "8px",
              height: "8px",
              borderRadius: "10px",
              background: i === index ? "#C9A84C" : "#888",
              cursor: "pointer",
              transition: "0.3s",
            }}
          />
        ))}
      </div>
    </div>
  );
}

const arrow = (side) => ({
  position: "absolute",
  top: "50%",
  [side]: "20px",
  transform: "translateY(-50%)",
  background: "rgba(0,0,0,0.5)",
  color: "#fff",
  border: "none",
  fontSize: "24px",
  padding: "10px 14px",
  cursor: "pointer",
  borderRadius: "50%",
});