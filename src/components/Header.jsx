import { Box, HStack } from '@chakra-ui/react'

import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <HStack w={'full'}  padding={'4'} fontSize={'lg'} backgroundColor={'blackAlpha.900'}
      color={'whiteAlpha.800'}
      justifyContent={['space-around','flex-start']}
      cursor={'pointer'}
      gap={['0','2']}
      overflow={'auto'}
      boxShadow={'base'}
      pos={'sticky'}
       top={'0'}
       zIndex={'999'}
      
    >

      
      <Link to={'/'}><Box _hover={{color:'yellow'}} transition={'0.3s all ease-out'}>Home</Box></Link>
      <Link to={'/exchanges'} ><Box _hover={{color:'yellow'}} transition={'0.3s all ease-out'}>Exchanges</Box></Link>
      <Link to={'/coins'} ><Box _hover={{color:'yellow'}} transition={'0.3s all ease-out'}>Coins</Box></Link>

    </HStack>
  )
}

export default Header