/* ============================================
   SHARED RESUME BUILDER FUNCTIONS
   Used by ALL 3 templates
   ============================================ */

// ── FORMAT DATE ──
function formatDate(d) {
  if (!d) return '';
  const [y, m] = d.split('-');
  if (!y || !m) return d;
  const months = [
    'Jan','Feb','Mar','Apr',
    'May','Jun','Jul','Aug',
    'Sep','Oct','Nov','Dec'
  ];
  return months[parseInt(m)-1] + ' ' + y;
}

// ── FORMAT URL ──
function formatURL(url) {
  if (!url) return '#';
  if (url.startsWith('http')) return url;
  return 'https://' + url;
}

// ── CONTACT LINKS ──
// Used in ALL templates header
function buildContact(p) {
  return `
    <div class="r-contact">
      ${p.email ? `
        <a href="mailto:${p.email}"
          style="color:inherit;
          text-decoration:none;
          display:inline-flex;
          align-items:center;
          gap:4px;
          border-bottom:1px dotted
          currentColor">
          ✉ ${p.email}
        </a>` : ''}
      ${p.phone ? `
        <a href="tel:${p.phone}"
          style="color:inherit;
          text-decoration:none;
          display:inline-flex;
          align-items:center;
          gap:4px;
          border-bottom:1px dotted
          currentColor">
          📞 ${p.phone}
        </a>` : ''}
      ${p.location ? `
        <span>📍 ${p.location}</span>`
        : ''}
      ${p.linkedin ? `
        <a href="${formatURL(p.linkedin)}"
          target="_blank"
          style="color:inherit;
          text-decoration:none;
          display:inline-flex;
          align-items:center;
          gap:4px;
          border-bottom:1px dotted
          currentColor">
          🔗 ${p.linkedin}
        </a>` : ''}
      ${p.github ? `
        <a href="${formatURL(p.github)}"
          target="_blank"
          style="color:inherit;
          text-decoration:none;
          display:inline-flex;
          align-items:center;
          gap:4px;
          border-bottom:1px dotted
          currentColor">
          💻 ${p.github}
        </a>` : ''}
    </div>`;
}

// ── EXPERIENCE HTML ──
// Used in ALL templates
function buildExpSection(experience) {
  const html = experience.map(e =>
    !e.title && !e.company ? '' : `
    <div class="r-item">
      <div class="r-item-head">
        <span class="r-item-title">
          ${e.title || ''}
          ${e.company
            ? ' — ' + e.company : ''}
        </span>
        <span class="r-item-date">
          ${formatDate(e.start)}
          ${e.end
            ? ' – ' + formatDate(e.end)
            : e.start
            ? ' – Present' : ''}
        </span>
      </div>
      ${e.loc ? `
        <div class="r-item-sub">
          ${e.loc}
        </div>` : ''}
      ${e.desc ? `
        <div class="r-item-desc">
          <ul>
            ${e.desc.split('\n')
              .filter(Boolean)
              .map(l => `
                <li>${l.replace(
                  /^[•\-\*]\s*/,'')}
                </li>`)
              .join('')}
          </ul>
        </div>` : ''}
    </div>`
  ).join('');
  if (!html) return '';
  return `
    <div class="r-section">
      <div class="r-section-title">
        Work Experience
      </div>
      ${html}
    </div>`;
}

// ── EDUCATION HTML ──
// Used in ALL templates
function buildEduSection(education) {
  const html = education.map(e =>
    !e.degree && !e.school ? '' : `
    <div class="r-item">
      <div class="r-item-head">
        <span class="r-item-title">
          ${e.degree || ''}
        </span>
        <span class="r-item-date">
          ${e.start || ''}
          ${e.end ? ' – ' + e.end : ''}
        </span>
      </div>
      <div class="r-item-sub">
        ${e.school || ''}
        ${e.loc ? ' | ' + e.loc : ''}
      </div>
      ${e.grade ? `
        <div class="r-item-desc"
          style="font-size:.7rem;
          color:#888">
          ${e.grade}
        </div>` : ''}
      ${e.drivelink ? `
        <a href="${formatURL(e.drivelink)}"
          target="_blank"
          style="display:inline-flex;
          align-items:center;
          gap:5px;
          padding:3px 10px;
          margin-top:5px;
          background:rgba(66,133,244,.08);
          border:1px solid #4285f4;
          border-radius:4px;
          font-size:.68rem;
          font-weight:700;
          color:#4285f4;
          text-decoration:none;
          -webkit-print-color-adjust:exact;
          print-color-adjust:exact">
          📄 View Marksheet
        </a>` : ''}
    </div>`
  ).join('');
  if (!html) return '';
  return `
    <div class="r-section">
      <div class="r-section-title">
        Education
      </div>
      ${html}
    </div>`;
}

// ── PROJECT HTML ──
// Used in ALL templates
function buildProjSection(projects) {
  const html = projects.map(pr =>
    !pr.name ? '' : `
    <div class="r-item">
      <div class="r-item-head">
        <span class="r-item-title">
          ${pr.name}
        </span>
        <span class="r-item-date">
          ${pr.duration || ''}
        </span>
      </div>
      ${pr.tech ? `
        <div class="r-item-sub">
          Stack: ${pr.tech}
        </div>` : ''}
      ${pr.link ? `
        <a href="${formatURL(pr.link)}"
          target="_blank"
          style="color:#2563eb;
          font-size:.75rem;
          text-decoration:none;
          display:inline-flex;
          align-items:center;
          gap:4px;
          border-bottom:1px dotted
          #2563eb;
          margin-top:3px">
          🔗 ${pr.link}
        </a>` : ''}
      ${pr.desc ? `
        <div class="r-item-desc">
          ${pr.desc}
        </div>` : ''}
    </div>`
  ).join('');
  if (!html) return '';
  return `
    <div class="r-section">
      <div class="r-section-title">
        Projects
      </div>
      ${html}
    </div>`;
}

// ── CERTIFICATE HTML ──
// Used in ALL templates
function buildCertSection(certificates) {
  const html = certificates.map(c =>
    !c.name ? '' : `
    <div class="r-item">
      <div class="r-item-head">
        ${c.link ? `
          <a href="${formatURL(c.link)}"
            target="_blank"
            style="font-size:.84rem;
            font-weight:700;
            color:#2563eb;
            text-decoration:none;
            border-bottom:1px dotted
            #2563eb;
            display:inline-flex;
            align-items:center;
            gap:4px">
            🏆 ${c.name}
          </a>` : `
          <span class="r-item-title">
            🏆 ${c.name}
          </span>`}
        <span class="r-item-date">
          ${formatDate(c.date || '')}
        </span>
      </div>
      ${c.org ? `
        <div class="r-item-sub">
          ${c.org}
        </div>` : ''}
      ${c.id ? `
        <div class="r-item-desc"
          style="font-size:.7rem;
          color:#888">
          ID: ${c.id}
        </div>` : ''}
      ${c.link ? `
        <a href="${formatURL(c.link)}"
          target="_blank"
          style="display:inline-flex;
          align-items:center;
          gap:5px;
          padding:3px 10px;
          margin-top:5px;
          background:rgba(66,133,244,.08);
          border:1px solid #4285f4;
          border-radius:4px;
          font-size:.68rem;
          font-weight:700;
          color:#4285f4;
          text-decoration:none;
          -webkit-print-color-adjust:exact;
          print-color-adjust:exact">
          🔗 View Certificate
        </a>` : ''}
    </div>`
  ).join('');
  if (!html) return '';
  return `
    <div class="r-section">
      <div class="r-section-title">
        Certifications
      </div>
      ${html}
    </div>`;
}

// ── ACHIEVEMENT HTML ──
// Used in ALL templates
function buildAchSection(achievements) {
  const filtered =
    achievements.filter(Boolean);
  if (!filtered.length) return '';
  return `
    <div class="r-section">
      <div class="r-section-title">
        Achievements
      </div>
      ${filtered.map(a => `
        <div class="r-item">
          <div class="r-item-desc">
            ✦ ${a}
          </div>
        </div>`).join('')}
    </div>`;
}

// ── SKILLS TAGS ──
// Used in ALL templates
function buildSkillTags(str) {
  if (!str) return '';
  return str.split(',')
    .map(s => s.trim())
    .filter(Boolean)
    .map(s =>
      `<span class="skill-tag"
        style="display:inline-block;
        padding:2px 7px;
        border-radius:4px;
        font-size:.72rem;
        margin:2px">
        ${s}
      </span>`)
    .join('');
}
/* ============================================================
   ResumeAI Pro — app.js
   AI Resume Builder with ATS Scoring
   ============================================================ */

/* ---------- ANALYTICS (localStorage) ---------- */
function initAnalytics() {
  // Track visitors
  const visits = parseInt(localStorage.getItem('rai_visits') || '0') + 1;
  localStorage.setItem('rai_visits', visits);

  const resumes = parseInt(localStorage.getItem('rai_resumes') || '0');

  updateStatDisplays(visits, resumes);
  animateCounters();
}

function updateStatDisplays(visits, resumes) {
  ['nav-visitors','h-visitors'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = visits.toLocaleString();
  });
  ['nav-resumes','h-resumes'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = resumes.toLocaleString();
  });
}

function incrementResumeCount() {
  const n = parseInt(localStorage.getItem('rai_resumes') || '0') + 1;
  localStorage.setItem('rai_resumes', n);
  const visits = parseInt(localStorage.getItem('rai_visits') || '1');
  updateStatDisplays(visits, n);
  showToast('🎉 Resume created! You\'re one of ' + n + ' people to build with ResumeAI Pro!');
}

function animateCounters() {
  const visits = parseInt(localStorage.getItem('rai_visits') || '0');
  const resumes = parseInt(localStorage.getItem('rai_resumes') || '0');
  animateNum('h-visitors', visits);
  animateNum('h-resumes', resumes);
}

function animateNum(id, target) {
  const el = document.getElementById(id);
  if (!el) return;
  let current = 0;
  const step = Math.max(1, Math.floor(target / 40));
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current.toLocaleString();
    if (current >= target) clearInterval(timer);
  }, 30);
}

/* ---------- STEP NAVIGATION ---------- */
let currentStep = 1;
const totalSteps = 5;

function nextStep(n) {
  document.getElementById(`step-${currentStep}`)?.classList.remove('active');
  document.querySelectorAll('.ps').forEach((el, i) => {
    if (i < n - 1) el.classList.add('done');
    el.classList.toggle('active', i === n - 1);
  });
  currentStep = n;
  document.getElementById(`step-${currentStep}`)?.classList.add('active');
  document.getElementById('progressFill').style.width = `${(n / totalSteps) * 100}%`;
  updatePreview();
  document.getElementById('builder').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function scrollToBuilder() {
  document.getElementById('builder').scrollIntoView({ behavior: 'smooth' });
}

function showDemo() {
  showToast('💡 Fill in the form on the left and watch the live preview update!');
}

/* ---------- DYNAMIC ENTRIES ---------- */
let expCount = 0, eduCount = 0, achCount = 0, projCount = 0, certCount = 0;

function addExperience() {
  const id = ++expCount;
  const div = document.createElement('div');
  div.className = 'entry-card';
  div.id = `exp-${id}`;
  div.innerHTML = `
    <button class="remove-btn" onclick="removeEntry('exp-${id}')"><i class="fa fa-times"></i></button>
    <div class="form-grid">
      <div class="field"><label>Job Title</label>
        <input type="text" placeholder="e.g. Software Engineer" oninput="updatePreview()" data-exp="${id}" data-field="title"/></div>
      <div class="field"><label>Company Name</label>
        <input type="text" placeholder="e.g. Google India" oninput="updatePreview()" data-exp="${id}" data-field="company"/></div>
      <div class="field"><label>Start Date</label>
        <input type="month" oninput="updatePreview()" data-exp="${id}" data-field="start"/></div>
      <div class="field"><label>End Date</label>
        <input type="month" placeholder="Present" oninput="updatePreview()" data-exp="${id}" data-field="end"/></div>
      <div class="field full"><label>Location</label>
        <input type="text" placeholder="Mumbai, India / Remote" oninput="updatePreview()" data-exp="${id}" data-field="loc"/></div>
      <div class="field full"><label>Key Responsibilities & Achievements</label>
        <textarea rows="4" placeholder="• Built X that resulted in Y% improvement&#10;• Led team of N engineers to deliver Z&#10;• Reduced latency by X% using Y technology" oninput="updatePreview()" data-exp="${id}" data-field="desc"></textarea>
        <button class="ai-btn" onclick="aiGenerateExp(${id})"><i class="fa fa-robot"></i> AI Write Bullet Points</button>
      </div>
    </div>`;
  document.getElementById('exp-list').appendChild(div);
}

function addEducation() {
  const id = ++eduCount;
  const div = document.createElement('div');
  div.className = 'entry-card';
  div.id = `edu-${id}`;
  div.innerHTML = `
    <button class="remove-btn" onclick="removeEntry('edu-${id}')"><i class="fa fa-times"></i></button>
    <div class="form-grid">
      <div class="field full"><label>Degree / Course</label>
        <input type="text" placeholder="e.g. B.Tech Computer Science" oninput="updatePreview()" data-edu="${id}" data-field="degree"/></div>
      <div class="field full"><label>Institution Name</label>
        <input type="text" placeholder="e.g. IIT Bombay" oninput="updatePreview()" data-edu="${id}" data-field="school"/></div>
      <div class="field"><label>Start Year</label>
        <input type="text" placeholder="2019" oninput="updatePreview()" data-edu="${id}" data-field="start"/></div>
      <div class="field"><label>End Year</label>
        <input type="text" placeholder="2023" oninput="updatePreview()" data-edu="${id}" data-field="end"/></div>
      <div class="field"><label>CGPA / Percentage</label>
        <input type="text" placeholder="9.2 CGPA / 85%" oninput="updatePreview()" data-edu="${id}" data-field="grade"/></div>
      <div class="field"><label>Location</label>
        <input type="text" placeholder="Mumbai, India" oninput="updatePreview()" data-edu="${id}" data-field="loc"/></div>
    </div>`;
  document.getElementById('edu-list').appendChild(div);
}

function addAchievement() {
  const id = ++achCount;
  const div = document.createElement('div');
  div.className = 'entry-card';
  div.id = `ach-${id}`;
  div.innerHTML = `
    <button class="remove-btn" onclick="removeEntry('ach-${id}')"><i class="fa fa-times"></i></button>
    <div class="field full">
      <label>Achievement</label>
      <input type="text" placeholder="e.g. Won 1st place at HackIndia 2024 among 2000+ participants" oninput="updatePreview()" data-ach="${id}" data-field="text"/>
    </div>`;
  document.getElementById('ach-list').appendChild(div);
}

function addProject() {
  const id = ++projCount;
  const div = document.createElement('div');
  div.className = 'entry-card';
  div.id = `proj-${id}`;
  div.innerHTML = `
    <button class="remove-btn" onclick="removeEntry('proj-${id}')"><i class="fa fa-times"></i></button>
    <div class="form-grid">
      <div class="field"><label>Project Name</label>
        <input type="text" placeholder="e.g. AI Resume Builder" oninput="updatePreview()" data-proj="${id}" data-field="name"/></div>
      <div class="field"><label>Tech Stack</label>
        <input type="text" placeholder="React, Node.js, MongoDB" oninput="updatePreview()" data-proj="${id}" data-field="tech"/></div>
      <div class="field full"><label>GitHub / Live Link</label>
        <input type="url" placeholder="github.com/you/project" oninput="updatePreview()" data-proj="${id}" data-field="link"/></div>
      <div class="field full"><label>Description</label>
        <textarea rows="3" placeholder="Describe what it does, impact, key features..." oninput="updatePreview()" data-proj="${id}" data-field="desc"></textarea>
      </div>
    </div>`;
  document.getElementById('proj-list').appendChild(div);
}


function addCertificate() {
  const id = ++certCount;
  const div = document.createElement('div');
  div.className = 'entry-card';
  div.id = `cert-${id}`;
  div.innerHTML = `
    <button class="remove-btn"
      onclick="removeEntry('cert-${id}')">
      <i class="fa fa-times"></i>
    </button>
    <div class="form-grid">

      <div class="field">
        <label>Certificate Name</label>
        <input type="text"
          placeholder="e.g. AWS Solutions Architect"
          oninput="updatePreview()"
          data-cert="${id}"
          data-field="name"/>
      </div>

      <div class="field">
        <label>Issuing Organization</label>
        <input type="text"
          placeholder="e.g. Amazon / Coursera / NPTEL"
          oninput="updatePreview()"
          data-cert="${id}"
          data-field="org"/>
      </div>

      <div class="field">
        <label>Date Issued</label>
        <input type="month"
          oninput="updatePreview()"
          data-cert="${id}"
          data-field="date"/>
      </div>

      <div class="field">
        <label>Credential ID</label>
        <input type="text"
          placeholder="e.g. ABC-123-XYZ"
          oninput="updatePreview()"
          data-cert="${id}"
          data-field="id"/>
      </div>

      <div class="field full">
        <label>
          <i class="fa fa-link"
            style="color:#4285f4">
          </i>
          Certificate Link
          (Drive / Coursera / LinkedIn)
        </label>
        <div style="position:relative">
          <input type="url"
            placeholder="https://drive.google.com/... or coursera.org/verify/..."
            oninput="updatePreview()"
            data-cert="${id}"
            data-field="link"/>
        </div>
        <div style="font-size:.72rem;
          color:var(--muted);
          margin-top:5px;
          padding:7px 10px;
          background:rgba(79,142,247,.06);
          border:1px solid rgba(79,142,247,.12);
          border-radius:7px;
          display:flex;
          align-items:flex-start;
          gap:5px">
          <i class="fa fa-info-circle"
            style="color:var(--blue);
            margin-top:2px">
          </i>
          Paste Google Drive link,
          Coursera certificate link,
          LinkedIn certificate link
          or any public URL
        </div>
      </div>

    </div>`;
  document.getElementById('cert-list')
    .appendChild(div);
}

function removeEntry(id) {
  document.getElementById(id)?.remove();
  updatePreview();
}

/* ---------- DATA COLLECTION ---------- */
function collectData() {
  // Personal
  const personal = {
    name:      val('fullName'),
    dob:       val('dob'),
    nationality: val('nationality'),
    email:     val('email'),
    phone:     val('phone'),
    linkedin:  val('linkedin'),
    github:    val('github'),
    location:  val('location'),
    title:     val('jobTitle'),
    summary:   val('summary'),
  };

  // Skills
  const skills = {
    langs:     val('prog-langs'),
    frameworks:val('frameworks'),
    tools:     val('tools'),
    databases: val('databases'),
    soft:    
