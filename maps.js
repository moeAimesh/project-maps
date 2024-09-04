var map = L.map('map').setView([51.1657, 10.4515], 1); // Vorläufige Koordinaten

// OpenStreetMap-Kartenebene hinzufügen
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// Funktion, um den aktuellen Standort zu finden
function findeStandort() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                var lat = position.coords.latitude;
                var lon = position.coords.longitude;

                // Karte auf die aktuelle Position zentrieren
                map.setView([lat, lon], 13); // Zoom-Level 13 für einen besseren Blick auf den Standort

                // Marker an der Position des Nutzers hinzufügen
                L.marker([lat, lon]).addTo(map)
                    .bindPopup("IS THIS YOU ?")
                    .openPopup();
            },
            function () {
                alert("Standortzugriff nicht möglich. Bitte Standortzugriff in den Browsereinstellungen erlauben.");
            }
        );
    } else {
        alert("Geolocation wird von Ihrem Browser nicht unterstützt.");
    }
}

