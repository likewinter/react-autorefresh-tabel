var Utils = {
    spliceBy(str, num) {
        var r = new RegExp('.{1,' + num  + '}', 'g');

        return str.match(r);
    }
}

module.exports = Utils;
