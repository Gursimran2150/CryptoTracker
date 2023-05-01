import { Container, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {server} from '../index'
import Loader from './Loader'

const Exchanges = () => {

  const [exchanges,setExchanges] = useState([]);
  const [loader,setLoader]= useState(true);

  useEffect(()=>{
      const fetchExchanges = async()=>{
          const {data} = await axios.get(`${server}/exchanges`);
        //  console.log(data)
          setLoader(false)
          setExchanges(data)
      }
      try{
        fetchExchanges()
      }catch(e){
        setLoader(false)
        console.log(e)
      }
  },[])
  return (
    <Container maxW={'container.xl'}>

    {loader?<Loader/>:<>
    <HStack width={'full'}  flexWrap={'wrap'} justifyContent={'center'}> 
      {
        exchanges.map((value)=>{
          return (
            
              <ExchangesCard key={value.id} name={value.name} image={value.image} url={value.url} trust_score_rank={value.trust_score_rank} />
            
          )
        })
      }
      </HStack>
    
    
    
    
    </>}

    </Container>
  )
}

const ExchangesCard = ({image,name,url,trust_score_rank})=>{
    return (
      <>
        <a href={url} target={'blank'}>
        <VStack 
        minW={52} w={['80','52']}  margin={'4'} padding={'4'}
        boxShadow={'lg'} transition={'all 0.4s'} _hover={{transform:'scale(1.1)'}}>
          <Image src={image} height={'10'} width={'10'}></Image>
          <Heading size={'sm'} noOfLines={'1'}>{trust_score_rank}</Heading>
          <Text>{name}</Text>

        </VStack>
        </a>
      </>
    )
}

export default Exchanges