import { useState } from 'react'
import {useFormik} from 'formik'
import * as yup from 'yup'

import {
    Button, 
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
  } from "@chakra-ui/react"

  
const ModalTimeBlock = ({isOpen, onClose, onComplete, children}) => (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {children}
        </ModalBody>
  
        <ModalFooter>
            <Button variant='ghost'>Cancelar</Button>
            <Button colorScheme='blue' mr={3} onClick={onComplete}>
                Reservar Horário
            </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
  
export const TimeBlock = ({time}) => {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(prevState => !prevState)

    const {values, handleSubmit, handleChange} = useFormik({
      onSubmit: () => {
  
      },
      initialValues: {
        name: '',
        phone: '',
      },
      validationSchema: yup.object().shape ({
        name: yup.string().required('Preenchimento obrigatório'),
        phone: yup.string().required('Preenchimento obrigatório'),
      })
    })

    return (
        <Button p={8} width={200} color='white' bg='blue' onClick={toggle} >
            {time}

            <ModalTimeBlock isOpen={isOpen} onClose={toggle} onComplete={handleSubmit}>
              <>
                <Input name='name' value={values.name} onChange={handleChange} placeholder='Digite seu nome' size='lg' />
                <Input name='phone' value={values.phone} onChange={handleChange} placeholder='(99) 9 9999-9999' size='lg' mt={4} />
              </>
            </ModalTimeBlock>
        </Button>
    )
}