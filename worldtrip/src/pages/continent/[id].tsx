import { Flex } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { Header } from "../../components/Header";
import { api } from "../../services/api";

interface ContinentProps {
  continent: {
    name: string;
  };
}

export default function Continent({ continent }: ContinentProps) {
  return (
    <div>
      <Head>
        <title>{continent.name} | WorldTrip</title>
      </Head>

      <Header />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (props) => {
  const fetchContinent = await api.get(`/continents/${props.params.id}`);

  return {
    props: {
      continent: fetchContinent.data,
    },
  };
};
