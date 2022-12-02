import { input } from "../inputs/day2";

type Enemy = "A" | "B" | "C";
type Player = "X" | "Y" | "Z";

function val(player: Player) {
    if (player === "X") return 1;
    if (player === "Y") return 2;
    if (player === "Z") return 3;
    return 0;
}

const WIN = 6;
const DRAW = 3;
const LOSE = 0;

function score(player: Player, enemy: Enemy) {
    // Player Rock
    if (player === "X" && enemy === "A") return DRAW + val(player);
    if (player === "X" && enemy === "B") return LOSE + val(player);
    if (player === "X" && enemy === "C") return WIN + val(player);
    // Player Paper
    if (player === "Y" && enemy === "A") return WIN + val(player);
    if (player === "Y" && enemy === "B") return DRAW + val(player);
    if (player === "Y" && enemy === "C") return LOSE + val(player);
    // Player Scissors
    if (player === "Z" && enemy === "A") return LOSE + val(player);
    if (player === "Z" && enemy === "B") return WIN + val(player);
    if (player === "Z" && enemy === "C") return DRAW + val(player);

    return 0;
}

let total = 0;
const rounds = input.split("\n");
console.log(rounds);
for (let i = 0; i < rounds.length; i++) {
    if (rounds[i] === "") {
    } else {
        const [enemy, player] = rounds[i].split(" ");
        total += score(player as Player, enemy as Enemy);
    }
}

console.log(total);
