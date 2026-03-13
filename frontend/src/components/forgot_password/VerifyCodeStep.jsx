import { useState, useEffect } from "react";

export default function VerifyCodeStep({ onSubmit, onResend }) {

  const [code, setCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); 

  useEffect(() => {

    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);

  }, [timeLeft]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(code);
  };

  const handleResend = () => {
    onResend();
    setTimeLeft(300);
  };

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return `${minutes}:${seconds.toString().padStart(2,"0")}`;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-md"
    >

      <input
        type="text"
        placeholder="Enter 4-digit code"
        value={code}
        onChange={(e)=>setCode(e.target.value)}
        className="border rounded-lg px-4 py-2 text-center tracking-widest text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        maxLength={4}
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Verify Code
      </button>

      <div className="text-center text-sm text-gray-500">
        Code expires in <span className="font-semibold">{formatTime()}</span>
      </div>

      <button
        type="button"
        onClick={handleResend}
        disabled={timeLeft > 0}
        className={`text-sm font-medium ${
          timeLeft > 0
          ? "text-gray-400 cursor-not-allowed"
          : "text-blue-600 hover:underline"
        }`}
      >
        Resend Code
      </button>

    </form>
  );
}