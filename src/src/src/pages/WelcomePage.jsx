import { useState } from "react";

const SECRET_PIN = "011029";

export default function WelcomePage({ onSuccess }) {
  const [pin, setPin] = useState("");

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setPin(value);
  };

  const handleLogin = () => {
    if (pin === SECRET_PIN) {
      onSuccess();
      return;
    }

    alert("الرمز السري غير صحيح");
    setPin("");
  };

  return (
    <div className="welcome-page">

      <div className="logo-box">
        <div className="logo-circle">
          M
        </div>
      </div>

      <h1 className="title">
        مرحباً 👋
      </h1>

      <p className="subtitle">
        أدخل الرمز السري للمتابعة
      </p>

      <div className="pin-wrapper">

        {[0,1,2,3,4,5].map((i)=>(
          <div className="pin-box" key={i}>
            {pin[i] || ""}
          </div>
        ))}

        <input
          className="hidden-input"
          autoFocus
          type="tel"
          inputMode="numeric"
          maxLength={6}
          value={pin}
          onChange={handleChange}
        />

      </div>

      <button
        className="login-btn"
        onClick={handleLogin}
      >
        التالي
      </button>

    </div>
  );
}
