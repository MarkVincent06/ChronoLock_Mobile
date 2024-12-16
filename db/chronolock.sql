-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 12, 2024 at 04:36 AM
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
-- Table structure for table `attendances`
--

CREATE TABLE `attendances` (
  `attendanceID` bigint(20) UNSIGNED NOT NULL,
  `userID` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `classID` bigint(20) UNSIGNED DEFAULT NULL,
  `date` date NOT NULL,
  `time` time DEFAULT NULL,
  `remark` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `attendances`
--

INSERT INTO `attendances` (`attendanceID`, `userID`, `classID`, `date`, `time`, `remark`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, NULL, NULL, '2024-09-10', '17:39:17', 'Late', NULL, NULL, NULL),
(2, NULL, NULL, '2024-09-10', '17:39:39', 'Late', NULL, NULL, NULL),
(3, NULL, NULL, '2024-09-10', '17:41:19', 'Late', NULL, NULL, NULL),
(4, NULL, NULL, '2024-09-10', '17:42:42', 'Late', NULL, NULL, NULL),
(5, NULL, NULL, '2024-09-10', '17:42:49', 'Late', NULL, NULL, NULL),
(6, NULL, NULL, '2024-09-10', '17:48:25', 'Late', NULL, NULL, NULL),
(7, NULL, NULL, '2024-09-10', '17:50:44', 'Late', NULL, NULL, NULL),
(8, NULL, NULL, '2024-09-10', '17:55:59', 'Late', NULL, NULL, NULL),
(9, NULL, NULL, '2024-09-10', '17:56:21', 'Late', NULL, NULL, NULL),
(10, 'C21101044', NULL, '2024-09-10', '17:56:45', 'Late', NULL, NULL, NULL),
(11, '221007264', NULL, '2024-09-10', '17:57:11', 'Late', NULL, NULL, NULL),
(13, '221007722', NULL, '2024-09-12', NULL, 'Absent', NULL, NULL, NULL),
(14, NULL, NULL, '2024-09-12', NULL, 'Absent', NULL, NULL, NULL),
(15, NULL, NULL, '2024-09-12', NULL, 'Absent', NULL, NULL, NULL),
(16, 'C20100603', NULL, '2024-09-12', NULL, 'Absent', NULL, NULL, NULL),
(17, NULL, NULL, '2024-09-12', NULL, 'Absent', NULL, NULL, NULL),
(18, NULL, NULL, '2024-09-12', NULL, 'Absent', NULL, NULL, NULL),
(19, '221007264', NULL, '2024-09-12', NULL, 'Absent', NULL, NULL, NULL),
(20, '221006666', NULL, '2024-09-12', NULL, 'Absent', NULL, NULL, NULL),
(21, NULL, NULL, '2024-09-12', NULL, 'Absent', NULL, NULL, NULL),
(22, NULL, NULL, '2024-09-12', NULL, 'Absent', NULL, NULL, NULL),
(23, NULL, NULL, '2024-09-12', NULL, 'Absent', NULL, NULL, NULL),
(24, 'C21101044', NULL, '2024-09-12', NULL, 'Absent', NULL, NULL, NULL),
(25, '221007491', NULL, '2024-09-12', NULL, 'Absent', NULL, NULL, NULL),
(26, NULL, NULL, '2024-09-12', NULL, 'Absent', NULL, NULL, NULL),
(27, NULL, NULL, '2024-09-12', NULL, 'Absent', NULL, NULL, NULL),
(34, NULL, NULL, '2024-09-12', '13:54:55', 'Late', NULL, NULL, NULL),
(35, 'C40', NULL, '2024-09-13', '14:23:14', 'Late', NULL, NULL, NULL),
(36, NULL, NULL, '2024-09-20', '10:32:24', 'Present', NULL, NULL, NULL),
(41, 'CFACULTY', NULL, '2024-09-23', '12:03:51', 'Present', NULL, NULL, NULL),
(42, 'C21105789', NULL, '2024-09-23', '12:04:05', 'Present', NULL, NULL, NULL),
(43, 'CFACULTY', NULL, '2024-09-24', '14:51:31', 'Present', NULL, NULL, NULL),
(44, 'C21105789', NULL, '2024-09-24', NULL, 'Absent', NULL, NULL, NULL),
(51, 'CFACULTY', NULL, '2024-09-25', '15:00:00', 'Absent', NULL, NULL, '2024-09-25 07:19:51'),
(52, 'CFACULTY', NULL, '2024-09-25', '15:00:00', 'Late', NULL, NULL, NULL),
(53, 'C21105789', NULL, '2024-09-26', '15:26:26', 'Present', NULL, NULL, NULL),
(54, '2022010010', 6, '2024-09-27', '09:25:31', 'Present', NULL, NULL, NULL),
(55, '2411462', 6, '2024-09-27', '09:25:49', 'Present', NULL, NULL, NULL),
(56, '2411503', 6, '2024-09-27', '09:26:06', 'Present', NULL, NULL, NULL),
(57, '2411519', 6, '2024-09-27', '09:29:01', 'Present', NULL, NULL, NULL),
(58, '2411420', 6, '2024-09-27', '09:29:28', 'Present', NULL, NULL, NULL),
(59, '2411524', 6, '2024-09-27', '09:30:32', 'Present', NULL, NULL, NULL),
(60, '2411300', 6, '2024-09-27', '09:34:41', 'Present', NULL, NULL, NULL),
(61, '2411311', 6, '2024-09-27', '09:35:22', 'Present', NULL, NULL, NULL),
(62, '2411313', 6, '2024-09-27', '09:37:32', 'Present', NULL, NULL, NULL),
(63, '2411426', 6, '2024-09-27', '09:41:26', 'Present', NULL, NULL, '2024-09-27 04:34:49'),
(64, '2411373', 6, '2024-09-27', '09:42:26', 'Present', NULL, NULL, '2024-09-27 04:34:59'),
(65, '2411422', 6, '2024-09-27', '09:43:51', 'Present', NULL, NULL, '2024-09-27 04:35:46'),
(66, '2411412', 6, '2024-09-27', '09:45:44', 'Present', NULL, NULL, '2024-09-27 04:35:59'),
(67, '2411361', 6, '2024-09-27', '09:46:12', 'Present', NULL, NULL, '2024-09-27 04:36:10'),
(68, '2412841', 6, '2024-09-27', '09:47:02', 'Present', NULL, NULL, '2024-09-27 04:36:22'),
(69, '2411027', 6, '2024-09-27', '09:49:06', 'Present', NULL, NULL, '2024-09-27 04:36:36'),
(70, '2411298', 6, '2024-09-27', '09:49:41', 'Present', NULL, NULL, '2024-09-27 04:36:48'),
(71, '2411410', 6, '2024-09-27', '09:51:51', 'Present', NULL, NULL, '2024-09-27 04:37:38'),
(72, '2412829', 6, '2024-09-27', '09:52:13', 'Present', NULL, NULL, '2024-09-27 04:37:29'),
(73, '2411317', 6, '2024-09-27', '09:52:31', 'Present', NULL, NULL, '2024-09-27 04:37:19'),
(74, '2411416', 6, '2024-09-27', '09:55:17', 'Present', NULL, NULL, '2024-09-27 04:37:08'),
(75, '2411418', 6, '2024-09-27', '09:56:18', 'Present', NULL, NULL, '2024-09-27 04:36:58'),
(76, '2411309', 6, '2024-09-27', '09:56:34', 'Present', NULL, NULL, '2024-09-27 04:35:17'),
(77, '2411411', 6, '2024-09-27', '09:56:42', 'Present', NULL, NULL, '2024-09-27 04:34:34'),
(78, '2412831', 6, '2024-09-27', '09:57:10', 'Present', NULL, NULL, '2024-09-27 04:33:46'),
(79, '2413001', 6, '2024-09-27', '09:58:27', 'Present', NULL, NULL, '2024-09-27 04:33:29'),
(80, '2411531', 6, '2024-09-27', '09:58:34', 'Present', NULL, NULL, '2024-09-27 04:33:16'),
(81, '2411413', 6, '2024-09-27', '10:04:13', 'Present', NULL, NULL, '2024-09-27 04:32:57'),
(82, '2411295', 6, '2024-09-27', '10:04:26', 'Present', NULL, NULL, '2024-09-27 04:32:40'),
(83, '2411315', 6, '2024-09-27', '10:04:56', 'Present', NULL, NULL, '2024-09-27 04:32:49'),
(84, '2411492', 6, '2024-09-27', '10:05:52', 'Present', NULL, NULL, '2024-09-27 04:32:26'),
(85, '2411299', 6, '2024-09-27', '10:07:43', 'Present', NULL, NULL, '2024-09-27 04:32:18'),
(86, '2411421', 6, '2024-09-27', '10:10:05', 'Present', NULL, NULL, '2024-09-27 04:32:09'),
(87, '2411476', 6, '2024-09-27', '10:11:05', 'Present', NULL, NULL, '2024-09-27 04:32:02'),
(88, '2411484', 6, '2024-09-27', '10:12:03', 'Present', NULL, NULL, '2024-09-27 04:31:54'),
(89, '2411310', 6, '2024-09-27', '10:12:50', 'Present', NULL, NULL, '2024-09-27 04:31:39'),
(90, '2411312', 6, '2024-09-27', '10:13:54', 'Present', NULL, NULL, '2024-09-27 04:31:32');

-- --------------------------------------------------------

--
-- Table structure for table `class_lists`
--

CREATE TABLE `class_lists` (
  `classID` bigint(20) UNSIGNED NOT NULL,
  `scheduleID` bigint(20) UNSIGNED NOT NULL,
  `semester` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `enrollmentKey` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `class_lists`
--

INSERT INTO `class_lists` (`classID`, `scheduleID`, `semester`, `enrollmentKey`, `created_at`, `updated_at`) VALUES
(6, 34, '1st Semester', '12345', '2024-09-27 01:10:43', '2024-09-27 01:10:43'),
(7, 25, '1st Semester', '12345', NULL, NULL),
(8, 28, '1st Semester', '12345', NULL, NULL),
(9, 8, '1st Semester', '12345', NULL, NULL),
(10, 24, '1st Semester', '12345', NULL, NULL),
(11, 37, '1st Semester', '12345', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `group_id` int(11) NOT NULL,
  `group_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `group_key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`group_id`, `group_name`, `group_key`, `created_at`, `avatar`) VALUES
(28, 'Mark\'s First Group', 'mark', '2024-12-01 14:14:01', '/uploads/1733750964396-450506877.png'),
(29, 'BSIT 4F - System Administration and Maintenance', 'bsit4f', '2024-12-01 15:02:54', '/uploads/1733065374319-73334341.jpeg'),
(30, 'Lyme\'s Group', 'lyme', '2024-12-02 13:49:46', '/uploads/1733147386231-713793891.jpeg'),
(31, 'BSIT 4C - CAPSTONE PROJ 2', 'bsit4c', '2024-12-02 15:04:43', '/uploads/1733151883706-352579648.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `group_members`
--

CREATE TABLE `group_members` (
  `id` int(11) NOT NULL,
  `idNumber` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `group_members`
--

INSERT INTO `group_members` (`id`, `idNumber`, `group_id`, `created_at`) VALUES
(9, 'C21102324', 28, '2024-12-01 14:14:01'),
(10, 'C21102324', 29, '2024-12-01 15:02:54'),
(13, 'C21101162', 30, '2024-12-02 13:49:46'),
(14, 'C21101162', 31, '2024-12-02 15:04:43'),
(15, 'C21102351', 31, '2024-12-03 03:57:48'),
(16, 'C21102351', 30, '2024-12-03 03:59:19'),
(17, 'C21101162', 28, '2024-12-09 13:38:32');

-- --------------------------------------------------------

--
-- Table structure for table `labs`
--

CREATE TABLE `labs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `labName` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `location` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `capacity` int(11) DEFAULT NULL,
  `status` enum('Available','Under Maintenance','Closed') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Available',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `labs`
--

INSERT INTO `labs` (`id`, `labName`, `location`, `description`, `capacity`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'ERP Laboratory', 'Building A, Room 101', NULL, 30, 'Available', '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL),
(2, 'Computer Lab 1', 'Building B, Room 201', NULL, 40, 'Available', '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL),
(3, 'IoT Lab', 'Building C, Room 302', NULL, 25, 'Under Maintenance', '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL),
(4, 'AI Research Lab', 'Building D, Room 403', NULL, 20, 'Available', '2024-01-01 00:00:00', '2024-01-01 00:00:00', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `lab_occupancy_logs`
--

CREATE TABLE `lab_occupancy_logs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `lab_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `occupancy_date` date NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time DEFAULT NULL,
  `remarks` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `lab_occupancy_logs`
--

INSERT INTO `lab_occupancy_logs` (`id`, `lab_id`, `user_id`, `occupancy_date`, `start_time`, `end_time`, `remarks`, `created_at`, `updated_at`) VALUES
(1, 1, 10, '2024-12-10', '08:00:00', '10:00:00', NULL, '2024-12-10 00:00:00', '2024-12-10 02:00:00'),
(2, 2, 16, '2024-12-10', '09:00:00', NULL, NULL, '2024-12-10 01:00:00', NULL),
(3, 1, 18, '2024-12-10', '10:30:00', '11:30:00', NULL, '2024-12-10 02:30:00', '2024-12-10 03:30:00'),
(4, 3, 19, '2024-12-10', '13:00:00', NULL, NULL, '2024-12-10 05:00:00', NULL),
(5, 3, 62, '2024-12-11', '08:00:00', '10:00:00', 'Lab session for data structures', '2024-12-11 00:00:00', '2024-12-11 02:00:00'),
(6, 1, 63, '2024-12-11', '09:30:00', '11:00:00', 'Physics lab experiment', '2024-12-11 01:30:00', '2024-12-11 03:00:00'),
(7, 1, 64, '2024-12-11', '10:00:00', '12:00:00', 'Project work for computer science class', '2024-12-11 02:00:00', '2024-12-11 04:00:00'),
(8, 1, 65, '2024-12-11', '11:00:00', '13:00:00', 'Study session for final exams', '2024-12-11 03:00:00', '2024-12-11 05:00:00'),
(9, 4, 66, '2024-12-11', '12:00:00', '14:00:00', 'Group project for engineering course', '2024-12-11 04:00:00', '2024-12-11 06:00:00'),
(10, 3, 68, '2024-12-11', '13:30:00', '15:00:00', 'Software development class work', '2024-12-11 05:30:00', '2024-12-11 07:00:00'),
(11, 2, 69, '2024-12-11', '14:00:00', '16:00:00', 'Research project work', '2024-12-11 06:00:00', '2024-12-11 08:00:00'),
(12, 1, 70, '2024-12-11', '15:00:00', '17:00:00', 'Testing lab environment for app development', '2024-12-11 07:00:00', '2024-12-11 09:00:00'),
(13, 1, 71, '2024-12-11', '16:00:00', '18:00:00', 'Debate preparation session', '2024-12-11 08:00:00', '2024-12-11 10:00:00'),
(14, 4, 72, '2024-12-11', '17:30:00', '19:00:00', 'Final review for assignment submission', '2024-12-11 09:30:00', '2024-12-11 11:00:00');

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

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '2024_06_21_114742_create_schedules_table', 1),
(3, '2024_06_22_052729_create_class_lists_table', 1),
(4, '2024_06_22_052730_create_attendances_table', 1),
(5, '2024_06_23_114935_create_student_masterlists_table', 1),
(6, '2024_06_28_152207_create_user_logs_table', 1),
(7, '2024_07_30_035535_create_rfid_temps_table', 1),
(8, '2024_08_01_080258_create_rfid_accounts_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rfid_accounts`
--

CREATE TABLE `rfid_accounts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `RFID_Code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `RFID_Status` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `rfid_accounts`
--

INSERT INTO `rfid_accounts` (`id`, `RFID_Code`, `RFID_Status`, `created_at`, `updated_at`) VALUES
(2, '213934869617', 'Activated', '2024-09-11 01:28:52', '2024-09-11 01:28:52'),
(11, '809666537274', 'Activated', '2024-09-11 01:58:56', '2024-09-11 01:58:56'),
(14, '265899879200', 'Activated', '2024-09-11 02:00:03', '2024-09-11 02:00:03'),
(15, '258547443529', 'Activated', '2024-09-11 01:57:27', '2024-09-11 01:57:27'),
(16, '112450009158', 'Activated', '2024-09-12 05:34:35', '2024-09-12 05:34:35'),
(20, '288916497440', 'Activated', '2024-09-23 02:44:29', '2024-09-23 02:44:29'),
(21, '807582885868', 'Activated', '2024-09-23 02:48:29', '2024-09-23 02:48:29'),
(22, '872095384234', 'Activated', '2024-09-25 06:16:45', '2024-09-25 06:16:45'),
(23, '872516780642', 'Deactivated', '2024-09-25 06:39:03', '2024-09-25 07:21:36'),
(24, '943462056523', 'Activated', '2024-09-27 01:15:34', '2024-09-27 01:15:34'),
(25, '873971811058', 'Activated', '2024-09-27 01:19:01', '2024-09-27 01:19:01'),
(26, '874212721377', 'Activated', '2024-09-27 01:26:10', '2024-09-27 01:26:10'),
(27, '871884554775', 'Activated', '2024-09-27 01:29:25', '2024-09-27 01:29:25'),
(28, '886257833941', 'Activated', '2024-09-27 01:30:00', '2024-09-27 01:30:00'),
(29, '871914046059', 'Activated', '2024-09-27 01:30:53', '2024-09-27 01:30:53'),
(30, '874319610458', 'Activated', '2024-09-27 01:33:28', '2024-09-27 01:33:28'),
(31, '942681129481', 'Activated', '2024-09-27 01:35:06', '2024-09-27 01:35:06'),
(32, '872652178040', 'Activated', '2024-09-27 01:37:07', '2024-09-27 01:37:07'),
(34, '942359806517', 'Activated', '2024-09-27 01:40:44', '2024-09-27 01:40:44'),
(35, '956798883557', 'Activated', '2024-09-27 01:41:30', '2024-09-27 01:41:30'),
(36, '942684930627', 'Activated', '2024-09-27 01:44:31', '2024-09-27 01:44:31'),
(37, '942611857962', 'Activated', '2024-09-27 01:45:13', '2024-09-27 01:45:13'),
(38, '874907992681', 'Activated', '2024-09-27 01:45:59', '2024-09-27 01:45:59'),
(39, '872808219154', 'Activated', '2024-09-27 01:47:21', '2024-09-27 01:47:21'),
(40, '751281526477', 'Activated', '2024-09-27 01:48:07', '2024-09-27 01:48:07'),
(41, '955059886297', 'Activated', '2024-09-27 01:50:20', '2024-09-27 01:50:20'),
(42, '874060219079', 'Activated', '2024-09-27 01:50:53', '2024-09-27 01:50:53'),
(43, '872742879997', 'Activated', '2024-09-27 01:52:24', '2024-09-27 01:52:24'),
(44, '942038942441', 'Activated', '2024-09-27 01:53:07', '2024-09-27 01:53:07'),
(45, '874524148327', 'Activated', '2024-09-27 01:53:44', '2024-09-27 01:53:44'),
(46, '942586954400', 'Activated', '2024-09-27 01:55:57', '2024-09-27 01:55:57'),
(47, '943238513313', 'Activated', '2024-09-27 01:56:23', '2024-09-27 01:56:23'),
(48, '266741045372', 'Activated', '2024-09-27 01:57:16', '2024-09-27 01:57:16'),
(49, '942355415795', 'Activated', '2024-09-27 01:57:32', '2024-09-27 01:57:32'),
(50, '874555146842', 'Activated', '2024-09-27 01:58:27', '2024-09-27 01:58:27'),
(51, '130474202870', 'Activated', '2024-09-27 01:59:08', '2024-09-27 01:59:08'),
(52, '873077375609', 'Activated', '2024-09-27 02:00:40', '2024-09-27 02:00:40'),
(53, '941613810411', 'Activated', '2024-09-27 02:01:58', '2024-09-27 02:01:58'),
(54, '872977629837', 'Activated', '2024-09-27 02:03:54', '2024-09-27 02:03:54'),
(55, '942679622192', 'Activated', '2024-09-27 02:05:26', '2024-09-27 02:05:26'),
(56, '872521957939', 'Activated', '2024-09-27 02:06:14', '2024-09-27 02:06:14'),
(57, '941282591393', 'Activated', '2024-09-27 02:06:58', '2024-09-27 02:06:58'),
(58, '942613430786', 'Activated', '2024-09-27 02:08:22', '2024-09-27 02:08:22'),
(59, '942276641325', 'Activated', '2024-09-27 02:11:39', '2024-09-27 02:11:39'),
(60, '807381795446', 'Activated', '2024-09-27 02:12:22', '2024-09-27 02:12:22'),
(61, '872237138494', 'Activated', '2024-09-27 02:12:31', '2024-09-27 02:12:31'),
(62, '131718404069', 'Activated', '2024-09-27 02:14:32', '2024-09-27 02:14:32');

-- --------------------------------------------------------

--
-- Table structure for table `rfid_temps`
--

CREATE TABLE `rfid_temps` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `RFID_Code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `rfid_temps`
--

INSERT INTO `rfid_temps` (`id`, `RFID_Code`, `created_at`, `updated_at`) VALUES
(4, '263222668307', NULL, NULL),
(20, '879658329948', NULL, NULL),
(21, '882361772874', NULL, NULL),
(22, '810149406545', NULL, NULL),
(23, '1020396734611', NULL, NULL),
(25, '213934869617', NULL, NULL),
(26, '606971440290', NULL, NULL),
(33, '494587143168', NULL, NULL),
(34, '1018922740605', NULL, NULL),
(36, '957370226393', NULL, NULL),
(38, '952906034316', NULL, NULL),
(39, '194424155344', NULL, NULL),
(40, '401423936443', NULL, NULL),
(54, '942881800947', NULL, NULL),
(55, '941318898313', NULL, NULL),
(82, '472880142075', NULL, NULL),
(83, '195335105437', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `schedules`
--

CREATE TABLE `schedules` (
  `scheduleID` bigint(20) UNSIGNED NOT NULL,
  `courseCode` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `courseName` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `userID` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `instFirstName` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `instLastName` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `program` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `section` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `year` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `startTime` time DEFAULT NULL,
  `endTime` time DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `day` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `scheduleStatus` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `scheduleTitle` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `scheduleType` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `schedules`
--

INSERT INTO `schedules` (`scheduleID`, `courseCode`, `courseName`, `userID`, `instFirstName`, `instLastName`, `program`, `section`, `year`, `startTime`, `endTime`, `startDate`, `endDate`, `day`, `scheduleStatus`, `scheduleTitle`, `scheduleType`, `created_at`, `updated_at`) VALUES
(8, 'CCIS 104', 'Data Structures & Algorithms', 'Inst1', 'Mac', 'Dancalan', 'BSIS', 'B', '2', '07:00:00', '10:00:00', '2024-08-12', '2024-12-16', '1', 'unscheduled', NULL, 'regularSchedule', '2024-09-25 02:27:28', '2024-09-29 16:12:09'),
(10, 'IS 317', 'Database Architecture', 'Inst5', 'Jeremy Jireh', 'Neo', 'BSIS', 'A', '3', '10:00:00', '13:00:00', '2024-08-12', '2024-12-16', '1', 'unscheduled', NULL, 'regularSchedule', '2024-09-25 02:31:50', '2024-09-29 16:09:30'),
(11, 'CCS 105', 'Information Management 1', 'Inst8', 'Jonuel Rey', 'Colle', 'BSIS', 'B', '2', '13:00:00', '16:00:00', '2024-08-12', '2024-12-16', '1', 'unscheduled', NULL, 'regularSchedule', '2024-09-25 02:33:02', '2024-09-25 02:46:55'),
(12, 'ISEC 312', 'Distributed Database Management', 'Inst5', 'Jeremy Jireh', 'Neo', 'BSIS', 'B', '3', '16:00:00', '19:00:00', '2024-08-12', '2024-12-16', '1', 'unscheduled', NULL, 'regularSchedule', '2024-09-25 02:34:26', '2024-09-29 15:53:37'),
(13, 'IS 317', 'Database Architecture', 'Inst5', 'Jeremy Jireh', 'Neo', 'BSIS', 'B', '3', '10:00:00', '13:00:00', '2024-08-12', '2024-12-16', '2', 'unscheduled', NULL, 'regularSchedule', '2024-09-25 02:39:46', '2024-09-29 15:52:44'),
(14, 'CCS 105', 'Information Management 1', 'Inst8', 'Jonuel Rey', 'Colle', 'BSIS', 'C', '2', '13:00:00', '16:00:00', '2024-08-12', '2024-12-16', '2', 'unscheduled', NULL, 'regularSchedule', '2024-09-25 02:41:09', '2024-09-25 02:48:27'),
(15, 'ISA 317', 'Database Architecture', 'Inst5', 'Jeremy Jireh', 'Neo', 'BSIS', 'C', '3', '10:00:00', '13:00:00', '2024-08-12', '2024-12-16', '3', 'unscheduled', NULL, 'regularSchedule', '2024-09-25 02:42:01', '2024-09-29 16:10:23'),
(19, 'ISA 317', 'Business Process Programming', 'Inst6', 'Mae Ann', 'Tagum', 'BSIS', 'B', '3', '07:00:00', '10:00:00', '2024-08-12', '2024-12-16', '4', 'unscheduled', NULL, 'regularSchedule', '2024-09-25 03:00:21', '2024-09-29 15:56:13'),
(20, 'ISA 317', 'Business Process Programming', 'Inst6', 'Mae Ann', 'Tagum', 'BSIS', 'A', '3', '10:01:00', '13:00:00', '2024-08-12', '2024-12-16', '4', 'unscheduled', NULL, 'regularSchedule', '2024-09-25 03:01:03', '2024-09-29 15:56:34'),
(21, 'ISA 211', 'Business Process Outsourcing', 'Inst4', 'Marivic', 'Ramizares', 'BSIS', 'A', '2', '13:00:00', '16:00:00', '2024-08-12', '2024-12-16', '4', 'unscheduled', NULL, 'regularSchedule', '2024-09-25 03:02:27', '2024-09-25 03:02:27'),
(22, 'ISA 211', 'Business Process Outsourcing', 'Inst4', 'Marivic', 'Ramizares', 'BSIS', 'B', '1', '13:00:00', '16:00:00', '2024-08-12', '2024-12-16', '5', 'unscheduled', NULL, 'regularSchedule', '2024-09-25 03:03:21', '2024-09-29 16:01:41'),
(24, 'CCIS 104', 'Data Structures & Algorithms', 'Inst1', 'Mac', 'Dancalan', 'BSIS', 'C', '2', '10:00:00', '13:00:00', '2024-08-12', '2024-12-16', '5', 'unscheduled', NULL, 'regularSchedule', '2024-09-25 03:08:15', '2024-09-29 16:12:33'),
(25, 'CCIS 101', 'Introduction to Computing', '2022010010', 'Marivic', 'Ramizares', 'BSIS', 'B', '2', '07:00:00', '10:00:00', '2024-08-12', '2024-12-16', '5', 'unscheduled', NULL, 'regularSchedule', '2024-09-25 03:09:56', '2024-09-29 16:00:09'),
(26, 'ISA 211', 'Business Process Outsourcing', '2022010010', 'Marivic', 'Ramizares', 'BSIS', 'B', '1', '16:00:00', '19:00:00', '2024-08-12', '2024-12-16', '5', 'unscheduled', NULL, 'regularSchedule', '2024-09-25 03:12:10', '2024-09-29 15:59:32'),
(27, 'IS 214', 'IT Infrastracture & Network Technologies', 'Inst2', 'Ms.', 'Rhea', 'BSIS', 'C', '2', '10:00:00', '13:00:00', '2024-08-12', '2024-12-16', '6', 'unscheduled', NULL, 'regularSchedule', '2024-09-25 03:13:17', '2024-09-25 03:13:17'),
(28, 'CCIS 102', 'Computer Programming 1', 'Inst3', 'Cathyrine', 'Chua', 'BSIS', 'B', '1', '13:00:00', '16:00:00', '2024-08-12', '2024-12-16', '6', 'unscheduled', NULL, 'regularSchedule', '2024-09-25 03:14:58', '2024-09-25 03:14:58'),
(29, 'IS 214', 'IT Infrastracture & Network Technologies', 'Inst2', 'Ms.', 'Rhea', 'BSIS', 'B', '2', '16:00:00', '19:00:00', '2024-08-12', '2024-12-16', '6', 'unscheduled', NULL, 'regularSchedule', '2024-09-25 03:15:42', '2024-09-25 03:15:42'),
(30, 'IS 214', 'IT Infrastracture & Network Technologies', 'Inst7', 'Ms.', 'Vidal', 'BSIS', 'A', '2', '13:00:00', '16:00:00', '2024-08-12', '2024-12-16', '0', 'unscheduled', NULL, 'regularSchedule', '2024-09-25 03:16:26', '2024-09-25 03:16:26'),
(34, 'CCIS 101', 'Introduction to Computing', '2022010010', 'Marivic', 'Ramizares', 'BSIS', 'A', '1', '16:00:00', '19:00:00', '2024-08-12', '2024-12-16', '4', 'With Class', NULL, 'regularSchedule', '2024-09-27 01:09:13', '2024-09-29 15:57:28'),
(35, 'ISEC 312', 'Distributed Database Management', 'Inst5', 'Jeremy Jireh', 'Neo', 'BSIS', 'C', '3', '16:00:00', '19:00:00', '2024-08-12', '2024-12-16', '3', 'unscheduled', NULL, 'regularSchedule', '2024-09-29 15:54:54', '2024-09-29 15:54:54'),
(36, 'ISEC 312', 'Distributed Database  Management', 'Inst5', 'Jeremy Jireh', 'Neo', 'BSIS', 'B', '3', '16:00:00', '19:00:00', '2024-08-12', '2024-12-16', '2', 'unscheduled', NULL, 'regularSchedule', '2024-09-29 16:08:55', '2024-09-29 16:08:55'),
(37, 'CCS 104', 'Data Structures & Algorithms', 'Inst1', 'Mac', 'Dancalan', 'BSIS', 'A', '2', '13:00:00', '16:00:00', '2024-08-12', '2024-12-16', '3', 'unscheduled', NULL, 'regularSchedule', '2024-09-29 16:11:44', '2024-09-29 16:11:44');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('HRyFcAUdwBjKycYFTVqavYUlSS5wGj5YjnOuqxnF', 3, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36 Edg/129.0.0.0', 'YTo3OntzOjY6Il90b2tlbiI7czo0MDoiM3dnZjV5MGJicHhFb2Zib3hjRWw3SlgwSGE4WmFlR1RsWmFZdGRieCI7czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MztzOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czo0MDoiaHR0cDovLzEyNy4wLjAuMTo4MDAwL1JGSURNYW5hZ2VtZW50UGFnZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6MTY6ImF0dGVuZGFuY2VfcXVlcnkiO3M6MzcwOiJzZWxlY3QgYHVzZXJzYC4qLCBgY2xhc3NfbGlzdHNgLiosIGBhdHRlbmRhbmNlc2AuKiwgYHNjaGVkdWxlc2AuKiBmcm9tIGBhdHRlbmRhbmNlc2AgaW5uZXIgam9pbiBgdXNlcnNgIG9uIGBhdHRlbmRhbmNlc2AuYHVzZXJJRGAgPSBgdXNlcnNgLmBpZE51bWJlcmAgaW5uZXIgam9pbiBgY2xhc3NfbGlzdHNgIG9uIGBhdHRlbmRhbmNlc2AuYGNsYXNzSURgID0gYGNsYXNzX2xpc3RzYC5gY2xhc3NJRGAgaW5uZXIgam9pbiBgc2NoZWR1bGVzYCBvbiBgc2NoZWR1bGVzYC5gc2NoZWR1bGVJRGAgPSBgY2xhc3NfbGlzdHNgLmBzY2hlZHVsZUlEYCB3aGVyZSBgdXNlcnNgLmB1c2VyVHlwZWAgPSA/IG9yZGVyIGJ5IGBkYXRlYCBkZXNjLCBgdGltZWAgYXNjIjtzOjE5OiJhdHRlbmRhbmNlX2JpbmRpbmdzIjthOjE6e2k6MDtzOjc6IlN0dWRlbnQiO31zOjU6ImFsZXJ0IjthOjA6e319', 1727666480),
('pwxlCATm8uMQcH1C02gwyZU2r5dZd3Et8R9LOfmu', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36 Edg/129.0.0.0', 'YTo0OntzOjU6ImFsZXJ0IjthOjA6e31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im5ldyI7YTowOnt9czozOiJvbGQiO2E6MDp7fX1zOjY6Il90b2tlbiI7czo0MDoiR0QxU3RkbklGaEF4cmtMNllnNzJpQ1h4WjF0TXRXMFFIcGlyNnM4aiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjc6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9sb2dpbiI7fX0=', 1727675743),
('U1CyUeZcAmtLDf2Q8fNEDREwbMbQjlyPJJtUkHhw', 46, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36 Edg/129.0.0.0', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiMjhudThEUmptVkFvTDVoMlVGOEIyZFVaWjltQXowamJQRnlsTXRmayI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9zdHVkZW50LXZpZXctc2NoZWR1bGUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aTo0NjtzOjU6ImFsZXJ0IjthOjA6e319', 1727665008);

-- --------------------------------------------------------

--
-- Table structure for table `student_masterlists`
--

CREATE TABLE `student_masterlists` (
  `MIT_ID` bigint(20) UNSIGNED NOT NULL,
  `userID` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `classID` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `student_masterlists`
--

INSERT INTO `student_masterlists` (`MIT_ID`, `userID`, `status`, `classID`, `created_at`, `updated_at`) VALUES
(22, '2411462', 'Regular', 6, '2024-09-27 01:18:07', '2024-09-27 01:18:07'),
(23, '2411503', 'Regular', 6, '2024-09-27 01:20:42', '2024-09-27 01:20:42'),
(24, '2411309', 'Regular', 6, '2024-09-27 01:25:05', '2024-09-27 01:25:05'),
(25, '2411420', 'Regular', 6, '2024-09-27 01:27:48', '2024-09-27 01:27:48'),
(26, '2411519', 'Regular', 6, '2024-09-27 01:28:12', '2024-09-27 01:28:12'),
(27, '2411524', 'Regular', 6, '2024-09-27 01:30:13', '2024-09-27 01:30:13'),
(28, '2411300', 'Regular', 6, '2024-09-27 01:33:48', '2024-09-27 01:33:48'),
(29, '2411311', 'Regular', 6, '2024-09-27 01:35:13', '2024-09-27 01:35:13'),
(30, '2411422', 'Regular', 6, '2024-09-27 01:36:42', '2024-09-27 01:36:42'),
(31, '2411313', 'Regular', 6, '2024-09-27 01:37:51', '2024-09-27 01:37:51'),
(32, '2411426', 'Regular', 6, '2024-09-27 01:40:35', '2024-09-27 01:40:35'),
(33, '2411373', 'Regular', 6, '2024-09-27 01:43:02', '2024-09-27 01:43:02'),
(34, '2411361', 'Regular', 6, '2024-09-27 01:44:53', '2024-09-27 01:44:53'),
(35, '2411412', 'Regular', 6, '2024-09-27 01:46:16', '2024-09-27 01:46:16'),
(36, '2412841', 'Regular', 6, '2024-09-27 01:46:48', '2024-09-27 01:46:48'),
(37, '2411027', 'Regular', 6, '2024-09-27 01:49:14', '2024-09-27 01:49:14'),
(38, '2411298', 'Regular', 6, '2024-09-27 01:49:40', '2024-09-27 01:49:40'),
(39, '2412829', 'Regular', 6, '2024-09-27 01:51:13', '2024-09-27 01:51:13'),
(40, '2411317', 'Regular', 6, '2024-09-27 01:51:31', '2024-09-27 01:51:31'),
(41, '2411410', 'Regular', 6, '2024-09-27 01:51:41', '2024-09-27 01:51:41'),
(42, '2411416', 'Regular', 6, '2024-09-27 01:54:19', '2024-09-27 01:54:19'),
(43, '2411418', 'Regular', 6, '2024-09-27 01:55:35', '2024-09-27 01:55:35'),
(44, '2412831', 'Regular', 6, '2024-09-27 01:56:27', '2024-09-27 01:56:27'),
(45, '2411411', 'Regular', 6, '2024-09-27 01:56:37', '2024-09-27 01:56:37'),
(46, '2413001', 'Regular', 6, '2024-09-27 01:58:47', '2024-09-27 01:58:47'),
(47, '2411531', 'Regular', 6, '2024-09-27 01:59:07', '2024-09-27 01:59:07'),
(48, '2411295', 'Regular', 6, '2024-09-27 02:00:59', '2024-09-27 02:00:59'),
(49, '2411413', 'Regular', 6, '2024-09-27 02:01:35', '2024-09-27 02:01:35'),
(50, '2411315', 'Regular', 6, '2024-09-27 02:03:20', '2024-09-27 02:03:20'),
(51, '2411492', 'Regular', 6, '2024-09-27 02:05:10', '2024-09-27 02:05:10'),
(52, '2411406', 'Regular', 6, '2024-09-27 02:05:17', '2024-09-27 02:05:17'),
(53, '2411299', 'Regular', 6, '2024-09-27 02:07:58', '2024-09-27 02:07:58'),
(54, '2411421', 'Regular', 6, '2024-09-27 02:10:43', '2024-09-27 02:10:43'),
(55, '2411476', 'Regular', 6, '2024-09-27 02:11:15', '2024-09-27 02:11:15'),
(56, '2411484', 'Regular', 6, '2024-09-27 02:11:38', '2024-09-27 02:11:38'),
(57, '2411310', 'Regular', 6, '2024-09-27 02:13:25', '2024-09-27 02:13:25'),
(58, '2411312', 'Regular', 6, '2024-09-27 02:14:04', '2024-09-27 02:14:04'),
(59, 'C21105789', 'Regular', 6, '2024-09-30 00:25:31', '2024-09-30 00:25:31');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `accountName` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `firstName` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lastName` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `idNumber` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `userType` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `google_id` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `RFID_Code` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `accountName`, `firstName`, `lastName`, `email`, `idNumber`, `userType`, `password`, `avatar`, `google_id`, `RFID_Code`, `remember_token`, `created_at`, `updated_at`, `email_verified_at`, `deleted_at`) VALUES
(1, 'FERMIN JR. III TURIANO', 'Fermin', 'Turiano', 'ferturiano@my.cspc.edu.ph', 'C1', 'Admin', '$2y$12$KlgNwnezp7QM6kGXOP55NuxaEGlsVWcdddwrNL1N0fGT1wTxM9drK', 'https://lh3.googleusercontent.com/a/ACg8ocIt1Bpqlj2e6Fqbuntvxjr9sGtHRkopw7Fj22o7umEgZXsQGA=s96-c', '102845204394909389602', NULL, 'uEUvMieo11nKO6ri6lUWCHWPTSV2URX8pt3smlUtRQQXv4xuPMm0MWftUFuQ', '2024-09-11 00:19:22', '2024-09-11 00:26:56', NULL, NULL),
(2, 'Jomarc Nacario', 'Jomarc', 'Nacario', 'jomnacario@my.cspc.edu.ph', 'C2', 'Admin', '$2y$12$MQvqiywYq2YOmnYuhN8ssOTRM0wWXc.Hcqo8O7aiWjRGfFMVmvJKG', 'https://lh3.googleusercontent.com/a/ACg8ocKLo3NVbRnqGRa9vuBXFLsC3pTCGRVu09WwWxomv7w0NKXiMw=s96-c', '101716597637020763290', '112450009158', 'WZwPXYghp60X4NBQwN8pSrjb1nu7bH0j5GsOPQaBX6XrTptSBZ7y60nncAX9', '2024-09-11 00:21:13', '2024-09-12 05:34:35', NULL, NULL),
(3, 'Ralph Lorzano', 'Ralph', 'Lorzano', 'ralorzano@cspc.edu.ph', 'C30', 'Admin', NULL, 'https://lh3.googleusercontent.com/a/ACg8ocLyuzW7j9cvqYPRuSaiQf1bEWTno42fF3I801S1J0OlrBiqgw=s96-c', '103767011594715566021', '213934869617', '27TbJzBpEalvzPKU2mQJG8Z7EP9L674VNBmGZArnsyWGMH0S53xDwtkzZj06', '2024-09-11 00:21:50', '2024-09-30 01:59:09', NULL, NULL),
(10, NULL, 'Lance', 'Llagas', 'lallagas@my.cspc.edu.ph', '221007264', 'Student', NULL, NULL, NULL, '258547443529', 'maF6TYcxnxfizmvQ24MlAahQ9TRJn4Ea2dvUGjMyH0Innuf4tBINuQX4N63E', '2024-09-10 16:49:10', '2024-09-11 01:57:26', NULL, NULL),
(16, NULL, 'lemuel', 'luares', 'leluares@my.cspc.edu.ph', '221006666', 'Student', '$2y$12$nalWFkQ1RjQotfo5Z5gRn.4mL/Y97TTcTMeqgZIxGQSktFc7jcR0G', NULL, NULL, NULL, 'Z3oCeovl86AZD59MWcamyNcSyO0GJGtaom5siZIHgbeJXNV7AfgRmEwXFNLu', '2024-09-11 00:55:58', '2024-09-11 00:55:58', NULL, NULL),
(17, NULL, 'Jeremiah', 'Presnillo', 'jepresnillo@my.cspc.edu.ph', '221007491', 'Student', '$2y$12$3EuDVh98AkGwK4M8zI5D4O91f.ZOnbuJVNR6BQc3fZDQIF9oFTwWS', NULL, NULL, '809666537274', 'qbtwJo6eN723HvTgXrROli9iLrAVtgCI01FD3LPCb1T1SfIWzLs250g6OhKP', '2024-09-10 16:52:56', '2024-09-24 03:37:36', NULL, NULL),
(18, NULL, 'Mark Joseph', 'Beloro', 'marbeloro@my.cspc.edu.ph', 'C20100603', 'Student', '$2y$12$WFifbV0ay6b4IXZMt0The.Q6nSTLIPvrS0LvaxS3nXp1yy2vC.T9K', NULL, NULL, NULL, 'lMCE2M6ptmYYrAtuDnKJ7cl26arNn0TGJTDIL4ZMF1EEKk8zQkEbpyH8J15r', '2024-09-11 00:57:26', '2024-09-24 03:37:36', NULL, NULL),
(19, NULL, 'christian jay', 'baria', 'chbaria@my.cspc.edu.ph', '221007722', 'Student', '$2y$12$iGGzzj8F/8U3wQc0.YozgOimg0XCVW0HCkD6s4UhS4UWXL3utMPy2', NULL, NULL, NULL, 'TpsVei9Gfr2DXvi0VpJJApyQbyGffPO9UL3Brc3EOag8FS74DVSZEggKJYhK', '2024-09-11 00:54:53', '2024-09-24 03:37:36', NULL, NULL),
(20, NULL, 'Adrian', 'Saballero', 'adsaballero@my.cspc.edu.ph', 'C21101044', 'Student', '$2y$12$ScdqCEymKh4PB8yKpDbngusVEWnXG2JIOhl1Nirwn.tB5P7fFLOEu', NULL, NULL, '265899879200', 'nC7jaM1OeFHU7ktbY1phKnpIYci6Ws3Ynk2DPNlI49CGzo3Ok8P2BjMlMza6', '2024-09-10 16:55:13', '2024-09-24 03:37:36', NULL, NULL),
(22, NULL, 'Admin', 'Admin', 'ralph@cspc.edu.ph', 'C11', 'Admin', NULL, NULL, NULL, NULL, 'Nm4iSIdc4BsMNoqEc1I9tcu1bT37lkhJCu7s8WqCtAMgwhyHgNI7oA8IZu6E', '2024-09-12 17:44:02', '2024-09-13 13:06:08', NULL, NULL),
(25, NULL, 'Jo', 'Belly', 'jobell@my.cspc.edu.ph', 'C40', 'Student', '$2y$12$ePEnKfOrq7D.EF7xbB58zOT.GGQZlSohMPDUkq1QdsHttnO8oycJW', NULL, NULL, NULL, 'YiOts6d1DpXBuFogoYCPI1DrIbMf1WFfStXxHmrvUKL9txBZjFf40PxKhSvE', '2024-09-12 22:49:23', '2024-09-24 03:37:36', NULL, NULL),
(43, NULL, 'Klyntz Ytrx', 'Elevado', 'klelevado@my.cspc.edu.ph', '221007141', 'Student', NULL, NULL, NULL, NULL, NULL, '2024-09-20 10:56:21', '2024-09-20 10:57:21', NULL, NULL),
(45, NULL, 'faculty', 'faculty', 'faculty@cspc.edu.ph', 'CFACULTY', 'Faculty', '$2y$12$c2f5gdGIFY09OzpkD079heCNDkBq0E13zcbE4S0RTpd/BTmixid56', NULL, NULL, '288916497440', 'xi6qZM0nXrVmLYtXiWuedIr5KHSVEp3GIBwC298cfFFxcdq1PGqSwY2QmT3A', '2024-09-23 02:43:41', '2024-09-23 02:44:29', NULL, NULL),
(46, NULL, 'Jomarc', 'Nacario', 'student@my.cspc.edu.ph', 'C21105789', 'Student', '$2y$12$BDXlZ4T3bRG5KSuTwa6qeenhfxfbI3sC/OdjTTL/666SWMGUK.RSS', NULL, NULL, '807582885868', 'pTEOlOLmALyttkEjQL1fiXFd4tr6qFlsPgTzWCxTzvaHVfNUSVV79NWp031O', '2024-09-23 02:47:49', '2024-09-30 02:31:45', NULL, NULL),
(47, NULL, 'Mac', 'Dancalan', 'mac@cspc.edu.ph', 'Inst1', 'Faculty', '$2y$12$RIuuxVLxA35ht0Q3LYOCu.WosozAQZkw5mV7pwKF9fNPiGTmi.y4.', NULL, NULL, NULL, NULL, '2024-09-25 01:43:03', '2024-09-29 16:14:33', NULL, NULL),
(48, NULL, 'Ms.', 'Rhea', 'rhea@cspc.edu.ph', 'Inst2', 'Faculty', '$2y$12$LYufXTlIDDxjh3Fy2VL9YuqkGaeu7UX1GQAVR.0Y1SF84O9mRjD7K', NULL, NULL, NULL, NULL, '2024-09-25 02:04:31', '2024-09-25 02:04:31', NULL, NULL),
(49, NULL, 'Ms.', 'Chua', 'chua@cspc.edu.ph', 'Inst3', 'Faculty', '$2y$12$WnQbe6CjRdDbxVyMcGzVLuBnQn6QLreUvJ0G9g7IbEciw5UZ.Ah7S', NULL, NULL, NULL, NULL, '2024-09-25 02:05:10', '2024-09-25 02:05:10', NULL, NULL),
(50, NULL, 'Ms.', 'Ramizares', 'ramizares@cspc.edu.ph', 'Inst4', 'Faculty', '$2y$12$Nt/TplsLv8i8af5Q1kOiX.gDehMosxOdptHMaYr9CyMthyACtMnfi', NULL, NULL, NULL, NULL, '2024-09-25 02:16:18', '2024-09-25 02:16:18', NULL, NULL),
(51, NULL, 'Jeremy Jireh', 'Neo', 'neo@cspc.edu.ph', 'Inst5', 'Faculty', '$2y$12$/qzN4.b.OAacjgz1D7FU7utnXQyDFxUgThjAkYEoyb.waf4RhHCFy', NULL, NULL, NULL, NULL, '2024-09-25 02:21:43', '2024-09-29 16:03:53', NULL, NULL),
(52, NULL, 'Ms.', 'Tagum', 'tagum@cspc.edu.ph', 'Inst6', 'Faculty', '$2y$12$FGvVeoPT/tXhk8D7Tlj3tutBKMbCExGblmHySC41oYLb1mn9.wUCW', NULL, NULL, NULL, NULL, '2024-09-25 02:22:24', '2024-09-25 02:22:24', NULL, NULL),
(53, NULL, 'Ms.', 'Vidal', 'vidal@cspc.edu.ph', 'Inst7', 'Faculty', '$2y$12$g.XO934ayxUTp0RVVMrdC.9Vn2CU.O/zn9gmI2kbXJIt5ck4.6lc6', NULL, NULL, NULL, NULL, '2024-09-25 02:23:01', '2024-09-25 02:23:01', NULL, NULL),
(54, NULL, 'Mr.', 'Colle', 'colle@cspc.edu.ph', 'Inst8', 'Faculty', '$2y$12$RyocAnDuYY1OCs5YMFjxs.n.8c6rRGlEUkWUjYBrOa1Um.uN4YeE2', NULL, NULL, NULL, NULL, '2024-09-25 02:24:36', '2024-09-25 02:24:36', NULL, NULL),
(55, NULL, 'Don ytyt', 'Raluta', 'djraluta@cspc.edu.ph', '12345678', 'Technician', '$2y$12$MS.WXlGL9zFGQvtDf2l0cuwz5FVSqqgwQiNZwC7X1YgPPkA3q3DlK', NULL, NULL, '872095384234', '1ZrFKMckLpSslfyYV5FIM0MdGYQhQ5v7Oq54gDdKMELyiDGLyi3yJPK7Wj76', '2024-09-25 06:14:15', '2024-09-25 06:27:27', NULL, NULL),
(56, NULL, 'Maria Daisy', 'Belardo', 'mdbelardo@cspc.edu.ph', '20200220012', 'Admin', '$2y$12$3sQgGRaeKZjJ/ObXkENOxOJVoSLm./ipRQ.pQReGUv8mu6EwNLH5G', NULL, NULL, '872516780642', 'ZDvdwOBQIvMF92tHnWrWVDZgVOz3bf3Q6OlDpZwlTuczMhGBVHV9k8XtcFdy', '2024-09-25 06:37:28', '2024-09-30 01:59:56', NULL, NULL),
(57, NULL, 'Marivic', 'Ramizares', 'mavsramizares@cspc.edu.ph', '2022010010', 'Faculty', '$2y$12$cZfa0uxlkDCte.Iqbq0BAu8PQwGzpfJOr0DRtiZ4s2lJHWosZEdTS', NULL, NULL, '874212721377', 'sS03jKlURiJPZronrnYSKXm4BWNRyZcQk106lNcmZl3NBL9ICXxlSd3lrc7N', '2024-09-27 01:07:55', '2024-09-27 01:26:10', NULL, NULL),
(58, NULL, 'Arlan', 'Imperial', 'arlanimperial@cspc.edu.ph', 'C7', 'Admin', '$2y$12$S9aT3gAgG2bZiN1KJeFtNukzDcIlsuLPOzlNNQZhQFyvnp.I9ZRyC', NULL, NULL, NULL, '6lrtBAud28KKGUR3BzjvItSCV6uNhuGM9gtC9sFZ1HsZNtPYgom6vghqxjkd', '2024-09-27 01:14:19', '2024-09-27 05:01:26', NULL, NULL),
(59, NULL, 'Andrei Mar', 'Gavina', 'angavina@my.cspc.edu.ph', '2411503', 'Student', '$2y$12$R2b5yK4HwvtoKEo/vaMYfeCFrhHkTpRE4YInNcbkrC2STMkuaUq7y', NULL, NULL, '943462056523', 'SZczqmDHQRfcfKWo5hCpIdbCro7f01xpAVpbPaiF6DdUSGujNSlYdnu3BKta', '2024-09-27 01:14:29', '2024-09-27 01:15:34', NULL, NULL),
(60, NULL, 'Elvi Bien', 'Arales', 'arelvibien@my.cspc.edu.ph', '2411462', 'Student', '$2y$12$7rTAkCvI0k3YLpxH3pEyjuCBIEBKwEVOU6AzIiEfaN39/4U..khdO', NULL, NULL, '873971811058', 'TpDtJ5PFVH2mpKXA4klgf6GRu8rshFhuuH7HEZrIdfD3GtZPRez4wqK4cUNo', '2024-09-27 01:15:06', '2024-09-27 01:19:01', NULL, NULL),
(61, NULL, 'BRAYAN JAY', 'ORTEGA', 'brortega@my.cspc.edu.ph', '2411416', 'Student', '$2y$12$AOPcXK0AcH.d5Axqln/osOslaPd1JaRR5Wtyr9jPPsxRN.ptIoHuG', NULL, NULL, '942586954400', 'KDz7tT7naG2absYmtWKc86ZPjYeEYx8HjIzuiU14AYcgseZ31mQDOC1iDkJF', '2024-09-27 01:22:02', '2024-09-27 01:55:57', NULL, NULL),
(62, NULL, 'John Harvey', 'Llegado', 'jollegado@my.cspc.edu.ph', '2411519', 'Student', '$2y$12$rNQ.zY5NuGzGTT0UH67uUeGYZYZ6IQkV2vBi3UcdpjZ3AZzCnIy3C', NULL, NULL, '871884554775', '3CXFyLIuz6Y1pRJWz2EpAWTK4MG8cQuKhHqRTJxowUBqYIdHbZAS02O3yHQ9', '2024-09-27 01:22:58', '2024-09-27 01:29:25', NULL, NULL),
(63, NULL, 'francis dave', 'pinera', 'frpinera@my.cspc.edu.ph', '2411420', 'Student', '$2y$12$cwMwaT2qFp.Rf5EGc2gT9O.vCgzzad.dGJjVogQaKhT6HYEDfZsd6', NULL, NULL, '886257833941', 'CQ5bq0k6OT7YXdd1nLveg3kkEwfUdx17jstv32R3Fql4h6YUxJIYT72SA7rV', '2024-09-27 01:23:37', '2024-09-27 01:30:00', NULL, NULL),
(64, NULL, 'Nathaniel John Dominic', 'Abiog', 'naabiog@my.cspc.edu.ph', '2411309', 'Student', '$2y$12$ANDOEI1122SOa77UQyfjhe7nyyK.SzuBjkOZuZ9QSzrRMsmvI4yau', NULL, NULL, '266741045372', '2eNcgBVzIWWjIm6M61oJhEDikFnr2OiYaPTXG7n00o70ft2KLKPgorFriiPl', '2024-09-27 01:23:44', '2024-09-27 01:57:16', NULL, NULL),
(65, NULL, 'Josielyn Mae', 'Mina', 'jomina@my.cspc.edu.ph', '2411524', 'Student', '$2y$12$2V3JMOy9lpNxDZj6eo9Ic.jRRfus3XnYjH6Rfg4jSUYC6kSGkRUem', NULL, NULL, '871914046059', 'ik3Z013HrrWuWdcdffGpci3VP1bq4R0VoNHpfSnPKVMNJWjaQ274E4XSigyR', '2024-09-27 01:28:40', '2024-09-27 01:30:53', NULL, NULL),
(66, NULL, 'danica', 'lausa', 'dalausa@my.cspc.edu.ph', '2411300', 'Student', '$2y$12$n2Wr9Y1caZ0gYGQhdtDZr.ky6BWdHiKNaKyNUqYoKVvZpfxNJsCf.', NULL, NULL, '942681129481', 'F9JFKgh3U8vwG6Em0G9rygMJLkjdmXmcCdsoqgMzhiZrZaP60VzAznzqYILL', '2024-09-27 01:31:54', '2024-09-27 01:35:06', NULL, NULL),
(68, NULL, 'bejey', 'armillos', 'bearmillos@my.cspc.edu.ph', '2411311', 'Student', '$2y$12$E5yQBuVvGlP/lb7fQtU8Ie5cuXoN9jfekg9hJi6GqRhu84yvZzl3S', NULL, NULL, '874319610458', '2NA4HvkEt3pm59x4oA08HbMGMUKs9wbbUzaJd0hL4RAWufrXUd9okDbqyGRw', '2024-09-27 01:32:15', '2024-09-27 01:33:28', NULL, NULL),
(69, NULL, 'Shaira Jane', 'Portugal', 'shportugal@my.cspc.edu.ph', '2411422', 'Student', '$2y$12$iMGSGQpvF17DZTLb66HDhOsZvSqfyYKK8B/w2rLFMDiC8n1fwS6pC', NULL, NULL, '942684930627', 'O2TzjBejgj3YZBZoy1tXDcrueO8DgtFu0kWutzL4YuaUUpM67TIxntcFa1Tg', '2024-09-27 01:35:44', '2024-09-27 01:44:31', NULL, NULL),
(70, NULL, 'Christian Jay', 'Barra', 'chbarra@my.cspc.edu.ph', '2411313', 'Student', '$2y$12$.FzM176TQtEJU3NflGQUZ.4Cd3j9bph8b7IZu9GoELa31wGB9LHlG', NULL, NULL, '872652178040', 'FqLn8chv8W9ZfgSZTlsPNSy84EfQXCkZgG3fb2LU7mvQc3x96USUa8CMWOeM', '2024-09-27 01:36:28', '2024-09-27 01:37:07', NULL, NULL),
(71, NULL, 'Hazel', 'Sario', 'hasario@my.cspc.edu.ph', '2411426', 'Student', '$2y$12$pdtGHU9ihFPIcyIJGksGDu02acCUoMzmuIRcXs0aNDyLD4YcbEDVG', NULL, NULL, '956798883557', 'PQClfXPohgDAWNFSMBAn6PFmED4OUvIa5kPuddiWK5tQtj8hJdBlXhejnLcE', '2024-09-27 01:36:35', '2024-09-27 01:41:30', NULL, NULL),
(72, NULL, 'jerico', 'gava', 'jegava@my.cspc.edu.ph', '2411373', 'Student', '$2y$12$tw2WP47PFt8NMdLqeJwaOu8zVGY02ra433ZqxTQgQoIFifGC4QE0m', NULL, NULL, '942359806517', 'xEGUMvvlUrQ1BRJxHvLrwI5J5c8Ai7pt7PO2CWX9O3UeYgMmK5bu9NHDWylP', '2024-09-27 01:39:34', '2024-09-27 01:40:44', NULL, NULL),
(73, NULL, 'Daniella Kim', 'Ciron', 'daciron@my.cspc.edu.ph', '2411361', 'Student', '$2y$12$vqfh4gkv2s1gUex1rYiAyOWqtKgHErs6UtzOW2yz9uHTrxoy0K/6m', NULL, NULL, '874907992681', 'gy7N2LuX5anSB9dLMVRvkMJgvazL238yfZlimHHEPhi8fZRrPtEHe3MpnfQd', '2024-09-27 01:43:07', '2024-09-27 01:45:59', NULL, NULL),
(74, NULL, 'joshua', 'omayan', 'joomayan@my.cspc.edu.ph', '2411412', 'Student', '$2y$12$ADp.xv0oUAiXou1FAq3eouGYQiXAkZTWePtB6KN78yfIbA354rXZm', NULL, NULL, '942611857962', 'eARIA0T8gyJNBPZ8TMN8msA8oFKBHOmvdO2Aw0AP4a38nwmTUl3ZIBByiPAG', '2024-09-27 01:44:20', '2024-09-27 01:45:13', NULL, NULL),
(75, NULL, 'Rache mae', 'Sombrero', 'rasombrero@my.cspc.edu.ph', '2412841', 'Student', '$2y$12$hZWQHzrQkCChvmEEmbYx1OUb7JRUhLpjvSUtMtg2AkElXDC3VgRhu', NULL, NULL, '872808219154', 'bAZ40RYCywAPooetiH1o5wq7UbnSBJTU5XHkgvF9wohKX5uA2TWjrGT7GHj5', '2024-09-27 01:45:50', '2024-09-27 01:47:21', NULL, NULL),
(76, NULL, 'harold', 'salud', 'harsalud@my.cspc.edu.ph', '2411027', 'Student', '$2y$12$wPhV2wH/MsP53Uwht3ZWe.oARNSJS.0ey7HezgY5//5PHbwGGi8nW', NULL, NULL, '751281526477', 'IOEp1PzpnzKMDSltHTW43Bn8tEtuQWTBm8v1eOuNkfsXOUsXU1vSSmHuuq9M', '2024-09-27 01:47:14', '2024-09-27 01:48:07', NULL, NULL),
(77, NULL, 'Rhiane Scherazape', 'Cacatian', 'rhcacatian@my.cspc.edu.ph', '2412829', 'Student', '$2y$12$.mWBMJ9XWwnroBrxACBay.DD7ASE185ekcg8QXPvId7olYcdgn3kO', NULL, NULL, '872742879997', 'bMdb7nYZUW0xs0Bk0pOU43kWjpmWXfX7BwKPzdX1r1Lk1a2nLfuhVc8MSLGR', '2024-09-27 01:48:08', '2024-09-27 01:52:24', NULL, NULL),
(78, NULL, 'Maria Danica', 'Cano', 'macano@my.cspc.edu.ph', '2411298', 'Student', '$2y$12$6HLtVdt/PT1WlNYOIu9OUOZYhNHCCc4TKKQG6lXjFP8uGJssQb0kG', NULL, NULL, '955059886297', '3SfoooIzUY2iNHGdcKB2SG384UEE8nkiGsqevR1upJBMkMiyDd3Jp5nwJAEv', '2024-09-27 01:48:53', '2024-09-27 01:50:20', NULL, NULL),
(79, NULL, 'aldrin', 'ocbian', 'alocbian@my.cspc.edu.ph', '2411410', 'Student', '$2y$12$kSzQ.TBAPmzDPYBTbq23GOT3F8GM/Hc28HuAPQkZB0ACR0m/9Jfhy', NULL, NULL, '874060219079', '89zh1BWhVKiNzYXkEwmE4ut4Tk5a3TBDM2GfV6QaqgvpPjIpCiAE34RTRGa7', '2024-09-27 01:50:02', '2024-09-27 01:50:53', NULL, NULL),
(80, NULL, 'Clair Kirk', 'Cepe', 'clacepe@my.cspc.edu.ph', '2411317', 'Student', '$2y$12$RJQfjmcY2qrvso65s9sBe.aLvLzNY9ZjbYOuZRK/V/4bmVuc1Ztu6', NULL, NULL, '942038942441', 'WNpmT3AEQXXg2B4hq7kU5i5XotXJ949snA2Ig7OeIZ0i20Ip63zuQov8iOkk', '2024-09-27 01:50:10', '2024-09-27 01:53:07', NULL, NULL),
(81, NULL, 'paul jordan', 'ollet', 'paollet@my.cspc.edu.ph', '2411411', 'Student', '$2y$12$lrUA/gnlRIO4hQSWmLI7Q.jjkyzQcoOn.Jy4EwQaelr.zp/jB6uES', NULL, NULL, '874524148327', 'qXfHjuw1y0rCaQKXkL765btJwaJQpG7NOuVWkAWEkqcN9ohopcznFcarVzhI', '2024-09-27 01:52:51', '2024-09-27 01:53:44', NULL, NULL),
(82, NULL, 'Karl Clifford', 'Pili', 'kapili@my.cspc.edu.ph', '2411418', 'Student', '$2y$12$hurHSJ/n3xsXaeZu6ZsbFu7oNFAurZjubWEiz1hmGNeW/ZdWj3kKO', NULL, NULL, '943238513313', 'ypcplNy5vgmaeiEF1S6sIdESPu8CWufDFujW6YARg99SbaF7gB7aE3KuGbye', '2024-09-27 01:53:45', '2024-09-27 01:56:23', NULL, NULL),
(83, NULL, 'Shaine Lee', 'Pasadilla', 'shpasadilla@my.cspc.edu.ph', '2412831', 'Student', '$2y$12$AXyz15ZzT6t4BTzhwe2ZfeD48AQfaeQu1MCM/0GAajRZyW8wOsat2', NULL, NULL, '942355415795', 'z7sGKCAp36EQx8XQ5Sh45i6D4U2rg6IJ3pNPojizAyRIS1w4snjJspcxCwnd', '2024-09-27 01:54:44', '2024-09-27 01:57:32', NULL, NULL),
(84, NULL, 'Glyka may', 'Saberon', 'glsaberon@my.cspc.edu.ph', '2411531', 'Student', '$2y$12$DFE4VYe/Y3/zP2aVhcPv..7gWrBeAqgrQyKdWtZjsmbVbJu1LwDwG', NULL, NULL, '874555146842', 'mqXviczYa9hLldXjdG4Z9X387hJcTPuwicKhQ5YanKVv7Yug8pwZA2TUTT9y', '2024-09-27 01:57:33', '2024-09-27 01:58:27', NULL, NULL),
(85, NULL, 'marlo', 'lagyap', 'malagyap@my.cspc.edu.ph', '2413001', 'Student', '$2y$12$ssIxSF8q6lFUBleyEncEP.0LBAN2TNnqQ5gfp8PcsH8lJPp2MMSDu', NULL, NULL, '130474202870', 'fanlCRPJfNQUfcpAfLbMMv5P9fdjFiwRGSJQRH6HoCl8Y3GYchYitYjBUZov', '2024-09-27 01:57:45', '2024-09-27 01:59:08', NULL, NULL),
(86, NULL, 'AJ Joseph', 'Brazil', 'ajbrazil@my.cspc.edu.ph', '2411295', 'Student', '$2y$12$KAWVSRd5GPoizeD0fcoSo.Lkbo/MKnvsdtOoEhmkxNTdu4Qr6X.8C', NULL, NULL, '941613810411', 'BxLirsxjj9UlYZ8czPYf8AJT1jU7kXMOo2P6BFXEwUP0e4zOdlX9pIwbG9L8', '2024-09-27 01:59:38', '2024-09-27 02:01:58', NULL, NULL),
(87, NULL, 'Angel Abby', 'Orcine', 'angorcine@my.cspc.edu.ph', '2411413', 'Student', '$2y$12$jnHPFwTlPqGGzq0La.H8S.y.hlqqy5i//3E/RkC23UfmscCHC7vxS', NULL, NULL, '873077375609', 'PNzcZOFWeVRKo8fmKqnLN2jPrgNhsb9amYcEbuDnxU2WXrNqBgHVEgDPEaUR', '2024-09-27 02:00:02', '2024-09-27 02:00:40', NULL, NULL),
(88, NULL, 'kyle lawrence', 'carbonell', 'kycarbonell@my.cspc.edu.ph', '2411315', 'Student', '$2y$12$g2IyizKBLUSrAjN5RZwbo.YXO2X/kG2KyEp.af4lASlrEvoEA1X8y', NULL, NULL, '942679622192', 'sTwoAqRT827dkaEj3fajhzEFndBp2iZ56dZwJ23dW7cMw6E7vDXcqpmuO5tH', '2024-09-27 02:01:30', '2024-09-27 02:05:26', NULL, NULL),
(89, NULL, 'rea may', 'landong', 'relandong@my.cspc.edu.ph', '2411406', 'Student', '$2y$12$.fvlSjay4.TaHLMTbMc3u.qa6hu18wbgTd3oCxPf.YaTTC0nY9TVC', NULL, NULL, '872977629837', 'eDLW0tJpRAKaSMT9yur04Gkc2cBgkD7itXyScwrx1phVkprxTXBYgYgPOolP', '2024-09-27 02:02:42', '2024-09-27 02:03:54', NULL, NULL),
(90, NULL, 'bryan', 'fuentiveros', 'brfuentiveros@my.cspc.edu.ph', '2411492', 'Student', '$2y$12$3dBVd91RWo95Rhtvb/gjGO/gQpKrZhUkhR77hzaJKq4JT7qHu/IWi', NULL, NULL, '872521957939', '6p6YS1HjDf6CooLusUZPmbHy4NEnRmx4bUrqmLAN0Tijplq6qp7dNbJMQ4s3', '2024-09-27 02:03:47', '2024-09-27 02:06:14', NULL, NULL),
(91, NULL, 'sheree ann', 'plotado', 'shplotado@my.cspc.edu.ph', '2411421', 'Student', '$2y$12$BTHpFOuJcD339Jhrpp2B0eydCJL4mgqS.B71lDZbL/m0uKjOuF2CK', NULL, NULL, '941282591393', 'wwBHp8kZARBBdJIdwEFMtPq6VrajoT1NgYvTePs0BtP65KxxaliHFUZwg8os', '2024-09-27 02:05:51', '2024-09-27 02:06:58', NULL, NULL),
(92, NULL, 'marc ace', 'escolano', 'marcescolano@my.cspc.edu.ph', '2411299', 'Student', '$2y$12$M9JX9p.MtRyXqxkkswDu4uaESu25F3fppgPFm9DjEFs1njaRx1FlC', NULL, NULL, '942613430786', 'L6xyI5Pu8o0mq2ZqFYYDO9wRJfvIbhFsmFFdMQArCqMFJDRbFPx6NE6AYgWW', '2024-09-27 02:07:00', '2024-09-27 02:08:22', NULL, NULL),
(93, NULL, 'Kathlene Claire', 'Cailao', 'katcailao@my.cspc.edu.ph', '2411484', 'Student', '$2y$12$ErVChFdRgoRymB0vyejlLOQ6RGUM51mfAEph9HOdJVmWWKe97yl2e', NULL, NULL, '807381795446', 'EknDpjKkEYxpkzOuZPllSEJweQ1bwzAbL9LgYA2YghOw6kU78K9Rd6h6j2QM', '2024-09-27 02:08:07', '2024-09-27 02:12:22', NULL, NULL),
(94, NULL, 'rendel', 'berdol', 'reberdol@my.cspc.edu.ph', '2411476', 'Student', '$2y$12$mxse1PkWMHFo.qIWBH61S.DAGXTpveetEAkdqrNWH9nphEI8T2TxC', NULL, NULL, '942276641325', 'hxWNxwfJrhZHAroQ1DI0gQJsIAZOGKGDdDT94KygOguFN1g9CefTeqIwbL9u', '2024-09-27 02:10:23', '2024-09-27 02:11:39', NULL, NULL),
(95, NULL, 'adrian', 'aliparo', 'adaliparo@my.cspc.edu.ph', '2411310', 'Student', '$2y$12$EF0qmOVVfli8YWZGmLRtJOECEgd2Nve1ZGUeB4qIaFE.Pk.EJJYiG', NULL, NULL, '872237138494', 'Ck3uUUTHLwXsFTLHH10n2TlXdxGIqUAwDi5iu2svDldVfNuuMUM6rJpueX63', '2024-09-27 02:11:51', '2024-09-27 02:12:31', NULL, NULL),
(96, NULL, 'jerry', 'balaguer', 'jebalaguer@my.cspc.edu.ph', '2411312', 'Student', '$2y$12$8ER9TNSpPAzEyLmnaSwQEuCs3gXaB8XaRTCqErrT1XgJEy9lJpt52', NULL, NULL, '131718404069', 'oIswkGUnZc7PC5MMKkccxcMilTwZ3GIy6dsqlL0oYbjswNBUSxvWCayrXJc3', '2024-09-27 02:13:14', '2024-09-27 02:14:32', NULL, NULL),
(100, NULL, 'Mark Vincent', 'Cleofe', 'macleofe@my.cspc.edu.ph', 'C21102324', 'Faculty', 'mark', '/uploads/1733856999526-306220015.jpeg', NULL, NULL, NULL, NULL, '2024-12-10 18:56:39', NULL, NULL),
(101, NULL, 'Lyme', 'Lavarias', 'lylavarias@my.cspc.edu.ph', 'C21101162', 'Student', 'lymelavarias', '/uploads/1733197067852-469885969.jpeg', NULL, NULL, NULL, NULL, '2024-12-03 03:37:48', NULL, NULL),
(102, NULL, 'John Llenard', 'Nagal', 'jonagal@my.cspc.edu.ph', 'C21102351', 'Student', 'john', '/uploads/1733323424015-9154169.jpeg', NULL, NULL, NULL, NULL, '2024-12-04 14:43:44', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_logs`
--

CREATE TABLE `user_logs` (
  `idLogs` bigint(20) UNSIGNED NOT NULL,
  `userID` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `action` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_logs`
--

INSERT INTO `user_logs` (`idLogs`, `userID`, `action`, `date`, `time`, `created_at`, `updated_at`) VALUES
(1, 'C30', 'Updated the profile password', '2024-09-10', '16:36:13', NULL, NULL),
(2, 'C1', 'Added new Student account using hanojara@my.cspc.edu.ph ', '2024-09-10', '16:47:19', NULL, NULL),
(3, 'C30', 'Added new Faculty account using faculty@my.cspc.edu.ph ', '2024-09-10', '16:44:20', NULL, NULL),
(4, 'C2', 'Added new Student account using ezalforte@my.cspc.edu.ph ', '2024-09-10', '16:44:24', NULL, NULL),
(5, 'C30', 'Added New Regular Schedule for ISEC', '2024-09-10', '16:46:02', NULL, NULL),
(6, 'C2', 'Added new Student account using juturalde@my.cspc.edu.ph ', '2024-09-10', '16:46:58', NULL, NULL),
(7, 'C30', 'Added new Student account using haferrer@my.cspc.edu.ph ', '2024-09-10', '16:47:27', NULL, NULL),
(8, 'C30', 'Added new Student account using aarosauro@my.cspc.edu.ph ', '2024-09-10', '16:49:00', NULL, NULL),
(9, 'C2', 'Added new Student account using lallagas@my.cspc.edu.ph ', '2024-09-10', '16:49:14', NULL, NULL),
(10, 'C1', 'Added new Student account using rarengalota@my.cspc.edu.ph ', '2024-09-10', '16:53:00', NULL, NULL),
(11, 'C30', 'Added new Student account using rizorilla@my.cspc.edu.ph ', '2024-09-10', '16:50:21', NULL, NULL),
(12, 'C1', 'Added new Student account using jabermas@my.cspc.edu.ph ', '2024-09-10', '16:54:03', NULL, NULL),
(13, 'C2', 'Added new Student account using kiedroso@my.cspc.edu.ph ', '2024-09-10', '16:51:02', NULL, NULL),
(14, 'C30', 'Added new Student account using chrelatores@my.cspc.edu.ph ', '2024-09-10', '16:51:57', NULL, NULL),
(15, 'C1', 'Added new Student account using leluares@my.cspc.edu.ph ', '2024-09-10', '16:56:05', NULL, NULL),
(16, 'C2', 'Added new Student account using jepresnillo@my.cspc.edu.ph ', '2024-09-10', '16:53:00', NULL, NULL),
(17, 'C1', 'Added new Student account using marbeloro@my.cspc.edu.ph ', '2024-09-10', '16:57:33', NULL, NULL),
(18, 'C30', 'Added new Student account using chbaria@my.cspc.edu.ph ', '2024-09-10', '16:55:00', NULL, NULL),
(19, 'C2', 'Added new Student account using adsaballero@my.cspc.edu.ph ', '2024-09-10', '16:55:17', NULL, NULL),
(20, 'C1', 'Added new Student account using dogasgas@my.cspc.edu.ph ', '2024-09-10', '16:58:43', NULL, NULL),
(21, NULL, 'Added new Class List', '2024-09-10', '17:02:26', NULL, NULL),
(22, '221007722', 'Joined to BSIS-3B schedule', '2024-09-10', '17:03:30', NULL, NULL),
(23, NULL, 'Joined to BSIS-3B schedule', '2024-09-10', '17:04:29', NULL, NULL),
(24, NULL, 'Joined to BSIS-3B schedule', '2024-09-10', '17:05:53', NULL, NULL),
(25, 'C20100603', 'Joined to BSIS-3B schedule', '2024-09-10', '17:10:23', NULL, NULL),
(26, NULL, 'Joined to BSIS-3B schedule', '2024-09-10', '17:09:09', NULL, NULL),
(27, NULL, 'Joined to BSIS-3B schedule', '2024-09-10', '17:09:35', NULL, NULL),
(28, '221007264', 'Joined to BSIS-3B schedule', '2024-09-10', '17:12:57', NULL, NULL),
(29, '221007264', 'Updated the profile password', '2024-09-10', '17:14:06', NULL, NULL),
(30, '221006666', 'Joined to BSIS-3B schedule', '2024-09-10', '17:12:03', NULL, NULL),
(31, NULL, 'Joined to BSIS-3B schedule', '2024-09-10', '17:12:18', NULL, NULL),
(32, NULL, 'Joined to BSIS-3B schedule', '2024-09-10', '17:16:04', NULL, NULL),
(33, NULL, 'Joined to BSIS-3B schedule', '2024-09-10', '17:13:55', NULL, NULL),
(34, NULL, 'Updated the profile password', '2024-09-10', '17:17:10', NULL, NULL),
(35, 'C21101044', 'Joined to BSIS-3B schedule', '2024-09-10', '17:14:48', NULL, NULL),
(36, '221007491', 'Joined to BSIS-3B schedule', '2024-09-10', '17:15:55', NULL, NULL),
(37, 'C2', 'Activated C10-Faculty Faculty RFID', '2024-09-10', '17:20:31', NULL, NULL),
(38, NULL, 'Joined to BSIS-3B schedule', '2024-09-10', '17:23:30', NULL, NULL),
(39, NULL, 'Updated the profile password', '2024-09-10', '17:24:29', NULL, NULL),
(40, 'C30', 'Activated C3-Ralph Lorzano RFID', '2024-09-10', '17:28:52', NULL, NULL),
(41, 'C30', 'Entered the ERP Laboratory', '2024-09-09', '17:30:05', NULL, NULL),
(42, 'C30', 'Entered the ERP Laboratory', '2024-09-09', '17:30:14', NULL, NULL),
(43, 'C30', 'Entered the ERP Laboratory', '2024-09-09', '17:31:01', NULL, NULL),
(44, 'C30', 'Deleted pending RFID', '2024-09-10', '17:31:45', NULL, NULL),
(45, 'C2', 'Activated 221008331-Aaron Austin Rosauro RFID', '2024-09-10', '17:32:15', NULL, NULL),
(46, NULL, 'Joined to BSIS-3B schedule', '2024-09-10', '17:38:05', NULL, NULL),
(47, 'C30', 'Entered the ERP Laboratory', '2024-09-09', '17:38:08', NULL, NULL),
(48, 'C30', 'Activated 221002158-EZRA FAE ALFORTE RFID', '2024-09-10', '17:41:22', NULL, NULL),
(49, 'C30', 'Activated 221007546-Justine Matthew Turalde RFID', '2024-09-10', '17:42:22', NULL, NULL),
(50, 'C30', 'Activated 221006178-Niño Jaybee Bermas RFID', '2024-09-10', '17:46:02', NULL, NULL),
(51, 'C30', 'Activated 221007558-Ralph Gabriel Saño RFID', '2024-09-10', '17:46:48', NULL, NULL),
(52, 'C30', 'Entered the ERP Laboratory', '2024-09-10', '17:46:56', NULL, NULL),
(53, 'C30', 'Activated 221007901-Christine Joy Relatores RFID', '2024-09-10', '17:47:33', NULL, NULL),
(54, 'C30', 'Activated 221006138-Hazel Nojara RFID', '2024-09-10', '17:49:36', NULL, NULL),
(55, 'C2', 'Activated 221008518-ricko Zorilla RFID', '2024-09-10', '17:50:47', NULL, NULL),
(56, 'C30', 'Entered the ERP Laboratory', '2024-09-10', '17:53:57', NULL, NULL),
(57, 'C30', 'Entered the ERP Laboratory', '2024-09-10', '17:55:08', NULL, NULL),
(58, 'C1', 'Activated 221007491-Jeremiah Presnillo RFID', '2024-09-10', '17:58:57', NULL, NULL),
(59, 'C1', 'Activated 221006878-Harold Ferrer RFID', '2024-09-10', '17:59:21', NULL, NULL),
(60, 'C30', 'Activated c21101571-Kim Harold Edroso RFID', '2024-09-10', '17:56:10', NULL, NULL),
(61, 'C1', 'Activated C21101044-Adrian Saballero RFID', '2024-09-10', '18:00:03', NULL, NULL),
(62, 'C30', 'Activated 221007264-Lance Llagas RFID', '2024-09-10', '17:57:27', NULL, NULL),
(63, 'C30', 'Entered the ERP Laboratory', '2024-09-10', '17:59:57', NULL, NULL),
(64, 'C11', 'Added new Faculty account using ja@cspc.edu.ph ', '2024-09-12', '10:14:12', NULL, NULL),
(65, NULL, 'Updated the profile password', '2024-09-12', '10:17:24', NULL, NULL),
(66, NULL, 'Attempt to update profile', '2024-09-12', '10:18:33', NULL, NULL),
(67, 'C11', 'Added new Faculty account using jo@my.cspc.edu.ph ', '2024-09-12', '10:22:32', NULL, NULL),
(68, 'C11', 'Updated ISEC schedule', '2024-09-12', '12:42:57', NULL, NULL),
(69, 'C11', 'Updated ISEC schedule', '2024-09-12', '12:43:24', NULL, NULL),
(70, 'C30', 'Entered the ERP Laboratory', '2024-09-12', '12:47:41', NULL, NULL),
(71, 'C30', 'Entered the ERP Laboratory', '2024-09-12', '12:48:32', NULL, NULL),
(72, 'C2', 'Activated C2-Jomarc Nacario RFID', '2024-09-12', '13:34:35', NULL, NULL),
(73, 'C2', 'Entered the ERP Laboratory', '2024-09-12', '13:35:27', NULL, NULL),
(74, 'C2', 'Entered the ERP Laboratory', '2024-09-12', '13:35:52', NULL, NULL),
(75, 'C30', 'Entered the ERP Laboratory', '2024-09-12', '13:39:37', NULL, NULL),
(76, 'C2', 'Updated ISEC schedule', '2024-09-12', '13:42:18', NULL, NULL),
(77, 'C2', 'Deleted C10-Faculty attendance on 2024-09-12 12:47:27 ', '2024-09-12', '13:43:43', NULL, NULL),
(78, 'C2', 'Deleted C10-Faculty attendance on 2024-09-12 13:43:58 ', '2024-09-12', '13:45:50', NULL, NULL),
(79, 'C2', 'Deleted C10-Faculty attendance on 2024-09-12 13:45:57 ', '2024-09-12', '13:47:27', NULL, NULL),
(80, 'C2', 'Deleted C10-Faculty attendance on 2024-09-12 13:47:32 ', '2024-09-12', '13:49:57', NULL, NULL),
(81, 'C2', 'Deleted C10-Faculty attendance on 2024-09-12 13:49:59 ', '2024-09-12', '13:51:29', NULL, NULL),
(82, 'C2', 'Deleted C10-Faculty attendance on 2024-09-12 13:52:01 ', '2024-09-12', '13:52:36', NULL, NULL),
(83, 'C30', 'Entered the ERP Laboratory', '2024-09-12', '13:53:54', NULL, NULL),
(84, 'C2', 'Deleted C10-Faculty attendance on 2024-09-12 13:54:05 ', '2024-09-12', '13:54:38', NULL, NULL),
(85, 'C2', 'Updated ISEC schedule', '2024-09-12', '13:56:18', NULL, NULL),
(86, 'C11', 'Updated ja@cspc.edu.ph account : Student User ID - C14', '2024-09-13', '06:45:32', NULL, NULL),
(87, 'C11', 'Added new Student account using jobell@my.cspc.edu.ph ', '2024-09-13', '06:49:30', NULL, NULL),
(88, 'C40', 'Joined to BSIS-3B schedule', '2024-09-13', '06:52:24', NULL, NULL),
(89, 'C11', 'Updated ISEC schedule', '2024-09-13', '17:39:47', NULL, NULL),
(90, 'C11', 'Updated jobell@my.cspc.edu.ph account : Student User ID - C40', '2024-09-13', '19:07:16', NULL, NULL),
(91, 'C11', 'Attempt update on jobell@my.cspc.edu.ph account : Student User ID - C40', '2024-09-13', '19:09:32', NULL, NULL),
(92, 'C11', 'Updated jobell@my.cspc.edu.ph account : Student User ID - C40', '2024-09-13', '19:09:43', NULL, NULL),
(93, 'C11', 'Updated the profile password', '2024-09-13', '21:06:08', NULL, NULL),
(94, 'C11', 'Added new Faculty account using faculty@cspc.edu.ph ', '2024-09-13', '21:54:15', NULL, NULL),
(95, 'C11', 'Added New Regular Schedule for ITA 315', '2024-09-13', '21:58:28', NULL, NULL),
(96, 'C30', 'Updated ID number from C3 to C30', '2024-09-14', '08:35:01', NULL, NULL),
(97, 'C30', 'Updated the profile password', '2024-09-14', '08:35:49', NULL, NULL),
(98, 'C30', 'Updated ID number from C30 to C3000000', '2024-09-14', '08:36:48', NULL, NULL),
(99, 'C30', 'Updated the profile password', '2024-09-14', '08:43:31', NULL, NULL),
(100, 'C30', 'Updated the profile password', '2024-09-14', '08:45:04', NULL, NULL),
(101, 'C30', 'Attempt to update profile', '2024-09-14', '08:49:17', NULL, NULL),
(102, 'C30', 'Updated the profile password', '2024-09-14', '08:53:58', NULL, NULL),
(103, 'C30', 'Updated the profile password', '2024-09-14', '08:54:41', NULL, NULL),
(104, 'C30', 'Updated ID number from C3000000 to C30', '2024-09-14', '08:55:45', NULL, NULL),
(105, 'C30', 'Updated the profile password', '2024-09-14', '08:58:44', NULL, NULL),
(106, 'C30', 'Added new Student account using students@my.cspc.edu.ph ', '2024-09-14', '09:13:19', NULL, NULL),
(107, 'C30', 'Added new Student account using stud@my.cspc.edu.ph ', '2024-09-20', '10:17:59', NULL, NULL),
(108, NULL, 'Joined to BSIS-3B schedule', '2024-09-20', '10:20:31', NULL, NULL),
(109, 'C30', 'Deleted a user account', '2024-09-20', '10:22:26', NULL, NULL),
(110, 'C30', 'Added new Faculty account using ra@cspc.edu.ph ', '2024-09-20', '10:24:01', NULL, NULL),
(111, 'C30', 'Added New Regular Schedule for Isec 123', '2024-09-20', '10:25:32', NULL, NULL),
(112, NULL, 'Added new Class List', '2024-09-20', '10:25:53', NULL, NULL),
(113, 'C30', 'Deleted a user account', '2024-09-20', '10:27:42', NULL, NULL),
(114, 'C30', 'Added new Student account using stud@my.cspc.edu.ph ', '2024-09-20', '10:28:33', NULL, NULL),
(115, NULL, 'Updated the profile password', '2024-09-20', '10:29:06', NULL, NULL),
(116, NULL, 'Joined to BSIS-2B schedule', '2024-09-20', '10:29:20', NULL, NULL),
(117, 'C30', 'Archived a Student account associated to students@my.cspc.edu.ph email', '2024-09-20', '11:00:26', NULL, NULL),
(118, 'C30', 'Archived a Student account associated to jobell@my.cspc.edu.ph email', '2024-09-20', '11:02:57', NULL, NULL),
(119, 'C30', 'Activated 221007738-Dominic Jay Gasgas RFID', '2024-09-20', '13:26:51', NULL, NULL),
(120, 'C30', 'Added New Regular Schedule for asasas', '2024-09-20', '13:55:14', NULL, NULL),
(121, 'C30', 'Set a schedule to Without Classes', '2024-09-20', '13:55:24', NULL, NULL),
(122, 'C30', 'Added New Regular Schedule for sasaas', '2024-09-20', '13:55:56', NULL, NULL),
(123, 'C30', 'Deleted an ERP Schedule -> asasas-asas ', '2024-09-20', '13:56:40', NULL, NULL),
(124, 'C30', 'Deleted an ERP Schedule -> sasaas-sasasa ', '2024-09-20', '13:56:40', NULL, NULL),
(125, 'C30', 'Added New Regular Schedule for sasd', '2024-09-20', '13:57:13', NULL, NULL),
(126, 'C30', 'Added new Faculty account using asfda@my.cspc.edu.ph ', '2024-09-20', '15:12:27', NULL, NULL),
(127, 'C30', 'Added new Lab-in-Charge account using fa@my.cspc.edu.ph ', '2024-09-20', '15:27:48', NULL, NULL),
(128, 'C30', 'Deleted a user account', '2024-09-20', '15:28:13', NULL, NULL),
(129, 'C30', 'Attempt update on asfda@my.cspc.edu.ph account : Faculty User ID - C00', '2024-09-20', '15:33:21', NULL, NULL),
(130, 'C30', 'Attempt update on asfda@my.cspc.edu.ph account : Faculty User ID - C00', '2024-09-20', '15:34:10', NULL, NULL),
(131, 'C30', 'Attempt update on stud@my.cspc.edu.ph account : Student User ID - 12345', '2024-09-20', '15:47:06', NULL, NULL),
(132, 'C30', 'Updated email from ralorzano@my.cspc.edu.ph to ralorzano@cspc.edu.ph', '2024-09-20', '15:48:34', NULL, NULL),
(133, 'C30', 'Updated email from ralorzano@cspc.edu.ph to ralorzano@my.cspc.edu.ph', '2024-09-20', '15:48:47', NULL, NULL),
(134, 'C30', 'Deleted a user account', '2024-09-20', '16:01:05', NULL, NULL),
(135, 'C30', 'Attempt update on faculty@cspc.edu.ph account : Faculty User ID - C100', '2024-09-20', '16:01:21', NULL, NULL),
(136, 'C30', 'Deleted a user account', '2024-09-20', '16:25:45', NULL, NULL),
(137, 'C30', 'Deleted a user account', '2024-09-20', '16:25:54', NULL, NULL),
(138, 'C30', 'Attempt update on hanojara@my.cspc.edu.ph account : Student User ID - 221006138', '2024-09-20', '16:27:00', NULL, NULL),
(139, 'C30', 'Attempt update on stud@my.cspc.edu.ph account : Student User ID - 12345', '2024-09-20', '16:33:22', NULL, NULL),
(140, 'C30', 'Attempt update on stud@my.cspc.edu.ph account : Student User ID - 12345', '2024-09-20', '16:35:37', NULL, NULL),
(141, NULL, 'Updated email from ra@cspc.edu.ph to ra@my.cspc.edu.ph', '2024-09-20', '16:58:35', NULL, NULL),
(142, NULL, 'Attempt to update profile', '2024-09-20', '16:59:03', NULL, NULL),
(143, NULL, 'Updated email from ra@my.cspc.edu.ph to ra@cspc.edu.ph', '2024-09-20', '16:59:12', NULL, NULL),
(144, NULL, 'Updated email from ra@cspc.edu.ph to ra@my.cspc.edu.ph', '2024-09-20', '16:59:21', NULL, NULL),
(145, NULL, 'Updated email from ra@my.cspc.edu.ph to ra@cspc.edu.ph', '2024-09-20', '17:11:17', NULL, NULL),
(146, 'C30', 'Imported new user: mabetervo@my.cspc.edu.ph', '2024-09-20', '17:14:41', NULL, NULL),
(147, 'C30', 'Imported new user: jumagbuhos@my.cspc.edu.ph', '2024-09-20', '17:14:41', NULL, NULL),
(148, 'C30', 'Imported new user: chhosana@my.cspc.edu.ph', '2024-09-20', '17:14:41', NULL, NULL),
(149, 'C30', 'Imported new user: jopulido@my.cspc.edu.ph', '2024-09-20', '17:14:41', NULL, NULL),
(150, NULL, 'Attempt to update profile', '2024-09-20', '17:17:15', NULL, NULL),
(151, 'C30', 'Attempt update on chhosana@my.cspc.edu.ph account : Student User ID - 231002998', '2024-09-20', '17:23:40', NULL, NULL),
(152, NULL, 'Attempt to update profile', '2024-09-20', '17:57:52', NULL, NULL),
(153, NULL, 'Attempt to update profile', '2024-09-20', '17:58:10', NULL, NULL),
(154, 'C30', 'Attempt update on hanojara@my.cspc.edu.ph account : Student User ID - 221006138', '2024-09-20', '18:21:43', NULL, NULL),
(155, 'C30', 'Updated jopulido@my.cspc.edu.ph account : Faculty User ID - 231003008', '2024-09-20', '18:28:25', NULL, NULL),
(156, 'C30', 'Attempt update on jopulido@cspc.edu.ph account : Faculty User ID - 231003008', '2024-09-20', '18:29:25', NULL, NULL),
(157, 'C30', 'Attempt update on jopulido@cspc.edu.ph account : Faculty User ID - 231003008', '2024-09-20', '18:33:26', NULL, NULL),
(158, 'C30', 'Updated jopulido@cspc.edu.ph account : Technician User ID - 231003008', '2024-09-20', '18:33:37', NULL, NULL),
(159, 'C30', 'Updated jopulido@cspc.edu.ph account : Lab-in-Charge User ID - 231003008', '2024-09-20', '18:35:50', NULL, NULL),
(160, 'C30', 'Updated jopulido@cspc.edu.ph account : Faculty User ID - 231003008', '2024-09-20', '18:36:08', NULL, NULL),
(161, 'C30', 'Updated jopulido@cspc.edu.ph account : Technician User ID - 231003008', '2024-09-20', '18:37:13', NULL, NULL),
(168, 'C30', 'Deleted a user account', '2024-09-20', '18:40:18', NULL, NULL),
(169, 'C30', 'Updated mabetervo@my.cspc.edu.ph Account', '2024-09-20', '18:40:28', NULL, NULL),
(170, 'C30', 'Updated jumagbuhos@my.cspc.edu.ph Account', '2024-09-20', '18:40:28', NULL, NULL),
(171, 'C30', 'Updated chhosana@my.cspc.edu.ph Account', '2024-09-20', '18:40:28', NULL, NULL),
(172, 'C30', 'Imported new user: jopulido@my.cspc.edu.ph', '2024-09-20', '18:40:28', NULL, NULL),
(173, 'C30', 'Updated mabetervo@my.cspc.edu.ph Account', '2024-09-20', '18:44:49', NULL, NULL),
(174, 'C30', 'Updated jumagbuhos@my.cspc.edu.ph Account', '2024-09-20', '18:44:49', NULL, NULL),
(175, 'C30', 'Updated chhosana@my.cspc.edu.ph Account', '2024-09-20', '18:44:49', NULL, NULL),
(176, 'C30', 'Updated jopulido@my.cspc.edu.ph Account', '2024-09-20', '18:44:49', NULL, NULL),
(177, 'C30', 'Updated jopulido@my.cspc.edu.ph account : Technician User ID - 231003008', '2024-09-20', '18:45:05', NULL, NULL),
(181, 'C30', 'Updated jopulido@cspc.edu.ph account : Faculty User ID - 231003008', '2024-09-20', '18:46:43', NULL, NULL),
(182, 'C30', 'Activated 231003008-Josie Pulido RFID', '2024-09-20', '18:47:22', NULL, NULL),
(186, 'C30', 'Deleted a user account', '2024-09-20', '18:52:12', NULL, NULL),
(187, 'C30', 'Updated mabetervo@my.cspc.edu.ph Account', '2024-09-20', '18:52:21', NULL, NULL),
(188, 'C30', 'Updated jumagbuhos@my.cspc.edu.ph Account', '2024-09-20', '18:52:21', NULL, NULL),
(189, 'C30', 'Updated chhosana@my.cspc.edu.ph Account', '2024-09-20', '18:52:21', NULL, NULL),
(190, 'C30', 'Imported new user: jopulido@my.cspc.edu.ph', '2024-09-20', '18:52:21', NULL, NULL),
(191, 'C30', 'Updated mabetervo@my.cspc.edu.ph Account', '2024-09-20', '18:53:40', NULL, NULL),
(192, 'C30', 'Updated jumagbuhos@my.cspc.edu.ph Account', '2024-09-20', '18:53:40', NULL, NULL),
(193, 'C30', 'Updated chhosana@my.cspc.edu.ph Account', '2024-09-20', '18:53:40', NULL, NULL),
(194, 'C30', 'Updated jopulido@my.cspc.edu.ph Account', '2024-09-20', '18:53:40', NULL, NULL),
(195, 'C30', 'Updated mabetervo@my.cspc.edu.ph Account', '2024-09-20', '18:54:46', NULL, NULL),
(196, 'C30', 'Updated jumagbuhos@my.cspc.edu.ph Account', '2024-09-20', '18:54:46', NULL, NULL),
(197, 'C30', 'Updated chhosana@my.cspc.edu.ph Account', '2024-09-20', '18:54:46', NULL, NULL),
(198, 'C30', 'Updated jopulido@my.cspc.edu.ph Account', '2024-09-20', '18:54:46', NULL, NULL),
(199, 'C30', 'Updated mabetervo@my.cspc.edu.ph Account', '2024-09-20', '18:55:14', NULL, NULL),
(200, 'C30', 'Updated jumagbuhos@my.cspc.edu.ph Account', '2024-09-20', '18:55:14', NULL, NULL),
(201, 'C30', 'Updated chhosana@my.cspc.edu.ph Account', '2024-09-20', '18:55:14', NULL, NULL),
(202, 'C30', 'Updated jopulido@my.cspc.edu.ph Account', '2024-09-20', '18:55:14', NULL, NULL),
(203, 'C30', 'Updated mabetervo@my.cspc.edu.ph Account', '2024-09-20', '18:55:42', NULL, NULL),
(204, 'C30', 'Updated jumagbuhos@my.cspc.edu.ph Account', '2024-09-20', '18:55:42', NULL, NULL),
(205, 'C30', 'Updated chhosana@my.cspc.edu.ph Account', '2024-09-20', '18:55:42', NULL, NULL),
(206, 'C30', 'Updated jopulido@my.cspc.edu.ph Account', '2024-09-20', '18:55:42', NULL, NULL),
(207, 'C30', 'Updated mabetervo@my.cspc.edu.ph Account', '2024-09-20', '18:56:21', NULL, NULL),
(208, 'C30', 'Updated jumagbuhos@my.cspc.edu.ph Account', '2024-09-20', '18:56:21', NULL, NULL),
(209, 'C30', 'Updated chhosana@my.cspc.edu.ph Account', '2024-09-20', '18:56:21', NULL, NULL),
(210, 'C30', 'Updated jopulido@my.cspc.edu.ph Account', '2024-09-20', '18:56:21', NULL, NULL),
(211, 'C30', 'Imported new user: klelevado@my.cspc.edu.ph', '2024-09-20', '18:56:21', NULL, NULL),
(212, 'C30', 'Updated mabetervo@my.cspc.edu.ph Account', '2024-09-20', '18:56:39', NULL, NULL),
(213, 'C30', 'Updated jumagbuhos@my.cspc.edu.ph Account', '2024-09-20', '18:56:39', NULL, NULL),
(214, 'C30', 'Updated chhosana@my.cspc.edu.ph Account', '2024-09-20', '18:56:39', NULL, NULL),
(215, 'C30', 'Updated jopulido@my.cspc.edu.ph Account', '2024-09-20', '18:56:39', NULL, NULL),
(216, 'C30', 'Updated klelevado@my.cspc.edu.ph Account', '2024-09-20', '18:56:39', NULL, NULL),
(217, 'C30', 'Updated klelevado@my.cspc.edu.ph account : Admin User ID - 221007141', '2024-09-20', '18:57:00', NULL, NULL),
(222, 'C30', 'Updated klelevado@cspc.edu.ph account : Student User ID - 221007141', '2024-09-20', '18:57:21', NULL, NULL),
(223, 'C30', 'Updated jopulido@my.cspc.edu.ph account : Faculty User ID - 231003008', '2024-09-20', '20:07:50', NULL, NULL),
(224, 'C30', 'Updated kiedroso@my.cspc.edu.ph account : Student User ID - c21101571', '2024-09-21', '10:45:07', NULL, NULL),
(225, 'C30', 'Activated C100-Faculty Faculty RFID', '2024-09-23', '10:39:01', NULL, NULL),
(226, 'C30', 'Added new Faculty account using faculty@cspc.edu.ph ', '2024-09-23', '10:43:49', NULL, NULL),
(227, 'C30', 'Activated CFACULTY-faculty faculty RFID', '2024-09-23', '10:44:29', NULL, NULL),
(228, 'C30', 'Added Make Up Schedule (TEST)', '2024-09-23', '10:45:21', NULL, NULL),
(229, 'C30', 'Added new Student account using student@my.cspc.edu.ph ', '2024-09-23', '10:47:53', NULL, NULL),
(230, 'C30', 'Activated CSTUDENT-student student RFID', '2024-09-23', '10:48:29', NULL, NULL),
(231, 'C30', 'Entered the ERP Laboratory', '2024-09-23', '10:49:14', NULL, NULL),
(232, 'CFACULTY', 'Added new Class List', '2024-09-23', '10:49:42', NULL, NULL),
(233, 'C21105789', 'Joined to BSIT-1A schedule', '2024-09-23', '10:50:37', NULL, NULL),
(234, 'C30', 'Entered the ERP Laboratory', '2024-09-23', '11:49:11', NULL, NULL),
(235, 'C30', 'Deleted CFACULTY-Faculty attendance on 2024-09-23 10:51:02 ', '2024-09-23', '11:49:47', NULL, NULL),
(236, 'C30', 'Deleted CSTUDENT-Student attendance on 2024-09-23 10:51:14 ', '2024-09-23', '11:49:57', NULL, NULL),
(237, 'C30', 'Deleted CSTUDENT-Student attendance on 2024-09-23 11:50:12 ', '2024-09-23', '11:50:35', NULL, NULL),
(238, 'C30', 'Deleted CFACULTY-Faculty attendance on 2024-09-23 11:50:09 ', '2024-09-23', '11:50:45', NULL, NULL),
(239, 'C30', 'Updated email from ralorzano@my.cspc.edu.ph to ralorzano@cspc.edu.ph', '2024-09-23', '11:57:18', NULL, NULL),
(240, 'C30', 'Entered the ERP Laboratory', '2024-09-23', '12:00:06', NULL, NULL),
(241, 'C30', 'Entered the ERP Laboratory', '2024-09-23', '12:00:24', NULL, NULL),
(242, 'C30', 'Updated TEST schedule', '2024-09-23', '12:03:31', NULL, NULL),
(243, 'C30', 'Entered the ERP Laboratory', '2024-09-23', '12:05:01', NULL, NULL),
(244, 'C30', 'Entered the ERP Laboratory', '2024-09-23', '13:56:07', NULL, NULL),
(245, 'C30', 'Entered the ERP Laboratory', '2024-09-23', '13:56:17', NULL, NULL),
(246, 'C30', 'Entered the ERP Laboratory', '2024-09-23', '13:57:20', NULL, NULL),
(247, 'C30', 'Updated TEST schedule', '2024-09-23', '14:00:15', NULL, NULL),
(248, 'C30', 'Attempt update on TEST schedule', '2024-09-23', '14:00:16', NULL, NULL),
(249, 'C30', 'Updated TEST schedule', '2024-09-23', '14:01:35', NULL, NULL),
(250, 'C30', 'Attempt update on TEST schedule', '2024-09-23', '14:01:36', NULL, NULL),
(251, 'C30', 'Attempt update on TEST schedule', '2024-09-23', '14:01:36', NULL, NULL),
(252, 'C30', 'Updated sasd schedule', '2024-09-23', '14:01:49', NULL, NULL),
(253, 'C30', 'Attempt update on TEST schedule', '2024-09-23', '14:02:10', NULL, NULL),
(254, 'C30', 'Attempt update on TEST schedule', '2024-09-23', '14:02:11', NULL, NULL),
(255, 'C30', 'Entered the ERP Laboratory', '2024-09-23', '14:06:21', NULL, NULL),
(256, 'C30', 'Entered the ERP Laboratory', '2024-09-24', '10:43:49', NULL, NULL),
(257, 'C30', 'Entered the ERP Laboratory', '2024-09-24', '10:52:23', NULL, NULL),
(258, 'C30', 'Entered the ERP Laboratory', '2024-09-24', '11:01:52', NULL, NULL),
(259, 'C30', 'Entered the ERP Laboratory', '2024-09-24', '11:02:13', NULL, NULL),
(260, 'C30', 'Entered the ERP Laboratory', '2024-09-24', '11:03:15', NULL, NULL),
(261, 'C30', 'Archived a Student account associated to kiedroso@my.cspc.edu.ph email', '2024-09-24', '11:35:12', NULL, NULL),
(262, 'C30', 'Updated TEST schedule', '2024-09-24', '14:52:45', NULL, NULL),
(263, 'C30', 'Attempt update on TEST schedule', '2024-09-24', '14:52:46', NULL, NULL),
(264, 'C30', 'Attempt update on TEST schedule', '2024-09-24', '14:52:47', NULL, NULL),
(265, 'C30', 'Updated TEST schedule', '2024-09-24', '14:54:10', NULL, NULL),
(266, 'C30', 'Attempt update on TEST schedule', '2024-09-24', '14:54:11', NULL, NULL),
(267, 'C30', 'Updated TEST schedule', '2024-09-24', '14:54:26', NULL, NULL),
(268, 'C30', 'Attempt update on TEST schedule', '2024-09-24', '14:54:27', NULL, NULL),
(269, 'C30', 'Updated TEST schedule', '2024-09-24', '14:54:42', NULL, NULL),
(270, 'C30', 'Attempt update on TEST schedule', '2024-09-24', '14:57:11', NULL, NULL),
(271, 'C30', 'Updated TEST schedule', '2024-09-24', '14:57:41', NULL, NULL),
(272, 'C30', 'Attempt update on TEST schedule', '2024-09-24', '14:57:41', NULL, NULL),
(273, 'C30', 'Attempt update on TEST schedule', '2024-09-24', '14:57:42', NULL, NULL),
(274, 'C30', 'Attempt update on TEST schedule', '2024-09-24', '14:57:43', NULL, NULL),
(275, 'C30', 'Attempt update on TEST schedule', '2024-09-24', '14:57:43', NULL, NULL),
(276, 'C30', 'Attempt update on TEST schedule', '2024-09-24', '14:57:44', NULL, NULL),
(277, 'C30', 'Entered the ERP Laboratory', '2024-09-24', '15:00:37', NULL, NULL),
(278, 'C30', 'Attempt update on TEST schedule', '2024-09-24', '15:03:49', NULL, NULL),
(279, 'C30', 'Attempt update on TEST schedule', '2024-09-24', '15:03:50', NULL, NULL),
(280, 'C30', 'Attempt update on TEST schedule', '2024-09-24', '15:04:05', NULL, NULL),
(281, 'C30', 'Attempt update on TEST schedule', '2024-09-24', '15:07:09', NULL, NULL),
(282, 'C30', 'Attempt update on TEST schedule', '2024-09-24', '15:07:09', NULL, NULL),
(283, 'C30', 'Attempt update on TEST schedule', '2024-09-24', '15:10:22', NULL, NULL),
(284, 'C30', 'Attempt update on TEST schedule', '2024-09-24', '15:10:23', NULL, NULL),
(285, 'C30', 'Attempt update on TEST schedule', '2024-09-24', '15:10:24', NULL, NULL),
(286, 'C30', 'Attempt update on TEST schedule', '2024-09-24', '15:10:59', NULL, NULL),
(287, 'C30', 'Attempt update on TEST schedule', '2024-09-24', '15:13:42', NULL, NULL),
(288, 'C30', 'Attempt update on TEST schedule', '2024-09-24', '15:13:43', NULL, NULL),
(289, 'C30', 'Attempt update on TEST schedule', '2024-09-24', '15:14:29', NULL, NULL),
(290, 'C30', 'Attempt update on TEST schedule', '2024-09-24', '15:19:21', NULL, NULL),
(291, 'C30', 'Attempt update on TEST schedule', '2024-09-24', '15:19:22', NULL, NULL),
(292, 'C2', 'Attempt update on TEST schedule', '2024-09-24', '15:20:07', NULL, NULL),
(293, 'C30', 'Attempt update on TEST schedule', '2024-09-24', '15:20:20', NULL, NULL),
(294, 'C30', 'Entered the ERP Laboratory', '2024-09-24', '15:38:37', NULL, NULL),
(295, 'C2', 'Entered the ERP Laboratory', '2024-09-24', '15:40:25', NULL, NULL),
(296, 'C30', 'Added new Faculty account using mac@cspc.edu.ph ', '2024-09-25', '09:43:08', NULL, NULL),
(297, 'C30', 'Added new Faculty account using rhea@cspc.edu.ph ', '2024-09-25', '10:04:35', NULL, NULL),
(298, 'C30', 'Added new Faculty account using chua@cspc.edu.ph ', '2024-09-25', '10:05:13', NULL, NULL),
(299, 'C30', 'Added new Faculty account using ramizares@cspc.edu.ph ', '2024-09-25', '10:16:21', NULL, NULL),
(300, 'C30', 'Added new Faculty account using neo@cspc.edu.ph ', '2024-09-25', '10:21:46', NULL, NULL),
(301, 'C30', 'Added new Faculty account using tagum@cspc.edu.ph ', '2024-09-25', '10:22:27', NULL, NULL),
(302, 'C30', 'Added new Faculty account using vidal@cspc.edu.ph ', '2024-09-25', '10:23:03', NULL, NULL),
(303, 'C30', 'Added new Faculty account using colle@cspc.edu.ph ', '2024-09-25', '10:24:40', NULL, NULL),
(304, 'C30', 'Updated mac@cspc.edu.ph account : Faculty User ID - Inst1', '2024-09-25', '10:24:57', NULL, NULL),
(305, 'C30', 'Added New Regular Schedule for CCIS 104', '2024-09-25', '10:27:28', NULL, NULL),
(306, 'C30', 'Added New Regular Schedule for IS 317', '2024-09-25', '10:28:18', NULL, NULL),
(307, 'C30', 'Deleted an ERP Schedule -> IS 317-IS 317 ', '2024-09-25', '10:29:20', NULL, NULL),
(308, 'C30', 'Updated CCIS 104 schedule', '2024-09-25', '10:29:55', NULL, NULL),
(309, 'C30', 'Added New Regular Schedule for IS 317', '2024-09-25', '10:31:50', NULL, NULL),
(310, 'C30', 'Added New Regular Schedule for CCS 105', '2024-09-25', '10:33:02', NULL, NULL),
(311, 'C30', 'Added New Regular Schedule for ISEC 312', '2024-09-25', '10:34:26', NULL, NULL),
(312, 'C30', 'Added New Regular Schedule for IS 317', '2024-09-25', '10:39:46', NULL, NULL),
(313, 'C30', 'Added New Regular Schedule for CCS 105', '2024-09-25', '10:41:09', NULL, NULL),
(314, 'C30', 'Added New Regular Schedule for ISEC 312', '2024-09-25', '10:42:01', NULL, NULL),
(315, 'C30', 'Updated ISEC 312 schedule', '2024-09-25', '10:42:15', NULL, NULL),
(316, 'C30', 'Updated ISEC 312 schedule', '2024-09-25', '10:42:43', NULL, NULL),
(317, 'C30', 'Updated ISEC 312 schedule', '2024-09-25', '10:43:04', NULL, NULL),
(318, 'C30', 'Added New Regular Schedule for IS 317', '2024-09-25', '10:44:54', NULL, NULL),
(319, 'C30', 'Added New Regular Schedule for CCIS 104', '2024-09-25', '10:45:51', NULL, NULL),
(320, 'C30', 'Updated CCIS 104 schedule', '2024-09-25', '10:46:18', NULL, NULL),
(321, 'C30', 'Updated CCIS 104 schedule', '2024-09-25', '10:46:35', NULL, NULL),
(322, 'C30', 'Updated IS 317 schedule', '2024-09-25', '10:46:36', NULL, NULL),
(323, 'C30', 'Updated IS 317 schedule', '2024-09-25', '10:46:36', NULL, NULL),
(324, 'C30', 'Updated IS 317 schedule', '2024-09-25', '10:46:53', NULL, NULL),
(325, 'C30', 'Updated IS 317 schedule', '2024-09-25', '10:46:54', NULL, NULL),
(326, 'C30', 'Updated CCS 105 schedule', '2024-09-25', '10:46:54', NULL, NULL),
(327, 'C30', 'Updated CCS 105 schedule', '2024-09-25', '10:46:55', NULL, NULL),
(328, 'C30', 'Updated CCS 105 schedule', '2024-09-25', '10:46:56', NULL, NULL),
(329, 'C30', 'Updated CCS 105 schedule', '2024-09-25', '10:47:22', NULL, NULL),
(330, 'C30', 'Updated CCS 105 schedule', '2024-09-25', '10:47:45', NULL, NULL),
(331, 'C30', 'Updated IS 317 schedule', '2024-09-25', '10:48:11', NULL, NULL),
(332, 'C30', 'Updated IS 317 schedule', '2024-09-25', '10:48:11', NULL, NULL),
(333, 'C30', 'Updated CCS 105 schedule', '2024-09-25', '10:48:27', NULL, NULL),
(334, 'C30', 'Added New Regular Schedule for ISEC 312', '2024-09-25', '10:49:23', NULL, NULL),
(335, 'C30', 'Added New Regular Schedule for ISA 317', '2024-09-25', '11:00:21', NULL, NULL),
(336, 'C30', 'Added New Regular Schedule for ISA 317', '2024-09-25', '11:01:03', NULL, NULL),
(337, 'C30', 'Added New Regular Schedule for ISA 211', '2024-09-25', '11:02:27', NULL, NULL),
(338, 'C30', 'Added New Regular Schedule for CCS 101', '2024-09-25', '11:03:21', NULL, NULL),
(339, 'C30', 'Added New Regular Schedule for CCIS 101', '2024-09-25', '11:07:23', NULL, NULL),
(340, 'C30', 'Added New Regular Schedule for CCIS 104', '2024-09-25', '11:08:15', NULL, NULL),
(341, 'C30', 'Added New Regular Schedule for ISA 211', '2024-09-25', '11:09:56', NULL, NULL),
(342, 'C30', 'Added New Regular Schedule for CCS 101', '2024-09-25', '11:12:10', NULL, NULL),
(343, 'C30', 'Added New Regular Schedule for IS 214', '2024-09-25', '11:13:17', NULL, NULL),
(344, 'C30', 'Added New Regular Schedule for CCS 102', '2024-09-25', '11:14:58', NULL, NULL),
(345, 'C30', 'Added New Regular Schedule for IS 214', '2024-09-25', '11:15:42', NULL, NULL),
(346, 'C30', 'Added New Regular Schedule for IS 214', '2024-09-25', '11:16:26', NULL, NULL),
(347, 'C30', 'Entered the ERP Laboratory', '2024-06-16', '17:49:09', NULL, NULL),
(348, 'C30', 'Entered the ERP Laboratory', '2024-09-25', '13:55:35', NULL, NULL),
(349, 'C30', 'Entered the ERP Laboratory', '2024-09-25', '13:55:40', NULL, NULL),
(350, 'C30', 'Entered the ERP Laboratory', '2024-09-25', '13:56:12', NULL, NULL),
(351, 'C30', 'Entered the ERP Laboratory', '2024-09-25', '13:56:44', NULL, NULL),
(352, 'C30', 'Updated TEST schedule', '2024-09-25', '13:59:06', NULL, NULL),
(353, 'C30', 'Deleted an ERP Schedule -> TEST-TEST ', '2024-09-25', '14:01:55', NULL, NULL),
(354, 'C30', 'Deleted an ERP Schedule -> IS 317-IS 317 ', '2024-09-25', '14:01:55', NULL, NULL),
(355, 'C30', 'Deleted an ERP Schedule -> CCIS 104-CCIS 104 ', '2024-09-25', '14:02:27', NULL, NULL),
(356, 'C30', 'Deleted an ERP Schedule -> ISEC 312-ISEC 312 ', '2024-09-25', '14:02:38', NULL, NULL),
(357, 'C30', 'Added New Regular Schedule for Faculty', '2024-09-25', '14:04:19', NULL, NULL),
(358, 'CFACULTY', 'Added new Class List', '2024-09-25', '14:05:51', NULL, NULL),
(359, 'C30', 'Updated Faculty schedule', '2024-09-25', '14:06:34', NULL, NULL),
(360, 'C21105789', 'Joined to BSIT-3B schedule', '2024-09-25', '14:08:50', NULL, NULL),
(361, 'C30', 'Updated Faculty schedule', '2024-09-25', '14:09:15', NULL, NULL),
(362, 'C30', 'Deleted CFACULTY-Faculty attendance on 2024-09-25 14:05:59 ', '2024-09-25', '14:09:29', NULL, NULL),
(363, 'C30', 'Deleted CSTUDENT-Student attendance on 2024-09-25 14:09:36 ', '2024-09-25', '14:09:58', NULL, NULL),
(364, 'C30', 'Deleted CFACULTY-Faculty attendance on 2024-09-25 14:09:31 ', '2024-09-25', '14:10:08', NULL, NULL),
(365, 'C30', 'Added new Technician account using djraluta@cspc.edu.ph ', '2024-09-25', '14:14:20', NULL, NULL),
(366, 'C30', 'Activated 12345678-Don Jay Raluta RFID', '2024-09-25', '14:16:45', NULL, NULL),
(367, '12345678', 'Entered the ERP Laboratory', '2024-09-25', '14:16:39', NULL, NULL),
(368, '12345678', 'Updated Faculty schedule', '2024-09-25', '14:19:08', NULL, NULL),
(369, '12345678', 'Updated Faculty schedule', '2024-09-25', '14:19:09', NULL, NULL),
(370, '12345678', 'Entered the ERP Laboratory', '2024-09-25', '14:20:36', NULL, NULL),
(371, '12345678', 'Entered the ERP Laboratory', '2024-09-25', '14:21:07', NULL, NULL),
(372, '12345678', 'Updated the profile password', '2024-09-25', '14:27:27', NULL, NULL),
(373, 'C30', 'Entered the ERP Laboratory', '2024-09-25', '14:35:20', NULL, NULL),
(374, '20200220012', 'Activated 20200220012-  RFID', '2024-09-25', '14:39:03', NULL, NULL),
(375, '20200220012', 'Entered the ERP Laboratory', '2024-09-25', '14:38:59', NULL, NULL),
(376, '20200220012', 'Entered the ERP Laboratory', '2024-09-25', '14:39:15', NULL, NULL),
(377, '20200220012', 'Entered the ERP Laboratory', '2024-09-25', '14:39:25', NULL, NULL),
(378, 'C30', 'Entered the ERP Laboratory', '2024-09-25', '14:51:18', NULL, NULL),
(379, 'C30', 'Updated Faculty schedule', '2024-09-25', '14:53:12', NULL, NULL),
(380, 'C30', 'Deleted CFACULTY-Faculty attendance on 2024-09-25  ', '2024-09-25', '14:53:33', NULL, NULL),
(381, 'C30', 'Deleted CSTUDENT-Student attendance on 2024-09-25  ', '2024-09-25', '14:54:10', NULL, NULL),
(382, 'C30', 'Deleted CFACULTY-Faculty attendance on 2024-09-25 14:53:39 ', '2024-09-25', '14:54:56', NULL, NULL),
(383, 'C30', 'Entered the ERP Laboratory', '2024-09-25', '14:58:18', NULL, NULL),
(384, '20200220012', 'Updated Faculty schedule', '2024-09-25', '15:00:59', NULL, NULL),
(385, '20200220012', 'Deleted an ERP Schedule -> Faculty-Faculty ', '2024-09-25', '15:01:18', NULL, NULL),
(386, '20200220012', 'Added Make Up Schedule (test)', '2024-09-25', '15:11:57', NULL, NULL),
(387, '20200220012', 'Added New Regular Schedule for test', '2024-09-25', '15:12:39', NULL, NULL),
(388, 'CFACULTY', 'Added new Class List', '2024-09-25', '15:15:14', NULL, NULL),
(389, 'C30', 'Updated CFACULTY-Faculty attendance on 2024-09-25 15:00:00', '2024-09-25', '15:19:51', NULL, NULL),
(390, 'C30', 'Deactivated an RFID Account', '2024-09-25', '15:21:36', NULL, NULL),
(391, '20200220012', 'Attempted to Enter with Deactivated RFID', '2024-09-25', '15:22:37', NULL, NULL),
(392, 'C30', 'Updated email from ralorzano@my.cspc.edu.ph to ralorzano@cspc.edu.ph', '2024-09-25', '15:27:28', NULL, NULL),
(393, 'C30', 'Entered the ERP Laboratory', '2024-09-25', '15:38:02', NULL, NULL),
(394, 'C21105789', 'Joined to BSIT-1B schedule', '2024-09-26', '15:25:07', NULL, NULL),
(395, 'C30', 'Entered the ERP Laboratory', '2024-09-27', '09:05:25', NULL, NULL),
(396, 'C30', 'Added new Faculty account using mavsramizares@cspc.edu.ph ', '2024-09-27', '09:08:04', NULL, NULL),
(397, 'C30', 'Added New Regular Schedule for CCIS 101', '2024-09-27', '09:09:13', NULL, NULL),
(398, 'C30', 'Deleted an ERP Schedule -> CCIS 101-CCIS 101 ', '2024-09-27', '09:09:39', NULL, NULL),
(399, '2022010010', 'Added new Class List', '2024-09-27', '09:10:43', NULL, NULL),
(400, 'C2', 'Added new Student account using angavina@my.cspc.edu.ph ', '2024-09-27', '09:14:38', NULL, NULL),
(401, 'C30', 'Added new Student account using arelvibien@my.cspc.edu.ph ', '2024-09-27', '09:15:12', NULL, NULL),
(402, 'C7', 'Activated 2411503-Andrei Mar Gavina RFID', '2024-09-27', '09:15:34', NULL, NULL),
(403, '2411462', 'Joined to BSIS-1A schedule', '2024-09-27', '09:18:07', NULL, NULL),
(404, 'C7', 'Activated 2411462-Elvi Bien Arales RFID', '2024-09-27', '09:19:01', NULL, NULL),
(405, '2411503', 'Joined to BSIS-1A schedule', '2024-09-27', '09:20:42', NULL, NULL),
(406, 'C7', 'Added new Student account using brortega@my.cspc.edu.ph ', '2024-09-27', '09:22:08', NULL, NULL),
(407, 'C30', 'Added new Student account using frpinera@my.cspc.edu.ph ', '2024-09-27', '09:23:42', NULL, NULL),
(408, 'C7', 'Added new Student account using naabiog@my.cspc.edu.ph ', '2024-09-27', '09:23:49', NULL, NULL),
(409, '2411309', 'Joined to BSIS-1A schedule', '2024-09-27', '09:25:05', NULL, NULL),
(410, 'C7', 'Activated 2022010010-Marivic Ramizares RFID', '2024-09-27', '09:26:10', NULL, NULL),
(411, '2411420', 'Joined to BSIS-1A schedule', '2024-09-27', '09:27:48', NULL, NULL),
(412, '2411519', 'Joined to BSIS-1A schedule', '2024-09-27', '09:28:12', NULL, NULL),
(413, 'C7', 'Added new Student account using jomina@my.cspc.edu.ph ', '2024-09-27', '09:28:46', NULL, NULL),
(414, 'C2', 'Activated 2411519-John Harvey Llegado RFID', '2024-09-27', '09:29:25', NULL, NULL),
(415, 'C30', 'Activated 2411420-francis dave pinera RFID', '2024-09-27', '09:30:00', NULL, NULL),
(416, '2411524', 'Joined to BSIS-1A schedule', '2024-09-27', '09:30:13', NULL, NULL),
(417, 'C7', 'Activated 2411524-Josielyn Mae Mina RFID', '2024-09-27', '09:30:53', NULL, NULL),
(418, 'C2', 'Added new Student account using dalausa@my.cspc.edu.ph ', '2024-09-27', '09:31:59', NULL, NULL),
(419, 'C30', 'Added new Student account using shportuga@my.cspc.edu.ph ', '2024-09-27', '09:32:13', NULL, NULL),
(420, 'C7', 'Added new Student account using bearmillos@my.cspc.edu.ph ', '2024-09-27', '09:32:20', NULL, NULL),
(421, 'C7', 'Activated 2411311-bejey armillos RFID', '2024-09-27', '09:33:28', NULL, NULL),
(422, '2411300', 'Joined to BSIS-1A schedule', '2024-09-27', '09:33:48', NULL, NULL),
(423, 'C2', 'Activated 2411300-danica lausa RFID', '2024-09-27', '09:35:06', NULL, NULL),
(424, '2411311', 'Joined to BSIS-1A schedule', '2024-09-27', '09:35:13', NULL, NULL),
(425, 'C30', 'Added new Student account using shportugal@my.cspc.edu.ph ', '2024-09-27', '09:35:50', NULL, NULL),
(426, 'C7', 'Added new Student account using chbarra@my.cspc.edu.ph ', '2024-09-27', '09:36:34', NULL, NULL),
(427, 'C2', 'Added new Student account using hasario@my.cspc.edu.ph ', '2024-09-27', '09:36:41', NULL, NULL),
(428, '2411422', 'Joined to BSIS-1A schedule', '2024-09-27', '09:36:42', NULL, NULL),
(429, 'C7', 'Activated 2411313-Christian Jay Barra RFID', '2024-09-27', '09:37:07', NULL, NULL),
(430, 'C30', 'Activated 2411422-Shaira Jane Portugal RFID', '2024-09-27', '09:37:32', NULL, NULL),
(431, '2411313', 'Joined to BSIS-1A schedule', '2024-09-27', '09:37:51', NULL, NULL),
(432, 'C7', 'Added new Student account using jegava@my.cspc.edu.ph ', '2024-09-27', '09:39:40', NULL, NULL),
(433, '2411426', 'Joined to BSIS-1A schedule', '2024-09-27', '09:40:35', NULL, NULL),
(434, 'C7', 'Activated 2411373-jerico gava RFID', '2024-09-27', '09:40:44', NULL, NULL),
(435, 'C2', 'Activated 2411426-Hazel Sario RFID', '2024-09-27', '09:41:30', NULL, NULL),
(436, '2411373', 'Joined to BSIS-1A schedule', '2024-09-27', '09:43:02', NULL, NULL),
(437, 'C2', 'Added new Student account using daciron@my.cspc.edu.ph ', '2024-09-27', '09:43:12', NULL, NULL),
(438, 'C7', 'Added new Student account using joomayan@my.cspc.edu.ph ', '2024-09-27', '09:44:29', NULL, NULL),
(439, 'C30', 'Activated 2411422-Shaira Jane Portugal RFID', '2024-09-27', '09:44:31', NULL, NULL),
(440, '2411361', 'Joined to BSIS-1A schedule', '2024-09-27', '09:44:53', NULL, NULL),
(441, 'C7', 'Activated 2411412-joshua omayan RFID', '2024-09-27', '09:45:13', NULL, NULL),
(442, 'C30', 'Added new Student account using rasombrero@my.cspc.edu.ph ', '2024-09-27', '09:45:58', NULL, NULL),
(443, 'C2', 'Activated 2411361-Daniella Kim Ciron RFID', '2024-09-27', '09:45:59', NULL, NULL),
(444, '2411412', 'Joined to BSIS-1A schedule', '2024-09-27', '09:46:16', NULL, NULL),
(445, '2412841', 'Joined to BSIS-1A schedule', '2024-09-27', '09:46:48', NULL, NULL),
(446, 'C7', 'Added new Student account using harsalud@my.cspc.edu.ph ', '2024-09-27', '09:47:20', NULL, NULL),
(447, 'C7', 'Activated 2412841-Rache mae Sombrero RFID', '2024-09-27', '09:47:21', NULL, NULL),
(448, 'C7', 'Activated 2411027-harold salud RFID', '2024-09-27', '09:48:07', NULL, NULL),
(449, 'C2', 'Added new Student account using rhcacatian@my.cspc.edu.ph ', '2024-09-27', '09:48:14', NULL, NULL),
(450, 'C30', 'Added new Student account using macano@my.cspc.edu.ph ', '2024-09-27', '09:49:00', NULL, NULL),
(451, '2411027', 'Joined to BSIS-1A schedule', '2024-09-27', '09:49:14', NULL, NULL),
(452, '2411298', 'Joined to BSIS-1A schedule', '2024-09-27', '09:49:40', NULL, NULL),
(453, 'C7', 'Added new Student account using alocbian@my.cspc.edu.ph ', '2024-09-27', '09:50:07', NULL, NULL),
(454, 'C7', 'Added new Student account using clacepe@my.cspc.edu.ph ', '2024-09-27', '09:50:16', NULL, NULL),
(455, 'C30', 'Activated 2411298-Maria Danica Cano RFID', '2024-09-27', '09:50:20', NULL, NULL),
(456, 'C7', 'Activated 2411410-aldrin ocbian RFID', '2024-09-27', '09:50:53', NULL, NULL),
(457, '2412829', 'Joined to BSIS-1A schedule', '2024-09-27', '09:51:13', NULL, NULL),
(458, '2411317', 'Joined to BSIS-1A schedule', '2024-09-27', '09:51:31', NULL, NULL),
(459, '2411410', 'Joined to BSIS-1A schedule', '2024-09-27', '09:51:41', NULL, NULL),
(460, 'C2', 'Activated 2412829-Rhiane Scherazape Cacatian RFID', '2024-09-27', '09:52:24', NULL, NULL),
(461, 'C7', 'Added new Student account using paollet@my.cspc.edu.ph ', '2024-09-27', '09:52:57', NULL, NULL),
(462, 'C7', 'Activated 2411317-Clair Kirk Cepe RFID', '2024-09-27', '09:53:07', NULL, NULL),
(463, 'C7', 'Activated 2411411-paul jordan ollet RFID', '2024-09-27', '09:53:44', NULL, NULL),
(464, 'C30', 'Added new Student account using kapili@my.cspc.edu.ph ', '2024-09-27', '09:53:51', NULL, NULL),
(465, '2411416', 'Joined to BSIS-1A schedule', '2024-09-27', '09:54:19', NULL, NULL),
(466, 'C2', 'Added new Student account using shpasadilla@my.cspc.edu.ph ', '2024-09-27', '09:54:49', NULL, NULL),
(467, '2411418', 'Joined to BSIS-1A schedule', '2024-09-27', '09:55:35', NULL, NULL),
(468, 'C7', 'Activated 2411416-BRAYAN JAY ORTEGA RFID', '2024-09-27', '09:55:57', NULL, NULL),
(469, 'C30', 'Activated 2411418-Karl Clifford Pili RFID', '2024-09-27', '09:56:23', NULL, NULL),
(470, '2412831', 'Joined to BSIS-1A schedule', '2024-09-27', '09:56:27', NULL, NULL),
(471, '2411411', 'Joined to BSIS-1A schedule', '2024-09-27', '09:56:37', NULL, NULL),
(472, 'C7', 'Activated 2411309-Nathaniel John Dominic Abiog RFID', '2024-09-27', '09:57:16', NULL, NULL),
(473, 'C2', 'Activated 2412831-Shaine Lee Pasadilla RFID', '2024-09-27', '09:57:32', NULL, NULL),
(474, 'C7', 'Added new Student account using glsaberon@my.cspc.edu.ph ', '2024-09-27', '09:57:43', NULL, NULL),
(475, 'C30', 'Added new Student account using malagyap@my.cspc.edu.ph ', '2024-09-27', '09:57:50', NULL, NULL),
(476, 'C7', 'Activated 2411531-Glyka may Saberon RFID', '2024-09-27', '09:58:27', NULL, NULL),
(477, '2413001', 'Joined to BSIS-1A schedule', '2024-09-27', '09:58:47', NULL, NULL),
(478, '2411531', 'Joined to BSIS-1A schedule', '2024-09-27', '09:59:07', NULL, NULL),
(479, 'C7', 'Activated 2413001-marlo lagyap RFID', '2024-09-27', '09:59:08', NULL, NULL),
(480, 'C2', 'Added new Student account using ajbrazil@my.cspc.edu.ph ', '2024-09-27', '09:59:44', NULL, NULL),
(481, 'C7', 'Added new Student account using angorcine@my.cspc.edu.ph ', '2024-09-27', '10:00:08', NULL, NULL),
(482, 'C7', 'Activated 2411413-Angel Abby Orcine RFID', '2024-09-27', '10:00:40', NULL, NULL),
(483, '2411295', 'Joined to BSIS-1A schedule', '2024-09-27', '10:00:59', NULL, NULL),
(484, 'C30', 'Added new Student account using kycarbonell@my.cspc.edu.ph ', '2024-09-27', '10:01:34', NULL, NULL),
(485, '2411413', 'Joined to BSIS-1A schedule', '2024-09-27', '10:01:35', NULL, NULL),
(486, 'C2', 'Activated 2411295-AJ Joseph Brazil RFID', '2024-09-27', '10:01:58', NULL, NULL),
(487, 'C7', 'Added new Student account using relandong@my.cspc.edu.ph ', '2024-09-27', '10:02:50', NULL, NULL),
(488, '2411315', 'Joined to BSIS-1A schedule', '2024-09-27', '10:03:20', NULL, NULL),
(489, 'C30', 'Updated CCIS 101 schedule', '2024-09-27', '10:03:46', NULL, NULL),
(490, 'C2', 'Added new Student account using brfuentiveros@my.cspc.edu.ph ', '2024-09-27', '10:03:53', NULL, NULL),
(491, 'C7', 'Activated 2411406-rea may landong RFID', '2024-09-27', '10:03:54', NULL, NULL),
(492, '2411492', 'Joined to BSIS-1A schedule', '2024-09-27', '10:05:10', NULL, NULL),
(493, '2411406', 'Joined to BSIS-1A schedule', '2024-09-27', '10:05:17', NULL, NULL),
(494, 'C7', 'Activated 2411315-kyle lawrence carbonell RFID', '2024-09-27', '10:05:26', NULL, NULL),
(495, 'C7', 'Added new Student account using shplotado@my.cspc.edu.ph ', '2024-09-27', '10:05:58', NULL, NULL),
(496, 'C2', 'Activated 2411492-bryan fuentiveros RFID', '2024-09-27', '10:06:14', NULL, NULL),
(497, 'C7', 'Activated 2411421-sheree ann plotado RFID', '2024-09-27', '10:06:58', NULL, NULL),
(498, 'C30', 'Added new Student account using marcescolano@my.cspc.edu.ph ', '2024-09-27', '10:07:05', NULL, NULL),
(499, '2411299', 'Joined to BSIS-1A schedule', '2024-09-27', '10:07:58', NULL, NULL),
(500, 'C2', 'Added new Student account using katcailao@my.cspc.edu.ph ', '2024-09-27', '10:08:14', NULL, NULL),
(501, 'C7', 'Activated 2411299-marc ace escolano RFID', '2024-09-27', '10:08:22', NULL, NULL),
(502, 'C30', 'Added new Student account using reberdol@my.cspc.edu.ph ', '2024-09-27', '10:10:29', NULL, NULL),
(503, '2411421', 'Joined to BSIS-1A schedule', '2024-09-27', '10:10:43', NULL, NULL),
(504, '2411476', 'Joined to BSIS-1A schedule', '2024-09-27', '10:11:15', NULL, NULL),
(505, '2411484', 'Joined to BSIS-1A schedule', '2024-09-27', '10:11:38', NULL, NULL),
(506, 'C7', 'Activated 2411476-rendel berdol RFID', '2024-09-27', '10:11:39', NULL, NULL),
(507, 'C7', 'Added new Student account using adaliparo@my.cspc.edu.ph ', '2024-09-27', '10:11:58', NULL, NULL),
(508, 'C2', 'Activated 2411484-Kathlene Claire Cailao RFID', '2024-09-27', '10:12:22', NULL, NULL),
(509, 'C7', 'Activated 2411310-adrian aliparo RFID', '2024-09-27', '10:12:31', NULL, NULL),
(510, 'C30', 'Added new Student account using jebalaguer@my.cspc.edu.ph ', '2024-09-27', '10:13:21', NULL, NULL),
(511, '2411310', 'Joined to BSIS-1A schedule', '2024-09-27', '10:13:25', NULL, NULL),
(512, '2411312', 'Joined to BSIS-1A schedule', '2024-09-27', '10:14:04', NULL, NULL),
(513, 'C7', 'Activated 2411312-jerry balaguer RFID', '2024-09-27', '10:14:32', NULL, NULL),
(514, 'C30', 'Updated 2411312-Student attendance on 2024-09-27 10:13:54', '2024-09-27', '12:31:32', NULL, NULL),
(515, 'C30', 'Updated 2411310-Student attendance on 2024-09-27 10:12:50', '2024-09-27', '12:31:39', NULL, NULL),
(516, 'C30', 'Updated 2411484-Student attendance on 2024-09-27 10:12:03', '2024-09-27', '12:31:54', NULL, NULL),
(517, 'C30', 'Updated 2411476-Student attendance on 2024-09-27 10:11:05', '2024-09-27', '12:32:02', NULL, NULL),
(518, 'C30', 'Updated 2411421-Student attendance on 2024-09-27 10:10:05', '2024-09-27', '12:32:09', NULL, NULL),
(519, 'C30', 'Updated 2411299-Student attendance on 2024-09-27 10:07:43', '2024-09-27', '12:32:18', NULL, NULL),
(520, 'C30', 'Updated 2411492-Student attendance on 2024-09-27 10:05:52', '2024-09-27', '12:32:26', NULL, NULL),
(521, 'C30', 'Updated 2411295-Student attendance on 2024-09-27 10:04:26', '2024-09-27', '12:32:40', NULL, NULL),
(522, 'C30', 'Updated 2411315-Student attendance on 2024-09-27 10:04:56', '2024-09-27', '12:32:49', NULL, NULL),
(523, 'C30', 'Updated 2411413-Student attendance on 2024-09-27 10:04:13', '2024-09-27', '12:32:57', NULL, NULL),
(524, 'C30', 'Updated 2411531-Student attendance on 2024-09-27 09:58:34', '2024-09-27', '12:33:16', NULL, NULL),
(525, 'C30', 'Updated 2413001-Student attendance on 2024-09-27 09:58:27', '2024-09-27', '12:33:29', NULL, NULL),
(526, 'C30', 'Updated 2412831-Student attendance on 2024-09-27 09:57:10', '2024-09-27', '12:33:46', NULL, NULL),
(527, 'C30', 'Updated 2411411-Student attendance on 2024-09-27 09:56:42', '2024-09-27', '12:34:35', NULL, NULL),
(528, 'C30', 'Updated 2411426-Student attendance on 2024-09-27 09:41:26', '2024-09-27', '12:34:49', NULL, NULL),
(529, 'C30', 'Updated 2411373-Student attendance on 2024-09-27 09:42:26', '2024-09-27', '12:34:59', NULL, NULL),
(530, 'C30', 'Updated 2411309-Student attendance on 2024-09-27 09:56:34', '2024-09-27', '12:35:17', NULL, NULL),
(531, 'C30', 'Updated 2411422-Student attendance on 2024-09-27 09:43:51', '2024-09-27', '12:35:46', NULL, NULL),
(532, 'C30', 'Attempt update on 2411422 attendance last 2024-09-27 09:43:51', '2024-09-27', '12:35:47', NULL, NULL),
(533, 'C30', 'Updated 2411412-Student attendance on 2024-09-27 09:45:44', '2024-09-27', '12:35:59', NULL, NULL),
(534, 'C30', 'Updated 2411361-Student attendance on 2024-09-27 09:46:12', '2024-09-27', '12:36:10', NULL, NULL),
(535, 'C30', 'Attempt update on 2411361 attendance last 2024-09-27 09:46:12', '2024-09-27', '12:36:10', NULL, NULL),
(536, 'C30', 'Updated 2412841-Student attendance on 2024-09-27 09:47:02', '2024-09-27', '12:36:23', NULL, NULL),
(537, 'C30', 'Updated 2411027-Student attendance on 2024-09-27 09:49:06', '2024-09-27', '12:36:36', NULL, NULL),
(538, 'C30', 'Updated 2411298-Student attendance on 2024-09-27 09:49:41', '2024-09-27', '12:36:48', NULL, NULL),
(539, 'C30', 'Updated 2411418-Student attendance on 2024-09-27 09:56:18', '2024-09-27', '12:36:58', NULL, NULL),
(540, 'C30', 'Updated 2411416-Student attendance on 2024-09-27 09:55:17', '2024-09-27', '12:37:08', NULL, NULL),
(541, 'C30', 'Updated 2411317-Student attendance on 2024-09-27 09:52:31', '2024-09-27', '12:37:19', NULL, NULL),
(542, 'C30', 'Updated 2412829-Student attendance on 2024-09-27 09:52:13', '2024-09-27', '12:37:29', NULL, NULL),
(543, 'C30', 'Updated 2411410-Student attendance on 2024-09-27 09:51:51', '2024-09-27', '12:37:38', NULL, NULL),
(544, 'C30', 'Attempt update on kapili@my.cspc.edu.ph account : Student User ID - 2411418', '2024-09-27', '12:49:04', NULL, NULL),
(545, 'C7', 'Updated the profile password', '2024-09-27', '13:01:26', NULL, NULL),
(546, 'C30', 'Entered the ERP Laboratory', '2024-09-28', '17:05:29', NULL, NULL);
INSERT INTO `user_logs` (`idLogs`, `userID`, `action`, `date`, `time`, `created_at`, `updated_at`) VALUES
(547, 'C30', 'Entered the ERP Laboratory', '2024-09-28', '17:05:43', NULL, NULL),
(548, 'C30', 'Entered the ERP Laboratory', '2024-09-28', '17:21:43', NULL, NULL),
(549, 'C30', 'Entered the ERP Laboratory', '2024-09-28', '17:21:59', NULL, NULL),
(550, 'C30', 'Entered the ERP Laboratory', '2024-09-28', '17:23:39', NULL, NULL),
(551, 'C30', 'Entered the ERP Laboratory', '2024-09-28', '17:23:44', NULL, NULL),
(552, 'C30', 'Entered the ERP Laboratory', '2024-09-28', '17:25:52', NULL, NULL),
(553, 'C30', 'Deleted a user accounts: 221002158', '2024-09-29', '21:06:51', NULL, NULL),
(554, 'C30', 'Deleted a user accounts: 221006138', '2024-09-29', '21:06:51', NULL, NULL),
(555, 'C30', 'Deleted a user account', '2024-09-29', '21:18:40', NULL, NULL),
(556, 'C30', 'Deleted a user account', '2024-09-29', '21:18:53', NULL, NULL),
(557, 'C30', 'Deleted a user accounts: 221008331', '2024-09-29', '21:19:58', NULL, NULL),
(558, 'C30', 'Deleted an ERP Schedule -> test-test ', '2024-09-29', '23:51:11', NULL, NULL),
(559, 'C30', 'Deleted a Make Up Schedule -> test ', '2024-09-29', '23:51:20', NULL, NULL),
(560, 'C30', 'Updated IS 317 schedule', '2024-09-29', '23:52:45', NULL, NULL),
(561, 'C30', 'Updated ISEC 312 schedule', '2024-09-29', '23:53:14', NULL, NULL),
(562, 'C30', 'Updated ISEC 312 schedule', '2024-09-29', '23:53:37', NULL, NULL),
(563, 'C30', 'Added New Regular Schedule for ISEC 312', '2024-09-29', '23:54:55', NULL, NULL),
(564, 'C30', 'Updated ISA 317 schedule', '2024-09-29', '23:55:26', NULL, NULL),
(565, 'C30', 'Updated ISA 317 schedule', '2024-09-29', '23:55:38', NULL, NULL),
(566, 'C30', 'Updated ISA 317 schedule', '2024-09-29', '23:55:39', NULL, NULL),
(567, 'C30', 'Updated ISA 317 schedule', '2024-09-29', '23:56:12', NULL, NULL),
(568, 'C30', 'Updated ISA 317 schedule', '2024-09-29', '23:56:13', NULL, NULL),
(569, 'C30', 'Updated ISA 317 schedule', '2024-09-29', '23:56:34', NULL, NULL),
(570, 'C30', 'Updated CCIS 101 schedule', '2024-09-29', '23:57:28', NULL, NULL),
(571, 'C30', 'Updated CCS 101 schedule', '2024-09-29', '23:57:29', NULL, NULL),
(572, 'C30', 'Updated CCS 101 schedule', '2024-09-29', '23:57:29', NULL, NULL),
(573, 'C30', 'Updated CCS 101 schedule', '2024-09-29', '23:59:32', NULL, NULL),
(574, 'C30', 'Updated ISA 211 schedule', '2024-09-29', '23:59:32', NULL, NULL),
(575, 'C30', 'Updated ISA 211 schedule', '2024-09-30', '00:00:09', NULL, NULL),
(576, 'C30', 'Updated CCS 101 schedule', '2024-09-30', '00:00:10', NULL, NULL),
(577, 'C30', 'Updated CCS 101 schedule', '2024-09-30', '00:01:41', NULL, NULL),
(578, 'C30', 'Updated CCS 105 schedule', '2024-09-30', '00:02:59', NULL, NULL),
(579, 'C30', 'Updated neo@cspc.edu.ph account : Faculty User ID - Inst5', '2024-09-30', '00:03:54', NULL, NULL),
(580, 'C30', 'Added New Regular Schedule for ISEC 312', '2024-09-30', '00:08:55', NULL, NULL),
(581, 'C30', 'Updated IS 317 schedule', '2024-09-30', '00:09:30', NULL, NULL),
(582, 'C30', 'Updated ISEC 312 schedule', '2024-09-30', '00:10:24', NULL, NULL),
(583, 'C30', 'Added New Regular Schedule for CCS 104', '2024-09-30', '00:11:44', NULL, NULL),
(584, 'C30', 'Updated CCIS 104 schedule', '2024-09-30', '00:12:09', NULL, NULL),
(585, 'C30', 'Updated CCIS 104 schedule', '2024-09-30', '00:12:33', NULL, NULL),
(586, 'C30', 'Updated mac@cspc.edu.ph account : Faculty User ID - Inst1', '2024-09-30', '00:14:33', NULL, NULL),
(587, 'C30', 'Updated email from ralorzano@my.cspc.edu.ph to ralorzano@cspc.edu.ph', '2024-09-30', '00:47:29', NULL, NULL),
(588, 'C21105789', 'Joined to BSIS-1A schedule', '2024-09-30', '08:25:31', NULL, NULL),
(589, 'C30', 'Updated ID number from C30 to c30', '2024-09-30', '09:59:00', NULL, NULL),
(590, 'C30', 'Updated ID number from c30 to C30', '2024-09-30', '09:59:09', NULL, NULL),
(591, 'C30', 'Updated mdbelardo@cspc.edu.ph account : Admin User ID - 20200220012', '2024-09-30', '09:59:56', NULL, NULL),
(592, 'C21105789', 'Updated ID number from CSTUDENT to C21105789', '2024-09-30', '10:31:45', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendances`
--
ALTER TABLE `attendances`
  ADD PRIMARY KEY (`attendanceID`),
  ADD KEY `attendances_userid_foreign` (`userID`),
  ADD KEY `attendances_classid_foreign` (`classID`);

--
-- Indexes for table `class_lists`
--
ALTER TABLE `class_lists`
  ADD PRIMARY KEY (`classID`),
  ADD UNIQUE KEY `class_lists_scheduleid_unique` (`scheduleID`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`group_id`);

--
-- Indexes for table `group_members`
--
ALTER TABLE `group_members`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idNumber` (`idNumber`),
  ADD KEY `group_id` (`group_id`);

--
-- Indexes for table `labs`
--
ALTER TABLE `labs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lab_occupancy_logs`
--
ALTER TABLE `lab_occupancy_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_lab_id` (`lab_id`),
  ADD KEY `fk_user_id` (`user_id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `group_id` (`group_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `rfid_accounts`
--
ALTER TABLE `rfid_accounts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `rfid_accounts_rfid_code_unique` (`RFID_Code`);

--
-- Indexes for table `rfid_temps`
--
ALTER TABLE `rfid_temps`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `rfid_temps_rfid_code_unique` (`RFID_Code`);

--
-- Indexes for table `schedules`
--
ALTER TABLE `schedules`
  ADD PRIMARY KEY (`scheduleID`),
  ADD UNIQUE KEY `schedules_scheduletitle_unique` (`scheduleTitle`),
  ADD KEY `50` (`userID`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `student_masterlists`
--
ALTER TABLE `student_masterlists`
  ADD PRIMARY KEY (`MIT_ID`),
  ADD KEY `student_masterlists_userid_foreign` (`userID`),
  ADD KEY `student_masterlists_classid_foreign` (`classID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD UNIQUE KEY `users_idnumber_unique` (`idNumber`),
  ADD UNIQUE KEY `users_password_unique` (`password`),
  ADD UNIQUE KEY `users_rfid_code_unique` (`RFID_Code`);

--
-- Indexes for table `user_logs`
--
ALTER TABLE `user_logs`
  ADD PRIMARY KEY (`idLogs`),
  ADD KEY `user_logs_userid_foreign` (`userID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendances`
--
ALTER TABLE `attendances`
  MODIFY `attendanceID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- AUTO_INCREMENT for table `class_lists`
--
ALTER TABLE `class_lists`
  MODIFY `classID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `group_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `group_members`
--
ALTER TABLE `group_members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `labs`
--
ALTER TABLE `labs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `lab_occupancy_logs`
--
ALTER TABLE `lab_occupancy_logs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `rfid_accounts`
--
ALTER TABLE `rfid_accounts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `rfid_temps`
--
ALTER TABLE `rfid_temps`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT for table `schedules`
--
ALTER TABLE `schedules`
  MODIFY `scheduleID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `student_masterlists`
--
ALTER TABLE `student_masterlists`
  MODIFY `MIT_ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;

--
-- AUTO_INCREMENT for table `user_logs`
--
ALTER TABLE `user_logs`
  MODIFY `idLogs` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=593;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attendances`
--
ALTER TABLE `attendances`
  ADD CONSTRAINT `attendances_classid_foreign` FOREIGN KEY (`classID`) REFERENCES `class_lists` (`classID`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `attendances_userid_foreign` FOREIGN KEY (`userID`) REFERENCES `users` (`idNumber`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `class_lists`
--
ALTER TABLE `class_lists`
  ADD CONSTRAINT `class_lists_scheduleid_foreign` FOREIGN KEY (`scheduleID`) REFERENCES `schedules` (`scheduleID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `group_members`
--
ALTER TABLE `group_members`
  ADD CONSTRAINT `group_members_ibfk_1` FOREIGN KEY (`idNumber`) REFERENCES `users` (`idNumber`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `group_members_ibfk_2` FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `lab_occupancy_logs`
--
ALTER TABLE `lab_occupancy_logs`
  ADD CONSTRAINT `fk_lab_id` FOREIGN KEY (`lab_id`) REFERENCES `labs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `fk_messages_group_id` FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`) ON DELETE CASCADE;

--
-- Constraints for table `rfid_accounts`
--
ALTER TABLE `rfid_accounts`
  ADD CONSTRAINT `rfid_accounts_rfid_code_foreign` FOREIGN KEY (`RFID_Code`) REFERENCES `users` (`RFID_Code`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `schedules`
--
ALTER TABLE `schedules`
  ADD CONSTRAINT `50` FOREIGN KEY (`userID`) REFERENCES `users` (`idNumber`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `student_masterlists`
--
ALTER TABLE `student_masterlists`
  ADD CONSTRAINT `student_masterlists_classid_foreign` FOREIGN KEY (`classID`) REFERENCES `class_lists` (`classID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `student_masterlists_userid_foreign` FOREIGN KEY (`userID`) REFERENCES `users` (`idNumber`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_logs`
--
ALTER TABLE `user_logs`
  ADD CONSTRAINT `user_logs_userid_foreign` FOREIGN KEY (`userID`) REFERENCES `users` (`idNumber`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
