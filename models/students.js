const Joi = require("joi");

var students = [
    {id : 1, name : 'nidhal', age : 35, class : "Isie"}, // name : string, minlength : 3, maxlength : 20, required
    {id : 2, name : 'faouzia', age : 55, class : "Isie"},
    {id : 3, name : 'Amor', age : 85, class : "marketing"}
];

var student_schema = Joi.object({
    name : Joi.string().min(3).max(20).required(),
    age : Joi.number().positive().required(),
    class : Joi.string()
})

var student_schema_update = Joi.object({
    name : Joi.string().min(3).max(20),
    age : Joi.number().positive(),
    class : Joi.string()
})

module.exports.students_list = students;
module.exports.student_schema = student_schema;
module.exports.student_schema_update = student_schema_update;