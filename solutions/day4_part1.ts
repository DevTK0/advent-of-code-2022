import { input } from "../inputs/day4";

const pairs = input.split("\n").filter((x) => x !== "");
let sum = 0;

for (let i = 0; i < pairs.length; i++) {
    const [a, b] = pairs[i].split(",");
    const [a1, a2] = a.split("-").map((x) => parseInt(x));
    const [b1, b2] = b.split("-").map((x) => parseInt(x));

    if (a1 >= b1 && a1 <= b2 && a2 >= b1 && a2 <= b2) {
        sum++;
    } else if (b1 >= a1 && b1 <= a2 && b2 >= a1 && b2 <= a2) {
        sum++;
    }
}

console.log(sum);
