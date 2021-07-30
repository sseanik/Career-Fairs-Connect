import {
  Button,
  ButtonGroup,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';

export function PresentationModal(props) {
  console.log(props);
  const color = props.color.replace(' ', '');
  const rgb = color.substring(4, color.length - 1).split(' ');

  return (
    <Modal onClose={props.onClose} isOpen={props.isOpen} isCentered>
      <ModalOverlay />
      <ModalContent p='1'>
        <ModalHeader m='0' pb='0'>
          {props.title}
          <Text m='0' pb='1' color='gray.500' fontSize='sm'>
            {props.time}
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody py='0'>{props.description}</ModalBody>
        <ModalFooter>
          <ButtonGroup>
            <Button
              as={Link}
              href={props.link}
              isExternal
              bg={color}
              _hover={{ bg: color }}
              color={
                rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114 > 186
                  ? 'black'
                  : 'white'
              }
              size='sm'
            >
              Go to Presentation
            </Button>
            <Button onClick={props.onClose} size='sm'>
              Close
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
