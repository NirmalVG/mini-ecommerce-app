"use client"
import PhoneInputScreen from "../PhoneInputScreen/PhoneInputScreen"
import OtpInputScreen from "../OtpInputScreen/OtpInputScreen"
import NameInputScreen from "../NameInputScreen/NameInputScreen"
import { useAuthStore } from "@/store/useAuthStore"

const Login = () => {
  const step = useAuthStore((state) => state.step)
  return (
    <div>
      {step === "phone" && <PhoneInputScreen />}
      {step === "otp" && <OtpInputScreen />}
      {step === "name" && <NameInputScreen />}
    </div>
  )
}

export default Login
