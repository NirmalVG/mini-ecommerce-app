import ProductCard from "@/components/ProductCard/ProductCard"
import { apiServerRequest } from "@/lib/api-server"
import { Product } from "@/types"

export default async function ProductListPage() {
  const products: Product[] = await apiServerRequest("/new-products/")

  return (
    <section className="bg-[#161616] min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-white font-semibold text-[28px] md:text-[40px] mb-8 md:mb-12 text-center md:text-left">
          Men's Jordan Shoes
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center xl:justify-between">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
