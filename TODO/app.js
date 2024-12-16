// reading the env file..
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Path = require('path');
const methodOverride = require('method-override')
const PORT = process.env.PORT || 4000;

// override methods..
app.use(methodOverride('_method'))


// init the template engine...
app.set('views', 'views');
app.set('view engine', 'ejs');

// serving static files...
app.use(express.static(Path.join(__dirname, "public")));

// parsing body data...
app.use(express.urlencoded({extended: false}));



// create a new Model/Schema for the App
const ToDoSchema = mongoose.Schema({
    status: {type: String, enum:['pending', 'in-progress', 'completed'], default: "pending"},
    title: {type:String, required: true},
    description : {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const ToDoModel = mongoose.model('Todos', ToDoSchema);

// setting up the database connection...
const connection = async()=>{
    try {
        const db = await mongoose.connect(process.env.MONGO_URI, { 
            useUnifiedTopology : true,
    });
    console.log("database is connected...")
    } catch (error) {
        console.error(error.message)
    }
}

connection(); // init the database...



// get all the tasks..
app.get('/', async(req,res)=>{
    const tasks = await ToDoModel.find({});
    res.render('index' , {tasks : tasks, task: null});
});



// create a new task..
app.post('/task/create', async(req,res)=>{
    // create a document..
    const ModelTask = await ToDoModel.create(req.body);

    await ModelTask.save(); //save it..

    res.redirect(302, "/");

});

// get the updated form of the task..
app.get('/task/:id', async(req,res)=>{
    const tasks = await ToDoModel.find({});
    const task = await tasks.find((item) => item.id === req.params.id)
  
    res.render('index' , {tasks : tasks, task: task});
});



// update the task status...
app.put('/task/edit/:id', async(req,res)=>{
    const {status} = req.body;
    
	let task = await ToDoModel.findOne({_id : req.params.id });
	if(!task){
	res.json({"Error:": "You don't have any task"})
	}
	await ToDoModel.findByIdAndUpdate(req.params.id, {status: status}, {
	new : true
	});
	res.redirect('/');
});



// delete the task...
app.delete('/task/delete/:id', async(req,res)=>{
    const {id} = req.params;
    try {
        await ToDoModel.findByIdAndDelete(id);
        res.redirect(302, '/');
    } catch (error) {
            console.error(error.code);
    }
});



// listen to this port...
app.listen(PORT, ()=>{
    console.log('app is running on port',PORT);
});