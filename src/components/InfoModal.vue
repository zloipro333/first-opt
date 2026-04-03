<script setup>
        import { infoModal } from "../main"
</script>
    
    
    <template>
    <div class="Modal" v-if="infoModal.isOpen">
        <div class="Modal-background" @click="infoModal.close()"></div>
        <div class="Modal-wrapper">
            <div class="InfoModal">
                <div class="InfoModal-head">
                    <div class="InfoModal-header" v-if="infoModal.title">{{ infoModal.title }}</div>
                    <div class="InfoModal-close" @click="infoModal.close()">✕</div>
                </div>
                <div class="InfoModal-content" v-html="infoModal.text"></div>
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
        background-color: rgba(21, 35, 34, .2);
    }
    &-wrapper
    {
        padding: 15px;
    }
}

.InfoModal
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
    &-content
    {
        max-width: 550px;
        font-size: 1.2em;
        padding: 15px 0 10px 0;
        line-height: 1.6;

        :deep(a) {
            color: $color-content-accent;
        }
    }
}

</style>
