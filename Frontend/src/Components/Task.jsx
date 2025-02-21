import React, { useState } from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    HStack,
    Heading,
    Text,
    Button,
    Icon,
    Stack
  } from '@chakra-ui/react';
import { MdPendingActions,MdLabel } from 'react-icons/md';
import { AiOutlineFileDone } from 'react-icons/ai';
import CompletedButton from './CompletedButton';
import DeleteButton from './DeleteButton';
import FavouriteButton from './FavouriteButton';

const Task = ({tasks,handleCompleted,handleFavourite,handleDelete,heading}) => {

  return (
    <>
    <Heading color={'purple.500'}>{heading}</Heading>
    {tasks&&tasks?.map((e)=>
        <Accordion allowToggle w='100%' border={'2px solid #ccc'}>
        <AccordionItem w='100%'>
          <p>
            <AccordionButton>
              <Box w='100%' as="span" flex='1' textAlign='left'>
              <HStack w='100%' bg={e.status?'yellowgreen':'salmon'} pl="5%" pr="5%"
              justifyContent='space-between'>
                <Heading color={'purple'} 
                fontSize={['x-small','small','medium','large']} 
                >TASK TITLE : {e.title}</Heading>
                <Icon color={'purple'} as={e.status?AiOutlineFileDone:MdPendingActions} w={33} h={33}/>
              </HStack>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </p>
          <AccordionPanel pb={4} bg="pink" w="95%" m='auto' mb='1%' color={'slateblue'} 
          textAlign={'start'} fontSize='small' fontWeight={'bold'} fontStyle='italic'>
          <Text>Task Description : {e.description}</Text>
          <Text>Task Start Date : {e.startDate}</Text>
          <Text>Task Target Date : {e.targetDate}</Text>
            <Stack mt="2%" w='100%' 
            flexDirection={['column','column','column','row']}
            justifyContent={['start','start','start','space-between']}
            alignItems={['start','start','start','center']}>
            <HStack  mt="2%" 
            justifyContent={'start'}>
            <CompletedButton handleCompleted={handleCompleted} e={e}/>
            <FavouriteButton handleFavourite={handleFavourite} e={e}/>
            <DeleteButton handleDelete={handleDelete} e={e}/>
            
            </HStack>
            <HStack>
            <Icon borderRadius={'5px'}
               color={'orangered'} as={MdLabel} w={22} h='22px'/>
            <Text>{e.type}</Text>
            </HStack>
            </Stack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      )}
      </>
  )
}

export default Task