import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Profile from './views/Profile.vue'
import Explore from './views/Explore.vue'
import Post from './views/Post.vue'
import NewBook from './views/newbook.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/explore',
      name: 'explore',
      component: Explore
    },
    {
      path: '/me',
      name: 'profile',
      component: Profile,
      children: [
        { path: 'newbook', component: NewBook, name: 'create book' }
      ]
    },
    {
      path: '/publish',
      name: 'publish',
      component: Post,
      props: true
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Profile.vue')
    }
  ]
})
