import {
  Modal,
  ModalOverlay,
  ModalContent,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay>
        <ModalContent bg="gray.800">
          <Image maxW={900} maxH={600} src={imgUrl} />
          <Link href={imgUrl} display="block" p="4" target="_blank">
            Abrir original
          </Link>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
}
