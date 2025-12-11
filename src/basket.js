import { reactive } from "vue";
import Good from "./Good";
// import { priceFormat } from "./helpers"
import env from "./_config"
import { round, numberRUFormat } from "./helpers";

import payment from "./payment";


let file = (name, type = "text") => fetch(`${env.server}/${name}`)
    .then(resposne => {
        return resposne[type]();
    });


const clearObject = obj => {
    for (let key in obj){
        if (obj.hasOwnProperty(key)){
            delete obj[key];
        }
    }
}


export default class Basket
{
    constructor (catalog) 
    {
        this.catalog = catalog

        this.positions = reactive({});
        this.increment = 10000000;

        this.hasLastOrder = localStorage.getItem("favorites") ? true : false;

        this.restore()
    }

    inc ()
    {
        return this.increment++
    }

    get all ()
    {
        return Object.values(this.positions)
    }

    get order ()
    {
        return Object.values(this.positions).filter(position => !position.favorite)
    }

    get favorites ()
    {
        return Object.values(this.positions).filter(position => position.favorite)
    }

    get code ()
    {
        let positions = Object.keys(this.order).reduce((code, key) => {
            let position = this.order[key]
            return code + `${position.id < 10000000 ? position.id : 0} | ${position.name} | ${numberRUFormat(position.price)} | ${position.count}\n`;
        }, '') 
        // let sale = this.sale.percent ? `0 | Скидка | ${numberRUFormat( round(this.amount * this.sale.percent / 100, 2) )} | -1\n` : ''
        let amount = `\nИтого: ${payment.priceFormat(this.totalPrice)} (${payment.currentMethod.caption})`

        // return positions + sale + amount
        return positions + amount
    }

    get totalPrice ()
    {
        // return this.amount
        // if (this.sale.percent)
        //     return round(this.amount - (this.amount * this.sale.percent / 100), 2)
        // else
            return this.amount  
    }

    get amount ()
    {
        return Object.keys(this.order).reduce((total, key) => {
            let position = this.order[key]
            return round(total + position.cost, 2);
        }, 0);
    }

    get sale ()
    {
        const saleFormat = config => { return { percent: config.sale, amount: payment.priceCalculate(config.amount) } }
        let currentSale = false
        let nextSale = saleFormat(env.orderSales[0])
        env.orderSales.forEach((rule, i) => {
            if (this.amount > payment.priceCalculate(rule.amount))
            {
                currentSale = env.orderSales[i]
                if (env.orderSales[i+1])
                {
                    nextSale = { percent: env.orderSales[i+1].sale, amount: payment.priceCalculate(env.orderSales[i+1].amount) }
                } else
                nextSale = false 
            }
        })
        return {percent: currentSale.sale, next: nextSale}
    }

    isPiked (position)
    {
        return this.positions[position.id] ? true : false
    }

    get (position)
    {
        return this.positions[position.id] || new Good(this, position)
    }
    

    append (good) 
    {
        this.positions[good.id] = good
        this.store()
    }

    remove (good) 
    {
        delete this.positions[good.id]
        this.store()
    }

    clearOrder ()
    {
        Object.keys(this.positions).forEach(id => {
            if (!this.positions[id].favorite)
                this.positions[id].remove()
        })
        this.store()
    }

    store ()
    {
        let basket = []
        let favorites = []

        Object.values(this.positions).forEach(position => {
            let item = position.data
            if (!item.favorite)
                basket.push(item)
            else
                favorites.push(item) 
        })
        
        localStorage.setItem("basket", JSON.stringify(basket))
        localStorage.setItem("favorites", JSON.stringify(favorites))
    }

    async restore (orderStorage = "basket")
    {
        clearObject(this.positions)

        let basket = JSON.parse(localStorage.getItem(orderStorage)) || []
        let favorites = JSON.parse(localStorage.getItem("favorites")) || []
        let content = basket.concat(favorites)

        let categories = Array.from(new Set(content.map(position => position.category || "perfume")))

        if (content)
        return this.catalog.load(categories).then(() => {
            content.forEach(position => {
                let category = position.category || "perfume"
                let actualPosition = this.catalog.prices[category].find(item => (item.id+"") === (position.id+""))
                if (!position.oldPrice)
                    position.oldPrice = position.price
                position.price = actualPosition ? actualPosition.price : 0
                this.positions[position.id] = new Good(this, position)
            });
        })

        return false;
    }

    async sendOrder ()
    {
        // await this.restore();
        let currentOrder = localStorage.getItem("basket");
        let missingPosition = Object.values(this.positions).find(position => (position.price == 0 && position.favorite == false));
        // console.log(Object.values(this.positions))
        if (missingPosition)
            return false
        //favorite
        this.clearOrder();
        
        localStorage.removeItem("basket");
        localStorage.setItem("lastOrder", currentOrder);
        // this.restore();
        return true;    
    }

    repeatLastOrder ()
    {
        this.restore("lastOrder");
        let order = localStorage.getItem("lastOrder")
        localStorage.setItem("basket", order)
    }

}

// const basket = new Basket()

// export default basket