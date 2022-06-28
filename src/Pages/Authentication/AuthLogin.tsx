import {  Field, Formik, useFormik } from 'formik' 
import * as Yup from 'yup';
import { Heading, VStack, FormControl, FormLabel, FormErrorMessage, Container, Box, Input, Button, Checkbox, useDisclosure, Collapse, Spacer } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../Utilities';
import { AuthServices, COOKIES_KEYS, LocalStore } from '../../Services';
import { CustomAlert } from '../../Components';
import { useState } from 'react';
import { UserRoles } from '../../Interfaces';
export const AuthLogin = () => {
    const navigate = useNavigate();
    const [message,setMessage] = useState<any>('');
    const [isSuccess,setIsSuccess] = useState<boolean|undefined>(false);
    const {onToggle,isOpen,onClose} = useDisclosure()
    // const text = useColorModeValue("dark", "light")
    // const bg = useColorModeValue("red.500", "red.200")
    // const color = useColorModeValue("white", "gray.800")
  
    const formik = useFormik({
        initialValues : {
            phoneNumber:'',
            password:'',
            rememberMe:false
        },
        validationSchema:Yup.object({
          phoneNumber: Yup.string().required('phone number is required'),
            // lastName: Yup.string()
            //   .max(20, 'Must be 20 characters or less')
            //   .required('Required'),
            password: Yup.string().required('password is required'),
            rememberMe:Yup.bool()
          }),
          initialErrors:{
               phoneNumber:'',
                password:''
          },
        
        onSubmit(values, formikHelpers) {
          handleLogin(values,formikHelpers)
        },
    });
  const handleLogin = async (values:any, formikHelpers:any) =>{
    const result = await AuthServices.login(values);
          setIsSuccess((_prev)=>(result?.status))
          setMessage((_prev:any)=>(result?.message));
          onToggle();
          if(result?.status === true){
              formikHelpers.setSubmitting(false);
              formikHelpers.resetForm();
              LocalStore.put(COOKIES_KEYS.user, result?.data);
              return handleNavigateAfterLogin(result?.data?.role)
          }
          formikHelpers.setSubmitting(false);
          setTimeout(()=>{
            onClose()
          },1800)
  }

  const handleNavigateAfterLogin = (role:UserRoles) =>{

      if(role === "admin"){
        return navigate( Routes.dashboard.path,{ replace:true})
      }

      if(role === "credit sales"){
        return navigate( Routes.POS.creditSales.path,{ replace:true})
      }

      if(role === "cashier"){
        return navigate( Routes.POS.cashSales.path,{ replace:true})
      }

      if(role === "stock keeper"){
        return navigate( Routes.dashboard.path,{ replace:true})
      }

  }


  return (

    <Box border={"1px"} p={"8"} height={"auto"} minH="420px" minW="400px" >
      <Collapse  in={isOpen} animateOpacity >
            <CustomAlert message={message} isSuccess={isSuccess} />
      </Collapse>
      <Spacer height={4} />
        <Formik
        
          initialValues={{
            phoneNumber: "",
            password: "",
            rememberMe: false
          }}
          onSubmit={formik.submitForm}
          validate={formik.validateForm}
        >
            <Container>
              <Heading size={'md'} >Login</Heading>
            <form onSubmit={formik.handleSubmit} noValidate onChange={formik.handleChange} >
              <VStack spacing={4} align="flex-start">
                <FormControl  isInvalid={!!formik.errors.phoneNumber && formik.touched.phoneNumber} >
                  <FormLabel htmlFor="phoneNumber">Phone number</FormLabel>
                  <Field
                    as={Input}
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    variant="filled"
                    // validate={formik.validateField}
                  />
                   <FormErrorMessage>{formik.errors.phoneNumber}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!formik.errors.password && formik.touched.password}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type="password"
                    variant="filled"
                    // validate={(value:string) => {
                    //   let error;
                    //   if (value.length < 5) {
                    //     error = "Password must contain at least 6 characters";
                    //   }

                    //   return error;
                    // }}
                  />
                  <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                </FormControl>
                <Field
                  as={Checkbox}
                  id="rememberMe"
                  name="rememberMe"
                  colorScheme="purple"
                >
                  Remember me?
                </Field>
                <Button isLoading={formik.isSubmitting} type="submit" colorScheme="purple" width="full">
                  Login
                </Button>
              </VStack>
            </form>
            </Container>
       
        </Formik>





  
    </Box>
  
  )
}


// function FormikExample() {
//     function validateName(value) {
//       let error
//       if (!value) {
//         error = 'Name is required'
//       } else if (value.toLowerCase() !== 'naruto') {
//         error = "Jeez! You're not a fan 😱"
//       }
//       return error
//     }
  
   
//   }
