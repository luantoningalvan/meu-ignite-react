import { Flex, Box, Text, Avatar } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData: boolean;
}

export function Profile({ showProfileData }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Luan Tonin Galvan</Text>
          <Text color="gray.300" fontSize="small">
            luan@brightmoon.dev
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="Luan Tonin Galvan"
        src="https://github.com/luantoningalvan.png"
      />
    </Flex>
  );
}
