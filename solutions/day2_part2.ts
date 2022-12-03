import { input } from "../inputs/day2";

type Enemy = "A" | "B" | "C";
type Outcome = "X" | "Y" | "Z";

function val(outcome: Outcome) {
    if (outcome === "X") return 0;
    if (outcome === "Y") return 3;
    if (outcome === "Z") return 6;
    return 0;
}

const ROCK = 1;
const PAPER = 2;
const SCISSORS = 3;

function score(outcome: Outcome, enemy: Enemy) {
    // outcome LOSE
    if (outcome === "X" && enemy === "A") return SCISSORS + val(outcome);
    if (outcome === "X" && enemy === "B") return ROCK + val(outcome);
    if (outcome === "X" && enemy === "C") return PAPER + val(outcome);
    // outcome DRAW
    if (outcome === "Y" && enemy === "A") return ROCK + val(outcome);
    if (outcome === "Y" && enemy === "B") return PAPER + val(outcome);
    if (outcome === "Y" && enemy === "C") return SCISSORS + val(outcome);
    // outcome WIN
    if (outcome === "Z" && enemy === "A") return PAPER + val(outcome);
    if (outcome === "Z" && enemy === "B") return SCISSORS + val(outcome);
    if (outcome === "Z" && enemy === "C") return ROCK + val(outcome);

    return 0;
}

let total = 0;
const rounds = input.split("\n");
for (let i = 0; i < rounds.length; i++) {
    if (rounds[i] === "") {
    } else {
        const [enemy, outcome] = rounds[i].split(" ");
        total += score(outcome as Outcome, enemy as Enemy);
        total;
    }
}

console.log(total);
