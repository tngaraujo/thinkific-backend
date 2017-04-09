//importando o módulo express e criando uma app.
var express = require('express');
var bodyParser = require('body-parser');
var deasync = require('deasync');

/////////////////
//////////STARTUP
/////////////////

var sqlite3 = require('sqlite3').verbose();
//var db = new sqlite3.Database(':memory:');
var db = new sqlite3.Database('test.db');

var videos = [];
var videodata = "";
 
db.serialize(function() {
  db.run("CREATE TABLE videos (id INTEGER PRIMARY KEY, videodef TEXT, youtubeid TEXT)",function(err,row){
      console.log(err);
  });
 
  /*
  var stmt = db.prepare("INSERT INTO videos VALUES (NULL,?,NULL)");
      stmt.run("{\"questions\":[{\"question\":\"What regions had slaves?\",\"answers\":[{\"text\":\"Only North.\",\"correct\":false},{\"text\":\"Only South\"},{\"text\":\"Both\",\"correct\":true}],\"time\":7.854475868392944},{\"question\":\"What was the Civil War about?\",\"answers\":[{\"text\":\"Slavery\",\"correct\":true},{\"text\":\"Economy collapse\"}],\"time\":48.51654391607666}],\"thumbnail\":\"https://i.ytimg.com/vi/pDW3fp4vF3o/default.jpg\",\"time\":48.51654391607666,\"title\":\"Roots: The Civil War and Its Legacy | History\",\"description\":\"Historians and experts look at the role of slavery in the Civil War\",\"youtubeid\":\"pDW3fp4vF3o\"}");
  stmt.finalize();
  */
  
    db.each("SELECT rowid AS id, videodef FROM videos", function(err, row) {
        videos.push(row.videodef);
        //console.log(JSON.stringify(videos));
    });

 
  
});
 
//db.close();

app = express();
app.use(bodyParser.json());

//
app.all('/*', function(req, res, next) {
//res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Origin", "*");
  //res.header('Access-Control-Allow-Headers: Access-Control-Allow-Origin, Origin, Content-Type, X-Auth-Token , Authorization');
  res.header('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');
  //res.header('Access-Control-Allow-Headers', 'Content-Type');
  
  next();
});

///////////////////
///////// FUNCTIONS
///////////////////

/*
app.post('/public/checktoken', function(req,res){
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    console.log(checktoken(token));
    res.json(checktoken(token));
});
*/


app.post('/getvideodata', function(req,res){
    videodata="";
    var yid = req.body.youtubeid;
    yid = "\"" + yid + "\"";
    var done2 = false;
        var sqlstmtget = "SELECT * FROM videos WHERE youtubeid = '"+yid+"'";
        db.get(sqlstmtget,
                function (err, row) {
                    console.log("alcancou");
                    console.log(err);
                    console.log(row);
                    row.videodef = row.videodef.replace("questions","\"questions");
                    videodata = row;
                    done2 = true;
                });
        require('deasync').loopWhile(function(){return !done2;});
        res.send(videodata);

});

app.get('/videos',function(req,res,next){
    console.log("Querying Videos...");
    videos = [];

    var done = false;
    db.each("SELECT rowid AS id, videodef FROM videos", function(err, row) {
        videos.push(row.videodef.replace("questions","\"questions"));
        done = true;
    });
    require('deasync').loopWhile(function(){return !done;});

        console.log(JSON.stringify(videos));
        res.send("{\"videos\":" + JSON.stringify(videos) + "}");
        //res.send("{" + JSON.stringify(videos) + "}");
        //res.send(JSON.stringify(videos));
    
});

app.post('/savevideo', function(req,res){
    console.log(req.body);
    var mybody = JSON.stringify(req.body).replace("\""," ").replace("'"," ");
    
    var sqlstmt = "INSERT INTO videos (id, videodef, youtubeid) VALUES (NULL,'" +mybody+ "','" + JSON.stringify(req.body.youtubeid) + "')";
    //console.log(sqlstmt);
      db.run(sqlstmt);
          
//          console.log(req.body);
//          console.log(req.body.youtubeid);   
    res.json('{"status":"OK"}');
});

/*      
                res.send('{ "data" : ' + JSON.stringify(recordset) + '}');
      


      }).catch(function(err) {
            console.log(err);
            sql.close();
          });
 });
 */



/// INITIALIZE WEB SERVER
var server = app.listen(3000);
console.log('Servidor iniciado na porta %s', server.address().port);





