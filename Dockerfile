# Use the official Nginx image
FROM nginx:latest

# Copy static website files to the default Nginx HTML directory
COPY . /usr/share/nginx/html

# Expose the port Nginx will use
EXPOSE 8080

# Add a health check to ensure the container is running properly
HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
    CMD curl -f http://localhost:8080 || exit 1

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
