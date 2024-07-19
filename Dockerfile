FROM node:18-alpine

WORKDIR /app

COPY package.json package.json
COPY pnpm-lock.yaml pnpm-lock.yaml

RUN npm i -g pnpm
RUN pnpm i

COPY . .

EXPOSE 4000

RUN pnpm run build

CMD ["pnpm", "run", "start"]
