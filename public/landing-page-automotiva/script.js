// Translation Dictionary
const TRANSLATIONS = {
    pt: {
        nav_inventory: "Estoque",
        nav_sell: "Vender Carro",
        nav_features: "Diferenciais",
        nav_contact: "Contato",
        btn_whatsapp: "Chamar no WhatsApp",
        hero_badge: "✓ Procedência garantida e laudo cautelar aprovado em 100% do estoque.",
        hero_title: "Onde a exclusividade encontra a sua próxima estrada.",
        hero_subtitle: "Curadoria rigorosa de veículos multimarcas premium e seminovos selecionados na região de tríplice fronteira.",
        hero_cta_stock: "Ver Estoque",
        hero_cta_chat: "Falar com Consultor",
        sec_inventory_badge: "Seleção Exclusiva",
        sec_inventory_title: "Nosso Inventário",
        sec_inventory_desc: "Veículos inspecionados, de altíssima qualidade e prontos para entrega imediata.",
        spec_year: "Ano",
        spec_km: "KM",
        spec_trans: "Câmbio",
        btn_card_cta: "Garantir este Carro",
        btn_card_sold: "Vendido",
        sec_trade_badge: "Avaliação Rápida",
        sec_trade_title: "Quer vender ou trocar seu carro hoje?",
        sec_trade_desc: "Avaliamos seu veículo premium com transparência, segurança e rapidez. Sem burocracia, pagamento imediato na região de fronteira.",
        sec_trade_cta: "Solicitar Avaliação via WhatsApp",
        sec_features_badge: "Por que nos escolher",
        sec_features_title: "Diferenciais Apex Motors",
        sec_features_desc: "Garantia de segurança, credibilidade e pós-venda premium do início ao fim da sua compra.",
        feat_1_title: "Procedência Garantida",
        feat_1_desc: "100% dos nossos veículos passam por vistoria cautelar rigorosa e verificação de histórico completo.",
        feat_2_title: "Taxas Exclusivas",
        feat_2_desc: "Parcerias com as principais financeiras brasileiras e internacionais para garantir as melhores taxas do mercado.",
        feat_3_title: "Pós-Venda Premium",
        feat_3_desc: "Suporte completo e consultoria de manutenção personalizada nos primeiros meses pós-entrega do veículo.",
        sec_calc_badge: "Simulador de Estética",
        sec_calc_title: "Pacotes de Detalhamento e Proteção",
        sec_calc_desc: "Personalize e proteja seu novo veículo. Selecione os serviços abaixo para simular o investimento de proteção.",
        calc_base: "Pacote de Limpeza Técnica Integrado",
        calc_base_desc: "Lavagem detalhada de chassi, motor e higienização interna inclusa.",
        calc_item_1: "Polimento Comercial + Selante",
        calc_item_1_desc: "Eliminação de micro-riscos e brilho protetor por até 6 meses.",
        calc_item_2: "Vitrificação de Pintura Premium (9H)",
        calc_item_2_desc: "Proteção cerâmica contra intempéries e raios UV por até 3 anos.",
        calc_item_3: "Proteção PPF Frontal (Película Regenerativa)",
        calc_item_3_desc: "Película termoplástica ultra-resistente contra impactos de pedras na estrada.",
        calc_sum_title: "Resumo dos Serviços",
        calc_sum_base: "Preparação Base Inclusa",
        calc_sum_total: "Total Previsto",
        calc_sum_cta: "Adicionar Proteção ao Pedido",
        footer_desc: "A Apex Motors é referência em curadoria e venda de automóveis premium na tríplice fronteira. Credibilidade e atendimento de alto padrão.",
        footer_hours: "Horário de Funcionamento",
        footer_week: "Segunda a Sexta",
        footer_sat: "Sábados",
        footer_sun: "Domingos e Feriados",
        footer_closed: "Fechado",
        footer_map: "Localização",
        copyright: "© 2026 Apex Motors. Desenvolvido por <a href=\"https://gdsdesign.site\" target=\"_blank\" style=\"color: var(--primary); text-decoration: none; font-weight: 600;\">GDS Design</a>. Todos os direitos reservados."
    },
    es: {
        nav_inventory: "Inventario",
        nav_sell: "Vender Auto",
        nav_features: "Diferenciales",
        nav_contact: "Contacto",
        btn_whatsapp: "Contacto WhatsApp",
        hero_badge: "✓ Procedencia garantizada e informe técnico aprobado en el 100% del stock.",
        hero_title: "Donde la exclusividad se encuentra con su próximo camino.",
        hero_subtitle: "Curaduría rigurosa de vehículos multimarcas premium y seminuevos seleccionados en la región de la triple frontera.",
        hero_cta_stock: "Ver Inventario",
        hero_cta_chat: "Hablar con Asesor",
        sec_inventory_badge: "Selección Exclusiva",
        sec_inventory_title: "Nuestro Inventario",
        sec_inventory_desc: "Vehículos inspeccionados, de altísima calidad y listos para entrega inmediata.",
        spec_year: "Año",
        spec_km: "KM",
        spec_trans: "Transmisión",
        btn_card_cta: "Asegurar este Auto",
        btn_card_sold: "Vendido",
        sec_trade_badge: "Valoración Rápida",
        sec_trade_title: "¿Quiere vender o cambiar su auto hoy?",
        sec_trade_desc: "Valoramos su vehículo premium con transparencia, seguridad y rapidez. Sin burocracia, pago inmediato en la región de la frontera.",
        sec_trade_cta: "Solicitar Valoración vía WhatsApp",
        sec_features_badge: "Por qué elegirnos",
        sec_features_title: "Diferenciales Apex Motors",
        sec_features_desc: "Garantía de seguridad, credibilidad y postventa premium desde el inicio hasta el final de su compra.",
        feat_1_title: "Procedencia Garantizada",
        feat_1_desc: "El 100% de nuestros vehículos pasan por una inspección técnica rigurosa y verificación de historial completo.",
        feat_2_title: "Tasas Exclusivas",
        feat_2_desc: "Alianzas con las principales financieras brasileñas e internacionales para asegurar las mejores tasas del mercado.",
        feat_3_title: "Post-Venta Premium",
        feat_3_desc: "Soporte completo y asesoría de mantenimiento personalizada en los primeros meses post-entrega de su vehículo.",
        sec_calc_badge: "Simulador de Estética",
        sec_calc_title: "Paquetes de Detallado y Protección",
        sec_calc_desc: "Personalice y proteja su nuevo vehículo. Seleccione los servicios a continuación para simular el costo de protección.",
        calc_base: "Paquete de Limpieza Técnica Integrado",
        calc_base_desc: "Lavado detallado de chasis, motor e higienización interna incluida.",
        calc_item_1: "Pulido Comercial + Sellador",
        calc_item_1_desc: "Eliminación de micro-rayas y brillo protector por hasta 6 meses.",
        calc_item_2: "Vitrificado de Pintura Premium (9H)",
        calc_item_2_desc: "Protección cerámica contra el clima y rayos UV por hasta 3 años.",
        calc_item_3: "Protección PPF Frontal (Película Regenerativa)",
        calc_item_3_desc: "Película termoplástica ultra-resistente contra impactos de piedras en carretera.",
        calc_sum_title: "Resumen de Servicios",
        calc_sum_base: "Preparación Base Incluida",
        calc_sum_total: "Total Previsto",
        calc_sum_cta: "Agregar Protección al Pedido",
        footer_desc: "Apex Motors es referencia en curaduría y venta de automóviles premium en la triple frontera. Credibilidad y servicio de alto nivel.",
        footer_hours: "Horario de Atención",
        footer_week: "Lunes a Viernes",
        footer_sat: "Sábados",
        footer_sun: "Domingos y Feriados",
        footer_closed: "Cerrado",
        footer_map: "Ubicación",
        copyright: "© 2026 Apex Motors. Desarrollado por <a href=\"https://gdsdesign.site\" target=\"_blank\" style=\"color: var(--primary); text-decoration: none; font-weight: 600;\">GDS Design</a>. Todos los derechos reservados."
    }
};

// Vehicles Database (JSON Schema Internacionalizado)
const VEHICLES_DATA = [
    {
        id: "porsche-911",
        name: "Porsche 911 Carrera S",
        image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800",
        specs: {
            pt: { year: "2022/2023", km: "8.500 km", transmission: "PDK Automático" },
            es: { year: "2022/2023", km: "8.500 km", transmission: "PDK Automático" }
        },
        price: {
            pt: "R$ 899.900",
            es: "USD 165.000"
        },
        isSold: false
    },
    {
        id: "bmw-m3",
        name: "BMW M3 Competition",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800",
        specs: {
            pt: { year: "2021/2022", km: "15.000 km", transmission: "Automático" },
            es: { year: "2021/2022", km: "15.000 km", transmission: "Automático" }
        },
        price: {
            pt: "R$ 679.900",
            es: "USD 125.000"
        },
        isSold: false
    },
    {
        id: "audi-rs6",
        name: "Audi RS6 Avant GP Edition",
        image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=800",
        specs: {
            pt: { year: "2020/2021", km: "24.000 km", transmission: "Tiptronic" },
            es: { year: "2020/2021", km: "24.000 km", transmission: "Tiptronic" }
        },
        price: {
            pt: "R$ 599.900",
            es: "USD 110.000"
        },
        isSold: true
    }
];

// Detailing Calculator Pricing
const CALC_VALORES = {
    pt: {
        currency: "R$ ",
        base: 0,
        item_1: 450,
        item_2: 1200,
        item_3: 3500
    },
    es: {
        currency: "USD ",
        base: 0,
        item_1: 85,
        item_2: 220,
        item_3: 650
    }
};

let currentLang = "pt";
let selectedAddons = { item_1: false, item_2: false, item_3: false };

// Initial Load & Listeners
document.addEventListener("DOMContentLoaded", () => {
    // Detect Browser Lang if possible, default to pt
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith("es")) {
        currentLang = "es";
    }

    setLanguage(currentLang);
    initCalculator();

    // Scroll header styling
    window.addEventListener("scroll", () => {
        const header = document.querySelector("header");
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // Setup intersections animations
    const revealElements = document.querySelectorAll("section, .car-card, .feature-card");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
        observer.observe(el);
    });
});

// Set active language
function setLanguage(lang) {
    currentLang = lang;

    // Toggle switch UI state
    document.querySelectorAll(".lang-btn").forEach(btn => {
        btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });

    // Translate DOM text strings
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
            el.innerHTML = TRANSLATIONS[lang][key];
        }
    });

    // Render vehicles in the selected language
    renderVehicles();

    // Update calculator text/currency values
    updateCalculatorTotal();

    // Update global links target values
    updateLinks();
}

// Render dynamic stock cards
function renderVehicles() {
    const grid = document.getElementById("inventory-grid");
    if (!grid) return;
    grid.innerHTML = "";

    VEHICLES_DATA.forEach(car => {
        const card = document.createElement("div");
        card.className = `car-card ${car.isSold ? 'sold' : ''}`;
        
        const specs = car.specs[currentLang];
        const statusText = car.isSold ? TRANSLATIONS[currentLang].btn_card_sold : TRANSLATIONS[currentLang].btn_card_cta;
        const priceText = car.price[currentLang];

        card.innerHTML = `
            <div class="car-img-wrap">
                ${car.isSold ? `<span class="status-badge">${TRANSLATIONS[currentLang].btn_card_sold}</span>` : ''}
                <img src="${car.image}" alt="${car.name}" loading="lazy">
            </div>
            <div class="car-info">
                <h3>${car.name}</h3>
                <div class="car-specs">
                    <div class="spec-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                        <span>${TRANSLATIONS[currentLang].spec_year}: ${specs.year}</span>
                    </div>
                    <div class="spec-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                        <span>${specs.km}</span>
                    </div>
                    <div class="spec-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2v20m10-10H2"/></svg>
                        <span>${specs.transmission}</span>
                    </div>
                </div>
                <div class="car-footer">
                    <div class="car-price">${priceText}</div>
                    <button class="btn-primary" onclick="contactCar('${car.name}')" ${car.isSold ? 'disabled' : ''}>
                        ${statusText}
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Update WhatsApp template strings
function updateLinks() {
    // Vender Carro CTA link
    const sellBtn = document.getElementById("sell-car-cta");
    if (sellBtn) {
        const textPT = encodeURIComponent("Olá! Gostaria de receber uma avaliação para o meu veículo na Apex Motors.");
        const textES = encodeURIComponent("¡Hola! Me gustaría recibir una valoración para mi vehículo en Apex Motors.");
        sellBtn.setAttribute("href", `https://wa.me/595973977991?text=${currentLang === 'pt' ? textPT : textES}`);
    }
}

// Open whatsapp relative to vehicle
function contactCar(carName) {
    const textPT = encodeURIComponent(`Olá! Gostaria de mais informações sobre o veículo ${carName} anunciado na Apex Motors.`);
    const textES = encodeURIComponent(`¡Hola! Me gustaría más información sobre el vehículo ${carName} anunciado en Apex Motors.`);
    const text = currentLang === "pt" ? textPT : textES;
    window.open(`https://wa.me/595973977991?text=${text}`, "_blank");
}

// Calculator logic
function initCalculator() {
    document.querySelectorAll(".calc-item").forEach(item => {
        item.addEventListener("click", () => {
            const itemId = item.getAttribute("data-id");
            selectedAddons[itemId] = !selectedAddons[itemId];
            item.classList.toggle("selected", selectedAddons[itemId]);
            updateCalculatorTotal();
        });
    });
}

function updateCalculatorTotal() {
    const prices = CALC_VALORES[currentLang];
    const currency = prices.currency;
    
    // Update individual prices labels in calculator UI
    const item1Price = document.getElementById("calc-price-item1");
    const item2Price = document.getElementById("calc-price-item2");
    const item3Price = document.getElementById("calc-price-item3");

    if (item1Price) item1Price.innerText = `+ ${currency}${prices.item_1.toLocaleString(currentLang === 'pt' ? 'pt-BR' : 'en-US')}`;
    if (item2Price) item2Price.innerText = `+ ${currency}${prices.item_2.toLocaleString(currentLang === 'pt' ? 'pt-BR' : 'en-US')}`;
    if (item3Price) item3Price.innerText = `+ ${currency}${prices.item_3.toLocaleString(currentLang === 'pt' ? 'pt-BR' : 'en-US')}`;

    // Recalculate Total
    let total = prices.base;
    if (selectedAddons.item_1) total += prices.item_1;
    if (selectedAddons.item_2) total += prices.item_2;
    if (selectedAddons.item_3) total += prices.item_3;

    // Render summary list items
    const listWrap = document.getElementById("calc-summary-list");
    if (listWrap) {
        listWrap.innerHTML = "";
        
        // Base Preparation is always included
        listWrap.innerHTML += `
            <div class="summary-item">
                <span>${TRANSLATIONS[currentLang].calc_base}</span>
                <span>Incluso / Incluido</span>
            </div>
        `;

        if (selectedAddons.item_1) {
            listWrap.innerHTML += `
                <div class="summary-item">
                    <span>${TRANSLATIONS[currentLang].calc_item_1}</span>
                    <span>${currency}${prices.item_1.toLocaleString(currentLang === 'pt' ? 'pt-BR' : 'en-US')}</span>
                </div>
            `;
        }
        if (selectedAddons.item_2) {
            listWrap.innerHTML += `
                <div class="summary-item">
                    <span>${TRANSLATIONS[currentLang].calc_item_2}</span>
                    <span>${currency}${prices.item_2.toLocaleString(currentLang === 'pt' ? 'pt-BR' : 'en-US')}</span>
                </div>
            `;
        }
        if (selectedAddons.item_3) {
            listWrap.innerHTML += `
                <div class="summary-item">
                    <span>${TRANSLATIONS[currentLang].calc_item_3}</span>
                    <span>${currency}${prices.item_3.toLocaleString(currentLang === 'pt' ? 'pt-BR' : 'en-US')}</span>
                </div>
            `;
        }
    }

    const totalDisplay = document.getElementById("calc-total-val");
    if (totalDisplay) {
        totalDisplay.innerText = `${currency}${total.toLocaleString(currentLang === 'pt' ? 'pt-BR' : 'en-US')}`;
    }
}

// Send selected calculator items directly to whatsapp
function sendCalcToWhatsApp() {
    const prices = CALC_VALORES[currentLang];
    const currency = prices.currency;
    let total = prices.base;
    let itemsText = "";

    if (selectedAddons.item_1) {
        total += prices.item_1;
        itemsText += `• ${TRANSLATIONS[currentLang].calc_item_1} (${currency}${prices.item_1})\n`;
    }
    if (selectedAddons.item_2) {
        total += prices.item_2;
        itemsText += `• ${TRANSLATIONS[currentLang].calc_item_2} (${currency}${prices.item_2})\n`;
    }
    if (selectedAddons.item_3) {
        total += prices.item_3;
        itemsText += `• ${TRANSLATIONS[currentLang].calc_item_3} (${currency}${prices.item_3})\n`;
    }

    if (itemsText === "") {
        itemsText = currentLang === "pt" ? "• Apenas pacote de preparação base.\n" : "• Solo paquete de preparación base.\n";
    }

    const textPT = encodeURIComponent(
        `Olá Apex Motors! Gostaria de solicitar o seguinte pacote de proteção e estética para meu carro:\n\n${itemsText}\n*Total Estimado:* ${currency}${total}\n\nPor favor, confirmem o agendamento do serviço.`
    );
    const textES = encodeURIComponent(
        `¡Hola Apex Motors! Me gustaría solicitar el siguiente paquete de protección y estética para mi auto:\n\n${itemsText}\n*Total Estimado:* ${currency}${total}\n\nPor favor, confirmen el agendamiento del servicio.`
    );

    const text = currentLang === "pt" ? textPT : textES;
    window.open(`https://wa.me/595973977991?text=${text}`, "_blank");
}

// Mobile Menu Toggle
function toggleMenu() {
    const nav = document.getElementById("main-nav");
    if (nav) nav.classList.toggle("active");
}
