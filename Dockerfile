FROM node:16

WORKDIR /opt/project
COPY package.json ./
COPY yarn.lock ./
RUN yarn --frozen-lockfile

COPY . .
RUN ["yarn", "run", "prisma", "generate"]
RUN ["yarn", "run", "prisma", "migrate", "deploy"]
RUN ["chmod", "+x", "./scripts/start.sh"]
CMD ./scripts/start.sh
