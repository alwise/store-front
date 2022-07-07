import React,{useState,useEffect} from 'react'
import { Button, ButtonGroup, Container, HStack, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, useDisclosure, VStack, Wrap, WrapItem } from '@chakra-ui/react';
import { FaEdit, FaMoneyBill, FaPlus, FaRecycle } from 'react-icons/fa';
import { CustomAlertDialog } from '../Components';
import { AuthServices, CustomerService } from '../Services';
import { CustomerInt, MultiSelectOptionInt } from '../Interfaces';
import { CustomerModalForCreateAndEdit } from '../Components/CustomerModal';
import { Payment } from './';


export const AdminDashboardCustomers = () => {
    const [data,setData] = useState<Partial<CustomerInt>[]>([]);
    const [customer,setCustomer] = useState<Partial<CustomerInt>>();
    const [customersDataOptions,setCustomersDataOptions] = useState<any[]>([]);
    const paymentAlertProps = useDisclosure();
    const editAlertProps = useDisclosure();
    const deleteAlertProps = useDisclosure();

    const fetchCustomers = async () =>{
        const result = await CustomerService.getCustomers({});
        if(result?.status === true){
            const _data:Partial<CustomerInt>[] = result?.data || [];
            setData((_prev:Partial<CustomerInt>[])=>(_data));
            convertCustomersToSelectable(_data);
        }
    }

    const convertCustomersToSelectable = (customersData:any) =>{
        const copyOriginalCustomers = [...customersData];
        const tempCustomerOptions:MultiSelectOptionInt[] = [];
        copyOriginalCustomers?.forEach((_customer,index,arr)=>{
          tempCustomerOptions.push({
              key:_customer?.id,
              label:_customer?.name,
              value:_customer?.id,
              disabled:false,
          });
        });
        setCustomersDataOptions((_prev)=>(tempCustomerOptions));
      }

    const handleDelete = async () =>{
        const result = await AuthServices.deleteUser(customer);
        deleteAlertProps.onClose();
        if(result?.status === true){
           await fetchCustomers();
        }
    }

    useEffect(() => {
        fetchCustomers()
        // setData((prev)=>(sampleData));

      return () => {
        
      };
    }, [])


    return (
        <VStack minW="full" bg='Background' >
            
            <HStack align={"flex-end"} justifyContent={"flex-end"}  minW="full" >
                <Button onClick={()=>{
                    setCustomer((_prev:any)=>(undefined));
                    editAlertProps.onToggle()
                }} leftIcon={<FaPlus/>} >Add customer</Button>
            </HStack>

            <TableContainer minW="full"  >
                    <Table   variant='simple'>
                        <TableCaption>Customers</TableCaption>
                        <Thead>
                        <Tr>
                          <Th>#</Th>
                            <Th>Name</Th>
                            <Th isNumeric>PhoneNumber</Th>
                            <Th isNumeric>GH&#162;</Th>
                            {/* <Th>Last Updated</Th> */}
                            <Th >Action</Th>
                        </Tr>
                        </Thead>
                        <Tbody>

                            {
                                data?.map((user,index,arr)=><Tr key={`users-table-row-${index}`}>
                                <Td>{index+1}</Td>
                                <Td>{user?.name}</Td>
                                <Td isNumeric >{user?.phoneNumber}</Td>
                                <Td isNumeric >{parseFloat(`${user?.balance || 0.0}`).toFixed(2)}</Td>
                                {/* <Td >{user?.updatedAt}</Td> */}
                                <Td> 
                                    <ButtonGroup>
                                         <Button size={"xs"} colorScheme={"green"}  leftIcon={<FaMoneyBill/>} 
                                         onClick={()=>{
                                            setCustomer((_prev:any)=>(user));
                                            paymentAlertProps.onOpen();
                                         }}
                                         >Pay</Button>
                                        <Button size={"xs"} onClick={()=>{
                                            setCustomer((_prev:any)=>(user));
                                            editAlertProps.onOpen()
                                        }} leftIcon={<FaEdit/>}  >Edit</Button>
                                        <Button size={'xs'} onClick={()=>{
                                            setCustomer((_prev:any)=>(user));
                                            deleteAlertProps.onToggle();
                                        }} leftIcon={<FaRecycle/>}   colorScheme="red" >Delete</Button>
                                        
                                    </ButtonGroup>
                                 </Td>
                                     </Tr>)
                            }
                      
                        </Tbody>
                        <Tfoot>
                        <Tr>
                           <Th>#</Th>
                            <Th>Name</Th>
                            <Th isNumeric>Phone Number</Th>
                            {/* <Th>  </Th> */}
                            <Th isNumeric>GH&#162;</Th>
                            <Th >Action</Th>
                            
                        </Tr>
                        </Tfoot>
                    </Table>
             </TableContainer>

            
                <Payment onOpen={paymentAlertProps.onOpen} onClose={paymentAlertProps.onClose} isOpen={paymentAlertProps.isOpen} data={customersDataOptions} selected={customersDataOptions.filter((val)=>val?.key === customer?.id)} customer={customer} customers={data} callback={fetchCustomers}  />
            
              
        
             {editAlertProps.isOpen && <CustomerModalForCreateAndEdit isOpen={editAlertProps?.isOpen} onOpen={editAlertProps?.onOpen} onClose={editAlertProps?.onClose} onToggle={editAlertProps?.onToggle} data={customer} callback={fetchCustomers} />}
      
            <CustomAlertDialog isOpen={deleteAlertProps?.isOpen} onOpen={deleteAlertProps?.onOpen} onClose={deleteAlertProps?.onClose} onToggle={deleteAlertProps?.onToggle} title={"Delete customer"} data={customer} message={`Continue to delete? You can't undo this process.`} callback={handleDelete} />


        </VStack>
    )
}
