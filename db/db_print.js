const db = require("./db_connection");

const select_subjects_sql = "select * from subjects";

db.execute(select_subjects_sql, (error, results) => {
    if(error) throw error;

    console.log("Table 'subjects' contents: ")
    console.log(results);
})

const select_assignments_sql = `
    select * from assignments
    join subjects
        on assignments.subjectId = subjects.subjectId
    order by assignments.assignmentId;
`

db.execute(select_assignments_sql, (error, results) => {
    if(error) throw error;

    console.log("Table 'assignments' contents: ")
    console.log(results);
})