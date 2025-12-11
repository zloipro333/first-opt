<script setup>
import {defineEmits, onMounted, ref} from 'vue'
// import { search } from '../main'
import price from '../catalog'
import SearchIcon from './graphics/SearchIcon.vue'

const query = ref(price.search)
const input = ref(null)
//const emit = defineEmits(['request'])

// const request = () => {
//     if (query.value.length > 2)
//         price.search = query.value //emit('request', query.value)
//     else
//         price.search = "" //emit('request', "")
// }

//Focus by load
// const trigger = (el, etype) => {
//   const evt = new Event( etype, { bubbles: true } );
//   el.dispatchEvent( evt );
// };

const isFixed = ref(false)

onMounted(() => {
  setTimeout(() => {
    input.value.focus()
  }, 500)

  let screen = document.documentElement.clientHeight
  document.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop > screen)
      isFixed.value = true
    else
      isFixed.value = false
  })
})


const isOpenCategories = ref(false)

const closeCategories = () => {
  isOpenCategories.value = false
  document.removeEventListener("click", closeCategories)
}

const openCategories = () => {
  setTimeout(() => {
    document.addEventListener("click", closeCategories)
    isOpenCategories.value = true
  }, 10)
}

</script>

<template>
<div class="Search-placeholder">
<div :class="{'Search-wrapper': isFixed}">
  <div class="Search">
    <div class="Search-categories">
    <div class="Search-currentCategory" v-if="!isOpenCategories" @click="openCategories">
      {{ price.category.name }} 
      <svg height="7px" viewBox="0 0 5.00168142 4" style="margin-bottom: -3px;">
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
              <g id="Artboard" transform="translate(-0.4992, -7.3467)" >
                  <polygon id="Path" points="1 7.84671439 5 7.84671439 3 10.8467144"></polygon>
              </g>
          </g>
      </svg>
    </div>
    <div class="Search-categoriesList" v-if="isOpenCategories">
      <div class="Search-category" v-for="category in price.categories" @click="price.category=category.file" :class="{active: category.isActive}">{{ category.name }}</div>
    </div>
    <!-- > -->
    </div>
    <div class="Search-button">
      <SearchIcon />
    </div>
    <div class="Search-clear" v-if="price.search" @click='price.search = ""'>✕</div>
    <input class="Search-input" ref="input" type="text" v-model="price.search" placeholder="Поиск по прайсу">
    
  </div>
</div>
</div>
</template>

<style lang="scss" scoped>

  @import '@/mixins.scss';

  .Search-placeholder
  {
    min-height: 60px;
  }
  .Search-wrapper
  {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    // background-color: rgb(24, 24, 24, .8);
    padding: 20px 10px 0px 10px;
    z-index: 999;
    // box-shadow: 0 0 10px 10px rgb(0, 0, 0, 0.5);
  }
  .Search
  {
    width: 100%;
    //margin-top: 26px;
  }

  .Search-categories
  {
    display: none;
    position: absolute;
    top: -36px;
    right: 0;
    
    font-size: 18px;
    
    color: #181818;
    
    z-index: 99;
    cursor: pointer;
  }


  .Search-category
  {
    font-weight: 500!important;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; 
  }
  .Search-category.active
  {
    font-weight: 400!important;
    color: $color-contrast;
    opacity: 0.8;
  }

  .Search-currentCategory, .Search-categoriesList
  {
    padding: 5px 17px 5px 20px;
    background-color: $color-interface-accent;
  }
  .Search-currentCategory
  {
    display: flex;
    align-items:center;
    gap: 8px;
    font-weight: 500!important;
    border-radius: $rounding $rounding 0 0;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; 

    & *
    {
      fill: #dfdede;
      stroke: #dfdede;
    }
  }

  .Search-categoriesList
  {
    border-radius: $rounding;
  }

  .Search-input
  {
    width: 100%;
    font-size: 28px;
    color: $color-content-accent;
    border: 3px solid $color-interface-accent;
    padding: 7px 14px 7px 46px;
    outline: none;
    //border-radius: $rounding 0 $rounding $rounding;
    border-radius: $rounding;
    @include placeholder-color($color-content-accent);
    background: $color-interface;
  }
  .Search-button
  {
    position: absolute;
    left: 0;
    top: 0;
    height: 52px;
    width: 52px;
    // background: $color-interface;
    border-radius: 0 $rounding $rounding 0;
    z-index: 1;
    cursor: pointer;
  }
  .Search-clear
  {
    position: absolute;
    right: 0;
    top: 0;
    height: 52px;
    width: 52px;
    // background: $color-interface;
    border-radius: 0 $rounding $rounding 0;
    z-index: 1;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    color: $color-content;
    opacity: 0.5;
    transition: .2s;
    &:hover
    {
      opacity: 1;
    }
  }

</style>