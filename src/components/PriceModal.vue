<script setup>
import { priceModal } from "../Good"
import { default as payment } from "../payment"

</script>


<template>
<div class="Modal" v-if="priceModal.isOpen">
    <div class="Modal-background" @click="priceModal.close()"></div>
    <div class="Modal-wrapper">
        <div class="PriceModal">
            <div class="PriceModal-head">
                <div class="PriceModal-header" v-if="priceModal.good">Изменить способ оплаты</div>
                <div class="PriceModal-header" v-if="!priceModal.good">Выбор способа оплаты</div>
                <div class="PriceModal-close" @click="priceModal.close()">✕</div>
            </div>
            <div class="PriceModal-good" v-if="priceModal.good">
                <div class="PriceModal-position">{{priceModal.good.name}}</div>
                <div class="PriceModal-total" v-if="priceModal.good.count">{{priceModal.good.priceLabel}} × {{priceModal.good.count}} = <b>{{payment.priceFormat(priceModal.good.cost)}}</b></div>
            </div>

            <div class="PriceModal-good" v-if="!priceModal.good">
                <div class="PriceModal-text">
                    Вы можете <b>сравнить цены с учетом способа оплаты</b> на любую позицию, для этого:<br>
                    1. Найдите позицию на сайте через "Поиск по прайсу"<br>
                    2. Кликните на цену
                </div>
            </div>

            <div class="PriceModal-methods Table">
                <div class="Table-head">
                    <div class="Table-leftColumn header">Вариант оплаты</div>
                    <div class="Table-rightColumn header" v-if="priceModal.good">Цена за шт.</div>
                    <div class="Table-rightColumn header" v-if="!priceModal.good">Экономия</div>
                </div>

                <div class="Table-row PriceModal-method" 
                                        v-for="paymentMethod in payment.methods" 
                                        :class="paymentMethod.isActive ? 'active' : ''"
                                        @click="paymentMethod.active()"
                                    >
                    <div class="Table-leftColumn item">
                        {{paymentMethod.caption}}
                        <span v-if="paymentMethod.hint">
                            {{paymentMethod.hint}}
                        </span>
                    </div>
                    <div class="Table-rightColumn item" :style="{color: paymentMethod.color}">
                        <span class="PriceModal-goodPrice" v-if="priceModal.good">
                            {{paymentMethod.priceConvert(priceModal.good.originalPrice)}}
                        </span>
                        <span class="PriceModal-goodPrice" v-if="!priceModal.good">
                            {{paymentMethod.fee}}
                        </span>
                    </div>
                </div> 

            </div>

            <div class="PriceModal-nextBtn" @click="priceModal.close()">Запомнить выбор</div> 
        </div>
    </div>
</div>   
</template>


<style lang="scss" scoped>

@import '@/mixins.scss';

.Modal
{
    display: flex;

    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;

    align-items: center;
    justify-content: center;

    &-background
    {
        position: fixed;
        top:0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(21, 35, 34,.2);  
    }
    &-wrapper
    {
        padding: 15px;
    }
}

.PriceModal
{
    box-sizing: border-box;
    background-color: $color-space;
    max-width: 100vw;
    padding: 20px;
    border-radius: 8px;
    @include unselected;
    &-head
    {
        display: flex;
        justify-content: space-between;
    }
    &-header, &-close
    {
        font-size: 1.5em;
        font-weight: bold;
    }
    &-close
    {
        cursor: pointer;
        padding-left: 15px;
        color: $color-content;
    }
    &-position, &-text
    {
        max-width: 550px;
        font-size: 1.2em;
        padding: 15px 0 10px 0;
        // color: #fff;
    }
    &-total
    {
        padding-bottom: 15px;
        & > b
        {
            font-weight: 700;
        }
    }

    &-method
    {
        box-sizing: border-box;
        color: $color-content;
        margin-left: -20px;
        margin-right: -20px;
        padding: 20px;
        cursor: pointer;
        
        &:hover
        {
            color: $color-content-accent;
            background-color: rgba(255, 255, 255, 0.3);
        }
        &.active
        {
            cursor: default;
            color: $color-content;
            background: $color-interface;
        }
    }

    &-nextBtn
    {
        margin-top: 10px;
        background-color: $color-interface-accent;
        color: $color-space;
        font-size: 20px;
        font-weight: 600;
        text-align: center;
        border-radius: 8px;
        padding: 4px 0;
        transition: all ease .3s;
        cursor: pointer;
        &:hover
        {
            background-color: $color-contrast;
            color: $color-interface-accent;
        }
    }
}

.Table
{
    &-head, &-row
    {
        display: flex;
        justify-content: space-between;
        padding-top: 5px;
        padding-bottom: 5px;
    }

    &-head
    {
        // color: #b7b7b7;
        border-bottom: 1px solid #b7b7b74d;
        padding-top: 10px;
        padding-bottom: 10px;
        margin-bottom: 5px;
    }

    &-head > *
    {
        font-weight: bold;
    }

    &-leftColumn 
    {
        display: flex;
        gap: 10px;
        align-items: center;
    }

    &-leftColumn span
    {
        background: $color-interface-accent;    
        color: $color-space;
        font-size: 12px;
        border-radius: 4px;
        padding: 4px 10px;
    }

    &-rightColumn, &-rightColumn > *
    {
        font-weight: bold;
        text-wrap: nowrap;
        white-space: nowrap;
        padding-left: 15px;
    }
}

</style>