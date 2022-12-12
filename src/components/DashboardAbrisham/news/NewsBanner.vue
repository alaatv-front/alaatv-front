<template>
    <div
        class="banner-page"
    >
        <div class="banner">
            <a
                v-if="bannerData.url"
                :href="bannerData.url"
                target="_blank"
            >
                <img
                    :src="bannerData.src"
                    class="banner-image"
                />
            </a>
            <img
                v-else
                :src="bannerData.src"
                class="banner-image"
            />

        </div>
    </div>
</template>

<script>
export default {
    name: "NewsBanner",
    props:{
        bannerData:{
            type:Array,
            default:[]
        }
    }
}
</script>

<style lang="scss" scoped>
.banner-page{
    .banner{
        a{
            text-decoration:none;
        }
        .banner-image {
            height: 240px;
            width: 100%;
            border-radius: 30px;
            margin-bottom:14px;
            @media screen and (max-width: 1904px){
                height: 170px;
                margin-bottom:10px;
            }
            @media screen and (max-width: 1264px){
                width:427px ;
                height: 195px;
                margin-bottom:0;
                margin-left:15px;
                border-radius:20px;
                transition: 0.3s ease all;
                &:hover{
                    transform: scale(1.05);
                }
            }
            @media screen and (max-width: 960px){
                width:325px ;
                height: 140px;
            }
            @media screen and (max-width: 768px){
                width:460px ;
                height: 198px;
            }
            @media screen and (max-width: 600px){
                width:280px ;
                height: 120px;
                border-radius:15px;
            }
            @media screen and (max-width: 350px){
                width:240px ;
                height: 103px;
            }
        }
    }
}
</style>
