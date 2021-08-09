import {
  Avatar,
  Button,
  chakra,
  Collapse,
  Flex,
  Heading,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { useViewportScroll } from 'framer-motion';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';
import { AiOutlineMenu } from 'react-icons/ai';
import { Logo } from './Logo';
import { useThemeDarkMode } from 'elementz';
import { useDispatch, useSelector } from 'react-redux';
import { asyncLogout, resetUser } from '../features/auth/userSlice';
import { IoPersonCircleSharp } from 'react-icons/io5';
import { CgLogOut } from 'react-icons/cg';

export default function Navbar(props) {
  // Icon
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  // Colour
  const text = useColorModeValue('dark', 'light');
  const bg = useColorModeValue('white', 'gray.700');
  const { colorMode, toggleColorMode } = useColorMode();
  const [isDarkMode, toggleDarkMode] = useThemeDarkMode();
  const toggleMode = () => {
    toggleColorMode();
    if (
      localStorage.getItem('ez-mode') !==
      localStorage.getItem('chakra-ui-color-mode')
    ) {
      localStorage.setItem('dark-mode-test', isDarkMode);
      toggleDarkMode();
    }
  };
  // State
  const [y, setY] = React.useState(0);
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);
  const userRole = useSelector((state) => state.user.role);
  // Ref
  const ref = React.useRef();
  const { height = 0 } = ref.current ? ref.current.getBoundingClientRect() : {};
  // Scroll
  const { scrollY } = useViewportScroll();
  React.useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()));
  }, [scrollY]);

  const loggedIn = useSelector((state) => state.user.loggedIn);
  const logo = useSelector((state) => state.user.logo);
  const userFName = useSelector((state) => state.user.fname);
  const userLName = useSelector((state) => state.user.lname);

  const profilePath = '/' + userRole;

  //

  const dispatch = useDispatch();
  const history = useHistory();

  const getRoleColour = () => {
    return userRole === 'University'
      ? 'orange'
      : userRole === 'Company'
        ? 'green'
        : 'blue';
  };

  const publicNavItems = [
    {
      label: 'Landing Page',
      to: '/',
    },
    {
      label: 'Sign Up',
      to: '/register',
    },
    {
      label: 'Login',
      to: '/login',
    },
  ];

  const privateNavItems = [
    {
      label: 'Events Page',
      to: '/',
    },
    {
      label: 'Profile',
      to: profilePath,
    },
    {
      label: 'Logout',
      to: '/',
    },
  ];

  const MobileNav = () => {
    return (
      <Stack
        bg={useColorModeValue('white', 'gray.700')}
        p={4}
        display={{ md: 'none' }}
      >
        {loggedIn
          ? privateNavItems.map((navItem, idx) => (
            <Stack spacing={4} key={`nav-item-${idx}`}>
              <Flex
                px={4}
                py={2}
                justify={'space-between'}
                align={'center'}
                _hover={{
                  textDecoration: 'none',
                }}
              >
                <Text
                  as={Link}
                  to={navItem.to}
                  fontWeight={600}
                  onClick={handleToggle}
                >
<<<<<<< HEAD
                  {navItem.label}
                </Text>
              </Flex>
            </Stack>
          ))
=======
                  <Text
                    as={Link}
                    to={navItem.to}
                    fontWeight={600}
                    onClick={() => {
                      handleToggle();
                      if (navItem.label === 'Logout') {
                        dispatch(
                          asyncLogout({
                            token: localStorage.getItem('token'),
                            history: history,
                          })
                        );
                        dispatch(resetUser());
                      }
                    }}
                  >
                    {navItem.label}
                  </Text>
                </Flex>
              </Stack>
            ))
>>>>>>> main
          : publicNavItems.map((navItem, idx) => (
            <Stack spacing={4} key={`nav-item-${idx}`}>
              <Flex
                px={4}
                py={2}
                justify={'space-between'}
                align={'center'}
                _hover={{
                  textDecoration: 'none',
                }}
              >
                <Text
                  as={Link}
                  to={navItem.to}
                  fontWeight={600}
                  onClick={handleToggle}
                >
                  {navItem.label}
                </Text>
              </Flex>
            </Stack>
          ))}
      </Stack>
    );
  };

  return (
    <React.Fragment>
      <chakra.header
        ref={ref}
        shadow={y > height ? 'sm' : undefined}
        transition='box-shadow 0.2s'
        bg={bg}
        borderTop='6px solid'
        borderTopColor={`${getRoleColour()}.500`}
        w='full'
        overflowY='hidden'
        borderBottomWidth={2}
        borderBottomColor={useColorModeValue('gray.100', 'gray.900')}
      >
        <chakra.div h='4.5rem' mx='auto'>
          <Flex
            w='full'
            h='full'
            px='7'
            alignItems='center'
            justifyContent='space-between'
            fontWeight={500}
          >
            <Flex direction='row' as={Link} align='center' to='/'>
              <Logo boxSize={12} mt='2' mr='2'></Logo>
              <Heading
                lineHeight={1.1}
                fontWeight={500}
                fontSize={{ base: '0', sm: 'xl', lg: '2xl', xl: '3xl' }}
                zIndex={1}
              >
                <Text
                  as={'span'}
                  position={'relative'}
                  _after={{
                    content: "''",
                    width: 'full',
                    height: '30%',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    bg: useColorModeValue(
                      `${getRoleColour()}.50`,
                      `${getRoleColour()}.800`
                    ),
                    zIndex: -1,
                  }}
                >
                  Career Fairs Connect
                </Text>
              </Heading>
            </Flex>

            <Flex justify='flex-end' align='center' color='gray.400'>
              <IconButton
                mr='4'
                size='md'
                fontSize='lg'
                aria-label={`Switch to ${text} mode`}
                variant='ghost'
                color='current'
                ml={{ base: '0', md: '3' }}
                onClick={toggleMode}
                icon={<SwitchIcon />}
              />
              {loggedIn ? (
                <HStack spacing='5' display={{ base: 'none', md: 'flex' }}>
                  {/* <Button
                    onClick={() =>
                      dispatch(
                        asyncLogout({
                          token: localStorage.getItem('token'),
                          history: history,
                        })
                      )
                    }
                    colorScheme='blue'
                    variant='ghost'
                    size='sm'
                  >
                    Logout
                  </Button>
                  <Button
                    as={Link}
                    to={profilePath}
                    colorScheme={getRoleColour()}
                    variant='solid'
                    size='sm'
                  >
                    Profile
                  </Button> */}
                  <Menu autoSelect>
                    <MenuButton>
                      <Avatar
                        bg={userRole === 'Student' ? 'blue' : 'none'}
                        color='white'
                        size='sm'
                        name={`${userFName} ${userLName}`}
                        src={logo}
                      />
                    </MenuButton>
                    <MenuList minWidth='100px'>
                      <MenuItem
                        as={Link}
                        to={profilePath}
                        color={colorMode === 'light' ? 'black' : 'white'}
                      >
                        <IoPersonCircleSharp />
                        <Text ml='2'>Profile</Text>
                      </MenuItem>
                      <MenuItem
                        color={colorMode === 'light' ? 'black' : 'white'}
                        onClick={() => {
                          dispatch(
                            asyncLogout({
                              token: localStorage.getItem('token'),
                              history: history,
                            })
                          );
                          dispatch(resetUser());
                        }}
                      >
                        <CgLogOut />
                        <Text ml='2'>Logout</Text>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </HStack>
              ) : (
                <HStack spacing='5' display={{ base: 'none', md: 'flex' }}>
                  <Button
                    as={Link}
                    to='/login'
                    colorScheme='blue'
                    variant='ghost'
                    size='sm'
                  >
                    Sign in
                  </Button>
                  <Button
                    as={Link}
                    to='/register'
                    colorScheme='blue'
                    variant='solid'
                    size='sm'
                  >
                    Sign up
                  </Button>
                </HStack>
              )}

              <IconButton
                display={{ base: 'flex', md: 'none' }}
                aria-label='Open menu'
                fontSize='20px'
                color={useColorModeValue('gray.800', 'inherit')}
                variant='ghost'
                icon={<AiOutlineMenu />}
                onClick={handleToggle}
              />
            </Flex>
          </Flex>
        </chakra.div>
        <Collapse in={show}>
          <MobileNav />
        </Collapse>
      </chakra.header>
    </React.Fragment>
  );
}
