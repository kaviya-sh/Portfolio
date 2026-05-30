/* ============================
   EmailJS Contact Form
   ============================ */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = document.getElementById('send-btn');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    const templateParams = {
      from_name: document.getElementById('from_name').value,
      from_email: document.getElementById('from_email').value,
      message: document.getElementById('message').value,
      to_email: 'kaviyashanmugam4949@gmail.com'
    };

    emailjs.send('service_v5h6vih', 'template_p6x59nq', templateParams)
      .then(() => {
        btn.textContent = 'Sent! ✓';
        btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        contactForm.reset();
        setTimeout(() => {
          btn.innerHTML = 'Send Message &nbsp;<i class="fa-solid fa-paper-plane"></i>';
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      })
      .catch(() => {
        btn.textContent = 'Failed. Try again.';
        btn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
        btn.disabled = false;
        setTimeout(() => {
          btn.innerHTML = 'Send Message &nbsp;<i class="fa-solid fa-paper-plane"></i>';
          btn.style.background = '';
        }, 3000);
      });
  });
}

/* ============================
   Smooth scroll — navbar links & hero buttons
   ============================ */
document.addEventListener('DOMContentLoaded', () => {

  // Make ALL sections visible
  document.querySelectorAll('section').forEach(sec => {
    sec.classList.remove('hidden-section');
    sec.style.display = '';
  });

  // Smooth scroll for ALL anchor links including hero buttons
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
      document.querySelector('.nav-links').classList.remove('open');
    });
  });

  /* ============================
     Active nav link highlight on scroll
     ============================ */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(sec => sectionObserver.observe(sec));

  /* ============================
     Experience cards fly-in + float
     ============================ */
  const expSection = document.querySelector('#experience');
  if (expSection) {
    const expObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const items = document.querySelectorAll('.experience-item');
        if (entry.isIntersecting) {
          items.forEach((item, i) => {
            item.classList.remove('visible');
            void item.offsetWidth;
            setTimeout(() => item.classList.add('visible'), i * 220);
          });
        } else {
          items.forEach(item => item.classList.remove('visible'));
        }
      });
    }, { threshold: 0.15 });
    expObs.observe(expSection);
  }

  /* ============================
     Project cards fly-in (left/right) + float
     ============================ */
  const projectsBox = document.querySelector('.projects-box');
  if (projectsBox) {
    const projObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const cards = document.querySelectorAll('.project-card');
        if (entry.isIntersecting) {
          cards.forEach((card, i) => {
            card.classList.remove('card-landed');
            void card.offsetWidth;
            setTimeout(() => card.classList.add('card-landed'), i * 150);
          });
        } else {
          cards.forEach(card => card.classList.remove('card-landed'));
        }
      });
    }, { threshold: 0.15 });
    projObs.observe(projectsBox);
  }

  /* ============================
     Certification cards zoom+rotate fly-in + float
     ============================ */
  const certsBox = document.querySelector('.certifications-box');
  if (certsBox) {
    const certObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const cards = document.querySelectorAll('.certificate-box');
        if (entry.isIntersecting) {
          cards.forEach((card, i) => {
            card.classList.remove('card-landed');
            void card.offsetWidth;
            setTimeout(() => card.classList.add('card-landed'), i * 180);
          });
        } else {
          cards.forEach(card => card.classList.remove('card-landed'));
        }
      });
    }, { threshold: 0.15 });
    certObs.observe(certsBox);
  }

  /* ============================
     Typing effect — right side role cycle
     ============================ */
  const typedEl = document.querySelector('.typed-text');
  if (typedEl) {
    const words = [
      'Software Engineer',
      'Full Stack Developer',
      'AI Engineer',
      'Data Analyst'
    ];

    let wi = 0;
    let ci = 0;
    let deleting = false;

    function type() {
      const word = words[wi];
      typedEl.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);

      if (!deleting && ci > word.length) {
        deleting = true;
        setTimeout(type, 1000);
        return;
      }

      if (deleting && ci < 0) {
        deleting = false;
        wi = (wi + 1) % words.length;
        ci = 0;
      }

      setTimeout(type, deleting ? 55 : 95);
    }

    type();
  }


  /* ============================
     Hello Welcome — letter by letter fly from left (re-triggers on scroll into view)
     ============================ */
  const helloEl = document.getElementById('hello-text');
  if (helloEl) {
    const text = 'Hello Welcome!!';
    helloEl.innerHTML = text.split('').map(ch =>
      `<span class="hello-letter">${ch === ' ' ? '&nbsp;' : ch}</span>`
    ).join('');

    function triggerHelloAnimation() {
      const letters = helloEl.querySelectorAll('.hello-letter');
      helloEl.classList.remove('animated');
      letters.forEach(l => l.classList.remove('fly-in', 'float'));
      void helloEl.offsetWidth;

      const letterDelay = 220; // wait for each letter to land before next
      letters.forEach((l, i) => {
        setTimeout(() => l.classList.add('fly-in'), i * letterDelay);
      });
    }

    const heroSection = document.getElementById('home');
    const helloObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) triggerHelloAnimation();
      });
    }, { threshold: 0.4 });

    if (heroSection) helloObs.observe(heroSection);
    else triggerHelloAnimation();
  }



  /* ============================
     Typing effect — Profile card (left corner)
     ============================ */
  function runTypingCycle({ el, cursorEl, texts, startDelay = 350, typeSpeed = 95, deleteSpeed = 60, holdMs = 900 }) {
    if (!el) return;

    el.textContent = '';

    let ti = 0;
    let ci = 0;
    let deleting = false;

    if (cursorEl) cursorEl.style.display = '';

    const getText = () => texts[ti];

    function tick() {
      if (!el) return;

      cursorEl && (cursorEl.style.display = '');

      const text = getText();

      if (!deleting) {
        el.textContent = text.slice(0, ci++);
        if (ci > text.length) {
          deleting = true;
          setTimeout(tick, holdMs);
          return;
        }
        setTimeout(tick, typeSpeed);
      } else {
        el.textContent = text.slice(0, ci--);
        if (ci < 0) {
          deleting = false;
          ti = (ti + 1) % texts.length;
          ci = 0;
          setTimeout(tick, 300);
          return;
        }
        setTimeout(tick, deleteSpeed);
      }
    }

    setTimeout(tick, startDelay);
  }

  // Home left card is now static (no typing animation)

  // (Removed typing cycles for .profile-name-typed and .profile-role-typed)







  /* ============================
     Typing effect — section headings (continuous loop)
     ============================ */
  const headingSpans = document.querySelectorAll('.section-title-typed[data-text]');

  headingSpans.forEach(span => {
    const fullText = span.getAttribute('data-text') || '';
    if (!fullText) return;

    span.textContent = '';
    const cursor = span.nextElementSibling;

    const headingWrap = span.closest('h2');
    let started = false;

    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!started && entry.isIntersecting) {
          started = true;
          obs.disconnect();

          let i = 0;
          let deleting = false;

          function runLoop() {
            if (!deleting) {
              span.textContent = fullText.slice(0, i++);
              if (i > fullText.length) {
                deleting = true;
                if (cursor) cursor.style.display = '';
                setTimeout(runLoop, 1200);
                return;
              }
            } else {
              span.textContent = fullText.slice(0, i--);
              if (i < 0) {
                deleting = false;
                i = 0;
                setTimeout(runLoop, 400);
                return;
              }
            }
            setTimeout(runLoop, deleting ? 50 : 80);
          }

          if (cursor) cursor.style.display = '';
          runLoop();
        }
      });
    }, { threshold: 0.35 });

    obs.observe(headingWrap || span);
  });


  /* ============================
     Skill tags fly-in on scroll
     ============================ */
  const skillsBox = document.querySelector('.skills-box');
  if (skillsBox) {
    const skillObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const tags = document.querySelectorAll('.skill-tag');
        if (entry.isIntersecting) {
          tags.forEach((tag, i) => {
            tag.classList.remove('landed');
            void tag.offsetWidth;
            setTimeout(() => tag.classList.add('landed'), i * 80);
          });
        } else {
          tags.forEach(tag => tag.classList.remove('landed'));
        }
      });
    }, { threshold: 0.2 });
    skillObs.observe(skillsBox);
  }

  /* ============================
     Hamburger menu
     ============================ */
  const hamburger = document.querySelector('.hamburger');
  const navLinksContainer = document.querySelector('.nav-links');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinksContainer.classList.toggle('open');
    });
  }
});
