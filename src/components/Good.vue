<script setup>
import {ref, watch} from 'vue'
import CartIcon from "./graphics/CartIcon.vue"
import { priceModal, saleModal } from '../Good';
import {default as payment} from '../payment'

const props = defineProps({
  positioin: Object
})

// const showPriceOprions = ref(false)

// const closePriceOprions = () => {
//     showPriceOprions.value = false
//     document.removeEventListener("click", closePriceOprions)
// }

// const openPriceOprions = () => {
//   setTimeout(() => {
//     document.addEventListener("click", closePriceOprions)
//     showPriceOprions.value = true
//   }, 10)
// }

const isFocusTitle = ref(false)
const copyDescription = () => {
    //console.log(window.navigator.clipboard)
    navigator.clipboard.writeText(props.positioin.name);
}

const vSelectByFocus = {
  mounted: (el) => {
    const resize = () => {
        el.style.width = `${(el.value.length * 12) + 12}px` 
    }
    
    setTimeout(() => { resize() }, 300)

    watch(() => props.positioin.count, (n, o) => {
        resize()
    })
    el.addEventListener("focus", (e) => {
        el.select()
    })  
  }
}

</script>

<template>
    <div class="Good">
        <!-- remove from basket -->
        <div class="Good-header">
                <div class="Good-title" @mouseover="isFocusTitle=true" @mouseleave="isFocusTitle=false" :class="{hover:isFocusTitle}">
                    <div class="Good-titleCopy" :class="{show:isFocusTitle}" @click="copyDescription">
                        Копировать название
                    </div>
                    {{positioin.name}}
                </div>
                <div class="Good-remove" v-if="positioin.inBasket" @click="positioin.remove()">✕</div>
            </div>
        
        <div class="Good-line">
            <!-- remove from basket -->
            <div class="Good-options trasparent" v-if="positioin.oldPrice">
                <div class="Good-favorite" >Старая цена: {{ payment.priceConvert(positioin.oldPrice) }}</div>
            </div>


            <!-- PRICE -->
            <div class="Good-options clickable" v-if="positioin.price != 0" @click="priceModal.open(positioin)">
                <div class="Good-price">{{positioin.priceLabel}}
                    <!-- arrow -->
                    <svg height="7px" width="7px" viewBox="0 0 5.00168142 4" style="margin-left: 3px;">
                        <g id="Page-1" stroke="#ffce4b" stroke-width="1" fill="#ffce4b" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                            <g id="Artboard" transform="translate(-0.4992, -7.3467)" >
                                <polygon id="Path" points="1 7.84671439 5 7.84671439 3 10.8467144"></polygon>
                            </g>
                        </g>
                    </svg>
                    <!-- // arrow -->
                </div>
            </div>
            <!-- Нет в наличии -->
            <div class="Good-options trasparent" v-if="positioin.inBasket && !positioin.price">
                <div class="Good-price">Нет в наличии</div>
            </div>


            <!-- COUNT -->
            <div class="Good-options" v-if="positioin.inBasket && positioin.price">
                <div class="Good-picker--count">
                    <div class="Good-countSwitcher" @click="positioin.count--" style="padding-right: 5px; padding-left: 18px;">-</div>
                    <!-- <div class="Good-count">{{positioin.count}}</div> -->
                    <input class="Good-count" type="number" v-select-by-focus v-model="positioin.count" step="1" min="1" max="999">
                    <div class="Good-countSwitcher" @click="positioin.count++" style="padding-right: 18px; padding-left: 5px">+</div>
                </div>
            </div>

            <!-- to favorite -->
            <div class="Good-options clickable" v-if="!positioin.favorite" @click="positioin.append(); positioin.favorite=true">
                <div class="Good-favorite">❤</div>
            </div>

            <!-- from favorite to order -->
            <div class="Good-options clickable" @click="positioin.favorite = false" v-if="positioin.favorite">
                <div class="Good-price" >❤ →</div>
                <div class="Good-picker" >
                    <CartIcon />
                </div>
            </div>


            <!-- to order -->
            <div class="Good-options clickable icon" @click="positioin.append()" v-if="!positioin.inBasket">
                <div class="Good-picker" >
                    <CartIcon />
                </div>
            </div>
             
        </div>

    </div>
</template>

<style scoped lang="scss">

    @import '@/mixins.scss';

    .Good
    {
        padding: 10px;
        // border-radius: $rounding;
        text-align: right;
        @include unselected;
    }

    .Good:first-child
    {
        border-top-left-radius: $rounding;
        border-top-right-radius: $rounding;
    }
    .Good:last-child
    {
        border-bottom-left-radius: $rounding;
        border-bottom-right-radius: $rounding;
    }
    .Good:nth-child(2n) 
    {
        /* display: flex;
        justify-content: space-between; */
        background: rgb(40, 40, 40);
    }
    .Good:nth-child(2n-1) 
    {
        background: rgb(30, 30, 30);
    }

    .Good-header
    {
        display: flex;
        justify-content: space-between;
        padding-bottom: 5px;
    }

    .Good-title
    {
        text-align: left;
        color: rgb(255, 255, 255);
        //cursor: pointer;
        & > .Good-titleCopy
        {
            // display: none;
            position: absolute;
            top: -23px;
            left: -9999px;
            background: $color-interface-accent;
            color: $color-space;
            font-size: 12px;
            padding: 2px 8px 2px 8px;
            font-weight: 600;
            border-radius: 8px 8px 8px 0;
            cursor: pointer;
            opacity: 0;
            transition: opacity .5s ease .1s;
            &:active
            {
                background: rgb(42, 97, 92);
            }
            &.show
            {
                display: block;
                left: 0;
                opacity: 1;
            }
        }
        
        &.hover //.focus
        {
            background: rgba(255, 255, 255, .1);
            border-radius: 3px 3px 3px 0;    
        }
    }

    .Good-remove
    {
        color: rgb(255, 255, 255);
        margin-left: 10px;
        cursor: pointer;
    }

    .Good-line
    {
        display: flex;
        justify-content: end;
    }

    .Good-options
    {
        display: flex;
        justify-content: end;
        align-items: center;
        border-radius: $rounding;
        background: $color-interface-accent;
        text-align: right;
        color: $color-space;
        padding: 1px 9px;
        margin-left: 5px;
        margin-bottom: 5px; 
        text-wrap: nowrap;
        white-space: nowrap;
        position: relative;
        &.trasparent  
        {
            background: none;
            color: rgb(200, 200, 200);
        }  
    }

    .Good-options.clickable
    {
        cursor: pointer;
    }

    .Good-price 
    {
        font-weight: 800;
        font-size: 12px;
        text-align: center;
        text-wrap: nowrap;
        white-space: nowrap;
        // padding-right: 10px;
    }

    // .Good-priceSelect
    // {
    //     position: fixed;
    //     border-radius: $rounding;
    //     background: $color-content-accent;
    //     text-align: right;
    //     color: $color-space;
    //     display: block;
    //     z-index: 99999;
    //     padding: 20px;
    //     text-align: left;

    //     tr
    //     {
    //         cursor: pointer;
    //         &:hover
    //         {
    //             background-color: rgba(255, 64, 151, .1);
    //         }
    //         &.active
    //         {
    //             cursor: default;   
    //             color: $color-contrast;
    //             opacity: 0.8;
    //             &:hover
    //             {
    //                 background: none;
    //             }
    //         }
    //     }
        
    // }

    .Good-favorite
    {
        font-weight: 800;
        font-size: 12px;
    }

    .Good-picker, .Good-picker--count
    {
        cursor: pointer;
        display: flex;
        
    }
    .Good-picker--count
    {
       margin: 0 -10px;
    }

    .Good-count
    {
        color: $color-space;
        background: none;
        border: none;
        outline: none;
        font-size: 12px;
        font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
    Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        text-align: center;
        width: 12px;
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button
        {
            -webkit-appearance: none;
            margin: 0;
        }
    }

    .Good-count, .Good-countSwitcher
    {
        font-weight: 800;
        font-size: 12px;
    }

    .Good-countSwitcher
    {
        padding: 0 15px;
    }

    .Good-sale
    {
        display: flex;
        justify-content: end;
        font-size: 13px;
        cursor: pointer;
        & > svg
        {
            width: 15px;
            height: 18px;
            stroke: rgba(255,255,255,.7);
        }
    }

</style>
