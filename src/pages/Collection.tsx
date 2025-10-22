import { HeadlessCollection } from "@/components/headless/HeadlessCollection"
import { CollectionPageUI } from "@/pages/ui/CollectionPageUI"

/**
 * ROUTE COMPONENT - Collection
 * 
 * Connects HeadlessCollection with CollectionPageUI
 */

const Collection = () => {
  return (
    <HeadlessCollection>
      {(logic) => <CollectionPageUI logic={logic} />}
    </HeadlessCollection>
  )
}

export default Collection