import React, { } from 'react'
import { Flex, Box, Spacer, Link as ChakraLink } from "@chakra-ui/react"

import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <Flex id="menu" bg="#2F303A" w="100%" h="8vh" color="white" textAlign="center" margin="auto" fontSize="xl">
      <Box margin="auto" paddingLeft="4%" >
        <Link to="/">
          <ChakraLink>
            Company Logo/Name
          </ChakraLink>
        </Link>
      </Box>
      <Spacer />
      <Flex margin="auto" paddingRight="4%">
        <Box paddingRight="50px" >
          <Link to="/login">
            <ChakraLink>
              Login
            </ChakraLink>
          </Link>
        </Box>
        <ChakraLink>
          <Link to="/register">
            Join
          </Link>
        </ChakraLink>
      </Flex>
    </Flex>
  )
}

export default Navbar