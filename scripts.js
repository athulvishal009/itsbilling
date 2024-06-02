document.addEventListener('DOMContentLoaded', function () {
    // Login Functionality
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');
    loginForm?.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        if (username === 'admin' && password === 'admin') {
            window.location.href = 'dashboard.html';
        } else {
            loginError.classList.remove('hidden');
        }
    });

    // Add Item Functionality
    const addItemForm = document.getElementById('addItemForm');
    addItemForm?.addEventListener('submit', function (e) {
        e.preventDefault();
        const itemName = document.getElementById('item_name').value;
        const purchaseRate = document.getElementById('purchase_rate').value;
        const salesRate = document.getElementById('sales_rate').value;
        const mrp = document.getElementById('mrp').value;
        const gst = document.getElementById('gst').value;

        const item = {
            name: itemName,
            purchaseRate: parseFloat(purchaseRate),
            salesRate: parseFloat(salesRate),
            mrp: parseFloat(mrp),
            gst: parseFloat(gst)
        };

        let items = JSON.parse(localStorage.getItem('items')) || [];
        items.push(item);
        localStorage.setItem('items', JSON.stringify(items));

        alert('Item added successfully');
        addItemForm.reset();
    });

    // Purchase Functionality
    const purchaseForm = document.getElementById('purchaseForm');
    purchaseForm?.addEventListener('submit', function (e) {
        e.preventDefault();
        const itemName = document.getElementById('item_name').value;
        const quantity = parseInt(document.getElementById('quantity').value);

        let items = JSON.parse(localStorage.getItem('items')) || [];
        let item = items.find(i => i.name === itemName);
        if (item) {
            item.stock = (item.stock || 0) + quantity;
            localStorage.setItem('items', JSON.stringify(items));
            alert('Purchase added successfully');
            purchaseForm.reset();
        } else {
            alert('Item not found');
        }
    });

    // Sales Functionality
    const salesForm = document.getElementById('salesForm');
    const billingSummaryText = document.getElementById('billingSummaryText');
    salesForm?.addEventListener('submit', function (e) {
        e.preventDefault();
        const itemName = document.getElementById('item_name').value;
        const quantity = parseInt(document.getElementById('quantity').value);

        let items = JSON.parse(localStorage.getItem('items')) || [];
        let item = items.find(i => i.name === itemName);
        if (item) {
            if (item.stock && item.stock >= quantity) {
                item.stock -= quantity;

                let totalAmount = item.salesRate * quantity;
                let gstAmount = (totalAmount * item.gst) / 100;
                let grandTotal = totalAmount + gstAmount;

                let billingSummary = `
                    <strong>Item:</strong> ${item.name}<br>
                    <strong>Quantity:</strong> ${quantity}<br>
                    <strong>Sales Rate:</strong> ${item.salesRate}<br>
                    <strong>Total Amount:</strong> ${totalAmount}<br>
                    <strong>GST (${item.gst}%):</strong> ${gstAmount}<br>
                    <strong>Grand Total:</strong> ${grandTotal}
                `;
                billingSummaryText.innerHTML = billingSummary;
                document.getElementById('billingSection').classList.remove('hidden');

                localStorage.setItem('items', JSON.stringify(items));
                salesForm.reset();
            } else {
                alert('Insufficient stock');
            }
        } else {
            alert('Item not found');
        }
    });
});
