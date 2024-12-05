-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 24, 2024 at 09:27 AM
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
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `user_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `group_id`, `user_id`, `text`, `created_at`) VALUES
(1, 1, 'C21102324', 'hello', '2024-11-21 09:10:22'),
(2, 1, 'C21102324', 'asjfbsaasd', '2024-11-21 09:12:36'),
(3, 1, 'C21102324', 'ho', '2024-11-21 09:28:20'),
(4, 1, 'Y9QCqtQgrPUyUUZS1MxSYgnOEjI3', 'hahaha', '2024-11-21 18:18:50'),
(5, 1, 'Y9QCqtQgrPUyUUZS1MxSYgnOEjI3', 'gumagana na yey', '2024-11-21 18:33:56'),
(6, 1, '100', 'hi', '2024-11-22 00:20:36'),
(7, 1, 'C21102324', 'hey', '2024-11-22 00:22:14'),
(8, 1, 'C21101162', 'Hiii', '2024-11-22 07:14:52'),
(9, 1, 'C21102324', 'fgfr.', '2024-11-22 07:14:59'),
(10, 1, 'C21101162', 'He', '2024-11-22 07:15:02'),
(11, 1, 'C21101162', '3gwgw', '2024-11-22 07:15:44'),
(12, 1, 'C21101162', 'Kahit ano', '2024-11-22 07:24:00'),
(13, 1, 'C21102324', 'okay na yan', '2024-11-22 07:24:14'),
(14, 2, 'C21101162', 'H', '2024-11-22 07:46:59'),
(15, 1, 'C21102324', 'hello', '2024-11-23 06:22:49'),
(16, 4, 'C21102324', 'hi', '2024-11-23 06:24:03');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `group_id` (`group_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
