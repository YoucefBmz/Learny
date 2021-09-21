if (this.typeName !== "" || this.moduleName !== "") {
  console.log("one is empty!!");
  if (this.moduleName !== "") {
    console.log("moduleName is not empty!!");
    this.filteredArray = this.docs.filter((item) => {
      return item.Module == this.moduleName;
    });
  } else if (this.typeName !== "") {
    console.log("typeName is not empty!!");
    this.filteredArray = this.docs.filter((item) => {
      return item.type == this.typeName;
    });
  }
} else if (this.moduleName == "" && this.typeName == "") {
  console.log("both are empty!!");
  return (this.filteredArray = this.docs);
} else if (this.moduleName !== "" && this.typeName !== "") {
  console.log("no one is empty!!");
  this.filteredArray = this.docs.filter((item) => {
    //for one el :
    //return item.Module == this.moduleName;
    // for 2 el :
    return item.Module == this.moduleName || item.type == this.typeName;
  });
}
