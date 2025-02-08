-- Date: 2021-06-06 22:00:00
CREATE TABLE `users` (
  `id` uuid NOT NULL DEFAULT uuid(),
  `idCard` varchar(20) NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `gender` int(2) NOT NULL,
  `address` varchar(100) NOT NULL,
  `dateBirth` int(11) NOT NULL,
  `createAt` timestamp NOT NULL,
  `updateAt` datetime NOT NULL,
  `role` int(11) NOT NULL,
  `passwd` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idCard` (`idCard`);
COMMIT;