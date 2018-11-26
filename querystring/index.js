const querystring = require('querystring');

// require.main === module

let q = querystring.parse('year=2017&month=february');
console.log(q.year);
let s = querystring.stringify({ year: 2018, month: 'february' });
console.log(s);
let s2 = querystring.stringify({ year: 2018, month: 'february' }, ';', ':');
console.log(s2);
