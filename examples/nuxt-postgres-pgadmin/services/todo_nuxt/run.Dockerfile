# Set the base image
FROM node:latest

# Set the working directory
WORKDIR /app

# Copy the application files
COPY . .

# Install dependencies
RUN npm install

# Build the Nuxt.js project
RUN npm run build

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

# Expose the port
EXPOSE 3000

# Start the development server
CMD ["npm", "run", "start"]
