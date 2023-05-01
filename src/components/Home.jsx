import React from 'react'
import axios from 'axios'
import { Box, Image, Text } from '@chakra-ui/react'
import btc from './btc.png'
import { motion } from 'framer-motion'

const Home = () => {
  return (
    <>
      <Box bgColor={"blackAlpha.900"} w={"full"} h={"90vh"}>
        <motion.div
          style={{
            height: "80vh",
          }}
          animate={{
            translateY: "20px",
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <Image
            w={"full"}
            h={"full"}
            objectFit={"contain"}
            src={btc}
            filter={"grayscale(1)"}
          />
        </motion.div>
        <Text
          fontSize={"6xl"}
          textAlign={"center"}
          fontWeight={"thin"}
          marginTop={"-20px"}
          color={"whiteAlpha.900"}
        >
          Xcrypto
        </Text>
      </Box>
    </>
  );
}

export default Home