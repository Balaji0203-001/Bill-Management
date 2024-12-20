document.addEventListener('DOMContentLoaded', function () {
    // Define constants for buttons and sections
    const viewBillsButton = document.getElementById('viewBills');
    const searchBillsButton = document.getElementById('searchBills');
    const addSupplierButton = document.getElementById('addSupplier');
    const viewSuppliersButton = document.getElementById('viewSuppliers');
    const showTotalsButton = document.getElementById('showTotals');
    const addBillButton = document.getElementById('addBillButton');
    const logoutButton = document.getElementById('logoutButton');
    const addMoreItemsButton = document.getElementById('addMoreItemsButton');

    const addBillForm = document.getElementById('addBillForm');
    const addSupplierForm = document.getElementById('addSupplierForm');
    const billsTableBody = document.getElementById('billsTableBody');
    const suppliersTableBody = document.getElementById('suppliersTableBody');
    const searchResults = document.getElementById('searchResults');

    const billSection = document.getElementById('billSection');
    const searchSection = document.getElementById('searchSection');
    const addBillSection = document.getElementById('addBillSection');
    const addSupplierSection = document.getElementById('addSupplierSection');
    const supplierSection = document.getElementById('supplierSection');
    const totalsSection = document.getElementById('totalsSection');

    const viewMoreModal = document.getElementById('viewMoreModal');
    const supplierDetailsModal = document.getElementById('supplierDetailsModal');
    const closeModalButtons = document.querySelectorAll('.close-button');

    const loadingSpinnerBill = document.getElementById('loadingSpinnerBill');
    const loadingSpinnerSupplier = document.getElementById('loadingSpinnerSupplier');

    // Event listeners for menu items
    viewBillsButton.addEventListener('click', () => toggleSection(billSection));
    searchBillsButton.addEventListener('click', () => toggleSection(searchSection));
    addSupplierButton.addEventListener('click', () => toggleSection(addSupplierSection));
    viewSuppliersButton.addEventListener('click', () => toggleSection(supplierSection));
    showTotalsButton.addEventListener('click', () => toggleSection(totalsSection));
    addBillButton.addEventListener('click', () => toggleSection(addBillSection));
    logoutButton.addEventListener('click', logout);

    // Event listener for adding more items in the Add Bill section
    addMoreItemsButton.addEventListener('click', addItem);

    // Event listeners for modals
    closeModalButtons.forEach(button => button.addEventListener('click', closeModal));

    // Toggle visibility of sections
    function toggleSection(section) {
        const sections = document.querySelectorAll('.main-content > div');
        sections.forEach(sec => sec.style.display = 'none'); // Hide all sections
        section.style.display = 'block'; // Show the selected section
    }

    // Logout function
    function logout() {
        alert('Logged out successfully!');
        // Add actual logout logic here (e.g., redirect to login page)
    }

    // Add an item input field in the Add Bill section
    function addItem() {
        const itemsSection = document.getElementById('itemsSection');
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');
        itemDiv.innerHTML = `
           <div class="textbox">
    <div class="input-group">
        <label for="itemName">Item Name:</label>
        <input type="text" name="itemName" id="itemName" required placeholder="Enter item name" class="input-field">
    </div>
    
    <div class="input-group">
        <label for="itemQuantity">Quantity:</label>
        <input type="number" name="itemQuantity" id="itemQuantity" required placeholder="Enter quantity" class="input-field">
    </div>
    
    <div class="input-group">
        <label for="itemPrice">Price per Item:</label>
        <input type="number" name="itemPrice" id="itemPrice" required placeholder="Enter price per item" class="input-field">
    </div>
</div>


        `;
        itemsSection.appendChild(itemDiv);

        // Add event listener to the remove button
        const removeButton = itemDiv.querySelector('.removeItemButton');
        if (removeButton) {
            removeButton.addEventListener('click', () => {
                itemsSection.removeChild(itemDiv);
            });
        }
    }

    // Close modals
    function closeModal() {
        viewMoreModal.style.display = 'none';
        supplierDetailsModal.style.display = 'none';
    }

    // View more details for a bill
    function viewBillDetails(billId) {
        const billDetails = {
            quantity: 10,
            price: 100,
            totalAmount: 1000,
            paidBy: 'Customer A',
            returnPaidBy: 'Customer B',
            imageUrl: 'https://example.com/bill-image.jpg'
        };
        document.getElementById('quantityDetail').textContent = billDetails.quantity;
        document.getElementById('priceDetail').textContent = billDetails.price;
        document.getElementById('totalAmountDetail').textContent = billDetails.totalAmount;
        document.getElementById('paidByDetail').textContent = billDetails.paidBy;
        document.getElementById('returnPaidByDetail').textContent = billDetails.returnPaidBy;
        document.getElementById('imageUrlDetail').href = billDetails.imageUrl;
        viewMoreModal.style.display = 'block';
    }

    // View more details for a supplier
    function viewSupplierDetails(supplierId) {
        const supplier = suppliers.find(s => s.id === supplierId);
        if (supplier) {
            document.getElementById('supplierContact').textContent = supplier.contact;
            document.getElementById('supplierMapLink').href = supplier.mapLink;
            supplierDetailsModal.style.display = 'block';
        }
    }

    // Delete a supplier
    function deleteSupplier(supplierId) {
        const index = suppliers.findIndex(s => s.id === supplierId);
        if (index !== -1) {
            suppliers.splice(index, 1); // Remove supplier from the array
            populateSuppliersTable(); // Refresh table
        }
    }

    // Populate suppliers table
    function populateSuppliersTable() {
        suppliersTableBody.innerHTML = ''; // Clear existing rows
        suppliers.forEach(supplier => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${supplier.id}</td>
                <td>${supplier.name}</td>
                <td>${supplier.shop}</td>
                <td>
                    <button class="view-more-button" onclick="viewSupplierDetails(${supplier.id})">View More</button>
                    <button class="delete-button" onclick="deleteSupplier(${supplier.id})">Delete</button>
                </td>
            `;
            suppliersTableBody.appendChild(row);
        });
    }

    // Example data
    const suppliers = [
        { id: 1, name: "Supplier A", shop: "Shop A", contact: "1234567890", mapLink: "https://maps.google.com" },
        { id: 2, name: "Supplier B", shop: "Shop B", contact: "0987654321", mapLink: "https://maps.google.com" }
    ];

    // Initialize the table on page load
    populateSuppliersTable();
});
