import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  useDisclosure,
  Button,
  Box,
  Icon,
  Textarea,
  Text,
  HStack,
  Input,
  FormLabel,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Heading,
  Spinner,
  SkeletonCircle,
  SkeletonText,
  Image,
} from '@chakra-ui/react';
import { MdPendingActions } from 'react-icons/md';
import { AiOutlineFileDone } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { addSprintFailure, addSprintRequest, addSprintsFailure, addSprintsRequest, addSprintsSuccess, addSprintSuccess } from '../Redux/SprintReducer/action';
import { useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const Home = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [startDate,setStartDate] = useState("");
  const [targetDate,setTargetDate] = useState("");
  const [data,setData] = useState([]);

  const sprints=useSelector((store)=>store.SprintReducer.sprints);
  const isLoading=useSelector((store)=>store.SprintReducer.isLoading);
  
  const dispatch=useDispatch();
  const navigate=useNavigate();
  
  const handleSprint=()=>{

    onClose();

    dispatch(addSprintRequest('...Loading'));

    let Token = JSON.parse(localStorage.getItem("Token")) || "";

    let send_Data={
      title, 
      description,
      startDate,
      targetDate,
      favourite:false,
      status:false
    }
    console.log(send_Data)

    fetch("https://charming-pumps.cyclic.app/sprint",{

      method:"POST",

      body: JSON.stringify( send_Data ),

      headers:{
        'Content-Type': 'application/json',
        "authorization": `Bearer ${Token}`

      },

     }).then((res)=>res.json())

     .then ((res)=>{

      alert(res.msg);

      fetchData("https://charming-pumps.cyclic.app/sprint");
          
    }).catch((err)=>{

      dispatch(addSprintFailure(err));

    });
    
  }
  console.log(sprints)

  const fetchData=(url)=>{

    dispatch(addSprintsRequest('...Loading'));

    let Token = JSON.parse(localStorage.getItem("Token")) || "";

    fetch( url, {

      method:"GET",

      headers:{

        "authorization": `Bearer ${Token}`

      },

     })
     
     .then((res)=>res.json())

     .then ((res)=>{
      console.log(res)
   
      dispatch(addSprintsSuccess( res.data ));
          
    }).catch((err)=>{

      dispatch(addSprintsFailure( err ));

    });

  }

  const handleDashboardRoute=(e)=>{
      // <Navigate to=`/dashboard/${e.userID}`/>
      navigate(`/dashboard/${e._id}`);
  }

  const handleStatus=(id,keyStatus,keyName)=>{
    let Token = JSON.parse(localStorage.getItem("Token")) || "";

    let send_Data;
    if(keyName=="status"){
     send_Data={
      status:!keyStatus
    }
    }else{
      send_Data={
        favourite:!keyStatus,
      }
    }
    // console.log(send_Data)

    fetch(`https://charming-pumps.cyclic.app/sprint/${id}`,{

      method:"PATCH",

      body: JSON.stringify( send_Data ),

      headers:{
        'Content-Type': 'application/json',
        "authorization": `Bearer ${Token}`

      },

     }).then((res)=>res.json())

     .then ((res)=>{

      alert(res.msg);

      fetchData("https://charming-pumps.cyclic.app/sprint");
          
    }).catch((err)=>{

      console.log(err)
      alert(err)

    });
  };

  const handleDelet=(id)=>{

        let Token = JSON.parse(localStorage.getItem("Token")) || "";

        fetch(`https://charming-pumps.cyclic.app/sprint/${id}`,{

          method:"DELETE",

          headers:{
            'Content-Type': 'application/json',
            "authorization": `Bearer ${Token}`

          },

        }).then((res)=>res.json())

        .then ((res)=>{

          alert(res.msg);

          fetchData("https://charming-pumps.cyclic.app/sprint");
              
        }).catch((err)=>{

          console.log(err)
          alert(err)

        });
      };
  

  useEffect(()=>{

    fetchData("https://charming-pumps.cyclic.app/sprint");

  },[]);

  if(isLoading){
    return (<>
    <Heading color='purple' mb="7%">...Loading</Heading>
          <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='blue.500'
              size='xl'
          />
          <Box padding='6' boxShadow='lg' bg='rgb(219, 165, 151)'>
            <SkeletonCircle size='10' />
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
          </Box>
    </>)
  }

  return (
    <>
    <Box w='100%' m={'auto'} >
      <Box w='80%' m='auto' display={'flex'} justifyContent='flex-end' p='2%'>
      <Button onClick={onOpen} bg='green.500' color={'teal.700'}>Create Sprint</Button>
      </Box>
      <Box w='80%' m='auto' >
      {sprints&&sprints?.map((e)=>
        <Accordion allowToggle w='100%' border={'2px solid #ccc'}>
        <AccordionItem w='100%'>
          <h2>
            <AccordionButton>
              <Box w='100%' as="span" flex='1' textAlign='left' >
              <HStack w='100%' bg={e.status?'yellowgreen':'salmon'} pl="5%" pr="5%"
              justifyContent='space-between'>
                <Heading color={'purple'} fontSize={'large'}>SPRINT TITLE : {e.title}</Heading>
                <Icon color={'purple'} as={e.status?AiOutlineFileDone:MdPendingActions} w={33} h={33}/>
              </HStack>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} bg={e.status?'yellowgreen':'pink'} w="95%" m='auto' mb='1%' color={'slateblue'} 
          textAlign={'start'} fontSize='large' fontWeight={'bold'} fontStyle='italic'>
          <Text>Sprint Description : {e.description}</Text>
          <Text>Sprint Start Date : {e.startDate}</Text>
          <Text>Sprint Target Date : {e.targetDate}</Text>
          <HStack>
            <Text>Sprint Status: {e.status?"Completed":"Pending"}</Text>
          <Icon color={e.status?'green':'tomato'} 
          as={e.status?AiOutlineFileDone:MdPendingActions}
           w={22} h={33}/>
           </HStack>
           <HStack w='100%' mt="2%" justifyContent={'start'}>
           <Button bg={e.status?'pink':'green.300'} color={'teal'} fontSize='large' 
           fontWeight={'bold'} h='40px' w={['100%','75%','50%','25%']} 
           fontStyle='underline' onClick={()=>handleStatus(e._id,e.status,"status")}>
            {e.status?'Mark As Pending ⏱️':'Mark As Completed ✅'}
            </Button>
            </HStack>
            <HStack w='100%' mt="2%" justifyContent={'start'}>
            <Button w={['100%','75%','50%','25%']}  bg={e.favourite?'pink.500':"skyblue"} color={'blue.700'} fontSize='large' 
           fontWeight={'bold'} h='40px'
           fontStyle='underline' onClick={()=>handleStatus(e._id,e.favourite,"favourites")}>
            {e.favourite?'Remove from favourites ❌':'Add to favourites ⭐'}
            </Button>
            </HStack>
            <HStack w='100%' mt="2%" justifyContent={'start'}>
            <Button w={['100%','75%','50%','25%']} bg="tomato" color={'red.700'} fontSize='large' 
           fontWeight={'bold'} h='40px'
           fontStyle='underline' onClick={()=>handleDelet(e._id)}>
            Delete 🚮
            </Button>
            </HStack>
            <Box w='100%' mt="2%" display={'flex'} justifyContent='start'>
            {/* <Link to=`/dashboard/${e.userID}`> */}
            <Button w={['100%','75%','50%','25%']} bg="purple.300" color={'purple.700'} fontSize='large' 
           fontWeight={'bold'} h='40px'
           fontStyle='underline' onClick={()=>handleDashboardRoute(e)}>
            Go To Task Dashboard</Button>
           {/* </Link> */}
            </Box>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      )}
      </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent bg="bisque">
          <ModalHeader fontSize='xx-large' color={'purple'}>Create a Sprint</ModalHeader>
          <ModalCloseButton />
          <ModalBody display={'flex'} flexDirection='column' justifyContent={'space-around'}>
              
              <FormLabel isRequired>Sprint Title</FormLabel>
              <Input isRequired borderColor={'gray'} mb="5%" type='text' placeholder='Enter a sprint title...' onChange={(e)=>setTitle(e.target.value)}></Input>
              <FormLabel>Sprint Description</FormLabel>
              <Textarea mb="5%" type='text' borderColor={'gray'} placeholder='Enter a sprint description...' onChange={(e)=>setDescription(e.target.value)}></Textarea>
              <FormLabel>Sprint Start Date</FormLabel>
              <Input placeholder="Select starting Date and Time"
                    size="md" mb="5%"
                    type="date"  borderColor={'gray'} 
                    onChange={(e)=>setStartDate(e.target.value)}>
              </Input>
              <FormLabel>Sprint Target date</FormLabel>
              <Input placeholder="Select target Date and Time"
                    size="md" mb="5%"
                    type="date"  borderColor={'gray'} 
                    onChange={(e)=>setTargetDate(e.target.value)}>
              </Input>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSprint} >Create</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Home