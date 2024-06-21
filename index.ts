import express, { Application, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose, { Schema, Document, Model } from "mongoose";

// Initialize the express application
const app: Application = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());


// Designing Schema

interface ISignup extends Document {
    name: string;
    Phonenumber: Number;
    email: string;
    Githublink_task_2: string;
    Stopwatch_time: Number;
}

const FormSchema: Schema = new Schema<ISignup>({
    name: { type: String, required: true },
    Phonenumber:{type:Number, required: true},
    email: { type: String, required: true },
    Githublink_task_2:{type: String, required: true},
    Stopwatch_time:{type:Number, required:true}
});

// Creation of Mongoose Model

const FormModel = mongoose.model<ISignup>('Formdata', FormSchema);

// To wirte data in to DB
const Formdata = async(UserDetails: ISignup)=>{
  let newEntry = new FormModel(UserDetails);
  let result = await newEntry.save();
  return(result)}


// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/FormAssignment", ).then(() => {
  console.log("Connected to database successfully");
}).catch((err) => {
  console.error("Error connecting to the database", err);
});

//  route for Ping
app.get('/ping', (req, res) => {
  res.json(true);})

// route for submit
app.post('/submit', async (req, res) => {
  console.log(req.body)
  let result = await Formdata(req.body)
  let resultString = JSON.stringify(result)
  console.log("results saved" + resultString) 
  res.send(resultString)

});

// route for read
app.get('/read', async(req,res)=>{
 let db = await FormModel.find()
 console.log(db)
 let db1 = JSON.stringify(db);
 console.log("retrived data" + db1)
})


// Start the server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
