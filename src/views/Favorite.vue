<template>
  <div class="favorite-docs">
    <router-link to="/dashboard" class="back-btn">
      <span class="material-icons"> arrow_back </span> Back To Dashboard
    </router-link>
    <h1 class="">my favorite documents</h1>
    <div class="title-line"></div>
    <div class="loader" v-if="loadingFav">
      <div class="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div class="boxes-container fav-docs">
      <div class="box" v-for="doc in favDocs" :key="doc.title">
        <h2 class="box-title">{{ doc.title }}</h2>
        <div class="box-details">
          <span class="box-detail">{{ doc.module }}</span>
          <span class="box-detail">{{ doc.type }}</span>
        </div>
        <router-link
          class="box-btn"
          target="_blank"
          :to="{
            name: 'view-doc',
            params: { doc_id: doc.id, doc_level: doc.level },
          }"
        >
          see The document
        </router-link>
        <!--
          <a :href="doc.link"> </a>
           -->
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase";
export default {
  name: "Favorite",
  data() {
    return {
      favDocs: [],
      favOne: [],
      favTwo: [],
      favThree: [],
      loadingFav: null,
    };
  },
  methods: {
    fetchAllLevelsFav() {},
  },
  created() {
    db.collection("users_fav")
      .doc(this.$route.params.uid)
      .onSnapshot((doc) => {
        //console.log();
        this.favDocs = doc.data().favorites;
      });
  },
  // protect the route
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
.favorite-docs {
  min-height: 100vh;
  padding-top: 80px;
  width: 95vw;
  margin: auto;
}
.favorite-docs h1 {
  text-align: center;
  text-transform: capitalize;
}
.fav-docs {
  text-align: center;
  margin: auto;
}
</style>