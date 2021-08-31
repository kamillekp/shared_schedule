import {Container, Spinner} from '@chakra-ui/react'
import {useRouter} from 'next/router'
import {useEffect} from 'react'

import {Login, useAuth} from '../components'

export default function Home (){
  const [auth] = useAuth()
  const router = useRouter()
  
  useEffect(() => {
    if(!auth.loading){
      auth.user 
        ? router.push('/agenda') 
        : router.push('/login')
    }
  }, [auth.user])

  return (
    <Container centerContent p={8}>
      <Spinner/>
    </Container>
  )
}