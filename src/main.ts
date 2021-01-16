import { createApp } from "vue"
import App from "./App.vue"
import "./registerServiceWorker"
import router from "./router"
import { makeServer } from "./MockApiServer"

if (process.env.NODE_ENV === "development") {
  makeServer()
}

// import axios from "axios"
// ;(window as any).axios = axios

createApp(App).use(router).mount("#app")
