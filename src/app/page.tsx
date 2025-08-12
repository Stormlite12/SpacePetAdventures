"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


const storyLines = [
  "ISRO 2077 — Humanity has reached the stars...",
  "We have discovered a new alien species capable of adapting to any environment.",
  "They are friendly, curious, and could help us explore beyond our solar system.",
  "Your first mission: travel to Mars to study its surface with the help of our alien friend."
];

export default function HomePage() {
  const [started, setStarted] = useState(false);
  const [storyIndex, setStoryIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [buttonHover, setButtonHover] = useState(false);


  const router = useRouter();

  /** TYPEWRITER EFFECT **/
  useEffect(() => {
    if (!started) return;

    setIsTyping(true);
    setDisplayedText("");

    const currentLine = storyLines[storyIndex];
    let currentIndex = 0;

    const typeInterval = setInterval(() => {
      if (currentIndex < currentLine.length) {
        setDisplayedText(currentLine.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [storyIndex, started]);

  /** CURSOR BLINK **/
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  /** CLICK HANDLER **/
  const nextStory = () => {
    if (isTyping) {
      // Skip to full text instantly
      setDisplayedText(storyLines[storyIndex]);
      setIsTyping(false);
    } else if (storyIndex < storyLines.length - 1) {
      // Move to next line
      setStoryIndex(storyIndex + 1);
    } else {
      // TODO: Replace alert with actual navigation
       router.push("/office");
    }
  };

  return (
    <div
      className="relative h-screen w-screen overflow-hidden"
      style={{ imageRendering: "pixelated" }}
    >
      {/* BACKGROUND VIDEO */}
      <video
        src="/videos/Intro2.mp4"
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{ imageRendering: "pixelated" }}
      />

      {/* TITLE SCREEN */}
      {!started && (
        <div className="absolute inset-0 z-10">
          {/* Title - Top Right */}
          <div className="absolute top-8 right-8">
            <img
              src="/backgrounds/title.png"
              alt="Space Pet Adventures"
              className="max-w-full h-auto"
              style={{
                imageRendering: "pixelated",
                maxHeight: "00px",
                filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.8))",
              }}
            />
          </div>

          {/* START BUTTON */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={() => setStarted(true)}
              onMouseEnter={() => setButtonHover(true)}
              onMouseLeave={() => setButtonHover(false)}
              className="relative font-bold text-lg px-8 py-3 transition-all duration-100"
              style={{
                fontFamily: '"Courier New", monospace',
                background: buttonHover ? "#ff6b35" : "#4a90e2",
                border: "3px solid #000",
                color: "#fff",
                textShadow: "1px 1px 0px #000",
                boxShadow: buttonHover
                  ? "inset -2px -2px 0px #cc4a1a, inset 2px 2px 0px #ff9d7a, 2px 2px 0px #000"
                  : "inset -2px -2px 0px #2c5985, inset 2px 2px 0px #6bb3ff, 2px 2px 0px #000",
                transform: buttonHover ? "translate(1px, 1px)" : "translate(0px, 0px)",
              }}
            >
              ▶ START GAME
            </button>
          </div>

          {/* VERSION INFO */}
          <div
            className="absolute bottom-4 right-4 bg-black border-2 border-gray-400 px-2 py-1"
            style={{
              fontFamily: '"Courier New", monospace',
              fontSize: "10px",
              color: "#c0c0c0",
            }}
          >
            v1.0 BETA
          </div>
        </div>
      )}

      {/* DIALOGUE BOX */}
      {started && (
        <div className="absolute bottom-4 left-4 right-4 z-20">
          <div
            className="mx-auto max-w-4xl bg-black border-4 relative cursor-pointer"
            onClick={nextStory}
            style={{
              borderColor: "#8b4513",
              boxShadow:
                "0 0 0 2px #000, 0 0 0 4px #8b4513, inset 0 0 0 2px #d2691e",
            }}
          >
            {/* Pixel corners */}
            <div className="absolute top-0 left-0 w-2 h-2 bg-black"></div>
            <div className="absolute top-0 right-0 w-2 h-2 bg-black"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 bg-black"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-black"></div>

            {/* Dialogue Content */}
            <div className="p-6">
              <div className="flex items-start space-x-4">
                {/* Character portrait */}
                <div
                  className="w-16 h-16 border-2 border-gray-400 flex-shrink-0"
                  style={{
                    background:
                      "linear-gradient(45deg, #4a4a4a 25%, transparent 25%), linear-gradient(-45deg, #4a4a4a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #4a4a4a 75%), linear-gradient(-45deg, transparent 75%, #4a4a4a 75%)",
                    backgroundSize: "4px 4px",
                  }}
                >
                  <div className="w-full h-full flex items-center justify-center text-yellow-400 font-bold text-xl">
                    👨‍🚀
                  </div>
                </div>

                {/* Text */}
                <div className="flex-1">
                  <div
                    className="text-white leading-relaxed mb-3"
                    style={{
                      fontFamily: '"Courier New", monospace',
                      fontSize: "20px",
                    }}
                  >
                    {displayedText}
                    {isTyping && showCursor && (
                      <span className="inline-block w-3 h-5 bg-white ml-1" />
                    )}
                  </div>

                  {/* Continue prompt */}
                  {!isTyping && (
                    <div className="flex justify-between items-center">
                      <div
                        className="text-yellow-300 animate-pulse"
                        style={{
                          fontFamily: '"Courier New", monospace',
                          fontSize: "12px",
                        }}
                      >
                        ▼ CLICK TO CONTINUE
                      </div>
                      <div
                        className="text-gray-400"
                        style={{
                          fontFamily: '"Courier New", monospace',
                          fontSize: "12px",
                        }}
                      >
                        {storyIndex + 1}/{storyLines.length}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Decorative Border */}
            <div className="absolute top-2 left-2 right-2 h-1 bg-gradient-to-r from-transparent via-yellow-600 to-transparent opacity-50"></div>
            <div className="absolute bottom-2 left-2 right-2 h-1 bg-gradient-to-r from-transparent via-yellow-600 to-transparent opacity-50"></div>
          </div>
        </div>
      )}

      {/* PIXEL RENDERING ENFORCEMENT */}
      <style jsx>{`
        * {
          image-rendering: pixelated;
          image-rendering: -moz-crisp-edges;
          image-rendering: crisp-edges;
        }
      `}</style>
    </div>
  );
}
