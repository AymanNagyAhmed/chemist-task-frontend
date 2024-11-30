FROM node:18-alpine

WORKDIR /usr/src/app

# Install dependencies first
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Set environment variables for better Next.js build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build the application with increased memory allocation
ENV NODE_OPTIONS="--max_old_space_size=4096"

# Build with error handling
RUN npm run build || (echo "Build failed!" && exit 1)

EXPOSE 4000

CMD ["npm", "start"] 