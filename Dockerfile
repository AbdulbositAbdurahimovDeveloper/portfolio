# --- 1-BOSQICH: Build muhiti ---
# Biz Node.js'ning yengil versiyasidan "quruvchi" sifatida foydalanamiz
FROM node:18-alpine AS builder

# Ishchi papkani yaratamiz
WORKDIR /app

# package.json va package-lock.json fayllarini nusxalaymiz
COPY package*.json ./

# Kerakli kutubxonalarni o'rnatamiz
RUN npm install

# Butun loyiha kodini nusxalaymiz
COPY . .

# Loyihani production uchun "yig'amiz"
RUN npm run build


# --- 2-BOSQICH: Yakuniy muhit ---
# Biz Nginx'ning juda yengil versiyasidan veb-server sifatida foydalanamiz
FROM nginx:1.23-alpine

# "builder" bosqichida yaratilgan 'build' papkasini Nginx'ning
# HTML fayllari uchun mo'ljallangan papkasiga nusxalaymiz
COPY --from=builder /app/build /usr/share/nginx/html

# Nginx'ni React Router bilan to'g'ri ishlashi uchun sozlaymiz
# (Bu qadam agar sizda bir nechta sahifa bo'lsa kerak bo'ladi, hozircha ixtiyoriy)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 80-portni tashqi dunyoga ochamiz
EXPOSE 80

# Nginx'ni ishga tushiramiz
CMD ["nginx", "-g", "daemon off;"]