import { OrderProps } from "@/types"
import Image from "next/image"

const OrderDetailsCard = ({ order }: OrderProps) => {
  return (
    <div className="w-full bg-[#292929] rounded-lg p-3 md:p-4 mb-6 md:mb-8 border border-gray-800">
      <div className="flex gap-3 md:gap-4 items-center">
        <div className="shrink-0">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center overflow-hidden relative">
            <Image
              src="/images/order-img.webp"
              alt={order?.product_name || "Product Image"}
              fill
              sizes="(max-width: 768px) 100vw, 448px"
              className="object-contain"
            />
          </div>
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start w-full gap-3">
            <div>
              <h2 className="text-white font-semibold text-sm md:text-[16.57px] leading-tight md:leading-[18.64px] tracking-[-0.03em]">
                {order?.product_name || "Nike Product"}
              </h2>

              <p className="text-gray-400 text-xs md:text-[14px] font-medium leading-[100%] tracking-[-0.04em] mt-1">
                {order?.order_id}
              </p>
            </div>

            <div className="flex flex-col items-end md:flex-row md:items-baseline gap-1 md:gap-2">
              <span className="text-white font-semibold text-sm md:text-[16.57px] leading-tight md:leading-[18.64px] tracking-[-0.03em]">
                ₹{order?.product_price}
              </span>

              <span className="text-gray-500 font-normal text-xs md:text-[13.46px] leading-tight md:leading-[18.64px] line-through">
                ₹{order?.product_mrp}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetailsCard
