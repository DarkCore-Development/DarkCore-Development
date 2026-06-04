
function formatPrice(value){
    const clean = String(value || "").replace(/[^0-9]/g, "");
    return "R$ " + (clean || "0");
}

function nl2br(text){
    return String(text || "").replace(/\n/g, "<br>");
}

function applySiteData(){
    const packages = JSON.parse(localStorage.getItem("darkcore_packages") || "{}");

    if(packages.basic && document.getElementById("basicPriceSite")){
        document.getElementById("basicPriceSite").textContent = formatPrice(packages.basic);
    }

    if(packages.performance && document.getElementById("performancePriceSite")){
        document.getElementById("performancePriceSite").textContent = formatPrice(packages.performance);
    }

    if(packages.extreme && document.getElementById("extremePriceSite")){
        document.getElementById("extremePriceSite").textContent = formatPrice(packages.extreme);
    }

    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
    });
}

function applySitePlans(){
    const saved = localStorage.getItem("darkcore_site_plans");
    if(!saved) return;

    const data = JSON.parse(saved);

    const p1t = document.getElementById("sitePlan1Title");
    const p1d = document.getElementById("sitePlan1Desc");
    const p2t = document.getElementById("sitePlan2Title");
    const p2d = document.getElementById("sitePlan2Desc");
    const p3t = document.getElementById("sitePlan3Title");
    const p3d = document.getElementById("sitePlan3Desc");

    if(p1t) p1t.textContent = data.plan1Title || "PROFISSIONAL";
    if(p1d && data.plan1Desc) p1d.innerHTML = nl2br(data.plan1Desc);

    if(p2t) p2t.textContent = data.plan2Title || "BUSINESS";
    if(p2d && data.plan2Desc) p2d.innerHTML = nl2br(data.plan2Desc);

    if(p3t) p3t.textContent = data.plan3Title || "PREMIUM / SISTEMA";
    if(p3d && data.plan3Desc) p3d.innerHTML = nl2br(data.plan3Desc);
}

function initFAQ(){
    document.querySelectorAll(".faq-question").forEach(button => {
        button.addEventListener("click", () => {
            const item = button.closest(".faq-item");
            const isOpen = item.classList.contains("active");

            document.querySelectorAll(".faq-item").forEach(faq => {
                faq.classList.remove("active");
                const btn = faq.querySelector(".faq-question");
                if(btn) btn.setAttribute("aria-expanded", "false");
            });

            if(!isOpen){
                item.classList.add("active");
                button.setAttribute("aria-expanded", "true");
            }
        });
    });
}

function initScrollReveal(){
    const elements = document.querySelectorAll(".reveal, .card, .feature-card, .choice-card, .result-card, .testimonial-card, .metric");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    elements.forEach(el => observer.observe(el));
}

function initCounters(){
    const counters = document.querySelectorAll(".counter, .counter-rating");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(!entry.isIntersecting) return;

            const el = entry.target;
            const target = parseFloat(el.dataset.target);
            const prefix = el.dataset.prefix || "";
            const suffix = el.dataset.suffix || "";
            const isRating = el.classList.contains("counter-rating");
            let current = 0;
            const increment = target / 42;

            const timer = setInterval(() => {
                current += increment;

                if(current >= target){
                    current = target;
                    clearInterval(timer);
                }

                el.textContent = isRating ? current.toFixed(1) + "★" : prefix + Math.round(current) + suffix;
            }, 25);

            observer.unobserve(el);
        });
    }, { threshold: 0.6 });

    counters.forEach(counter => observer.observe(counter));
}

function initScrollProgress(){
    const bar = document.querySelector(".scroll-progress");
    if(!bar) return;

    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = progress + "%";
    });
}

window.addEventListener("load", () => {
    const loader = document.querySelector(".page-loader");
    if(loader){
        setTimeout(() => loader.classList.add("hidden"), 450);
    }
});

setTimeout(() => {
    const loader = document.querySelector(".page-loader");
    if(loader) loader.classList.add("hidden");
}, 1500);

document.addEventListener("DOMContentLoaded", () => {
    applySiteData();
    applySitePlans();
    initFAQ();
    initScrollReveal();
    initCounters();
    initScrollProgress();
});


/* Efeito estilo Analizzi: luz suave seguindo o mouse nos cards */
document.addEventListener("DOMContentLoaded", () => {
    const hoverCards = document.querySelectorAll(".choice-card, .card, .feature-card, .result-card, .testimonial-card, .hero-card");

    hoverCards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            card.style.setProperty("--mx", x + "%");
            card.style.setProperty("--my", y + "%");
        });
    });
});


/* Menu mobile */
document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector(".top-nav");
    const btn = document.querySelector(".mobile-menu-btn");

    if(nav && btn){
        btn.addEventListener("click", () => {
            nav.classList.toggle("menu-open");
            btn.textContent = nav.classList.contains("menu-open") ? "×" : "☰";
        });

        nav.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                nav.classList.remove("menu-open");
                btn.textContent = "☰";
            });
        });
    }
});
