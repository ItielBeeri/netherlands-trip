// --- נתוני הטיול (עודכן לתמונות מקומיות) ---
const tripData = [
    {
        id: "day1", day: "יום 1", date: "27/07/2026",
        title: "Indie Campers Amsterdam",
        coords: [52.2500301,4.6079807],
        shortDesc: "איסוף הקרוואנים וקבלת הדרכה.",
        desc: "התרגשות שיא! נפגשים כולם לאיסוף הקרוואנים מ-Indie Campers.",
        gmaps: "https://maps.app.goo.gl/7Kyz5WFtmRUnjHUD9", web: null,
        colorBg: "#9a6010", colorFg: "#f0b040",
        images: ["images/day1-1.jpg", "images/day1-2.jpg"]
    },
    {
        id: "day1-night", day: "לילה 1", date: "27/07/2026",
        title: "Campingpark de Vuurkuil",
        coords: [52.3653, 5.7667],
        shortDesc: "הלילה הראשון שלנו ביחד בקמפינג שקט",
        desc: "חניון לילה שקט ומקסים להתאפסות והתארגנות ראשונית.",
        gmaps: "https://maps.app.goo.gl/ZxmacCiJFttSrHH16", web: "https://vuurkuil.nl/",
        colorBg: "#1f7a4a", colorFg: "#4ec882",
        images: ["images/night1-1.jpg", "images/night1-2.jpg", "images/night1-3.jpg", "images/night1-4.jpg"]
    },
    {
        id: "day2", day: "יום 2", date: "28/07/2026",
        title: "Campsite Si Es-An",
        coords: [52.5938, 6.3861],
        shortDesc: "מתקדמים מזרחה וצפונה לקמפינג משפחתי",
        desc: "חניון משפחתי חמוד עם מתקנים לילדים באזור יפהפה.",
        gmaps: "https://maps.app.goo.gl/xzq4scribxZx4kMy8", web: "https://www.si-es-an.nl/",
        colorBg: "#b07a10", colorFg: "#f0c040",
        images: ["images/day2-1.jpg", "images/day2-2.jpg", "images/day2-3.jpg", "images/day2-4.jpg", "images/day2-5.jpg"]
    },
    {
        id: "day3-4", day: "ימים 3-4", date: "29-30/07/2026",
        title: "Vakantiepark Cnossen Leekstermeer",
        coords: [53.1667, 6.4333],
        shortDesc: "יומיים של רוגע על שפת האגם הצפוני",
        desc: "הזדמנות לשיט בסירה, טיולי אופניים וביקור בעיר הציורית Zwolle הסמוכה.",
        gmaps: "https://maps.app.goo.gl/MPvb85dskQfELs9YA", web: "https://www.cnossenleekstermeer.nl/",
        colorBg: "#2a6e3a", colorFg: "#5dba78",
        images: ["images/day3-1.jpg", "images/day3-2.jpg", "images/day3-3.jpg", "images/day3-4.jpg", "images/day3-5.jpg"]
    },
    {
        id: "day5-6", day: "ימים 5-6", date: "31/07-01/08/2026",
        title: "Afsluitdijk & Edam-Volendam Villa",
        coords: [52.503740, 5.021371],
        shortDesc: "חציית סכר אפסלאוטדייק המפורסם וקבלת שבת בוילה",
        desc: "נוסעים מערבה ודרומה דרך סכר האפסלאודייק. מתמקמים בוילה ענקית באזור כפרי הדייגים אדם-וולנדם לשבת מנוחה.",
        gmaps: "https://maps.app.goo.gl/aCDxCwnWoLaosPJm6", web: "https://www.airbnb.com/rooms/1970677",
        colorBg: "#0d5c7a", colorFg: "#3db8d8",
        images: ["images/day5-1.jpg","images/day5-2.jpg","images/day5-3.jpg","images/day5-4.jpg"]
    },
    {
        id: "day7", day: "יום 7", date: "02/08/2026",
        title: "Camping Le Parage",
        coords: [52.2789, 4.4984],
        shortDesc: "קמפינג אחרון באזור החוף ושדות הפרחים",
        desc: "הלילה האחרון שלנו בקרוואנים! חניון קמפינג קרוב לחוף הים.",
        gmaps: "https://maps.app.goo.gl/hLVskTkrggJhJEWp8", web: "https://sollasi.nl/en/camping-le-parage/",
        colorBg: "#6a3080", colorFg: "#c07ad8",
        images: ["images/day7-1.jpg", "images/day7-2.jpg"]
    },
    {
        id: "day8", day: "יום 8", date: "03/08/2026",
        title: "Indie Campers Amsterdam",
        coords: [52.2500301,4.6079807],
        shortDesc: "מחזירים את הקרוואנים - סיום הטיול.",
        desc: "נפרדים מהקרוואנים שליוו אותנו בטיול.",
        gmaps: "https://maps.app.goo.gl/7Kyz5WFtmRUnjHUD9", web: null,
        colorBg: "#7a2060", colorFg: "#d060a8",
        images: ["images/day1-1.jpg"]
    }
];

// --- הגדרת המפה המבוססת GPS ---
const map = L.map('map', { zoomControl: false });
L.control.zoom({ position: 'bottomleft' }).addTo(map);

// שכבה 1: המפה הגיאוגרפית (OpenStreetMap)
const realMapLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
});

// שכבה 2: המפה המאוירת
// גבולות מחושבים לפי היטל Mercator כך שהתמונה (2816×1536) תוצג ללא עיוות
const nlBounds = [[51.675, 2.803], [53.567, 7.858]];
const illustratedLayer = L.imageOverlay('map-painting.jpg', nlBounds);
illustratedLayer.addTo(map);
map.fitBounds(nlBounds);
const isMobile = window.innerWidth < 768;
if (isMobile) {
    map.once('moveend', () => { map.zoomIn(); map.once('moveend', () => map.panTo([52.9, 5.7])); });
    map.zoomIn();
} else {
    map.once('moveend', () => map.panTo([52.9, 5.7]));
}
// --- בניית מרקרים מותאמים אישית ---
const cardsContainer = document.getElementById('cards-container');
const waypoints = [];

tripData.forEach((item, index) => {
    waypoints.push(`${item.coords[1]},${item.coords[0]}`);

    // יצירת HTML מרקר מותאם - עיגול
    const markerHtml = `
        <div class="custom-marker" id="marker-${item.id}" style="--marker-color: ${item.colorBg};" onclick="openModal('${item.id}')">
            <div class="marker-circle">
                <img src="${item.images[0]}" alt="${item.title}" onerror="this.style.display='none'">
                <div class="marker-day-label">${item.day}</div>
            </div>
            <div class="marker-pin-tip"></div>
        </div>
    `;

    const isDesktop = window.innerWidth >= 768;
    const markerSize = isDesktop ? 93 : 62;
    const pinTip = isDesktop ? 13 : 9;

    const customIcon = L.divIcon({
        html: markerHtml,
        className: '',
        iconAnchor: [markerSize / 2, markerSize + pinTip],
        iconSize: [markerSize, markerSize + pinTip]
    });

    const marker = L.marker(item.coords, { icon: customIcon, zIndexOffset: (tripData.length - index) * 10 }).addTo(map);

    // --- בניית כרטיס רשימה ---
    const card = document.createElement('div');
    card.className = 'card';
    card.style.setProperty('--card-color', item.colorFg);
    card.dataset.id = item.id;
    card.innerHTML = `
        <div class="card-image-strip" style="background-image: url('${item.images[0]}')">
            <div class="card-image-overlay"></div>
            <div class="card-day-badge" style="background:${item.colorBg}">${item.day}</div>
        </div>
        <div class="card-body">
            <div class="card-date">${item.date}</div>
            <h3 class="card-title" dir="ltr">${item.title}</h3>
            <p class="card-desc">${item.shortDesc}</p>
            <button class="card-open-btn" onclick="openModal('${item.id}')">
                <span>ספר לי עוד</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
        </div>
    `;

    card.addEventListener('click', (e) => {
        if (e.target.closest('.card-open-btn')) return;
        document.querySelectorAll('.card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        map.flyTo(item.coords, 10, { duration: 1.2 });
    });

    cardsContainer.appendChild(card);
});

// --- חישוב מסלולים אמיתיים ---
const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${waypoints.join(';')}?overview=full&geometries=geojson`;

fetch(osrmUrl)
    .then(r => r.json())
    .then(data => {
        if (data.routes && data.routes[0]) {
            L.geoJSON(data.routes[0].geometry, {
                style: { color: '#e8392a', weight: 5, dashArray: '10, 8', opacity: 0.9 }
            }).addTo(map);
        }
    })
    .catch(err => console.error("Route fetch error:", err));


// --- לוגיקת החלפת המפות ---
document.getElementById('map-toggle').addEventListener('change', function (e) {
    if (e.target.checked) {
        map.removeLayer(illustratedLayer);
        realMapLayer.addTo(map);
    } else {
        map.removeLayer(realMapLayer);
        illustratedLayer.addTo(map);
    }
});


// --- לוגיקת המודאל ---
let currentImages = [];
let currentIndex = 0;

function openModal(id) {
    const data = tripData.find(item => item.id === id);
    if (!data) return;

    // highlight כרטיס מתאים
    document.querySelectorAll('.card').forEach(c => {
        c.classList.toggle('active', c.dataset.id === id);
    });

    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-dates').textContent = `${data.day} | ${data.date}`;
    document.getElementById('modal-desc').textContent = data.desc;
    document.getElementById('modal-color-bar').style.background = data.colorBg;

    currentImages = data.images || [];
    currentIndex = 0;
    updateCarouselUI();

    document.getElementById('modal-gmaps').href = data.gmaps;
    const webBtn = document.getElementById('modal-website');
    if (data.web) {
        webBtn.href = data.web;
        webBtn.style.display = 'inline-flex';
    } else {
        webBtn.style.display = 'none';
    }

    const modal = document.getElementById('detail-modal');
    modal.classList.remove('hidden');
    // small delay to trigger transition
    requestAnimationFrame(() => modal.classList.add('visible'));
}

function changeSlide(direction) {
    currentIndex += direction;
    if (currentIndex >= currentImages.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = currentImages.length - 1;
    updateCarouselUI();
}

function updateCarouselUI() {
    const imgEl = document.getElementById('modal-image');
    const counter = document.getElementById('image-counter');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');

    if (currentImages.length > 0) {
        imgEl.src = currentImages[currentIndex];
        imgEl.style.display = 'block';
        counter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
        counter.style.display = currentImages.length > 1 ? 'block' : 'none';
        const show = currentImages.length > 1 ? 'flex' : 'none';
        prevBtn.style.display = show;
        nextBtn.style.display = show;
    } else {
        imgEl.style.display = 'none';
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        counter.style.display = 'none';
    }
}

function closeModal() {
    const modal = document.getElementById('detail-modal');
    modal.classList.remove('visible');
    setTimeout(() => modal.classList.add('hidden'), 300);
}

document.getElementById('detail-modal').addEventListener('click', function (e) {
    if (e.target === this) closeModal();
});
