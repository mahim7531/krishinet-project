const mongoose = require('mongoose');

const sensorDataSchema = new mongoose.Schema({
  deviceId: { type: String, required: true, default: 'ESP32_PLANT_01' },
  temperature: { type: Number, required: true },
  humidity: { type: Number, required: true },
  soilMoisture: { type: Number, required: true },
  status: { type: String, enum: ['Healthy', 'Needs Water', 'Critical'], default: 'Healthy' }
}, { timestamps: true });

module.exports = mongoose.model('SensorData', sensorDataSchema);