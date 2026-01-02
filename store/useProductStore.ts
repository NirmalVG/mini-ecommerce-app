import { create } from "zustand"
import { apiRequest } from "@/lib/api-client"
import { ProductStore, ProductSelection } from "@/types"

export const useProductStore = create<ProductStore>((set, get) => ({
  selections: {},
  isLoading: false,
  error: null,

  setSelection: (productId, selection) =>
    set((state) => {
      const defaultSelection: ProductSelection = {
        selectedColorIndex: 0,
        selectedVariationProductId: null,
        isVariantProduct: false,
      }

      return {
        selections: {
          ...state.selections,
          [productId]: {
            ...defaultSelection,
            ...(state.selections[productId] ?? {}),
            ...selection,
          },
        },
      }
    }),

  clearError: () => set({ error: null }),

  purchaseProduct: async (productId) => {
    const selection = get().selections[productId]
    set({ isLoading: true, error: null })

    if (!selection) {
      set({
        error: "Invalid selection. Please choose a variation.",
        isLoading: false,
      })
      return
    }

    const payload =
      selection.isVariantProduct && selection.selectedVariationProductId
        ? { variation_product_id: selection.selectedVariationProductId }
        : { product_id: productId }

    set({ isLoading: true })

    try {
      await apiRequest("/purchase-product/", {
        method: "POST",
        body: JSON.stringify(payload),
      })

      window.location.href = "/success"
    } catch (error) {
      set({
        error:
          (error instanceof Error ? error.message : String(error)) ||
          "Purchase failed. Please try again.",
      })
    } finally {
      set({ isLoading: false })
    }
  },
}))
