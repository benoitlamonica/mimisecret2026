import HomePage from '../pages/HomePage.vue'
import CalendarPage from '../pages/CalendarPage.vue'
import ShopPage from '../pages/ShopPage.vue'
import CollectionPage from '../pages/CollectionPage.vue'

export default [
    {
        path: '/',
        name: 'Home',
        component: HomePage,
    },
    {
        path: '/calendar',
        name: 'Calendar',
        component: CalendarPage,
    },
    {
        path: '/shop',
        name: 'Shop',
        component: ShopPage,
    },
    {
        path: '/collection',
        name: 'Collection',
        component: CollectionPage,
    },
]