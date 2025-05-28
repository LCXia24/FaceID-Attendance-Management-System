const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');

// Get all attendance records
router.get('/', async (req, res) => {
  try {
    const attendances = await Attendance.find().populate('employeeId');
    res.json(attendances);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get attendance record by ID
router.get('/:id', async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id).populate('employeeId');
    if (!attendance) return res.status(404).json({ message: 'Attendance record not found' });
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new attendance record
router.post('/', async (req, res) => {
  const attendance = new Attendance({
    employeeId: req.body.employeeId,
    date: req.body.date,
    timeIn: req.body.timeIn,
    timeOut: req.body.timeOut,
    status: req.body.status,
    department: req.body.department
  });

  try {
    const newAttendance = await attendance.save();
    res.status(201).json(newAttendance);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update attendance record
router.put('/:id', async (req, res) => {
  try {
    const updatedAttendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAttendance) return res.status(404).json({ message: 'Attendance record not found' });
    res.json(updatedAttendance);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete attendance record
router.delete('/:id', async (req, res) => {
  try {
    const deletedAttendance = await Attendance.findByIdAndDelete(req.params.id);
    if (!deletedAttendance) return res.status(404).json({ message: 'Attendance record not found' });
    res.json({ message: 'Attendance record deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
