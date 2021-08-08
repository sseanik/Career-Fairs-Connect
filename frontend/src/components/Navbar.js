import {
  Button,
  chakra,
  Collapse,
  Flex,
  HStack,
  IconButton,
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
import { asyncLogout } from '../features/auth/userSlice';

export default function Navbar(props) {
  // Icon
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  // Colour
  const text = useColorModeValue('dark', 'light');
  const bg = useColorModeValue('white', 'gray.700');
  const { toggleColorMode } = useColorMode();
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
  // Ref
  const ref = React.useRef();
  const { height = 0 } = ref.current ? ref.current.getBoundingClientRect() : {};
  // Scroll
  const { scrollY } = useViewportScroll();
  React.useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()));
  }, [scrollY]);

  const loggedIn = useSelector((state) => state.user.loggedIn);
  const dispatch = useDispatch();
  const history = useHistory();

  const MobileNav = () => {
    return (
      <Stack
        bg={useColorModeValue('white', 'gray.700')}
        p={4}
        display={{ md: 'none' }}
      >
        {NAV_ITEMS.map((navItem, idx) => (
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
        borderTopColor='blue.400'
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
            <Flex align='flex-start'>
              <Link to='/'>
                <HStack>
                  <Logo boxSize={12} mt='2'></Logo>
                  <Text fontSize='xl' display={{ base: 'none', sm: 'flex' }}>
                    Career Fairs Connect
                  </Text>
                </HStack>
              </Link>
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
                  <Button
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
                    to='/register'
                    colorScheme='blue'
                    variant='solid'
                    size='sm'
                  >
                    Profile
                  </Button>
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

const NAV_ITEMS = [
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
