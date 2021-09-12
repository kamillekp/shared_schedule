import {Input as InputBase, Box, FormControl, FormLabel, FormHelperText} from '@chakra-ui/react'

export const Input = ({error, touched, label, ...props}) =>  (
    <Box>
        <FormControl id={props.name} p={4} isRequired>
            <FormLabel>{label}</FormLabel>
            <InputBase size="lg" {...props} />
            {touched && <FormHelperText textColor='#e74c3c'>{error}</FormHelperText>}
          </FormControl>
    </Box>
)