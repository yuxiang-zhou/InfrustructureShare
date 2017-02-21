var express = require('express');
var router = express.Router();

var sql = require('mssql');

var config = {
    user: 'sa',
    password: 'Yunnandaxue083309',
    server: '202.203.208.82',
    database: 'URP'
}

var general_query = function(dbname,tablename,row,fields,from,to,condition,handler,error_handler){

    sql.connect(config).then(function() {
        var sql_string = "SELECT * FROM (SELECT "+fields+", ROW_NUMBER() OVER (ORDER BY "+row+") as row ";
        sql_string += "FROM "+dbname+".dbo."+tablename+" WHERE "+condition+") a WHERE row >= "+from+" AND row < "+to;

        console.log(sql_string);
        new sql.Request().query(sql_string).then(function(recordset) {
            handler(recordset);
        }).catch(function(err) {
            error_handler(err);
        });

    }).catch(function(err) {
        error_handler(err);
    });
};

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('API Ducumentation');
});

// General Queries

router.get('/alldbs', function(req, res) {
    sql.connect(config).then(function() {

        new sql.Request().query('SELECT * FROM sys.databases;').then(function(recordset) {
            res.send(recordset);
        }).catch(function(err) {
            res.send(err);
        });

    }).catch(function(err) {
        res.send(err);
    });
});

router.get('/allviews/:dbname', function(req, res) {
    sql.connect(config).then(function() {
        new sql.Request().query("SELECT TABLE_NAME FROM " + req.params.dbname + ".INFORMATION_SCHEMA.VIEWS;").then(function(recordset) {
            res.send(recordset);
        }).catch(function(err) {
            res.send(err);
        });

    }).catch(function(err) {
        res.send(err);
    });
});



router.get('/alltables/:dbname', function(req, res) {
    sql.connect(config).then(function() {
        new sql.Request().query("SELECT TABLE_NAME FROM " + req.params.dbname + ".INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE';").then(function(recordset) {
            res.send(recordset);
        }).catch(function(err) {
            res.send(err);
        });

    }).catch(function(err) {
        res.send(err);
    });
});

router.get('/querytotal/:dbname/:tablename/:condition', function(req, res) {
    sql.connect(config).then(function() {
        new sql.Request().query("SELECT count(*) as total FROM "+req.params.dbname+".dbo."+req.params.tablename+" WHERE "+req.params.condition).then(function(recordset) {
            res.send(recordset);
        }).catch(function(err) {
            res.send(err);
        });

    }).catch(function(err) {
        res.send(err);
    });
});


router.get('/queryone/:dbname/:tablename/', function(req, res) {
    sql.connect(config).then(function() {
        new sql.Request().query("SELECT TOP 1 * FROM "+req.params.dbname+".dbo."+req.params.tablename).then(function(recordset) {
            res.send(recordset);
        }).catch(function(err) {
            res.send(err);
        });

    }).catch(function(err) {
        res.send(err);
    });
});

router.get('/queryall/:dbname/:tablename/', function(req, res) {
    sql.connect(config).then(function() {
        new sql.Request().query("SELECT * FROM "+req.params.dbname+".dbo."+req.params.tablename).then(function(recordset) {
            res.send(recordset);
        }).catch(function(err) {
            res.send(err);
        });

    }).catch(function(err) {
        res.send(err);
    });
});

router.get('/query/:dbname/:tablename/:row/:fields/:from/:to/:condition', function(req, res) {
    general_query(
        req.params.dbname,
        req.params.tablename,
        req.params.row,
        req.params.fields,
        req.params.from,
        req.params.to,
        req.params.condition,
        function(data){res.send(data)},
        function(err){res.send(err)}
    );
});

// Specific Queries


module.exports = router;
