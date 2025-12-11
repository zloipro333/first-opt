import { 
    Welcome, 
    Сosmetic, 
        Decorative, Face, Body, Hands, Hair,
    Household, 
    Accessories 
} from '../components/PriceCaption'

export default [
    {
        path: '/',
        component: Welcome,
        name: 'welcome',
    },
    {
        path: '/cosmetic',
        component: Сosmetic,
        name: 'cosmetic',
    },
        {
            path: '/decorative-cosmetic',
            component: Decorative,
            name: 'decorative-cosmetic',
        },
        {
            path: '/cosmetic-for-face',
            component: Face,
            name: 'cosmetic-for-face',
        },
        {
            path: '/cosmetic-for-body',
            component: Body,
            name: 'cosmetic-for-body',
        },
        {
            path: '/cosmetic-for-hands',
            component: Hands,
            name: 'cosmetic-for-hands',
        },
        {
            path: '/cosmetic-for-hair',
            component: Hair,
            name: 'cosmetic-for-hair',
        },
    {
        path: '/household',
        component: Household,
        name: 'household',
    },
    {
        path: '/accessories',
        component: Accessories,
        name: 'accessories',
    },
]