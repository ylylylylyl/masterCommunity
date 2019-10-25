<template>
    <div class="header">
        <slot>

        </slot>
    </div>
</template>

<style scoped>
    .header{
        height: 40px;
        background: #6E8B3D !important;
        display: flex;
        justify-content:center;
        align-items: center;
        position: fixed;
        z-index: 100;
        width: 100%;
    }
    .icon-dingwei{
        display: block;
        color: white;
        font-size: 20px;
        margin-right: 10px;
    }
    .comm-name{
        color: white;
    }
 
</style>