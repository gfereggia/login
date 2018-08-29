-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 03, 2018 at 03:05 AM
-- Server version: 5.6.38
-- PHP Version: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `egosystems`
--

-- --------------------------------------------------------

--
-- Table structure for table `empleados`
--

CREATE TABLE `empleados` (
  `id` int(20) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `apellido` varchar(200) NOT NULL,
  `mail` varchar(200) DEFAULT NULL,
  `clave_mail` varchar(200) DEFAULT NULL,
  `clave_dominio` varchar(200) DEFAULT NULL,
  `comentarios` varchar(300) DEFAULT NULL,
  `empresa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `empleados`
--

INSERT INTO `empleados` (`id`, `nombre`, `apellido`, `mail`, `clave_mail`, `clave_dominio`, `comentarios`, `empresa`) VALUES
(1, 'Pedro', 'Gonzales', 'pedro@gol.com', 'pepo', 'vacio', '', 1),
(2, 'Pablo', 'Gonzalex', 'pablo@gmail.com', 'vacio', 'pepito', 'lloroooo', 2),
(3, 'Nicolas', 'Fernandez', 'nico@hotmail.com', 'pepito123', 'azul', 'ahora sii', 1),
(4, 'lsifbhsdf', 'sdfuolsdf', 'german@123', '', '', 'null', 3),
(5, 'Juan', 'Pedri', 'kalsdna@gmail', '', '', NULL, 2);

-- --------------------------------------------------------

--
-- Table structure for table `empresa`
--

CREATE TABLE `empresa` (
  `id` int(20) NOT NULL,
  `empresa` varchar(200) NOT NULL,
  `ubicacion` varchar(200) NOT NULL,
  `telefono` varchar(200) NOT NULL,
  `dominio` varchar(200) DEFAULT NULL,
  `comentarios` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `empresa`
--

INSERT INTO `empresa` (`id`, `empresa`, `ubicacion`, `telefono`, `dominio`, `comentarios`) VALUES
(1, 'Sanda', 'pedro goyena 555', '56578876', 'goyena', 'debe meses'),
(2, 'andina', 'san martin', '4356', '', ''),
(3, 'Cbvp', 'mitre 555', '1242525', '', 'pago al dia');

-- --------------------------------------------------------

--
-- Table structure for table `stock`
--

CREATE TABLE `stock` (
  `id` int(20) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `precio` int(20) NOT NULL,
  `cantidad` int(20) NOT NULL,
  `comentarios` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `stock`
--

INSERT INTO `stock` (`id`, `nombre`, `precio`, `cantidad`, `comentarios`) VALUES
(5, 'Gabinete thermaltake', 456, 4, 'vacio'),
(7, 'asdad', 454, 3, 'null'),
(8, 'qweqe', 2343, 2, NULL),
(9, 'dsada', 234, 1, 'null'),
(10, 'asdasd', 434, 1, NULL),
(11, 'wqdqwd', 3432, 2, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(20) NOT NULL,
  `usuario` varchar(200) NOT NULL,
  `clave` varchar(200) NOT NULL,
  `comentarios` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `clave`, `comentarios`) VALUES
(1, 'delivermail16@gmail.com', 'dinlarok', 'clave cambiada hace poco');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `empresa`
--
ALTER TABLE `empresa`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stock`
--
ALTER TABLE `stock`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `empleados`
--
ALTER TABLE `empleados`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `empresa`
--
ALTER TABLE `empresa`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `stock`
--
ALTER TABLE `stock`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
