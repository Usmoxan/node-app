const http = require('http')
const fs = require('fs')
const multiple = require('./math')
const uuid = require('uuid')

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.end(`
<html>
<head>
<title>Send message</title>
</head>
<body>

<form action="/message" method="POST">

<input type="text" name="message">
<button>Send</button>
</form>

</body>
</html>

`)
    }

    if (req.url === '/message' && req.method === 'POST') {
        const body = []
        req.on('data', (chunk) => {
            console.log(chunk)
            body.push(chunk)
        })

        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString()
            console.log(parsedBody)
            fs.writeFileSync('message.txt', parsedBody.split('=')[1])
        })
        res.end()
    }
})


console.log(multiple(5,9))
console.log(uuid.v4())

const PORT = process.env.PORT || 3000 

server.listen(PORT, () => {
    console.log(`server ${PORT} da ishga tushdi`);
})