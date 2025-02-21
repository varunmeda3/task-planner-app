import React, { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { Icon } from '@chakra-ui/react';

const FavouriteButton = ({handleFavourite,e}) => {

    const [color2,setColor2]=useState('orangered');

    const addToFavourites=(id)=>{
        setColor2('yellowgreen');
        handleFavourite(id);
      }
    
  return (
    <>
    <Icon borderRadius={'5px'} color={color2} as={AiFillStar} w={22} h='22px' onClick={()=>addToFavourites(e._id)}/>
    </>
  )
}

export default FavouriteButton