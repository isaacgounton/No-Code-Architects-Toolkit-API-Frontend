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
EXPOSE 3005

# Install serve
RUN npm install -g serve

# Serve the application
CMD ["serve", "-s", "dist", "-l", "3005"]
