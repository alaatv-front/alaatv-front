<template>
  <div>
    <q-card class="custom-card">
      <q-card-section>
        <div class="flex no-wrap">
          <div>
            <div class="avatar-img"></div>
            <q-btn
              icon="isax:camera"
              size="xs"
              color="white"
              text-color="accent"
              round
              class="photo-edit"
            />
          </div>
          <div class="q-ml-lg namePhone">
            <div class="fullName">پوریا جعفری فرد</div>
            <div class="phoneNumber q-mt-sm">۰۹۳۳۱۲۳۴۵۶۷</div>
          </div>
          <div>
            <q-btn
              class="q-ml-lg"
              icon="isax:edit"
              size="sm"
              color="white"
              text-color="accent"
              unelevated
            />
          </div>
        </div>
        <div class="q-mt-lg status">
          <div class="flex no-wrap q-mx-md status-detail">
            دانش آموز &#9679; ریاضی دوازدهم
            <div>۹۵۵</div>
            <div class="yellow-star"></div>
          </div>
        </div>
        <q-separator
          class="q-mt-md"
          size="2px"
        />
        <q-list class="q-mt-md">
          <q-item
            clickable
            v-ripple
          >
            <q-item-section class="menu-item-custom">
              <q-icon
                name="play_circle_outline"
                size="28px"
              ></q-icon>
              <div class="menu-item-title q-ml-sm">محصولات من</div>
            </q-item-section>
          </q-item>
          <q-item
            clickable
            v-ripple
          >
            <q-item-section class="menu-item-custom">
              <q-icon
                name="play_circle_outline"
                size="28px"
              ></q-icon>
              <div class="menu-item-title q-ml-sm">سفارش های من</div>
            </q-item-section>
          </q-item>
          <q-item
            clickable
            v-ripple
          >
            <q-item-section class="menu-item-custom">
              <q-icon
                name="play_circle_outline"
                size="28px"
              ></q-icon>
              <div class="menu-item-title q-ml-sm">کیف پول</div>
            </q-item-section>
          </q-item>
          <q-item
            clickable
            v-ripple
          >
            <q-item-section class="menu-item-custom">
              <q-icon
                name="play_circle_outline"
                size="28px"
              ></q-icon>
              <div class="menu-item-title q-ml-sm">نشان شده‌ها</div>
            </q-item-section>
          </q-item>
          <q-item
            clickable
            v-ripple
          >
            <q-item-section class="menu-item-custom">
              <q-icon
                name="play_circle_outline"
                size="28px"
              ></q-icon>
              <div class="menu-item-title q-ml-sm">جعبه لایتنر</div>
            </q-item-section>
          </q-item>
          <q-item
            clickable
            v-ripple
          >
            <q-item-section class="menu-item-custom">
              <q-icon
                name="play_circle_outline"
                size="28px"
              ></q-icon>
              <div class="menu-item-title q-ml-sm">کانال‌های من</div>
            </q-item-section>
          </q-item>
          <q-item
            clickable
            v-ripple
          >
            <q-item-section class="menu-item-custom">
              <q-icon
                name="play_circle_outline"
                size="28px"
              ></q-icon>
              <div class="menu-item-title q-ml-sm">نظرات من</div>
            </q-item-section>
          </q-item>
          <q-item
            clickable
            v-ripple
          >
            <q-item-section class="menu-item-custom">
              <q-icon
                name="play_circle_outline"
                size="28px"
              ></q-icon>
              <div class="menu-item-title q-ml-sm">تیکت</div>
            </q-item-section>
          </q-item>
          <q-item
            clickable
            v-ripple
          >
            <q-item-section class="menu-item-custom">
              <q-icon
                name="logout"
                size="28px"
              ></q-icon>
              <div class="menu-item-title q-ml-sm">خروج</div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'ProfileMenu'
}
</script>
<style scoped>
.avatar-img {
  width: 80px;
  height: 80px;
  background-image: url('data:image/png;base64,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');
}
.photo-edit {
  font-size: 7px;
  position: absolute;
  border-radius: 50%;
  top: 75px;
}
.fullName {
  font-size: 18px;
}
.phoneNumber {
  font-size: 14px;
  color: #656f7b;
}
.custom-card {
  /*SHOULD REMOVE*/
  /* width: 317px; */
}
.status {
  background: #f1f3f4;
  border-radius: 10px;
  height: 50px;
  display: flex;
  align-items: center;
  /*width: 100%;*/
}
.yellow-star {
  width: 20px;
  height: 20px;
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFUSURBVHgBtZQ9TsNAEIXfrMENjY8QNwQqwg2Sk2CKIErfIBwhdAhTmBvACcINSIdASPYNsgUNGO8y/gkx+AfsJE9ayR7vfHqemV1gw6K/NujXsxPEaspbJa8L6l/fdgbqp/MexOcjb7PykIQZ2WT7si5HNAFhxJMCLJGFD9NFF4eZuzio+NToUjS7q5SFyJw0OtSBa+H9zYEwjqDVgCO9X79aIS1BNIfmZpG+p33PXwFfxjNoDLGOCA8MHZEOHC707gKbkDJskRaX6VhbFNLhVZg1JTZOkwA6i3OVGKVPy1A2JmqWNaQ9LHH3A7iCxnwyYP2bx3VbwkrAFPo8XrQAhtT37GJAlBy2cQf08pxqIEQ0QFsZ8bAeCKMOKPNVlsKgHqhVOUnjEuaezcU/5pfyXUgkG4A7d9/zmAy70iM68FyypzLpJPVvnKSrhYMw55HxsU19AeN3eoJ/cWYTAAAAAElFTkSuQmCC');
}
.status-detail {
  width: 100%;
  justify-content: space-between;
}
.menu-item-title {
  font-size: 16px;
}
.menu-item-custom {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 64px;
}
.q-item {
  padding-top: 0px;
  padding-bottom: 0px;
}
.namePhone {
  justify-content: center;
  display: flex;
  flex-direction: column;
}
</style>
