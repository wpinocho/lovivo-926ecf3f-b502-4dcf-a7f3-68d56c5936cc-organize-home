import { Link } from 'react-router-dom'

export const AnnouncementBar = () => {
  return (
    <div className="bg-primary text-primary-foreground py-2 text-center text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="font-light">
          Free Shipping on orders over $300 • Join our newsletter for 10% off your first order
        </p>
      </div>
    </div>
  )
}