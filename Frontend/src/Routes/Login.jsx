import { Box, Button, FormControl, FormHelperText, FormLabel, Heading, Input } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';

const Login = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [disable,setDisable] = useState(false);

  const {logIn} = useContext(AppContext);

  const navigate = useNavigate()

  const handleLogin = () =>{

    if( !email || !password ) {
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


     fetch("https://charming-pumps.cyclic.app/sign-in",{

      method:"POST",

      headers:{

        "Content-Type": "application/json"

      },

      body: JSON.stringify( { email, password } )

     }).then((res)=>res.json())

     .then ((res)=>{

      alert(res.Message);

      if(res.Token) {

        console.log(res.Token);

        localStorage.setItem("Token",JSON.stringify(res.Token))
        
        logIn(res.Token);

        navigate("/");

      } else if(res.message=="Log-In Failed. Please Sign Up."){

        navigate("/register");

      } else{

        setEmail("");

        setPassword("");

        navigate("/register");

      }
      
  
     }).catch((err)=>{

      console.log(err);

      alert("Something went wrong, Please try again later");
      
      setEmail("");
      
      setPassword("");

     })
   
  
   }

  return (
    <>
    <Box bg="bisque" borderRadius="10px" textAlign="start" w="50%" p="5%" border="2px solid #ccc" margin="auto" mt="100px" mb="10%">
        <Heading fontSize={"33px"}  fontStyle='italic' color='purple' fontWeight="bold">Login</Heading>
        <FormControl display={"flex"} flexDirection={"column"} jc="center" >
            <FormLabel color='purple' mt="5%">Email address</FormLabel>
            <Input onChange={(e)=>setEmail(e.target.value)} value={email} placeholder="Enter Your Email" pl="2%" borderRadius={"7px"} h="33px" type='email'  border={"1px solid #ccc"}/>
            <FormHelperText>We'll never share your email.</FormHelperText>
            <FormLabel color='purple' mt="5%">Password</FormLabel>
            <Input onChange={(e)=>setPassword(e.target.value)} value={password} placeholder="Enter Your Password" borderRadius={"7px"} h="33px" pl="2%" type='password' border={"1px solid #ccc"}/>
            <FormHelperText>We'll never share your password.</FormHelperText>
            <Button onClick={handleLogin} isDisabled={disable} margin="auto" mt="5%" bg="purple" p="2%" borderRadius={"7px"}>LOGIN</Button>
        </FormControl>
    </Box>
    </>
  )
}

export default Login