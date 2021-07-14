module.exports = function assertEqual(a, b) {
    if (a === b) {
        console.log('Pass', a, b);
    } else {
        console.log('Not pass', a, b);
    }
}
