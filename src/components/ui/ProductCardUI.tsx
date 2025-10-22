import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { HeadlessProductCard } from "@/components/headless/HeadlessProductCard"
import type { Product } from "@/lib/supabase"

interface ProductCardUIProps {
  product: Product
}

export const ProductCardUI = ({ product }: ProductCardUIProps) => {
  return (
    <HeadlessProductCard product={product}>
      {(logic) => (
        <Card className="bg-card border-border/50 hover:border-primary/30 transition-all duration-300 group">
          <CardContent className="p-0">
            <Link to={`/products/${logic.product.slug}`} className="block">
              <div className="aspect-square bg-secondary/50 rounded-t-lg overflow-hidden relative">
                {(logic.matchingVariant?.image || (logic.product.images && logic.product.images.length > 0)) ? (
                  <img
                    src={(logic.matchingVariant?.image as any) || logic.product.images![0]}
                    alt={logic.product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No image
                  </div>
                )}

                {logic.discountPercentage && (
                  <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-medium">
                    -{logic.discountPercentage}%
                  </span>
                )}
              </div>
            </Link>

            <div className="p-5">
              <Link to={`/products/${logic.product.slug}`}>
                <h3 className="text-foreground font-normal text-base mb-2 line-clamp-2 hover:text-primary transition-colors">
                  {logic.product.title}
                </h3>
              </Link>

              {logic.hasVariants && logic.options && (
                <div className="mb-4 space-y-3">
                  {logic.options.map((opt) => (
                    <div key={opt.id}>
                      <div className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                        {opt.name}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {opt.values.filter(val => logic.isOptionValueAvailable(opt.name, val)).map((val) => {
                          const isSelected = logic.selected[opt.name] === val
                          const swatch = opt.name.toLowerCase() === 'color' ? opt.swatches?.[val] : undefined

                          if (swatch) {
                            return (
                              <button
                                key={val}
                                type="button"
                                onClick={() => logic.handleOptionChange(opt.name, val)}
                                title={`${opt.name}: ${val}`}
                                className={`h-8 w-8 rounded-full border-2 transition-all ${
                                  isSelected ? 'border-primary scale-110' : 'border-border hover:border-primary/50'
                                }`}
                                style={{ backgroundColor: swatch }}
                                aria-label={`${opt.name}: ${val}`}
                              />
                            )
                          }

                          return (
                            <button
                              key={val}
                              type="button"
                              onClick={() => logic.handleOptionChange(opt.name, val)}
                              className={`border rounded px-3 py-1.5 text-xs font-medium transition-all ${
                                isSelected 
                                  ? 'border-primary bg-primary text-primary-foreground' 
                                  : 'border-border bg-background text-foreground hover:border-primary/50'
                              }`}
                              aria-pressed={isSelected}
                              aria-label={`${opt.name}: ${val}`}
                            >
                              {val}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between mt-4">
                <div className="flex flex-col">
                  <span className="text-foreground font-medium text-lg">
                    {logic.formatMoney(logic.currentPrice)}
                  </span>
                  {logic.currentCompareAt && logic.currentCompareAt > logic.currentPrice && (
                    <span className="text-muted-foreground text-sm line-through">
                      {logic.formatMoney(logic.currentCompareAt)}
                    </span>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    logic.onAddToCartSuccess()
                    logic.handleAddToCart()
                  }}
                  disabled={!logic.canAddToCart}
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground disabled:opacity-50 transition-all"
                >
                  {logic.inStock ? 'Add' : 'Out of stock'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </HeadlessProductCard>
  )
}