import React from "react";

const ControlPanel = ({
  isotope,
  setIsotope,
  colors: {
    protonsColor,
    neutronsColor,
    firstShellElectronsColor,
    secondShellElectronsColor,
    thirdShellElectronsColor,
  },
}) => {
  return (
    <div
      style={{
        display: "flex",
        position: "absolute",
        bottom: "1.5rem",
        left: "1.5rem",
        zIndex: 2,
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <label style={{ color: "white" }}>Select Isotope:</label>
        <select
          value={isotope}
          onChange={(e) => setIsotope(parseInt(e.target.value))}
        >
          <option value={12}>Carbon-12</option>
          <option value={13}>Carbon-13</option>
          <option value={14}>Carbon-14</option>
        </select>
      </div>

      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "5px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: protonsColor,
              display: "inline-block",
              verticalAlign: "middle",
            }}
          ></div>
          <span style={{ color: "white" }}>Protons: 6</span>
        </div>

        <div
          style={{
            display: "flex",
            gap: "5px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: neutronsColor,
              display: "inline-block",
              verticalAlign: "middle",
            }}
          ></div>
          <span style={{ color: "white" }}>Neutrons: {isotope - 6}</span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: firstShellElectronsColor,
            }}
          ></div>
          <span style={{ color: "white" }}>1s Electrons</span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: secondShellElectronsColor,
            }}
          ></div>
          <span style={{ color: "white" }}>2s Electrons</span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: thirdShellElectronsColor,
            }}
          ></div>
          <span style={{ color: "white" }}>2p Electrons</span>
        </div>
      </div>
      <div style={{ color: "white" }}>
        The electron configuration of carbon is 1s<sup>2</sup> 2s<sup>2</sup> 2p
        <sup>2</sup>.
      </div>
    </div>
  );
};

export default ControlPanel;
