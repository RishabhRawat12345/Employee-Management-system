const express=require("express");
const Db=require("../Backend/Config/db.js")
const cors=require("cors");
const app=express();
const Tasks_routes=require("./Routes/tasks_routes.js")
const Login_routes=require("./Routes/Login_Routes.js")
const projectRoutes = require("./Routes/Project_Routes");
const MessageServer=require("./Routes/Message.js")
const http = require('http');
const { Server } = require('socket.io');
const configureSocket = require('./Socket.io/socket.js');
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5175",
    methods: ["GET", "POST"]
  }
});
app.use(cors());


app.use(express.json());

app.use("/api",Login_routes);
app.use("/api",Tasks_routes);
app.use("/api",projectRoutes);
app.use("/api",MessageServer);
app.get("/",(req,res)=>{
    res.send("this is the home page");
})
configureSocket(io);


server.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
const PORT=8080;

app.listen(PORT,async(req,res)=>{
    await Db();
    console.log(`Server is running at http://localhost:${PORT}`);
})