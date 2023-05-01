import { Badge, Box, Button, Container, HStack, Image, Progress, Radio, RadioGroup, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react'

import axios from 'axios'

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { server } from '../index'
import Chart from './Chart'


import Loader from './Loader'

const CoinDetail = () => 
{
  const params= useParams();

  const[loader,setLoader]=useState(true);
  const[coinData,setCoinData]=useState({});
  const [currency,setCurrency]=useState('inr');
  const[days,setDays] = useState('24h');
  const[chartArr,setChartArr] = useState([]);

  const btnArr = ['24h','7d','14d','30d','60d','200d','1y','max'];

  const curSymbol = currency==='inr'?'₹':currency==='eur'?'€':'$';

  useEffect(()=>{
    const fetchCoin = async ()=>{
      try{
        const {data} =  await axios.get(`${server}/coins/${params.id}`);
        const {data : chartData} = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`)

        
        setChartArr(chartData.prices)
        //console.log(chartArr)
        setCoinData(data)
        //console.log(coinData)
        setLoader(false)
      }catch(e){
        console.log(e)
      }
      
    }
    fetchCoin()
    

  },[params.id, days,currency])

const swtichDays =(value)=>{
  switch(value){
    case '24h':
      setDays('24h');
      setLoader(true);
      break;
      case '7d':
      setDays('7d');
      setLoader(true);
      break;
      case '14d':
      setDays('14d');
      setLoader(true);
      break;
      case '30d':
      setDays('30d');
      setLoader(true);
      break;
      case '60d':
      setDays('60d');
      setLoader(true);
      break;
      case '200d':
      setDays('200d');
      setLoader(true);
      break;
      case '1y':
      setDays('365d');
      setLoader(true);
      break;
      case 'max':
        setDays('max');
        setLoader(true);
        break;
      default : setDays('24h');
  }
}

  return (
    <Container maxWidth={'container.xl'}>
      {
        loader?<Loader/>:<>
        
       

        <Box width={'full'} borderWidth={1}>
          
          <Chart arr={chartArr} days={days} currency={curSymbol}/>
        </Box>
        <HStack spacing={'4'} mt={'4'} padding={'4'} overflowX={'auto'}>
          {
            btnArr.map((value)=>{
              return (
                <Button key={value} onClick={()=>{swtichDays(value)}}>{value}</Button>
              )
            })
          }
        </HStack>
        <RadioGroup padding={'4'} margin={'4'} value={currency} onChange={setCurrency}>
          <HStack spacing={'4'}>
            <Radio value={'inr'}>INR</Radio>
            <Radio value={'usd'}>USD</Radio>
            <Radio value={'eur'}>EUR</Radio>

          </HStack>

        </RadioGroup>
        <VStack spacing={'4'} padding={['2','16']} alignItems={'flex-start'}>
          <Text fontSize={'sm'} alignSelf={'center'} opacity={'0.7'}>
           Last updated on    {Date(coinData.last_updated).split("G")[0]}
            </Text>
          <Image src={coinData.image.large} objectFit={'contain'} h={'100'} w={'100'}></Image>
          <Badge fontSize={'2xl'} backgroundColor={'blackAlpha.800'} color={'whiteAlpha.800'}>#{coinData.coingecko_rank}</Badge>

          <Stat>
            <StatLabel>{coinData.name}</StatLabel>
            <StatNumber>{curSymbol}{coinData.market_data.current_price[currency]}</StatNumber>
            <StatHelpText>
              <StatArrow type={coinData.market_data.market_cap_change_percentage_24h>0?'increase':'decrease'}/>{coinData.market_data.market_cap_change_percentage_24h}
            </StatHelpText>
          </Stat>

          <Custombar high={`${curSymbol}${coinData.market_data.high_24h[currency]}`} low={`${curSymbol}${coinData.market_data.low_24h[currency]}`}/>

          <Box width={'full'} p={'4'}>
            <Item title={'Max Supply'} value={coinData.market_data.max_supply}/>
            <Item title={'Circulating Supply'} value={coinData.market_data.circulating_supply}/>
            <Item title={'Market Cap'} value={`${curSymbol}${coinData.market_data.market_cap[currency]}`}/>
            <Item title={'All time low'} value={`${curSymbol}${coinData.market_data.atl[currency]}`}/>
            <Item title={'All time high'} value={`${curSymbol}${coinData.market_data.ath[currency]}`}/>
          </Box>

        </VStack>
        
        
        
        
        
        </>
      }
      


    </Container>


  );
}

const Item =({title,value})=>{
  return (<>
    <HStack w={'full'} justifyContent={'space-between'} mt={'4'}>
      <Text fontSize={'medium'} fontWeight={'bold'} fontFamily={'inherit'} letterSpacing={'wide'}>{title}</Text>
      <Text fontSize={'medium'} fontWeight={'medium'} letterSpacing={'wide'}>{value}</Text>
    </HStack>
    
  
  </>)
}

const Custombar = ({high,low})=>{
  return (
    <>
      <VStack w={'full'}>
        <Progress width={'full'} colorScheme='teal' value={'50'}>  
            

        </Progress>
        <HStack w={'full'} justifyContent={'space-between'}>
            <Badge fontSize={'large'} children={low} colorScheme={'red'}/>
            <Text opacity={'0.7'}>Last 24H</Text>
            <Badge fontSize={'large'} children={high} colorScheme={'green'}/>        

            </HStack>

      </VStack>
    </>
  )
}

export default CoinDetail