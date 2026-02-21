const list = document.getElementById('list');
const info = document.getElementById('info');
const category = document.getElementById('category');
const sort = document.getElementById('sort');
const min = document.getElementById('min');
const max = document.getElementById('max');
const apply = document.getElementById('apply');

let inventory = [];

function render(items) {
  list.innerHTML = '';

  if (!items.length) {
    list.innerHTML = '<p class="text-muted">No items found</p>';
    return;
  }

  items.forEach(p => {
    list.innerHTML += `
      <div class="col-md-3">
        <div class="card product-card h-100">
          <img src="${p.image}" class="card-img-top" alt="${p.name}">
          <div class="card-body">
            <span class="badge bg-secondary mb-2">${p.category}</span>
            <h6>${p.name}</h6>
            <p>₹${p.price}</p>
          </div>
        </div>
      </div>
    `;
  });
}

function applyFilters() {
  let result = [...inventory];

  if (category.value !== 'all') {
    result = result.filter(p => p.category === category.value);
  }

  if (min.value) result = result.filter(p => p.price >= Number(min.value));
  if (max.value) result = result.filter(p => p.price <= Number(max.value));

  if (sort.value === 'low') result.sort((a, b) => a.price - b.price);
  if (sort.value === 'high') result.sort((a, b) => b.price - a.price);

  info.textContent = `Showing ${result.length} items`;
  render(result);
}

async function loadProducts() {
  try {
    info.textContent = 'Loading products...';

    const res = await fetch('products.json');
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await res.json();
    inventory = data;

    const cats = ['all', ...new Set(data.map(p => p.category))];
    category.innerHTML = cats
      .map(c => `<option value="${c}">${c}</option>`)
      .join('');

    applyFilters();

  } catch (error) {
    info.innerHTML = `
      <div class="alert alert-danger">
        Failed to load products. Please try again later.
      </div>
    `;
    console.error('Fetch error:', error);
  }
}

category.addEventListener('change', applyFilters);
sort.addEventListener('change', applyFilters);
apply.addEventListener('click', applyFilters);

loadProducts();
