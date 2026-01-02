import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { apiRequest } from "@/lib/api-client"
import { ProductStore, ProductSelection } from "@/types"

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
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

        if (!selection) {
          set({
            error: "Invalid selection. Please choose a variation.",
            isLoading: false,
          })
          return
        }

        set({ isLoading: true, error: null })

        const payload =
          selection.isVariantProduct && selection.selectedVariationProductId
            ? { variation_product_id: selection.selectedVariationProductId }
            : { product_id: productId }

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
    }),
    {
      name: "nike-store-selections",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ selections: state.selections }),
    }
  )
)
