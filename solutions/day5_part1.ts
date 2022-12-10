import { layout } from "../inputs/day5";
import { moves } from "../inputs/day5";

// const layout = `
//     [D]
// [N] [C]
// [Z] [M] [P]
//  1   2   3
//  `;

// const moves = `
// move 1 from 2 to 1
// move 3 from 1 to 3
// move 2 from 2 to 1
// move 1 from 1 to 2
// `;

const stack_arr: string[][] = [];

layout.split("\n").forEach((line) => {
    if (line !== "") {
        let index = 0;
        for (let i = 1; i < line.length; i += 4, index++) {
            const stack = stack_arr[index] || [];
            if (line[i] === " ") {
            } else if (line[i].match(/[A-Z]/)) {
                const ch = line[i];
                stack.unshift(ch);
            }
            stack_arr[index] = stack;
        }
    }
});

console.log(stack_arr);

moves.split("\n").forEach((line) => {
    if (line !== "") {
        const [_, amount, __, from, ___, to] = line.split(" ");
        const from_index = parseInt(from) - 1;
        const to_index = parseInt(to) - 1;
        const stack_from = stack_arr[from_index];
        const stack_to = stack_arr[to_index];

        for (let i = 0; i < parseInt(amount); i++) {
            const ch = stack_from.pop() as string;
            stack_to.push(ch);
        }
    }
});

let result = "";

stack_arr.forEach((stack) => {
    const top = stack.pop();
    result += top;
});

console.log(result);
