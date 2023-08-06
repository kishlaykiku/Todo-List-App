import express from "express";
import path from "path";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const __dirname = path.resolve();

let todoList = {};

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// Home route
app.get("/", (req, res) => {
    res.render(`${__dirname}/views/index.ejs`);
});

// Add todo's
app.post("/add", (req, res) => {
    const todo = req.body["todo"];
    const time = Number(req.body["time"]);
    
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
        todoList[id] = [todo, time];
        console.log(todoList);

        res.render(`${__dirname}/views/index.ejs`, {
            todoList: todoList,
        })
    }
    else
        res.render(`${__dirname}/views/partials/error.ejs`, {
            __dirname: __dirname,
        });
    
})

app.listen(port, () => {
    console.log(`App hovering on port: ${port}`);
});