export default function WizardSteps({ step = 1 }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center", margin: "12px 0" }}>
      {[1, 2, 3].map(n => (
        <div
          key={n}
          style={{
            width: 32, height: 32, borderRadius: "50%",
            border: "2px solid #999",
            display: "grid", placeItems: "center",
            background: n === step ? "#ffcccc" : "white",
            fontWeight: 600
          }}
        >
          {n}
        </div>
      ))}
    </div>
  );
}
