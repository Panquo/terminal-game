FROM node:latest

# Create the directory
WORKDIR /usr/src/main



# Copy and Install
COPY package*.json .
RUN npm install

# Our precious bot
COPY . .

# Build
RUN npm run build

USER 1001

CMD ["npx", "serve", "-s", "build"]
