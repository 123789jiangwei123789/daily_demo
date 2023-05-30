// 小说明：
// 关于实例，原型对象，原型链，构造函数，显式原型，隐式原型，instanceOf的解释及关联
// （1）实例通过new 构造函数生成出来的
// （2）原型对象也叫原型，及实例对象的内部__proto__属性（隐式原型）所指向的对象，
// 同样构造函数的prototype属性（显示原型）所指向的对象，可得二者相等，指向同一个地址
// （3）构造函数原型对象的constructor所指向的函数即构造函数本身，
// 另外构造函数具有显示原型，实例具有隐式原型。原型对象有对应的构造函数
// （4）原型链即为实例对象通过__proto__找到对应原型对象，当前原型对象通过__proto__往上面找它的原型对象，以此类推，
// 所形成的链即为原型链
// instanceof的原理就是实例对象的__proto__和构造函数的prototype是否指向同一个地址，
// 另外这条原型链上的所有构造函数的prototype和实例对象的__proto__都指向同一个地址

// 总结：
// 每个构造函数都有一个指向原型对象的指针
// 原型对象上包含着一个指向构造函数的指针
// 而实例都包含着一个指向原型对象的内部指针


//1、原型链继承
// function Animal() {
//   this.colors = ["black", "yellow"];
// }
// Animal.prototype.getColor = function () {
//   return this.colors;
// };
// function Dog() { }
// Dog.prototype = new Animal(); //让Dog类继承Animal类
// Dog.prototype.constructor = Dog//需要重置Dog的构造函数
// console.log(Dog.prototype.__proto__ === Animal.prototype);
// let dog1 = new Dog();
// dog1.colors.push("pink");
// let dog2 = new Dog();
// console.log(dog2.colors);

//问题：
// （1）原型中包含的引用类型属性会被所有实例共享;
//  (2) 子类在实例化的时候不能给父类构造函数传参;


//2、借用构造函数实现继承
// function Animal(name) {
//   this.name = name;
//   this.colors = ["hhhh"];
//   this.getName = function () {
//     return this.name;
//   };
// }
// function Dog(name) {
//   Animal.call(this, name); //关键点
// }
// Dog.prototype = new Animal();//Dog原型指向了Animal的实例
// Dog.prototype.constructor = Dog//需要重置Dog的构造函数
// console.log(Dog.prototype.__proto__ === Animal.prototype);
// let dog1 = new Dog();
// dog1.colors.push("pink");
// let dog2 = new Dog();
// console.log(dog2.colors);
//解决的问题：
//引用类型共享问题以及传参问题;
// 问题：会导致每次创建子类实例都会创建一遍方法

// 3、寄生式组合继承
// function Animal(name) {
//     console.log(22);
//     this.name = name;
//     this.colors = [];
// }
// function Dog(name) {
//     Animal.call(this, name);
// }

// function F() {
//     console.log(11);
// }
// F.prototype = Animal.prototype;
// let f = new F();
// f.constructor = Dog;
// Dog.prototype = f;
// let dog1 = new Dog();
// dog1.colors.push("pink");
// let dog2 = new Dog();
// console.log(dog2.colors);




// or
// Dog.prototype =  Object.create(Animal.prototype)//小科普：Object.create() 方法用于创建一个新对象，使用现有的对象（Animal.prototype）来作为新创建对象的原型（prototype）
// Dog.prototype.constructor = Dog
// let dog1 = new Dog("翠花");
// dog1.color.push("橘黄色");
// let dog2 = new Dog("小红");
// console.log(dog2.color, "11");


// 4、class继承
// class Animal {
//   constructor(name) {
//     this.name = name;
//   }
//   getName() {
//     return this.name;
//   }
// }
// extends相当于Dog.prototype.__proto__ = Animal.prototype
// class Dog extends Animal {
//   constructor(name, age) {
//     super(name);//相当于前面构造函数写的call
//     this.age = age;
//   }
// }
// let dog1 = new Dog("旺财", "8");
// console.log(dog1);
//总而言之
// js中的继承，就是把子类（构造函数）的原型指向父类的一个实例。






// 小练习
// 题目
// person1.__proto__ 是什么？
// Person.__proto__ 是什么？
// Person.prototype.__proto__ 是什么？
// Object.__proto__ 是什么？
// Object.prototype.__proto__ 是什么？






// var FunctionExample = function () {}

// Object.prototype.a = function() {}

// Function.prototype.b = function() {}

// var f = new FunctionExample();

// 这时候f能否访问到a和b ??



// 所有普通对象都源于这个Object.prototype对象，只要是对象，都能通过原型链访问到a

// f.__proto__ === FunctionExample.prototype;

// FunctionExample.prototype.__proto__ === Object.prototype;
// 取b我们可通过 f.constructor.b就能访问到b，因为 f.constructor == FunctionExample

// f.constructor === FunctionExample;

// FunctionExample.__proto__ === Function.prototype;
// console.log(f) // FunctionExample {}
// console.log(f.constructor)  // [Function: FunctionExample]
// console.log(FunctionExample.prototype) // FunctionExample {}, 其实可以理解成FunctionExample.prototype就是一个实例
// console.log(FunctionExample.prototype.constructor) // [Function: FunctionExample]
// console.log(f.__proto__) // FunctionExample {} , 可以这么理解，实例的proto指向它的构造函数的原型对象，也就是f.__proto__ == FunctionExample.prototype
// console.log(f.constructor.b) // Function，因为f.constructor指向 FunctionExample, 而 FunctionExample.prototype相当是Function的一个实例，所以在Function.prototype上有个b函数，FunctionExample照样可以访问的到
// console.log(f.constructor.prototype.__proto__); // { a: [Function] } 可以访问到a函数，因为f.constructor.prototype其实就是等于FunctionExample {}，而每个对象都有个__proto__属性，Function.prototype.__proto__ == Object.prototype，所以也能访问到a方法





// 答案
// 1 : person1.__proto__ === Person.prototype (person1的构造函数Person)

// 2 : Person.__proto__ === Function.prototpye (Person的构造函数Function)

// 3 : Person.prototype.__proto__  === Object.prototype (Person.protyotype是一个普通对象，因为一个普通对象的构造函数都是Object)

// 4 : Object.__proto__ === Function.prototpye (Object的构造函数Function)

// 5 : Object.prototype.__proto__ === null (Object.prototype 也有__proto__属性，但是它比较特殊，是null，null处于原型链的顶端。)