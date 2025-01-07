# Stage 1: Build the frontend
FROM node:18 AS build-frontend

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the frontend
RUN npm run build

# Stage 2: Build the backend
FROM node:18 AS build-backend

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the backend server code
COPY server.js ./
COPY .env ./

# Stage 3: Final stage
FROM node:18

WORKDIR /app

# Copy the built frontend from the build-frontend stage
COPY --from=build-frontend /app/dist ./dist

# Copy the backend server from the build-backend stage
COPY --from=build-backend /app/server.js ./
COPY --from=build-backend /app/.env ./

# Install serve to serve the frontend
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 5000

# Start the backend server and serve the frontend
CMD ["sh", "-c", "node server.js & serve -s dist -l 3000"]
