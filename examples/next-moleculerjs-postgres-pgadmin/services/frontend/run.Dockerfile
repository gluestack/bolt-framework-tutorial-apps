# Set the base image
FROM node:latest

# Set the working directory
WORKDIR /app/frontend

COPY package*.json ./


# Copy the application files
COPY . .

# Install dependencies
RUN npm install

# Expose the port
EXPOSE 3000

# Start the development server
CMD ["npm", "run", "dev"]