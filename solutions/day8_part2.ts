import { input } from "../inputs/day8";

// const input = `
// 30373
// 25512
// 65332
// 33549
// 35390
// `;

const trees: number[][] = [];

input.split("\n").forEach((line, index) => {
    if (line.length == 0) return;
    const row: number[] = [];
    line.split("").forEach((digit) => {
        row.push(parseInt(digit));
    });
    trees.push(row);
});

let max = 0;

for (let i = 0; i < trees.length; i++) {
    for (let j = 0; j < trees[i].length; j++) {
        if (i == 1 && j == 2) console.log(score(i, j));
        max = Math.max(score(i, j), max);
    }
}

console.log(max);

function score(x: number, y: number) {
    let score_td = 0;
    let score_bu = 0;
    let score_lr = 0;
    let score_rl = 0;

    // topdown
    for (let i = x - 1; i >= 0; i--) {
        score_td++;
        if (trees[i][y] < trees[x][y]) continue;
        else break;
    }

    // bottomup
    for (let i = x + 1; i < trees.length; i++) {
        score_bu++;
        if (trees[i][y] < trees[x][y]) continue;
        else break;
    }

    // leftright
    for (let i = y - 1; i >= 0; i--) {
        score_lr++;
        if (trees[x][i] < trees[x][y]) continue;
        else break;
    }

    // rightleft
    for (let i = y + 1; i < trees[x].length; i++) {
        score_rl++;
        if (trees[x][i] < trees[x][y]) continue;
        else break;
    }
    console.log(score_td, score_bu, score_lr, score_rl, x, y);

    return score_td * score_bu * score_lr * score_rl;
}
