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
    soft:      val('soft-skills'),
    languages: val('languages'),
  };

  // Experience
  const experience = [];
  document.querySelectorAll('[data-exp]').forEach(el => {
    const id = el.dataset.exp;
    if (!experience[id]) experience[id] = {};
    experience[id][el.dataset.field] = el.value;
  });

  // Education
  const education = [];
  document.querySelectorAll('[data-edu]').forEach(el => {
    const id = el.dataset.edu;
    if (!education[id]) education[id] = {};
    education[id][el.dataset.field] = el.value;
  });

  // Achievements
  const achievements = [];
  document.querySelectorAll('[data-ach]').forEach(el => {
    if (el.value) achievements.push(el.value);
  });

  // Projects
  const projects = [];
  document.querySelectorAll('[data-proj]').forEach(el => {
    const id = el.dataset.proj;
    if (!projects[id]) projects[id] = {};
    projects[id][el.dataset.field] = el.value;
  });

  // Certificates
  const certificates = [];
  document.querySelectorAll('[data-cert]').forEach(el => {
    const id = el.dataset.cert;
    if (!certificates[id]) certificates[id] = {};
    certificates[id][el.dataset.field] = el.value;
  });

  const hobbies = val('hobbies');

  return { personal, skills, experience: experience.filter(Boolean), education: education.filter(Boolean), achievements, projects: projects.filter(Boolean), certificates: certificates.filter(Boolean), hobbies };
}

function val(id) {
  return (document.getElementById(id)?.value || '').trim();
}

/* ---------- TEMPLATES ---------- */
let currentTemplate = 'pro';

function changeTemplate(t) {
  currentTemplate = t;
  document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(`tmpl-${t}`)?.classList.add('active');
  updatePreview();
}

function formatDate(d) {
  if (!d) return '';
  const [y, m] = d.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[parseInt(m)-1]} ${y}`;
}

function skillTags(str, cls) {
  if (!str) return '';
  return str.split(',').map(s => s.trim()).filter(Boolean)
    .map(s => `<span class="${cls}">${s}</span>`).join('');
}

function buildCleanTemplate(d) {
  const {
    personal: p, skills: sk,
    experience, education,
    achievements, projects,
    certificates, hobbies
  } = d;

  const allSkills = [
    sk.langs, sk.frameworks,
    sk.tools, sk.databases
  ].filter(Boolean).join(', ');

  return `
  <div class="tmpl-clean">
    <div class="r-header"
      style="display:flex;
      align-items:flex-start;
      justify-content:space-between;
      gap:16px">
      <div style="flex:1">
        <div class="r-name">
          ${p.name || 'Your Name'}
        </div>
        <div class="r-title">
          ${p.title || ''}
        </div>
        ${buildContact(p)}
      </div>
      ${_userPhoto ? `
        <img src="${_userPhoto}"
          style="width:80px;height:80px;
          border-radius:50%;
          object-fit:cover;
          border:3px solid #2563eb;
          flex-shrink:0"/>` : ''}
    </div>

    <div class="r-body">
      <div class="r-main">
        ${p.summary ? `
          <div class="r-summary">
            ${p.summary}
          </div>` : ''}
        ${buildExpSection(experience)}
        ${buildProjSection(projects)}
        ${buildAchSection(achievements)}
      </div>
      <div class="r-side">
        ${buildEduSection(education)}
        ${allSkills ? `
          <div class="r-section">
            <div class="r-section-title">
              Technical Skills
            </div>
            ${buildSkillTags(allSkills)}
          </div>` : ''}
        ${sk.soft ? `
          <div class="r-section">
            <div class="r-section-title">
              Soft Skills
            </div>
            ${buildSkillTags(sk.soft)}
          </div>` : ''}
        ${buildCertSection(certificates)}
        ${p.dob || p.nationality ? `
          <div class="r-section">
            <div class="r-section-title">
              Personal
            </div>
            ${p.dob ? `
              <div class="r-item-desc">
                DOB: ${p.dob}
              </div>` : ''}
            ${p.nationality ? `
              <div class="r-item-desc">
                Nationality: ${p.nationality}
              </div>` : ''}
          </div>` : ''}
        ${hobbies ? `
          <div class="r-section">
            <div class="r-section-title">
              Interests
            </div>
            <div class="r-item-desc">
              ${hobbies}
            </div>
          </div>` : ''}
      </div>
    </div>
  </div>`;
}

function buildModernTemplate(d) {
  const {
    personal: p, skills: sk,
    experience, education,
    achievements, projects,
    certificates, hobbies
  } = d;

  const allSkills = [
    sk.langs, sk.frameworks,
    sk.tools, sk.databases
  ].filter(Boolean).join(', ');

  return `
  <div class="tmpl-modern">
    <div class="r-header"
      style="display:flex;
      align-items:flex-start;
      justify-content:space-between;
      gap:16px">
      <div style="flex:1">
        <div class="r-name">
          ${p.name || 'Your Name'}
        </div>
        <div class="r-title">
          ${p.title || ''}
        </div>
        ${buildContact(p)}
      </div>
      ${_userPhoto ? `
        <img src="${_userPhoto}"
          style="width:80px;height:80px;
          border-radius:50%;
          object-fit:cover;
          border:3px solid #4f8ef7;
          flex-shrink:0"/>` : ''}
    </div>

    <div class="r-body">
      <div class="r-side">
        ${allSkills ? `
          <div class="r-section">
            <div class="r-section-title">
              Skills
            </div>
            ${buildSkillTags(allSkills)}
          </div>` : ''}
        ${sk.soft ? `
          <div class="r-section">
            <div class="r-section-title">
              Soft Skills
            </div>
            ${buildSkillTags(sk.soft)}
          </div>` : ''}
        ${buildEduSection(education)}
        ${buildCertSection(certificates)}
        ${p.dob ? `
          <div class="r-section">
            <div class="r-section-title">
              Personal
            </div>
            <div class="r-item-desc"
              style="font-size:.72rem">
              DOB: ${p.dob}
            </div>
          </div>` : ''}
        ${hobbies ? `
          <div class="r-section">
            <div class="r-section-title">
              Interests
            </div>
            <div class="r-item-desc">
              ${hobbies}
            </div>
          </div>` : ''}
      </div>
      <div class="r-main">
        ${p.summary ? `
          <div class="r-section">
            <div class="r-section-title">
              Profile
            </div>
            <div class="r-summary">
              ${p.summary}
            </div>
          </div>` : ''}
        ${buildExpSection(experience)}
        ${buildProjSection(projects)}
        ${buildAchSection(achievements)}
      </div>
    </div>
  </div>`;
}

function buildBoldTemplate(d) {
  const {
    personal: p, skills: sk,
    experience, education,
    achievements, projects,
    certificates, hobbies
  } = d;

  const allSkills = [
    sk.langs, sk.frameworks,
    sk.tools, sk.databases
  ].filter(Boolean).join(', ');

  return `
  <div class="tmpl-bold">
    <div class="r-header"
      style="display:flex;
      align-items:flex-start;
      justify-content:space-between;
      gap:16px">
      <div style="flex:1">
        <div class="r-name">
          ${p.name || 'YOUR NAME'}
        </div>
        <div class="r-title">
          ${p.title || ''}
        </div>
        ${buildContact(p)}
      </div>
      ${_userPhoto ? `
        <img src="${_userPhoto}"
          style="width:80px;height:80px;
          border-radius:50%;
          object-fit:cover;
          border:3px solid #f7c948;
          flex-shrink:0"/>` : ''}
    </div>

    <div class="r-body">
      ${p.summary ? `
        <div class="r-section">
          <div class="r-section-title">
            About Me
          </div>
          <div class="r-summary">
            ${p.summary}
          </div>
        </div>` : ''}
      ${buildExpSection(experience)}
      ${buildEduSection(education)}
      ${allSkills ? `
        <div class="r-section">
          <div class="r-section-title">
            Skills
          </div>
          ${buildSkillTags(allSkills)}
        </div>` : ''}
      ${buildProjSection(projects)}
      ${buildAchSection(achievements)}
      ${buildCertSection(certificates)}
      ${hobbies ? `
        <div class="r-section">
          <div class="r-section-title">
            Interests
          </div>
          <div class="r-summary">
            ${hobbies}
          </div>
        </div>` : ''}
    </div>
  </div>`;
}

/* ============================================================
   4th TEMPLATE — "Professional" (default template)
   Single-column ATS-friendly layout with icon section headings
   ============================================================ */

const TMPL_PRO_CSS = `
.tmpl-pro{font-size:14.5px;font-family:Arial,Helvetica,sans-serif;color:#1f2937;background:#fff;padding:20px 24px 14px;line-height:1.35}
.tmpl-pro a{color:inherit;text-decoration:none}
.tmpl-pro .pro-head{position:relative;text-align:center;padding:0 0 8px}
.tmpl-pro .pro-name{font-size:1.75em;font-weight:800;color:#0f1a55;letter-spacing:.01em;line-height:1.1;text-transform:uppercase}
.tmpl-pro .pro-title{font-size:.95em;font-weight:700;color:#2b3cc4;margin-top:3px}
.tmpl-pro .pro-contact{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:4px 8px;margin-top:9px;font-size:.6em;color:#222}
.tmpl-pro .pro-contact .pro-ci{display:inline-flex;align-items:center;gap:4px}
.tmpl-pro .pro-contact .pro-sep{color:#777}
.tmpl-pro .pro-photo{position:absolute;right:0;top:0;width:78px;height:78px;border-radius:50%;object-fit:cover;border:3px solid #1c2766}
.tmpl-pro .pro-sec-h{display:flex;align-items:center;gap:7px;border-bottom:2px solid #1c2766;padding-bottom:3px;margin:9px 0 4px}
.tmpl-pro .pro-ico{width:21px;height:21px;border-radius:50%;background:#1c2766;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.tmpl-pro .pro-ico svg{width:12px;height:12px;fill:#fff;display:block}
.tmpl-pro .pro-sec-t{font-size:.82em;font-weight:800;color:#1c2766;text-transform:uppercase;letter-spacing:.03em}
.tmpl-pro .pro-text{font-size:.68em;color:#222;line-height:1.42}
.tmpl-pro .pro-row{padding:3px 0;border-bottom:1px dotted #bbb;page-break-inside:avoid}
.tmpl-pro .pro-row:last-child{border-bottom:none}
.tmpl-pro .pro-edu{display:grid;grid-template-columns:1fr auto 26%;gap:8px;align-items:start}
.tmpl-pro .pro-edu .pro-year{font-size:.68em;color:#222;text-align:left;white-space:nowrap}
.tmpl-pro .pro-edu .pro-loc{font-size:.68em;color:#222;text-align:right}
.tmpl-pro .pro-b{font-size:.74em;font-weight:700;color:#111}
.tmpl-pro .pro-sub{font-size:.67em;color:#333}
.tmpl-pro .pro-grade{font-size:.67em;font-weight:700;color:#2f48c9}
.tmpl-pro .pro-link{display:inline-block;margin-top:2px;font-size:.62em;font-weight:700;color:#2f48c9!important;border-bottom:1px dotted #2f48c9}
.tmpl-pro .pro-skill{display:grid;grid-template-columns:30% 10px 1fr;gap:4px;font-size:.68em;padding:2px 0;border-bottom:1px dotted #bbb;page-break-inside:avoid}
.tmpl-pro .pro-skill:last-child{border-bottom:none}
.tmpl-pro .pro-skill .pro-sk-l{font-weight:700;color:#111}
.tmpl-pro .pro-cert{font-size:.67em}
.tmpl-pro .pro-cert ul{columns:2;column-gap:24px;margin:0 0 0 14px;padding:0}
.tmpl-pro .pro-cert li{list-style:disc;margin-bottom:3px;break-inside:avoid}
.tmpl-pro .pro-proj{padding:3px 0;border-bottom:1px dotted #bbb;page-break-inside:avoid}
.tmpl-pro .pro-proj:last-child{border-bottom:none}
.tmpl-pro .pro-proj-h{display:flex;justify-content:space-between;gap:10px;align-items:baseline}
.tmpl-pro .pro-proj-t{font-size:.78em;font-weight:700;color:#2f48c9}
.tmpl-pro .pro-date{font-size:.66em;color:#222;white-space:nowrap}
.tmpl-pro .pro-proj-d{font-size:.66em;color:#222;line-height:1.38;margin-top:0}
.tmpl-pro .pro-ul{margin:2px 0 0 14px;padding:0}
.tmpl-pro .pro-ul li{font-size:.66em;color:#222;line-height:1.5;margin-bottom:1px}
.tmpl-pro .pro-foot{page-break-inside:avoid;break-inside:avoid;display:grid;gap:0;border-top:2px solid #1c2766;margin-top:8px;padding-top:6px}
.tmpl-pro .pro-col{padding:0 10px;border-left:1px solid #c9ccd6}
.tmpl-pro .pro-col:first-child{border-left:none;padding-left:0}
.tmpl-pro .pro-col:last-child{padding-right:0}
.tmpl-pro .pro-col-h{display:flex;align-items:center;gap:6px;font-size:.72em;font-weight:800;color:#1c2766;text-transform:uppercase;margin-bottom:5px}
.tmpl-pro .pro-col-h svg{width:15px;height:15px;fill:#1c2766;flex-shrink:0}
.tmpl-pro .pro-col ul{margin:0 0 0 13px;padding:0}
.tmpl-pro .pro-col li{font-size:.64em;color:#222;line-height:1.4;margin-bottom:0}
.tmpl-pro .pro-decl{page-break-inside:avoid;border-top:2px solid #1c2766;margin-top:8px;padding-top:4px;font-size:.6em;color:#111}
.tmpl-pro .pro-decl b{font-weight:800}
.tmpl-pro .pro-personal{font-size:.62em;color:#333;margin-top:6px}
@media print{.tmpl-pro{padding:0}}
`;

// Inject the template CSS into the page once (for live preview)
(function () {
  if (document.getElementById('tmpl-pro-css')) return;
  const st = document.createElement('style');
  st.id = 'tmpl-pro-css';
  st.textContent = TMPL_PRO_CSS;
  document.head.appendChild(st);
})();

// Small icon set (Material-style paths, white/navy fill via CSS)
const PRO_ICONS = {
  user:   'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
  school: 'M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z',
  desktop:'M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z',
  award:  'M9.68 13.69L12 11.93l2.31 1.76-.88-2.85L15.75 9h-2.84L12 6.19 11.09 9H8.25l2.31 1.84-.88 2.85zM20 10c0-4.42-3.58-8-8-8s-8 3.58-8 8c0 2.03.76 3.87 2 5.28V23l6-2 6 2v-7.72c1.24-1.41 2-3.25 2-5.28zm-8-6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6z',
  folder: 'M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z',
  work:   'M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z',
  trophy: 'M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z',
  group:  'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
  code:   'M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z',
  globe:  'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z',
  heart:  'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
  mail:   'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
  phone:  'M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z',
  pin:    'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'
};

function proSvg(name, extra) {
  return '<svg viewBox="0 0 24 24" aria-hidden="true"' + (extra || '') + '><path d="' + (PRO_ICONS[name] || '') + '"/></svg>';
}
function proEsc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function proSection(icon, title, bodyHTML) {
  if (!bodyHTML) return '';
  return '<div class="pro-sec"><div class="pro-sec-h"><span class="pro-ico">' + proSvg(icon) +
    '</span><span class="pro-sec-t">' + title + '</span></div>' + bodyHTML + '</div>';
}
function proList(str) {
  return String(str || '').split(/[,\n]/).map(s => s.trim()).filter(Boolean);
}

function buildProTemplate(d) {
  const { personal: p, skills: sk, experience, education,
          achievements, projects, certificates, hobbies } = d;

  // ---- Contact row ----
  const ci = [];
  const GH = '<svg viewBox="0 0 16 16" width="11" height="11" fill="#1c2766" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>';
  const LI = '<svg viewBox="0 0 24 24" width="11" height="11" aria-hidden="true"><rect width="24" height="24" rx="4" fill="#1c2766"/><text x="12" y="17.5" text-anchor="middle" font-size="14" font-weight="700" fill="#fff" font-family="Arial">in</text></svg>';
  const mini = n => '<svg viewBox="0 0 24 24" width="11" height="11" fill="#1c2766" aria-hidden="true"><path d="' + PRO_ICONS[n] + '"/></svg>';

  if (p.email)    ci.push('<a class="pro-ci" href="mailto:' + proEsc(p.email) + '">' + mini('mail') + proEsc(p.email) + '</a>');
  if (p.phone)    ci.push('<a class="pro-ci" href="tel:' + proEsc(p.phone) + '">' + mini('phone') + proEsc(p.phone) + '</a>');
  if (p.github)   ci.push('<a class="pro-ci" href="' + proEsc(formatURL(p.github)) + '" target="_blank">' + GH + proEsc(p.github) + '</a>');
  if (p.linkedin) ci.push('<a class="pro-ci" href="' + proEsc(formatURL(p.linkedin)) + '" target="_blank">' + LI + proEsc(p.linkedin) + '</a>');
  if (p.location) ci.push('<span class="pro-ci">' + mini('pin') + proEsc(p.location) + '</span>');
  const contactHTML = ci.join('<span class="pro-sep">|</span>');

  const photo = (typeof _userPhoto !== 'undefined' && _userPhoto)
    ? '<img class="pro-photo" src="' + _userPhoto + '" alt="Profile Photo"/>' : '';

  // ---- Career objective ----
  const summaryHTML = p.summary ? '<div class="pro-text">' + proEsc(p.summary) + '</div>' : '';

  // ---- Work experience ----
  const expHTML = experience.map(e => {
    if (!e.title && !e.company) return '';
    const bullets = (e.desc || '').split('\n').map(l => l.replace(/^[•\-\*]\s*/, '').trim()).filter(Boolean);
    const dates = formatDate(e.start) + (e.end ? ' – ' + formatDate(e.end) : (e.start ? ' – Present' : ''));
    return '<div class="pro-row"><div class="pro-proj-h"><span class="pro-b">' + proEsc(e.title || '') +
      (e.company ? ' — ' + proEsc(e.company) : '') + '</span><span class="pro-date">' + dates + '</span></div>' +
      (e.loc ? '<div class="pro-sub">' + proEsc(e.loc) + '</div>' : '') +
      (bullets.length ? '<ul class="pro-ul">' + bullets.map(b => '<li>' + proEsc(b) + '</li>').join('') + '</ul>' : '') +
      '</div>';
  }).join('');

  // ---- Education ----
  const eduHTML = education.map(e => {
    if (!e.degree && !e.school) return '';
    const years = (e.start || '') + (e.end ? ' – ' + e.end : '');
    return '<div class="pro-row pro-edu"><div>' +
      '<div class="pro-b">' + proEsc(e.school || e.degree || '') + '</div>' +
      (e.school && e.degree ? '<div class="pro-sub">' + proEsc(e.degree) + '</div>' : '') +
      (e.grade ? '<div class="pro-grade">' + proEsc(e.grade) + '</div>' : '') +
      (e.drivelink ? '<a class="pro-link" href="' + proEsc(formatURL(e.drivelink)) + '" target="_blank">📄 View Marksheet</a>' : '') +
      '</div><div class="pro-year">' + proEsc(years) + '</div><div class="pro-loc">' + proEsc(e.loc || '') + '</div></div>';
  }).join('');

  // ---- Technical skills (label : value rows) ----
  const skillRows = [
    ['Programming Languages', sk.langs],
    ['Frameworks &amp; Libraries', sk.frameworks],
    ['Database', sk.databases],
    ['Tools &amp; Technologies', sk.tools]
  ].filter(r => r[1] && r[1].trim()).map(r =>
    '<div class="pro-skill"><span class="pro-sk-l">' + r[0] + '</span><span>:</span><span>' + proEsc(r[1]) + '</span></div>'
  ).join('');

  // ---- Certifications (2-column bullets) ----
  const certItems = certificates.filter(c => c.name).map(c => {
    const nm = c.link
      ? '<a href="' + proEsc(formatURL(c.link)) + '" target="_blank" style="font-weight:700;color:#2f48c9;border-bottom:1px dotted #2f48c9">' + proEsc(c.name) + '</a>'
      : '<b>' + proEsc(c.name) + '</b>';
    return '<li>' + nm + (c.org ? ' – ' + proEsc(c.org) : '') + (c.date ? ' (' + formatDate(c.date) + ')' : '') + '</li>';
  }).join('');
  const certHTML = certItems ? '<div class="pro-cert"><ul>' + certItems + '</ul></div>' : '';

  // ---- Projects ----
  const projHTML = projects.map(pr => {
    if (!pr.name) return '';
    const title = pr.link
      ? '<a href="' + proEsc(formatURL(pr.link)) + '" target="_blank" class="pro-proj-t">' + proEsc(pr.name) + '</a>'
      : '<span class="pro-proj-t">' + proEsc(pr.name) + '</span>';
    return '<div class="pro-proj"><div class="pro-proj-h">' + title +
      '<span class="pro-date">' + proEsc(pr.duration || '') + '</span></div>' +
      (pr.desc ? '<div class="pro-proj-d">' + proEsc(pr.desc) + '</div>' : '') +
      (pr.tech ? '<div class="pro-proj-d"><b>Technologies:</b> ' + proEsc(pr.tech) + '</div>' : '') +
      (pr.link ? '<a class="pro-link" href="' + proEsc(formatURL(pr.link)) + '" target="_blank">🔗 ' + proEsc(pr.link) + '</a>' : '') +
      '</div>';
  }).join('');

  // ---- Bottom columns ----
  const cols = [];
  const ach = (achievements || []).filter(Boolean);
  if (ach.length) cols.push(['trophy', 'Achievements', ach]);
  const soft = proList(sk.soft);
  if (soft.length) cols.push(['group', 'Soft Skills', soft]);
  const hob = proList(hobbies);
  if (hob.length) cols.push(['heart', 'Interests', hob]);
  const langs = proList(sk.languages);
  if (langs.length) cols.push(['globe', 'Languages', langs]);
  const footHTML = cols.length
    ? '<div class="pro-foot" style="grid-template-columns:repeat(' + cols.length + ',1fr)">' +
      cols.map(c => '<div class="pro-col"><div class="pro-col-h">' + proSvg(c[0]) + c[1] + '</div><ul>' +
        c[2].map(x => '<li>' + proEsc(x) + '</li>').join('') + '</ul></div>').join('') + '</div>'
    : '';

  const personal = (p.dob || p.nationality)
    ? '<div class="pro-personal">' +
      (p.dob ? '<b>Date of Birth:</b> ' + proEsc(p.dob) : '') +
      (p.dob && p.nationality ? ' &nbsp;|&nbsp; ' : '') +
      (p.nationality ? '<b>Nationality:</b> ' + proEsc(p.nationality) : '') + '</div>'
    : '';

  return '<div class="tmpl-pro">' +
    '<div class="pro-head">' + photo +
      '<div class="pro-name">' + proEsc(p.name || 'Your Name') + '</div>' +
      '<div class="pro-title">' + proEsc(p.title || 'Professional Title') + '</div>' +
      (contactHTML ? '<div class="pro-contact">' + contactHTML + '</div>' : '') +
    '</div>' +
    proSection('user', 'Career Objective', summaryHTML) +
    proSection('work', 'Work Experience', expHTML) +
    proSection('school', 'Education', eduHTML) +
    proSection('desktop', 'Technical Skills', skillRows) +
    proSection('award', 'Courses &amp; Certifications', certHTML) +
    proSection('folder', 'Projects', projHTML) +
    footHTML + personal +
    '<div class="pro-decl"><b>DECLARATION:</b> I hereby declare that the above information is true to the best of my knowledge and belief.</div>' +
  '</div>';
}

/* ---------- LIVE PREVIEW ---------- */
function updatePreview() {
  const data = collectData();
  const wrapper = document.getElementById('resumeWrapper');
  if (!wrapper) return;

  let html = '';
  if (currentTemplate === 'pro') html = buildProTemplate(data);
  else if (currentTemplate === 'modern') html = buildModernTemplate(data);
  else if (currentTemplate === 'bold') html = buildBoldTemplate(data);
  else html = buildCleanTemplate(data);

  wrapper.innerHTML = html;
  calculateATS(data);
}

/* ---------- ATS SCORING ---------- */
function calculateATS(data) {
  const { personal: p, skills: sk, experience, education, achievements, projects, certificates } = data;

  const checks = [
    { label: 'Contact Info',     score: (p.email && p.phone && p.location) ? 100 : (p.email || p.phone) ? 60 : 0, color: '#34d399' },
    { label: 'Summary/Objective',score: p.summary?.length > 50 ? 100 : p.summary?.length > 10 ? 60 : 0, color: '#4f8ef7' },
    { label: 'Work Experience',  score: experience.filter(e => e?.title).length > 0 ? (experience.filter(e => e?.desc?.length > 30).length > 0 ? 100 : 70) : 0, color: '#a78bfa' },
    { label: 'Education',        score: education.filter(e => e?.school).length > 0 ? 100 : 0, color: '#fb923c' },
    { label: 'Technical Skills', score: [sk.langs, sk.frameworks, sk.tools].filter(Boolean).length > 1 ? 100 : [sk.langs, sk.frameworks, sk.tools].filter(Boolean).length > 0 ? 60 : 0, color: '#22d3ee' },
    { label: 'Keywords/Impact',  score: experience.some(e => /\d+%|\d+ (users|clients|team|projects|million)/i.test(e?.desc || '')) ? 100 : achievements.length > 0 ? 60 : 0, color: '#fbbf24' },
    { label: 'Achievements',     score: achievements.filter(Boolean).length > 0 ? 100 : 0, color: '#f472b6' },
    { label: 'Certifications',   score: certificates.filter(c => c?.name).length > 0 ? 100 : 30, color: '#60a5fa' },
  ];

  const total = Math.round(checks.reduce((s, c) => s + c.score, 0) / checks.length);

  // Update bars
  document.getElementById('ats-bar-fill').style.width = `${total}%`;
  document.getElementById('ats-bar-fill').style.background = total >= 80 ? '#34d399' : total >= 60 ? '#fbbf24' : '#f87171';
  document.getElementById('ats-score-label').textContent = `${total}%`;
  document.getElementById('ats-score-label').style.color = total >= 80 ? '#34d399' : total >= 60 ? '#fbbf24' : '#f87171';

  // Show breakdown
  const breakdown = document.getElementById('atsBreakdown');
  const itemsEl = document.getElementById('atsItems');
  if (total > 0) {
    breakdown.style.display = 'block';
    itemsEl.innerHTML = checks.map(c => `
      <div class="ats-item">
        <span class="ats-item-label">${c.label}</span>
        <div class="ats-item-bar"><div class="ats-item-fill" style="width:${c.score}%;background:${c.color}"></div></div>
        <span class="ats-item-val" style="color:${c.color}">${c.score}%</span>
      </div>`).join('');
  }

  // Update hero ring too
  updateHeroRing(total);
}

function updateHeroRing(score) {
  const fill = document.getElementById('hero-ring-fill');
  const num = document.getElementById('hero-ats-num');
  if (fill && score > 0) {
    fill.style.strokeDashoffset = 251.2 - (251.2 * score / 100);
    num.textContent = score;
  }
}

/* ---------- AI GENERATION ---------- */
let aiTarget = 'summary';
let aiExpId = null;

async function aiGenerate(target) {
  aiTarget = target;
  aiExpId = null;
  const data = collectData();
  const p = data.personal;

  let prompt = '';
  if (target === 'summary') {
    prompt = `Write a professional resume summary (3-4 sentences, 80-100 words) for someone named ${p.name || 'the candidate'} who is a ${p.title || 'professional'}. Make it ATS-optimized, impactful, and achievement-focused. Start with their title and years of experience. End with what they bring to future employers. Return only the summary text.`;
  } else if (target === 'skills') {
    prompt = `Suggest a comprehensive list of technical skills for a ${p.title || 'software professional'}. Include: Programming Languages, Frameworks, Tools, Databases. Format as comma-separated lists under each category. Keep it realistic and ATS-friendly.`;
  } else {
    prompt = `Improve and polish the following resume summary to be more ATS-friendly and impactful:\n"${p.summary}"\nName: ${p.name}, Title: ${p.title}. Return only the improved summary.`;
  }

  openModal(prompt);
}

async function aiGenerateExp(expId) {
  aiTarget = 'experience';
  aiExpId = expId;
  const titleEl = document.querySelector(`[data-exp="${expId}"][data-field="title"]`);
  const compEl = document.querySelector(`[data-exp="${expId}"][data-field="company"]`);
  const descEl = document.querySelector(`[data-exp="${expId}"][data-field="desc"]`);

  const title = titleEl?.value || 'Software Engineer';
  const company = compEl?.value || 'a company';
  const existing = descEl?.value || '';

  const prompt = `Write 4-5 strong, ATS-optimized bullet points for a ${title} at ${company}.${existing ? ` Improve on these existing points:\n${existing}` : ''}\nUse action verbs, include metrics where possible (e.g., improved performance by X%, reduced costs by Y%). Each bullet should start with a strong verb. Return only the bullet points with • prefix.`;
  openModal(prompt);
}

function openModal(prompt) {
  const modal = document.getElementById('aiModal');
  modal.classList.add('open');
  document.getElementById('aiThinking').style.display = 'flex';
  document.getElementById('aiResult').style.display = 'none';
  callAnthropicAPI(prompt);
}

function closeModal() {
  document.getElementById('aiModal').classList.remove('open');
}

async function callAnthropicAPI(prompt) {
  try {
    const response = await fetch("/api/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }]
      })
    });

    let text = '';
    if (response.ok) {
      const data = await response.json();
      text = data.content?.map(b => b.text || '').join('');
    }
    if (!text && typeof window.generateClientSmartAI === 'function') {
      text = window.generateClientSmartAI(prompt);
    }

    document.getElementById('aiThinking').style.display = 'none';
    document.getElementById('aiResult').style.display = 'block';
    document.getElementById('aiOutput').textContent = text || 'Generated response tailored to your resume.';
    window._aiLastResult = text;

  } catch (err) {
    console.warn('API error, using built-in AI:', err);
    const text = typeof window.generateClientSmartAI === 'function' ? window.generateClientSmartAI(prompt) : 'Generated response tailored to your resume.';
    document.getElementById('aiThinking').style.display = 'none';
    document.getElementById('aiResult').style.display = 'block';
    document.getElementById('aiOutput').textContent = text;
    window._aiLastResult = text;
  }
}

function applyAiResult() {
  const result = window._aiLastResult;
  if (!result) return;

  if (aiTarget === 'summary') {
    document.getElementById('summary').value = result;
  } else if (aiTarget === 'skills') {
    // Parse and fill skill fields
    const lines = result.split('\n');
    lines.forEach(line => {
      if (/programming|language/i.test(line)) {
        const skills = line.replace(/.*?:/,'').trim();
        if (skills) document.getElementById('prog-langs').value = skills;
      } else if (/framework|library/i.test(line)) {
        const skills = line.replace(/.*?:/,'').trim();
        if (skills) document.getElementById('frameworks').value = skills;
      } else if (/tool|technology/i.test(line)) {
        const skills = line.replace(/.*?:/,'').trim();
        if (skills) document.getElementById('tools').value = skills;
      } else if (/database/i.test(line)) {
        const skills = line.replace(/.*?:/,'').trim();
        if (skills) document.getElementById('databases').value = skills;
      }
    });
    // Fallback: if the result is one big comma-list
    if (!document.getElementById('prog-langs').value) {
      document.getElementById('prog-langs').value = result;
    }
  } else if (aiTarget === 'experience' && aiExpId) {
    const descEl = document.querySelector(`[data-exp="${aiExpId}"][data-field="desc"]`);
    if (descEl) descEl.value = result;
  } else {
    document.getElementById('summary').value = result;
  }

  closeModal();
  updatePreview();
  showToast('✅ AI content applied to your resume!');
}

/* ---------- PDF DOWNLOAD ---------- */
function generateResume() {
  const data = collectData();
  if (!data.personal.name) {
    showToast('⚠️ Please enter your Full Name first!');
    return;
  }
  updatePreview();
  incrementResumeCount();
  setTimeout(() => downloadPDF(), 400);
}

function downloadPDF() {
  const data = collectData();
  if (!data.personal.name) {
    showToast('⚠️ Please fill in your details first!');
    nextStep(1);
    return;
  }

  // Build a clean printable page
  const wrapper = document.getElementById('resumeWrapper').innerHTML;
  const printWin = window.open('', '_blank', 'width=900,height=700');
  printWin.document.write(`<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Resume - ${data.personal.name}</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, sans-serif; }
  @page { size: A4; margin: 12mm; }
  @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
  ${getTemplatePrintCSS()}
</style>
</head>
<body>${wrapper}</body>
</html>`);
  printWin.document.close();
  setTimeout(() => {
    printWin.focus();
    printWin.print();
    printWin.close();
  }, 600);

  showToast('📄 Opening PDF export...');
}

function getTemplatePrintCSS() {
  return TMPL_PRO_CSS + '@page{size:A4;margin:8mm 9mm}' + `
  .tmpl-clean .r-header { background:#fff; padding:24px 28px 16px; border-bottom:3px solid #2563eb; }
  .tmpl-clean .r-name { font-size:1.8rem; font-weight:700; color:#1a1a2e; margin-bottom:4px; }
  .tmpl-clean .r-title { font-size:0.9rem; color:#2563eb; font-weight:600; margin-bottom:10px; }
  .tmpl-clean .r-contact { display:flex; flex-wrap:wrap; gap:12px; font-size:0.75rem; color:#555; }
  .tmpl-clean .r-body { display:flex; }
  .tmpl-clean .r-main { flex:1; padding:16px 24px; }
  .tmpl-clean .r-side { width:34%; background:#f7f9ff; padding:16px; border-left:1px solid #e8ecf8; }
  .tmpl-clean .r-section { margin-bottom:16px; }
  .tmpl-clean .r-section-title { font-size:0.65rem; font-weight:700; color:#2563eb; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:8px; padding-bottom:4px; border-bottom:1px solid #dde4f8; }
  .tmpl-clean .r-item { margin-bottom:10px; }
  .tmpl-clean .r-item-head { display:flex; justify-content:space-between; }
  .tmpl-clean .r-item-title { font-size:0.84rem; font-weight:700; }
  .tmpl-clean .r-item-date { font-size:0.68rem; color:#888; }
  .tmpl-clean .r-item-sub { font-size:0.76rem; color:#555; }
  .tmpl-clean .r-item-desc { font-size:0.73rem; color:#444; line-height:1.45; }
  .tmpl-clean .r-item-desc ul { padding-left:12px; margin-top:2px; }
  .tmpl-clean .r-item-desc li { margin-bottom:1px; }
  .tmpl-clean .skill-tag { display:inline-block; padding:2px 6px; background:#e8ecf8; border-radius:3px; font-size:0.68rem; color:#2563eb; margin:2px; }
  .tmpl-clean .r-summary { font-size:0.78rem; color:#444; line-height:1.5; margin-bottom:12px; padding:8px; background:#f7f9ff; border-left:3px solid #2563eb; }
  .tmpl-modern .r-header { background:linear-gradient(135deg,#1a1a2e,#16213e); padding:24px 28px; color:#fff; }
  .tmpl-modern .r-name { font-size:1.7rem; font-weight:700; color:#fff; margin-bottom:4px; }
  .tmpl-modern .r-title { font-size:0.86rem; color:#4f8ef7; font-weight:600; margin-bottom:10px; }
  .tmpl-modern .r-contact { display:flex; flex-wrap:wrap; gap:10px; font-size:0.75rem; color:#aaa; }
  .tmpl-modern .r-body { display:grid; grid-template-columns:1fr 2fr; }
  .tmpl-modern .r-side { background:#f0f2fa; padding:16px; }
  .tmpl-modern .r-main { padding:16px 20px; }
  .tmpl-modern .r-section { margin-bottom:14px; }
  .tmpl-modern .r-section-title { font-size:0.65rem; font-weight:700; text-transform:uppercase; letter-spacing:0.1em; color:#1a1a2e; margin-bottom:8px; padding-bottom:3px; border-bottom:2px solid #4f8ef7; }
  .tmpl-modern .r-item { margin-bottom:10px; }
  .tmpl-modern .r-item-title { font-size:0.84rem; font-weight:700; color:#1a1a2e; }
  .tmpl-modern .r-item-sub { font-size:0.76rem; color:#4f8ef7; }
  .tmpl-modern .r-item-date { font-size:0.68rem; color:#888; }
  .tmpl-modern .r-item-desc { font-size:0.73rem; color:#444; line-height:1.45; }
  .tmpl-modern .r-item-desc ul { padding-left:12px; margin-top:2px; }
  .tmpl-modern .skill-tag { display:block; padding:4px 7px; margin-bottom:3px; background:#fff; border-radius:3px; border-left:3px solid #4f8ef7; font-size:0.72rem; color:#333; }
  .tmpl-modern .r-summary { font-size:0.78rem; color:#444; line-height:1.5; margin-bottom:12px; }
  .tmpl-bold .r-header { background:#f7c948; padding:24px 28px; }
  .tmpl-bold .r-name { font-size:2rem; font-weight:900; color:#1a1a2e; margin-bottom:4px; }
  .tmpl-bold .r-title { font-size:0.86rem; color:#1a1a2e; font-weight:700; margin-bottom:10px; }
  .tmpl-bold .r-contact { display:flex; flex-wrap:wrap; gap:10px; font-size:0.75rem; color:#333; }
  .tmpl-bold .r-body { padding:16px 20px; }
  .tmpl-bold .r-section { margin-bottom:14px; }
  .tmpl-bold .r-section-title { font-size:0.92rem; font-weight:900; color:#1a1a2e; text-transform:uppercase; margin-bottom:8px; padding:4px 10px; background:#f7c948; border-radius:3px; }
  .tmpl-bold .r-item { margin-bottom:8px; padding-left:10px; border-left:3px solid #f7c948; }
  .tmpl-bold .r-item-title { font-size:0.84rem; font-weight:800; }
  .tmpl-bold .r-item-sub { font-size:0.75rem; color:#555; }
  .tmpl-bold .r-item-date { font-size:0.68rem; color:#888; }
  .tmpl-bold .r-item-desc { font-size:0.73rem; color:#333; line-height:1.45; }
  .tmpl-bold .r-item-desc ul { padding-left:12px; margin-top:2px; }
  .tmpl-bold .skill-tag { display:inline-block; padding:2px 7px; background:#1a1a2e; border-radius:3px; font-size:0.68rem; color:#f7c948; margin:2px; }
  .tmpl-bold .r-summary { font-size:0.78rem; color:#333; line-height:1.5; margin-bottom:12px; }
  `;
}

/* ---------- COPY TO CLIPBOARD ---------- */
function copyToClipboard() {
  const text = document.getElementById('resumeWrapper')?.innerText || '';
  if (!text.trim()) { showToast('⚠️ Nothing to copy yet!'); return; }
  navigator.clipboard.writeText(text).then(() => showToast('✅ Resume text copied to clipboard!'));
}

/* ---------- TOAST ---------- */
function showToast(msg, duration = 3500) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), duration);
}

/* ---------- NAVBAR SCROLL EFFECT ---------- */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 20) {
    nav.style.background = 'rgba(8,9,13,0.98)';
  } else {
    nav.style.background = 'rgba(8,9,13,0.85)';
  }
});

/* ---------- INIT ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initAnalytics();
  // Add initial experience and education rows for better UX
  addExperience();
  addEducation();
  updatePreview();   // show the default (Professional) template right away
});
/* ============================================================
   NEW ADDITIONS — 6 AI Features
   Paste at the BOTTOM of app.js
   ============================================================ */

// ── FIREBASE RESUME COUNT ──
function firebaseIncrResume() {
  if (window._useFirebase && window._firebaseDB) {
    import("https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js")
      .then(({ runTransaction }) => {
        runTransaction(window._firebaseRef(window._firebaseDB, 'stats/resumes'), n => (n||0)+1);
      });
  } else {
    // fallback localStorage
    const n = parseInt(localStorage.getItem('rai_resumes')||'0') + 1;
    localStorage.setItem('rai_resumes', n);
  }
}

// ── Override existing incrementResumeCount to also use Firebase ──
const _oldIncrement = window.incrementResumeCount || function(){};
window.incrementResumeCount = function() {
  _oldIncrement();
  firebaseIncrResume();
};

// ── AI PANEL OPEN / CLOSE ──
const _panelTitles = {
  summary:   '✍ AI Summary Writer',
  jd:        '🎯 Job Description Matcher',
  cover:     '✉ Cover Letter Generator',
  interview: '💬 Interview Prep',
  roast:     '🔥 Resume Roast',
  linkedin:  '💼 LinkedIn Optimizer',
};

function openAIPanel(tab) {
  document.getElementById('aiDrawer')?.classList.add('open');
  document.getElementById('aiOverlay')?.classList.add('open');
  switchAITab(tab || 'summary');
}

function closeAIPanel() {
  document.getElementById('aiDrawer')?.classList.remove('open');
  document.getElementById('aiOverlay')?.classList.remove('open');
}

function switchAITab(tab) {
  document.querySelectorAll('.aid-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.aid-sec').forEach(s => s.classList.remove('active'));
  document.getElementById('dtab-' + tab)?.classList.add('active');
  document.getElementById('dsec-' + tab)?.classList.add('active');
  const title = document.getElementById('drawerTitle');
  if (title) title.textContent = _panelTitles[tab] || 'AI Assistant';
}

// ── HELPER: get resume as plain text for AI context ──
function getResumeText() {
  const d = typeof collectData === 'function' ? collectData() : {};
  const p = d.personal || {};
  const sk = d.skills || {};
  const exp = d.experience || [];
  const edu = d.education || [];
  const ach = d.achievements || [];
  const proj = d.projects || [];
  const cert = d.certificates || [];
  return `
NAME: ${p.name || ''}
TITLE: ${p.title || ''}
EMAIL: ${p.email || ''} | PHONE: ${p.phone || ''} | LOCATION: ${p.location || ''}
LINKEDIN: ${p.linkedin || ''} | GITHUB: ${p.github || ''}

SUMMARY:
${p.summary || ''}

SKILLS: ${[sk.langs, sk.frameworks, sk.tools, sk.databases].filter(Boolean).join(', ')}
SOFT SKILLS: ${sk.soft || ''}

EXPERIENCE:
${exp.map(e => `${e.title || ''} at ${e.company || ''}\n${e.desc || ''}`).join('\n\n')}

EDUCATION:
${edu.map(e => `${e.degree || ''} — ${e.school || ''} (${e.start || ''}–${e.end || ''}) ${e.grade || ''}`).join('\n')}

ACHIEVEMENTS:
${ach.filter(Boolean).join('\n')}

PROJECTS:
${proj.map(pr => `${pr.name || ''}: ${pr.desc || ''} [${pr.tech || ''}]`).join('\n')}

CERTIFICATIONS:
${cert.map(c => `${c.name || ''} — ${c.org || ''}`).join('\n')}
  `.trim();
}

// ── CALL CLAUDE API ──
async function callClaudeAPI(prompt) {
  try {
    const response = await fetch("/api/claude", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1500,
        messages: [{ role: "user", content: prompt }]
      })
    });
    if (response.ok) {
      const data = await response.json();
      const txt = data.content?.map(b => b.text || '').join('');
      if (txt) return txt;
    }
  } catch (err) {
    console.warn("Backend API not reachable, using smart AI fallback:", err);
  }
  if (typeof window.generateClientSmartAI === 'function') {
    return window.generateClientSmartAI(prompt);
  }
  return 'AI response generated successfully.';
}

// ── RUN AI TOOL ──
const _aiResults = {};

async function runAITool(type) {
  const resumeText = getResumeText();
  const v = id => (document.getElementById(id)?.value || '').trim();

  // Show thinking, hide result
  document.getElementById('dt-' + type).style.display = 'flex';
  document.getElementById('dr-' + type).style.display = 'none';

  let prompt = '';
  try {
    if (type === 'summary') {
      const role   = v('ai-role')       || v('jobTitle') || 'professional';
      const yoe    = v('ai-yoe')        || '';
      const skills = v('ai-skills-hint')|| [v('prog-langs'), v('frameworks')].filter(Boolean).join(', ');
      prompt = `Write a powerful, ATS-optimized professional resume summary (3-4 sentences, 80-100 words).
Name: ${v('fullName') || 'the candidate'}
Role: ${role}
Experience: ${yoe}
Skills: ${skills}
Start with role + experience. Include key skills. End with value to employer.
Return ONLY the summary text. No labels, no quotes.`;

    } else if (type === 'jd') {
      const jd = v('jd-paste');
      if (!jd) { showToast('⚠️ Paste a job description first!'); resetAIUI(type); return; }
      prompt = `You are an ATS expert. Analyse this resume vs the job description.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jd}

Reply in EXACTLY this format:
MATCH_SCORE: [number 0-100]

STRONG MATCHES:
- [keyword]
- [keyword]

MISSING KEYWORDS:
- [keyword]
- [keyword]

TOP 3 IMPROVEMENTS:
1. [specific advice]
2. [specific advice]
3. [specific advice]`;

    } else if (type === 'cover') {
      const company = v('cl-company') || 'the company';
      const role    = v('cl-role')    || v('jobTitle') || 'the role';
      const extra   = v('cl-extra')   || '';
      prompt = `Write a professional, personalized cover letter.
Applicant: ${v('fullName')}
Role: ${role} at ${company}
Background: ${resumeText}
Extra notes: ${extra}
3 short paragraphs. Professional but warm. Under 300 words.
Return ONLY the letter text.`;

    } else if (type === 'interview') {
      const role  = v('int-role')  || v('jobTitle') || 'Software Engineer';
      const itype = v('int-type')  || 'Technical';
      const level = v('int-level') || 'Entry Level';
      prompt = `Generate 8 realistic ${itype} interview questions for a ${role} at ${level} level.
Based on this resume: ${resumeText}
For each question:
Q: [question]
💡 Tip: [30-word answer strategy]
Make questions specific to their background.`;

    } else if (type === 'roast') {
      const role = v('roast-role') || v('jobTitle') || 'tech role';
      prompt = `You are a brutally honest but helpful resume reviewer.
Roast this resume for a ${role} position:
${resumeText}

Provide:
🔥 BRUTAL TRUTH (2-3 specific weaknesses)
⚠️ RED FLAGS (ATS or recruiter red flags)
💡 QUICK WINS (3 specific improvements for TODAY)
✅ WHAT'S GOOD (1-2 genuine positives)
Be direct, specific, and actionable.`;

    } else if (type === 'linkedin') {
      const industry = v('li-industry') || 'tech';
      const goal     = v('li-goal')     || 'Get recruiter attention';
      prompt = `Create optimised LinkedIn content.
Person: ${v('fullName')}, ${v('jobTitle')}
Industry: ${industry}
Goal: ${goal}
Background: ${resumeText}

Generate:
**HEADLINE** (120 chars max, keyword-rich):
[headline]

**ABOUT SECTION** (first-person, 200 words, keywords, CTA):
[about]

**TOP 3 SKILLS TO ADD:**
[skills]`;
    }

    const result = await callClaudeAPI(prompt);
    _aiResults[type] = result;

    // Render result
    if (type === 'jd') {
      renderJDScore(result);
    } else {
      const out = document.getElementById('do-' + type);
      if (out) out.textContent = result;
    }

  } catch (err) {
    const out = document.getElementById('do-' + type);
    if (out) out.textContent = '⚠️ AI not connected.\n\nTo enable AI features:\n1. Get free API key at console.anthropic.com\n2. Set up a backend proxy (see README.md)\n\nAll resume building features work without AI!';
  }

  // Hide thinking, show result
  document.getElementById('dt-' + type).style.display = 'none';
  document.getElementById('dr-' + type).style.display = 'flex';
}

function resetAIUI(type) {
  document.getElementById('dt-' + type).style.display = 'none';
  document.getElementById('dr-' + type).style.display = 'none';
}

// ── RENDER JD SCORE ──
function renderJDScore(text) {
  const scoreMatch = text.match(/MATCH_SCORE:\s*(\d+)/);
  const score = scoreMatch ? parseInt(scoreMatch[1]) : 0;
  const color = score >= 70 ? '#34d399' : score >= 50 ? '#fbbf24' : '#f87171';

  const matchLines   = (text.match(/STRONG MATCHES[\s\S]*?(?=MISSING|$)/)?.[0] || '').split('\n').filter(l => l.trim().startsWith('-')).map(l => l.replace(/^-\s*/,'').trim());
  const missingLines = (text.match(/MISSING KEYWORDS[\s\S]*?(?=TOP 3|$)/)?.[0] || '').split('\n').filter(l => l.trim().startsWith('-')).map(l => l.replace(/^-\s*/,'').trim());

  const ui = document.getElementById('jd-score-ui');
  ui.innerHTML = `
    <div class="jd-score-wrap">
      <div class="jd-score-num" style="color:${color}">${score}%</div>
      <div class="jd-score-lbl">Job Match Score</div>
    </div>
    <div style="margin-bottom:10px">
      <div class="kw-title">✅ Matching Keywords</div>
      <div class="kw-cloud">${matchLines.filter(Boolean).map(k => `<span class="kw match">${k}</span>`).join('')}</div>
    </div>
    <div>
      <div class="kw-title">❌ Add These Keywords</div>
      <div class="kw-cloud">${missingLines.filter(Boolean).map(k => `<span class="kw missing">${k}</span>`).join('')}</div>
    </div>`;

  const improvements = text.match(/TOP 3 IMPROVEMENTS[\s\S]*/)?.[0] || '';
  const out = document.getElementById('do-jd');
  if (out) out.textContent = improvements;
}

// ── APPLY AI RESULT TO RESUME ──
function applyAIResult(type) {
  const result = _aiResults[type] || '';
  if (!result || result.startsWith('⚠️')) { closeAIPanel(); return; }

  if (type === 'summary') {
    const el = document.getElementById('summary');
    if (el) { el.value = result; updatePreview(); }
    showToast('✅ Summary applied to resume!');
  }
  closeAIPanel();
}

// ── COPY AI RESULT ──
function copyAIResult(type) {
  const result = _aiResults[type] || '';
  if (!result) { showToast('⚠️ Run the AI tool first!'); return; }
  navigator.clipboard.writeText(result).then(() => showToast('✅ Copied to clipboard!'));
}

// ── SAVE RESUME (Ctrl+S) ──
document.addEventListener('keydown', e => {
  if (e.ctrlKey && e.key === 's') {
    e.preventDefault();
    const data = typeof collectData === 'function' ? collectData() : {};
    localStorage.setItem('rai_save', JSON.stringify(data));
    showToast('💾 Resume saved! (Ctrl+S)');
  }
});
/* ============================================================
   COMPANY INTELLIGENCE AI
   Paste at the BOTTOM of app.js
   ============================================================ */

// ── STATE ──
let _companyData    = {};   // stores AI fetched company info
let _pdfText        = '';   // stores extracted PDF text
let _companyResults = {};   // stores all 4 AI result sections

// ── STEP 1: Search Company Requirements ──
async function companyStep1() {
  const company = document.getElementById('company-name')?.value.trim();
  const role    = document.getElementById('company-role')?.value.trim();
  const level   = document.getElementById('company-level')?.value;

  if (!company) { showToast('⚠️ Please enter a company name!'); return; }
  if (!role)    { showToast('⚠️ Please enter the job role!');   return; }

  _companyData = { company, role, level };

  // Show step 2
  document.getElementById('cstep-1').style.display = 'none';
  document.getElementById('cstep-2').style.display = 'flex';
  document.getElementById('cstep-2').style.flexDirection = 'column';
  document.getElementById('cstep-2').style.gap = '12px';

  // Show company found box
  document.getElementById('company-found-box').innerHTML = `
    <div class="cf-name"><i class="fa fa-building"></i> ${company}</div>
    <div class="cf-meta">
      Role: <strong>${role}</strong> &nbsp;|&nbsp;
      Level: <strong>${level}</strong><br/>
      <span style="color:var(--green);font-size:.72rem">
        ✅ Company identified — now upload your resume PDF for personalized analysis
      </span>
    </div>`;
}

// ── HANDLE PDF UPLOAD ──
function handlePDFUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  document.getElementById('pdfStatus').style.display = 'flex';
  document.getElementById('pdfFileName').textContent  = file.name;
  document.getElementById('analyseBtn').style.display = 'block';

  // Read PDF as text using FileReader
  const reader = new FileReader();
  reader.onload = async function(e) {
    try {
      // Try to extract text from PDF using a simple approach
      const arrayBuffer = e.target.result;
      const uint8Array  = new Uint8Array(arrayBuffer);
      let text = '';

      // Extract readable text from PDF bytes
      for (let i = 0; i < uint8Array.length; i++) {
        const char = String.fromCharCode(uint8Array[i]);
        if (char >= ' ' && char <= '~') text += char;
        else if (char === '\n' || char === '\r') text += '\n';
      }

      // Clean up extracted text
      text = text.replace(/[^\x20-\x7E\n]/g, ' ')
                 .replace(/ {3,}/g, ' ')
                 .replace(/\n{3,}/g, '\n\n')
                 .trim();

      // Keep only meaningful parts (skip PDF metadata)
      const lines = text.split('\n').filter(l => l.trim().length > 3);
      _pdfText = lines.join('\n').substring(0, 4000);

      showToast('✅ Resume PDF loaded successfully!');
    } catch(err) {
      _pdfText = '';
      showToast('⚠️ Could not read PDF text. Using form data instead.');
    }
  };
  reader.readAsArrayBuffer(file);

  // Drag and drop support
  setupDragDrop();
}

function setupDragDrop() {
  const area = document.getElementById('pdfUploadArea');
  area.addEventListener('dragover',  e => { e.preventDefault(); area.classList.add('dragover'); });
  area.addEventListener('dragleave', () => area.classList.remove('dragover'));
  area.addEventListener('drop', e => {
    e.preventDefault();
    area.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      document.getElementById('resumePDF').files = e.dataTransfer.files;
      handlePDFUpload({ target: { files: [file] } });
    } else {
      showToast('⚠️ Please upload a PDF file!');
    }
  });
}

// ── STEP 2: Analyse with PDF ──
async function companyStep2() {
  const resumeContent = _pdfText || getResumeText();
  runCompanyAnalysis(resumeContent);
}

async function companyStep2WithoutPDF() {
  _pdfText = '';
  runCompanyAnalysis(getResumeText());
}

// ── MAIN ANALYSIS ──
async function runCompanyAnalysis(resumeContent) {
  const { company, role, level } = _companyData;

  // Show step 3
  document.getElementById('cstep-2').style.display = 'none';
  document.getElementById('cstep-3').style.display = 'flex';
  document.getElementById('cstep-3').style.flexDirection = 'column';
  document.getElementById('cstep-3').style.gap = '12px';

  document.getElementById('dt-company').style.display = 'flex';
  document.getElementById('resultTabs').style.display  = 'none';
  document.getElementById('resultActions').style.display = 'none';

  const thinkMsg = document.getElementById('company-think-msg');

  try {
    // ── CALL 1: Company Requirements ──
    thinkMsg.textContent = `Fetching ${company}'s tech stack & requirements...`;
    const reqPrompt = `You are a tech recruiter expert with deep knowledge of top companies worldwide.

Company: ${company}
Role: ${role}
Level: ${level}

Provide detailed information in this EXACT format:

COMPANY OVERVIEW:
[2-3 sentences about the company's tech culture and engineering team]

REQUIRED TECHNICAL SKILLS:
- [skill 1]
- [skill 2]
(list 8-10 must-have skills)

PREFERRED SKILLS:
- [skill]
(list 5-6 good-to-have skills)

INTERVIEW PROCESS:
[Describe ${company}'s typical interview process for ${role}]

WHAT THEY LOOK FOR:
[3-4 specific qualities ${company} values in ${role} candidates]

COMPANY TECH STACK:
[List the main technologies ${company} uses internally]`;

    const reqResult = await callClaudeAPI(reqPrompt);
    _companyResults.req = reqResult;
    document.getElementById('do-req').textContent = reqResult;

    // ── CALL 2: Skill Gap Analysis ──
    thinkMsg.textContent = 'Analysing your skill gaps...';
    const gapPrompt = `You are a career coach. Compare this candidate's resume with ${company}'s requirements for ${role} at ${level} level.

CANDIDATE RESUME:
${resumeContent}

COMPANY: ${company}
ROLE: ${role}

Provide analysis in this EXACT format:

MATCH_PERCENTAGE: [0-100]

STRONG SKILLS (candidate already has):
- [skill]: [why it matches]

MISSING CRITICAL SKILLS (must learn):
- [skill]: [how long to learn] | Priority: HIGH
- [skill]: [how long to learn] | Priority: HIGH

SKILLS TO IMPROVE:
- [skill]: [specific improvement needed]

OVERALL ASSESSMENT:
[2-3 sentences honest assessment of candidate's fit]

LEARNING ROADMAP:
Week 1-2: [focus area]
Week 3-4: [focus area]
Month 2: [focus area]
Month 3: [focus area]`;

    const gapResult = await callClaudeAPI(gapPrompt);
    _companyResults.gap = gapResult;
    renderSkillGap(gapResult);

    // ── CALL 3: Project Suggestions ──
    thinkMsg.textContent = 'Generating project ideas...';
    const projPrompt = `Suggest 4 specific projects a ${role} candidate should build to get hired at ${company}.

Candidate background: ${resumeContent.substring(0, 500)}
Level: ${level}

For each project provide in this format:

PROJECT [n]: [Name]
🎯 Why ${company} will love it: [reason]
🛠️ Tech Stack: [specific technologies]
⏱️ Build Time: [estimated time]
📋 Key Features to Build:
  - [feature 1]
  - [feature 2]
  - [feature 3]
🚀 How to make it stand out: [specific tip]
📊 Difficulty: [Easy/Medium/Hard]

Make projects realistic, impressive, and directly relevant to ${company}'s work.`;

    const projResult = await callClaudeAPI(projPrompt);
    _companyResults.proj = projResult;
    document.getElementById('do-proj').textContent = projResult;

    // ── CALL 4: Languages & Tech ──
    thinkMsg.textContent = 'Identifying required languages...';
    const langsPrompt = `List ALL programming languages and technologies required for ${role} at ${company} for ${level} level.

Format EXACTLY like this:

MUST_HAVE: Python, JavaScript, SQL, [etc]
GOOD_TO_HAVE: Go, Rust, TypeScript, [etc]
BONUS: Kotlin, Swift, [etc]

Then explain each category:

MUST HAVE (without these, application gets rejected):
[for each language: name, why needed at ${company}, learning resources]

GOOD TO HAVE (increases selection chances):
[for each: name, specific use at ${company}]

BONUS (sets you apart from other candidates):
[for each: name, when it helps]

CURRENT CANDIDATE LANGUAGES:
Based on resume: ${resumeContent.substring(0, 300)}
Gap analysis: [what they need to add]`;

    const langsResult = await callClaudeAPI(langsPrompt);
    _companyResults.langs = langsResult;
    renderLanguages(langsResult);

    // Show results
    document.getElementById('dt-company').style.display  = 'none';
    document.getElementById('resultTabs').style.display  = 'flex';
    document.getElementById('resultActions').style.display = 'flex';
    showResultTab('req');
    showToast(`✅ ${company} analysis complete!`);

  } catch(err) {
    document.getElementById('dt-company').style.display = 'none';
    document.getElementById('do-req').textContent =
      `⚠️ AI not connected.\n\nTo enable Company Intelligence:\n1. Get API key at console.anthropic.com\n2. Set up backend proxy\n3. See README.md\n\nThis feature needs Claude AI to fetch live company data.`;
    document.getElementById('resultTabs').style.display = 'flex';
    showResultTab('req');
  }
}

// ── RENDER SKILL GAP SCORE ──
function renderSkillGap(text) {
  const match = text.match(/MATCH_PERCENTAGE:\s*(\d+)/);
  const score = match ? parseInt(match[1]) : 0;
  const color = score >= 70 ? '#34d399' : score >= 50 ? '#fbbf24' : '#f87171';
  const label = score >= 70 ? 'Great Match! 🎉' : score >= 50 ? 'Good Potential 💪' : 'Needs Work 📚';

  const offset = 251.2 - (251.2 * score / 100);

  document.getElementById('gapScoreWrap').innerHTML = `
    <div class="gap-score-circle">
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" class="gap-ring-bg"/>
        <circle cx="50" cy="50" r="40" class="gap-ring-fill"
          style="stroke:${color};stroke-dashoffset:${offset}"/>
      </svg>
      <span class="gap-score-num" style="color:${color}">${score}%</span>
    </div>
    <div class="gap-score-info">
      <div class="gap-score-title">${label}</div>
      <div class="gap-score-sub">
        Your resume matches ${score}% of what<br/>
        <strong>${_companyData.company}</strong> needs for this role.
      </div>
    </div>`;

  document.getElementById('do-gap').textContent = text.replace(/MATCH_PERCENTAGE:\s*\d+\n?/, '');
}

// ── RENDER LANGUAGE TAGS ──
function renderLanguages(text) {
  const mustLine  = text.match(/MUST_HAVE:\s*([^\n]+)/)?.[1] || '';
  const goodLine  = text.match(/GOOD_TO_HAVE:\s*([^\n]+)/)?.[1] || '';
  const bonusLine = text.match(/BONUS:\s*([^\n]+)/)?.[1] || '';

  const mustLangs  = mustLine.split(',').map(s => s.trim()).filter(Boolean);
  const goodLangs  = goodLine.split(',').map(s => s.trim()).filter(Boolean);
  const bonusLangs = bonusLine.split(',').map(s => s.trim()).filter(Boolean);

  const langIcons = {
    'Python':'🐍','JavaScript':'⚡','TypeScript':'🔷','Java':'☕','C++':'⚙️',
    'Go':'🐹','Rust':'🦀','SQL':'🗄️','HTML':'🌐','CSS':'🎨','React':'⚛️',
    'Node.js':'💚','Swift':'🍎','Kotlin':'🎯','PHP':'🐘','Ruby':'💎',
    'C#':'🔵','Scala':'♾️','R':'📊','MATLAB':'📐','Dart':'🎯','Flutter':'💙',
  };

  let html = '';
  mustLangs.forEach(l  => { const icon = langIcons[l] || '💻'; html += `<span class="lang-tag must"><span>${icon}</span> ${l} <span class="lt-badge">MUST</span></span>`; });
  goodLangs.forEach(l  => { const icon = langIcons[l] || '💻'; html += `<span class="lang-tag good"><span>${icon}</span> ${l} <span class="lt-badge">GOOD</span></span>`; });
  bonusLangs.forEach(l => { const icon = langIcons[l] || '💻'; html += `<span class="lang-tag bonus"><span>${icon}</span> ${l} <span class="lt-badge">BONUS</span></span>`; });

  document.getElementById('langTags').innerHTML = html;
  document.getElementById('do-langs').textContent = text
    .replace(/MUST_HAVE:[^\n]+\n?/, '')
    .replace(/GOOD_TO_HAVE:[^\n]+\n?/, '')
    .replace(/BONUS:[^\n]+\n?/, '');
}

// ── SHOW RESULT TAB ──
function showResultTab(tab) {
  document.querySelectorAll('.rtab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.result-panel').forEach(p => p.classList.remove('active'));
  document.getElementById('rt-' + tab)?.classList.add('active');
  document.getElementById('rp-' + tab)?.classList.add('active');
}

// ── AUTO FILL SKILLS ──
function applyCompanySuggestions() {
  const text = _companyResults.langs || '';
  const mustLine = text.match(/MUST_HAVE:\s*([^\n]+)/)?.[1] || '';
  const goodLine = text.match(/GOOD_TO_HAVE:\s*([^\n]+)/)?.[1] || '';

  if (mustLine) {
    const existing = document.getElementById('prog-langs')?.value || '';
    const newSkills = mustLine.split(',').map(s => s.trim()).filter(Boolean);
    const existingSkills = existing.split(',').map(s => s.trim()).filter(Boolean);
    const combined = [...new Set([...existingSkills, ...newSkills])].join(', ');
    const el = document.getElementById('prog-langs');
    if (el) el.value = combined;
  }
  if (goodLine) {
    const existing = document.getElementById('frameworks')?.value || '';
    const newSkills = goodLine.split(',').map(s => s.trim()).filter(Boolean);
    const existingSkills = existing.split(',').map(s => s.trim()).filter(Boolean);
    const combined = [...new Set([...existingSkills, ...newSkills])].join(', ');
    const el = document.getElementById('frameworks');
    if (el) el.value = combined;
  }

  updatePreview();
  closeAIPanel();
  showToast(`✅ ${_companyData.company} skills added to your resume!`);
}

// ── DOWNLOAD FULL REPORT ──
function downloadCompanyReport() {
  const { company, role, level } = _companyData;
  const report = `
COMPANY INTELLIGENCE REPORT
Generated by ResumeAI Pro
==============================
Company: ${company}
Role: ${role}
Level: ${level}

==============================
COMPANY REQUIREMENTS
==============================
${_companyResults.req || 'Not generated'}

==============================
SKILL GAP ANALYSIS
==============================
${_companyResults.gap || 'Not generated'}

==============================
RECOMMENDED PROJECTS
==============================
${_companyResults.proj || 'Not generated'}

==============================
REQUIRED LANGUAGES & TECH
==============================
${_companyResults.langs || 'Not generated'}
`.trim();

  const blob = new Blob([report], { type: 'text/plain' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `${company.replace(/\s+/g,'_')}_Career_Report.txt`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('📄 Report downloaded!');
}

// ── RESET ──
function resetCompanyTool() {
  _companyData = {}; _pdfText = ''; _companyResults = {};
  document.getElementById('cstep-1').style.display = 'flex';
  document.getElementById('cstep-2').style.display = 'none';
  document.getElementById('cstep-3').style.display = 'none';
  document.getElementById('resultTabs').style.display    = 'none';
  document.getElementById('resultActions').style.display = 'none';
  document.getElementById('dt-company').style.display    = 'none';
  document.getElementById('pdfStatus').style.display     = 'none';
  document.getElementById('analyseBtn').style.display    = 'none';
  document.getElementById('company-name').value = '';
  document.getElementById('company-role').value = '';
  _pdfText = '';
}
/* ════════════════════════════════════════════════════
   FEATURE 1 — PROFILE PHOTO UPLOAD
   ════════════════════════════════════════════════════ */
 
let _userPhoto = null; // stores base64 photo string
 
function handlePhotoUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
 
  // Validate size (max 2MB)
  if (file.size > 2 * 1024 * 1024) {
    showToast('⚠️ Photo must be under 2MB!');
    return;
  }
 
  const reader = new FileReader();
  reader.onload = function(e) {
    _userPhoto = e.target.result;
 
    // Update preview circle
    const preview = document.getElementById('photoPreview');
    preview.innerHTML = `<img src="${_userPhoto}" alt="Profile"/>`;
 
    // Show remove button
    document.getElementById('photoRemoveBtn').style.display = 'inline-flex';
 
    // Update live resume preview
    updatePreview();
    showToast('✅ Photo added to resume!');
  };
  reader.readAsDataURL(file);
}
 
function removePhoto() {
  _userPhoto = null;
  const preview = document.getElementById('photoPreview');
  preview.innerHTML = `<i class="fa fa-user-circle"></i><span>Upload Photo</span>`;
  document.getElementById('photoRemoveBtn').style.display = 'none';
  document.getElementById('photoInput').value = '';
  updatePreview();
  showToast('Photo removed');
}
 
// ADD photo to resume templates
// Find your buildCleanTemplate function
// Inside the r-header div, replace name section with:
function buildPhotoHTML() {
  if (!_userPhoto) return '';
  return `<img src="${_userPhoto}" class="r-photo" alt="Profile Photo"/>`;
}
 
// IMPORTANT: In your existing buildCleanTemplate function
// Find the r-header section and update it like this:
/*
  FIND THIS in buildCleanTemplate:
  <div class="r-header">
    <div class="r-name">${p.name||'Your Name'}</div>
 
  REPLACE WITH:
  <div class="r-header" style="display:flex;align-items:flex-start;gap:16px">
    <div style="flex:1">
      <div class="r-name">${p.name||'Your Name'}</div>
      ... rest of header ...
    </div>
    ${_userPhoto ? `<img src="${_userPhoto}" class="r-photo" alt="Profile"/>` : ''}
  </div>
*/
 
 
/* ════════════════════════════════════════════════════
   FEATURE 2 — IT KEYWORD DATABASE + SUGGESTER
   ════════════════════════════════════════════════════ */
 
const IT_KEYWORDS = {
  frontend: {
    must:     ['HTML5','CSS3','JavaScript','React','Responsive Design','Git','REST APIs','TypeScript','Web Accessibility','Performance Optimization'],
    good:     ['Vue.js','Angular','Next.js','Tailwind CSS','Webpack','Jest','GraphQL','Redux','SCSS','PWA'],
    trending: ['React Server Components','Web Components','Micro Frontends','Edge Computing','AI Integration']
  },
  backend: {
    must:     ['Node.js','Python','REST APIs','SQL','Authentication','Docker','Git','Microservices','Server Architecture','Database Design'],
    good:     ['Express.js','Django','FastAPI','PostgreSQL','Redis','Kafka','RabbitMQ','Nginx','CI/CD','AWS'],
    trending: ['Bun.js','Hono','tRPC','Serverless','Edge Functions','LLM Integration']
  },
  fullstack: {
    must:     ['React','Node.js','SQL','NoSQL','REST APIs','Git','Docker','TypeScript','Authentication','Deployment'],
    good:     ['Next.js','GraphQL','Redis','AWS','MongoDB','PostgreSQL','Jest','Nginx','CI/CD','Microservices'],
    trending: ['T3 Stack','tRPC','Prisma ORM','Vercel','Supabase','AI APIs']
  },
  devops: {
    must:     ['Docker','Kubernetes','CI/CD','Linux','AWS','Jenkins','Git','Shell Scripting','Monitoring','Infrastructure as Code'],
    good:     ['Terraform','Ansible','Prometheus','Grafana','Helm','ArgoCD','Azure','GCP','ELK Stack','HashiCorp Vault'],
    trending: ['Platform Engineering','GitOps','FinOps','Service Mesh','Chaos Engineering','AI Ops']
  },
  datascience: {
    must:     ['Python','Machine Learning','Pandas','NumPy','SQL','Data Visualization','Statistics','Scikit-learn','Jupyter','EDA'],
    good:     ['TensorFlow','PyTorch','Matplotlib','Seaborn','Spark','Hadoop','Tableau','Power BI','Feature Engineering','A/B Testing'],
    trending: ['LLMs','RAG','Vector Databases','MLOps','AutoML','Generative AI']
  },
  ml: {
    must:     ['Python','TensorFlow','PyTorch','Machine Learning','Deep Learning','NLP','Computer Vision','Model Deployment','MLOps','Git'],
    good:     ['Hugging Face','BERT','Transformers','CUDA','Docker','FastAPI','Kubeflow','Feature Stores','Model Monitoring','AWS SageMaker'],
    trending: ['LLM Fine-tuning','RAG Systems','Diffusion Models','Multimodal AI','AI Agents','RLHF']
  },
  android: {
    must:     ['Kotlin','Java','Android SDK','Jetpack Compose','REST APIs','Git','MVVM','Room Database','Material Design','Google Play'],
    good:     ['Retrofit','Coroutines','Hilt/Dagger','Firebase','WorkManager','DataStore','Navigation Component','Unit Testing','CI/CD'],
    trending: ['Compose Multiplatform','Kotlin Multiplatform','ML Kit','On-device AI','Wear OS']
  },
  ios: {
    must:     ['Swift','SwiftUI','UIKit','Xcode','REST APIs','Git','MVC/MVVM','Core Data','App Store','Auto Layout'],
    good:     ['Combine','RxSwift','Core ML','ARKit','CloudKit','Firebase','TestFlight','Instruments','WidgetKit'],
    trending: ['SwiftData','Swift Concurrency','Vision Framework','On-device LLMs','visionOS']
  },
  cybersecurity: {
    must:     ['Network Security','Penetration Testing','OWASP','Linux','Python','Firewalls','Incident Response','Vulnerability Assessment','Cryptography','SIEM'],
    good:     ['Metasploit','Wireshark','Burp Suite','Nmap','Kali Linux','SOC Operations','Threat Intelligence','Zero Trust','ISO 27001','CISSP'],
    trending: ['AI Security','Cloud Security','DevSecOps','Ransomware Defense','Supply Chain Security']
  },
  cloud: {
    must:     ['AWS','Azure','GCP','Docker','Kubernetes','Terraform','Linux','Networking','Storage','IAM'],
    good:     ['CloudFormation','Ansible','Prometheus','Grafana','Vault','Service Mesh','Multi-cloud','Cost Optimization','SLA Management'],
    trending: ['FinOps','Sustainable Cloud','AI/ML on Cloud','Edge Computing','Confidential Computing']
  },
  uiux: {
    must:     ['Figma','User Research','Wireframing','Prototyping','Design Systems','Usability Testing','Information Architecture','Visual Design','Accessibility','Interaction Design'],
    good:     ['Adobe XD','Sketch','After Effects','Motion Design','Design Tokens','HTML/CSS','A/B Testing','Analytics','Brand Design'],
    trending: ['AI-assisted Design','Voice UI','AR/VR Design','Design for LLMs','Inclusive Design']
  },
  database: {
    must:     ['SQL','MySQL','PostgreSQL','Database Design','Query Optimization','Indexing','Backup & Recovery','Stored Procedures','Data Modeling','Performance Tuning'],
    good:     ['MongoDB','Redis','Oracle','Cassandra','Replication','Sharding','ETL','Data Warehousing','BI Tools','Cloud Databases'],
    trending: ['Vector Databases','Time Series DB','Graph Databases','Distributed SQL','Database AI Assistants']
  }
};
 
function loadKeywords() {
  const role = document.getElementById('ks-role')?.value;
  if (!role) return;
 
  const data = IT_KEYWORDS[role];
  if (!data) return;
 
  // Render must-have tags
  document.getElementById('ksMust').innerHTML =
    data.must.map(k => `
      <span class="ks-tag must" onclick="addKeyword(this,'${k}')"
        title="Click to add to resume">
        + ${k}
      </span>`).join('');
 
  // Render good-to-have
  document.getElementById('ksGood').innerHTML =
    data.good.map(k => `
      <span class="ks-tag good" onclick="addKeyword(this,'${k}')"
        title="Click to add to resume">
        + ${k}
      </span>`).join('');
 
  // Render trending
  document.getElementById('ksTrending').innerHTML =
    data.trending.map(k => `
      <span class="ks-tag trending" onclick="addKeyword(this,'${k}')"
        title="Click to add to resume">
        + ${k}
      </span>`).join('');
 
  document.getElementById('ksKeywords').style.display = 'block';
}
 
function addKeyword(el, keyword) {
  if (el.classList.contains('added')) return;
 
  // Add to appropriate field
  const toolsEl  = document.getElementById('tools');
  const langsEl  = document.getElementById('prog-langs');
  const fwEl     = document.getElementById('frameworks');
 
  // Smart field detection
  const langKeywords = ['Python','JavaScript','TypeScript','Java','Kotlin','Swift','Go','Rust','PHP','Ruby','C++','C#','SQL','HTML5','CSS3','Scala','R'];
  const fwKeywords   = ['React','Vue.js','Angular','Node.js','Django','FastAPI','Express.js','Next.js','Spring Boot','Flutter','SwiftUI','Jetpack Compose'];
 
  let targetEl = toolsEl;
  if (langKeywords.includes(keyword) && langsEl) targetEl = langsEl;
  else if (fwKeywords.includes(keyword) && fwEl) targetEl = fwEl;
 
  if (targetEl) {
    const current = targetEl.value.trim();
    targetEl.value = current ? current + ', ' + keyword : keyword;
  }
 
  // Mark as added
  el.classList.add('added');
  el.innerHTML = '✓ ' + keyword;
 
  updatePreview();
  showToast(`✅ "${keyword}" added to resume!`);
}
 
function addAllKeywords() {
  const role = document.getElementById('ks-role')?.value;
  if (!role) return;
 
  const must = IT_KEYWORDS[role]?.must || [];
  must.forEach(k => {
    const tags = document.querySelectorAll('.ks-tag.must');
    tags.forEach(t => {
      if (t.textContent.includes(k) && !t.classList.contains('added')) {
        addKeyword(t, k);
      }
    });
  });
  showToast(`✅ All must-have keywords added!`);
}
 
async function aiKeywordSuggest() {
  const role    = document.getElementById('ks-role')?.value || 'developer';
  const resume  = typeof getResumeText === 'function' ? getResumeText() :
    (document.getElementById('resumeWrapper')?.innerText || '');
 
  document.getElementById('ksResult').style.display = 'block';
  document.getElementById('ksResultContent').innerHTML =
    `<div style="display:flex;align-items:center;gap:10px;padding:10px;color:var(--muted)">
      <i class="fa fa-spinner fa-spin"></i> AI analysing your resume keywords...
    </div>`;
 
  try {
    const prompt = `Analyse this resume and tell which important ${role} keywords are MISSING.
Resume: ${resume.substring(0, 1000)}
Role: ${role}
 
Format EXACTLY:
MISSING CRITICAL: keyword1, keyword2, keyword3
MISSING GOOD: keyword1, keyword2
ALREADY HAS: keyword1, keyword2
ATS_SCORE_IMPROVEMENT: +X% if these keywords added`;
 
    const result = typeof callClaudeAPI === 'function'
      ? await callClaudeAPI(prompt)
      : '⚠️ AI not connected';
 
    const missing  = result.match(/MISSING CRITICAL:\s*([^\n]+)/)?.[1] || '';
    const good     = result.match(/MISSING GOOD:\s*([^\n]+)/)?.[1] || '';
    const has      = result.match(/ALREADY HAS:\s*([^\n]+)/)?.[1] || '';
    const boost    = result.match(/ATS_SCORE_IMPROVEMENT:\s*([^\n]+)/)?.[1] || '';
 
    document.getElementById('ksResultContent').innerHTML = `
      ${boost ? `<div style="padding:8px 12px;background:rgba(52,211,153,.1);border:1px solid rgba(52,211,153,.25);border-radius:8px;font-size:.82rem;color:var(--green);margin-bottom:10px;font-weight:700">
        📈 Adding missing keywords boosts ATS score by ${boost}
      </div>` : ''}
      ${missing ? `<div style="margin-bottom:8px">
        <div class="ks-sec-title"><span class="ks-dot must"></span> Missing Critical</div>
        <div class="ks-tags">${missing.split(',').map(k => k.trim()).filter(Boolean).map(k =>
          `<span class="ks-tag must" onclick="quickAddKeyword('${k.trim()}')" style="cursor:pointer">+ ${k.trim()}</span>`).join('')}</div>
      </div>` : ''}
      ${good ? `<div style="margin-bottom:8px"
