<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>
<template>
  <div class="banner">
    <div class="left">
      <div class="name">
        <RouterLink to="/" class="router-link">KieNoeLab</RouterLink>
      </div>
    </div>
    <div class="right">
      <div class="search">
        <ion-icon name="search-outline"></ion-icon>
      </div>
      <div class="notification">
        <RouterLink to="/notification" class="router-link"
          ><ion-icon name="notifications-outline"></ion-icon
        ></RouterLink>
      </div>
      <div class="me">
        <RouterLink to="/me" class="router-link"
          ><ion-icon name="person-circle-outline"></ion-icon
        ></RouterLink>
      </div>
    </div>
  </div>
  <div class="main">
    <RouterView />
  </div>
</template>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.banner {
  position: fixed;
  height: 50px;
  width: 100vw;
  top: 0;
  right: 0;
  background: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
}
.banner .left {
  width: 320px;
  height: 50px;
  display: flex;
  align-items: flex-end;
  flex: 1;
}
.banner .left .router-link {
  height: 50px;
  line-height: 50px;
  padding: 0 0 0 130px;
  font-weight: 700;
  font-size: 30px;
  color: #222;
  text-decoration: none;
  transition: 0.5s;
}
.banner .left .router-link:hover {
  font-size: 40px;
}
.banner .right {
  height: 50px;
  width: 170px;
  display: flex;
  padding: 0 20px 0 0;
}
.banner .right .notification {
  flex: 1;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
}
.banner .right .notification::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  transition: 0.5s;
  opacity: 0;
}
.banner .right .notification:hover::before {
  opacity: 1;
}
.banner .right .notification ion-icon {
  color: #222;
  font-size: 35px;
}
.banner .right .me {
  flex: 1;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
}
.banner .right .me::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  transition: 0.5s;
  opacity: 0;
}
.banner .right .me:hover::before {
  opacity: 1;
}
.banner .right .me ion-icon {
  color: #222;
  font-size: 40px;
}
.banner .right .search {
  flex: 1;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
}
.banner .right .search ion-icon {
  color: #222;
  font-size: 35px;
  padding: 0 0 5px 0;
}
.banner .right .search::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  transition: 0.5s;
  opacity: 0;
}
.banner .right .search:hover::before {
  opacity: 1;
}
.main {
  position: absolute;
  top: 0;
  padding-top: 50px;
  padding-left: 75px;
  background: #3d4152;
  width: 100%;
  height: 100vh;
}
</style>
