import { Link as ChakraLink, Icon, Text, LinkProps } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { ActiveLink } from "../ActiveLink";

interface NavLinkProps extends LinkProps {
  title: string;
  icon: IconType;
  href: string;
}

export function NavLink({ title, icon, href, ...rest }: NavLinkProps) {
  return (
    <ActiveLink passHref href={href}>
      <ChakraLink display="flex" align="center" {...rest}>
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">
          {title}
        </Text>
      </ChakraLink>
    </ActiveLink>
  );
}
