# SwipeCarousel

**SwipeCarousel** — это легковесная JavaScript-библиотека для создания каруселей с поддержкой свайпа.

## Установка

### 1. Скачайте библиотеку и подключите её в вашем HTML-файле:

```html
<head>
  <!-- Подключение CSS файла для стилизации слайдера -->
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
    integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
  />
  <!-- CDN font-awesome -->
  <link rel="stylesheet" href="carousel/carousel.css" />
  <!-- базовые стили carousel -->
</head>
<body>
  <script src="index.js" type="module"></script>
  <!-- Основной js файл Вашего проэкта, обязательно  type="module -->
</body>
```

### 2. Создание HTML-разметки для слайдера

Добавьте разметку для карусели в ваш HTML-файл. Эта структура определяет контейнер для слайдов.

```html
<div id="my-carousel" class="carousel">
  <div class="carousel-container">
    <div class="slide active">Слайд 1</div>
    <div class="slide">Слайд 2</div>
    <div class="slide">Слайд 3</div>
    <div class="slide">Слайд 4</div>
    <div class="slide">Слайд 5</div>
  </div>
</div>
```

Объяснение:

- id="my-carousel" — Уникальный идентификатор контейнера для инициализации слайдера.
- class="carousel" — Класс контейнера. Может быть использован для стилизации.
- class="slide" — Класс отдельных слайдов внутри контейнера.
- class="slide active" - Добавьте класс active первому слайду, чтобы указать, какой из них будет отображаться первым

### 3. Инициализация слайдера в index.js

```js
// Импорт библиотеки SwipeCarousel
import SwipeCarousel from "./carousel/swipe-carousel.js";

// Инициализация карусели с настройками
const carousel = new SwipeCarousel({
  containerID: "#my-carousel", // ID контейнера слайдера, (Обязательно Уникальный)
  slideClass: ".slide", // Класс слайдов
  interval: 2000, // Интервал переключения слайдов (мс) (по умолчанию 2000 мс)
  autoplay: false, // Включение/отключение автопрокрутки (по умолчанию true)
  dotsPanel: false, // Показывать ли индикаторы (по умолчанию true)
  showBtnPlay: false, // Показывать ли кнопку Play/Stop (по умолчанию true)
});

// Запуск карусели
carousel.init();
```

#### Пример: Default Слайдер

```js
const myCarousel = new SwipeCarousel({
  containerID: "#my-carousel-2",
});

myCarousel.init();
```

## Преимущества

### Поддержка управления с клавиатуры

#### Коды клавиш:

- ArrowRight — для переключения на следующий слайд.
- ArrowLeft — для переключения на предыдущий слайд.
- Space — для приостановки или возобновления автопрокрутки.
