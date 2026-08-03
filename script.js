// ===========================
// GTA Online Collectibles Map
// ===========================

// Размер карты
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
// ДАННЫЕ ПРЕДМЕТОВ
// ===========================

const collectiblesData = [
    // ===== ФИГУРКИ (Action Figures) - 100 штук =====
    { id: 1, type: 'figure', name: 'Action Figure #1', x: 1200, y: 800, videoId: 'SXe9X4rv9tc', videoTime: 15 },
    { id: 2, type: 'figure', name: 'Action Figure #2', x: 2500, y: 1500, videoId: 'SXe9X4rv9tc', videoTime: 45 },
    { id: 3, type: 'figure', name: 'Action Figure #3', x: 3800, y: 2200, videoId: 'SXe9X4rv9tc', videoTime: 78 },
    { id: 4, type: 'figure', name: 'Action Figure #4', x: 4100, y: 3200, videoId: 'SXe9X4rv9tc', videoTime: 112 },
    { id: 5, type: 'figure', name: 'Action Figure #5', x: 5600, y: 1800, videoId: 'SXe9X4rv9tc', videoTime: 145 },
    { id: 6, type: 'figure', name: 'Action Figure #6', x: 6800, y: 2500, videoId: 'SXe9X4rv9tc', videoTime: 178 },
    { id: 7, type: 'figure', name: 'Action Figure #7', x: 3200, y: 4200, videoId: 'SXe9X4rv9tc', videoTime: 210 },
    { id: 8, type: 'figure', name: 'Action Figure #8', x: 4700, y: 5100, videoId: 'SXe9X4rv9tc', videoTime: 245 },
    { id: 9, type: 'figure', name: 'Action Figure #9', x: 5900, y: 3900, videoId: 'SXe9X4rv9tc', videoTime: 278 },
    { id: 10, type: 'figure', name: 'Action Figure #10', x: 7100, y: 4600, videoId: 'SXe9X4rv9tc', videoTime: 312 },
    // Добавь остальные 90 фигурок по аналогии с правильными координатами из видео
    
    // ===== ИГРАЛЬНЫЕ КАРТЫ (Playing Cards) - 54 штуки =====
    { id: 101, type: 'card', name: 'Playing Card #1', x: 1800, y: 3200, videoId: 'cocR_mJ-v1U', videoTime: 12 },
    { id: 102, type: 'card', name: 'Playing Card #2', x: 3100, y: 2800, videoId: 'cocR_mJ-v1U', videoTime: 43 },
    { id: 103, type: 'card', name: 'Playing Card #3', x: 4400, y: 3600, videoId: 'cocR_mJ-v1U', videoTime: 76 },
    { id: 104, type: 'card', name: 'Playing Card #4', x: 5200, y: 4400, videoId: 'cocR_mJ-v1U', videoTime: 109 },
    { id: 105, type: 'card', name: 'Playing Card #5', x: 6700, y: 3100, videoId: 'cocR_mJ-v1U', videoTime: 142 },
    { id: 106, type: 'card', name: 'Playing Card #6', x: 3900, y: 5100, videoId: 'cocR_mJ-v1U', videoTime: 175 },
    // Добавь остальные 48 карт с правильными координатами
    
    // ===== LD ORGANICS - 100 штук =====
    { id: 201, type: 'weed', name: 'LD Organics #1', x: 4500, y: 1200, videoId: 'j89qLyUPmnU', videoTime: 20 },
    { id: 202, type: 'weed', name: 'LD Organics #2', x: 5600, y: 3400, videoId: 'j89qLyUPmnU', videoTime: 55 },
    { id: 203, type: 'weed', name: 'LD Organics #3', x: 6800, y: 2200, videoId: 'j89qLyUPmnU', videoTime: 88 },
    { id: 204, type: 'weed', name: 'LD Organics #4', x: 2300, y: 4100, videoId: 'j89qLyUPmnU', videoTime: 122 },
    { id: 205, type: 'weed', name: 'LD Organics #5', x: 4900, y: 5300, videoId: 'j89qLyUPmnU', videoTime: 155 },
    // Добавь остальные 95 LD Organics с правильными координатами
    
    // ===== MEDIA STICKS - 10 штук =====
    { id: 301, type: 'stick', name: 'Media Stick #1', x: 6400, y: 4800, videoId: 'N8u-aVnSYaI', videoTime: 10 },
    { id: 302, type: 'stick', name: 'Media Stick #2', x: 7100, y: 5200, videoId: 'N8u-aVnSYaI', videoTime: 35 },
    { id: 303, type: 'stick', name: 'Media Stick #3', x: 1500, y: 5500, videoId: 'N8u-aVnSYaI', videoTime: 62 },
    { id: 304, type: 'stick', name: 'Media Stick #4', x: 3400, y: 6200, videoId: 'N8u-aVnSYaI', videoTime: 89 },
    { id: 305, type: 'stick', name: 'Media Stick #5', x: 5800, y: 6800, videoId: 'N8u-aVnSYaI', videoTime: 118 },
    // Добавь остальные 5 Media Sticks с правильными координатами
];

// ===========================
// ЭМОДЗИ ДЛЯ ТИПОВ
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

// ===========================
// СОЗДАНИЕ ИКОНКИ
// ===========================

function createIcon(emoji, isFound = false) {
    return L.divIcon({
        className: "marker",
        html: `
        <div style="
            font-size:28px;
            text-shadow: 0 0 8px black, 0 0 15px black;
            transition: .2s;
            ${isFound ? 'opacity:0.3; filter:grayscale(1);' : ''}
        ">
            ${emoji}
        </div>
        `,
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
// ОТРИСОВКА МАРКЕРОВ
// ===========================

let allMarkers = [];
let currentFilter = 'all';

function renderMarkers(filter = 'all') {
    // Очищаем карту
    allMarkers.forEach(m => map.removeLayer(m));
    allMarkers = [];

    // Счётчики
    const counts = { figure: 0, card: 0, weed: 0, stick: 0 };
    const total = { figure: 0, card: 0, weed: 0, stick: 0 };

    // Подсчёт общего количества
    collectiblesData.forEach(item => {
        total[item.type] = (total[item.type] || 0) + 1;
    });

    // Добавление маркеров
    collectiblesData.forEach(item => {
        if (filter !== 'all' && item.type !== filter) return;

        const isFound = foundItems.includes(item.id);
        const emoji = typeEmojis[item.type];
        
        const marker = L.marker(
            [item.y, item.x],
            { icon: createIcon(emoji, isFound) }
        );

        // Попап
        const popupContent = `
            <div style="min-width:220px">
                <h2 style="margin-top:0">${emoji} ${item.name}</h2>
                <p style="color:#666; margin:5px 0;">Тип: ${typeNames[item.type]}</p>
                
                <button 
                    style="width:100%; padding:10px; border:none; border-radius:8px; 
                           ${isFound ? 'background:#6b7280;' : 'background:#22c55e;'} 
                           color:white; cursor:pointer; margin-bottom:8px;"
                    onclick="toggleFound(${item.id})">
                    ${isFound ? '❌ Убрать с карты' : '✔ Отметить найденным'}
                </button>
                
                <button 
                    style="width:100%; padding:10px; border:none; border-radius:8px; 
                           background:#2563eb; color:white; cursor:pointer;"
                    onclick="watchVideo('${item.videoId}', ${item.videoTime})">
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

    // Обновление статистики
    updateStats(counts, total);
}

// ===========================
// ОБНОВЛЕНИЕ СТАТИСТИКИ
// ===========================

function updateStats(counts, total) {
    document.getElementById('count-figure').textContent = counts.figure || 0;
    document.getElementById('count-card').textContent = counts.card || 0;
    document.getElementById('count-weed').textContent = counts.weed || 0;
    document.getElementById('count-stick').textContent = counts.stick || 0;
}

// ===========================
// ФУНКЦИИ ДЛЯ КНОПОК
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
    const url = `https://youtu.be/${videoId}?t=${time}`;
    window.open(url, '_blank');
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
// ФИЛЬТРАЦИЯ
// ===========================

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const type = this.dataset.type;
        currentFilter = type;
        
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        renderMarkers(type);
    });
});

document.getElementById('reset-btn').addEventListener('click', resetAll);

// ===========================
// ИНИЦИАЛИЗАЦИЯ
// ===========================

document.querySelector('.filter-btn[data-type="all"]').classList.add('active');
renderMarkers('all');

// ===========================
// КООРДИНАТЫ МЫШИ (для удобства)
// ===========================

map.on("click", function(e) {
    console.log(
        "X:", Math.round(e.latlng.lng),
        "Y:", Math.round(e.latlng.lat)
    );
});

// Делаем функции глобальными
window.toggleFound = toggleFound;
window.watchVideo = watchVideo;
window.resetAll = resetAll;
