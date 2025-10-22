import { useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { EcommerceTemplate } from "@/templates/EcommerceTemplate"
import { ShoppingCart, ArrowLeft, Plus, Minus } from "lucide-react"
import { Link } from "react-router-dom"
import { HeadlessReviews } from "@/components/headless/HeadlessReviews"
import { ReviewsUI } from "@/components/ui/ReviewsUI"
import { ReviewFormUI } from "@/components/ui/ReviewFormUI"

interface ProductPageUIProps {
  logic: {
    product: any
    loading: boolean
    notFound: boolean
    selected: Record<string, string>
    quantity: number
    matchingVariant: any
    currentPrice: number
    currentCompareAt: number | null
    currentImage: string | null
    inStock: boolean
    handleOptionSelect: (optionName: string, value: string) => void
    handleQuantityChange: (quantity: number) => void
    handleAddToCart: () => void
    handleNavigateBack: () => void
    isOptionValueAvailable: (optionName: string, value: string) => boolean
    formatMoney: (amount: number) => string
    [key: string]: any
  }
}

export const ProductPageUI = ({ logic }: ProductPageUIProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (logic.loading) {
    return (
      <EcommerceTemplate>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Skeleton className="aspect-square rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </EcommerceTemplate>
    )
  }

  if (logic.notFound) {
    return (
      <EcommerceTemplate>
        <div className="text-center py-16">
            <h1 className="text-4xl font-bold mb-4">Product not found</h1>
            <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist or has been deleted.</p>
            <Button asChild>
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to home
              </Link>
            </Button>
        </div>
      </EcommerceTemplate>
    )
  }

  if (!logic.product) return null

  return (
    <EcommerceTemplate>
      <div className="space-y-16">
        {/* Product Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="aspect-square rounded-lg overflow-hidden bg-muted">
            <img
              src={logic.currentImage || "/placeholder.svg"}
              alt={logic.product.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-light tracking-tight">{logic.product.title}</h1>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-2xl font-medium">
                  {logic.formatMoney(logic.currentPrice)}
                </span>
                {logic.currentCompareAt && logic.currentCompareAt > logic.currentPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    {logic.formatMoney(logic.currentCompareAt)}
                  </span>
                )}
              </div>
            </div>

            {logic.product.description && (
              <div>
                <h3 className="font-medium mb-2">Description</h3>
                <div 
                  className="text-muted-foreground prose prose-sm max-w-none font-light"
                  dangerouslySetInnerHTML={{ __html: logic.product.description }}
                />
              </div>
            )}

            {/* Product Options */}
            {logic.product.options && logic.product.options.length > 0 && (
              <div className="space-y-4">
                {logic.product.options.map((option: any) => (
                  <div key={option.name}>
                    <Label className="text-base font-medium">{option.name}</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {option.values.map((value: string) => {
                        const isSelected = logic.selected[option.name] === value
                        const isAvailable = logic.isOptionValueAvailable(option.name, value)
                        
                        return (
                          <Button
                            key={value}
                            variant={isSelected ? "default" : "outline"}
                            size="sm"
                            disabled={!isAvailable}
                            onClick={() => logic.handleOptionSelect(option.name, value)}
                            className={!isAvailable ? "opacity-50 cursor-not-allowed" : ""}
                          >
                            {value}
                            {!isAvailable && (
                              <span className="ml-1 text-xs">(Out of stock)</span>
                            )}
                          </Button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Label htmlFor="quantity" className="text-base font-medium">
                  Quantity
                </Label>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => logic.handleQuantityChange(Math.max(1, logic.quantity - 1))}
                    disabled={logic.quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={logic.quantity}
                    onChange={(e) => logic.handleQuantityChange(parseInt(e.target.value) || 1)}
                    className="w-20 text-center"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => logic.handleQuantityChange(logic.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Button
                  onClick={logic.handleAddToCart}
                  disabled={!logic.inStock}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 group relative overflow-hidden"
                  size="lg"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
                  <ShoppingCart className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                  <span className="relative z-10">
                    {logic.inStock ? 'Add to cart' : 'Out of stock'}
                  </span>
                </Button>
                
                {!logic.inStock && (
                  <Badge variant="secondary">Out of stock</Badge>
                )}
              </div>
            </div>

            {/* Product Info */}
            {logic.matchingVariant && (
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-medium mb-2">Product information</h3>
                  <div className="space-y-2 text-sm text-muted-foreground font-light">
                    <div className="flex justify-between">
                      <span>SKU:</span>
                      <span>{logic.matchingVariant.sku || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Available stock:</span>
                      <span>{logic.matchingVariant.inventory_quantity || 0}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Separator />

            <Button
              variant="outline"
              onClick={logic.handleNavigateBack}
              className="w-full"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue shopping
            </Button>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-light tracking-tight mb-8">Customer Reviews</h2>
          
          <HeadlessReviews productId={logic.product.id}>
            {(reviewLogic) => (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Reviews List */}
                <div className="lg:col-span-2">
                  <ReviewsUI
                    reviews={reviewLogic.reviews}
                    loading={reviewLogic.loading}
                    averageRating={reviewLogic.averageRating}
                    reviewCount={reviewLogic.reviewCount}
                  />
                </div>

                {/* Review Form */}
                <div>
                  <ReviewFormUI
                    onSubmit={reviewLogic.submitReview}
                    submitting={reviewLogic.submitting}
                    isAuthenticated={reviewLogic.isAuthenticated}
                  />
                </div>
              </div>
            )}
          </HeadlessReviews>
        </div>
      </div>
    </EcommerceTemplate>
  )
}