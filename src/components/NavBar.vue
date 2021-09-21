<template>
  <div id="navBar">
    <nav>
      <h3 class="nav-icone">
        <a href="#" class="logo-nav">
          <img src="../assets/learny.png" class="logo-img" alt=""
        /></a>
      </h3>
      <ul class="links-item" :class="{ 'open-nav': show }">
        <li @click="openNav">
          <router-link to="/" class="link">home</router-link>
        </li>
        <li @click="openNav">
          <router-link to="/about" class="link">About</router-link>
        </li>
        <li @click="openNav" v-if="!isAuth">
          <router-link to="/login" class="link"> Login</router-link>
        </li>
        <li @click="openNav" v-else>
          <router-link to="/dashboard" class="link">dashboard</router-link>
        </li>
      </ul>
      <div class="humb" @click="openNav">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
    </nav>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "navBar",
  data() {
    return {
      show: false,
      isAuth: false,
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      user ? (this.isAuth = true) : (this.isAuth = false);
    });
  },
  computed: {
    /*isAuth() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          return true;
        } else {
          return false;
        }
      });
    },*/
  },
  methods: {
    openNav() {
      this.show = !this.show;
    },
    closeNav() {
      this.show = false;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Righteous&display=swap");
#navBar {
  background: #fff;
  box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
  position: fixed;
  width: 100vw;
  z-index: 10;
}
.logo-img {
  width: 80px;
  height: 70px;
  object-fit: cover;
}
.logo-nav {
  font-weight: 400;
  letter-spacing: 0.6px;
  font-size: 22px;
  color: #000;
  color: #ff2d4a;
  font-family: "Lalezar", cursive;
  text-decoration: none;
}
nav {
  width: 90vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.links-item {
  display: flex;
  align-items: center;
  list-style: none;
  justify-content: space-between;
  width: 40vw;
}
.links-item li a {
  text-decoration: none;
  color: #000;
  text-transform: capitalize;
  transition: 1s ease all;
  font-size: 18px;
}
.links-item li a.router-link-exact-active {
  color: #ff2d4a;
  font-weight: 650;
}
.humb {
  width: 53px;
  height: 36px;
  cursor: pointer;
  display: none;
}
.line {
  width: 100%;
  width: 100%;
  margin: 3px 0;
  border-radius: 8px;
  height: 8px;
  background: #ff2d4a;
}
@media screen and (max-width: 1180px) {
  .links-item {
    width: 50vw;
  }
}
@media screen and (max-width: 850px) {
  .links-item {
    width: 60vw;
  }
}
@media screen and (max-width: 700px) {
  .links-item {
    position: absolute;
    top: 70px;
    left: 0;
    width: 100vw;
    height: calc(100vh - 70px);
    flex-direction: column;
    justify-content: space-around;
    clip-path: circle(100px at 90% -29%);
    -webkit-clip-path: circle(100px at 90% -29%);
    background: #fff;
    transition: all 1s ease;
  }
  .humb {
    display: block;
  }
  .open-nav {
    clip-path: circle(1000px at 90% -10%);
    -webkit-clip-path: circle(1000px at 90% -10%);
  }
}
</style>