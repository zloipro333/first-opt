import { reactive, ref, watch } from 'vue'
import env from "./_config"
import Basket from './basket'


const defaultCategory = "perfume"

let file = (name, type = "text") => fetch(`${env.server}price/${name}`)
    .then(resposne => {
        return resposne[type]();
    });


let getPrice = () => fetch(`${env.server}price`)
    .then(resposne => {
        return resposne["json"]();
    });
  

// test

// const price_data = await import('../../_price.json');
// const price = await file(`${search.category}.json`, "json")

class Catalog
{
    constructor()
    {   
        this._categories = [
            {name: "Парфюмерия", file: "perfume"},
            // {name: "Корейская косметика", file: "korea"},
            // {name: "Косметика для волос", file: "hair"},
        ]

        this.prices = reactive({})
        this.basket = new Basket(this)

        this._category = defaultCategory
        this._reqest = ""
        this.updateRoute = () => {}

        this._enableOtlivants = true

        this.AbsMatchedGood = false
        this.goods = reactive([])
        this.loading = ref(true) 
        
        this._refreshPrice()
        watch(this.prices, () => {
            this.loading.value != undefined ? this.loading.value = true : this.loading = true
            setTimeout(() => {
                this.loading.value != undefined ? this.loading.value = false : this.loading = false
                this._refreshGoods()
            }, 10)
        })
    }

    get enableOtlivants()
    {
        return this._enableOtlivants
    }

    set enableOtlivants(boolean)
    {
        this._enableOtlivants = boolean
        this._refreshGoods()
    }

    get search()
    {
        return this._reqest
    }

    set search(reqest)
    {
        this._reqest = reqest
        this.updateRoute(reqest)
        this._refreshGoods()
    }

    get category()
    {
        return this._categories.find(category => category.file === this._category)
    }

    set category(name)
    {
        this._category = name
        this._refreshPrice()    
    }

    get categories()
    {
        return this._categories.map(category => {
            category.isActive = this._category === category.file
            // category.open = () => {
            //     this._category = category.file
            //     this._refreshPrice()
            // }
            return category
        })
    }

    get positions()
    {
        return this.prices[this._category]
    }

    load(categories)
    {
        let queue = []
        categories.forEach(category => {
            if (this.prices[category]===undefined)
            {
                this.prices[category] = []
                queue.push(
                    //getPrice().then(data => {
                    file(`${category}.json`, "json").then(data => {
                    this.prices[category] = data
                }))         
            }
        })
        return Promise.all(queue)
    }

    _refreshGoods()
    {    
        // console.log("qq") 
        this.AbsMatchedGood = false
        // console.log(`search > ${this.search}`)
        if (this.search.length > 2) 
        {
            let response = []
            let reqest = this.search.toUpperCase()
            let query = reqest.split(' ')
            
            // console.log(`position > ${this.positions.length}`)
            this.positions.forEach((position) => {
                let positioinName = position.name.toUpperCase()
                // console.log(positioinName,reqest)
                if (positioinName !== reqest)
                {
                    let hasMismatch =  query.find(key => positioinName.indexOf(key) == -1)
                    if (!hasMismatch)
                    {
                        if (this.filter(positioinName))
                        {
                            position.category = this._category
                            response.push(this.basket.get(position))
                        }
                    }     
                } else {
                    this.AbsMatchedGood = this.basket.get(position)
                } 
            });
        
            this.goods = reactive(response)
        }
        else
        {
            this.goods = reactive([])
        }
    }

    _refreshPrice()
    {
        // this.search = ""
        this.loading.value != undefined ? this.loading.value = true : this.loading = true
        this.load([this._category]).then(() => {
            // this.loading.value != undefined ? this.loading.value = false : this.loading = false
            // this._refreshGoods()
        })
    }

    filter(positioinName)
    {
        return ((this._category != defaultCategory) || this.enableOtlivants || (positioinName.indexOf("ОТЛИВАНТ") == -1))
    }

    useRouter(router, currentReqest)
    {
        this._reqest = currentReqest
        this.updateRoute = (request) => {
            if (request)
                router.push({query: {search: request}})
            else
                router.push({query: {}})
        }
        // this._refreshGoods()
    }
}

const catalog = reactive(new Catalog())

// price.load(["parfum", "otlivants"]).then(() => {
//     price.load(["parfum", "otlivants"]).then(() => {
//         console.log('ky')
//     })
// })


export const basket = catalog.basket
export default catalog