import {  VStack, TableContainer,Table, Thead, Tr, Th,  Tbody, Td } from '@chakra-ui/react'

import moment from 'moment'

interface Props{
    data:any
}

export const PaymentHistory = (props:Props) => {
  
  return (
    <VStack>

        <TableContainer minW={"full"}>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>#</Th>
                            <Th>Reference</Th>
                            <Th>Date</Th>
                            <Th isNumeric>Amount Paid GH&#162; </Th>
                        </Tr>
                    </Thead>

                    <Tbody>
                       {
                         props?.data?.map((val:any,index:number,arr:any)=>
                          <Tr>
                                <Td>{index+1}</Td>
                                <Td>{val?.reference}</Td>
                                <Td>{moment(val?.createdAt).format('YYYY-MM-DD HH:mm')}</Td>
                                <Td isNumeric>{parseFloat(`${val?.paidAmount || '0.0'}`).toFixed(2)}</Td>
                          </Tr> )
                       }
                    </Tbody>
                </Table>

        </TableContainer>

    </VStack>
  )
}
