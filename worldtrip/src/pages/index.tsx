import {
  Flex,
  Heading,
  Text,
  Box,
  Container,
  SimpleGrid,
} from "@chakra-ui/react";
import Head from "next/head";
import { Header } from "../components/Header";

const logo = "./logo.svg";
const airplane = "./airplane.svg";
const bannerBackground = "./background.png";

const icons = {
  building: "./icons/building.png",
  cocktail: "./icons/cocktail.png",
  earth: "./icons/earth.png",
  museum: "./icons/museum.png",
  surf: "./icons/surf.png",
};

const featured = [
  { label: "vida noturna", icon: icons.cocktail },
  { label: "praia", icon: icons.surf },
  { label: "moderno", icon: icons.building },
  { label: "clássico", icon: icons.museum },
  { label: "e mais...", icon: icons.earth },
];

export default function Home() {
  return (
    <div>
      <Head>
        <title>Início | WorldTrip</title>
      </Head>

      <Header />

      <Flex bgImage={bannerBackground} height="335" bgSize="cover">
        <Container maxW="container.xl">
          <Flex justify="space-between" mt={20}>
            <Box>
              <Heading color="white" fontWeight="500">
                5 Continentes,
                <br /> infinitas possibilidades.
              </Heading>
              <Text color="gray.200" fontSize="xl" mt={5}>
                Chegou a hora de tirar do papel a viagem que você
                <br /> sempre sonhou.
              </Text>
            </Box>

            <Box as="img" maxW="420" src={airplane} alt="Avião nas nuvens" />
          </Flex>
        </Container>
      </Flex>

      <Container maxW="container.xl" mt="115px">
        <SimpleGrid columns={featured.length}>
          {featured.map((opt) => (
            <Flex
              align="center"
              justify="center"
              direction="column"
              key={opt.label}
            >
              <img src={opt.icon} alt={opt.label} />
              <Heading
                fontWeight="600"
                align="center"
                size="md"
                color="gray.500"
                mt={4}
              >
                {opt.label}
              </Heading>
            </Flex>
          ))}
        </SimpleGrid>

        <Box bg="gray.500" mt="80px" width="90px" height="2px" mx="auto" />

        <Heading textAlign="center" fontWeight="500" mt="52px" color="gray.500">
          Vamos nessa?
          <br />
          Então escolha seu continente
        </Heading>
      </Container>
    </div>
  );
}
