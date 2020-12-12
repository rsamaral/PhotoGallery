const http = require('http');
const fs = require('fs');
const path = require('path');
const hostname = '127.0.0.1';
const PORT = process.env.PORT || 5000;
const server = http.createServer((req, res) => {
    if(req.url === '/'){
        fs.readFile('./public/index.html', 'UTF-8', (err, data) => {
            if(err){
                res.statusCode = 500;
                res.end(err.message);
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.write(data);
                res.end();
            }
        })
    
    } else if(req.url.match('\.css$')){
        var cssPath = path.join(__dirname, 'public', req.url);
        var fileStream = fs.createReadStream(cssPath, 'UTF-8');
        res.setHeader('Content-Type', 'text/css');
        fileStream.pipe(res);
    
    } else if(req.url.match('\.png$')){
        var imagePath = path.join(__dirname, 'public', req.url);
        var fileStream = fs.createReadStream(imagePath);
        res.setHeader('Content-Type', 'image/png');
        fileStream.pipe(res);
    } else {
        res.statusCode = 404;
        res.end('Página não encontrada');
    }
});

server.listen(PORT, hostname, () => {
    console.log(`Server running at http://${hostname}:${PORT}/`)
});
