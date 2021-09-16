import { useState } from 'react'
import {useFormik} from 'formik'
import * as yup from 'yup'
import axios from 'axios'

import {
    Button, 
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from "@chakra-ui/react"

import {Input} from '../Input'

const setSchedule = async data => axios({
  method: 'post',
  url: '/api/schedule',
  data: {
    ...data,
    username: window.location.pathname.replace('/', '') },
})
  
const ModalTimeBlock = ({isOpen, onClose, onComplete, isSubmitting, children}) => (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Faça sua reserva</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {children}
        </ModalBody>
  
        <ModalFooter>
            {!isSubmitting && <Button variant='ghost'>Cancelar</Button>}
            <Button colorScheme='blue' mr={3} onClick={onComplete} isLoading={isSubmitting}>
                Reservar Horário
            </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
  
export const TimeBlock = ({time}) => {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(prevState => !prevState)

    const {values, handleSubmit, handleChange, handleBlur, errors, touched, isSubmitting} = useFormik({
      onSubmit: async (values) => {
        try {
          await setSchedule({...values, when: time})
          toggle()
        }
        catch(error) {
          console.log(error)
        }
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

    console.log(isSubmitting)
    
    return (
        <Button p={8} width={200} color='white' bg='blue' onClick={toggle} >
            {time}

            <ModalTimeBlock 
              isOpen={isOpen} 
              onClose={toggle} 
              onComplete={handleSubmit} 
              isSubmitting={isSubmitting }
            >
              
              <>
                <Input 
                  label='Nome: '
                  name='name' 
                  touched={touched.name}
                  error={errors.name}
                  value={values.name} 
                  onChange={handleChange} 
                  placeholder='Digite seu nome' 
                  onBlur={handleBlur}
                  size='lg' 
                  disabled={isSubmitting /*=== true ? 1 : 0*/}
                />

                <Input 
                  label='telefone'
                  name='phone' 
                  error= {errors.phone}
                  value={values.phone} 
                  onChange={handleChange} 
                  placeholder='(99) 9 9999-9999'
                  onBlur={handleBlur} 
                  size='lg' 
                  mt={4} 
                  disabled={isSubmitting /*=== true ? 1 : 0*/}
                />
              </>
            </ModalTimeBlock>
        </Button>
    )
}