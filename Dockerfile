FROM node:16-alpine


# [Required] MongoDB URL
ENV MONGO_URL="${MONGO_URL}"

# [Not Required] Only for push notifications
# Get One by ./node_modules/.bin/web-push generate-vapid-keys
ENV PUBLIC_VAPID_KEY="${PUBLIC_VAPID_KEY}"
ENV PRIVATE_VAPID_KEY="${PRIVATE_VAPID_KEY}"
ENV PORT=3000

RUN mkdir -p /usr/src/api
WORKDIR /usr/src/api

COPY package.json /usr/src/api
RUN npm install
COPY . /usr/src/api
EXPOSE ${PORT}

CMD ["node", "."]