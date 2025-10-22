import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { HeadlessNewsletter } from '@/components/headless/HeadlessNewsletter';
import { Mail } from 'lucide-react';

export const NewsletterSection = () => {
  return (
    <HeadlessNewsletter>
      {(logic) => (
        <section className="bg-secondary py-20 border-y border-border/50">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {logic.success ? (
              <div className="space-y-6">
                <div className="flex justify-center">
                  <div className="bg-primary/10 rounded-full p-4">
                    <Mail className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-3xl font-light text-foreground tracking-tight">
                  Thank you for subscribing
                </h3>
                <p className="text-muted-foreground font-light">
                  You'll receive our latest updates and exclusive offers
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="space-y-3">
                  <h3 className="text-3xl font-light text-foreground tracking-tight">
                    Stay organized
                  </h3>
                  <p className="text-lg text-muted-foreground font-light">
                    Get inspiration and tips for a more organized home
                  </p>
                </div>
                
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    logic.handleSubscribe();
                  }}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <Input 
                    type="email"
                    placeholder="your@email.com"
                    value={logic.email}
                    onChange={(e) => logic.setEmail(e.target.value)}
                    disabled={logic.isSubmitting}
                    className="flex-1 border-border/50 focus:border-primary"
                    required
                  />
                  <Button 
                    type="submit"
                    disabled={logic.isSubmitting}
                    className="sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    {logic.isSubmitting ? 'Subscribing...' : 'Subscribe'}
                  </Button>
                </form>
                
                {logic.error && (
                  <p className="text-sm text-destructive font-light">
                    {logic.error}
                  </p>
                )}
              </div>
            )}
          </div>
        </section>
      )}
    </HeadlessNewsletter>
  );
};