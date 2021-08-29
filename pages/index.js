import {Container, Spinner} from '@chakra-ui/react'

import {Login, Agenda, useAuth} from '../components'

export default function Home (){
  const [auth] = useAuth()

  if(auth.loading) {
    return (
      <Container centerContent p={8}>
        <Spinner/>
      </Container>
    )
  }

  return auth.user ? <Agenda/> : <Login/> 
}