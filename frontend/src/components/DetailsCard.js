import React from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  asyncAddCompanyStall,
  asyncRemoveCompanyStall,
} from '../features/careerFair/fairSlice';
// Chakra UI & React Icons
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
import { AddIcon, ExternalLinkIcon, SmallAddIcon } from '@chakra-ui/icons';
import { RiPencilFill } from 'react-icons/ri';
import { MdExitToApp } from 'react-icons/md';
// Components
import { EventModal } from './EventModal';
import { OpportunityModal } from './OpportunityModal';

export const DetailsCard = (props) => {
  // Redux
  const dispatch = useDispatch();
  const width = useSelector((state) => state.window.width);
  const userDetails = useSelector((state) => state.user);
  const stalls = useSelector((state) => state.fair.stalls);
  const interactStatus = useSelector((state) => state.fair.status);
  const opportunityStatus = useSelector((state) => state.stall.status);
  // Modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  // State to determine background colour and company application status
  const [bgColour, setBgColour] = React.useState('white');
  const [applied, setApplied] = React.useState(false);

  // If the crop image is given, set the background colour of the image
  React.useEffect(() => {
    if (props.crop) {
      props.crop.then((result) => {
        setBgColour(result);
      });
    }
  }, [props]);

  // Determine if the company has applied
  React.useEffect(
    () =>
      setApplied(
        userDetails.role === 'Company' &&
          props.fair &&
          stalls.filter((stall) => stall.company === userDetails.name)
            .length === 0
          ? true
          : false
      ),
    [userDetails, props, stalls]
  );

  const createStall = () => {
    dispatch(
      asyncAddCompanyStall({
        stall: {
          pending: true,
          company: userDetails.name,
          description: userDetails.description,
          logo: userDetails.logo,
        },
        fairID: props.fairID,
      })
    );
  };

  const removeStall = () => {
    dispatch(
      asyncRemoveCompanyStall({
        fairID: props.fairID,
        name: userDetails.name,
      })
    );
  };

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
                  size='sm'
                  onClick={onOpen}
                  ml='3'
                  isLoading={interactStatus}
                  loadingText='Editing Event'
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
          {!props.loading && applied && (
            <Button
              colorScheme='blue'
              leftIcon={<AddIcon />}
              onClick={() => createStall()}
              ml='3'
              size='sm'
            >
              Create Company Stall
            </Button>
          )}
          {!props.loading &&
            !applied &&
            userDetails.role === 'Company' &&
            props.fair && (
              <Button
                colorScheme='red'
                leftIcon={<MdExitToApp />}
                onClick={() => removeStall()}
                ml='3'
                size='sm'
              >
                Leave Fair
              </Button>
            )}
          {props.stall &&
            userDetails.role === 'Company' &&
            userDetails.name === props.title && (
              <div>
                <Button
                  bgColor={props.bgColour}
                  color={props.textColour}
                  _hover={{ bg: props.bgColour }}
                  _active={{ bg: props.bgColour }}
                  leftIcon={<SmallAddIcon />}
                  onClick={onOpen}
                  ml='3'
                  size='sm'
                  isLoading={opportunityStatus}
                  loadingText='Adding Opportunity'
                >
                  Add Opportunity
                </Button>
                <OpportunityModal isOpen={isOpen} onClose={onClose} />
              </div>
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
