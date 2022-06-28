import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormControl,
    FormLabel,
    Input,
    ModalFooter,
    FormErrorMessage,
    Collapse,
    useDisclosure,
    Radio,
    RadioGroup,
    Stack,
  } from "@chakra-ui/react";
  import { useFormik } from "formik";
  import * as Yup from "yup";
  import {useState} from 'react'
import { AuthServices } from "../Services";
import { UserInt } from "../Interfaces";

import { CustomAlert } from './AlertDialog';
  // const { isOpen, onOpen, onClose } = useDisclosure();
  interface Props {
    isOpen: boolean;
    onOpen: any;
    onClose: any;
    onToggle: any;
    callback?:any
    data?: Partial<UserInt> | undefined}

//     interface UserInt{
//         id?:any,
//         name:string;
//         phoneNumber:any,
//         role?:any,
//         updatedAt:any;
// }
  export const UserModalForCreateAndEdit = (props: Props) => {
    const [isSuccess,setIsSuccess] = useState<boolean>(false);
    const [message,setMessage] = useState<any>('');
    const alertDisclosure = useDisclosure();
  
    const formik = useFormik({
      initialValues: {
        name:`${props?.data?.name || ''}` ,
        phoneNumber:`${props?.data?.phoneNumber || ''}`,
        role:`${props?.data?.role || ''}`,
      },
      validationSchema: Yup.object({
        name: Yup.string().required("name is required"),
        phoneNumber: Yup.string().length(10, 'must be 10 characters')
          .required('required'),
        role: Yup.string().required("role is required"),
        // price: Yup.string().optional(),
        // rememberMe:Yup.bool()
      }),
      initialErrors: {
        name:'',
        phoneNumber:'',
        role:'',
      },
  
      onSubmit(values, formikHelpers) {
        formikHelpers.validateForm();
        handleCreateUser(values,formikHelpers)
      },
    });

   
    const handleCreateUser = async (values:any, formikHelpers:any) =>{
      let result:any;
      if(props?.data === undefined){
         result = await AuthServices.postUser(values);
      }
      if(props?.data !== undefined){
        result = await AuthServices.updateUser({...props?.data,...values});
      }
      setMessage((_prev:any)=>(result?.message))
      setIsSuccess((_prev:boolean)=>(result?.status))
      alertDisclosure.onOpen();
      setTimeout(() => {
        formikHelpers.setSubmitting(false);
        if(result?.status === true){
          formikHelpers.resetForm({values:{
              name:'',
              phoneNumber:'',
              role:''
          }});
          props.onClose();
          if(props?.callback){
            props?.callback();
          }
        }
          
        alertDisclosure.onClose();
       
      }, 1800);
    }
  
    return (
      <>
        <Modal isOpen={props?.isOpen} onClose={props?.onClose} size="lg">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{props?.data ? 'Update user' : "Create user"  }</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
          <Collapse  in={alertDisclosure?.isOpen} animateOpacity >
            <CustomAlert message={message} isSuccess={isSuccess} />
          </Collapse>
              <form
                onSubmit={formik.handleSubmit}
                noValidate
                onChange={formik.handleChange}
                onReset={formik.handleReset}
              >
                <FormControl
                    mb="5"
                  isInvalid={!!formik.errors.name && formik.touched.name}
                >
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    variant="filled"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  
                  />
              
                  <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
                </FormControl>
              
              
                  <FormControl
                    mb="5"
                    isInvalid={
                      !!formik.errors.phoneNumber && formik.touched.phoneNumber
                    }
                  >
                    <FormLabel htmlFor="phoneNumber"> Phone Number</FormLabel>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      variant="filled"
                      maxLength={10}
                      minLength={10}
                      onChange={formik.handleChange}
                      value={formik.values.phoneNumber}
                    />
  
                    <FormErrorMessage>{formik.errors.phoneNumber}</FormErrorMessage>
                  </FormControl>
                  
                  <FormControl
                    isInvalid={!!formik.errors.role && formik.touched.role}
                  >
                    <FormLabel htmlFor="role">Role</FormLabel>
                    <RadioGroup id="role" name="role" onChange={formik.handleChange} value={formik.values.role}>
                    <Stack direction='row'>
                        <Radio value="cashier">Cashier</Radio>
                        <Radio value='stock keeper'>Stock Keeper</Radio>
                        <Radio value='credit sales'>Credit Sales</Radio>
                        <Radio value='admin'>Admin</Radio>
                    </Stack>
                    </RadioGroup>
                    <FormErrorMessage>{formik.errors.role}</FormErrorMessage>
                  </FormControl>
               
  
                <ModalFooter>
                  <Button
                    isLoading={formik.isSubmitting}
                    type="submit"
                    colorScheme="blue"
                    mr={3}
                  >
                    Save
                  </Button>
                  <Button onClick={props?.onClose}>Cancel</Button>
                </ModalFooter>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  };
  