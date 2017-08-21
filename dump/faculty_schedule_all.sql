-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 20, 2017 at 07:00 PM
-- Server version: 10.1.25-MariaDB
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `faculty_schedule`
--

-- --------------------------------------------------------

--
-- Table structure for table `building`
--

CREATE TABLE `building` (
  `seq` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `building`
--

INSERT INTO `building` (`seq`, `name`, `description`) VALUES
(35, 'GKB 3', 'Gedung Kuliah Bersama 3');

-- --------------------------------------------------------

--
-- Table structure for table `class`
--

CREATE TABLE `class` (
  `seq` int(11) NOT NULL,
  `course_seq` int(11) NOT NULL,
  `label` varchar(2) NOT NULL,
  `student_total` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `class`
--

INSERT INTO `class` (`seq`, `course_seq`, `label`, `student_total`) VALUES
(51, 39, 'A', 0),
(52, 39, 'B', 0),
(53, 39, 'C', 0),
(80, 43, 'A', 0),
(81, 43, 'B', 0),
(82, 43, 'C', 0),
(86, 45, 'A', 0),
(87, 45, 'B', 0),
(88, 45, 'C', 0),
(89, 46, 'A', 0),
(90, 46, 'B', 0),
(91, 46, 'C', 0),
(92, 47, 'A', 0),
(93, 47, 'B', 0),
(94, 47, 'C', 0),
(95, 48, 'A', 0),
(96, 48, 'B', 0),
(97, 48, 'C', 0),
(98, 49, 'A', 0),
(99, 49, 'B', 0),
(100, 49, 'C', 0),
(101, 50, 'A', 0),
(102, 50, 'B', 0),
(103, 50, 'C', 0),
(104, 51, 'A', 0),
(105, 51, 'B', 0),
(106, 51, 'C', 0),
(107, 52, 'A', 0),
(108, 52, 'B', 0),
(109, 52, 'C', 0),
(110, 53, 'A', 0),
(111, 53, 'B', 0),
(112, 53, 'C', 0),
(113, 54, 'A', 0),
(114, 54, 'B', 0),
(115, 54, 'C', 0),
(116, 55, 'A', 0),
(117, 55, 'B', 0),
(118, 55, 'C', 0),
(119, 56, 'A', 0),
(120, 56, 'B', 0),
(121, 56, 'C', 0),
(122, 44, 'A', 0),
(123, 44, 'B', 0),
(124, 44, 'C', 0),
(151, 127, 'A', 0),
(152, 128, 'A', 0),
(153, 126, 'A', 0),
(154, 126, 'B', 0),
(155, 129, 'A', 0),
(156, 129, 'B', 0),
(157, 129, 'C', 0);

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `seq` int(11) NOT NULL,
  `major_seq` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `sks` int(11) NOT NULL,
  `semester` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`seq`, `major_seq`, `name`, `description`, `sks`, `semester`) VALUES
(39, 18, 'Al-Islam dan Kemuhammadiyahan I', '', 1, 1),
(43, 18, 'Bahasa Inggris Teknik I', '', 2, 1),
(44, 18, 'Kalkulus I', '', 3, 1),
(45, 18, 'Fisika I', '', 3, 1),
(46, 18, 'Pengantar Teknik Elektro', '', 2, 1),
(47, 18, 'Dasar Pemograman Komputer', '', 2, 1),
(48, 18, 'Menggambar Teknik Elektro', '', 2, 1),
(49, 18, 'Ilmu Budaya Dasar', '', 2, 1),
(50, 18, 'Dasar Sistem Komunikasi', '', 2, 1),
(51, 18, 'Al-Islam dan Kemuhammadiyahan II', '', 1, 2),
(52, 18, 'Bahasa Inggris Teknik II', '', 2, 2),
(53, 18, 'Kalkulus II', '', 3, 2),
(54, 18, 'Fisika II', '', 3, 2),
(55, 18, 'Statistik dan Probabilitas', '', 2, 2),
(56, 18, 'Rangkaian Listrik I', '', 3, 2),
(57, 18, 'Dasar Elektronika', '', 3, 2),
(58, 18, 'Dasar Konversi Energi Listrik', '', 2, 2),
(59, 18, 'Matematika Teknik I', '', 3, 3),
(60, 18, 'Rangkaian Digital', '', 3, 3),
(61, 18, 'Teknik Informasi', '', 2, 3),
(62, 18, 'Medan Elektromagnetik I', '', 2, 3),
(65, 18, 'Elektronika', '', 3, 3),
(66, 18, 'Metode Numerik', '', 2, 3),
(67, 18, 'Rangkaian Listrik 2', '', 3, 3),
(68, 18, 'Matematika Teknik II', '', 3, 4),
(69, 18, 'Instalasi Listrik', '', 2, 4),
(70, 18, 'Sistem Instrumentasi', '', 3, 4),
(71, 18, 'Medan Elektromagnetik II', '', 3, 4),
(72, 18, 'Dasar Sistem Kontrol', '', 2, 4),
(73, 18, 'Elektronika Analog', '', 3, 4),
(74, 18, 'Arsitektur Komputer', '', 2, 4),
(75, 18, 'Al-Islam dan Kemuhammadiyahan III', '', 1, 5),
(76, 18, 'Mikrokontroller', '', 3, 5),
(77, 18, 'Bahasa Indonesia', '', 2, 5),
(78, 18, 'Sistem Linier', '', 3, 5),
(79, 18, 'Sistem Kontrol', '', 3, 5),
(80, 18, 'Mesin-mesin Listrik 1', 'Mata Kuliah Bidang Sistem Tenaga Listrik', 2, 5),
(81, 18, 'Analisis Sistem Tenaga 1', 'Mata Kuliah Bidang Sistem Tenaga Listrik', 3, 5),
(82, 18, 'Elektronika Daya', 'Mata Kuliah Bidang Sistem Tenaga Listrik', 3, 5),
(83, 18, 'Pembangkit Tenaga Listrik', 'Mata Kuliah Bidang Sistem Tenaga Listrik', 3, 5),
(84, 18, 'Dasar Sistem Elektronika Cerdas', 'Mata Kuliah Bidang Elektronika', 2, 5),
(85, 18, 'Rangkaian Pulsa', 'Mata Kuliah Bidang Elektronika', 3, 5),
(86, 18, 'Devais Semikonduktor', 'Mata Kuliah Bidang Elektronika', 2, 5),
(87, 18, 'Elektronika Industri', 'Mata Kuliah Bidang Elektronika', 3, 5),
(88, 18, 'Al-Islam dan Kemuhammadiyahan IV', '', 1, 6),
(89, 18, 'Ilmu Kealamiahan Dasar', '', 2, 6),
(90, 18, 'Pendidikan Kewarganegaraan', '', 2, 6),
(91, 18, 'Pengolahan Sinyal Digital', '', 3, 6),
(92, 18, 'Transmisi dan Distribusi Daya Listrik', 'Mata Kuliah Bidang Sistem Tenaga Listrik', 2, 6),
(93, 18, 'Analisis Sistem Tenaga 2', 'Mata Kuliah Bidang Sistem Tenaga Listrik', 2, 6),
(94, 18, 'Mesin-mesin Listrik 2', 'Mata Kuliah Bidang Sistem Tenaga Listrik', 2, 6),
(95, 18, 'Rangkaian Terpadu', 'Mata Kuliah Bidang Elektronika', 2, 6),
(96, 18, 'Pengolahan Citra Digital', 'Mata Kuliah Bidang Elektronika', 3, 6),
(97, 18, 'Perancangan Sistem Berbasis FPGA', 'Mata Kuliah Bidang Elektronika', 3, 6),
(98, 18, 'Jaringan Komputer', 'Mata Kuliah Bidang Elektronika', 3, 5),
(99, 18, 'Basis Data', 'Mata Kuliah Bidang Elektronika', 3, 5),
(100, 18, 'Pemograman Berorientasi Objek 1', 'Mata Kuliah Bidang Elektronika', 2, 5),
(101, 18, 'Pemograman Web', 'Mata Kuliah Bidang Elektronika', 2, 5),
(102, 18, 'Jaringan Komputer Lanjut', 'Mata Kuliah Bidang Elektronika', 3, 6),
(103, 18, 'Pemograman Berorientasi Objek 2', 'Mata Kuliah Bidang Elektronika', 2, 6),
(104, 18, 'Computer Vision', 'Mata Kuliah Bidang Elektronika', 2, 6),
(105, 18, 'Kecerdasan Buatan', 'Mata Kuliah Bidang Elektronika', 2, 6),
(106, 18, 'Embedded System', 'Mata Kuliah Bidang Elektronika', 2, 7),
(107, 18, 'Keamanan dan Manajemen Jaringan', 'Mata Kuliah Bidang Elektronika', 2, 7),
(108, 18, 'Pemograman Mobile', 'Mata Kuliah Bidang Elektronika', 3, 7),
(109, 18, 'Human Machine Interface', 'Mata Kuliah Bidang Elektronika', 3, 7),
(110, 18, 'Pra Tugas Akhir', '', 2, 7),
(111, 18, 'Praktek Kerja Nyata', '', 2, 7),
(112, 18, 'Ekonomi Teknik dan Kewirausahaan', '', 2, 7),
(113, 18, 'Tugas Akhir', '', 3, 8),
(114, 18, 'Kuliah Kerja Nyata', '', 3, 8),
(115, 18, 'Operasi Optimum dan Keandalan Sistem', 'Mata Kuliah Bidang Sistem Tenaga Listrik', 3, 7),
(116, 18, 'Komputasi Cerdas', 'Mata Kuliah Bidang Sistem Tenaga Listrik', 2, 7),
(117, 18, 'Progammable Logic Controller', 'Mata Kuliah Bidang Sistem Tenaga Listrik', 3, 7),
(122, 19, 'Dasar Sistem Komunikasi', '', 2, 3),
(123, 19, 'Elektronika Analog', '', 3, 3),
(124, 19, 'Sistem Informasi', '', 3, 4),
(125, 19, 'Administrasi Jaringan', '', 3, 4),
(126, 19, 'Administrasi Sistem', '', 2, 4),
(127, 19, 'Jaringan Wireless', '', 3, 5),
(128, 19, 'Pemograman Web', '', 3, 4),
(129, 19, 'Keamanan Jaringan', '', 3, 5);

-- --------------------------------------------------------

--
-- Table structure for table `day`
--

CREATE TABLE `day` (
  `seq` int(11) NOT NULL,
  `name` varchar(110) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `day`
--

INSERT INTO `day` (`seq`, `name`) VALUES
(1, 'Senin'),
(2, 'Selasa'),
(4, 'Rabu'),
(5, 'Kamis'),
(6, 'Jumat'),
(7, 'Sabtu');

-- --------------------------------------------------------

--
-- Table structure for table `day_hour`
--

CREATE TABLE `day_hour` (
  `seq` int(11) NOT NULL,
  `day_seq` int(11) NOT NULL,
  `hour_seq` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `day_hour`
--

INSERT INTO `day_hour` (`seq`, `day_seq`, `hour_seq`) VALUES
(40, 2, 17),
(41, 4, 17),
(42, 1, 17),
(43, 1, 19),
(44, 1, 21),
(45, 1, 23),
(46, 1, 25),
(47, 1, 27),
(48, 1, 29),
(49, 1, 18),
(50, 1, 20),
(51, 1, 22),
(52, 1, 24),
(53, 1, 28),
(54, 1, 26),
(55, 1, 30),
(56, 2, 18),
(57, 2, 20),
(58, 2, 22),
(59, 2, 24),
(60, 2, 26),
(61, 2, 28),
(62, 2, 30),
(63, 2, 29),
(64, 2, 27),
(65, 2, 25),
(66, 2, 23),
(67, 2, 21),
(68, 2, 19),
(69, 4, 18),
(70, 4, 19),
(71, 4, 20),
(72, 4, 21),
(73, 4, 22),
(74, 4, 23),
(75, 4, 24),
(76, 4, 25),
(77, 4, 26),
(78, 4, 27),
(79, 4, 28),
(80, 4, 29),
(81, 4, 30),
(82, 5, 17),
(83, 5, 18),
(84, 5, 19),
(85, 5, 20),
(86, 5, 21),
(87, 5, 22),
(88, 5, 23),
(89, 5, 24),
(90, 5, 25),
(91, 5, 26),
(92, 5, 27),
(93, 5, 28),
(94, 5, 29),
(95, 5, 30),
(96, 6, 17),
(97, 6, 18),
(98, 6, 19),
(99, 6, 20),
(100, 6, 21),
(101, 6, 23),
(102, 6, 24),
(103, 6, 25),
(104, 6, 26),
(105, 6, 27),
(106, 6, 28),
(107, 6, 29),
(108, 6, 30),
(109, 7, 17),
(110, 7, 18),
(111, 7, 19),
(112, 7, 20),
(113, 7, 21),
(114, 7, 22),
(115, 7, 23),
(116, 7, 24),
(117, 7, 25),
(118, 7, 26),
(119, 7, 27),
(120, 7, 28),
(121, 7, 29),
(122, 7, 30);

-- --------------------------------------------------------

--
-- Table structure for table `faculty`
--

CREATE TABLE `faculty` (
  `seq` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `building_seq` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `faculty`
--

INSERT INTO `faculty` (`seq`, `name`, `description`, `building_seq`) VALUES
(11, 'Fakultas Teknik', '', 35);

-- --------------------------------------------------------

--
-- Table structure for table `hour`
--

CREATE TABLE `hour` (
  `seq` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `start_hour` char(11) NOT NULL,
  `start_min` char(11) NOT NULL,
  `end_hour` char(11) NOT NULL,
  `end_min` char(11) NOT NULL,
  `sort` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `hour`
--

INSERT INTO `hour` (`seq`, `name`, `start_hour`, `start_min`, `end_hour`, `end_min`, `sort`) VALUES
(17, 'Jam Ke 1', '07', '00', '07', '50', 1),
(18, 'Jam Ke 2', '07', '50', '08', '40', 2),
(19, 'Jam Ke 3', '08', '40', '09', '30', 3),
(20, 'Jam Ke 4', '09', '30', '10', '20', 4),
(21, 'Jam Ke 5', '10', '20', '11', '10', 5),
(22, 'Jam Ke 6', '12', '10', '13', '00', 6),
(23, 'Jam Ke 7', '13', '00', '13', '50', 7),
(24, 'Jam Ke 8', '13', '50', '14', '40', 8),
(25, 'Jam Ke 9', '15', '15', '16', '55', 9),
(26, 'Jam Ke 10', '16', '05', '16', '55', 10),
(27, 'Jam Ke 11', '16', '55', '17', '45', 11),
(28, 'Jam Ke 12', '18', '15', '19', '05', 12),
(29, 'Jam Ke 13', '19', '05', '19', '55', 13),
(30, 'Jam Ke 14', '19', '55', '20', '45', 14);

-- --------------------------------------------------------

--
-- Table structure for table `major`
--

CREATE TABLE `major` (
  `seq` int(11) NOT NULL,
  `faculty_seq` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `major`
--

INSERT INTO `major` (`seq`, `faculty_seq`, `name`, `description`) VALUES
(18, 11, 'S1 - Teknik Elektro', 'S1'),
(19, 11, 'D3 - Teknik Elektro', 'D3');

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

CREATE TABLE `room` (
  `seq` int(11) NOT NULL,
  `building_seq` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `room`
--

INSERT INTO `room` (`seq`, `building_seq`, `name`, `description`) VALUES
(17, 35, '4.16', ''),
(18, 35, '5.26', ''),
(19, 35, '5.28A', ''),
(20, 35, '5.28B', ''),
(21, 35, '5.29', ''),
(22, 35, '5.30', '');

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `seq` int(11) NOT NULL,
  `generate_key` text NOT NULL,
  `class_seq` int(11) NOT NULL,
  `day_hour_seq` int(11) NOT NULL,
  `room_seq` int(11) NOT NULL,
  `update_at` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `schedule_log`
--

CREATE TABLE `schedule_log` (
  `seq` int(11) NOT NULL,
  `major_seq` int(11) NOT NULL,
  `generate_key` text NOT NULL,
  `status` enum('P','D') NOT NULL,
  `update_at` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `schedule_tmp`
--

CREATE TABLE `schedule_tmp` (
  `seq` int(11) NOT NULL,
  `generate_key` varchar(10) NOT NULL,
  `class_seq` int(11) NOT NULL,
  `day_hour_seq` int(11) NOT NULL,
  `room_seq` int(11) NOT NULL,
  `approved` enum('A','N','U') NOT NULL,
  `created_by` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `semester`
--

CREATE TABLE `semester` (
  `seq` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `teacher`
--

CREATE TABLE `teacher` (
  `seq` int(11) NOT NULL,
  `nidn` varchar(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `contact` varchar(100) NOT NULL,
  `address` text NOT NULL,
  `education_degree` varchar(100) NOT NULL,
  `degree` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `teacher`
--

INSERT INTO `teacher` (`seq`, `nidn`, `name`, `contact`, `address`, `education_degree`, `degree`) VALUES
(22, '0705106601', 'Ir. M. Irfan, M.T', '08123366697', 'Piranha', 'S2', ''),
(25, '0721106301', 'Dr. Ir. Lailis Syafa\'ah, M.T', '081336092019', 'sengkaling', 'S3', ''),
(26, '0718036502', 'Ir. Nur Alif Mardiyah, M.T', '08123312287', 'sukun', 'S2', ''),
(27, '0706066501', 'Ir. Diding Suhardi, M.T', '085234239998', 'Tlaga Warna', 'S2', ''),
(28, '0717018801', 'Ilham Pakaya, S.T', '081333383989', 'Oma Campus', 'S1', ''),
(29, '0709117804', 'Dr. Zulfatman, M.Eng', '081081081', 'Jalan', 'S3', ''),
(34, '0705056501', 'Dr. Ir. Ermanu Azizul Hakim, M.T', '081334233313', 'Piranha', 'S3', ''),
(36, '0715067402', 'Machmud Effendy, S.T, M.Eng', '081334409190', 'Jalan', 'S2', ''),
(37, '0731126202', 'Ir. Nurhadi, M.T', '08123317547', 'Jalan', 'S2', ''),
(38, '0707106301', 'Ir. Nur Kasan, M.T', '081233670786', 'Jalan', 'S2', ''),
(39, '0007086808', 'M. Chasrun Hasani, S.T, M.T', '0811360494', 'Jalan', 'S2', ''),
(40, '0026106701', 'Drs. Budhi Priyanto, M.Si', '085648839831', 'Jalan', 'S2', ''),
(41, '0717027001', 'Eko Budi Cahyono, S.Kom, M.T', '08123314480', 'Jalan', 'S2', ''),
(42, '1121312986', 'Zamah Sari, S.T, M.T', '081082081082', 'Sengkaling', 'S2', ''),
(43, '21332414', 'Ilyas Nuryasin, S.Kom, M.Kom', '089765382841', 'Tirto', 'S2', ''),
(44, '120939472', 'Khaeruddin, S.T', '089762545417', 'Jetis', 'S1', '');

-- --------------------------------------------------------

--
-- Table structure for table `teacher_classes`
--

CREATE TABLE `teacher_classes` (
  `seq` int(11) NOT NULL,
  `teacher_seq` int(11) NOT NULL,
  `class_seq` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `teacher_classes`
--

INSERT INTO `teacher_classes` (`seq`, `teacher_seq`, `class_seq`) VALUES
(148, 22, 89),
(149, 22, 90),
(150, 22, 91),
(151, 22, 101),
(152, 22, 102),
(153, 22, 103),
(154, 28, 92),
(155, 28, 93),
(156, 28, 94),
(160, 27, 95),
(161, 27, 96),
(162, 27, 97),
(163, 40, 86),
(164, 40, 87),
(165, 40, 88),
(166, 26, 98),
(167, 26, 99),
(168, 26, 100),
(169, 25, 51),
(170, 25, 52),
(171, 25, 53),
(172, 25, 116),
(173, 25, 117),
(174, 25, 118),
(175, 37, 119),
(176, 37, 120),
(177, 37, 121),
(178, 36, 110),
(179, 36, 111),
(180, 36, 112),
(181, 39, 113),
(182, 39, 114),
(183, 39, 115),
(184, 38, 80),
(185, 38, 81),
(186, 38, 82),
(187, 41, 107),
(188, 41, 108),
(189, 41, 109),
(190, 29, 104),
(191, 29, 105),
(192, 29, 106),
(202, 38, 122),
(203, 38, 123),
(204, 38, 124),
(208, 44, 153),
(209, 44, 154),
(210, 44, 155),
(211, 44, 156),
(212, 44, 157),
(213, 42, 151),
(214, 42, 152);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `seq` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`seq`, `username`, `password`) VALUES
(2, 'ferico', 'fd2ea139d2ee6940b86f07fb0191702f'),
(4, 'admin', '21232f297a57a5a743894a0e4a801fc3');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `building`
--
ALTER TABLE `building`
  ADD PRIMARY KEY (`seq`);

--
-- Indexes for table `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`seq`),
  ADD KEY `course_seq` (`course_seq`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`seq`),
  ADD KEY `major_seq` (`major_seq`);

--
-- Indexes for table `day`
--
ALTER TABLE `day`
  ADD PRIMARY KEY (`seq`);

--
-- Indexes for table `day_hour`
--
ALTER TABLE `day_hour`
  ADD PRIMARY KEY (`seq`),
  ADD KEY `day_seq` (`day_seq`),
  ADD KEY `hour_seq` (`hour_seq`);

--
-- Indexes for table `faculty`
--
ALTER TABLE `faculty`
  ADD PRIMARY KEY (`seq`),
  ADD KEY `building_seq` (`building_seq`);

--
-- Indexes for table `hour`
--
ALTER TABLE `hour`
  ADD PRIMARY KEY (`seq`);

--
-- Indexes for table `major`
--
ALTER TABLE `major`
  ADD PRIMARY KEY (`seq`),
  ADD KEY `faculty_seq` (`faculty_seq`);

--
-- Indexes for table `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`seq`),
  ADD KEY `building_seq` (`building_seq`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`seq`),
  ADD KEY `class_seq` (`class_seq`),
  ADD KEY `day_hour_seq` (`day_hour_seq`),
  ADD KEY `room_seq` (`room_seq`);

--
-- Indexes for table `schedule_log`
--
ALTER TABLE `schedule_log`
  ADD PRIMARY KEY (`seq`),
  ADD KEY `major_seq` (`major_seq`);

--
-- Indexes for table `schedule_tmp`
--
ALTER TABLE `schedule_tmp`
  ADD PRIMARY KEY (`seq`),
  ADD KEY `class_seq` (`class_seq`),
  ADD KEY `day_hour_seq` (`day_hour_seq`),
  ADD KEY `room_seq` (`room_seq`);

--
-- Indexes for table `semester`
--
ALTER TABLE `semester`
  ADD PRIMARY KEY (`seq`);

--
-- Indexes for table `teacher`
--
ALTER TABLE `teacher`
  ADD PRIMARY KEY (`seq`);

--
-- Indexes for table `teacher_classes`
--
ALTER TABLE `teacher_classes`
  ADD PRIMARY KEY (`seq`),
  ADD KEY `teacher_seq` (`teacher_seq`),
  ADD KEY `class_seq` (`class_seq`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`seq`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `building`
--
ALTER TABLE `building`
  MODIFY `seq` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;
--
-- AUTO_INCREMENT for table `class`
--
ALTER TABLE `class`
  MODIFY `seq` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=158;
--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `seq` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=130;
--
-- AUTO_INCREMENT for table `day`
--
ALTER TABLE `day`
  MODIFY `seq` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `day_hour`
--
ALTER TABLE `day_hour`
  MODIFY `seq` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=123;
--
-- AUTO_INCREMENT for table `faculty`
--
ALTER TABLE `faculty`
  MODIFY `seq` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `hour`
--
ALTER TABLE `hour`
  MODIFY `seq` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
--
-- AUTO_INCREMENT for table `major`
--
ALTER TABLE `major`
  MODIFY `seq` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `room`
--
ALTER TABLE `room`
  MODIFY `seq` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `seq` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=157;
--
-- AUTO_INCREMENT for table `schedule_log`
--
ALTER TABLE `schedule_log`
  MODIFY `seq` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `schedule_tmp`
--
ALTER TABLE `schedule_tmp`
  MODIFY `seq` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=355;
--
-- AUTO_INCREMENT for table `semester`
--
ALTER TABLE `semester`
  MODIFY `seq` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `teacher`
--
ALTER TABLE `teacher`
  MODIFY `seq` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;
--
-- AUTO_INCREMENT for table `teacher_classes`
--
ALTER TABLE `teacher_classes`
  MODIFY `seq` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=215;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `seq` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `class`
--
ALTER TABLE `class`
  ADD CONSTRAINT `class_ibfk_1` FOREIGN KEY (`course_seq`) REFERENCES `course` (`seq`);

--
-- Constraints for table `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `course_ibfk_1` FOREIGN KEY (`major_seq`) REFERENCES `major` (`seq`);

--
-- Constraints for table `day_hour`
--
ALTER TABLE `day_hour`
  ADD CONSTRAINT `day_hour_ibfk_1` FOREIGN KEY (`day_seq`) REFERENCES `day` (`seq`),
  ADD CONSTRAINT `day_hour_ibfk_2` FOREIGN KEY (`hour_seq`) REFERENCES `hour` (`seq`);

--
-- Constraints for table `faculty`
--
ALTER TABLE `faculty`
  ADD CONSTRAINT `faculty_ibfk_1` FOREIGN KEY (`building_seq`) REFERENCES `building` (`seq`);

--
-- Constraints for table `major`
--
ALTER TABLE `major`
  ADD CONSTRAINT `major_ibfk_1` FOREIGN KEY (`faculty_seq`) REFERENCES `faculty` (`seq`);

--
-- Constraints for table `room`
--
ALTER TABLE `room`
  ADD CONSTRAINT `room_ibfk_1` FOREIGN KEY (`building_seq`) REFERENCES `building` (`seq`);

--
-- Constraints for table `schedule`
--
ALTER TABLE `schedule`
  ADD CONSTRAINT `schedule_ibfk_1` FOREIGN KEY (`class_seq`) REFERENCES `class` (`seq`),
  ADD CONSTRAINT `schedule_ibfk_2` FOREIGN KEY (`day_hour_seq`) REFERENCES `day_hour` (`seq`),
  ADD CONSTRAINT `schedule_ibfk_3` FOREIGN KEY (`room_seq`) REFERENCES `room` (`seq`);

--
-- Constraints for table `schedule_log`
--
ALTER TABLE `schedule_log`
  ADD CONSTRAINT `schedule_log_ibfk_1` FOREIGN KEY (`major_seq`) REFERENCES `major` (`seq`);

--
-- Constraints for table `schedule_tmp`
--
ALTER TABLE `schedule_tmp`
  ADD CONSTRAINT `schedule_tmp_ibfk_1` FOREIGN KEY (`class_seq`) REFERENCES `class` (`seq`),
  ADD CONSTRAINT `schedule_tmp_ibfk_2` FOREIGN KEY (`day_hour_seq`) REFERENCES `day_hour` (`seq`),
  ADD CONSTRAINT `schedule_tmp_ibfk_3` FOREIGN KEY (`room_seq`) REFERENCES `room` (`seq`);

--
-- Constraints for table `teacher_classes`
--
ALTER TABLE `teacher_classes`
  ADD CONSTRAINT `teacher_classes_ibfk_1` FOREIGN KEY (`teacher_seq`) REFERENCES `teacher` (`seq`),
  ADD CONSTRAINT `teacher_classes_ibfk_2` FOREIGN KEY (`class_seq`) REFERENCES `class` (`seq`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
