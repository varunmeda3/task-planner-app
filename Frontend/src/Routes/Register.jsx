import { Box, Button, FormControl, FormHelperText, FormLabel, Heading, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [disable,setDisable] = useState(false);

  const navigate = useNavigate()

  const handleRegister = ()=>{

    if(!name || !email || !password) {
     alert("Please Fill up all the credentials...!");
     return;
    }

    if(!email.includes("@") || !email.includes(".com") ){
      alert("Please Enter a correct E-mail Address...!")
      return;
    }

    if(password.length < 8 || password.length > 15){
      alert("Please Enter a password having length between 8 to 15 characters...!")
      return;
    }

    var symbols = /[~!@#\$%\^\&*\)\(+=._-]/g;

    if(!password.match(symbols)) {
      alert("Please Enter a password having single symbol...!")
      return;
    } 

    var numbers = /[0-9]/g;

    if(!password.match(numbers)) {
      alert("Please Enter a password having single number...!")
      return;
    } 

    var alphabates = /[A-z]/g;

    if(!password.match(alphabates)) {
      alert("Please Enter a password having single alphabet...!")
      return;
    } 

    var lowerCaseLetters = /[a-z]/g;

    if(!password.match(lowerCaseLetters)){
      alert("Please Enter a password having single lowercase letter...!")
      return;
    } 

    var upperCaseLetters = /[A-Z]/g;

    if(!password.match(upperCaseLetters)){
      alert("Please Enter a password having single capital(uppercase) letter...!")
      return;
    } 


     fetch("https://charming-pumps.cyclic.app/register",{
      method:"POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name,email,password})
     })
     .then((res)=>res.json())
     .then ((res)=>{
       console.log(res.Message);

       if(res.Message=="Congratulations, SignUp Successfull"){
        alert(res.Message);
        navigate("/login");

       }else{

        alert(res.Message);
         setName("");
         setEmail("");
         setPassword("");
       }
     }).catch((err)=>{

      console.log(err);
      alert("Something went wrong, Please try again later");
      setName("");
      setEmail("");
      setPassword("");

     })
   
  
   }

  return (
   <>
    <Box bg="bisque" borderRadius="10px" textAlign="start" w="50%" p="5%" border="2px solid #ccc" margin="auto" mt="100px" mb="10%">
        <Heading fontSize={"33px"} fontStyle='italic' color='purple' fontWeight="bold">Registration</Heading>
        <FormControl display={"flex"} flexDirection={"column"} jc="center" >
            <FormLabel  color='purple' mt="5%" fontWeight="bold">Name</FormLabel>
            <Input onChange={(e)=>setName(e.target.value)} value={name} placeholder="Enter Your Name" borderRadius={"7px"} h="33px" pl="2%" type='text' border={"1px solid #ccc"}/>
            <FormLabel color='purple' mt="5%">Email address</FormLabel>
            <Input onChange={(e)=>setEmail(e.target.value)} value={email} placeholder="Enter Your Email" borderRadius={"7px"} h="33px" pl="2%" type='email'  border={"1px solid #ccc"}/>
            <FormHelperText>We'll never share your email.</FormHelperText>
            <FormLabel color='purple' mt="5%">Password</FormLabel>
            <Input onChange={(e)=>setPassword(e.target.value)} value={password} placeholder="Enter Password" borderRadius={"7px"} h="33px" pl="2%" type='password' border={"1px solid #ccc"}/>
            <FormHelperText>We'll never share your password.</FormHelperText>
            <Button onClick={handleRegister} isDisabled={disable} margin="auto" mt="5%" bg="purple" p="2%" borderRadius={"7px"}>REGISTER</Button>
        </FormControl>
    </Box>
   </>
  )
}

export default Register