const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const SensorData = require('./models/SensorData');
const CommunityPost = require('./models/CommunityPost');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// 1. ESP32 Sensor Data Post API
app.post('/api/sensors/data', async (req, res) => {
  try {
    const { deviceId, temperature, humidity, soilMoisture } = req.body;
    let status = 'Healthy';
    if (soilMoisture < 20) status = 'Critical';
    else if (soilMoisture < 40) status = 'Needs Water';

    const newEntry = new SensorData({ deviceId, temperature, humidity, soilMoisture, status });
    await newEntry.save();
    res.status(201).json({ message: 'Sensor data saved', data: newEntry });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save sensor data' });
  }
});

// 2. Get Latest Sensor Data API
app.get('/api/sensors/latest', async (req, res) => {
  try {
    const latestData = await SensorData.find().sort({ createdAt: -1 }).limit(10);
    res.json(latestData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sensor data' });
  }
});

// 3. Create Community Post API
app.post('/api/community/posts', async (req, res) => {
  try {
    const { author, plantName, message } = req.body;
    const newPost = new CommunityPost({ author, plantName, message });
    await newPost.save();
    res.status(201).json({ message: 'Post created', data: newPost });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// 4. Get Community Posts API
app.get('/api/community/posts', async (req, res) => {
  try {
    const posts = await CommunityPost.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// 5. Leaderboard API
app.get('/api/leaderboard', async (req, res) => {
  try {
    const latestLogs = await SensorData.aggregate([
      { $sort: { createdAt: -1 } },
      { 
        $group: { 
          _id: "$deviceId", 
          soilMoisture: { $first: "$soilMoisture" },
          updatedAt: { $first: "$createdAt" }
        }
      }
    ]);

    const leaderboard = latestLogs.map(device => {
      let score = 100;
      let health = "Excellent";
      if (device.soilMoisture < 30 || device.soilMoisture > 80) {
        score -= 40;
        health = "Needs Attention";
      }
      return { deviceId: device._id, score, soilMoisture: device.soilMoisture, health };
    });

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));