import cardYellowRobot from "@/assets/card-yellow-robot.png";
import cardBlueFunny from "@/assets/card-blue-funny.png";
import cardRedTiptoe from "@/assets/card-red-tiptoe.png";
import gallery1 from "@/assets/gallery-1.png";
import gallery2 from "@/assets/gallery-2.png";
import gallery3 from "@/assets/gallery-3.png";

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
    tagline: "Играта, която ще ви взриви от смях",
    subtitle: "Играй! Смей се! Познай!",
    cta: "Поръчай тук",
    price: "19,90 €",
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
      { src: gallery1, alt: "Деца се смеят и играят ЩуроБъркотия на масата" },
      { src: gallery2, alt: "Семейство комбинира карти от играта ЩуроБъркотия" },
      { src: gallery3, alt: "Приятели изиграват щура ситуация с карти от ЩуроБъркотия" },
    ],
  },
  product: {
    heading: "Щурата кутия",
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
    price: "19,90 €",
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