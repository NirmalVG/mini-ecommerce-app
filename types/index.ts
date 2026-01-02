export interface AuthState {
  step: "phone" | "otp" | "name"
  phoneNumber: string
  otp: string[]
  seconds: number
  isLoading: boolean
  error: string | null

  setStep: (step: "phone" | "otp" | "name") => void
  setPhoneNumber: (phone: string) => void
  setOtpDigit: (index: number, value: string) => void
  decrementTimer: () => void
  resetTimer: () => void
  clearError: () => void

  requestOtp: () => Promise<void>
  verifyOtp: (inputOtp: string) => Promise<{ isNewUser: boolean } | undefined>
  registerUser: (name: string) => Promise<void>
  logout: () => void
}

export interface OrderItem {
  created_date: string
  order_id: string
  product_name?: string
  product_price: number
  quantity: number
  product_amount: number
  product_mrp?: number
}

export interface ProductSize {
  size_id: number
  variation_product_id: number
  size_name: string
  price: number
}

export interface VariationColor {
  color_id: number
  color_name: string
  color_images: string[]
  sizes: ProductSize[]
}

export interface Product {
  id: string
  name: string
  product_images: { product_image: string }[]
  variation_colors: VariationColor[]
  sale_price: number
  mrp: number
  discount: number
  slug: string
}

export interface ProductSelection {
  selectedColorIndex: number
  selectedVariationProductId: number | null
  isVariantProduct: boolean
}

export interface ProductStore {
  selections: Record<string, ProductSelection>
  isLoading: boolean
  error: string | null

  setSelection: (
    productId: string,
    selection: Partial<ProductSelection>
  ) => void

  clearError: () => void

  purchaseProduct: (productId: string) => Promise<void>
}

export interface OrderProps {
  order: {
    created_date: string
    order_id: string
    product_name?: string
    product_price: number
    quantity: number
    product_amount: number
    product_mrp?: number
  }
}
