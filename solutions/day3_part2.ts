import { input } from "../inputs/day3";

// const input = `
// vJrwpWtwJgWrhcsFMMfFFhFp
// jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
// PmmdzqPrVvPwwTWBwg
// wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
// ttgJtRGJQctTZtZT
// CrZsJsPPZsGzwwsLwLmpwMDw
// `;

const rucksacks = input.split("\n");
let total = 0;
for (let i = 0; i < rucksacks.length; i++) {
    if (rucksacks[i] === "") {
    } else {
        const compartment1 = rucksacks[i].substring(0, rucksacks[i].length / 2);
        const compartment2 = rucksacks[i].substring(
            rucksacks[i].length / 2,
            rucksacks[i].length
        );

        total += diff(compartment1, compartment2);
    }
}

console.log(total);

function diff(compartment1, compartment2) {
    const map = new Map();
    for (let i = 0; i < compartment1.length; i++) {
        const count = map.get(compartment1[i]) | 0;
        map.set(compartment1[i], count + 1);
    }
    let sum = 0;
    for (let i = 0; i < compartment2.length; i++) {
        const ch = compartment2[i];
        if (map.has(ch)) {
            sum += priority(ch);
            map.delete(ch);
        }
    }

    return sum;
}

function priority(ch: string) {
    if (ch === ch.toUpperCase())
        return ch.charCodeAt(0) - "A".charCodeAt(0) + 27;
    else return ch.charCodeAt(0) - "a".charCodeAt(0) + 1;
}
