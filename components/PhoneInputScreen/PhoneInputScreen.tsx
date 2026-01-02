import { useAuthStore } from "@/store/useAuthStore"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

const PhoneInputScreen = () => {
  const { setPhoneNumber, requestOtp, isLoading, error, clearError } =
    useAuthStore()

  const handlePhoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (error) clearError()
    const input = e.target.value
    const sanitizedInput = input.replace(/\D/g, "").slice(0, 10)
    e.target.value = sanitizedInput
    setPhoneNumber(sanitizedInput)
  }

  return (
    <div className="px-4 sm:px-0">
      <h1 className="text-white text-3xl md:text-4xl font-semibold text-center mb-8 md:mb-12">
        Log In
      </h1>

      <div className="space-y-5 md:space-y-6">
        <div>
          <Label
            htmlFor="phone"
            className="text-white font-medium text-sm md:text-base mb-2 md:mb-3 block tracking-[-0.03em]"
          >
            Phone
          </Label>

          <Input
            id="phone"
            type="tel"
            placeholder="Enter Phone"
            onChange={handlePhoneInputChange}
            className="
              bg-[#191919]
              w-full md:w-150
              border-gray-800
              text-white
              placeholder:text-[#5E5E5E]
              rounded-lg
              h-11 md:h-12
              px-4
              text-sm md:text-base
            "
          />
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm py-3 px-4 rounded-lg animate-in fade-in slide-in-from-top-1">
            {error}
          </div>
        )}

        <Button
          className="
            w-full
            bg-white
            text-black
            font-semibold
            text-sm md:text-base
            h-11 md:h-12
            rounded-lg
            hover:bg-gray-100
            transition-colors
          "
          onClick={requestOtp}
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Continue"}
        </Button>
      </div>
    </div>
  )
}

export default PhoneInputScreen
