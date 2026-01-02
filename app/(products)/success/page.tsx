import OrderDetailsCard from "@/components/OrderDetailsCard/OrderDetailsCard"

import Image from "next/image"
import { apiServerRequest } from "@/lib/api-server"

export default async function SuccessPage() {
  const response = await apiServerRequest("/user-orders/")

  const latestOrder = response?.orders?.[0] || null
  return (
    <section className="min-h-screen bg-[#161616] flex items-center justify-center p-4">
      <div className="w-full max-w-md flex flex-col items-center">
        <div className="mb-8">
          <Image src="/images/logo.png" alt="Logo" width={106} height={56} />
        </div>

        <h1 className="font-bold text-[36px] leading-[100%] tracking-[-0.04em] text-white text-center mb-5">
          Successfully Ordered!
        </h1>

        <p className="text-[#a2a2a2] font-medium text-[14px] leading-[100%] tracking-[-0.04em] mb-8">
          {latestOrder?.created_date}
        </p>

        {latestOrder ? (
          <OrderDetailsCard order={latestOrder} />
        ) : (
          <div className="text-white/20 italic mb-8">
            No order details found.
          </div>
        )}
      </div>
    </section>
  )
}
