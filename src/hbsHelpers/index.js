const path = require('path');
const helpers = {
    ifeq: function (a, b, options) {
        if (a == b) { // eslint-disable-line eqeqeq
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    },
    json: function(json, options) {
        return JSON.stringify(json);
    },
    parseHref: function (href, api) {
        return href.replace('${api}', api);
    }
}

module.exports = (hbs) => {

    hbs.registerHelper(helpers);
    hbs.registerPartials(path.join(__dirname, './../server/partials'));
    return hbs;
}