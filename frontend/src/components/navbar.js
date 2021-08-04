import React from 'react';
import {
  Flex,
  Spacer,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  useColorModeValue,
  Text,
  useColorMode,
  IconButton,
} from '@chakra-ui/react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useThemeDarkMode } from 'elementz';
import { FaMoon, FaSun } from 'react-icons/fa';

// localStorage.clear();
// localStorage.setItem('token', 'fakeToken');
// localStorage.setItem('name', 'fakeName');
localStorage.setItem('userId', 'fakeId');

function Navbar() {
  const history = useHistory();
  const { colorMode, toggleColorMode } = useColorMode();
  const [isDarkMode, toggleDarkMode] = useThemeDarkMode();

  const toggleMode = () => {
    toggleColorMode();
    console.log(isDarkMode);
    if (
      localStorage.getItem('ez-mode') !==
      localStorage.getItem('chakra-ui-color-mode')
    ) {
      toggleDarkMode();
    }
  };

  function AuthTabs() {
    return (
      <Stack
        flex={{ base: 1, md: 0 }}
        justify={'flex-end'}
        direction={'row'}
        spacing={6}
      >
        <Button
          as={Link}
          to='/login'
          fontSize={'sm'}
          fontWeight={400}
          variant={'link'}
          href={'#'}
        >
          Log in
        </Button>
        <Button
          display={{ base: 'none', md: 'inline-flex' }}
          fontSize={'sm'}
          fontWeight={600}
          color={'white'}
          bg={'blue.400'}
          href={'#'}
          _hover={{
            bg: 'blue.300',
          }}
          as={Link}
          to='/register'
        >
          Join
        </Button>
      </Stack>
    );
  }

  function UserTabs() {
    function handleLogOut() {
      // console.log(localStorage.getItem('token'))
      const token = localStorage.getItem('token');
      localStorage.clear();

      axios
        .post('/logout', {
          token: token,
        })
        .then((info) => {
          console.log(info);
          // localStorage.clear();
        });

      history.push('/');
      window.location.reload();
    }

    return (
      <Flex alignItems={'center'}>
        <Menu>
          <MenuButton
            as={Button}
            rounded={'full'}
            variant={'ghost'}
            cursor={'pointer'}
            minW={0}
          >
            Hi, {localStorage.getItem('name')}
          </MenuButton>
          <MenuList minW='0' w={'140px'}>
            <MenuItem as={Link} to='/company/1'>
              Profile
            </MenuItem>
            <MenuDivider />
            <MenuItem onClick={handleLogOut}>Log out</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    );
  }

  return (
    <Flex
      id='menu'
      bg={useColorModeValue('white', 'gray.800')}
      color={useColorModeValue('gray.600', 'white')}
      minH={'60px'}
      py={{ base: 2 }}
      px={{ base: 4 }}
      borderBottom={1}
      borderStyle={'solid'}
      borderColor={useColorModeValue('gray.200', 'gray.900')}
      align={'center'}
    >
      {/* <Box margin='auto' paddingLeft='1%'> */}
      <Text
        // fontFamily={'heading'}
        fontWeight={600}
        fontSize={{ base: '2xl', sm: '2xl', lg: '3xl' }}
        color={useColorModeValue('gray.800', 'white')}
        as={Link}
        to='/'
      >
        Career Fairs Connect
      </Text>
      {/* </Box> */}
      <Spacer />

      <IconButton
        aria-label='Search database'
        icon={colorMode === 'light' ? <FaSun /> : <FaMoon />}
        onClick={() => toggleMode()}
        mr='4'
      />

      {localStorage.getItem('token') === null ? <AuthTabs /> : <UserTabs />}
    </Flex>
  );
}

export default Navbar;
