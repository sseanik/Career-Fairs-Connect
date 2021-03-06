import {
  Box,
  chakra,
  Container,
  Flex,
  Link,
  Stack,
  Text,
  Tooltip,
  useBreakpointValue,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react';
import { IoMdSchool } from 'react-icons/io';
import { GiSheep } from 'react-icons/gi';

import { Logo } from './Logo';
import { useSelector } from 'react-redux';

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  const userRole = useSelector((state) => state.user.role);

  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      mt='4'
      position='relative'
      left={0}
      bottom={0}
      min-height={'calc(100vh - 34px)'}
      borderBottom='6px solid'
      borderBottomColor={
        userRole === 'University'
          ? 'orange.400'
          : userRole === 'Company'
            ? 'green.400'
            : 'blue.400'
      }
    >
      <Container
        as={Stack}
        maxW='100vw'
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        {useBreakpointValue({
          base: (
            <div>
              <Text>© 2021 Career Fairs Connect</Text>
            </div>
          ),
          md: (
            <Flex direction='row' align='center'>
              <Logo w={10} h={10} />
              <Text ml='2'>
                © 2021{' '}
                <Text as='span' fontWeight='semibold'>
                  Career Fairs Connect
                </Text>
                . All rights reserved
              </Text>
            </Flex>
          ),
        })}
        <Stack
          direction={'row'}
          spacing={6}
          as={Flex}
          align='center'
          justify='center'
        >
          <Tooltip label='WebCMS' fontSize='sm'>
            <Flex
              as={Link}
              direction={'row'}
              align='center'
              justify='center'
              href='https://webcms3.cse.unsw.edu.au/COMP9323/21T2/'
              isExternal
            >
              <SocialButton label={'Webcms3'} as='div'>
                <GiSheep />
              </SocialButton>
            </Flex>
          </Tooltip>
          <Tooltip label='UNSW' fontSize='sm'>
            <Flex
              as={Link}
              direction={'row'}
              align='center'
              justify='center'
              href='https://www.unsw.edu.au/'
              isExternal
            >
              <SocialButton label={'UNSW'} as='div'>
                <IoMdSchool />
              </SocialButton>
            </Flex>
          </Tooltip>
        </Stack>
      </Container>
    </Box>
  );
}
