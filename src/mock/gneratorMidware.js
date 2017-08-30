const vm = require('vm');
const util = require('util');
const DataGenerator = require('./dataGenerator');

const traverse = (data, query, body, username) => {
    for (let key in data) {
        if (typeof data[key] === 'object') {
            traverse(data[key], query, body, username);
        } else if (typeof data[key] === 'string' && /^\[Regex(?=[^\]]*\])\s*(type=("|'|)(number|string|boolean)\2|)\s*\].*?\[\/Regex\]$/.test(data[key])) {
            const target = /^\[Regex(?=[^\]]*\])\s*(type=("|'|)(number|string|boolean)\2|)\s*\](.*?)\[\/Regex\]$/.exec(data[key]);
            const dataType = target[3];
            const targetData = target[4];
            data[key] = new DataGenerator(targetData).productData();
            switch (dataType) {
                case 'number': {
                    data[key] = Number(data[key]);
                    break;
                }
                case 'boolean': {
                    data[key] = data[key] === 'true' ? true : data[key] === 'false' ? false : null;
                    break;
                }
            }
        } else if (typeof data[key] === 'string' && /^\[Script\].*?\[\/Script\]$/.test(data[key])) {
            const targetScript = data[key].replace(/^\[Script\](.*?)\[\/Script\]$/, '$1');
            const sandBox = Object.assign({ ret: '', query, body });
            const script =
            `ret = (function(query, body){
                try{
                    ${targetScript}
                } catch (e) {
                    return \`\${e.name}: \${e.message}\`;
                }
            })(query, body);`;
            vm.runInNewContext(script, sandBox);
            data[key] = sandBox.ret;
            console.debug('name =', username, ';script =`', script, '`;query =',query, ';body =', body, ';return =', data[key]);            
        }
    }
};

module.exports = traverse;