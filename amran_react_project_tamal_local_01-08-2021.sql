-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Aug 01, 2021 at 03:40 AM
-- Server version: 5.7.23
-- PHP Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `amran_react_project`
--

-- --------------------------------------------------------

--
-- Table structure for table `annotation`
--

DROP TABLE IF EXISTS `annotation`;
CREATE TABLE IF NOT EXISTS `annotation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `filename` varchar(100) NOT NULL COMMENT 'File Name,Single line of text',
  `notetext` text NOT NULL COMMENT 'Note Text,Single line of text',
  `subject` varchar(200) NOT NULL COMMENT 'Subject,Single line of text',
  `body` text NOT NULL COMMENT 'Document Body,Single line of text',
  `objectid` int(11) NOT NULL COMMENT 'Object ID,Guid',
  `ownerid` int(11) NOT NULL COMMENT 'Owner,Lookup - User',
  `modifiedby` int(11) NOT NULL COMMENT 'Modified by,Lookup - User',
  `createdby` int(11) NOT NULL COMMENT 'Created by,Lookup - User',
  `annotationid` int(11) NOT NULL COMMENT 'Attachment ID,GUID',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

DROP TABLE IF EXISTS `contact`;
CREATE TABLE IF NOT EXISTS `contact` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contactid` int(11) NOT NULL COMMENT 'Contact ID ,GUID',
  `lastname` varchar(100) NOT NULL COMMENT 'Last Name,Single line of text',
  `firstname` varchar(100) NOT NULL COMMENT 'First Name,Single line of text',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `emailusers`
--

DROP TABLE IF EXISTS `emailusers`;
CREATE TABLE IF NOT EXISTS `emailusers` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `internalemailaddress` varchar(300) DEFAULT NULL,
  `firstname` varchar(100) DEFAULT NULL,
  `lastname` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `feed`
--

DROP TABLE IF EXISTS `feed`;
CREATE TABLE IF NOT EXISTS `feed` (
  `feed_id` int(11) NOT NULL AUTO_INCREMENT,
  `feed` text,
  `user_id_fk` int(11) DEFAULT NULL,
  `created` int(11) DEFAULT NULL,
  PRIMARY KEY (`feed_id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

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
(8, 'New dfg', 3, 1625978887),
(9, 'hello', 2, 1627669585),
(10, 'hello', 2, 1627669587),
(11, 'hello', 2, 1627669601),
(12, 'hello', 2, 1627669636),
(13, 'hello', 2, 1627669639),
(14, 'hello', 2, 1627669658),
(15, 'hello', 2, 1627669685),
(16, 'hello', 2, 1627669700);

-- --------------------------------------------------------

--
-- Table structure for table `imagesdata`
--

DROP TABLE IF EXISTS `imagesdata`;
CREATE TABLE IF NOT EXISTS `imagesdata` (
  `img_id` int(11) NOT NULL AUTO_INCREMENT,
  `b64` text,
  `user_id_fk` int(11) DEFAULT NULL,
  PRIMARY KEY (`img_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `new_reactappdemo`
--

DROP TABLE IF EXISTS `new_reactappdemo`;
CREATE TABLE IF NOT EXISTS `new_reactappdemo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `new_name` varchar(200) NOT NULL COMMENT 'name ,Single line of text',
  `ownerid` int(11) NOT NULL COMMENT 'Owner ,Lookup- systemuser',
  `new_additionaldetails` text NOT NULL COMMENT 'Additional Details',
  `new_field3` datetime NOT NULL COMMENT 'Due Date',
  `new_field4` int(11) NOT NULL COMMENT ' Contact Person table lookup',
  `New_taxamount` decimal(10,2) NOT NULL COMMENT 'Tax Amount',
  `transactioncurrencyid` int(11) NOT NULL COMMENT 'Lookup - currency (for now static dropdown value)',
  `new_ emailaddress` varchar(100) NOT NULL COMMENT 'Email Address ,Single line of text',
  `new_field1` varchar(200) NOT NULL COMMENT 'Tax ID ,Single line of text',
  `new_ phoneno` varchar(20) NOT NULL COMMENT 'Phone Number ,Single line of text',
  `new_address` varchar(200) NOT NULL COMMENT 'Address ,Single line of text',
  `new_taxpolicy` int(11) NOT NULL COMMENT 'Tax Policy Applicable,Multi Select Option\r\nset:\r\nPolicy 1 - 100,000,000 ;\r\nPolicy 2 - 100,000,001;\r\nPolicy 3 - 100,000,002;\r\nPolicy 4 - 100,000,003;\r\nPolicy 5 - 100,000,004;',
  `new_reactappdemoid` int(11) NOT NULL COMMENT 'React App Demo - Council Tax;GUID',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `firstname` varchar(200) DEFAULT NULL,
  `lastname` varchar(200) DEFAULT NULL,
  `new_password` varchar(300) DEFAULT NULL,
  `internalemailaddress` varchar(300) DEFAULT NULL,
  `new_phonenumber` varchar(20) DEFAULT NULL,
  `new_otp` varchar(160) DEFAULT NULL,
  `new_isvalidated` tinyint(1) DEFAULT NULL,
  `systemuserid` varchar(160) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `firstname`, `lastname`, `new_password`, `internalemailaddress`, `new_phonenumber`, `new_otp`, `new_isvalidated`, `systemuserid`) VALUES
(1, 'amranwebdeveloper', 'Mohammad Amranur Rahman', NULL, '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'amranwebdeveloper@gmail.com', NULL, NULL, NULL, NULL),
(2, 'tamal', 'tamal', NULL, '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'tamal@tamal.com', NULL, NULL, NULL, NULL),
(3, 'mika', 'mika', NULL, '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'mika12@mika.com', NULL, NULL, NULL, NULL),
(4, 'mika6', 'mika6', NULL, '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'mika6@mika.com', NULL, NULL, NULL, NULL),
(7, 'amranweb', 'amranweb', NULL, '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'amranweb@gmail.com', '123456', NULL, NULL, NULL),
(8, NULL, 'sdsf', 'sdfsdfg', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'tamal233@gmail.com', '452554545', NULL, NULL, NULL),
(9, NULL, 'sdsf', 'sdfsdfg', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'tamal123@gmail.com', '452554545', NULL, NULL, NULL),
(10, NULL, 'sdsf', 'sdfsdfg', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'tamal12@gmail.com', '452554545', NULL, NULL, NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
