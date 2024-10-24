import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import multer from 'multer';

dotenv.config();

const app = express();
const { Pool } = pg;
const upload = multer();

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Auth middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Routes
app.post('/api/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const result = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email',
      [email, hashedPassword]
    );
    
    const token = jwt.sign({ id: result.rows[0].id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Error creating user' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const valid = await bcrypt.compare(password, result.rows[0].password);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: result.rows[0].id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Error logging in' });
  }
});

app.post('/api/endpoints', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'INSERT INTO endpoints (user_id, endpoint_key) VALUES ($1, $2) RETURNING *',
      [req.user.id, Math.random().toString(36).substr(2, 9)]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Endpoint generation error:', err);
    res.status(500).json({ error: 'Error generating endpoint' });
  }
});

app.post('/api/submit/:endpoint', upload.none(), async (req, res) => {
  try {
    const { endpoint } = req.params;
    let formData = {};

    // Handle form data
    if (req.body) {
      formData = { ...req.body };
    }

    console.log('Received submission:', {
      endpoint,
      formData
    });

    const endpointResult = await pool.query(
      'SELECT user_id FROM endpoints WHERE endpoint_key = $1',
      [endpoint]
    );

    if (endpointResult.rows.length === 0) {
      console.error('Endpoint not found:', endpoint);
      return res.status(404).json({ error: 'Endpoint not found' });
    }

    const userId = endpointResult.rows[0].user_id;

    const submissionResult = await pool.query(
      'INSERT INTO submissions (user_id, endpoint_key, form_data) VALUES ($1, $2, $3) RETURNING *',
      [userId, endpoint, formData]
    );

    const userResult = await pool.query(
      'SELECT email FROM users WHERE id = $1',
      [userId]
    );

    if (process.env.SMTP_HOST) {
      try {
        await transporter.sendMail({
          from: process.env.SMTP_FROM,
          to: userResult.rows[0].email,
          subject: 'New Form Submission',
          text: `You have received a new form submission:\n\n${JSON.stringify(formData, null, 2)}`,
        });
      } catch (emailErr) {
        console.error('Email notification error:', emailErr);
      }
    }

    res.json({ 
      message: 'Submission received',
      submission: submissionResult.rows[0]
    });
  } catch (err) {
    console.error('Submission error:', err);
    res.status(500).json({ error: 'Error processing submission' });
  }
});

app.get('/api/submissions', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM submissions WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Fetch submissions error:', err);
    res.status(500).json({ error: 'Error fetching submissions' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});