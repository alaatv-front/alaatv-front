<template>
  <v-card class="expansion-panel-menu">
    <v-expansion-panels dense
                        flat
                        class="expansion-main">
      <v-expansion-panel dense
                         class="expansion-body">
        <v-expansion-panel-header flat
                                  class="expansion-header">
          <i v-if="updateHeaderData[0]"
             class="fi menu-header-icon"
             :class="'fi-rr-' + updateHeaderData[0].icon" />
          <p v-if="updateHeaderData[0]"
             class="menu-header-text expansion-paragraph">
            {{ updateHeaderData[0].title }}
          </p>
          <template v-slot:actions>
            <v-icon>
              $expand
            </v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="expansion-content">
          <div class="content-box">
            <div v-for="i in updateList"
                 :key="i.id"
                 class="content-template">
              <v-divider :key="i.id" />
              <div :key="i.id"
                   class="d-flex justify-center menu-header-text"
                   @click="changeSelectedItem(i)">

                <i class="fi menu-item-icon"
                   :class="'fi-rr-'+ i.icon" />

                <p class="expansion-paragraph">
                  {{ i.title }}
                </p>
              </div>
            </div>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>

export default {
  name: 'ExpansionMenu',
  data() {
    return {
      menuItems: [
        {
          id: 1,
          title: 'خانه',
          icon: 'home',
          routeName: 'Public.Home',
          selected: true
        },
        {
          id: 2,
          title: 'فیلم ها',
          icon: 'play-alt',
          routeName: 'UserAbrishamProgress',
          selected: false
        },
        {
          id: 3,
          title: 'برنامه مطالعاتی',
          icon: 'calendar',
          routeName: 'Schedule',
          selected: false
        },
        {
          id: 4,
          title: 'مشاوره',
          icon: 'headphones',
          routeName: 'consulting',
          selected: false
        },
        {
          id: 5,
          title: 'عملکرد من',
          icon: 'list-check',
          routeName: 'my-performance',
          selected: false
        },
        {
          id: 6,
          title: 'ارزیابی',
          icon: 'stats',
          routeName: 'assessment',
          selected: false
        },
        {
          id: 7,
          title: 'اخبار و اطلاعیه',
          icon: 'envelope',
          routeName: 'news',
          selected: false
        },
        {
          id: 8,
          title: 'نقشه راه ابریشم',
          icon: 'world',
          routeName: 'map',
          selected: false
        }
      ],
      routeName: ''
    }
  },
  computed: {
    updateHeaderData () {
      return this.menuItems.filter(item => {
        return item.selected
      })
    },
    updateList () {
      return this.menuItems.filter(item => {
        return !item.selected
      })
    }

  },
  created() {
    this.setHeader(this.$route.name)
  },
  methods: {
    changeSelectedItem(selected) {
      this.menuItems.map(i => {
        if (i.id === selected.id) {
          i.selected = true
          return true
        }
        i.selected = false
        return false
      })
      this.$router.push({ name: selected.routeName })
    },
    setHeader(route) {
      this.menuItems.map(i => {
        if (i.routeName === route) {
          i.selected = true
          return true
        }
        i.selected = false
        return false
      })
    }

  }
}
</script>

<style  lang="scss" scoped>
.expansion-panel-menu{
    color: #3e5480;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 20px;

    .expansion-main{
        .expansion-body{
            .expansion-paragraph{
                margin-bottom: 0;
            }

            .expansion-header{
                .menu-header-icon{
                    color:#ff8f00;
                    font-size: 18px;
                }
            }

            .menu-header-text{
                color: #3e5480;
                font-size: 14px;
                font-weight: 500;
                font-stretch: normal;
                font-style: normal;
                line-height: normal;
                letter-spacing: normal;
                padding: 10px;
                position: relative;
                box-sizing:border-box;

                .menu-item-icon{
                    position: absolute;
                    top:12px;
                    right: 0;
                    color: #b1ccee;
                    font-size: 18px !important;
                }

            }
        }
    }

    .v-item-group {
        border-radius: 15px !important;
    }

    .v-expansion-panel {
        .v-expansion-panel-content {
            .v-expansion-panel-content__wrap {
                padding: 0 24px 16px !important;

                .v-list {
                    .v-list-item{
                        height: 33px;
                    }
                }
            }
        }
    }

    .v-expansion-panel-header{
        padding-top: 0;
        padding-bottom: 0;

        .v-expansion-panel-header__icon {
            .v-icon{
                color: #3e5480;
            }
        }
    }
}
</style>
<style lang="scss">
.expansion-panel-menu {
    .v-expansion-panels {
        &:not(.v-expansion-panels--accordion) {
            :not(.v-expansion-panels--tile) > .v-expansion-panel--active {
                border-radius: 15px;
            }
        }
    }
}

.v-sheet{
    &.v-card{
        &:not(.v-sheet--outlined) {
            box-shadow: 0 3px 5px 0 rgb(0 0 0 / 10%);
            border-radius: 15px;
        }
    }
}

.v-expansion-panel-content__wrap {
    border-radius: 15px;
    box-shadow: 0 3px 5px 0 rgb(0 0 0 / 10%);
}
</style>
<style lang="scss">
.expansion-panel-menu{
    .v-expansion-panel {
        .v-expansion-panel-content {
            .v-expansion-panel-content__wrap {
                padding: 0 24px 16px !important;
            }
        }
    }
}
</style>
