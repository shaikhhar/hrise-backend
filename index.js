const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Employee = require('./employee');

const cors = require('cors');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost/employeeDB', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors())
app.use(bodyParser.json());

app.post('/api/employees', async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/api/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/employees/:id', async(req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        res.json(employee);
    } catch (err) {
        res.status(400).json({ message: err.message});
    }
   
})

app.put('/api/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(employee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/employees/:id', async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
