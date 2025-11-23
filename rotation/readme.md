# Rotating Image Display Demo

Files in this folder:

- `index.html` — demo page
- `styles.css` — styling for the carousel
- `script.js` — JavaScript carousel logic

How to use

1. Open `index.html` in your browser (double-click, or right-click -> Open with).
2. The carousel auto-rotates every 3s; use the left/right arrows or the dots to navigate.
3. Hover the carousel to pause autoplay; mouse leave resumes it.

Notes

- The demo uses inline SVG data URLs so it works offline without external images.
- You can replace `svgs` in `script.js` with your own image URLs if desired.

Animation modes

- The carousel supports two animation modes: `fade` (default) and `slide`.
- Switch modes in the console or from other scripts using:

```js
// Use slide animation
window.simpleCarousel.setAnimation('slide')

// Back to fade
window.simpleCarousel.setAnimation('fade')
```

When using `slide`, the slides are placed in a row and the container is translated horizontally.
