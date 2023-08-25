const   express =require( "express");
const userRouter=require("./routes/user.js");
const bookRouter=require("./routes/books.js");

const app=express();
const port=8080;
app.use(express.json());

// check for server
app.get("/",(req,res)=>{
    res.send("Server is Up and Working now!")
    // res.status(200).json({
    //     message:"Server is Up and Working now!"
    // });
});

app.use("/books",bookRouter);
app.use("/users",userRouter);



app.get("*",(req,res)=>{
    res.send("Oopss...There no Route now!")
    // res.status(404).json({
    //     message:"Oopss...There no Route now!",
    // });
});

app.listen(port,()=>{
    console.log(`Server is Running in the port ${port}`);
});