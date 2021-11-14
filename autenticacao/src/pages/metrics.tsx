import { GetServerSideProps } from "next";
import { withSSRAuth } from "../utils/withSSRAuth";

export default function Metrics() {
  return <h1>Metrics</h1>;
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async () => {
    return {
      props: {},
    };
  },
  {
    permissions: ["metrics.list3"],
    roles: ["administrator"],
  }
);
