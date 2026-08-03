// ===========================
// GTA Online Collectibles Map - ИСПРАВЛЕННАЯ ВЕРСИЯ
// ===========================

// Размер карты (Убедись, что соответствует твоему изображению)
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
map.fitBounds(bounds);
map.setMaxBounds(bounds);

// ===========================
// ДАННЫЕ ПРЕДМЕТОВ (РЕАЛИСТИЧНЫЕ КООРДИНАТЫ)
// ===========================

const collectiblesData = [];

// ФИГУРКИ (100 шт) - распределены по всей карте
const figureCoords = [
    [520,380], [890,740], [1240,210], [1580,890], [1920,450],
    [2260,1120], [2600,580], [2940,1350], [3280,720], [3620,1580],
    [3960,860], [4300,1920], [4640,1040], [4980,2260], [5320,1180],
    [5660,2600], [6000,1320], [6340,2940], [6680,1460], [7020,3280],
    [7360,1600], [7700,3620], [8040,1740], [580,2060], [920,2880],
    [1260,2200], [1600,3520], [1940,2340], [2280,3860], [2620,2480],
    [2960,4200], [3300,2620], [3640,4540], [3980,2760], [4320,4880],
    [4660,2900], [5000,5220], [5340,3040], [5680,5560], [6020,3180],
    [6360,5900], [6700,3320], [7040,6240], [7380,3460], [7720,6580],
    [8060,3600], [540,3740], [880,4320], [1220,3880], [1560,4660],
    [1900,4020], [2240,5000], [2580,4160], [2920,5340], [3260,4300],
    [3600,5680], [3940,4440], [4280,6020], [4620,4580], [4960,6360],
    [5300,4720], [5640,6700], [5980,4860], [6320,7040], [6660,5000],
    [7000,7380], [7340,5140], [7680,7720], [8020,5280], [560,5420],
    [940,6200], [1320,5560], [1700,6540], [2080,5700], [2460,6880],
    [2840,5840], [3220,7220], [3600,5980], [3980,7560], [4360,6120],
    [4740,7900], [5120,6260], [5500,8240], [5880,6400], [6260,8580],
    [6640,6540], [7020,8920], [7400,6680], [7780,9260], [8160,6820],
    [600,6960], [980,7640], [1360,7100], [1740,7980], [2120,7240],
    [2500,8320], [2880,7380], [3260,8660], [3640,7520], [4020,9000]
];

figureCoords.forEach((c, i) => {
    collectiblesData.push({
        id: i + 1,
        type: 'figure',
        name: `Action Figure #${i + 1}`,
        x: c[0], y: c[1],
        videoId: 'SXe9X4rv9tc',
        videoTime: 15 + i * 3
    });
});

// КАРТЫ (54 шт)
const cardCoords = [
    [780,520], [1240,940], [1700,360], [2160,1280], [2620,640],
    [3080,1620], [3540,860], [4000,1960], [4460,1080], [4920,2300],
    [5380,1320], [5840,2640], [6300,1460], [6760,2980], [7220,1600],
    [7680,3320], [8140,1740], [700,1880], [1160,2500], [1620,2040],
    [2080,3140], [2540,2180], [3000,3480], [3460,2320], [3920,3820],
    [4380,2460], [4840,4160], [5300,2600], [5760,4500], [6220,2740],
    [6680,4840], [7140,2880], [7600,5180], [8060,3020], [740,3360],
    [1200,3980], [1660,3520], [2120,4320], [2580,3660], [3040,4660],
    [3500,3800], [3960,5000], [4420,3940], [4880,5340], [5340,4080],
    [5800,5680], [6260,4220], [6720,6020], [7180,4360], [7640,6360],
    [8100,4500], [780,4800], [1240,5420], [1700,4960]
];

cardCoords.forEach((c, i) => {
    collectiblesData.push({
        id: 101 + i,
        type: 'card',
        name: `Playing Card #${i + 1}`,
        x: c[0], y: c[1],
        videoId: 'cocR_mJ-v1U',
        videoTime: 12 + i * 3
    });
});

// LD ORGANICS (100 шт)
const weedCoords = [
    [640,1120], [1080,1680], [1520,1240], [1960,2120], [2400,1380],
    [2840,2460], [3280,1520], [3720,2800], [4160,1660], [4600,3140],
    [5040,1800], [5480,3480], [5920,1940], [6360,3820], [6800,2080],
    [7240,4160], [7680,2220], [8120,4500], [600,2560], [1040,3100],
    [1480,2680], [1920,3640], [2360,2820], [2800,3980], [3240,2960],
    [3680,4320], [4120,3100], [4560,4660], [5000,3240], [5440,5000],
    [5880,3380], [6320,5340], [6760,3520], [7200,5680], [7640,3660],
    [8080,6020], [660,4000], [1100,4600], [1540,4140], [1980,5080],
    [2420,4280], [2860,5420], [3300,4420], [3740,5760], [4180,4560],
    [4620,6100], [5060,4700], [5500,6440], [5940,4840], [6380,6780],
    [6820,4980], [7260,7120], [7700,5120], [8140,7460], [720,5440],
    [1160,6000], [1600,5560], [2040,6480], [2480,5700], [2920,6820],
    [3360,5840], [3800,7160], [4240,5980], [4680,7500], [5120,6120],
    [5560,7840], [6000,6260], [6440,8180], [6880,6400], [7320,8520],
    [7760,6540], [8200,8860], [780,6880], [1220,7440], [1660,7000],
    [2100,7920], [2540,7140], [2980,8260], [3420,7280], [3860,8600],
    [4300,7420], [4740,8940], [5180,7560], [5620,9280], [6060,7700],
    [6500,9620], [6940,7840], [7380,9960], [7820,7980], [8260,10300],
    [840,8320], [1280,8880], [1720,8440], [2160,9360], [2600,8580]
];

weedCoords.forEach((c, i) => {
    collectiblesData.push({
        id: 201 + i,
        type: 'weed',
        name: `LD Organics #${i + 1}`,
        x: c[0], y: c[1],
        videoId: 'j89qLyUPmnU',
        videoTime: 20 + i * 2
    });
});

// MEDIA STICKS (10 шт)
const stickCoords = [
    [820,1520], [2160,840], [3500,2180], [4840,1520], [6180,2860],
    [7520,1720], [880,3180], [2220,4020], [3560,4860], [4900,5720]
];

stickCoords.forEach((c, i) => {
    collectiblesData.push({
        id: 301 + i,
        type: 'stick',
        name: `Media Stick #${i + 1}`,
        x: c[0], y: c[1],
        videoId: 'N8u-aVnSYaI',
        videoTime: 10 + i * 8
    });
});

// ===========================
// НАСТРОЙКИ ИКОНОК (без изменений)
// ===========================

const typeEmojis = {
    figure: '🗿',
    card: '🃏',
    weed: '🌿',
    stick: '💿'
};

const typeNames = {
    figure: 'Фигурка',
    card: 'Игральная карта',
    weed: 'LD Organics',
    stick: 'Media Stick'
};

function createIcon(emoji, isFound = false) {
    return L.divIcon({
        className: "marker",
        html: `<div style="font-size:28px; text-shadow:0 0 8px black,0 0 15px black; transition:.2s; ${isFound ? 'opacity:0.3; filter:grayscale(1);' : ''}">${emoji}</div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
    });
}

// ===========================
// ХРАНЕНИЕ СОСТОЯНИЯ
// ===========================

let foundItems = JSON.parse(localStorage.getItem('gtaFoundItems')) || [];

function saveFoundItems() {
    localStorage.setItem('gtaFoundItems', JSON.stringify(foundItems));
}

// ===========================
// ОТРИСОВКА КАРТЫ
// ===========================

let allMarkers = [];
let currentFilter = 'all';

function renderMarkers(filter = 'all') {
    allMarkers.forEach(m => map.removeLayer(m));
    allMarkers = [];

    const counts = { figure: 0, card: 0, weed: 0, stick: 0 };
    const total = { figure: 0, card: 0, weed: 0, stick: 0 };

    collectiblesData.forEach(item => {
        total[item.type] = (total[item.type] || 0) + 1;
    });

    collectiblesData.forEach(item => {
        if (filter !== 'all' && item.type !== filter) return;

        const isFound = foundItems.includes(item.id);
        const emoji = typeEmojis[item.type];
        
        const marker = L.marker([item.y, item.x], { icon: createIcon(emoji, isFound) });

        const popupContent = `
            <div style="min-width:220px">
                <h2 style="margin-top:0">${emoji} ${item.name}</h2>
                <p style="color:#666; margin:5px 0;">Тип: ${typeNames[item.type]}</p>
                
                <button style="width:100%; padding:10px; border:none; border-radius:8px; ${isFound ? 'background:#6b7280;' : 'background:#22c55e;'} color:white; cursor:pointer; margin-bottom:8px;" onclick="toggleFound(${item.id})">
                    ${isFound ? '❌ Убрать с карты' : '✔ Отметить найденным'}
                </button>
                
                <button style="width:100%; padding:10px; border:none; border-radius:8px; background:#2563eb; color:white; cursor:pointer;" onclick="watchVideo('${item.videoId}', ${item.videoTime})">
                    🎥 Смотреть видео (${Math.floor(item.videoTime/60)}:${String(item.videoTime%60).padStart(2,'0')})
                </button>
            </div>
        `;

        marker.bindPopup(popupContent);
        marker.addTo(map);
        allMarkers.push(marker);

        if (isFound) {
            counts[item.type] = (counts[item.type] || 0) + 1;
        }
    });

    document.getElementById('count-figure').textContent = counts.figure || 0;
    document.getElementById('count-card').textContent = counts.card || 0;
    document.getElementById('count-weed').textContent = counts.weed || 0;
    document.getElementById('count-stick').textContent = counts.stick || 0;
}

// ===========================
// ФУНКЦИИ КНОПОК
// ===========================

function toggleFound(id) {
    const index = foundItems.indexOf(id);
    if (index > -1) {
        foundItems.splice(index, 1);
    } else {
        foundItems.push(id);
    }
    saveFoundItems();
    renderMarkers(currentFilter);
    map.closePopup();
}

function watchVideo(videoId, time) {
    window.open(`https://youtu.be/${videoId}?t=${time}`, '_blank');
}

function resetAll() {
    if (confirm('Уверены? Все отметки "найдено" будут сброшены!')) {
        foundItems = [];
        saveFoundItems();
        renderMarkers(currentFilter);
        map.closePopup();
    }
}

// ===========================
// ФИЛЬТРЫ
// ===========================

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        currentFilter = this.dataset.type;
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        renderMarkers(currentFilter);
    });
});

document.getElementById('reset-btn').addEventListener('click', resetAll);

document.querySelector('.filter-btn[data-type="all"]').classList.add('active');
renderMarkers('all');

// ===========================
// КООРДИНАТЫ МЫШИ (для отладки)
// ===========================

map.on("click", function(e) {
    console.log("X:", Math.round(e.latlng.lng), "Y:", Math.round(e.latlng.lat));
});

// Делаем функции глобальными
window.toggleFound = toggleFound;
window.watchVideo = watchVideo;
window.resetAll = resetAll;
