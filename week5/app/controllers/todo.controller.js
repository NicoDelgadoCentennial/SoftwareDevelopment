const Todo = require('../models/todo.model')

exports.create = (req, res)=> {
    if (!req.body.description){
        return res.status(400).send({
            message:"description can not be empty"
        })
    }

    const todo = new Todo({
        name : req.body.name || 'Untitled',
        description: req.body.description
    });

    todo.save()
        .then(data=>res.send(data))
        .catch(err => {
            res.status(500).send({
                message:"someting went wrong while inserting data"
        })
    });
}

exports.findAll = (req, res) =>{
    Todo.find().then(todos => {
        res.send(todos)
    }
    ).catch(err => {
        res.status(500).send({
            'message' : 'Something went wrong!!', 'error' : err
        })
    })
}

exports.findOne = (req, res) =>{
    const id =req.params.id;
    Todo.findById(id).then(todos => {
        if(!todos){
            res.status(400).send(
                {
                    'message' : 'Todo not available', 
                    'error' : err
                }
            )
        }
        res.send(todos)
    }
    ).catch(err => {
        res.status(500).send({
            'message' : 'Something went wrong!!', 'error' : err
        })
    })
}
exports.update = (req,res) =>{
    const id =req.params.id;

    Todo.findByIdAndUpdate(id, {
        name : req.body.name || 'Untitled',
        description: req.body.description
    },{new:true}).then(todo =>{
        res.send(todo)
    }).catch(err => {
        res.status(500).send({
            'message' : 'Something went wrong!!', 'error' : err
        })
    })
}

exports.delete = (req,res) =>{
    const id =req.params.id;
    Todo.findByIdAndRemove(id).then(todo =>{
        res.send({
            'message':'Removed!!'
        })
    }).catch(err => {
        res.status(500).send({
            'message' : 'Something went wrong!!', 'error' : err
        })
    })
}