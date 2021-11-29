'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//////////////////////////////////////////////////////
console.log(document.body);
const header = document.querySelector('.header');
console.log(document.querySelectorAll('.section'));
console.log(document.getElementsByTagName('button'));

////Creating and selecting elements
//.insertAdjacentHTML
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.textContent =
//   'We use cookies for improved functionality and analytics.';
// message.innerHTML =
//   'We use cookies for improved functionality and analytics.<button class="btn btn--close-cookie">Got it!</button>';
// // header.prepend(message);
// header.append(message);
// // header.append(message.cloneNode(true));
// // header.before(message);
// // header.after(message);

// //Deleting elements
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     message.remove();
//   });

// //Styles
// message.style.backgroundColor = '#37383d';
// message.style.width = '104.6%';
// console.log(message.style.backgroundColor);
// console.log(getComputedStyle(message).color);
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';
//////////////////////////////////////////////////////////
///How to change values in the root element in css-->(:root{})

//Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.src);
logo.alt = 'Beautiful minimalist logo';
console.log(logo.alt);

///Data Attributes
console.log(logo.dataset.versionNumber);
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnScrollTo.addEventListener('click', function (e) {
  const s1cords = section1.getBoundingClientRect();
  console.log(s1cords);

  section1.scrollIntoView({ behavior: 'smooth' });
});

//Page Navigation
//Event Delegation
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');

//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });
////////Implementation//////
//1.Add event listener to common parent element
//2.Determine what element originated the event.
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  //Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//Tabbed component

tabsContainer.addEventListener('click', e => {
  const clicked = e.target.closest('.operations__tab');
  //Guard clause
  if (!clicked) return;

  //Remove active class
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  //Activate tab
  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//Menu Fade animation

const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const sibling = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    sibling.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
//Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

///Sticky Navigation: Intersection observer API
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 1,
});
headerObserver.observe(document.querySelector('.obs'));
// Reveal Sections
const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(section => {
  sectionObserver.observe(section);
});

//Lazy loading Images
const imgTargets = document.querySelectorAll('img[data-src');
const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  //Replace src attribute with data-src attribute
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function (e) {
    entry.target.classList.remove('lazy-img');
    observer.unobserve(entry.target);
  });
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
imgTargets.forEach(img => {
  imgObserver.observe(img);
});

//Building a slider component
//Slider
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');
const createDots = function () {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
createDots();
const activateDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};
activateDot(0);
slides.forEach((s, i) => {
  s.style.transform = `translateX(${100 * i}%)`;
});

/// 0%,100%,200%,300%
let curSlide = 0;
const maxSlide = slides.length - 1;
//Next Slide
const nextSlide = function (e) {
  if (curSlide === maxSlide) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - curSlide)}%)`;
  });
  activateDot(curSlide);
};
const prevSlide = function (e) {
  if (curSlide === 0) {
    curSlide = 0;
  } else {
    curSlide--;
  }
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - curSlide)}%)`;
  });
  activateDot(curSlide);
};
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') prevSlide();
  e.key === 'ArrowRight' && nextSlide();
});

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
    activateDot(slide);
  }
});

//////////////////////////////////////////////////////////////////////////////////////////
//Bubbles
//rgb(255,255,255)

// //Getting random numbers
// const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1));
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
// console.log(randomColor(0, 255));

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('LINK',e.target);
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });
// const h1 = document.querySelector('h1');
// //Going downwards: child
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.children);
// h1.firstElementChild.style.color = 'white';
// //Going upwards: parents
// console.log(h1.parentNode);

// h1.closest('.header').style.background = 'var(--gradient-secondary)';

// //Going sideways: siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);
// console.log(h1.previousSibling);
// console.log(h1.nextSibling);
// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) {
//     el.style.transform = 'scale(0.5)';
//   }
// });
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built!', e);
});

window.addEventListener('load', function (e) {
  console.log('Page fully loaded!', e);
});

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = 'message';
// });

/////////////////////////////////////////////////
// const overlay = document.querySelector('.overlay');
// const edit = document.querySelector('.edit');
// const closeM = document.querySelector('.close-modal');
// const overlayOne = document.querySelector('.overlay-1');

// ///closing the popup
// const closeModal = function () {
//   edit.classList.add('hide');
//   overlay.classList.add('hide');
// };
// overlay.addEventListener('click', closeModal);
// closeM.addEventListener('click', closeModal);

// document.addEventListener('keydown', function (esc) {
//   if (esc.key === 'Escape' && !edit.classList.contains('hide')) {
//     closeModal();
//   }
// });
// document.addEventListener('keydown', function (esc) {
//   if (
//     esc.key === 'Escape' &&
//     !document.querySelector('.menu-nav').classList.contains('hide')
//   ) {
//     document.querySelector('.menu-nav').classList.add('hide');
//   }
// });

function myFunction(x) {
  x.classList.toggle('change');
  if (document.querySelector('.container').classList.contains('change')) {
    document.querySelector('.nav-drop').style.transform = 'translateX(-1rem)';
  } else {
    document.querySelector('.nav-drop').style.transform = 'translateX(-25rem)';
  }
}

// overlayOne.addEventListener('click', function () {
//   overlayOne.classList.add('hide');
//   document.querySelector('.menu-nav').classList.add('hide');
//   document.querySelector('.container').classList.remove('change');
// });
document.addEventListener('keydown', function (esc) {
  if (
    esc.key === 'Escape' &&
    document.querySelector('.container').classList.contains('change')
  ) {
    document.querySelector('.container').classList.remove('change');
    document.querySelector('.nav-drop').style.transform = 'translateX(-25rem)';
  }
});
