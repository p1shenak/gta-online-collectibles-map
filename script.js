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
// ДАННЫЕ ПРЕДМЕТОВ (пример)
// ===========================

const collectiblesData = [
    // Фигурки (Action Figures) - 100 штук
    { id: 1, type: 'figure', name: 'Action Figure #1', x: 1200, y: 800, videoId: 'SXe9X4rv9tc', videoTime: 15 },
    { id: 2, type: 'figure', name: 'Action Figure #2', x: 2500, y: 1500, videoId: 'SXe9X4rv9tc', videoTime: 45 },
    { id: 3, type: 'figure', name: 'Action Figure #3', x: 3800, y: 2200, videoId: 'SXe9X4rv9tc', videoTime: 78 },
    // ... добавь остальные 97 фигурок с правильными координатами из видео
    
    // Игральные карты (Playing Cards) - 54 штуки
    { id: 101, type: 'card', name: 'Playing Card #1', x: 1800, y: 3200, videoId: 'cocR_mJ-v1U', videoTime: 12 },
    { id: 102, type: 'card', name: 'Playing Card #2', x: 3100, y: 2800, videoId: 'cocR_mJ-v1U', videoTime: 43 },
    // ... добавь остальные 52 карты
    
    // LD Organics - 100 штук
    { id: 201, type: 'weed', name: 'LD Organics #1', x: 4500, y: 1200, videoId: 'j89qLyUPmnU', videoTime: 20 },
    { id: 202, type: 'weed', name: 'LD Organics #2', x: 5600, y: 3400, videoId: 'j89qLyUPmnU', videoTime: 55 },
    // ... добавь остальные 98
    
    // Media Sticks - 10 штук
    { id: 301, type: 'stick', name: 'Media Stick #1', x: 6400, y: 4800, videoId: 'N8u-aVnSYaI', videoTime: 10 },
    { id: 302, type: 'stick', name: 'Media Stick #2', x: 7100, y: 5200, videoId: 'N8u-aVnSYaI', videoTime: 35 },
    // ... добавь остальные 8
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
    card: 'Карта',
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
            transition:.2s;
            ${isFound ? 'opacity:0.3; filter:grayscale(1);' : ''}
        ">
            ${emoji}
        </div>
        `,
        iconSize: [32,32],
        iconAnchor: [16,16]
    });
}

// ===========================
// ХРАНЕНИЕ СОСТОЯНИЯ
// ===========================

// Загружаем найденные предметы из localStorage
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
    // Очищаем карту от всех маркеров
    allMarkers.forEach(m => map.removeLayer(m));
    allMarkers = [];

    // Обнуляем счётчики
    const counts = { figure: 0, card: 0, weed: 0, stick: 0 };
    const total = { figure: 0, card: 0, weed: 0, stick: 0 };

    // Считаем общее количество каждого типа
    collectiblesData.forEach(item => {
        total[item.type] = (total[item.type] || 0) + 1;
    });

    // Фильтруем и добавляем маркеры
    collectiblesData.forEach(item => {
        // Пропускаем, если не подходит под фильтр
        if (filter !== 'all' && item.type !== filter) return;

        const isFound = foundItems.includes(item.id);
        const emoji = typeEmojis[item.type];
        
        // Создаём маркер
        const marker = L.marker(
            [item.y, item.x],
            { icon: createIcon(emoji, isFound) }
        );

        // Содержимое попапа
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

        // Считаем найденные
        if (isFound) {
            counts[item.type] = (counts[item.type] || 0) + 1;
        }
    });

    // Обновляем статистику
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

// Переключение состояния "найдено"
function toggleFound(id) {
    const index = foundItems.indexOf(id);
    if (index > -1) {
        foundItems.splice(index, 1);
    } else {
        foundItems.push(id);
    }
    saveFoundItems();
    
    // Перерисовываем маркеры с текущим фильтром
    renderMarkers(currentFilter);
    
    // Закрываем попап
    map.closePopup();
}

// Открытие видео с таймкодом
function watchVideo(videoId, time) {
    const url = `https://youtu.be/${videoId}?t=${time}`;
    window.open(url, '_blank');
}

// Сброс всех найденных
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

// Навешиваем обработчики на кнопки фильтров
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const type = this.dataset.type;
        currentFilter = type;
        
        // Подсвечиваем активную кнопку
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        renderMarkers(type);
    });
});

// Кнопка сброса
document.getElementById('reset-btn').addEventListener('click', resetAll);

// ===========================
// ИНИЦИАЛИЗАЦИЯ
// ===========================

// Активируем кнопку "Все" по умолчанию
document.querySelector('.filter-btn[data-type="all"]').classList.add('active');

// Рендерим маркеры
renderMarkers('all');

// ===========================
// КООРДИНАТЫ МЫШИ (для удобства добавления)
// ===========================

map.on("click", function(e) {
    console.log(
        "X:", Math.round(e.latlng.lng),
        "Y:", Math.round(e.latlng.lat)
    );
});

// Делаем функции глобальными для доступа из HTML
window.toggleFound = toggleFound;
window.watchVideo = watchVideo;
window.resetAll = resetAll;
