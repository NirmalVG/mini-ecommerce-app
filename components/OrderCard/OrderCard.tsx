import { OrderItem } from "@/types"
import Image from "next/image"

const OrderCard = ({ order }: { order: OrderItem }) => {
  return (
    <div className="w-full bg-[#292929] rounded-xl p-3 md:p-4 transition-colors mb-3 md:mb-4">
      <div className="flex gap-3 md:gap-4 items-start">
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
            <div className="space-y-1">
              <h2 className="text-white font-medium text-base md:text-[20px] leading-tight md:leading-[100%] tracking-[-0.04em]">
                {order?.product_name}
              </h2>

              <p className="text-[#A9A9A9] font-semibold text-xs md:text-[15px] leading-tight md:leading-[100%] tracking-[-0.04em]">
                {order?.order_id}
              </p>
            </div>

            <div className="flex flex-col items-end md:flex-row md:items-baseline gap-1 md:gap-2">
              <span className="text-white font-semibold text-sm md:text-[16.57px] leading-tight md:leading-[18.64px] tracking-[-0.03em]">
                ₹{order?.product_price.toLocaleString()}
              </span>

              <span className="text-[#838383] font-normal text-xs md:text-[13.46px] leading-tight md:leading-[18.64px] line-through">
                ₹{order?.product_mrp?.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="mt-3 md:mt-4">
            <p className="text-[#A9A9A9] font-medium text-xs md:text-[13px] leading-[100%] tracking-[-0.04em]">
              {order?.created_date}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderCard
