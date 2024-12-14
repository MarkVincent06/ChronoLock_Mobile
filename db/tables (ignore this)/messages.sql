-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 11, 2024 at 10:04 AM
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
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `isSeen` tinyint(1) NOT NULL DEFAULT 0,
  `isSystem` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `group_id`, `user_id`, `text`, `created_at`, `isSeen`, `isSystem`) VALUES
(70, 28, 'C21102324', 'Welcome to Mark\'s First Group! This group is now active. Feel free to start discussions and collaborate with others.', '2024-12-01 14:14:01', 1, 1),
(71, 29, 'C21102324', 'Welcome to KLym! This group is now active. Feel free to start discussions and collaborate with others.', '2024-12-01 15:02:54', 1, 1),
(72, 29, 'C21102324', 'Group name changed to \"BSIT 4F - Capstone Project 2\".', '2024-12-02 05:53:32', 1, 1),
(73, 29, 'C21102324', 'Group name changed to \"BSIT 4F - System Administration and Maintenance\".', '2024-12-02 05:54:22', 1, 1),
(74, 30, 'C21101162', 'Welcome to Lyme\'s Group! This group is now active. Feel free to start discussions and collaborate with others.', '2024-12-02 13:49:47', 1, 1),
(75, 31, 'C21101162', 'Welcome to BSIT 4C - CAPSTONE PROJ 2! This group is now active. Feel free to start discussions and collaborate with others.', '2024-12-02 15:04:43', 1, 1),
(76, 31, 'C21102351', 'okau', '2024-12-09 08:28:27', 1, 0),
(77, 31, 'C21102351', 'what', '2024-12-09 08:28:36', 1, 0),
(78, 31, 'C21102351', 'test', '2024-12-09 08:38:01', 1, 0),
(79, 31, 'C21102351', 'hi', '2024-12-09 08:42:30', 1, 0),
(80, 30, 'C21101162', 'o', '2024-12-09 09:25:19', 1, 0),
(81, 30, 'C21102351', 'hi', '2024-12-09 13:00:05', 1, 0),
(82, 30, 'C21102351', 'jufubvhinbhiknnnkkii', '2024-12-09 13:24:52', 1, 0),
(83, 30, 'C21102351', 'eyow', '2024-12-09 13:28:17', 1, 0),
(84, 30, 'C21102351', 'haha', '2024-12-09 13:28:24', 1, 0),
(85, 29, 'C21102324', 'test', '2024-12-09 13:28:50', 1, 0),
(86, 28, 'C21102324', 'eyow', '2024-12-09 13:28:55', 1, 0),
(87, 28, 'C21102324', 'Group avatar updated.', '2024-12-09 13:29:24', 1, 1),
(88, 28, 'C21102324', 'haha', '2024-12-09 13:29:34', 1, 0),
(89, 30, 'C21101162', 'gago ka', '2024-12-09 13:30:45', 1, 0),
(90, 28, 'C21101162', 'Lyme Lavarias has joined the group Mark\'s First Group. Welcome!', '2024-12-09 13:38:32', 1, 1),
(91, 28, 'C21101162', 'hello there', '2024-12-09 13:38:40', 1, 0),
(92, 30, 'C21102351', 'haha', '2024-12-09 14:54:36', 1, 0),
(93, 30, 'C21102351', 'lol', '2024-12-09 14:56:38', 1, 0),
(94, 28, 'C21102324', 'ey', '2024-12-10 11:20:03', 1, 0);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `fk_messages_group_id` FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
