const DataGenerator = require('./dataGenerator');

const traverse = (data) => {
    for(let key in data) {
        if (typeof data[key] === 'object') {
            traverse(data[key]);
        } else if (typeof data[key] === 'string' && /^\[Regex(?=[^\]]*\])\s*(type=("|'|)(number|string|boolean)\2|)\s*\].*?\[\/Regex\]$/.test(data[key])) {
            const target = /^\[Regex(?=[^\]]*\])\s*(type=("|'|)(number|string|boolean)\2|)\s*\](.*?)\[\/Regex\]$/.exec(data[key]);
            const dataType = target[3];
            const targetData = target[4];
            data[key] = new DataGenerator(targetData).productData();
            switch(dataType) {
                case 'number': {
                    data[key] = Number(data[key]);
                    break;
                }
                case 'boolean': {
                    data[key] = data[key] === 'true' ? true : data[key] === 'false' ? false : null;
                    break;
                }
            }
        }
    }
}

module.exports = traverse;