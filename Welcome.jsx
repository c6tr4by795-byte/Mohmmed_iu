import { useState } from "react";
import "./Welcome.css";

export default function Welcome() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      document.getElementById(`input-${index + 1}`).focus();
    }
  };

  return (
    <div className="welcome">
      <h1>مرحباً 👋</h1>

      <p>أدخل الكود السري</p>

      <div className="code">
        {code.map((item, index) => (
          <input
            key={index}
            id={`input-${index}`}
            type="text"
            maxLength="1"
            value={item}
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
