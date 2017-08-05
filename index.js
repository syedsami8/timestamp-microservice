var express = require('express');
var dateFormat = require('dateformat');
var app = express();

app.set('port',(process.env.PORT|| 5000));
app.use(express.static(__dirname +'/public'));

app.get('/', function (req, res) {
    var obj = {
        unix: null,
        natural: null
    };
    res.status(200).send(obj);
});

app.get('/:date', function (req, res) {

    var dateStr = req.params.date;
    var d, obj, result;
    //var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    if (isNaN(dateStr)) {
        //natural to epoch

        d = new Date(dateStr).getTime();
        result = d / 1000;
        obj = {
            unix: result,
            natural: dateStr
        };

    } else {
        //epoch to natural

        d = new Date(parseInt(dateStr) * 1000);
        result = dateFormat(d, "longDate");

        /* mon = d.getMonth();
        d = d.toString();
        sp = d.split(' ');
        result = months[mon] + ' ' + sp[2] + ', ' + sp[3]; */

        obj = {
            unix: parseInt(dateStr),
            natural: result
        };

    } 

    res.status(200).send(obj);

});

app.listen(app.get('port'), function () {
    console.log('Running at 5555 port!');
});
