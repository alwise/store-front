import { VStack, List   } from '@chakra-ui/react'
import { useState } from 'react'
import { FaChartPie, FaPersonBooth, FaStore, FaUserCircle } from 'react-icons/fa'
import { Routes } from '../Utilities';
import { AttributeProps, CustomListItem, CustomListItemProps } from './mini';
import { useNavigate } from 'react-router-dom';

export default function DashboardMenuList() {
    const menuItems:CustomListItemProps[] = [
        {
            attributes:{
                title:Routes.dashboard.pages.summary.title,
                icon:<FaChartPie/>,
                path:Routes.dashboard.pages.summary.path,
                selected:true,

            }
        },
        {
            attributes:{
                title:Routes.dashboard.pages.stock.title,
                icon:<FaStore/>,
                path:Routes.dashboard.pages.stock.path,
                selected:false

            }
        },
        {
            attributes:{
            title:Routes.dashboard.pages.users.title,
            icon:<FaUserCircle/>,
            path:Routes.dashboard.pages.users.path,
            selected:false
            },
            
        },
        {
            attributes:{
            title:Routes.dashboard.pages.customer.title,
            icon:<FaPersonBooth/>,
            path:Routes.dashboard.pages.customer.path,
            selected:false
            },
            
        }
    ]
    const [data,setData] = useState<CustomListItemProps[]>(menuItems || []);
    const navigate = useNavigate();
    const handleClick = (menuItem:AttributeProps) =>{
       const dataCopy:CustomListItemProps[] = [...data] || [];
       dataCopy?.forEach((item)=>{
            if(item.attributes.title === menuItem.title){
                item.attributes.selected = true;
            }else{
                item.attributes.selected = false;
            }
        });
    
        setData((prev)=>(dataCopy));
        if(menuItem.path){
            navigate(menuItem.path,{replace:true})
        }
       
       
    }


  return (
    <VStack minH={'100vh'}  width={"full"} >
            <List spacing={3} minW={'full'}>
                {
                    data?.map((item,index,arr)=> <CustomListItem key={`dashboard-menu-key-${index}`} attributes={ {
                        title:item.attributes.title, icon:item?.attributes.icon,  path:item.attributes.path, selected:item.attributes.selected
                    } } onSelected={handleClick}  />)
                }
                
            </List>
    </VStack>
  )
}
