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
  Select,
  VStack,
  SkeletonCircle,
  Spinner,
  SkeletonText,
} from '@chakra-ui/react';

import { useDispatch, useSelector } from 'react-redux';
import { addTaskFailure, addTaskRequest, addTasksFailure, 
  addTasksRequest, addTasksSuccess, addTaskSuccess } from '../Redux/TaskReducer/action';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Task from '../Components/Task';

const Dashboard = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [startDate,setStartDate] = useState("");
  const [targetDate,setTargetDate] = useState("");
  const [taskTodoData,setTaskTodoData] = useState([]);
  const [taskInProcessData,setTaskInProcessData] = useState([]);
  const [taskDoneData,setTaskDoneData] = useState([]);
  const [data,setData] = useState([]);
  const [type,setType] = useState("");
  const [assignee,setAssignee] = useState("");
  const [status,setStatus] = useState("");

  const tasks=useSelector((store)=>store.TaskReducer.tasks);
  const isLoading=useSelector((store)=>store.SprintReducer.isLoading);
  
  const dispatch=useDispatch();

  const {sprintID}=useParams();
  console.log(sprintID);

  const handletask=()=>{

    onClose();

    dispatch(addTaskRequest('...Loading'));

    let Token = JSON.parse(localStorage.getItem("Token")) || "";

    let send_Data={
        title,
        description,
        type,
        assignee,
        status,
        startDate,
        targetDate,
        favourite:false,
        sprintID
    }
    console.log(send_Data)

    fetch("https://charming-pumps.cyclic.app/task",{

      method:"POST",

      body: JSON.stringify( send_Data ),

      headers:{
        'Content-Type': 'application/json',
        "authorization": `Bearer ${Token}`
      },

     }).then((res)=>res.json())

     .then ((res)=>{

      alert(res.msg);
      console.log(res)

      fetchData(`https://charming-pumps.cyclic.app/task/${sprintID}`);
          
    }).catch((err)=>{
      console.log(err)

      dispatch(addTaskFailure(err));

    });
    
  }
  console.log(tasks)

  const fetchData=(url)=>{

    dispatch(addTasksRequest('...Loading'));

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
   
      dispatch(addTasksSuccess( res.data ));
          
    }).catch((err)=>{

      dispatch(addTasksFailure( err ));

    });

  };

  const handleCompleted=(id)=>{

    let send_Data={status:"Done"}

    let Token = JSON.parse(localStorage.getItem("Token")) || "";

    fetch(`https://charming-pumps.cyclic.app/task/${id}`,{

    method:"PATCH",

    body:JSON.stringify(send_Data),

    headers:{
      'Content-Type': 'application/json',
      "authorization": `Bearer ${Token}`
    }

    })
      
    .then((res)=>res.json())

    .then ((res)=>{

      alert(res.msg);
      console.log(res)

      fetchData("https://charming-pumps.cyclic.app/task");
        
    }).catch((err)=>{

      console.log(err);

    });
        
  }

  const handleFavourite=(id)=>{

    let send_Data={favourite:true}

    let Token = JSON.parse(localStorage.getItem("Token")) || "";

    fetch(`https://charming-pumps.cyclic.app/task/${id}`,{

    method:"PATCH",

    body:JSON.stringify(send_Data),

    headers:{
      'Content-Type': 'application/json',
      "authorization": `Bearer ${Token}`
    }

    })
      
    .then((res)=>res.json())

    .then ((res)=>{

      alert(res.msg);
      console.log(res)

      fetchData("https://charming-pumps.cyclic.app/task");
        
    }).catch((err)=>{

      console.log(err);

    });
    
  }

  const handleDelete=(id)=>{

    let Token = JSON.parse(localStorage.getItem("Token")) || "";

    fetch(`https://charming-pumps.cyclic.app/task/${id}`,{

    method:"DELETE",

    headers:{
      'Content-Type': 'application/json',
      "authorization": `Bearer ${Token}`
    }

    })
      
    .then((res)=>res.json())

    .then ((res)=>{

      alert(res.msg);
      console.log(res)

      fetchData("https://charming-pumps.cyclic.app/task");
        
    }).catch((err)=>{

      console.log(err);

    });
  }

  useEffect(()=>{

    fetchData(`https://charming-pumps.cyclic.app/task/${sprintID}`);

  },[]);

  useEffect(()=>{

    let data1=tasks?.filter((e)=>{
        return e.status=='To Do'
    });

    setTaskTodoData(data1);

    let data2=tasks?.filter((e)=>{
      return e.status=='In Progress'
    });

    setTaskInProcessData(data2);

    let data3=tasks?.filter((e)=>{
      return e.status=='Done'
    });

    setTaskDoneData(data3);

  },[tasks]);


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
      <Heading color='purple' mt='1%' mb='1%' textStyle={'underline'}>TASK DASHBOARD</Heading>
      <Box w='100%' m={'auto'} >
      <Box w='90%' m='auto' display={'flex'} justifyContent='flex-end' p='2%'>
      <Button onClick={onOpen} bg='green.500' color={'teal.700'}>Create Task</Button>
      </Box>
      <Box w='90%' m='auto' display={'flex'} 
          border='2px solid #ccc' p="2%"
          flexDirection={["column","column","row","row"]}
          justifyContent={'space-around'}>
         <VStack border='2px solid gray' w={["100%","100%",'30%','30%']} p='2%'>
          <Task tasks={taskTodoData}  handleCompleted={handleCompleted} handleFavourite={handleFavourite} handleDelete={handleDelete} heading="TO DO"/>
         </VStack>
         <VStack border='2px solid gray' w={["100%","100%",'30%','30%']} p='2%'>
         <Task tasks={taskInProcessData}  handleCompleted={handleCompleted} handleFavourite={handleFavourite} handleDelete={handleDelete} heading="IN PROGRESS"/>
        </VStack>
         <VStack border='2px solid gray' w={["100%","100%",'30%','30%']} p='2%'>
         <Task tasks={taskDoneData} handleCompleted={handleCompleted} handleFavourite={handleFavourite} handleDelete={handleDelete} heading="DONE"/>
         </VStack>
      </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent bg="bisque">
          <ModalHeader fontSize='xx-large' color={'purple'}>Create a task</ModalHeader>
          <ModalCloseButton />
          <ModalBody display={'flex'} flexDirection='column' justifyContent={'space-around'}>
              
              <FormLabel isRequired>Task Title</FormLabel>
              <Input isRequired borderColor={'gray'} mb="5%" type='text' placeholder='Enter a task title...' onChange={(e)=>setTitle(e.target.value)}></Input>
              <FormLabel>Task Description</FormLabel>
              <Textarea mb="5%" type='text' borderColor={'gray'} 
              placeholder='Enter a task description...' 
              onChange={(e)=>setDescription(e.target.value)}></Textarea>
              <FormLabel>Type Of Task</FormLabel>
              <Select borderColor={'gray'} mb="5%" onChange={(e)=>setType(e.target.value)}>
                <option value="">Select Task Label</option>
                <option value="Story">Story</option>
                <option value="Feature">Feature</option>
                <option value="Bug">Bug</option>
              </Select>
              <FormLabel>Task Assignee</FormLabel>
              <Input mb="5%" type='text' borderColor={'gray'} 
              placeholder="Enter Assignee"
              onChange={(e)=>setAssignee(e.target.value)}></Input>
              <FormLabel>Task Status</FormLabel>
              <Select borderColor={'gray'} mb="5%" 
              onChange={(e)=>setStatus(e.target.value)}>
                <option value="">Select Task Status</option>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </Select>
              <FormLabel>Task Start Date</FormLabel>
              <Input placeholder="Select starting Date and Time"
                    size="md" mb="5%"
                    type="date"  borderColor={'gray'} 
                    onChange={(e)=>setStartDate(e.target.value)}>
              </Input>
              <FormLabel>Task Target Date</FormLabel>
              <Input placeholder="Select target Date and Time"
                    size="md" mb="5%"
                    type="date" borderColor={'gray'} 
                    onChange={(e)=>setTargetDate(e.target.value)}>
              </Input>
              
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handletask}>Create</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Dashboard;
