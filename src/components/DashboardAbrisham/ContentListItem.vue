<template>
    <div
        class="content-list-item"
        :class="selected ? 'selected-content-list' : ''"
        @click="changeSelectedItem"
        ref="contentItem"
    >
        <div
            class="d-flex contentListItem-main-box"
        >
            <div class="right-content">
                <v-card
                    v-if="content.lesson_name"
                    height="22"
                    class="mb-2 rounded-pill text-center lesson_name"
                    flat
                    dark
                    :color="content.color"
                    v-text="content.lesson_name"
                />
                <div class="contentListItem-box">
                    <v-card
                        v-if="type === 'video'"
                        flat
                    >
                        <v-img
                            class="content-list-image"
                            :src="content.photo"
                        />
                    </v-card>
                    <div
                        v-if="content.has_watched"
                        class="d-flex seen justify-center align-center"
                    >
                        <i class="fi fi-rr-check icon" />
                    </div>
                    <v-img
                        v-if="type === 'pamphlet'"
                        src="https://nodes.alaatv.com/upload/abrisham-panel-pdf.png"
                        class="content-list-image"
                    />
                </div>
            </div>
            <div class="left-content">
                <div class="d-flex">
                    <v-sheet
                        v-if="content.start"
                        text-color="#3e5480"
                        depressed
                        height="22"
                        class="d-flex justify-center mb-2 rounded-pill time-sheet"
                        :color="selected ? 'white' : '#eff3ff'"
                    >
                        <div class="clock d-flex align-center px-2">
                            <i class="text-color fi fi-rr-clock ml-2 mt-1" />
                            <div>
                                <span class="text-color" v-text="getClockTime().start" />
                                <span class="text-color"> الی </span>
                                <span class="text-color" v-text="getClockTime().end" />
                            </div>
                        </div>
                    </v-sheet>
                </div>
                <v-sheet
                    v-if="false"
                    class="mb-2"
                    color="transparent"
                    height="22"
                />
                <div
                    class="sheet-icon d-flex justify-space-between align-center"
                    v-if=" type === 'video' "
                >
                    <div class="d-flex flex-column justify-center title-box">
                        <p class="contentListItem-title ">
                            {{ content.short_title }}
                        </p>
                        <p
                            class="contentListItem-description"
                        >
                            {{ content.title }}
                        </p>
                    </div>
                </div>
                <div
                    class="sheet-icon d-flex justify-space-between align-center"
                    v-else-if=" type === 'pamphlet' "
                >
                    <div class="d-flex flex-column justify-center title-box">
                        <p class="contentListItem-title">
                            {{ content.short_title }}
                        </p>
                        <p
                            class="contentListItem-description"
                        >
                            {{ content.title }}
                        </p>
                    </div>
                    <div
                        v-if="content.file"
                    >
                        <a
                            :href="content.file.pamphlet[0].link"
                        >
                            <i
                                class="fi fi-rr-download download-icon"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {Content} from '../../../../Model/Content';

export default {
    name:'ContentListItem',
    props: {
        content: {
            type: Content,
            default: () => {
                return new Content();
            },
        },
        selected: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: ''
        }
    },
    mounted() {
       this.setScrollPosition()
    },
    methods: {
      setScrollPosition() {
        if (this.selected){
            this.$refs.contentItem.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
        }
      },
        getClockTime () {
            return {
                start: this.formatClock(this.content.start),
                end: this.formatClock(this.content.end)
            }
        },
        formatClock (clock) {
            if (!clock) {
                return clock
            }
            var timeArray = clock.split(':')

            timeArray.splice(2, 1)
            return  timeArray.join(':')
        },
        changeSelectedItem(){
            if (this.type === 'pamphlet' && !this.content.file){
                window.open(this.content.url.web, '_blank').focus();
            }
            else {
                this.$emit('itemClicked')
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.content-list-item{
    &:hover {
         cursor: pointer;
         background-color: rgba(242, 245, 255, 0.31);
     }
    .contentListItem-main-box {
        margin:0 32px;
        padding-top: 21px;
        border-bottom: solid 1px rgba(159, 165, 192, 0.58);
        @media screen and (max-width: 1920px){
            margin: 0 15px;
            padding-top: 15px;
        }
        @media screen and (max-width: 350px){
            margin: 0 10px;
            padding-top: 10px;
        }
        .right-content {
            margin-bottom: 21px;
            @media screen and (max-width: 576px){
                margin-bottom: 15px;
            }
            .lesson_name {
                font-size: 12px;
                line-height: 20px;
                @media screen and (max-width: 768px){
                    font-size: 11px;
                    line-height: 22px;
                }
            }
            .contentListItem-box {
                 position: relative;
                .content-list-image {
                        width: 96px;
                        border-radius: 10px !important;
                        @media screen and (max-width: 1920px){
                            width: 70px;
                            border-radius: 5px !important;
                        }
                        @media screen and (max-width: 959px){
                            width: 96px;
                            border-radius: 10px !important;
                        }
                        @media screen and (max-width: 768px){
                            width: 70px;
                            border-radius: 5px !important;
                        }
                        @media screen and (max-width: 320px){
                            width: 60px;
                    }

                    }
                .seen {
                    height: 54px;
                    width: 96px;
                    opacity: 0.5;
                    border-radius: 10px;
                    background-color: #000000;
                    position: absolute;
                    top: 0;
                    @media screen and (max-width: 1920px){
                        height: 100%;
                        width: 100%;
                        border-radius: 5px;
                    }
                    @media screen and (max-width: 320px){
                        height: 33px;
                        width: 60px;
                    }
                    .icon {
                        font-size: 25px;
                        color: #fff;
                    }
                }
             }
        }
        .left-content {
            margin-right: 15px;
            width: 100%;
            height: 100%;
            @media screen and (max-width: 1920px){
                margin-right: 10px;
            }
            @media screen and (max-width: 576px){
                margin-right: 5px;
            }
            .time-sheet {
                font-size: 12px;
                .clock {
                    .text-color{
                        color: #3e5480;
                    }
                }
            }
            .sheet-icon {
                .title-box {
                    height: 100%;
                    width: 100%;
                    .contentListItem-description {
                        font-size: 14px;
                        color: #9fa5c0;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                        @media screen and (max-width: 1920px){
                            font-size: 14px;
                            color: #9fa5c0;
                        }
                        @media screen and (max-width: 768px){
                            font-size: 12px;
                        }
                        @media screen and (max-width: 350px){
                            font-size: 12px;
                        }

                    }
                    .contentListItem-title {
                        font-size: 18px;
                        font-weight: 500;
                        text-align: right;
                        color: #3e5480;
                        margin-bottom: 0;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                        @media screen and (max-width: 1920px){
                            font-size: 18px;
                            font-weight: 500;
                            text-align: right;
                            color: #3e5480;
                            margin-bottom: 0;
                        }
                        @media screen and (max-width: 768px){
                            font-size: 14px;
                        }
                        @media screen and (max-width: 350px){
                            font-size: 14px;
                        }
                    }
                }
                .download-icon{
                    color: #3e5480;
                    font-weight: 500;
                    font-size: 20px;
                    margin-right: 5px;
                    @media screen and (max-width: 959px){
                        font-size: 24px ;
                    }
                    @media screen and (max-width: 768px){
                        font-size: 15px;
                    }
                }
                a{
                    text-decoration: none;
                }
            }

        }
    }
    &:last-child {
        .contentListItem-main-box {
            border-bottom: none;
        }
    }
}
.selected-content-list {
    background-color: #f2f5ff!important;
}
</style>
