-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jul 30, 2021 at 06:18 PM
-- Server version: 8.0.21
-- PHP Version: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `restapi`
--

-- --------------------------------------------------------

--
-- Table structure for table `emailusers`
--

DROP TABLE IF EXISTS `emailusers`;
CREATE TABLE IF NOT EXISTS `emailusers` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `internalemailaddress` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `firstname` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `lastname` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `feed`
--

DROP TABLE IF EXISTS `feed`;
CREATE TABLE IF NOT EXISTS `feed` (
  `feed_id` int NOT NULL AUTO_INCREMENT,
  `feed` text,
  `user_id_fk` int DEFAULT NULL,
  `created` int DEFAULT NULL,
  PRIMARY KEY (`feed_id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `feed`
--

INSERT INTO `feed` (`feed_id`, `feed`, `user_id_fk`, `created`) VALUES
(1, 'Hello', 2, 1623162693),
(2, 'H3', 2, 1623162756),
(3, 'Ami jani na', 2, 1623231242),
(4, 'Ami jamu na', 4, 1623231261),
(5, 'hello', 1, 1625071957),
(6, 'gg', 1, 1625071963),
(7, 'Hello', 3, 1625976963),
(8, 'New dfg', 3, 1625978887);

-- --------------------------------------------------------

--
-- Table structure for table `imagesdata`
--

DROP TABLE IF EXISTS `imagesdata`;
CREATE TABLE IF NOT EXISTS `imagesdata` (
  `img_id` int NOT NULL AUTO_INCREMENT,
  `b64` text,
  `user_id_fk` int DEFAULT NULL,
  PRIMARY KEY (`img_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(250) DEFAULT NULL,
  `lastname` varchar(250) DEFAULT NULL,
  `internalemailaddress` varchar(250) DEFAULT NULL,
  `new_phonenumber` varchar(250) DEFAULT NULL,
  `new_otp` varchar(250) DEFAULT NULL,
  `new_password` varchar(250) DEFAULT NULL,
  `new_isvalidated` tinyint(1) DEFAULT NULL,
  `systemuserid` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `firstname`, `lastname`, `internalemailaddress`, `new_phonenumber`, `new_otp`, `new_password`, `new_isvalidated`, `systemuserid`) VALUES
(1, 'Demo', 'Data', 'demodata@gmail.com', '123456789', '1234', '123456', 1, '0001'),
(6, 'Amran', 'Rahman', 'amra@afma.cim', '21313132', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `firstname` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `lastname` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `new_password` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `internalemailaddress` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `new_phonenumber` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `new_otp` varchar(160) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `new_isvalidated` tinyint(1) DEFAULT NULL,
  `systemuserid` varchar(160) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `firstname`, `lastname`, `new_password`, `internalemailaddress`, `new_phonenumber`, `new_otp`, `new_isvalidated`, `systemuserid`) VALUES
(1, 'amranwebdeveloper', 'Mohammad Amranur Rahman', NULL, '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'amranwebdeveloper@gmail.com', NULL, NULL, NULL, NULL),
(2, 'tamal', 'tamal', NULL, '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'tamal@tamal.com', NULL, NULL, NULL, NULL),
(3, 'mika', 'mika', NULL, '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'mika12@mika.com', NULL, NULL, NULL, NULL),
(4, 'mika6', 'mika6', NULL, '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'mika6@mika.com', NULL, NULL, NULL, NULL),
(7, 'amranweb', 'amranweb', NULL, '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'amranweb@gmail.com', '123456', NULL, NULL, NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
