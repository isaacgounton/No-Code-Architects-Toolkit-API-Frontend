FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3006

ENV PORT 3006
ENV HOSTNAME "0.0.0.0"
ENV NODE_ENV production

# Start the application
CMD ["npm", "start"]
