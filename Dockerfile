FROM node:21-alpine

WORKDIR /app/pet/

# Copy package.json and yarn.lock to the working directory
COPY pet/package.json pet/yarn.lock ./


# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY ./pet ./

RUN yarn build


# Command to run your application
CMD ["yarn", "start"]