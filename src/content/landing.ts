import cardYellowRobot from "@/assets/card-yellow-robot.png";
import cardBlueFunny from "@/assets/card-blue-funny.png";
import cardRedTiptoe from "@/assets/card-red-tiptoe.png";

// Easy-to-edit content for the ЩуроБъркотия landing page.
// Update copy, cards, steps, features and gallery here.

export const siteContent = {
  brand: "ЩуроБъркотия",
  nav: [
    { href: "#about", label: "За играта" },
    { href: "#how", label: "Как се играе" },
    { href: "#gallery", label: "Галерия" },
    { href: "#order", label: "Поръчай" },
  ],
  hero: {
    title: "ЩуроБъркотия",
    tagline: "играта, която ще ви взриви от смях",
    subtitle: "Играй! Смей се! Познай!",
    cta: "Поръчай тук",
    floatingEmojis: ["🤪", "😂", "🤡", "🙃", "🎉", "🃏", "💥", "😜", "🥳", "✨"],
  },
  about: {
    heading: "За играта",
    intro:
      "Комбинирай карти, влизай в щури роли и създавай най-забавните ситуации!",
    cards: [
      {
        color: "yellow" as const,
        emoji: "🟡",
        title: "Жълти",
        subtitle: "Кой съм",
        rotation: "-rotate-6",
        image: cardYellowRobot,
      },
      {
        color: "blue" as const,
        emoji: "🔵",
        title: "Сини",
        subtitle: "Какво съм",
        rotation: "rotate-2",
        image: cardBlueFunny,
      },
      {
        color: "red" as const,
        emoji: "🔴",
        title: "Червени",
        subtitle: "Какво правя",
        rotation: "-rotate-3",
        image: cardRedTiptoe,
      },
    ],
    bonus: {
      title: "Бонус карти",
      text: "Още по-забавни предизвикателства!",
    },
  },
  how: {
    heading: "Как се играе",
    steps: [
      { emoji: "🃏", text: "Теглиш по една карта от всеки цвят" },
      { emoji: "🔀", text: "Комбинираш ги" },
      { emoji: "🎭", text: "Изиграваш ситуацията" },
      { emoji: "🤔", text: "Другите познават" },
    ],
  },
  gallery: {
    heading: "Виж как се забавляват децата",
    // Replace these placeholder URLs with real photos later.
    images: [
      { src: "https://placehold.co/600x600/FFD93D/2A2A2A?text=📸+1", alt: "Снимка 1" },
      { src: "https://placehold.co/600x600/4ECDC4/2A2A2A?text=📸+2", alt: "Снимка 2" },
      { src: "https://placehold.co/600x600/FF6B6B/FFFFFF?text=📸+3", alt: "Снимка 3" },
      { src: "https://placehold.co/600x600/A66DD4/FFFFFF?text=📸+4", alt: "Снимка 4" },
      { src: "https://placehold.co/600x600/FF8FB1/2A2A2A?text=📸+5", alt: "Снимка 5" },
      { src: "https://placehold.co/600x600/FFD93D/2A2A2A?text=📸+6", alt: "Снимка 6" },
    ],
  },
  product: {
    heading: "Кутията с лудост",
    description:
      "Всичко, от което имаш нужда за един незабравим купон със семейството и приятелите.",
    features: [
      { emoji: "👶", label: "3 – 99 години" },
      { emoji: "👥", label: "2 – 6 играчи" },
      { emoji: "⏱️", label: "15 – 30 минути" },
    ],
  },
  order: {
    heading: "Поръчай сега",
    subheading: "Попълни данните и ние ще се свържем с теб!",
    submit: "Поръчай сега",
    success: "Благодарим! Ще се свържем с теб скоро. 🎉",
  },
  footer: {
    tagline: "Създадено за смях и забавление",
    socials: [
      { name: "Facebook", href: "#" },
      { name: "Instagram", href: "#" },
      { name: "TikTok", href: "#" },
    ],
  },
};

export type CardColor = "yellow" | "blue" | "red";