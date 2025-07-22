import express from "express"
import { fileURLToPath } from "url"
import { dirname } from "path"
import bodyParser from "body-parser"

const app       = express();
const PORT      = 5000;
const __dirname = dirname(fileURLToPath(import.meta.url));
const path      = __dirname.substring(0, 61);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {

    res.sendFile(path + "\\templates\\index.html");

});

app.post("/", (req, res) => {

    const weight = req.body.weight;
    const height = req.body.height;

    let bmi = weight / (height * Math.pow(10, -2) * height * Math.pow(10, -2));
    let status = "";

    if (bmi < 18.5) {

        status = "Underweight";

    } else if (bmi >= 18.5 && bmi <= 24.9) {

        status = "Healthy Weight";

    } else if (bmi >= 25 && bmi <= 29.9) {

        status = "Overweight";

    } else {

        status = "Obesity";

    }

    res.render(path + "\\templates\\index.ejs", { bmi: bmi, status: status });

});

app.listen(PORT, () => {

    console.log(`Server is running on port ${PORT}`);

});