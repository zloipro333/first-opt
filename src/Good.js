import { ref, reactive } from 'vue'
import { isBelong, round } from './helpers'
import config from './_config'

import payment from './payment'


class Good
{
    constructor (basket, options) 
    {
        this.basket = basket
        this.id = options.id
        this.name = options.name
        this._price = options.price
        this.oldPrice = options.oldPrice !== options.price ? options.oldPrice : false

        this.category = options.category || "perfume"

        this.count_val = options.count || 0

        this._isFavorite = options.favorite || false

    }

    get price ()
    {
        return payment.priceCalculate(this.originalPrice)
    }

    get priceLabel ()
    {
        return payment.priceFormat(this.price)
    }

    get originalPrice ()
    {
        // SALES IMPLEMENTATION BELOW
        return this._price
    }

    get data ()
    {
        return {
            id: this.id,
            name: this.name,
            price: this._price,
            oldPrice: this.oldPrice,
            count: this.count,
            favorite: this._isFavorite,
            category: this.category
        }
    }

    get favorite()
    {
        return this._isFavorite
    }
    set favorite(bool)
    {
        this._isFavorite = bool
        this.basket.store()
    }

    get cost () 
    {
        const round = (value) => Math.round(value * 100) / 100

        return round(this.price * this.count_val)
    }


    get count () 
    {
        return this.count_val+0
    }
    set count (val) 
    {
         this.count_val = val
         this.basket.store()
         if (this.count_val == 1) this.append()
         if (this.count_val < 1) this.count_val = 1
         if (this.count_val > 999) this.count_val = 999
    }
    get inBasket ()
    {
        return this.count_val > 0 //this.basket.positions[this.id] ? true : false
    }

    append ()
    {
        if (this.count_val < 1) {
            this.count_val = 1
            this.basket.append(this)
        }
    }

    remove () 
    {
        this.count_val = 0
        this._isFavorite = false
        delete this.basket.remove(this)
    }
}

// Origin https://jsfiddle.net/35nfa4wt/10/
// config wrap as singleton
class GoodSales
{
    constructor ()
    {
        this._definedCounts = new Set() //  count1, ..., countN
        this.rules = config.positionSales.map(rule => {
            rule.array = this._bildSalesArray(rule)
            return rule
        })

    }

    get definedCounts()
    {
        return Array.from(this._definedCounts).sort((a,b) => a - b)
    }

    getRule(price) 
    {
        return this.rules.find(rule => isBelong(price, rule.priceRange))
    }

    calculatePercent(options, count) 
    {
        if (!options) return 0
        // значение на которое домножается единица скидки
        let saleСoordinate = Math.floor(count/options.count)
        return round(saleСoordinate * options.sale, 4)
    }

    _bildSalesArray(rule)
    {
        let sales = []
        rule.options.forEach(option => {
            // минимальный множетель скидки в заданном диопазоне количества товара
            let minimalSaleСoordinateInRange = Math.ceil(option.countRange[0]/option.count)
            // минимальное количесво товара из деопазона на которое применится скидка
            let minimalSalableCount = minimalSaleСoordinateInRange*option.count
            for(let count = minimalSalableCount; count <= option.countRange[1]; count+=option.count)
            {
                sales.push({count, salePercent: this.calculatePercent(option, count)})
                this._definedCounts.add(count)
            }
              
        })
        return sales
    }

}

const goodSales = new GoodSales()


// Это нужно будет переделать в тейты или реализовать множественное наследование как-то по другому
// Origin https://jsfiddle.net/35nfa4wt/10/
class GoodWithSales extends Good
{
    constructor (basket, options)
    {
        super(basket, options)
        if (this._price)
        {
            this._saleRule = goodSales.getRule(this._price)
        }
    }

    get originalPrice()
    {
        // SALES IMPLEMENTATION - DISABLED
        // Quantity-based discounts are disabled
        return this._price 
    }

    get salePercent() 
    {
        let count = this.count < 100 ? this.count : 100
        let options = this._saleRule.options.find($case => isBelong(count, $case.countRange))
        return goodSales.calculatePercent(options, count)
    }

    get sales()
    {
        if (!this._price || !this._saleRule) return 0
        return this._saleRule.array
    }

    get _nextSale()
    {
        if (!this._price || !this._saleRule) return 0
        return this.sales.find(sale => sale.count > this.count)
    }

    get nextSaleCount()
    {
        if (!this._nextSale) return 0
        return this._nextSale.count
    }

    get nextSalePrice()
    {
        if (!this._nextSale) return 0
        return payment.priceFormat(payment.priceCalculate( round( this._price - (this._price * (this._nextSale.salePercent/100)), 2 ) ))
    }
    
}




class PriceModal
{
    constructor()
    {
        this.isOpen = false
        this.good = null
    }

    open(good = false)
    {
        this.good = good ? good : null
        this.isOpen = true
    }

    close()
    {
        this.isOpen = false 
    }
}

class SaleModal
{
    constructor()
    {
        this.isOpen = false
        this.good = null
    }

    open(good)
    {
        this.good = good
        this.isOpen = true
    }

    close()
    {
        this.isOpen = false 
    }
}



const priceModal = reactive(new PriceModal())
const saleModal = reactive(new SaleModal())

export default GoodWithSales
export {goodSales, priceModal, saleModal}
