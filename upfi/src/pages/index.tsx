import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    async ({ pageParam = null }) => {
      const result = await api.get('/api/images', {
        params: {
          after: pageParam,
        },
      });
      return result.data;
    },
    {
      getNextPageParam: lastPage => lastPage.after || null,
    }
  );

  const formattedData = useMemo(() => {
    return data?.pages
      ? data.pages.reduce(
          (prev, curr) => [
            ...prev,
            ...curr.data.map(image => ({
              title: image.title,
              description: image.description,
              url: image.url,
              ts: image.ts,
              id: image.id,
            })),
          ],
          []
        )
      : [];
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && (
          <Button mt="10" onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
