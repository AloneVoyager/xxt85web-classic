import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SearchView from '../views/SearchView.vue'
import DownloadsView from '../views/DownloadsView.vue'
import MediasView from '../views/MediasView.vue'
import AboutView from '../views/AboutView.vue'
import ArticleView from '../views/ArticleView.vue'
import FourthAnniversaryView from '../views/FourthAnniversaryView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView,
    },
    {
      path: '/downloads',
      name: 'downloads',
      component: DownloadsView,
    },
    {
      path: '/medias',
      name: 'medias',
      component: MediasView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/4thanniversary',
      name: '4thanniversary',
      component: FourthAnniversaryView,
    },
    {
      path: '/article/:id',
      name: 'article',
      component: ArticleView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
})

export default router
