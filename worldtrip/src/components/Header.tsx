import { Flex } from "@chakra-ui/react";

const logo = "/logo.svg";

export function Header() {
  return (
    <Flex as="header" justify="center" align="center" height="100">
      <img src={logo} alt="WorldTrip" />
    </Flex>
  );
}
