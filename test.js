class Person {
    constructor(name, age) {
        // 在每个实例上都有
        this.name = name
        this.age = age
        this.sing = function() {
            console.log("sing");
        }
        console.log(this.constructor.staticState)
    }
    // 每个实例都有，相当于在constructor上初始化，但是不需要构造时的参数
    state = {
        category: 'people'
    }
    // 在原型上
    study() {
        console.log(this)
        console.log("study");
    }
    write = () => {
        // 箭头函数内的this直接引用定义箭头函数的上下文对象，即对应实例
        console.log(this)
        console.log('in write arrow')
    }
    // 在类上(Person构造函数上)
    static staticCreate() {
        return new Person()
    }
    static staticState = {
        staticProp: '11111'
    }
}

let p1 = new Person('aa', 19)
// console.log(Person.staticState)