import { useState } from "react";
import { checkPin } from "../utils/pin";

export default function Welcome({ onSuccess }) {
  const [pin, setPin] = useState("");

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setPin(value);

    if (value.length === 6 && checkPin(value)) {
      onSuccess();
    }
  };

  return (
    <div className="welcome">
      <h1>مرحباً 👋</h1>

      <p>أدخل الرمز السري</p>

      <input
        type="password"
        inputMode="numeric"
        maxLength={6}
        value={pin}
        onChange={handleChange}
        placeholder="******"
      />
    </div>
  );
}
