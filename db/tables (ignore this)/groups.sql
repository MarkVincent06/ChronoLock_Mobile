-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 23, 2024 at 06:19 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chronolock`
--

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `group_id` int(11) NOT NULL,
  `group_name` varchar(255) NOT NULL,
  `group_key` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `avatar` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`group_id`, `group_name`, `group_key`, `created_at`, `avatar`) VALUES
(1, 'BSIT3F', 'nugwdilfbewljfbw', '2024-11-21 17:03:13', 'https://cdn-icons-png.freepik.com/512/10017/10017806.png'),
(2, 'BSIT3C', 'bsit3c', '2024-11-22 06:05:09', 'https://cdn-icons-png.freepik.com/512/10017/10017806.png'),
(3, 'BSOT4C', 'nsdafbw', '2024-11-22 16:06:16', NULL),
(4, 'BSIT5C', 'bsit5c', '2024-11-23 03:40:19', '/uploads/1732333218747-462752303.jpg'),
(5, 'jjj', 'jjhhh', '2024-11-23 04:12:07', NULL),
(6, 'rusuf', 'jfkf', '2024-11-23 04:16:04', '/uploads/1732335364716-469083880.jpeg'),
(7, 'vhhc', 'ggiufx', '2024-11-23 04:18:01', '/uploads/1732335481281-462847843.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`group_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `group_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
