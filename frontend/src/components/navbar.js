import React, { } from 'react'
import { Flex, Spacer, Link } from "@chakra-ui/react"

function Navbar() {
  return (
    <Flex id="menu" bg="#2F303A" w="100%" h="8vh" color="white" textAlign="center" margin="auto" fontSize="xl">
      <Link margin="auto" paddingLeft="4%" href="/">
        Company Logo/Name
      </Link>
      <Spacer />
      <Flex margin="auto" paddingRight="4%">
        <Link paddingRight="50px" href="/login">
          Login
        </Link>
        <Link href="/register">
          Join
        </Link>
      </Flex>
    </Flex>
  )
}

export default Navbar