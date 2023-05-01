import React from 'react'
import { Box, CircularProgress, CircularProgressLabel } from '@chakra-ui/react'

const Loader = () => {
  return (
    <Box width={'full'} height={'80vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <CircularProgress isIndeterminate color='yellow' size={['55','10vw']} thickness={'8'} />

    </Box>
  )
}

export default Loader