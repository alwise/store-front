import {  Heading, Spacer, Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber, Table, TableContainer, Tbody, Td, Th, Thead, Tr, VStack } from '@chakra-ui/react'
import moment from 'moment'
import React,{useEffect, useState} from 'react'
import { StatsInt } from '../Interfaces'
import { PosServices } from '../Services'
import { SalesInt } from '../Interfaces/SalesInterface';


export const AdminDashboardSummary = () => {

    const [cashToday,setCashToday] = useState<StatsInt>({totalAmount:0.0,salesCount:0})

    const [creditToday,setCreditToday] = useState<StatsInt>({totalAmount:0.0,salesCount:0})

    const [cashThisMonth,setCashThisMonth] = useState<StatsInt>({totalAmount:0.0,salesCount:0})

    const [creditThisMonth,setCreditThisMonth] = useState<StatsInt>({totalAmount:0.0,salesCount:0})

    const [salesToday,setSalesToday] = useState<SalesInt[]>([])


    const fetchStatsData = async () =>{
        const date = moment().format('YYYY-MM-DD');
        const cashToday = await PosServices.getPosStats({isCredit:false,date});
        if(cashToday.status === true){
            setCashToday((_prev)=>(cashToday?.data));
        }
        const creditToday = await PosServices.getPosStats({isCredit:true,date});
        if(creditToday.status === true){
            setCreditToday((_prev)=>(creditToday?.data));
        }
        const yearMonth = moment().format('YYYY-MM');
        const cashMonth = await PosServices.getPosStats({isCredit:false,yearMonth});
        if(cashMonth.status === true){
            setCashThisMonth((_prev)=>(cashMonth?.data));
        }
        const creditMonth = await PosServices.getPosStats({isCredit:true,yearMonth});
        if(creditMonth.status === true){
            setCreditThisMonth((_prev)=>(creditMonth?.data));
        }
    }


    const refreshTable = async() =>{
        const date = moment().format('YYYY-MM-DD');
        const sales = await PosServices.getPosData({date});
        if(sales.status === true){
            setSalesToday((_prev)=>(sales?.data));
        }
    }


    useEffect(() => {
        fetchStatsData();
        refreshTable();
        return () => {
            
        }
    }, [])



    return (
       <VStack minW={"full"}>
          <Spacer minH={"10px"} />
            <StatGroup display="flex" minW={"full"} justifyContent={"space-between"}>
            <Stat>
                <StatLabel>Cash sales</StatLabel>
                <StatNumber>GH&#162;{parseFloat(`${cashToday?.totalAmount||0.0}`).toFixed(2)}</StatNumber>
                <StatHelpText>
                <StatArrow type='increase' />
                 Today({cashToday?.salesCount})
                </StatHelpText>
            </Stat>

            <Stat>
                <StatLabel>Credit sales</StatLabel>
                <StatNumber>GH&#162;{parseFloat(`${creditToday?.totalAmount || 0.0}`).toFixed(2)}</StatNumber>
                <StatHelpText>
                <StatArrow type='decrease' />
                 Today({creditToday.salesCount})
                </StatHelpText>
            </Stat>
            <Stat>
                <StatLabel>Cash sales</StatLabel>
                <StatNumber>GH&#162;{parseFloat(`${cashThisMonth?.totalAmount || 0.0}`).toFixed(2)}</StatNumber>
                <StatHelpText>
                <StatArrow type='increase' />
                 This month({cashThisMonth?.salesCount})
                </StatHelpText>
            </Stat>

            <Stat>
                <StatLabel>Credit sales</StatLabel>
                <StatNumber>GH&#162;{parseFloat(`${creditThisMonth?.totalAmount||0.0}`).toFixed(2)}</StatNumber>
                <StatHelpText>
                <StatArrow type='decrease' />
                 This month({creditThisMonth?.salesCount})
                </StatHelpText>
            </Stat>
          </StatGroup>
            <Spacer minH={"20px"} />
            <Heading size={"md"} mt="40px">Transactions</Heading>
          <TableContainer minW="full">
            <Table>
                    <Thead>
                        <Tr>
                            <Th>#</Th>
                            <Th>Reference</Th>
                            <Th>GH&#162;</Th>
                            <Th>Items</Th>
                            <Th>Type</Th>
                            <Th>Date</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                            {
                                salesToday?.map((sales,index,arr)=>
                                    <Tr key={`sales-today-data-table-${index}`}>
                                        <Td>{index+1}.</Td>
                                        <Td>{sales?.reference}</Td>
                                        <Td>{parseFloat(`${sales?.subTotal || 0.0}`).toFixed(2)}</Td>
                                        <Td>{sales?.items?.length || 0}</Td>
                                        <Td>{sales?.isCredit ? 'Credit' : 'Cash'}</Td>
                                        <Td>{moment(sales?.updatedAt).fromNow()}</Td>
                                    </Tr>
                                )
                            }

                    </Tbody>

            </Table>

          </TableContainer>


            

       </VStack>
    )
}
