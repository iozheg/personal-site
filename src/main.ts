import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import 'highlight.js/styles/vs2015.css';
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import scss from 'highlight.js/lib/languages/scss';
import hljsVuePlugin from "@highlightjs/vue-plugin";


import "./assets/main.css";

const app = createApp(App);

app.use(router);

hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('scss', scss);
app.use(hljsVuePlugin);

app.mount("#app");
