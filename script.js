// Создаём карту
const map = L.map("map", {
    crs: L.CRS.Simple,
    minZoom: -2,
    maxZoom: 4,
    zoomControl: true
});

// Пока используем простое изображение-заглушку
const bounds = [
    [0, 0],
    [5000, 5000]
];

const image = L.imageOverlay(
    "https://placehold.co/5000x5000/2c2c2c/ffffff?text=GTA+Online+Map",
    bounds
);

image.addTo(map);

map.fitBounds(bounds);
