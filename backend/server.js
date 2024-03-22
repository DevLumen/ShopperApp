import express from 'express';
const port = 5000;

const app = express();

app.get("*", (req, res) => {
    res.send("Yo")
});

app.listen(port, () => console.log(`Server is listening ${port}`))