var sql = require('mssql');

var config = {
    user: 'sa',
    password: 'Yunnandaxue083309',
    server: '202.203.208.82', // You can use 'localhost\\instance' to connect to named instance
    database: 'URP'

}

sql.connect(config).then(function() {
    // Query

    new sql.Request().query('select 1 a').then(function(recordset) {
        console.dir(recordset);
    }).catch(function(err) {
        // ... error checks
        console.log(err);
    });

}).catch(function(err) {
    // ... error checks
    console.log(err);
});
