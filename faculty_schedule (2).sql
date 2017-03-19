-- phpMyAdmin SQL Dump
-- version 4.3.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 19 Mar 2017 pada 15.25
-- Versi Server: 5.6.22
-- PHP Version: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `faculty_schedule`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `building`
--

CREATE TABLE IF NOT EXISTS `building` (
`seq` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `building`
--

INSERT INTO `building` (`seq`, `name`, `description`) VALUES
(28, 'GKB 1', 'Gedung Kuliah Bersama 1'),
(30, 'GKB 2', 'Gedung Kuliah Bersama 2'),
(33, 'Masjid A.R Fachruddin UMM', 'Masjid Besar UMM');

-- --------------------------------------------------------

--
-- Struktur dari tabel `class`
--

CREATE TABLE IF NOT EXISTS `class` (
`seq` int(11) NOT NULL,
  `course_seq` int(11) NOT NULL,
  `label` varchar(2) NOT NULL,
  `student_total` int(11) DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=189 DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `class`
--

INSERT INTO `class` (`seq`, `course_seq`, `label`, `student_total`) VALUES
(141, 3, 'A', 0),
(142, 3, 'B', 0),
(143, 3, 'C', 0),
(144, 3, 'D', 0),
(145, 4, 'A', 0),
(146, 4, 'B', 0),
(147, 4, 'C', 0),
(148, 9, 'A', 0),
(149, 9, 'B', 0),
(150, 9, 'C', 0),
(151, 5, 'A', 0),
(152, 5, 'B', 0),
(153, 5, 'C', 0),
(154, 8, 'A', 0),
(155, 8, 'B', 0),
(156, 8, 'C', 0),
(157, 10, 'A', 0),
(158, 10, 'B', 0),
(159, 10, 'C', 0),
(160, 11, 'A', 0),
(161, 11, 'B', 0),
(162, 11, 'C', 0),
(163, 12, 'A', 0),
(164, 12, 'B', 0),
(165, 13, 'A', 0),
(166, 13, 'B', 0),
(167, 13, 'C', 0),
(168, 13, 'D', 0),
(169, 13, 'E', 0),
(170, 14, 'A', 0),
(171, 14, 'B', 0),
(172, 14, 'C', 0),
(173, 14, 'D', 0),
(174, 14, 'E', 0),
(175, 15, 'A', 0),
(176, 15, 'B', 0),
(177, 15, 'C', 0),
(178, 15, 'D', 0),
(179, 16, 'A', 0),
(180, 16, 'B', 0),
(181, 16, 'C', 0),
(182, 17, 'A', 0),
(183, 17, 'B', 0),
(184, 17, 'C', 0),
(185, 17, 'D', 0),
(186, 18, 'A', 0),
(187, 18, 'B', 0),
(188, 18, 'C', 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `course`
--

CREATE TABLE IF NOT EXISTS `course` (
`seq` int(11) NOT NULL,
  `major_seq` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `sks` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `course`
--

INSERT INTO `course` (`seq`, `major_seq`, `name`, `description`, `sks`) VALUES
(3, 1, 'RBK', 'Rekayasa Basis Komponen', 2),
(4, 2, 'Kalkulus', '', 2),
(5, 3, 'Sosiologi', '', 1),
(8, 1, 'RI', 'Rekayasa Interaksi', 3),
(9, 1, 'Komdat', 'adasasdasa', 2),
(10, 1, 'Aljabar Linier', 'Ngitung', 2),
(11, 1, 'Kecerdasan Buatan', 'AI', 2),
(12, 1, 'Teori Bahasa & Otomata', 'Teori', 2),
(13, 1, 'Matematika Diskrit', 'wkwkwkkwkww', 2),
(14, 1, 'Pemrograman Web', 'hahahaha', 2),
(15, 3, 'HUKUM A', '', 2),
(16, 3, 'HUKUM B', '', 2),
(17, 3, 'HUKUM C', '', 2),
(18, 3, 'HUKUM D', '', 2);

-- --------------------------------------------------------

--
-- Struktur dari tabel `day`
--

CREATE TABLE IF NOT EXISTS `day` (
`seq` int(11) NOT NULL,
  `name` varchar(110) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `day`
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
-- Struktur dari tabel `day_hour`
--

CREATE TABLE IF NOT EXISTS `day_hour` (
`seq` int(11) NOT NULL,
  `day_seq` int(11) NOT NULL,
  `hour_seq` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `day_hour`
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
-- Struktur dari tabel `faculty`
--

CREATE TABLE IF NOT EXISTS `faculty` (
`seq` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `building_seq` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `faculty`
--

INSERT INTO `faculty` (`seq`, `name`, `description`, `building_seq`) VALUES
(1, 'Fakultas Teknik', 'Fakultas Teknik', 28),
(2, 'Fakultas Kedokteran', 'Fakultas Kedokteran', 28),
(3, 'Fakultas Hukum', 'Fakultas Hukum', 28),
(4, 'Fakultas Pendidikan', 'Fakultas Pendidikan', 28);

-- --------------------------------------------------------

--
-- Struktur dari tabel `hour`
--

CREATE TABLE IF NOT EXISTS `hour` (
`seq` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `start_hour` char(11) NOT NULL,
  `start_min` char(11) NOT NULL,
  `end_hour` char(11) NOT NULL,
  `end_min` char(11) NOT NULL,
  `sort` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `hour`
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
-- Struktur dari tabel `major`
--

CREATE TABLE IF NOT EXISTS `major` (
`seq` int(11) NOT NULL,
  `faculty_seq` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `major`
--

INSERT INTO `major` (`seq`, `faculty_seq`, `name`, `description`) VALUES
(1, 1, 'Teknik Informatika', 'Teknik Informatika'),
(2, 1, 'Teknik Elektronika', 'Teknik Elektronika'),
(3, 3, 'Ilmu Hukum', 'Ilmu Hukum'),
(5, 0, 'Mesin', '');

-- --------------------------------------------------------

--
-- Struktur dari tabel `room`
--

CREATE TABLE IF NOT EXISTS `room` (
`seq` int(11) NOT NULL,
  `building_seq` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `room`
--

INSERT INTO `room` (`seq`, `building_seq`, `name`, `description`) VALUES
(1, 28, 'Ruang 401', 'asdsdsadasdasdasdsaads'),
(2, 33, 'Ruang 402', 'Masjid Lantai 2'),
(3, 28, 'Ruang 403', '403'),
(4, 30, 'Ruangan 202', ''),
(5, 30, 'Ruangan 203', ''),
(6, 30, 'Ruangan 204', ''),
(7, 28, 'Ruangan 403', ''),
(8, 28, 'Ruan 404', ''),
(9, 28, 'Ruang 405', ''),
(10, 28, 'Ruang 306', ''),
(11, 28, 'Ruang 307', '');

-- --------------------------------------------------------

--
-- Struktur dari tabel `schedule`
--

CREATE TABLE IF NOT EXISTS `schedule` (
`seq` int(11) NOT NULL,
  `class_seq` int(11) NOT NULL,
  `day_hour_seq` int(11) NOT NULL,
  `room_seq` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=369 DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `schedule`
--

INSERT INTO `schedule` (`seq`, `class_seq`, `day_hour_seq`, `room_seq`) VALUES
(310, 141, 58, 10),
(311, 141, 49, 1),
(312, 142, 43, 1),
(313, 142, 50, 1),
(314, 143, 44, 1),
(315, 143, 51, 1),
(316, 144, 45, 1),
(317, 142, 42, 8),
(318, 154, 46, 1),
(319, 154, 54, 1),
(320, 154, 47, 1),
(321, 155, 53, 1),
(322, 155, 48, 1),
(323, 155, 55, 1),
(324, 156, 40, 1),
(325, 156, 56, 1),
(326, 156, 68, 1),
(327, 148, 57, 1),
(328, 148, 67, 1),
(329, 149, 58, 1),
(330, 149, 66, 1),
(331, 150, 59, 1),
(332, 150, 65, 1),
(333, 157, 60, 1),
(334, 157, 64, 1),
(335, 158, 61, 1),
(336, 158, 63, 1),
(337, 159, 62, 1),
(338, 159, 41, 1),
(339, 160, 69, 1),
(340, 160, 70, 1),
(341, 161, 71, 1),
(342, 161, 72, 1),
(343, 162, 73, 1),
(344, 162, 74, 1),
(345, 163, 75, 1),
(346, 163, 76, 1),
(347, 164, 77, 1),
(348, 164, 78, 1),
(349, 165, 79, 1),
(350, 165, 80, 1),
(351, 166, 81, 1),
(352, 166, 82, 1),
(353, 167, 83, 1),
(354, 167, 84, 1),
(355, 168, 85, 1),
(356, 168, 86, 1),
(357, 169, 87, 1),
(358, 169, 88, 1),
(359, 170, 89, 1),
(360, 170, 90, 1),
(361, 171, 91, 1),
(362, 171, 92, 1),
(363, 172, 93, 1),
(364, 172, 94, 1),
(365, 173, 95, 1),
(366, 173, 96, 1),
(367, 174, 97, 1),
(368, 174, 98, 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `schedule_tmp`
--

CREATE TABLE IF NOT EXISTS `schedule_tmp` (
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
-- Struktur dari tabel `semester`
--

CREATE TABLE IF NOT EXISTS `semester` (
`seq` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `teacher`
--

CREATE TABLE IF NOT EXISTS `teacher` (
`seq` int(11) NOT NULL,
  `nidn` varchar(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `contact` varchar(100) NOT NULL,
  `address` text NOT NULL,
  `education_degree` varchar(100) NOT NULL,
  `degree` varchar(100) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `teacher`
--

INSERT INTO `teacher` (`seq`, `nidn`, `name`, `contact`, `address`, `education_degree`, `degree`) VALUES
(1, '12345678', 'Zamah', '089623993782', 'Sunter', 'S1', 'hahaha'),
(6, '812321213', 'Maskur', '123', 'asdsad', 'S2', ''),
(7, '12345678', 'Wahyu Saputra', '08912312312', 'Malang', 'S1', ''),
(8, '9081231', 'Dosen Hukum A', '089623993782', 'Sengkalin', 'S1', ''),
(9, '12345678910', 'Ali S.', '089623993782', 'Jalan', 'S1', ''),
(10, '12312414345', 'Basuki Prasetyo', '089623993782', 'Basuki Prasetyo', 'S2', ''),
(11, '12312432454', 'Lailatul Husniha', '089623993782', '089623993782', 'S2', ''),
(12, '89887979878', 'Yuda Munarko', '089623993782', '089623993782', 'S2', ''),
(13, '1231238127', 'Dosen Hukum B', '123123', 'asdasdas', 'S2', '');

-- --------------------------------------------------------

--
-- Struktur dari tabel `teacher_classes`
--

CREATE TABLE IF NOT EXISTS `teacher_classes` (
`seq` int(11) NOT NULL,
  `teacher_seq` int(11) NOT NULL,
  `class_seq` int(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=144 DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `teacher_classes`
--

INSERT INTO `teacher_classes` (`seq`, `teacher_seq`, `class_seq`) VALUES
(96, 1, 141),
(97, 1, 142),
(98, 6, 143),
(99, 6, 144),
(100, 1, 148),
(101, 8, 151),
(102, 8, 152),
(103, 1, 145),
(104, 7, 149),
(105, 7, 150),
(106, 1, 170),
(107, 1, 171),
(108, 1, 172),
(109, 12, 160),
(110, 12, 161),
(111, 10, 162),
(112, 9, 165),
(113, 9, 166),
(114, 9, 167),
(115, 9, 168),
(116, 9, 169),
(117, 11, 157),
(118, 11, 158),
(119, 11, 159),
(120, 12, 154),
(121, 12, 155),
(122, 12, 156),
(123, 12, 163),
(124, 12, 164),
(125, 6, 173),
(126, 6, 174),
(127, 7, 147),
(128, 7, 146),
(129, 8, 176),
(130, 8, 175),
(131, 8, 177),
(132, 8, 178),
(133, 13, 179),
(134, 13, 180),
(135, 13, 181),
(136, 13, 182),
(137, 13, 183),
(138, 13, 184),
(139, 13, 185),
(140, 13, 186),
(141, 13, 187),
(142, 13, 188),
(143, 13, 153);

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE IF NOT EXISTS `user` (
`seq` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`seq`, `username`, `password`) VALUES
(1, 'admin', '21232f297a57a5a743894a0e4a801fc3');

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
 ADD PRIMARY KEY (`seq`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
 ADD PRIMARY KEY (`seq`);

--
-- Indexes for table `day`
--
ALTER TABLE `day`
 ADD PRIMARY KEY (`seq`);

--
-- Indexes for table `day_hour`
--
ALTER TABLE `day_hour`
 ADD PRIMARY KEY (`seq`);

--
-- Indexes for table `faculty`
--
ALTER TABLE `faculty`
 ADD PRIMARY KEY (`seq`);

--
-- Indexes for table `hour`
--
ALTER TABLE `hour`
 ADD PRIMARY KEY (`seq`);

--
-- Indexes for table `major`
--
ALTER TABLE `major`
 ADD PRIMARY KEY (`seq`);

--
-- Indexes for table `room`
--
ALTER TABLE `room`
 ADD PRIMARY KEY (`seq`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
 ADD PRIMARY KEY (`seq`);

--
-- Indexes for table `schedule_tmp`
--
ALTER TABLE `schedule_tmp`
 ADD PRIMARY KEY (`seq`);

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
 ADD PRIMARY KEY (`seq`);

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
MODIFY `seq` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=34;
--
-- AUTO_INCREMENT for table `class`
--
ALTER TABLE `class`
MODIFY `seq` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=189;
--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
MODIFY `seq` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT for table `day`
--
ALTER TABLE `day`
MODIFY `seq` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `day_hour`
--
ALTER TABLE `day_hour`
MODIFY `seq` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=123;
--
-- AUTO_INCREMENT for table `faculty`
--
ALTER TABLE `faculty`
MODIFY `seq` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `hour`
--
ALTER TABLE `hour`
MODIFY `seq` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=31;
--
-- AUTO_INCREMENT for table `major`
--
ALTER TABLE `major`
MODIFY `seq` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `room`
--
ALTER TABLE `room`
MODIFY `seq` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
MODIFY `seq` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=369;
--
-- AUTO_INCREMENT for table `schedule_tmp`
--
ALTER TABLE `schedule_tmp`
MODIFY `seq` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `semester`
--
ALTER TABLE `semester`
MODIFY `seq` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `teacher`
--
ALTER TABLE `teacher`
MODIFY `seq` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `teacher_classes`
--
ALTER TABLE `teacher_classes`
MODIFY `seq` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=144;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
MODIFY `seq` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
