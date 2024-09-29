import React from "react";

const Simmer = () => {
  const shimmerStyle = {
    background: 
      "linear-gradient(90deg, #e0e7ff 25%, #c7d2fe 50%, #e0e7ff 75%), linear-gradient(90deg, #3b82f6, #60a5fa)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.5s infinite",
  };

  const shimmerKeyframes = `
    @keyframes shimmer {
      0% {
        background-position: 200% 0;
      }
      100% {
        background-position: -200% 0;
      }
    }
  `;

  return (
    <>
      <style>{shimmerKeyframes}</style>
      <div className="flex flex-col space-y-2 w-full h-full">
        <div style={{ ...shimmerStyle, height: '16rem', width: '100%', borderRadius: '0.5rem' }}></div> {/* Larger shimmer */}
        <div style={{ ...shimmerStyle, height: '2rem', width: '75%', borderRadius: '0.5rem' }}></div>
        <div style={{ ...shimmerStyle, height: '2rem', width: '50%', borderRadius: '0.5rem' }}></div>
        <div style={{ ...shimmerStyle, height: '2rem', width: '25%', borderRadius: '0.5rem' }}></div>
      </div>
    </>
  );
};

export default Simmer;
