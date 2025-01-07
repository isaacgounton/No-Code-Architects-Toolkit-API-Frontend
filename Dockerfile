# Stage 1: Build the React app
FROM node:18-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the React app and run the server
FROM node:18-alpine

WORKDIR /app

# Copy the built React app from the previous stage
COPY --from=build /app/dist ./dist

# Copy the server code
COPY server.cjs ./
COPY .env ./

# Install only server dependencies
RUN npm install express multer minio cors dotenv

# Expose ports
EXPOSE 3000
EXPOSE 5000

# Start both the React app and the server
CMD ["sh", "-c", "npx serve -s dist -l 3000 & node server.cjs"]