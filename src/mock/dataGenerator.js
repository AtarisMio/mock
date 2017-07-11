const regulex = require('regulex');
const randomGenerator = require('./../utils/randomGenerator');
const random = new randomGenerator();
const Ranges = require('range-calculator');
const DEFFAULT_MAXLENGTH = 20;

const dotRanges = [[0x0, 0x9], [0xb, 0xb], [0xd, 0x2027], [0x202a, 0xffff]];
// const dotNotRanges = [[0xa, 0xa], [0xc, 0xc], [0x2028, 0x2029]];
const digitRanges = [[0x30, 0x39]];
const digitNotRanges = [[0x0, 0x2f], [0x3a, 0xffff]];
const alphanumericRanges = [[0x30, 0x39], [0x41, 0x5a], [0x5f, 0x5f], [0x61, 0x7a]];
const alphanumericNotRanges = [[0x0, 0x2f], [0x3a, 0x40], [0x5b, 0x5e], [0x60, 0x60], [0x7b, 0xffff]];
const whitespaceRanges = [[0x9, 0xc], [0x20, 0x20], [0xa0, 0xa0], [0x1680, 0x1680], [0x180e, 0x180e], [0x2000, 0x200b], [0x2028, 0x2029], [0x202f, 0x202f], [0x205f, 0x205f], [0x3000, 0x3000]];
const whitespaceNotRanges = [[0, 0x8], [0xd, 0x1f], [0x21, 0x9f], [0xa1, 0x167f], [0x180f, 0x1fff], [0x200c, 0x2027], [0x202a, 0x202e], [0x2030, 0x205e], [0x2060, 0x2fff], [0x3001, 0xffff]];

/**
AST:
    Node = { // Base Node interface
        type: NodeType,      // Node type string
        raw: String,         // Raw regex string
        repeat: {
            min: Int, max: Int,  // Repeat times. [min,max] means "{min,max}".
            // Set max=Infinity forms a "{min,}" range
            // Set max=undefined forms a "{min}" range
            nonGreedy: Boolean // If this repeat is non-greedy,viz. had a "?" quantifier
        },
        indices: [Int, Int]   // Raw string in original regex index range [start,end)
        // You can use regexStr.slice(start,end) to retrieve node.raw string
    }
    NodeType = exact | dot | charset | choice | empty | group | assert | backref
    ExactNode = { // Literal match chars string
        type: "exact",
        chars: "c",
        raw: "c{1,2}"   // When repeat or escape,raw will diff from chars
    }
    DotNode = { type: "dot" } //viz. "." , dot match any char but newline "\n\r"
    // Because of IgnoreCase flag,
    // The client code need to compute disjoint ranges itself.
    CharsetNode = {
        type: "charset",
        exclude: Boolean,   // True only if it is "[^abc]" form
        classes: [Char],  // Named character classes. e.g. [\d].
        // All names: d(Digit),D(Non-digit),w,W,s,S
        chars: String,      // Literal chars. e.g. [abc] repr as 'abc'
        ranges: [Range]     // Range: a-z repr as 'az'
    }
    ChoiceNode = {
        type: "choice",
        branches: [[Node]] // Choice more branches,e.g. /a|b|c/
    }
    EmptyNode = {  // This node will match any input,include empty string
        type: "empty" //new RegExp("") will give an empty node. /a|/ will give branches with an empty node
    }
    GroupNode = {
        type: "group",
        nonCapture: false, // true means:"(?:abc)",default is false
        num: Int, // If capture is true.It is group's int index(>=1).
        endParenIndex: Int, // /(a)+/ will generate only one node,so indices is [0,4],endParenIndex is 3
        sub: [Node]   // Sub pattern nodes
    }
    AssertNode = {
        type: "assert",
        assertionType: String, //See Assertion Type Constants
        sub: [Node]            //Optional,\b \B ^ $ Assertion this property is empty
    }
    Only AssertLookahead, AssertNegativeLookahead has `sub` property
    "(?=(abc))" repr as {
        type: "assert", assertionType: AssertLookahead,
        sub: [{
            type: "group",
            sub: [{ type: "exact", raw: "abc" }]
        }]
    }
    BackrefNode = {
        type: "backref",
        num: Int     // Back references index.Correspond to group.num
    }
*/

class dataGenerator {
    constructor(regex) {
        if (typeof regex === 'string') {
            regex = new RegExp(regex);
        }
        this.AST = regulex.parse(regex.source);
        this.Groups = [];
    }

    productData() {
        this.AST.traverse(node => {
            if (node) {
                node.resultData = '';
                if (node.type === 'group') {
                    this.Groups[node.num] = node;
                }
                if (node.type === 'choice') {
                    let targetBranch = node.branches[random.setBoundary(0, node.branches.length - 1).next()];
                    // 不知道会不会出现除0以外的情况 需要测试
                    node.sub = [targetBranch[0]];
                    node.type = 'group';
                }
                this.repeatFactory(node, this.dataFactory.bind(this));
            }
        });
        return (function DFS_traverse(nodes) {
            let tmp = '';
            nodes.map((node) => {
                if (node.sub) {
                    tmp += node.resultData = DFS_traverse(node.sub);
                } else {
                    tmp += node.resultData;
                }
                if (node.type === 'backref') { // 响应bcakref的引用情况
                    tmp += node.resultData = this.Groups[node.num].resultData;
                }
            });
            return tmp;
        }).bind(this)(this.AST.tree);
    }

    dataFactory(node, type = node.type) {
        switch (type) {
            case 'choice':
                throw new Error('there shouldn\'t be type of [\'choice\']');
            case 'exact':
                this.exactDataFactory(node);
                break;
            case 'empty':
                node.chars = '';
                node.type = 'exact';
                this.exactDataFactory(node);
                break;
            case 'assert':
                if (node.assertionType === 'AssertLookahead') {
                    node.type = 'group';
                } else if (node.assertionType === 'AssertWordBoundary') {
                    node.chars = ' ';
                    node.type = 'exact';
                    this.exactDataFactory(node);
                } else {
                    // 暂时当成empty来处理
                    node.chars = '';
                    node.type = 'exact';
                    this.exactDataFactory(node);
                }
                break;
            case 'dot':
                if (node.classes) {
                    node.classes.push('.');
                } else {
                    node.classes = ['.'];
                }
                this.charsetFactory(node);
                break;
            case 'charset':
                this.charsetFactory(node);
                break;
            case 'group':
                // todo
                break;
            default:
                return;
        }
    }

    exactDataFactory(node, chars = node.chars) {
        if (node.resultData) {
            node.resultData += chars;
        } else {
            node.resultData = chars;
        }
    }

    charsetFactory(node) {
        let r = new Ranges(-1, -1);
        node.ranges && node.ranges.reduce((pre, cur) => pre.add([cur.charCodeAt(0), cur.charCodeAt(1)]), r);
        node.chars && node.chars.split('').map(v => r.add([v.charCodeAt(0), v.charCodeAt(0)]));
        node.classes && node.classes.map(c => {
            switch (c) {
                case 'd':
                    digitRanges.map(r.add.bind(r));
                    break;
                case 'D':
                    digitNotRanges.map(r.add.bind(r));
                    break;
                case 'w':
                    alphanumericRanges.map(r.add.bind(r));
                    break;
                case 'W':
                    alphanumericNotRanges.map(r.add.bind(r));
                    break;
                case 's':
                    whitespaceRanges.map(r.add.bind(r));
                    break;
                case 'S':
                    whitespaceNotRanges.map(r.add.bind(r));
                    break;
                case '.':
                    dotRanges.map(r.add.bind(r));
                    break;
                default:
                    console.log('Unknow class \\' + c);
                    break;
            }
        });
        if (node.exclude) {
            let tmp = new Ranges(0, 0xffff);
            r.ranges.map(tmp.sub.bind(tmp));
            r = tmp;
        }
        r.sub([-1, -1]);
        // 选取生成在哪个range
        const rangeNum = random.setBoundary(0, r.ranges.length - 1).next();
        const targetRange = r.ranges[rangeNum];
        if (targetRange[0] === targetRange[1]) {
            return this.exactDataFactory(node, String.fromCharCode(targetRange[0]));
        }
        return this.exactDataFactory(node, String.fromCharCode(random.setBoundary(targetRange[0], targetRange[1]).next()));
    }

    repeatFactory(node, handle, type = node.type) {
        if (!node.resultData) {
            node.resultData = '';
        }
        if (node.repeat && node.repeat.min) {
            let targetTime = node.repeat.min;
            if (node.repeat.max === undefined) {
                targetTime = node.repeat.min;
            } else if (Number.isFinite(node.repeat.max)) {
                targetTime = random.setBoundary(node.repeat.min, node.repeat.max).next();
            } else if (node.repeat.max === Number.POSITIVE_INFINITY) {
                targetTime = random.setBoundary(node.repeat.min, DEFFAULT_MAXLENGTH).next();
            } else {
                throw new Error('there may an error');
            }
            for (let i = 0; i < targetTime; i++) {
                handle(node);
            }
        } else {
            handle(node);
        }
    }

}

let a = new dataGenerator('(你好){2}');

for(let i=0;i<10;i++){
    let r = a.productData();
    console.log(r);
    console.log(r, r.split('').reduce((i,c)=>i+=' '+c.charCodeAt(0).toString(16),''));
}

module.exports = dataGenerator;