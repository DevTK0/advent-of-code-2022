import { input } from "../inputs/day1";

const arr = input.split("\n");

let sum = 0;
let max = 0;
arr.forEach((item, index) => {
    if (item === "") sum = 0;
    else {
        sum += parseInt(item);
        if (sum > max) max = sum;
    }
});

console.log(max);
