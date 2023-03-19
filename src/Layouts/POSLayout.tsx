import React, { useEffect } from 'react'
import { VStack, Box, Text, HStack, Heading, IconButton, Divider, useColorMode } from '@chakra-ui/react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ColorModeSwitcher, Routes } from '../Utilities';
import { COOKIES_KEYS, currentUser, LocalStore } from '../Services';
import { FaSignOutAlt } from 'react-icons/fa';

export const POSLayout = () => {
    const navigate = useNavigate();
    const { colorMode } = useColorMode();

    useEffect(() => {

        if (!currentUser()?.id) {
            navigate(Routes.landingPage.path, { replace: true });
        }

        return () => {

        }
    }, [navigate])

    return (
        <VStack minH={'100dvh'} minW="100dvw" spacing={"6"}>
            <Box className='non-printable' zIndex={'banner'} w={"full"} pos={"sticky"} top={"0"}
                bg={colorMode == 'dark' ? 'rgb(23,25,35)' : "rgb(255,255,255)"}
            >
                <HStack minW={'full'} justifyContent="space-between" bg="Background" >
                    <Heading ps="5" size={"md"}>Point of Sales</Heading>
                    <Heading >ED Yeboah Cold Store</Heading>
                    <Box display={"flex"} p="4" justifyContent={"flex-end"}>
                        <Heading p="2" size={"md"} >{currentUser()?.name}</Heading>
                        <ColorModeSwitcher justifySelf="flex-end" />
                        <IconButton icon={<FaSignOutAlt />} onClick={() => {
                            LocalStore.remove(COOKIES_KEYS.user);
                            navigate(Routes.landingPage.path, { replace: true });
                        }} aria-label={"sign-user-out"} />
                    </Box>

                </HStack>
                <Divider />
            </Box>
            <Outlet />
        </VStack>
    )
}
