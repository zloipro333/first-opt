<script setup>
import { ref, watch, defineEmits } from 'vue'
import { useRoute } from 'vue-router';

import MenuItem from './MenuItem.vue'

const props = defineProps({
  item: Object,
  currentItem: String
})

const emit = defineEmits(['selectItem'])

const currentMenuItem = ref("")
const selectMenuItem = name => {
  console.log(name)
  currentMenuItem.value = name
}

const route = useRoute()
const isCurrentPath = ref(false)
const isCurrentLocation = ref(false)

// console.log(route.params.page)
// console.log(props.item)

const stateRefresh = () => {
    isCurrentPath.value = isCurrentLocation.value = false
    if (props.item.slug && route.params.page.indexOf(props.item.slug) === 0)
    {
        isCurrentPath.value = true
        // console.log('path:',route.params.page, props.item.slug)
        if (props.item.slug == route.params.page)
        {
            // console.log('location:',route.params.page, props.item.slug)
            isCurrentLocation.value = true
        } 
    } 
}

watch(() => route.params.page, () => {
    stateRefresh()
})

stateRefresh()


</script>

<template>
    <div class="MenuItem" @click="emit('selectItem', item.slug)">
        <div class="MenuItem-title" v-if="item.isCategory">
            {{ item.title }}
        </div>
        <div class="MenuItem-link" v-if="!item.isCategory" :class="{active: isCurrentLocation}">
            <router-link :to="`/wiki/${item.slug}`">
            {{ item.title }}
            </router-link>
        </div>
        <div class="MenuItem-childs" v-if="((currentItem === item.slug) || isCurrentPath) && Object.keys(item.childs).length">
            <MenuItem v-for="subitem in item.childs" :item="subitem"  :currentItem="currentMenuItem" @selectItem="selectMenuItem"/>
        </div>
    </div>
</template>

<style scoped lang="scss">

    @import '@/mixins.scss';

    .MenuItem
    {
        
        
        //padding-top: 10px;
        &-link > a, .MenuItem-title
        {
            box-sizing: border-box;
            display: block;
            padding: 10px 20px;
            color: rgba(255, 255, 255, .6);
            cursor: pointer;
            border-radius: 8px;
            transition: all linear .2s;
        }
        &-link > a
        {
            color: rgba(255, 255, 255, .9);
            &:hover
            {
                background: none;
                color: rgba(255, 64, 151, 1);
                font-weight: 600;
            }
        }
        &-link.active > a
        {
            font-weight: normal;
            color: #fff;
            background: linear-gradient(270deg, rgba(255,64,151,1) 0%, rgba(255,64,151,.5) 35%, rgba(255,255,255,0) 100%);
        }
        &-title:hover
        {
            font-weight: 600;
            color: #fff;
        }
        &-childs
        {
            //display: none;
            background-color: rgba(255,255,255,.1);
            border-radius: 8px;
            // overflow: hidden;

            &::before
            {
                content: ''; 
                position: absolute; /* Абсолютное позиционирование */
                left: 18px; top: -14px; /* Положение треугольника */
                border: 7px solid transparent; /* Прозрачные границы */
                border-bottom: 7px solid rgba(255,255,255,.1); /* Добавляем треугольник */
            }
            
            &-link > a
            {
                margin-left: -20px;
                margin-right: -20px;
            }
        }

        // &:hover
        // {
        //     .MenuItem-childs
        //     {
        //         display: block;
        //     }
        // }
        
    }

    
</style>
