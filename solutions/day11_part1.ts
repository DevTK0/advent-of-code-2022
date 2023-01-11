import { input } from "../inputs/day11";
import { load } from "js-yaml";

// const input = `
// Monkey 0:
//     Starting items: 79, 98
//     Operation: new = old * 19
//     Test:
//         condition: divisible by 23
//         If true: throw to monkey 2
//         If false: throw to monkey 3

// Monkey 1:
//     Starting items: 54, 65, 75, 74
//     Operation: new = old + 6
//     Test:
//         condition: divisible by 19
//         If true: throw to monkey 2
//         If false: throw to monkey 0

// Monkey 2:
//     Starting items: 79, 60, 97
//     Operation: new = old * old
//     Test:
//         condition: divisible by 13
//         If true: throw to monkey 1
//         If false: throw to monkey 3

// Monkey 3:
//     Starting items: 74
//     Operation: new = old + 3
//     Test:
//         condition: divisible by 17
//         If true: throw to monkey 0
//         If false: throw to monkey 1
// `;

const monkey = {
    items: [],
    operation: {
        operator: "*",
        value: 19,
    },
    test: {
        divideBy: 23,
        ifTrue: 2,
        ifFalse: 3,
    },
    inspected: 0,
};

const monkeys = load(input);
const monkey_arr: any = [];

for (let i = 0; monkeys["Monkey " + i] !== undefined; i++) {
    const monkey_input = monkeys["Monkey " + i];
    const new_monkey = Object.assign({}, monkey);

    new_monkey.items = monkey_input["Starting items"]
        .toString()
        .split(", ")
        .map((item: string) => parseInt(item));
    new_monkey.operation = {
        operator: monkey_input["Operation"].split("new = old")[1].split(" ")[1],
        value: monkey_input["Operation"].split("new = old")[1].split(" ")[2],
    };
    new_monkey.test = {
        divideBy: parseInt(
            monkey_input["Test"]["condition"].split("divisible by ")[1]
        ),
        ifTrue: monkey_input["Test"]["If true"].split("throw to monkey ")[1],
        ifFalse: monkey_input["Test"]["If false"].split("throw to monkey ")[1],
    };

    monkey_arr.push(new_monkey);
}
console.log(monkey_arr);

for (let i = 0; i < 20; i++) {
    round();
    console.log(monkey_arr);
}

function round() {
    for (let i = 0; i < monkey_arr.length; i++) {
        const monkey = monkey_arr[i];

        for (let j = 0; monkey.items.length > 0; j++) {
            let item = monkey.items.shift();
            item = applyOperation(
                item,
                monkey.operation,
                monkey.operation.value
            );
            item = Math.floor(item / 3);

            if (item % monkey.test.divideBy === 0) {
                monkey_arr[monkey.test.ifTrue].items.push(item);
            } else {
                monkey_arr[monkey.test.ifFalse].items.push(item);
            }
            monkey.inspected++;
        }
    }
}

function applyOperation(item: number, operation: any, value: string) {
    switch (operation.operator) {
        case "*":
            return value == "old" ? item * item : item * parseInt(value);
        case "+":
            return item + parseInt(value);
        default:
            return item;
    }
}

function calcMonkeyBusiness() {
    const inspected_counts: number[] = [];
    monkey_arr.forEach((monkey: any) => {
        inspected_counts.push(monkey.inspected);
    });
    inspected_counts.sort((a, b) => b - a);
    return inspected_counts[0] * inspected_counts[1];
}

const monkey_business = calcMonkeyBusiness();
console.log(monkey_business);
