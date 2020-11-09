FROM node:12.18.0-alpine
LABEL pipelineName="forge-bootcamp-sampleapp" \
      pipelineKey="ZMOWPUQK" \
      offeringKey="WKEAQMTG"

RUN apk upgrade -U

EXPOSE 3000

COPY . .
WORKDIR /app
RUN ls -al
RUN yarn install

#Fix for CVE-2019-13173 and NODE-SECURITY-1184
RUN rm -rf /usr/local/lib/node_modules/npm/node_modules/fstream \ 
           /usr/local/lib/node_modules/npm/node_modules/https-proxy-agent

RUN adduser node root

RUN chmod -R 775 /app
RUN chown -R node:root /app

USER node
CMD ["npm","start"]