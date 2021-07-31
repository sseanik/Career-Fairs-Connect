import React from 'react';
import { useSelector } from 'react-redux';
// Chakra UI
import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Image,
  Link,
  Spacer,
  Tag,
  TagLabel,
  TagRightIcon,
  useDisclosure,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { RiPencilFill } from 'react-icons/ri';
import { EventModal } from './EventModal';

export const DetailsCard = (props) => {
  const width = useSelector((state) => state.window.width);
  const userDetails = useSelector((state) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [bgColour, setBgColour] = React.useState('white');
  if (props.crop) {
    props.crop.then((result) => {
      setBgColour(result);
    });
  }

  return (
    <Flex p='0.5' direction={width <= '723' ? 'column' : 'row'}>
      {props.crop ? (
        <Center h='125px' w='175px' mr='5' bg={bgColour}>
          <Image
            src={props.image}
            alt={`${props.alt}-logo`}
            maxHeight='125px'
            maxWidth='175px'
            objectFit='contain'
            fallbackSrc={!props.loading && 'https://via.placeholder.com/150'}
          />
        </Center>
      ) : (
        <Image
          src={props.image}
          alt={!props.loading ? `${props.alt}-logo` : ''}
          maxHeight='120px'
          maxWidth='200px'
          objectFit={'contain'}
          mr='5'
          fallbackSrc={!props.loading ? 'https://via.placeholder.com/150' : ''}
        />
      )}

      <Box>
        <Flex pb='1' fontWeight='semibold' fontSize='lg' align='center'>
          {props.title}
          {props.fair &&
            userDetails.role === 'University' &&
            userDetails.name === props.alt && (
              <div>
                <Spacer />

                <Button
                  leftIcon={<RiPencilFill />}
                  onClick={onOpen}
                  ml='3'
                  size='sm'
                >
                  Edit Event
                </Button>
                <EventModal
                  isOpen={isOpen}
                  onClose={onClose}
                  university={userDetails.name}
                  website={userDetails.website}
                  logo={userDetails.logo}
                  title={props.title}
                  description={props.description}
                  start={props.startDate}
                  end={props.endDate}
                  edit
                />
              </div>
            )}
          {props.isLive && (
            <Badge
              variant='subtle'
              ml='2'
              mb='1'
              alignItems='center'
              colorScheme='green'
              fontSize='xs'
            >
              Live
            </Badge>
          )}
        </Flex>

        {props.startDate && (
          <Box d='flex' alignItems='baseline' pb='1'>
            <Box
              color='gray.500'
              fontWeight='semibold'
              letterSpacing='wide'
              fontSize='xs'
              textTransform='uppercase'
            >
              {new Date(props.startDate).toDateString()} -{' '}
              {new Date(props.endDate).toDateString()}
              {props.startDate <= new Date() && props.endDate >= new Date() && (
                <Badge
                  variant='subtle'
                  colorScheme='green'
                  fontSize='xs'
                  ml='2'
                >
                  Active
                </Badge>
              )}
            </Box>
          </Box>
        )}
        {props.numOpportunities > 0 && (
          <Box d='flex' alignItems='baseline' pb='1'>
            <Box
              color='gray.500'
              fontWeight='semibold'
              letterSpacing='wide'
              fontSize='xs'
              textTransform='uppercase'
            >
              {props.numOpportunities} Opportunities
            </Box>
          </Box>
        )}

        <Box pb='1'>{props.description}</Box>
        {props.website && !props.uni && (
          <Tag
            as={Link}
            href={props.website}
            isExternal
            ml='-1'
            mt='1'
            letterSpacing='wide'
            fontSize='xs'
            textTransform='uppercase'
            color='gray.600'
          >
            <TagLabel>Website</TagLabel>
            <TagRightIcon boxSize='12px' as={ExternalLinkIcon} />
          </Tag>
        )}
        {props.uni && (
          <Tag
            ml='-1'
            mt='1'
            letterSpacing='wide'
            fontSize='xs'
            textTransform='uppercase'
            color='gray.600'
          >
            <TagLabel>
              Hosted by <b>{props.uni}</b>
            </TagLabel>
          </Tag>
        )}
      </Box>
    </Flex>
  );
};
