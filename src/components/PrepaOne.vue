<template>
  <div class="" id="prepa-container">
    <!--   -->
    <div class="filter-block">
      <div class="chekbox-section">
        <p class="" style="text-align: center">filter by module :</p>
        <input type="radio" :value="''" v-model="moduleName" />
        <label for="">all</label>
        <div class="check-box-container">
          <div class="check-box" v-for="mod in uniqueModules" :key="mod.id">
            <input type="radio" :id="mod" :value="mod" v-model="moduleName" />
            <label for="analyse">{{ mod }}</label>
          </div>
        </div>
        <br />
      </div>
      <div class="type-section">
        <p class="" style="text-align: center">filter by Type :</p>
        <input type="radio" :value="''" v-model="typeName" />
        <label for="analyse">all</label>
        <div class="check-box-container">
          <div class="check-box" v-for="type in uniqueTypes" :key="type">
            <input type="radio" :id="type" :value="type" v-model="typeName" />
            <label for="analyse">{{ type }}</label>
          </div>
        </div>
      </div>
    </div>

    <hr />
    <div class="loader" v-if="loadingOne">
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
    <div class="boxes-container">
      <div class="box" v-for="doc in pageOfItems" :key="doc.title">
        <h2 class="box-title">{{ doc.title }}</h2>
        <div class="box-details">
          <span class="box-detail">{{ doc.Module }}</span>
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
    <div class="pagination-container">
      <jw-pagination
        :items="filteredBox"
        :pageSize="6"
        @changePage="onChangePage"
      ></jw-pagination>
    </div>
  </div>
</template>

<script>
import db from "@/firebase";
export default {
  data() {
    return {
      docs: [],
      pageOfItems: [],
      moduleName: "",
      typeName: "",
      loadingOne: null,
    };
  },
  methods: {
    onChangePage(pageOfItems) {
      // update page of items
      this.pageOfItems = pageOfItems;
    },
  },
  computed: {
    uniqueModules() {
      var Remove_duplicate_Value = [];
      for (var i = 0; i < this.docs.length; i++) {
        if (Remove_duplicate_Value.indexOf(this.docs[i].Module) === -1) {
          Remove_duplicate_Value.push(this.docs[i].Module.toLowerCase());
        }
      }
      //console.log(Remove_duplicate_Value);
      return Remove_duplicate_Value;
    },
    uniqueTypes() {
      var TypesArray = [];
      for (var i = 0; i < this.docs.length; i++) {
        if (TypesArray.indexOf(this.docs[i].type.toLowerCase()) === -1) {
          TypesArray.push(this.docs[i].type);
        }
      }
      //console.log(TypesArray);
      return TypesArray;
    },
    filteredBox() {
      if (this.moduleName !== "" && this.typeName !== "") {
        return this.docs.filter(
          (item) =>
            item.Module.toLowerCase() == this.moduleName.toLowerCase() &&
            item.type.toLowerCase() == this.typeName.toLowerCase()
        );
      } else if (this.moduleName == "" && this.typeName == "") {
        return this.docs;
      } else if (this.typeName !== "" || this.moduleName !== "") {
        if (this.moduleName !== "") {
          return this.docs.filter(
            (item) => item.Module.toLowerCase() == this.moduleName.toLowerCase()
          );
        } else if (this.typeName !== "") {
          return this.docs.filter(
            (item) => item.type.toLowerCase() == this.typeName.toLowerCase()
          );
        }
      }
    },
  },
  created() {
    this.loadingOne = true;
    db.collection("prepaOne")
      .get()
      .then((querySnapshot) => {
        var PrepaOneDocs = [];
        querySnapshot.forEach((el) => {
          //console.log(el);
          let data = {
            id: el.id,
            title: el.data().title,
            //url: el.data().url,
            Module: el.data().Module,
            type: el.data().type,
            link: el.data().link,
            level: el.data().level,
          };
          PrepaOneDocs.push(data);
          //context.state.loadingMacro = false;
        });
        //console.log(PrepaOneDocs);
        this.docs = PrepaOneDocs;
        //context.commit('macroDocs', macroArr)
        // firebase permissions
        this.loadingOne = false;
      });
  },
};
</script>

<style>
.boxes-container {
  margin-top: 0.5rem;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 2rem;
  grid-row-gap: 2rem;
}
#prepa-container {
  width: 90vw;
  margin: 2rem auto;
}
.box {
  box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 1rem;
  justify-content: space-between;
  flex-direction: column;
}
.box-title {
  font-weight: 600;
  font-size: 1.7rem;
  text-transform: capitalize;
  margin-top: 5px;
}
.box-btn {
  text-transform: capitalize;
  text-decoration: none;
  color: #fff;
  background: #ff2d4a;
  box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.25);
  padding: 15px 30px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 15px;
  font-size: 1.3rem;
  border-radius: 20px;
  text-decoration: none;
}
.box-detail {
  background: #ff2d4a;
  color: #fff;
  padding: 7px 15px;
  border-radius: 20px;
}
.box-details {
  padding: 15px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 200px;
}
.element.style {
  display: none;
}
.pagination-container {
  text-align: center;
  margin-top: 2rem;
  padding: 5px;
  transition: 0.5s ease all;
}
.pagination-container .active a {
  color: #fff;
  background: #ff2d4a;
  transition: 0.5s ease all;
}
.filter-block {
  padding-bottom: 15px;
  display: flex;
  flex-wrap: wrap;
}
.check-box-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.chekbox-section,
.type-section {
  margin-top: 15px;
  background: #fff;
  margin-right: 25px;
  height: fit-content;
  width: fit-content;
  padding: 25px 50px;
  box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.25);
  text-transform: capitalize;
  border-radius: 10px;
  transition: 0.5s ease all;
}
.chekbox-section:hover,
.type-section:hover {
  box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.5);
}
.check-box {
  background: #ff2d4a;
  color: #fff;
  margin-right: 3px;
  margin-top: 5px;
  padding: 10px 20px;
  border-radius: 15px;
  box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.25);
}
@media screen and (max-width: 1141px) {
  .boxes-container {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media screen and (max-width: 760px) {
  .boxes-container {
    grid-template-columns: repeat(1, 1fr);
  }
}
@media screen and (max-width: 500px) {
  .filter-block {
    display: flex;
    flex-wrap: wrap;
  }
  .chekbox-section,
  .type-section {
    width: 90vw;
    margin-top: 15px;
  }
  .check-box-container {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }
}
@media screen and (max-width: 380px) {
  .pagination {
    width: 290px;
  }
  .pagination li .page-link {
    font-size: 12px;
  }
}
@media screen and (max-width: 300px) {
  .box-btn {
    font-size: 1rem;
  }
  .pagination {
    width: 260px;
  }
  .pagination li .page-link {
    font-size: 9px;
  }
}
</style>