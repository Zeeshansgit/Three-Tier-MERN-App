// const tasks = require("./routes/tasks");
// const connection = require("./db");
// const cors = require("cors");
// const express = require("express");
// const app = express();

// connection();

// app.use(express.json());
// app.use(cors());

// app.get('/ok', (req, res) => {
//     res.status(200).send('ok')
//   })

// app.use("/api/tasks", tasks);

// const port = process.env.PORT || 3500;
// app.listen(port, () => console.log(`Listening on port ${port}...`));
























const tasks = require("./routes/tasks");
const connection = require("./db");
const cors = require("cors");
const express = require("express");
const path = require("path");

const app = express();

connection();

app.use(express.json());
app.use(cors());

// Health check
app.get("/ok", (req, res) => {
    res.status(200).send("ok");
});

// Backend API
app.use("/api/tasks", tasks);

// Serve React frontend
const frontendPath = path.join(__dirname, "public");
app.use(express.static(frontendPath));

// React frontend fallback
app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api/")) {
        return next();
    }

    res.sendFile(path.join(frontendPath, "index.html"));
});

// Azure App Service port
const port = process.env.PORT || 3500;

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
