import React,{useState,useEffect} from 'react'
import { Button, ButtonGroup, Container, HStack, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, useDisclosure, VStack, Wrap, WrapItem } from '@chakra-ui/react';
import { FaEdit, FaPlus, FaRecycle } from 'react-icons/fa';
import { CustomAlertDialog, ProductModalForCreateAndEdit } from '../Components';
import { ProductServices } from '../Services';
import { ProductInt } from '../Interfaces';

    // interface ProductInt{
    //         id:any,
    //         productName:string;
    //         quantity:any,
    //         price?:any,
    //         updatedAt:any;
    // }

export const AdminDashboardSock = () => {

    const [data,setData] = useState<any[]>([]);
    const [product,setProduct] = useState<Partial<ProductInt>>();
    // const { isOpen, onOpen, onClose,onToggle } = useDisclosure();
    const editAlertProps = useDisclosure();
    const deleteAlertProps = useDisclosure();

    const fetchProducts = async () =>{
        const result = await ProductServices.getProducts({});
        if(result.status === true){
            setData((_prev:Partial<ProductInt>[])=>(result?.data));
        }
    }

    const handleDelete = async () =>{
        const result = await ProductServices.deleteProduct(product);
        deleteAlertProps.onClose();
        if(result?.status ===true){
            await fetchProducts()
        }
    }

    useEffect(() => {

        fetchProducts()

      return () => {
        
      };
    }, [])


    return (
        <VStack minW="full" bg='Background' >
            
            <HStack align={"flex-end"} justifyContent={"flex-end"}  minW="full" >
                <Button onClick={()=>{
                    setProduct(undefined);
                    editAlertProps.onToggle()
                }} leftIcon={<FaPlus/>} >Add product</Button>
            </HStack>

            <TableContainer minW="full"  >
                    <Table   variant='simple'>
                        <TableCaption>Available products with their attributes</TableCaption>
                        <Thead>
                        <Tr>
                          <Th>#</Th>
                            <Th>Product</Th>
                            <Th isNumeric>Quantity</Th>
                            <Th>Last Updated</Th>
                            <Th >Action</Th>
                        </Tr>
                        </Thead>
                        <Tbody>

                            {
                                data?.map((prod,index,arr)=><Tr key={`products-table-row-${index}`}>
                                <Td>{index+1}</Td>
                                <Td>{prod?.productName}</Td>
                                <Td isNumeric >{prod?.quantity}</Td>
                                <Td >{prod?.updatedAt}</Td>
                                <Td> 
                                    <ButtonGroup>
                                        <Button size={"xs"} onClick={()=>{
                                            setProduct((_prev)=>(prod));
                                            editAlertProps.onOpen()
                                        }} leftIcon={<FaEdit/>}  >Edit</Button>
                                        <Button size={"xs"} onClick={()=>{
                                            setProduct((_prev)=>(prod));
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
                            <Th>Product</Th>
                            <Th isNumeric>Quantity</Th>
                            <Th>Last Updated</Th>
                            <Th >Action</Th>
                            
                        </Tr>
                        </Tfoot>
                    </Table>
             </TableContainer>
        
           {editAlertProps.isOpen &&  <ProductModalForCreateAndEdit isOpen={editAlertProps?.isOpen} onOpen={editAlertProps?.onOpen} onClose={editAlertProps?.onClose} onToggle={editAlertProps?.onToggle} data={product} callback={fetchProducts} />}
           {/* { <ProductModalForCreateAndEdit isOpen={isOpen} onOpen={onOpen} onClose={onClose} onToggle={onToggle} data={product} />} */}

            <CustomAlertDialog isOpen={deleteAlertProps?.isOpen} onOpen={deleteAlertProps?.onOpen} onClose={deleteAlertProps?.onClose} onToggle={deleteAlertProps?.onToggle} title={"Delete product"} data={product} message={`Continue to delete? You can't undo this process.`} callback={handleDelete} />


        </VStack>
    )
}
