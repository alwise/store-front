import {
  Button,
  VStack,
  Box,
  Divider,
  Flex,
  Heading,
  Spacer,
  Container,
  IconButton,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "../Utilities";
import { DashboardMenuList } from "../Components";
import { ToggleSideBarIcon } from "../Assets";
import { Outlet } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { LocalStore } from "../Services";
import { COOKIES_KEYS, currentUser } from '../Services/LocalStore';
import { Routes } from '../Utilities/PageRoutes';
import {useNavigate} from 'react-router-dom'
import {useEffect} from 'react'
export const AdminDashboard = () => {
  const navigate = useNavigate()
  // const { isOpen, onOpen, onClose } = useDisclosure()
  // const [placement, setPlacement] = React.useState<any>("left")

  useEffect(() => {
        
    if(!currentUser()?.id ){
        navigate(Routes.landingPage.path, { replace: true });
    }

    return () => {
       
    }
}, [navigate])
  return (
    <Flex justifyContent={"space-between"} width="full">
      <VStack
        width={"270px"}
        minH={"100vh"}
        borderRight="1px"
        borderRightColor="RGBA(255, 255, 255, 0.08)"
      >
        <Flex p="4" justifyContent="space-between" minW={"full"}>
          <Heading mt="3" fontSize={"large"}>
            Logo Here
          </Heading>
          <Button>
            {" "}
            <ToggleSideBarIcon />{" "}
          </Button>
        </Flex>
        <Divider />
        <DashboardMenuList />
      </VStack>

      <VStack flex={1} bg="Background">
        <Flex justifyContent={"space-between"} width="full">
          <Box p={"4"}>
            <Heading size={"lg"}> Dashboard</Heading>
          </Box>
          <Spacer />
          <Box p="4">
            <ColorModeSwitcher justifySelf="flex-end" />
            <IconButton icon={<FaSignOutAlt />} onClick={() => {
              LocalStore.remove(COOKIES_KEYS.user);
              navigate(Routes.landingPage.path, { replace: true });
            } } aria-label={"sign-user-out"} />
          </Box>
        </Flex>
        <Divider />

        <Container p="3" minW="full">
          <Outlet />
        </Container>
      </VStack>
    </Flex>
  );
};
