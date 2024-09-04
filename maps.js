var map = L.map('map').setView([51.1657, 10.4515], 6); // Vorläufige Koordinaten

// OpenStreetMap-Kartenebene hinzufügen
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// Funktion, um den aktuellen Standort zu finden
function findeStandort() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                var lat = position.coords.latitude;
                var lon = position.coords.longitude;

                // Karte auf die aktuelle Position zentrieren
                map.setView([lat, lon], 13); // Zoom-Level 13 für einen besseren Blick auf den Standort

                // Marker an der Position des Nutzers hinzufügen
                L.marker([lat, lon]).addTo(map)
                    .bindPopup("IS THIS YOU ?")
                    .openPopup();
            },
            function(error) {
                // Fehlerbehandlung für Geolocation
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        alert("Benutzer hat die Standortanfrage abgelehnt.");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        alert("Standortinformationen sind nicht verfügbar.");
                        break;
                    case error.TIMEOUT:
                        alert("Die Standortanfrage ist abgelaufen.");
                        break;
                    case error.UNKNOWN_ERROR:
                        alert("Ein unbekannter Fehler ist aufgetreten.");
                        break;
                }

                // Fallback: Karte auf einen Standardort zentrieren
                map.setView([51.1657, 10.4515], 6); // Deutschland
                L.marker([51.1657, 10.4515]).addTo(map).bindPopup("Standardort: Deutschland").openPopup();
            }
        );
    } else {
        alert("Geolocation wird von Ihrem Browser nicht unterstützt.");
        // Fallback-Standort auf Deutschland setzen
        map.setView([51.1657, 10.4515], 6);
        L.marker([51.1657, 10.4515]).addTo(map).bindPopup("Standardort: Deutschland").openPopup();
    }
}

// Funktion beim Laden der Seite aufrufen
findeStandort();
