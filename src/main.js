//--------------CODIGO P/ PWA-------------------------
if('serviceWorker' in navigator){
  navigator.serviceWorker.register('../public/sw.js')
  .then(function(registration){
    console.log("registration successful, scope is:",registration.scope)
  })
  .catch(function(error){
    console.log("service worker registration failed, error: ", error)
  });
}


//--------------CODIGO NATIVO-------------------------
import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

createApp(App)
  .use(vuetify)
  .mount('#app')
