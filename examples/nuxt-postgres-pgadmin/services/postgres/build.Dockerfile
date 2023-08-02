# Use the official PostgreSQL Docker image as the base image
FROM postgres:latest

# Set the working directory to /app
WORKDIR /app

# Create a volume to persist the database data
VOLUME /var/lib/postgresql/data

# Expose the default PostgreSQL port
EXPOSE 5432

# Start the PostgreSQL service
CMD ["postgres"]
