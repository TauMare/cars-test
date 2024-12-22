FROM node:alpine

# Устанавливаем рабочую директорию
WORKDIR /cars

# Копируем package.json и package-lock.json
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm install

# Устанавливаем глобально Nest CLI (если требуется)
RUN npm install -g @nestjs/cli

# Копируем весь код проекта
COPY . .

# Указываем порт, на котором работает приложение
EXPOSE 3001

# Запускаем приложение
CMD ["npm", "run", "start"]
