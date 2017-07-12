const DataGenerator = require('./dataGenerator');

const traverse = (data) => {
    for(let key in data) {
        if (typeof data[key] === 'object') {
            traverse(data[key]);
        } else if (typeof data[key] === 'string' && /^\[Regex\].*?\[\/Regex\]$/.test(data[key])) {
            const target = data[key].replace(/^\[Regex\](.*?)\[\/Regex\]$/, '$1');
            data[key] = new DataGenerator(target).productData();
        }
    }
}

module.exports = traverse;