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
    Flex,
    Spacer,
  } from "@chakra-ui/react";
  import { useFormik } from "formik";
  import * as Yup from "yup";
  import {useState} from 'react'
import { CustomerService } from "../Services";

import { CustomAlert } from './AlertDialog';
import { CustomerInt } from "../Interfaces";
  // const { isOpen, onOpen, onClose } = useDisclosure();
  interface Props {
    isOpen: boolean;
    onOpen: any;
    onClose: any;
    onToggle: any;
    callback?:any
    data?: Partial<CustomerInt> | undefined}


  export const CustomerModalForCreateAndEdit = (props: Props) => {
    const [isSuccess,setIsSuccess] = useState<boolean>(false);
    const [message,setMessage] = useState<any>('');
    const alertDisclosure = useDisclosure();
  
    const formik = useFormik({
      initialValues: {
        name:`${props?.data?.name || ''}` ,
        phoneNumber:`${props?.data?.phoneNumber || ''}`,
        balance:`${props?.data?.balance || ''}`,
      },
      validationSchema: Yup.object({
        name: Yup.string().required("name is required"),
        phoneNumber: Yup.string().length(10, 'must be 10 characters')
          .required('required'),
          balance: Yup.string(),
        // price: Yup.string().optional(),
        // rememberMe:Yup.bool()
      }),
      initialErrors: {
        name:'',
        phoneNumber:'',
        balance:'',
      },
  
      onSubmit(values, formikHelpers) {
        formikHelpers.validateForm();
        handleCreateCustomer(values,formikHelpers)
      },
    });

   
    const handleCreateCustomer = async (values:any, formikHelpers:any) =>{
      let result:any;
      if(props?.data === undefined){
         result = await CustomerService.postCustomer(values);
      }
      if(props?.data !== undefined){
        result = await CustomerService.updateCustomer({...props?.data,...values});
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
            <ModalHeader>{props?.data ? 'Update customer' : "Create customer"  }</ModalHeader>
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
                    placeholder="Mary Dash"
                    type="text"
                    variant="filled"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
              
                  <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
                </FormControl>
                <Flex>
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
                      placeholder="02XXXXXXXX"
                      type="tel"
                      variant="filled"
                      maxLength={10}
                      minLength={10}
                      onChange={formik.handleChange}
                      value={formik.values.phoneNumber}
                    />
  
                    <FormErrorMessage>{formik.errors.phoneNumber}</FormErrorMessage>
                  </FormControl>
                    <Spacer minW={"10px"}/>
                  <FormControl
                    mb="5"
                    isInvalid={
                      !!formik.errors.balance && formik.touched.balance
                    }
                  >
                    <FormLabel htmlFor="balance">Balance GH&#162;</FormLabel>
                    <Input
                      id="balance"
                      name="balance"
                      placeholder="0.00"
                      type="number"
                      variant="filled"
                      readOnly={props.data !== undefined}
                      maxLength={10}
                      onChange={formik.handleChange}
                      value={formik.values.balance}
                    />
  
                    <FormErrorMessage>{formik.errors.balance}</FormErrorMessage>
                  </FormControl>
                </Flex>
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
  