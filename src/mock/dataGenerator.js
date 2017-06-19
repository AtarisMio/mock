class Generator {
    constructor(generatorRule) {
        this.data = '';
        this.rule = generatorRule;
        this.splitRules = [];
        this.testPass = false;
    }

    test() {
        const ruleRegex = new RegExp(this.rule);
        if (this.data) {
            this.testPass = ruleRegex.test(this.data);
        }
        return this.testPass;
    }

    splitSourceRegex() {
        let splitor = split(this.rule);
        let res;
        while(res = splitor.next(),!res.done) {
            this.splitRules.push(res.value);
        }
    }
}

const a_regex_used_to_split_regex = /^(\\(d|D|s|S|w|W|u[0-9a-fA-F]{4,5}|x[0-9a-fA-F]{2})|\[\S+\]|\S|\\)(\*|\+|\?|\{\d+\,\d*\})?/;

function* split(rule) {
    let tempRule = rule;
    while(tempRule.length > 0) {
        const result = a_regex_used_to_split_regex.exec(tempRule)[0];
        if(result.length === 0) {
            console.error('may there a error!');
            yield tempRule;
            break;
        }
        yield result;
        tempRule = tempRule.substr(result.length);
    }
}

module.exports = Generator;