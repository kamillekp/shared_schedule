import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import {useFetch} from '@refetty/react'
import axios from 'axios'
import {addDays, subDays} from 'date-fns'

import {ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons'
import {Container, Box, Button, IconButton} from '@chakra-ui/react'

import {useAuth, Logo, formatDate} from '../components'
import {getToken} from '../config/firebase/index.js'

const getAgenda = async (when) => {
  const token = await getToken()

  return axios({
    method: 'get',
    url: '/api/agenda',
    params: {when},
    headers: {
      Authorization: `bearer ${token}`
    }
  })
}

const Header = ({children}) => (
  <Box p={4} display='flex' alignItems='center' justifyContent='space-between'>
    {children}
  </Box>
)

export default function Agenda() {
    const router = useRouter()
    const [auth, {logout}] = useAuth()
    const [when, setWhen]= useState(() => new Date())
    const [data, {loading, status, error}, fetch] = useFetch(getAgenda, {lazy: true})
    
    const addDay = () => setWhen(prevState => addDays(prevState, 1))
    const removeDay = () => setWhen(prevState => subDays(prevState, 1))

    useEffect(() => {
      !auth.user && router.push('/')
    }, [auth.user])

    useEffect(() => {
      fetch(when)
    }, [when])

    return (
      <Container>
          <Header>
            <Logo size={150}/>
            <Button onClick={logout}>Sair</Button>
          </Header>

          <Box m={8} display='flex' alignItems='center' justifyContent='space-between'>
            <IconButton icon={<ChevronLeftIcon />} bg='transparent' onClick={removeDay} />
            <Box>{formatDate(when, 'PPPP')}</Box>
            <IconButton  icon={<ChevronRightIcon />} bg='transparent' onClick={addDay} />
          </Box>
      </Container>
    )
  }
