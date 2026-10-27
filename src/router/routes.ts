import HomePage from '../pages/HomePage.vue'
import CollectionPage from '../pages/CollectionPage.vue'

export default [
    {
        path: '/',
        name: 'Home',
        component: HomePage,
    },
    {
        path: '/collection',
        name: 'Collection',
        component: CollectionPage,
    },
]