# Use the official Bun image from the Docker Hub
# Oven is the company name, the creator of Bun
FROM oven/bun:debian

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy app files
COPY . .

# Install app dependencies
RUN bun install

# Run the application
CMD ["bun", "start"]