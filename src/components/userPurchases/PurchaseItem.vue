<template>

    <div>

        <div class="productItem">
            <div class="row no-gutters1">
                <div class="col-md-2 productItem-imageCol">
                    <div class="productItem-image">
                        <img :src="product.photo" data-toggle="m-tooltip" data-placement="top" :data-original-title="product.title"
                             :alt="product.title"
                             class="a--full-width" />
                    </div>
                </div>
                <div class="col-md-10 productItem-descriptionCol">
                    <div class="productItem-description">
                        <div class="title" v-html="product.title"></div>
                        <div class="action">
                            <button v-if="product.sets.list.length === 1 && product.sets.list[0].videos_count > 0" @click="setSelectedSet(product, product.sets.list[0], 'video')"
                                    class="btn btn-warning btn-lg btnViewContentSet btnViewVideo">
                                فیلم ها
                            </button>
                            <button v-if="product.sets.list.length === 1 && product.sets.list[0].pamphlets_count > 0" @click="setSelectedSet(product, product.sets.list[0], 'pamphlet')"
                                    class="btn btn-secondary btn-lg btnViewContentSet btnViewPamphlet">
                                جزوات
                            </button>
                            <div v-if="product.sets.list.length > 1" class="CustomDropDown solidBackground background-yellow">
                                <div class="CustomDropDown solidBackground background-yellow" @click="toggleDropdown" >
                                    <div class="select-selected" :class="{'select-arrow-active': setsDropdownOpen}" v-html="selectedSetTitle"></div>
                                </div>

                            </div>
                            <div v-if="product.sets.list.length === 0" role="alert" class="alert alert-info noContentInProductMessage">
                                <strong>
                                    به زودی
                                </strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <transition
            name="fade-PurchaseItem"
            mode="out-in"
            appear
            :duration="500"
        >
            <div v-if="product.sets.list.length > 1" v-show="setsDropdownOpen"  class="productItem-extra CustomParentOptions CustomDropDown CustomDropDown-show">
                <div class="select-items">


                    <div class="select-item" v-for="(item, index) in product.sets.list"
                         v-if="canShowSet(item)"
                    >
                        <div class="setRow">
                            <div class="setRow-label" v-html="item.title"></div>
                            <div class="setRow-action">
                                <button type="button" class="btn btn-warning btnViewContentSet btnViewVideo" v-if="item.videos_count > 0" @click="setSelectedSet(product, item, 'video')">
                                    فیلم ها
                                </button>
                                <button type="button" class="btn btn-secondary btnViewContentSet btnViewPamphlet" v-if="item.pamphlets_count > 0" @click="setSelectedSet(product, item, 'pamphlet')">
                                    جزوات
                                </button>
                            </div>
                        </div>
                    </div>



                </div>
            </div>
        </transition>
    </div>

</template>

<script>
import Assist from "src/plugins/assistant";
import {Product} from 'src/models/Product'
export default {
    name: "PurchaseItem",
    props: {
        product: {
            type: Product,
            default: []
        },
        filter: {
            type: String,
            default: ''
        },
    },
    computed: {

    },
    data() {
        return {
            selectedSetTitle: null,
            setsDropdownOpen: false
        }
    },
    methods: {
        canShowSet(item) {

            let countOfSets = this.product.sets.list.filter(set => (Assist.stringContain(this.filter, set.title))).length;

            return (
                (
                    countOfSets > 0 &&
                    Assist.stringContain(this.filter, item.title)
                ) ||
                (
                    countOfSets === 0 &&
                    Assist.stringContain(this.filter, this.product.title)
                )
            );
        },
        setSelectedSet(product, set, contentType) {
            this.selectedSetTitle = set.title;
                this.$emit('setSelected', {
                product: product,
                contentType: contentType,
                set: set
            });
        },
        toggleDropdown() {
            this.setsDropdownOpen = !this.setsDropdownOpen;
        },
    },
    created() {
        if (this.product.sets.list.length > 0)
        this.selectedSetTitle = this.product.sets.list[0].title;
        // this.product.setsDropdownOpen = false;
    },
}
</script>

<style>

    .fade-PurchaseItem-enter-active > * > *,
    .fade-PurchaseItem-leave-active > * > * {
        transition-duration: 200ms;
        transition-property: opacity, transform;
        transition-timing-function: cubic-bezier(0.6, 0.15, 0.35, 0.8);
    }

    .fade-PurchaseItem-enter > * > *,
    .fade-PurchaseItem-leave-to > * > * {
        opacity: 0;
        transform: translateY(-40px);
    }


    @media only screen and (max-width: 767px) {
        .productItem {
            padding: 0 5px;
        }
    }

</style>


<style lang="scss">

    @for $i from 2 through 10 {
        .fade-PurchaseItem-enter-active > * > *:nth-child(#{$i}) {
            transition-delay: #{($i * 100)}ms;
        }
        .fade-PurchaseItem-leave-active > * > *:nth-child(#{$i}) {
            transition-delay: #{($i * 100)}ms;
        }
    }

</style>

