-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 22, 2021 at 03:49 PM
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
  `del_id` text DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`ID`, `name`, `email`, `password`, `del_id`) VALUES
(1, 'admin', 'admin@test.com', 'admin', 'Active'),
(2, 'chirag', 'chirag@test.com', 'chirag', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `ID` int(11) NOT NULL,
  `U_ID` int(11) NOT NULL,
  `CheckIn` date NOT NULL,
  `CheckOut` date NOT NULL,
  `MobileNumber` bigint(10) NOT NULL,
  `Room_Id` int(11) NOT NULL,
  `RoomCount` int(11) NOT NULL,
  `GuestName` varchar(100) NOT NULL,
  `GuestAge` varchar(50) NOT NULL,
  `Amount` int(11) NOT NULL,
  `Status` text NOT NULL DEFAULT 'Confirmed'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`ID`, `U_ID`, `CheckIn`, `CheckOut`, `MobileNumber`, `Room_Id`, `RoomCount`, `GuestName`, `GuestAge`, `Amount`, `Status`) VALUES
(1, 1, '2021-08-20', '2021-08-22', 1234567890, 1, 2, 'abc', '30', 900, 'Confirmed'),
(2, 5, '2021-08-20', '2021-08-25', 875432154, 2, 1, 'asdfgh', '25', 2000, 'Confirmed'),
(3, 3, '2021-08-25', '2021-08-26', 875454154, 3, 1, 'abc', '25', 2000, 'Confirmed'),
(4, 6, '2021-08-24', '2021-08-30', 2147483647, 4, 3, 'qwertyfgh', '15,25,30', 1500, 'Confirmed'),
(5, 1, '2021-08-21', '2021-08-22', 2147483647, 2, 1, 'pokjhbvcfgh', '50', 350, 'Confirmed'),
(6, 1, '2021-08-28', '2021-08-30', 2147483647, 2, 2, 'qwxffvv', '30', 500, 'Confirmed'),
(7, 7, '2021-08-21', '2021-08-26', 8754541543, 1, 1, 'asdfgh', '15,25,30', 2000, 'Confirmed'),
(8, 4, '2021-08-24', '2021-08-30', 45678454154, 4, 1, 'qwertyfgh', '15,25,30', 1500, 'Confirmed'),
(9, 1, '2021-08-24', '2021-08-29', 7898454156, 2, 1, 'pokjhbvcfgh', '25', 300, 'Confirmed'),
(10, 3, '2021-08-28', '2021-08-29', 7898454156, 3, 3, 'qwxffvv', '30', 500, 'Confirmed'),
(11, 1, '2021-08-20', '2021-08-22', 1234567890, 2, 2, 'tushar', '15', 1000, 'Confirmed'),
(12, 1, '2021-08-21', '2021-08-23', 4578945235, 1, 2, 'tushar', '20', 900, 'Confirmed'),
(13, 1, '2021-08-21', '2021-08-25', 5646465454, 4, 2, 'chirag', '22', 500, 'Confirmed'),
(14, 1, '2021-08-25', '2021-08-26', 6464534656, 3, 3, 'fghjb', '25', 750, 'Confirmed'),
(15, 1, '2021-08-25', '2021-08-26', 6464649674, 3, 2, 'qwerty', '20', 500, 'Confirmed'),
(16, 1, '2021-08-25', '2021-08-26', 6464649674, 3, 2, 'qwerty123', '20', 500, 'Confirmed'),
(17, 1, '2021-08-22', '2021-08-24', 1646416464, 1, 2, 'fgchvbjkn', '62', 2000, 'Confirmed'),
(18, 17, '2021-08-23', '2021-08-24', 7458963214, 1, 3, 'chirag', '22', 3000, 'Confirmed'),
(19, 1, '2021-08-23', '2021-08-25', 1645656526, 1, 2, 'Tushar', '20', 900, 'Confirmed');

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `ID` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Feedback` varchar(200) NOT NULL,
  `Date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contact`
--

INSERT INTO `contact` (`ID`, `Name`, `Email`, `Feedback`, `Date`) VALUES
(1, 'Tushar khandelwal', 'tushar@gmail.com', 'First', '2021-08-21'),
(2, 'second user', 'second@gmail.com', 'second feedback', '2021-08-21');

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
(1, 'International', 450, 10, 3, 'abcdefghijklmnopqrstuv', 'room1'),
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
  `Status` text NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ID`, `Name`, `RollNo`, `Email`, `Password`, `Status`) VALUES
(1, 'Tushar khandelwal', 'M200724CA', 'tusharkhandelwal81@gmail.com', '13162', 'Active'),
(3, 'chirag jagga', 'M200123CA', 'cj26@gmail.com', '123456', 'Active'),
(9, 'test', 'test', 'test@test.com', 'test', 'Active'),
(14, 'qwerty', '123456', 'qwerty@test.com', '123456', 'Active'),
(15, 'asdfgh', '963', 'asdfgh@test.com', '963', 'Active'),
(16, 'Tarushi', 'M200723CA', 'tarushi@test.com', 'tarushi', 'Active'),
(17, 'chirag jagga', 'M200669CA', 'chirag@test.com', 'chirag', 'Active');

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
-- Indexes for table `contact`
--
ALTER TABLE `contact`
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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
