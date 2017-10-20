interface Person {
  name: string;
}

function greet(person: Person): void {
  console.log(`Hello, ${person.name}!`);
}

greet({ name: "Alexander Calder" });
