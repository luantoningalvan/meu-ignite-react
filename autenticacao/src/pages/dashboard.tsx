import { GetServerSideProps } from "next";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { withSSRAuth } from "../utils/withSSRAuth";

export default function Dashborad() {
  const { user, signOut } = useContext(AuthContext);

  return (
    <>
      <h1>Dasboard {user?.email}</h1>
      <button onClick={signOut}>Sair</button>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
  };
});
