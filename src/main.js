import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBell as fasBell, faHome as fasHome, faSearch as fasSearch, faUserAlt as fasUser, faPaperPlane as fasPapaerPlane, faArrowLeft as fasArrowLeft, faTimes as fasClose } from '@fortawesome/free-solid-svg-icons'
import { faBell as farBell, faCopy as farCopy, faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import api from './modules/axios.js'
import focus from './modules/focus'

library.add(fasBell, farBell, farCopy, farHeart, fasHome, fasSearch, fasUser, fasPapaerPlane, fasArrowLeft, fasClose)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.prototype.$axios = api
Vue.use(focus)

store.dispatch('loadStates')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
