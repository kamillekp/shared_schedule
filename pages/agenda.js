import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import {useFetch} from '@refetty/react'
import {addDays, subDays, format} from 'date-fns'
import axios from 'axios'

import {ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons'
import {Container, Box, Button, IconButton, Spinner, Text} from '@chakra-ui/react'

import {useAuth, Logo, formatDate} from '../components'
import {getToken} from '../config/firebase/index.js'

const getAgenda = async (when) => {
  const token = await getToken()

  return axios({
    method: 'get',
    url: '/api/agenda',
    params: {date: format(when, 'yyyy-MM-dd')},
    headers: {
      Authorization: `bearer ${token}`
    }
  })
}

/*const takeProfile = async () => {
  try {
      const router = useRouter()
      const token = await getToken()
      console.log('TOKEN: ', token)

      const data = await axios({
          method: 'get',
          url: '/api/takeProfile',
          headers: {
            Authorization: `Bearer ${token}` 
          }
      })

      console.log('DATA: ', data.username)
      router.push(`/${data.username}`)    
  }
  catch (error) {
      console.log('TAKEPROFILE ERROR: ', error)
  }
}*/

const Header = ({children}) => (
  <Box p={4} display='flex' alignItems='center' justifyContent='space-between'>
    {children}
  </Box>
)

const AgendaBlock = ({time, name, phone, ...props}) => (
  <Box {...props} display='flex' alignItems='center' bg='#6020df' color='white' borderRadius={8} p={4}>
    <Box flex={1} fontSize='xl'>{time}</Box>

    <Box textAlign='right'>
      <Text fontSize='lg'>{name}</Text>
      <Text fontSize='xs'>{phone}</Text>
    </Box>
  </Box>
)

export default function Agenda() {
    const router = useRouter()
    const [auth, {logout}] = useAuth()
    const [when, setWhen]= useState(() => new Date())
    const [data, {loading}, fetch] = useFetch(getAgenda, {lazy: true})
    
    const addDay = () => setWhen(prevState => addDays(prevState, 1))
    const removeDay = () => setWhen(prevState => subDays(prevState, 1))

    //const toSchedule = () => takeProfile()

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
            <Button onClick={logout} bg='#6020df' color='white'>Sair</Button>
            <Button /*onClick={toSchedule}*/ bg='#6020df' color='white'>Horários</Button>            
          </Header>

          <Box m={8} display='flex' alignItems='center' justifyContent='space-between'>
            <IconButton icon={<ChevronLeftIcon />} bg='transparent' onClick={removeDay} />
            <Box>{formatDate(when, 'PPPP')}</Box>
            <IconButton  icon={<ChevronRightIcon />} bg='transparent' onClick={addDay} />
          </Box>

          {loading && <Spinner tickness='4px' speed='0.65s' emptyColor='gray.200' color='#6020df' size='xl' />}
          {data ?.map(doc => (
            <AgendaBlock key={doc.time} time={doc.time} name={doc.name} phone={doc.phone} mt={4} />
          ))}
      </Container>
    )
  }
