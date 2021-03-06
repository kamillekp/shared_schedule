import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import {useFetch} from '@refetty/react'
import {addDays, subDays} from 'date-fns'
import {format} from 'date-fns'
import axios from 'axios'

import {ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons'
import {Container, Box, IconButton, SimpleGrid, Spinner, Button} from '@chakra-ui/react'

import {Logo, formatDate, TimeBlock} from '../components'

const getSchedule = async ({when, username}) =>  axios({
    method: 'get',
    url: '/api/schedule',
    params: {
      date: format(when, 'yyyy-MM-dd'),
      username,
    }
  })

const Header = ({children}) => (
  <Box p={4} display='flex' alignItems='center' justifyContent='space-between'>
    {children}
  </Box>
)

export default function Schedule() {
    const router = useRouter()
    const [when, setWhen]= useState(() => new Date())
    const [data, {loading}, fetch] = useFetch(getSchedule, {lazy: true})

    const addDay = () => setWhen(prevState => addDays(prevState, 1))
    const removeDay = () => setWhen(prevState => subDays(prevState, 1))

    const refresh = () => fetch({when, username: router.query.username})

    const toAgenda = () => {router.push('/agenda')}

    useEffect(() => {
      refresh()
    }, [when, router.query.username])

  
    return (
      <Container>
          <Header>
            <Logo size={150} />
            <Button onClick={toAgenda} bg='#6020df' color='white'>Home</Button>
          </Header>

          <Box m={8} display='flex' alignItems='center' justifyContent='space-between'>
            <IconButton icon={<ChevronLeftIcon />} bg='transparent' onClick={removeDay} />
            <Box>{formatDate(when, 'PPPP')}</Box>
            <IconButton  icon={<ChevronRightIcon />} bg='transparent' onClick={addDay} />
          </Box>

          <SimpleGrid p={4} columns={2} spacing={8} >
            {loading && <Spinner tickness='4px' speed='0.65s' emptyColor='gray.200' color='#6020df' size='xl' />}
            {data?.map (({time, isBlocked}) => <TimeBlock key={time} time={time} date={when} disabled={isBlocked} onSuccess={refresh} />) }
          </SimpleGrid>
      </Container>
    )
  }