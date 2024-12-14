-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 11, 2024 at 09:45 AM
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

--
-- Indexes for dumped tables
--

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
