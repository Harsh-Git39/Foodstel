const SUPABASE_URL = "https://wqquipfnhiflabewoppk.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxcXVpcGZuaGlmbGFiZXdvcHBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyODI2ODUsImV4cCI6MjA1Njg1ODY4NX0.fXWOE0o6kcs6eSxI8GdhF3s3JGH1ZFHHPaR5BxsAx2s";

const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.getElementById("vendorForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;
    const image_url = document.getElementById("image_url").value;
    
    const menuItems = [];
    document.querySelectorAll(".menu-item").forEach(item => {
        const itemName = item.querySelector(".item-name").value;
        const itemPrice = item.querySelector(".item-price").value;
        if (itemName && itemPrice) {
            menuItems.push({ item: itemName, price: parseFloat(itemPrice) });
        }
    });
    
    const { data, error } = await supabaseClient.from("vendorMenu").insert([
        {
            name,
            address,
            phone,
            image_url,
            menu_items: menuItems
        }
    ]);
    
    if (error) {
        alert("Error: " + error.message);
    } else {
        alert("Vendor added successfully!");
        document.getElementById("vendorForm").reset();
        document.getElementById("menuList").innerHTML = "";
    }
});

document.getElementById("addMenuItem").addEventListener("click", function() {
    const menuList = document.getElementById("menuList");
    const div = document.createElement("div");
    div.classList.add("menu-item");
    div.innerHTML = `
        <input type="text" class="item-name" placeholder="Item Name" required>
        <input type="number" class="item-price" placeholder="Price" required>
        <button type="button" class="remove-item">Remove</button>
    `;
    menuList.appendChild(div);
    
    div.querySelector(".remove-item").addEventListener("click", function() {
        div.remove();
    });
});
