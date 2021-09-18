import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import {useFetch} from '@refetty/react'
import {addDays, subDays} from 'date-fns'
import axios from 'axios'
import {format} from 'date-fns'

import {ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons'
import {Container, Box, Button, IconButton, SimpleGrid, Spinner} from '@chakra-ui/react'

import {useAuth, Logo, formatDate, TimeBlock} from '../components'

const getSchedule = async (when) =>  axios({
    method: 'get',
    url: '/api/schedule',
    params: {
      date: format(when, 'yyyy-MM-dd'),
      username: window.location.pathname.replace('/', ''),
    }
  })

const Header = ({children}) => (
  <Box p={4} display='flex' alignItems='center' justifyContent='space-between'>
    {children}
  </Box>
)

export default function Schedule() {
    const router = useRouter()
    const [auth, {logout}] = useAuth()
    const [when, setWhen]= useState(() => new Date())
    const [data, {loading, status, error}, fetch] = useFetch(getSchedule, {lazy: true})

    const addDay = () => setWhen(prevState => addDays(prevState, 1))
    const removeDay = () => setWhen(prevState => subDays(prevState, 1))

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

          <SimpleGrid p={4} columns={2} spacing={8} >
            {loading && <Spinner tickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />}
            {data?.map (({time, isBlocked}) => <TimeBlock key={time} time={time} date={when} disabled={isBlocked} />) }
          </SimpleGrid>
      </Container>
    )
  }