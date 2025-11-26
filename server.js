import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = 'mind-ease-secret-key-2024';

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Simple in-memory database
let users = [];
let assessments = [];
let moodEntries = [];

// Auth middleware
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'No token' });
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'MindEase API running' });
});

// Auth routes
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, password, university, studentId } = req.body;
    
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      id: users.length + 1,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      university,
      studentId,
      createdAt: new Date()
    };

    users.push(user);
    
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET);
    res.json({ 
      message: 'User created', 
      token,
      user: { id: user.id, firstName, lastName, email, university }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET);
    res.json({ 
      message: 'Login successful',
      token,
      user: { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, university: user.university }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Assessment routes
app.get('/api/assessment/questions', (req, res) => {
  const questions = [
    "Little interest or pleasure in doing things?",
    "Feeling down, depressed, or hopeless?",
    "Trouble falling or staying asleep, or sleeping too much?",
    "Feeling tired or having little energy?",
    "Poor appetite or overeating?",
    "Feeling bad about yourself - or that you are a failure?",
    "Trouble concentrating on things?",
    "Moving or speaking slowly? Or being fidgety?",
    "Thoughts that you would be better off dead?"
  ].map((text, index) => ({
    id: index + 1,
    text,
    options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
  }));

  res.json({ questions });
});

app.post('/api/assessment/submit', auth, (req, res) => {
  const { answers } = req.body;
  const totalScore = answers.reduce((sum, a) => sum + a.answer, 0);
  
  let severity, recommendations;
  if (totalScore <= 4) {
    severity = "Minimal";
    recommendations = ["Continue self-care", "Maintain social connections"];
  } else if (totalScore <= 9) {
    severity = "Mild"; 
    recommendations = ["Try relaxation exercises", "Connect with peers"];
  } else if (totalScore <= 14) {
    severity = "Moderate";
    recommendations = ["Consider counseling", "Join support groups"];
  } else if (totalScore <= 19) {
    severity = "Moderately Severe";
    recommendations = ["Seek professional help", "Use crisis resources"];
  } else {
    severity = "Severe";
    recommendations = ["Contact professional immediately", "Use emergency contacts"];
  }

  const assessment = {
    id: assessments.length + 1,
    userId: req.user.userId,
    answers,
    totalScore,
    severity,
    recommendations,
    createdAt: new Date()
  };

  assessments.push(assessment);
  res.json({ assessment });
});

// Mood tracking
app.post('/api/mood/track', auth, (req, res) => {
  const { mood, note } = req.body;
  const entry = {
    id: moodEntries.length + 1,
    userId: req.user.userId,
    mood,
    note,
    createdAt: new Date()
  };
  moodEntries.push(entry);
  res.json({ message: 'Mood tracked', entry });
});

app.get('/api/mood/history', auth, (req, res) => {
  const userEntries = moodEntries.filter(e => e.userId === req.user.userId);
  res.json({ entries: userEntries });
});

// Crisis resources
app.get('/api/crisis/resources', (req, res) => {
  const resources = [
    { name: "National Suicide Prevention Lifeline", phone: "1-800-273-8255" },
    { name: "Crisis Text Line", phone: "Text HOME to 741741" },
    { name: "Emergency Services", phone: "911" },
    { name: "University Counseling Center", phone: "(555) 123-4567" }
  ];
  res.json({ resources });
});

app.listen(PORT, () => {
  console.log(`🚀 MindEase server running on http://localhost:${PORT}`);
  console.log(`📚 Open your browser to: http://localhost:${PORT}`);
});
