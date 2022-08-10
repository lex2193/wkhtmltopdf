import http from 'http';
import url from 'url';
import { spawn } from 'child_process';

const port = parseInt(process.env.PORT ?? 80),
  host = process.env.HOST ?? '127.0.0.1';

http
  .createServer((req, res) => {
    try {
      if (req.method !== 'POST') return res.writeHead(405).end();
      let query = url.parse(req.url, true).query,
        args = [];
      if (query) {
        if ('grayscale' in query) args.push('-g');
        if ('low' in query) args.push('-l');
        if ('landscape' in query) args.push('-O', 'Landscape');
      }
      let proc = spawn('wkhtmltopdf', [...args, '-q', '-', '-']);
      req.pipe(proc.stdin);
      res.writeHead(200, { 'Content-Type': 'application/pdf' });
      proc.stdout.pipe(res);
    } catch (err) {
      console.error(err);
      res.writeHead(500).end();
    }
  })
  .listen(port, host, () => console.log(`ready (http://${host}:${port})`));
