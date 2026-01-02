import OrderCard from "@/components/OrderCard/OrderCard"
import { apiServerRequest } from "@/lib/api-server"
import { OrderItem } from "@/types"

export default async function OrdersPage() {
  const data = await apiServerRequest("/user-orders/")
  return (
    <section className="min-h-screen bg-[#161616]">
      <div className="max-w-4xl  px-8 pt-12 pb-8">
        <h1 className="font-semibold text-[40px] leading-[100%] tracking-[-0.03em] text-white">
          My Orders
        </h1>
      </div>

      <div className="max-w-4xl  px-8">
        <div className="flex flex-col gap-4">
          {data?.orders?.map((order: OrderItem) => (
            <OrderCard key={order?.order_id} order={order} />
          ))}
        </div>

        {data?.orders?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-[#5E5E5E] font-medium text-[14px] leading-[100%] tracking-[-0.04em]">
              No orders yet
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
