-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 04, 2024 at 03:23 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

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
  `userID` varchar(50) DEFAULT NULL,
  `classID` bigint(20) UNSIGNED DEFAULT NULL,
  `date` date NOT NULL,
  `time` time DEFAULT NULL,
  `remark` varchar(50) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `attendances`
--

INSERT INTO `attendances` (`attendanceID`, `userID`, `classID`, `date`, `time`, `remark`, `deleted_at`, `created_at`, `updated_at`) VALUES
(2, '221008331', NULL, '2024-09-10', '17:39:39', 'Late', NULL, NULL, NULL),
(3, '221002158', NULL, '2024-09-10', '17:41:19', 'Late', NULL, NULL, NULL),
(4, '221007546', NULL, '2024-09-10', '17:42:42', 'Late', NULL, NULL, NULL),
(5, '221007546', NULL, '2024-09-10', '17:42:49', 'Late', NULL, NULL, NULL),
(6, '221007901', NULL, '2024-09-10', '17:48:25', 'Late', NULL, NULL, NULL),
(7, '221008518', NULL, '2024-09-10', '17:50:44', 'Late', NULL, NULL, NULL),
(8, '221006878', NULL, '2024-09-10', '17:55:59', 'Late', NULL, NULL, NULL),
(9, 'c21101571', NULL, '2024-09-10', '17:56:21', 'Late', NULL, NULL, NULL),
(10, 'C21101044', NULL, '2024-09-10', '17:56:45', 'Late', NULL, NULL, NULL),
(11, '221007264', NULL, '2024-09-10', '17:57:11', 'Late', NULL, NULL, NULL),
(14, 'C21102368', NULL, '2024-09-12', '14:28:45', 'Late', NULL, NULL, NULL),
(15, 'C21101147', NULL, '2024-09-12', '14:31:52', 'Late', NULL, NULL, NULL),
(16, 'C21100467', NULL, '2024-09-12', '16:05:26', 'Late', NULL, NULL, NULL),
(17, 'COS Admin 147', NULL, '2024-09-14', '07:56:11', 'Present', NULL, NULL, '2024-09-20 16:17:57'),
(18, '221001567', NULL, '2024-09-14', '08:04:16', 'Late', NULL, NULL, NULL),
(19, '221001464', NULL, '2024-09-14', '08:05:27', 'Late', NULL, NULL, NULL),
(20, '221001274', NULL, '2024-09-14', '08:10:37', 'Late', NULL, NULL, NULL),
(21, '221001412', NULL, '2024-09-14', '08:11:53', 'Late', NULL, NULL, NULL),
(22, '221001164', NULL, '2024-09-14', NULL, 'Absent', NULL, NULL, NULL),
(23, '221001251', NULL, '2024-09-14', NULL, 'Absent', NULL, NULL, NULL),
(24, '221001410', NULL, '2024-09-14', NULL, 'Absent', NULL, NULL, NULL),
(25, '221001280', NULL, '2024-09-14', NULL, 'Absent', NULL, NULL, NULL),
(26, '221001145', NULL, '2024-09-14', NULL, 'Absent', NULL, NULL, NULL),
(27, '221001135', NULL, '2024-09-14', NULL, 'Absent', NULL, NULL, NULL),
(28, '221001155', NULL, '2024-09-14', NULL, 'Absent', NULL, NULL, NULL),
(29, '221001122', NULL, '2024-09-14', NULL, 'Absent', NULL, NULL, NULL),
(30, '221001332', NULL, '2024-09-14', NULL, 'Absent', NULL, NULL, NULL),
(31, '221001290', NULL, '2024-09-14', NULL, 'Absent', NULL, NULL, NULL),
(32, '221001321', NULL, '2024-09-14', NULL, 'Absent', NULL, NULL, NULL),
(33, '221001334', NULL, '2024-09-14', NULL, 'Absent', NULL, NULL, NULL),
(34, '1600204', NULL, '2024-09-14', '12:49:01', 'Present', NULL, NULL, '2024-09-20 16:18:06'),
(35, '231003017', NULL, '2024-09-14', '12:49:09', 'Late', NULL, NULL, NULL),
(36, '231004601', NULL, '2024-09-14', '12:50:11', 'Late', NULL, NULL, NULL),
(37, '231005377', NULL, '2024-09-14', '12:50:45', 'Late', NULL, NULL, NULL),
(38, '231004571', NULL, '2024-09-14', '12:51:03', 'Late', NULL, NULL, NULL),
(39, '231003006', NULL, '2024-09-14', '12:53:37', 'Late', NULL, NULL, NULL),
(40, '231003025', NULL, '2024-09-14', '12:54:04', 'Late', NULL, NULL, NULL),
(41, '231005316', NULL, '2024-09-14', '12:54:18', 'Late', NULL, NULL, NULL),
(42, '231001906', NULL, '2024-09-14', '12:54:35', 'Late', NULL, NULL, NULL),
(43, '231003014', NULL, '2024-09-14', '12:54:56', 'Late', NULL, NULL, NULL),
(44, '231003701', NULL, '2024-09-14', '12:55:08', 'Late', NULL, NULL, NULL),
(45, '231003121', NULL, '2024-09-14', '12:55:21', 'Late', NULL, NULL, NULL),
(46, '231002997', NULL, '2024-09-14', '12:55:40', 'Late', NULL, NULL, NULL),
(47, '231002999', NULL, '2024-09-14', '12:55:49', 'Late', NULL, NULL, NULL),
(48, '231005214', NULL, '2024-09-14', '12:58:41', 'Late', NULL, NULL, NULL),
(49, '231002374', NULL, '2024-09-14', '12:59:27', 'Late', NULL, NULL, NULL),
(50, '231004405', NULL, '2024-09-14', '12:59:49', 'Late', NULL, NULL, NULL),
(51, '231002375', NULL, '2024-09-14', '13:00:00', 'Late', NULL, NULL, NULL),
(52, '231004940', NULL, '2024-09-14', '13:00:13', 'Late', NULL, NULL, NULL),
(53, '231005327', NULL, '2024-09-14', '13:02:56', 'Late', NULL, NULL, NULL),
(54, '231003292', NULL, '2024-09-14', '13:04:35', 'Late', NULL, NULL, NULL),
(55, '221008223', NULL, '2024-09-14', '13:04:47', 'Late', NULL, NULL, NULL),
(56, '122345666', NULL, '2024-09-14', '13:41:32', 'Present', NULL, NULL, '2024-09-20 16:17:46'),
(57, '2412105', NULL, '2024-09-14', '13:44:45', 'Late', NULL, NULL, NULL),
(58, '2411305', NULL, '2024-09-14', '13:45:53', 'Late', NULL, NULL, NULL),
(59, '2412825', NULL, '2024-09-14', '13:47:04', 'Late', NULL, NULL, NULL),
(60, '2411419', NULL, '2024-09-14', '13:48:04', 'Late', NULL, NULL, NULL),
(61, '2411403', NULL, '2024-09-14', '13:48:14', 'Late', NULL, NULL, NULL),
(62, '2412839', NULL, '2024-09-14', '13:49:06', 'Late', NULL, NULL, NULL),
(63, '2411423', NULL, '2024-09-14', '13:49:51', 'Late', NULL, NULL, NULL),
(64, '2411408', NULL, '2024-09-14', '13:49:57', 'Late', NULL, NULL, NULL),
(65, '2412840', NULL, '2024-09-14', '13:50:15', 'Late', NULL, NULL, NULL),
(66, '2411425', NULL, '2024-09-14', '13:51:25', 'Late', NULL, NULL, NULL),
(67, '2411294', NULL, '2024-09-14', '13:52:58', 'Late', NULL, NULL, NULL),
(68, '2411273', NULL, '2024-09-14', '13:53:10', 'Late', NULL, NULL, NULL),
(69, '2411486', NULL, '2024-09-14', '13:54:55', 'Late', NULL, NULL, NULL),
(70, '2411307', NULL, '2024-09-14', '13:55:42', 'Late', NULL, NULL, NULL),
(71, '24113118', NULL, '2024-09-14', '13:57:22', 'Late', NULL, NULL, NULL),
(73, '872216887920', NULL, '2024-09-18', '15:18:49', 'Present', NULL, NULL, '2024-09-20 16:17:37'),
(74, '231003011', NULL, '2024-09-18', '15:31:07', 'Late', NULL, NULL, NULL),
(75, '231003994', NULL, '2024-09-18', '15:31:55', 'Late', NULL, NULL, NULL),
(76, '231003237', NULL, '2024-09-18', '15:35:47', 'Late', NULL, NULL, NULL),
(77, '231003296', NULL, '2024-09-18', '15:36:07', 'Late', NULL, NULL, NULL),
(78, '231002370', NULL, '2024-09-18', '15:36:32', 'Late', NULL, NULL, NULL),
(79, '2310033277', NULL, '2024-09-18', '15:39:22', 'Late', NULL, NULL, NULL),
(80, '231003008', NULL, '2024-09-18', '15:40:43', 'Late', NULL, NULL, NULL),
(81, '231003036', NULL, '2024-09-18', '15:41:57', 'Late', NULL, NULL, NULL),
(82, '231003267', NULL, '2024-09-18', '15:43:25', 'Late', NULL, NULL, NULL),
(83, '1200287', NULL, '2024-09-18', '15:45:30', 'Late', NULL, NULL, NULL),
(84, '231003189', NULL, '2024-09-18', '15:50:26', 'Late', NULL, NULL, NULL),
(85, '231000252', NULL, '2024-09-18', '15:50:47', 'Late', NULL, NULL, NULL),
(86, '231003294', NULL, '2024-09-18', '15:51:30', 'Late', NULL, NULL, NULL),
(87, '231002366', NULL, '2024-09-18', '15:53:54', 'Late', NULL, NULL, NULL),
(88, '23103932', NULL, '2024-09-18', '15:55:02', 'Late', NULL, NULL, NULL),
(89, '231004105', NULL, '2024-09-18', '15:55:41', 'Late', NULL, NULL, NULL),
(90, '221008432', NULL, '2024-09-18', '15:56:37', 'Late', NULL, NULL, NULL),
(91, '231003993', NULL, '2024-09-18', '15:57:40', 'Late', NULL, NULL, NULL),
(92, '231003180', NULL, '2024-09-18', '15:58:22', 'Late', NULL, NULL, NULL),
(93, '231003037', NULL, '2024-09-18', '15:59:15', 'Late', NULL, NULL, NULL),
(94, '21003034', NULL, '2024-09-18', '15:59:21', 'Late', NULL, NULL, NULL),
(95, '231004361', NULL, '2024-09-18', NULL, 'Absent', NULL, NULL, NULL),
(96, '231003023', NULL, '2024-09-18', NULL, 'Absent', NULL, NULL, NULL),
(97, '231003810', NULL, '2024-09-18', NULL, 'Absent', NULL, NULL, NULL),
(98, '231003233', NULL, '2024-09-18', NULL, 'Absent', NULL, NULL, NULL),
(99, '231002998', NULL, '2024-09-18', NULL, 'Absent', NULL, NULL, NULL),
(100, '231004032', NULL, '2024-09-18', NULL, 'Absent', NULL, NULL, NULL),
(101, '231002368', NULL, '2024-09-18', NULL, 'Absent', NULL, NULL, NULL),
(102, '231004127', NULL, '2024-09-18', NULL, 'Absent', NULL, NULL, NULL),
(106, '221007722', NULL, '2024-09-19', NULL, 'Absent', NULL, NULL, NULL),
(107, '221007546', NULL, '2024-09-19', NULL, 'Absent', NULL, NULL, NULL),
(108, '221006178', NULL, '2024-09-19', NULL, 'Absent', NULL, NULL, NULL),
(109, 'C20100603', NULL, '2024-09-19', NULL, 'Absent', NULL, NULL, NULL),
(110, '221006878', NULL, '2024-09-19', NULL, 'Absent', NULL, NULL, NULL),
(111, '221008331', NULL, '2024-09-19', NULL, 'Absent', NULL, NULL, NULL),
(112, '221007264', NULL, '2024-09-19', NULL, 'Absent', NULL, NULL, NULL),
(113, '221006666', NULL, '2024-09-19', NULL, 'Absent', NULL, NULL, NULL),
(114, '221007558', NULL, '2024-09-19', NULL, 'Absent', NULL, NULL, NULL),
(115, 'c21101571', NULL, '2024-09-19', NULL, 'Absent', NULL, NULL, NULL),
(116, '221008518', NULL, '2024-09-19', NULL, 'Absent', NULL, NULL, NULL),
(117, 'C21101044', NULL, '2024-09-19', NULL, 'Absent', NULL, NULL, NULL),
(118, '221007491', NULL, '2024-09-19', NULL, 'Absent', NULL, NULL, NULL),
(119, '221002158', NULL, '2024-09-19', NULL, 'Absent', NULL, NULL, NULL),
(120, '221007901', NULL, '2024-09-19', NULL, 'Absent', NULL, NULL, NULL),
(121, 'C21103926', NULL, '2024-09-19', NULL, 'Absent', NULL, NULL, NULL),
(122, 'C21102627', NULL, '2024-09-19', NULL, 'Absent', NULL, NULL, NULL),
(123, 'C21101205', NULL, '2024-09-19', NULL, 'Absent', NULL, NULL, NULL),
(124, 'C21101147', NULL, '2024-09-19', NULL, 'Absent', NULL, NULL, NULL),
(125, 'C21102368', NULL, '2024-09-19', NULL, 'Absent', NULL, NULL, NULL),
(126, 'C21103064', NULL, '2024-09-19', NULL, 'Absent', NULL, NULL, NULL),
(127, 'C21102341', NULL, '2024-09-19', NULL, 'Absent', NULL, NULL, NULL),
(128, 'C21100467', NULL, '2024-09-19', NULL, 'Absent', NULL, NULL, NULL),
(130, '221006141', NULL, '2024-09-19', '11:48:40', 'Present', NULL, NULL, '2024-09-19 04:07:15'),
(131, '221001068', NULL, '2024-09-19', '11:49:27', 'Late', NULL, NULL, NULL),
(132, '221002183', NULL, '2024-09-19', '12:11:43', 'Late', NULL, NULL, NULL),
(133, '221002200', NULL, '2024-09-19', '12:12:20', 'Late', NULL, NULL, NULL),
(134, '221002191', NULL, '2024-09-19', '12:13:12', 'Late', NULL, NULL, NULL),
(135, '221002008', NULL, '2024-09-19', '12:13:18', 'Late', NULL, NULL, NULL),
(136, '2022080119', NULL, '2024-09-19', '12:13:38', 'Present', NULL, NULL, '2024-09-20 16:17:29'),
(137, '221003084', NULL, '2024-09-19', '12:13:50', 'Late', NULL, NULL, NULL),
(138, '221007141', NULL, '2024-09-19', '12:13:55', 'Late', NULL, NULL, NULL),
(139, '221002249', NULL, '2024-09-19', NULL, 'Absent', NULL, NULL, NULL),
(140, '221001069', NULL, '2024-09-19', NULL, 'Absent', NULL, NULL, NULL),
(141, NULL, NULL, '2024-09-19', '13:53:14', 'Present', NULL, NULL, '2024-09-20 16:17:19'),
(142, NULL, NULL, '2024-09-19', '13:57:58', 'Late', NULL, NULL, NULL),
(159, NULL, NULL, '2024-09-21', '13:21:45', 'Present', NULL, NULL, NULL),
(160, 'cstudent', NULL, '2024-09-21', '13:21:56', 'Present', NULL, NULL, NULL),
(161, 'C10', 2, '2024-06-05', '18:28:50', 'Present', NULL, NULL, NULL),
(162, 'C10', 2, '2024-06-05', '18:28:50', 'Present', NULL, NULL, NULL),
(163, 'C10', 2, '2024-06-10', '20:45:35', 'Late', NULL, NULL, NULL),
(164, 'C14', 3, '2024-06-10', '20:45:35', 'Present', NULL, NULL, NULL),
(165, 'C20', 4, '2024-11-23', '20:45:35', 'Late', NULL, NULL, NULL),
(166, 'C14', 3, '2024-11-29', '20:45:35', 'Late', NULL, NULL, NULL),
(167, 'C20', 4, '2024-11-30', '20:45:35', 'Present', NULL, NULL, NULL),
(168, 'C10', 2, '2024-06-05', '18:28:50', 'Late', NULL, NULL, NULL),
(169, 'C20', 4, '2024-06-10', '20:45:35', 'Absent', NULL, NULL, NULL),
(170, 'C14', 3, '2024-06-10', '20:45:35', 'Absent', NULL, NULL, NULL),
(171, 'C14', 3, '2024-11-23', '20:45:35', 'Absent', NULL, NULL, NULL),
(172, 'C20', 4, '2024-11-29', '20:45:35', 'Absent', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `class_lists`
--

CREATE TABLE `class_lists` (
  `classID` bigint(20) UNSIGNED NOT NULL,
  `scheduleID` bigint(20) UNSIGNED NOT NULL,
  `enrollmentKey` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `class_lists`
--

INSERT INTO `class_lists` (`classID`, `scheduleID`, `enrollmentKey`, `created_at`, `updated_at`) VALUES
(2, 4, '12345', '2024-11-26 07:21:02', '2024-11-26 07:21:02'),
(3, 8, '12', NULL, NULL),
(4, 9, '21', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(4, '2024_06_22_052730_create_attendances_table', 1),
(5, '2024_06_23_114935_create_student_masterlists_table', 1),
(6, '2024_06_28_152207_create_user_logs_table', 1),
(7, '2024_07_30_035535_create_rfid_temps_table', 1),
(8, '2024_08_01_080258_create_rfid_accounts_table', 1),
(15, '2024_10_19_194124_create_schedule_notes_table', 4),
(19, '2024_06_22_052729_create_class_lists_table', 6),
(20, '2024_06_21_114742_create_schedules_table', 7);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(50) NOT NULL,
  `token` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rfid_accounts`
--

CREATE TABLE `rfid_accounts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `RFID_Code` varchar(50) NOT NULL,
  `RFID_Status` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `rfid_accounts`
--

INSERT INTO `rfid_accounts` (`id`, `RFID_Code`, `RFID_Status`, `created_at`, `updated_at`) VALUES
(1, '288916497440', 'Activated', '2024-09-10 17:20:31', '2024-09-19 05:55:09'),
(2, '213934869617', 'Activated', '2024-09-11 01:28:52', '2024-09-20 11:23:13'),
(3, '674153031467', 'Activated', '2024-09-10 17:32:15', '2024-09-10 17:32:15'),
(4, '526378924204', 'Activated', '2024-09-11 01:41:21', '2024-09-11 01:41:21'),
(5, '55762675622', 'Activated', '2024-09-11 01:42:21', '2024-09-11 01:42:21'),
(6, '879658329948', 'Activated', '2024-09-11 01:46:02', '2024-09-11 01:46:02'),
(7, '882361772874', 'Activated', '2024-09-11 01:46:47', '2024-09-11 01:46:47'),
(8, '127126088673', 'Activated', '2024-09-11 01:47:32', '2024-09-11 01:47:32'),
(9, '810149406545', 'Activated', '2024-09-11 01:49:36', '2024-09-11 01:49:36'),
(10, '1020396734611', 'Activated', '2024-09-10 17:50:47', '2024-09-10 17:50:47'),
(11, '809666537274', 'Activated', '2024-09-11 01:58:56', '2024-09-11 01:58:56'),
(12, '944938674050', 'Activated', '2024-09-11 01:59:21', '2024-09-11 01:59:21'),
(13, '200503744291', 'Activated', '2024-09-11 01:56:10', '2024-09-11 01:56:10'),
(14, '265899879200', 'Activated', '2024-09-11 02:00:03', '2024-09-11 02:00:03'),
(15, '258547443529', 'Activated', '2024-09-11 01:57:27', '2024-09-11 01:57:27'),
(16, '814330555373', 'Activated', '2024-09-12 06:26:57', '2024-09-12 06:26:57'),
(17, '127978384614', 'Activated', '2024-09-12 06:27:46', '2024-09-12 06:27:46'),
(18, '1018492365572', 'Activated', '2024-09-12 06:28:11', '2024-09-12 06:28:11'),
(19, '675347573585', 'Activated', '2024-09-12 06:34:51', '2024-09-12 06:34:51'),
(20, '1085114410853', 'Activated', '2024-09-12 08:08:33', '2024-09-12 08:08:33'),
(21, '872574190105', 'Activated', '2024-09-13 23:57:13', '2024-09-13 23:57:13'),
(22, '53347215165', 'Activated', '2024-09-13 23:59:10', '2024-09-13 23:59:10'),
(23, '54837897144', 'Activated', '2024-09-13 23:59:45', '2024-09-13 23:59:45'),
(24, '464036620093', 'Activated', '2024-09-14 00:09:57', '2024-09-14 00:09:57'),
(25, '524885096481', 'Activated', '2024-09-14 00:10:32', '2024-09-14 00:10:32'),
(26, '740445308406', 'Activated', '2024-09-14 00:11:56', '2024-09-14 00:11:56'),
(27, '62424504091', 'Activated', '2024-09-14 04:34:25', '2024-09-14 04:34:25'),
(28, '681384040138', 'Activated', '2024-09-14 04:35:15', '2024-09-14 04:35:15'),
(29, '747772335959', 'Activated', '2024-09-14 04:35:47', '2024-09-14 04:35:47'),
(30, '474133265147', 'Activated', '2024-09-14 04:36:12', '2024-09-14 04:36:12'),
(31, '129386764395', 'Activated', '2024-09-14 04:36:36', '2024-09-14 04:36:36'),
(32, '678319451109', 'Activated', '2024-09-14 04:37:39', '2024-09-14 04:37:39'),
(33, '542100969378', 'Activated', '2024-09-14 04:38:07', '2024-09-14 04:38:07'),
(34, '540223629830', 'Activated', '2024-09-14 04:38:38', '2024-09-14 04:38:38'),
(35, '1093957015287', 'Activated', '2024-09-14 04:39:03', '2024-09-14 04:39:03'),
(36, '679998740367', 'Activated', '2024-09-14 04:39:25', '2024-09-14 04:39:25'),
(37, '888924559462', 'Activated', '2024-09-14 04:39:50', '2024-09-14 04:39:50'),
(38, '472880142075', 'Activated', '2024-09-14 04:40:42', '2024-09-14 04:40:42'),
(39, '957691615149', 'Activated', '2024-09-14 04:41:03', '2024-09-14 04:41:03'),
(40, '680500549190', 'Activated', '2024-09-14 04:41:24', '2024-09-14 04:41:24'),
(41, '1023538911066', 'Activated', '2024-09-14 04:41:44', '2024-09-14 04:41:44'),
(42, '180766963784', 'Activated', '2024-09-14 04:42:12', '2024-09-14 04:42:12'),
(43, '200300451340', 'Activated', '2024-09-14 04:42:36', '2024-09-14 04:42:36'),
(44, '131947910980', 'Activated', '2024-09-14 04:43:00', '2024-09-14 04:43:00'),
(45, '956951844737', 'Activated', '2024-09-14 04:43:26', '2024-09-14 04:43:26'),
(46, '541714569149', 'Activated', '2024-09-14 04:43:54', '2024-09-14 04:43:54'),
(47, '1001810727593', 'Activated', '2024-09-14 04:44:21', '2024-09-14 04:44:21'),
(48, '63129343782', 'Activated', '2024-09-14 04:44:49', '2024-09-14 04:44:49'),
(49, '749048190558', 'Activated', '2024-09-14 04:45:13', '2024-09-14 04:45:13'),
(50, '681132709618', 'Activated', '2024-09-14 04:45:41', '2024-09-14 04:45:41'),
(51, '41264321163', 'Activated', '2024-09-14 04:46:10', '2024-09-14 04:46:10'),
(52, '266351040424', 'Activated', '2024-09-14 04:46:52', '2024-09-14 04:46:52'),
(53, '524313819160', 'Activated', '2024-09-14 04:49:39', '2024-09-14 04:49:39'),
(54, '809227315078', 'Activated', '2024-09-14 04:50:15', '2024-09-14 04:50:15'),
(55, '263222668307', 'Activated', '2024-09-14 04:51:28', '2024-09-14 04:51:28'),
(56, '682376058592', 'Activated', '2024-09-14 04:52:47', '2024-09-14 04:52:47'),
(57, '132386739783', 'Activated', '2024-09-14 04:53:16', '2024-09-14 04:53:16'),
(58, '1077945301107', 'Activated', '2024-09-14 05:06:58', '2024-09-14 05:06:58'),
(59, '941605552757', 'Activated', '2024-09-14 05:34:43', '2024-09-14 05:34:43'),
(60, '872038630093', 'Activated', '2024-09-14 05:35:10', '2024-09-14 05:35:10'),
(61, '875215356521', 'Activated', '2024-09-14 05:35:44', '2024-09-14 05:35:44'),
(62, '872023229155', 'Activated', '2024-09-14 05:36:10', '2024-09-14 05:36:10'),
(63, '874811458100', 'Activated', '2024-09-14 05:36:48', '2024-09-14 05:36:48'),
(64, '874643751481', 'Activated', '2024-09-14 05:37:36', '2024-09-14 05:37:36'),
(65, '875112923714', 'Activated', '2024-09-14 05:38:07', '2024-09-14 05:38:07'),
(66, '875341185761', 'Activated', '2024-09-14 05:39:01', '2024-09-14 05:39:01'),
(67, '606971440290', 'Activated', '2024-09-14 05:44:01', '2024-09-14 05:44:01'),
(68, '874061923053', 'Activated', '2024-09-14 05:46:03', '2024-09-14 05:46:03'),
(69, '873809019433', 'Activated', '2024-09-14 05:46:48', '2024-09-14 05:46:48'),
(70, '875106894566', 'Activated', '2024-09-14 05:49:00', '2024-09-14 05:49:00'),
(71, '873143763566', 'Activated', '2024-09-14 05:50:45', '2024-09-14 05:50:45'),
(72, '874444259873', 'Activated', '2024-09-14 05:51:33', '2024-09-14 05:51:33'),
(73, '942400111198', 'Activated', '2024-09-14 05:52:09', '2024-09-14 05:52:09'),
(74, '875339285198', 'Activated', '2024-09-14 05:52:31', '2024-09-14 05:52:31'),
(75, '873260352068', 'Activated', '2024-09-14 05:55:27', '2024-09-14 05:55:27'),
(76, '876063457987', 'Activated', '2024-09-14 05:57:40', '2024-09-14 05:57:40'),
(77, '872216887920', 'Activated', '2024-09-18 07:21:45', '2024-09-18 07:21:45'),
(78, '407347025433', 'Activated', '2024-09-18 07:27:48', '2024-09-18 07:27:48'),
(79, '819916199903', 'Activated', '2024-09-18 07:28:45', '2024-09-18 07:28:45'),
(80, '679359829988', 'Activated', '2024-09-18 07:29:41', '2024-09-18 07:29:41'),
(81, '658754063231', 'Activated', '2024-09-18 07:32:02', '2024-09-18 07:32:02'),
(82, '339145545288', 'Activated', '2024-09-18 07:33:36', '2024-09-18 07:33:36'),
(83, '474238310301', 'Activated', '2024-09-18 07:36:58', '2024-09-18 07:36:58'),
(84, '199950817035', 'Activated', '2024-09-18 07:42:13', '2024-09-18 07:42:13'),
(85, '885853542181', 'Activated', '2024-09-18 07:42:45', '2024-09-18 07:42:45'),
(86, '886553663300', 'Activated', '2024-09-18 07:43:19', '2024-09-18 07:43:19'),
(87, '1023108994947', 'Activated', '2024-09-18 07:44:12', '2024-09-18 07:44:12'),
(88, '130794739651', 'Activated', '2024-09-18 07:44:47', '2024-09-18 07:44:47'),
(89, '680883476383', 'Activated', '2024-09-18 07:45:14', '2024-09-18 07:45:14'),
(90, '405237553238', 'Activated', '2024-09-18 07:46:16', '2024-09-18 07:46:16'),
(91, '542021081058', 'Activated', '2024-09-18 07:46:41', '2024-09-18 07:46:41'),
(92, '60745602756', 'Activated', '2024-09-18 07:47:58', '2024-09-18 07:47:58'),
(93, '199280318488', 'Activated', '2024-09-18 07:48:25', '2024-09-18 07:48:25'),
(94, '873623880235', 'Activated', '2024-09-18 07:49:02', '2024-09-18 07:49:02'),
(95, '873245803161', 'Activated', '2024-09-18 07:50:43', '2024-09-18 07:50:43'),
(96, '544601364256', 'Activated', '2024-09-18 07:51:20', '2024-09-18 07:51:20'),
(97, '264409017536', 'Activated', '2024-09-18 07:51:45', '2024-09-18 07:51:45'),
(98, '819781916664', 'Activated', '2024-09-18 07:58:04', '2024-09-18 07:58:04'),
(99, '199530993652', 'Activated', '2024-09-18 07:59:01', '2024-09-18 07:59:01'),
(100, '534936414118', 'Activated', '2024-09-18 07:59:19', '2024-09-18 07:59:19'),
(101, '474438588401', 'Activated', '2024-09-18 07:59:42', '2024-09-18 07:59:42'),
(102, '469879909472', 'Activated', '2024-09-18 08:00:02', '2024-09-18 08:00:02'),
(103, '544502208050', 'Activated', '2024-09-18 08:00:20', '2024-09-18 08:00:20'),
(104, '266403010484', 'Activated', '2024-09-18 08:00:27', '2024-09-18 08:00:27'),
(105, '1091506820971', 'Activated', '2024-09-18 08:00:53', '2024-09-18 08:00:53'),
(106, '1026346670150', 'Activated', '2024-09-18 08:01:02', '2024-09-18 08:01:02'),
(107, '130692306683', 'Activated', '2024-09-18 08:01:17', '2024-09-18 08:01:17'),
(108, '954484020765', 'Activated', '2024-09-18 08:01:51', '2024-09-18 08:01:51'),
(109, '748795615004', 'Activated', '2024-09-18 08:02:01', '2024-09-18 08:02:01'),
(110, '603673519960', 'Activated', '2024-09-19 03:35:02', '2024-09-19 03:35:02'),
(111, '59769457127', 'Activated', '2024-09-19 03:38:19', '2024-09-19 03:38:19'),
(112, '55693797255', 'Activated', '2024-09-19 03:39:06', '2024-09-19 03:39:06'),
(113, '536547878857', 'Activated', '2024-09-19 03:39:55', '2024-09-19 03:39:55'),
(114, '741953234735', 'Activated', '2024-09-19 03:41:59', '2024-09-19 03:41:59'),
(115, '184424134826', 'Activated', '2024-09-19 03:44:12', '2024-09-19 03:44:12'),
(116, '544450041642', 'Activated', '2024-09-19 03:46:03', '2024-09-19 03:46:03'),
(118, '943152661126', 'Activated', '2024-09-19 03:52:49', '2024-09-19 03:52:49'),
(121, '873537766083', 'Activated', '2024-09-20 11:56:15', '2024-09-20 11:56:15'),
(123, '947588949800', 'Activated', '2024-10-14 10:34:55', '2024-10-14 10:34:55');

-- --------------------------------------------------------

--
-- Table structure for table `rfid_temps`
--

CREATE TABLE `rfid_temps` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `RFID_Code` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `rfid_temps`
--

INSERT INTO `rfid_temps` (`id`, `RFID_Code`, `created_at`, `updated_at`) VALUES
(20, '879658329948', NULL, NULL),
(21, '882361772874', NULL, NULL),
(22, '810149406545', NULL, NULL),
(23, '1020396734611', NULL, NULL),
(25, '213934869617', NULL, NULL),
(26, '1089153215696', NULL, NULL),
(31, '152744759535', NULL, NULL),
(34, '52271441758', NULL, NULL),
(37, '397311797146', NULL, NULL),
(38, '809125275559', NULL, NULL),
(39, '124432345021', NULL, NULL),
(41, '604298396934', NULL, NULL),
(42, '52893902595', NULL, NULL),
(43, '260327270385', NULL, NULL),
(45, '672341813056', NULL, NULL),
(47, '329013127044', NULL, NULL),
(48, '949015471988', NULL, NULL),
(77, '955945146079', NULL, NULL),
(95, '682794440584', NULL, NULL),
(102, '181235742877', NULL, NULL),
(103, '807582885868', NULL, NULL),
(104, '123408017392', NULL, NULL),
(105, '745718122694', NULL, NULL),
(116, '197683795617', NULL, NULL),
(120, '545238505061', NULL, NULL),
(121, '1024751326943', NULL, NULL),
(135, '1091487094330', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `schedules`
--

CREATE TABLE `schedules` (
  `scheduleID` bigint(20) UNSIGNED NOT NULL,
  `courseCode` varchar(50) DEFAULT NULL,
  `courseName` varchar(50) DEFAULT NULL,
  `userID` varchar(50) DEFAULT NULL,
  `instFirstName` varchar(50) DEFAULT NULL,
  `instLastName` varchar(50) DEFAULT NULL,
  `program` varchar(50) DEFAULT NULL,
  `section` varchar(50) DEFAULT NULL,
  `year` varchar(50) DEFAULT NULL,
  `semester` varchar(50) DEFAULT NULL,
  `schoolYear` varchar(50) DEFAULT NULL,
  `startTime` time DEFAULT NULL,
  `endTime` time DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `day` varchar(50) DEFAULT NULL,
  `scheduleStatus` varchar(50) DEFAULT NULL,
  `scheduleType` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `schedules`
--

INSERT INTO `schedules` (`scheduleID`, `courseCode`, `courseName`, `userID`, `instFirstName`, `instLastName`, `program`, `section`, `year`, `semester`, `schoolYear`, `startTime`, `endTime`, `startDate`, `endDate`, `day`, `scheduleStatus`, `scheduleType`, `created_at`, `updated_at`) VALUES
(2, 'Make Up Schedule', 'Make Up Schedule', 'C10', 'faculty', 'faculty', 'BSIT', 'A', '2', NULL, NULL, '08:00:00', '09:00:00', '2024-11-19', '2024-11-20', '2', 'unscheduled', 'makeUpSchedule', '2024-11-19 13:34:45', '2024-11-19 13:34:45'),
(3, 'ITEC-111', 'Capstone', 'C10', 'faculty', 'faculty', 'BSIS', 'A', '1', NULL, NULL, '08:00:00', '09:00:00', '2024-11-22', '2024-11-30', '5', 'unscheduled', 'regularSchedule', '2024-11-22 12:33:23', '2024-11-22 12:33:23'),
(4, 'English', 'Capstone', 'C10', 'faculty', 'faculty', 'BSIT', 'A', '1', '1st Semester', '2023 - 2024', '08:00:00', '08:00:00', '2024-11-23', '2024-11-30', '5', 'With Class', 'regularSchedule', '2024-11-23 11:36:11', '2024-11-26 07:21:02'),
(5, 'Make Up Schedule', 'Make Up Schedule', 'C10', 'faculty', 'faculty', 'BSIT', 'B', '2', NULL, '2022-2023', '08:00:00', '09:00:00', '2024-11-30', '2024-12-01', '6', 'unscheduled', 'makeUpSchedule', '2024-11-23 12:02:34', '2024-11-23 12:02:34'),
(6, 'AKSNDKAS', 'MAMAMO', 'C10', 'faculty', 'faculty', 'BSIS', 'C', '2', NULL, '2023-2024', '08:00:00', '10:00:00', '2024-11-25', '2024-12-04', '1', 'unscheduled', 'regularSchedule', '2024-11-25 05:49:32', '2024-11-25 05:49:32'),
(7, 'Make Up Schedule', 'bobo', 'C10', 'faculty', 'faculty', 'BSIT', 'H', '4', NULL, '2023-2024', '08:00:00', '08:00:00', '2024-12-03', '2024-12-04', '2', 'unscheduled', 'makeUpSchedule', '2024-11-25 08:44:25', '2024-11-25 08:44:25'),
(8, 'English', 'Capstone', 'C14', 'Ja', 'Morant', 'BSIS', 'C', '2', NULL, '2023-2024', '08:00:00', '09:00:00', '2024-11-26', '2025-01-08', '3', 'unscheduled', 'regularSchedule', '2024-11-26 07:33:06', '2024-11-26 07:33:06'),
(9, 'ITEC-111', 'english', 'C20', 'Jo', 'Morant', 'BSIS', 'F', '2', NULL, '2022-2023', '08:00:00', '08:00:00', '2024-11-26', '2024-12-03', '4', 'unscheduled', 'regularSchedule', '2024-11-26 07:34:16', '2024-11-26 07:34:16');

-- --------------------------------------------------------

--
-- Table structure for table `schedule_notes`
--

CREATE TABLE `schedule_notes` (
  `noteID` bigint(20) UNSIGNED NOT NULL,
  `scheduleID` bigint(20) UNSIGNED NOT NULL,
  `note` varchar(500) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(50) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(50) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('A4yqPKyLt6MiHRZiqOtEwUpp9vcqav9bRdS4Joz3', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YTo1OntzOjU6ImFsZXJ0IjthOjA6e31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im5ldyI7YTowOnt9czozOiJvbGQiO2E6MDp7fX1zOjY6Il90b2tlbiI7czo0MDoibTdNNldKNU5EY3pLdFoybDV6V3hjVDhGUEV0bjlOcE4wczBOWU9hNSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDA6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC91c2VyTWFuYWdlbWVudFBhZ2UiO31zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToxO30=', 1732959916),
('WvZpEE9Fa8UvgIFQfMFVrbPnrGkz2HexufWThZE0', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiUWpLd29KSmZzQmNUVmlZVldNVUxmNm5mSnBsOTRWcWNqa2dMQUNSeiI7czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTtzOjU6ImFsZXJ0IjthOjA6e31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im5ldyI7YTowOnt9czozOiJvbGQiO2E6MDp7fX1zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czo0NDoiaHR0cDovLzEyNy4wLjAuMTo4MDAwL3NjaGVkdWxlTWFuYWdlbWVudFBhZ2UiO319', 1733237752);

-- --------------------------------------------------------

--
-- Table structure for table `student_masterlists`
--

CREATE TABLE `student_masterlists` (
  `MIT_ID` bigint(20) UNSIGNED NOT NULL,
  `userID` varchar(50) NOT NULL,
  `status` varchar(50) DEFAULT NULL,
  `classID` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `accountName` varchar(50) DEFAULT NULL,
  `firstName` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `idNumber` varchar(50) DEFAULT NULL,
  `userType` varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `google_id` varchar(50) DEFAULT NULL,
  `RFID_Code` varchar(50) DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `accountName`, `firstName`, `lastName`, `email`, `idNumber`, `userType`, `password`, `avatar`, `google_id`, `RFID_Code`, `remember_token`, `created_at`, `updated_at`, `email_verified_at`, `deleted_at`) VALUES
(1, 'FERMIN JR. III TURIANO', 'Fermin', 'Turiano', 'ferturiano@my.cspc.edu.ph', 'C1', 'Admin', '$2y$12$KlgNwnezp7QM6kGXOP55NuxaEGlsVWcdddwrNL1N0fGT1wTxM9drK', 'https://lh3.googleusercontent.com/a/ACg8ocIt1Bpqlj2e6Fqbuntvxjr9sGtHRkopw7Fj22o7umEgZXsQGA=s96-c', '102845204394909389602', NULL, 'YNpqADV0iLbguVoh74VFv9r12Ls0HteV7gbWKbEV1wPn3x7Dw67Z0uDazCzq', '2024-09-11 00:19:22', '2024-09-11 00:26:56', NULL, NULL),
(2, 'Jomarc Nacario', 'Jomarc', 'Nacario', 'jomnacario@my.cspc.edu.ph', 'C2', 'Admin', '$2y$12$MQvqiywYq2YOmnYuhN8ssOTRM0wWXc.Hcqo8O7aiWjRGfFMVmvJKG', 'https://lh3.googleusercontent.com/a/ACg8ocKLo3NVbRnqGRa9vuBXFLsC3pTCGRVu09WwWxomv7w0NKXiMw=s96-c', '101716597637020763290', NULL, 'fP2wXAyPYtIdzSfuy1V2rpsUDyTCsq3Sl9xkUCz3lI3pwvIK5OhGe50TyHmT', '2024-09-11 00:21:13', '2024-09-10 16:27:03', NULL, NULL),
(3, 'Ralph Lorzano', 'Ralph', 'Lorzano', 'ralorzano@my.cspc.edu.ph', 'C3', 'Admin', NULL, 'https://lh3.googleusercontent.com/a/ACg8ocLyuzW7j9cvqYPRuSaiQf1bEWTno42fF3I801S1J0OlrBiqgw=s96-c', '103767011594715566021', '213934869617', 'OnNYccKA32JOs7dPhyvZJUENqf7Icce0JEvJZj3mMCyRny94MZi050BkOr26', '2024-09-11 00:21:50', '2024-09-11 01:28:52', NULL, NULL),
(4, NULL, 'Hazel', 'Nojara', 'hanojara@my.cspc.edu.ph', '221006138', 'Student', '$2y$12$c3WCktbVCH9Bo116qHEmQurAQRLL9sqlP9Us/2IMVfCXsjhFIevZG', NULL, NULL, '810149406545', 'd8Lb43WZCJytMbDmV4OyyM58bvNYkMJ1GocxmgCKmx5aw2HsgTq1pv9Cuoj6', '2024-09-11 00:47:14', '2024-09-11 01:49:35', NULL, NULL),
(6, NULL, 'EZRA FAE', 'ALFORTE', 'ezalforte@my.cspc.edu.ph', '221002158', 'Student', NULL, NULL, NULL, '526378924204', 'GuYD9pGIeyoISXtFSZiUtRuACDe5f7CdYlGK08ptn10OtQA2ndY1gF1Gvkxo', '2024-09-10 16:44:16', '2024-09-11 01:41:21', NULL, NULL),
(7, NULL, 'Justine Matthew', 'Turalde', 'juturalde@my.cspc.edu.ph', '221007546', 'Student', '$2y$12$VF4rKwrBgzGHRxEmgOtG6u9BiIwhGSswLl2Y8keOcyf3FgxfVwOUO', NULL, NULL, '55762675622', 'Neeo6RV0dkXAoxLyN35r0DkGA94Lf4h4xU20IyKHmf6WP2zGYxq6OR5rzMxT', '2024-09-10 16:46:54', '2024-09-11 01:42:21', NULL, NULL),
(8, NULL, 'Harold', 'Ferrer', 'haferrer@my.cspc.edu.ph', '221006878', 'Student', '$2y$12$NCGG1Huf8petkPwwxKmW7eaU6y60Ad0HCtKFUlmz.0I14xBv4Jk9O', NULL, NULL, '944938674050', 'LXYT6sFqSmm4zpi6CQzYIo2lZPLySC9tOA59eUkePn8xYntOjxApasQDz4O7', '2024-09-11 00:47:21', '2024-09-11 01:59:21', NULL, NULL),
(9, NULL, 'Aaron Austin', 'Rosauro', 'aarosauro@my.cspc.edu.ph', '221008331', 'Student', '$2y$12$q2wtZ3Cr9bZ/C1ugB/vZjuKeoCklzXJKwOA1XFqT.PX6lSe.20Wri', NULL, NULL, '674153031467', 'NZxE8pg0O3LqV2d1dyaWgjtS8rgtkSJjO80wz2Yy2lQEZqiwSMvagdncON1D', '2024-09-11 00:48:53', '2024-10-12 13:26:11', NULL, '2024-10-12 13:26:11'),
(10, NULL, 'Lance', 'Llagas', 'lallagas@my.cspc.edu.ph', '221007264', 'Student', NULL, NULL, NULL, '258547443529', 'maF6TYcxnxfizmvQ24MlAahQ9TRJn4Ea2dvUGjMyH0Innuf4tBINuQX4N63E', '2024-09-10 16:49:10', '2024-09-11 01:57:26', NULL, NULL),
(11, NULL, 'Ralph Gabriel', 'Saño', 'rarengalota@my.cspc.edu.ph', '221007558', 'Student', '$2y$12$aL0inzom48GzzxR97AnLdOBiKGhdb/PZyLLXhC7D2/exDpjEh6Cle', NULL, NULL, '882361772874', 'BlYZGErkPxL7lb0PjsjjlEXNgOINpmrQtd21ODQ4HUkrO2CllM3vZqzSVHts', '2024-09-11 00:52:51', '2024-09-11 01:46:47', NULL, NULL),
(12, NULL, 'ricko', 'Zorilla', 'rizorilla@my.cspc.edu.ph', '221008518', 'Student', '$2y$12$rX5zRZ9JQnfYGwd4oFde.ettfCbgp1llmO/xXKcjAsDvjFi4ffmxe', NULL, NULL, '1020396734611', 'GF4XAjt73q7fN2AI58deXhOm1AdE8Nzp0Yj2vfFp1C2hFE3CXbhwKFxezUqe', '2024-09-11 00:50:13', '2024-09-10 17:50:46', NULL, NULL),
(13, NULL, 'Niño Jaybee', 'Bermas', 'jabermas@my.cspc.edu.ph', '221006178', 'Student', '$2y$12$n02lzTC67xxL1rz4IrIFHeFMR4vbECHn7/OyeJ1Go4LabbA1twRqW', NULL, NULL, '879658329948', 'TE7Wxe4b1sioAmQFjbn9eEAENxM7wjC6PXPTFG5xOErR2Ty5bLSdTkYeIGhF', '2024-09-11 00:53:56', '2024-09-11 01:46:02', NULL, NULL),
(14, NULL, 'Kim Harold', 'Edroso', 'kiedroso@my.cspc.edu.ph', 'c21101571', 'Student', NULL, NULL, NULL, '200503744291', 'Mfppiv7M8fhhFG54P0OJNwtc0Xzg33iRexT2fMfBCe2zFLT7NFQby7sm5ydx', '2024-09-10 16:50:57', '2024-09-11 01:56:10', NULL, NULL),
(15, NULL, 'Christine Joy', 'Relatores', 'chrelatores@my.cspc.edu.ph', '221007901', 'Student', '$2y$12$W5ifRfxXz2uNsJijKqCUyuWCznIJ4FNIlRwpoyKmzE/DGpDlbTOWu', NULL, NULL, '127126088673', '8w1L6wsXojvNXfaBK6eNzwYtcW95EjZiTq5MlWezzDAuIptNeq8F78oqcAGI', '2024-09-11 00:51:50', '2024-09-11 01:47:32', NULL, NULL),
(16, NULL, 'lemuel', 'luares', 'leluares@my.cspc.edu.ph', '221006666', 'Student', '$2y$12$nalWFkQ1RjQotfo5Z5gRn.4mL/Y97TTcTMeqgZIxGQSktFc7jcR0G', NULL, NULL, NULL, 'Z3oCeovl86AZD59MWcamyNcSyO0GJGtaom5siZIHgbeJXNV7AfgRmEwXFNLu', '2024-09-11 00:55:58', '2024-09-11 00:55:58', NULL, NULL),
(17, NULL, 'Jeremiah', 'Presnillo', 'jepresnillo@my.cspc.edu.ph', '221007491', 'Student', '$2y$12$3EuDVh98AkGwK4M8zI5D4O91f.ZOnbuJVNR6BQc3fZDQIF9oFTwWS', NULL, NULL, '809666537274', 'qbtwJo6eN723HvTgXrROli9iLrAVtgCI01FD3LPCb1T1SfIWzLs250g6OhKP', '2024-09-10 16:52:56', '2024-09-11 01:58:56', NULL, NULL),
(18, NULL, 'Mark Joseph', 'Beloro', 'marbeloro@my.cspc.edu.ph', 'C20100603', 'Student', '$2y$12$WFifbV0ay6b4IXZMt0The.Q6nSTLIPvrS0LvaxS3nXp1yy2vC.T9K', NULL, NULL, NULL, 'lMCE2M6ptmYYrAtuDnKJ7cl26arNn0TGJTDIL4ZMF1EEKk8zQkEbpyH8J15r', '2024-09-11 00:57:26', '2024-09-11 00:57:26', NULL, NULL),
(19, NULL, 'christian jay', 'baria', 'chbaria@my.cspc.edu.ph', '221007722', 'Student', '$2y$12$iGGzzj8F/8U3wQc0.YozgOimg0XCVW0HCkD6s4UhS4UWXL3utMPy2', NULL, NULL, NULL, 'TpsVei9Gfr2DXvi0VpJJApyQbyGffPO9UL3Brc3EOag8FS74DVSZEggKJYhK', '2024-09-11 00:54:53', '2024-09-11 00:54:53', NULL, NULL),
(20, NULL, 'Adrian', 'Saballero', 'adsaballero@my.cspc.edu.ph', 'C21101044', 'Student', '$2y$12$ScdqCEymKh4PB8yKpDbngusVEWnXG2JIOhl1Nirwn.tB5P7fFLOEu', NULL, NULL, '265899879200', 'nC7jaM1OeFHU7ktbY1phKnpIYci6Ws3Ynk2DPNlI49CGzo3Ok8P2BjMlMza6', '2024-09-10 16:55:13', '2024-09-11 02:00:03', NULL, NULL),
(21, NULL, 'Dominic Jay', 'Gasgas', 'dogasgas@my.cspc.edu.ph', '221007738', 'Student', '$2y$12$cXzKZk6HpIBHU.3qC29CLeKNkhg04.R42azExO85NytQTwNCaa5Ji', NULL, NULL, NULL, NULL, '2024-09-11 00:58:37', '2024-09-11 00:58:37', NULL, NULL),
(22, NULL, NULL, NULL, 'ralph@cspc.edu.ph', 'C11', 'Admin', '$2y$12$9.j9rgcFCWK/dA2.g07xjeqtmRJcUuUTkFlXm5WcZjciTUFcqm.yu', NULL, NULL, NULL, 'L6ehEYf0xleVFBqu8DukNp93QomnViOlbJZjhmx5riNAQ3qoXTzM6agWYNiI', '2024-09-12 17:44:02', '2024-09-12 17:44:02', NULL, NULL),
(23, NULL, 'Ja', 'Morant', 'ja@cspc.edu.ph', 'C14', 'Faculty', NULL, NULL, NULL, NULL, 'GTVebRREcWyekTNmiDFLJWsVuwlTZ2Bn6rX88WLEbSJ4bQWpApWBTuiKGhaR', '2024-09-12 18:14:04', '2024-09-12 18:17:24', NULL, NULL),
(24, NULL, 'Jo', 'Morant', 'jo@my.cspc.edu.ph', 'C20', 'Faculty', '$2y$12$4B.w1dKJjnqgOQEAzfXNrOLA6fZENb8Jk42VsBw6NNeYW6cH8Q2Mm', NULL, NULL, NULL, NULL, '2024-09-12 18:22:28', '2024-09-12 18:22:28', NULL, NULL),
(25, NULL, 'dennard', 'balino', 'debalino@my.cspc.edu.ph', 'C21103926', 'Student', '$2y$12$J/lQ43nxajrY8ZvM8KEfN./vQR67ov0Do9iOMI3rdzVoUQv7Dw79S', NULL, NULL, NULL, 'tUZe3FqGMKwxT8GyM87Bbjq8W910gFCQFAfuccPJHxlSc1Mn4r8B9v3tIoSz', '2024-09-12 06:11:50', '2024-09-12 06:11:50', NULL, NULL),
(26, NULL, 'Amyrie', 'Alarcio', 'amalarcio@my.cspc.edu.ph', 'C21102627', 'Student', '$2y$12$4W5B9It97p5M3Dx/VWDMWe2iYyZI4Y/c36H.BE3iES1EiKsIf2qC2', NULL, NULL, NULL, 'jS8kv5tgaqTkD9Pcajwxo6kkK6mMRjC14xdRWxsyxXeIMZQXPCgCj2DcPTFe', '2024-09-12 06:13:40', '2024-09-12 06:13:40', NULL, NULL),
(27, NULL, 'rylie', 'REFEREZA', 'marefereza@my.cspc.edu.ph', 'C21102368', 'Student', NULL, NULL, NULL, '814330555373', '6thlX7HVQtYH14duObUpSKYjiIJGdA5CRGhrt3in1ftGo4rVJlc0xYJrImQr', '2024-09-12 06:20:33', '2024-09-12 06:38:37', NULL, NULL),
(28, NULL, 'AJ', 'Soreta', 'apsoreta@my.cspc.edu.ph', 'C21103064', 'Student', NULL, NULL, NULL, '127978384614', 'eS8Am1sQt3cQDakXkRdftukbJw6aQAO942KHMO0LEJV20AlZePEve6oJLCJB', '2024-09-12 06:21:44', '2024-09-12 06:33:05', NULL, NULL),
(29, NULL, 'Neas', 'Lim', 'selim@my.cspc.edu.ph', 'C21102341', 'Student', NULL, NULL, NULL, '1018492365572', 'xY1H6MoYtD7Iw3ZazkaFVQ5czjrpqui7Wk4OwIUAy5EYTZEiQ78aj3aC5T8B', '2024-09-12 06:22:42', '2024-09-12 06:35:27', NULL, NULL),
(30, NULL, 'John Martine', 'Gamilo', 'jogamilo@my.cspc.edu.ph', 'C21101205', 'Student', '$2y$12$Bjm3fu5gQRr86vsm7ZZiWOIh9RuS0mT2HKjsZmvfr80MI7uyKML..', NULL, NULL, NULL, 'Brl7p9550ya6ETMHowpmZVOug9gnjz1NlFvxM92saW9fkZGcDv3QOw0L1RP2', '2024-09-12 06:23:51', '2024-09-12 06:23:51', NULL, NULL),
(31, NULL, NULL, NULL, 'ral@cspc.edu.ph', 'C25', 'Admin', '$2y$12$o21dcLouNOCaZ8f8/ao2JentdFQvaGK8ALiDgX6laSMoxAd5ME5Au', NULL, NULL, NULL, 'r25VWWOfc6mkqNYixNkLeI8y9pn4Obx0NuNiBqNHVCIoqgjuHy2QNpdS51W4', '2024-09-12 06:25:42', '2024-10-12 13:25:48', NULL, NULL),
(32, NULL, 'kevlar', 'pajenago', 'pakevenjahn@my.cspc.edu.ph', 'C21101147', 'Student', NULL, NULL, NULL, '675347573585', 'CU9ZfY7DouDyB1qKPlSFzTdTZxnDQronD9rTzxLBm7HqrLiYUiI651eujsRv', '2024-09-12 06:27:57', '2024-09-12 06:34:51', NULL, NULL),
(33, NULL, 'jesrie', 'Cena', 'jecena@my.cspc.edu.ph', 'C21100467', 'Student', '$2y$12$6SyYEqx3pJ/uGdDFK1Pjl.gAjtCwlMYQC9djwqeyS8S8.9WTf/RQm', NULL, NULL, '1085114410853', 'vRmehUZbdEfuAkGOcHkVk1f0lvXQRs8A4f2MRs2Ww0bVH0MD2y9y8itBE6tP', '2024-09-12 08:05:36', '2024-09-12 08:08:33', NULL, NULL),
(34, NULL, NULL, NULL, 'ra@cspc.edu.ph', 'C60', 'Admin', '$2y$12$mdfdKbp1jKlT2XJ86sfvwe/0huKA18HDbqZMAjaLo.A5RYQcXvJl2', NULL, NULL, NULL, 'NpF0yttXwuWNrVh4YJBRwLxGmR1UyUngq5J1nqbdkBOf2T1KbjOvoraJ8sfi', '2024-09-13 23:27:46', '2024-09-13 23:27:46', NULL, NULL),
(35, NULL, 'JOLINA', 'rabusa', 'jorabusa@my.cspc.edu.ph', '221001464', 'Student', NULL, NULL, NULL, '53347215165', 'DoeP1QJh32txwCcqyMnqSCw95tiK80nm4nWWtOq73KyfQ4Aul1RRWjS2fNjY', '2024-09-13 23:28:55', '2024-09-13 23:59:10', NULL, NULL),
(36, NULL, 'Dave Kale', 'Oares', 'daoares@my.cspc.edu.ph', '221001401', 'Student', '$2y$12$jEaLKdcVOl8Hp6ucfesUY.XuADxCB74.1lqLufFwKZL.dLLfpZ6P6', NULL, NULL, NULL, NULL, '2024-09-13 23:29:03', '2024-09-13 23:29:03', NULL, NULL),
(37, NULL, 'Kenneth Leonard', 'Buquid', 'kebuquid@my.cspc.edu.ph', '221001251', 'Student', NULL, NULL, NULL, NULL, '9yXRlPvEcEAvNb7m6QMR8HKB875j8XPOWf0biTD0INeLXkkDOOEYMTjCDiUQ', '2024-09-13 23:29:09', '2024-09-14 00:02:57', NULL, NULL),
(38, NULL, 'Jamaica', 'Ajero', 'jaajero@my.cspc.edu.ph', '221001124', 'Student', '$2y$12$HvHW763gIugnW1KLkZhvyOQLZxxwVEzNu95vpQWEjJtCm2FAPK8xi', NULL, NULL, NULL, NULL, '2024-09-13 23:30:10', '2024-09-13 23:30:10', NULL, NULL),
(39, NULL, 'john kenneth', 'aurillas', 'joaurillas@my.cspc.edu.ph', '221001135', 'Student', '$2y$12$T0jisocflXI6ZHMiY/IVzuPChRIr2eI2W/nLlEolDV0HIVubX3Fvy', NULL, NULL, NULL, 'KGYqMD5yhiOXfQyQb5F214QJklS7WLKj2AhPSXApst2RIPDqPZSG4Soz6iLB', '2024-09-13 23:30:17', '2024-09-13 23:30:17', NULL, NULL),
(41, NULL, 'jared', 'olavere', 'jaolavere@my.cspc.edu.ph', '221001567', 'Student', '$2y$12$hjDLf.lo0GE8AYvhfsSzgeg66DLUusQcu0v4C086P9RSmiW3dsy6a', NULL, NULL, '54837897144', 'RAl3zF5Me63BpOOobi3fdKceADLkEgsHmBuV9fz2Z8kYfP5I9EQjmPboOUm4', '2024-09-13 23:31:05', '2024-09-13 23:59:45', NULL, NULL),
(42, NULL, 'Kenneth Louis', 'Bermido', 'kebermido@my.cspc.edu.ph', '221001164', 'Student', '$2y$12$dRPjBJQkFXS3Py90BDQMOe8Y8uMRtwjn5Bfw1fHVVOJvoufzqSyx2', NULL, NULL, NULL, 'cXc0RGKgsDCvD93sMCMa3xB2O4SNIecdo5gspOBc9tm2b9sjqyOwdaLX6hoB', '2024-09-13 23:31:30', '2024-09-13 23:31:30', NULL, NULL),
(43, NULL, 'Mark Anthony', 'Balilla', 'mabalilla@my.cspc.edu.ph', '221001145', 'Student', '$2y$12$1fqrMm5y0EdGstVbNBRozOLAUMGnxY8zREvb/5WoYUo6QXSNjpLwa', NULL, NULL, NULL, 'AGxRqkCTcY4cuXGLcO8rnMzUlhMrdgDTKoPSqyont0xbdeJ1wqSa9gpGTKRH', '2024-09-13 23:31:38', '2024-09-13 23:31:38', NULL, NULL),
(44, NULL, 'Julian Paul', 'Padua', 'Jupadua@my.cspc.edu.ph', '221001412', 'Student', '$2y$12$dY9yEVK902C7FolQhBt4aeEXnRvmAG28Zreb1aaQj7gJ3pjMGcgGO', NULL, NULL, '740445308406', 'EgDlUZ7XlnxZqFUcanpJ0eu3xFISLCmQrGg60ptjKjPOpMICfY08x6LmQbWG', '2024-09-13 23:33:22', '2024-09-14 00:11:56', NULL, NULL),
(45, NULL, 'Anthony', 'Llabres', 'antllabres@cspc.edu.ph', 'COS Admin 147', 'Faculty', '$2y$12$Qh2EgWNya19OLk5dBO49Seo.DMKCLiU9VHIuobTvdSG9ts3CxS.Wa', NULL, NULL, '872574190105', 'UBY05Cye5QJIwa0QBquR32KFLjtEkXIwb5Z7Y58MYSEQ8Xe1oW6fvPEE1x2f', '2024-09-13 23:34:14', '2024-09-13 23:57:13', NULL, NULL),
(46, NULL, 'Jancee Kenn', 'Abonita', 'jaabonita@my.cspc.edu.ph', '221001064', 'Student', '$2y$12$VhYkROx3FJpYG1CafLeDBOweZQOVvthbyaFxmFEw0aaYte98Ep0RS', NULL, NULL, NULL, NULL, '2024-09-13 23:34:23', '2024-09-13 23:34:23', NULL, NULL),
(47, NULL, 'Cindy', 'Oscoro', 'cioscoro@my.cspc.edu.ph', '221001410', 'Student', '$2y$12$YR0ujdHOdspQW39deTSooepXt508pael4JyolQ8/miypnWAfrKrUG', NULL, NULL, NULL, '2saZcO1OYgHr5YdwcbGAEqNS1MafXnHvSxuHOyfIw5nTiJpUKD27Tce8CnGp', '2024-09-13 23:35:58', '2024-09-13 23:35:58', NULL, NULL),
(48, NULL, 'Gilbert', 'Baluca', 'bagilbert@my.cspc.edu.ph', '221001155', 'Student', '$2y$12$Jv51NMH6MBxWlXrBv1ZbueWErJazbRyeXg2dZ2BgmEIn/x4K8b7Vm', NULL, NULL, NULL, 'xQZOLUVitUd99q0XM1eo3jViXtk7nFQ0JrWajsK4dSKgFn00lfGMEeJwDJAJ', '2024-09-13 23:36:55', '2024-09-13 23:36:55', NULL, NULL),
(49, NULL, 'Jahara', 'Cervas', 'jacervas@my.cspc.edu.ph', '221001279', 'Student', '$2y$12$KP/oTJbUSPRLAfNkE47cT.Rbhhewqrv.nlC9/9uc8jZ0SuR1LKCde', NULL, NULL, NULL, NULL, '2024-09-13 23:37:58', '2024-09-13 23:37:58', NULL, NULL),
(50, NULL, 'Cyril Mae', 'Pandes', 'cypandes@my.cspc.edu.ph', '221001415', 'Student', '$2y$12$6B5aXpZUoStaHQHdYEA6XOtRfvG2SkkG2zokIkOYcE3O6fRemzxo6', NULL, NULL, NULL, NULL, '2024-09-13 23:38:57', '2024-09-13 23:38:57', NULL, NULL),
(51, NULL, 'Michaela', 'Cezar', 'micezar@my.cspc.edu.ph', '221001280', 'Student', '$2y$12$/PfIOEvQj4phGabfTT21t..GYjp8SVswOaAAbhvEFownwnbLKqYOm', NULL, NULL, NULL, 'dPBpSOCfaV07tFC4mUGqHppw1P4WBaCmwr5lpeMPlKuEcz7iIe2tMTRTl88T', '2024-09-13 23:51:13', '2024-09-13 23:51:13', NULL, NULL),
(52, NULL, NULL, NULL, 'ralp@cspc.edu.ph', 'C70', 'Admin', '$2y$12$OLoeC6GS46Zuda6VShHEr.blV1lLltrxbyVYswtRaOw0aCpreE2QW', NULL, NULL, NULL, 'LlbvZJsIUfq8uR7fWCLUmS3XCk2iaWdADmkRWhRRIT6BKnkKkRcJmPmITRNZ', '2024-09-13 23:58:27', '2024-09-13 23:58:27', NULL, NULL),
(53, NULL, 'April', 'Abonita', 'apabonita@my.cspc.edu.ph', '221001122', 'Student', NULL, NULL, NULL, '464036620093', '4MSUruqzMIJKk7H2GSAttIXTHHEs8yOahiQCBPoGi5Ajt6O6JPotaGNn87uC', '2024-09-14 00:00:40', '2024-09-14 00:09:57', NULL, NULL),
(54, NULL, 'Jerl', 'Illanza', 'jeillanza@my.cspc.edu.ph', '221001332', 'Student', '$2y$12$C8l3vCzFWDg1PB8KRseDte/SQZuWOE8uAf2UjabulUGb4AiE3ZiGS', NULL, NULL, NULL, 'vrPictRCUpNP9dwH6gxzbsvJ4Y3Jyi8G7FHGETRnnb1CFdz5eRSJHqgS0uJ3', '2024-09-14 00:03:55', '2024-09-14 00:03:55', NULL, NULL),
(55, NULL, 'Neil', 'Inocencio', 'neinocencio@my.cspc.edu.ph', '221001334', 'Student', '$2y$12$feJL54ifFLec83/dk5vlOuvo4m9WuEJfTUCuH/Upqg1RSnX.PvCL6', NULL, NULL, NULL, 'o0nYEZUvUSNB2Oq61At2CLELj1ext45dCSYG1rekJqsSFUoRTcl7V3im3NTU', '2024-09-14 00:04:06', '2024-09-14 00:04:06', NULL, NULL),
(56, NULL, 'Marjon', 'Catorce', 'marcatorce@my.cspc.edu.ph', '221001274', 'Student', '$2y$12$IGhgqHiEd0LKBkMeyKonSuaT2ZqaDg6mBnyJazCglD/fB8t8D8lae', NULL, NULL, '524885096481', 'EMcmJsAHXZ8lfRX348R4bGDQt1YcmR0XPqy9LAhCzYCeREOWkAdP2KYqKzpQ', '2024-09-14 00:06:00', '2024-09-14 00:10:32', NULL, NULL),
(57, NULL, 'Kathleen Tess', 'Hugo', 'kahugo@my.cspc.edu.ph', '221001329', 'Student', '$2y$12$Mehd/5qK4BTcEl5m1PpbDehDPl8Rus6kwiDc8SKgKESGYXAtMGeuy', NULL, NULL, NULL, 'pPCNEkrIJT6YwK09PcaSbIVSYTxpY81RxxV7UqUxzmNugTy4eQYVlHeiFXs2', '2024-09-14 00:07:46', '2024-09-14 00:07:46', NULL, NULL),
(58, NULL, 'Vincent', 'Enimedez', 'vinenimedez@my.cspc.edu.ph', '221001290', 'Student', '$2y$12$gvR197rVvERC80jmh0VROeCnpQPOcfvMyogW7to4zaOup3yBwOqyG', NULL, NULL, NULL, 'PxbZUMn7XwaUJTWp9UGexMg9yZhDhxEHiW21Wr53LH7oRz7d0JNWbYWJZjr6', '2024-09-14 00:08:58', '2024-09-14 00:08:58', NULL, NULL),
(59, NULL, 'Jessenry', 'Gasgas', 'jegasgas@my.cspc.edu.ph', '221001321', 'Student', '$2y$12$IKhBGQg3bXFYrOE/qdgMP.nfjKGy9GsMJWm7AxAxtQJqc8h2pWrh.', NULL, NULL, NULL, 'qe0T1a2csvSTp8P9x6r8wROYVxsIDST6QIG5671Re0d0vYSbz6nLJWVENhHR', '2024-09-14 00:10:58', '2024-09-14 00:10:58', NULL, NULL),
(61, NULL, 'Patrick', 'Riñon', 'parinon@my.cspc.edu.ph', '231005602', 'Student', '$2y$12$kerBCeKMFqjmeefZQL77Leb3DYau2iM.k5voTY9hDareE4RPqr1ce', NULL, NULL, '129386764395', '99JU0NlVpiYZyVrRpEWMn35wLnlmn1geVNCndu9AQjOZS5eSNMpIT3L1uUjt', '2024-09-14 04:11:30', '2024-09-14 04:36:36', NULL, NULL),
(62, NULL, 'Kurt Henry', 'Romero', 'kuromero@my.cspc.edu.ph', '231005377', 'Student', '$2y$12$b90AqDpUDHbrW4TNNQcAQeajeT8YgPfGK.ktGSiNRDN3gdXxZHEcu', NULL, NULL, '472880142075', 'wi04VQT3wFl5xXlYe4zSkWEKAGUbf4d4mnILcr071UrlosNocuURrtBcXbjI', '2024-09-14 04:12:22', '2024-09-14 04:40:42', NULL, NULL),
(63, NULL, 'Mark Harvey', 'De Quito', 'madequito@my.cspc.edu.ph', '231004571', 'Student', '$2y$12$Ych9boUH3JL/KziMoD9WBOJF8gebsjNUg6C9ZwHhYJWedvCxJlUIm', NULL, NULL, '957691615149', 'SiEAPEKZz1g0aIPa9ElUOVpVJeD9dpVWcSCvXO54qFcWDh1x6tzRa4VB3bbT', '2024-09-14 04:12:28', '2024-09-14 04:41:03', NULL, NULL),
(64, NULL, 'Mark Angelo', 'De Guzman', 'markdeguzman@my.cspc.edu.ph', '231005327', 'Student', '$2y$12$pGM41QE01ND2V36WSe7xWuTOy4oqXOq7EJuy/OzRhivztuVmk3hji', NULL, NULL, '1023538911066', 'XyoPGJvleHqRNzKiAGwy69yedIsiZChZ5NM4INdg1PGtk2dNf4l1YdRaEvQz', '2024-09-14 04:13:11', '2024-09-14 04:41:44', NULL, NULL),
(65, NULL, 'nicasio', 'locsin', 'niclocsin@my.cspc.edu.ph', '231004405', 'Student', '$2y$12$uBSET3uBD/BYgum7XkzueuZDQ3QVJOnCMw6/geLU7xQ/HWtQxbrJ2', NULL, NULL, '1001810727593', 'wk07MlcFEGJWsbkJ8brjhT9LTmDMj0u7yerRXx9UxycMOvpTOcHddnSsV3aK', '2024-09-14 04:13:31', '2024-09-14 04:44:21', NULL, NULL),
(66, NULL, 'john paul', 'saunar', 'josaunar@my.cspc.edu.ph', '231001906', 'Student', '$2y$12$arFB4tOUGdpVs0gU93BEt.aKa.383DJL26C7hHD4ideQkqQTnLSIu', NULL, NULL, '266351040424', 'BzbSy2LYIJv7bUWqLRrai93kfsLrAcBGgzHLFoPhMmO81GP9hHxVIcuO19o9', '2024-09-14 04:14:42', '2024-09-14 04:46:52', NULL, NULL),
(67, NULL, 'marvin', 'salcedo', 'marsalcedo@my.cspc.edu.ph', '231002375', 'Student', '$2y$12$49sWR4F1ehkNlbMEdcIdBuom8KVS.0L0c9IiFkd1BIBaP3/O8fC8S', NULL, NULL, '180766963784', 'qlXZjNMmmKzqi0pnEZe4hqXGz1GLEfXzoF20DI9HbrIzwF8YFaMeqXEb4WVA', '2024-09-14 04:16:20', '2024-09-14 04:42:12', NULL, NULL),
(68, NULL, 'monico', 'maglapid', 'momaglapid@my.cspc.edu.ph', '231003014', 'Student', '$2y$12$Rtz0RHEYWkoU2w8Lqh8KhuM1OM6S6v0QLhSth2und9bVGKCyJ7c5C', NULL, NULL, '681132709618', 'QvndJntMo5sI60Rc6AGk2Ut0WWQVwVmIy98GobvWfMdGC666fmqzlU7tTv7K', '2024-09-14 04:17:50', '2024-09-14 04:45:41', NULL, NULL),
(69, NULL, 'Pia', 'Libardo', 'pilibardo@my.cspc.edu.ph', '231005214', 'Student', '$2y$12$Ip2Kvoq29SA3.gnKB7kx2Ov4wP5MQvMKu7KVQmcS2gVdOYz2XmE/K', NULL, NULL, '474133265147', '7BS5kZf2gSKp8L5nB9wdR5vvAKQqdcGuZh9GHC1HF83bfGNaJym3Vwr14tMo', '2024-09-14 04:20:12', '2024-09-14 04:36:12', NULL, NULL),
(70, NULL, 'Angel Christoper', 'Tuyay', 'angtuyay@my.cspc.edu.ph', '231004601', 'Student', '$2y$12$KhZf441L7/FBj7lKO7UyQOT45jgCDOEJAXbAZw6u6BiTOPpJadir.', NULL, NULL, '540223629830', 'yoS6IQWMapupmbLZcAvhLR9Ce4EQ3VW2Ck7JdKwjxJITTkHUMV8PsOc5bgZ7', '2024-09-14 04:22:13', '2024-09-14 04:38:38', NULL, NULL),
(71, NULL, 'Veronica', 'Wekis', 'vewekis@my.cspc.edu.ph', '231002999', 'Student', '$2y$12$K6ydmpKOT6rnkdMgC3LSg.YCXBrqXNMbqn91/AXktCdXQDLmS9kci', NULL, NULL, '681384040138', 'DVLNsP0kXafOZbmvft5J9A8CdfxLeLlzoFmxEPQE7RJho6W4i4cnOkmdcBe7', '2024-09-14 04:22:21', '2024-09-14 04:35:15', NULL, NULL),
(72, NULL, 'John Louie', 'Abitan', 'johabitan@my.cspc.edu.ph', '231003742', 'Student', '$2y$12$Uz2x2gIyKKiI1ULS9oatw.VgX3o/FxZ0qruMZhM7younz8LXckbB6', NULL, NULL, '41264321163', 'VPhtiL8fyuVPER51aTVZjxG3Fza1Dz9aLAbAKmVqQiFnxtfZv8eKEgigfbhH', '2024-09-14 04:23:14', '2024-09-14 04:46:10', NULL, NULL),
(73, NULL, 'edgardo', 'parada', 'edparada@my.cspc.edu.ph', '231002374', 'Student', '$2y$12$O1yQRuwaQO3y.eaot6/aiefwg2JwxuX82a7d2AUzub3xWWCoWXauS', NULL, NULL, '200300451340', 'Jb47P0uLZIAgXoob04qFPi39VK8V6CoG302VCHNV1xqD9fZxvUrkMRNJBwMW', '2024-09-14 04:23:23', '2024-09-14 04:42:36', NULL, NULL),
(74, NULL, 'Roselle', 'Llabres', 'rollabres@my.cspc.edu.ph', '231003121', 'Student', '$2y$12$4w1S2y4nFHTaIhJxQSIRo.SQMB1ModI219vUGjLFmxX4mVKmpFqlq', NULL, NULL, '678319451109', '5aNxDa695t0btqPYhoQVoKzkcMdjQZCV1JjSyyr1N9pfhW9MnUB72Kkrctii', '2024-09-14 04:23:56', '2024-09-14 04:37:39', NULL, NULL),
(75, NULL, 'Phoebe', 'Flotildes', 'phflotildes@my.cspc.edu.ph', '231004660', 'Student', '$2y$12$9Zeasafx1RA9IIaTZEUQ7OYkWj28kdMQDnEIv5usz95HaFr998dyi', NULL, NULL, '680500549190', 'gx7Oan35ZzSovDqejw4j5BPGFHKgYamSfgIZ4frkuus67wMxv4l8kA2axn1e', '2024-09-14 04:24:18', '2024-09-14 04:41:24', NULL, NULL),
(76, NULL, 'loreto', 'balang', 'lorbalang@my.cspc.edu.ph', '231004711', 'Student', '$2y$12$5cVWI3wh7iumzKw0QKex4ufLuiDTdPiScUwJIX8uuS9bXdRojQCJ6', NULL, NULL, '63129343782', 'qpPTY4i2Yrol87bCu8Y5297F6bTfYZSZ1cR1dpVE6VVEmoqGfjGgzP71F6xM', '2024-09-14 04:24:51', '2024-09-14 04:44:49', NULL, NULL),
(77, NULL, 'Maria Francia', 'Gregorio', 'grmariafrancia@my.cspc.edu.ph', '231003028', 'Student', '$2y$12$Hpp0rdRkjmKhIxKqRdBexuJsxKyeW2ZDotSWZuDWbt3jSsAXMx9lK', NULL, NULL, '524313819160', 'tcXi1a65TRo6WpATmFxhKBRhD0sHxQX2dH0fld7RTwC3vywoZKh9s8Eejv7L', '2024-09-14 04:25:12', '2024-09-14 04:49:39', NULL, NULL),
(78, NULL, 'Gwyneth', 'Pimentel', 'gwpimentel@my.cspc.edu.ph', '231003701', 'Student', '$2y$12$JU0E0K8nA.Dvvx8n/W9nF.nWfftlzMxx0X5qzokmjh5387tIiqVoK', NULL, NULL, '542100969378', '74wXJzsWM62tGHflsmjMrIPgmsDcAe59LzqUc5iftZ2cXiyOZ879kfLL7bg5', '2024-09-14 04:25:54', '2024-09-14 04:38:07', NULL, NULL),
(79, NULL, 'charm lyka', 'espinosa', 'chespinosa@my.cspc.edu.ph', '231002997', 'Student', '$2y$12$VG8uV4TamoQiYghPTjibv./pELqPmxrxYyRCp1GlbaVx8yuxsjj5i', NULL, NULL, '747772335959', 'RRqTBsjatU225No3CQd5nmw1B6B4KD3HdmueF4Bzumxi4YAgKHegKsrUkf3m', '2024-09-14 04:26:33', '2024-09-14 04:35:47', NULL, NULL),
(80, NULL, 'john gabriel', 'boto', 'joboto@my.cspc.edu.ph', '221006851', 'Student', '$2y$12$/q6CYg.Gk2I.rqsDEqRNEuFqIqBXb1SlsSQZKOS/tRKQlDziZQyMG', NULL, NULL, '682376058592', 'PeHsG3iz3s75l0GzY7CHBT01SRJ2tKZQzsRJPLOlBgO8dBtzovBmRALQhSqD', '2024-09-14 04:26:39', '2024-09-14 04:52:47', NULL, NULL),
(81, NULL, 'Shiela Mae', 'Marmol', 'shmarmol@my.cspc.edu.ph', '231003280', 'Student', '$2y$12$La6z2NyWCFx1UfLvSSkSIOQP46S9EUQA5R2Q/tLY1vuAgzzSv33u6', NULL, NULL, '132386739783', 'OSzBU3LJXWec7aTCyoegJsK8s3GsxqsLShsDv6EWVUTv4bAv7C40PZMepVCD', '2024-09-14 04:27:14', '2024-09-14 04:53:16', NULL, NULL),
(82, NULL, 'Marian Jean', 'Santor', 'masantor@my.cspc.edu.ph', '231003241', 'Student', '$2y$12$D1K04QN0YOcLj80oGGJjb.2aI5UP1ZdHSTWQ7l5x/XUWeRxoTBeBy', NULL, NULL, '1093957015287', NULL, '2024-09-14 04:27:57', '2024-09-14 04:39:03', NULL, NULL),
(83, NULL, 'Algen Jake', 'Capiz', 'alcapiz@my.cspc.edu.ph', '231003017', 'Student', '$2y$12$znTZmCqiv.fKmcYvjT2pXer1zLDaUxub00uBIrDGY6GH0leeHmO36', NULL, NULL, '679998740367', 'Rc7lFDei7iTYqWsEtnFlyORCKejD9zWD3bn5BQZpGNJ7Jpvg1pSUAM46RZxj', '2024-09-14 04:28:21', '2024-09-14 04:39:25', NULL, NULL),
(84, NULL, 'Sophia Lorin', 'Arrabe', 'soarrabe@my.cspc.edu.ph', '231003860', 'Student', '$2y$12$NS0.PVpBhELzR3ZRBJq1ueHUn4Q33OyPQK32GOfzpF4nZ7IVrtJLO', NULL, NULL, '888924559462', '2o3j9RO7S3NJG2r530ftEuldKPIYIi3n9X4saG5SsdwF9cYYb3CGC6pZMdqG', '2024-09-14 04:28:31', '2024-09-14 04:39:50', NULL, NULL),
(85, NULL, 'Josiah Jaziel', 'Ueno', 'joueno@my.cspc.edu.ph', '231004661', 'Student', '$2y$12$nJZuBQ9glJBf1LJw0627c.0rl1.PMkmCg7vYALWqaURVL7i3PS0Bq', NULL, NULL, '62424504091', '65JflPaYkhfn9t5niQXhDYx6d5MuZDcXAMYYTLKV6WGpnXlUSPAV9Una3NOD', '2024-09-14 04:29:14', '2024-09-14 04:34:25', NULL, NULL),
(86, NULL, 'John Dave', 'Belga', 'johbelga@my.cspc.edu.ph', '231003025', 'Student', '$2y$12$ZDJpQJrDszu/Ic7uxDvkR.nP77gvxz0mLswSj3e6wLqmIit/WDhEK', NULL, NULL, '541714569149', 'L3trstpeWDNzaxT2sCDaFHfmADZtHMkEF2nzzfG9DweIQOObKPMuKlICWmJy', '2024-09-14 04:29:54', '2024-09-14 04:43:54', NULL, NULL),
(88, NULL, 'john siegfred', 'nadal', 'johnnadal@my.cspc.edu.ph', '221008223', 'Student', '$2y$12$opQ6EQthBECNfY052d.zoOPJk580y.xDt/d5SBH/KU6inDLWgNrmC', NULL, NULL, '809227315078', 'WFVzFax1SLk7BHuBGHzKxUMRP2Tnhp64hsPEUrWp4gFQU4zb2Dh6axd034Hi', '2024-09-14 04:30:25', '2024-09-14 04:50:15', NULL, NULL),
(89, NULL, 'Daniella', 'Colico', 'dacolico@my.cspc.edu.ph', '231005316', 'Student', '$2y$12$1vVy1Rhjw2CSYD1fUZUIAeM.uKpNYVBGNTu6D5yd003vW2VWncaDm', NULL, NULL, '749048190558', '2S96R2XmmL4TIBNOzGSxC4mrO7ibUfprakxqu8KbCBg8OtaT4S4oCPWtP7Ae', '2024-09-14 04:32:58', '2024-09-14 04:45:13', NULL, NULL),
(90, NULL, 'Rhea', 'Española', 'sambuenarhea08@my.cspc.edu.ph', '1600204', 'Faculty', '$2y$12$CU7V4JLCXxm8sWjKN8Co8uaSJdpU33oRNGHKOOPWJuQ8iNKA7Ae7K', NULL, NULL, '263222668307', '1qw06XinxxNBymMSYaUKCxOjZk5ASMMZ62RemtdHeCXsiiJRqXuD8O4GuYdE', '2024-09-14 04:33:22', '2024-09-14 04:51:28', NULL, NULL),
(91, NULL, 'jay', 'lozano', 'jaylozano10@my.cspc.edu.ph', '231004940', 'Student', '$2y$12$T0JVipRhudDYoleVnMyDQOXiQ2IsKjAbtupUUIQ0uiXR49aqo1OQC', NULL, NULL, '131947910980', 'lKqwKKwMpiDQsfDc4lRddBO76JyLOrqRS69zCtVTsfQj6L8xUBc2Rqq5eW72', '2024-09-14 04:35:21', '2024-09-14 04:43:00', NULL, NULL),
(92, NULL, 'john mark', 'cabal', 'jocabal@my.cspc.edu.ph', '231003006', 'Student', '$2y$12$WBvjgd4zPsVZrXrNUAIix.WNlBKEinWuVPjOwBOCZsY0rOa5kPKPy', NULL, NULL, '956951844737', 'xdkS2dZA2U7XXUMlvZNKcPdX5HWys5m1bP459G6SrgOFJ9UzhukQQFjACW4z', '2024-09-14 04:36:50', '2024-09-14 04:43:26', NULL, NULL),
(93, NULL, 'alexander', 'masculino', 'almasculino@my.cspc.edu.ph', '231003292', 'Student', '$2y$12$DbmTSp26nDCVBrhYjnpvk.CaWc5aAzcXXoXfzhT/gOLyY4BEb9fAu', NULL, NULL, '1077945301107', 'sRNxEWGCRSNTWqL5WoErCxr0jrsM8F6uO2F8i4ItU1RKmy00imL9BXlDK5As', '2024-09-14 05:03:23', '2024-09-14 05:06:58', NULL, NULL),
(94, NULL, 'Michael Ken', 'Colle', 'micolle@my.cspc.edu.ph', '2411486', 'Student', '$2y$12$s6a3BEdQm.bjIdNFPmaFVO7Ue3M7DKd2sf1izcbsX/r8sMfc9JStq', NULL, NULL, '875215356521', 'LgS5sczUkkSN2qo3Ppv8hI0zxRbsp3TRjGGig91dTcuH9Su1obHE7IHCmg9y', '2024-09-14 05:21:39', '2024-09-14 05:35:44', NULL, NULL),
(95, NULL, 'Aaron Samuel', 'Banal', 'aabanal@my.cspc.edu.ph', '2411273', 'Student', '$2y$12$guFwUR7On1oKgSdjFmoDt.kdtupMdBdCDNYUAT4ijzyEbHCRiMu0.', NULL, NULL, '872038630093', 'dW7lTc0L0uY5T4faXag5bqU1oxvr4XA49n54PUFbrpAiDxOJPjhSy5JHZGmi', '2024-09-14 05:22:47', '2024-09-14 05:35:10', NULL, NULL),
(96, NULL, 'john robert', 'aguila', 'joaguila@my.cspc.edu.ph', '2410704', 'Student', '$2y$12$4ukKVMbyN8lnbHZsPfIhPuq1RZGOCG1Hv4T75lMvz7lD62Jkkhxm.', NULL, NULL, '875341185761', NULL, '2024-09-14 05:22:53', '2024-09-14 05:39:01', NULL, NULL),
(97, NULL, 'Niccolo Joaquin', 'Raynera', 'niraynera@my.cspc.edu.ph', '2411423', 'Student', '$2y$12$1rd3E8bq2jPOOo6XMMwJ9.qTgA7r0XyT3yr8cAOO1i9VrpCGjUJfK', NULL, NULL, '942400111198', 'p43DMHamBKLzsOPcfAVd0RayQgjsPkMMSN2XmrE2DEYo8OIS80OT57pFM3lV', '2024-09-14 05:23:04', '2024-09-14 05:52:09', NULL, NULL),
(98, NULL, 'Joecal', 'Boac', 'joboac@my.cspc.edu.ph', '2411294', 'Student', '$2y$12$uR1sR6HgHPLJJCS6ncmVSuD6kpAAtR2oUdG6L9gkMhilJJKMGNhQa', NULL, NULL, '873260352068', 'iw8tUL0TSKiXJsICzvOLBCsrF1iYNS1p9rWfU5ll6JP28CFfTNX7NbMfaY0S', '2024-09-14 05:24:05', '2024-09-14 05:55:27', NULL, NULL),
(99, NULL, 'Reymark', 'Pimentel', 'repimentel@my.cspc.edu.ph', '2411419', 'Student', '$2y$12$SMOYo1YDcu78yuFHT6VZWuuwu76C4bM7OW2kTfgC7xwgYhJP4ZGNW', NULL, NULL, '941605552757', 'mLXKW5tfNHIGQKaFzTgvu6Cypy0MtcqhqJhYv0dtSZjW9uoDsRq63FEmeFFw', '2024-09-14 05:24:35', '2024-09-14 05:34:42', NULL, NULL),
(100, NULL, 'John Zander', 'Machado', 'johmachado@my.cspc.edu.ph', '2411408', 'Student', '$2y$12$cKWjuZT0ehXuVC4UpgDQ9uvpmeXP8bKWsnG1rjvRJwhbKLIUGY.1O', NULL, NULL, '875112923714', 'XtldeGpTn1dFvxnydFgBkhRrOeBLoKtCxxZHb35duX3oqIhJgYhguaQlGCIo', '2024-09-14 05:25:36', '2024-09-14 05:38:07', NULL, NULL),
(101, NULL, 'john michael', 'gorgonia', 'jogorgonia@my.cspc.edu.ph', '2411403', 'Student', '$2y$12$uP2FIsHA/i/mQ5w4Xyd70uuEft3TOadPqmYCQsyueHlgX9dGAOLO2', NULL, NULL, '873143763566', 'kybYOnoxHCb8qk4aPN3wIcrmX6ikYu6V6Z57BeS2oVSLUfBXRdAfcqtTInC2', '2024-09-14 05:25:59', '2024-09-14 05:50:45', NULL, NULL),
(102, NULL, 'Mariah Jean', 'Saño', 'marisano@my.cspc.edu.ph', '2411425', 'Student', '$2y$12$/qXx9a6.tG3vOfcOXJjF.uRellk.TJwPuxPQ6Nqfmr7Heg.qthAdi', NULL, NULL, '874811458100', 'iJUJYQULQhWkYDICZCDK79X5L2swSoiXS2F4Ir1q5stxlCxOoHo9h75ARzmF', '2024-09-14 05:26:52', '2024-09-14 05:36:48', NULL, NULL),
(103, NULL, 'Krisha Mae', 'Tevar', 'krtevar@my.cspc.edu.ph', '2411307', 'Student', '$2y$12$V7VZqBw.JIgXisefs7x4EOt1qKHY4MSDJVcf6p1yhsRVvbVA2mbIO', NULL, NULL, '872023229155', 'brQlFV8eBMWnneZJw4GVCJ9i5oyKds4SRxQzQv4TB8gkRCe97iO8n1HzIMOx', '2024-09-14 05:27:18', '2024-09-14 05:36:10', NULL, NULL),
(104, NULL, 'Angel Anne', 'Sasutona', 'ansasutona@my.cspc.edu.ph', '2411305', 'Student', '$2y$12$FCBwM7mHVrL7rwIl/tCezueDGw6ctoWYMRUE7ZzASs3jnZLEoXLcq', NULL, NULL, '873809019433', 'vNvaZ5Tmr80OthciGEgvh2lRHCbjGT0SFIUXVzTICvwwcWLjBlX2aSVWSdKw', '2024-09-14 05:27:46', '2024-09-14 05:46:48', NULL, NULL),
(105, NULL, 'Myla', 'Sazon', 'mysazon@my.cspc.edu.ph', '2412840', 'Student', '$2y$12$i757KezqfD4Qv.wMbQ0GJ.4u2yktHp7xB8hbrICYFvgaNJ1mwmbIS', NULL, NULL, '875339285198', 'sdbSCuXPZMdCf3Rco0dKsT1x5kma4ksOZUWornMDtuFbkgOFWR3li2Dkjzph', '2024-09-14 05:28:11', '2024-09-14 05:52:31', NULL, NULL),
(106, NULL, 'Leorence', 'Baybayon', 'lebaybayon@my.cspc.edu.ph', '2411292', 'Student', '$2y$12$WpwFlxpzcfil1o6SwES6ZuNW5jJeIlcGQDWxzd7CXyq751uuad7pa', NULL, NULL, NULL, NULL, '2024-09-14 05:29:52', '2024-09-14 05:29:52', NULL, NULL),
(107, NULL, 'eman', 'corbito', 'emcorbito@my.cspc.edu.ph', '2411369', 'Student', '$2y$12$Pag0dhOM3kgSuNtn9eDe3uFrr15182I6O1Fwoh8nhGWiIyQi6Pd2m', NULL, NULL, '874643751481', NULL, '2024-09-14 05:30:33', '2024-09-14 05:37:36', NULL, NULL),
(108, NULL, 'Cathyrine', 'Chua', 'cathyrinechua@cspc.edu.ph', '122345666', 'Faculty', '$2y$12$Hidmk3ah/ubO3afrEFplsOPO61mmX6k2KUgTUwyQ.sfy4a4c8rB/S', NULL, NULL, '606971440290', 'sMAI7tmXSaUnQKQJ76y3kNa9rNxAbK32kyJEKUqeggTkxUqF58YaWBzIuaVd', '2024-09-14 05:30:39', '2024-09-14 05:44:01', NULL, NULL),
(109, NULL, 'clair kurt', 'cepe', 'clcepe@my.cspc.edu.ph', '24113118', 'Student', '$2y$12$pKQQ5I3VLwFd94YqVw4dvOwqq7dYcZAFfjOFh1ZrdmrVZZwgYYC3e', NULL, NULL, '876063457987', 'Mgdwob8aDyGRogbOJVQnlXycHySMqOek10ktdnBJE3Bi1DecRF4TpLudLrkg', '2024-09-14 05:31:17', '2024-09-14 05:57:40', NULL, NULL),
(110, NULL, 'Noami Tryll', 'Renegado', 'norenegado@my.cspc.edu.ph', '2411304', 'Student', '$2y$12$pUaVwLXUDP.N4y8hSxw3zuVbRxlvWO2aLm2LAoMe1ebc5xP3et8Yu', NULL, NULL, NULL, NULL, '2024-09-14 05:31:47', '2024-09-14 05:31:47', NULL, NULL),
(111, NULL, 'art', 'reforsado', 'arreforsado@my.cspc.edu.ph', '2412105', 'Student', '$2y$12$cFjQATBqy9ItnBF7wfsoPODj5tnsgMxP9oQ/j6G7NBfhOZwp1DUym', NULL, NULL, '874061923053', 'L1pTRh1qsrS7Hdkcdp3yeH7EHF9ljjt8Q8qZK0LuIloM0Z2ZQL2YutElCzNv', '2024-09-14 05:35:38', '2024-09-14 05:46:03', NULL, NULL),
(112, NULL, 'jean joseph', 'belleza', 'jebelleza@my.cspc.edu.ph', '2412825', 'Student', '$2y$12$Hxe5T1yCE8/Es2EWw8FEn.38FZOkT5qBn4AoLuQQgv8UtRLlx2c7.', NULL, NULL, '875106894566', 'adKMDPe7oEHbnpR01IwWZeDwZHGkrcFRXgdsZT33xO75dafjVfjICT78Y4wy', '2024-09-14 05:36:29', '2024-09-14 05:49:00', NULL, NULL),
(113, NULL, 'Joshua', 'Sapinoso', 'jossapinoso@my.cspc.edu.ph', '2412839', 'Student', '$2y$12$GcePBaUtwjNkuG8rhgbNYe02ikIXB52RzlSNk8LDSYjkzAWOS7K52', NULL, NULL, '874444259873', 'DBrqy2VlS5smCNdaH3HKLf1pSY2CG0yIv17ATlmi5Wf4qRvpJzXzG2PgANUx', '2024-09-14 05:37:31', '2024-09-14 05:51:33', NULL, NULL),
(114, NULL, 'Mark Anthony', 'Dancalan', 'macdancalan@cspc.edu.ph', '872216887920', 'Faculty', '$2y$12$MmY1ed7Idr7o9ZcXoiivYeizgDxl/2SEIYxb2pNcaTOAggfEpsRZO', NULL, NULL, '872216887920', 'kIyjxtJ2HWyoEf9aPEc8TPxgrZAiBuXsiSQUI6e2vicq1KB7DMK7CTfkfU7A', '2024-09-18 07:08:48', '2024-09-18 07:21:45', NULL, NULL),
(115, NULL, 'Toby Marcos', 'Brinas', 'tobrinas@my.cspc.edu.ph', '231003296', 'Student', '$2y$12$VPrjM9pnYVPRIvQAqS3cAu2KiaVjlbQEkExVLbhL9Ud74ef3BoDKe', NULL, NULL, '658754063231', 'CLWNB0vQMM0JMaACE28zJiYu1o2cqLfBSXJQn2hLyseDQddBhrieaMAwalag', '2024-09-18 07:14:21', '2024-09-18 07:32:02', NULL, NULL),
(116, NULL, 'FRANCIN', 'CALDERON', 'frcalderon@my.cspc.edu.ph', '231003011', 'Student', '$2y$12$5UHJkk77qOwP7ycYgDDmReSn65fX0o6VeI41XftYedWo77dlHFTsS', NULL, NULL, '407347025433', 'v2CKGmY6jPFkeJfDSOBZKprGItJxmLSONkjnbbWLMqnqWSzYxvRrpXuZxsfI', '2024-09-18 07:14:37', '2024-09-18 07:27:48', NULL, NULL),
(117, NULL, 'Ginwin', 'Quicay', 'gilastrollo@my.cspc.edu.ph', '231004361', 'Student', '$2y$12$Pzr.ydq6lthLvpkGjbBya.pzLih6u117X8JFi4lWh3Jn1z4/.drte', NULL, NULL, '1091506820971', 'kWo4yskmsOFT3LDfQJQwBDGdWROgbFtLbupB7A2rcNIAX49tbXMuIqcUbG4S', '2024-09-18 07:15:12', '2024-09-18 08:00:53', NULL, NULL),
(119, NULL, 'RIC LAWRENCE', 'LETIGIO', 'riletigio@my.cspc.edu.ph', '231003237', 'Student', '$2y$12$5bUrC2XNXNOKPIXtGTNKy.vy4kOSKgPYn98MWeiUVgmbWTs06kGmy', NULL, NULL, '819916199903', 'EPBGcdwqMTy28Z4BLbntr4s4lEeYNfa9aleK4POxVA87DfvgWqc1idbYC5TW', '2024-09-18 07:17:06', '2024-09-18 07:28:45', NULL, NULL),
(120, NULL, 'Ian', 'Parma', 'iaparma@my.cspc.edu.ph', '231003934', 'Student', '$2y$12$.WOswWxkB0AYK8Oex/KD3OFMnOXljRWJwNKKsLJa6dzcpXc2bvx7K', NULL, NULL, NULL, NULL, '2024-09-18 07:17:20', '2024-09-18 07:17:20', NULL, NULL),
(121, NULL, 'josie', 'pulido', 'jopulido@my.cspc.edu.ph', '231003008', 'Student', '$2y$12$A921iaGIPY3MgkKHdAIEeuNE22FntH8xv4dZIJtUO3bXXI1AbW8mS', NULL, NULL, '886553663300', '2pUrzURd3yAkVY9jFLc6XiqKKwUkwb9fzxlSfgAD3HudBatN9M4SYVYWE0sQ', '2024-09-18 07:18:49', '2024-09-18 07:43:19', NULL, NULL),
(122, NULL, 'paulette', 'santor', 'pasantor@my.cspc.edu.ph', '231003994', 'Student', '$2y$12$SVjTWY3.lFA84vK32keS0u3p1993p/YBPB68Sds0Uhre.BAvLAi9.', NULL, NULL, '339145545288', 'JfMaQKyH4NaDNVlZjgLNh5vKvp3nTwihzPeDzthhTWXVU92pasDKikZe0nQe', '2024-09-18 07:19:00', '2024-09-18 07:33:36', NULL, NULL),
(123, NULL, 'Justhin', 'Magbuhos', 'jumagbuhos@my.cspc.edu.ph', '231003267', 'Student', '$2y$12$ErYukSC1v.P4GrkA5.Afx.mtmG9jcxImFq8BlIfDhd5cNYvVsg6PG', NULL, NULL, '680883476383', '07G5Gh0iKtt2hrEvdX9A4WY1ulEUEaCG7X795FOkXTgO77rAAlU1wxZsdrqI', '2024-09-18 07:20:42', '2024-09-18 07:45:14', NULL, NULL),
(124, NULL, 'hazel', 'salud', 'hasalud@my.cspc.edu.ph', '231000252', 'Student', '$2y$12$WEu9.k9EWmj/iogAoyDz1.y7IFeNW36HBH34Eb6He1xKNnJb0MPf2', NULL, NULL, '264409017536', 'edtyKXD8yXmSBiXrW7OKX2PwLKMU05ql2TWpLKWHa7fkIKcuo85MZ1HUOWLF', '2024-09-18 07:22:27', '2024-09-18 07:51:45', NULL, NULL),
(125, NULL, 'Ynah Marie', 'Calibara', 'yncalibara@my.cspc.edu.ph', '231002366', 'Student', '$2y$12$cRhR8q2KbI1F2.e1sSrthOwGetIL0aCdwhHR9.WMFVLE1qNz48Jbi', NULL, NULL, '873245803161', 'xrN9nFq1VxqcK70M70hFWoa6KoyDiUHWhNLd6KrdY0tgl4tItk0BdiCGWtNB', '2024-09-18 07:23:16', '2024-09-18 07:50:43', NULL, NULL),
(126, NULL, 'christian michael', 'postrado', 'chpostrado@my.cspc.edu.ph', '231003023', 'Student', '$2y$12$j2f66D81qgryR90qxa6AF.B7LoTg75tCv494yJ5S/15eUknbKwNCi', NULL, NULL, '679359829988', 'bFgGse4GmSYQZtle33LHVfDP1TZS475DpJ2ADhvHHHdvAgPvkttryqOH61H1', '2024-09-18 07:23:49', '2024-09-18 07:29:41', NULL, NULL),
(127, NULL, 'krestine joy', 'secopito', 'krsecopito@my.cspc.edu.ph', '231003037', 'Student', '$2y$12$h2Q6JMI6xzJBTF5V87bGOOWFE1Ypvz9BgChaIiUmkJxItBKaWVa0.', NULL, NULL, '199530993652', '2GrmptqXvKJw9Fqfa2N2w1Shtb1Bn9V8h8s2KsZx75iAHWBvpXkEDyG378nP', '2024-09-18 07:24:34', '2024-09-18 07:59:01', NULL, NULL),
(128, NULL, 'shajana', 'talagtag', 'shtalagtag@my.cspc.edu.ph', '231003844', 'Student', '$2y$12$kWwtND9Ta1ZrQIDQacfRVeR0wJwxK3VRtB1yVivM7hgrCKWvK.N16', NULL, NULL, NULL, NULL, '2024-09-18 07:25:09', '2024-09-18 07:25:09', NULL, NULL),
(129, NULL, 'Pyxis', 'Sayson', 'pysayson@my.cspc.edu.ph', '231003036', 'Student', '$2y$12$BXD1eaHd2Gfptmbz1ox61eANSF8rXm29rVArHmrc9QiWIrvqHHH82', NULL, NULL, '130794739651', 'ZYN7m3SSArY73RIMhvJSu2IGhRiYrkxugtRL0psFtneYCAjdtav48Uv0zDqB', '2024-09-18 07:25:42', '2024-09-18 07:44:47', NULL, NULL),
(130, NULL, 'John Dave', 'Tomes', 'jotormes@my.cspc.edu.ph', '2310033277', 'Student', '$2y$12$iHKhD82CtkPgbg2KXRi.g.YlXH54cBcvDsiYBCLgTbiMoLYnKvuKK', NULL, NULL, '199950817035', 'QT8a7XSIrbZKMbQXSzETSYhoac8i7z8MgstOFxtd4XaUWT2QfHan8UhRIVOg', '2024-09-18 07:25:55', '2024-09-18 07:42:13', NULL, NULL),
(131, NULL, 'Jan Benjie', 'Cardiel', 'jacardiel@my.cspc.edu.ph', '231002102', 'Student', '$2y$12$yed6oeGMzVoA.Bvdhc1Of./gaR66gzMy3DmDprB0Kuw/ahbPc4bh.', NULL, NULL, NULL, NULL, '2024-09-18 07:28:04', '2024-09-18 07:28:04', NULL, NULL),
(132, NULL, 'Sandara', 'Amosco', 'saamosco@my.cspc.edu.ph', '231003810', 'Student', '$2y$12$OzWI1LOkPTDEb3PsgbpYzuVOzJvrPO1Go7KpsIS/CrhvGDtZYhuiy', NULL, NULL, NULL, 'jRGDWgOLC1tgdo1Wt2WmKOwjLvyQ5x05sLuSBLDIDjLukbLGoHtKIzPPBtxP', '2024-09-18 07:30:00', '2024-09-18 07:30:00', NULL, NULL),
(133, NULL, 'Ma. Lovella', 'Brondial', 'mabetervo@my.cspc.edu.ph', '231002370', 'Student', '$2y$12$XVZPbEgewp0xmcgoV3UI5Ob6J0RKyhCETD32WZUDDGHXkFa19JUCS', NULL, NULL, '474238310301', 'vjpjfOcA30R1CLHMSTiVaKTrXdeaN2rPgVfvfs5XBXK6CYD9WD6ovtMU4TZ8', '2024-09-18 07:32:14', '2024-09-18 07:36:57', NULL, NULL),
(134, NULL, 'Diana Jane', 'Reyes', 'direyes@my.cspc.edu.ph', '231003811', 'Student', '$2y$12$71ddi2HhzFVs8oV2Z1SnjuVA3J0ksGQxuxc2dHHCGYavKNqV6LRxG', NULL, NULL, '885853542181', NULL, '2024-09-18 07:34:01', '2024-09-18 07:42:45', NULL, NULL),
(135, NULL, 'Glaiza', 'Pocaan', 'glpocaan@my.cspc.edu.ph', '231003189', 'Student', '$2y$12$YwAfwq2qVPeE73OzOKuNRe6I8HptOK9u3VvU9.zfVQdNUqL4pywMe', NULL, NULL, '60745602756', 'BgNr7X3XeX0zkIU4eMgNX0JgevTSu3KRFMHD7Dw5sSrR49Eh2Y5H6HCVbnpV', '2024-09-18 07:35:19', '2024-09-18 07:47:58', NULL, NULL),
(136, NULL, 'Jamaica Nicole', 'Velarde', 'javelarde@my.cspc.edu.ph', '231003294', 'Student', '$2y$12$NR7ReNybYvuTiI2jbKLjxOeBO11E9eMB4zSEmV8xggwaSlib0NmCO', NULL, NULL, '1023108994947', '8GuY0eq1p1Br49t1UoFws92ignCzdvLSH02Jsu0JXTBu5bqSEVUFe0lD6S8A', '2024-09-18 07:36:31', '2024-09-18 07:44:12', NULL, NULL),
(137, NULL, 'Maricar', 'Calpe', 'macalpe@my.cspc.edu.ph', '231003180', 'Student', '$2y$12$B/G3hZgeMUP70aiVp5s3luEgSm4IJMLUJdTtOwZ6t5sMTi/iL0LPe', NULL, NULL, '1026346670150', 'eF2kbFlSQo0VaixOEpRHgWnHEXkATWKBwvlEKg4Cyu1y8xlukwu3YUJ5N1as', '2024-09-18 07:37:47', '2024-09-18 08:01:02', NULL, NULL),
(138, NULL, 'Bryan', 'Talagtag', 'brtalagtag@my.cspc.edu.ph', '21003004', 'Student', '$2y$12$kNC7HdYaoeg.1ZpLPYxpwu3X2Ksm1fEfbvwvGgqIgxPJdrP9kzZo.', NULL, NULL, NULL, NULL, '2024-09-18 07:39:42', '2024-09-18 07:39:42', NULL, NULL),
(139, NULL, 'EDROSE', 'PRESNILLO', 'edpesnillo@my.cspc.edu.ph', '231003235', 'Student', '$2y$12$sHv/gBx0yr6Xf0zZ3fCtvuFvIaykFQVdC3rBuqDOPwelAaUneJeGS', NULL, NULL, '542021081058', NULL, '2024-09-18 07:41:45', '2024-09-18 07:46:41', NULL, NULL),
(140, NULL, 'christian rey', 'baydal', 'chrbaydal@my.cspc.edu.ph', '23103932', 'Student', '$2y$12$jdyI3JVUdoYnVZtPA0wg1eXFz.CuiSrXjVW3Vs8DJhL2ZQVQfAG6a', NULL, NULL, '405237553238', 'YhfzzuNXsOXE9TW2Hlan80QR8W0oxZQzQ3zHbR7Y1o5CQASBqOzLqJydlUSc', '2024-09-18 07:42:58', '2024-09-18 07:46:16', NULL, NULL),
(141, NULL, 'Jerald', 'Macalalag', 'jemacalalag@my.cspc.edu.ph', '1200287', 'Student', '$2y$12$zM8swcQ.jBloFBJUK/nr4uZ/0nv/mc7fHVkYHyo.Esq6dMWtvNLuC', NULL, NULL, '199280318488', 'sfq8bL3WqhppWtQwFPQpZ4uA1veUal4CVxBL9AJkkiBjr8saoWySfZ07nhAU', '2024-09-18 07:43:59', '2024-09-18 07:48:25', NULL, NULL),
(142, NULL, 'john clyde', 'balila', 'jobalila@my.cspc.edu.ph', '231003233', 'Student', '$2y$12$SVzWU1SegL.HROalHfSys.bkA1HXnPtDFVBbM0hkzL3eQHPgGR1Se', NULL, NULL, '544601364256', 'GwpFAdMPvnfryNKE57VTgzBYbeDYQ973OrifofmY8Cwme2QaqUBCkwFrXpHi', '2024-09-18 07:44:34', '2024-09-18 07:51:20', NULL, NULL),
(143, NULL, 'Kathlaine Faith', 'Rojales', 'rokathlaine@my.cspc.edu.ph', '231004105', 'Student', '$2y$12$V8QupGAIZ74bEi7a5iw9ce0CN8QgG8bj3V87YcqxdBk/hz/BMeDZy', NULL, NULL, '819781916664', 'OMxu2Fz2biRHmDQgw1q8EanQZfENGZKixpy69SFho8ULvllhdKYLmb5ZBx2S', '2024-09-18 07:46:03', '2024-09-18 07:58:04', NULL, NULL),
(144, NULL, 'Jeffrey', 'Sendon', 'jefsendon@my.cspc.edu.ph', '231003911', 'Student', '$2y$12$K.KRGzqoflhnPq4FqKB9VOYigHU2Zy8Zwqd89eF9bL5hVNBpRP8kO', NULL, NULL, '873623880235', NULL, '2024-09-18 07:46:11', '2024-09-18 07:49:02', NULL, NULL),
(145, NULL, 'chery ann', 'Hosana', 'chhosana@my.cspc.edu.ph', '231002998', 'Student', '$2y$12$ws5oA581vZEtoTNzKMwCReiEgoMnU6Zi/ZI6l7QN.C/CKnqIT6MYe', NULL, NULL, '266403010484', 'OaWoNd89nQJRg0VkSkLzKdj3oB4F8UnE0D9PxhK0l2Uk7qXMvIt5QTwwvet8', '2024-09-18 07:47:46', '2024-09-18 08:00:27', NULL, NULL),
(146, NULL, 'johnlloyd', 'alvarado', 'joalvarado@my.cspc.edu.ph', '221008432', 'Student', '$2y$12$nyrSIbBiWoiZQ3GYBU9p8OPwPd/PTao2Uoo0y/w89iQ2jokgz3cG.', NULL, NULL, '534936414118', 'BceKWij7YidUq2cdzCEsqzZyghmDzdbx5zbEAUv2MZSqe6JHoyKDGfZdNUs7', '2024-09-18 07:48:13', '2024-09-18 07:59:19', NULL, NULL),
(147, NULL, 'camelle', 'Baita', 'cabaita@my.cspc.edu.ph', '231002368', 'Student', '$2y$12$LGrHvsPo1C4gHsZplaeZoeAwn6/vCthbTcgQMRy8fpjjLfNSrcBAW', NULL, NULL, '954484020765', '9IkFKDNmJrQSYb2UwWOwEYI3Ry32TzoYEhrLmy84k6Obfsu6MG3rhI3WxN1u', '2024-09-18 07:49:13', '2024-09-18 08:01:51', NULL, NULL),
(148, NULL, 'jeddafaith', 'tumbado', 'jedtumbado@my.cspc.edu.ph', '231002378', 'Student', '$2y$12$Se.MBHfw02vUb5C/LW467eETZMqJqASPga.9bBzXfU1QENDHBtPzS', NULL, NULL, '130692306683', NULL, '2024-09-18 07:50:58', '2024-09-18 08:01:17', NULL, NULL),
(149, NULL, 'Jasfer', 'Padayhag', 'japadayhag@my.cspc.edu.ph', '231004127', 'Student', '$2y$12$TDSZNr1zPYp0U1XaYKlPb.TNZYfaFdL1CbReZz3QDvHWlLnK3rjFy', NULL, NULL, '469879909472', 'IOLRLwZlNPPedpsQk6c4Sd71ECIXDPg2Y74ygSvKy7HV1RR8h7Wu0ZlPrFwJ', '2024-09-18 07:52:41', '2024-09-18 08:00:02', NULL, NULL),
(150, NULL, 'Angel', 'Bernardino', 'anbernardino@my.cspc.edu.ph', '231004032', 'Student', '$2y$12$x4TL0q54tSg2eFSKOOheIO1KVry3KEw54wtMYmy/eb26mtQRo7dB6', NULL, NULL, '474438588401', '2uy1kN7i7FDcL2xrJqoDHgS45Tvka4YLAnmiAbaSLY8G30dIiBlSW5rO8gsi', '2024-09-18 07:53:05', '2024-09-18 07:59:42', NULL, NULL),
(151, NULL, 'Hodge Spencer', 'Santor', 'hosantor@my.cspc.edu.ph', '231003993', 'Student', '$2y$12$JpH32rfrqRRJ0Bbx2G/c2eMF0ksb8Wi6P4DoaGw6WfEc3DqSitbVe', NULL, NULL, '544502208050', 'z9p6NLvItQo340vQZwCJhPKJPT6N7b26nmXYzKmqoKnu5TVOTyy5Hao9YxE8', '2024-09-18 07:54:18', '2024-09-18 08:00:20', NULL, NULL),
(152, NULL, 'jepre', 'pontillas', 'jeppontillas@my.cspc.edu.ph', '21003034', 'Student', '$2y$12$ZrtpHvyfZXYUMKqAW/Q5oO5i6XH9QBrD9haQFh9ZJL8tmULEoRyk2', NULL, NULL, '748795615004', 'pbRZbHDAPRuk42UumICLuqYFNVzSuNcuU4pEl5StRNwXUkC5LxJMtXm1f2G2', '2024-09-18 07:55:02', '2024-09-18 08:02:01', NULL, NULL),
(153, NULL, 'jerro', 'villaneuva', 'jervillanueva@my.cspc.edu.ph', '231003904', 'Student', '$2y$12$GD6XZ9Gd9cDQtC.67S9IoOLow0ufHT0gQ1vCAbroeYbuEXroA0xfq', NULL, NULL, NULL, NULL, '2024-09-18 07:57:04', '2024-09-18 07:57:04', NULL, NULL),
(155, 'Mae Ann Tagum', 'Mae Ann', 'Tagum', 'mtagum@cspc.edu.ph', '2022080119', 'Faculty', '$2y$12$u8cZm9Vl9HOcJYCIGFK2Gua1n9OV6Fu1rPNNn.fHn/bMt7fcYjzpS', 'https://lh3.googleusercontent.com/a/ACg8ocJ0ec5x9ezQsuoPnggi-KsS5n-bGvktClvCpIsONeS-h1h1_Q=s96-c', '103607203248176498098', '943152661126', 'so7EM0TmkOuVMNl1f5kzSRJPxprw7Ms9UafVKZYmqoyr53PbeXqOojHhXjEA', '2024-09-19 02:41:23', '2024-09-19 03:59:00', NULL, NULL),
(216, NULL, 'Mark Allen', 'Olino', 'marolino@my.cspc.edu.ph', '221002008', 'Student', '$2y$12$6pjtWJbChFYNJcDCirZLqexrJOyZr49MMhQk9MTHeAwRIw7nVV9mW', NULL, NULL, '59769457127', 'puGj9PJm3QqOpheCLgK4uTxsP7ip74yND3ajMrWgaBnnwD28WozHpdOuxRvK', '2024-09-19 03:25:35', '2024-09-19 03:38:19', NULL, NULL),
(217, NULL, 'Nathaniel', 'Aviles', 'naaviles@my.cspc.edu.ph', '221002249', 'Student', '$2y$12$/YhjK.xbNbVlQ7YXGfz3Ze3zrnGecl8KimFpxC1FJb1bzQpmn.b62', NULL, NULL, '603673519960', 'kv9bQEvko0nAIXHXSzAsJpZIl3dDrqlikmBa8GVx2FaYrkGkIqxbNj49u8nn', '2024-09-19 03:26:16', '2024-09-19 03:35:02', NULL, NULL),
(218, NULL, 'Klyntz Ytrx', 'Elevado', 'klelevado@my.cspc.edu.ph', '221007141', 'Student', '$2y$12$SHfWL2Gn9ujHOhp8Xe.5p.bI1IthdzbIOPbB/gmhtqJMkYOxRLnIW', NULL, NULL, '55693797255', 'Zte5viK9WAuKHfZ1ej2Dfw9R1rpFmYlBYxXOp2luZW6Y90qtgFpmtbVqaZQC', '2024-09-19 03:27:11', '2024-09-19 03:39:06', NULL, NULL),
(219, NULL, 'Jorey', 'Tubieras', 'jotubieras@my.cspc.edu.ph', '221002200', 'Student', '$2y$12$Ug7SCxPj1nk7z4y5eomMsulHWeJYOxIhFpkEGsxIsPY9PIfIgg/mq', NULL, NULL, '536547878857', 'norgu3d8M3P2WDagvuz0mqt5n0OL8mAjPwFCZRv6WVcTGvJxxNUhkste8lxh', '2024-09-19 03:27:56', '2024-09-19 03:39:55', NULL, NULL),
(220, NULL, 'John Lester', 'Dela Cruz', 'jodelacruz@my.cspc.edu.ph', '221002183', 'Student', '$2y$12$U..71lVC81C4CgaiJqFlxe6FYAFXkhPyYvMDIhp6adVF5y9JuCpGq', NULL, NULL, '184424134826', 'TjIrnjO6j16Li0U46ZPgGHTyDC3wwJ6sW6bxuUCYRagUzUoi2ikzLhzcswKj', '2024-09-19 03:28:45', '2024-11-30 09:25:45', NULL, '2024-11-30 09:25:45'),
(221, NULL, 'John Edward', 'Hontalba', 'johontalba@my.cspc.edu.ph', '221002191', 'Student', '$2y$12$KbCErBKSAYyAaFwDYCKGd.sCyfuKy03FXjMce.Hz7IYZ41NZ.KFHq', NULL, NULL, '741953234735', 'oNbpk5ZpTPb6fSdl9fV8ldDHl2Tg5DuFgpbkkLaIY1kuaKXxQjDx1TAA5Tu9', '2024-09-19 03:29:02', '2024-09-19 03:41:59', NULL, NULL),
(222, NULL, 'Lloyd', 'Boteño', 'joboteno@my.cspc.edu.ph', '221003084', 'Student', '$2y$12$5URxN2b3BIebVeictj440O..QONPMmNW2HdweGFqLujca.mn7XvLC', NULL, NULL, '544450041642', 'ZTuDHe2rc2OVzkippVWzoXNj9hO2NGFMTmQ5CA33jpdaQIC6HqYIzoimsY5D', '2024-09-19 03:29:30', '2024-09-19 03:46:03', NULL, NULL),
(223, NULL, 'Criszabeth', 'B. Amoto', 'cramoto@my.cspc.edu.ph', '221001069', 'Student', '$2y$12$5MIgZtzJ8sQZkxNlBGl74e6ACd5sUqNXrLueozkEnfV18967023tG', NULL, NULL, NULL, '3dd6jldtJTrSFHWN58c9xQFj7AXVfjEg4mPly4NVHNTw05CZDY3yGvBe0q6q', '2024-09-19 03:29:49', '2024-09-19 03:45:37', NULL, NULL),
(224, NULL, 'Meliza', 'Lavapie', 'melavapie@my.cspc.edu.ph', '221001068', 'Student', '$2y$12$PI4mfxF2.LQhP1tNzAcUSOHqTKJw6fbbiHM8BOlrWr8CAHVcFeLQW', NULL, NULL, NULL, 'MXZgWjSfPCCuQmBRo4qDnzOxi9UuQHMvfIfYlY5I61ExQGMdU6Hm1PSxi615', '2024-09-19 03:30:13', '2024-09-19 03:53:48', NULL, NULL),
(225, NULL, 'John Joward', 'Loria', 'joloria@my.cspc.edu.ph', '221006141', 'Student', '$2y$12$5ViIPsEjB/2TZ1hhNV84Ne8h6su9gY10QILP6sM4Zvxogi.Te0PLy', NULL, NULL, '947588949800', 'r99dfmJqofyyZScVIKb4FMnNr2yBF5WGprkaIg1oyFyGIaCgTauPhHFFXR0g', '2024-09-19 03:30:43', '2024-10-14 10:34:55', NULL, NULL),
(226, NULL, 'student', 'student', 'student@my.cspc.edu.ph', 'cstudent', 'Student', '$2y$12$9xLjFjpwg6JBsWhE1VR/8e1084rDN1NlM4FRA2VGi5Y/wg2Ags0wS', NULL, NULL, '873537766083', 'pKvrIZQm6sun3RxFjZgy4D9OcWaF4NDyznzEXvxelj8vL6cLfJqShauKLn0E', '2024-09-20 11:54:12', '2024-09-20 11:56:15', NULL, NULL),
(227, NULL, 'faculty', 'faculty', 'faculty@cspc.edu.ph', 'C10', 'Faculty', '$2y$12$7ymN2GuIhVhF3w4mAzXyAO/vy5fp/FMGUVHQTd78.yL49YDu9YDJW', NULL, NULL, NULL, 'ZdPbBqm3CroSEhmQdVqGEbzvSFhPlxuS409x1VYZU7Qi5oo7drKiYp1uSSSR', '2024-10-14 11:11:36', '2024-10-14 11:11:36', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_logs`
--

CREATE TABLE `user_logs` (
  `idLogs` bigint(20) UNSIGNED NOT NULL,
  `userID` varchar(50) DEFAULT NULL,
  `action` varchar(100) NOT NULL,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_logs`
--

INSERT INTO `user_logs` (`idLogs`, `userID`, `action`, `date`, `time`, `created_at`, `updated_at`) VALUES
(1, 'C3', 'Updated the profile password', '2024-09-10', '16:36:13', NULL, NULL),
(2, 'C1', 'Added new Student account using hanojara@my.cspc.edu.ph ', '2024-09-10', '16:47:19', NULL, NULL),
(3, 'C3', 'Added new Faculty account using faculty@my.cspc.edu.ph ', '2024-09-10', '16:44:20', NULL, NULL),
(4, 'C2', 'Added new Student account using ezalforte@my.cspc.edu.ph ', '2024-09-10', '16:44:24', NULL, NULL),
(5, 'C3', 'Added New Regular Schedule for ISEC', '2024-09-10', '16:46:02', NULL, NULL),
(6, 'C2', 'Added new Student account using juturalde@my.cspc.edu.ph ', '2024-09-10', '16:46:58', NULL, NULL),
(7, 'C3', 'Added new Student account using haferrer@my.cspc.edu.ph ', '2024-09-10', '16:47:27', NULL, NULL),
(8, 'C3', 'Added new Student account using aarosauro@my.cspc.edu.ph ', '2024-09-10', '16:49:00', NULL, NULL),
(9, 'C2', 'Added new Student account using lallagas@my.cspc.edu.ph ', '2024-09-10', '16:49:14', NULL, NULL),
(10, 'C1', 'Added new Student account using rarengalota@my.cspc.edu.ph ', '2024-09-10', '16:53:00', NULL, NULL),
(11, 'C3', 'Added new Student account using rizorilla@my.cspc.edu.ph ', '2024-09-10', '16:50:21', NULL, NULL),
(12, 'C1', 'Added new Student account using jabermas@my.cspc.edu.ph ', '2024-09-10', '16:54:03', NULL, NULL),
(13, 'C2', 'Added new Student account using kiedroso@my.cspc.edu.ph ', '2024-09-10', '16:51:02', NULL, NULL),
(14, 'C3', 'Added new Student account using chrelatores@my.cspc.edu.ph ', '2024-09-10', '16:51:57', NULL, NULL),
(15, 'C1', 'Added new Student account using leluares@my.cspc.edu.ph ', '2024-09-10', '16:56:05', NULL, NULL),
(16, 'C2', 'Added new Student account using jepresnillo@my.cspc.edu.ph ', '2024-09-10', '16:53:00', NULL, NULL),
(17, 'C1', 'Added new Student account using marbeloro@my.cspc.edu.ph ', '2024-09-10', '16:57:33', NULL, NULL),
(18, 'C3', 'Added new Student account using chbaria@my.cspc.edu.ph ', '2024-09-10', '16:55:00', NULL, NULL),
(19, 'C2', 'Added new Student account using adsaballero@my.cspc.edu.ph ', '2024-09-10', '16:55:17', NULL, NULL),
(20, 'C1', 'Added new Student account using dogasgas@my.cspc.edu.ph ', '2024-09-10', '16:58:43', NULL, NULL),
(21, NULL, 'Added new Class List', '2024-09-10', '17:02:26', NULL, NULL),
(22, '221007722', 'Joined to BSIS-3B schedule', '2024-09-10', '17:03:30', NULL, NULL),
(23, '221007546', 'Joined to BSIS-3B schedule', '2024-09-10', '17:04:29', NULL, NULL),
(24, '221006178', 'Joined to BSIS-3B schedule', '2024-09-10', '17:05:53', NULL, NULL),
(25, 'C20100603', 'Joined to BSIS-3B schedule', '2024-09-10', '17:10:23', NULL, NULL),
(26, '221006878', 'Joined to BSIS-3B schedule', '2024-09-10', '17:09:09', NULL, NULL),
(27, '221008331', 'Joined to BSIS-3B schedule', '2024-09-10', '17:09:35', NULL, NULL),
(28, '221007264', 'Joined to BSIS-3B schedule', '2024-09-10', '17:12:57', NULL, NULL),
(29, '221007264', 'Updated the profile password', '2024-09-10', '17:14:06', NULL, NULL),
(30, '221006666', 'Joined to BSIS-3B schedule', '2024-09-10', '17:12:03', NULL, NULL),
(31, '221007558', 'Joined to BSIS-3B schedule', '2024-09-10', '17:12:18', NULL, NULL),
(32, 'c21101571', 'Joined to BSIS-3B schedule', '2024-09-10', '17:16:04', NULL, NULL),
(33, '221008518', 'Joined to BSIS-3B schedule', '2024-09-10', '17:13:55', NULL, NULL),
(34, 'c21101571', 'Updated the profile password', '2024-09-10', '17:17:10', NULL, NULL),
(35, 'C21101044', 'Joined to BSIS-3B schedule', '2024-09-10', '17:14:48', NULL, NULL),
(36, '221007491', 'Joined to BSIS-3B schedule', '2024-09-10', '17:15:55', NULL, NULL),
(37, 'C2', 'Activated C10-Faculty Faculty RFID', '2024-09-10', '17:20:31', NULL, NULL),
(38, '221002158', 'Joined to BSIS-3B schedule', '2024-09-10', '17:23:30', NULL, NULL),
(39, '221002158', 'Updated the profile password', '2024-09-10', '17:24:29', NULL, NULL),
(40, 'C3', 'Activated C3-Ralph Lorzano RFID', '2024-09-10', '17:28:52', NULL, NULL),
(41, 'C3', 'Entered the ERP Laboratory', '2024-09-09', '17:30:05', NULL, NULL),
(42, 'C3', 'Entered the ERP Laboratory', '2024-09-09', '17:30:14', NULL, NULL),
(43, 'C3', 'Entered the ERP Laboratory', '2024-09-09', '17:31:01', NULL, NULL),
(44, 'C3', 'Deleted pending RFID', '2024-09-10', '17:31:45', NULL, NULL),
(45, 'C2', 'Activated 221008331-Aaron Austin Rosauro RFID', '2024-09-10', '17:32:15', NULL, NULL),
(46, '221007901', 'Joined to BSIS-3B schedule', '2024-09-10', '17:38:05', NULL, NULL),
(47, 'C3', 'Entered the ERP Laboratory', '2024-09-09', '17:38:08', NULL, NULL),
(48, 'C3', 'Activated 221002158-EZRA FAE ALFORTE RFID', '2024-09-10', '17:41:22', NULL, NULL),
(49, 'C3', 'Activated 221007546-Justine Matthew Turalde RFID', '2024-09-10', '17:42:22', NULL, NULL),
(50, 'C3', 'Activated 221006178-Niño Jaybee Bermas RFID', '2024-09-10', '17:46:02', NULL, NULL),
(51, 'C3', 'Activated 221007558-Ralph Gabriel Saño RFID', '2024-09-10', '17:46:48', NULL, NULL),
(52, 'C3', 'Entered the ERP Laboratory', '2024-09-10', '17:46:56', NULL, NULL),
(53, 'C3', 'Activated 221007901-Christine Joy Relatores RFID', '2024-09-10', '17:47:33', NULL, NULL),
(54, 'C3', 'Activated 221006138-Hazel Nojara RFID', '2024-09-10', '17:49:36', NULL, NULL),
(55, 'C2', 'Activated 221008518-ricko Zorilla RFID', '2024-09-10', '17:50:47', NULL, NULL),
(56, 'C3', 'Entered the ERP Laboratory', '2024-09-10', '17:53:57', NULL, NULL),
(57, 'C3', 'Entered the ERP Laboratory', '2024-09-10', '17:55:08', NULL, NULL),
(58, 'C1', 'Activated 221007491-Jeremiah Presnillo RFID', '2024-09-10', '17:58:57', NULL, NULL),
(59, 'C1', 'Activated 221006878-Harold Ferrer RFID', '2024-09-10', '17:59:21', NULL, NULL),
(60, 'C3', 'Activated c21101571-Kim Harold Edroso RFID', '2024-09-10', '17:56:10', NULL, NULL),
(61, 'C1', 'Activated C21101044-Adrian Saballero RFID', '2024-09-10', '18:00:03', NULL, NULL),
(62, 'C3', 'Activated 221007264-Lance Llagas RFID', '2024-09-10', '17:57:27', NULL, NULL),
(63, 'C3', 'Entered the ERP Laboratory', '2024-09-10', '17:59:57', NULL, NULL),
(64, 'C11', 'Added new Faculty account using ja@cspc.edu.ph ', '2024-09-12', '10:14:12', NULL, NULL),
(65, 'C14', 'Updated the profile password', '2024-09-12', '10:17:24', NULL, NULL),
(66, 'C14', 'Attempt to update profile', '2024-09-12', '10:18:33', NULL, NULL),
(67, 'C11', 'Added new Faculty account using jo@my.cspc.edu.ph ', '2024-09-12', '10:22:32', NULL, NULL),
(68, 'C1', 'Updated ISEC schedule', '2024-09-12', '12:32:40', NULL, NULL),
(69, 'C1', 'Deleted C10-Faculty attendance on 2024-09-10 17:39:17 ', '2024-09-12', '12:32:57', NULL, NULL),
(70, 'C1', 'Deleted C10-Faculty attendance on 2024-09-12 12:31:07 ', '2024-09-12', '14:03:15', NULL, NULL),
(71, 'C3', 'Entered the ERP Laboratory', '2024-09-12', '14:01:05', NULL, NULL),
(72, 'C1', 'Updated ISEC schedule', '2024-09-12', '14:07:40', NULL, NULL),
(73, 'C1', 'Added new Student account using debalino@my.cspc.edu.ph ', '2024-09-12', '14:11:57', NULL, NULL),
(74, 'C1', 'Added new Student account using amalarcio@my.cspc.edu.ph ', '2024-09-12', '14:13:43', NULL, NULL),
(75, 'C21103926', 'Joined to BSIS-3B schedule', '2024-09-12', '14:16:44', NULL, NULL),
(76, 'C21102627', 'Joined to BSIS-3B schedule', '2024-09-12', '14:17:47', NULL, NULL),
(77, 'C1', 'Added new Student account using marefereza@my.cspc.edu.ph ', '2024-09-12', '14:20:37', NULL, NULL),
(78, 'C1', 'Added new Student account using apsoreta@my.cspc.edu.ph ', '2024-09-12', '14:21:48', NULL, NULL),
(79, 'C1', 'Added new Student account using selim@my.cspc.edu.ph ', '2024-09-12', '14:22:47', NULL, NULL),
(80, 'C1', 'Added new Student account using jogamilo@my.cspc.edu.ph ', '2024-09-12', '14:23:55', NULL, NULL),
(81, 'C21101205', 'Joined to BSIS-3B schedule', '2024-09-12', '14:25:35', NULL, NULL),
(82, 'C25', 'Activated C21102368-MARYLIE REFEREZA RFID', '2024-09-12', '14:26:57', NULL, NULL),
(83, 'C25', 'Activated C21103064-April Joy Soreta RFID', '2024-09-12', '14:27:46', NULL, NULL),
(84, 'C1', 'Added new Student account using pakevenjahn@my.cspc.edu.ph ', '2024-09-12', '14:28:01', NULL, NULL),
(85, 'C25', 'Activated C21102341-Sean Lim RFID', '2024-09-12', '14:28:11', NULL, NULL),
(86, 'C21101147', 'Joined to BSIS-3B schedule', '2024-09-12', '14:29:07', NULL, NULL),
(87, 'C21101147', 'Updated the profile password', '2024-09-12', '14:29:51', NULL, NULL),
(88, 'C21102368', 'Joined to BSIS-3B schedule', '2024-09-12', '14:31:31', NULL, NULL),
(89, 'C21103064', 'Joined to BSIS-3B schedule', '2024-09-12', '14:32:08', NULL, NULL),
(90, 'C21103064', 'Updated the profile password', '2024-09-12', '14:33:05', NULL, NULL),
(91, 'C21102341', 'Joined to BSIS-3B schedule', '2024-09-12', '14:34:38', NULL, NULL),
(92, 'C25', 'Activated C21101147-kevlar pajenago RFID', '2024-09-12', '14:34:51', NULL, NULL),
(93, 'C21102341', 'Updated the profile password', '2024-09-12', '14:35:27', NULL, NULL),
(94, 'C21102368', 'Updated the profile password', '2024-09-12', '14:38:37', NULL, NULL),
(95, 'C25', 'Added new Student account using jecena@my.cspc.edu.ph ', '2024-09-12', '16:05:41', NULL, NULL),
(96, 'C21100467', 'Joined to BSIS-3B schedule', '2024-09-12', '16:06:28', NULL, NULL),
(97, 'C3', 'Entered the ERP Laboratory', '2024-09-12', '16:04:18', NULL, NULL),
(98, 'C25', 'Activated C21100467-jesrie Cena RFID', '2024-09-12', '16:08:33', NULL, NULL),
(99, 'C3', 'Entered the ERP Laboratory', '2024-09-12', '16:13:11', NULL, NULL),
(100, 'C3', 'Entered the ERP Laboratory', '2024-09-12', '16:15:01', NULL, NULL),
(101, 'C1', 'Added new Student account using jorabusa@my.cspc.edu.ph ', '2024-09-14', '07:29:02', NULL, NULL),
(102, 'C60', 'Added new Student account using daoares@my.cspc.edu.ph ', '2024-09-14', '07:29:08', NULL, NULL),
(103, 'C2', 'Added new Student account using kebuquid@my.cspc.edu.ph ', '2024-09-14', '07:29:13', NULL, NULL),
(104, 'C60', 'Added new Student account using jaajero@my.cspc.edu.ph ', '2024-09-14', '07:30:16', NULL, NULL),
(105, 'C2', 'Added new Student account using joaurillas@my.cspc.edu.ph ', '2024-09-14', '07:30:22', NULL, NULL),
(106, 'C1', 'Added new Student account using neinocencio@my.cspc.edu.ph ', '2024-09-14', '07:30:27', NULL, NULL),
(107, 'C1', 'Added new Student account using jaolavere@my.cspc.edu.ph ', '2024-09-14', '07:31:10', NULL, NULL),
(108, 'C2', 'Added new Student account using kebermido@my.cspc.edu.ph ', '2024-09-14', '07:31:34', NULL, NULL),
(109, 'C60', 'Added new Student account using mabalilla@my.cspc.edu.ph ', '2024-09-14', '07:31:43', NULL, NULL),
(110, 'C2', 'Added new Student account using Jupadua@my.cspc.edu.ph ', '2024-09-14', '07:33:27', NULL, NULL),
(111, 'C1', 'Added new Faculty account using antllabres@cspc.edu.ph ', '2024-09-14', '07:34:18', NULL, NULL),
(112, 'C60', 'Added new Student account using jaabonita@my.cspc.edu.ph ', '2024-09-14', '07:34:27', NULL, NULL),
(113, 'C3', 'Entered the ERP Laboratory', '2024-09-14', '07:33:08', NULL, NULL),
(114, 'C1', 'Added New Regular Schedule for ITEC - 313', '2024-09-14', '07:35:26', NULL, NULL),
(115, 'C2', 'Added new Student account using cioscoro@my.cspc.edu.ph ', '2024-09-14', '07:36:04', NULL, NULL),
(116, 'C3', 'Entered the ERP Laboratory', '2024-09-14', '07:34:50', NULL, NULL),
(117, 'C3', 'Entered the ERP Laboratory', '2024-09-14', '07:35:22', NULL, NULL),
(118, 'C60', 'Added new Student account using bagilbert@my.cspc.edu.ph ', '2024-09-14', '07:36:59', NULL, NULL),
(119, 'COS Admin 147', 'Added new Class List', '2024-09-14', '07:37:52', NULL, NULL),
(120, 'C60', 'Added new Student account using jacervas@my.cspc.edu.ph ', '2024-09-14', '07:38:03', NULL, NULL),
(121, 'C60', 'Added new Student account using cypandes@my.cspc.edu.ph ', '2024-09-14', '07:39:02', NULL, NULL),
(122, '221001164', 'Joined to BSIT-3A schedule', '2024-09-14', '07:39:24', NULL, NULL),
(123, '221001251', 'Joined to BSIT-3A schedule', '2024-09-14', '07:45:58', NULL, NULL),
(124, '221001567', 'Joined to BSIT-3A schedule', '2024-09-14', '07:47:51', NULL, NULL),
(125, '221001412', 'Joined to BSIT-3A schedule', '2024-09-14', '07:48:17', NULL, NULL),
(126, '221001464', 'Joined to BSIT-3A schedule', '2024-09-14', '07:48:51', NULL, NULL),
(127, '221001464', 'Updated the profile password', '2024-09-14', '07:50:10', NULL, NULL),
(128, '221001464', 'Attempt to update profile', '2024-09-14', '07:50:32', NULL, NULL),
(129, 'C1', 'Added new Student account using micezar@my.cspc.edu.ph ', '2024-09-14', '07:51:19', NULL, NULL),
(130, '221001410', 'Joined to BSIT-3A schedule', '2024-09-14', '07:52:36', NULL, NULL),
(131, '221001280', 'Joined to BSIT-3A schedule', '2024-09-14', '07:53:50', NULL, NULL),
(132, '221001145', 'Joined to BSIT-3A schedule', '2024-09-14', '07:54:12', NULL, NULL),
(133, '221001135', 'Joined to BSIT-3A schedule', '2024-09-14', '07:54:28', NULL, NULL),
(134, '221001155', 'Joined to BSIT-3A schedule', '2024-09-14', '07:55:25', NULL, NULL),
(135, 'C1', 'Activated COS Admin 147-Anthony Llabres RFID', '2024-09-14', '07:57:13', NULL, NULL),
(136, NULL, 'Joined to BSIT-3A schedule', '2024-09-14', '07:58:13', NULL, NULL),
(137, 'C70', 'Activated 221001464-JOLINA rabusa RFID', '2024-09-14', '07:59:10', NULL, NULL),
(138, NULL, 'Updated the profile password', '2024-09-14', '07:59:12', NULL, NULL),
(139, NULL, 'Attempt to update profile', '2024-09-14', '07:59:35', NULL, NULL),
(140, 'C70', 'Activated 221001567-jared olavere RFID', '2024-09-14', '07:59:45', NULL, NULL),
(141, 'C1', 'Added new Student account using apabonita@my.cspc.edu.ph ', '2024-09-14', '08:00:45', NULL, NULL),
(142, 'C70', 'Deleted a user account', '2024-09-14', '08:02:05', NULL, NULL),
(143, '221001122', 'Joined to BSIT-3A schedule', '2024-09-14', '08:02:22', NULL, NULL),
(144, '221001122', 'Updated the profile password', '2024-09-14', '08:02:53', NULL, NULL),
(145, '221001251', 'Updated ID number from 22101251 to 221001251', '2024-09-14', '08:02:57', NULL, NULL),
(146, 'C1', 'Added new Student account using jeillanza@my.cspc.edu.ph ', '2024-09-14', '08:04:01', NULL, NULL),
(147, 'C70', 'Added new Student account using neinocencio@my.cspc.edu.ph ', '2024-09-14', '08:04:11', NULL, NULL),
(148, '221001332', 'Joined to BSIT-3A schedule', '2024-09-14', '08:05:06', NULL, NULL),
(149, 'C1', 'Added new Student account using marcatorce@my.cspc.edu.ph ', '2024-09-14', '08:06:05', NULL, NULL),
(150, '221001274', 'Joined to BSIT-3A schedule', '2024-09-14', '08:07:43', NULL, NULL),
(151, 'C70', 'Added new Student account using kahugo@my.cspc.edu.ph ', '2024-09-14', '08:07:51', NULL, NULL),
(152, 'C1', 'Added new Student account using vinenimedez@my.cspc.edu.ph ', '2024-09-14', '08:09:03', NULL, NULL),
(153, 'C70', 'Activated 221001122-April Abonita RFID', '2024-09-14', '08:09:57', NULL, NULL),
(154, '221001290', 'Joined to BSIT-3A schedule', '2024-09-14', '08:10:14', NULL, NULL),
(155, 'C70', 'Activated 221001274-Marjon Catorce RFID', '2024-09-14', '08:10:32', NULL, NULL),
(156, 'C1', 'Added new Student account using jegasgas@my.cspc.edu.ph ', '2024-09-14', '08:11:03', NULL, NULL),
(157, '221001321', 'Joined to BSIT-3A schedule', '2024-09-14', '08:11:41', NULL, NULL),
(158, 'C70', 'Activated 221001412-Julian Paul Padua RFID', '2024-09-14', '08:11:56', NULL, NULL),
(159, '221001334', 'Joined to BSIT-3A schedule', '2024-09-14', '08:13:10', NULL, NULL),
(160, 'C1', 'Added new Student account using student@my.cspc.edu.ph ', '2024-09-14', '10:04:25', NULL, NULL),
(161, 'C1', 'Added new Student account using parinon@my.cspc.edu.ph ', '2024-09-14', '12:11:33', NULL, NULL),
(162, 'C70', 'Added new Student account using kuromero@my.cspc.edu.ph ', '2024-09-14', '12:12:28', NULL, NULL),
(163, 'C2', 'Added new Student account using madequito@my.cspc.edu.ph ', '2024-09-14', '12:12:33', NULL, NULL),
(164, 'C1', 'Added new Student account using markdeguzman@my.cspc.edu.ph ', '2024-09-14', '12:13:16', NULL, NULL),
(165, 'C2', 'Added new Student account using niclocsin@my.cspc.edu.ph ', '2024-09-14', '12:13:36', NULL, NULL),
(166, 'C1', 'Added new Student account using josaunar@my.cspc.edu.ph ', '2024-09-14', '12:14:47', NULL, NULL),
(167, 'C1', 'Added new Student account using marsalcedo@my.cspc.edu.ph ', '2024-09-14', '12:16:24', NULL, NULL),
(168, 'C1', 'Added new Student account using momaglapid@my.cspc.edu.ph ', '2024-09-14', '12:17:53', NULL, NULL),
(169, 'C1', 'Added new Student account using pilibardo@my.cspc.edu.ph ', '2024-09-14', '12:20:16', NULL, NULL),
(170, 'C2', 'Added new Student account using angtuyay@my.cspc.edu.ph ', '2024-09-14', '12:22:19', NULL, NULL),
(171, 'C1', 'Added new Student account using vewekis@my.cspc.edu.ph ', '2024-09-14', '12:22:25', NULL, NULL),
(172, 'C70', 'Added new Student account using johabitan@my.cspc.edu.ph ', '2024-09-14', '12:23:18', NULL, NULL),
(173, 'C2', 'Added new Student account using edparada@my.cspc.edu.ph ', '2024-09-14', '12:23:27', NULL, NULL),
(174, 'C1', 'Added new Student account using rollabres@my.cspc.edu.ph ', '2024-09-14', '12:24:01', NULL, NULL),
(175, 'C2', 'Added new Student account using phflotildes@my.cspc.edu.ph ', '2024-09-14', '12:24:21', NULL, NULL),
(176, 'C70', 'Added new Student account using lorbalang@my.cspc.edu.ph ', '2024-09-14', '12:24:56', NULL, NULL),
(177, 'C1', 'Added new Student account using grmariafrancia@my.cspc.edu.ph ', '2024-09-14', '12:25:17', NULL, NULL),
(178, 'C2', 'Added new Student account using gwpimentel@my.cspc.edu.ph ', '2024-09-14', '12:25:58', NULL, NULL),
(179, 'C1', 'Added new Student account using chespinosa@my.cspc.edu.ph ', '2024-09-14', '12:26:37', NULL, NULL),
(180, 'C70', 'Added new Student account using joboto@my.cspc.edu.ph ', '2024-09-14', '12:26:43', NULL, NULL),
(181, 'C2', 'Added new Student account using shmarmol@my.cspc.edu.ph ', '2024-09-14', '12:27:18', NULL, NULL),
(182, 'C70', 'Added new Student account using masantor@my.cspc.edu.ph ', '2024-09-14', '12:28:01', NULL, NULL),
(183, 'C1', 'Added new Student account using alcapiz@my.cspc.edu.ph ', '2024-09-14', '12:28:26', NULL, NULL),
(184, 'C2', 'Added new Student account using soarrabe@my.cspc.edu.ph ', '2024-09-14', '12:28:35', NULL, NULL),
(185, 'C70', 'Added new Student account using joueno@my.cspc.edu.ph ', '2024-09-14', '12:29:19', NULL, NULL),
(186, 'C1', 'Added new Student account using johbelga@my.cspc.edu.ph ', '2024-09-14', '12:29:58', NULL, NULL),
(187, 'C2', 'Added new Student account using dacolico@cspc.edu.ph ', '2024-09-14', '12:30:04', NULL, NULL),
(188, 'C70', 'Added new Student account using johnnadal@my.cspc.edu.ph ', '2024-09-14', '12:30:29', NULL, NULL),
(189, 'C70', 'Deleted a user account', '2024-09-14', '12:31:48', NULL, NULL),
(190, 'C2', 'Added new Student account using dacolico@my.cspc.edu.ph ', '2024-09-14', '12:33:02', NULL, NULL),
(191, 'C1', 'Added new Faculty account using sambuenarhea08@my.cspc.edu.ph ', '2024-09-14', '12:33:26', NULL, NULL),
(192, 'C70', 'Activated 231004661-Josiah Jaziel Ueno RFID', '2024-09-14', '12:34:25', NULL, NULL),
(193, 'C3', 'Entered the ERP Laboratory', '2024-09-14', '12:30:29', NULL, NULL),
(194, 'C1', 'Added New Regular Schedule for IS 214', '2024-09-14', '12:34:47', NULL, NULL),
(195, 'C3', 'Entered the ERP Laboratory', '2024-09-14', '12:30:42', NULL, NULL),
(196, 'C70', 'Activated 231002999-Veronica Wekis RFID', '2024-09-14', '12:35:15', NULL, NULL),
(197, 'C2', 'Added new Student account using jaylozano10@my.cspc.edu.ph ', '2024-09-14', '12:35:25', NULL, NULL),
(198, 'C3', 'Entered the ERP Laboratory', '2024-09-14', '12:31:20', NULL, NULL),
(199, 'C70', 'Activated 231002997-charm lyka espinosa RFID', '2024-09-14', '12:35:47', NULL, NULL),
(200, 'C70', 'Activated 231005214-Pia Libardo RFID', '2024-09-14', '12:36:12', NULL, NULL),
(201, 'C70', 'Activated 231005602-Patrick Riñon RFID', '2024-09-14', '12:36:36', NULL, NULL),
(202, '1600204', 'Added new Class List', '2024-09-14', '12:36:42', NULL, NULL),
(203, 'C2', 'Added new Student account using jocabal@my.cspc.edu.ph ', '2024-09-14', '12:36:54', NULL, NULL),
(204, 'C70', 'Activated 231003121-Roselle Llabres RFID', '2024-09-14', '12:37:39', NULL, NULL),
(205, '231004660', 'Updated ID number from 23104660 to 231004660', '2024-09-14', '12:38:00', NULL, NULL),
(206, 'C70', 'Activated 231003701-Gwyneth Pimentel RFID', '2024-09-14', '12:38:07', NULL, NULL),
(207, '231004660', 'Updated the profile password', '2024-09-14', '12:38:25', NULL, NULL),
(208, 'C2', 'Updated madequito@my.cspc.edu.ph account : Student User ID - 2310451', '2024-09-14', '12:38:29', NULL, NULL),
(209, 'C70', 'Activated 231004601-Angel Christoper Tuyay RFID', '2024-09-14', '12:38:39', NULL, NULL),
(210, '231004660', 'Joined to BSIS-2C schedule', '2024-09-14', '12:38:54', NULL, NULL),
(211, 'C70', 'Activated 231003241-Marian Jean Santor RFID', '2024-09-14', '12:39:03', NULL, NULL),
(212, 'C70', 'Activated 231003017-Algen Jake Capiz RFID', '2024-09-14', '12:39:25', NULL, NULL),
(213, 'C70', 'Activated 231003860-Sophia Lorin Arrabe RFID', '2024-09-14', '12:39:50', NULL, NULL),
(214, '231005602', 'Joined to BSIS-2C schedule', '2024-09-14', '12:40:09', NULL, NULL),
(215, 'C70', 'Activated 231005377-Kurt Henry Romero RFID', '2024-09-14', '12:40:42', NULL, NULL),
(216, 'C70', 'Activated 231004571-Mark Harvey De Quito RFID', '2024-09-14', '12:41:03', NULL, NULL),
(217, 'C3', 'Entered the ERP Laboratory', '2024-09-14', '12:38:36', NULL, NULL),
(218, 'C70', 'Activated 231004660-Phoebe Flotildes RFID', '2024-09-14', '12:41:24', NULL, NULL),
(219, 'C70', 'Activated 231005327-Mark Angelo De Guzman RFID', '2024-09-14', '12:41:44', NULL, NULL),
(220, '231003028', 'Joined to BSIS-2C schedule', '2024-09-14', '12:41:45', NULL, NULL),
(221, 'C70', 'Activated 231002375-marvin salcedo RFID', '2024-09-14', '12:42:12', NULL, NULL),
(222, 'C70', 'Activated 231002374-edgardo parada RFID', '2024-09-14', '12:42:36', NULL, NULL),
(223, 'C70', 'Activated 231004940-jay lozano RFID', '2024-09-14', '12:43:00', NULL, NULL),
(224, 'C70', 'Activated 231003006-john mark cabal RFID', '2024-09-14', '12:43:26', NULL, NULL),
(225, '231003742', 'Joined to BSIS-2C schedule', '2024-09-14', '12:43:29', NULL, NULL),
(226, 'C3', 'Entered the ERP Laboratory', '2024-09-14', '12:40:59', NULL, NULL),
(227, 'C70', 'Activated 231003025-John Dave Belga RFID', '2024-09-14', '12:43:54', NULL, NULL),
(228, 'C70', 'Activated 231004405-nicasio locsin RFID', '2024-09-14', '12:44:21', NULL, NULL),
(229, '231004661', 'Joined to BSIS-2C schedule', '2024-09-14', '12:44:35', NULL, NULL),
(230, 'C3', 'Entered the ERP Laboratory', '2024-09-14', '12:41:55', NULL, NULL),
(231, '221006851', 'Joined to BSIS-2C schedule', '2024-09-14', '12:44:41', NULL, NULL),
(232, 'C70', 'Activated 231004711-loreto balang RFID', '2024-09-14', '12:44:49', NULL, NULL),
(233, 'C70', 'Activated 231005316-Daniella Colico RFID', '2024-09-14', '12:45:13', NULL, NULL),
(234, '221008223', 'Joined to BSIS-2C schedule', '2024-09-14', '12:45:37', NULL, NULL),
(235, 'C70', 'Activated 231003014-monico maglapid RFID', '2024-09-14', '12:45:41', NULL, NULL),
(236, 'C3', 'Entered the ERP Laboratory', '2024-09-14', '12:42:56', NULL, NULL),
(237, 'C70', 'Activated 231003742-John Louie Abitan RFID', '2024-09-14', '12:46:10', NULL, NULL),
(238, '231003017', 'Joined to BSIS-2C schedule', '2024-09-14', '12:46:19', NULL, NULL),
(239, 'C3', 'Entered the ERP Laboratory', '2024-09-14', '12:44:08', NULL, NULL),
(240, 'C70', 'Activated 231001906-john paul saunar RFID', '2024-09-14', '12:46:52', NULL, NULL),
(241, '231003280', 'Updated ID number from 23103280 to 231003280', '2024-09-14', '12:48:12', NULL, NULL),
(242, '231004601', 'Joined to BSIS-2C schedule', '2024-09-14', '12:48:16', NULL, NULL),
(243, '231003280', 'Joined to BSIS-2C schedule', '2024-09-14', '12:48:24', NULL, NULL),
(244, 'C3', 'Entered the ERP Laboratory', '2024-09-14', '12:46:15', NULL, NULL),
(245, 'C70', 'Activated 231003028-Maria Francia Gregorio RFID', '2024-09-14', '12:49:39', NULL, NULL),
(246, '231005327', 'Joined to BSIS-2C schedule', '2024-09-14', '12:50:03', NULL, NULL),
(247, 'C70', 'Activated 221008223-john siegfred nadal RFID', '2024-09-14', '12:50:15', NULL, NULL),
(248, '231005377', 'Joined to BSIS-2C schedule', '2024-09-14', '12:51:19', NULL, NULL),
(249, 'C70', 'Activated 1600204-Rhea Española RFID', '2024-09-14', '12:51:28', NULL, NULL),
(250, 'C70', 'Updated IS 214 schedule', '2024-09-14', '12:52:03', NULL, NULL),
(251, '231004571', 'Joined to BSIS-2C schedule', '2024-09-14', '12:52:15', NULL, NULL),
(252, 'C70', 'Activated 221006851-john gabriel boto RFID', '2024-09-14', '12:52:47', NULL, NULL),
(253, 'C70', 'Activated 231003280-Shiela Mae Marmol RFID', '2024-09-14', '12:53:16', NULL, NULL),
(254, '231004405', 'Joined to BSIS-2C schedule', '2024-09-14', '12:53:26', NULL, NULL),
(255, '231003014', 'Joined to BSIS-2C schedule', '2024-09-14', '12:54:29', NULL, NULL),
(256, '231003025', 'Joined to BSIS-2C schedule', '2024-09-14', '12:54:37', NULL, NULL),
(257, '231005316', 'Joined to BSIS-2C schedule', '2024-09-14', '12:55:26', NULL, NULL),
(258, '231001906', 'Joined to BSIS-2C schedule', '2024-09-14', '12:55:37', NULL, NULL),
(259, 'C3', 'Entered the ERP Laboratory', '2024-09-14', '12:52:53', NULL, NULL),
(260, '231003006', 'Joined to BSIS-2C schedule', '2024-09-14', '12:56:02', NULL, NULL),
(261, '231003701', 'Joined to BSIS-2C schedule', '2024-09-14', '12:56:53', NULL, NULL),
(262, '231003121', 'Joined to BSIS-2C schedule', '2024-09-14', '12:57:19', NULL, NULL),
(263, '231002997', 'Joined to BSIS-2C schedule', '2024-09-14', '12:57:51', NULL, NULL),
(264, '231002999', 'Joined to BSIS-2C schedule', '2024-09-14', '12:58:21', NULL, NULL),
(265, '231003860', 'Joined to BSIS-2C schedule', '2024-09-14', '12:58:35', NULL, NULL),
(266, '231002374', 'Joined to BSIS-2C schedule', '2024-09-14', '13:00:55', NULL, NULL),
(267, '231002375', 'Joined to BSIS-2C schedule', '2024-09-14', '13:01:00', NULL, NULL),
(268, '231005214', 'Joined to BSIS-2C schedule', '2024-09-14', '13:01:08', NULL, NULL),
(269, '231004940', 'Joined to BSIS-2C schedule', '2024-09-14', '13:02:04', NULL, NULL),
(270, 'C1', 'Added new Student account using almasculino@my.cspc.edu.ph ', '2024-09-14', '13:03:32', NULL, NULL),
(271, '231003292', 'Joined to BSIS-2C schedule', '2024-09-14', '13:04:50', NULL, NULL),
(272, 'C1', 'Activated 231003292-alexander masculino RFID', '2024-09-14', '13:06:58', NULL, NULL),
(273, 'C3', 'Entered the ERP Laboratory', '2024-09-14', '13:18:20', NULL, NULL),
(274, 'C70', 'Added new Student account using micolle@my.cspc.edu.ph ', '2024-09-14', '13:21:45', NULL, NULL),
(275, 'C70', 'Added new Student account using aabanal@my.cspc.edu.ph ', '2024-09-14', '13:22:52', NULL, NULL),
(276, 'C2', 'Added new Student account using joaguila@my.cspc.edu.ph ', '2024-09-14', '13:22:57', NULL, NULL),
(277, 'C1', 'Added new Student account using niraynera@my.cspc.edu.ph ', '2024-09-14', '13:23:09', NULL, NULL),
(278, 'C2', 'Added new Student account using joboac@my.cspc.edu.ph ', '2024-09-14', '13:24:11', NULL, NULL),
(279, 'C70', 'Added new Student account using repimentel@my.cspc.edu.ph ', '2024-09-14', '13:24:41', NULL, NULL),
(280, 'C1', 'Added new Student account using johmachado@my.cspc.edu.ph ', '2024-09-14', '13:25:40', NULL, NULL),
(281, 'C70', 'Added new Student account using jogorgonia@my.cspc.edu.ph ', '2024-09-14', '13:26:03', NULL, NULL),
(282, 'C1', 'Added new Student account using marisano@my.cspc.edu.ph ', '2024-09-14', '13:26:58', NULL, NULL),
(283, 'C2', 'Added new Student account using krtevar@my.cspc.edu.ph ', '2024-09-14', '13:27:23', NULL, NULL),
(284, 'C70', 'Added new Student account using ansasutona@my.cspc.edu.ph ', '2024-09-14', '13:27:50', NULL, NULL),
(285, 'C1', 'Added new Student account using mysazon@my.cspc.edu.ph ', '2024-09-14', '13:28:15', NULL, NULL),
(286, 'C3', 'Entered the ERP Laboratory', '2024-09-14', '13:26:33', NULL, NULL),
(287, 'C2', 'Added new Student account using lebaybayon@my.cspc.edu.ph ', '2024-09-14', '13:29:57', NULL, NULL),
(288, 'C1', 'Added new Student account using emcorbito@my.cspc.edu.ph ', '2024-09-14', '13:30:38', NULL, NULL),
(289, 'C70', 'Added new Faculty account using cathyrinechua@cspc.edu.ph ', '2024-09-14', '13:30:45', NULL, NULL),
(290, 'C2', 'Added new Student account using clcepe@my.cspc.edu.ph ', '2024-09-14', '13:31:22', NULL, NULL),
(291, 'C70', 'Added New Regular Schedule for CCIS 102', '2024-09-14', '13:31:44', NULL, NULL),
(292, 'C1', 'Added new Student account using norenegado@my.cspc.edu.ph ', '2024-09-14', '13:31:53', NULL, NULL),
(293, '122345666', 'Added new Class List', '2024-09-14', '13:33:22', NULL, NULL),
(294, 'C70', 'Activated 2411419-Reymark Pimentel RFID', '2024-09-14', '13:34:43', NULL, NULL),
(295, 'C70', 'Activated 2411273-Aaron Samuel Banal RFID', '2024-09-14', '13:35:10', NULL, NULL),
(296, 'C1', 'Added new Student account using arreforsado@my.cspc.edu.ph ', '2024-09-14', '13:35:43', NULL, NULL),
(297, 'C70', 'Activated 2411486-Michael Ken Colle RFID', '2024-09-14', '13:35:44', NULL, NULL),
(298, 'C70', 'Activated 2411307-Krisha Mae Tevar RFID', '2024-09-14', '13:36:10', NULL, NULL),
(299, 'C2', 'Added new Student account using jebelleza@my.cspc.edu.ph ', '2024-09-14', '13:36:34', NULL, NULL),
(300, 'C70', 'Activated 2411425-Mariah Jean Saño RFID', '2024-09-14', '13:36:48', NULL, NULL),
(301, 'C1', 'Added new Student account using jossapinoso@my.cspc.edu.ph ', '2024-09-14', '13:37:35', NULL, NULL),
(302, 'C70', 'Activated 2411369-eman corbito RFID', '2024-09-14', '13:37:36', NULL, NULL),
(303, 'C70', 'Activated 2411408-John Zander Machado RFID', '2024-09-14', '13:38:07', NULL, NULL),
(304, 'C70', 'Activated 2410704-john robert aguila RFID', '2024-09-14', '13:39:01', NULL, NULL),
(305, '2412825', 'Joined to BSIS-1B schedule', '2024-09-14', '13:39:07', NULL, NULL),
(306, 'C70', 'Set a schedule to Without Classes', '2024-09-14', '13:40:11', NULL, NULL),
(307, '2412840', 'Joined to BSIS-1B schedule', '2024-09-14', '13:40:13', NULL, NULL),
(308, 'C70', 'Set a schedule to Without Classes', '2024-09-14', '13:40:27', NULL, NULL),
(309, '2411305', 'Joined to BSIS-1B schedule', '2024-09-14', '13:41:37', NULL, NULL),
(310, '2412105', 'Joined to BSIS-1B schedule', '2024-09-14', '13:43:35', NULL, NULL),
(311, 'C70', 'Activated 122345666-Cathyrine Chua RFID', '2024-09-14', '13:44:01', NULL, NULL),
(312, 'C70', 'Activated 2412105-art reforsado RFID', '2024-09-14', '13:46:03', NULL, NULL),
(313, '2412839', 'Joined to BSIS-1B schedule', '2024-09-14', '13:46:21', NULL, NULL),
(314, 'C3', 'Entered the ERP Laboratory', '2024-09-14', '13:43:49', NULL, NULL),
(315, 'C70', 'Activated 2411305-Angel Anne Sasutona RFID', '2024-09-14', '13:46:48', NULL, NULL),
(316, '2411403', 'Joined to BSIS-1B schedule', '2024-09-14', '13:48:13', NULL, NULL),
(317, 'C70', 'Activated 2412825-jean joseph belleza RFID', '2024-09-14', '13:49:00', NULL, NULL),
(318, '2411423', 'Joined to BSIS-1B schedule', '2024-09-14', '13:49:29', NULL, NULL),
(319, '2411419', 'Joined to BSIS-1B schedule', '2024-09-14', '13:50:22', NULL, NULL),
(320, 'C70', 'Activated 2411403-john michael gorgonia RFID', '2024-09-14', '13:50:45', NULL, NULL),
(321, 'C70', 'Activated 2412839-Joshua Sapinoso RFID', '2024-09-14', '13:51:33', NULL, NULL),
(322, '2411408', 'Joined to BSIS-1B schedule', '2024-09-14', '13:51:54', NULL, NULL),
(323, 'C70', 'Activated 2411423-Niccolo Joaquin Raynera RFID', '2024-09-14', '13:52:09', NULL, NULL),
(324, 'C70', 'Activated 2412840-Myla Sazon RFID', '2024-09-14', '13:52:31', NULL, NULL),
(325, '2411425', 'Joined to BSIS-1B schedule', '2024-09-14', '13:53:44', NULL, NULL),
(326, '2411294', 'Joined to BSIS-1B schedule', '2024-09-14', '13:54:21', NULL, NULL),
(327, '2411273', 'Joined to BSIS-1B schedule', '2024-09-14', '13:55:17', NULL, NULL),
(328, 'C70', 'Activated 2411294-Joecal Boac RFID', '2024-09-14', '13:55:27', NULL, NULL),
(329, '2411486', 'Joined to BSIS-1B schedule', '2024-09-14', '13:56:17', NULL, NULL),
(330, 'C70', 'Activated 24113118-clair kurt cepe RFID', '2024-09-14', '13:57:40', NULL, NULL),
(331, '2411307', 'Joined to BSIS-1B schedule', '2024-09-14', '13:58:06', NULL, NULL),
(332, '24113118', 'Joined to BSIS-1B schedule', '2024-09-14', '13:59:39', NULL, NULL),
(333, NULL, 'Joined to BSIT-3A schedule', '2024-09-15', '15:54:15', NULL, NULL),
(334, NULL, 'Joined to BSIS-2C schedule', '2024-09-15', '16:06:34', NULL, NULL),
(335, 'C3', 'Entered the ERP Laboratory', '2024-09-18', '10:27:30', NULL, NULL),
(336, 'C3', 'Entered the ERP Laboratory', '2024-09-18', '10:28:47', NULL, NULL),
(337, 'C3', 'Entered the ERP Laboratory', '2024-09-18', '10:29:00', NULL, NULL),
(338, 'C3', 'Entered the ERP Laboratory', '2024-09-18', '10:29:18', NULL, NULL),
(339, 'C3', 'Entered the ERP Laboratory', '2024-09-18', '14:13:38', NULL, NULL),
(340, 'C3', 'Entered the ERP Laboratory', '2024-09-18', '14:13:56', NULL, NULL),
(341, 'C3', 'Entered the ERP Laboratory', '2024-09-18', '14:14:16', NULL, NULL),
(342, 'C3', 'Entered the ERP Laboratory', '2024-09-18', '14:19:06', NULL, NULL),
(343, 'C3', 'Entered the ERP Laboratory', '2024-09-18', '14:20:15', NULL, NULL),
(344, 'C1', 'Updated ISEC schedule', '2024-09-18', '14:23:57', NULL, NULL),
(345, 'C3', 'Entered the ERP Laboratory', '2024-09-18', '14:21:39', NULL, NULL),
(346, 'C1', 'Deleted C10-Faculty attendance on 2024-09-12 14:04:36 ', '2024-09-18', '14:25:16', NULL, NULL),
(347, 'C3', 'Entered the ERP Laboratory', '2024-09-18', '14:27:42', NULL, NULL),
(348, 'C3', 'Entered the ERP Laboratory', '2024-09-18', '14:29:44', NULL, NULL),
(349, 'C3', 'Entered the ERP Laboratory', '2024-09-18', '14:37:26', NULL, NULL),
(350, 'C3', 'Entered the ERP Laboratory', '2024-09-18', '14:37:29', NULL, NULL),
(351, 'C1', 'Added new Faculty account using macdancalan@cspc.edu.ph ', '2024-09-18', '15:08:57', NULL, NULL),
(352, 'C1', 'Added New Regular Schedule for CCIS 104', '2024-09-18', '15:10:00', NULL, NULL),
(353, '872216887920', 'Added new Class List', '2024-09-18', '15:11:30', NULL, NULL),
(354, 'C2', 'Added new Student account using tobrinas@my.cspc.edu.ph ', '2024-09-18', '15:14:30', NULL, NULL),
(355, 'C1', 'Added new Student account using frcalderon@my.cspc.edu.ph ', '2024-09-18', '15:14:42', NULL, NULL),
(356, 'C70', 'Added new Student account using gilastrollo@my.cspc.edu.ph ', '2024-09-18', '15:15:21', NULL, NULL),
(357, 'C2', 'Added new Student account using jacadiel@my.cspc.edu.ph ', '2024-09-18', '15:16:29', NULL, NULL),
(358, 'C1', 'Added new Student account using riletigio@my.cspc.edu.ph ', '2024-09-18', '15:17:11', NULL, NULL),
(359, 'C70', 'Added new Student account using iaparma@my.cspc.edu.ph ', '2024-09-18', '15:17:28', NULL, NULL),
(360, 'C1', 'Added new Student account using jopulido@my.cspc.edu.ph ', '2024-09-18', '15:18:55', NULL, NULL),
(361, 'C70', 'Added new Student account using pasantor@my.cspc.edu.ph ', '2024-09-18', '15:19:08', NULL, NULL),
(362, 'C2', 'Updated macdancalan@cspc.edu.ph account : Faculty User ID - 2021080060', '2024-09-18', '15:19:29', NULL, NULL),
(363, 'C1', 'Added new Student account using jumagbuhos@my.cspc.edu.ph ', '2024-09-18', '15:20:47', NULL, NULL),
(364, 'C2', 'Activated 872216887920-Mark Anthony Dancalan RFID', '2024-09-18', '15:21:45', NULL, NULL),
(365, 'C1', 'Added new Student account using hasalud@my.cspc.edu.ph ', '2024-09-18', '15:22:34', NULL, NULL),
(366, 'C70', 'Added new Student account using yncalibara@my.cspc.edu.ph ', '2024-09-18', '15:23:22', NULL, NULL),
(367, 'C1', 'Added new Student account using chpostrado@my.cspc.edu.ph ', '2024-09-18', '15:23:53', NULL, NULL),
(368, 'C2', 'Added new Student account using krsecopito@my.cspc.edu.ph ', '2024-09-18', '15:24:46', NULL, NULL),
(369, 'C1', 'Added new Student account using shtalagtag@my.cspc.edu.ph ', '2024-09-18', '15:25:14', NULL, NULL),
(370, 'C70', 'Added new Student account using pysayson@my.cspc.edu.ph ', '2024-09-18', '15:25:50', NULL, NULL),
(371, 'C2', 'Added new Student account using jotormes@my.cspc.edu.ph ', '2024-09-18', '15:26:00', NULL, NULL),
(372, 'C2', 'Deleted a user account', '2024-09-18', '15:26:55', NULL, NULL),
(373, 'C1', 'Activated 231003011-FRANCIN CALDERON RFID', '2024-09-18', '15:27:48', NULL, NULL),
(374, 'C2', 'Added new Student account using jacardiel@my.cspc.edu.ph ', '2024-09-18', '15:28:10', NULL, NULL),
(375, 'C1', 'Activated 231003237-RIC LAWRENCE LETIGIO RFID', '2024-09-18', '15:28:45', NULL, NULL),
(376, '231003994', 'Joined to BSIS-2A schedule', '2024-09-18', '15:28:59', NULL, NULL),
(377, 'C1', 'Activated 231003023-christian michael postrado RFID', '2024-09-18', '15:29:41', NULL, NULL),
(378, 'C2', 'Added new Student account using saamosco@my.cspc.edu.ph ', '2024-09-18', '15:30:04', NULL, NULL),
(379, '231004361', 'Joined to BSIS-2A schedule', '2024-09-18', '15:31:15', NULL, NULL),
(380, 'C1', 'Activated 231003296-Toby Marcos Brinas RFID', '2024-09-18', '15:32:02', NULL, NULL),
(381, 'C2', 'Added new Student account using mabetervo@my.cspc.edu.ph ', '2024-09-18', '15:32:19', NULL, NULL),
(382, '231003011', 'Joined to BSIS-2A schedule', '2024-09-18', '15:33:34', NULL, NULL),
(383, 'C1', 'Activated 231003994-paulette santor RFID', '2024-09-18', '15:33:36', NULL, NULL),
(384, 'C2', 'Added new Student account using direyes@my.cspc.edu.ph ', '2024-09-18', '15:34:06', NULL, NULL),
(385, '231003023', 'Joined to BSIS-2A schedule', '2024-09-18', '15:34:43', NULL, NULL),
(386, 'C2', 'Added new Student account using glpocaan@my.cspc.edu.ph ', '2024-09-18', '15:35:24', NULL, NULL),
(387, '231003810', 'Joined to BSIS-2A schedule', '2024-09-18', '15:36:07', NULL, NULL),
(388, 'C2', 'Added new Student account using javelarde@my.cspc.edu.ph ', '2024-09-18', '15:36:37', NULL, NULL),
(389, '231003267', 'Joined to BSIS-2A schedule', '2024-09-18', '15:36:44', NULL, NULL),
(390, 'C1', 'Activated 231002370-Ma. Lovella Brondial RFID', '2024-09-18', '15:36:58', NULL, NULL),
(391, '231003237', 'Joined to BSIS-2A schedule', '2024-09-18', '15:37:42', NULL, NULL),
(392, 'C2', 'Added new Student account using macalpe@my.cspc.edu.ph ', '2024-09-18', '15:37:52', NULL, NULL),
(393, '231003296', 'Joined to BSIS-2A schedule', '2024-09-18', '15:37:55', NULL, NULL),
(394, '231002370', 'Joined to BSIS-2A schedule', '2024-09-18', '15:38:40', NULL, NULL),
(395, '2310033277', 'Joined to BSIS-2A schedule', '2024-09-18', '15:38:58', NULL, NULL),
(396, 'C2', 'Added new Student account using brtalagtag@my.cspc.edu.ph ', '2024-09-18', '15:39:49', NULL, NULL),
(397, '231003008', 'Joined to BSIS-2A schedule', '2024-09-18', '15:40:24', NULL, NULL),
(398, '231003036', 'Joined to BSIS-2A schedule', '2024-09-18', '15:40:56', NULL, NULL),
(399, 'C2', 'Added new Student account using edpesnillo@my.cspc.edu.ph ', '2024-09-18', '15:41:49', NULL, NULL),
(400, 'C1', 'Activated 2310033277-John Dave Tomes RFID', '2024-09-18', '15:42:13', NULL, NULL),
(401, 'C1', 'Activated 231003811-Diana Jane Reyes RFID', '2024-09-18', '15:42:45', NULL, NULL),
(402, 'C2', 'Added new Student account using chrbaydal@my.cspc.edu.ph ', '2024-09-18', '15:43:05', NULL, NULL),
(403, 'C1', 'Activated 231003008-josie pulido RFID', '2024-09-18', '15:43:19', NULL, NULL),
(404, 'C70', 'Added new Student account using jemacalalag@my.cspc.edu.ph ', '2024-09-18', '15:44:05', NULL, NULL),
(405, 'C1', 'Activated 231003294-Jamaica Nicole Velarde RFID', '2024-09-18', '15:44:12', NULL, NULL),
(406, 'C2', 'Added new Student account using jobalila@my.cspc.edu.ph ', '2024-09-18', '15:44:39', NULL, NULL),
(407, 'C1', 'Activated 231003036-Pyxis Sayson RFID', '2024-09-18', '15:44:47', NULL, NULL),
(408, 'C1', 'Activated 231003267-Justhin Magbuhos RFID', '2024-09-18', '15:45:14', NULL, NULL),
(409, '1200287', 'Joined to BSIS-2A schedule', '2024-09-18', '15:46:01', NULL, NULL),
(410, 'C2', 'Added new Student account using rokathlaine@my.cspc.edu.ph ', '2024-09-18', '15:46:08', NULL, NULL),
(411, 'C70', 'Added new Student account using jefsendon@my.cspc.edu.ph ', '2024-09-18', '15:46:15', NULL, NULL),
(412, 'C1', 'Activated 23103932-christian rey baydal RFID', '2024-09-18', '15:46:16', NULL, NULL),
(413, 'C1', 'Activated 231003235-EDROSE PRESNILLO RFID', '2024-09-18', '15:46:41', NULL, NULL),
(414, 'C2', 'Added new Student account using chhosana@my.cspc.edu.ph ', '2024-09-18', '15:47:51', NULL, NULL),
(415, 'C1', 'Activated 231003189-Glaiza Pocaan RFID', '2024-09-18', '15:47:58', NULL, NULL),
(416, 'C70', 'Added new Student account using joalvarado@my.cspc.edu.ph ', '2024-09-18', '15:48:18', NULL, NULL),
(417, 'C1', 'Activated 1200287-Jerald Macalalag RFID', '2024-09-18', '15:48:25', NULL, NULL),
(418, 'C1', 'Activated 231003911-Jeffrey Sendon RFID', '2024-09-18', '15:49:02', NULL, NULL),
(419, 'C2', 'Added new Student account using cabaita@my.cspc.edu.ph ', '2024-09-18', '15:49:19', NULL, NULL),
(420, '231003233', 'Joined to BSIS-2A schedule', '2024-09-18', '15:49:51', NULL, NULL),
(421, '221008432', 'Joined to BSIS-2A schedule', '2024-09-18', '15:50:29', NULL, NULL),
(422, 'C1', 'Activated 231002366-Ynah Marie Calibara RFID', '2024-09-18', '15:50:43', NULL, NULL),
(423, 'C2', 'Added new Student account using jedtumbado@my.cspc.edu.ph ', '2024-09-18', '15:51:04', NULL, NULL),
(424, 'C1', 'Activated 231003233-john clyde balila RFID', '2024-09-18', '15:51:20', NULL, NULL),
(425, '231004105', 'Joined to BSIS-2A schedule', '2024-09-18', '15:51:21', NULL, NULL),
(426, 'C1', 'Activated 231000252-hazel salud RFID', '2024-09-18', '15:51:45', NULL, NULL),
(427, 'C2', 'Added new Student account using japadayhag@my.cspc.edu.ph ', '2024-09-18', '15:52:46', NULL, NULL),
(428, '231003189', 'Joined to BSIS-2A schedule', '2024-09-18', '15:52:47', NULL, NULL),
(429, 'C70', 'Added new Student account using anbernardino@my.cspc.edu.ph ', '2024-09-18', '15:53:10', NULL, NULL),
(430, '231000252', 'Joined to BSIS-2A schedule', '2024-09-18', '15:53:41', NULL, NULL),
(431, '231003294', 'Joined to BSIS-2A schedule', '2024-09-18', '15:53:54', NULL, NULL),
(432, 'C70', 'Added new Student account using hosantor@my.cspc.edu.ph ', '2024-09-18', '15:54:22', NULL, NULL),
(433, 'C2', 'Added new Student account using jeppontillas@my.cspc.edu.ph ', '2024-09-18', '15:55:07', NULL, NULL),
(434, '231002998', 'Joined to BSIS-2A schedule', '2024-09-18', '15:55:34', NULL, NULL),
(435, '231004032', 'Joined to BSIS-2A schedule', '2024-09-18', '15:55:48', NULL, NULL),
(436, '231002366', 'Joined to BSIS-2A schedule', '2024-09-18', '15:56:08', NULL, NULL),
(437, 'C2', 'Added new Student account using jervillanueva@my.cspc.edu.ph ', '2024-09-18', '15:57:08', NULL, NULL),
(438, '231002368', 'Joined to BSIS-2A schedule', '2024-09-18', '15:57:11', NULL, NULL),
(439, '23103932', 'Joined to BSIS-2A schedule', '2024-09-18', '15:57:27', NULL, NULL),
(440, '231003180', 'Joined to BSIS-2A schedule', '2024-09-18', '15:57:48', NULL, NULL),
(441, 'C1', 'Activated 231004105-Kathlaine Faith Rojales RFID', '2024-09-18', '15:58:04', NULL, NULL),
(442, '231004127', 'Joined to BSIS-2A schedule', '2024-09-18', '15:58:19', NULL, NULL),
(443, '231003993', 'Joined to BSIS-2A schedule', '2024-09-18', '15:58:56', NULL, NULL),
(444, 'C2', 'Activated 231003037-krestine joy secopito RFID', '2024-09-18', '15:59:01', NULL, NULL),
(445, 'C1', 'Activated 221008432-johnlloyd alvarado RFID', '2024-09-18', '15:59:19', NULL, NULL),
(446, 'C1', 'Activated 231004032-Angel Bernardino RFID', '2024-09-18', '15:59:42', NULL, NULL),
(447, 'C1', 'Activated 231004127-Jasfer Padayhag RFID', '2024-09-18', '16:00:02', NULL, NULL),
(448, 'C70', 'Activated 231003993-Hodge Spencer Santor RFID', '2024-09-18', '16:00:20', NULL, NULL),
(449, 'C1', 'Activated 231002998-chery ann Hosana RFID', '2024-09-18', '16:00:27', NULL, NULL),
(450, 'C1', 'Activated 231004361-Ginwin Quicay RFID', '2024-09-18', '16:00:53', NULL, NULL),
(451, 'C70', 'Activated 231003180-Maricar Calpe RFID', '2024-09-18', '16:01:02', NULL, NULL),
(452, 'C1', 'Activated 231002378-jeddafaith tumbado RFID', '2024-09-18', '16:01:17', NULL, NULL),
(453, '21003034', 'Joined to BSIS-2A schedule', '2024-09-18', '16:01:26', NULL, NULL),
(454, 'C1', 'Activated 231002368-camelle Baita RFID', '2024-09-18', '16:01:51', NULL, NULL),
(455, 'C70', 'Activated 21003034-jepre pontillas RFID', '2024-09-18', '16:02:01', NULL, NULL),
(456, '231003037', 'Joined to BSIS-2A schedule', '2024-09-18', '16:02:05', NULL, NULL),
(457, 'C3', 'Entered the ERP Laboratory', '2024-09-19', '09:29:38', NULL, NULL),
(458, 'C3', 'Entered the ERP Laboratory', '2024-09-19', '09:29:47', NULL, NULL),
(459, 'C3', 'Entered the ERP Laboratory', '2024-09-19', '09:29:52', NULL, NULL),
(460, 'C1', 'Updated ISEC schedule', '2024-09-19', '09:36:51', NULL, NULL),
(461, 'C1', 'Deleted C10-Faculty attendance on 2024-09-18 14:33:16 ', '2024-09-19', '09:37:20', NULL, NULL),
(462, 'C1', 'Deleted C10-Faculty attendance on 2024-09-19 09:33:04 ', '2024-09-19', '09:37:52', NULL, NULL),
(463, 'C3', 'Entered the ERP Laboratory', '2024-09-19', '10:02:50', NULL, NULL),
(464, 'C1', 'Updated ISEC schedule', '2024-09-19', '10:24:17', NULL, NULL),
(465, 'C1', 'Deactivated an RFID Account', '2024-09-19', '10:26:46', NULL, NULL),
(466, NULL, 'Attempted to Enter with Deactivated RFID', '2024-09-19', '10:22:30', NULL, NULL),
(467, 'C1', 'Deleted C10-Faculty attendance on 2024-09-19 10:18:35 ', '2024-09-19', '10:29:27', NULL, NULL),
(468, 'C1', 'Added new Faculty account using mtagum@cspc.edu.ph ', '2024-09-19', '10:37:07', NULL, NULL),
(469, NULL, 'Updated ID number from TESTING to 123456', '2024-09-19', '10:38:20', NULL, NULL),
(470, 'C1', 'Deleted a user account', '2024-09-19', '10:40:20', NULL, NULL),
(471, 'C1', 'Added new Faculty account using mtagum@cspc.edu.ph ', '2024-09-19', '10:41:28', NULL, NULL),
(472, 'C3', 'Entered the ERP Laboratory', '2024-09-19', '10:37:02', NULL, NULL),
(473, '2022080119', 'Updated ID number from TESTING to 12345', '2024-09-19', '10:42:08', NULL, NULL),
(474, 'C1', 'Added New Regular Schedule for ISA 317', '2024-09-19', '10:47:07', NULL, NULL),
(475, 'C1', 'Set a schedule to Without Classes', '2024-09-19', '10:47:28', NULL, NULL),
(476, '2022080119', 'Updated ID number from 12345 to 2022080119', '2024-09-19', '10:52:35', NULL, NULL),
(477, '2022080119', 'Added new Class List', '2024-09-19', '10:53:53', NULL, NULL),
(538, 'C1', 'Added new Student account using marolino@my.cspc.edu.ph ', '2024-09-19', '11:25:41', NULL, NULL),
(539, 'C1', 'Added new Student account using naaviles@my.cspc.edu.ph ', '2024-09-19', '11:26:26', NULL, NULL),
(540, 'C1', 'Added new Student account using klelevado@my.cspc.edu.ph ', '2024-09-19', '11:27:15', NULL, NULL),
(541, 'C1', 'Added new Student account using jotubieras@my.cspc.edu.ph ', '2024-09-19', '11:28:00', NULL, NULL),
(542, 'C70', 'Added new Student account using jodelacruz@my.cspc.edu.ph ', '2024-09-19', '11:28:50', NULL, NULL),
(543, 'C1', 'Added new Student account using johontalba@my.cspc.edu.ph ', '2024-09-19', '11:29:07', NULL, NULL),
(544, 'C70', 'Added new Student account using joboteno@my.cspc.edu.ph ', '2024-09-19', '11:29:34', NULL, NULL),
(545, 'C1', 'Added new Student account using cramoto@my.cspc.edu.ph ', '2024-09-19', '11:29:53', NULL, NULL),
(546, 'C70', 'Added new Student account using melavapie@my.cspc.edu.ph ', '2024-09-19', '11:30:19', NULL, NULL),
(547, 'C1', 'Added new Student account using joloria@my.cspc.edu.ph ', '2024-09-19', '11:30:47', NULL, NULL),
(548, '221002249', 'Joined to BSIS-3A schedule', '2024-09-19', '11:33:55', NULL, NULL),
(549, '221002008', 'Joined to BSIS-3A schedule', '2024-09-19', '11:33:56', NULL, NULL),
(550, 'C2', 'Activated 221002249-Nathaniel Aviles RFID', '2024-09-19', '11:35:02', NULL, NULL),
(551, '221007141', 'Joined to BSIS-3A schedule', '2024-09-19', '11:37:50', NULL, NULL),
(552, '221002200', 'Joined to BSIS-3A schedule', '2024-09-19', '11:38:02', NULL, NULL),
(553, 'C2', 'Activated 221002008-Mark Allen Olino RFID', '2024-09-19', '11:38:19', NULL, NULL),
(554, 'C2', 'Activated 221007141-Klyntz Ytrx Elevado RFID', '2024-09-19', '11:39:06', NULL, NULL),
(555, 'C2', 'Activated 221002200-Jorey Tubieras RFID', '2024-09-19', '11:39:55', NULL, NULL),
(556, '221002191', 'Joined to BSIS-3A schedule', '2024-09-19', '11:41:01', NULL, NULL),
(557, 'C2', 'Activated 221002191-John Edward Hontalba RFID', '2024-09-19', '11:41:59', NULL, NULL),
(558, '221002183', 'Joined to BSIS-3A schedule', '2024-09-19', '11:42:25', NULL, NULL),
(559, 'C2', 'Activated 221002183-John Lester Dela Cruz RFID', '2024-09-19', '11:44:12', NULL, NULL),
(560, '221001069', 'Joined to BSIS-3A schedule', '2024-09-19', '11:44:58', NULL, NULL),
(561, '221003084', 'Joined to BSIS-3A schedule', '2024-09-19', '11:45:09', NULL, NULL),
(562, '221001069', 'Updated the profile password', '2024-09-19', '11:45:37', NULL, NULL),
(563, 'C2', 'Activated 221003084-Lloyd Boteño RFID', '2024-09-19', '11:46:03', NULL, NULL),
(564, '221001068', 'Joined to BSIS-3A schedule', '2024-09-19', '11:48:10', NULL, NULL),
(565, '221006141', 'Joined to BSIS-3A schedule', '2024-09-19', '11:48:48', NULL, NULL),
(566, 'C2', 'Activated 221006141-John Joward Loria RFID', '2024-09-19', '11:49:53', NULL, NULL),
(567, 'C2', 'Activated 2022080119-Mae Ann Tagum RFID', '2024-09-19', '11:52:49', NULL, NULL),
(568, 'C2', 'Activated 221001068-Meliza Lavapie RFID', '2024-09-19', '11:53:48', NULL, NULL),
(569, 'C2', 'Updated 2022080119-Faculty attendance on 2024-09-19 11:48:29', '2024-09-19', '11:56:10', NULL, NULL),
(570, '2022080119', 'Attempt update on ISA 317 - Business Process Programming 1', '2024-09-19', '12:03:44', NULL, NULL),
(571, '2022080119', 'Set a schedule to Without Classes', '2024-09-19', '12:06:04', NULL, NULL),
(572, '2022080119', 'Updated 221006141-Student attendance on 2024-09-19 11:48:40', '2024-09-19', '12:07:15', NULL, NULL),
(573, 'C2', 'Set a schedule to With Classes', '2024-09-19', '12:15:54', NULL, NULL),
(574, 'C2', 'Deleted 2022080119-Faculty attendance on 2024-09-19 11:48:29 ', '2024-09-19', '12:17:51', NULL, NULL),
(575, 'C1', 'Updated ISEC schedule', '2024-09-19', '13:43:00', NULL, NULL),
(576, 'C1', 'Deleted C10-Faculty attendance on 2024-09-19  ', '2024-09-19', '13:43:16', NULL, NULL),
(577, 'C3', 'Entered the ERP Laboratory', '2024-09-19', '13:40:43', NULL, NULL),
(578, 'C3', 'Entered the ERP Laboratory', '2024-09-19', '13:46:52', NULL, NULL),
(579, 'C3', 'Entered the ERP Laboratory', '2024-09-19', '13:50:00', NULL, NULL),
(580, 'C1', 'Deactivated an RFID Account', '2024-09-19', '13:53:31', NULL, NULL),
(581, 'C3', 'Attempted to Enter with Deactivated RFID', '2024-09-19', '13:50:46', NULL, NULL),
(582, 'C3', 'Attempted to Enter with Deactivated RFID', '2024-09-19', '13:51:29', NULL, NULL),
(583, NULL, 'Attempted to Enter with Deactivated RFID', '2024-09-19', '13:51:55', NULL, NULL),
(584, 'C1', 'Activated an RFID Account', '2024-09-19', '13:55:09', NULL, NULL),
(585, 'C1', 'Set a schedule to With Classes', '2024-09-19', '13:55:45', NULL, NULL),
(586, 'C1', 'Set a schedule to Without Classes', '2024-09-19', '13:55:56', NULL, NULL),
(587, NULL, 'Joined to BSIS-3B schedule', '2024-09-19', '13:59:44', NULL, NULL);
INSERT INTO `user_logs` (`idLogs`, `userID`, `action`, `date`, `time`, `created_at`, `updated_at`) VALUES
(588, 'C1', 'Activated cstudent-Student Student RFID', '2024-09-19', '14:00:22', NULL, NULL),
(589, 'C3', 'Attempted to Enter with Deactivated RFID', '2024-09-20', '19:16:07', NULL, NULL),
(590, 'C3', 'Attempted to Enter with Deactivated RFID', '2024-09-20', '19:16:13', NULL, NULL),
(591, 'C1', 'Activated an RFID Account', '2024-09-20', '19:23:13', NULL, NULL),
(592, 'C3', 'Entered the ERP Laboratory', '2024-09-20', '19:19:02', NULL, NULL),
(593, 'C3', 'Entered the ERP Laboratory', '2024-09-20', '19:22:24', NULL, NULL),
(594, 'C1', 'Updated ISEC schedule', '2024-09-20', '19:50:03', NULL, NULL),
(595, 'C1', 'Deleted a user account', '2024-09-20', '19:52:54', NULL, NULL),
(596, 'C1', 'Added new Student account using student@my.cspc.edu.ph ', '2024-09-20', '19:54:19', NULL, NULL),
(597, 'C1', 'Activated cstudent-student student RFID', '2024-09-20', '19:56:15', NULL, NULL),
(598, 'cstudent', 'Joined to BSIS-3B schedule', '2024-09-20', '19:57:59', NULL, NULL),
(599, 'C1', 'Updated ISEC schedule', '2024-09-20', '19:59:02', NULL, NULL),
(600, 'C1', 'Updated ISEC schedule', '2024-09-20', '19:59:03', NULL, NULL),
(601, 'C1', 'Deleted C10-Faculty attendance on 2024-09-20 19:55:38 ', '2024-09-20', '20:15:17', NULL, NULL),
(602, 'C1', 'Deleted C10-Faculty attendance on 2024-09-20 19:56:43 ', '2024-09-20', '20:15:26', NULL, NULL),
(603, 'C1', 'Deleted C10-Faculty attendance on 2024-09-20 20:17:02 ', '2024-09-20', '20:22:34', NULL, NULL),
(604, 'C1', 'Deleted C10-Faculty attendance on 2024-09-20 20:13:42 ', '2024-09-20', '20:22:41', NULL, NULL),
(605, 'C1', 'Deleted C10-Faculty attendance on 2024-09-20 20:14:38 ', '2024-09-20', '20:22:47', NULL, NULL),
(606, 'C1', 'Deleted C10-Faculty attendance on 2024-09-20 20:25:36 ', '2024-09-20', '20:40:46', NULL, NULL),
(607, 'C1', 'Deleted cstudent-Student attendance on 2024-09-20 20:25:55 ', '2024-09-20', '20:41:00', NULL, NULL),
(608, 'C1', 'Deleted C10-Faculty attendance on 2024-09-20 20:37:09 ', '2024-09-20', '20:43:45', NULL, NULL),
(609, 'C1', 'Deleted C10-Faculty attendance on 2024-09-20 20:39:43 ', '2024-09-20', '20:48:03', NULL, NULL),
(610, 'C1', 'Deleted cstudent-Student attendance on 2024-09-20 20:39:49 ', '2024-09-20', '20:48:16', NULL, NULL),
(611, 'C1', 'Updated ISEC schedule', '2024-09-21', '00:15:36', NULL, NULL),
(612, 'C1', 'Set a schedule to Without Classes', '2024-09-21', '00:15:52', NULL, NULL),
(613, 'C1', 'Deleted C21101044-Student attendance on 2024-09-20 20:28:54 ', '2024-09-21', '00:16:52', NULL, NULL),
(614, 'C1', 'Deleted cstudent-Student attendance on 2024-09-21 00:12:34 ', '2024-09-21', '00:17:07', NULL, NULL),
(615, 'C1', 'Updated C10-Faculty attendance on 2024-09-19 13:53:14', '2024-09-21', '00:17:19', NULL, NULL),
(616, 'C1', 'Updated 2022080119-Faculty attendance on 2024-09-19 12:13:38', '2024-09-21', '00:17:29', NULL, NULL),
(617, 'C1', 'Updated 872216887920-Faculty attendance on 2024-09-18 15:18:49', '2024-09-21', '00:17:37', NULL, NULL),
(618, 'C1', 'Updated 122345666-Faculty attendance on 2024-09-14 13:41:32', '2024-09-21', '00:17:46', NULL, NULL),
(619, 'C1', 'Updated COS Admin 147-Faculty attendance on 2024-09-14 07:56:11', '2024-09-21', '00:17:57', NULL, NULL),
(620, 'C1', 'Updated 1600204-Faculty attendance on 2024-09-14 12:49:01', '2024-09-21', '00:18:06', NULL, NULL),
(621, 'C1', 'Deleted C10-Faculty attendance on 2024-09-21 00:12:26 ', '2024-09-21', '00:39:28', NULL, NULL),
(622, 'C1', 'Deleted C10-Faculty attendance on 2024-09-21 00:36:05 ', '2024-09-21', '13:17:08', NULL, NULL),
(623, 'C1', 'Deleted cstudent-Student attendance on 2024-09-21 00:37:31 ', '2024-09-21', '13:17:19', NULL, NULL),
(624, 'C1', 'Deleted C10-Faculty attendance on 2024-09-21 13:17:15 ', '2024-09-21', '13:21:56', NULL, NULL),
(625, 'C1', 'Imported new Schedule', '2024-10-12', '13:50:56', NULL, NULL),
(626, 'C1', 'Imported new Schedule', '2024-10-12', '13:50:56', NULL, NULL),
(627, 'C1', 'Imported new Schedule', '2024-10-12', '13:50:56', NULL, NULL),
(628, 'C1', 'Updated test Schedule', '2024-10-12', '13:55:23', NULL, NULL),
(629, 'C1', 'Updated ITEC111 Schedule', '2024-10-12', '13:55:23', NULL, NULL),
(630, 'C1', 'Updated ITEC222 Schedule', '2024-10-12', '13:55:23', NULL, NULL),
(631, 'C1', 'Updated test Schedule', '2024-10-12', '13:56:36', NULL, NULL),
(632, 'C1', 'Updated ITEC111 Schedule', '2024-10-12', '13:56:36', NULL, NULL),
(633, 'C1', 'Updated ITEC222 Schedule', '2024-10-12', '13:56:36', NULL, NULL),
(634, 'C1', 'Archived a Admin account associated to ral@cspc.edu.ph email', '2024-10-12', '21:25:09', NULL, NULL),
(635, 'C1', 'Archived a Student account associated to aarosauro@my.cspc.edu.ph email', '2024-10-12', '21:26:11', NULL, NULL),
(636, 'C1', 'Closed ERPLaboratory for Maintenance', '2024-10-13', '14:32:08', NULL, NULL),
(637, 'C1', 'Closed ERPLaboratory for Maintenance', '2024-10-13', '16:10:43', NULL, NULL),
(638, 'C1', 'Closed ERPLaboratory for Maintenance', '2024-10-13', '16:11:46', NULL, NULL),
(639, 'C1', 'Closed ERPLaboratory for Maintenance', '2024-10-13', '16:15:16', NULL, NULL),
(640, 'C1', 'Closed ERP Laboratory for Maintenance', '2024-10-13', '16:43:46', NULL, NULL),
(641, 'C1', 'Closed ERP Laboratory for Maintenance', '2024-10-13', '16:45:24', NULL, NULL),
(642, 'C1', 'Lifted ERP Laboratory Maintenance', '2024-10-13', '16:45:30', NULL, NULL),
(643, 'C1', 'Closed ERP Laboratory for Maintenance', '2024-10-13', '16:47:13', NULL, NULL),
(644, 'C1', 'Lifted ERP Laboratory Maintenance', '2024-10-13', '16:47:20', NULL, NULL),
(645, 'C1', 'Closed ERP Laboratory for Maintenance', '2024-10-14', '08:32:10', NULL, NULL),
(646, 'C1', 'Lifted ERP Laboratory Maintenance', '2024-10-14', '08:32:32', NULL, NULL),
(647, 'C1', 'Closed ERP Laboratory for Maintenance', '2024-10-14', '08:43:36', NULL, NULL),
(648, 'C1', 'Lifted ERP Laboratory Maintenance', '2024-10-14', '08:43:42', NULL, NULL),
(649, 'C1', 'Added Make Up Schedule (Make Up Schedule)', '2024-10-14', '17:36:46', NULL, NULL),
(650, 'C1', 'Updated Make Up Schedule schedule', '2024-10-14', '17:39:42', NULL, NULL),
(651, 'C1', 'Added New Regular Schedule for axas', '2024-10-14', '17:49:18', NULL, NULL),
(652, 'C1', 'Added New Regular Schedule for Math', '2024-10-14', '17:50:05', NULL, NULL),
(653, 'C1', 'Deleted an RFID Account', '2024-10-14', '18:11:11', NULL, NULL),
(654, 'C1', 'Deleted an RFID Account', '2024-10-14', '18:29:11', NULL, NULL),
(655, 'C1', 'Activated 221006141-John Joward Loria RFID', '2024-10-14', '18:31:47', NULL, NULL),
(656, 'C1', 'Deleted an RFID Account', '2024-10-14', '18:34:30', NULL, NULL),
(657, 'C1', 'Activated 221006141-John Joward Loria RFID', '2024-10-14', '18:34:55', NULL, NULL),
(658, 'C1', 'Added new Faculty account using faculty@cspc.edu.ph ', '2024-10-14', '19:11:43', NULL, NULL),
(659, 'C1', 'Deleted a Make Up Schedule -> Make Up Schedule ', '2024-10-14', '19:17:06', NULL, NULL),
(660, 'C1', 'Deleted an ERP Schedule -> Math-Capstone ', '2024-10-14', '19:17:13', NULL, NULL),
(661, 'C1', 'Imported new Schedule', '2024-10-14', '19:17:31', NULL, NULL),
(662, 'C1', 'Imported new Schedule', '2024-10-14', '19:17:31', NULL, NULL),
(663, 'C1', 'Imported new Schedule', '2024-10-14', '19:17:31', NULL, NULL),
(664, 'C10', 'Added new Class List', '2024-10-14', '19:24:42', NULL, NULL),
(665, 'C10', 'Locked Class Schedule', '2024-10-14', '19:59:04', NULL, NULL),
(666, 'C10', 'Opened Class Schedule', '2024-10-14', '20:05:59', NULL, NULL),
(667, 'C10', 'Added Note to ITEC222 on 2024-10-04 at 11:40:25', '2024-10-21', '11:40:25', NULL, NULL),
(668, 'C10', 'Added Note to ITEC222 on 2024-10-11 at 12:23:25', '2024-10-21', '12:23:25', NULL, NULL),
(669, 'C10', 'Added Note to ITEC222 on 2024-10-04 at 12:23:26', '2024-10-21', '12:23:26', NULL, NULL),
(670, 'C10', 'Added Note to ITEC222 on 2024-10-04 at 12:24:04', '2024-10-21', '12:24:04', NULL, NULL),
(671, 'C10', 'Added Note to ITEC222 on 2024-10-18 at 12:29:12', '2024-10-21', '12:29:12', NULL, NULL),
(672, 'C10', 'Added Note to ITEC222 on 2024-10-25 at 12:36:35', '2024-10-21', '12:36:35', NULL, NULL),
(673, 'C10', 'Added Note to ITEC222 on 2024-10-04 at 14:04:46', '2024-10-22', '14:04:46', NULL, NULL),
(674, 'C10', 'Attempt update on schedule note', '2024-10-22', '16:45:49', NULL, NULL),
(675, 'C10', 'Updated Schedule Note', '2024-10-22', '16:46:01', NULL, NULL),
(676, 'C10', 'Updated Schedule Note', '2024-10-22', '16:57:24', NULL, NULL),
(677, 'C10', 'Deleted Note', '2024-10-22', '17:12:32', NULL, NULL),
(678, 'C10', 'Added Note to ITEC222 on 2024-10-04 at 19:01:56', '2024-10-25', '19:01:56', NULL, NULL),
(706, 'C1', 'Imported new Schedule', '2024-11-08', '14:01:03', NULL, NULL),
(707, 'C1', 'Imported new Schedule', '2024-11-08', '14:01:03', NULL, NULL),
(708, 'C1', 'Imported new Schedule', '2024-11-08', '14:01:03', NULL, NULL),
(712, 'C1', 'Imported new Schedule', '2024-11-08', '14:15:50', NULL, NULL),
(713, 'C1', 'Imported new Schedule', '2024-11-08', '14:15:50', NULL, NULL),
(714, 'C1', 'Imported new Schedule', '2024-11-08', '14:15:50', NULL, NULL),
(715, 'C1', 'Updated test Schedule', '2024-11-08', '14:17:28', NULL, NULL),
(716, 'C1', 'Updated ITEC111 Schedule', '2024-11-08', '14:17:28', NULL, NULL),
(717, 'C1', 'Updated ITEC222 Schedule', '2024-11-08', '14:17:28', NULL, NULL),
(718, 'C1', 'Updated test Schedule', '2024-11-08', '14:17:36', NULL, NULL),
(719, 'C1', 'Updated ITEC111 Schedule', '2024-11-08', '14:17:36', NULL, NULL),
(720, 'C1', 'Updated ITEC222 Schedule', '2024-11-08', '14:17:36', NULL, NULL),
(721, 'C1', 'Updated test Schedule', '2024-11-08', '14:17:44', NULL, NULL),
(722, 'C1', 'Updated ITEC111 Schedule', '2024-11-08', '14:17:44', NULL, NULL),
(723, 'C1', 'Updated ITEC222 Schedule', '2024-11-08', '14:17:44', NULL, NULL),
(724, 'C1', 'Updated test Schedule', '2024-11-08', '14:17:53', NULL, NULL),
(725, 'C1', 'Updated ITEC111 Schedule', '2024-11-08', '14:17:53', NULL, NULL),
(726, 'C1', 'Updated ITEC222 Schedule', '2024-11-08', '14:17:53', NULL, NULL),
(727, 'C1', 'Updated test Schedule', '2024-11-08', '14:18:41', NULL, NULL),
(728, 'C1', 'Updated ITEC111 Schedule', '2024-11-08', '14:18:41', NULL, NULL),
(729, 'C1', 'Updated ITEC222 Schedule', '2024-11-08', '14:18:42', NULL, NULL),
(730, 'C1', 'Added Make Up Schedule (Make Up Schedule)', '2024-11-08', '14:21:18', NULL, NULL),
(731, 'C10', 'Added new Class List', '2024-11-08', '14:27:54', NULL, NULL),
(732, 'C1', 'Imported new Schedule', '2024-11-08', '19:55:24', NULL, NULL),
(733, 'C1', 'Imported new Schedule', '2024-11-08', '19:55:24', NULL, NULL),
(734, 'C1', 'Imported new Schedule', '2024-11-08', '19:55:24', NULL, NULL),
(735, 'C10', 'Added new Class List', '2024-11-08', '19:58:21', NULL, NULL),
(736, 'C1', 'Added Make Up Schedule (Make Up Schedule)', '2024-11-19', '21:04:31', NULL, NULL),
(737, 'C1', 'Attempt update on Make Up Schedule schedule', '2024-11-19', '21:04:41', NULL, NULL),
(738, 'C1', 'Added Make Up Schedule ()', '2024-11-19', '21:28:48', NULL, NULL),
(739, 'C1', 'Attempt update on Make-Up Schedule', '2024-11-19', '21:30:03', NULL, NULL),
(740, 'C1', 'Updated Make-Up Schedule', '2024-11-19', '21:30:37', NULL, NULL),
(741, 'C1', 'Deleted a Make Up Schedule', '2024-11-19', '21:34:28', NULL, NULL),
(742, 'C1', 'Added Make Up Schedule ()', '2024-11-19', '21:34:45', NULL, NULL),
(743, 'C1', 'Added New Regular Schedule for ITEC-111', '2024-11-22', '20:33:23', NULL, NULL),
(744, 'C1', 'Added New Regular Schedule for English', '2024-11-23', '19:36:11', NULL, NULL),
(745, 'C1', 'Added Make Up Schedule', '2024-11-23', '20:02:34', NULL, NULL),
(746, 'C1', 'Added New Regular Schedule for AKSNDKAS', '2024-11-25', '13:49:32', NULL, NULL),
(747, 'C1', 'Added Make Up Schedule', '2024-11-25', '16:44:26', NULL, NULL),
(748, 'C10', 'Added new Class List', '2024-11-26', '15:21:02', NULL, NULL),
(749, 'C1', 'Added New Regular Schedule for English', '2024-11-26', '15:33:06', NULL, NULL),
(750, 'C1', 'Added New Regular Schedule for ITEC-111', '2024-11-26', '15:34:16', NULL, NULL),
(751, 'C1', 'Archived a Student account associated to jodelacruz@my.cspc.edu.ph email', '2024-11-30', '17:25:45', NULL, NULL);

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
  ADD KEY `50` (`userID`);

--
-- Indexes for table `schedule_notes`
--
ALTER TABLE `schedule_notes`
  ADD PRIMARY KEY (`noteID`),
  ADD KEY `schedule_notes_scheduleid_foreign` (`scheduleID`);

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
  MODIFY `attendanceID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=173;

--
-- AUTO_INCREMENT for table `class_lists`
--
ALTER TABLE `class_lists`
  MODIFY `classID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `rfid_accounts`
--
ALTER TABLE `rfid_accounts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=124;

--
-- AUTO_INCREMENT for table `rfid_temps`
--
ALTER TABLE `rfid_temps`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=156;

--
-- AUTO_INCREMENT for table `schedules`
--
ALTER TABLE `schedules`
  MODIFY `scheduleID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `schedule_notes`
--
ALTER TABLE `schedule_notes`
  MODIFY `noteID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `student_masterlists`
--
ALTER TABLE `student_masterlists`
  MODIFY `MIT_ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=128;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=228;

--
-- AUTO_INCREMENT for table `user_logs`
--
ALTER TABLE `user_logs`
  MODIFY `idLogs` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=752;

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
-- Constraints for table `schedules`
--
ALTER TABLE `schedules`
  ADD CONSTRAINT `50` FOREIGN KEY (`userID`) REFERENCES `users` (`idNumber`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `schedule_notes`
--
ALTER TABLE `schedule_notes`
  ADD CONSTRAINT `schedule_notes_scheduleid_foreign` FOREIGN KEY (`scheduleID`) REFERENCES `schedules` (`scheduleID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `student_masterlists`
--
ALTER TABLE `student_masterlists`
  ADD CONSTRAINT `student_masterlists_classid_foreign` FOREIGN KEY (`classID`) REFERENCES `class_lists` (`classID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `student_masterlists_userid_foreign` FOREIGN KEY (`userID`) REFERENCES `users` (`idNumber`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`RFID_Code`) REFERENCES `rfid_accounts` (`RFID_Code`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `user_logs`
--
ALTER TABLE `user_logs`
  ADD CONSTRAINT `user_logs_userid_foreign` FOREIGN KEY (`userID`) REFERENCES `users` (`idNumber`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
