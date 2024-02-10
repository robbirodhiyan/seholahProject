import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import {
  Select,
  Box,
  Heading,
  Text,
  Flex,
  Pressable,
  FlatList,
  Button,
  Input,
  HStack,
  ScrollView,
  Modal,
  VStack,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = () => {
  const [nama, setNama] = useState("");
  const [kodepos, setKodepos] = useState("");
  const [alamat, setAlamat] = useState("");
  const [no_telp, setNotelp] = useState("");
  const [email, setEmail] = useState("");
  const [facebook, setFacebook] = useState("");
  const [jumlah, setJumlahsiswa] = useState("");
  const [listData, setListData] = useState([]);
  const [idEdit, setIdEdit] = useState(null);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  // const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedSekolah, setSelectedSekolah] = useState("");
  // const [selectedCity, setSelectedCity] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedProvinceId, setSelectedProvinceId] = useState("");
  const [selectedProvinceName, setSelectedProvinceName] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("");
  const [selectedCityName, setSelectedCityName] = useState("");
  const url = "http://192.168.1.19/api/create.php";
  const provincesApiUrl =
    "https://emsifa.github.io/api-wilayah-indonesia/api/provinces.json";

  const openDetailModal = (item) => {
    setSelectedItem(item);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedItem(null);
  };

  useEffect(() => {
    ambilListData();
    ambilProvinces();
  }, []);

  const ambilListData = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setListData(json.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const ambilProvinces = async () => {
    try {
      const response = await fetch(provincesApiUrl);
      const json = await response.json();
      setProvinces(json);
    } catch (error) {
      console.log(error);
    }
  };

  const ambilCities = async (provinceId) => {
    try {
      const response = await fetch(
        `https://emsifa.github.io/api-wilayah-indonesia/api/regencies/${provinceId}.json`
      );
      const json = await response.json();
      setCities(json);
    } catch (error) {
      console.log(error);
    }
  };

  const klikSimpan = () => {
    if (
      nama === "" ||
      alamat === "" ||
      selectedProvinceName === "" ||
      selectedCityName === "" ||
      selectedSekolah === "" ||
      kodepos === "" ||
      no_telp === "" ||
      email === "" ||
      jumlah === ""
    ) {
      alert("Silakan lengkapi semua data");
    } else {
      const urlAksi = idEdit
        ? `${url}/?op=update&id=${idEdit}`
        : `${url}/?op=create`;

      fetch(urlAksi, {
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `nama=${nama}&alamat=${alamat}&provinsi=${selectedProvinceName}&kabupaten=${selectedCityName}&kodepos=${kodepos}&no_telp=${no_telp}&tipe_sekolah=${selectedSekolah}&facebook=${facebook}&jumlah=${jumlah}&email=${email}`,
      })
        .then((response) => response.json())
        .then(() => {
          setNama("");
          setAlamat("");
          setKodepos("");
          setNotelp("");
          setEmail("");
          setJumlahsiswa("");
          setIdEdit(null);
          setSelectedProvinceName("");
          setSelectedCityName("");
          ambilListData();
          setIsModalOpen(false);
        })
        .catch((error) => {
          console.error("Error during API call:", error);
          alert("Terjadi kesalahan saat menyimpan data");
        });
    }
  };

  const klikEdit = async (id) => {
    try {
      const response = await fetch(`${url}/?op=detail&id=${id}`);
      const json = await response.json();
      setNama(json.data.result[0].nama);
      setAlamat(json.data.result[0].alamat);
      setSelectedProvinceName(json.data.result[0].provinsi);
      setSelectedCityName(json.data.result[0].kabupaten);
      setIdEdit(id);
      ambilCities(json.data.result[0].provinsi);
    } catch (error) {
      console.log(error);
    }
  };

  const klikDelete = async (id) => {
    try {
      const response = await fetch(`${url}/?op=delete&id=${id}`);
      const json = await response.json();
      alert("Data berhasil didelete");
      ambilListData();
    } catch (error) {
      console.log(error);
    }
  };
  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => openDetailModal(item)}
      borderWidth="1px"
      p="4"
      mt="4"
      borderRadius="md"
    >
      <Box>
        <Heading size="md">{item.nama}</Heading>
        <Text mt="2">Address:{item.alamat}</Text>
        <Text>Email: {item.email}</Text>
        <Text>Phone: {item.no_telp}</Text>
      </Box>
      <HStack>
        <Pressable p={5} onPress={() => klikEdit(item.id)}>
          <Ionicons color="blue" size={20} name="pencil"></Ionicons>
        </Pressable>
        <Pressable p={5} onPress={() => klikDelete(item.id)}>
          <Ionicons size={20} color="red" name="trash"></Ionicons>
        </Pressable>
      </HStack>
    </Pressable>
  );
  return (
    <Box p={5}>
      <Flex
        direction="row"
        mb="2.5"
        mt="1.5"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box ml="20px" mt="15px">
          <Heading>Home</Heading>
          <Text>Check Your School 🤘</Text>
        </Box>
        <Pressable mr="20px" onPress={() => setIsModalOpen(true)}>
          <Ionicons name="add" size={26}></Ionicons>
        </Pressable>
      </Flex>

      <FlatList
        data={listData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Content>
          <Modal.Header>Masukkan Data</Modal.Header>
          <Modal.CloseButton />
          <Modal.Body>
            <Text fontWeight={400} fontSize={14}>
              Tipe Sekolah
            </Text>
            <Select
              selectedValue={selectedSekolah}
              placeholder="Select School Type"
              onValueChange={(value) => setSelectedSekolah(value)}
              mb={5}
            >
              <Select.Item label="Negeri" value="Negeri" />
              <Select.Item label="Swasta" value="Swasta" />
            </Select>
            <Input
              mb={5}
              placeholder="Masukkan Nama Sekolah"
              value={nama}
              onChangeText={(text) => setNama(text)}
            />
            <Input
              mb={5}
              placeholder="Masukkan Alamat"
              value={alamat}
              onChangeText={(text) => setAlamat(text)}
            />
            <Input
              mb={5}
              placeholder="Kode Pos"
              keyboardType="numeric"
              maxLength={5}
              value={kodepos}
              onChangeText={(text) => setKodepos(text)}
            />
            <Box>
              <Text>Provinsi</Text>
              <Select
                mb={5}
                selectedValue={selectedProvinceId}
                onValueChange={(value) => {
                  const selectedProv = provinces.find(
                    (prov) => prov.id === value
                  );
                  setSelectedProvinceId(value);
                  setSelectedProvinceName(selectedProv.name);
                  ambilCities(value);
                }}
              >
                <Select.Item label="Pilih Provinsi" value="" />
                {provinces.map((province) => (
                  <Select.Item
                    key={province.id}
                    label={province.name}
                    value={province.id}
                  />
                ))}
              </Select>
            </Box>
            <Box>
              <Text>Kabupaten/Kota</Text>
              <Select
                mb={5}
                selectedValue={selectedCityId}
                onValueChange={(value) => {
                  const selectedCit = cities.find((city) => city.id === value);
                  setSelectedCityId(value);
                  setSelectedCityName(selectedCit.name);
                }}
              >
                <Select.Item label="Pilih Kabupaten/Kota" value="" />
                {cities.map((city) => (
                  <Select.Item
                    key={city.id}
                    label={city.name}
                    value={city.id}
                  />
                ))}
              </Select>
            </Box>
            <Input
              mb={5}
              placeholder="No Telepon Sekolah"
              keyboardType="numeric"
              maxLength={12}
              value={no_telp}
              onChangeText={(text) => setNotelp(text)}
            />
            <Input
              mb={5}
              placeholder="Email Sekolah"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <Input
              mb={5}
              placeholder="Facebook"
              value={facebook}
              onChangeText={(text) => setFacebook(text)}
            />
            <Input
              mb={5}
              placeholder="Jumlah Siswa"
              keyboardType="numeric"
              maxLength={100}
              value={jumlah}
              onChangeText={(text) => setJumlahsiswa(text)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button colorScheme="blue" onPress={klikSimpan}>
              Simpan
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Modal isOpen={isDetailModalOpen} onClose={closeDetailModal}>
        <Modal.Content>
          <Modal.Header>Detail Sekolah</Modal.Header>
          <Modal.CloseButton />
          <Modal.Body>
            {/* Menampilkan informasi detail dari selectedItem */}
            {selectedItem ? (
              <VStack space={4} alignItems="flex-start">
                <Text>Nama: {selectedItem.nama}</Text>
                <Text>Alamat: {selectedItem.alamat}</Text>
                <Text>Provinsi: {selectedItem.provinsi}</Text>
                <Text>Kabupaten: {selectedItem.kabupaten}</Text>
                <Text>No Telepon: {selectedItem.no_telp}</Text>
                <Text>Email: {selectedItem.email}</Text>
                {/* Tambahkan kolom lainnya sesuai kebutuhan */}
              </VStack>
            ) : (
              <Text>Tidak ada data yang dipilih</Text>
            )}
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Box>
  );
};

export default HomeScreen;
