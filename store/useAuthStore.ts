import { create } from "zustand"
import { setCookie, deleteCookie } from "cookies-next"
import { apiRequest } from "@/lib/api-client"
import { AuthState } from "@/types"

export const useAuthStore = create<AuthState>((set, get) => ({
  step: "phone",
  phoneNumber: "",
  otp: ["", "", "", ""],
  seconds: 34,
  error: null,
  isLoading: false,

  setStep: (step) => set({ step }),
  setPhoneNumber: (phone) => set({ phoneNumber: phone }),

  clearError: () => set({ error: null }),

  setOtpDigit: (index, value) =>
    set((state) => {
      const newOtp = [...state.otp]
      newOtp[index] = value
      return { otp: newOtp }
    }),

  decrementTimer: () =>
    set((state) => ({
      seconds: state.seconds > 0 ? state.seconds - 1 : 0,
    })),

  resetTimer: () => set({ seconds: 34 }),

  requestOtp: async () => {
    set({ isLoading: true, error: null })
    try {
      await apiRequest("/verify/", {
        method: "POST",
        body: JSON.stringify({ phone_number: get().phoneNumber }),
      })

      set({ step: "otp", seconds: 34, otp: ["", "", "", ""] })
    } catch (error) {
      console.error("OTP Request failed:", error)
      set({
        error:
          error instanceof Error
            ? error.message
            : "Failed to send OTP. Please try again.",
      })
    } finally {
      set({ isLoading: false })
    }
  },

  verifyOtp: async (inputOtp) => {
    set({ isLoading: true })
    try {
      const data = await apiRequest("/verify/", {
        method: "POST",
        body: JSON.stringify({
          phone_number: get().phoneNumber,
          otp: inputOtp,
        }),
      })

      if (data.user === true && data.token) {
        const token = data.token.access
        setCookie("auth_token", token)
        window.location.href = "/product-list"
        return { isNewUser: false }
      }

      set({ step: "name" })
      return { isNewUser: true }
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Invalid OTP. Please check and try again.",
      })
    } finally {
      set({ isLoading: false })
    }
  },

  registerUser: async (name) => {
    set({ isLoading: true })
    try {
      const data = await apiRequest("/login-register/", {
        method: "POST",
        body: JSON.stringify({
          name,
          phone_number: get().phoneNumber,
        }),
      })

      if (data.token) {
        const token = data.token.access
        setCookie("auth_token", token)
        window.location.href = "/product-list"
      }
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Registration failed. Please try again.",
      })
    } finally {
      set({ isLoading: false })
    }
  },

  logout: () => {
    deleteCookie("auth_token")
    set({ step: "phone", phoneNumber: "", otp: ["", "", "", ""], seconds: 34 })
    window.location.href = "/login"
  },
}))
