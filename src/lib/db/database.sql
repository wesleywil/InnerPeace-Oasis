-- User table - will be simple for now
CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
);

-- Meditation Sessions Table
CREATE TABLE meditation_sessions(
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    duration INT NOT NULL,
    notes TEXT,
    FOREIGN KEY (userId) REFERENCES users(id)
);

-- Statistics Table
CREATE statistics(
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    statistic_date DATE NOT NULL,
    total_sessions INT NOT NULL,
    total_duration INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id)
)

