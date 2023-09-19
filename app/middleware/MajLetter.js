module.exports = {
    /* utile pour mettre a  */

    MajFirstLetter(a) { return (`${a}`).charAt(0).toUpperCase() + a.slice(1); },

    minFirstLetter(a) {
        const space = a.replace(/ /g, '');
        const minFirst = space.charAt(0).toLowerCase() + space.slice(1);
        return minFirst;
    },
};
