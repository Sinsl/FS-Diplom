# Дипломная работа профессии "Веб-разработчик"

***

## Развертывание

### Бэкенд

- создать базу данных
- открыть ide на папке backend
- указать параметры подключения к БД в файле .env.example
- выполнить миграции, команда: `php artisan migrate:fresh --seed`
- запустить бэкенд, команда: `php artisan serve`


### Фронтэнд

- открыть ide на папке frontend
- выполнить команду `npm i`
- выполнить команду `npm run dev`

В браузере открыть `http://localhost:5173`


#### Основные роуты

Страница кинозала: [`http://localhost:5173`](http://localhost:5173)

Административная панель: [`http://localhost:5173/admin`](http://localhost:5173/admin)

Страница авторизации: [`http://localhost:5173/auth`](http://localhost:5173/auth)

Пользователей в миграции нет, предусмотрена регистрация.