const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const SETTINGS_FILE = path.join(__dirname, 'data', 'settings.json');
const PROJECTS_FILE = path.join(__dirname, 'data', 'projects.json');

// Helper to safely read JSON files
function readJsonFile(filePath, fallback = {}) {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err.message);
  }
  return fallback;
}

// Helper to safely write JSON files
function writeJsonFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err.message);
    return false;
  }
}

// API Routes
app.get('/api/v1/settings', (req, res) => {
  const settings = readJsonFile(SETTINGS_FILE, {});
  res.json(settings);
});

app.post('/api/v1/settings', (req, res) => {
  const updatedSettings = req.body;
  if (!updatedSettings || typeof updatedSettings !== 'object') {
    return res.status(400).json({ error: 'Invalid settings body' });
  }
  const success = writeJsonFile(SETTINGS_FILE, updatedSettings);
  if (success) {
    res.json({ message: 'Settings saved successfully', settings: updatedSettings });
  } else {
    res.status(500).json({ error: 'Failed to write settings to disk' });
  }
});

app.get('/api/v1/projects', (req, res) => {
  const projects = readJsonFile(PROJECTS_FILE, []);
  res.json(projects);
});

app.post('/api/v1/projects', (req, res) => {
  const updatedProjects = req.body;
  if (!Array.isArray(updatedProjects)) {
    return res.status(400).json({ error: 'Projects payload must be an array' });
  }
  const success = writeJsonFile(PROJECTS_FILE, updatedProjects);
  if (success) {
    res.json({ message: 'Projects saved successfully', projects: updatedProjects });
  } else {
    res.status(500).json({ error: 'Failed to write projects to disk' });
  }
});

// Serve frontend static assets from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Global Fallback for index route if pages are served dynamically (optional)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`🚀 Unified Portfolio Server Live on port ${PORT}`);
  console.log(`🌐 Website: http://localhost:${PORT}`);
  console.log(`✍️  Edit Mode: http://localhost:${PORT}/?edit=true`);
  console.log(`==================================================`);
});
