
--
-- Base de datos: `packageManager`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `packages`
--

CREATE TABLE `packages` (
  `id` varchar(100) NOT NULL COMMENT 'Unique identifier for the package',
  `senderName` varchar(100) DEFAULT NULL COMMENT 'Name of the sender',
  `senderIdCard` bigint(255) DEFAULT NULL COMMENT 'Identification card number of the sender',
  `senderAddress` varchar(255) DEFAULT NULL COMMENT 'Address of the sender',
  `senderCountry` varchar(100) DEFAULT NULL COMMENT 'Country of the sender',
  `senderCity` varchar(100) DEFAULT NULL COMMENT 'City of the sender',
  `senderState` varchar(100) DEFAULT NULL COMMENT 'State of the sender',
  `senderPostalCode` int(11) DEFAULT NULL,
  `senderPhone` bigint(20) NOT NULL,
  `reciverName` varchar(100) DEFAULT NULL COMMENT 'Name of the receiver',
  `reciverIdCard` bigint(255) DEFAULT NULL COMMENT 'Identification card number of the receiver',
  `reciverAddress` varchar(255) DEFAULT NULL COMMENT 'Address of the receiver',
  `reciverCountry` varchar(100) DEFAULT NULL COMMENT 'Country of the receiver',
  `reciverState` varchar(100) DEFAULT NULL COMMENT 'State of the receiver',
  `reciverCity` varchar(100) DEFAULT NULL COMMENT 'City of the receiver',
  `reciverPostalCode` int(11) DEFAULT NULL,
  `reciverPhone` bigint(20) NOT NULL,
  `vehicleId` varchar(36) NOT NULL COMMENT 'Identifier for the vehicle associated with the package',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'Timestamp when the package record was created',
  `createdBy` varchar(100) DEFAULT NULL COMMENT 'User  who created the package record',
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT 'Timestamp when the package record was last updated',
  `updatedBy` varchar(100) DEFAULT NULL COMMENT 'User  who last updated the package record',
  `recivedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT 'Timestamp when the package was received',
  `recivedBy` varchar(100) NOT NULL COMMENT 'Name of the person who received the package',
  `recivedByIdCard` bigint(20) NOT NULL COMMENT 'Identification card number of the person who received the package',
  `deliverDateEtaAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT 'Estimated time of arrival for delivery',
  `packageState` varchar(10) DEFAULT NULL COMMENT 'Current state of the package (e.g., in transit, delivered)',
  `weight` float DEFAULT NULL COMMENT 'Weight of the package',
  `dimentions` varchar(100) DEFAULT NULL COMMENT 'Dimensions of the package',
  `description` text DEFAULT NULL COMMENT 'Description of the package contents',
  `packageType` varchar(255) DEFAULT NULL COMMENT 'Type of the package (e.g., fragile, perishable)',
  `notes` text DEFAULT NULL COMMENT 'Additional notes about the package',
  `gpsLocation` point DEFAULT NULL COMMENT 'GPS location of the package'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `packages`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` varchar(36) NOT NULL COMMENT 'Unique identifier for the user (UUID)',
  `idCard` bigint(255) NOT NULL COMMENT 'Identification card number',
  `firstName` varchar(30) NOT NULL COMMENT 'Users first name',
  `lastName` varchar(30) NOT NULL COMMENT 'Users last name',
  `gender` int(2) NOT NULL COMMENT 'Users gender (1: Male, 2: Female, etc.)',
  `country` varchar(100) NOT NULL COMMENT 'Country of residence',
  `state` varchar(100) NOT NULL COMMENT 'State of residence',
  `city` varchar(100) NOT NULL COMMENT 'City of residence',
  `address` varchar(100) NOT NULL COMMENT 'Street address',
  `postalCode` int(10) DEFAULT NULL COMMENT 'Postal code for the address',
  `email` varchar(100) NOT NULL COMMENT 'Users email address',
  `phone` bigint(255) NOT NULL COMMENT 'Users phone number',
  `dateBirth` date DEFAULT NULL COMMENT 'Users date of birth',
  `hireName` varchar(100) DEFAULT NULL COMMENT 'Name of the person who hired the driver',
  `licenceNumber` varchar(50) DEFAULT NULL COMMENT 'Drivers license number',
  `licenceExpirationAt` date DEFAULT NULL COMMENT 'Expiration date of the drivers license',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'Timestamp when the user record was created',
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT 'Timestamp when the user record was last updated',
  `role` int(11) NOT NULL COMMENT 'User  role (e.g., 1: Admin, 2: User)',
  `password` varchar(255) NOT NULL COMMENT 'Users password (hashed)',
  `notes` text DEFAULT NULL COMMENT 'Additional notes about the driver'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--
-- admin@email.com
-- adminPass

INSERT INTO `users` (`id`, `idCard`, `firstName`, `lastName`, `gender`, `country`, `state`, `city`, `address`, `postalCode`, `email`, `phone`, `dateBirth`, `hireName`, `licenceNumber`, `licenceExpirationAt`, `createdAt`, `updatedAt`, `role`, `password`, `notes`) VALUES
('e26f2591-82f5-4f92-ab44-086d05c1cbf6', 8273473, 'admin', 'lastname', 0, 'colombia', 'state', 'Barranquilla', 'calle 45  con carrera 17 al frente de donde venden pollo ', 1234578, 'admin@email.com', 3003003030, '2024-04-27', NULL, NULL, NULL, '2025-02-10 17:30:34', '2025-02-10 17:36:17', 1, '$2b$10$lI/7NkEaeBb98pHFI9BQ8.0ImjgUf/2HWr7BsL7Qk8/pJ4r1e/AG6', ''),


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehicles`
--

CREATE TABLE `vehicles` (
  `id` varchar(36) NOT NULL COMMENT 'Unique identifier for the vehicle',
  `vin` varchar(17) DEFAULT NULL COMMENT 'Vehicle Identification Number (VIN)',
  `make` varchar(50) DEFAULT NULL COMMENT 'Manufacturer of the vehicle',
  `model` varchar(50) DEFAULT NULL COMMENT 'Model of the vehicle',
  `licencePlate` varchar(20) DEFAULT NULL COMMENT 'License plate number',
  `cargoCapacityVolume` decimal(10,2) DEFAULT NULL COMMENT 'Cargo capacity in volume (e.g., cubic meters)',
  `cargoCapacityWeight` decimal(10,2) DEFAULT NULL COMMENT 'Cargo capacity in weight (e.g., kilograms)',
  `dimentionInterior` varchar(100) DEFAULT NULL COMMENT 'Interior dimensions of the vehicle',
  `Owner` varchar(100) DEFAULT NULL COMMENT 'Owner of the vehicle',
  `dateAcquired` date DEFAULT NULL COMMENT 'Date when the vehicle was acquired',
  `vehicleStatus` varchar(50) DEFAULT NULL COMMENT 'Current status of the vehicle (e.g., active, inactive)',
  `driverId` varchar(36) DEFAULT NULL COMMENT 'Identifier for the driver associated with the vehicle',
  `dateCreatedAt` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'Timestamp when the record was created',
  `dateUpdatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT 'Timestamp when the record was last updated',
  `cratedBy` varchar(100) DEFAULT NULL COMMENT 'User  who created the record',
  `updatedBy` varchar(100) DEFAULT NULL COMMENT 'User  who last updated the record',
  `notes` text DEFAULT NULL COMMENT 'Additional notes about the vehicle',
  `gpsLocation` point DEFAULT NULL COMMENT 'GPS location of the package'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `vehicles`
--

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `packages`
--
ALTER TABLE `packages`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `gpsLocation` (`gpsLocation`(25)),
  ADD KEY `senderIdCard` (`senderIdCard`),
  ADD KEY `reciverIdCard` (`reciverIdCard`),
  ADD KEY `vehicleId` (`vehicleId`);
ALTER TABLE `packages` ADD FULLTEXT KEY `vehicleId_2` (`vehicleId`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idCard` (`idCard`),
  ADD KEY `licenceNumber` (`licenceNumber`);

--
-- Indices de la tabla `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `licencePlate_2` (`licencePlate`),
  ADD UNIQUE KEY `gpsLocation` (`gpsLocation`(25)),
  ADD KEY `licencePlate` (`licencePlate`),
  ADD KEY `driverId` (`driverId`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `packages`
--
ALTER TABLE `packages`
  ADD CONSTRAINT `packages_ibfk_1` FOREIGN KEY (`senderIdCard`) REFERENCES `users` (`idCard`) ON UPDATE CASCADE,
  ADD CONSTRAINT `packages_ibfk_2` FOREIGN KEY (`vehicleId`) REFERENCES `vehicles` (`id`) ON UPDATE CASCADE;
COMMIT;