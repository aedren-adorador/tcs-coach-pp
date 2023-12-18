import React from "react"
import { Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react'
import '../../auth-styles/auth.styles.css'

function PasswordInput() {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  return (
    <InputGroup size='lg' mb='2'>
      <Input
        pr='4.5rem'
        type={show ? 'text' : 'password'}
        placeholder='Enter password'
        variant='filled'
      />
      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}

export default PasswordInput;