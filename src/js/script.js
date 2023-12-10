'use strict';

const logoIcon = document.querySelector('#logo-icon');
const spinner = document.querySelector('#loader');
const instructions = document.querySelector('#instructions');
const errorMessageOne = document.querySelector('#message-line-one');
const errorMessageTwo = document.querySelector('#message-line-two');
const form = document.querySelector('#form');
const formIcon = document.querySelector('#form-icon');
const input = document.querySelector('#input-comment');
const inputCategory = document.querySelector('#input-category');
const inputType = document.querySelector('#input-type');
const locationsContainer = document.querySelector('#locations');
const btnReset = document.querySelector('#btn-reset');

gsap.registerPlugin(TextPlugin);

class Location {
    id = Date.now().toString();

    constructor(coords, category, type, comment) {
        this.coords = coords; // [lat, lng]
        this.category = category;
        this.type = type;
        this.comment = comment;
        this._getCity(this.coords);
        this._setDate();
    }

    _getCity(coords) {
        const URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

        this.city = fetch(`${URL}?latitude=${coords[0]}&longitude=${coords[1]}`)
            .then(response => response.json())
            .then(data => {
                if (data.countryCode && data.city) this.city = `${data.city}, ${data.countryCode}`;
                else if (data.countryCode && data.locality) this.city = `${data.locality}, ${data.countryCode}`;
                else this.city = '';
            });
    }

    _setDate() {
        const date = new Date();
        const day = `${date.getDate()}`.padStart(2, 0);
        const month = `${date.getMonth() + 1}`.padStart(2, 0);
        const year = `${date.getFullYear()}`.substring(2);
        this.formattedDate = `${month}/${day}/${year}`;
    }
}

class App {
    #map;
    #mapZoomLevel = 12.5;
    #mapEvent;
    #mapBlueMarkerLayer = L.layerGroup([]);
    #mapPinkMarkerLayer = L.layerGroup([]);
    #mapYellowMarkerLayer = L.layerGroup([]);
    #locations = [];

    constructor() {
        this._animateLogoIcon();
        this._getUserPosition();
        this._getLocalStorage();

        inputCategory.addEventListener('change', this._toggleFormIcon);
        form.addEventListener('submit', this._createNewLocation.bind(this));
        locationsContainer.addEventListener('click', this._moveToMarker.bind(this));
        btnReset.addEventListener('click', this._reset);
    }

    _getUserPosition() {
        spinner.className = 'rotate';

        if (navigator.geolocation)
            navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), this._showErrorMessage);
    }

    _loadMap(position) {
        const { latitude, longitude } = position.coords;
        const currentCoords = [latitude, longitude];

        this._setMap(currentCoords);

        spinner.className = 'hidden';

        if (this.#locations.length) {
            this.#locations.map((location) => {
                const { markerId } = this._createLocationMarker(location.coords, location.category, location.comment, location.city);
                location.markerId = markerId;
            });
        }
        else this._showInstructions();

        const { locationMarker: currentPositionMarker } = this._createLocationMarker(currentCoords);
        currentPositionMarker.addTo(this.#map).openPopup();

        this.#map.on('click', this._showForm.bind(this));
    }

    _setMap(coords) {
        const grayMode = L.tileLayer(
            'https://api.maptiler.com/maps/streets-v2-light/{z}/{x}/{y}.png?key=ACyWV3ohWcvQoWZtofXf',
            {
                maxZoom: 20,
                attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
            }
        );
        const darkMode = L.tileLayer(
            'https://api.maptiler.com/maps/streets-v2-dark/{z}/{x}/{y}.png?key=ACyWV3ohWcvQoWZtofXf',
            {
                maxZoom: 20,
                attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
            }
        );
        const basicMode = L.tileLayer(
            'https://api.maptiler.com/maps/streets-v2-pastel/{z}/{x}/{y}.png?key=ACyWV3ohWcvQoWZtofXf',
            {
                maxZoom: 20,
                attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
            }
        );
        const baseLayers = {
            '<span class="category-type-label">Gray</span>': grayMode,
            '<span class="category-type-label">Dark</span>': darkMode,
            '<span class="category-type-label">Basic</span>': basicMode,
        };
        const overlays = {
            '<span class="category-type-label">Blue</span>': this.#mapBlueMarkerLayer,
            '<span class="category-type-label">Pink</span>': this.#mapPinkMarkerLayer,
            '<span class="category-type-label">Yellow</span>': this.#mapYellowMarkerLayer,
        };

        this.#map = L.map('map', {
            attributionControl: false,
            zoomControl: false,
            layers: [grayMode, this.#mapBlueMarkerLayer, this.#mapPinkMarkerLayer, this.#mapYellowMarkerLayer],
            center: coords,
            zoom: this.#mapZoomLevel,
        });

        L.control.attribution({ position: 'bottomleft' }).addTo(this.#map);
        L.control.zoom({ position: 'bottomright' }).addTo(this.#map);
        L.control.layers(baseLayers, overlays, { 
            collapsed: false, 
            position: 'topright', 
        }).addTo(this.#map);
    }

    _createNewLocation(e) {
        e.preventDefault();

        const { lat, lng } = this.#mapEvent.latlng;

        const newLocation = new Location(
            [lat, lng],
            inputCategory.value,
            inputType.value,
            input.value.trim()
        );

        newLocation.city.then(() => {
            const { markerId } = this._createLocationMarker(
                newLocation.coords,
                newLocation.category,
                newLocation.comment,
                newLocation.city
            );
            newLocation.markerId = markerId;

            this._renderNewLocation(newLocation);
            this._hideForm();

            if (!this.#locations.length) this._showButton();

            this.#locations.push(newLocation);
            this._setLocalStorage();
        });
    }

    _renderNewLocation(location) {
        const html = `
            <li id='${location.id}' class='location-category-${location.category}'>
                <span>${location.type[0].toUpperCase()}${location.type.slice(1)}</span>
                <p>${location.comment || location.city || 'No comment'}</p>
                <span>${location.formattedDate}</span>
            </li>
        `;

        form.insertAdjacentHTML('afterend', html);
    }

    _createLocationMarker(coords, category = 'orange', comment, city) {
        const markerTitle = category === 'orange' ? 'Current Location Marker' : city ? `Location Marker, ${city}` : 'Location Marker';
        const popupContent = category === 'orange' ? 'Your current location' : comment ? comment : 'No comment';

        const icon = L.icon({
            iconUrl: `src/img/icons/icon-${category}.png`,
            iconSize: [22, 50],
            iconAnchor: [11, 48],
            popupAnchor: [-5, -47],
        });

        const marker = L.marker(coords, {
            icon: icon,
            title: markerTitle,
            alt: markerTitle,
            riseOnHover: true,
        });

        const popup = L.popup({
            maxWidth: 300,
            minWidth: 75,
            className: `location-popup-${category}`,
            content: popupContent.substring(0, 49) + '...'
        });

        const locationMarker = marker.bindPopup(popup);
        let markerId;

        if (category === 'blue') 
            markerId = this._addMarkerOnMap(locationMarker, this.#mapBlueMarkerLayer);
        else if (category === 'pink')
            markerId = this._addMarkerOnMap(locationMarker, this.#mapPinkMarkerLayer);
        else if (category === 'yellow')
            markerId = this._addMarkerOnMap(locationMarker, this.#mapYellowMarkerLayer);

        return { locationMarker, markerId };
    }

    _addMarkerOnMap(marker, mapLayer) {
        marker.addTo(mapLayer).openPopup();

        return mapLayer.getLayerId(marker);
    }

    _moveToMarker(e) {
        const locationEl = e.target.closest('li');

        if (!locationEl) return;

        const selectedLocation = this.#locations.find(
            (location) => location.id === locationEl.id
        );

        if (selectedLocation.category === 'blue')
            this._openMarkerPopup(selectedLocation.markerId, this.#mapBlueMarkerLayer);
        else if (selectedLocation.category === 'pink')
            this._openMarkerPopup(selectedLocation.markerId, this.#mapPinkMarkerLayer);
        else if (selectedLocation.category === 'yellow')
            this._openMarkerPopup(selectedLocation.markerId, this.#mapYellowMarkerLayer);

        this.#map.setView(selectedLocation.coords, this.#mapZoomLevel, {
            animate: true,
            pan: {
                duration: 1,
            },
        });
    }

    _openMarkerPopup(markerId, mapLayer) {
        mapLayer.getLayer(markerId).openPopup();
    }

    _animateLogoIcon() {
        gsap.from(logoIcon, {
            rotate: 90,
            duration: 1.3,
            ease: 'back',
        });
    }

    _toggleFormIcon() {
        formIcon.setAttribute('src', `src/img/icons/icon-${inputCategory.value}.png`);
    }

    _showErrorMessage() {
        gsap.timeline()
            .to(errorMessageOne,{
                text: 'Could not get your position information.',
                duration: 2,
                ease: 'power0.inOut',
            }, '1')
            .to(errorMessageTwo, {
                text: 'Please allow this app to track your location.',
                duration: 2,
                ease: 'power0.inOut',
            }, '+=0.7');
    }

    _showInstructions() {
        instructions.classList.remove('hidden');

        gsap.to(instructions, {
            text: 'Start by picking a location on the map...',
            delay: 1,
            duration: 2,
            ease: 'power0.inOut',
        });
    }

    _showForm(mapE) {
        this.#mapEvent = mapE;

        if (!this.#locations.length) instructions.classList.add('hidden');

        form.classList.remove('hidden');
        input.focus();
    }

    _hideForm() {
        input.value = '';
        form.style.display = 'none';
        form.classList.add('hidden');
        setTimeout(() => form.style.display = 'grid', 1000);
    }

    _showButton() {
        btnReset.classList.remove('hidden');
    }

    _setLocalStorage() {
        localStorage.setItem('locations', JSON.stringify(this.#locations));
    }

    _getLocalStorage() {
        const data = JSON.parse(localStorage.getItem('locations'));

        if (!data) return;

        this.#locations = data;
        this.#locations.map((location) => this._renderNewLocation(location));
        this._showButton();
    }

    _reset() {
        localStorage.removeItem('locations');
        location.reload();
    }
}

const app = new App();
