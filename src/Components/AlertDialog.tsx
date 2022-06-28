import {  Button, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Stack, Alert, AlertIcon } from "@chakra-ui/react"
import React from "react"


interface Props {
    isSuccess?:boolean;
    isOpen?:boolean, onOpen?:any, onClose?:any,onToggle?:any,
    data?:any;
    title?:string;
    message?:string;
    buttonText?:string | undefined;
    isDelete?:boolean;
    callback?:any
}

export const CustomAlertDialog = (props:Props) => {
    // const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef:any = React.useRef()


  return (
    <>
      <AlertDialog
        isOpen={props?.isOpen ? true : false}
        leastDestructiveRef={cancelRef}
        onClose={props?.onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            {`${props?.title}` || 'Delete Customer'}
            </AlertDialogHeader>

            <AlertDialogBody>
             {props?.message || `Are you sure? You can't undo this action afterwards.`}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={props?.onClose}>
                Cancel
              </Button>
              <Button colorScheme={ props?.isDelete ? 'red':'blue' } onClick={props?.callback} ml={3}>
                { props?.buttonText || 'Delete'}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
   

      </>
    )
  }


export const CustomAlert = (props:Props) =>{
    return (
      <Stack>
        {!props?.isSuccess && <Alert maxW={'full'} variant={"solid"}  status='error'>
          <AlertIcon />
         { props?.message || ' There was an error processing your request'}
        </Alert>}

       {props?.isSuccess && <Alert variant={"solid"}  status='success'>
          <AlertIcon />
          { props?.message || 'Data submitted successfully'}
          
        </Alert>}

      </Stack>
    )

}