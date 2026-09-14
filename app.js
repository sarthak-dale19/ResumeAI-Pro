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
let currentTemplate = 'clean';

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

/* ---------- LIVE PREVIEW ---------- */
function updatePreview() {
  const data = collectData();
  const wrapper = document.getElementById('resumeWrapper');
  if (!wrapper) return;

  let html = '';
  if (currentTemplate === 'modern') html = buildModernTemplate(data);
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

    const data = await response.json();
    const text = data.content?.map(b => b.text || '').join('') || 'No response from AI.';

    document.getElementById('aiThinking').style.display = 'none';
    document.getElementById('aiResult').style.display = 'block';
    document.getElementById('aiOutput').textContent = text;
    window._aiLastResult = text;

  } catch (err) {
    document.getElementById('aiThinking').style.display = 'none';
    document.getElementById('aiResult').style.display = 'block';
    document.getElementById('aiOutput').textContent = '⚠️ Could not connect to AI. Please check your API key is configured in the server, or try again.\n\nTip: This feature requires an Anthropic API key. See README.md for setup instructions.';
    window._aiLastResult = '';
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
  return `
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
  const response = await fetch("/api/claude", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1500,
      messages: [{ role: "user", content: prompt }]
    })
  });
  const data = await response.json();
  return data.content?.map(b => b.text || '').join('') || 'No response.';
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
      ${good ? `<div style="margin-bottom:8px">
        <div class="ks-sec-title"><span class="ks-dot good"></span> Missing Good-to-Have</div>
        <div class="ks-tags">${good.split(',').map(k => k.trim()).filter(Boolean).map(k =>
          `<span class="ks-tag good" onclick="quickAddKeyword('${k.trim()}')" style="cursor:pointer">+ ${k.trim()}</span>`).join('')}</div>
      </div>` : ''}
      ${has ? `<div>
        <div class="ks-sec-title"><span class="ks-dot trending"></span> Already in Resume ✓</div>
        <div class="ks-tags">${has.split(',').map(k => k.trim()).filter(Boolean).map(k =>
          `<span class="ks-tag" style="background:rgba(52,211,153,.08);color:var(--green);border:1px solid rgba(52,211,153,.2);cursor:default">✓ ${k.trim()}</span>`).join('')}</div>
      </div>` : ''}`;
  } catch(e) {
    document.getElementById('ksResultContent').textContent = '⚠️ AI not connected';
  }
}
 
function quickAddKeyword(keyword) {
  const el = document.getElementById('tools');
  if (el) {
    el.value = el.value ? el.value + ', ' + keyword : keyword;
    updatePreview();
    showToast(`✅ "${keyword}" added!`);
  }
}
 
 
/* ════════════════════════════════════════════════════
   FEATURE 3 — GRAMMAR CHECKER
   ════════════════════════════════════════════════════ */
 
let _grammarFixes = [];
 
async function checkGrammar() {
  const summary  = document.getElementById('summary')?.value || '';
  const jobTitle = document.getElementById('jobTitle')?.value || '';
  const fullText = [summary, jobTitle].filter(Boolean).join('\n\n');
 
  if (!fullText.trim()) {
    showToast('⚠️ Write something in Summary first!');
    return;
  }
 
  document.getElementById('grammarResult').style.display = 'block';
  document.getElementById('grIssues').innerHTML =
    `<div style="display:flex;align-items:center;gap:8px;color:var(--muted);font-size:.82rem;padding:10px">
      <i class="fa fa-spinner fa-spin"></i> Checking grammar and English...
    </div>`;
  document.getElementById('grScore').textContent = '...';
 
  try {
    const prompt = `You are an expert English grammar checker for professional resumes.
 
Check this resume text for grammar, spelling, and professional English:
"${fullText}"
 
Respond in EXACTLY this format:
SCORE: [0-100]
LABEL: [Excellent/Good/Needs Work/Poor]
 
ISSUES:
- TYPE: [Grammar/Spelling/Style/Weak Word]
  ORIGINAL: [exact problematic phrase]
  FIX: [corrected version]
  REASON: [brief explanation]
 
IMPROVED_VERSION:
[Complete improved text]
 
Be specific and helpful. Focus on professional resume language.`;
 
    const result = typeof callClaudeAPI === 'function'
      ? await callClaudeAPI(prompt)
      : null;
 
    if (!result) {
      // Fallback: basic local grammar checks
      runLocalGrammarCheck(fullText);
      return;
    }
 
    // Parse result
    const score  = parseInt(result.match(/SCORE:\s*(\d+)/)?.[1] || '75');
    const label  = result.match(/LABEL:\s*([^\n]+)/)?.[1] || 'Good';
    const improved = result.match(/IMPROVED_VERSION:\s*([\s\S]+)$/)?.[1]?.trim() || '';
 
    _grammarFixes = [{ improved, field: 'summary' }];
 
    // Parse issues
    const issueBlocks = result.match(/- TYPE:[\s\S]*?(?=- TYPE:|IMPROVED_VERSION:|$)/g) || [];
    const issues = issueBlocks.map(block => ({
      type:     block.match(/TYPE:\s*([^\n]+)/)?.[1]?.trim() || 'Issue',
      original: block.match(/ORIGINAL:\s*([^\n]+)/)?.[1]?.trim() || '',
      fix:      block.match(/FIX:\s*([^\n]+)/)?.[1]?.trim() || '',
      reason:   block.match(/REASON:\s*([^\n]+)/)?.[1]?.trim() || '',
    })).filter(i => i.original);
 
    // Update score display
    const scoreEl = document.getElementById('grScore');
    const color   = score >= 80 ? '#34d399' : score >= 60 ? '#fbbf24' : '#f87171';
    scoreEl.textContent = score;
    scoreEl.style.color = color;
 
    const labelEl = document.getElementById('grScoreLabel');
    if (labelEl) {
      labelEl.textContent = label;
      labelEl.style.color = color;
    }
 
    // Render issues
    if (issues.length === 0) {
      document.getElementById('grIssues').innerHTML =
        `<div class="gr-issue ok"><div class="gi-type">✅ All Good</div>
        <div class="gi-original">No major grammar issues found!</div></div>`;
    } else {
      document.getElementById('grIssues').innerHTML = issues.map(issue => `
        <div class="gr-issue ${issue.type === 'Style' ? 'suggestion' : ''}">
          <div class="gi-type">${issue.type}</div>
          <div class="gi-original">❌ <span>${issue.original}</span></div>
          <div class="gi-fix">✅ <span>${issue.fix}</span></div>
          <div style="font-size:.72rem;color:var(--muted);margin-top:3px">${issue.reason}</div>
        </div>`).join('');
    }
 
  } catch(e) {
    runLocalGrammarCheck(fullText);
  }
}
 
// Fallback local grammar check (no AI needed)
function runLocalGrammarCheck(text) {
  const issues  = [];
  let score     = 100;
 
  // Check weak words
  const weakWords = {
    'responsible for': 'Led / Managed',
    'worked on':       'Developed / Built',
    'helped with':     'Contributed to / Supported',
    'good at':         'Proficient in / Expert in',
    'did':             'Delivered / Executed',
    'made':            'Developed / Created',
    'used':            'Utilized / Leveraged',
  };
  Object.entries(weakWords).forEach(([weak, strong]) => {
    if (text.toLowerCase().includes(weak)) {
      issues.push({
        type: 'Weak Word', original: weak, fix: strong,
        reason: 'Use stronger action verbs'
      });
      score -= 8;
    }
  });
 
  // Check passive voice patterns
  if (/was (done|made|built|created) by/i.test(text)) {
    issues.push({
      type: 'Style',
      original: 'Passive voice detected',
      fix: 'Use active voice',
      reason: 'Active voice sounds more confident'
    });
    score -= 5;
  }
 
  // Check for missing capital at sentence start
  const sentences = text.split(/[.!?]\s+/);
  sentences.forEach(s => {
    if (s.length > 2 && s[0] !== s[0].toUpperCase()) {
      issues.push({
        type: 'Grammar',
        original: `"${s.substring(0,30)}..."`,
        fix: 'Start sentence with capital letter',
        reason: 'Sentences must start with capital'
      });
      score -= 5;
    }
  });
 
  score = Math.max(20, Math.min(100, score));
  const label = score >= 80 ? 'Good' : score >= 60 ? 'Needs Work' : 'Poor';
  const color = score >= 80 ? '#34d399' : score >= 60 ? '#fbbf24' : '#f87171';
 
  document.getElementById('grScore').textContent = score;
  document.getElementById('grScore').style.color = color;
  const labelEl = document.getElementById('grScoreLabel');
  if (labelEl) { labelEl.textContent = label; labelEl.style.color = color; }
 
  if (issues.length === 0) {
    document.getElementById('grIssues').innerHTML =
      `<div class="gr-issue ok"><div class="gi-type">✅ Great Writing!</div>
      <div class="gi-original">No major issues found.</div></div>`;
  } else {
    document.getElementById('grIssues').innerHTML = issues.map(i => `
      <div class="gr-issue ${i.type === 'Style' ? 'suggestion' : ''}">
        <div class="gi-type">${i.type}</div>
        <div class="gi-original">❌ <span>${i.original}</span></div>
        <div class="gi-fix">✅ Better: <span>${i.fix}</span></div>
        <div style="font-size:.72rem;color:var(--muted);margin-top:3px">${i.reason}</div>
      </div>`).join('');
  }
}
 
function applyGrammarFix() {
  if (!_grammarFixes.length) {
    showToast('⚠️ Run grammar check first!');
    return;
  }
  _grammarFixes.forEach(fix => {
    if (fix.improved && fix.field) {
      const el = document.getElementById(fix.field);
      if (el && fix.improved) {
        el.value = fix.improved;
      }
    }
  });
  updatePreview();
  showToast('✅ Grammar fixes applied!');
}
 
 
/* ════════════════════════════════════════════════════
   FEATURE 5 — PROJECT TIME DURATION
   Updates the addProject() function
   Replace your existing addProject() with this
   ════════════════════════════════════════════════════ */
 
// REPLACE your existing addProject() function with this:
function addProject() {
  const id = ++projCount;
  const div = document.createElement('div');
  div.className = 'entry-card';
  div.id = 'proj' + id;
  div.innerHTML = `
    <button class="remove-btn" onclick="removeEntry('proj${id}')">
      <i class="fa fa-times"></i>
    </button>
    <div class="form-grid">
      <div class="field">
        <label>Project Name</label>
        <input type="text" placeholder="AI Resume Builder"
          oninput="updatePreview()" data-proj="${id}" data-field="name"/>
      </div>
      <div class="field">
        <label>Tech Stack</label>
        <input type="text" placeholder="React, Firebase, Claude AI"
          oninput="updatePreview()" data-proj="${id}" data-field="tech"/>
      </div>
      <div class="field">
        <label>Start Date</label>
        <input type="month" oninput="calcDuration(${id})"
          data-proj="${id}" data-field="startdate" id="pstart${id}"/>
      </div>
      <div class="field">
        <label>End Date</label>
        <input type="month" placeholder="Leave blank if ongoing"
          oninput="calcDuration(${id})"
          data-proj="${id}" data-field="enddate" id="pend${id}"/>
      </div>
      <div class="field">
        <label>Duration</label>
        <input type="text" readonly placeholder="Auto calculated"
          data-proj="${id}" data-field="duration"
          id="pduration${id}"
          style="background:rgba(52,211,153,.06);
          border-color:rgba(52,211,153,.2);
          color:var(--green);font-weight:600"/>
      </div>
      <div class="field">
        <label>GitHub / Live Link</label>
        <input type="url" placeholder="github.com/you/project"
          oninput="updatePreview()" data-proj="${id}" data-field="link"/>
      </div>
      <div class="field full">
        <label>Description</label>
        <textarea rows="3"
          placeholder="What it does, impact, key features..."
          oninput="updatePreview()"
          data-proj="${id}" data-field="desc"></textarea>
      </div>
    </div>`;
  document.getElementById('proj-list').appendChild(div);
}
 
// Duration calculator
function calcDuration(id) {
  const startEl    = document.getElementById('pstart' + id);
  const endEl      = document.getElementById('pend' + id);
  const durationEl = document.getElementById('pduration' + id);
 
  if (!startEl || !durationEl) return;
 
  const startVal = startEl.value;
  if (!startVal) { durationEl.value = ''; return; }
 
  const start = new Date(startVal + '-01');
  const end   = endEl?.value ? new Date(endEl.value + '-01') : new Date();
 
  const months = (end.getFullYear() - start.getFullYear()) * 12
               + (end.getMonth() - start.getMonth());
 
  if (months < 0) {
    durationEl.value = 'Invalid dates';
    return;
  }
 
  let duration = '';
  if (months < 1)       duration = 'Less than 1 month';
  else if (months === 1) duration = '1 month';
  else if (months < 12)  duration = months + ' months';
  else {
    const years  = Math.floor(months / 12);
    const rem    = months % 12;
    duration = years + (years === 1 ? ' year' : ' years');
    if (rem > 0) duration += ' ' + rem + (rem === 1 ? ' month' : ' months');
  }
 
  if (!endEl?.value) duration += ' (Ongoing)';
 
  // Update data-field="duration" input
  const dataEl = document.querySelector(
    `[data-proj="${id}"][data-field="duration"]`);
  if (dataEl) dataEl.value = duration;
 
  durationEl.value = duration;
  updatePreview();
}
 
 
/* ════════════════════════════════════════════════════
   FEATURE 4 — LIVE AI INTERVIEW SIMULATOR
   ════════════════════════════════════════════════════ */
 
// ── STATE ──
let _interview = {
  active:     false,
  questions:  [],
  current:    0,
  answers:    [],
  scores:     { eye: [], posture: [], expression: [], content: [], grammar: [] },
  stream:     null,
  recognition:null,
  transcript: '',
  timerInterval: null,
  seconds:    0,
  faceModel:  null,
  faceDetecting: false,
};
 
// ── OPEN / CLOSE ──
function openLiveInterview() {
  document.getElementById('interviewModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeInterview() {
  stopInterviewCleanup();
  document.getElementById('interviewModal').classList.remove('open');
  document.body.style.overflow = '';
  showToast('Interview session ended');
}
 
// ── INIT: Request camera + generate questions ──
async function initInterview() {
  const setupEl = document.getElementById('imSetup');
  setupEl.innerHTML = `
    <div class="setup-icon">⏳</div>
    <h3>Setting up interview...</h3>
    <p style="color:var(--muted)">Requesting camera & microphone access</p>`;
 
  try {
    // Request camera + mic
    _interview.stream = await navigator.mediaDevices.getUserMedia({
      video: { width: 1280, height: 720, facingMode: 'user' },
      audio: true
    });
 
    const video = document.getElementById('interviewVideo');
    video.srcObject = _interview.stream;
 
    // Load face detection (face-api.js via CDN)
    setupEl.innerHTML = `
      <div class="setup-icon">🤖</div>
      <h3>Loading AI models...</h3>
      <p style="color:var(--muted)">Preparing face detection & question generation</p>`;
 
    await loadFaceModels();
 
    // Generate questions using AI
    setupEl.innerHTML = `
      <div class="setup-icon">📝</div>
      <h3>Generating your questions...</h3>
      <p style="color:var(--muted)">AI creating personalised questions from your resume</p>`;
 
    await generateInterviewQuestions();
 
    // Setup speech recognition
    setupSpeechRecognition();
 
    // Start face detection loop
    startFaceDetection();
 
    // Show interview UI
    document.getElementById('imSetup').style.display    = 'none';
    document.getElementById('imInterview').style.display = 'flex';
    document.getElementById('imInterview').style.flexDirection = 'column';
    document.getElementById('imInterview').style.gap = '12px';
 
    // Enable buttons
    document.getElementById('startBtn').disabled  = false;
    document.getElementById('micBtn').disabled    = false;
    document.getElementById('nextQBtn').disabled  = false;
 
    // Show first question
    displayQuestion(0);
    showToast('✅ Interview ready! Click Start when ready.');
 
  } catch(err) {
    setupEl.innerHTML = `
      <div class="setup-icon">❌</div>
      <h3>Camera Access Denied</h3>
      <p style="color:var(--red)">Please allow camera and microphone access in browser settings, then try again.</p>
      <button class="setup-start-btn" style="background:var(--card2);border:1px solid var(--border2);color:var(--muted)" onclick="document.getElementById('imSetup').innerHTML = ''">
        Try Again
      </button>`;
    console.error('Camera error:', err);
  }
}
 
// ── LOAD FACE MODELS ──
async function loadFaceModels() {
  try {
    // Load face-api.js from CDN
    if (!window.faceapi) {
      await loadScript('https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/dist/face-api.min.js');
    }
    const MODEL_URL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api@1.7.12/model/';
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
    ]);
    _interview.faceModel = true;
  } catch(e) {
    console.warn('Face model load failed, using simulation:', e);
    _interview.faceModel = false;
  }
}
 
function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve(); return;
    }
    const s = document.createElement('script');
    s.src = src; s.onload = resolve; s.onerror = reject;
    document.head.appendChild(s);
  });
}
 
// ── GENERATE QUESTIONS ──
async function generateInterviewQuestions() {
  const type  = document.getElementById('im-type')?.value  || 'Mixed';
  const diff  = document.getElementById('im-diff')?.value  || 'Easy';
  const count = document.getElementById('im-count')?.value || '10';
  const resume = typeof getResumeText === 'function' ? getResumeText() : '';
 
  try {
    const prompt = `Generate exactly ${count} interview questions for this candidate.
Type: ${type} | Difficulty: ${diff}
Resume: ${resume.substring(0, 800)}
 
Format EXACTLY (repeat for each question):
Q[n]|[Category]|[Question]|[Ideal Answer in 2-3 sentences]
 
Example:
Q1|Technical|Explain REST APIs|REST APIs use HTTP methods to create stateless communication between client and server. They follow principles like uniform interface and cacheable responses.
 
Generate all ${count} questions in this exact pipe-separated format.`;
 
    const result = typeof callClaudeAPI === 'function'
      ? await callClaudeAPI(prompt)
      : null;
 
    if (result) {
      const lines = result.split('\n').filter(l => l.match(/^Q\d+\|/));
      _interview.questions = lines.map(line => {
        const parts = line.split('|');
        return {
          num:      parts[0] || 'Q1',
          category: parts[1] || 'General',
          question: parts[2] || 'Tell me about yourself',
          ideal:    parts[3] || 'Provide a clear, structured answer.',
        };
      });
    }
 
    // Fallback questions if AI fails
    if (!_interview.questions.length) {
      _interview.questions = [
        { num:'Q1', category:'HR', question:'Tell me about yourself.', ideal:'Give a 2-minute structured introduction covering education, experience, skills, and career goals.' },
        { num:'Q2', category:'Technical', question:'What are your core technical skills?', ideal:'Mention your strongest programming languages, frameworks, and tools with specific examples of projects.' },
        { num:'Q3', category:'Behavioral', question:'Describe a challenging project you worked on.', ideal:'Use the STAR method - Situation, Task, Action, Result. Focus on your specific contribution and the outcome.' },
        { num:'Q4', category:'Technical', question:'Explain Object Oriented Programming concepts.', ideal:'Cover the four pillars: Encapsulation, Abstraction, Inheritance, and Polymorphism with simple examples.' },
        { num:'Q5', category:'HR', question:'Where do you see yourself in 5 years?', ideal:'Show ambition aligned with the company. Mention skill development, leadership, and long-term contribution.' },
      ];
    }
 
    document.getElementById('qTotal').textContent = _interview.questions.length;
  } catch(e) {
    console.error('Question generation failed:', e);
  }
}
 
// ── DISPLAY QUESTION ──
function displayQuestion(index) {
  const q = _interview.questions[index];
  if (!q) return;
 
  document.getElementById('iqCategory').textContent = q.category;
  document.getElementById('iqText').textContent     = q.question;
  document.getElementById('qNum').textContent       = index + 1;
  document.getElementById('impFill').style.width    =
    ((index + 1) / _interview.questions.length * 100) + '%';
 
  // Clear transcript
  document.getElementById('imtText').textContent =
    'Click mic button and speak your answer...';
  document.getElementById('imtText').style.fontStyle = 'italic';
  _interview.transcript = '';
 
  // Auto speak question
  setTimeout(() => speakQuestion(), 500);
}
 
// ── TEXT TO SPEECH ──
function speakQuestion() {
  const text = document.getElementById('iqText')?.textContent;
  if (!text || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.rate = 0.9; utt.pitch = 1;
  const voices = speechSynthesis.getVoices();
  const enVoice = voices.find(v => v.lang.startsWith('en'));
  if (enVoice) utt.voice = enVoice;
  speechSynthesis.speak(utt);
}
 
// ── SPEECH RECOGNITION ──
function setupSpeechRecognition() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    showToast('⚠️ Speech recognition not supported in this browser. Use Chrome.');
    return;
  }
  const recog = new SpeechRecognition();
  recog.continuous    = true;
  recog.interimResults= true;
  recog.lang          = 'en-US';
 
  recog.onresult = event => {
    let interim = '', final = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const t = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        final   += t;
        _interview.transcript += ' ' + t;
      } else {
        interim += t;
      }
    }
    const display = (_interview.transcript + ' ' + interim).trim();
    const el = document.getElementById('imtText');
    if (el) {
      el.textContent  = display || 'Listening...';
      el.style.fontStyle = 'normal';
    }
    const statusEl = document.getElementById('imtStatus');
    if (statusEl) statusEl.textContent = interim ? '🎤 Listening...' : '✅ Recording';
  };
 
  recog.onerror = e => {
    if (e.error !== 'no-speech') {
      const statusEl = document.getElementById('imtStatus');
      if (statusEl) statusEl.textContent = '⚠️ Mic error: ' + e.error;
    }
  };
  _interview.recognition = recog;
}
 
let _micActive = false;
function toggleMic() {
  if (!_interview.recognition) return;
  _micActive = !_micActive;
  const btn = document.getElementById('micBtn');
  const rec  = document.getElementById('recordingBadge');
 
  if (_micActive) {
    _interview.recognition.start();
    btn?.classList.add('active');
    if (rec) rec.style.display = 'flex';
    animateAudioBars();
    const statusEl = document.getElementById('imtStatus');
    if (statusEl) statusEl.textContent = '🎤 Listening... speak now';
    document.getElementById('submitAnsBtn').disabled = false;
  } else {
    _interview.recognition.stop();
    btn?.classList.remove('active');
    if (rec) rec.style.display = 'none';
    stopAudioBars();
    const statusEl = document.getElementById('imtStatus');
    if (statusEl) statusEl.textContent = '⏸️ Paused';
  }
}
 
// ── AUDIO VISUALIZER ──
let _audioInterval = null;
function animateAudioBars() {
  const bars = document.querySelectorAll('.av-bar');
  _audioInterval = setInterval(() => {
    bars.forEach(b => {
      b.style.height = (Math.random() * 28 + 4) + 'px';
    });
  }, 100);
}
function stopAudioBars() {
  clearInterval(_audioInterval);
  document.querySelectorAll('.av-bar').forEach(b => b.style.height = '6px');
}
 
// ── FACE DETECTION ──
function startFaceDetection() {
  if (_interview.faceModel && window.faceapi) {
    realFaceDetection();
  } else {
    simulatedFaceDetection();
  }
}
 
async function realFaceDetection() {
  const video  = document.getElementById('interviewVideo');
  const canvas = document.getElementById('faceCanvas');
  _interview.faceDetecting = true;
 
  const detect = async () => {
    if (!_interview.faceDetecting) return;
    try {
      const detections = await faceapi
        .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();
 
      if (detections) {
        const { box } = detections.detection;
 
        // Show face box
        const fiBox = document.getElementById('fiBox');
        if (fiBox) {
          fiBox.style.display = 'block';
          fiBox.style.left    = (box.x / video.videoWidth * 100) + '%';
          fiBox.style.top     = (box.y / video.videoHeight * 100) + '%';
          fiBox.style.width   = (box.width / video.videoWidth * 100) + '%';
          fiBox.style.height  = (box.height / video.videoHeight * 100) + '%';
        }
 
        // Calculate eye contact (face centered = looking at camera)
        const centerX    = (box.x + box.width/2) / video.videoWidth;
        const eyeScore   = Math.round(100 - Math.abs(centerX - 0.5) * 150);
        const eyeScoreC  = Math.max(0, Math.min(100, eyeScore));
 
        // Posture (face vertical position)
        const centerY      = (box.y + box.height/2) / video.videoHeight;
        const postureScore = Math.round(100 - Math.abs(centerY - 0.35) * 200);
        const postureScoreC = Math.max(0, Math.min(100, postureScore));
 
        // Expression (happy/neutral = confident)
        const expr   = detections.expressions;
        const confExpr = Math.round(
          ((expr.happy || 0) + (expr.neutral || 0)) * 100
        );
 
        updateMetrics(eyeScoreC, postureScoreC, confExpr);
        _interview.scores.eye.push(eyeScoreC);
        _interview.scores.posture.push(postureScoreC);
        _interview.scores.expression.push(confExpr);
 
        updateRealtimeFeedback(eyeScoreC, postureScoreC);
      } else {
        // No face detected
        updateRealtimeFeedback(0, 0, 'No face detected');
      }
    } catch(e) {}
 
    if (_interview.faceDetecting) {
      requestAnimationFrame(detect);
    }
  };
  detect();
}
 
function simulatedFaceDetection() {
  // Simulated values when face-api fails to load
  let eyeBase = 75, postureBase = 80;
  setInterval(() => {
    if (!_interview.active) return;
    const eye     = Math.max(40, Math.min(100, eyeBase     + (Math.random()-0.5)*20));
    const posture = Math.max(50, Math.min(100, postureBase + (Math.random()-0.5)*15));
    const conf    = Math.max(50, Math.min(100, 70           + (Math.random()-0.5)*25));
 
    updateMetrics(eye, posture, conf);
    _interview.scores.eye.push(eye);
    _interview.scores.posture.push(posture);
    _interview.scores.expression.push(conf);
    updateRealtimeFeedback(eye, posture);
  }, 1500);
}
 
function updateMetrics(eye, posture, expr) {
  document.getElementById('eyeFill').style.width     = eye + '%';
  document.getElementById('postureFill').style.width  = posture + '%';
  document.getElementById('confFill').style.width     = expr + '%';
  document.getElementById('eyeScore').textContent     = eye + '%';
  document.getElementById('postureScore').textContent = posture + '%';
  document.getElementById('confScore').textContent    = expr + '%';
}
 
function updateRealtimeFeedback(eye, posture, msg) {
  const eyeEl = document.getElementById('irtEye');
  const posEl = document.getElementById('irtPosture');
  if (msg) {
    if (eyeEl) { eyeEl.textContent = '👁 ' + msg; eyeEl.className = 'irt-item bad'; }
    return;
  }
  if (eyeEl) {
    const good = eye >= 65;
    eyeEl.className = 'irt-item ' + (good ? 'good' : 'bad');
    eyeEl.innerHTML = `<i class="fa fa-eye"></i>
      Eye contact: ${good ? '✅ Good (' + eye + '%)' : '⚠️ Look at camera (' + eye + '%)'}`;
  }
  if (posEl) {
    const good = posture >= 65;
    posEl.className = 'irt-item ' + (good ? 'good' : 'bad');
    posEl.innerHTML = `<i class="fa fa-user"></i>
      Posture: ${good ? '✅ Good (' + posture + '%)' : '⚠️ Sit straight (' + posture + '%)'}`;
  }
}
 
// ── START INTERVIEW ──
function startInterview() {
  _interview.active  = true;
  _interview.seconds = 0;
  document.getElementById('startBtn').disabled = true;
 
  // Start timer
  _interview.timerInterval = setInterval(() => {
    _interview.seconds++;
    const m = String(Math.floor(_interview.seconds/60)).padStart(2,'0');
    const s = String(_interview.seconds % 60).padStart(2,'0');
    document.getElementById('interviewTimer').textContent = m + ':' + s;
  }, 1000);
  showToast('🎯 Interview started! Answer each question clearly.');
}
 
// ── SUBMIT ANSWER ──
async function submitAnswer() {
  const q      = _interview.questions[_interview.current];
  const answer = _interview.transcript.trim();
 
  if (!answer) {
    showToast('⚠️ Please speak your answer first!');
    return;
  }
 
  // Stop mic
  if (_micActive) toggleMic();
  document.getElementById('submitAnsBtn').disabled = true;
 
  // Show feedback loading
  document.getElementById('imInterview').style.display = 'none';
  document.getElementById('imFeedback').style.display  = 'flex';
  document.getElementById('imFeedback').style.flexDirection = 'column';
  document.getElementById('ifLoading').style.display   = 'flex';
  document.getElementById('ifContent').style.display   = 'none';
 
  // Calculate average scores so far
  const avgEye = avg(_interview.scores.eye);
  const avgPos = avg(_interview.scores.posture);
  const avgExp = avg(_interview.scores.expression);
 
  try {
    const prompt = `You are an expert interview coach. Evaluate this interview answer.
 
Question: "${q.question}"
Candidate's Answer: "${answer}"
Ideal Answer: "${q.ideal}"
 
Analyse and respond in EXACTLY this format:
CONTENT_SCORE: [0-100]
GRAMMAR_SCORE: [0-100]
ANSWER_MATCH: [0-100]
 
STRENGTHS:
- [what they did well]
 
MISSING POINTS:
- [important point they missed]
 
GRAMMAR_ISSUES:
- [any grammar mistakes]
 
IMPROVEMENT_TIPS:
1. [specific tip]
2. [specific tip]
3. [specific tip]`;
 
    const result = typeof callClaudeAPI === 'function'
      ? await callClaudeAPI(prompt)
      : null;
 
    let contentScore = 70, grammarScore = 75, matchScore = 65;
    let strengths = [], missing = [], grammarIssues = [], tips = [];
 
    if (result) {
      contentScore = parseInt(result.match(/CONTENT_SCORE:\s*(\d+)/)?.[1]  || '70');
      grammarScore = parseInt(result.match(/GRAMMAR_SCORE:\s*(\d+)/)?.[1]  || '75');
      matchScore   = parseInt(result.match(/ANSWER_MATCH:\s*(\d+)/)?.[1]   || '65');
      strengths    = extractList(result, 'STRENGTHS');
      missing      = extractList(result, 'MISSING POINTS');
      grammarIssues= extractList(result, 'GRAMMAR_ISSUES');
      tips         = extractList(result, 'IMPROVEMENT_TIPS');
    }
 
    // Save answer data
    _interview.answers.push({
      question: q.question, answer, ideal: q.ideal,
      scores: { content: contentScore, grammar: grammarScore,
                eye: avgEye, posture: avgPos }
    });
    _interview.scores.content.push(contentScore);
    _interview.scores.grammar.push(grammarScore);
 
    // Update score displays
    animateScore('ifsContent', contentScore, '#4f8ef7');
    animateScore('ifsEye',     avgEye,        '#22d3ee');
    animateScore('ifsPosture', avgPos,         '#34d399');
    animateScore('ifsGrammar', grammarScore,   '#fbbf24');
 
    // Fill comparison
    document.getElementById('ifcYour').textContent  = answer;
    document.getElementById('ifcIdeal').textContent = q.ideal;
 
    // Fill suggestions
    const allTips = [...(missing.map(m => '⚠️ Missing: ' + m)),
                     ...tips.map(t => '💡 ' + t),
                     ...(grammarIssues.map(g => '✏️ Grammar: ' + g))];
    document.getElementById('ifSuggestions').innerHTML =
      `<div style="font-size:.76rem;font-weight:700;color:var(--muted);
        text-transform:uppercase;margin-bottom:8px">
        Improvement Tips
      </div>` +
      allTips.map(t => `<div class="ifs-tip"><i class="fa fa-arrow-right"></i>${t}</div>`)
        .join('');
 
    document.getElementById('ifLoading').style.display = 'none';
    document.getElementById('ifContent').style.display = 'flex';
 
  } catch(e) {
    // Show basic feedback on error
    document.getElementById('ifLoading').style.display = 'none';
    document.getElementById('ifContent').style.display = 'flex';
    document.getElementById('ifcYour').textContent  = answer;
    document.getElementById('ifcIdeal').textContent = q.ideal;
  }
}
 
function extractList(text, section) {
  const match = text.match(new RegExp(section + ':([\\s\\S]*?)(?=[A-Z_]+:|$)'));
  if (!match) return [];
  return match[1].split('\n').filter(l => l.trim().startsWith('-'))
    .map(l => l.replace(/^-\s*/, '').trim()).filter(Boolean);
}
 
function animateScore(id, target, color) {
  const el = document.getElementById(id);
  if (!el) return;
  const numEl = el.querySelector('.ifs-num');
  if (numEl) {
    numEl.style.color = color;
    let n = 0;
    const timer = setInterval(() => {
      n = Math.min(n + 2, target);
      numEl.textContent = n;
      if (n >= target) clearInterval(timer);
    }, 20);
  }
}
 
function avg(arr) {
  if (!arr.length) return 0;
  return Math.round(arr.reduce((a,b) => a+b, 0) / arr.length);
}
 
// ── NEXT QUESTION ──
function nextQuestion() {
  _interview.current++;
  _interview.transcript = '';
 
  // Reset UI
  document.getElementById('imFeedback').style.display  = 'none';
  document.getElementById('submitAnsBtn').disabled = false;
 
  if (_interview.current >= _interview.questions.length) {
    // Show final report
    showFinalReport();
    return;
  }
 
  document.getElementById('imInterview').style.display = 'flex';
  document.getElementById('imInterview').style.flexDirection = 'column';
  document.getElementById('imInterview').style.gap = '12px';
  displayQuestion(_interview.current);
}
 
// ── FINAL REPORT ──
async function showFinalReport() {
  document.getElementById('imInterview').style.display = 'none';
  document.getElementById('imFeedback').style.display  = 'none';
  document.getElementById('imReport').style.display    = 'flex';
  document.getElementById('imReport').style.flexDirection = 'column';
 
  const overall = Math.round((
    avg(_interview.scores.content)  * 0.35 +
    avg(_interview.scores.eye)      * 0.20 +
    avg(_interview.scores.posture)  * 0.15 +
    avg(_interview.scores.grammar)  * 0.30
  ));
 
  const color = overall >= 80 ? '#34d399' : overall >= 60 ? '#fbbf24' : '#f87171';
  const grade = overall >= 80 ? 'A' : overall >= 70 ? 'B' : overall >= 60 ? 'C' : 'D';
  const label = overall >= 80 ? 'Excellent!' : overall >= 70 ? 'Good Job!' :
                overall >= 60 ? 'Decent' : 'Needs Improvement';
 
  document.getElementById('irOverall').innerHTML = `
    <div style="font-family:var(--font-head);font-size:4rem;font-weight:800;color:${color}">
      ${grade}
    </div>
    <div style="font-size:1.1rem;font-weight:700;margin:4px 0">${label}</div>
    <div style="font-size:.85rem;color:var(--muted)">Overall Score: ${overall}/100</div>`;
 
  document.getElementById('irBreakdown').innerHTML = [
    { label:'Answer Quality',  score: avg(_interview.scores.content),    color:'#4f8ef7' },
    { label:'Eye Contact',     score: avg(_interview.scores.eye),         color:'#22d3ee' },
    { label:'Body Language',   score: avg(_interview.scores.posture),     color:'#34d399' },
    { label:'Grammar',         score: avg(_interview.scores.grammar),     color:'#fbbf24' },
  ].map(item => `
    <div class="irb-item">
      <div class="irb-num" style="color:${item.color}">${item.score}</div>
      <div class="irb-label">${item.label}</div>
    </div>`).join('');
 
  // AI final tips
  try {
    const prompt = `Based on this interview performance:
Overall: ${overall}%
Answer Quality: ${avg(_interview.scores.content)}%
Eye Contact: ${avg(_interview.scores.eye)}%
Grammar: ${avg(_interview.scores.grammar)}%
Questions answered: ${_interview.answers.length}
 
Give 4 specific improvement tips. Format:
TIP: [actionable advice]`;
 
    const result = typeof callClaudeAPI === 'function'
      ? await callClaudeAPI(prompt) : null;
 
    const tips = result
      ? result.split('\n').filter(l => l.startsWith('TIP:')).map(l => l.replace('TIP:','').trim())
      : ['Practice eye contact by looking at camera','Use STAR method for answers','Speak slowly and clearly','Research company before interview'];
 
    document.getElementById('irTips').innerHTML = `
      <div style="font-family:var(--font-head);font-size:.85rem;font-weight:700;margin-bottom:10px">
        📌 Top Improvement Areas
      </div>` +
      tips.map(t => `<div class="ifs-tip"><i class="fa fa-lightbulb" style="color:var(--gold)"></i>${t}</div>`)
        .join('');
  } catch(e) {}
 
  stopInterviewCleanup();
}
 
// ── DOWNLOAD REPORT ──
function downloadInterviewReport() {
  const report = `
INTERVIEW PERFORMANCE REPORT
Generated by ResumeAI Pro
==============================
Date: ${new Date().toLocaleDateString()}
Duration: ${Math.floor(_interview.seconds/60)}m ${_interview.seconds%60}s
Questions: ${_interview.answers.length}
 
SCORES:
Answer Quality:  ${avg(_interview.scores.content)}%
Eye Contact:     ${avg(_interview.scores.eye)}%
Body Language:   ${avg(_interview.scores.posture)}%
Grammar:         ${avg(_interview.scores.grammar)}%
 
QUESTION BY QUESTION:
${_interview.answers.map((a,i) => `
Q${i+1}: ${a.question}
Your Answer: ${a.answer}
Ideal Answer: ${a.ideal}
Content Score: ${a.scores.content}%
`).join('\n')}
`.trim();
 
  const blob = new Blob([report], { type: 'text/plain' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = 'Interview_Report.txt';
  a.click(); URL.revokeObjectURL(url);
  showToast('📄 Report downloaded!');
}
 
function resetInterview() {
  _interview = {
    active:false, questions:[], current:0, answers:[],
    scores:{ eye:[], posture:[], expression:[], content:[], grammar:[] },
    stream:null, recognition:null, transcript:'',
    timerInterval:null, seconds:0, faceModel:null, faceDetecting:false
  };
  document.getElementById('imSetup').style.display    = 'flex';
  document.getElementById('imInterview').style.display = 'none';
  document.getElementById('imFeedback').style.display  = 'none';
  document.getElementById('imReport').style.display    = 'none';
  document.getElementById('imSetup').innerHTML = `
    <div class="setup-icon">🎯</div>
    <h3>Ready for your AI Interview?</h3>
    <p>Configure settings and click Start</p>
    <div class="setup-options">
      <div class="so-row"><label>Interview Type</label>
        <select id="im-type"><option>Technical</option><option>HR / Behavioral</option><option>Mixed</option></select></div>
      <div class="so-row"><label>Difficulty</label>
        <select id="im-diff"><option>Easy (Fresher)</option><option>Medium (1-3 years)</option><option>Hard (Senior)</option></select></div>
      <div class="so-row"><label>Questions</label>
        <select id="im-count"><option value="5">5 Questions</option><option value="10" selected>10 Questions</option></select></div>
    </div>
    <button class="setup-start-btn" onclick="initInterview()">
      <i class="fa fa-video"></i> Allow Camera & Start Interview
    </button>`;
}
 
function stopInterviewCleanup() {
  _interview.faceDetecting = false;
  _interview.active = false;
  clearInterval(_interview.timerInterval);
  stopAudioBars();
  if (_micActive) { _micActive = false; _interview.recognition?.stop(); }
  if (_interview.stream) {
    _interview.stream.getTracks().forEach(t => t.stop());
    _interview.stream = null;
  }
  window.speechSynthesis?.cancel();
}
/* ============================================================
   HYPERLINKS FEATURE — JS
   Paste at the BOTTOM of app.js
   ============================================================ */

// ── HELPER: get value ──
function gv(id) {
  return (document.getElementById(id)?.value || '').trim();
}

// ── UPDATE liveUpdate to include new fields ──
// Your existing liveUpdate/updatePreview already
// calls collectData — just make sure these IDs
// are included in your collectData function:
// leetcode, gfg, leet-solved, leet-easy,
// leet-medium, leet-hard, gfg-score,
// gfg-solved, gfg-rank, gfg-streak


// ── BUILD HYPERLINKED CONTACT LINE ──
// Use this inside your resume template builders
// to replace plain contact text with clickable links

function buildContactLinks(p) {
  const items = [];

  if (p.email)
    items.push(`<a href="mailto:${p.email}"
      class="r-link" title="Send Email">
      ✉ ${p.email}</a>`);

  if (p.phone)
    items.push(`<a href="tel:${p.phone}"
      class="r-link" title="Call">
      📞 ${p.phone}</a>`);

  if (p.location)
    items.push(`<span>📍 ${p.location}</span>`);

  if (p.linkedin)
    items.push(`<a href="${formatURL(p.linkedin)}"
      class="r-link li"
      target="_blank"
      title="LinkedIn Profile">
      🔗 LinkedIn</a>`);

  if (p.github)
    items.push(`<a href="${formatURL(p.github)}"
      class="r-link gh"
      target="_blank"
      title="GitHub Profile">
      💻 GitHub</a>`);

  if (gv('leetcode'))
    items.push(`<a href="javascript:void(0)"
      class="r-link leet"
      onclick="openLeetCodeModal(event)"
      title="LeetCode Profile">
      ⚡ LeetCode</a>`);

  if (gv('gfg'))
    items.push(`<a href="javascript:void(0)"
      class="r-link gfg"
      onclick="openGFGModal(event)"
      title="GeeksForGeeks Profile">
      🌿 GFG</a>`);

  return items.join(' &nbsp;|&nbsp; ');
}

function formatURL(url) {
  if (!url) return '#';
  if (url.startsWith('http')) return url;
  return 'https://' + url;
}


// ── BUILD CODING ACHIEVEMENT BADGES ──
function buildCodingBadges() {
  const leetURL  = gv('leetcode');
  const gfgURL   = gv('gfg');
  const solved   = gv('leet-solved');
  const gScore   = gv('gfg-score');

  if (!leetURL && !gfgURL) return '';

  let html = '<div class="r-coding-badges">';

  if (leetURL && solved)
    html += `<a href="javascript:void(0)"
      class="r-badge leet"
      onclick="openLeetCodeModal(event)">
      ⚡ LeetCode: ${solved} solved
    </a>`;
  else if (leetURL)
    html += `<a href="javascript:void(0)"
      class="r-badge leet"
      onclick="openLeetCodeModal(event)">
      ⚡ LeetCode Profile
    </a>`;

  if (gfgURL && gScore)
    html += `<a href="javascript:void(0)"
      class="r-badge gfg"
      onclick="openGFGModal(event)">
      🌿 GFG Score: ${gScore}
    </a>`;
  else if (gfgURL)
    html += `<a href="javascript:void(0)"
      class="r-badge gfg"
      onclick="openGFGModal(event)">
      🌿 GeeksForGeeks Profile
    </a>`;

  html += '</div>';
  return html;
}


// ── MAKE EDUCATION NAMES CLICKABLE ──
function buildEduHTML(eduList) {
  return eduList.map(e => {
    if (!e.degree && !e.school) return '';

    // Build Google search URL for institution
    const searchURL = e.school
      ? `https://www.google.com/search?q=${encodeURIComponent(e.school + ' official website')}`
      : '#';

    return `
      <div class="ri">
        <div class="rih">
          <span class="rit">${e.degree || ''}</span>
          <span class="rid">
            ${e.start || ''}${e.end ? ' – ' + e.end : ''}
          </span>
        </div>
        <a href="javascript:void(0)"
          class="r-edu-link ris"
          onclick="openCollegeModal('${escapeStr(e.school)}','${escapeStr(e.loc)}','${searchURL}')"
          title="View Institution">
          ${e.school || ''}
          ${e.loc ? ' | ' + e.loc : ''}
        </a>
        ${e.grade
          ? `<div class="ridesc"
              style="font-size:.7rem;color:#888">
              ${e.grade}
            </div>`
          : ''}
      </div>`;
  }).join('');
}

function escapeStr(str) {
  return (str || '').replace(/'/g, "\\'").replace(/"/g, '\\"');
}


// ── PROFILE MODAL OPEN / CLOSE ──
function openProfileModal(title, url, bodyHTML) {
  document.getElementById('pmTitle').innerHTML = title;
  document.getElementById('pmVisitBtn').href   = url || '#';
  document.getElementById('pmVisitBtn').style.display = url ? 'flex' : 'none';
  document.getElementById('pmBody').innerHTML  = bodyHTML;
  document.getElementById('profileOverlay').classList.add('open');
  document.getElementById('profileModal').classList.add('open');
}

function closeProfileModal() {
  document.getElementById('profileOverlay').classList.remove('open');
  document.getElementById('profileModal').classList.remove('open');
}


// ── LEETCODE MODAL ──
function openLeetCodeModal(event) {
  if (event) event.stopPropagation();

  const url    = gv('leetcode');
  const solved = gv('leet-solved') || '—';
  const easy   = parseInt(gv('leet-easy')   || 0);
  const medium = parseInt(gv('leet-medium') || 0);
  const hard   = parseInt(gv('leet-hard')   || 0);
  const total  = easy + medium + hard || parseInt(solved) || 0;

  const easyPct   = total ? Math.round(easy   / total * 100) : 0;
  const medPct    = total ? Math.round(medium / total * 100) : 0;
  const hardPct   = total ? Math.round(hard   / total * 100) : 0;

  const bodyHTML = `
    <div class="pm-stats-grid">
      <div class="pm-stat-card">
        <div class="pm-stat-num" style="color:#ffa116">
          ${solved}
        </div>
        <div class="pm-stat-lbl">Total Solved</div>
      </div>
      <div class="pm-stat-card">
        <div class="pm-stat-num" style="color:#00b8a3">
          ${easy || '—'}
        </div>
        <div class="pm-stat-lbl">Easy</div>
      </div>
      <div class="pm-stat-card">
        <div class="pm-stat-num" style="color:#ffc01e">
          ${medium || '—'}
        </div>
        <div class="pm-stat-lbl">Medium</div>
      </div>
      <div class="pm-stat-card">
        <div class="pm-stat-num" style="color:#ef4743">
          ${hard || '—'}
        </div>
        <div class="pm-stat-lbl">Hard</div>
      </div>
    </div>

    ${total ? `
    <div class="pm-difficulty-bars">
      <div class="pm-diff-row">
        <span class="pm-diff-label"
          style="color:#00b8a3">Easy</span>
        <div class="pm-diff-bar">
          <div class="pm-diff-fill"
            style="width:${easyPct}%;background:#00b8a3">
          </div>
        </div>
        <span class="pm-diff-val"
          style="color:#00b8a3">${easy}</span>
      </div>
      <div class="pm-diff-row">
        <span class="pm-diff-label"
          style="color:#ffc01e">Medium</span>
        <div class="pm-diff-bar">
          <div class="pm-diff-fill"
            style="width:${medPct}%;background:#ffc01e">
          </div>
        </div>
        <span class="pm-diff-val"
          style="color:#ffc01e">${medium}</span>
      </div>
      <div class="pm-diff-row">
        <span class="pm-diff-label"
          style="color:#ef4743">Hard</span>
        <div class="pm-diff-bar">
          <div class="pm-diff-fill"
            style="width:${hardPct}%;background:#ef4743">
          </div>
        </div>
        <span class="pm-diff-val"
          style="color:#ef4743">${hard}</span>
      </div>
    </div>` : ''}

    <div class="pm-info-section">
      <div class="pm-info-title">Profile Details</div>
      <div class="pm-info-row">
        <span class="pm-info-key">Platform</span>
        <span class="pm-info-val">⚡ LeetCode</span>
      </div>
      <div class="pm-info-row">
        <span class="pm-info-key">Profile URL</span>
        <span class="pm-info-val" style="word-break:break-all;font-size:.76rem">
          ${url || 'Not added'}
        </span>
      </div>
      ${total ? `
      <div class="pm-info-row">
        <span class="pm-info-key">Acceptance Rate</span>
        <span class="pm-info-val" style="color:#ffa116">
          ${Math.round((easy*0.85 + medium*0.55 + hard*0.3) / total * 100)}%
        </span>
      </div>` : ''}
    </div>

    <div style="padding:12px;background:rgba(255,161,22,.06);border:1px solid rgba(255,161,22,.15);border-radius:10px;font-size:.8rem;color:var(--muted);line-height:1.6">
      💡 <strong style="color:#ffa116">Tip:</strong>
      Add your LeetCode stats to show recruiters your problem-solving skills.
      ${solved !== '—' ? `Solving <strong>${solved}</strong> problems demonstrates strong algorithmic thinking!` : ''}
    </div>`;

  openProfileModal(
    '⚡ LeetCode Profile',
    formatURL(url),
    bodyHTML
  );
}


// ── GFG MODAL ──
function openGFGModal(event) {
  if (event) event.stopPropagation();

  const url     = gv('gfg');
  const score   = gv('gfg-score')  || '—';
  const solved  = gv('gfg-solved') || '—';
  const rank    = gv('gfg-rank')   || '—';
  const streak  = gv('gfg-streak') || '—';

  const bodyHTML = `
    <div class="pm-stats-grid">
      <div class="pm-stat-card">
        <div class="pm-stat-num" style="color:#2f8d46">
          ${score}
        </div>
        <div class="pm-stat-lbl">Coding Score</div>
      </div>
      <div class="pm-stat-card">
        <div class="pm-stat-num" style="color:#38b000">
          ${solved}
        </div>
        <div class="pm-stat-lbl">Problems Solved</div>
      </div>
      <div class="pm-stat-card">
        <div class="pm-stat-num" style="color:#fbbf24">
          #${rank}
        </div>
        <div class="pm-stat-lbl">Institute Rank</div>
      </div>
      <div class="pm-stat-card">
        <div class="pm-stat-num" style="color:#f97316">
          ${streak}
        </div>
        <div class="pm-stat-lbl">Streak</div>
      </div>
    </div>

    <div class="pm-info-section">
      <div class="pm-info-title">Profile Details</div>
      <div class="pm-info-row">
        <span class="pm-info-key">Platform</span>
        <span class="pm-info-val">🌿 GeeksForGeeks</span>
      </div>
      <div class="pm-info-row">
        <span class="pm-info-key">Profile URL</span>
        <span class="pm-info-val"
          style="word-break:break-all;font-size:.76rem">
          ${url || 'Not added'}
        </span>
      </div>
      <div class="pm-info-row">
        <span class="pm-info-key">Coding Score</span>
        <span class="pm-info-val" style="color:#2f8d46">
          ${score}
        </span>
      </div>
      <div class="pm-info-row">
        <span class="pm-info-key">Institute Rank</span>
        <span class="pm-info-val" style="color:#fbbf24">
          ${rank !== '—' ? '#' + rank : '—'}
        </span>
      </div>
    </div>

    <div style="padding:12px;background:rgba(47,141,70,.06);border:1px solid rgba(47,141,70,.15);border-radius:10px;font-size:.8rem;color:var(--muted);line-height:1.6">
      💡 <strong style="color:#2f8d46">Tip:</strong>
      GFG score shows your consistent practice.
      ${rank !== '—' ? `Institute Rank <strong>#${rank}</strong> proves you are among top coders in your college!` : 'Add your institute rank to impress recruiters!'}
    </div>`;

  openProfileModal(
    '🌿 GeeksForGeeks Profile',
    formatURL(url),
    bodyHTML
  );
}


// ── COLLEGE / SCHOOL MODAL ──
function openCollegeModal(name, location, searchURL) {
  if (!name) return;

  const bodyHTML = `
    <div style="text-align:center;padding:10px 0 20px">
      <div style="font-size:3rem;margin-bottom:10px">🏫</div>
      <div style="font-family:var(--font-head);font-size:1.3rem;
        font-weight:700;margin-bottom:6px">
        ${name}
      </div>
      ${location
        ? `<div style="color:var(--muted);font-size:.88rem">
            📍 ${location}
           </div>`
        : ''}
    </div>

    <div class="pm-info-section">
      <div class="pm-info-title">Quick Actions</div>
      <div style="display:flex;flex-direction:column;gap:8px;margin-top:4px">
        <a href="https://www.google.com/search?q=${encodeURIComponent(name + ' official website')}"
          target="_blank"
          style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:var(--card);border-radius:9px;color:var(--text);text-decoration:none;font-size:.84rem;border:1px solid var(--border);transition:.2s ease"
          onmouseover="this.style.borderColor='var(--blue)'"
          onmouseout="this.style.borderColor='var(--border)'">
          <i class="fa fa-globe" style="color:var(--blue);width:16px"></i>
          Visit Official Website
        </a>
        <a href="https://www.google.com/search?q=${encodeURIComponent(name + ' admission results rankings')}"
          target="_blank"
          style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:var(--card);border-radius:9px;color:var(--text);text-decoration:none;font-size:.84rem;border:1px solid var(--border);transition:.2s ease"
          onmouseover="this.style.borderColor='var(--green)'"
          onmouseout="this.style.borderColor='var(--border)'">
          <i class="fa fa-trophy" style="color:var(--green);width:16px"></i>
          View Rankings & Results
        </a>
        <a href="https://www.google.com/search?q=${encodeURIComponent(name + ' NIRF ranking placement')}"
          target="_blank"
          style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:var(--card);border-radius:9px;color:var(--text);text-decoration:none;font-size:.84rem;border:1px solid var(--border);transition:.2s ease"
          onmouseover="this.style.borderColor='var(--gold)'"
          onmouseout="this.style.borderColor='var(--border)'">
          <i class="fa fa-chart-bar" style="color:var(--gold);width:16px"></i>
          NIRF Ranking & Placements
        </a>
        <a href="https://www.google.com/search?q=${encodeURIComponent(name + ' reviews students')}"
          target="_blank"
          style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:var(--card);border-radius:9px;color:var(--text);text-decoration:none;font-size:.84rem;border:1px solid var(--border);transition:.2s ease"
          onmouseover="this.style.borderColor='var(--purple)'"
          onmouseout="this.style.borderColor='var(--border)'">
          <i class="fa fa-star" style="color:var(--purple);width:16px"></i>
          Student Reviews
        </a>
      </div>
    </div>

    <div style="padding:11px 14px;background:rgba(79,142,247,.06);border:1px solid rgba(79,142,247,.12);border-radius:9px;font-size:.78rem;color:var(--muted)">
      ℹ️ Click any link above to search for real-time information about this institution.
    </div>`;

  openProfileModal(
    '🏫 ' + name,
    `https://www.google.com/search?q=${encodeURIComponent(name)}`,
    bodyHTML
  );
}


// ── FETCH LEETCODE STATS (via API) ──
async function fetchLeetCodeStats() {
  const url = gv('leetcode');
  if (!url) {
    showToast('⚠️ Add your LeetCode URL in Step 1 first!');
    return;
  }

  // Extract username
  const username = url.replace(/\/$/, '')
    .split('/').filter(Boolean).pop();

  showToast('⏳ Fetching LeetCode stats...');

  try {
    // Use LeetCode unofficial API
    const res = await fetch(
      `https://leetcode-stats-api.herokuapp.com/${username}`
    );
    const data = await res.json();

    if (data.status === 'success') {
      document.getElementById('leet-solved').value = data.totalSolved  || '';
      document.getElementById('leet-easy').value   = data.easySolved   || '';
      document.getElementById('leet-medium').value = data.mediumSolved || '';
      document.getElementById('leet-hard').value   = data.hardSolved   || '';

      // Update preview card
      document.getElementById('leetPreview').innerHTML =
        `✅ <strong>${data.totalSolved}</strong> solved
        (Easy: ${data.easySolved},
         Medium: ${data.mediumSolved},
         Hard: ${data.hardSolved})`;

      liveUpdate();
      showToast(`✅ LeetCode stats fetched for ${username}!`);
    } else {
      showToast('⚠️ Could not fetch. Enter stats manually above.');
    }
  } catch(e) {
    showToast('⚠️ API failed. Please enter stats manually above.');
  }
}


// ── FETCH GFG STATS ──
async function fetchGFGStats() {
  const url = gv('gfg');
  if (!url) {
    showToast('⚠️ Add your GFG URL in Step 1 first!');
    return;
  }

  // Extract username
  const username = url.replace(/\/$/, '')
    .split('/').filter(Boolean).pop();

  showToast('⏳ Fetching GFG stats...');

  try {
    const res = await fetch(
      `https://geeks-for-geeks-stats-api.vercel.app/?raw=y&userName=${username}`
    );
    const data = await res.json();

    if (data && !data.error) {
      document.getElementById('gfg-score').value  = data.codingScore   || '';
      document.getElementById('gfg-solved').value = data.totalProblemsSolved || '';

      document.getElementById('gfgPreview').innerHTML =
        `✅ Score: <strong>${data.codingScore}</strong>,
        Solved: <strong>${data.totalProblemsSolved}</strong>`;

      liveUpdate();
      showToast(`✅ GFG stats fetched for ${username}!`);
    } else {
      showToast('⚠️ Could not fetch. Enter stats manually.');
    }
  } catch(e) {
    showToast('⚠️ API failed. Please enter stats manually above.');
  }
}


// ── CLOSE MODAL ON ESC KEY ──
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeProfileModal();
});


/* ── HOW TO USE buildContactLinks and buildCodingBadges ──

In your existing resume template builder functions
(buildCleanTemplate / buildModernTemplate etc)

FIND the contact line that looks like:
  ${p.email ? `<span>✉ ${p.email}</span>` : ''}
  ${p.phone ? `<span>📞 ${p.phone}</span>` : ''}
  ...

REPLACE the entire .rc div contents with:
  ${buildContactLinks(p)}

AND add coding badges at the bottom of resume:
  ${buildCodingBadges()}

AND update education HTML to use:
  ${buildEduHTML(data.education)}
  instead of your existing edu map

This adds clickable hyperlinks automatically!
*/
/* ── DRIVE LINK FEATURE ── */

// Convert Google Drive share link
// to direct viewable link
function formatDriveLink(url) {
  if (!url) return '';

  // Already a direct link
  if (url.includes('drive.google.com/file')) {
    // Extract file ID
    const match = url.match(
      /\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (match) {
      // Return preview link
      // Anyone with link can view
      return `https://drive.google.com/file/d/${match[1]}/preview`;
    }
  }

  // Handle /open?id= format
  if (url.includes('open?id=')) {
    const id = url.split('open?id=')[1]
      ?.split('&')[0];
    if (id) {
      return `https://drive.google.com/file/d/${id}/preview`;
    }
  }

  // Return as is if unknown format
  return url;
}

// Test if drive link works
function testDriveLink(btn) {
  // Find parent input
  const input = btn
    .parentElement
    .querySelector('input');
  const url = input?.value?.trim();

  if (!url) {
    showToast('⚠️ Enter a Google Drive link first!');
    return;
  }

  if (!url.includes('drive.google.com')) {
    showToast('⚠️ Please enter a valid Google Drive link!');
    return;
  }

  // Open in new tab to test
  const previewUrl = formatDriveLink(url);
  window.open(previewUrl, '_blank');
  showToast('✅ Link opened in new tab — check if it shows your file!');
}

// Build education HTML with drive links
// UPDATE your existing education map
// in your template builder to use this:

function buildEduWithDriveLink(eduList) {
  return eduList.map(e => {
    if (!e.degree && !e.school) return '';

    const driveUrl = e.drivelink
      ? formatDriveLink(e.drivelink)
      : '';

    return `
      <div class="ri">
        <div class="rih">
          <span class="rit">
            ${e.degree || ''}
          </span>
          <span class="rid">
            ${e.start || ''}
            ${e.end ? ' – ' + e.end : ''}
          </span>
        </div>

        <div class="ris">
          ${e.school || ''}
          ${e.loc ? ' | ' + e.loc : ''}
        </div>

        ${e.grade
          ? `<div class="ridesc"
              style="font-size:.7rem;
              color:#888;margin-top:2px">
              ${e.grade}
            </div>`
          : ''}

${driveUrl ? `
  <a href="${driveUrl}"
    target="_blank"
    style="display:inline-flex;
    align-items:center;
    gap:6px;
    padding:4px 10px;
    margin-top:6px;
    background:rgba(66,133,244,.08);
    border:1px solid #4285f4;
    border-radius:4px;
    font-size:.68rem;
    font-weight:700;
    color:#4285f4;
    text-decoration:none;
    -webkit-print-color-adjust:exact;
    print-color-adjust:exact">
    📄 View Marksheet / Certificate
  </a>` : ''}

      </div>`;
  }).join('');
}