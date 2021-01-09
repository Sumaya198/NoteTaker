// DEPENDENCIES
const path = require("path");
const express = require("express");

const app = express();

var PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

require("./routes/routes")(app);
require("./routes/htmlRoutes")(app);

app.listen(PORT, function() {
    console.log('server is running on port: ' + PORT)
});