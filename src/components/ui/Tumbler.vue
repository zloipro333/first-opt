<script setup>
import * as v from 'vue'
import { defineProps, defineEmits, computed } from 'vue'


const props = defineProps(['active'])
const emit = defineEmits(['toggle'])

const toggle = () => {
    emit('toggle')
}

const bodyColor = computed(() => {
    return props.active ? "#08d572" : "#D8D8D8"
})

const clickerPosition = computed(() => {
    return props.active ? "34" : "5"
})

</script>

<template>
    <div @click="toggle">
        <svg width="59px" height="28px" viewBox="0 0 59 28" version="1.1">
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Artboard" transform="translate(-2, -2)">
                    <g id="Tumbler" transform="translate(2, 2)">
                        <rect id="Body" stroke="#000000" stroke-width="2" :fill="bodyColor" x="1" y="1" width="57" height="26" rx="13"></rect>
                        <rect id="Clicker" fill="#000000" :x="clickerPosition" y="4" width="20" height="20" rx="10"></rect>
                    </g>
                </g>
            </g>
        </svg>
    </div>
</template>

<style lang="scss" scoped>
     @import '@/mixins.scss';

    svg 
    {
        display: block;
        fill: $color-interface-accent;
        height: 28px;
        margin: 13px;
        margin-left: 0;
        cursor: pointer;
        
    }
    #Body, #Clicker
    {
        transition: all .3s;
    }
</style>

