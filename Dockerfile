# ---- PureMeds Admin Panel (Web Tier) ----
# Stage 1: build the React/Vite app
FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Vite bakes these in at build time. Publishable keys are public by design;
# secret keys NEVER go here.
ARG VITE_API_URL=/api/v1/admin
ARG VITE_CLERK_PUBLISHABLE_KEY
ENV VITE_API_URL=$VITE_API_URL \
    VITE_CLERK_PUBLISHABLE_KEY=$VITE_CLERK_PUBLISHABLE_KEY

RUN npm run build

# Stage 2: serve static files with Nginx (small final image, no Node/source code)
FROM nginx:1.27-alpine

# Official nginx image runs envsubst on /etc/nginx/templates/*.template at start-up
COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html

# Where Nginx forwards /api calls (ECS Service Connect name, or compose service name)
ENV BACKEND_HOST=backend:8000

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -qO- http://localhost/healthz || exit 1
