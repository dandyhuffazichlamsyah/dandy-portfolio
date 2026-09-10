/* ==========================================================================
   DANDY HUFFAZ ICHLAMSYAH — 3D CREATIVE WEB PORTFOLIO (LIGHT STUDIO TECH)
   Interactive Engine: Three.js Light WebGL Scene, Spatial Card Tilts & Vault Filter
   ========================================================================== */

(function () {
  'use strict';

  // ==========================================================================
  // 1. THREE.JS 3D LIGHT WEBGL SCENE (OPTIMIZED 60 FPS)
  // ==========================================================================
  const WebGLScene = (function () {
    const container = document.getElementById('webgl-container');
    if (!container || typeof THREE === 'undefined') return;

    let scene, camera, renderer;
    let coreGroup, outerMesh, innerMesh, ringMesh, particleSystem;
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;
    let scrollY = 0;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = windowWidth < 768;

    function init() {
      // Scene
      scene = new THREE.Scene();

      // Camera
      camera = new THREE.PerspectiveCamera(45, windowWidth / windowHeight, 0.1, 1000);
      camera.position.z = isMobile ? 8.5 : 7.2;

      // Renderer (Lightweight & Power Optimized)
      renderer = new THREE.WebGLRenderer({
        antialias: !isMobile,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(windowWidth, windowHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
      container.appendChild(renderer.domElement);

      // Studio Lighting for Light Background
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
      scene.add(ambientLight);

      const azureLight = new THREE.PointLight(0x0284c7, 3.5, 30);
      azureLight.position.set(4, 5, 4);
      scene.add(azureLight);

      const softSkyLight = new THREE.PointLight(0x38bdf8, 2.5, 25);
      softSkyLight.position.set(-5, -4, -2);
      scene.add(softSkyLight);

      // Core Group
      coreGroup = new THREE.Group();
      scene.add(coreGroup);

      // 1. Outer Geometric Wireframe (Icosahedron)
      const outerGeo = new THREE.IcosahedronGeometry(2.1, 1);
      const wireMat = new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        wireframe: true,
        transparent: true,
        opacity: 0.32,
        roughness: 0.25,
        metalness: 0.6
      });
      outerMesh = new THREE.Mesh(outerGeo, wireMat);
      coreGroup.add(outerMesh);

      // 2. Outer Vertex Points
      const pointsMat = new THREE.PointsMaterial({
        color: 0x0284c7,
        size: 0.065,
        transparent: true,
        opacity: 0.75
      });
      const outerPoints = new THREE.Points(outerGeo, pointsMat);
      coreGroup.add(outerPoints);

      // 3. Inner Crystalline Prismatic Core (Octahedron)
      const innerGeo = new THREE.OctahedronGeometry(1.2, 0);
      const innerMat = new THREE.MeshPhysicalMaterial({
        color: 0xe0f2fe,
        emissive: 0x0284c7,
        emissiveIntensity: 0.25,
        roughness: 0.1,
        metalness: 0.4,
        transparent: true,
        opacity: 0.7
      });
      innerMesh = new THREE.Mesh(innerGeo, innerMat);
      coreGroup.add(innerMesh);

      // 4. Subtle Orbital Ring
      const ringGeo = new THREE.TorusGeometry(2.6, 0.018, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x0284c7,
        transparent: true,
        opacity: 0.25
      });
      ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 3;
      coreGroup.add(ringMesh);

      // 5. Floating Dust Particle Field (Optimized count for 60 FPS)
      const particleCount = isMobile ? 120 : 250;
      const particleGeo = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 20;
        positions[i + 1] = (Math.random() - 0.5) * 20;
        positions[i + 2] = (Math.random() - 0.5) * 14 - 2;
      }

      particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const constellationMat = new THREE.PointsMaterial({
        color: 0x64748b,
        size: 0.04,
        transparent: true,
        opacity: 0.35
      });
      particleSystem = new THREE.Points(particleGeo, constellationMat);
      scene.add(particleSystem);

      // Position to balance the desktop hero
      if (!isMobile) {
        coreGroup.position.x = 2.1;
      }

      // Event Listeners with passive performance
      window.addEventListener('mousemove', onMouseMove, { passive: true });
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onResize);

      animate();
    }

    function onMouseMove(e) {
      mouseX = (e.clientX / windowWidth) * 2 - 1;
      mouseY = -(e.clientY / windowHeight) * 2 + 1;
    }

    function onScroll() {
      scrollY = window.scrollY;
    }

    function onResize() {
      windowWidth = window.innerWidth;
      windowHeight = window.innerHeight;

      camera.aspect = windowWidth / windowHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(windowWidth, windowHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, windowWidth < 768 ? 1.5 : 2));

      if (coreGroup) {
        coreGroup.position.x = windowWidth >= 992 ? 2.1 : 0;
      }
    }

    function animate() {
      requestAnimationFrame(animate);

      if (!prefersReducedMotion && coreGroup) {
        // Smooth Lerp Damping
        targetX += (mouseX - targetX) * 0.045;
        targetY += (mouseY - targetY) * 0.045;

        outerMesh.rotation.x += 0.0025;
        outerMesh.rotation.y += 0.0035;

        innerMesh.rotation.x -= 0.004;
        innerMesh.rotation.y += 0.005;

        const scrollFactor = scrollY * 0.001;
        coreGroup.rotation.y = targetX * 0.7 + scrollFactor;
        coreGroup.rotation.x = -targetY * 0.5 + (scrollFactor * 0.3);

        const time = Date.now() * 0.0015;
        const breath = 1 + Math.sin(time) * 0.025;
        innerMesh.scale.set(breath, breath, breath);

        if (particleSystem) {
          particleSystem.rotation.y = time * 0.02;
        }
      }

      renderer.render(scene, camera);
    }

    init();
  })();


  // ==========================================================================
  // 2. 3D SPATIAL CARD TILT (LIGHT STUDIO)
  // ==========================================================================
  const CardTilt3D = (function () {
    const cards = document.querySelectorAll('.card-3d, .spatial-card-3d, .project-card');
    if (window.innerWidth < 768) return;

    cards.forEach(card => {
      let bounds;

      function updateBounds() {
        bounds = card.getBoundingClientRect();
      }

      function onPointerMove(e) {
        if (!bounds) updateBounds();

        const x = e.clientX - bounds.left;
        const y = e.clientY - bounds.top;

        const centerX = bounds.width / 2;
        const centerY = bounds.height / 2;
        const rotateX = ((y - centerY) / centerY) * -5.5;
        const rotateY = ((x - centerX) / centerX) * 5.5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;
      }

      function onPointerLeave() {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        bounds = null;
      }

      card.addEventListener('mouseenter', updateBounds);
      card.addEventListener('mousemove', onPointerMove);
      card.addEventListener('mouseleave', onPointerLeave);
    });
  })();


  // ==========================================================================
  // 3. CERTIFICATIONS VAULT DATABASE (COMPLETE & ACCURATELY MAPPED)
  // ==========================================================================
  const CertsDatabase = [
    {
      title: "Analis Program (BNSP)",
      issuer: "Badan Nasional Sertifikasi Profesi (BNSP)",
      category: "software",
      summary: "Sertifikasi kompetensi standar nasional Indonesia dalam bidang analisis kebutuhan sistem, perancangan arsitektur, dan rekayasa perangkat lunak.",
      file: null,
      type: null
    },
    {
      title: "Database Administrator (BNSP)",
      issuer: "Badan Nasional Sertifikasi Profesi (BNSP)",
      category: "software",
      summary: "Sertifikasi kompetensi standar nasional Indonesia dalam bidang instalasi, manajemen, pemeliharaan, dan integritas basis data relasional.",
      file: null,
      type: null
    },
    {
      title: "Coding Camp Software Engineering (SECC)",
      issuer: "RevoU",
      category: "software",
      summary: "Sertifikasi kelulusan 1-week certified online course bidang software engineering fundamental, web development, dan best practices (No: CCSE 050126-01-1-00066).",
      file: "assets/Sertifikat/SECC_dandyhuffaz52@gmail.com_CCSE 050126-01-1-00066.pdf",
      type: "pdf"
    },
    {
      title: "Data Analytics Mini Course (DAMC)",
      issuer: "RevoU",
      category: "software",
      summary: "Sertifikasi kelulusan 1-week certified online course bidang analisis data bisnis, perumusan insight, dan data visualization (No: DAMC-120126-01-1-00375).",
      file: "assets/Sertifikat/DAMC_dandyhuffaz52@gmail.com_DAMC-120126-01-1-00375.pdf",
      type: "pdf"
    },
    {
      title: "IDCamp 2025 Level Expert",
      issuer: "Indosat Ooredoo Hutchison & Dicoding",
      category: "ai-ml",
      summary: "Alur belajar Gen AI Engineer Level Mahir/Expert (total 80 jam intensif) mencakup deployment model, fine-tuning, dan arsitektur LLM.",
      file: "assets/Sertifikat/Sertifikat IDCamp 2025 Level Expert (Dandy Huffaz Ichlamsyah).pdf",
      type: "pdf"
    },
    {
      title: "Google AI Professional",
      issuer: "Google Career Certificates",
      category: "ai-ml",
      summary: "Penerapan AI profesional untuk otomasi alur kerja, produktivitas rekayasa, dan implementasi teknologi cerdas.",
      file: "assets/Sertifikat/Coursera C21DHH2USG3R.pdf",
      type: "pdf"
    },
    {
      title: "Belajar Dasar AI",
      issuer: "Dicoding Indonesia (Google Cloud Partner)",
      category: "ai-ml",
      summary: "Fondasi Artificial Intelligence, Machine Learning, dan deep learning untuk pemecahan masalah komputasi cerdas.",
      file: "assets/Sertifikat/Belajar Dasar AI.pdf",
      type: "pdf"
    },
    {
      title: "Prompt Engineering untuk Software Developer",
      issuer: "Dicoding Indonesia",
      category: "ai-ml",
      summary: "Teknik prompt engineering tingkat lanjut, pencegahan prompt injection, dan optimasi siklus SDLC berbantuan LLM.",
      file: "assets/Sertifikat/Prompt Engineering untuk Software Developer.pdf",
      type: "pdf"
    },
    {
      title: "Machine Learning untuk Pemula",
      issuer: "Dicoding Indonesia",
      category: "ai-ml",
      summary: "Pemodelan prediktif dengan algoritma Supervised & Unsupervised Learning menggunakan Python & Scikit-Learn.",
      file: "assets/Sertifikat/Belajar Machine Learning untuk Pemula.pdf",
      type: "pdf"
    },
    {
      title: "Pengembangan Gen AI Berbasis LLM",
      issuer: "Dicoding Indonesia",
      category: "ai-ml",
      summary: "Implementasi Large Language Models, embeddings, RAG (Retrieval-Augmented Generation), dan vector databases.",
      file: "assets/Sertifikat/sertifikat_course_Pengembangan Generative AI berbasis LLM.pdf",
      type: "pdf"
    },
    {
      title: "Aplikasi Gen AI dengan Microsoft Azure",
      issuer: "Dicoding Indonesia & Microsoft",
      category: "ai-ml",
      summary: "Deploy dan orkestrasi model OpenAI dan Azure AI Services untuk aplikasi enterprise.",
      file: "assets/Sertifikat/sertifikat_course_Membangun Aplikasi Gen AI dengan Microsoft Azure.pdf",
      type: "pdf"
    },
    {
      title: "Fundamental Deep Learning",
      issuer: "Dicoding Indonesia",
      category: "ai-ml",
      summary: "Arsitektur Neural Networks, NLP, Computer Vision, dan deployment model deep learning.",
      file: "assets/Sertifikat/sertifikat_course_Belajar Fundamental Deep Learning.pdf",
      type: "pdf"
    },
    {
      title: "Belajar Dasar Data Science",
      issuer: "Dicoding Indonesia",
      category: "software",
      summary: "Siklus analisis data end-to-end, eksplorasi data, dan teknik machine learning untuk data scientist.",
      file: "assets/Sertifikat/sertifikat_course_Belajar Dasar Data Science.pdf",
      type: "pdf"
    },
    {
      title: "Belajar Dasar SQL",
      issuer: "Dicoding Indonesia",
      category: "software",
      summary: "Query relational database, indexing, join operations, dan agregasi data untuk sistem analitik.",
      file: "assets/Sertifikat/sertifikat_course_Belajar Dasar Structured Query Language (SQL).pdf",
      type: "pdf"
    },
    {
      title: "Data Science dengan Microsoft Fabric",
      issuer: "Dicoding Indonesia & Microsoft",
      category: "software",
      summary: "Pemanfaatan ekosistem Microsoft Fabric untuk data engineering terpusat, analitik real-time, dan business intelligence.",
      file: "assets/Sertifikat/sertifikat_course_Belajar Penerapan Data Science dengan Microsoft Fabric.pdf",
      type: "pdf"
    },
    {
      title: "Memulai Pemrograman Python",
      issuer: "Dicoding Indonesia",
      category: "software",
      summary: "Sintaks Python fundamental, struktur data, kontrol alur, dan pemrograman berorientasi objek (OOP).",
      file: "assets/Sertifikat/Memulai Pemrograman dengan Python.pdf",
      type: "pdf"
    },
    {
      title: "Software Engineering Bootcamp",
      issuer: "MySkill",
      category: "software",
      summary: "Praktek rekayasa perangkat lunak modern, database design, REST API architecture, dan kolaborasi Git.",
      file: "assets/Sertifikat/Dandy Huffaz Ichlamsyah - E-Certif SC Software Engineering MySkill.pdf",
      type: "pdf"
    },
    {
      title: "AI and Automation with n8n",
      issuer: "MySkill",
      category: "ai-ml",
      summary: "Otomasi alur kerja sistem terintegrasi AI menggunakan workflow orchestration n8n, API integrations, dan webhook triggers.",
      file: "assets/Sertifikat/Dandy Huffaz Ichlamsyah – E-Certif SC AI and Automation with n8n Myskill-1.pdf",
      type: "pdf"
    },
    {
      title: "Professional Skill in Artificial Intelligence",
      issuer: "MySkill (AWS EdStart Member)",
      category: "ai-ml",
      summary: "Full Learning Path Artificial Intelligence mencakup machine learning, computer vision, dan evaluasi performa model.",
      file: "assets/Sertifikat/Certificate of Professional Skill in Artificial Intelligence.pdf",
      type: "pdf"
    },
    {
      title: "AI in Supply Chain",
      issuer: "Coursera",
      category: "supply-chain",
      summary: "Penerapan machine learning dan analitik prediktif dalam optimalisasi logistik, peramalan permintaan stok, dan rute pengiriman.",
      file: "assets/Sertifikat/Coursera_AI in Supply Chain.pdf",
      type: "pdf"
    },
    {
      title: "AI in Government & Public Administration",
      issuer: "Coursera",
      category: "leadership",
      summary: "Pemanfaatan AI untuk transformasi digital sektor publik, tata kelola data, dan perumusan kebijakan administrasi modern.",
      file: "assets/Sertifikat/Coursera_Ai In Goverment.pdf",
      type: "pdf"
    },
    {
      title: "IT Bootcamp Software Dev for Industry",
      issuer: "Universitas Bina Sarana Informatika",
      category: "software",
      summary: "Pengembangan full-stack aplikasi web sesuai standar industri, evaluasi arsitektur, dan simulasi tim.",
      file: "assets/Sertifikat/IT Bootcamp Software Development For Industry.pdf",
      type: "pdf"
    },
    {
      title: "Workshop IT Bootcamp Software Dev",
      issuer: "Universitas Bina Sarana Informatika",
      category: "software",
      summary: "Studi kasus industri dalam rekayasa perangkat lunak, integrasi basis data, dan performa web.",
      file: "assets/Sertifikat/Workshop IT Bootcamp Software Development For Industry.pdf",
      type: "pdf"
    },
    {
      title: "Data Analyst with SQL & Python",
      issuer: "DQLab",
      category: "software",
      summary: "Bootcamp intensif data wrangling, eksplorasi dataset besar, dan visualisasi data analitik.",
      file: "assets/Sertifikat/certificate-DQLABStudy Case Bootcamp Data Analyst with SQL & Python.pdf",
      type: "pdf"
    },
    {
      title: "Machine Learning & AI Bootcamp",
      issuer: "DQLab",
      category: "ai-ml",
      summary: "Implementasi studi kasus machine learning riil dari preprocessing data hingga evaluasi model.",
      file: "assets/Sertifikat/certificate-DQLAB Study Case Bootcamp Machine learning & AI for Beginner.pdf",
      type: "pdf"
    },
    {
      title: "Juara Harapan 1 KKP Kategori Putra Terbaik",
      issuer: "Sudin Pendidikan Wilayah II Jakarta Pusat",
      category: "leadership",
      summary: "Penghargaan prestasi tingkat kepemimpinan pelajar atas kemampuan analisis penyelesaian masalah sosial dan dinamika kelompok.",
      file: "assets/Sertifikat/Piagam Penghargaan Juara Harapan 1 - Kategori Putra Terbaik.pdf",
      type: "pdf"
    },
    {
      title: "IT Career Planning Strategy",
      issuer: "SmartPath",
      category: "leadership",
      summary: "Apresiasi atas perencanaan karir strategis di bidang teknologi informasi dan rekayasa perangkat lunak global.",
      file: "assets/Sertifikat/Certificate of Appreciation - Successful Career Planning ITComputer.jpg",
      type: "image"
    }
  ];

  const CertsVault = (function () {
    const grid = document.getElementById('certs-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('cert-search');

    if (!grid) return;

    let currentFilter = 'all';
    let searchQuery = '';

    function renderCertificates() {
      grid.innerHTML = '';

      const filtered = CertsDatabase.filter(cert => {
        const matchesCategory = currentFilter === 'all' || cert.category === currentFilter;
        const matchesSearch = cert.title.toLowerCase().includes(searchQuery) ||
          cert.issuer.toLowerCase().includes(searchQuery) ||
          cert.summary.toLowerCase().includes(searchQuery);
        return matchesCategory && matchesSearch;
      });

      if (filtered.length === 0) {
        grid.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: var(--bg-surface); border: 1px dashed var(--border-medium); border-radius: var(--radius-md);">
            <p style="font-family: var(--font-mono); font-size: 0.9rem; color: var(--text-muted);">
              No credentials found matching the criteria.
            </p>
          </div>
        `;
        return;
      }

      filtered.forEach(cert => {
        const card = document.createElement('div');
        card.className = 'cert-card';

        let actionHtml = '';
        if (cert.file) {
          actionHtml = `
            <div class="cert-actions">
              <button class="cert-view-btn" data-file="${cert.file}" data-type="${cert.type}" data-title="${cert.title}">
                View Credential <i class="fas fa-arrow-right"></i>
              </button>
              <a href="${cert.file}" download class="cert-view-btn" style="color: var(--text-muted);" title="Download File">
                <i class="fas fa-download"></i>
              </a>
            </div>
          `;
        } else {
          actionHtml = `
            <div class="cert-actions">
              <span style="display: inline-flex; align-items: center; gap: 0.45rem; font-family: var(--font-mono); font-size: 0.78rem; font-weight: 600; color: var(--accent-blue); background: var(--accent-blue-soft); padding: 0.35rem 0.75rem; border-radius: var(--radius-sm); border: 1px solid rgba(2, 132, 199, 0.25);">
                <i class="fas fa-certificate"></i> Sertifikat Fisik BNSP
              </span>
            </div>
          `;
        }

        card.innerHTML = `
          <div class="cert-badge-cat">${getCategoryLabel(cert.category)}</div>
          <h4 class="cert-name">${cert.title}</h4>
          <div class="cert-issuer">${cert.issuer}</div>
          <p class="cert-summary">${cert.summary}</p>
          ${actionHtml}
        `;
        grid.appendChild(card);
      });

      grid.querySelectorAll('button.cert-view-btn[data-file]').forEach(btn => {
        btn.addEventListener('click', () => {
          ModalManager.open(
            btn.getAttribute('data-file'),
            btn.getAttribute('data-type'),
            btn.getAttribute('data-title')
          );
        });
      });
    }

    function getCategoryLabel(cat) {
      switch (cat) {
        case 'ai-ml': return 'AI & Machine Learning';
        case 'software': return 'Software Engineering';
        case 'supply-chain': return 'Supply Chain & Ops';
        case 'leadership': return 'Leadership & Policy';
        default: return 'Credential';
      }
    }

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-filter');
        renderCertificates();
      });
    });

    let searchTimeout;
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
          searchQuery = e.target.value.toLowerCase().trim();
          renderCertificates();
        }, 120);
      });
    }

    renderCertificates();
  })();


  // ==========================================================================
  // 4. MODAL MANAGER (PDF & IMAGE PREVIEW)
  // ==========================================================================
  const ModalManager = (function () {
    const backdrop = document.getElementById('cert-modal');
    const titleEl = document.getElementById('modal-title');
    const bodyEl = document.getElementById('modal-body');
    const downloadBtn = document.getElementById('modal-download-btn');
    const closeBtn = document.getElementById('modal-close-btn');

    if (!backdrop) return { open: () => { } };

    function open(fileUrl, type, title) {
      titleEl.textContent = title || 'Credential Verification';
      downloadBtn.setAttribute('href', fileUrl);

      if (type === 'image') {
        bodyEl.innerHTML = `<img src="${fileUrl}" alt="${title}" loading="lazy">`;
      } else {
        bodyEl.innerHTML = `<iframe src="${fileUrl}#toolbar=0" title="${title}"></iframe>`;
      }

      backdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      backdrop.classList.remove('open');
      bodyEl.innerHTML = '';
      document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', close);

    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && backdrop.classList.contains('open')) {
        close();
      }
    });

    return { open, close };
  })();


  // ==========================================================================
  // 5. STICKY HEADER & SCROLL BEHAVIOR
  // ==========================================================================
  const HeaderController = (function () {
    const header = document.querySelector('.site-header');
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const navLinks = document.querySelectorAll('.nav-link');

    if (header) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }, { passive: true });
    }

    if (mobileToggle && mobileDrawer) {
      mobileToggle.addEventListener('click', () => {
        mobileDrawer.classList.toggle('open');
      });

      mobileDrawer.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          mobileDrawer.classList.remove('open');
        });
      });
    }

    // Scroll Spy for Navigation Active State
    const sections = document.querySelectorAll('section[id]');
    if (sections.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
              if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            });
          }
        });
      }, { rootMargin: '-25% 0px -65% 0px' });

      sections.forEach(s => observer.observe(s));
    }
  })();


  // ==========================================================================
  // 6. CONTACT FORM CONTROLLER (FORMSPREE INTEGRATION)
  // ==========================================================================
  const ContactController = (function () {
    const form = document.getElementById('contact-form');
    const feedback = document.getElementById('form-feedback');
    const submitBtn = document.getElementById('form-submit-btn');

    if (!form || !feedback || !submitBtn) return;

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      if (submitBtn.disabled) return;
      submitBtn.disabled = true;
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Transmitting...';

      feedback.className = 'form-feedback';
      feedback.style.display = 'none';

      try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          form.reset();
          feedback.textContent = 'Message transmitted successfully. I will get back to you shortly.';
          feedback.classList.add('success');
          feedback.style.display = 'block';
        } else {
          throw new Error('Server returned error response');
        }
      } catch (err) {
        feedback.textContent = 'Transmission failed. Please reach out directly via dandyichlamsyah@gmail.com';
        feedback.classList.add('error');
        feedback.style.display = 'block';
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  })();

})();
