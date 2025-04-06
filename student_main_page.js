// Properly import Supabase from the global window object
const supabase = window.supabase.createClient(
    "https://wqquipfnhiflabewoppk.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxcXVpcGZuaGlmbGFiZXdvcHBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyODI2ODUsImV4cCI6MjA1Njg1ODY4NX0.fXWOE0o6kcs6eSxI8GdhF3s3JGH1ZFHHPaR5BxsAx2s" // Replace with your actual key
);


async function fetchStores() {
    const { data, error } = await supabase.from("vendorMenu").select("name, address, phone, image_url, menu_items");
    if (error) {
        console.error("Error fetching data:", error);
        return;
    }
    displayStores(data);
}

function displayStores(stores) {
    const storeList = document.getElementById("storeList");
    storeList.innerHTML = "";
    
    stores.forEach(store => {
        const storeCard = document.createElement("div");
        storeCard.className = "store-card";
        
        let menuItems = "No items available";
        if (store.menu_items && Array.isArray(store.menu_items)) {
            menuItems = store.menu_items
                .map(item => {
                    const itemName = item.item || item.name || "Unnamed Item";
                    const itemPrice = item.price ? `₹${item.price}` : "Price Unknown";
                    return `${itemName} - ${itemPrice}`;
                })
                .join(", ");
        }
        
        // Use default image if missing
        const imageUrl = store.image_url ? store.image_url : "default-image.jpg";

        storeCard.innerHTML = `
            <img src="${imageUrl}" alt="${store.name}" onerror="this.onerror=null; this.src='default-image.jpg';">
            <h3>${store.name || "Unnamed Vendor"}</h3>
            <p><strong>Address:</strong> ${store.address || "No address provided"}</p>
            <p><strong>Phone:</strong> ${store.phone || "No phone available"}</p>
            <p><strong>Menu:</strong> ${menuItems}</p>
        `;
        storeList.appendChild(storeCard);
    });
}

document.addEventListener("DOMContentLoaded", fetchStores);