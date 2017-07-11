const path = require('path');
const helpers = {
    ifeq: function (a, b, options) {
        if (a == b) { // eslint-disable-line eqeqeq
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    },
    parseDate: function (date) {
        if (date instanceof Date) {
            return date.toLocaleString();
        } else {
            new Date(date).toLocaleString();
        }
    },
    fallBack: function () {
        for (var i = 0; i < arguments.length - 1; i++) {
            if (arguments[i]) {
                return arguments[i];
            }
        }
    },
    json: function (json, options) {
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