FROM node:11.14.0-alpine
WORKDIR /app
RUN apk --no-cache --virtual build-dependencies add make gcc g++ python
RUN yarn global add node-gyp 
COPY .npmrc* package.json* yarn.lock* ./
RUN yarn install --force
RUN apk del build-dependencies
COPY . .
RUN mkdir ./reports 
CMD ["yarn","start"]