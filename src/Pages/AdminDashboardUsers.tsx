import React,{useState,useEffect} from 'react'
import { Button, ButtonGroup, Container, HStack, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, useDisclosure, VStack, Wrap, WrapItem } from '@chakra-ui/react';
import { FaEdit, FaPlus, FaRecycle } from 'react-icons/fa';
import { CustomAlertDialog, UserModalForCreateAndEdit } from '../Components';
import { AuthServices } from '../Services';
import { UserInt } from '../Interfaces';




export const AdminDashboardUsers = () => {
    const [data,setData] = useState<Partial<UserInt>[]>([]);
    const [staff,setStaff] = useState<Partial<UserInt>>();
    // const { isOpen, onOpen, onClose,onToggle } = useDisclosure();
    const editAlertProps = useDisclosure();
    const deleteAlertProps = useDisclosure();

    const fetchUsers = async () =>{
        const result = await AuthServices.getUsers({});
        if(result?.status === true){
            const _data:Partial<UserInt>[] = result?.data || [];
            setData((_prev:Partial<UserInt>[])=>(_data));
        }
    }

    const handleDelete = async () =>{
        const result = await AuthServices.deleteUser(staff);
        deleteAlertProps.onClose();
        if(result?.status === true){
           await fetchUsers();
        }
    }

    useEffect(() => {
        fetchUsers()
        // setData((prev)=>(sampleData));

      return () => {
        
      };
    }, [])


    return (
        <VStack minW="full" bg='Background' >
            
            <HStack align={"flex-end"} justifyContent={"flex-end"}  minW="full" >
                <Button onClick={()=>{
                    setStaff((_prev:any)=>(undefined));
                    editAlertProps.onToggle()
                }} leftIcon={<FaPlus/>} >Add staff</Button>
            </HStack>

            <TableContainer minW="full"  >
                    <Table   variant='simple'>
                        <TableCaption>Users of the system</TableCaption>
                        <Thead>
                        <Tr>
                          <Th>#</Th>
                            <Th>Name</Th>
                            <Th isNumeric>PhoneNumber</Th>
                            <Th>Roles</Th>
                            <Th>Last Updated</Th>
                            <Th >Action</Th>
                        </Tr>
                        </Thead>
                        <Tbody>

                            {
                                data?.map((user,index,arr)=><Tr key={`users-table-row-${index}`}>
                                <Td>{index+1}</Td>
                                <Td>{user?.name}</Td>
                                <Td isNumeric >{user?.phoneNumber}</Td>
                                <Td  >{user?.role}</Td>
                                <Td >{user?.updatedAt}</Td>
                                <Td> 
                                    <ButtonGroup>
                                        <Button size={"xs"} onClick={()=>{
                                            setStaff((_prev:any)=>(user));
                                            editAlertProps.onOpen()
                                        }} leftIcon={<FaEdit/>}  >Edit</Button>
                                        <Button size={"xs"} onClick={()=>{
                                            setStaff((_prev:any)=>(user));
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
                            <Th isNumeric>PhoneNumber</Th>
                            <Th>Roles</Th>
                            <Th>Last Updated</Th>
                            <Th >Action</Th>
                            
                        </Tr>
                        </Tfoot>
                    </Table>
             </TableContainer>
        
             {editAlertProps.isOpen && <UserModalForCreateAndEdit isOpen={editAlertProps?.isOpen} onOpen={editAlertProps?.onOpen} onClose={editAlertProps?.onClose} onToggle={editAlertProps?.onToggle} data={staff} callback={fetchUsers} />}
      
            <CustomAlertDialog isOpen={deleteAlertProps?.isOpen} onOpen={deleteAlertProps?.onOpen} onClose={deleteAlertProps?.onClose} onToggle={deleteAlertProps?.onToggle} title={"Delete user"} data={staff} message={`Continue to delete? You can't undo this process.`} callback={handleDelete} />


        </VStack>
    )
}
