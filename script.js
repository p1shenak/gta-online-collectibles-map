// ===========================
// GTA Online Collectibles Map
// ===========================

// Размер карты (измени под свою карту при необходимости)
const MAP_WIDTH = 8192;
const MAP_HEIGHT = 8192;

// Создание карты
const map = L.map("map", {
    crs: L.CRS.Simple,
    minZoom: -2,
    maxZoom: 4,
    zoomControl: true,
    attributionControl: false
});

// Границы изображения
const bounds = [
    [0, 0],
    [MAP_HEIGHT, MAP_WIDTH]
];

// Загружаем карту
L.imageOverlay("map/map.jpg", bounds).addTo(map);

// Подгоняем карту
map.fitBounds(bounds);

// Ограничиваем перемещение
map.setMaxBounds(bounds);

// ===========================
// Эмодзи категорий
// ===========================

const icons = [
    "🗿", // Figure
    "🃏", // Card
    "🌿", // Weed
    "💿", // Media Stick
    "🔫",
    "👕",
    "💈",
    "🏠",
    "🚗",
    "✈️",
    "🚁",
    "⛽",
    "🎰",
    "🏁"
];

// ===========================
// Создание красивой иконки
// ===========================

function createIcon(emoji) {

    return L.divIcon({

        className: "marker",

        html: `
        <div style="
            font-size:28px;
            text-shadow:
                0 0 8px black,
                0 0 15px black;
            transition:.2s;
        ">
            ${emoji}
        </div>
        `,

        iconSize: [32,32],
        iconAnchor: [16,16]

    });

}

// ===========================
// Добавляем случайные маркеры
// ===========================

const markers = [];

for(let i=1;i<=300;i++){

    const x=Math.random()*MAP_WIDTH;
    const y=Math.random()*MAP_HEIGHT;

    const emoji=icons[Math.floor(Math.random()*icons.length)];

    const marker=L.marker(
        [y,x],
        {
            icon:createIcon(emoji)
        }
    );

    marker.bindPopup(`

        <div style="min-width:220px">

            <h2 style="margin-top:0">
                ${emoji} Marker #${i}
            </h2>

            <button
            style="
            width:100%;
            padding:10px;
            border:none;
            border-radius:8px;
            background:#22c55e;
            color:white;
            cursor:pointer;
            "
            onclick="found(${i})">

            ✔ Отметить найденным

            </button>

            <br><br>

            <button
            style="
            width:100%;
            padding:10px;
            border:none;
            border-radius:8px;
            background:#2563eb;
            color:white;
            cursor:pointer;
            "
            onclick="video(${i})">

            🎥 Видео

            </button>

        </div>

    `);

    marker.addTo(map);

    markers.push(marker);

}

// ===========================
// Найдено
// ===========================

function found(id){

    alert("Позже здесь будет сохранение предмета №"+id);

}

// ===========================
// Видео
// ===========================

function video(id){

    alert("Позже откроется видео для предмета №"+id);

}

// ===========================
// Координаты мыши
// ===========================

map.on("click",function(e){

    console.log(

        "X:",
        Math.round(e.latlng.lng),

        "Y:",
        Math.round(e.latlng.lat)

    );

});
