import { DESCRIPTION_TYPES } from "./enums";
import type { ITile } from "./types";

export const skillTiles: ITile[] = [{
  id: "html",
  title: "HTML",
  description: "HTML"
}, {
  id: "css",
  title: "CSS / SASS",
  description: "CSS / SASS"
}, {
  id: "js",
  title: "JavaScript / TypeScript",
  description: "JavaScript / TypeScript"
}, {
  id: "vue",
  title: "Vue",
  description: "Vue"
}, {
  id: "pixijs",
  title: "PixiJS",
  description: "PixiJS"
}];

export const skillContent: {
  [key in string]?: string;
} = {
  html: `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <link rel="icon" href="/favicon.ico">
    <meta
      name="viewport"
      content="width=device-width,
      initial-scale=1.0"
    >
    <title>Vite App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
  `,
  css: `
.single-tile {
  flex-shrink: 0;
  width: 256px;
  height: 256px;
  padding: 15px 30px;
  background-color: #FFFFFF;

  transition: opacity 0.5s linear, box-shadow 0.5s, left 0.5s;

  &--clickable {
    cursor: pointer;
    z-index: 2;

    &:hover {
      box-shadow: 0px 0px 3px 0px #333333;
      z-index: 99;
    }
  }

  &__title {
    font-size: 36px;
    color: #000000;
  }

  &--highlighted {
    background-color: #2D2D2D;
  }

  &--highlighted &__title {
    color: #FFFFFF;
  }

  &__back-button {
    padding: 0;
    border: none;
    background: none;
    color: #FFFFFF;
    cursor: pointer;
  }
}
  `,
  js: `
let currentContent = ref("");

let i = 0;
function type() {
    if (i < props.content.length) {
      currentContent.value += props.content[i];
      i++;
    }
    setTimeout(type, 10);
}

type();
  `,
  vue: `
<script setup lang="ts">
defineProps<{
  title?: string;
  description?: string;
  highlighted?: boolean;
}>();

const emit = defineEmits<{
  (e: "select"): void;
}>();

function select() {
  emit("select");
}
</script>
  `,
  pixijs: ""
};

export const contactTiles: ITile[] = [{
  id: "email",
  title: "E-mail",
  description: {
    type: DESCRIPTION_TYPES.link,
    label: "aknetsev@gmail.com",
    href: "mailto:https://github.com/iozheg"
  }
}, {
  id: "github",
  title: "GitHub",
  description: {
    type: DESCRIPTION_TYPES.link,
    label: "https://github.com/iozheg",
    href: "https://github.com/iozheg"
  }
}, {
  id: "linkedin",
  title: "LinkedIn",
  description: {
    type: DESCRIPTION_TYPES.link,
    label: "https://www.linkedin.com/in/aleksandr-netsev/",
    href: "https://www.linkedin.com/in/aleksandr-netsev/g"
  }
}, {
  id: "telegram",
  title: "Telegram",
  description: {
    type: DESCRIPTION_TYPES.link,
    label: "@netsev",
    href: "tg://resolve?domain=@netsev"
  }
}];

export const aboutTiles: ITile[] = [{
  id: "photo",
  title: "Photo",
  description: {
    type: DESCRIPTION_TYPES.image,
    imageUrl: "me.jpeg"
  }
}];