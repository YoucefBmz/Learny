<template>
  <div class="library">
    <router-link to="/dashboard" class="back-btn">
      <span class="material-icons"> arrow_back </span> Back
    </router-link>
    <br /><br />
    <ul class="dashboard-links">
      <li class="dashboard-link">
        <router-link :to="{ name: 'PrepaOne' }">1 ére prepa </router-link>
      </li>
      <li class="dashboard-link">
        <router-link :to="{ name: 'PrepaTwo' }">2 ére prepa </router-link>
      </li>
      <li class="dashboard-link">
        <router-link :to="{ name: 'MasterOne' }"
          >master tronc commun
        </router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  beforeRouteEnter(to, from, next) {
    //console.log('before eoute enter');
    next((vm) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          //console.log(user);
          next();
        } else {
          vm.$router.push("/login");
        }
      });
    });
  },
};
</script>

<style>
.library {
  padding-top: 90px;
}
.back-btn {
  background: #fff;
  display: inline-flex;
  padding: 10px 15px;
  text-decoration: none;
  border-radius: 15px;
  color: #ff2d4a;
  margin-left: 80px;
  transition: 0.5s ease all;
  box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.25);
}
.back-btn span {
  padding-right: 7px;
}
.back-btn:hover {
  box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.5);
  font-weight: bold;
}
</style>