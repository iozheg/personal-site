import { DESCRIPTION_TYPES, CONTENT_TYPES } from "./enums";
import type { ITile } from "./types";

export const skillTiles: ITile[] = [{
  id: "html",
  title: "HTML",
  description: "Template for SingleTile component."
}, {
  id: "css",
  title: "CSS / SASS",
  description: "Some styles from SingleTile with simple animation."
}, {
  id: "js",
  title: "JavaScript / TypeScript",
  description: "Simple snippet to imitate typing."
}, {
  id: "vue",
  title: "Vue",
  description: "VueJS 3 component for SingleTile using Composition API."
}, {
  id: "pixijs",
  title: "PixiJS",
  description: "PixiJS",
  contentType: CONTENT_TYPES.pixi
}];

export const skillContent: {
  [key in string]?: string;
} = {
  html: `
<div
  class="single-tile"
  :class="{
    'single-tile--clickable': isClickable,
    'single-tile--hidden': hidden,
    'single-tile--dark': dark
  }"
  @click="emit('select')"
>
  <button
    v-if="!isClickable && dark"
    class="single-tile__back-button"
    @click="emit('return')"
  >
    &larr; back
  </button>
  <div class="single-tile__title">
    {{ tile.title }}
  </div>
  <template v-if="showDescription">
    <component
      v-if="descViewer"
      :is="descViewer"
      v-bind="tile.description"
    />
    <div v-else v-html="tile.description" class="single-tile__description">
  </div>
  </template>
</div>
  `,
  css: `
.single-tile {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  flex-shrink: 0;
  width: var(--big-tile-size);
  height: var(--big-tile-size);
  padding: 15px 30px;
  background-color: #FFFFFF;
  transition: box-shadow 0.5s, left 0.5s;

  &--clickable {
    cursor: pointer;
    z-index: 2;

    &:hover {
      box-shadow: 0px 0px 3px 0px #333333;
      z-index: 99;
    }
  }

  &--hidden {
    animation: hide var(--tile-transition-time) forwards;
  }

  &--dark {
    background-color: #2D2D2D;
  }

  &__title {
    min-height: 56px;
    font-size: 36px;
    color: #000000;
  }

  &--dark &__description {
    color: var(--color-text);
  }

  &--dark &__title {
    color: #FFFFFF;
  }

  &__back-button {
    padding: 0;
    border: none;
    background: none;
    color: #FFFFFF;
    cursor: pointer;
  }

  &__description {
    color: #000000;
    overflow-wrap: break-word;
  }
}

@keyframes hide {
    to {
        height: 0;
    }
}

@keyframes show {
    to {
        height: unset;
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
import { DESCRIPTION_TYPES } from '@/enums';
import type { ITile } from '@/types';
import { computed } from 'vue';
import ImageViewer from './descriptionViewers/ImageViewer.vue';
import EmailViewer from './descriptionViewers/LinkViewer.vue';
import ListViewer from './descriptionViewers/ListViewer.vue';

const props = defineProps<{
  tile: ITile;
  clickable?: boolean;
  hidden?: boolean;
  dark?: boolean;
}>();

const emit = defineEmits<{
  (e: "select"): void;
  (e: "return"): void;
}>();

const descriptionViewers = {
  [DESCRIPTION_TYPES.string]: undefined,
  [DESCRIPTION_TYPES.link]: EmailViewer,
  [DESCRIPTION_TYPES.image]: ImageViewer,
  [DESCRIPTION_TYPES.list]: ListViewer
};

const descViewer = computed(() => {
  return typeof props.tile.description === "object"
    ? descriptionViewers[props.tile.description.type]
    : descriptionViewers[DESCRIPTION_TYPES.string];
});

const isClickable = computed(() => props.clickable ?? true);
const showDescription = computed(() => !isClickable.value);
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
}, {
  id: "instagram",
  title: "Instagram",
  description: {
    type: DESCRIPTION_TYPES.link,
    label: "@alex.netsev",
    href: "https://www.instagram.com/alex.netsev/"
  }
}];

export const aboutTiles: ITile[] = [{
  id: "photo",
  title: "Photo",
  description: {
    type: DESCRIPTION_TYPES.image,
    imageUrl: "me.jpg"
  }
}, {
    id: "techStack",
    title: "Tech stack",
    description: {
      type: DESCRIPTION_TYPES.list,
      items: ["JS/TS", "VueJS", "PixiJS", "Webpack", "GraphQL", "CSS/SCSS", "Git"]
    }
}, {
  id: "passions",
  title: "Passions",
  description: {
    type: DESCRIPTION_TYPES.list,
    items: ["clean code", "linting", "bug search", "new technologies"]
  }
}, {
  id: "education",
  title: "Education",
  description: {
    type: DESCRIPTION_TYPES.list,
    items: ["Web dev (self-study)", "Google ML crush course (in progress)"]
  }
}, {
  id: "hobbies",
  title: "Hobbies",
  description: {
    type: DESCRIPTION_TYPES.list,
    items: ["motorcycles", "snowbording", "walking", "coding"]
  }
}, {
  id: "languages",
  title: "Languages",
  description: {
    type: DESCRIPTION_TYPES.list,
    items: ["russian (native)", "english (B1/B2)"]
  }
}, {
  id: "experience",
  title: "Experience",
  description: {
    type: DESCRIPTION_TYPES.list,
    items: ["Web dev from 2017", "JS: 6+ years", "TS: 2 years", "Vue: 3+ years", "PixiJS: 2+ years"]
  }
}];