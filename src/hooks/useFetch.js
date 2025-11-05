import { useState, useEffect } from 'react'
import api from '../services/api'

export default function useFetch(url){
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(()=> {
    let mounted = true
    api.get(url)
      .then(res => { 
        if(mounted) setData(res.data) 
      })
      .catch(err => { 
        if(mounted) {
          console.error(`Fetch error for ${url}:`, err)
          setError(err)
          setData(null)
        }
      })
      .finally(()=> { 
        if(mounted) setLoading(false) 
      })
    return () => { mounted = false }
  }, [url])

  return { data, loading, error }
}
