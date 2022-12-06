<template>
  <q-page-builder
    v-model:sections="sections"
    v-model::options="pageConfig"
    :editable="pageBuilderEditable"
  />
</template>

<script>
import API_ADDRESS from "src/api/Addresses";
import GetWidgetsData from "assets/js/GetWidgetsData";

export default {
  name: 'Shop',
  computed: {
    pageBuilderEditable() {
      return this.$store.getters["AppLayout/pageBuilderEditable"];
    }
  },
  data() {
    return {
      pageConfig: {},
      sections: [
        {
          data: {
            rows: [
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: "blockList",
                        data: API_ADDRESS.pages.shop,
                        options: {
                          getData: (url) => GetWidgetsData.getData(url)
                        }
                      }
                    ]
                  }
                ],
                options: {
                  boxed: true
                }
              }
            ]
          }
        }
      ]
    };
  }
};
</script>
