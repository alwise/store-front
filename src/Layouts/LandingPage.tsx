import {
  Box,
  Heading,
  Flex,
  Spacer,
  Divider,
  VStack,
  Center,
  useMediaQuery
//   theme,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "../Utilities";
import { Outlet } from 'react-router-dom';
// import { Logo } from "./Logo"
export const LandingPage = () => {
    const [isLargeScreen] = useMediaQuery('(min-width: 1280px)')
  return (
    <>
    <VStack  minH={'100vh'} >
        <Flex justifyContent={'space-between'} width="full" >
            <Box p='4'>
                <Heading size={"lg"} > ED Yeboah Cold Store</Heading>
            </Box>
            <Spacer />
            <Box p='4'>
                    <ColorModeSwitcher justifySelf="flex-end" />
            </Box>
        </Flex>
        <Divider/>
       
        <Flex pt={10} wrap="wrap" >
                <Center hidden={!isLargeScreen} bg="yellow.800" flex={'1'} p="12" alignContent={"flex-start"} >
                    <Heading>Welcome to ED Yeboah Cold Store</Heading>
                </Center>
                {/* <Spacer/> */}
                <Center width={'450px'} >
                    <Outlet/>
                </Center>
        </Flex>

    </VStack >
    <Divider />
        <VStack minH={'24'} >
                <>Footer</>
        </VStack>
    </>
  )
}
