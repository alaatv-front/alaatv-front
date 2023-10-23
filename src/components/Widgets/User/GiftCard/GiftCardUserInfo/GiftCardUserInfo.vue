<template>
  <div class="user-info">
    <div class="page-title">حساب و قرارداد</div>
    <div class="profile-section">
      <div class="profile-title">
        اطلاعات هویتی
      </div>
      <div class="profile-box">
        <div class="profile-txt-inputs">
          <div class="row no-gutters">
            <div class="col-sm-3 col-12 col-xs-12">
              <div class="input-item">
                <div class="title">
                  نام
                </div>
                <div class="input">
                  <q-input v-model="localUser.first_name"
                           class="field-md" />
                </div>
              </div>
            </div>
            <div class="col-sm-3 col-12 col-xs-12">
              <div class="input-item">
                <div class="title">
                  نام خانوادگی
                </div>
                <div class="input">
                  <q-input v-model="localUser.last_name"
                           class="field-md" />
                </div>
              </div>
            </div>
            <div class="col-sm-3 col-12 col-xs-12">
              <div class="input-item">
                <div class="title">
                  شماره همراه
                </div>
                <div class="input">
                  <q-input v-model="localUser.mobile"
                           class="field-md" />
                </div>
              </div>
            </div>
            <div class="col-sm-3 col-12 col-xs-12">
              <div class="input-item">
                <div class="title">
                  کد ملی
                </div>
                <div class="input">
                  <q-input v-model="localUser.national_code"
                           class="field-md" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="profile-nationl-code-section">
          <div class="row no-gutters q-mt-lg">
            <div class="col-12 col-sm-6">
              <div class="description">
                <div class="title">
                  بارگزاری تصویر کارت ملی
                </div>
                <div class="text">
                  برای تایید اطلاعات هویتی، نیازمند است که تصویر کارت ملی خود را بارگزاری کنید.
                </div>
                <div class="note">
                  <svg xmlns="http://www.w3.org/2000/svg"
                       width="8"
                       height="7"
                       viewBox="0 0 8 7"
                       fill="none">
                    <path d="M2.57425 7L4.20625 4.664L5.82225 7L6.73425 6.296L5.08625 4.056L7.71025 3.176L7.39025 2.072L4.73425 3L4.75025 0.2H3.61425L3.63025 3L1.00625 2.072L0.68625 3.176L3.31025 4.056L1.66225 6.296L2.57425 7Z"
                          fill="#FF9000" />
                  </svg>
                  تصویر کارت ملی باید از روبرو و خوانا باشد
                </div>
              </div>
            </div>
            <div class="col-12 col-sm-6"
                 @dragover.prevent
                 @drop.prevent>
              <div class="file-input-box full-height"
                   :class="{'dragover' : nationalCardPicState === 'dragover'}"
                   @dragover="dragover"
                   @dragleave="dragleave"
                   @drop="drop">
                <q-inner-loading :showing="uploadNationalCardPicLoading">
                  کمی صبر کنید...
                </q-inner-loading>
                <input id="nationalCardFileInput"
                       ref="nationalCardFileInput"
                       type="file"
                       class="file-input"
                       accept=".jpg,.jpeg,.png"
                       @change="onChange">
                <div class="file-input-content">
                  <div v-if="!nationalCardPicFile && !nationalCardPicURL">
                    <div class="sample-pic">
                      <svg width="48"
                           height="48"
                           viewBox="0 0 48 48"
                           fill="none"
                           xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.4">
                          <path fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M17.3029 12.2785C15.7616 12.2785 14.5122 13.528 14.5122 15.0692C14.5122 16.6105 15.7616 17.8599 17.3029 17.8599C18.8441 17.8599 20.0936 16.6105 20.0936 15.0692C20.0936 13.528 18.8441 12.2785 17.3029 12.2785ZM11.1633 15.0692C11.1633 11.6785 13.9121 8.92969 17.3029 8.92969C20.6936 8.92969 23.4424 11.6785 23.4424 15.0692C23.4424 18.46 20.6936 21.2088 17.3029 21.2088C13.9121 21.2088 11.1633 18.46 11.1633 15.0692Z"
                                fill="#FF9000" />
                          <path fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M4.11833 4.11833C7.09761 1.13905 11.5558 0 17.3023 0H26.2325C27.1573 0 27.907 0.749663 27.907 1.67442C27.907 2.59917 27.1573 3.34884 26.2325 3.34884H17.3023C11.8861 3.34884 8.53029 4.44234 6.48631 6.48632C4.44234 8.5303 3.34884 11.8861 3.34884 17.3023V30.6977C3.34884 36.1139 4.44234 39.4697 6.48631 41.5137C8.53029 43.5577 11.8861 44.6512 17.3023 44.6512H30.6977C36.1139 44.6512 39.4697 43.5577 41.5137 41.5137C43.5576 39.4697 44.6511 36.1139 44.6511 30.6977V19.5349C44.6511 18.6101 45.4008 17.8605 46.3256 17.8605C47.2503 17.8605 48 18.6101 48 19.5349V30.6977C48 36.4442 46.8609 40.9024 43.8816 43.8817C40.9024 46.861 36.4442 48 30.6977 48H17.3023C11.5558 48 7.09761 46.861 4.11833 43.8817C1.13905 40.9024 0 36.4442 0 30.6977V17.3023C0 11.5558 1.13905 7.09761 4.11833 4.11833Z"
                                fill="#FF9000" />
                          <path fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M30.6985 8.37168C30.6985 7.44693 31.4481 6.69727 32.3729 6.69727H44.652C45.5767 6.69727 46.3264 7.44693 46.3264 8.37168C46.3264 9.29644 45.5767 10.0461 44.652 10.0461H32.3729C31.4481 10.0461 30.6985 9.29644 30.6985 8.37168Z"
                                fill="#FF9000" />
                          <path fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M38.5111 0.559082C39.4358 0.559082 40.1855 1.30874 40.1855 2.2335V14.5126C40.1855 15.4373 39.4358 16.187 38.5111 16.187C37.5863 16.187 36.8367 15.4373 36.8367 14.5126V2.2335C36.8367 1.30874 37.5863 0.559082 38.5111 0.559082Z"
                                fill="#FF9000" />
                          <path fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M41.5952 26.387C40.4813 25.4302 38.5953 25.4302 37.4814 26.387L28.194 34.3572C28.1938 34.3574 28.1942 34.3571 28.194 34.3572C25.8251 36.3915 22.0848 36.3919 19.7161 34.3572L19.7018 34.3449L18.973 33.7043C17.9718 32.8498 16.261 32.7449 15.1093 33.5176L4.1033 40.907C3.33554 41.4225 2.29527 41.2179 1.7798 40.4502C1.26432 39.6824 1.46884 38.6422 2.2366 38.1267L13.2431 30.7369C15.6165 29.1446 18.9916 29.3052 21.1616 31.1696L21.1758 31.1818L21.9044 31.8223C23.0191 32.7737 24.9001 32.7719 26.0119 31.8169L35.2994 23.8467C35.2996 23.8465 35.2992 23.8468 35.2994 23.8467C37.6683 21.8124 41.4085 21.812 43.7772 23.8466C43.7772 23.8466 43.7772 23.8466 43.7772 23.8466L47.4163 26.9722C48.1178 27.5747 48.198 28.6319 47.5955 29.3334C46.993 30.0349 45.9358 30.1152 45.2343 29.5126L41.5952 26.387Z"
                                fill="#FF9000" />
                        </g>
                      </svg>
                    </div>
                    <div class="hint">
                      <div class="section-1">
                        عکس کارت ملی خود را اینجا رها کنید
                      </div>
                      <div class="section-2">
                        یا
                      </div>
                      <div class="section-3"
                           @click="selectFile">
                        <label for="nationalCardFileInput">
                          انتخاب با فایل
                        </label>
                      </div>
                    </div>
                  </div>
                  <div v-if="nationalCardPicFile && !nationalCardPicURL"
                       class="selected-pic">
                    <q-btn fab
                           icon="isax:trash"
                           class="q-my-sm remove-btn"
                           color="red"
                           @click="removeNationalCardPicFile" />
                    <q-img :src="nationalCardPicObjectURL" />
                    <div class="btn-upload">
                      <q-btn color="primary"
                             @click="uploadNationalCardPicFile">
                        آپلود تصویر
                        <q-icon right
                                name="mdi-cloud-upload" />
                      </q-btn>
                    </div>
                  </div>
                  <div v-if="!nationalCardPicFile && nationalCardPicURL"
                       class="selected-pic cursor-pointer">
                    <q-img :src="nationalCardPicURL"
                           @click="showNationalCard = true" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="financial-info-section">
        <div class="title">
          اطلاعات مالی
        </div>
        <div class="row no-gutters">
          <div class="col-12 col-sm-6 column justify-around">
            <div>
              برای انجام تسویه‌حساب لازم است تمامی بخش‌های «اطلاعات هویتی» شما تأیید شده باشد.
            </div>
            <div>
              شبا ارائه شده توسط شما باید متعلق به شخص حقیقی ‌باشد که بخش اطلاعات هویتی با اطلاعات وی تکمیل شده است.
            </div>
            <div>
              حداقل مبلغ مورد نیاز برای تسویه، 1,000,000 تومان است. مبالغ کمتر از این، بنا به درخواست شما، در پایان سال تصفیه خواهند شد.
            </div>
          </div>
          <div class="col-12 col-sm-6 shaba-number-col">
            <div class="shaba-number-box">
              <q-inner-loading :showing="shabaNumberLoading">
                کمی صبر کنید...
              </q-inner-loading>
              <div class="title">
                <div class="text">
                  شماره شبا
                  <span v-if="bankAccountStatus === 'verify'"
                        class="text-green">
                    (تایید شده)
                  </span>
                  <span v-if="bankAccountStatus === 'pending'"
                        class="text-orange">
                    (در انتظار تایید)
                  </span>
                  <span v-if="bankAccountStatus === 'reject'"
                        class="text-red">
                    (تایید نشده)
                  </span>
                  <span v-if="targetShabaBank">
                    ({{ targetShabaBank[1] }})
                  </span>
                </div>
                <div v-if="targetBankLogo"
                     class="target-bank-logo">
                  <lazy-img :src="targetBankLogo"
                            width="50px" />
                </div>
              </div>
              <div class="shaba-number-input">
                <q-input v-model="localShabaNumber"
                         :readonly="hasShabaNumber"
                         mask="##-####-####-####-####-####-##"
                         dir="ltr"
                         class="q-pl-sm field-md">
                  <template #after>
                    IR
                  </template>
                </q-input>
              </div>
              <div v-if="!hasShabaNumber"
                   class="shaba-number-hint">
                <span class="hint-sh text">
                  شماره شبا دریافتی از بانک. برای مثال:
                </span>

                <span class="hint-sh example">
                  IR123456789012345678901234
                </span>

              </div>
              <div class="title q-mt-md">
                <div class="text">
                  شماره کارت
                  <span v-if="bankAccountStatus === 'verify'"
                        class="text-green">
                    (تایید شده)
                  </span>
                  <span v-if="bankAccountStatus === 'pending'"
                        class="text-orange">
                    (در انتظار تایید)
                  </span>
                  <span v-if="bankAccountStatus === 'reject'"
                        class="text-red">
                    (تایید نشده)
                  </span>
                  <span v-if="targetCardBank">
                    ({{ targetCardBank[1] }})
                  </span>
                </div>
                <div v-if="cardBankLogo && false"
                     class="target-bank-logo">
                  {{ recognizedCardBank }}
                  <lazy-img :src="cardBankLogo"
                            width="50px" />
                </div>
              </div>
              <div class="card-number-input">
                <q-input v-model="localCardNumber"
                         :readonly="hasCardNumber"
                         mask="####-####-####-####"
                         dir="ltr"
                         class="q-pl-sm field-md" />
              </div>
              <div v-if="!targetBank"
                   class="shaba-number-hint">
                شماره شبا و شماره کارت وارد شده مربوط به یک بانک واحد نیستند.
              </div>
              <div class="shaba-number-action-btn-row">
                <q-btn v-if="!hasShabaNumber"
                       color="primary"
                       class="shaba-number-action-btn"
                       :disable="!targetBank"
                       @click="sendShabaNumber">
                  ثبت
                </q-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="false"
           class="contract-section">
        <div class="title">قرارداد</div>
        <div class="contract-box">
          <div class="description">
            قرارداد زیر را با دقت مطالعه کنید و در صورت تمایل به ادامه همکاری و تایید حساب توسعه دهنده خود آن را تایید کنید.
          </div>
          <div class="row no-gutters">
            <div class="col-12 col-md-6 pdf-col">
              <div class="title">
                دانلود فایل قرارداد
              </div>
              <div class="content">
                <div class="pdf-donwnload-box">
                  <div class="file-title-icon">
                    <div class="pdf-icon"
                         @click="downloadPdf">
                      <svg xmlns="http://www.w3.org/2000/svg"
                           viewBox="0 0 78 44"
                           fill="none">
                        <path d="M5.57149 0L60.6274 0.0552524L77.9187 17.3661L78 38.4194C78 39.8972 77.413 41.3144 76.3682 42.3594C75.3234 43.4044 73.9062 43.9915 72.4285 43.9917H5.57149C4.09376 43.9915 2.67663 43.4044 1.6318 42.3594C0.586968 41.3144 -1.57097e-08 39.8972 0 38.4194V5.56986C0.000430908 4.0925 0.587612 2.67578 1.63242 1.63127C2.67723 0.58677 4.09412 -6.28421e-08 5.57149 0Z"
                              fill="#E2574C" />
                        <path d="M77.9186 17.3662H64.4795C63.4571 17.3658 62.4767 16.9594 61.7537 16.2365C61.0308 15.5135 60.6245 14.5331 60.624 13.5108V0.0537109L77.9186 17.3662Z"
                              fill="#B53629" />
                        <path d="M54.0925 19.2799C54.4142 19.2336 54.7084 19.0729 54.9212 18.8272C55.1339 18.5816 55.2511 18.2675 55.2511 17.9425C55.2511 17.6175 55.1339 17.3035 54.9212 17.0578C54.7084 16.8122 54.4142 16.6515 54.0925 16.6051H49.6594C49.4694 16.6091 49.2823 16.6522 49.1096 16.7316C48.937 16.811 48.7825 16.9251 48.6559 17.0668C48.5292 17.2085 48.433 17.3747 48.3734 17.5551C48.3137 17.7356 48.2918 17.9263 48.309 18.1156V29.0116C48.309 29.9825 48.8623 30.522 49.609 30.522C50.3557 30.522 50.9091 29.9825 50.9091 29.0116V26.0207H53.5904C53.7633 26.0196 53.9342 25.983 54.0923 25.9129C54.2505 25.8429 54.3925 25.7411 54.5095 25.6138C54.6265 25.4865 54.7161 25.3364 54.7725 25.1729C54.829 25.0095 54.8511 24.8361 54.8376 24.6637C54.8493 24.4936 54.8256 24.3228 54.768 24.1622C54.7104 24.0016 54.6202 23.8547 54.503 23.7308C54.3859 23.6068 54.2443 23.5084 54.0872 23.4419C53.9301 23.3754 53.761 23.3421 53.5904 23.3442H50.9091V19.2816L54.0925 19.2799ZM39.1071 16.6051H35.8635C35.6635 16.595 35.4636 16.6269 35.2766 16.6987C35.0896 16.7706 34.9198 16.8808 34.778 17.0222C34.6361 17.1636 34.5255 17.3332 34.4531 17.52C34.3808 17.7067 34.3484 17.9066 34.3579 18.1067V29.0205C34.3526 29.221 34.3895 29.4204 34.4663 29.6057C34.5432 29.791 34.6581 29.958 34.8037 30.096C34.9493 30.234 35.1223 30.3397 35.3115 30.4064C35.5007 30.4731 35.7018 30.4992 35.9017 30.483H39.3054C43.3347 30.483 45.9957 27.8318 45.9957 23.7391C45.9925 19.4124 43.4875 16.6051 39.1071 16.6051ZM39.2631 27.792H37.2855V19.2962H39.0681C41.7657 19.2962 42.939 21.1065 42.939 23.6026C42.939 25.9418 41.7868 27.7887 39.2631 27.7887V27.792ZM27.38 16.6051H24.1664C23.9695 16.5945 23.7726 16.6271 23.5895 16.7006C23.4065 16.7741 23.2418 16.8868 23.1069 17.0307C22.9721 17.1746 22.8703 17.3463 22.8088 17.5337C22.7473 17.7211 22.7276 17.9197 22.751 18.1156V29.0116C22.7312 29.2022 22.7517 29.395 22.8111 29.5772C22.8705 29.7595 22.9676 29.9273 23.096 30.0697C23.2243 30.212 23.3812 30.3259 23.5563 30.4038C23.7315 30.4817 23.9211 30.522 24.1128 30.522C24.3045 30.522 24.4941 30.4817 24.6692 30.4038C24.8444 30.3259 25.0013 30.212 25.1296 30.0697C25.258 29.9273 25.3551 29.7595 25.4145 29.5772C25.4739 29.395 25.4944 29.2022 25.4746 29.0116V25.8305H27.4888C28.0949 25.8502 28.6984 25.7443 29.2616 25.5197C29.8248 25.295 30.3354 24.9564 30.7615 24.525C31.1877 24.0936 31.52 23.5788 31.7377 23.0129C31.9555 22.447 32.0539 21.8422 32.0268 21.2365C32.0525 20.6201 31.9498 20.0051 31.7252 19.4305C31.5006 18.8559 31.159 18.3343 30.722 17.8988C30.285 17.4633 29.7623 17.1234 29.187 16.9007C28.6116 16.678 27.9963 16.5773 27.38 16.6051ZM27.3263 23.2743H25.4746V19.1638H27.3263C27.8376 19.2126 28.3123 19.4502 28.6578 19.8302C29.0033 20.2103 29.1948 20.7054 29.1948 21.219C29.1948 21.7326 29.0033 22.2278 28.6578 22.6078C28.3123 22.9879 27.8376 23.2255 27.3263 23.2743Z"
                              fill="white" />
                      </svg>
                      <div class="bs" />
                    </div>
                    <div class="file-title q-ml-md"
                         @click="downloadPdf">
                      قرارداد آلاء و توسعه دهنده کارت‌های هدیه آلاء
                    </div>
                  </div>
                  <div class="download-icon"
                       @click="downloadPdf">
                    <svg xmlns="http://www.w3.org/2000/svg"
                         width="34"
                         height="34"
                         viewBox="0 0 34 34"
                         fill="none">
                      <g filter="url(#filter0_d_167_428)">
                        <path d="M14.878 21.122C15.1566 21.4008 15.4874 21.6219 15.8515 21.7728C16.2156 21.9237 16.6059 22.0014 17 22.0014C17.3941 22.0014 17.7844 21.9237 18.1485 21.7728C18.5126 21.6219 18.8434 21.4008 19.122 21.122L22.333 17.911C22.5051 17.7206 22.5975 17.4713 22.5909 17.2147C22.5843 16.958 22.4793 16.7138 22.2976 16.5325C22.1159 16.3511 21.8714 16.2466 21.6148 16.2406C21.3581 16.2346 21.109 16.3274 20.919 16.5L17.993 19.427L18 4C18 3.73478 17.8946 3.48043 17.7071 3.29289C17.5196 3.10536 17.2652 3 17 3V3C16.7348 3 16.4804 3.10536 16.2929 3.29289C16.1053 3.48043 16 3.73478 16 4L15.991 19.408L13.081 16.5C12.8933 16.3125 12.6389 16.2072 12.3736 16.2073C12.1084 16.2074 11.854 16.3129 11.6665 16.5005C11.479 16.6881 11.3737 16.9426 11.3738 17.2079C11.3739 17.4731 11.4793 17.7275 11.667 17.915L14.878 21.122Z"
                              fill="#697D9A" />
                      </g>
                      <g filter="url(#filter1_d_167_428)">
                        <path d="M28 19C27.7348 19 27.4804 19.1054 27.2929 19.2929C27.1054 19.4804 27 19.7348 27 20V24C27 24.2652 26.8946 24.5196 26.7071 24.7071C26.5196 24.8946 26.2652 25 26 25H8C7.73478 25 7.48043 24.8946 7.29289 24.7071C7.10536 24.5196 7 24.2652 7 24V20C7 19.7348 6.89464 19.4804 6.70711 19.2929C6.51957 19.1054 6.26522 19 6 19C5.73478 19 5.48043 19.1054 5.29289 19.2929C5.10536 19.4804 5 19.7348 5 20V24C5 24.7956 5.31607 25.5587 5.87868 26.1213C6.44129 26.6839 7.20435 27 8 27H26C26.7956 27 27.5587 26.6839 28.1213 26.1213C28.6839 25.5587 29 24.7956 29 24V20C29 19.7348 28.8946 19.4804 28.7071 19.2929C28.5196 19.1054 28.2652 19 28 19Z"
                              fill="#697D9A" />
                      </g>
                      <defs>
                        <filter id="filter0_d_167_428"
                                x="6.37378"
                                y="0"
                                width="21.2175"
                                height="29.0015"
                                filterUnits="userSpaceOnUse"
                                color-interpolation-filters="sRGB">
                          <feFlood flood-opacity="0"
                                   result="BackgroundImageFix" />
                          <feColorMatrix in="SourceAlpha"
                                         type="matrix"
                                         values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                         result="hardAlpha" />
                          <feOffset dy="2" />
                          <feGaussianBlur stdDeviation="2.5" />
                          <feColorMatrix type="matrix"
                                         values="0 0 0 0 0.243137 0 0 0 0 0.329412 0 0 0 0 0.501961 0 0 0 0.2 0" />
                          <feBlend mode="normal"
                                   in2="BackgroundImageFix"
                                   result="effect1_dropShadow_167_428" />
                          <feBlend mode="normal"
                                   in="SourceGraphic"
                                   in2="effect1_dropShadow_167_428"
                                   result="shape" />
                        </filter>
                        <filter id="filter1_d_167_428"
                                x="0"
                                y="16"
                                width="34"
                                height="18"
                                filterUnits="userSpaceOnUse"
                                color-interpolation-filters="sRGB">
                          <feFlood flood-opacity="0"
                                   result="BackgroundImageFix" />
                          <feColorMatrix in="SourceAlpha"
                                         type="matrix"
                                         values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                         result="hardAlpha" />
                          <feOffset dy="2" />
                          <feGaussianBlur stdDeviation="2.5" />
                          <feColorMatrix type="matrix"
                                         values="0 0 0 0 0.243137 0 0 0 0 0.329412 0 0 0 0 0.501961 0 0 0 0.2 0" />
                          <feBlend mode="normal"
                                   in2="BackgroundImageFix"
                                   result="effect1_dropShadow_167_428" />
                          <feBlend mode="normal"
                                   in="SourceGraphic"
                                   in2="effect1_dropShadow_167_428"
                                   result="shape" />
                        </filter>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6 image-col">
              <div class="title">
                مشاهده تصاویر قرارداد
              </div>
              <div class="content">
                <q-dialog v-model="contractDialog"
                          transition="dialog-bottom-transition"
                          max-width="600">
                  <template v-slot:default="dialog">
                    <q-card>
                      <q-card-section>
                        <q-img :src="contractDialogSrc" />
                      </q-card-section>
                      <q-card-actions class="justify-end">
                        <q-btn text
                               @click="dialog.value = false">بستن</q-btn>
                      </q-card-actions>
                    </q-card>
                  </template>
                </q-dialog>
                <div v-for="contractPic in contractImages"
                     :key="contractPic"
                     class="content-pic-item">
                  <q-img :src="contractPic"
                         @click="showContractImageDialog(contractPic)" />
                </div>
              </div>
            </div>
            <div class="chk-accept-contract">
              <span class="chk-text">
                قرارداد را به طور کامل مطالعه کردم و تمام قوانین و شرایط آن را میپذیرم.
              </span>
              <q-checkbox v-model="localAcceptContract"
                          :disable="acceptContractLoading || acceptContract"
                          :loading="acceptContractLoading"
                          color="primary"
                          hide-details />
              <q-inner-loading :showing="acceptContractLoading">
                کمی صبر کنید...
              </q-inner-loading>
            </div>
            <div class="col-12">
              <div class="send-accept-contract">
                <q-btn :disabled="!localAcceptContract || has_signed_contract"
                       fab
                       dark
                       x-small
                       class="send-accept-contract-btn"
                       @click="sendAcceptContract">
                  ثبت
                </q-btn>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    <q-dialog v-model="showNationalCard">
      <lazy-img :src="nationalCardPicURL"
                class="full-width" />
    </q-dialog>
  </div>
</template>

<script>
import { User } from 'src/models/User.js'
import LazyImg from 'src/components/lazyImg.vue'
import { APIGateway } from 'src/api/APIGateway.js'
import GiftCardMixin from '../Mixin/GiftCardMixin.js'
import NormalizeNumber from 'src/assets/js/NormalizeNumber.js'
import { Sheba, verifyCardNumber, getBankNameFromCardNumber } from 'persian-tools2'

export default {
  name: 'GiftCardUserInfo',
  components: { LazyImg },
  mixins: [GiftCardMixin],
  data () {
    return {
      shabaBankLogo: null,
      cardBankLogo: null,
      localUser: new User(),
      bankAccounts: [],
      has_signed_contract: false,
      showNationalCard: false,
      contractDialog: false,
      contractDialogSrc: null,
      nationalCardPicState: 'notSelected',
      uploadNationalCardPicLoading: false,
      nationalCardPicObjectURL: null,
      nationalCardPicURL: null,
      nationalCardPicFile: null,
      hasShabaNumber: false,
      hasCardNumber: false,
      acceptContract: false,
      localAcceptContract: false,
      acceptContractLoading: false,
      shabaNumberLoading: false,
      bankAccountStatus: '',
      localCardNumber: '',
      localShabaNumber: '',
      shabaNumber: null
    }
  },
  computed: {
    contractPdfLink () {
      return 'https://nodes.alaatv.com/media/c/pamphlet/1794/ZistHafte1.pdf'
      // const link = this.$store.getters.appProps.contractPdfLink
      // if (!link) {
      //   return null
      // }
      //
      // return link
    },
    contractPic () {
      return ''
    },
    contractImages () {
      return []
      // return this.$store.getters.appProps.contractImages
    },
    settlementGuide () {
      return ''
      // return this.$store.getters.appProps.settlementGuide
    },
    clearCardNumber () {
      if (!this.localCardNumber) {
        return ''
      }

      return this.localCardNumber.replaceAll('-', '')
    },
    clearShabaNumber () {
      if (!this.localShabaNumber) {
        return ''
      }

      return this.getShabaNumberWithoutPrefix(this.localShabaNumber.replaceAll('-', ''))
    },
    recognizedCardBank () {
      if (!this.isValidCardBank) {
        return null
      }
      return getBankNameFromCardNumber(this.clearCardNumber)
    },
    recognizedShabaBank () {
      if (!this.isValidShabaBank) {
        return null
      }
      return new Sheba('IR' + this.clearShabaNumber).recognize()
    },
    isValidShabaBank () {
      return new Sheba('IR' + this.clearShabaNumber).validate()
    },
    isValidCardBank () {
      return verifyCardNumber(this.clearCardNumber)
    },
    targetShabaBank () {
      return this.getBankCodeFromShabaNumber(this.clearShabaNumber)
    },
    targetCardBank () {
      return this.getBankCodeFromCardNumber(this.clearCardNumber)
    },
    targetBank () {
      if (!this.targetShabaBank || !this.targetCardBank || this.targetShabaBank[0] !== this.targetCardBank[0]) {
        return null
      }
      return this.targetShabaBank
    },
    targetBankLogo () {
      if (!this.targetBank) {
        return null
      }

      return this.getBankLogoFromCode(this.targetBank[0])
    }
  },
  mounted () {
    this.loadData()
    this.loadAuthData()
  },
  methods: {
    getNationalCardPhoto () {
      this.uploadNationalCardPicLoading = true
      APIGateway.user.getNationalCardPhoto()
        .then(nationalPhoto => {
          this.uploadNationalCardPicLoading = false
          this.nationalCardPicURL = nationalPhoto
        })
        .catch(() => {
          this.uploadNationalCardPicLoading = false
        })
    },
    moveToNextInput(value, maxLength, nextInputId, previousInput) {
      if (value.toString().length === maxLength && nextInputId) {
        this.$refs[nextInputId].focus()
      } else if (value.toString().length === 0 && previousInput) {
        this.$refs[previousInput].focus()
      }
    },
    loadAuthData () { // prevent Hydration node mismatch
      this.getNationalCardPhoto()
      this.localUser = this.$store.getters['Auth/user']
    },
    downloadPdf() {
      window.open(this.contractPdfLink, '_blank')
    },
    loadData () {
      this.loadShabaNumber()
      this.getSalesMan()
    },
    getSalesMan() {
      APIGateway.referralCode.getSalesManData()
        .then((response) => {
          this.has_signed_contract = response.has_signed_contract
          this.loadAcceptContract()
        })
        .catch()
    },
    loadShabaNumber () {
      this.shabaNumberLoading = true
      APIGateway.user.getBankAccounts()
        .then(bankAccounts => {
          this.shabaNumberLoading = false
          this.bankAccounts = bankAccounts.list
          if (this.bankAccounts.length === 0) {
            return
          }
          const bankAccount = this.bankAccounts[0]
          if (!bankAccount || !bankAccount.sheba) {
            return
          }
          this.bankAccountStatus = bankAccount.status
          this.shabaNumber = bankAccount.sheba
          this.localCardNumber = bankAccount['card-number']
          this.hasCardNumber = true
          if (this.shabaNumber) {
            this.hasShabaNumber = true
            this.localShabaNumber = this.shabaNumber
          }
        })
        .catch(() => {
          this.shabaNumberLoading = false
        })
    },
    loadAcceptContract () {
      this.localAcceptContract = this.has_signed_contract
      if (this.localAcceptContract) {
        this.acceptContract = true
      }
    },
    dragover (event) {
      this.nationalCardPicState = 'dragover'
    },
    dragleave (event) {
      this.nationalCardPicState = 'dragleave'
    },
    drop (event) {
      this.nationalCardPicState = 'drop'
      event.preventDefault()
      this.$refs.nationalCardFileInput.files = event.dataTransfer.files
      this.onChange() // Trigger the onChange event manually
    },
    onChange () {
      const filelist = [...this.$refs.nationalCardFileInput.files]
      if (!filelist[0]) {
        return
      }

      this.nationalCardPicFile = filelist[0]
      this.nationalCardPicObjectURL = URL.createObjectURL(this.nationalCardPicFile)
    },
    selectFile () {

    },
    removeNationalCardPicFile () {
      this.nationalCardPicFile = null
      this.nationalCardPicObjectURL = null
    },
    uploadNationalCardPicFile () {
      this.loading = true
      this.uploadNationalCardPicLoading = true
      const formData = new FormData()
      formData.append('photo', this.nationalCardPicFile)
      APIGateway.user.nationalCard(formData)
        .then((response) => {
          this.loading = false
          this.nationalCardPicURL = response.data.data?.url
          this.uploadNationalCardPicLoading = false
          this.removeNationalCardPicFile()
        })
        .catch((error) => {
          this.loading = false
          const messages = this.getErrorMessages(error.response?.data)
          this.showErrorMessages(messages)
          this.uploadNationalCardPicLoading = false
          this.removeNationalCardPicFile()
        })
    },
    getShabaNumberWithoutPrefix (shabaNumber) {
      return shabaNumber.replace('i', '').replace('I', '').replace('r', '').replace('R', '')
    },
    sendShabaNumber () {
      this.acceptContractLoading = true
      APIGateway.user.storeBankAccounts({
        shabaNumber: this.clearShabaNumber,
        cardNumber: this.clearCardNumber
      })
        .then(() => {
          this.acceptContractLoading = false
          this.shabaNumber = this.localShabaNumber
          this.acceptContractLoading = false
          this.$q.notify({
            message: ' شماره شبا با موفقیت ثبت  شد',
            type: 'positive'
          })
        })
        .catch((error) => {
          const messages = this.getErrorMessages(error.response.data)
          this.showErrorMessages(messages)
          this.acceptContractLoading = false
        })
    },
    showContractImageDialog (src) {
      this.contractDialogSrc = src
      this.contractDialog = true
    },
    sendAcceptContract () {
      if (!this.localAcceptContract) {
        return false
      }

      this.shabaNumberLoading = true
      APIGateway.referralCode.submitContract()
        .then(() => {
          this.acceptContract = true
          this.shabaNumberLoading = false
        })
        .catch((error) => {
          const messages = this.getErrorMessages(error.response.data)
          this.showErrorMessages(messages)
          this.shabaNumberLoading = false
        })
    },

    getBankLogoFromCode (code) {
      if (!code) {
        return 'https://nodes.alaatv.com/upload/bank-logo/exe.png'
      }

      return 'https://nodes.alaatv.com/upload/bank-logo/' + code + '.png'
    },
    getBankCodeFromCardNumber (cardnumber) {
      if (!cardnumber) {
        return null
      }
      if (!this.validateCard(cardnumber)) {
        return null
      }
      return this.getBankFromCard(cardnumber.substring(6, -16))
    },
    getBankCodeFromShabaNumber (shabanumber) {
      if (!shabanumber) {
        return null
      }

      const shaba = NormalizeNumber.a2e(shabanumber).toUpperCase()

      if (!new Sheba('IR' + shaba).validate()) {
        return null
      }

      const target = new Sheba('IR' + this.clearShabaNumber).recognize()

      return [
        target.nickname,
        target.persianName,
        target.code
      ]
    },
    getBankFromCard(code) {
      const map = [
      //     {
      //   nickname: 'central-bank',
      //   name: 'بانک مرکزی جمهوری اسلامی ایران',
      //   code: '636214',
      // },
        {
          nickname: 'ayandeh',
          name: 'Ayandeh Bank',
          persianName: 'بانک آینده',
          code: '636214'
        }, {
          nickname: 'eghtesad-novin',
          name: 'Eghtesad Novin Bank',
          persianName: 'بانک اقتصاد نوین',
          code: '627412'
        },
        // {
        //   nickname: 'iran-venezuela',
        //   name: 'Iran and Venezuela Bank',
        //   persianName: 'بانک ایران و ونزوئلا',
        //   code: '606373'
        // },

        {
          nickname: 'ansar',
          name: 'Ansar Bank',
          persianName: 'بانک انصار',
          code: '627381'
        }, {
          nickname: 'iran-zamin',
          name: 'Iran Zamin Bank',
          persianName: 'بانک ایران زمین',
          code: '505785'
        }, {
          nickname: 'parsian',
          name: 'Parsian Bank',
          persianName: 'بانک پارسیان',
          code: '622106'
        }, {
          nickname: 'parsian',
          name: 'بانک پارسیان',
          code: '627884'
        }, {
          nickname: 'pasargad',
          name: 'Pasargad Bank',
          persianName: 'بانک پاسارگاد',
          code: '502229'
        }, {
          nickname: 'pasargad',
          name: 'Pasargad Bank',
          persianName: 'بانک پاسارگاد',
          code: '639347'
        }, {
          nickname: 'post',
          name: 'Post Bank',
          persianName: 'پست بانک ایران',
          code: '627760'
        }, {
          nickname: 'tejarat',
          name: 'Tejarat Bank',
          persianName: 'بانک تجارت',
          code: '585983'
        }, {
          nickname: 'tejarat',
          name: 'Tejarat Bank',
          persianName: 'بانک تجارت',
          code: '627353'
        }, {
          nickname: 'toose-taavon',
          name: 'Tosee Taavon Bank',
          persianName: 'بانک توسعه تعاون',
          code: '502908'
        }, {
          nickname: 'tosee-saderat',
          name: 'Tose Saderat Bank',
          persianName: 'بانک توسعه صادرات',
          code: '207177'
        }, {
          nickname: 'tosee-saderat',
          name: 'Tose Saderat Bank',
          persianName: 'بانک توسعه صادرات',
          code: '627648'
        }, {
          nickname: 'hekmat-iranian',
          name: 'Hekmat Iranian Bank',
          persianName: 'بانک حکمت ایرانیان',
          code: '636949'
        }, {
          nickname: 'middle-east-bank',
          name: 'Middle East Bank',
          persianName: 'بانک خاورمیانه',
          code: '585949'
        },
        //   {
        //     nickname: 'noor-bank',
        //     name: 'Noor Credit Institution',
        //     persianName: 'موسسه اعتباری نور',
        //   code: '585949'
        // },

        {
          nickname: 'dey',
          name: 'Dey Bank',
          persianName: 'بانک دی',
          code: '502938'
        }, {
          nickname: 'resalat',
          name: 'Resalat Bank',
          persianName: 'بانک قرض الحسنه رسالت',
          code: '504172'
        }, {
          nickname: 'refah',
          name: 'Refah Bank',
          persianName: 'بانک رفاه کارگران',
          code: '589463'
        }, {
          nickname: 'saman',
          name: 'Saman Bank',
          persianName: 'بانک سامان',
          code: '621986'
        }, {
          nickname: 'sepah',
          name: 'Sepah Bank',
          persianName: 'بانک سپه',
          code: '589210'
        }, {
          nickname: 'sarmayeh',
          name: 'Sarmayeh Bank',
          persianName: 'بانک سرمایه',
          code: '639607'
        }, {
          nickname: 'sina',
          name: 'Sina Bank',
          persianName: 'بانک سینا',
          code: '639346'
        }, {
          nickname: 'shahr',
          name: 'City Bank',
          persianName: 'بانک شهر',
          code: '502806'
        }, {
          nickname: 'shahr',
          name: 'City Bank',
          persianName: 'بانک شهر',
          code: '504706'
        }, {
          nickname: 'saderat',
          name: 'Saderat Bank',
          persianName: 'بانک صادرات ایران',
          code: '603769'
        }, {
          nickname: 'saderat',
          name: 'Saderat Bank',
          persianName: 'بانک صادرات ایران',
          code: '903769'
        }, {
          nickname: 'sanat-o-madan',
          name: 'Sanat O Madan Bank',
          persianName: 'بانک صنعت و معدن',
          code: '627961'
        }, {
          nickname: 'mehr-eqtesad',
          name: 'Mehr Eqtesad Bank',
          persianName: 'بانک مهر اقتصاد',
          code: '639370'
        }, {
          nickname: 'ghavamin',
          name: 'Ghavamin Bank',
          persianName: 'بانک قوامین',
          code: '639599'
        }, {
          nickname: 'karafarin',
          name: 'Karafarin Bank',
          persianName: 'بانک کارآفرین',
          code: '627488'
        }, {
          nickname: 'keshavarzi',
          name: 'Keshavarzi',
          persianName: 'بانک کشاورزی',
          code: '603770'
        }, {
          nickname: 'keshavarzi',
          name: 'Keshavarzi',
          persianName: 'بانک کشاورزی',
          code: '639217'
        }, {
          nickname: 'gardeshgari',
          name: 'Gardeshgari Bank',
          persianName: 'بانک گردشگری',
          code: '505416'
        }, {
          nickname: 'gardeshgari',
          name: 'Gardeshgari Bank',
          persianName: 'بانک گردشگری',
          code: '505426'
        },
        {
          nickname: 'no-img',
          name: 'بانک مرکزی ایران',
          code: '636797'
        }, {
          nickname: 'maskan',
          name: 'Maskan Bank',
          persianName: 'بانک مسکن',
          code: '628023'
        }, {
          nickname: 'mellat',
          name: 'Mellat Bank',
          persianName: 'بانک ملت',
          code: '610433'
        }, {
          nickname: 'mellat',
          name: 'Mellat Bank',
          persianName: 'بانک ملت',
          code: '991975'
        }, {
          nickname: 'melli',
          name: 'Melli',
          persianName: 'بانک ملی ایران',
          code: '170019'
        }, {
          nickname: 'melli',
          name: 'Melli',
          persianName: 'بانک ملی ایران',
          code: '603799'
        }, {
          nickname: 'mehr-iran',
          name: 'Mehr Iran Bank',
          persianName: 'بانک مهر ایران',
          code: '606373'
        }, {
          nickname: 'kosar',
          name: 'Kosar Credit Institute',
          persianName: 'موسسه اعتباری کوثر',
          code: '505801'
        }, {
          nickname: 'melal',
          name: 'Melal Credit Institute',
          persianName: 'موسسه اعتباری ملل',
          code: '606256'
        }, {
          nickname: 'tosee',
          name: 'Tosee Bank',
          persianName: 'موسسه اعتباری توسعه',
          code: '628157'
        }]

      const target = map.find(item => item.code === code)
      if (!target) {
        return null
      }

      return [
        target.nickname,
        target.persianName,
        target.code
      ]
    },
    validateCard(cardNumber) {
      return verifyCardNumber(cardNumber)
    }
  }
}
</script>

<style scoped lang="scss">
.user-info {
  a {
    text-decoration: none;
    color: inherit;
  }
  .page-title,
  .profile-title {
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 31px;
    letter-spacing: -0.03em;
    color: #8798B1;
    @media  screen and (max-width: 1904px) {
      font-size: 18px;
      line-height: 28px;
    }
    @media  screen and (max-width: 599px) {
      font-size: 16px;
      line-height: 25px;
    }
  }
  .page-title{
    margin-bottom: 30px;
    @media  screen and (max-width: 1904px) {
      margin-bottom: 20px;

    }
    @media  screen and (max-width: 599px) {
      margin-bottom: 8px;
    }
  }
  .profile-title{
    margin-bottom: 16px;
  }
  .profile-section {
    .profile-title {
    }
    .profile-box {
      background: #FFFFFF;
      box-shadow: 3px 3px 6px rgba(52, 54, 55, 0.04);
      border-radius: 16px;
      padding: 24px 15px 30px 15px;
      @media  screen and (max-width: 599px) {
        padding: 20px 15px 30px 15px;
      }
      @media  screen and (max-width: 599px) {
        padding: 16px 20px 20px 20px;
      }
      .profile-txt-inputs {
        width: 100%;
        .input-item {
          margin: 0 15px;
          @media screen and (max-width: 1904px){
            margin: 0 12px;
          }
          .title {
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 25px;
            color: #8798B1;
          }
          .input {
            margin-top: 8px;
          }
          @media screen and (max-width: 1904px){
            margin-bottom: 16px;
          }
          @media screen and (max-width: 599px){
            margin: 0 0 12px 0;
          }
        }
      }
      .profile-nationl-code-section {
        margin-top: 40px;
        padding: 0 15px;
        @media  screen and (max-width: 1904px) {
          padding: 0;
          margin-top: 8px;
        }
        @media  screen and (max-width: 599px) {
          padding: 0;
          margin-top: 8px;
        }
        .description {

          .title {
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 25px;
            color: #8798B1;
            margin-bottom: 35px;
          }
          .text,
          .note {
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 25px;
            color: #697D9A;
            margin-bottom: 35px;

          }
          .text{
            @media  screen and (max-width: 1904px) {
              padding:  0;
              margin-top: 16px;
            }
            @media  screen and (max-width: 599px) {
              padding: 0;
              margin-top: 12px;
            }
          }

          .note {
            display: flex;
            flex-flow: row;
            justify-content: flex-start;
            align-items: center;
            svg{
              margin-left: 2px;
            }

            @media  screen and (max-width: 1904px) {
              padding:  0;
              margin-top: 8px;
              margin-bottom: 20px;
            }
            @media  screen and (max-width: 599px) {

              margin-bottom: 22px;
            }
            svg {
              margin-left: 2px;
            }
          }
        }
        .file-input-box {
          position: relative;
          background: #FFFFFF;
          border: 2px dashed rgb(255 144 0 / 40%);
          border-radius: 10px;
          &.dragover {
            border-width: 5px;
          }

          .file-input {
            display: none;
          }
          .file-input-content {
            display: flex;
            height: inherit;
            flex-flow: row;
            align-items: center;
            justify-content: center;
            @media screen and (max-width: 1904px) {
              flex-flow: column;
            }
            .sample-pic {
              height: 48px;
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0;
              @media screen and (min-width: 600px) {
                margin-bottom: 18px;
              }
              svg{
                width: 48px;
                height: 48px;
                @media screen and (max-width: 1904px) {
                  width: 30px;
                  height: 30px;
                }
              }
            }
            .hint {
              display: flex;
              flex-flow: row;
              align-items: center;
              justify-content: center;
              margin-bottom: 44px;
              @media screen and (max-width: 1904px) {
                margin: 0;
              }
              .section-1 {
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 25px;
                color: #8798B1;
                @media screen and (max-width: 1023px) {
                  display: none;
                }
              }
              .section-2 {
                font-style: normal;
                font-weight: 700;
                font-size: 16px;
                line-height: 25px;
                text-align: center;
                color: #697D9A;
                margin: 0 16px;
                @media screen and (max-width: 1023px) {
                  display: none;
                }
              }
              .section-3 {
                font-style: normal;
                font-weight: 700;
                font-size: 16px;
                line-height: 25px;
                color: #FF9000;
                label {
                  cursor: pointer;
                  margin-bottom: 0;
                  @media screen and (max-width: 1904px){
                    margin-right: 12px;
                  }
                }
              }
            }
            .selected-pic {
              margin-top: 50px;
              margin-bottom: 44px;
              max-width: 100%;
              .remove-btn {
                z-index: 100;
                bottom: 40px;
                right: 20px;
              }
              .q-img {
                position: inherit;
                &:deep(.q-img__image) {
                  object-fit: contain !important;
                }
              }
              .btn-upload {
                display: flex;
                flex-flow: row;
                align-items: center;
                justify-content: center;
                margin: 20px auto;
              }
            }
          }
        }
      }
    }
    .financial-info-section {
      margin-top: 30px;
      @media screen and (max-width: 1904px) {
        margin-top: 40px;

      }
      @media screen and (max-width: 599px) {
        margin-top: 20px;

      }
      .title {
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 31px;
        letter-spacing: -0.03em;
        color: #8798B1;
        margin-bottom: 16px;
        @media screen and (max-width: 599px) {
          margin-bottom: 0;
        }
      }
      .description {
        margin-top: 71px;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 25px;
        text-align: right;
        color: #697D9A;
        padding-left: 30px;
        @media screen and (max-width: 1904px) {
          margin-top:0;
          margin-bottom: 20px;
          padding-left: 0;
        }
        @media screen and (max-width: 599px) {
          font-size: 14px;
          line-height: 22px;
        }
        div{
          margin-bottom: 8px;
        }
      }
      .shaba-number-col {
        .shaba-number-box {
          background: #FFFFFF;
          box-shadow: 3px 3px 6px rgba(52, 54, 55, 0.04);
          border-radius: 16px;
          padding: 24px 30px 30px 30px;
          @media screen and (max-width: 1904px) {
            padding: 20px 30px 30px 30px;
          }
          @media screen and (max-width: 599px){
            padding: 19px;
          }
          .title {
            margin-bottom: 8px;
            display: flex;
            justify-content: space-between;
            .text {
              font-style: normal;
              font-weight: 400;
              font-size: 16px;
              line-height: 25px;
              color: #8798B1;
            }
            .target-bank-logo {
              width: 80px;
            }
          }
          .shaba-number-input {
            position: relative;
            .shaba-number-checked {
              align-self: center;
            }
            .prefix-text {
              align-self: center;
              font-size: 20px;
            }
          }
          .shaba-number-hint {
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 19px;
            color: #8798B1;
            margin-top: 8px;
            @media screen and (max-width: 599px) {
              display: grid;
              grid-template-columns: 1fr;
              .example{
                justify-self: flex-end;
                margin-bottom: 10px;
              }
            }
          }
          .shaba-number-action-btn-row {
            display: flex;
            flex-flow: row;
            justify-content: flex-end;
            margin-top: 16px;
            .shaba-number-action-btn {
              box-shadow: 3px 3px 6px rgba(52, 54, 55, 0.04);
              border-radius: 8px;
              font-weight: 400;
              font-size: 16px;
              line-height: 25px;
              text-align: center;
              letter-spacing: -0.03em;
              width: 114px;
              height: 48px;
              cursor: pointer;
              @media screen and (max-width: 599px) {
                padding: 5px 42px;
                height: 36px;
              }
            }
          }
          .card-number-input {
            position: relative;
            margin-top: 16px;
            .label {
              font-style: normal;
              font-weight: 400;
              font-size: 16px;
              line-height: 40px;
              color: #8798B1;
            }
          }
        }
      }
    }
    .contract-section {
      margin-top: 30px;
      @media screen and (min-width: 600px) {
        margin-top: 40px;
        margin-bottom: 16px;
      }
      @media screen and (max-width: 599px) {
        margin-top: 20px;
      }
      .title {
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 31px;
        letter-spacing: -0.03em;
        color: #8798B1;
      }
      .contract-box {
        position: relative;
        margin-top: 16px;
        background: #FFFFFF;
        box-shadow: 3px 3px 6px rgba(52, 54, 55, 0.04);
        border-radius: 16px;
        padding: 24px 30px 30px 30px;
        @media screen and (max-width: 599px) {
          padding: 20px 30px;
        }
        @media screen and (max-width: 599px) {
          padding: 20px;
        }
        .description {
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 25px;
          letter-spacing: -0.03em;
          color: #697D9A;
          margin-bottom: 30px;
          @media screen and (min-width: 600px) {
            margin-bottom: 40px;
          }
          @media screen and (max-width: 599px) {
            margin-bottom: 24px;
          }
        }
        .image-col,
        .pdf-col {
          .title {
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 25px;
            letter-spacing: -0.03em;
            color: #8798B1;
            margin-bottom: 16px;
          }
        }
        .pdf-col {
          padding-left: 15px;
          @media screen and (max-width: 1904px){
            padding-left: 0;
            margin-bottom: 30px;

          }
          @media screen and (max-width: 599px){
            margin-bottom: 20px;

          }
          .title {
          }
          .content {
            .pdf-donwnload-box {
              height: 80px;
              padding: 18px 30px;
              background: #EFF4FB;
              border-radius: 16px;
              display: flex;
              flex-flow: row;
              justify-content: space-between;
              align-items: center;
              position: relative;
              @media screen and (max-width: 1904px){
                padding: 18px 20px;
              }
              @media screen and (max-width: 599px){
                padding: 13px 20px;
              }
              .download-icon {
                cursor: pointer;
                margin-right: 20px;
              }
              .file-title-icon {
                display: flex;
                flex-flow: row;
                justify-content: flex-start;
                align-items: center;

                .pdf-icon {
                  cursor: pointer;
                  width: 78px;
                  height: 43px;
                  @media screen and (max-width: 599px) {
                    width: 41px;
                    height: 23px;
                    position: absolute;
                    top: -19px;
                    right: 20px;
                    .bs{
                      height: 3px;
                      background: #eff4fb;
                      bottom: 3px;
                      position: relative;
                    }
                  }
                }
                .file-title {
                  cursor: pointer;
                  margin-right: 30px;
                  font-style: normal;
                  font-weight: 400;
                  font-size: 16px;
                  line-height: 25px;
                  letter-spacing: -0.03em;
                  color: #697D9A;
                  @media screen and (max-width: 599px) {
                    font-size: 14px;
                    line-height: 22px;
                    margin-right: 0;
                  }
                }
              }
            }
          }
        }
        .image-col {
          padding-right: 15px;
          @media screen and (max-width: 1904px) {
            padding-right: 0;
          }
          .title {
          }
          .content {
            display: flex;
            flex-flow: row;
            flex-wrap: wrap;
            min-height: 200px;
            .content-pic-item {
              width: 30%;
              padding-left: 30px;
              padding-bottom: 30px;
              cursor: pointer;
            }
          }
        }
        .send-accept-contract {
          text-align: left;
          .send-accept-contract-btn {
            width: 114px;
            height: 48px;
            background: #FF9000;
            box-shadow: 3px 3px 6px rgba(52, 54, 55, 0.04);
            border-radius: 8px;
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 25px;
            text-align: center;
            letter-spacing: -0.03em;
            color: #FFFFFF;
          }
        }
        .chk-accept-contract {
          position: absolute;
          bottom: 100px;
          display: flex;
          align-items: center;
          .chk-text{
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 25px;
            letter-spacing: -0.03em;
            color: #697D9A;
            margin-top: 16px;
          }
          @media screen and (max-width: 599px) {
            bottom: 82px;
          }
        }
      }
    }
  }
}
</style>

<style lang="scss">
.shaba-number-input {
  .shaba-number-checked {
    .v-badge__wrapper {
      z-index: 10;
      .v-badge__badge.success {
        inset: auto calc(100% - 17px) calc(100% - 17px) auto !important;
      }
    }
  }
}
</style>
