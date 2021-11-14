import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [imageUrl, setImageUrl] = useState('');

  const handleChangeImage = useCallback(
    (url: string) => {
      setImageUrl(url);
      onOpen();
    },
    [setImageUrl, onOpen]
  );

  return (
    <>
      <SimpleGrid columns={3} spacing="10">
        {cards.map(image => (
          <Card viewImage={handleChangeImage} data={image} key={image.id} />
        ))}
      </SimpleGrid>

      {isOpen && (
        <ModalViewImage isOpen={isOpen} onClose={onClose} imgUrl={imageUrl} />
      )}
    </>
  );
}
