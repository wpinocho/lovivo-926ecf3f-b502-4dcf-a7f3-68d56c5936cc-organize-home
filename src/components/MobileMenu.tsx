import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { STORE_ID } from '@/lib/config'

export const MobileMenu = () => {
  const [open, setOpen] = useState(false)

  const { data: collections = [] } = useQuery({
    queryKey: ['collections-mobile'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('collections')
        .select('*')
        .eq('status', 'active')
        .eq('store_id', STORE_ID)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data || []
    }
  })

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col space-y-4 mt-8">
          <Link 
            to="/" 
            className="text-lg font-light hover:text-primary transition-colors"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          
          {collections.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Collections
              </p>
              {collections.map((collection) => (
                <Link
                  key={collection.id}
                  to={`/collections/${collection.handle}`}
                  className="block text-lg font-light hover:text-primary transition-colors pl-4"
                  onClick={() => setOpen(false)}
                >
                  {collection.name}
                </Link>
              ))}
            </div>
          )}
          
          <Link 
            to="/blog" 
            className="text-lg font-light hover:text-primary transition-colors"
            onClick={() => setOpen(false)}
          >
            Blog
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}