<template>
  <div class="item product-item-c a--gtm-eec-product lazy-done q-mb-md"
       :data-position="data.eec.position"
       :data-gtm-eec-product-id="data.eec.id"
       :data-gtm-eec-product-name="data.eec.name"
       :data-gtm-eec-product-price="data.eec.price"
       :data-gtm-eec-product-brand="data.eec.brand"
       :data-gtm-eec-product-category="data.eec.category"
       :data-gtm-eec-product-variant="data.eec.variant"
       :data-gtm-eec-product-position="data.eec.position"
       :data-gtm-eec-product-list="data.eec.position"
       :data-loaded="data.eec.loading">
    <div v-if="false"
         class="ribbon">
      <span>
        <div class="glow">&nbsp;</div>
        % {{ offAmount }}
        <span>تخفیف</span>
      </span>
    </div>
    <div class="pic">
      <router-link :to="{name: 'Public.Product.Show', params:{id: data.id}}"
                   class="d-block a--gtm-eec-product-click"
                   :data-position="data.eec.position"
                   :data-gtm-eec-product-id="data.eec.id"
                   :data-gtm-eec-product-name="data.eec.name"
                   :data-gtm-eec-product-price="data.eec.price"
                   :data-gtm-eec-product-brand="data.eec.brand"
                   :data-gtm-eec-product-category="data.eec.category"
                   :data-gtm-eec-product-variant="data.eec.variant"
                   :data-gtm-eec-product-position="data.eec.position"
                   :data-gtm-eec-product-list="data.eec.position">
        <lazy-img :src="data.photo"
                  :alt="data.title"
                  width="200"
                  height="200"
                  class="img" />
      </router-link>
    </div>
    <div class="content  q-pl-md-md q-sm-sm-none">
      <div class="product-title q-pl-md q-py-sm">
        <router-link :to="{name: 'Public.Product.Show', params:{ id: data.id}}"
                     class="m-link a--owl-carousel-type-2-item-subtitle a--gtm-eec-product-click"
                     :data-gtm-eec-product-id="data.eec.id"
                     :data-gtm-eec-product-name="data.eec.name"
                     :data-gtm-eec-product-price="data.eec.price"
                     :data-gtm-eec-product-brand="data.eec.brand"
                     :data-gtm-eec-product-category="data.eec.category"
                     :data-gtm-eec-product-variant="data.eec.variant"
                     :data-gtm-eec-product-position="data.eec.position"
                     :data-gtm-eec-product-list="data.eec.position">
          {{ data.title }}
        </router-link>
      </div>
      <router-link :to="{name: 'Public.Product.Show', params:{ id: data.id}}"
                   class="m-link a--owl-carousel-type-2-item-subtitle a--gtm-eec-product-click"
                   :data-gtm-eec-product-id="data.eec.id"
                   :data-gtm-eec-product-name="data.eec.name"
                   :data-gtm-eec-product-price="data.eec.price"
                   :data-gtm-eec-product-brand="data.eec.brand"
                   :data-gtm-eec-product-category="data.eec.category"
                   :data-gtm-eec-product-variant="data.eec.variant"
                   :data-gtm-eec-product-position="data.eec.position"
                   :data-gtm-eec-product-list="data.eec.position">
        <div class="detailes">
          <div class="productPriceWrapper2">
            <div class="price-container row">
              <div v-if="offAmount > 0"
                   class="base">
                {{ data.price.base }}
              </div>
              <div v-if="offAmount > 0"
                   class="discount">
                % {{ offAmount }}
              </div>
              {{ data.price.final }} تومان
            </div>
          </div>
          <div class="m--margin-top-10">
            <div class="productAttributes q-mb-md">
              <div class="productAttributes-item">
                <div class="productAttributes-item-icon">
                  <svg version="1.1"
                       xmlns="http://www.w3.org/2000/svg"
                       xmlns:xlink="http://www.w3.org/1999/xlink"
                       x="0px"
                       y="0px"
                       viewBox="0 0 512 512"
                       style="enable-background:new 0 0 512 512;"
                       xml:space="preserve">        <polygon style="fill:#FF9000"
                                                             points="145.454,209.709 249.289,483.58 261.634,483.58 365.468,209.709 "
                                                             data-original="#70BBEF"
                                                             class="active-path"
                                                             data-old_color="#70BBEF" />
                    <path style="fill:#FF9E20"
                          d="M232.914,474.449c4.335,4.886,10.17,7.927,16.375,9.132L145.454,209.71L0.322,163.994  C0.983,168.9-14.703,145.691,232.914,474.449z"
                          data-original="#9CD7F2"
                          data-old_color="#9CD7F2" />
                    <path style="fill:#FF9409"
                          d="M51.695,180.177L0.322,163.995c0.661,4.905-15.024-18.304,232.592,310.453  c3.21,3.618,7.245,6.219,11.642,7.817L51.695,180.177z"
                          data-original="#71C5DB"
                          class=""
                          data-old_color="#71C5DB" />
                    <path style="fill:#FF9E20"
                          d="M86.074,51.099l59.38,158.611L255.461,84.212L88.081,50.102   C87.354,50.418,86.681,50.753,86.074,51.099z"
                          data-original="#9CD7F2"
                          class=""
                          data-old_color="#9CD7F2" />
                    <path style="fill:#FF9E20"
                          d="M365.468,209.71L261.634,483.58c6.205-1.205,12.039-4.246,16.375-9.132   c64.394-85.292,233.353-308.79,233.863-310.854L365.468,209.71z"
                          data-original="#9CD7F2"
                          class=""
                          data-old_color="#9CD7F2" />
                    <path style="fill:#FF9E20"
                          d="M365.468,209.71l59.361-158.56c-0.7-0.398-1.396-0.735-2.074-1.03L255.461,84.212L365.468,209.71z"
                          data-original="#9CD7F2"
                          class=""
                          data-old_color="#9CD7F2" />
                    <polygon style="fill:#E98400"
                             points="145.454,209.709 365.468,209.709 255.461,84.212 "
                             data-original="#57ADDD"
                             class=""
                             data-old_color="#57ADDD" />
                    <path style="fill:#FF9000"
                          d="M86.074,51.099c-3.916,2.227-4.52,3.544-10.676,11.438C-4.743,165.306-0.551,157.536,0.322,163.994  l145.132,45.715L86.074,51.099z"
                          data-original="#70BBEF"
                          class="active-path"
                          data-old_color="#70BBEF" />
                    <path style="fill:#E98400"
                          d="M51.695,180.177L87.063,53.74l-0.989-2.642c-3.915,2.227-4.52,3.544-10.676,11.438  c-80.142,102.77-75.949,95-75.077,101.458L51.695,180.177L51.695,180.177z"
                          data-original="#57ADDD"
                          class=""
                          data-old_color="#57ADDD" />
                    <path style="fill:#FF9000"
                          d="M365.468,209.71l146.403-46.115c0.413-2.149-0.209-3.422-1.25-4.756  C438.018,65.634,427.949,51.909,424.829,51.15L365.468,209.71z"
                          data-original="#70BBEF"
                          class="active-path"
                          data-old_color="#70BBEF" />
                    <path style="fill:#E98400"
                          d="M255.461,84.212L422.756,50.12c-3.521-1.527-6.327-1.748-6.433-1.767l0,0l-134.829-18.16  c-42.419-5.714-60.701,2.923-187.247,18.208c-0.195,0.042-2.915,0.287-6.166,1.702L255.461,84.212z"
                          data-original="#57ADDD"
                          class=""
                          data-old_color="#57ADDD" />      </svg>
                </div>
                <div class="productAttributes-item-value">
                  <span v-for="(service , index) in data.attributes.info.services"
                        :key="index"
                        class="info-text">
                    {{ service }}
                  </span>
                </div>
              </div>
              <div class="productAttributes-item">
                <div class="productAttributes-item-icon">
                  <svg viewBox="0 0 64 64"
                       xmlns="http://www.w3.org/2000/svg"
                       class="">
                    <g>
                      <g id="Direction">
                        <g fill="#c49a6c">
                          <path d="m27 21h10v6h-10z"
                                data-original="#C49A6C"
                                class="" />
                          <path d="m27 3h10v6h-10z"
                                data-original="#C49A6C"
                                class="" />
                          <path d="m27 39h10v22h-10z"
                                data-original="#C49A6C"
                                class="" />
                        </g>
                        <path d="m27 39h10v2h-10z"
                              fill="#a97c50"
                              data-original="#A97C50" />
                        <path d="m27 21h10v2h-10z"
                              fill="#a97c50"
                              data-original="#A97C50" />
                        <path d="m37 9h-10-14l-10 6 10 6h14 10 14v-6-6z"
                              fill="#ffda44"
                              data-original="#FFDA44"
                              class="active-path"
                              style="fill:#FFDA44" />
                        <path d="m3 15 10 6h14 10 14v-6z"
                              fill="#ffcd00"
                              data-original="#FFCD00" />
                        <path d="m53 27h-16-10-14v6 6h14 10 16l8-6z"
                              fill="#ff3051"
                              data-original="#FF3051"
                              class=""
                              data-old_color="#ff3051"
                              style="fill:#000" />
                        <path d="m13 39h14 10 16l8-6h-48z"
                              fill="#e52b49"
                              data-original="#E52B49"
                              class=""
                              data-old_color="#e52b49"
                              style="fill:#000" />
                        <path d="m61.6 32.2-8-6a1 1 0 0 0 -.6-.2h-15v-4h13a1 1 0 0 0 1-1v-12a1 1 0 0 0 -1-1h-13v-5a1 1 0 0 0 -1-1h-10a1 1 0 0 0 -1 1v5h-13a1 1 0 0 0 -.515.143l-10 6a1 1 0 0 0 0 1.714l10 6a1 1 0 0 0 .515.143h13v4h-13a1 1 0 0 0 -1 1v12a1 1 0 0 0 1 1h13v21a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-21h15a1 1 0 0 0 .6-.2l8-6a1 1 0 0 0 0-1.6zm-33.6-28.2h8v4h-8zm-23.056 11 8.333-5h36.723v10h-36.723zm23.056 7h8v4h-8zm8 38h-8v-20h8zm16.667-22h-38.667v-10h38.667l6.666 5z"
                              data-original="#000000"
                              class="" />
                      </g>
                    </g>
                  </svg>
                </div>
                <div class="productAttributes-item-value">
                  <span v-for="(system , index) in data.attributes.info.educational_system"
                        :key="index"
                        class="info-text">
                    {{ system }}
                  </span>
                </div>
              </div>
              <div class="productAttributes-item">
                <div class="productAttributes-item-icon">
                  <svg viewBox="0 0 423 423"
                       xmlns="http://www.w3.org/2000/svg">
                    <path fill="#FFC107"
                          d="m368.809,81.922v327.68h-268.098c-25.367,0 -45.93,-20.566 -45.93,-45.93v-309.059" />
                    <path fill="#000"
                          d="m368.809,423.254h-268.102c-32.855,0 -59.582,-26.727 -59.582,-59.582v-309.059c0,-7.539 6.113,-13.652 13.656,-13.652 7.539,0 13.652,6.113 13.652,13.652v309.059c0,17.797 14.48,32.273 32.273,32.273h254.445v-314.023c0,-7.543 6.113,-13.656 13.656,-13.656 7.539,0 13.652,6.113 13.652,13.656v327.68c0,7.539 -6.113,13.652 -13.652,13.652zM368.809,423.254" />
                    <path fill="#000"
                          d="m286.887,81.922v150.184l-40.961,-27.305 -40.961,27.305v-150.184" />
                    <path fill="#000"
                          d="m286.887,245.762c-2.648,0 -5.289,-0.77 -7.574,-2.297l-33.387,-22.258 -33.387,22.258c-4.199,2.789 -9.59,3.047 -14.012,0.68 -4.441,-2.379 -7.215,-7.004 -7.215,-12.039v-150.184c0,-7.543 6.113,-13.656 13.652,-13.656 7.543,0 13.656,6.113 13.656,13.656v124.672l19.73,-13.152c4.59,-3.055 10.563,-3.055 15.148,0l19.734,13.152v-124.672c0,-7.543 6.113,-13.656 13.652,-13.656 7.539,0 13.652,6.113 13.652,13.656v150.184c0,5.035 -2.773,9.66 -7.215,12.043 -2.012,1.078 -4.23,1.613 -6.438,1.613zM286.887,245.762" />
                    <path fill="#fff"
                          d="m334.672,47.785c0,-18.852 15.281,-34.133 34.137,-34.133h-279.895c-18.852,0 -34.133,15.281 -34.133,34.133 0,18.852 15.281,34.137 34.133,34.137h279.895c-18.855,0 -34.137,-15.285 -34.137,-34.137zM334.672,47.785" />
                    <path fill="#000"
                          d="m368.809,95.574h-279.895c-26.348,0 -47.789,-21.441 -47.789,-47.789s21.441,-47.785 47.789,-47.785h279.895c7.539,0 13.652,6.113 13.652,13.652 0,7.543 -6.113,13.656 -13.652,13.656 -11.297,0 -20.48,9.184 -20.48,20.477 0,11.293 9.184,20.48 20.48,20.48 7.539,0 13.652,6.113 13.652,13.656 0,7.539 -6.113,13.652 -13.652,13.652zM88.914,27.309c-11.293,0 -20.48,9.184 -20.48,20.477 0,11.293 9.188,20.48 20.48,20.48h236.719c-2.953,-6.215 -4.613,-13.152 -4.613,-20.48 0,-7.324 1.66,-14.266 4.613,-20.477zM88.914,27.309" />
                  </svg>
                </div>
                <div class="productAttributes-item-value">
                  <span v-for="(major , index) in data.attributes.info.major"
                        :key="index"
                        class="info-text">
                    {{ major }}
                  </span>
                </div>
              </div>
              <div class="productAttributes-item">
                <div class="productAttributes-item-icon">
                  <svg viewBox="0 0 64 64"
                       xmlns="http://www.w3.org/2000/svg">
                    <path fill="#E6000000"
                          d="m57,9h-50a4,4 0,0 0,-4 4v10h58v-10a4,4 0,0 0,-4 -4z" />
                    <path fill="#FFC107"
                          d="m3,23v34a4,4 0,0 0,4 4h50a4,4 0,0 0,4 -4v-34z" />
                    <path fill="#000"
                          d="m61,13a4,4 0,0 0,-4 -4h-2v14h6z" />
                    <path fill="#FFA500"
                          d="m55,23v30a4,4 0,0 1,-4 4h-48a4,4 0,0 0,4 4h50a4,4 0,0 0,4 -4v-34z" />
                    <path fill="#FFAB00"
                          d="m14,15a3,3 0,0 0,3 -3v-6a3,3 0,0 0,-6 0v6a3,3 0,0 0,3 3z" />
                    <path fill="#FFAB00"
                          d="m50,15a3,3 0,0 0,3 -3v-6a3,3 0,0 0,-6 0v6a3,3 0,0 0,3 3z" />
                    <path fill="#231f20"
                          d="m57,8h-3v-2a4,4 0,0 0,-8 0v2h-28v-2a4,4 0,0 0,-8 0v2h-3a5.006,5.006 0,0 0,-5 5v44a5.006,5.006 0,0 0,5 5h50a5.006,5.006 0,0 0,5 -5v-44a5.006,5.006 0,0 0,-5 -5zM48,6a2,2 0,0 1,4 0v6a2,2 0,0 1,-4 0zM12,6a2,2 0,0 1,4 0v6a2,2 0,0 1,-4 0zM4,13a3,3 0,0 1,3 -3h3v2a4,4 0,0 0,8 0v-2h28v2a4,4 0,0 0,8 0v-2h3a3,3 0,0 1,3 3v9h-56zM60,57a3,3 0,0 1,-3 3h-50a3,3 0,0 1,-3 -3v-33h56z" />
                    <path fill="#231f20"
                          d="m37,53a0.986,0.986 0,0 1,-0.4 -0.084,1 1,0 0,1 -0.516,-1.317l6.916,-15.808v-0.791h-9a1,1 0,0 1,0 -2h10a1,1 0,0 1,1 1v2a0.991,0.991 0,0 1,-0.084 0.4l-7,16a1,1 0,0 1,-0.916 0.6z" />
                    <path fill="#231f20"
                          d="m30,53h-10a1,1 0,0 1,-1 -1v-3.3a4.022,4.022 0,0 1,1.941 -3.43l6.6,-3.961a3.017,3.017 0,0 0,1.459 -2.574v-0.735a3,3 0,0 0,-3 -3h-2a3,3 0,0 0,-3 3v2a1,1 0,0 1,-2 0v-2a5.006,5.006 0,0 1,5 -5h2a5.006,5.006 0,0 1,5 5v0.735a5.023,5.023 0,0 1,-2.428 4.287l-6.6,3.961a2.012,2.012 0,0 0,-0.972 1.717v2.3h9a1,1 0,0 1,0 2z" />
                  </svg>
                </div>
                <div class="productAttributes-item-value">
                  <span v-for="(year , index) in data.attributes.info.production_year"
                        :key="index"
                        class="info-text">
                    {{ year }}
                  </span>
                </div>
              </div>
              <div class="productAttributes-item">
                <div class="productAttributes-item-icon">
                  <svg viewBox="0 0 64 64"
                       xmlns="http://www.w3.org/2000/svg">
                    <path fill="#FFFFFF"
                          d="m9,15h46v6h-46z" />
                    <path fill="#FFC107"
                          d="M7,21L57,21A4,4 0,0 1,61 25L61,57A4,4 0,0 1,57 61L7,61A4,4 0,0 1,3 57L3,25A4,4 0,0 1,7 21z" />
                    <path fill="#FFAB00"
                          d="m57,21h-2v30a4,4 0,0 1,-4 4h-48v2a4,4 0,0 0,4 4h50a4,4 0,0 0,4 -4v-32a4,4 0,0 0,-4 -4z" />
                    <path fill="#FFAB00"
                          d="m57,11h-25v-2a4,4 0,0 0,-4 -4h-12a4,4 0,0 0,-4 4v2h-5a4,4 0,0 0,-4 4v10a4,4 0,0 1,4 -4h2v-6h46v6h2a4,4 0,0 1,4 4v-10a4,4 0,0 0,-4 -4z" />
                    <path fill="#000"
                          d="m39,21v6h-6l11.94,14 12.06,-14h-6v-6,-6 -4,-8h-12v8,4z" />
                    <path fill="#FFFFFF"
                          d="m9,43h24v12h-24z" />
                    <path fill="#231f20"
                          d="m57,10h-5v-7a1,1 0,0 0,-1 -1h-12a1,1 0,0 0,-1 1v7h-5v-1a5.006,5.006 0,0 0,-5 -5h-12a5.006,5.006 0,0 0,-5 5v1h-4a5.006,5.006 0,0 0,-5 5v42a5.006,5.006 0,0 0,5 5h50a5.006,5.006 0,0 0,5 -5v-42a5.006,5.006 0,0 0,-5 -5zM57,12a3,3 0,0 1,3 3v6.026a4.948,4.948 0,0 0,-3 -1.026h-1v-5a1,1 0,0 0,-1 -1h-3v-2zM52,20v-4h2v4zM40,4h10v23a1,1 0,0 0,1 1h3.819l-9.875,11.463 -9.777,-11.463h3.833a1,1 0,0 0,1 -1zM38,20h-28v-4h28zM7,12h5a1,1 0,0 0,1 -1v-2a3,3 0,0 1,3 -3h12a3,3 0,0 1,3 3v2a1,1 0,0 0,1 1h6v2h-29a1,1 0,0 0,-1 1v5h-1a4.948,4.948 0,0 0,-3 1.026v-6.026a3,3 0,0 1,3 -3zM60,57a3,3 0,0 1,-3 3h-50a3,3 0,0 1,-3 -3v-32a3,3 0,0 1,3 -3h31v4h-5a1,1 0,0 0,-0.761 1.649l11.94,14a1.048,1.048 0,0 0,0.761 0.351,1 1,0 0,0 0.758,-0.347l12.06,-14a1,1 0,0 0,-0.758 -1.653h-5v-4h5a3,3 0,0 1,3 3z" />
                    <path fill="#231f20"
                          d="m33,56h-24a1,1 0,0 1,-1 -1v-12a1,1 0,0 1,1 -1h24a1,1 0,0 1,1 1v12a1,1 0,0 1,-1 1zM10,54h22v-10h-22z" />
                    <path fill="#231f20"
                          d="m14,48h-1a1,1 0,0 1,0 -2h1a1,1 0,0 1,0 2z" />
                    <path fill="#231f20"
                          d="m29,48h-11a1,1 0,0 1,0 -2h11a1,1 0,0 1,0 2z" />
                    <path fill="#231f20"
                          d="m14,52h-1a1,1 0,0 1,0 -2h1a1,1 0,0 1,0 2z" />
                    <path fill="#231f20"
                          d="m29,52h-11a1,1 0,0 1,0 -2h11a1,1 0,0 1,0 2z" />
                  </svg>
                </div>
                <div class="productAttributes-item-value">
                  <span v-for="(method , index) in data.attributes.info.shipping_method"
                        :key="index"
                        class="info-text">
                    {{ method }}
                  </span>
                </div>
              </div>
              <div class="productAttributes-item q-mb-md">
                <div class="productAttributes-item-icon">
                  <svg viewBox="0 0 510 510"
                       xmlns="http://www.w3.org/2000/svg">
                    <path fill="#fff5f5"
                          d="m27.62,50.38h454.76v364.85h-454.76z" />
                    <path fill="#ebe1dc"
                          d="m255,50.38h227.38v364.85h-227.38z" />
                    <path fill="#000"
                          d="m510,10.2v55.32c0,5.52 -4.48,10 -10,10h-490c-5.52,0 -10,-4.48 -10,-10v-55.32c0,-5.52 4.48,-10 10,-10h490c5.52,0 10,4.48 10,10z" />
                    <path fill="#000"
                          d="m510,10.2v55.32c0,5.52 -4.48,10 -10,10h-245v-75.32h245c5.52,0 10,4.48 10,10z" />
                    <path fill="#000"
                          d="m99.206,264.8c-3.864,-7.327 -12.938,-10.135 -20.265,-6.271 -7.328,3.864 -10.135,12.938 -6.271,20.265l75.644,143.438 26.536,-13.994z" />
                    <path fill="#FFC107"
                          d="m495,369.61v130.19c0,5.523 -4.477,10 -10,10h-195.02c-2.761,0 -5,-2.239 -5,-5v-84.58c0,16.005 -12.971,29.06 -29.06,29.06h-85.52c-18.172,0 -32.96,-14.716 -32.96,-32.96 0,-18.2 14.75,-32.96 32.96,-32.96h46.53c2.761,0 5,-2.239 5,-5v-8.75c0,-30.321 24.58,-54.9 54.9,-54.9h163.27c30.32,0 54.9,24.579 54.9,54.9z" />
                    <path fill="#ff9000"
                          d="m495,369.61v130.19c0,5.52 -4.48,10 -10,10h-131.69v-195.09h86.79c30.32,0 54.9,24.58 54.9,54.9z" />
                    <path fill="#ffbfab"
                          d="m418.418,181.718v38.047c0,35.957 -29.159,65.115 -65.115,65.115s-65.101,-29.159 -65.101,-65.115v-38.047c0,-35.957 29.145,-65.115 65.101,-65.115 35.913,-0.001 65.115,29.13 65.115,65.115z" />
                    <path fill="#ffa78f"
                          d="m418.418,181.718v38.047c0,35.957 -29.159,65.115 -65.115,65.115v-168.278c35.913,0 65.115,29.131 65.115,65.116z" />
                    <path fill="#000"
                          d="m217.404,158.291h-145.188c-8.284,0 -15,-6.716 -15,-15s6.716,-15 15,-15h145.188c8.284,0 15,6.716 15,15s-6.716,15 -15,15z" />
                    <path fill="#000"
                          d="m217.404,224.276h-145.188c-8.284,0 -15,-6.716 -15,-15s6.716,-15 15,-15h145.188c8.284,0 15,6.716 15,15s-6.716,15 -15,15z" />
                    <path fill="#FFC107"
                          d="m436.647,509.797h-30v-96.305c0,-8.284 6.716,-15 15,-15 8.284,0 15,6.716 15,15z" />
                  </svg>
                </div>
                <span v-for="(teacher , index) in data.attributes.info.teacher"
                      :key="index"
                      class="info-text">
                  {{ teacher }}
                </span>
              </div>
            </div>
          </div>
          <!--          <div class="price-box row items-center">-->
          <!--            <div-->
          <!--              class="main-price">{{ (data.price['base']) }}</div>-->
          <!--            <div class="final-price-box">-->
          <!--              <div class="final-price ">-->
          <!--                {{ (data.price['final']) }}-->
          <!--              </div>-->
          <!--              <div class="price-Toman">-->
          <!--                تومان-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </div>-->
        </div>
      </router-link>
    </div>
    <!--    <router-link-->
    <!--      :to="{name: 'Public.Product.Show', params:{ id: data.id}}"-->
    <!--      class="m-link a&#45;&#45;owl-carousel-type-2-item-subtitle a&#45;&#45;gtm-eec-product-click"-->
    <!--      :data-gtm-eec-product-id="data.eec.id"-->
    <!--      :data-gtm-eec-product-name="data.eec.name"-->
    <!--      :data-gtm-eec-product-price="data.eec.price"-->
    <!--      :data-gtm-eec-product-brand="data.eec.brand"-->
    <!--      :data-gtm-eec-product-category="data.eec.category"-->
    <!--      :data-gtm-eec-product-variant="data.eec.variant"-->
    <!--      :data-gtm-eec-product-position="data.eec.position"-->
    <!--      :data-gtm-eec-product-list="data.eec.position"-->
    <!--    >-->
    <!--      <div class="content-hover"></div>-->
    <!--    </router-link>-->
  </div>
</template>

<script>
import LazyImg from 'components/lazyImg.vue'
import { Product } from 'src/models/Product.js'
export default {
  name: 'Product',
  components: {
    LazyImg
  },
  props: {
    data: {
      type: Product,
      default: () => {
        return new Product()
      }
    }
  },
  data () {
    return {
      offAmount: ''
    }
  },
  created () {
    this.calculateOff()
  },
  methods: {
    calculateOff () {
      this.offAmount = Math.round(((this.data.price.base - this.data.price.final) / (this.data.price.base)) * 100)
    }
  }

}
</script>

<style scoped lang="scss">

.product-item-c {
  display: flex;
  position: relative;
  background: white;
  border-radius: 15px;

  .pic {
    width: 200px;
    height: 100%;
    border-radius: 15px !important;
    z-index: 3;

    @media screen and (width <= 599px) {
      width: 100%;
      border-radius: 15px 15px 0 0 !important;
    }

    a {
      width: 100%;
      height: 100%;
      display: block;

      :deep(.img) {
        width: 100%;
        height: 100%;
        border-radius: 15px 0 0 15px;

        @media screen and (width <= 599px) {
          border-radius: 15px 15px 0 0 !important;
        }
      }
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .product-title {
      a {
        font-weight: 700;
        font-size: 16px;
        line-height: 31px;
        letter-spacing: -0.03em;
        color: #3D3F46;
      }
    }

    .detailes {
      .productPriceWrapper2 {
        position: absolute;
        right: 30px;
        top: 25px;
        z-index: 10;
        background-color: #f4516c;
        color: #fff;
        padding: 2px 5px;
        border-radius: 5px;

        .price-container {
          position: relative;

          .base {
            background: #ffb822;
            border-radius: 10px;
            padding: 0 5px;
            position: absolute;
            top: -13px;
            left: -20px;
            font-size: 10px;
            color: black;
            text-decoration: line-through;
          }

          .discount {
            background: #36a3f7;
            border-radius: 10px;
            padding: 0 5px;
            position: absolute;
            top: -12px;
            right: -20px;
            font-size: 10px;
          }

        }

        @media screen and (width <= 599px){
          position: relative;
          width: 100px;
          top: 5px;
          right: -25px
        }
      }

      .price-box {
        position: absolute;
        bottom: 5px;
        right: 10px;
        border-radius: 5px;
        padding: 0 5px;
        background-color: #f4516c;
        color: #fff;

        .final-price-box {
          display: flex;
          justify-content: center;
          align-items: center;

          .final-price {
            margin-left: 4px;
            font-size: 18px;
            font-weight: 500;
            line-height: 28px;
          }
        }

        .main-price {
          color: #fff;
          text-decoration: line-through;
          margin-left: 12px;
          font-size: 12px;
        }

        .price-Toman {
          font-size: 10px;
          font-weight: 500;
          line-height: 17px;
          margin-left: 5px;
        }
      }

    }
  }

  @media screen and (width <= 599px) {
    width: 100% !important;
    flex-direction: column;
    max-height: none;
  }

  .content-hover {
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 100%;
    z-index: 1;
    transition: all 0.7s;
    cursor: pointer;
  }

  &:hover .content-hover {
    background-color: #ff8e0017;
    border-radius: 15px;
    width: 100% !important;
    cursor: pointer;
  }
}

@keyframes flow {
  0% {
    left: 0;
    opacity: 0;
  }

  50% {
    left: 20px;
    opacity: 0.3;
  }

  100% {
    left: 100px;
    opacity: 0;
  }
}

@keyframes flow {
  0% {
    left: 0;
    opacity: 0;
  }

  50% {
    left: 20px;
    opacity: 0.3;
  }

  100% {
    left: 100px;
    opacity: 0;
  }
}

.glow {
  width: 40px;
  height: 100%;
  z-index: 999;
  position: absolute;
  animation: flow 1.5s linear infinite;
  transform: skew(-65deg);

  /* FF3.6+ */

  /* Chrome,Safari4+ */

  /* Chrome10+,Safari5.1+ */

  /* Opera 11.10+ */

  /* IE10+ */
  background: linear-gradient(to right, rgb(255 255 255 / 0%) 0%, rgb(255 255 255 / 0%) 1%, rgb(255 255 255 / 100%) 100%);

  /* W3C */
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00ffffff', endColorstr='#ffffff', GradientType=1);

  /* IE6-9 */
  border-left: 1px solid #fff;
  top: 0;
}

.ribbon {
  position: absolute;
  right: -5px;
  top: -5px;
  z-index: 5;
  overflow: hidden;
  width: 75px;
  height: 75px;
  text-align: left;
  direction: ltr;
}

.ribbon > span {
  font-size: 18px;
  font-weight: bold;
  color: #FFF;
  text-transform: uppercase;
  text-align: center;
  line-height: 20px;
  transform: rotate(45deg);
  width: 100px;
  display: block;
  background: #ac0001;
  background: linear-gradient(#ff0001 0%, #ac0001 100%);
  box-shadow: 0 3px 10px -5px rgb(0 0 0 / 100%);
  position: absolute;
  top: 19px;
  right: -21px;
}

.ribbon > span::before {
  content: "";
  position: absolute;
  left: 0;
  top: 100%;
  z-index: -1;
  border-left: 3px solid #ac0001;
  border-right: 3px solid transparent;
  border-bottom: 3px solid transparent;
  border-top: 3px solid #ac0001;
}

.ribbon > span::after {
  content: "";
  position: absolute;
  right: 0;
  top: 100%;
  z-index: -1;
  border-left: 3px solid transparent;
  border-right: 3px solid #ac0001;
  border-bottom: 3px solid transparent;
  border-top: 3px solid #ac0001;
}

.ribbon > span > span {
  font-size: 11px;
}

.info-text {
  padding-left: 5px;
  font-size: 14px;

  &::after {
    content: ' - ';
  }

  &:last-child::after {
    content: ' ';
  }
}

.m--margin-top-10 {
  margin-top: 10px !important;
}

.productAttributes-item-value {
  padding-top: 5px;
  line-height: normal;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 25px;
}

.productAttributes {
  display: flex;
  flex-wrap: wrap;
}

.productAttributes .productAttributes-item {
  display: flex;
  width: 33%;
  padding-left: 10px;
  align-items: flex-start;

  @media screen and (width <= 599px) {
    align-items: center;
  }
}

.productAttributes .productAttributes-item .productAttributes-item-icon svg {
  width: 35px;
}

.productAttributes .productAttributes-item .productAttributes-item-value {
  padding-right: 5px;
}

@media only screen and (width <= 700px) {
  .productAttributes .productAttributes-item {
    width: 50%;
  }
}

@media only screen and (width <= 400px) {
  .productAttributes .productAttributes-item .productAttributes-item-icon svg {
    width: 15px;
  }

  .productAttributes .productAttributes-item {
    margin-bottom: 5px;
  }
}
</style>
