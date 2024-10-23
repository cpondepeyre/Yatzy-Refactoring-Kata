export default class Yatzy {
    private dices: number[];
    private dicesByValue: Map<number, number>;
    private pairs: number[];

    constructor(...args: number[]) {
        if (this.checkArg(...args)) {
            this.dices = [...args];
            this.dicesByValue = this.countBy();
            this.pairs = Array.from(this.dicesByValue.entries())
                .filter(entry => entry[1] >= 2)
                .map(entry => entry[0])
                .sort()
        } else {
            throw new Error("Fuck off");
        }
    }

    public yatzy = (): number => this.dices.every(dice => dice === this.dices[0]) ? 50 : 0;

    public scorePair = (): number => this.pairs.length ? this.pairs[this.pairs.length - 1] * 2 : 0;

    public twoPair = (): number => this.pairs.length >= 2 ?
        this.pairs[this.pairs.length - 1] * 2 + this.pairs[this.pairs.length - 2] * 2 : 0;

    static four_of_a_kind(_1: number, _2: number, d3: number, d4: number, d5: number): number {
        var tallies;
        tallies = [0, 0, 0, 0, 0, 0, 0, 0];
        tallies[_1 - 1]++;
        tallies[_2 - 1]++;
        tallies[d3 - 1]++;
        tallies[d4 - 1]++;
        tallies[d5 - 1]++;
        for (let i = 0; i < 6; i++) if (tallies[i] >= 4) return (i + 1) * 4;
        return 0;
    }

    static three_of_a_kind(d1: number, d2: number, d3: number, d4: number, d5: number): number {
        var t;
        t = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        t[d1 - 1]++;
        t[d2 - 1]++;
        t[d3 - 1]++;
        t[d4 - 1]++;
        t[d5 - 1]++;
        for (let i = 0; i < 6; i++) if (t[i] >= 3) return (i + 1) * 3;
        return 0;
    }

    static smallStraight(d1: number, d2: number, d3: number, d4: number, d5: number): number {
        var tallies;
        tallies = [0, 0, 0, 0, 0, 0, 0];
        tallies[d1 - 1] += 1;
        tallies[d2 - 1] += 1;
        tallies[d3 - 1] += 1;
        tallies[d4 - 1] += 1;
        tallies[d5 - 1] += 1;
        if (tallies[0] == 1 && tallies[1] == 1 && tallies[2] == 1 && tallies[3] == 1 && tallies[4] == 1) return 15;
        return 0;
    }

    static largeStraight(d1: number, d2: number, d3: number, d4: number, d5: number): number {
        var tallies;
        tallies = [0, 0, 0, 0, 0, 0, 0, 0];
        tallies[d1 - 1] += 1;
        tallies[d2 - 1] += 1;
        tallies[d3 - 1] += 1;
        tallies[d4 - 1] += 1;
        tallies[d5 - 1] += 1;
        if (tallies[1] == 1 && tallies[2] == 1 && tallies[3] == 1 && tallies[4] == 1 && tallies[5] == 1) return 20;
        return 0;
    }

    static fullHouse(d1: number, d2: number, d3: number, d4: number, d5: number): number {
        var tallies;
        var _2 = false;
        var i;
        var _2_at = 0;
        var _3 = false;
        var _3_at = 0;

        tallies = [0, 0, 0, 0, 0, 0, 0, 0];
        tallies[d1 - 1] += 1;
        tallies[d2 - 1] += 1;
        tallies[d3 - 1] += 1;
        tallies[d4 - 1] += 1;
        tallies[d5 - 1] += 1;

        for (i = 0; i != 6; i += 1)
            if (tallies[i] == 2) {
                _2 = true;
                _2_at = i + 1;
            }

        for (i = 0; i != 6; i += 1)
            if (tallies[i] == 3) {
                _3 = true;
                _3_at = i + 1;
            }

        if (_2 && _3) return _2_at * 2 + _3_at * 3;
        else return 0;
    }

    private checkArg = (...args: number[]): boolean => args.length === 5;

    public chance = (): number => this.sum();

    public ones = (): number => this.sum(1);

    public twos = (): number => this.sum(2);

    public threes = (): number => this.sum(3);

    public fours = (): number => this.sum(4);

    public fives = (): number => this.sum(5);

    public sixes = (): number => this.sum(6);

    private sum = (filter?: number): number =>
        this.dices
            .filter((dice) => filter === undefined || dice === filter)
            .reduce((acc, current) => acc + current, 0);

    private countBy = (): Map<number, number> =>
        this.dices.reduce((acc, current) => {
            acc.set(current, (acc.get(current) || 0) + 1);
            return acc;
        }, new Map<number, number>());
}
