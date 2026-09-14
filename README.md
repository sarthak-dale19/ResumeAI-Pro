# ⚡ ResumeAI Pro — Hackathon Edition

> AI-powered resume builder with Firebase real-time database, 6 AI tools, ATS scoring, and professional PDF export.

---

## 🏆 Hackathon-Winning Features

| Feature | Technology | Why Judges Love It |
|---|---|---|
| 🔥 Firebase Realtime DB | Firebase | Global live counters — judges see real users |
| 🎯 Job Description Matcher | Claude AI | Unique — matches resume to any JD instantly |
| ✉️ Cover Letter Generator | Claude AI | End-to-end job search tool |
| 💬 Interview Prep | Claude AI | Generates questions from YOUR resume |
| 🔥 Resume Roast | Claude AI | Brutally honest feedback |
| 💼 LinkedIn Optimizer | Claude AI | Complete job search toolkit |
| 📊 ATS Score Breakdown | Custom Algorithm | 8-point real-time scoring |
| 💾 Save/Load Resume | localStorage | Data persists across sessions |

---

## 🚀 Quick Start (2 Minutes)

```bash
# 1. Clone
git clone https://github.com/YOUR_USERNAME/resumeai-pro-hackathon

# 2. Open in browser
open index.html   # macOS
# OR just double-click index.html
```

**That's it!** The resume builder, ATS scoring, and PDF export work immediately.

---

## 🔥 Firebase Setup (10 Minutes — For Live Counters)

This gives you **REAL global visitor tracking** visible to everyone worldwide.

### Step 1: Create Firebase Project
1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click **Add Project** → Name it `resumeai-pro` → Continue
3. Disable Google Analytics (not needed) → Create Project

### Step 2: Setup Realtime Database
1. Left sidebar → **Realtime Database** → **Create Database**
2. Choose location (us-central1 is fine) → **Start in test mode**
3. Click **Enable**

### Step 3: Get Config
1. Project Settings (gear icon) → **General**
2. Scroll to **Your apps** → Click `</>` (Web)
3. Register app name → Copy the `firebaseConfig` object

### Step 4: Replace in index.html
Find this section in `index.html`:
```javascript
const firebaseConfig = {
  apiKey: "REPLACE_WITH_YOUR_API_KEY",
  authDomain: "REPLACE.firebaseapp.com",
  databaseURL: "https://REPLACE-default-rtdb.firebaseio.com",
  ...
};
```
Replace with YOUR config from Firebase console.

### Step 5: Set Database Rules (Make it public for hackathon)
In Firebase Console → Realtime Database → **Rules**:
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```
Click **Publish**.

✅ Done! Now every visitor from anywhere in the world increments the counter in real-time.

---

## 🤖 Claude AI Setup (For AI Features)

### Option 1: Quick Hackathon Setup (Backend Proxy)

Create `server.js`:
```javascript
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.static('.'));
app.use(express.json());

app.post('/api/ai', async (req, res) => {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify(req.body)
  });
  const data = await response.json();
  res.json(data);
});

app.listen(3000, () => console.log('🚀 Server at http://localhost:3000'));
```

In `index.html`, change the fetch URL:
```javascript
// From:
"https://api.anthropic.com/v1/messages"
// To:
"/api/ai"
```

Run it:
```bash
npm install express node-fetch cors
export ANTHROPIC_API_KEY=sk-ant-your-key-here
node server.js
```

### Option 2: Get API Key
1. Visit [console.anthropic.com](https://console.anthropic.com)
2. Sign up → API Keys → Create Key → Copy

---

## 📁 Project Structure

```
resumeai-pro-hackathon/
└── index.html    ← Everything in one file (HTML + CSS + JS)
└── README.md     ← This file
└── server.js     ← (Optional) Backend for AI features
```

---

## 🎯 6 AI Features Explained

### 1. ✍ AI Summary Writer
Generates a professional, ATS-optimized summary based on role, experience, and skills.

### 2. 🎯 Job Description Matcher
- Paste any job description
- Get a **match score (0-100%)**
- See **matching keywords** (green)
- See **missing keywords** (red)
- Get **top 3 specific improvements**

### 3. ✉ Cover Letter Generator
Writes a personalized cover letter using:
- Your resume data
- Target company and role
- Custom notes you provide

### 4. 💬 Interview Prep
Generates realistic interview questions based on:
- Your actual resume experience
- Target role and difficulty level
- Interview type (Technical / HR / System Design)

### 5. 🔥 Resume Roast
Brutally honest feedback including:
- Main weaknesses
- ATS red flags
- Quick wins to fix TODAY

### 6. 💼 LinkedIn Optimizer
Generates:
- Optimized LinkedIn headline (120 chars)
- Complete About section (keyword-rich)
- Featured skills recommendations

### 7. Live Interview prep
Take Live Interview with AI boot :
- your actual interview taken
- test your confidance, eye contact, body language
- give feedback after interview and show which keyword are use in answer 

---

## 🏗️ Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Database**: Firebase Realtime Database
- **AI**: Anthropic Claude Sonnet API
- **Fonts**: Clash Display + Cabinet Grotesk
- **Icons**: Font Awesome 6
- **Export**: Browser Print API (PDF)
- **Storage**: localStorage (save/load)

---

## 📊 ATS Scoring System

8-category algorithm:

| Category | What it checks |
|---|---|
| Contact Info | Email + Phone + Location |
| Summary | 50+ character professional summary |
| Work Experience | Entries with detailed descriptions |
| Education | At least one entry |
| Tech Skills | Multiple skill categories |
| Keywords/Metrics | Numbers in experience bullets |
| Achievements | Achievement entries |
| Certifications | Certificate entries |

---

## 🚀 Deploy for Hackathon Demo

### Netlify (Fastest — 30 seconds)
```
1. Go to netlify.com/drop
2. Drag your folder in
3. Get instant URL to share with judges
```

### GitHub Pages (Free)
```bash
git init && git add . && git commit -m "ResumeAI Pro"
git remote add origin https://github.com/YOU/resumeai-pro.git
git push -u origin main
# Enable Pages in repo Settings
```

---

## 🎤 Hackathon Pitch Points

When presenting to judges, highlight:

1. **Real problem**: 75% of resumes are rejected by ATS before human review
2. **Unique solution**: Not just a builder — a complete job search toolkit
3. **Live demo**: Fill form → watch live preview → AI job match → download PDF
4. **Real data**: Show Firebase counter with actual live visitors
5. **Scale**: Zero backend needed — runs purely in browser + Firebase

---

## ⭐ Star this repo if it helps you win!
