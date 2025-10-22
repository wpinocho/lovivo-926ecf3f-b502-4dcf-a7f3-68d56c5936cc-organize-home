import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { type Collection } from '@/lib/supabase'

interface CollectionCardProps {
  collection: Collection
  onViewProducts: (collectionId: string) => void
}

export const CollectionCard = ({ collection, onViewProducts }: CollectionCardProps) => {
  return (
    <Card className="bg-card border-border/50 overflow-hidden hover:border-primary/30 transition-all duration-300 group">
      <CardContent className="p-0">
        <div className="aspect-[16/10] bg-secondary/50 overflow-hidden">
          {collection.image ? (
            <img 
              src={collection.image} 
              alt={collection.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              No image
            </div>
          )}
        </div>
        
        <div className="p-6">
          <h3 className="text-foreground font-normal text-xl mb-2 tracking-tight">
            {collection.name}
          </h3>
          
          {collection.description && (
            <p className="text-muted-foreground text-sm mb-5 line-clamp-2 font-light leading-relaxed">
              {collection.description}
            </p>
          )}
          
          <Button 
            variant="outline" 
            className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all"
            onClick={() => onViewProducts(collection.id)}
          >
            View Products
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}