import { input } from "../inputs/day1";

const arr = input.split("\n");

let sum = 0;
let sorted: number[] = [];
arr.forEach((item, index) => {
    if (item === "") {
        sorted.push(sum);
        sum = 0;
    } else {
        sum += parseInt(item);
    }
});
sorted.sort((a, b) => a - b);

let top3 = 0;
for (let i = sorted.length - 1; i >= sorted.length - 3; i--) {
    top3 += sorted[i];
}
console.log(top3);
