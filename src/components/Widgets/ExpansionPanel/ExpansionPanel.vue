<template>
  <div class="expansion-container"
       :style="options.style"
       :class="options.className">
    <q-expansion-item v-for="(item, index) in expansionList"
                      :key="index"
                      v-model="item.expanded"
                      expand-separator
                      :icon="item.icon"
                      :label="item.label"
                      :caption="item.caption"
                      :expand-icon-class="expandIconClass"
                      :hide-expand-icon="theme === 'theme2'"
                      header-class="expand-header"
                      @update:model-value="toggleExpand(item.id)">
      <template v-if="theme === 'theme2'"
                v-slot:header="{ expanded }">
        <q-item clickable
                class="expand-header theme-2"
                @click="headerClick($event)">
          <q-item-section>
            <q-item-label>{{ item.label }}</q-item-label>
            <q-item-label caption>{{ item.caption }}</q-item-label>
          </q-item-section>
          <q-item-section side
                          class="theme-action-btn">
            <q-btn v-if="!expanded"
                   class="open-btn"
                   color="primary"
                   flat
                   label="اطلاعات بیشتر"
                   @click="openExpand(item.id)" />
          </q-item-section>
        </q-item>
      </template>
      <div class="text">
        {{ item.text }}
      </div>
      <div v-if="theme === 'theme2'"
           class="theme-action-btn">
        <q-btn color="primary"
               class="close-btn"
               flat
               label="بستن"
               @click="closeExpand(item.id)" />
      </div>
    </q-expansion-item>
  </div>
</template>

<script>
export default {
  name: 'ExpansionPanel',
  props: {
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      expansionList: [],
      expandIconClass: '',
      theme: ''
    }
  },
  watch: {
    options: {
      handler() {
        this.loadConfig()
      }
    }
  },
  mounted() {
    this.loadConfig()
  },
  methods: {
    loadConfig() {
      this.expansionList = this.options.expansionList
      this.expandIconClass = this.options.expandIconClass
      this.theme = this.options.theme
    },
    toggleExpand(itemId) {
      if (this.options.toggle) {
        this.expansionList.filter(item => item.id !== itemId).map(item => {
          item.expanded = false
          return item
        })
      }
    },
    closeExpand(itemId) {
      this.expansionList.filter(item => item.id === itemId).map(item => {
        item.expanded = false
        return item
      })
    },
    openExpand(itemId) {
      this.expansionList.filter(item => item.id === itemId).map(item => {
        item.expanded = true
        return item
      })
      this.toggleExpand(itemId)
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
  }
  .text {
    padding: 1.5rem 2rem;
    text-align: justify;
  }
  .theme-action-btn {
    display: flex;
    justify-content: flex-end;

    :deep(.q-btn.close-btn .q-focus-helper) {
      display: none;
    }

    .open-btn {
      margin-top: 100px
    }

    .close-btn {
      padding: 0 50px;
    }
  }
}
</style>
