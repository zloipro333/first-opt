<script setup>
import { saleModal } from "../Good"
import { default as payment } from "../payment"

</script>


<template>
<div class="Modal" v-if="saleModal.isOpen">
    <div class="Modal-background" @click="saleModal.close()"></div>
    <div class="Modal-wrapper">
        <div class="SaleModal">
            <div class="SaleModal-head">
                <div class="SaleModal-header">Расчет цены</div>
                <div class="SaleModal-close" @click="saleModal.close()">✕</div>
            </div>
            <div class="SaleModal-text">
                Цена позиции снижается на определенный % в зависимости от ее количества в заказе.<br>
                Для позиций стоимостью
                <span class="nowarp">от {{payment.priceConvert(saleModal.good._saleRule.priceRange[0])}}</span>
                <span class="nowarp"> до {{payment.priceConvert(saleModal.good._saleRule.priceRange[1])}}</span>:
                </div>

            <div class="SaleModal-methods Table">
                <div class="Table-head">
                    <div class="Table-leftColumn header">Количество</div>
                    <div class="Table-rightColumn header">Дисконт</div>
                </div>
                <!-- :class="paymentMethod.isActive ? 'active' : ''" -->
                <div class="Table-body">
                    <div class="Table-row SaleModal-method" 
                                            v-for="sale in saleModal.good._saleRule.array"  
                                        >
                        <div class="Table-leftColumn item">
                            от {{sale.count}} шт.
                        </div>
                        <div class="Table-rightColumn item">
                            {{sale.salePercent}} %
                        </div>
                    </div> 
                </div>

            </div>
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
        background-color: rgba(255,255,255,.1);  
    }
    &-wrapper
    {
        padding: 15px;
    }
}

.SaleModal
{
    box-sizing: border-box;
    background-color: #181818;
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
        color: #fff;
    }
    &-text
    {
        max-width: 550px;
        font-size: 1.2em;
        padding: 15px 0 10px 0;
        // color: #fff;
        white-space: wrap;
        & > .nowarp
        {
            white-space: pre;
        }
    }

    &-method
    {
        box-sizing: border-box;
        color: #fff;
        margin-left: -20px;
        margin-right: -20px;
        padding: 20px;
        cursor: pointer;
        
        &:hover
        {
            cursor: default;
            // color: #b7b7b7;
            background: rgba(255, 255, 255, 0.08);
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

    &-body
    {
        @include scroll;
        max-height: 50vh;
        overflow-y: scroll;
        overflow-x: hidden;
    }

    &-rightColumn
    {
        font-weight: bold;
        text-wrap: nowrap;
        padding-left: 15px;
    }
}

</style>