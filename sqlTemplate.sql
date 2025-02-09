-- Date: 2021-06-06 22:00:00
CREATE TABLE `users` (
  `id` varchar(36) NOT NULL ,
  `idCard` INT(20) NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `gender` int(2) NOT NULL,
  `country` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `postalCode` INT(10) ,
  `email` varchar(100) NOT NULL,
  `phone` INT(55) NOT NULL,
  `dateBirth` DATE,
  `createdAt` timestamp NOT NULL,
  `updatedAt` datetime NOT NULL,
  `role` int(11) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB ;

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idCard` (`idCard`);
COMMIT;