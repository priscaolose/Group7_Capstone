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

app.get("/dashboard", (req, res) =>{
    res.sendFile("../src/dashboard");
});