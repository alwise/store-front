import { Tabs, TabList,Text, Tab,HStack,Button,Flex, TabPanels, TabPanel, VStack,IconButton } from '@chakra-ui/react'
import {useState,useEffect} from 'react'
import { FaArrowAltCircleLeft, FaPrint } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom'
import { PaymentHistory, PurchaseHistory } from '../Pages';
import { CustomerService } from '../Services';
import { Routes } from '../Utilities';

export default function AdminDashboardTransactionDetails() {
  const navigate = useNavigate()
  const loc:any = useLocation();
  const [payment,setPayment] = useState([]);
  const [purchases,setPurchases] = useState([]);


  const fetchHistoryData = async () =>{
    const result = await  CustomerService.getHistory({customerId:loc?.state?.customer?.id});
    if(result.status === true){
      setPurchases(result?.data?.purchases);
      setPayment(result?.data?.payment)
    }
  }

  useEffect(() => {
    fetchHistoryData();
    return () => {
      
    }
  }, [])

  return (
    <VStack >
       <Flex minW="full" >
            <HStack flex={1}>
            <IconButton icon={<FaArrowAltCircleLeft />} aria-label={'arrow-back'} onClick={()=>navigate(Routes.dashboard.pages.customer.path,{state:{title:Routes.dashboard.pages.customer.title},replace:true})} />
             <Text textTransform={"capitalize"} >{loc?.state?.customer?.name || 'n/a'}</Text>  
            </HStack>
             <Button disabled={true} leftIcon={<FaPrint/>} >Print</Button>
        </Flex>

    <Tabs  minW="full" >
        <TabList>
        <Tab key={0}>Purchase history</Tab>
        <Tab key={1}>Payment history</Tab>
        </TabList>
        <TabPanels >
            <TabPanel p={4} key={0} >
             <PurchaseHistory data={purchases} />
            </TabPanel>
            <TabPanel p={4} key={1}>
            <PaymentHistory  data={ payment}  />
            </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  )
}
