import React from "react";

const ControlPanel = ({ setFireBallFired }) => {
  const Reset = () => {
    window.location.reload();
  };

  const Fire = () => {
    if (Math.random() * 100 < 15) return;
    setFireBallFired(1);
  };

  return (
    <div
      style={{
        display: "flex",
        position: "absolute",
        top: "1.5rem",
        left: "2.5rem",
        zIndex: 2,
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          style={{
            padding: "10px",
          }}
          className="button"
          onClick={Fire}
        >
          Uderz neutronem
        </button>
        <button
          style={{
            padding: "10px",
          }}
          className="button"
          onClick={Reset}
        >
          Resetuj
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
