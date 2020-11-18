import { defineAsyncComponent, App } from "vue";

function Register(context: App<Element>) {
    context.component(`shared-timer`, defineAsyncComponent(() => import(`./SharedTimer.vue`)));
}

export {
    Register as RegisterComponents,
};