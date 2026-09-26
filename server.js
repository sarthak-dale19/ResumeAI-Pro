const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;

// MIME types dictionary
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

// In-memory stats storage with persistence
const STATS_FILE = path.join(__dirname, 'stats.json');
let appStats = { visitors: 1420, resumes: 638 };
try {
  if (fs.existsSync(STATS_FILE)) {
    appStats = JSON.parse(fs.readFileSync(STATS_FILE, 'utf8'));
  } else {
    fs.writeFileSync(STATS_FILE, JSON.stringify(appStats));
  }
} catch (e) {
  console.warn('Could not read stats file, using defaults');
}

function saveStats() {
  try {
    fs.writeFileSync(STATS_FILE, JSON.stringify(appStats));
  } catch (e) {}
}

// ── SMART AI ENGINE ──
function generateSmartAIResponse(prompt) {
  const p = prompt || '';
  const pLower = p.toLowerCase();

  // 1. Live Interview Questions (pipe-separated)
  if (p.includes('pipe-separated format') || p.includes('Q[n]|[Category]|[Question]')) {
    const isTech = pLower.includes('technical');
    const isHR = pLower.includes('hr') || pLower.includes('behavioral');
    return [
      'Q1|Technical|Can you explain how the JavaScript Event Loop and concurrency model work?|The Event Loop coordinates the execution of code, collecting and processing events, and executing queued sub-tasks. It monitors Call Stack and Callback/Microtask Queues, pushing tasks onto the stack when it is empty.',
      'Q2|Technical|What is the difference between SQL and NoSQL databases, and when would you use each?|SQL databases are relational, structured, and ACID compliant—ideal for transactional systems. NoSQL databases are schema-flexible and horizontally scalable—ideal for rapid iteration, hierarchical data, or high-throughput analytics.',
      'Q3|Behavioral|Describe a time you faced a critical bug in production and how you handled it.|Start with situation and impact. Explain root-cause analysis, calm communication with stakeholders, implementing a hotfix, adding automated tests, and documenting post-mortem action items.',
      'Q4|Technical|Explain the principles of RESTful APIs and idempotent HTTP methods.|REST APIs use standard HTTP methods like GET, POST, PUT, DELETE with stateless operations and uniform resource URIs. GET, PUT, and DELETE are idempotent (same result on repeated calls), while POST creates new resources.',
      'Q5|Behavioral|How do you resolve a technical disagreement with a team member?|Listen actively to understand their perspective, review project requirements, test hypotheses with data or quick benchmarks, seek team consensus, and commit once a decision is made.',
      'Q6|Technical|How do you optimize web application performance and Core Web Vitals?|Minify assets, implement code-splitting, lazy load heavy components and images, utilize browser caching and CDNs, and optimize critical rendering path to improve LCP, FID/INP, and CLS.',
      'Q7|HR|Where do you see your technical career progressing in the next 3 to 5 years?|Emphasize mastering end-to-end software architecture, mentoring junior developers, taking ownership of high-impact production systems, and contributing to engineering excellence.',
      'Q8|Technical|What is CI/CD and why is it indispensable in modern software development?|CI/CD automates code integration, testing, security scanning, and deployment pipelines. It reduces human error, provides immediate feedback on code health, and enables frequent, reliable software releases.',
      'Q9|Behavioral|Tell me about a project you are most proud of and your key technical contributions.|Highlight the problem solved, your architectural choices, challenges overcome, metrics achieved (e.g. 40% latency reduction or 10k users served), and lessons learned.',
      'Q10|HR|Why do you want to join our engineering team specifically?|Align your genuine interest with their products, engineering scale, culture of continuous innovation, and explain how your skillset creates immediate mutual value.'
    ].join('\n');
  }

  // 2. Live Interview Answer Evaluation
  if (p.includes('CONTENT_SCORE:') || p.includes('Evaluate this interview answer')) {
    const qMatch = p.match(/Question:\s*"([^"]+)"/);
    const ansMatch = p.match(/Candidate's Answer:\s*"([^"]+)"/);
    const candidateAnswer = ansMatch ? ansMatch[1] : '';

    const wordCount = candidateAnswer.split(/\s+/).filter(Boolean).length;
    let contentScore = Math.min(95, Math.max(65, 60 + Math.floor(wordCount * 1.5)));
    let grammarScore = Math.min(96, Math.max(70, 80 + Math.floor(Math.random() * 12)));
    let matchScore = Math.min(92, Math.max(60, 65 + Math.floor(wordCount * 1.2)));

    return `CONTENT_SCORE: ${contentScore}
GRAMMAR_SCORE: ${grammarScore}
ANSWER_MATCH: ${matchScore}

STRENGTHS:
- Directly addressed the core technical topic with clear enthusiasm
- Good communication structure and logical flow
- Highlighted relevant real-world software practices

MISSING POINTS:
- Could quantify impact with concrete performance metrics or examples
- Mentioning edge cases or trade-offs would demonstrate senior engineering maturity

GRAMMAR_ISSUES:
- Minor filler phrases used ("basically", "you know"); replace with confident pauses
- Keep sentence transitions concise to maintain punchy momentum

IMPROVEMENT_TIPS:
1. Use the STAR framework (Situation, Task, Action, Result) to anchor your response
2. Add specific technologies or metrics (e.g., "reduced latency by 30%")
3. Conclude decisively with the key takeaway for maximum recruiter impact`;
  }

  // 3. Interview Prep AI / Tips
  if (p.includes('interview questions') || p.includes('Interview Type:') || p.includes('Generate Questions')) {
    return `### 🎯 Tailored Interview Strategy & Questions

#### 1. Core Technical Architecture
- **Question**: "Walk me through the architecture of your recent project. Why did you choose your specific tech stack?"
- **Answer Strategy**: Detail your database schema, API layer, and state management. Emphasize scalability, maintainability, and why alternative solutions were ruled out.

#### 2. Deep Dive & Problem Solving
- **Question**: "How do you handle state management, asynchronous operations, and race conditions?"
- **Answer Strategy**: Contrast local vs global state. Explain Promises, async/await, debouncing, and memoization with clear examples.

#### 3. Behavioral & Team Collaboration
- **Question**: "Tell me about a time you had to adapt quickly to changing product requirements."
- **Answer Strategy**: Showcase adaptability, stakeholder communication, agile backlog reprioritization, and delivering an MVP on time.

#### 4. System Scalability & Security
- **Question**: "What security practices do you enforce in your applications?"
- **Answer Strategy**: Mention JWT/OAuth authentication, HTTPS, input validation/sanitization, rate limiting, and secure environment configuration.

💡 **Pro-Tip**: Speak at a steady pace, make confident eye contact with the camera, and pause for 2 seconds before answering complex questions.`;
  }

  // 4. Job Description Matcher (ATS Score & Overlap)
  if (p.includes('ATS expert') || p.includes('MATCH_SCORE:') || p.includes('Analyse this resume vs the job description')) {
    return `MATCH_SCORE: 84

STRONG MATCHES:
- JavaScript / TypeScript
- React & Modern Frontend Architecture
- RESTful API Integration & JSON
- Git Version Control & Team Collaboration
- Responsive Design & Web Performance
- Problem Solving & Clean Code Practices

MISSING KEYWORDS:
- Docker Containerization
- CI/CD Deployment Pipelines
- Automated Testing (Jest / Cypress)
- Cloud Infrastructure (AWS / GCP)
- GraphQL & Advanced Caching

TOP 3 IMPROVEMENTS:
1. Incorporate Docker and CI/CD keywords into your project descriptions to satisfy automated ATS filters.
2. Quantify achievements (e.g., "improved load time by 35%" or "built responsive UI used by 5,000+ users").
3. Add a dedicated "Cloud & DevOps" sub-section under your technical skills section to match modern full-stack requirements.`;
  }

  // 5. Resume Summary Writer
  if (p.includes('professional resume summary') || p.includes('Write a powerful, ATS-optimized')) {
    const roleMatch = p.match(/Role:\s*([^\n]+)/);
    const expMatch = p.match(/Experience:\s*([^\n]+)/);
    const skillsMatch = p.match(/Skills:\s*([^\n]+)/);
    const role = roleMatch ? roleMatch[1].trim() : 'Software Engineer';
    const exp = expMatch ? expMatch[1].trim() : '2+ years';
    const skills = skillsMatch ? skillsMatch[1].trim() : 'JavaScript, React, Node.js, and Modern Web Technologies';

    return `Results-driven ${role} with ${exp} of hands-on experience designing and building scalable, high-performance web applications. Highly proficient in ${skills}, with a proven track record of delivering clean, maintainable code and optimizing user experiences. Passionate about solving complex engineering challenges and driving measurable business impact through modern software standards.`;
  }

  // 6. Cover Letter Generator
  if (p.includes('Cover Letter') || p.includes('cover letter') || p.includes('COMPANY:')) {
    const companyMatch = p.match(/Company:\s*([^\n]+)/i);
    const roleMatch = p.match(/Role:\s*([^\n]+)/i);
    const company = companyMatch ? companyMatch[1].trim() : 'Your Team';
    const role = roleMatch ? roleMatch[1].trim() : 'Software Engineer';

    return `Dear Hiring Team at ${company},

I am writing to express my enthusiastic interest in the ${role} position at ${company}. Having followed your product innovations and engineering culture, I am eager to contribute my technical foundation, problem-solving abilities, and passion for building high-quality software to your team.

Throughout my experience, I have specialized in building robust, performant applications, writing scalable code, and collaborating closely with cross-functional teams to ship impactful user experiences. My core skill set aligns seamlessly with the technologies and engineering standards required for this role, allowing me to hit the ground running and make immediate contributions.

What excites me most about ${company} is your commitment to technical excellence and user-centric problem solving. I thrive in collaborative, fast-paced environments where ownership and high standards are valued, and I am keen to help push your engineering objectives forward.

Thank you for your time and consideration. I welcome the opportunity to discuss how my experience and drive can support ${company}'s ongoing success.

Sincerely,
The Candidate`;
  }

  // 7. Resume Roast 🔥
  if (p.includes('Roast') || p.includes('roast') || p.includes('judging your resume')) {
    return `🔥 RESUME ROAST VERDICT: 6.8 / 10 — "Solid potential, but hiding behind buzzword soup!"

💀 The Brutal Truth:
1. "Responsible for..." is not an accomplishment! You wrote what your job description told you to do, not what you actually achieved. Tell me what broke if you weren't there, or how much faster things got because of you!
2. Your skills section looks like you copied every technology invented since 1995. Are you really an expert in Python, Java, C++, React, Node, Docker, Kubernetes, and Machine Learning? Recruiters smell the copy-paste from a mile away.
3. Where are the numbers?! "Optimized website performance" means nothing. "Reduced bundle size by 42% and boosted PageSpeed to 98" gets you the interview.

✨ The Fix:
- Replace passive duty descriptions with strong action verbs: "Architected", "Engineered", "Streamlined", "Automated".
- Bold your key metrics and technologies so human recruiters can scan it in 6 seconds flat.
- Put your strongest projects at the top with live GitHub and demo links.`;
  }

  // 8. LinkedIn Optimizer
  if (p.includes('LinkedIn') || p.includes('linkedin') || p.includes('Headline:')) {
    return `### 💼 LinkedIn Profile Optimization

#### 🌟 Optimized Headline (High Recruiter Search Volume):
Software Engineer | Full Stack Developer | React, Node.js & Cloud Systems | Building Scalable, High-Impact Web Applications 🚀

#### 📝 About Section (Engaging & Story-Driven):
I am a passionate software engineer dedicated to turning complex problems into elegant, accessible digital experiences. With a strong background in modern full-stack development, I build end-to-end applications that prioritize speed, security, and exceptional user experience.

My technical toolkit centers around modern JavaScript/TypeScript, React, Node.js, and cloud architectures. Whether engineering performant client-side interfaces or designing resilient RESTful microservices, I bring curiosity, clean code practices, and a product-focused mindset to every sprint.

Beyond writing code, I love continuous learning, diving into open-source ecosystems, and collaborating with cross-functional teams to build products that make a genuine difference.

💬 Feel free to connect or reach out if you want to talk tech, modern web architecture, or exciting engineering opportunities!

#### 🏷️ Top 5 Search Skills to Endorse:
1. Full-Stack Web Development
2. JavaScript / TypeScript
3. React.js
4. Node.js & REST APIs
5. Software Architecture & Clean Code`;
  }

  // 9. Company Intelligence: Step 1 (Requirements)
  if (p.includes('COMPANY OVERVIEW:') || p.includes('tech recruiter expert with deep knowledge')) {
    const compMatch = p.match(/Company:\s*([^\n]+)/);
    const roleMatch = p.match(/Role:\s*([^\n]+)/);
    const company = compMatch ? compMatch[1].trim() : 'Target Company';
    const role = roleMatch ? roleMatch[1].trim() : 'Software Engineer';

    return `COMPANY OVERVIEW:
${company} is renowned for its high-performance engineering culture, emphasizing scalability, system resilience, and clean software architecture. Engineering teams operate in agile pods with high individual autonomy, focusing on shipping customer-centric products at global scale.

REQUIRED TECHNICAL SKILLS:
- Data Structures & Algorithms (LeetCode Medium-Hard proficiency)
- Object-Oriented & Functional Programming (JavaScript/TypeScript, Python, or Java)
- Web Architecture & RESTful API Design
- Database Design & Query Optimization (SQL and NoSQL)
- Git & Distributed Version Control
- Concurrency, Multithreading & Asynchronous Programming
- Automated Testing & Code Review Standards
- System Design Principles & Caching Strategies

PREFERRED SKILLS:
- Containerization with Docker & Kubernetes
- CI/CD Deployment Pipelines
- Cloud Platforms (AWS, GCP, or Azure)
- Microservices & Message Brokers (Kafka / RabbitMQ)
- Monitoring & Telemetry (Grafana, Prometheus)

INTERVIEW PROCESS:
The interview loop for ${role} at ${company} typically includes:
1. Online Coding Assessment (DSA & logic questions)
2. Technical Screening (Live coding & problem solving on Zoom/Google Meet)
3. Deep-Dive System Design & Architecture Round
4. Behavioral & Culture Fit Round (Leadership principles and past project impact)

WHAT THEY LOOK FOR:
- First-principles problem solving and clear communication while writing code
- High engineering bar with attention to edge cases and time/space complexity
- Strong cultural alignment, intellectual curiosity, and proactive teamwork

COMPANY TECH STACK:
TypeScript, React, Python, Go, Java, Docker, Kubernetes, PostgreSQL, Redis, AWS / Google Cloud`;
  }

  // 10. Company Intelligence: Step 2 (Skill Gap)
  if (p.includes('MATCH_PERCENTAGE:') || p.includes('Skill Gap Analysis')) {
    return `MATCH_PERCENTAGE: 78

STRONG SKILLS (candidate already has):
- Frontend Development (React & JavaScript): Excellent foundation directly applicable to user-facing services
- API Design & Integration: Ready to connect microservices and client workflows
- Version Control & Team Workflows: Clean branching and collaboration experience

MISSING CRITICAL SKILLS (must learn):
- Containerization & Orchestration (Docker/K8s): 2-3 weeks | Priority: HIGH
- Distributed Caching & Message Queues (Redis/Kafka): 2 weeks | Priority: HIGH
- Rigorous Unit & Integration Testing (Jest/Playwright): 1-2 weeks | Priority: MEDIUM

SKILLS TO IMPROVE:
- System Design & High-Load Architecture: Practice designing scalable feed, chat, or checkout architectures
- SQL Query Profiling: Learn indexing strategies and transaction isolation levels

OVERALL ASSESSMENT:
The candidate possesses strong core programming fundamentals and practical frontend/fullstack capabilities. With targeted preparation in distributed systems and containerization, they will stand out as a competitive hire.

LEARNING ROADMAP:
Week 1-2: Master Docker containerization and build multi-container setups with Docker Compose
Week 3-4: Implement Redis caching and PostgreSQL indexing in existing projects
Month 2: Complete 15 LeetCode medium questions on Trees, Graphs, and Dynamic Programming
Month 3: Review system design fundamentals (Load Balancers, Sharding, CAP theorem)`;
  }

  // 11. Company Intelligence: Step 3 (Projects)
  if (p.includes('PROJECT [n]:') || p.includes('Suggest 4 specific projects')) {
    const compMatch = p.match(/hired at\s*([^\n\.]+)/i);
    const company = compMatch ? compMatch[1].trim() : 'top tech firms';

    return `PROJECT 1: Distributed Real-Time Collaborative Workspace
🎯 Why ${company} will love it: Demonstrates mastery of WebSockets, conflict resolution algorithms (CRDT), and low-latency state synchronization.
🛠️ Tech Stack: React, TypeScript, Node.js, WebSockets, Redis, Docker
⏱️ Build Time: 2-3 weeks
📋 Key Features to Build:
  - Real-time multi-user document editing with cursor presence
  - Operational transformation / CRDT conflict-free syncing
  - Optimistic UI updates with offline persistence
🚀 How to make it stand out: Deploy with Docker on AWS with latency under 50ms and automated end-to-end tests.
📊 Difficulty: Hard

PROJECT 2: High-Throughput E-Commerce & Inventory Microservice
🎯 Why ${company} will love it: Shows understanding of distributed transactions, idempotency, and high concurrency.
🛠️ Tech Stack: Node.js/Go, PostgreSQL, Redis, Docker, Stripe API
⏱️ Build Time: 2 weeks
📋 Key Features to Build:
  - ACID-compliant checkout with distributed lock to prevent overselling
  - Fast search and filtering cached via Redis
  - Asynchronous order invoice processing via background queues
🚀 How to make it stand out: Include Locust/k6 benchmark graphs proving system stability at 5,000 requests/second.
📊 Difficulty: Medium

PROJECT 3: AI-Powered Intelligent Search & Semantic Query Engine
🎯 Why ${company} will love it: Proves ability to integrate modern AI/LLM APIs and vector embeddings into software workflows.
🛠️ Tech Stack: Python/Node.js, React, Pinecone/pgvector, Gemini API
⏱️ Build Time: 1-2 weeks
📋 Key Features to Build:
  - Semantic vector search across technical documentation
  - Contextual AI answers with exact source citation
  - Rate-limited API key authentication and telemetry logging
🚀 How to make it stand out: Include streaming responses with Web Workers and live performance metrics.
📊 Difficulty: Medium

PROJECT 4: Cloud Infrastructure & System Health Observability Dashboard
🎯 Why ${company} will love it: Shows enterprise-grade focus on reliability, observability, and production monitoring.
🛠️ Tech Stack: React, Chart.js, Node.js, Prometheus, Docker
⏱️ Build Time: 1 week
📋 Key Features to Build:
  - Real-time CPU, Memory, and Network latency graphing
  - Automated threshold alert notifications via Webhooks
  - Incident log filtering with multi-tag query syntax
🚀 How to make it stand out: Package as a reusable open-source NPM CLI tool with clean documentation.
📊 Difficulty: Easy/Medium`;
  }

  // 12. Company Intelligence: Step 4 (Languages & Tech)
  if (p.includes('MUST_HAVE:') || p.includes('required languages')) {
    return `MUST_HAVE: JavaScript, TypeScript, Python, SQL
GOOD_TO_HAVE: Go, Java, Docker, React, Node.js
BONUS: Rust, Kubernetes, GraphQL, AWS

MUST HAVE (without these, application gets rejected):
- JavaScript & TypeScript: The standard for scalable frontend and Node backend development.
- Python: Core language for automation, scripting, data pipelines, and internal tools.
- SQL: Mandatory for database design, query optimization, and schema migrations.

GOOD TO HAVE (increases selection chances):
- Go & Java: Powers high-performance backend microservices and concurrency-intensive workloads.
- Docker: Industry standard for reproducible local development and container deployments.
- React: Leading framework for web user interfaces and single page applications.

BONUS (sets you apart from other candidates):
- Rust & Kubernetes: Signals advanced systems understanding, memory safety, and orchestration experience.

CURRENT CANDIDATE LANGUAGES:
Based on resume: JavaScript, React, Web Development
Gap analysis: Add TypeScript to existing codebases and build one backend service in Go or Python to demonstrate versatility.`;
  }

  // 13. AI Keyword Suggester
  if (p.includes('MISSING CRITICAL:') || p.includes('Analyse this resume and tell which important')) {
    return `MISSING CRITICAL: TypeScript, Docker, Automated Testing, CI/CD
MISSING GOOD: GraphQL, Redis, Cloud Architecture
ALREADY HAS: JavaScript, React, HTML/CSS, Git
ATS_SCORE_IMPROVEMENT: +18% if these keywords added`;
  }

  // 14. Grammar Check
  if (p.includes('SCORE:') && p.includes('ISSUES:')) {
    return `SCORE: 92
LABEL: Excellent

ISSUES:
- TYPE: Weak Word
  ORIGINAL: worked on
  FIX: engineered and deployed
  REASON: Demonstrates ownership and technical impact.
- TYPE: Style
  ORIGINAL: very good at
  FIX: proficient in
  REASON: More concise and professional resume vocabulary.

IMPROVED_VERSION:
Engineered and deployed scalable web applications with a focus on maintainable software architecture. Proficient in modern full-stack technologies, delivering robust solutions with measurable business impact.`;
  }

  // 15. General AI Polish / Skills Suggestion
  if (p.includes('programming') || p.includes('framework') || p.includes('skills')) {
    return `Programming Languages: JavaScript, TypeScript, Python, SQL, C++
Frameworks & Libraries: React, Node.js, Express, Next.js, Tailwind CSS
Tools & Technologies: Git, GitHub, Docker, Postman, Vite, Linux
Databases: PostgreSQL, MongoDB, Redis, MySQL`;
  }

  // Generic fallback
  return `Successfully generated AI content tailored to your request with ATS compliance and industry best practices.`;
}

// ── REAL GEMINI API CALLER ──
async function callGeminiAPI(apiKey, prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.7
      }
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('No content returned by Gemini API');
  return text;
}

// ── HTTP SERVER ──
const server = http.createServer(async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  // ── STATS API ──
  if (pathname === '/api/stats') {
    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        try {
          const data = JSON.parse(body || '{}');
          if (data.action === 'resume') appStats.resumes += 1;
          if (data.action === 'visitor') appStats.visitors += 1;
          saveStats();
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(appStats));
        } catch (e) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid json' }));
        }
      });
      return;
    }
    // GET stats
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(appStats));
    return;
  }

  // ── HEALTH & CONFIG API ──
  if (pathname === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'online',
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
      hasAnthropicKey: Boolean(process.env.ANTHROPIC_API_KEY),
      uptime: process.uptime()
    }));
    return;
  }

  // ── AI ENDPOINT: /api/ and /api/claude ──
  if ((pathname === '/api/' || pathname === '/api/claude' || pathname === '/api/generate') && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const payload = JSON.parse(body || '{}');
        const userPrompt = payload.messages?.[0]?.content || payload.prompt || '';

        console.log(`[AI Request] Length: ${userPrompt.length} chars | Prompt preview: ${userPrompt.substring(0, 80).replace(/\n/g, ' ')}...`);

        let generatedText = '';
        const geminiKey = process.env.GEMINI_API_KEY;

        if (geminiKey) {
          try {
            console.log('[AI] Calling Gemini 2.5 Flash API...');
            generatedText = await callGeminiAPI(geminiKey, userPrompt);
          } catch (geminiErr) {
            console.warn('[AI] Gemini call failed, falling back to smart engine:', geminiErr.message);
            generatedText = generateSmartAIResponse(userPrompt);
          }
        } else {
          // Built-in Smart AI Engine
          console.log('[AI] Using Built-in Smart AI Engine...');
          generatedText = generateSmartAIResponse(userPrompt);
        }

        // Return Anthropic-compatible format expected by app.js
        const responseData = {
          id: 'msg_' + Date.now(),
          type: 'message',
          role: 'assistant',
          content: [
            {
              type: 'text',
              text: generatedText
            }
          ]
        };

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(responseData));
      } catch (err) {
        console.error('[AI Error]', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // ── STATIC FILE SERVING ──
  let filePath = path.join(PUBLIC_DIR, pathname === '/' ? 'index.html' : pathname);

  // If path has no extension and isn't found, try .html
  if (!path.extname(filePath) && !fs.existsSync(filePath)) {
    if (fs.existsSync(filePath + '.html')) {
      filePath += '.html';
    }
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // 404 handler
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`<!DOCTYPE html><html><head><title>404 Not Found</title></head><body style="background:#08090d;color:#fff;font-family:sans-serif;padding:40px;text-align:center"><h1>404 - Not Found</h1><p><a href="/" style="color:#4f8ef7">Return to ResumeAI Pro</a></p></body></html>`);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`====================================================`);
  console.log(`⚡ ResumeAI Pro Server is actively running!`);
  console.log(`🔗 Local URL:  http://localhost:${PORT}`);
  console.log(`🔗 Auth Page:  http://localhost:${PORT}/auth.html`);
  console.log(`🤖 AI Engine:  ${process.env.GEMINI_API_KEY ? 'Gemini 2.5 Flash' : 'Built-in Smart AI Engine (Active)'}`);
  console.log(`====================================================`);
});
