<template>
  <div class="view-doc">
    <router-link
      to="/library/prepaOne"
      class="back-btn"
      style="margin-top: 20px"
    >
      <span class="material-icons"> arrow_back </span> Back To Library
    </router-link>

    <h1 class="view-doc-title">{{ title }}</h1>
    <div class="title-line"></div>
    <div class="box-details" style="margin: auto">
      <span class="box-detail">{{ module }}</span>
      <span class="box-detail">{{ type }}</span>
    </div>
    <div class="frame-container">
      <iframe
        :src="link + '/preview'"
        style="border: 1px solid; margin: auto"
        frameborder="0"
      ></iframe>
    </div>
    <div class="btns-view">
      <button class="btn-view-doc" @click="addToFav" v-if="!favorite">
        <span class="material-icons"> favorite_border </span>
        add to favorite
      </button>
      <button class="btn-view-doc" @click="removeFav" v-else>
        <span class="material-icons"> favorite </span>
        remove from favorite
      </button>
      <div class="loader" v-if="viewDoc">
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
      <a :href="link + '/view'" class="btn-view-doc" target="_blank">
        <span class="material-icons"> download </span>
        download the doc
      </a>
    </div>

    <!-- 
      https://drive.google.com/file/d/1KyN7AoE4cptKxf4BZN0WLZ9mfqtO5wYp/preview
    -->
  </div>
</template>

<script>
import db from "@/firebase";
import firebase from "firebase";
export default {
  name: "",
  data() {
    return {
      title: "",
      module: null,
      type: null,
      link: null,
      id: null,
      favorite: null,
      viewDoc: null,
      userfavArr: [],
    };
  },
  beforeRouteEnter(to, from, next) {
    db.collection(to.params.doc_level)
      .where("doc_id", "==", to.params.doc_id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((el) => {
          next((vm) => {
            vm.title = el.data().title;
            vm.module = el.data().Module;
            vm.type = el.data().type;
            vm.link = el.data().link;
            vm.id = el.id;
          });
        });
      });
  },
  watch: {
    $route: "fetchData",
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var fav_doc = {
          id: this.$route.params.doc_id,
          title: this.title,
          module: this.module,
          type: this.type,
          link: this.link,
        };
        db.collection("users_fav")
          .doc(user.uid)
          .get()
          .then((qs) => {
            this.userfavArr = qs.data().favorites;

            this.favorite = this.userfavArr.some(
              (favdoc) => favdoc.id === this.$route.params.doc_id
            );
          });
      }
    });
  },
  created() {},
  methods: {
    fetchData() {
      db.collection(this.$route.params.doc_level)
        .where("doc_id", "==", this.$route.params.doc_id)
        .onSnapshot((querySnapshot) => {
          querySnapshot.forEach((el) => {
            this.title = el.data().title;
            this.module = el.data().Module;
            this.type = el.data().type;
            this.link = el.data().link;
            this.id = el.data().doc_id;
          });
        });
    },
    addToFav(id) {
      this.viewDoc = true;
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          var fav_doc = {
            id: this.$route.params.doc_id,
            title: this.title,
            module: this.module,
            level: this.$route.params.doc_level,
            type: this.type,
            link: this.link,
          };
          db.collection("users_fav")
            .doc(user.uid)
            .update({
              favorites: firebase.firestore.FieldValue.arrayUnion(fav_doc),
            })
            .then(() => {
              this.favorite = true;
              this.viewDoc = false;
            })
            .catch();
        }
      });
    },

    removeFav() {
      this.viewDoc = true;
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          var fav_doc = {
            id: this.$route.params.doc_id,
            title: this.title,
            module: this.module,
            type: this.type,
            link: this.link,
          };
          db.collection("users_fav")
            .doc(user.uid)
            .update({
              favorites: firebase.firestore.FieldValue.arrayRemove(fav_doc),
            })
            .then(() => {
              //this.favorite = false;
              this.favorite = false;
              this.viewDoc = false;
              //fav(false);
            })
            .catch();
        }
        //this.viewDoc = false;
      });
    },
  },
};
</script>

<style>
.view-doc {
  padding-top: 70px;
  text-align: left;
  min-height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(../views/images/image4.jpeg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}
iframe {
  width: 500px;
  height: 600px;
  box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.5);
  border-radius: 25px;
}
.view-doc-title,
.frame-container {
  text-transform: capitalize;
  text-align: center;
  color: #fff;
}
.btn-view-doc {
  outline: none;
  color: #fff;
  background: transparent;
  font-family: "Poppins";
  text-decoration: none;
  border: 2px solid #ff2d4a;
  border-radius: 15px;
  font-weight: bold;
  font-size: 18px;
  padding: 10px 20px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  transition: 0.5s ease;
  cursor: pointer;
  margin-bottom: 20px;
}
.btns-view {
  display: flex;
  width: 600px;
  margin: auto;
  padding: 25px 0;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  grid-row-gap: 1rem;
}
.btn-view-doc span {
  padding-right: 5px;
}
.btn-view-doc:hover {
  background: #ff2d4a;
  color: #fff;
  border: 2px solid #ff2d4a;
}
.pop-up {
  position: absolute;
  top: 80px;
  right: 20px;
  background: greenyellow;
  padding: 20px 30px;
  border-radius: 15px;
}
@media screen and (max-width: 600px) {
  .btns-view {
    width: 500px;
  }
}
@media screen and (max-width: 540px) {
  iframe {
    width: 250px;
    height: 300px;
  }
  .btns-view {
    display: flex;
    flex-direction: column;
    width: 90vw;
    margin: 20px auto;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    grid-row-gap: 1rem;
  }

  .back-btn {
    margin-left: 30px;
  }
}
</style>