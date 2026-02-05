# Этап 1: Сборка React приложения
FROM node:18-alpine AS build

WORKDIR /app

# Копируем package files
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем исходники
COPY . .

# Собираем production build
RUN npm run build

# Этап 2: Nginx для раздачи статики
FROM nginx:alpine

# Копируем собранное приложение
COPY --from=build /app/dist /usr/share/nginx/html

# Копируем конфигурацию nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт
EXPOSE 80

# Nginx запустится автоматически
CMD ["nginx", "-g", "daemon off;"]