# ----------------------------
# Stage 1: Build Angular App
# ----------------------------
FROM node:21-alpine AS build

WORKDIR /app

# Copy package files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application source
COPY . .

# Build Angular app (adjust if project name differs)
RUN npm run build -- --configuration=production

# ----------------------------
# Stage 2: Nginx Server
# ----------------------------
FROM nginx:alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy Angular build output to nginx
COPY --from=build /app/dist/angular-ecommerce /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
