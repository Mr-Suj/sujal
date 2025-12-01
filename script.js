// Interaction logic: nav active, smooth scroll, progress bars, contact demo, theme toggle with fade & icon swap.
// NOTE: No localStorage theme persistence — dark is default on every load (per your request).

document.addEventListener('DOMContentLoaded', () => {

  /* NAV active link */
  const sections = document.querySelectorAll('section.panel');
  const navLinks = document.querySelectorAll('.nav-link');
  function setActiveNav(){
    let index = sections.length;
    while(--index && window.scrollY + 180 < sections[index].offsetTop) {}
    navLinks.forEach(link => link.classList.remove('active'));
    const id = sections[index].id;
    const active = document.querySelector('.nav-link[href="#' + id + '"]');
    if(active) active.classList.add('active');
  }
  setActiveNav();
  window.addEventListener('scroll', setActiveNav);

  /* Smooth anchor clicks */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      const target = document.querySelector(href);
      if(target){
        e.preventDefault();
        const top = target.offsetTop - 64;
        window.scrollTo({top, behavior:'smooth'});
      }
    });
  });

  /* Progress bars */
  const progressEls = document.querySelectorAll('.progress');
  const obs = new IntersectionObserver((entries, observer) => {
    entries.forEach(ent => {
      if(ent.isIntersecting){
        const el = ent.target;
        const pct = el.dataset.percent || 0;
        const bar = el.querySelector('.bar');
        if(bar) bar.style.width = pct + '%';
        observer.unobserve(el);
      }
    });
  }, {threshold:0.25});
  progressEls.forEach(pe => obs.observe(pe));

  /* Contact form demo (no backend) */
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      if(!name || !email){ alert('Please fill name and email.'); return; }
      alert('Thanks! Message sent (demo). Replace with a backend later.');
      form.reset();
    });
  }

  /* Ensure portraits show in full color */
  document.querySelectorAll('.portrait').forEach(img => img.style.filter = 'none');

  /* THEME TOGGLE (no persistence) - fade + icon switch */
  const themeBtn = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');

  // initial icon = moon (dark mode)
  themeIcon.classList.remove('fa-sun');
  themeIcon.classList.add('fa-moon');

  themeBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // add fade helper
    document.body.classList.add('theme-fade');

    // tiny timeout for CSS repaint then toggle theme
    setTimeout(() => {
      const isLight = document.body.classList.toggle('light-theme');
      // swap icon
      if(isLight){
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
      } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
      }
    }, 20);

    // remove fade helper after transition end
    setTimeout(() => {
      document.body.classList.remove('theme-fade');
    }, 320);
  });

});
