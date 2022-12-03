import { input } from "../inputs/day3";

const rucksacks = input.split("\n").filter((x) => x !== "");
let total = 0;
for (let i = 0; i < rucksacks.length; i += 3) {
    if (rucksacks[i] === "") {
    } else {
        total += diff(rucksacks[i], rucksacks[i + 1], rucksacks[i + 2]);
    }
}

console.log(total);

function diff(sack1, sack2, sack3) {
    const map1 = new Map();
    const map2 = new Map();
    for (let i = 0; i < sack1.length; i++) {
        map1.set(sack1[i], true);
    }
    for (let i = 0; i < sack2.length; i++) {
        map2.set(sack2[i], true);
    }

    for (let i = 0; i < sack3.length; i++) {
        const ch = sack3[i];
        if (map1.has(ch) && map2.has(ch)) {
            return priority(ch);
        }
    }
    return 0;
}

function priority(ch: string) {
    if (ch === ch.toUpperCase())
        return ch.charCodeAt(0) - "A".charCodeAt(0) + 27;
    else return ch.charCodeAt(0) - "a".charCodeAt(0) + 1;
}
