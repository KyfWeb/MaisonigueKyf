///////////////////////////////////////////////////////////
// Set current year
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();

yearEl.textContent = currentYear;

/*console.log(currentYear);*/

///////////////////////////////////////////////////////////
// Make mobile navigation work
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

document.querySelectorAll(".main-nav-link").forEach((link) =>
  link.addEventListener("click", function () {
    headerEl.classList.remove("nav-open");
  })
);

///////////////////////////////////////////////////////////
// Sticky Navigation

const sectionHeroEl =
  document.querySelector(".section-slider") ||
  document.querySelector(".sticky-trigger");

/*console.log("Thank You");*/

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    /*console.log(ent);*/

    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }
    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    // In the ViewPort
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
 /* console.log(isSupported);*/

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js


///// SLIDER

const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider-btn--left");
const btnRight = document.querySelector(".slider-btn--right");
const slider = document.querySelector(".slider");

let currentSlide = 0;
const maxSlide = slides.length - 1;

function goToSlide(slide, transition = true) {
  slider.style.transition = transition ? "transform 0.6s ease" : "none";
  slider.style.transform = `translateX(-${slide * 100}%)`;
}



// ➡️ Avancer
btnRight.addEventListener("click", () => {
  currentSlide++;
  goToSlide(currentSlide);

  // Si on est sur la copie du premier (slide 4)
  if (currentSlide === slides.length - 1) {
    // Après l'animation de transition (600ms), on saute sans transition au vrai premier
    setTimeout(() => {
      currentSlide = 0;
      goToSlide(currentSlide, false); // false = sans animation
    }, 600);
  }
});

// ⬅️ Reculer
btnLeft.addEventListener("click", () => {
  // Si on est au premier slide réel (slide 0)
  if (currentSlide === 0) {
    // Aller à la dernière (copie du dernier)
    currentSlide = slides.length - 1;
    goToSlide(currentSlide, false);
    // Ensuite animer vers l'avant vers le vrai dernier
    setTimeout(() => {
      currentSlide = realSlideCount - 1;
      goToSlide(currentSlide);
    }, 20); // petite pause pour laisser le temps à la transition "none"
  } else {
    currentSlide--;
    goToSlide(currentSlide);
  }
});

// Initialisation
goToSlide(currentSlide);

    
/* SLIDE PERSONNALISE */
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide1(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}
