const API_BASE = 'http://localhost:8000';
let currentMode = 'login';
let token = localStorage.getItem('token');

// Elements
const authSection = document.getElementById('auth-section');
const dashSection = document.getElementById('dashboard-section');
const userInfo = document.getElementById('user-info');
const userEmailSpan = document.getElementById('user-email');
const authSubmitBtn = document.getElementById('auth-submit');
const authError = document.getElementById('auth-error');

// Initialization
if (token) {
    checkUser();
}

function switchAuth(mode) {
    currentMode = mode;
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    authSubmitBtn.textContent = mode === 'login' ? 'Login' : 'Register';
    authError.classList.add('hidden');
}

function showToast(msg, isError = false) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.style.background = isError ? 'var(--danger)' : 'var(--success)';
    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

async function handleAuth(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const endpoint = currentMode === 'login' ? '/auth/login' : '/auth/register';
    
    try {
        const res = await fetch(`${API_BASE}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        const data = await res.json();
        
        if (!res.ok) {
            authError.textContent = data.detail || 'Authentication failed';
            authError.classList.remove('hidden');
            return;
        }

        if (currentMode === 'login') {
            token = data.token;
            localStorage.setItem('token', token);
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';
            showToast('Logged in successfully!');
            checkUser();
        } else {
            showToast('Registered successfully! Please login.');
            switchAuth('login');
            document.querySelector('.tab-btn:first-child').classList.add('active');
            document.querySelector('.tab-btn:last-child').classList.remove('active');
        }
    } catch (err) {
        authError.textContent = 'Network error. Make sure backend is running.';
        authError.classList.remove('hidden');
    }
}

async function checkUser() {
    try {
        const res = await fetch(`${API_BASE}/users/me`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (res.ok) {
            const user = await res.json();
            authSection.classList.add('hidden');
            dashSection.classList.remove('hidden');
            userInfo.classList.remove('hidden');
            userEmailSpan.textContent = user.email;
            
            // Load dashboard data
            fetchCategories();
            fetchProducts();
        } else {
            logout();
        }
    } catch (err) {
        logout();
    }
}

function logout() {
    token = null;
    localStorage.removeItem('token');
    authSection.classList.remove('hidden');
    dashSection.classList.add('hidden');
    userInfo.classList.add('hidden');
}

// Data Fetching and Creation
async function fetchCategories() {
    const res = await fetch(`${API_BASE}/categories/`);
    const categories = await res.json();
    
    const list = document.getElementById('categories-list');
    const select = document.getElementById('new-product-category');
    
    list.innerHTML = '';
    select.innerHTML = '<option value="">Select Category</option>';
    
    categories.forEach(cat => {
        list.innerHTML += `<li>${cat.name}</li>`;
        select.innerHTML += `<option value="${cat.id}">${cat.name}</option>`;
    });
}

async function createCategory(e) {
    e.preventDefault();
    const name = document.getElementById('new-category-name').value;
    
    const res = await fetch(`${API_BASE}/categories/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
    });
    
    if (res.ok) {
        document.getElementById('new-category-name').value = '';
        fetchCategories();
        showToast('Category created!');
    }
}

async function fetchProducts() {
    const res = await fetch(`${API_BASE}/products/`);
    const products = await res.json();
    
    const list = document.getElementById('products-list');
    list.innerHTML = '';
    
    products.forEach(prod => {
        list.innerHTML += `<li>${prod.name}</li>`;
    });
}

async function createProduct(e) {
    e.preventDefault();
    const name = document.getElementById('new-product-name').value;
    const category_id = document.getElementById('new-product-category').value;
    
    const res = await fetch(`${API_BASE}/products/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, category_id: parseInt(category_id) })
    });
    
    if (res.ok) {
        document.getElementById('new-product-name').value = '';
        fetchProducts();
        showToast('Product created!');
    }
}
