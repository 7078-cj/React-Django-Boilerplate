import { useState } from "react";
import EmailStep from "../components/forgot_password/EmailStep";
import VerifyCodeStep from "../components/forgot_password/VerifyCodeStep";
import ResetPasswordStep from "../components/forgot_password/ResetPasswordStep";
import { requestReset, resendCode, resetPassword, verifyCode } from "../utils/forgot_password";
import { useNavigate } from "react-router-dom";



export default function ForgotPasswordPage() {

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const nav = useNavigate()

  const handleRequestReset = async (emailInput) => {

    const data = await requestReset(emailInput);

    if (data.message) {
      setEmail(emailInput);
      setStep(2);
      setMessage(data.message);
    } else {
      setMessage(data.error);
    }
  };

  const handleVerifyCode = async (codeInput) => {

    const data = await verifyCode(email, codeInput);

    if (data.message) {
      setCode(codeInput);
      setStep(3);
    } else {
      setMessage(data.error);
    }
  };

  const handleResetPassword = async (password) => {

    const data = await resetPassword(email, code, password);

    if (data.message) {
      setMessage(data.message);
      nav('/')
    } else {
      setMessage(data.error);
    }
  };

  const handleResendCode = async () => {

    const data = await resendCode(email);
    setMessage(data.message || data.error);
  };

  return (
    <div style={{maxWidth: "400px", margin: "auto"}}>

      <h2>Forgot Password</h2>

      {message && <p>{message}</p>}

      {step === 1 && (
        <EmailStep onSubmit={handleRequestReset}/>
      )}

      {step === 2 && (
        <VerifyCodeStep
          onSubmit={handleVerifyCode}
          onResend={handleResendCode}
        />
      )}

      {step === 3 && (
        <ResetPasswordStep onSubmit={handleResetPassword}/>
      )}

    </div>
  );
}