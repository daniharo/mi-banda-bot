FROM node:16

WORKDIR /opt/project
COPY package.json ./
COPY yarn.lock ./
RUN yarn --frozen-lockfile

COPY . .
RUN ["yarn", "run", "prisma", "generate"]
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait
RUN ["chmod", "+x", "./scripts/start.sh"]
CMD /wait && ./scripts/start.sh
