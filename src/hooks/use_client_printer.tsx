import { Container, Divider, Heading, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import moment from "moment";
import { ReactElement, useEffect, useRef, useState } from "react";
import { CustomerInt, PaymentType, SalesType, UserInt } from "../Interfaces";
import AuthService from "../Services/AuthServices";
import CustomerService from "../Services/CustomerService";

export const useCreditPurchaseClientPrinter = () => {
    const [data, setData] = useState<Partial<SalesType>>();
    // const componentRef = useRef<ReactElement>();

    const handlePrint = (data: Partial<SalesType>) => {
        // add display: none to the print component
        setData(data);
        setTimeout(() => {
            window.print();
            /// clear data
            setData({})
        }, 1000);
    }

    // <CreditSalesPrintComponent data={data} />
    return {
        handlePrint, setData,
        PrintComponent: () => data?.id ? <CreditSalesPrintComponent data={data} /> as React.ReactElement : null
    };
};

export const CreditSalesPrintComponent = ({ data }: {
    data?: Partial<SalesType>
}) => {
    const [user, setUser] = useState<UserInt>();
    const [customer, setCustomer] = useState<CustomerInt>();

    async function findCustomerById(id: string) {
        const result = await CustomerService?.getCustomerById(id);
        if (result.status == true) {
            setCustomer(result?.data);
        }
    }

    async function findUserById(id: string) {
        const result = await AuthService?.getUserById(id);
        if (result.status == true) {
            setUser(result?.data);
        }
    }
    useEffect(() => {
        findUserById(data?.soldBy || '');
        findCustomerById(data?.customerId || '');
    }, [data]);
    return (
        <Container display={'none'} className="print-view" maxW="container.md" >
            <Heading as="h6" size="xs" textAlign="center" >ED Yeboah Cold Store</Heading>
            <Heading as="h6" size="xs" textAlign="center" >Asafo, Near Star Oil</Heading>
            <Heading as="h6" size="xs" textAlign="center" >0209860893 / 0544832925</Heading>
            <Heading as="h6" size="xs" textAlign="center" >Ref: {" "}{data?.reference} {moment(`${data?.date}`).format("YYYY-MM-DD HH:mm")}</Heading>
            <Heading as="h6" size="xs" textAlign="center" >{user?.name}</Heading>
            <Heading as="h6" size="xs" textAlign="center" >{customer?.name}</Heading>
            <TableContainer minW="full">
                <Table>
                    <Thead>
                        <Tr>
                            <Th>#</Th>
                            <Th>Item</Th>
                            <Th>Quantity</Th>
                            <Th>Unit Price(GH₵)</Th>
                            <Th>Total Price(GH₵)</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            data?.items?.map((val, index: number, arr: any) =>
                                <Tr key={`sales-table-row-${index}`}>
                                    <Td>{index + 1}</Td>
                                    <Td>{val?.productName}</Td>
                                    <Td>{val?.quantity}</Td>
                                    <Td>{val?.price}</Td>
                                    <Td isNumeric>{parseFloat(`${Number(val?.price) * Number(val?.quantity)}`)?.toFixed(2)}</Td>
                                </Tr>
                            )
                        }
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th isNumeric colSpan={4}>Subtotal</Th>
                            <Th isNumeric>{parseFloat(`${data?.subTotal}`)?.toFixed(2)}</Th>
                        </Tr>
                        <Tr>
                            <Th isNumeric colSpan={4}>Amount Paid</Th>
                            <Th isNumeric>{parseFloat(`${data?.amountPaid}`)?.toFixed(2)}</Th>
                        </Tr>
                        <Tr>
                            <Th isNumeric colSpan={4}>Balance</Th>
                            <Th isNumeric>{
                                Number(parseFloat(`${data?.subTotal}`) - parseFloat(`${data?.amountPaid}`)) > 0 ? Number(parseFloat(`${data?.subTotal}`) - parseFloat(`${data?.amountPaid}`))?.toFixed(2) : `(${Number(parseFloat(`${data?.subTotal}`) - parseFloat(`${data?.amountPaid}`))?.toFixed(2)})`
                            }
                            </Th>
                        </Tr>
                        <Tr>
                            <Th isNumeric colSpan={4}>Total</Th>
                            <Th isNumeric>{parseFloat(`${data?.subTotal}`)?.toFixed(2)}</Th>
                        </Tr>

                    </Tfoot>
                </Table>
            </TableContainer>

        </Container>

    )
}

/// client payment printer
export const useClientPaymentPrinter = () => {
    const [data, setData] = useState<Partial<PaymentType>>();
    // const componentRef = useRef<ReactElement>();
    const handlePrint = (data: Partial<PaymentType>) => {
        // add display: none to the print component
        setData(data);
        setTimeout(() => {
            window.print();
            setData({})
        }, 2000);
    }

    // <CreditSalesPrintComponent data={data} />
    return {
        handlePrint, setData,
        PrintComponent: () => data?.id ? <ClientPaymentPrintComponent data={data} /> as React.ReactElement : null
    };
};

export const ClientPaymentPrintComponent = ({ data }: {
    data?: Partial<PaymentType>
}) => {
    const [user, setUser] = useState<UserInt>();
    const [customer, setCustomer] = useState<CustomerInt>();

    async function findCustomerById(id: string) {
        const result = await CustomerService?.getCustomerById(id);
        if (result.status == true) {
            setCustomer(result?.data);
        }
    }

    async function findUserById(id: string) {
        const result = await AuthService?.getUserById(id);
        if (result.status == true) {
            setUser(result?.data);
        }
    }
    useEffect(() => {
        findUserById(data?.paidTo || '');
        findCustomerById(data?.customerId || '');
    }, [data]);
    return (
        <Container display={'none'} className="print-view" maxW="container.md" >
            <Heading as="h6" size="xs" textAlign="center" >ED Yeboah Cold Store</Heading>
            <Heading as="h6" size="xs" textAlign="center" >Asafo, Near Star Oil</Heading>
            <Heading as="h6" size="xs" textAlign="center" >0209860893 / 0544832925</Heading>
            <Heading as="h6" size="xs" textAlign="center" >Ref: {" "}{data?.reference} {moment(`${data?.createdAt}`).format("YYYY-MM-DD HH:mm")}</Heading>
            <Heading as="h6" size="xs" textAlign="center" >{user?.name}</Heading>
            <Heading as="h6" size="xs" textAlign="center" >{customer?.name}</Heading>
            <TableContainer minW="full">
                <Table>
                    <Thead>
                        <Tr>
                            <Th>#</Th>
                            <Th>Item</Th>
                            <Th>Quantity</Th>
                            <Th>Unit Price(GH₵)</Th>
                            <Th>Total Price(GH₵)</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Th isNumeric colSpan={4}>Previous balance</Th>
                            <Th isNumeric>{parseFloat(`${data?.previousAmount}`)?.toFixed(2)}</Th>
                        </Tr>
                        <Tr>
                            <Th isNumeric colSpan={4}>Amount Paid</Th>
                            <Th isNumeric>{parseFloat(`${data?.paidAmount}`)?.toFixed(2)}</Th>
                        </Tr>
                        <Tr>
                            <Th isNumeric colSpan={4}>Amount owing</Th>
                            <Th isNumeric>{
                                Number(data?.newBalance) > 0 ? Number(data?.newBalance)?.toFixed(2) :
                                    `(${Number(data?.newBalance).toFixed(2)})`
                            }
                            </Th>
                        </Tr>
                        <Tr>
                            <Th colSpan={3}>Thank you!!!</Th>

                        </Tr>
                    </Tbody>
                    <Tfoot>


                    </Tfoot>
                </Table>
            </TableContainer>

        </Container>

    )
}
