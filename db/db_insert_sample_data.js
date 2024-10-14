const db = require("./db_connection");


// Delete contents of existing tables
const delete_assignments_table_sql = "delete from assignments";


db.execute(delete_assignments_table_sql);


const delete_subjects_table_sql = "delete from subjects";


db.execute(delete_subjects_table_sql);


// Insert data into the subjects table (must do this table first)
const insert_subject_sql = `
    insert into subjects
        (subjectId, subjectName)
    values
        (?, ?);
    `;


// No access to front end yet, so use this execute method to insert data
db.execute(insert_subject_sql, [1, "Comp Sci"])
db.execute(insert_subject_sql, [2, "Math"])
db.execute(insert_subject_sql, [3, "English"])
db.execute(insert_subject_sql, [4, "History"])

//Insert assignments into assignments table

const insert_assignment_sql = `
    insert into assignments
        (title, priority, subjectId, dueDate, description)
    values
        (?, ?, ?, ?, ?)`

db.execute(insert_assignment_sql, ['Textbook Exercises', 8, 2, '2024-01-29', 'Do all odd questions.']);


db.execute(insert_assignment_sql, ['Essay', 10, 4, '2024-01-29', 'Write an essay about the crucible']);

db.end();