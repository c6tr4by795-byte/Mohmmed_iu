import { useState } from "react";
import { checkPin } from "../utils/pin";
import PinInput from "./PinInput";
import PrimaryButton from "./PrimaryButton";

export default function Welcome({ onSuccess }) {
  const [pin, setPin] = useState("");

  const handleChange = (e) => {
    setPin(e.target.value.replace(/\D/g, "").slice(0, 6));
  };

  const handleLogin = () => {
    if (checkPin(pin)) {
      onSuccess();
    } else {
      alert("الرمز السري غير صحيح");
      setPin("");
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

      <PrimaryButton onClick={handleLogin}>
        التالي
      </PrimaryButton>
    </div>
  );
}
