FROM alpine
ENV NODE_ENV=production
RUN apk add --update nodejs npm wkhtmltopdf
WORKDIR /app
COPY main.js package.json ./
EXPOSE 80
ENTRYPOINT ["npm", "start"]
