import express from 'express'

const app = express();

app.get("/", (req, res) =>{
    res.sendFile("../src/homepage");
});

app.get("/registration", (req, res) =>{
    res.sendFile("../src/Registration");
});

app.get("/login", (req, res) =>{
    res.sendFile("../src/login");
});

app.get("/home", (req, res) =>{
    res.sendFile("../src/dashboard");
});

export default function handler(req, res) {
    app(req, res);
}