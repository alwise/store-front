import { useState, useEffect } from 'react'
import { Button, ButtonGroup, HStack, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tooltip, Tr, useDisclosure, VStack } from '@chakra-ui/react';
import { FaEdit, FaEye, FaMoneyBill, FaPlus, FaRecycle } from 'react-icons/fa';
import { CustomAlertDialog } from '../Components';
import { AuthServices, CustomerService } from '../Services';
import { CustomerInt, MultiSelectOptionInt } from '../Interfaces';
import { CustomerModalForCreateAndEdit } from '../Components/CustomerModal';
import { Payment } from './';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../Utilities';


export const AdminDashboardCustomers = () => {
    const [data, setData] = useState<Partial<CustomerInt>[]>([]);
    const [customer, setCustomer] = useState<Partial<CustomerInt>>();
    const [customersDataOptions, setCustomersDataOptions] = useState<any[]>([]);
    const paymentAlertProps = useDisclosure();
    const editAlertProps = useDisclosure();
    const deleteAlertProps = useDisclosure();
    const navigate = useNavigate();

    const fetchCustomers = async () => {
        const result = await CustomerService.getCustomers({});
        if (result?.status === true) {
            const _data: Partial<CustomerInt>[] = result?.data || [];
            setData((_prev: Partial<CustomerInt>[]) => (_data));
            convertCustomersToSelectable(_data);
        }
    }

    const convertCustomersToSelectable = (customersData: any) => {
        const copyOriginalCustomers = [...customersData];
        const tempCustomerOptions: MultiSelectOptionInt[] = [];
        copyOriginalCustomers?.forEach((_customer, index, arr) => {
            tempCustomerOptions.push({
                key: _customer?.id,
                label: _customer?.name,
                value: _customer?.id,
                disabled: false,
            });
        });
        setCustomersDataOptions((_prev) => (tempCustomerOptions));
    }

    const handleDelete = async () => {
        const result = await AuthServices.deleteUser(customer);
        deleteAlertProps.onClose();
        if (result?.status === true) {
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

            <HStack align={"flex-end"} justifyContent={"flex-end"} minW="full" >
                <Button onClick={() => {
                    setCustomer((_prev: any) => (undefined));
                    editAlertProps.onToggle()
                }} leftIcon={<FaPlus />} >Add customer</Button>
            </HStack>

            <TableContainer minW="full"  >
                <Table variant='simple'>
                    <TableCaption>Customers</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>#</Th>
                            <Th>Name</Th>
                            <Th isNumeric>PhoneNumber</Th>
                            <Th isNumeric>GH&#162;</Th>
                            <Th>Last paid</Th>
                            <Th >Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>

                        {
                            data?.map((user, index, arr) => <Tr key={`users-table-row-${index}`}>
                                <Td>{index + 1}</Td>
                                <Td>{user?.name}</Td>
                                <Td isNumeric >{user?.phoneNumber}</Td>
                                <Tooltip hasArrow label={Number(user?.balance) < 0 ? "Debt (You owe this customer)" : "Credit (customer owes you)"} aria-label="A tooltip">
                                    <Td
                                        // 50% gradien background color for negative balance
                                        bg={Number(user?.balance) < 0 ? "linear-gradient(10deg, rgba(255,0,0,1) 10%, rgba(255,0,0,0.0) 10%, rgba(255,255,255,1) 20%, rgba(255,255,255,1) 100%)" : 'inherit'}
                                        isNumeric borderBottomWidth={Number(user?.balance) < 0 ? 'small' : 'thin'} borderBottomColor={Number(user?.balance) < 0 ? "red" : 'inherit'} >{Number(user?.balance) < 0 ? `(${parseFloat(`${user?.balance || 0.0}`).toFixed(2)})` : parseFloat(`${user?.balance || 0.0}`).toFixed(2)}</Td>
                                </Tooltip>
                                <Td>{moment(user?.updatedAt).format("YYYY-MM-DD")}</Td>
                                {/* <Td >{user?.updatedAt}</Td> */}
                                <Td>
                                    <ButtonGroup>
                                        <Button size={"xs"} colorScheme={"green"} leftIcon={<FaEye />}
                                            onClick={() => {
                                                navigate(Routes.dashboard.pages.transactionHistory.path, { state: { title: Routes.dashboard.pages.transactionHistory.title, customer: user } })
                                            }}
                                        >View</Button>
                                        <Button size={"xs"} colorScheme={"green"} leftIcon={<FaMoneyBill />}
                                            onClick={() => {
                                                setCustomer((_prev: any) => (user));
                                                paymentAlertProps.onOpen();
                                            }}
                                        >Pay</Button>
                                        <Button size={"xs"} onClick={() => {
                                            setCustomer((_prev: any) => (user));
                                            editAlertProps.onOpen()
                                        }} leftIcon={<FaEdit />}  >Edit</Button>
                                        <Button size={'xs'} onClick={() => {
                                            setCustomer((_prev: any) => (user));
                                            deleteAlertProps.onToggle();
                                        }} leftIcon={<FaRecycle />} colorScheme="red" >Delete</Button>

                                    </ButtonGroup>
                                </Td>
                            </Tr>)
                        }

                    </Tbody>
                    {/* <Tfoot>
                        <Tr>
                           <Th>#</Th>
                            <Th>Name</Th>
                            <Th isNumeric>Phone Number</Th>
                            
                            <Th isNumeric>GH&#162;</Th>
                            <Th>Last paid</Th>
                            <Th >Action</Th>
                            
                        </Tr>
                        </Tfoot> */}
                </Table>
            </TableContainer>


            <Payment onOpen={paymentAlertProps.onOpen} onClose={paymentAlertProps.onClose} isOpen={paymentAlertProps.isOpen} data={customersDataOptions} selected={customersDataOptions.filter((val) => val?.key === customer?.id)} customer={customer} customers={data} callback={fetchCustomers} />

            {editAlertProps.isOpen && <CustomerModalForCreateAndEdit isOpen={editAlertProps?.isOpen} onOpen={editAlertProps?.onOpen} onClose={editAlertProps?.onClose} onToggle={editAlertProps?.onToggle} data={customer} callback={fetchCustomers} />}

            <CustomAlertDialog isOpen={deleteAlertProps?.isOpen} onOpen={deleteAlertProps?.onOpen} onClose={deleteAlertProps?.onClose} onToggle={deleteAlertProps?.onToggle} title={"Delete customer"} data={customer} message={`Continue to delete? You can't undo this process.`} callback={handleDelete} />


        </VStack>
    )
}
