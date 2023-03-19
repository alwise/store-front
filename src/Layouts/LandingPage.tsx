import {
    Box,
    Heading,
    Flex,
    Spacer,
    Divider,
    VStack,
    Center,
    useMediaQuery,
    useColorMode,
    //   theme,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "../Utilities";
import { Outlet } from 'react-router-dom';
// import { Logo } from "./Logo"
export const LandingPage = () => {
    const [isLargeScreen] = useMediaQuery('(min-width: 1280px)');
    const { colorMode } = useColorMode();
    return (
        <>
            <VStack h={'90dvh'} w={"100dvw"} spacing={"20"}>
                <Box bg={colorMode == 'dark' ? 'rgb(23,25,35,0.8)' : "rgb(255,255,255,0.7)"} w={"full"} pos={"sticky"} zIndex={"banner"} top={"0"}>
                    <Flex justifyContent={'space-between'} width="full">
                        <Box p='4'>
                            <Heading size={"lg"} > ED Yeboah Cold Store</Heading>
                        </Box>
                        <Spacer />
                        <Box p='4'>
                            <ColorModeSwitcher justifySelf="flex-end" />
                        </Box>

                    </Flex>
                    <Divider w={"full"} />
                </Box>
                <Flex wrap="wrap" >
                    <Center hidden={!isLargeScreen} bg="yellow.800" flex={'1'} p="12" alignContent={"flex-start"} >
                        <Heading>Welcome to ED Yeboah Cold Store</Heading>
                    </Center>

                    <Center width={'450px'} >
                        <Outlet />
                    </Center>
                </Flex>
            </VStack>

            <VStack minH={'24'} pos={"sticky"} bottom={"0"}>
                <Divider />
                <>Footer</>
            </VStack>

        </>
    )
}
