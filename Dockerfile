# Multi-stage Dockerfile for dukan-link-client (Next.js)

# Stage 1: Dependencies - Install dependencies
FROM node:22-alpine AS deps

# Install pnpm
RUN npm install -g pnpm@latest

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Stage 2: Builder - Build Next.js application
FROM node:22-alpine AS builder

# Install pnpm
RUN npm install -g pnpm@latest

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Copy .env file for build-time variables
COPY .env .env

# Load environment variables from .env file and export them
# Use local DNS to avoid network issues
RUN set -a && \
    . .env && \
    set +a && \
    pnpm run build

# Stage 3: Runner - Production image
FROM node:22-alpine AS runner

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@latest

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Set NODE_ENV to production
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copy necessary files from builder
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

# Copy public directory (IMPORTANT: static files like images, fonts)
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Copy standalone build files
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

# Expose application port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})" || exit 1

# Start the application
CMD ["node", "server.js"]