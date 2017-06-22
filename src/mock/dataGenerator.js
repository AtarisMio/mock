const regulex = require('regulex');
const randomGenerator = require('./randomGenerator');
const random = new randomGenerator();

const DEFFAULT_MAXLENGTH = 20;

const dotNonMuster = {
    chars: '\u000a\u000c\u2028\u2029'
};

const digitMuster = {
    ranges: ['09']
};

const alphanumericMuster = {
    chars: '_',
    ranges: ['09','az','AZ']
}

const whitespaceMuster = {
    chars: '\u000c\u000a\u000c\u0009\u000b​\u00a0\u1680​\u180e\u2000​\u2001\u2002​\u2003\u2004​\u2005\u2006​\u2007\u2008​\u2009\u200a​\u2028\u2029​​\u202f\u205f​\u3000'
}


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

        // dev
        this.productData();

        return ;
    }

    productData() {
        this.AST.traverse((node) => {
            if (node) {
                if (node.type === 'group') {
                    this.Groups[node.num] = node;
                }
                if (node.type === 'choice') {
                    let targetBranch = node.branches[random.setBoundary(0,node.branches.length - 1).next()];
                    // 不知道会不会出现除0以外的情况 需要测试
                    node.sub = [targetBranch[0]];
                    node.type = 'group';
                }
                this.dataFactory(node);
            }
        });
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
                } else if (node.assertionType === 'AssertWordBoundary'){
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
                this.charsetFactory(node);
                break;
            case 'charset':

                break;
            default:
                return;
        }
    }

    exactDataFactory(node) {
        node.resultData = node.chars;
        this.repeatFactory(node);
    }
    charsetFactory(node) {

    }
    repeatFactory(node, type = node.type) {
        if (!node.resultData) {
            throw new Error('there should be property [\'resultData\']');
        }
        if ()
        if (node.repeat && node.repeat.min) {
            if(node.repeat.max === undefined) {
                node.resultData = node.resultData.repeat(node.repeat.min);
            } else if (Number.isFinite(node.repeat.max)) {
                node.resultData = node.resultData.repeat(random.setBoundary(node.repeat.min, node.repeat.max).next());
            } else if (node.repeat.max === Number.POSITIVE_INFINITY) {
                node.resultData = node.resultData.repeat(random.setBoundary(node.repeat.min, DEFFAULT_MAXLENGTH).next());
            } else {
                throw new Error('there may an error');
            }
        }
    }

    getNext() {
        return this.__traversal.next();
    }

}

let a = new dataGenerator('.(var|let)\\D\\s+([^a-z])([abcd-zA-Z_](\\w*));');
let tmp;
while (tmp = a.getNext(), !tmp.done) {
    console.log(tmp.value);
}
