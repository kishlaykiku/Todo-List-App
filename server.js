import express from "express";
import path from "path";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const __dirname = path.resolve();

// Initialize Todo's
let todoList = {};
// Initiliaze Category list
let categories = {};

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


// Home route
app.get("/", (req, res) => {
    res.render(`${__dirname}/views/index.ejs`, {
        categoryList: categories, // First time category list render to check if there are already present categories
        todoList: todoList, // First time todo list render to check if there are already present todo's
    });
});

// Add category
app.post("/addcategory", (req, res) => {

    // Check how many user defined categories are present (Can't be more than 2)
    if(Object.keys(categories).length != 2) {
        // Store the categories under the ID associated with it as key: value pair, where key is ID and value is category name
        categories[req.body.id] = [req.body.category];
    }

    console.log(categories);

    res.render(`${__dirname}/views/index.ejs`, {
        categoryList: categories, // Render the category list again for changes
        todoList: todoList, // Render the todo's again for changes
    });
});


// Remove existing category
app.post("/removecategory", (req, res) => {
    // Remove the category with ID associated with it (blockToRemove = categoryToRemove = ID of the category name)
    delete categories[req.body.categoryToRemove];
    res.redirect('/');
});

// Add todo's
app.post("/add", (req, res) => {

    // Get data
    const todo = req.body["todo"];
    const time = Number(req.body["time"]);
    const category = req.body["category"];

    // If todo or time is given
    if(todo || time)
    {
        // Generate random ID for each task
        function randomID(length = 6) {
            let genID = Math.random().toString(36).substring(2, length+2);
            for (const [key, value] of Object.entries(todoList)) {
                if (genID === key)
                    randomID();
            }
            return genID;
        };
        let id = randomID();

        // Store todo's with time and the category they belong to in todolist object
        todoList[id] = [todo, time, category];
        console.log(todoList);

        res.render(`${__dirname}/views/index.ejs`, {
            categoryList: categories, // Render the category list again for changes
            todoList: todoList, // Render the todo's again for changes
        });
    }
    else
        res.render(`${__dirname}/views/partials/error.ejs`, {
            __dirname: __dirname,
        });
    
});

app.listen(port, () => {
    console.log(`App hovering on port: ${port}`);
});