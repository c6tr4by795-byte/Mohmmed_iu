import { useState } from "react";
import { checkPin } from "../utils/pin";
import PinInput from "./PinInput";

export default function Welcome({ onSuccess }) {
  const [pin, setPin] = useState("");

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);

    setPin(value);

    if (value.length === 6) {
      if (checkPin(value)) {
        onSuccess();
      } else {
        alert("الرمز السري غير صحيح");
        setPin("");
      }
    }
  };

  return (
    <div className="welcome">
      <h1>مرحباً 👋</h1>

      <p>أدخل الرمز السري للمتابعة</p>

      <PinInput
        value={pin}
        onChange={handleChange}
      />
    </div>
  );
}
