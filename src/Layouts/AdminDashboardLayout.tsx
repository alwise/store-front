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
  Stack,
  HStack,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "../Utilities";
import { DashboardMenuList } from "../Components";
import { Outlet } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { LocalStore } from "../Services";
import { COOKIES_KEYS, currentUser } from '../Services/LocalStore';
import { Routes } from '../Utilities/PageRoutes';
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Divide as Hamburger } from 'hamburger-react'
export const AdminDashboard = () => {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const { isOpen, onToggle } = useDisclosure()
  // const { isOpen, onOpen, onClose } = useDisclosure()
  // const [placement, setPlacement] = React.useState<any>("left")

  useEffect(() => {

    if (!currentUser()?.id) {
      navigate(Routes.landingPage.path, { replace: true });
    }

    return () => {

    }
  }, [navigate])
  return (
    <Stack w={"100dvw"} h={"100dvh"} spacing={"0"}>
      <Box className="non-printable " zIndex={"banner"} pos={"sticky"} top={"0"} bg={colorMode == 'dark' ? 'rgb(23,25,35,0.9)' : "rgb(255,255,255,0.9)"}>
        <Flex justifyContent="space-between" w={"full"} align={"center"}>
          <HStack textAlign={"center"} bg={colorMode == 'dark' ? 'rgb(23,25,35)' : "rgb(255,255,255)"} p={"4"} h={"full"} w={"15.6em"} justifyContent={"space-between"} align={"center"}>
            <Heading fontSize={"sm"} >
              {"ED YEBOAH STORE"}
            </Heading>
            <Hamburger onToggle={onToggle} />
          </HStack>
          <Flex justifyContent={"space-between"} w="full" align={"center"} >
            <Box p={"4"}>
              <Heading size={"lg"}> Dashboard</Heading>
            </Box>
            <Spacer />
            <HStack p="4" gap={"4"}>
              <ColorModeSwitcher />
              <IconButton icon={<FaSignOutAlt />} onClick={() => {
                LocalStore.remove(COOKIES_KEYS.user);
                navigate(Routes.landingPage.path, { replace: true });
              }} aria-label={"sign-user-out"} />
            </HStack>
          </Flex>
        </Flex>
        <Divider />
      </Box>
      <Flex gap={"4"} justifyContent={"space-between"} boxSize={"full"} >
        <VStack
          className="non-printable "
          style={{
            transition: "all 0.5s ease-in-out",
            overflow: "hidden"
          }}
          w={isOpen ? "16em" : "0px"}
          // w={"16em"}
          minH={"100dvh"}
          // borderRightWidth="0.2px"
          // borderRightColor="RGBA(255, 255, 255, 0.8)"
          boxShadow="0px 0px 0px 1px rgba(0,0,0,0.1)"
        >
          <DashboardMenuList />
        </VStack>

        <VStack w={"full"}  >
          <Container p="3" minW="full">
            <Outlet />
          </Container>
        </VStack>
      </Flex>
    </Stack>
  );
};
