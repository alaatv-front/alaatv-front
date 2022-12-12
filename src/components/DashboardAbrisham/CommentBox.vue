<template>
    <div class="comment-box">
        <div>
        <v-textarea
            v-model="note"
            class="rounded-xl  comment-main"
            background-color="#eff3ff"
            :placeholder="setPlaceHolder"
            filled
            :value="note"
            auto-grow
            solo
            :disabled="doesntHaveContent || !canEdit"
            flat
        />
        </div>
       <div class="d-flex btns">
           <v-btn :disabled="doesntHaveContent" v-if="saveMode" depressed color="transparent" class="cancel btn-size" @click="cancel"><span> لغو</span></v-btn>
           <v-btn :disabled="doesntHaveContent" v-if="saveMode || value.length === 0" depressed color="#4caf50" dark class="submit btn-size" @click="saveComment"><span>ذخیره</span></v-btn>
           <v-btn :disabled="doesntHaveContent" v-else depressed color="#ff8f00" dark class="edit btn-size" @click="edit"><span> ویرایش</span></v-btn>
       </div>

    </div>
</template>

<script>
export default {
    name: 'CommentBox',
    props: {
        value: {
            type: String,
            default: '',
        },
        doesntHaveContent:{
            type: Boolean,
            default(){
                return false
            }
        }
    },
    data () {
        return {
            note: null,
            saveMode:false,
            showCancel:false,
            canCheck:true,
        }
    },
    computed: {
        canEdit () {
            return this.saveMode || this.value.length === 0
        },
        setPlaceHolder(){
            if(this.doesntHaveContent){
                return 'یادداشت در این مرحله فعال نمیاشد'
            }
            else{
                return 'یادداشت این جلسه'
            }

        }
    },
    watch: {
        value (newValue) {
            this.note = newValue
            this.checkEditMode(newValue)
        }
    },
    methods: {
        edit() {
            this.saveMode = true
        },
        cancel() {
            this.note = this.value
            this.saveMode = false
        },
        saveComment() {
            this.saveMode = false
            this.$emit('input', this.note)
        },
        checkEditMode(data){
            if(this.canCheck && data.length > 0) {
                this.saveMode = false
                this.canCheck = false
            } else if(this.canCheck){
                this.saveMode = true
                this.canCheck=false
            }
        }
    }
}
</script>

<style scoped lang="scss">

.comment-box{

    .btns{
        width: 100%;
        justify-content: flex-end;
        .btn-size{
            border-radius: 10px !important;
            width: 120px;
            height: 48px !important;
            @media only screen and (max-width: 1200px) {
                height: 40px !important;
            }
            @media only screen and (max-width: 576px) {
                height: 36px !important;
                width: 100px;
            }
        }
        .edit{
            span{
                font-size: 16px;
            }
        }
        .submit{
            span{
                font-size: 16px;
            }
        }
        .cancel{
            span{
                color: #9fa5c0;
                font-size: 16px;
            }
        }
    }
    .v-text-field.v-text-field--enclosed{
        margin-right: 0 !important;
    }
}
</style>
<style lang="scss">
.comment-box {
    .comment-main{
        .v-input__slot{
            margin-bottom: 20px;
            @media only screen and (max-width: 990px) {
                margin-bottom: 15px;
            }
            textarea{
                height:140px!important;
                overflow:auto;
                @media only screen and (max-width: 1904px){
                    height:120px!important;
                }
                @media only screen and (max-width: 990px){
                    height:100px!important;
                }
                @media only screen and (max-width: 768px){
                    height:120px!important;
                }
                @media only screen and (max-width: 576px){
                    height:80px!important;
                }
                &:-moz-placeholder { /* Firefox 18- */
                    color: #3e5480 !important;
                    margin-top: 16px;
                    margin-right: 29px;
                    font-size: 16px;
                    font-weight:500;
                }
                &::-webkit-input-placeholder {
                    color: #3e5480 !important;
                    margin-top: 16px;
                    margin-right: 12px;
                    font-size: 16px;
                    font-weight:500;
                }
                &:-moz-placeholder {  /* Firefox 19+ */
                    color: #3e5480 !important;
                    margin-top: 16px;
                    margin-right: 29px;
                    font-size: 16px;
                    font-weight:500;
                }
                &:-ms-input-placeholder {
                    color: #3e5480 !important;
                    margin-top: 16px;
                    margin-right: 29px;
                    font-size: 16px;
                    font-weight:500;
                }
                &::placeholder {
                    color: #3e5480 !important;
                    margin-top: 16px;
                    margin-right: 29px;
                    font-size: 16px;
                    font-weight:500;
                }

            }
        }
        .v-input__control{
            .v-text-field__details{
                margin-bottom: 0;
                min-height:0;
                .v-messages{
                    min-height:0;
                    height:0
                }
            }
        }
    }
}

</style>
