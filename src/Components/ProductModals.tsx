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
  Flex,
  Divider,
  useDisclosure,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ProductServices } from "../Services";
import { CustomAlert } from './AlertDialog';
import {useState} from 'react'
import { ProductInt } from '../Interfaces';
// const { isOpen, onOpen, onClose } = useDisclosure();
interface Props {
  isOpen: boolean;
  onOpen: any;
  onClose: any;
  onToggle: any;
  data?: Partial<ProductInt> | undefined;
  callback?:any
}
// interface ProductInt{
//     id?:any,
//     productName:string;
//     price?:string;
//     quantity:any,
//     updatedAt:any;
// }
export const ProductModalForCreateAndEdit = (props: Props) => {
   
  const [isSuccess,setIsSuccess] = useState<boolean>(false);
    const [message,setMessage] = useState<any>('');
    const alertDisclosure = useDisclosure();



  const formik = useFormik({
    initialValues: {
      productName:`${props?.data?.productName || ''}` ,
      quantity:`${props?.data?.quantity || '1'}`,
      price:`${props?.data?.price || '0.0'}`,
    },
    validationSchema: Yup.object({
      productName: Yup.string().required("product name is required"),
      // lastName: Yup.string()
      //   .max(20, 'Must be 20 characters or less')
      //   .required('Required'),
      quantity: Yup.string().required("quantity is required"),
      price: Yup.string().optional(),
      // rememberMe:Yup.bool()
    }),
    initialErrors: {
      productName: "",
      quantity: "",
      price: "",
    },

    onSubmit(values, formikHelpers) {
      formikHelpers.validateForm();
      handleCreateProducts(values,formikHelpers)
    },
  });


  const handleCreateProducts = async (values:any, formikHelpers:any) =>{
    let result:any;
    if(props?.data === undefined){
       result = await ProductServices.postProduct(values)
    }

    if(props?.data !== undefined){
      result = await ProductServices.updateProduct({...props?.data,...values});
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
          <ModalHeader>{props?.data ? 'Update product' : 'Create product'}</ModalHeader>
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
                isInvalid={!!formik.errors.productName && formik.touched.productName}
              >
                <FormLabel htmlFor="product">Product name</FormLabel>
                <Input
                  id="productName"
                  name="productName"
                  type="text"
                  variant="filled"
                  onChange={formik.handleChange}
                  value={formik.values.productName}
                
                />
            
                <FormErrorMessage>{formik.errors.productName}</FormErrorMessage>
              </FormControl>

              <Flex>
                <FormControl
                  isInvalid={
                    !!formik.errors.quantity && formik.touched.quantity
                  }
                >
                  <FormLabel htmlFor="quantity"> Quantity</FormLabel>
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    variant="filled"
                    onChange={formik.handleChange}
                    value={formik.values.quantity}
                  />

                  <FormErrorMessage>{formik.errors.quantity}</FormErrorMessage>
                </FormControl>
                <Divider orientation="vertical" width={"12"} />
                <FormControl
                  isInvalid={!!formik.errors.price && formik.touched.price}
                >
                  <FormLabel htmlFor="price">Price(GHS)</FormLabel>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    variant="filled"
                    onChange={formik.handleChange}
                    value={formik.values.price}
                  />
                  <FormErrorMessage>{formik.errors.price}</FormErrorMessage>
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
