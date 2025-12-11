import { reactive } from "vue"
import env from "./_config"

const file = (name, type = "text") => fetch(`${env.server}${name}`)
    .then(resposne => {
        return resposne[type]();
    });

let getConfig = () => fetch(`${env.server}config`)
    .then(resposne => {
        return resposne["json"]();
    });


class PaymentMethod
{
    constructor(name, {caption, fee, calculate, format, current, hint = "", color = "#000"}, payment)
    {
        this.payment = payment

        this.name = name
        this.caption = caption
        this.fee = fee
        this.calculate = calculate
        this.format = format
        this.hint = hint
        this.color = color


        if (this.payment.currentMethod == null && current) 
            this.payment.currentMethod = this
    }

    get isActive()
    {
        return this.payment.currentMethod.name == this.name
    }

    active()
    {
        this.payment.currentMethod = this
        // запоминаем выбор пользователя
        localStorage.setItem("paymentMethod", this.name)
    }

    priceConvert(price)
    {
        return this.format(this.calculate(price))
    }
}

class Payment
{
    constructor()
    {
        this.methods = {}
        this.currentMethod = null
    }

    init (next)
    {
        this.loadMethods(methods => {
            Object.keys(methods).forEach(methodName => {
                this.methods[methodName] = (new PaymentMethod(methodName, methods[methodName], this))
            });
            next("mount app")
            

            // активируем метод выбранный пользователем ранее
            let castomersMethod = localStorage.getItem("paymentMethod")
            if (castomersMethod)
                this.methods[castomersMethod].active()
        })
    }

    priceConvert(price)
    {
        return this.priceFormat(this.priceCalculate(price))
    }

    priceFormat(price)
    {
        return this.currentMethod.format(price)
    }

    priceCalculate(price)
    {
        // console.log(this.currentMethod)
        // HACK
        if (this.currentMethod)
            return this.currentMethod.calculate(price)
        else 
            return price
    }

    loadMethods(callback)
    {
        // подтягиваем конфиги
        //getConfig().then(config => {
        file("price/config.json", "json").then(config => {
            // подтягиваем логику
            import(/* @vite-ignore */`${env.server}/module/FirstoptPaymentMethods.js`).then(module => { 
                // отдаем готовые методы на обработку
                // console.Console.log(module.getPaymentMethods(config))
                callback(module.getPaymentMethods(config))
                
            })
        })
    }
}

const payment = reactive(new Payment())
export const init = new Promise(sucess => {
    payment.init(sucess)
})

export default payment