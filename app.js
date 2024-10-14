// Set up the server
const express = require("express");
const app = express();
const db = require("./db/db_connection");
const port = 3000;

// Confgure express to use ejs
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

// Configure Express to parse URL encoded POST request bodies
app.use(express.urlencoded({extended : false}));

const read_books_all_sql = `
    select bookID, title, author, rating, stateID, DATE_FORMAT(startDate, "%m/%d/%Y (%W)") AS startDate, DATE_FORMAT(endDate, "%m/%d/%Y (%W)") AS endDate, review, favorite
    from books
    order by bookID
`;

app.get("/",(req, res) => {
    db.execute(read_books_all_sql, (error, results) => {
        if(error)
            res.status(500).send(error);
            //500 internal server error
        else {
            let data = {booklist:results};
            console.log(data);
            res.render("index", data);
        }
    });
});



app.get("/allbooks",(req, res) => {
    db.execute(read_books_all_sql, (error, results) => {
        if(error)
            res.status(500).send(error);
            //500 internal server error
        else {
            let data = {booklist:results};
            console.log(data);
            res.render("allbooks", data);
        }
    });
});

app.get("/reviews",(req, res) => {
    db.execute(read_books_all_sql, (error, results) => {
        if(error)
            res.status(500).send(error);
            //500 internal server error
        else {
            let data = {booklist:results};
            console.log(data);
            res.render("reviews", data);
        }
    });
});

app.get("/favorites",(req, res) => {
    db.execute(read_books_all_sql, (error, results) => {
        if(error)
            res.status(500).send(error);
            //500 internal server error
        else {
            let data = {booklist:results};
            console.log(data);
            res.render("favorites", data);
        }
    });
});

const read_books_details_sql = `
select bookID, title, author, rating, stateID, DATE_FORMAT(startDate, "%m/%d/%Y (%W)") AS startDate, DATE_FORMAT(endDate, "%m/%d/%Y (%W)") AS endDate, review, favorite
FROM books
WHERE bookID = ?;
`;

app.get("/allbooks/:id", (req, res) => {
    db.execute(read_books_details_sql, [req.params.id], (error, results) => {
        if(error) res.status(500).send(error);
        else{
            let data = {book: results[0]}; // object of one thing, hw is key pointing to value results[0]
            res.render('detail', data);
        } 
    })
});

const delete_books_sql = `delete from books where bookID = ?`

app.get("/index/:id/delete", (req, res) => {
    db.execute(delete_books_sql, [req.params.id], (error, results) =>{
        if(error){
            res.status(500).send(error);
        } else {
            res.redirect("/");
        }
    })
});

app.get("/allbooks/:id/delete", (req, res) => {
    db.execute(delete_books_sql, [req.params.id], (error, results) =>{
        if(error){
            res.status(500).send(error);
        } else {
            res.redirect("/allbooks");
        }
    })
});

const create_books_sql = `
    insert into books (title, author, rating, stateID, review)
    value (?, ?, ?, ?, ?);
`

app.post("/index", (req, res) => {
    db.execute(create_books_sql, [req.body.title, req.body.author, req.body.rating, req.body.stateID, req.body.review], (error, results) =>{
        if(error){
            res.status(500).send(error);
        } else {
            res.redirect(`/`);
        }
    })
});

const update_books_sql = `
    update books
    set title = ?, author = ?, stateID = ?, rating = ?, startDate = ?, endDate = ?, review = ?
    where bookID = ?
`;

app.post("/allbooks/:id", (req, res) => {
    db.execute(
        update_books_sql,
        [
            req.body.title,
            req.body.author,
            req.body.stateID,
            req.body.rating,
            req.body.startDate,
            req.body.endDate,
            req.body.review,
            req.params.id,
        ],
        (error, results) => {
            if (error) {
                res.status(500).send(error);
            } else {
                // insertId = assignmentId of the newly created row
                res.redirect(`/allbooks/${req.params.id}`);
            }
        }
    );
});

const set_favorite_book_sql = `
    update books
    set favorite = 1
    where bookID = ?
`;

app.get("/allbooks/:id/favorite", (req, res) => {
    db.execute(set_favorite_book_sql, [req.params.id], (error, results) =>{
        if(error){
            res.status(500).send(error);
        } else {
            res.redirect("/allbooks");
        }
    })
});

const unfavorite_book_sql = `
    update books
    set favorite = 0
    where bookID = ?
`;

app.get("/allbooks/:id/unfavorite", (req, res) => {
    db.execute(unfavorite_book_sql, [req.params.id], (error, results) =>{
        if(error){
            res.status(500).send(error);
        } else {
            res.redirect("/allbooks");
        }
    })
});

app.get("/index/:id/favorite", (req, res) => {
    db.execute(set_favorite_book_sql, [req.params.id], (error, results) =>{
        if(error){
            res.status(500).send(error);
        } else {
            res.redirect("/");
        }
    })
});

app.get("/index/:id/unfavorite", (req, res) => {
    db.execute(unfavorite_book_sql, [req.params.id], (error, results) =>{
        if(error){
            res.status(500).send(error);
        } else {
            res.redirect("/");
        }
    })
});

app.get("/favorites/:id/unfavorite", (req, res) => {
    db.execute(unfavorite_book_sql, [req.params.id], (error, results) =>{
        if(error){
            res.status(500).send(error);
        } else {
            res.redirect("/favorites");
        }
    })
});

const incrementRating = `
    update books
    set rating = rating + 1
    where bookID = ?
`;

app.get("/star", (req, res) => {
    db.execute(incrementRating, [req.params.id], (error, results) =>{
        if(error){
            res.status(500).send(error);
        } else {
            res.redirect("/");
        }
    })
});

// Start the server
app.listen(port,() => {
    console.log(`App server listening on ${port}. Go to http://localhost:${port}`);
});