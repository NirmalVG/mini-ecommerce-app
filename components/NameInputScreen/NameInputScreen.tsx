import { Label } from "@radix-ui/react-label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useAuthStore } from "@/store/useAuthStore"
import { useRef } from "react"

const NameInputScreen = () => {
  const nameRef = useRef<HTMLInputElement>(null)
  const { registerUser, error, isLoading, clearError } = useAuthStore()

  const handleContinue = () => {
    const nameValue = nameRef.current?.value
    if (!nameValue || nameValue.trim().length < 2) {
      useAuthStore.setState({ error: "Please enter a valid name" })
      return
    }
    registerUser(nameValue.trim())
  }

  return (
    <div className="px-4 md:px-0">
      <h1 className="text-white text-3xl md:text-4xl font-semibold text-center mb-8 md:mb-12">
        Welcome You Are ?
      </h1>

      <div className="space-y-5 md:space-y-6">
        <div>
          <Label
            htmlFor="name"
            className="text-white font-medium text-sm md:text-base mb-2 md:mb-3 block tracking-[-0.03em]"
          >
            Name
          </Label>

          <Input
            id="name"
            ref={nameRef}
            type="text"
            placeholder="Eg: John Mathew"
            onChange={() => error && clearError()}
            onKeyDown={(e) => e.key === "Enter" && handleContinue()}
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
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm py-3 px-4 rounded-lg animate-in fade-in zoom-in-95 duration-200">
            {error}
          </div>
        )}

        <Button
          onClick={handleContinue}
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
        >
          {isLoading ? "Saving..." : "Continue"}
        </Button>
      </div>
    </div>
  )
}

export default NameInputScreen
