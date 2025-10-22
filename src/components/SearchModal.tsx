import { useState } from 'react'
import { Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { STORE_ID } from '@/lib/config'
import { Link } from 'react-router-dom'
import { useSettings } from '@/contexts/SettingsContext'

export const SearchModal = () => {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { formatMoney } = useSettings()

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['search-products', searchQuery],
    queryFn: async () => {
      if (!searchQuery.trim()) return []
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('status', 'active')
        .eq('store_id', STORE_ID)
        .ilike('title', `%${searchQuery}%`)
        .limit(5)

      if (error) throw error
      return data || []
    },
    enabled: searchQuery.length > 0
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Search products">
          <Search className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Search Products</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              autoFocus
            />
          </div>

          {searchQuery && (
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {isLoading ? (
                <p className="text-sm text-muted-foreground text-center py-8">Searching...</p>
              ) : products.length > 0 ? (
                products.map((product) => (
                  <Link
                    key={product.id}
                    to={`/products/${product.slug}`}
                    onClick={() => {
                      setOpen(false)
                      setSearchQuery('')
                    }}
                    className="flex items-center gap-4 p-3 hover:bg-secondary rounded-lg transition-colors"
                  >
                    {product.images && product.images[0] && (
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                    <div className="flex-1">
                      <h4 className="font-medium">{product.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {formatMoney(product.price)}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No products found for "{searchQuery}"
                </p>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}