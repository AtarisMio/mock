const regulex = require('regulex');

class dataGenerator {
    constructor(regex) {
        this.AST = regulex.parse(new RegExp(regex).source).tree;
        this.__traversal = function* __traversal (current) {
            for(let node of current) {
                if (node.type === 'group') {
                    yield* __traversal(node.sub);
                } else {
                    yield node;
                }
            }
        }(this.AST);
    }

    getNext() {
        return this.__traversal.next();
    }

}

let a = new dataGenerator('var\\D\\s+([^a-z])([abcd-zA-Z_](\\w*));');
let tmp;
while(tmp=a.getNext(), !tmp.done) {
    console.log(tmp.value);
}
