<template>
  <div class="expansion-container"
       :style="localOptions.style"
       :class="localOptions.className">
    <q-expansion-item v-for="(item, index) in localOptions.expansionList"
                      :key="index"
                      v-model="item.expanded"
                      expand-separator
                      :icon="item.icon"
                      :label="item.label"
                      :caption="item.caption"
                      :expand-icon-class="localOptions.expandIconClass"
                      :hide-expand-icon="localOptions.theme === 'theme2'"
                      header-class="expand-header"
                      @update:model-value="toggleExpand(index)">
      <template v-if="localOptions.theme === 'theme2'"
                v-slot:header="{ expanded }">
        <q-item clickable
                class="expand-header theme-2"
                @click="headerClick($event)">
          <q-item-section>
            <div class="row">
              <div class="col-12">
                <q-item-label>{{ item.label }}</q-item-label>
                <q-item-label caption>{{ item.caption }}</q-item-label>
              </div>
              <div class="col-9" />
              <div class="col-3">
                <q-btn v-if="!expanded"
                       class="open-btn"
                       color="primary"
                       flat
                       label="اطلاعات بیشتر"
                       @click="openExpand(index)" />
              </div>
            </div>
          </q-item-section>
        </q-item>
        <q-item />
      </template>
      <span class="text"
            v-html="item.text" />
      <div v-if="localOptions.theme === 'theme2'"
           class="theme-action-btn">
        <q-btn color="primary"
               class="close-btn"
               flat
               label="بستن"
               @click="closeExpand(index)" />
      </div>
    </q-expansion-item>
  </div>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins.js'

export default {
  name: 'ExpansionPanel',
  mixins: [mixinWidget],
  data() {
    return {
      defaultOptions: {
        expansionList: [],
        expandIconClass: null,
        theme: null,
        dense: false,
        marginBottom: '100px',
        fontFamily: null,
        color: null,
        fontSize: null,
        fontWeight: null,
        fontStyle: null,
        xs: {
          fontSize: null,
          fontWeight: null,
          fontStyle: null,
          lineHeight: null
        },
        sm: {
          fontSize: null,
          fontWeight: null,
          fontStyle: null,
          lineHeight: null
        },
        md: {
          fontSize: null,
          fontWeight: null,
          fontStyle: null,
          lineHeight: null
        },
        lg: {
          fontSize: null,
          fontWeight: null,
          fontStyle: null,
          lineHeight: null
        },
        xl: {
          fontSize: null,
          fontWeight: null,
          fontStyle: null,
          lineHeight: null
        }
      }
    }
  },
  computed: {
    computedMargin() {
      return this.localOptions.dense ? '5px' : this.localOptions.marginBottom
    }
  },
  methods: {
    toggleExpand(ItemIndex) {
      if (this.localOptions.toggle) {
        this.localOptions.expansionList.filter((item, index) => index !== ItemIndex).map(item => {
          item.expanded = false
          return item
        })
      }
    },
    closeExpand(ItemIndex) {
      this.localOptions.expansionList.filter((item, index) => index === ItemIndex).map(item => {
        item.expanded = false
        return item
      })
    },
    openExpand(ItemIndex) {
      this.localOptions.expansionList
        .filter((item, index) => index === ItemIndex).map(item => {
          item.expanded = true
          return item
        })
      this.toggleExpand(ItemIndex)
    },
    headerClick(event) {
      event.stopPropagation()
    }
  }
}
</script>

<style lang="scss" scoped>
.expansion-container {
  &:deep(.q-item__label) {
    font-size: 16px
  }

  &:deep(.q-item .q-focus-helper) {
    display: none;
  }
  .expand-header {
    width:100%;

    &.theme-2 {

      @media screen and (max-width: 600px) {
        display: flex;
        flex-direction: column;
      }
    }
  }
  .text {
    line-height: v-bind('localOptions.xl.lineHeight');
    color: v-bind('localOptions.color');
    font-size: v-bind('localOptions.xl.fontSize');
    font-weight: v-bind('localOptions.xl.fontWeight');
    font-family: v-bind('localOptions.fontFamily');
    font-style: v-bind('localOptions.xl.fontStyle');

    @media screen and (max-width: 1920px) {
      font-size: v-bind('localOptions.lg.fontSize');
      font-weight: v-bind('localOptions.lg.fontWeight');
      font-style: v-bind('localOptions.lg.fontStyle');
      line-height: v-bind('localOptions.lg.lineHeight');
    }

    @media screen and (max-width: 1440px) {
      font-size: v-bind('localOptions.md.fontSize');
      font-weight: v-bind('localOptions.md.fontWeight');
      font-style: v-bind('localOptions.md.fontStyle');
      line-height: v-bind('localOptions.md.lineHeight');
    }

    @media screen and (max-width: 1024px) {
      font-size: v-bind('localOptions.sm.fontSize');
      font-weight: v-bind('localOptions.sm.fontWeight');
      font-style: v-bind('localOptions.sm.fontStyle');
      line-height: v-bind('localOptions.sm.lineHeight');
    }

    @media screen and (max-width: 600px) {
      font-size: v-bind('localOptions.xs.fontSize');
      font-weight: v-bind('localOptions.xs.fontWeight');
      font-style: v-bind('localOptions.xs.fontStyle');
      line-height: v-bind('localOptions.xs.lineHeight');
    }
  }
  .theme-action-btn {
    display: flex;
    justify-content: flex-end;

    :deep(.q-btn.close-btn .q-focus-helper) {
      display: none;
    }

    .open-btn {
      margin-top: v-bind('computedMargin');

      @media screen and (max-width: 600px) {
        margin-top: 10px;
      }
    }

    .close-btn {
      padding: 0 50px;
    }
  }
}
</style>
