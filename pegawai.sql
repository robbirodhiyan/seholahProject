-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Feb 09, 2024 at 07:50 PM
-- Server version: 5.6.20-log
-- PHP Version: 5.4.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `create`
--

-- --------------------------------------------------------

--
-- Table structure for table `pegawai`
--

CREATE TABLE IF NOT EXISTS `pegawai` (
`id` int(11) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `alamat` varchar(50) NOT NULL,
  `tipe_sekolah` varchar(522) NOT NULL,
  `kodepos` varchar(5) NOT NULL,
  `provinsi` varchar(522) NOT NULL,
  `kabupaten` varchar(522) NOT NULL,
  `no_telp` varchar(12) NOT NULL,
  `email` varchar(522) NOT NULL,
  `facebook` varchar(522) NOT NULL,
  `jumlah` int(100) NOT NULL,
  `tgl_input` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=28 ;

--
-- Dumping data for table `pegawai`
--

INSERT INTO `pegawai` (`id`, `nama`, `alamat`, `tipe_sekolah`, `kodepos`, `provinsi`, `kabupaten`, `no_telp`, `email`, `facebook`, `jumlah`, `tgl_input`) VALUES
(24, 'Wahid hasyim', 'Krian', 'Swasta', '61262', 'JAWA TIMUR', 'KABUPATEN SIDOARJO', '082232900440', 'robbirodhiyan@gmail.com', 'Facebook ', 70, '2024-02-09 10:24:24'),
(25, 'Sma Tarik', 'Tarik', 'Negeri', '61262', '17', '1771', '082232900440', 'robbirodhiyan@gmail.com', 'Facebook ', 65, '2024-02-09 12:10:03'),
(26, 'Jakarta', 'Jakarta ', 'Negeri', '61262', 'JAWA TIMUR', 'KABUPATEN SITUBONDO', '082232900440', 'robbirodhiyan@gmail.com', 'Facebook ', 48, '2024-02-09 12:24:53'),
(27, 'sma Sumatera ', 'Sumatera ', 'Swasta', '61262', 'SUMATERA SELATAN', 'KABUPATEN BANYU ASIN', '082232900440', 'robbirodhiyan@gmail.com', 'Facebook ', 60, '2024-02-09 12:28:54');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pegawai`
--
ALTER TABLE `pegawai`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pegawai`
--
ALTER TABLE `pegawai`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=28;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
