function showTab(tabId){
    const tabs = document.querySelectorAll(".tab");
    tabs.forEach(tab => tab.classList.remove("active"));
    document.getElementById(tabId).classList.add("active");
}

function savePackages(){
    const data = {
        basic: document.getElementById("basicPrice").value,
        performance: document.getElementById("performancePrice").value,
        extreme: document.getElementById("extremePrice").value
    };

    localStorage.setItem("darkcore_packages", JSON.stringify(data));
    alert("Pacotes salvos com sucesso!");
}

function loadPackages(){
    const saved = localStorage.getItem("darkcore_packages");
    if(!saved) return;

    const data = JSON.parse(saved);

    document.getElementById("basicPrice").value = data.basic || "80";
    document.getElementById("performancePrice").value = data.performance || "120";
    document.getElementById("extremePrice").value = data.extreme || "180";
}

function saveFaq(){
    const faq = document.getElementById("faqText").value;
    localStorage.setItem("darkcore_faq", faq);
    alert("FAQ salvo!");
}

function loadFaq(){
    const faq = localStorage.getItem("darkcore_faq");
    if(faq){
        document.getElementById("faqText").value = faq;
    }
}

function saveConfig(){
    const config = {
        whatsapp: document.getElementById("whatsapp").value,
        instagram: document.getElementById("instagram").value
    };

    localStorage.setItem("darkcore_config", JSON.stringify(config));
    alert("Configurações salvas!");
}

function loadConfig(){
    const saved = localStorage.getItem("darkcore_config");
    if(!saved) return;

    const config = JSON.parse(saved);

    document.getElementById("whatsapp").value = config.whatsapp || "5547992235543";
    document.getElementById("instagram").value = config.instagram || "darkcore_pcs";
}

function exportBackup(){
    const backup = {
        packages: JSON.parse(localStorage.getItem("darkcore_packages") || "{}"),
        faq: localStorage.getItem("darkcore_faq") || "",
        config: JSON.parse(localStorage.getItem("darkcore_config") || "{}")
    };

    const blob = new Blob([JSON.stringify(backup, null, 2)], {type:"application/json"});
    const a = document.createElement("a");

    a.href = URL.createObjectURL(blob);
    a.download = "darkcore-backup.json";
    a.click();
}

function importBackup(event){
    const file = event.target.files[0];
    if(!file) return;

    const reader = new FileReader();

    reader.onload = function(e){
        const backup = JSON.parse(e.target.result);

        if(backup.packages){
            localStorage.setItem("darkcore_packages", JSON.stringify(backup.packages));
        }

        if(backup.faq){
            localStorage.setItem("darkcore_faq", backup.faq);
        }

        if(backup.config){
            localStorage.setItem("darkcore_config", JSON.stringify(backup.config));
        }

        loadPackages();
        loadFaq();
        loadConfig();
        loadSitePlans();

        alert("Backup restaurado!");
    };

    reader.readAsText(file);
}

function logout(){
    localStorage.removeItem("darkcore_logged");
    window.location.href = "index.html";
}



/* =========================
   SALVAR PLANOS DE SITES
========================= */

function saveSitePlans(){
    const data = {
        plan1Title: document.getElementById("sitePlan1TitleInput").value,
        plan1Desc: document.getElementById("sitePlan1DescInput").value,
        plan2Title: document.getElementById("sitePlan2TitleInput").value,
        plan2Desc: document.getElementById("sitePlan2DescInput").value,
        plan3Title: document.getElementById("sitePlan3TitleInput").value,
        plan3Desc: document.getElementById("sitePlan3DescInput").value
    };

    localStorage.setItem("darkcore_site_plans", JSON.stringify(data));
    alert("Planos de sites salvos com sucesso!");
}

/* =========================
   CARREGAR PLANOS DE SITES
========================= */

function loadSitePlans(){
    const saved = localStorage.getItem("darkcore_site_plans");
    if(!saved) return;

    const data = JSON.parse(saved);

    if(document.getElementById("sitePlan1TitleInput")){
        document.getElementById("sitePlan1TitleInput").value = data.plan1Title || "PROFISSIONAL";
        document.getElementById("sitePlan1DescInput").value = data.plan1Desc || "";
        document.getElementById("sitePlan2TitleInput").value = data.plan2Title || "BUSINESS";
        document.getElementById("sitePlan2DescInput").value = data.plan2Desc || "";
        document.getElementById("sitePlan3TitleInput").value = data.plan3Title || "PREMIUM / SISTEMA";
        document.getElementById("sitePlan3DescInput").value = data.plan3Desc || "";
    }
}


document.addEventListener("DOMContentLoaded", () => {
    loadPackages();
    loadFaq();
    loadConfig();
        loadSitePlans();
});
