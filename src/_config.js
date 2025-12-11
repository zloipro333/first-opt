export default {
    server: "https://fragrantica-store.online/",
    // server: "",
    defaultWikiPage: "favorites",
    orderSales:[
        {amount: 500, sale: 0.6},
        {amount: 1000, sale: 0.8},
        {amount: 2000, sale: 1},
        {amount: 3000, sale: 1.2},
        {amount: 4000, sale: 1.4},
        {amount: 5000, sale: 1.6},
        {amount: 7000, sale: 1.8},
        {amount: 10000, sale: 2}
    ],


    positionSales:[
        {
            priceRange: [0.01, 0.29], options:
            [
                {countRange: [10, 100], count: 10, sale: 4},
            ],
        },
        {
            priceRange: [0.3, 0.59], options:
            [
                {countRange: [10, 100], count: 10, sale: 4},
            ],
        },
        {
            priceRange: [0.6, 0.99], options:
            [
                {countRange: [10, 100], count: 5, sale: 2},
            ],
        },
        {
            priceRange: [1, 2.99], options:
            [
                {countRange: [1, 100], count: 5, sale: 1.2},
            ],
        },
        {
            priceRange: [3, 5.99], options:
            [
                {countRange: [1, 100], count: 5, sale: 0.5},
            ],
        },
        {
            priceRange: [6, 9.99], options:
            [
                {countRange: [2, 10], count: 2, sale: 0.2},
                {countRange: [11, 100], count: 5, sale: 0.5},
            ],
        },
        {
            priceRange: [10, 99.99], options:
            [
                {countRange: [2, 10], count: 1, sale: 0.05},
                {countRange: [11, 100], count: 5, sale: 0.25},
            ],
        },
        {
            priceRange: [100, 299.99], options:
            [
                {countRange: [2, 10], count: 1, sale: 0.025},
                {countRange: [11, 100], count: 5, sale: 0.125},
            ],
        },
        {
            priceRange: [300, 99999], options:
            [
                {countRange: [2, 10], count: 1, sale: 0.0125},
                {countRange: [11, 100], count: 5, sale: 0.0625},
            ],
        },
    ]
}
