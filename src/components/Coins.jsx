import { Box, Button, Container, Heading, HStack, Image, Input, Radio, RadioGroup, Stack, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom';
import {server} from '../index'
import Loader from './Loader';

const Coins = () => {
  
    const [coins,setCoins] = useState([]);
    const [loader,setLoader]= useState(true);
    const [currency,setCurrency]=useState('inr');
    const [page,setPage]=useState(1);
    const[sCoin,setSCoin]=useState('');

    const curSymbol = currency==='inr'?'₹':currency==='eur'?'€':'$';

  useEffect(()=>{
      const fetchExchanges = async()=>{
          const {data} = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
        //  const coinsList= await axios.get(`${server}/search?query=${sCoin}}`);
          //console.log(`${server}/search?query=${sCoin}}`);
          console.log(sCoin);
          //console.log(coinsList.data.coins)
          //setCoins(coinsList.data.coins)
         // console.log(data)
          setLoader(false)
          setCoins(data)
      }
      try{
        fetchExchanges()
      }catch(e){
        setLoader(false)
        console.log(e)
      }
      
  },[currency,page,sCoin])

  

  const changePage =()=>{
    if(page<100){
      setPage(page+1)
      setLoader(true)
    }
    
  }
  const changePageDec =()=>{
    if(page>1)
    {
      setPage(page-1)
      setLoader(true)
    }
  }

  const onChHandler =(e)=>{
    setSCoin(e.target.value)
  }
  return (
    <Container maxW={'container.xl'}>

    {loader?<Loader/>:<>
    <Stack alignItems={['center','center']} flexDirection={['column','row']} justifyContent={['center','space-between']}>
    
    <RadioGroup padding={'4'} margin={['0','4']} value={currency} onChange={setCurrency}>
      <HStack spacing={'4'}>
        <Radio value={'inr'}>INR</Radio>
        <Radio value={'usd'}>USD</Radio>
        <Radio value={'eur'}>EUR</Radio>

      </HStack>
      
    </RadioGroup>
    {/* <Input w={['80%','50%']} marginBottom={['8','0']} placeholder={'Search Coins'} onChange={onChHandler}></Input> */}
    </Stack>
    <HStack width={'full'}  flexWrap={'wrap'} justifyContent={'center'}> 
      {
        coins.map((value)=>{
          return (
            
              <CoinCard key={value.id}
              id={value.id}
              name={value.name} 
              image={value.image} 
              price={value.current_price}
              symbol={value.symbol}
              curSymbol={curSymbol}
              
              
               />
            
          )
        })
      }
      </HStack>
      <HStack margin={'4'} justifyContent={'space-between'}>
        
      <Button variant={'solid'} color={'yellow.800'} onClick={changePageDec}>Previous Page</Button>
      <Text>{page}of 100</Text>
      <Button variant={'outline'} color={'yellow.800'} onClick={changePage}>Next Page</Button>
      
     
      </HStack>
    
    
    
    
    </>}

    </Container>
  
    )}

    const CoinCard = ({id,image,price,symbol,name,curSymbol="$"})=>{
      
      return (
        <>
          <Link  to={`/coins/${id}`}>
          <VStack 
          minW={52} w={['80','52']}  margin={'4'} padding={'4'}
          boxShadow={'lg'} transition={'all 0.4s'} _hover={{transform:'scale(1.1)'}}>
            <Image src={image} height={'10'} width={'10'}></Image>
            <Heading size={'sm'} noOfLines={'1'}>{symbol}</Heading>
            <Text>{name}</Text>
            <Text>{price?`${curSymbol}${price}`:'NA'}</Text>
  
          </VStack>
          </Link>
        </>
      )
  }
export default Coins