function Animal(name) {
  this.name = name || 'animal';
}

function Cat() {
  this.sound = function() {
    console.log('miao~');
  }
}

Cat.prototype = new Animal();

let cat = new Cat();


console.log(Animal.prototype);