import React, { useState } from 'react';
import { IoCheckmarkDoneCircle } from 'react-icons/io5';
import { Icon } from '@chakra-ui/react';

const CompletedButton = ({handleCompleted,e}) => {

    const [color1,setColor1]=useState('orangered');

    const markAsCompleted=(id)=>{
        setColor1('teal');
        handleCompleted(id);
    }

  return (
    <>
    <Icon borderRadius={'5px'} color={color1} as={IoCheckmarkDoneCircle} w={22} h='22px' onClick={()=>markAsCompleted(e._id)}/>
    </>
  )
}

export default CompletedButton