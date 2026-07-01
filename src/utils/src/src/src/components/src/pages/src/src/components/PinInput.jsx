export default function PinInput({ value, onChange }) {
  return (
    <div className="pin-boxes">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div className="pin-box" key={i}>
          {value[i] || ""}
        </div>
      ))}

      <input
        className="pin-hidden"
        type="tel"
        inputMode="numeric"
        maxLength={6}
        value={value}
        onChange={onChange}
        autoFocus
      />
    </div>
  );
}
