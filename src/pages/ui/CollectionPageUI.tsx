import { useEffect } from "react"
import { EcommerceTemplate } from "@/templates/EcommerceTemplate"
import { ProductCard } from "@/components/ProductCard"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft } from "lucide-react"

interface CollectionPageUIProps {
  logic: {
    collection: any
    products: any[]
    loading: boolean
    notFound: boolean
    handleNavigateBack: () => void
  }
}

export const CollectionPageUI = ({ logic }: CollectionPageUIProps) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (logic.loading) {
    return (
      <EcommerceTemplate>
        <div className="space-y-8">
          <Skeleton className="h-96 w-full rounded-lg" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-96 rounded-lg" />
            ))}
          </div>
        </div>
      </EcommerceTemplate>
    )
  }

  if (logic.notFound || !logic.collection) {
    return (
      <EcommerceTemplate>
        <div className="text-center py-16">
          <h1 className="text-4xl font-light mb-4">Collection not found</h1>
          <p className="text-muted-foreground mb-8 font-light">
            The collection you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={logic.handleNavigateBack} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Button>
        </div>
      </EcommerceTemplate>
    )
  }

  return (
    <EcommerceTemplate>
      {/* Hero Section */}
      <section className="relative bg-secondary mb-16">
        <div className="aspect-[21/9] w-full overflow-hidden">
          {logic.collection.image ? (
            <img
              src={logic.collection.image}
              alt={logic.collection.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-secondary/50 flex items-center justify-center">
              <span className="text-muted-foreground text-lg font-light">
                {logic.collection.name}
              </span>
            </div>
          )}
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-4 tracking-tight">
              {logic.collection.name}
            </h1>
            {logic.collection.description && (
              <p className="text-lg text-foreground/80 max-w-2xl font-light leading-relaxed">
                {logic.collection.description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-light text-foreground tracking-tight">
                Products
              </h2>
              <p className="text-muted-foreground text-sm font-light mt-1">
                {logic.products.length} {logic.products.length === 1 ? 'product' : 'products'}
              </p>
            </div>
            <Button variant="outline" onClick={logic.handleNavigateBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </div>

          {logic.products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {logic.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground font-light">
                No products available in this collection yet.
              </p>
            </div>
          )}
        </div>
      </section>
    </EcommerceTemplate>
  )
}