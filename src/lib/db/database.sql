CREATE TABLE User(
    id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  emailVerified DATETIME,
  image VARCHAR(255)
);

CREATE TABLE Account(
    id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  type VARCHAR(255) NOT NULL,
  provider VARCHAR(255) NOT NULL,
  providerAccountId VARCHAR(255) NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at INT,
  token_type VARCHAR(255),
  scope VARCHAR(255),
  id_token TEXT,
  session_state VARCHAR(255),
  UNIQUE KEY unique_provider_providerAccountId (provider, providerAccountId),
  FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE 
);

CREATE TABLE Session(
    id INT AUTO_INCREMENT PRIMARY KEY,
  sessionToken VARCHAR(255) UNIQUE NOT NULL,
  userId INT NOT NULL,
  expires DATETIME NOT NULL,
  FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
);



CREATE TABLE VerificationToken (
  identifier VARCHAR(255),
  token VARCHAR(255) UNIQUE NOT NULL,
  expires DATETIME,
  UNIQUE KEY unique_identifier_token (identifier, token)
);

-- Meditation Sessions Table
CREATE TABLE Meditation_sessions(
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    end_time DATE NOT NULL,
    duration INT NOT NULL,
    notes TEXT,
    FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
);

-- Statistics Table
CREATE TABLE Statistics(
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    statistic_date DATE NOT NULL,
    total_sessions INT NOT NULL,
    total_duration INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
)

