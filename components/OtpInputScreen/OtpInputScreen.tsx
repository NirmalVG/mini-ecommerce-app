"use client"

import { Pencil } from "lucide-react"
import { useAuthStore } from "@/store/useAuthStore"
import { useEffect } from "react"

const OtpInputScreen = () => {
  const {
    otp,
    setOtpDigit,
    phoneNumber,
    verifyOtp,
    isLoading,
    setStep,
    seconds,
    decrementTimer,
    requestOtp,
  } = useAuthStore()

  useEffect(() => {
    if (seconds === 0) return
    const timer = setInterval(() => decrementTimer(), 1000)
    return () => clearInterval(timer)
  }, [seconds, decrementTimer])

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1 || !/^\d*$/.test(value)) return
    setOtpDigit(index, value)
    if (value && index < 3) {
      const nextInput = document.getElementById(
        `otp-${index + 1}`
      ) as HTMLInputElement
      nextInput?.focus()
    }
  }

  return (
    <div className="w-full px-4 md:px-0">
      <h1 className="text-white text-3xl md:text-4xl font-semibold text-center mb-3 md:mb-4 tracking-tight">
        Verify phone
      </h1>

      <p className="text-white text-xs md:text-sm text-center mb-8 md:mb-12 flex items-center justify-center gap-2">
        Enter the OTP sent to {phoneNumber}
        <button
          onClick={() => setStep("phone")}
          className="p-1 hover:bg-white/10 rounded-full transition-colors"
        >
          <Pencil size={14} className="opacity-60" />
        </button>
      </p>

      <div className="space-y-6 md:space-y-8">
        <div>
          <label className="text-white font-medium mb-3 md:mb-4 block text-sm md:text-[16px]">
            Enter OTP
          </label>

          <div className="flex justify-between gap-2 md:gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className="
                  w-16 h-16
                  md:w-34.5 md:h-21.75
                  bg-[#191919]
                  text-white
                  text-xl md:text-2xl
                  text-center
                  rounded-lg
                  border border-gray-800
                  focus:border-white
                  outline-none
                "
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5 md:gap-6">
          <p className="text-[#5E5E5E] text-xs md:text-sm">
            {seconds > 0 ? (
              <>
                Resend OTP in{" "}
                <span className="text-white font-semibold">{seconds}s</span>
              </>
            ) : (
              <button
                onClick={requestOtp}
                className="text-white font-semibold hover:underline"
              >
                Resend OTP
              </button>
            )}
          </p>

          <button
            onClick={() => verifyOtp(otp.join(""))}
            disabled={isLoading}
            className="
              w-full
              bg-white
              text-black
              font-semibold
              text-sm md:text-base
              py-3 md:py-4
              rounded-lg
              hover:bg-gray-100
              transition-colors
              disabled:bg-gray-400
            "
          >
            {isLoading ? "Verifying..." : "Verify"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default OtpInputScreen
