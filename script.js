const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

toggle.addEventListener('click', () => {
  const expanded = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('open');
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));

document.querySelector('#year').textContent = new Date().getFullYear();

const intro = document.querySelector('#site-intro');
const introVideo = document.querySelector('#intro-video');
const skipIntro = document.querySelector('#skip-intro');

if (intro && introVideo && skipIntro) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let alreadyShown = false;

  try {
    alreadyShown = sessionStorage.getItem('empact-intro-seen') === 'true';
  } catch (error) {
    alreadyShown = false;
  }

  const closeIntro = () => {
    intro.classList.add('is-hidden');
    try {
      sessionStorage.setItem('empact-intro-seen', 'true');
    } catch (error) {
      // The introduction still closes when browser storage is unavailable.
    }
  };

  if (prefersReducedMotion || alreadyShown) {
    closeIntro();
  } else {
    introVideo.play().catch(() => {});
    introVideo.addEventListener('ended', closeIntro, { once: true });
    skipIntro.addEventListener('click', closeIntro);
    window.setTimeout(closeIntro, 9000);
  }
}
