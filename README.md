# wkhtmltopdf

**wkhtmltopdf** with http wrapper docker container for amd64 and arm64

[![ci](https://github.com/lex2193/wkhtmltopdf/actions/workflows/docker.yml/badge.svg)](https://github.com/lex2193/wkhtmltopdf/actions/workflows/docker.yml)

The server is starting by default on localhost, port 80, this could be overrided using **HOST** and **PORT** variables.

To convert a pdf, generate a post request with the html content as body, you can also add the following parameters in query:
- **grayscale**
- **low**
- **landscape**
