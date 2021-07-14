const assertEqual = require('./assert.js');
const {
  _2To10,
  _10To2,
  _2To8,
  _8To2,
  _2To16,
  _16To2,
  _10To64,
  _64To10
} = require('./baseConversion.js');

// test 2 to 10
console.log('\n---------test 2 to 10---------');
assertEqual(_2To10('0'), '0');
assertEqual(_2To10('1'), '1');
assertEqual(_2To10('100'), '4');
assertEqual(_2To10('10100'), '20');
assertEqual(_2To10('10101'), '21');
assertEqual(_2To10('1100100'), '100');
assertEqual(_2To10('0.010011001100110011001100110011001100110011001100110011'), '0.3');
assertEqual(_2To10('0.0001100110011001100110011001100110011001100110011001101'), '0.1');
assertEqual(_2To10('1111.1'), '15.5');

// test 10 to 2
console.log('\n---------test 10 to 2---------');
assertEqual(_10To2('0'), '0');
assertEqual(_10To2('1'), '1');
assertEqual(_10To2('4'), '100');
assertEqual(_10To2('20'), '10100');
assertEqual(_10To2('21'), '10101');
assertEqual(_10To2('100'), '1100100');
assertEqual(_10To2('0.5'), '0.1');
assertEqual(_10To2('0.125'), '0.001');
assertEqual(_10To2('0.3'), '0.010011001100110011001100110011001100110011001100110011');
assertEqual(_10To2('0.1'), '0.0001100110011001100110011001100110011001100110011001101');
assertEqual(_10To2('15.5'), '1111.1');

// test 2 to 8
console.log('\n---------test 2 to 8---------');
assertEqual(_2To8('0'), '0');
assertEqual(_2To8('1'), '1');
assertEqual(_2To8('10'), '2');
assertEqual(_2To8('1000'), '10');
assertEqual(_2To8('10010'), '22');
assertEqual(_2To8('1111111'), '177');
assertEqual(_2To8('0.001'), '0.1');
assertEqual(_2To8('0.101'), '0.5');
assertEqual(_2To8('0.001101'), '0.15');
assertEqual(_2To8('101.001101'), '5.15');

// test 8 to 2
console.log('\n---------test 8 to 2---------');
assertEqual(_8To2('0'), '0');
assertEqual(_8To2('1'), '1');
assertEqual(_8To2('2'), '10');
assertEqual(_8To2('10'), '1000');
assertEqual(_8To2('22'), '10010');
assertEqual(_8To2('177'), '1111111');
assertEqual(_8To2('0.1'), '0.001');
assertEqual(_8To2('0.5'), '0.101');
assertEqual(_8To2('0.15'), '0.001101');
assertEqual(_8To2('5.15'), '101.001101');

// test 2 to 16
console.log('\n---------test 2 to 16---------');
assertEqual(_2To16('0'), '0');
assertEqual(_2To16('1'), '1');
assertEqual(_2To16('10'), '2');
assertEqual(_2To16('1001'), '9');
assertEqual(_2To16('1010'), 'A');
assertEqual(_2To16('1011'), 'B');
assertEqual(_2To16('11011'), '1B');
assertEqual(_2To16('10101111'), 'AF');
assertEqual(_2To16('1001010101011110011011110111110010000'), '12ABCDEF90');
assertEqual(_2To16('0.0001'), '0.1');
assertEqual(_2To16('0.0101'), '0.5');
assertEqual(_2To16('0.1111'), '0.F');
assertEqual(_2To16('0.00010101'), '0.15');
assertEqual(_2To16('101101.00010101'), '2D.15');
assertEqual(_2To16('1001010101011110011011110111110010000.01011010101111001101111011110001'), '12ABCDEF90.5ABCDEF1');

// test 16 to 2
console.log('\n---------test 16 to 2---------');
assertEqual(_16To2('0'), '0');
assertEqual(_16To2('1'), '1');
assertEqual(_16To2('2'), '10');
assertEqual(_16To2('9'), '1001');
assertEqual(_16To2('A'), '1010');
assertEqual(_16To2('B'), '1011');
assertEqual(_16To2('1B'), '11011');
assertEqual(_16To2('AF'), '10101111');
assertEqual(_16To2('12ABCDEF90'), '1001010101011110011011110111110010000');
assertEqual(_16To2('0.1'), '0.0001');
assertEqual(_16To2('0.5'), '0.0101');
assertEqual(_16To2('0.F'), '0.1111');
assertEqual(_16To2('0.15'), '0.00010101');
assertEqual(_16To2('2D.15'), '101101.00010101');
assertEqual(_16To2('12ABCDEF90.5ABCDEF1'), '1001010101011110011011110111110010000.01011010101111001101111011110001');

// test 10 to 64
console.log('\n---------test 10 to 64---------');

// test 64 to 10
console.log('\n---------test 64 to 10---------');
assertEqual(_64To10('0'), '0');
assertEqual(_64To10('1'), '1');
assertEqual(_64To10('2'), '2');
assertEqual(_64To10('3'), '3');
assertEqual(_64To10('4'), '4');
assertEqual(_64To10('5'), '5');
assertEqual(_64To10('6'), '6');
assertEqual(_64To10('7'), '7');
assertEqual(_64To10('8'), '8');
assertEqual(_64To10('9'), '9');
assertEqual(_64To10('A'), '10');
assertEqual(_64To10('B'), '11');
assertEqual(_64To10('C'), '12');
assertEqual(_64To10('D'), '13');
assertEqual(_64To10('E'), '14');
assertEqual(_64To10('F'), '15');
assertEqual(_64To10('G'), '16');
assertEqual(_64To10('H'), '17');
assertEqual(_64To10('I'), '18');
assertEqual(_64To10('J'), '19');
assertEqual(_64To10('K'), '20');
assertEqual(_64To10('L'), '21');
assertEqual(_64To10('M'), '22');
assertEqual(_64To10('N'), '23');
assertEqual(_64To10('O'), '24');
assertEqual(_64To10('P'), '25');
assertEqual(_64To10('Q'), '26');
assertEqual(_64To10('R'), '27');
assertEqual(_64To10('S'), '28');
assertEqual(_64To10('T'), '29');
assertEqual(_64To10('U'), '30');
assertEqual(_64To10('V'), '31');
assertEqual(_64To10('W'), '32');
assertEqual(_64To10('X'), '33');
assertEqual(_64To10('Y'), '34');
assertEqual(_64To10('Z'), '35');
assertEqual(_64To10('a'), '36');
assertEqual(_64To10('b'), '37');
assertEqual(_64To10('c'), '38');
assertEqual(_64To10('d'), '39');
assertEqual(_64To10('e'), '40');
assertEqual(_64To10('f'), '41');
assertEqual(_64To10('g'), '42');
assertEqual(_64To10('h'), '43');
assertEqual(_64To10('i'), '44');
assertEqual(_64To10('j'), '45');
assertEqual(_64To10('k'), '46');
assertEqual(_64To10('l'), '47');
assertEqual(_64To10('m'), '48');
assertEqual(_64To10('n'), '49');
assertEqual(_64To10('o'), '50');
assertEqual(_64To10('p'), '51');
assertEqual(_64To10('q'), '52');
assertEqual(_64To10('r'), '53');
assertEqual(_64To10('s'), '54');
assertEqual(_64To10('t'), '55');
assertEqual(_64To10('u'), '56');
assertEqual(_64To10('v'), '57');
assertEqual(_64To10('w'), '58');
assertEqual(_64To10('x'), '59');
assertEqual(_64To10('y'), '60');
assertEqual(_64To10('z'), '61');
assertEqual(_64To10('-'), '62');
assertEqual(_64To10('_'), '63');
assertEqual(_64To10('11'), '65');
assertEqual(_64To10('af000'), '614727680');
assertEqual(_64To10('afA-2'), '614772610');
assertEqual(_64To10('ABCD-_0za'), '2863967927799652');
assertEqual(_64To10('1.1'), '1.015625');
assertEqual(_64To10('A.B'), '10.171875');
// assertEqual(_64To10('A.00x'), '10.000225067138672');

// test 64 to 10
console.log('\n---------test 64 to 10---------');
assertEqual(_10To64('0'), '0');
assertEqual(_10To64('1'), '1');
assertEqual(_10To64('2'), '2');
assertEqual(_10To64('3'), '3');
assertEqual(_10To64('4'), '4');
assertEqual(_10To64('5'), '5');
assertEqual(_10To64('6'), '6');
assertEqual(_10To64('7'), '7');
assertEqual(_10To64('8'), '8');
assertEqual(_10To64('9'), '9');
assertEqual(_10To64('10'), 'A');
assertEqual(_10To64('11'), 'B');
assertEqual(_10To64('12'), 'C');
assertEqual(_10To64('13'), 'D');
assertEqual(_10To64('14'), 'E');
assertEqual(_10To64('15'), 'F');
assertEqual(_10To64('16'), 'G');
assertEqual(_10To64('17'), 'H');
assertEqual(_10To64('18'), 'I');
assertEqual(_10To64('19'), 'J');
assertEqual(_10To64('20'), 'K');
assertEqual(_10To64('21'), 'L');
assertEqual(_10To64('22'), 'M');
assertEqual(_10To64('23'), 'N');
assertEqual(_10To64('24'), 'O');
assertEqual(_10To64('25'), 'P');
assertEqual(_10To64('26'), 'Q');
assertEqual(_10To64('27'), 'R');
assertEqual(_10To64('28'), 'S');
assertEqual(_10To64('29'), 'T');
assertEqual(_10To64('30'), 'U');
assertEqual(_10To64('31'), 'V');
assertEqual(_10To64('32'), 'W');
assertEqual(_10To64('33'), 'X');
assertEqual(_10To64('34'), 'Y');
assertEqual(_10To64('35'), 'Z');
assertEqual(_10To64('36'), 'a');
assertEqual(_10To64('37'), 'b');
assertEqual(_10To64('38'), 'c');
assertEqual(_10To64('39'), 'd');
assertEqual(_10To64('40'), 'e');
assertEqual(_10To64('41'), 'f');
assertEqual(_10To64('42'), 'g');
assertEqual(_10To64('43'), 'h');
assertEqual(_10To64('44'), 'i');
assertEqual(_10To64('45'), 'j');
assertEqual(_10To64('46'), 'k');
assertEqual(_10To64('47'), 'l');
assertEqual(_10To64('48'), 'm');
assertEqual(_10To64('49'), 'n');
assertEqual(_10To64('50'), 'o');
assertEqual(_10To64('51'), 'p');
assertEqual(_10To64('52'), 'q');
assertEqual(_10To64('53'), 'r');
assertEqual(_10To64('54'), 's');
assertEqual(_10To64('55'), 't');
assertEqual(_10To64('56'), 'u');
assertEqual(_10To64('57'), 'v');
assertEqual(_10To64('58'), 'w');
assertEqual(_10To64('59'), 'x');
assertEqual(_10To64('60'), 'y');
assertEqual(_10To64('61'), 'z');
assertEqual(_10To64('62'), '-');
assertEqual(_10To64('63'), '_');
assertEqual(_10To64('65'), '11');
assertEqual(_10To64('614727680'), 'af000');
assertEqual(_10To64('614772610'), 'afA-2');
assertEqual(_10To64('2863967927799652'), 'ABCD-_0za');
assertEqual(_10To64('1.015625'), '1.1');
// assertEqual(_10To64('10.000225067138672'), 'A.00x');


