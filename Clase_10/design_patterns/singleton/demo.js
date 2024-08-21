import Singleton from "./DatabaseSingleton.js";

console.log(Singleton.getInstance().getRandomNumber());

const singleton1 = Singleton.getInstance();
console.log(singleton1.getRandomNumber());