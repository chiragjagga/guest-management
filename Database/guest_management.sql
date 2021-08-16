-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 16, 2021 at 07:42 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.4.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `guest_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `ID` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `del_id` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`ID`, `name`, `email`, `password`, `del_id`) VALUES
(1, 'admin', 'admin@test.com', 'admin', 0);

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `ID` int(11) NOT NULL,
  `U_ID` int(11) NOT NULL,
  `CheckIn` date NOT NULL,
  `CheckOut` date NOT NULL,
  `MobileNumber` int(10) NOT NULL,
  `Room_Id` int(11) NOT NULL,
  `GuestNameList` varchar(100) NOT NULL,
  `GuestAgeList` varchar(50) NOT NULL,
  `Amount` int(11) NOT NULL,
  `Status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `ID` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Price` int(11) NOT NULL,
  `NoOfRooms` int(11) NOT NULL,
  `NoOfGuests` int(11) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `Imagepath` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`ID`, `Name`, `Price`, `NoOfRooms`, `NoOfGuests`, `description`, `Imagepath`) VALUES
(1, 'International Hostel ', 450, 10, 3, 'abcd', 'room1'),
(2, 'G Hostel', 250, 10, 2, '', 'room2'),
(3, 'PG-2 ', 250, 10, 2, '', 'room3'),
(4, 'SAC', 250, 10, 2, '', 'room4');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `RollNo` varchar(9) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Password` text NOT NULL,
  `Status` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ID`, `Name`, `RollNo`, `Email`, `Password`, `Status`) VALUES
(1, 'Tushar khandelwal', 'M200724CA', 'tusharkhandelwal81@gmail.com', '13162', 1),
(3, 'chirag jagga', 'M200123CA', 'cj26@gmail.com', '123456', 1),
(4, '\'jdcssc', 'M200720CA', 'tk15@gmail.com', '123456', 1),
(5, 'qwdsfbnm', '123456', 'tk115@gmail.com', '123456', 1),
(6, '1682021', '1682021', 'sixteen@test.com', '1682021', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
