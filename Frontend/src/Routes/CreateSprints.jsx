import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import React from 'react'

const CreateSprints = () => {
  return (
    <FormControl>
    <FormLabel>Sprint</FormLabel>
    <Input type='text' />
    </FormControl>
  )
}

export default CreateSprints