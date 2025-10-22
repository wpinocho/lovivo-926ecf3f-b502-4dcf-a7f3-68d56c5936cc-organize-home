import { HeadlessIndex } from '@/components/headless/HeadlessIndex'
import { IndexUI } from '@/pages/ui/IndexUI'
import { DiscountPopup } from '@/components/DiscountPopup'

const Index = () => {
  return (
    <>
      <HeadlessIndex>
        {(logic) => <IndexUI logic={logic} />}
      </HeadlessIndex>
      <DiscountPopup />
    </>
  )
}

export default Index