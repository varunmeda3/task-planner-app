import React, { useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { Icon } from '@chakra-ui/react';

const DeleteButton = ({handleDelete,e}) => {

    const [color3,setColor3]=useState('orangered');

    const Delete=(id)=>{
    setColor3('green');
    handleDelete(id);
    }

  return (
    <>
    <Icon borderRadius={'5px'} color={color3} as={AiFillDelete} w={22} h='22px' onClick={()=>Delete(e._id)}/>
    </>
  )
}

export default DeleteButton;