# Use node image as base
FROM node:latest

# Set the working directory inside the container
WORKDIR /usr/src/app

# Install yarn
RUN npm install yarn

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn

# Command to run the application
CMD ["yarn", "dev"]
