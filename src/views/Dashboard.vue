<template>
  <div class="dashboard" id="Dashboard">
    <div class="info-dahboard">
      <div class="img-container">
        <img :src="userAuth.photo" alt="" />
        <h1 class="">
          welcome <span style="color: #ff2d4a"> {{ userAuth.name }} ! </span>
        </h1>
      </div>
      <div class="btns">
        <button @click="logout" class="btn-primery">
          <span class="material-icons"> logout </span>
          log out
        </button>
        <router-link
          class="btn-primery"
          :to="{
            name: 'Favorite',
            params: { uid: userAuth.uid },
          }"
        >
          <span class="material-icons"> bookmark_border </span>
          my favorite docs
        </router-link>
        <router-link to="/library/prepaOne" class="btn-primery">
          <span class="material-icons"> shop </span>
          the library
        </router-link>
      </div>
    </div>
    <!-- 
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
    -->
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase";
export default {
  name: "dashboard",
  data() {
    return {
      userAuth: {},
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          // Sign-out successful.
          console.log("sign-out");
          //this.$router.push("/login");
        })
        .catch(function (error) {
          // An error happened.
        });
    },
  },
  async created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.userAuth = {
          name: user.displayName,
          email: user.email,
          uid: user.uid,
          photo: user.photoURL,
          favorites: [],
        };
        // first visit ...

        // if he is user and have favorites
        // if he is user and have't favorites

        db.collection("users_fav")
          .doc(user.uid)
          .get()
          .then((qs) => {
            //// first visit :
            if (!qs.data()) {
              console.log("new user");
              db.collection("users_fav").doc(user.uid).set({
                name: user.displayName,
                email: user.email,
                uid: user.uid,
                photo: user.photoURL,
                favorites: [],
              });
            } else {
              console.log("user exists");
              if (qs.data().favorites === undefined) {
                console.log("false");
                db.collection("users_fav").doc(user.uid).set({
                  name: user.displayName,
                  email: user.email,
                  uid: user.uid,
                  photo: user.photoURL,
                  favorites: [],
                });
              } else {
                this.userAuth.favorites = qs.data().favorites;
                console.log("true");
                db.collection("users_fav").doc(user.uid).set({
                  name: user.displayName,
                  email: user.email,
                  uid: user.uid,
                  photo: user.photoURL,
                  favorites: this.userAuth.favorites,
                });
              }
            }
            //console.log(qs.data().favorites);
            //this.userAuth.favorites = qs.data().favorites;
          });

        /*else {
          db.collection("users_fav").doc(user.uid).set({
            name: user.displayName,
            email: user.email,
            uid: user.uid,
            photo: user.photoURL,
            favorites: [],
          });
        }*/

        //console.log(userAdded);
      }
    });
  },
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
#Dashboard {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(images/image5.jpeg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  padding-top: 90px;
  min-height: 100vh;
  text-transform: capitalize;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
}
.dashboard-links {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 700px;
  margin: auto;
  background: #fff;
  box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.2);

  padding: 10px 3px;
  border-radius: 20px;
}
.dashboard-links .dashboard-link {
  list-style: none;
  text-transform: capitalize;
}
.dashboard-links .dashboard-link a {
  color: #000;
  text-decoration: none;
}

.dashboard-links .dashboard-link a.router-link-exact-active {
  color: #ff2d4a;
  font-weight: 650;
}
.img-container {
  text-align: center;
  padding-bottom: 25px;
  display: flex;
  align-items: center;
}
.img-container img {
  margin-right: 15px;
}

/**************:hover
 */
#Dashboard .info-dahboard {
  text-align: center;
  width: 560px;
}
.img-container img {
  border-radius: 50%;
  box-shadow: 2px 13px 15px rgba(0, 0, 0, 0.8);
}
.btns {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  grid-row-gap: 1rem;
}
.btn-primery span {
  padding-right: 5px;
}
.btn-primery {
  color: #fff;
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
  background: transparent;
}
.btn-primery:hover {
  background: #fff;
  color: #ff2d4a;
  border: 2px solid #fff;
}
.img-container h1 {
  color: #fff;
}

@media screen and (max-width: 720px) {
  .dashboard-links {
    width: 450px;
    justify-content: space-between;
  }
}
@media screen and (max-width: 570px) {
  #Dashboard .info-dahboard {
    width: auto;
    text-align: center;
  }
  .img-container {
    flex-direction: column;
    justify-content: space-between;
  }
  .img-container h1 {
    margin-top: 10px;
  }
  .btn-primery {
    border-radius: 15px;
    font-weight: bold;
    font-size: 16px;
    padding: 10px 20px;
  }
}
@media screen and (max-width: 500px) {
  .dashboard-links {
    width: 300px;
    justify-content: space-between;
  }
  .dashboard-links .dashboard-link a {
    font-size: 12px;
  }
}
@media screen and (max-width: 361px) {
  .img-container {
    font-size: 0.8rem;
  }
}
@media screen and (max-width: 300px) {
  .dashboard-links .dashboard-link a {
    font-size: 10px;
  }
  .dashboard-links {
    width: 280px;
    justify-content: space-around;
  }
}
</style>