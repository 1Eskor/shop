/* 2022-09-27 */
CREATE SCHEMA nsfw DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;

CREATE USER 'nsfw_user' @'localhost' IDENTIFIED BY '1q2w3e';

GRANT ALL PRIVILEGES ON nsfw.* TO 'nsfw_user' @'localhost';

FLUSH PRIVILEGES;

USE nsfw;

CREATE TABLE `unstoppable_domain` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`description` VARCHAR(300),
	`name` VARCHAR(300),
	`url` VARCHAR(300),
	PRIMARY KEY(`id`)
);