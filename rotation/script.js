// Rotating image display (carousel)
(function(){
  // Simple inline SVG slides — avoids external image dependencies.
  // animationMode: 'fade' or 'slide'
  let animation = 'fade';

  const svgs = [
    `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 600'>
      <defs>
        <linearGradient id='g1' x1='0' x2='1'>
          <stop offset='0' stop-color='#ff6b6b'/>
          <stop offset='1' stop-color='#f7d794'/>
        </linearGradient>
      </defs>
      <rect width='100%' height='100%' fill='url(#g1)' />
      <text x='50%' y='50%' font-size='64' fill='#fff' font-family='Segoe UI, Roboto, Arial' text-anchor='middle' dominant-baseline='middle'>Beautiful Sunset</text>
    </svg>
    `,

    `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 600'>
      <defs>
        <linearGradient id='g2' x1='0' x2='1'>
          <stop offset='0' stop-color='#54a0ff'/>
          <stop offset='1' stop-color='#5f27cd'/>
        </linearGradient>
      </defs>
      <rect width='100%' height='100%' fill='url(#g2)' />
      <text x='50%' y='50%' font-size='64' fill='#fff' font-family='Segoe UI, Roboto, Arial' text-anchor='middle' dominant-baseline='middle'>Ocean View</text>
    </svg>
    `,

    `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 600'>
      <defs>
        <linearGradient id='g3' x1='0' x2='1'>
          <stop offset='0' stop-color='#00d2d3'/>
          <stop offset='1' stop-color='#3a7bd5'/>
        </linearGradient>
      </defs>
      <rect width='100%' height='100%' fill='url(#g3)' />
      <text x='50%' y='50%' font-size='64' fill='#fff' font-family='Segoe UI, Roboto, Arial' text-anchor='middle' dominant-baseline='middle'>Mountain Peak</text>
    </svg>
    `
  ];

  const slidesContainer = document.getElementById('slides');
  const indicatorsContainer = document.getElementById('indicators');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const carousel = document.getElementById('carousel');

  // Initialize animation class on carousel element
  carousel.classList.remove('fade','slide');
  carousel.classList.add(animation);

  function svgToDataUri(svg){
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg.trim());
  }

  // Create slide elements
  svgs.forEach((svg, i) => {
    const img = document.createElement('img');
    img.className = 'slide';
    img.src = svgToDataUri(svg);
    img.alt = `Slide ${i+1}`;
    if(i === 0) img.classList.add('active');
    slidesContainer.appendChild(img);

    const dot = document.createElement('button');
    dot.className = 'indicator';
    dot.setAttribute('role','tab');
    dot.setAttribute('aria-label', `Go to slide ${i+1}`);
    if(i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    indicatorsContainer.appendChild(dot);
  });

  let slides = Array.from(document.querySelectorAll('.slide'));
  let indicators = Array.from(document.querySelectorAll('.indicator'));
  let current = 0;
  let interval = null;
  const delay = 3000;

  function updateLists(){
    slides = Array.from(document.querySelectorAll('.slide'));
    indicators = Array.from(document.querySelectorAll('.indicator'));
  }

  function show(index){
    updateLists();
    const idx = ((index % slides.length) + slides.length) % slides.length;

    if(animation === 'fade'){
      slides.forEach((s,i)=> s.classList.toggle('active', i===idx));
    } else if(animation === 'slide'){
      // ensure slides container uses transform to shift slides
      slidesContainer.style.transform = `translateX(-${idx * 100}%)`;
      // mark active indicator for accessibility/visual
      slides.forEach((s,i)=> s.classList.toggle('active', i===idx));
    }

    indicators.forEach((d,i)=> d.classList.toggle('active', i===idx));
    current = idx;
  }

  function goTo(index){
    const idx = ((index % slides.length) + slides.length) % slides.length;
    show(idx);
  }

  function next(){ goTo(current + 1); }
  function prev(){ goTo(current - 1); }

  prevBtn.addEventListener('click', () => { prev(); resetTimer(); });
  nextBtn.addEventListener('click', () => { next(); resetTimer(); });

  function startTimer(){
    if(interval) return;
    interval = setInterval(() => next(), delay);
  }

  function stopTimer(){
    if(!interval) return;
    clearInterval(interval);
    interval = null;
  }

  function resetTimer(){
    stopTimer();
    startTimer();
  }

  // Pause on hover
  carousel.addEventListener('mouseenter', stopTimer);
  carousel.addEventListener('mouseleave', startTimer);

  // Keyboard support
  document.addEventListener('keydown', (e) =>{
    if(e.key === 'ArrowLeft') { prev(); resetTimer(); }
    if(e.key === 'ArrowRight') { next(); resetTimer(); }
  });

  // Start autoplay
  startTimer();

  // Expose a small API for future extensions
  function setAnimation(mode){
    if(mode !== 'fade' && mode !== 'slide') return;
    animation = mode;
    carousel.classList.remove('fade','slide');
    carousel.classList.add(animation);

    // Reset transform when switching modes
    if(animation === 'slide'){
      slidesContainer.style.transform = `translateX(-${current * 100}%)`;
    } else {
      slidesContainer.style.transform = '';
    }

    // Re-render current state
    show(current);
  }

  window.simpleCarousel = { goTo, next, prev, start: startTimer, stop: stopTimer, setAnimation };

})();
