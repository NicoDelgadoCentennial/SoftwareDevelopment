const Student = require('../models/student.model')

exports.create = (req, res)=> {
    if (!req.body.name){
        return res.status(400).send({
            message:"name can not be empty"
        })
    }
    if (!req.body.age){
        return res.status(400).send({
            message:"age can not be empty"
        })
    }
    if (!req.body.major){
        return res.status(400).send({
            message:"major can not be empty"
        })
    }

    const student = new Student({
        name : req.body.name,
        age: req.body.age,
        major: req.body.major
    });

    student.save()
        .then(data=>res.send(data))
        .catch(err => {
            res.status(500).send({
                message:"someting went wrong while inserting data"
        })
    });
}

exports.findAll = (req, res) =>{
    Student.find().then(students => {
        res.send(students)
    }
    ).catch(err => {
        res.status(500).send({
            'message' : 'Something went wrong!!', 'error' : err
        })
    })
}

exports.findOne = (req, res) =>{
    const id =req.params.id;
    Student.findById(id).then(students => {
        if(!students){
            res.status(400).send(
                {
                    'message' : 'Student not available', 
                    'error' : err
                }
            )
        }
        res.send(students)
    }
    ).catch(err => {
        res.status(500).send({
            'message' : 'Something went wrong!!', 'error' : err
        })
    })
}
exports.update = (req,res) =>{
    const id =req.params.id;

    Student.findByIdAndUpdate(id, {
        name : req.body.name,
        age: req.body.age,
        major: req.body.major
    },{new:true}).then(student =>{
        res.send(student)
    }).catch(err => {
        res.status(500).send({
            'message' : 'Something went wrong!!', 'error' : err
        })
    })
}

exports.delete = (req,res) =>{
    const id =req.params.id;
    Student.findByIdAndRemove(id).then(student =>{
        res.send({
            'message':'Removed!!'
        })
    }).catch(err => {
        res.status(500).send({
            'message' : 'Something went wrong!!', 'error' : err
        })
    })
}