<script setup>
import {ref, reactive} from 'vue'

import Logo from '../components/graphics/Logo.vue'
import MenuItem from '../components/wiki/MenuItem.vue'

import wiki from '../wiki'

const currentMenuItem = ref("")
const selectMenuItem = name => {
  console.log(name)
  currentMenuItem.value = name
}

const hideMenu = ref(true)

</script>

<template>
  <div class="Wiki" :class="{menu: !hideMenu}">
    <div class="Wiki-bar">
      <router-link class="Wiki-logoLink" to="/">
        <Logo class="Wiki-logo"/>
      </router-link>
      <div class="Wiki-menu">
        <MenuItem v-for="item in wiki.menu" :item="item" :currentItem="currentMenuItem" @selectItem="selectMenuItem"/>
      </div>
    </div>
    <div class="Wiki-body">
      <div class="Wiki-topBar">
        <router-link to="/" class="Wiki-catalogLink">
          ❮ На главную
        </router-link>
        <div class="Wiki-btnMenu" v-if="hideMenu" @click="hideMenu = false">≡</div>
        <div class="Wiki-btnMenu" v-if="!hideMenu"  @click="hideMenu = true">✕</div>
      </div>
      <h1 @click="hideMenu = true">{{ wiki.title }}</h1>
      <div class="Wiki-content" v-html="wiki.body" @click="hideMenu = true" />
    </div>
  </div>
</template>

<style lang="scss">
  .Wiki
  {
    display: flex;
    padding: 30px 0;
    font-size: 16px;
    overflow: hidden;
    max-width: 100vw;
    &-bar
    {
      margin-bottom: 20px;
      padding: 10px 10px;
      min-height: 100vh;
      min-width: 255px;
      transition: 0.8s;
    }
    
    &-logo
    {
      width: 205px!important;
      margin-bottom: -38px;
      margin-top: -55px;
      margin-left: 16px;
    }
    &-logoLink:hover
    {
      background: none;
    }
    &-menu
    {
      border-radius: 8px;
      overflow: hidden;
      
    }
    &-topBar
    {
      display: flex;
      margin-bottom: 25px;
      margin-top: -5px;
    }
    &-catalogLink
    {
      display: block;
      color: #fff;
      transition: 0.4s;
      padding: 7px 14px;
      background-color: rgba(255,255,255,.05);
      border-radius: 8px;
      :hover
      {
        color: rgb(255, 64, 151, 1);
      }
    }
    &.menu .Wiki-catalogLink
    {
      opacity: 0;
    }
    &-btnMenu
    {
      position: fixed;
      right: 16px;
      display: none;
      color: #fff;
      transition: 0.4s;
      padding: 7px 14px;
      background-color: rgba(255,255,255,.05);
      border-radius: 8px;
      z-index: 9999;
      &:hover
      {
        color: rgb(255, 64, 151, 0.2);
      }
    }

    &-body
    {
      width: 800px;
      padding: 13px 10px 30px 10px;
      h1
      {
        padding-bottom: 20px;
        line-height: 1.1em;
      }
      hr
      {
        border-color: rgba(255,255,255,.1);
        border-radius: 8px;
      }
      & img
      {
        max-width: 800px;
      }
    }
    ul, ol
    {
      li {
        padding-top: 5px;
        padding-bottom: 5px;
      }
      br
      {
      display: none;
      }
    }

    @media (max-width: 1100px) {
      #app
      {
        padding: 0!important;
      }
      &-body
      {
        box-sizing: border-box;
        width: 100vw;
        // padding-left: 16px;
        // padding-right: 16px;
        padding-left: 0;
        padding-right: 32px;
        max-width: 800px;
      }
      &-bar
      {
        margin-left: -255px;
        opacity: 0;
      }
      &.menu .Wiki-bar
      {
        margin-left: 0;
        opacity: 1;
      }
      &-btnMenu
      {
        display: block;
      }
    }

    @media (max-width: 800px) {
      &-body
      {
        min-width: 100vw;
      }
    }

  }
</style>
