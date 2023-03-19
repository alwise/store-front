import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, Flex, Spacer, Divider, Collapse } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { MultiSelect } from 'react-multi-select-component';
import { CustomAlert } from '../Components';
import { CustomerInt } from '../Interfaces';
import { currentUser, CustomerService } from '../Services';

interface Props {
  isOpen: boolean; onOpen?: any, onClose?: any, data?: any, selected?: any, customer?: CustomerInt, customers?: Partial<CustomerInt[]>, callback?: any
}
export const Payment = (props: Props) => {
  // const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null);
  const [amount, setAmount] = useState<string>('0.0')
  const [showAlert, setAlert] = useState<boolean>(false);
  const [isError, setIsError] = useState<any>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<any>('');
  const [customer, setCustomer] = useState<Partial<any>>();
  const [customersDataOptions, setCustomersDataOptions] = useState<any[]>(props?.data);
  const [selectedCustomerDataOption, setSelectedCustomerDataOption] = useState<any[]>(props?.selected);


  const handlePayment = async () => {
    setLoading(true)
    const value = {
      customerId: selectedCustomerDataOption?.at(0)?.key,
      previousAmount: customer?.balance,
      paidAmount: parseFloat(parseFloat(amount)?.toFixed(2)),
      newBalance: parseFloat(`${customer?.balance || 0.0}`) - parseFloat(amount),
      paidTo: currentUser()?.id
    }
    const result = await CustomerService.makePayment(value);
    setLoading(false)
    setIsError(result.status);
    setAlert(true);
    setMessage(result.message)
    setTimeout(() => {
      if (result.status === true) {
        setAlert(false);
        setMessage('')
        props.onClose();
        if (props?.callback) {
          props?.callback(result?.data);
        }
      }
    }, 1500)

  }

  const handleCustomerChange = (customerData: any[]) => {
    if (!customerData) return;
    const selectedCustomerCopy: any[] = [];
    if (customerData?.length === 0) {
      setSelectedCustomerDataOption((_prev) => (selectedCustomerCopy));
      setCustomer((_prev) => (props.customers?.filter((val) => val?.id === selectedCustomerCopy?.at(0)?.key).at(0)))
      return;
    }
    if (customerData?.length > 0) {
      const index = customerData?.length - 1;
      const lastData = customerData[index];
      selectedCustomerCopy.push(lastData);
      setSelectedCustomerDataOption((_prev) => (selectedCustomerCopy));
      setCustomer((_prev) => (props.customers?.filter((val) => val?.id === selectedCustomerCopy?.at(0)?.key).at(0)))
      return;
    }

    const lastData = customerData[0];
    selectedCustomerCopy.push(lastData);
    setSelectedCustomerDataOption((_prev) => (selectedCustomerCopy));
    setCustomer((_prev) => (props.customers?.filter((val) => val?.id === selectedCustomerCopy?.at(0)?.key).at(0)))

  }

  useEffect(() => {
    setCustomer((_prev) => (props?.customer));
    setCustomersDataOptions(props?.data);
    setSelectedCustomerDataOption(props?.selected);
    return () => {

    }
  }, [props?.customer, props?.data, props?.selected])

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={props.isOpen === true ? true : false}
        onClose={props.onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Payment, {customer?.name?.toUpperCase()}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Collapse in={showAlert} animateOpacity >
              <CustomAlert message={message} isSuccess={isError} />
            </Collapse>
            <MultiSelect hasSelectAll={false} options={customersDataOptions} value={selectedCustomerDataOption} labelledBy={'Customers'} onChange={handleCustomerChange} closeOnChangedValue={true} />

            <Flex display={"flex"} justifyContent="space-between" whiteSpace="break-spaces" mt="2" >
              <FormControl >
                <FormLabel>Amount paid GH&#162;</FormLabel>
                <Input type="number" onChange={(e) => setAmount(e.target.value)} placeholder='0.00' autoFocus={true} />
              </FormControl>

              <FormControl left={"20"} textAlign="center" >
                <FormLabel textAlign={"center"} >Balance</FormLabel>
                <Input border="none" maxW={'fit-content'}
                  value={`GHC ${customer?.balance}`} readOnly type="text" ref={initialRef} placeholder='0.0' autoFocus={false} />
              </FormControl>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button isLoading={isLoading} onClick={handlePayment} colorScheme='blue' mr={3}>
              Submit
            </Button>
            <Button onClick={props.onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </>
  )
}

