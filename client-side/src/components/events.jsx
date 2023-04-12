import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Image,
  SimpleGrid
} from '@chakra-ui/react';
import axios from "axios";
import { useState, useEffect } from 'react';

const IMAGE =
  'https://picsum.photos/300';

export function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function getEvents() {
      const eventData = await axios.get('http://localhost:2000/event/show') 
      console.log(eventData.data.data) 
      setEvents(eventData.data.data);
    }
    getEvents();
  }, [])

  function rupiah(price) {
    const priceString = price.toString();
    const len = priceString.length;
    let str = "";
    for (let i = 0; i < len; i++) {
      str += priceString[i];
      if ((len - i - 1) % 3 === 0 && i !== len - 1) {
        str += ".";
      }
    }
    return `Rp${str}`;
  }

  return (
    <Stack spacing={8} mx={"auto"} w={"80%"} py={12} px={6}>
      <Stack align={"center"}>
        <Heading fontSize={"4xl"} textAlign={"center"}>
          Upcoming Events!
        </Heading>
      </Stack>
      <Center py={12}>
        <SimpleGrid columns={2} spacing={5}>
        {events.map((event) => {
          return (
            <Box
              role={'group'}
              p={6}
              maxW={'330px'}
              w={'full'}
              bg={'white'}
              boxShadow={'2xl'}
              rounded={'lg'}
              pos={'relative'}
              zIndex={1}
              mb={10}>
              <Box
                rounded={'lg'}
                mt={-12}
                pos={'relative'}
                height={'230px'}
                _after={{
                  transition: 'all .3s ease',
                  content: '""',
                  w: 'full',
                  h: 'full',
                  pos: 'absolute',
                  top: 5,
                  left: 0,
                  backgroundImage: `url(${IMAGE})`,
                  filter: 'blur(15px)',
                  zIndex: -1,
                }}
                _groupHover={{
                  _after: {
                    filter: 'blur(20px)',
                  },
                }}>
                <Image
                  rounded={'lg'}
                  height={230}
                  width={282}
                  objectFit={'cover'}
                  src={IMAGE}
                />
              </Box>
              <Stack pt={10} align={'center'}>
                <Text color={'gray.500'} fontSize={'sm'}>
                  {event.date} at <b>{event.venue}</b>
                </Text>
                <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500} textTransform={'uppercase'}>
                  {event.name}
                </Heading>
                <Stack direction={'row'} align={'center'}>
                  <Text fontWeight={800} fontSize={'xl'}>
                    {rupiah(event.price)}
                  </Text>
                </Stack>
                <Text color={'gray.600'}>
                    {event.remaining_ticket} tickets left
                  </Text>
              </Stack>
            </Box>
          )
        })}
        </SimpleGrid>
      </Center>
    </Stack>
  );
}