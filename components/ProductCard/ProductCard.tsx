"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { Product } from "@/types"
import { useProductStore } from "@/store/useProductStore"

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  const selection = useProductStore((state) => state.selections[product.id])
  const setSelection = useProductStore((state) => state.setSelection)
  const purchaseProduct = useProductStore((state) => state.purchaseProduct)

  const cardRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const revealRef = useRef<HTMLDivElement>(null)
  const isOpenRef = useRef(false)

  const activeVariation = selection
    ? product.variation_colors?.[selection.selectedColorIndex]
    : undefined

  const getEclipseClass = (colorName: string) => {
    const colors: Record<string, string> = {
      White: "bg-[#C1FF72]",
      Red: "bg-[#912C36]",
      Black: "bg-[#6B128A]",
    }
    return colors[colorName] || "bg-zinc-700"
  }

  useEffect(() => {
    const store = useProductStore.getState()

    if (store.selections[product.id]) return

    if (!product.variation_colors?.length) {
      setSelection(product.id, { isVariantProduct: false })
      return
    }

    const firstSizeId =
      product.variation_colors[0]?.sizes?.[0]?.variation_product_id ?? null

    setSelection(product.id, {
      selectedColorIndex: 0,
      selectedVariationProductId: firstSizeId,
      isVariantProduct: true,
    })
  }, [product.id, product.variation_colors, setSelection])

  useEffect(() => {
    if (typeof window === "undefined") return
    if (!cardRef.current || !contentRef.current || !revealRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out", duration: 0.4 },
      })

      tl.set(cardRef.current, { zIndex: 50 })
        .to(contentRef.current, { y: -60 })
        .to(
          revealRef.current,
          {
            autoAlpha: 1,
            y: -180,
            duration: 0.6,
            ease: "expo.out",
          },
          "-=0.3"
        )
        .fromTo(
          revealRef.current!.children,
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.05 },
          "-=0.4"
        )

      const card = cardRef.current!

      const handleEnter = () => {
        if (isOpenRef.current) return
        isOpenRef.current = true
        tl.play()
      }

      const handleLeave = (e: PointerEvent) => {
        const related = e.relatedTarget as HTMLElement | null

        if (card.contains(related)) return

        isOpenRef.current = false
        tl.reverse()
      }

      card.addEventListener("pointerenter", handleEnter)
      card.addEventListener("pointerleave", handleLeave)

      return () => {
        card.removeEventListener("pointerenter", handleEnter)
        card.removeEventListener("pointerleave", handleLeave)
      }
    }, cardRef)

    return () => ctx.revert()
  }, [])

  if (!selection) return null

  return (
    <div
      ref={cardRef}
      className="relative isolate bg-[#232323] h-101.25 w-78 shrink-0 mb-10 flex flex-col overflow-hidden"
    >
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center pt-6"
      >
        <div className="absolute z-10 w-full -top-10">
          <Image
            src={
              activeVariation?.color_images[0] ||
              product.product_images[0].product_image
            }
            alt={product.name}
            width={375}
            height={487}
            unoptimized
            className="object-contain"
          />
        </div>

        <div className="relative z-10 mt-54">
          <p className="text-white font-extrabold text-[20px] leading-[100%] tracking-[-0.03em] text-center">
            {product.name.toUpperCase()}
          </p>
        </div>
      </div>

      <div
        ref={revealRef}
        className="absolute -bottom-45 left-0 right-0 px-6 flex flex-col gap-4 opacity-0 z-30 py-6 bg-[#232323]"
      >
        {activeVariation && (
          <div className="flex items-center justify-between">
            <span className="text-white font-medium text-[16px] uppercase">
              Size:
            </span>
            <div className="flex gap-1">
              {activeVariation.sizes.map((s) => (
                <button
                  key={s.variation_product_id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelection(product.id, {
                      selectedVariationProductId: s.variation_product_id,
                    })
                  }}
                  className={`w-7 h-7 rounded text-[10px] font-bold transition-all cursor-pointer ${
                    selection.selectedVariationProductId ===
                    s.variation_product_id
                      ? "bg-[#372224] text-white"
                      : "bg-white text-[#372224] hover:bg-[#ddd]"
                  }`}
                >
                  {s.size_name}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-white font-medium text-[16px] uppercase">
            Color:
          </span>
          <div className="flex gap-2">
            {product.variation_colors.map((c, i) => {
              const firstSize = c.sizes[0]?.variation_product_id ?? null

              return (
                <button
                  key={c.color_id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelection(product.id, {
                      selectedColorIndex: i,
                      selectedVariationProductId: firstSize,
                    })
                  }}
                  className={`w-4 h-4 rounded-full border-2 transition-transform cursor-pointer ${
                    selection.selectedColorIndex === i
                      ? "border-white scale-125"
                      : "border-transparent"
                  } ${getEclipseClass(c.color_name)}`}
                />
              )
            })}
          </div>
        </div>

        <button
          onClick={() => purchaseProduct(product.id)}
          disabled={
            selection.isVariantProduct && !selection.selectedVariationProductId
          }
          className="w-full cursor-pointer bg-white text-black font-extrabold py-3 rounded-xl text-[14px] uppercase active:scale-95 transition-all shadow-2xl disabled:opacity-50"
        >
          Buy Now
        </button>
      </div>
    </div>
  )
}

export default ProductCard
