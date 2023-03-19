import { VStack, TableContainer, Table, Thead, Tr, Th, Tbody, Td, IconButton, Collapse } from '@chakra-ui/react'
import moment from 'moment';
import React, { useEffect } from 'react';
import { FaMinus, FaPlus, FaPrint } from 'react-icons/fa';
import { useCreditPurchaseClientPrinter } from '../hooks';
import { SalesType } from '../Interfaces';

interface Props {
  data: Array<SalesType>
}

export const PurchaseHistory = (props: Props) => {
  const [expandIndex, setExpandIndex] = React.useState<number>(-1);
  const { handlePrint, PrintComponent } = useCreditPurchaseClientPrinter()

  return (
    <>
      <VStack className='non-printable'>
        <TableContainer minW="full">
          <Table >
            <Thead>
              <Tr>
                <Th>
                  #
                </Th>
                <Th>Reference</Th>
                <Th>Date</Th>
                <Th isNumeric>Amount Paid GH&#162; </Th>
                <Th isNumeric>Print</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                props?.data?.map((val, index: number, arr: any) =>
                  <>
                    <Tr cursor={"pointer"} key={`sales-table-row-${index}`} bg={"orange.200"}
                      bgGradient={expandIndex === index ? "linear(to-r, orange.200, orange.100)" : "none"}
                      onClick={() => setExpandIndex((_prev) => (_prev === index ? -1 : index))} >
                      <Td>
                        <IconButton size={"xs"} aria-label="Expand" icon={expandIndex === index ? <FaMinus /> : <FaPlus />} onClick={
                          (e) => {
                            e.stopPropagation();
                            setExpandIndex((_prev) => (_prev === index ? -1 : index));
                          }
                        } />
                      </Td>
                      <Td>{val?.reference}</Td>
                      <Td>{moment(val?.createdAt).format('YYYY-MM-DD HH:mm')}</Td>
                      <Td isNumeric>{parseFloat(`${val?.amountPaid || '0.0'}`).toFixed(2)}</Td>
                      <Td isNumeric>
                        <IconButton size={"xs"} aria-label="Print" icon={<FaPrint />} onClick={
                          (e) => {
                            e?.stopPropagation();
                            handlePrint(val);
                          }
                        } />
                      </Td>
                    </Tr>
                    <Tr>
                      <Td colSpan={4} borderColor={"transparent"} >
                        <Collapse in={expandIndex === index} animateOpacity>
                          <Table variant="simple" >
                            <Thead>
                              <Tr>
                                <Th>Product</Th>
                                <Th isNumeric>Price GH&#162;</Th>
                                <Th isNumeric>Quantity</Th>
                                <Th isNumeric>Amount GH&#162;
                                </Th>
                              </Tr>
                            </Thead>
                            <Tbody >
                              {val?.items?.map((item: any, index: number, arr: any) => <Tr >
                                <Td>{item?.productName}</Td>
                                <Td isNumeric>{parseFloat(`${item?.price || '0.0'}`).toFixed(2)}</Td>
                                <Td isNumeric>{parseInt(`${item?.quantity || '0'}`)}</Td>
                                <Td isNumeric>{parseFloat(`${item?.price || '0.0'} * ${item?.quantity || '0.0'}`).toFixed(2)}</Td>
                              </Tr>)}
                            </Tbody>
                          </Table>
                        </Collapse>
                      </Td>

                    </Tr>
                  </>
                )
              }
            </Tbody>
          </Table>
        </TableContainer>

      </VStack>
      <PrintComponent />
    </>
  )
}
