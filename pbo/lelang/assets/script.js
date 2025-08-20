document.addEventListener('DOMContentLoaded', function() {
    // Login logic
    const loginSection = document.getElementById('login-section');
    const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-message');
    const dashboardUserAdmin = document.getElementById('dashboard-useradmin');
    const dashboardSeller = document.getElementById('dashboard-seller');
    const logoutBtnUserAdmin = document.getElementById('logout-btn-useradmin');
    const logoutBtnSeller = document.getElementById('logout-btn-seller');

    let currentRole = null;

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        const role = document.getElementById('role').value;

        fetch('login.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&role=${encodeURIComponent(role)}`
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                if (data.role === 'user') {
                    window.location.href = 'home_user.html';
                } else if (data.role === 'admin') {
                    window.location.href = 'home_admin.html';
                } else if (data.role === 'seller') {
                    window.location.href = 'home_seller.html';
                }
            } else {
                loginMessage.textContent = data.msg;
                loginMessage.style.color = '#d9534f';
            }
        })
        .catch(() => {
            loginMessage.textContent = 'Terjadi kesalahan koneksi!';
            loginMessage.style.color = '#d9534f';
        });
    });

    // Logout logic
    if (logoutBtnUserAdmin) {
        logoutBtnUserAdmin.addEventListener('click', function() {
            dashboardUserAdmin.style.display = 'none';
            loginSection.style.display = 'block';
            currentRole = null;
        });
    }
    if (logoutBtnSeller) {
        logoutBtnSeller.addEventListener('click', function() {
            dashboardSeller.style.display = 'none';
            loginSection.style.display = 'block';
            currentRole = null;
        });
    }

    // Auction logic for user/admin only
    const startPrice = 1000000;
    let highestBid = startPrice;
    const bidInput = document.getElementById('bid-input');
    const bidBtn = document.getElementById('bid-btn');
    const highestBidSpan = document.getElementById('highest-bid');
    const bidMessage = document.getElementById('bid-message');

    if (bidBtn) {
        bidBtn.addEventListener('click', function() {
            const bidValue = parseInt(bidInput.value);
            if (isNaN(bidValue) || bidValue <= highestBid) {
                bidMessage.textContent = 'Penawaran harus lebih tinggi dari penawaran tertinggi!';
                bidMessage.style.color = '#d9534f';
            } else {
                highestBid = bidValue;
                highestBidSpan.textContent = 'Rp ' + highestBid.toLocaleString('id-ID');
                bidMessage.textContent = 'Penawaran berhasil!';
                bidMessage.style.color = 'green';
                bidInput.value = '';
            }
        });
    }

    // Seller logic: add item
    const addItemForm = document.getElementById('add-item-form');
    const itemsList = document.getElementById('items-list');
    if (addItemForm) {
        addItemForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('item-name').value.trim();
            const desc = document.getElementById('item-desc-input').value.trim();
            const price = document.getElementById('item-price').value.trim();
            if (name && desc && price) {
                const li = document.createElement('li');
                li.textContent = `${name} - ${desc} (Rp ${parseInt(price).toLocaleString('id-ID')})`;
                itemsList.appendChild(li);
                addItemForm.reset();
            }
        });
    }
});
