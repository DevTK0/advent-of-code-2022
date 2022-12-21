import { input } from "../inputs/day8";

// const input = `
// 30373
// 25512
// 65332
// 33549
// 35390
// `;

const topdown: number[][] = [];
const bottomup: number[][] = [];
const leftright: number[][] = [];
const rightleft: number[][] = [];
const trees: number[][] = [];

input.split("\n").forEach((line, index) => {
    if (line.length == 0) return;
    const row: number[] = [];
    line.split("").forEach((digit) => {
        row.push(parseInt(digit));
    });
    trees.push(row);
    topdown.push(new Array(row.length).fill(-1));
    bottomup.push(new Array(row.length).fill(-1));
    leftright.push(new Array(row.length).fill(-1));
    rightleft.push(new Array(row.length).fill(-1));
});
let count = trees.length * 2 + trees[0].length * 2 - 4;

console.log(count);

for (let i = 0; i < trees.length; i++) {
    for (let j = 0; j < trees[i].length; j++) {
        const tree = trees[i][j];

        topdown[i][j] = i == 0 ? tree : Math.max(topdown[i - 1][j], tree);
        bottomup[trees.length - i - 1][j] =
            i == 0
                ? trees[trees.length - i - 1][j]
                : Math.max(
                      bottomup[trees.length - i][j],
                      trees[trees.length - i - 1][j]
                  );
        leftright[i][j] = j == 0 ? tree : Math.max(leftright[i][j - 1], tree);
        rightleft[i][trees[i].length - j - 1] =
            j == 0
                ? trees[i][trees[i].length - j - 1]
                : Math.max(
                      rightleft[i][trees[i].length - j],
                      trees[i][trees[i].length - j - 1]
                  );
    }
}

console.log(rightleft);
console.log(bottomup);
console.log(topdown);

for (let i = 1; i < trees.length - 1; i++) {
    for (let j = 1; j < trees[i].length - 1; j++) {
        const prev = count;
        const tree = trees[i][j];

        if (topdown[i - 1][j] < tree) count++;
        else if (bottomup[i + 1][j] < tree) count++;
        else if (leftright[i][j - 1] < tree) count++;
        else if (rightleft[i][j + 1] < tree) count++;

        if (prev != count) {
            console.log(
                i,
                j,
                tree,
                count,
                topdown[i][j],
                bottomup[i][j],
                leftright[i][j],
                rightleft[i][j]
            );
        }
    }
}

console.log(count);
