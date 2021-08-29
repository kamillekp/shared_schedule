import {Button} from '@chakra-ui/react'

import {useAuth} from '../Auth'

export const Agenda = () => {
    const [, {logout}] = useAuth()

    return (
      <div>
          <Button onClick={logout}>Sair</Button>
      </div>
    )
  }