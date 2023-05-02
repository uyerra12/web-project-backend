const http = require('http')
const fs = require('fs')
const path = require('path')
const cors = require('cors')
const {MongoClient} = require('mongodb')

const uri = "mongodb+srv://ujwalayerra12:Qazmlpg@cluster0.afy83ax.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);


const server = http.createServer((req,res) =>{
    console.log(req.url);
   
    if(req.url === "/"){
        fs.readFile(path.join(__dirname,'public','index.html'), (err, content) =>{
            if(err){
                res.writeHead(404);
                res.end("Error: File not found");
            } 
            else{
                res.writeHead(200,{'content-Type':'text/html'});
                res.end(content);
            }
        });
    }
    else if(req.url === "/styles.css"){
        fs.readFile(path.join(__dirname, 'public', 'styles.css'), (err, content) =>{
            if(err) res.end("Error: File not found");
            else{
                res.writeHead(200,{'content-type' : 'text/css'});
                res.end(content);
            }
        });
    }
    else if(req.url === "/script.js"){
        fs.readFile(path.join(__dirname, 'public', 'script.js'), (err, content) =>{
            if(err) res.end("Error: File not found");
            else{
                res.writeHead(200, {'content-type' : 'text/javascript'});
                res.end(content);
            }
        })
    }
    else if(req.url === "/image_girl.png"){
        fs.readFile(path.join(__dirname, 'public', 'image_girl.png'), (err, content) =>{
            if(err) res.end("Error: File not found");
            else{
                res.writeHead(200, {'content-type': 'image/png'});
                res.end(content);
            }
        });
    }
     else if(req.url === "/api"){
       getData().then(data => {
        res.writeHead(200, {'content-type': 'application/json', 'Access-Control-Allow-Origin':'*'})
        res.end(JSON.stringify(data))
       });
     }   
    
    else
        res.end("Hi");
    
    async function getData(){
        await client.connect();
        const data = await client.db("testdb").collection("testdbcollection").find({}).toArray();
        return data;
    }
});

server.listen(5050, ()=> console.log("Server started"));