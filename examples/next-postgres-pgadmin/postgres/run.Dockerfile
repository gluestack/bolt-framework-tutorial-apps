# Use the official PostgreSQL Docker image as the base image
FROM postgres:latest

# Set the working directory to /app
WORKDIR /app

# Expose the default PostgreSQL port
EXPOSE 5432

# Start the PostgreSQL service
CMD ["postgres"]
