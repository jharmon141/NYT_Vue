import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Saved from '@/components/Saved'
import Search from '@/components/Search'
import Results from '@/components/Results'

Vue.use(Router)

export default new Router({
  routes: [
    { 
      path: '/', redirect: '/search' 
    },
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
    },
    {
      path: '/results',
      name: 'results',
      component: Results,
    },
    {
      path: '/saved',
      name: 'Saved',
      component: Saved,
    },
  ]
})
