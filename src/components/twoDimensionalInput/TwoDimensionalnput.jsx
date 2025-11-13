import React from "react";

const TwoDimensionalInput = (props) => {
  const { areaLabel, d1Val, d2Val, area, onD2Change, onD1Change } = props;
    console.log(d1Val, d2Val, areaLabel)
  return (
    <div>
      <label>{areaLabel}</label>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <input
          type="number"
          inputMode="decimal"
          step="any"
          //   placeholder="width"
          value={d1Val}
          onChange={(e) => {
            const s = e.target.value;
            const shelfWidth = s === "" ? "" : globalThis.Number(s);
            const w = shelfWidth === "" ? 0 : shelfWidth;
            const d = d2Val === "" ? 0 : d2Val;
            onD1Change(e.target.value);
          }}
        />
        <span style={{ opacity: 0.6 }}>×</span>
        <input
          type="number"
          inputMode="decimal"
          step="any"
          //   placeholder="depth"
          value={d2Val}
          onChange={(e) => {
            onD2Change(e.target.value);
          }}
        />
        <div style={{marginLeft:'auto'}} className="muted">
            area: { (area || 0).toFixed(2) } sq ft
        </div>
      </div>
      <div
        className="muted"
        style={{ display: "flex", gap: 16, fontSize: 12, marginTop: 4 }}
      >
        <span>width (in)</span>
        <span>depth (in)</span>
      </div>
    </div>
  );
};

export default TwoDimensionalInput;
