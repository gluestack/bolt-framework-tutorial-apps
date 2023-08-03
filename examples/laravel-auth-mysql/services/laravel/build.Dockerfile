# Set the base image
FROM php:8-fpm-alpine

# Install system dependencies
RUN apk add --no-cache curl \
    libmcrypt-dev \
    libpng-dev \
    libxml2-dev \
    libzip-dev \
    mysql-client \
    nodejs \
    npm \
    yarn

# Install PHP extensions
RUN docker-php-ext-install bcmath \
    gd \
    pdo_mysql \
    soap \
    zip

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set the working directory
WORKDIR /app

# Copy the composer files and install dependencies
COPY composer.json composer.lock ./
RUN composer install --prefer-dist --no-dev --no-scripts --no-progress --no-suggest --optimize-autoloader --no-interaction

# Copy the rest of the application
COPY . .

# Clear cache and optimize
RUN php artisan config:cache && \
    php artisan view:cache && \
    php artisan route:cache && \
    php artisan optimize

# Expose the port
EXPOSE 8000

# Start the server
CMD ["php-fpm"]