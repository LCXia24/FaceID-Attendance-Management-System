const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  date: { type: Date, required: true },
  timeIn: { type: String },
  timeOut: { type: String },
  status: { type: String, enum: ['present', 'absent', 'late'], required: true },
  department: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Attendance', AttendanceSchema);
