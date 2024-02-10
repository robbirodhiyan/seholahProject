import React from "react";
import { Box, Heading, Text, VStack, Image, Center } from "native-base";

const AboutScreen = () => {
  return (
    <Box p={5} alignItems="center" justifyContent="center">
      <Center>
        <Image
          source={{ uri: '../image.jpg' }}
          alt="Profile Image"
          size="xl"
          mb={4}
          borderRadius="full"
        />
      </Center>
      <Heading size="lg" mb={2}>
        Ahmad Robbi Rodhiyan Rifanto
      </Heading>
      <Text fontSize="md" color="gray.500">
        Android Developer
      </Text>
      <VStack space={4} alignItems="flex-start" mt={4}>
        <Text>
          <Text bold>Email:</Text> robbirodhiyan@gmail.com
        </Text>
        <Text>
          <Text bold>GitHub:</Text> [Akun GitHub Anda]
        </Text>
        <Text>
          <Text bold>LinkedIn:</Text> [Profil LinkedIn Anda]
        </Text>
        <Text>
          <Text bold>Alamat:</Text> Sidoarjo, Jawa Timur
        </Text>
        {/* Tambahkan informasi lainnya sesuai kebutuhan */}
      </VStack>
    </Box>
  );
};

export default AboutScreen;
