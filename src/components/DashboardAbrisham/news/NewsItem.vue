<template>
    <v-card class="news-item mb-4" flat>
        <div class="content d-flex">
            <div class="ma-0 pa-0 img-box">
                <v-card class="img" flat color="#eff3ff">
                    <v-img v-if="newItem.photo" :src="newItem.photo" />
                </v-card>
            </div>
            <div class="left-content">
                <div class="title-box d-flex flex-row justify-space-between">
                    <p class="title-text">
                        {{ newItem.title }}
                    </p>
                    <div class="d-flex date-box">
                        <img
                            v-if="pin"
                            src="https://nodes.alaatv.com/upload/abrishamDashboard/asset/abrisham-dashboard-news-pin.png"
                            class="img"
                        />
                        <div class="date">
                            {{ newItem.shamsiDate('created_at').dateTime }}
                        </div>
                    </div>
                </div>
                <div class="description-box">
                    <p
                        class="description-text"
                        :class="showMore ? 'expand' : 'single-line'"
                        v-html="newItem.description"
                    />
                </div>
                <div class="down-part d-flex justify-space-between ">
                    <div class="d-flex seen-box align-center">
                        <div
                            v-if="newItem.tags && newItem.tags !==null"
                            v-for="tag in newItem.tags"
                            class="tag d-flex"
                        >
                            <span>
                                {{ tag }}
                            </span>
                        </div>
                        <span class="text">
                            {{ newItem.seen_counter }}
                        </span>
                        <i class="fi fi-rr-eye icon d-flex"/>
                    </div>
                    <div class="date">
                        {{ newItem.shamsiDate('created_at').dateTime }}
                    </div>
                    <div class="show-more">
                        <v-btn
                            depressed
                            class="btn-style"
                            color="transparent"
                            v-if="!showMore"
                            @click="showMoreClicked"
                        >
                                 <span class="text">
                                       مشاهده خبر
                                 </span>
                            <i class="fi fi-rr-angle-down d-flex icon"/>
                        </v-btn>
                        <v-btn
                            v-if="showMore"
                            depressed
                            class="btn-style"
                            color="transparent"
                            @click="showMore = false"
                        >
                              <span class="text">
                                  بستن
                              </span>
                            <i class="fi fi-rr-angle-up icon"></i>
                        </v-btn>
                    </div>
                </div>
            </div>
        </div>
    </v-card>
</template>

<script>
import {LiveDescription} from '../../../../../Model/LiveDescription';

export default {
    name: "NewsItem",
    props: {
        pin: {
            type: Boolean,
            default: false,
        },
        newItem: {
            type: LiveDescription,
            default: new LiveDescription()
        },
    },
    data() {
        return {
            showMore:false
        }
    },
    methods:{
        showMoreClicked(){
            this.showMore=true;
            this.$emit('showMoreClicked', this.newItem.id);
        }
    }
}
</script>

<style lang="scss" scoped>
.news-item {
    border-radius: 20px !important;
    box-shadow: 0 3px 10px 0 rgba(44, 91, 185, 0.15) !important;
    @media only screen and (max-width: 768px) {
        border-radius: 15px !important;
        box-shadow: 0 2px 5px 0 rgba(44, 91, 185, 0.15) !important;
    }

    .content {
        padding: 16px 16px 16px 25px;
        @media only screen and (max-width: 768px) {
            padding: 10px 10px 10px 16px;
        }
        @media only screen and (max-width: 576px) {
            padding: 10px 10px 23px 16px;
        }

        .img-box {

            .img {
                border-radius: 10px;
                width: 108px;
                height: 108px;
                @media only screen and (max-width: 768px) {
                    width: 80px;
                    height: 80px;
                }
                @media only screen and (max-width: 576px) {
                    width: 70px;
                    height: 70px;
                }
            }
        }

        .left-content {
            width: 100%;
            padding: 5px 16px 0 0;
            @media only screen and (max-width: 768px) {
                padding: 1px 16px 0 0;
            }
            @media only screen and (max-width: 576px) {
                padding: 1px 10px 0 0;
            }

            .title-box {
                .title-text {
                    font-size: 18px;
                    height: 28px;
                    line-height: 28px;
                    font-weight: 500;
                    color: #3e5480;
                    margin-bottom: 10px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    width: 100%;
                    @media only screen and (max-width: 768px) {
                        height: 22px;
                        line-height: 22px;
                        font-size: 14px;
                        margin-bottom: 5px;
                    }
                    @media only screen and (max-width: 576px) {
                        height: 49px;
                        line-height: 24px;
                        -webkit-line-clamp: 2;
                    }
                }

                .date-box {
                    width: 100%;
                    justify-content: flex-end;
                    @media only screen and (max-width: 768px) {
                        min-width: 100px;
                    }
                    @media only screen and (max-width: 576px) {
                        min-width: 0;
                    }

                    .img {
                        width: 14px;
                        height: 21.9px;
                        margin-right: 10px;
                        @media only screen and (max-width: 768px) {
                            width: 12px;
                            height: 18px;
                        }
                    }

                    .date {
                        font-size: 12px;
                        color: #9fa5c0;
                        margin-right: 10px;
                        @media only screen and (max-width: 576px) {
                            display: none;
                        }
                    }

                    .icon {
                        width: 15px;
                        height: 22px;
                        color: #9fa5c0;
                    }
                }
            }
        }

        .description-box {
            height: auto;

            .description-text {
                margin-bottom: 6px;
                font-size: 16px;
                color: #9fa5c0;
                height: 24px;
                transition: all ease-in-out 0.5s;
                @media only screen and (max-width: 768px) {
                    margin-bottom: 5px;
                    font-size: 12px;
                    height: 20px;
                }
                @media only screen and (max-width: 576px) {
                    margin-bottom: 10px;
                }

                &.single-line {
                    overflow: hidden;
                    max-height: 30px;
                }

                &.expand {
                    height: 100%;
                    overflow: hidden;
                    max-height: 1000px;
                }

                @media only screen and (max-width: 576px) {
                    font-size: 12px;
                    line-height: 24px;
                }
            }
        }

        .down-part {
            @media only screen and (max-width: 576px) {
                position: absolute;
                width: 100%;
                right: 10px;
                bottom: 10px;
            }

            .seen-box {
                align-items: center;

                .tag {
                    margin-left: 23px;
                    padding: 3px 23px;
                    font-size: 12px;
                    color: #3e5480;
                    background-color: #eff3ff;
                    border-radius: 13px;
                    @media only screen and (max-width: 768px) {
                        padding: 0 14px;
                        margin-left: 10px;
                    }
                    @media only screen and (max-width: 576px) {
                        padding: 0 18px;
                    }
                }

                .icon {
                    font-size: 14px;
                    margin-right: 5px;
                    color: #9fa5c0;
                    align-items: center;
                    @media only screen and (max-width: 768px) {
                        font-size: 12px;
                        align-items: center;
                    }
                }

                .text {
                    color: #9fa5c0;
                    @media only screen and (max-width: 768px) {
                        font-size: 10px;
                        align-items: center;
                    }
                }
            }

            .date {
                display: none;
                font-size: 10px;
                color: #9fa5c0;
                @media only screen and (max-width: 576px) {
                    display: flex;
                    align-items: center;
                }
                @media only screen and (max-width: 350px) {

                }
            }

            .show-more {
                .btn-style {
                    margin-left: -16px;
                    border-radius: 15px;
                    letter-spacing: 0;
                    font-weight: normal !important;
                    @media only screen and (max-width: 768px) {
                        height: 18px;
                    }
                    @media only screen and (max-width: 576px) {
                        margin-left: 12px;
                    }

                    .icon {
                        color: #3e5480;
                        font-size: 14px;
                        align-items: center;
                        @media only screen and (max-width: 768px) {
                            font-size: 12px;
                            align-items: center;
                        }
                        @media only screen and (max-width: 350px) {
                            font-size: 12px;
                        }
                    }

                    .text {
                        margin-left: 10px;
                        color: #3e5480;
                        font-size: 14px;
                        @media only screen and (max-width: 768px) {
                            font-size: 12px;
                        }
                        @media only screen and (max-width: 350px) {
                            font-size: 10px;
                        }
                    }
                }
            }
        }
    }
}

</style>
