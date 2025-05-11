# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files first (for caching)
COPY package*.json ./
COPY client/package*.json ./client/
COPY server/package*.json ./server/

# Install dependencies
RUN npm install
RUN cd client && npm install
RUN cd server && npm install

# Copy all files (except those in .dockerignore)
COPY . .

# Create empty .env if missing
RUN touch .env

# Expose ports
EXPOSE 3000 5000

# Start the app
CMD ["npm", "run", "dev"]