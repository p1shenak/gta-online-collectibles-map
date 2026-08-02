// Размер изображения карты
const imageWidth = 8192;
const imageHeight = 8192;

// Создаём карту
const map = L.map("map", {
    crs: L.CRS.Simple,
    minZoom: -2,
    maxZoom: 3,
    zoomControl: true,
    attributionControl: false
});

// Границы изображения
const bounds = [
    [0, 0],
    [imageHeight, imageWidth]
];

// Подключаем карту
L.imageOverlay("map/map.jpg", bounds).addTo(map);

// Подгоняем карту под экран
map.fitBounds(bounds);

// Ограничиваем перемещение
map.setMaxBounds(bounds);

// Пример маркера
const marker = L.marker([4000, 4000]).addTo(map);

marker.bindPopup(`
<h3>Action Figure #1</h3>

<button onclick="alert('Отмечено')">
✔ Отметить найденной
</button>

<br><br>

<button onclick="window.open('https://www.youtube.com/watch?v=SXe9X4rv9tc&t=1245s')">
🎥 Посмотреть видео
</button>
`);
