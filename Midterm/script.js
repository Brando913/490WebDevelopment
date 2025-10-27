// Midterm script: dynamic year, greeting, dark mode, scroll-to-top, modal, and simple form handling.
document.addEventListener('DOMContentLoaded', () => {
  // Set footer year dynamically
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Greeting based on time of day
  const greetingEl = document.getElementById('greeting');
  if (greetingEl) {
    const hour = new Date().getHours();
    let g = 'Hello —';
    if (hour >= 5 && hour < 12) g = 'Good morning —';
    else if (hour >= 12 && hour < 17) g = 'Good afternoon —';
    else if (hour >= 17 && hour < 22) g = 'Good evening —';
    else g = 'Hello —';
    greetingEl.textContent = `${g} Computer Science Student`;
  }

  // Dark mode toggle (persist in localStorage)
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  const current = localStorage.getItem('theme');
  if (current === 'dark') body.classList.add('dark');
  updateToggleText();

  function updateToggleText(){
    if (!themeToggle) return;
    themeToggle.textContent = body.classList.contains('dark') ? 'Light' : 'Dark';
  }

  if (themeToggle){
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('dark');
      localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
      updateToggleText();
    });
  }

  // Scroll-to-top button
  const toTop = document.getElementById('toTop');
  window.addEventListener('scroll', () => {
    if (!toTop) return;
    if (window.scrollY > 300) toTop.style.display = 'flex';
    else toTop.style.display = 'none';
  });
  if (toTop) toTop.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));

  // Modal behavior for project cards (event delegation)
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalLink = document.getElementById('modalLink');
  const modalClose = document.getElementById('modalClose');

  document.getElementById('projectsGrid')?.addEventListener('click', (e) => {
    const btn = e.target.closest('.viewBtn');
    if (!btn) return;
    const card = btn.closest('.projectCard');
    if (!card) return;
    const title = card.dataset.title || card.querySelector('h3')?.textContent || 'Project';
    const desc = card.dataset.desc || '';
    const link = card.dataset.link || '#';

    if (modal && modalTitle && modalDesc && modalLink){
      modalTitle.textContent = title;
      modalDesc.textContent = desc;
      modalLink.href = link;
      modal.setAttribute('aria-hidden','false');
    }
  });

  function closeModal(){
    if (!modal) return;
    modal.setAttribute('aria-hidden','true');
  }

  modalClose?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (ev) => { if (ev.target === modal) closeModal(); });
  document.addEventListener('keydown', (ev) => { if (ev.key === 'Escape') closeModal(); });

  // Simple contact form validation/feedback (no network)
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  if (form){
    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      // basic feedback
      const name = form.querySelector('#name')?.value.trim();
      const email = form.querySelector('#email')?.value.trim();
      const message = form.querySelector('#message')?.value.trim();
      if (!name || !email || !message){
        if (formStatus) { formStatus.textContent = 'Please fill out all fields.'; }
        return;
      }
      if (formStatus) { formStatus.textContent = 'Thanks — message simulated (no backend).'; }
      form.reset();
      setTimeout(()=>{ if (formStatus) formStatus.textContent = ''; },3000);
    });
  }

});
