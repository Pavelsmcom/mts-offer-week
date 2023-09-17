[Тестовое задание МТС WEEK OFFER ](https://rabota-mts.ru/fasttrack)

[Ссылка на репозиторий:](https://github.com/Pavelsmcom/mts-offer-week)

[Ссылка на фронт:](http://185.20.227.40/)

Задание:

1. Напишите парсер(бекенд) всех публичных тарифов МТС (связь интернет, тв) по ссылке
   «Тарифы» выше по их параметрам, опциями, ценам и агрегируй в любое хранилище (от
   файлика до любой БД) или же табличное представление.
2. Реализуйте фронт, отображающий результаты, имеющиеся в хранилище и кнопку
   «Парсить», запускающую процесс обновления данных.
3. Фронт по возможности должен уметь выводить результаты парсинга с фильтрами и
   сортировкой. В идеале и он должен позволять подобрать себе нужный тариф удобным
   способом.
4. Ваше решение может быть любым по уровню исполнения от просто статического html до
   решения на React/Vue/итд - нам интересны все варианты!
5. Эталонным будет решение развренутое где-либо в сети Интернет и ссылка на репозиторий
   в github, содержащая код всех компонентов решения.

Бекенд находится в директории `backend/`, а фронтенд - в `frontend/`.

## Используемые технологии:

- JavaScript;
- Node.js;
- Express;
- Express-rate-limit;
- Express-winston;
- Helmet;
- Limiter;
- Winston;
- Axios;
- Cors;
- React;
- Reac-router;
- Sass;
- ESlint;
- clsx;
- PropTypess.

## Установка и запуск проекта:

Клонировать репозиторий:

    git clone https://github.com/Pavelsmcom/mts-offer-week.git

Перейти в папку backend или frontend

Установить зависимости:

    npm i

Запустить проект:

    npm run start

Backend - доступно 2 end-поинта:

http://158.160.64.154:3000/tariffs - получение тарифов
http://158.160.64.154:3000/parse - парсинг тарифов с сайта mts.

## Планы на доработку (не хватило времени):

- Деплой фронтенда, выпуск SSL-сертификата;
- Разбить данные по тарифам и хранить в базе данных на сервере;
- Обработать данные и отправлять JSON только с нужными полями;
- Добавить верификацию токеном;
- Сделать адаптивный дизайн;
- Добавить лоадеры;
- Вынести все переменный в отдельный файл;
- Обработать ошибки.

К сожалению, из-за нехватки времени не удалось полностью реализовать весь запланированный функционал, готов продолжить работать над проектом, если будет возможность.

Открыт к предложениям на позицию junior+ frontend разработчика, где могу поделиться своим опытом (перешёл в Web имея многолетний опыт программирования микроконтроллеров на С++ и ассемблере) и развиваться вместе с командой.

t: @ElvenSky
