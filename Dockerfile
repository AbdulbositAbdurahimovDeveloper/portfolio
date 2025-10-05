# --- 1-BOSQICH: Build muhiti ---
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# --- 2-BOSQICH: Yakuniy muhit ---
FROM nginx:1.23-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
# Keraksiz qator olib tashlandi yoki sharhga olindi
# COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]