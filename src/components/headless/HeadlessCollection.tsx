import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase, type Collection, type Product } from '@/lib/supabase'
import { STORE_ID } from '@/lib/config'

/**
 * FORBIDDEN HEADLESS COMPONENT - HeadlessCollection
 * 
 * Manages all business logic for collection pages:
 * - Fetching collection data
 * - Loading collection products
 * - Navigation handling
 */

export const useCollectionLogic = () => {
  const { handle } = useParams<{ handle: string }>()
  const navigate = useNavigate()
  const [collection, setCollection] = useState<Collection | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (handle) {
      fetchCollection()
    }
  }, [handle])

  const fetchCollection = async () => {
    try {
      setLoading(true)
      
      // Fetch collection
      const { data: collectionData, error: collectionError } = await supabase
        .from('collections')
        .select('*')
        .eq('handle', handle)
        .eq('status', 'active')
        .eq('store_id', STORE_ID)
        .single()

      if (collectionError || !collectionData) {
        setNotFound(true)
        return
      }

      setCollection(collectionData)

      // Fetch collection products
      const { data: collectionProducts, error: cpError } = await supabase
        .from('collection_products')
        .select('product_id')
        .eq('collection_id', collectionData.id)

      if (cpError || !collectionProducts || collectionProducts.length === 0) {
        setProducts([])
        return
      }

      const productIds = collectionProducts.map(cp => cp.product_id)

      // Fetch products
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .in('id', productIds)
        .eq('status', 'active')
        .eq('store_id', STORE_ID)
        .order('created_at', { ascending: false })

      if (!productsError && productsData) {
        setProducts(productsData)
      }
    } catch (error) {
      console.error('Error fetching collection:', error)
      setNotFound(true)
    } finally {
      setLoading(false)
    }
  }

  const handleNavigateBack = () => navigate('/')

  return {
    collection,
    products,
    loading,
    notFound,
    handleNavigateBack
  }
}

interface HeadlessCollectionProps {
  children: (logic: ReturnType<typeof useCollectionLogic>) => React.ReactNode
}

export const HeadlessCollection = ({ children }: HeadlessCollectionProps) => {
  const collectionLogic = useCollectionLogic()
  return <>{children(collectionLogic)}</>
}