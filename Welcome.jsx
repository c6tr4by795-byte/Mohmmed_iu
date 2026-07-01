import { useState } from "react";

export default function Welcome() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
  };

  return (
    <div className="welcome">

      <h1>مرحباً 👋</h1>

      <p>أدخل الكود السري</p>

      <div className="inputs">
        {code.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
          />
        ))}
      </div>

      <button disabled={code.includes("")}>
        التالي
      </button>

    </div>
  );
}
