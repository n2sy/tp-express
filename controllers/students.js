let { students_list, student_schema, student_schema_update } = require("../models/students");

_ = require("lodash");

exports.getAllStudents = (req, res) => {
    //res.send("All Students are there")
    // res.status(200).json({
    //     students : "All Students are there",
    //     id : "A10"
    // });

    res.status(200).json({
        listStudents : students_list
    })

    //res.send(student_list);
   
}

// function findStudent(id) {
//     return student_list.find((p) => p.id == id)
// }

exports.getStudent = (req, res) => {
    //let id = req.params['id'];
    let id = req.params.id;
    
    let selectedStudent = _.find(students_list, p => p.id === Number(id));
    //let selectedStudent = _.find(students_list, p => p.id === parseInt(id))
    //let selectedStudent = student_list.find((p) => p.id == id);


    if(!selectedStudent)
        return res.status(404).json({
            message : "Student with the given Id is not found"
        });
    
        res.send(selectedStudent)

}

exports.createStudent = (req, res) => {
    // let newStudent = {
    //     //id : students_list.length + 1,
    //     name : req.body.name,
    //     age : req.body.age,
    //     class : req.body.class
    // };
    let validationResult = student_schema.validate(req.body);
    if(validationResult.error) {
        console.log(validationResult.error);
        return res.status(400).send(validationResult.error.details[0].message)
    }

    let newStudent = _.pick(req.body, ['name', 'age', 'class']);

    newStudent.id = students_list.length + 1;
    students_list.push(newStudent);
    res.status(201).json({
        message : "New student successfully created",
        student : newStudent
    });

}

exports.updateStudent = (req, res) => {
    let selectedStudent = _.find(students_list, p => p.id === Number(req.params.id));
    if(!selectedStudent)
        return res.status(404).json({
            message : "Student with the given ID is not found"
        });
    
    let validationResult = student_schema_update.validate(req.body);
    if(validationResult.error) {
        return res.status(400).send(validationResult.error.details[0].message)
    }

    selectedStudent = _.merge(selectedStudent, req.body)
    res.status(200).json({
        message : "Student successfully updated",
        student : selectedStudent
    })

}

exports.deleteStudent = (req, res) => {
    let studentToDelete = _.find(students_list, s => s.id == Number(req.params.id));
    if(!studentToDelete) {
        return res.status(404).json({
            message : "Student with the given ID is not found"
        });
    }
    students_list = students_list.filter(s => s.id != Number(req.params.id))
    res.status(200).json({
        message : "Student succesfully Deleted",
        nameStudent : studentToDelete.name
    })




}