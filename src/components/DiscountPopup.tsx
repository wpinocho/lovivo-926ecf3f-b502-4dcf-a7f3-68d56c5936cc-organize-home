import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

export const DiscountPopup = () => {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')

  useEffect(() => {
    // Check if user has already seen the popup
    const hasSeenPopup = localStorage.getItem('discount-popup-seen')
    
    if (!hasSeenPopup) {
      // Show popup after 2 seconds
      const timer = setTimeout(() => {
        setOpen(true)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setOpen(false)
    localStorage.setItem('discount-popup-seen', 'true')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the email to your newsletter service
    console.log('Newsletter signup:', email)
    handleClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-10"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        <div className="grid md:grid-cols-2">
          {/* Image side */}
          <div className="hidden md:block bg-primary/10 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-6">
                <div className="text-6xl font-light text-primary mb-2">10%</div>
                <div className="text-lg font-light text-foreground">OFF</div>
              </div>
            </div>
          </div>

          {/* Content side */}
          <div className="p-8 space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-light tracking-tight">Welcome!</h2>
              <p className="text-sm text-muted-foreground font-light">
                Get 10% off your first order when you join our newsletter
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                />
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Get 10% Off
              </Button>

              <p className="text-xs text-muted-foreground text-center font-light">
                By signing up, you agree to receive marketing emails
              </p>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}