CREATE TABLE `samples` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`content` text NOT NULL
);

INSERT INTO `samples` (`content`) VALUES ('Hello, Drizzle!');
