// Carousel functionality
document.querySelectorAll('.carousel').forEach(carousel => {
    const images = carousel.querySelectorAll('img');
    let currentIndex = 0;

    function showImage(index) {
        images.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
    }

    carousel.querySelector('.carousel-nav.prev').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    });

    carousel.querySelector('.carousel-nav.next').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    });
});

// Toggle additional details functionality
function toggleDetails(id) {
    const details = document.getElementById(id);
    details.style.display = details.style.display === 'block' ? 'none' : 'block';
}

// Toggle filter section visibility
function toggleFilterSection() {
    const filterBox = document.getElementById('filter-box');
    filterBox.style.display = filterBox.style.display === 'block' ? 'none' : 'block';
}

// Apply filters functionality
function applyFilters() {
    const manufacturerFilters = document.querySelectorAll('#manufacturer-filter input[type="checkbox"]:checked');
    const yearFilter = document.getElementById('year-filter').value;
    const priceFilter = document.getElementById('price-filter').value;
    const locationFilter = document.getElementById('location-filter').value.toLowerCase();

    const items = document.querySelectorAll('.aircraft-item');

    items.forEach(item => {
        const manufacturer = item.getAttribute('data-manufacturer');
        const year = parseInt(item.getAttribute('data-year'), 10);
        const price = parseFloat(item.getAttribute('data-price').replace(/[^\d.]/g, ''));
        const location = item.getAttribute('data-location').toLowerCase();

        const manufacturerMatch = manufacturerFilters.length === 0 || Array.from(manufacturerFilters).some(filter => filter.value === manufacturer);
        const yearMatch = yearFilter === '' || checkYearRange(year, yearFilter);
        const priceMatch = priceFilter === '' || checkPriceRange(price, priceFilter);
        const locationMatch = locationFilter === '' || location === locationFilter;

        if (manufacturerMatch && yearMatch && priceMatch && locationMatch) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Function to check if the year falls within the selected range
function checkYearRange(year, range) {
    const [min, max] = range.split('-').map(Number);
    return year >= min && year <= max;
}

// Function to check if the price falls within the selected range
function checkPriceRange(price, range) {
    const [min, max] = range.split('-').map(Number);
    return price >= min && price <= max;
}

// Reset filters functionality
function resetFilters() {
    document.querySelectorAll('#manufacturer-filter input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    document.getElementById('year-filter').value = '';
    document.getElementById('price-filter').value = '';
    document.getElementById('location-filter').value = '';

    const items = document.querySelectorAll('.aircraft-item');
    items.forEach(item => {
        item.style.display = 'block';
    });
}

// Fullscreen image functionality
document.querySelectorAll('.carousel img').forEach(img => {
    img.addEventListener('click', function() {
        let overlay = document.querySelector('.fullscreen-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'fullscreen-overlay';
            document.body.appendChild(overlay);

            const closeButton = document.createElement('span');
            closeButton.className = 'close-button';
            closeButton.innerHTML = '&times;';
            overlay.appendChild(closeButton);

            closeButton.addEventListener('click', function() {
                overlay.style.display = 'none';
                overlay.innerHTML = '';
            });
        }

        overlay.innerHTML = `<img src="${this.src}" alt="Fullscreen Image">`;
        overlay.style.display = 'flex';

        const closeButton = document.createElement('span');
        closeButton.className = 'close-button';
        closeButton.innerHTML = '&times;';
        overlay.appendChild(closeButton);

        closeButton.addEventListener('click', function() {
            overlay.style.display = 'none';
            overlay.innerHTML = '';
        });
    });
});

// Sort by price functionality
function sortByPrice() {
    const aircraftListing = document.querySelector('.aircraft-listing');
    const items = Array.from(aircraftListing.querySelectorAll('.aircraft-item'));
    const isAscending = aircraftListing.classList.contains('sort-ascending');

    items.sort((a, b) => {
        const priceA = parseFloat(a.getAttribute('data-price').replace(/[^\d.]/g, ''));
        const priceB = parseFloat(b.getAttribute('data-price').replace(/[^\d.]/g, ''));
        return isAscending ? priceA - priceB : priceB - priceA;
    });

    items.forEach(item => aircraftListing.appendChild(item));

    aircraftListing.classList.toggle('sort-ascending', !isAscending);
    document.querySelector('.sort-price-button').textContent = isAscending ? 'Sort by Price (Low to High)' : 'Sort by Price (High to Low)';
}


