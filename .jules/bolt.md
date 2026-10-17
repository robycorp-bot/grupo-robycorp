## 2025-02-18 - Scroll Animation Layout Thrashing in `useMotion`
**Learning:** `useMotion` updates CSS custom properties (`--stage`, `--ink`) on multiple DOM elements inside `requestAnimationFrame` on scroll. Interleaving `getBoundingClientRect()` (READ) and `style.setProperty()` (WRITE) inside `.forEach()` loops forced synchronous layout recalculation on every element per scroll frame.
**Action:** When animating multiple DOM elements on scroll/rAF, batch all DOM layout reads into `.map()` before applying style writes in `.forEach()`.
