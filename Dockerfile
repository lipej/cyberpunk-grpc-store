FROM arm64v8/node:16-bullseye-slim

WORKDIR /home/app

COPY . ./

RUN npm install

RUN npm run build

ENV GRPC_ENTRY='http://host.docker.internal:8080'
ENV DEFAULT_PROVIDER=cielo
ENV NODE_ENV=production

CMD ["npm", "run", "start"] 
