const regulex = require('regulex');
const randomGenerator = require('./randomGenerator');
const random = new randomGenerator(0,10);

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
        this.parseAST = this.parseAST.bind(this);
        this.AST = regulex.parse(new RegExp(regex).source).tree;
        this.parseAST(this.AST);
        this.__traversal = function* __traversal(current) {
            for (let node of current) {
                switch (node.type) {
                    case 'choice':

                        break;
                    case 'group':
                        yield* __traversal(node.sub);
                        break;
                    case 'backref':
                        continue;
                    default:
                        break;
                }
            }
        }(this.AST);
    }

    parseAST(tree) {
        let previousIndex = 0;
        let currentIndex = 1;
        while (previousIndex <= tree.length) {
            let previousValue = tree[previousIndex];
            let currentValue = tree[currentIndex];

            previousIndex++;
            currentIndex++;
        }
        tree.reduce((prevVal, currentVal) => {
            switch (currentVal.type) {
                case 'backref':
                    prevVal.refTimes = currentVal.num;
                    break;
                case 'choice':
                    currentVal.sub = [currentVal.branches[random.setEnd(currentVal.branches.length).next()]];
                    currentVal.type = 'group';
                    this.parseAST(currentVal.sub);
                    break;
                case 'group':
                    this.parseAST(currentVal.sub);
                    break;
                default:
                    break;
            }
            return currentVal;
        })
    }

    getNext() {
        return this.__traversal.next();
    }

}

let a = new dataGenerator('(var|let)\\D\\s+([^a-z])([abcd-zA-Z_](\\w*));');
let tmp;
while (tmp = a.getNext(), !tmp.done) {
    console.log(tmp.value);
}
