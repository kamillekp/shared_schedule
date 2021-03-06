import {mask, unMask} from 'remask'
import {
    Input as InputBase, 
    Box, 
    FormControl, 
    FormLabel, 
    FormHelperText
} from '@chakra-ui/react'

export const Input = ({error, touched, label, onChange, mask: pattern, ...props}) =>  {
    const handleChange = event => {
        const unmaskedValue = unMask(event.target.value)
        const maskedValue = mask(unmaskedValue, pattern)
        onChange && onChange(event.target.name) (maskedValue)
    }

    return (
        <Box>
            <FormControl id={props.name} p={4} isRequired>
                <FormLabel>{label}</FormLabel>
                <InputBase size="lg" {...props} onChange={pattern ? handleChange : onChange} />
                {touched && <FormHelperText textColor='#df2040'>{error}</FormHelperText>}
            </FormControl>
        </Box>
    )
}