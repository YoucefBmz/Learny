<template>
  <div class="about" id="About">
    <section class="about-section">
      <h2>about us</h2>
      <span class="material-icons"> add_to_home_screen </span>
    </section>
    <section class="about-details">
      <div class="first-block">
        <p class="issues-paragraph">
          if you are sruggling with your studies. <br />
          if you can't find documents to revise with. <br />
          if you don't have much time to search for those documents. <br />
          if you don't know where to find documents. <br />
          . . .
        </p>
        <div class="image-container">
          <img src="../assets/image3.jpeg" alt="" />
        </div>
      </div>
      <h2 class="">
        <strong> LEARNY</strong> is the solution solution for all your problems
        !
      </h2>
      <div class="title-line"></div>
      <div class="description-container">
        <div class="image-container">
          <img src="../assets/image4.jpeg" alt="" />
        </div>
        <p class="about-description">
          <strong> Learny</strong> is a platform where you can find different
          documentation for different levels that can help you for revisions in
          your university journey. <br />
          <strong> Learny</strong> is created by a student who had the same
          challenges like all students. <br />
          it's destinated for commerce students
        </p>
      </div>

      <section class="home-modules-container">
        <h1
          class="home-modules-text"
          style="font-weight: 300; text-transform: capitalize"
        >
          go and dowload courses , tests , exams ,exercices and more just in one
          click
        </h1>
        <div class="title-line"></div>
        <br />
        <div class="modules-boxes">
          <div class="module-box" v-for="mod in modules" :key="mod.text">
            <span :class="mod.iconClass">{{ mod.iconText }}</span>
            <h3 class="text-home-box" style="font-weight: 300">
              {{ mod.text }}
            </h3>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>
<script>
export default {
  name: "about",
  data() {
    return {
      modules: [
        {
          text: "analyse",
          iconText: "functions",
          iconClass: "material-icons",
        },
        {
          text: "probabilité",
          iconText: "calculate",
          iconClass: "material-icons",
        },
        {
          text: "algèbre",
          iconText: "functions",
          iconClass: "material-icons",
        },
        {
          text: "comptabilité",
          iconText: "paid",
          iconClass: "material-icons",
        },
        {
          text: "micro & macro",
          iconText: "business",
          iconClass: "material-icons",
        },
        {
          text: "and more ...",
          iconText: "school",
          iconClass: "material-icons",
        },
      ],
    };
  },
};
</script>

<style>
#About {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.about-section {
  background: linear-gradient(rgba(255, 45, 74, 0.5), rgba(0, 0, 0, 0.5)),
    url(images/image1.jpeg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 80px;
  text-transform: capitalize;
  color: #fff;
  font-size: 2rem;
  text-shadow: 0px 4px 40px rgba(0, 0, 0, 0.25);
}
.first-block,
.description-container {
  padding: 20px 30px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 500px;
  width: 100vw;
  background: #515151;
}
.first-block p {
  font-size: 22px;
  text-transform: capitalize;
  width: 50%;
  height: 350px;
  display: flex;
  align-items: center;
}
.image-container {
  width: 500px;
}
.image-container img {
  width: 100%;
  border-radius: 20px;
  box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.25);
}
.about-details h2 {
  text-align: center;
  text-transform: capitalize;
  font-size: 2rem;
  padding-top: 50px;
  font-weight: 350;
}
.about-description {
  font-size: 22px;
  padding: 15px;
}
.description-container {
  justify-content: space-around;
  margin-top: 50px;
}
.description-container p {
  text-transform: capitalize;
  line-height: 3rem;
  width: 500px;
}
.home-modules-text {
  font-size: 22px;
}
.modules-boxes {
  margin: auto;
}
.about-creator {
  height: 500px;

  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}

/*************************************
Responsive 
********** */

@media screen and (max-width: 1100px) {
  .first-block p,
  .about-description {
    font-size: 20px;
  }
  .image-container {
    width: 450px;
  }
}

@media screen and (max-width: 970px) {
  .first-block p,
  .about-description {
    font-size: 16px;
  }
  .image-container {
    width: 400px;
  }
  .about-details h2 {
    font-size: 1.7rem;
  }
}

@media screen and (max-width: 870px) {
  .first-block,
  .description-container {
    flex-direction: column;
    height: 600px;
  }
  .description-container {
    height: 800px;
  }
  .first-block p {
    width: 500px;
    font-size: 18px;
  }

  .description-container p {
    width: 95%;
  }
  .about-details h2 {
    font-size: 1.4rem;
  }
}

@media screen and (max-width: 660px) {
  .about-details h2 {
    font-size: 1.2rem;
  }

  .home-modules-text {
    font-size: 1rem;
  }
}

@media screen and (max-width: 550px) {
  .image-container,
  .first-block p {
    width: 95%;
    font-size: 18px;
  }
  .about-details h2 {
    font-size: 0.9rem;
    font-weight: bold;
  }
}
@media screen and (max-width: 400px) {
  .description-container {
    height: 1000px;
    font-size: 16px;
  }
  .description-container p {
    font-size: 16px;
  }
}
</style>