
--
-- Estructura de tabla para la tabla `packages`
--

CREATE TABLE `packages` (
  `id` varchar(36) NOT NULL COMMENT 'Unique identifier for the package',
  `senderName` varchar(100) DEFAULT NULL COMMENT 'Name of the sender',
  `senderIdCard` BIGINT(255) DEFAULT NULL COMMENT 'Identification card number of the sender',
  `senderAddress` varchar(255) DEFAULT NULL COMMENT 'Address of the sender',
  `senderCountry` varchar(100) DEFAULT NULL COMMENT 'Country of the sender',
  `senderCity` varchar(100) DEFAULT NULL COMMENT 'City of the sender',
  `senderState` varchar(100) DEFAULT NULL COMMENT 'State of the sender',
  `reciverName` varchar(100) DEFAULT NULL COMMENT 'Name of the receiver',
  `reciverIdCard` BIGINT(255) DEFAULT NULL COMMENT 'Identification card number of the receiver',
  `reciverAddress` varchar(255) DEFAULT NULL COMMENT 'Address of the receiver',
  `reciverCountry` varchar(100) DEFAULT NULL COMMENT 'Country of the receiver',
  `reciverState` varchar(100) DEFAULT NULL COMMENT 'State of the receiver',
  `reciverCity` varchar(100) DEFAULT NULL COMMENT 'City of the receiver',
  `vehicleId` BIGINT(255) DEFAULT NULL COMMENT 'Identifier for the vehicle associated with the package',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'Timestamp when the package record was created',
  `createdBy` varchar(100) DEFAULT NULL COMMENT 'User  who created the package record',
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT 'Timestamp when the package record was last updated',
  `updatedBy` varchar(100) DEFAULT NULL COMMENT 'User  who last updated the package record',
  `recivedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT 'Timestamp when the package was received',
  `deliverDateEtaAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT 'Estimated time of arrival for delivery',
  `packageState` int(3) DEFAULT NULL COMMENT 'Current state of the package (e.g., in transit, delivered)',
  `weight` decimal(10,2) DEFAULT NULL COMMENT 'Weight of the package',
  `dimentions` varchar(100) DEFAULT NULL COMMENT 'Dimensions of the package',
  `description` text DEFAULT NULL COMMENT 'Description of the package contents',
  `packageType` varchar(255) DEFAULT NULL COMMENT 'Type of the package (e.g., fragile, perishable)',
  `notes` text DEFAULT NULL COMMENT 'Additional notes about the package',
  `gpsLocation` point DEFAULT NULL COMMENT 'GPS location of the package'
) ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` varchar(36) NOT NULL COMMENT 'Unique identifier for the user (UUID)',
  `idCard` BIGINT(255) NOT NULL COMMENT 'Identification card number',
  `firstName` varchar(30) NOT NULL COMMENT 'Users first name',
  `lastName` varchar(30) NOT NULL COMMENT 'Users last name',
  `gender` int(2) NOT NULL COMMENT 'Users gender (1: Male, 2: Female, etc.)',
  `country` varchar(100) NOT NULL COMMENT 'Country of residence',
  `state` varchar(100) NOT NULL COMMENT 'State of residence',
  `city` varchar(100) NOT NULL COMMENT 'City of residence',
  `address` varchar(100) NOT NULL COMMENT 'Street address',
  `postalCode` int(10) DEFAULT NULL COMMENT 'Postal code for the address',
  `email` varchar(100) NOT NULL COMMENT 'Users email address',
  `phone` BIGINT(255) NOT NULL COMMENT 'Users phone number',
  `dateBirth` date DEFAULT NULL COMMENT 'Users date of birth',
  `hireName` varchar(100) DEFAULT NULL COMMENT 'Name of the person who hired the driver',
  `licenceNumber` varchar(50) DEFAULT NULL COMMENT 'Drivers license number',
  `licenceExpirationAt` date DEFAULT NULL COMMENT 'Expiration date of the drivers license',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'Timestamp when the user record was created',
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT 'Timestamp when the user record was last updated',
  `role` int(11) NOT NULL COMMENT 'User  role (e.g., 1: Admin, 2: User)',
  `password` varchar(255) NOT NULL COMMENT 'Users password (hashed)',
  `notes` text DEFAULT NULL COMMENT 'Additional notes about the driver'
) ;

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
) ;

--
-- Indices de la tabla `packages`
--
ALTER TABLE `packages`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `senderIdCard` (`senderIdCard`),
  ADD UNIQUE KEY `vehicleId` (`vehicleId`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idCard` (`idCard`);

--
-- Indices de la tabla `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `vin` (`vin`),
  ADD UNIQUE KEY `driverId` (`driverId`);

