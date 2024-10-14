const db = require("./db_connection")

// Drop any existing tables
const drop_books_table_sql = "drop table if exists books";

// Execute the query
db.execute(drop_books_table_sql);

// Create the assignments table
const create_books_table_sql = `CREATE TABLE books (bookID INT NOT NULL AUTO_INCREMENT,title VARCHAR(45) NULL,
    author VARCHAR(45) NULL,
    favorite INT NULL,
    stateID INT NULL,
    startDate DATE NULL,
    endDate DATE NULL,
    rating INT NULL,
    review VARCHAR(150) NULL,
    PRIMARY KEY (bookID));`;

db.execute(create_books_table_sql);

