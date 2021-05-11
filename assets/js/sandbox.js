const obj ={
  name:"Denis",
  age:19,
  isAgree: undefined,
  course: null,
  someArray:[1,2,3],

  get userName(){
    return this.name;
  },
  get userAge(){
    return this.age;
  },
   getName(){
     return this.name;
   },
   getAge(){
     return this.age;
   }
};

const serializedObj = JSON.stringify(obj);
console.log(serializedObj);
const recovered = JSON.parse(serializedObj);
console.log(recovered);
