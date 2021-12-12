FROM node:16

WORKDIR /opt/project
COPY package.json ./
COPY yarn.lock ./
RUN yarn --frozen-lockfile

COPY . .
RUN ["chmod", "+x", "./scripts/start.sh"]
CMD ./scripts/start.sh
