<template>
  <div class="" id="prepa-container">
    <!--   -->
    <h2>master 1</h2>
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
    <div class="loader" v-if="loadingThree">
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
      loadingThree: null,
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
      return Remove_duplicate_Value;
    },
    uniqueTypes() {
      var TypesArray = [];
      for (var i = 0; i < this.docs.length; i++) {
        if (TypesArray.indexOf(this.docs[i].type.toLowerCase()) === -1) {
          TypesArray.push(this.docs[i].type);
        }
      }
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
    this.loadingThree = true;
    db.collection("masterOne")
      .get()
      .then((querySnapshot) => {
        var MasterOneDocs = [];
        querySnapshot.forEach((el) => {
          console.log(el);
          let data = {
            id: el.id,
            title: el.data().title,
            //url: el.data().url,
            Module: el.data().Module,
            type: el.data().type,
            link: el.data().link,
            level: el.data().level,
          };
          MasterOneDocs.push(data);
        });
        this.docs = MasterOneDocs;
        this.loadingThree = false;
      });
  },
};
</script>
