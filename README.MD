# SwipeCarousel

**SwipeCarousel** — это легковесная JavaScript-библиотека для создания каруселей с поддержкой свайпа.

## Преимущества

1. **Поддержка свайпа (тач-событий):**

   - Работает как на мобильных устройствах, так и на десктопах.
   - Интуитивное управление с помощью жестов.

2. **Выбор анимаций:**

   - Несколько предустановленных вариантов анимации для смены слайдов.

3. **Автоматическое добавление controls**

   - Кнопки управления (вперёд/назад).
   - Кнопка "play/pausa"
   - Панель индикаторов.
   - Настройка их отображения и функциональности.

4. **Гибкая конфигурация слайдера:**

   - **Автопроигрывание:** Установка времени для автоматического пролистывания.
   - **Пауза:** Включение/отключение автопроигрывания при взаимодействии.
   - **Индикаторы:** Возможность включения или отключения прогресс-бара/точек.

5. **Управление клавиатурой:**
   - **Пробел:** Ставит на паузу или возобновляет автопроигрывание.
   - **Стрелки (влево/вправо):** Позволяют вручную переключать слайды.

# Установка

## Скачайте библиотеку и подключите её в вашем HTML-файле:

## 1. Подключение CSS

Для корректного отображения свайп-карусели необходимо подключить файл стилей в <head>

```html
<head>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
    integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
  />
  <!-- CDN font-awesome -->
  <link rel="stylesheet" href="carousel/carousel.css" />
  <!-- swipe-carousel -->
</head>
```

## 2. Создание HTML-разметки для слайдера

Добавьте разметку для карусели в ваш HTML-файл. Эта структура определяет контейнер для слайдов.

```html
<div id="my-carousel">
  <div class="slide active"><img src="#" /></div>
  <div class="slide"><img src="#" /></div>
  <div class="slide"><img src="#" /></div>
</div>
```

Объяснение:

- id="my-carousel" — Уникальный идентификатор контейнера для инициализации слайдера.
- class="slide" — Класс отдельных слайдов внутри контейнера.
- class="slide active" - Добавьте класс active к слайду, чтобы указать, какой из них будет отображаться первым

## 3. Подключение JavaScript

### 1. Создайте файл index.js и подключите его в HTML с использованием атрибута type="module"

```js
<script type="module" src="index.js"></script>
```

### 2. Импорт и инициализация карусели в index.js

В файле index.js импортируйте класс SwipeCarousel из соответствующего модуля, например, ./carousel/swipe-carousel.js. Инициализируйте карусель с нужными параметрами.

```js
import SwipeCarousel from "./carousel/swipe-carousel.js";

const myCarousel = new SwipeCarousel({
  containerID: "#my-carousel",
  slideClass: ".slide",
});
```

# Конфигурация свайп-карусели

При инициализации свайп-карусели вы можете передать объект с настройками для гибкой кастомизации её поведения и внешнего вида. Вот доступные параметры:

### Пример инициализации

```javascript
const myCarousel = new SwipeCarousel({
  containerID: "#my-carousel", // ID контейнера карусели
  slideClass: ".slide", // Класс слайдов
  interval: 2000, // Интервал автопроигрывания (в миллисекундах)
  autoplay: true, // Включить автопроигрывание
  dotsPanel: true, // Показывать индикаторы (точки)
  showBtnPlay: true, // Показывать кнопку воспроизведения/паузы
  animate: "parallax-carousel", // Тип анимации при смене слайда
});
myCarousel.init();
```

#### **containerID**

Указывает ID элемента, где размещена карусель. Это главный контейнер для всех слайдов и кнопок управления.

```javascript
containerID: "#my-carousel"; // значение по умолчанию
```

#### **slideClass**

Определяет класс, который используется для каждого слайда.

```javascript
slideClass: ".slide"; // значение по умолчанию
```

Пример другого использования:

```javascript
slideClass: ".name-slide";
```

#### **interval**

Устанавливает время (в миллисекундах) между сменой слайдов в режиме автопроигрывания.

```javascript
interval: 3000;
```

#### **autoplay**

Включает или отключает автоматическую смену слайдов.

```javascript
interval: 3000;
```

#### **dotsPanel**

Показывает или скрывает индикаторы (точки), указывающие текущий слайд.

```javascript
dotsPanel: true;
```

#### **showBtnPlay**

Показывает или скрывает кнопку воспроизведения/паузы.

```javascript
showBtnPlay: true;
```

#### **animate**

Определяет тип анимации для смены слайдов. Если не указано, слайды переключаются без анимации.
Доступные значения:

- **parallax-carousel**: Эффект параллакса.
- **fade-scale-carousel**: Эффект появления с масштабированием.
- **flip-carousel**: Эффект переворота.

Пример:

```javascript
animate: "parallax-carousel";
```

Пример:

```javascript
animate: "fade-scale-carousel";
```

Пример:

```javascript
animate: "flip-carousel";
```
