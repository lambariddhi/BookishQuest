const db = require("./db_connection");

// Exexcute query, print result or error
db.execute('select 1 + 1 as solution', (error, results) => {
    if(error) {
        throw error;
    }
    console.log(results);
    
    //error ? throw error : console.log(results);
})

db.end();