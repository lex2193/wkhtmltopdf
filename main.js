import http from 'http';
import url from 'url';
import { spawn, spawnSync } from 'child_process';

const port = parseInt(process.env.PORT ?? 80);

console.log(spawnSync('wkhtmltopdf', ['-V'], { encoding: 'utf-8' }));

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
  .listen(port, () => console.log(`ready (port ${port})`));
