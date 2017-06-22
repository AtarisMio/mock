class CustomRandom {
    constructor(start, end, seed = new Date().valueOf()) {
        this.setStart(start);
        this.setEnd(end);
        this.setSeed(seed);
        this.interval = this.end - this.start;
        this.generator = new LinearCongruentialGenerator(this.seed);
    }

    setStart(start) {
        if (!Number.isSafeInteger(Number.parseInt(start))) {
            throw `arguments may unsafe. start=${start};`;
        }
        this.start = Number.parseInt(start);
        return this;
    }

    setEnd(end) {
        if (!Number.isSafeInteger(Number.parseInt(end))) {
            throw `arguments may unsafe. end=${end};`;
        }
        this.end = Number.parseInt(end);
        return this;
    }

    setSeed(seed = new Date().valueOf()) {
        if (!Number.isSafeInteger(Number.parseInt(seed))) {
            throw `arguments may unsafe. end=${seed};`;
        }
        this.seed = Number.parseInt(seed);
        return this;
    }

    next() {
        return this.start + Math.ceil(this.generator.next() * this.interval);
    }
}

class LinearCongruentialGenerator {
    /**
     * 线性同余生成器的构造函数
     * @param {int} seed
     */
    constructor(seed = new Date().valueOf()) {
        this.setSeed(seed);
        this.linearCongruentialGenerator = function* () {
            while(true) {
                this.seed = (this.seed * 3661 + 30809) % 145800;
                yield this.seed / (145800.0);
            }
        }.bind(this)();
    }

    setSeed(seed = new Date().valueOf()) {
        if (!Number.isSafeInteger(Number.parseInt(seed))) {
            throw `arguments may unsafe. end=${seed};`;
        }
        this.seed = Number.parseInt(seed);
        return this;
    }

    next() {
        return this.linearCongruentialGenerator.next().value;
    }
}

module.exports = CustomRandom;
