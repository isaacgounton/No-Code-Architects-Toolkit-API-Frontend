############################
# Stage 1: Build React App #
############################
FROM node:18-alpine AS build
WORKDIR /app

# Copy dependency files
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

########################################
# Stage 2: Run server and Serve React  #
########################################
FROM node:18-alpine
WORKDIR /app

# Copy server dependencies
COPY package*.json ./
RUN npm install

# Install serve so it's already available
RUN npm install --global serve

# Copy server code and env
COPY server.cjs ./
COPY .env ./

# Copy built React app
COPY --from=build /app/dist ./dist

# Expose ports for React (3000) and server (5000)
EXPOSE 3000
EXPOSE 5000

# Set environment variable for Express server port
ENV PORT=5000

# Start Express server on 5000 and React on 3000
CMD ["sh", "-c", "node server.cjs & serve -s dist -l 3000"]