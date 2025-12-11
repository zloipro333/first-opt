<script setup>
const props = defineProps({
    catalog: Object
})
</script>

<template>
    <div class="PriceCaption">
        <div class="PriceCaption-header">
          <div class="PriceCaption-category">
            <slot name="category"></slot>
          </div>
           <slot name="backlink"></slot>
        </div>   
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>

@import '@/mixins.scss';

.PriceCaption
{
    text-align: center;
    &-header
    {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: -10px;
      margin-bottom: 10px;
    }
    &-category
    {
      font-size: 24px;
      color: $color-content;
    }
}

.PriceCaption > b
{
    font-weight: 600;
}

.PriceCaption > a.button
    {
      // box-sizing: border-box;
      display: inline-block;
      background-color: #CCC;
      padding: 4px 10px 4px 10px;
      border-radius: 8px;
      margin: 4px 4px;
      color: #181818; //rgb(42, 97, 92)
      font-weight: 500;
      height: 32px;
      &:hover{
        background-color: $color-contrast;
      }
    }

.nowrap
{
  white-space: nowrap;
}

@media (max-width: 600px)
{
  .PriceCaption
  {
    font-size: 15px;
    &-category
    {
      font-size: 20px;
    }
  }
}
</style>
