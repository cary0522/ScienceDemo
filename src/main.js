import { createApp } from "vue";
import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router";

import "./style.css";
/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { createI18n } from "vue-i18n";
const vuetify = createVuetify({ components, directives });

const app = createApp(App);
const pinia = createPinia();
pinia.use(createPersistedState);

app.use(pinia);
app.use(router);
const currentRoute = router.currentRoute.value;
window.document.title = currentRoute.meta.title;
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(vuetify);

import ch from "./i18n/ch.json";
import en from "./i18n/en.json";
import ja from "./i18n/ja.json";
const UserLocale = window.localStorage.getItem("UserLocale") || "ch";

const i18n = createI18n({
    legacy: false,
    locale: UserLocale,
    fallbackLocale: 'en',
    messages: {
        en,
        ch
    }
})
app.use(i18n);
app.mount("#app");
