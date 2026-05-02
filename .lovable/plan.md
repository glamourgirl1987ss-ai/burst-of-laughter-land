# ЩуроБъркотия — Playful Landing Page

A single, vibrant, mobile-friendly landing page in Bulgarian for the children's card game **ЩуроБъркотия**. Comic/pop-art style with floating emojis, splashes, and bold rounded typography.

## Visual style

- **Palette:** sunny yellow, electric blue, tomato red, grape purple, bubblegum pink — high contrast on a cream/white base with colorful splashes.
- **Typography:** bold rounded display font (Fredoka / Baloo 2) for headings, friendly sans for body.
- **Decoration:** SVG paint splashes, halftone dots, wobbly borders, sticker-style cards with slight rotations and drop shadows.
- **Animations:** floating emojis (gentle up/down + rotate), hover scale on buttons and cards, subtle wiggle on the title, fade-in on scroll.

## Page sections (all on `/`)

1. **Sticky nav** — logo wordmark + anchor links (За играта, Как се играе, Галерия, Поръчай).
2. **Hero**
   - Title: *"ЩуроБъркотия – играта, която ще ви взриви от смях"*
   - Subtitle: *"Играй! Смей се! Познай!"*
   - CTA button: *"Поръчай тук"* (scrolls to order form)
   - Floating emojis around the section: 🤪 😂 🤡 🙃 🎉 🃏 💥
   - Confetti/splash background blobs.
3. **About the game**
   - Intro line: *"Комбинирай карти, влизай в щури роли и създавай най-забавните ситуации!"*
   - Three large tilted card mockups side-by-side:
     - 🟡 **Жълти — Кой съм**
     - 🔵 **Сини — Какво съм**
     - 🔴 **Червени — Какво правя**
   - Bonus card highlight: *"Бонус карти – още по-забавни предизвикателства!"*
4. **How to play** — 4 numbered playful steps with icons:
   1. Теглиш по една карта от всеки цвят
   2. Комбинираш ги
   3. Изиграваш ситуацията
   4. Другите познават
5. **Gallery** — *"Виж как се забавляват децата"* — responsive grid of 6 placeholder images (easy to swap later, clearly marked).
6. **Product** — game box mockup on the left, feature list with icons on the right:
   - 👶 3–99 години
   - 👥 2–6 играчи
   - ⏱️ 15–30 минути
7. **Order form** — Име, Телефон, Адрес + button *"Поръчай сега"*. Client-side validation; on submit show a friendly success toast (no backend yet — easy to wire later).
8. **Footer** — small wordmark, short tagline *"Създадено за смях и забавление"*, social icons (Facebook, Instagram, TikTok).

## Editability & structure

- Section content (titles, copy, card definitions, steps, features, gallery images) lives in a single `src/content/landing.ts` constants file so non-devs can tweak text easily.
- Each section is its own component under `src/components/landing/` (Hero, About, HowToPlay, Gallery, Product, OrderForm, Footer, FloatingEmojis, Nav).
- Reusable `SplashBg` and `FloatingEmoji` helpers for the playful background.

## Technical notes

- Build on the existing TanStack Start setup; replace placeholder content in `src/routes/index.tsx`.
- Add Google Fonts (Fredoka + Baloo 2) via a `<link>` in `__root.tsx` head.
- Extend `src/styles.css` with the playful palette (yellow/blue/red/purple/pink as CSS vars) and keyframes for `float`, `wiggle`, `pop-in`.
- Use shadcn `button`, `input`, `label`, `sonner` (toast) — all already present.
- Order form: local state + zod validation; submit handler is a stub `onOrder()` ready to be replaced with a server function or email integration later.
- Mobile-first layout with Tailwind responsive utilities; gallery and card rows collapse to single column on small screens.
- No backend or auth required for this iteration.
