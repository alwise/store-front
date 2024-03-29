import { VStack, List } from '@chakra-ui/react'
// import { useState } from 'react'
import { FaChartPie, FaPersonBooth, FaStore, FaUserCircle } from 'react-icons/fa'
import { isSelectedRoute, Routes } from '../Utilities';
import { AttributeProps, CustomListItem, CustomListItemProps } from './mini';
import { useLocation, useNavigate } from 'react-router-dom';

export const DashboardMenuList = () => {
    const menuItems: CustomListItemProps[] = [
        {
            attributes: {
                title: Routes.dashboard.pages.summary.title,
                icon: <FaChartPie />,
                path: Routes.dashboard.pages.summary.path,
                paths: [],
                selected: true,

            }
        },
        {
            attributes: {
                title: Routes.dashboard.pages.stock.title,
                icon: <FaStore />,
                path: Routes.dashboard.pages.stock.path,
                paths: [],
                selected: false

            }
        },
        {
            attributes: {
                title: Routes.dashboard.pages.users.title,
                icon: <FaUserCircle />,
                path: Routes.dashboard.pages.users.path,
                paths: [],
                selected: false
            },

        },
        {
            attributes: {
                title: Routes.dashboard.pages.customer.title,
                icon: <FaPersonBooth />,
                path: Routes.dashboard.pages.customer.path,
                paths: [Routes.dashboard.pages.transactionHistory.path],
                selected: false
            },

        }
    ]
    // const [data,setData] = useState<CustomListItemProps[]>(menuItems || []);
    const navigate = useNavigate();
    const loc = useLocation();

    const handleClick = (menuItem: AttributeProps) => {
        if (menuItem.path) {
            navigate(menuItem.path, { replace: true, state: { title: menuItem?.title } })
        }

    }


    return (
        <VStack minH={'100vh'} width={"full"} >
            <List spacing={3} minW={'full'}>
                {
                    menuItems?.map((item, index, arr) => <CustomListItem key={`dashboard-menu-key-${index}`} attributes={{
                        title: item.attributes.title, icon: item?.attributes.icon, path: item.attributes.path,
                        paths: item.attributes.paths,
                        selected: isSelectedRoute([`${item.attributes.path}`, ...item?.attributes?.paths], loc.pathname),
                    }} onSelected={handleClick} />)
                }

            </List>
        </VStack>
    )
}
