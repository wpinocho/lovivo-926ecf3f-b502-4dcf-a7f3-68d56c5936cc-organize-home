import { ReactNode } from 'react'
import { PageTemplate } from './PageTemplate'
import { BrandLogoLeft } from '@/components/BrandLogoLeft'
import { SocialLinks } from '@/components/SocialLinks'
import { FloatingCart } from '@/components/FloatingCart'
import { ProfileMenu } from '@/components/ProfileMenu'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { useCartUI } from '@/components/CartProvider'
import { useCart } from '@/contexts/CartContext'

interface EcommerceTemplateProps {
  children: ReactNode
  pageTitle?: string
  showCart?: boolean
  className?: string
  headerClassName?: string
  footerClassName?: string
  layout?: 'default' | 'full-width' | 'centered'
}

export const EcommerceTemplate = ({
  children,
  pageTitle,
  showCart = true,
  className,
  headerClassName,
  footerClassName,
  layout = 'default'
}: EcommerceTemplateProps) => {
  const { openCart } = useCartUI()
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()

  const header = (
    <div className={`py-5 border-b border-border/50 ${headerClassName}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/">
              <BrandLogoLeft />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-8">
              <Link 
                to="/" 
                className="text-foreground/70 hover:text-foreground transition-colors text-sm font-light"
              >
                Home
              </Link>
              <Link 
                to="/blog" 
                className="text-foreground/70 hover:text-foreground transition-colors text-sm font-light"
              >
                Blog
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-2">
            <ProfileMenu />
            
            {showCart && (
              <Button
                variant="ghost"
                size="icon"
                onClick={openCart}
                className="relative hover:bg-secondary"
                aria-label="View cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </Button>
            )}
          </div>
        </div>

        {pageTitle && (
          <div className="mt-8">
            <h1 className="text-4xl font-light text-foreground tracking-tight">
              {pageTitle}
            </h1>
          </div>
        )}
      </div>
    </div>
  )

  const footer = (
    <div className={`bg-foreground text-background py-16 ${footerClassName}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="mb-4">
              <BrandLogoLeft />
            </div>
            <p className="text-background/70 font-light text-sm leading-relaxed">
              Minimalist storage solutions for modern living
            </p>
          </div>

          <div>
            <h3 className="font-normal mb-4 text-background text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <div className="space-y-2">
              <Link 
                to="/" 
                className="block text-background/70 hover:text-background transition-colors text-sm font-light"
              >
                Home
              </Link>
              <Link 
                to="/blog" 
                className="block text-background/70 hover:text-background transition-colors text-sm font-light"
              >
                Blog
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-normal mb-4 text-background text-sm uppercase tracking-wider">
              Follow Us
            </h3>
            <SocialLinks />
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/20 text-center text-background/70 text-sm font-light">
          <p>&copy; 2024 Your Store. All rights reserved.</p>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <PageTemplate 
        header={header}
        footer={footer}
        className={className}
        layout={layout}
      >
        {children}
      </PageTemplate>
      
      {showCart && <FloatingCart />}
    </>
  )
}