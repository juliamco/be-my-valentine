import { useState, useRef, useEffect } from "react";

const App = () => {
  const [accepted, setAccepted] = useState<boolean>(false);
  const [selectedIdeas, setSelectedIdeas] = useState<string[]>([]);
  const noButtonRef = useRef<HTMLButtonElement | null>(null);

  const ideas: string[] = [
    "Romantic dinner 🍝",
    "Movie night 🎬",
    "Picnic in the park 🌳",
    "Arcade date 🎮",
    "Coffee date ☕",
    "Stargazing ✨",
  ];

  const handleMouseMove = (e: MouseEvent): void => {
    const button = noButtonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const buttonX = rect.left + rect.width / 2;
    const buttonY = rect.top + rect.height / 2;

    const dx = buttonX - e.clientX;
    const dy = buttonY - e.clientY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const repelDistance = 140;
    const maxMove = 120;

    if (distance < repelDistance) {
      const unitX = dx / distance;
      const unitY = dy / distance;
      const strength = (repelDistance - distance) / repelDistance;

      const moveX = unitX * maxMove * strength;
      const moveY = unitY * maxMove * strength;

      button.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const toggleIdea = (idea: string): void => {
    setSelectedIdeas((prev) =>
      prev.includes(idea) ? prev.filter((i) => i !== idea) : [...prev, idea],
    );
  };

  const sendEmail = (): void => {
    const subject = "YES! ❤️";
    const body = `I'm so excited for our Valentine's date!\n\nHere are my ideas:\n\n${selectedIdeas.join(
      "\n",
    )}`;

    window.location.href = `mailto:?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-300 to-rose-200">
      <div className="bg-white p-10 rounded-3xl shadow-2xl text-center w-[380px] relative">
        {!accepted ? (
          <>
            <h1 className="text-3xl font-bold text-pink-600 mb-8">
              Be my valentine? 💖
            </h1>

            <div className="flex justify-center gap-6 relative">
              <button
                onClick={() => setAccepted(true)}
                className="px-6 py-2 rounded-full bg-pink-600 text-white font-medium hover:bg-pink-700 transition"
              >
                Yes
              </button>

              <button
                ref={noButtonRef}
                className="px-6 py-2 rounded-full bg-gray-300 text-gray-700 transition-transform duration-150 ease-out"
              >
                No
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-pink-600 mb-6">Yay!! ❤️</h1>

            <div className="flex flex-col text-left gap-3">
              {ideas.map((idea) => (
                <label
                  key={idea}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="accent-pink-600"
                    onChange={() => toggleIdea(idea)}
                  />
                  {idea}
                </label>
              ))}
            </div>

            <button
              onClick={sendEmail}
              disabled={selectedIdeas.length === 0}
              className="mt-6 px-6 py-2 rounded-full bg-green-500 text-white font-medium hover:bg-green-600 disabled:bg-gray-400 transition"
            >
              Send My Answer 💌
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
