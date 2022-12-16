FROM node:18-alpine

#ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD false
RUN apk update && apk add --no-cache nmap && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
    apk update && \
    apk add --no-cache \
      chromium \
      harfbuzz \
      "freetype>2.8" \
      ttf-freefont \
      nss

COPY . .

WORKDIR /src

RUN npm install

WORKDIR /src/node_modules/puppeteer
RUN npm run install

WORKDIR /src/csgo-lc-frontend

RUN npm install

WORKDIR /

WORKDIR /src

EXPOSE 3000

ENV RUNTIME docker

CMD ["npm", "run", "prod"]