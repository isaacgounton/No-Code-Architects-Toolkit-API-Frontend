############################
# Stage 1: Build React App #
############################
FROM node:18-alpine AS build
WORKDIR /app

# Copy dependency files
COPY package*.json ./
RUN npm install

# Copy the source and build
COPY . .
RUN npm run build

########################################
# Stage 2: Run Server & Serve React App #
########################################
FROM node:18-alpine
WORKDIR /app

# Copy necessary files for the server
COPY package*.json ./
RUN npm install

COPY server.cjs ./
COPY .env ./

# Copy the built React app from the previous stage
COPY --from=build /app/dist ./dist

# Expose both ports
EXPOSE 3000
EXPOSE 5000

# Start React on 3000 and the server on 5000
CMD ["sh", "-c", "npx serve -s dist -l 3000 & node server.cjs"]