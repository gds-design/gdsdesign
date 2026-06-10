/* ==========================================================================
   GDS DESIGN - MOTOR LÓGICO, TRADUÇÃO BILÍNGUE E ANIMAÇÕES GSAP
   ========================================================================== */

// --- Dicionário de Idiomas (Português & Espanhol) ---
const translations = {
    pt: {
        // Navegação
        nav_logo: "GDS Design",
        nav_servicos: "Serviços",
        nav_por_que: "Por que ter um site?",
        nav_ideal: "Ideal Para",
        nav_quem_somos: "Quem Somos",
        nav_testimonials: "Depoimentos",
        nav_briefing: "Simular Projeto",
        nav_admin: "Painel CRM",
        btn_start_now: "Começar Projeto",
        
        // Hero Section
        hero_badge: "Estúdio de Web Design & Social Media",
        hero_title: "Seu negócio merece um site que <span class='grad-text'>trabalha por você 24 horas por dia</span>",
        hero_desc: "Transforme visitantes em clientes com páginas profissionais, rápidas e pensadas para gerar contatos, vendas e autoridade para sua marca.",
        hero_btn_briefing: "Quero um site que vende",
        hero_btn_portfolio: "",
        btn_whatsapp: "Falar no WhatsApp",
        
        // Seção Por Que (Dor / Copys)
        why_tagline: "Oportunidade de Mercado",
        why_title: "Enquanto você trabalha, seu site continua apresentando sua empresa.",
        why_desc: "Muitas pessoas pesquisam antes de entrar em contato.<br><br>Quando encontram uma empresa com presença profissional online, a confiança aumenta e a decisão de compra se torna mais fácil.",
        
        pain1_title: "Diferenciação no Mercado Paraguaio",
        pain1_desc: "No Paraguai, a presença digital ainda é escassa. Ter uma Landing Page profissional posiciona sua empresa anos-luz à frente da concorrência local, transmitindo autoridade e segurança imediatas.",
        
        pain2_title: "Credibilidade que Converte",
        pain2_desc: "O cliente moderno pesquisa no Google antes de comprar. Um site elegante com carregamento rápido e design exclusivo prova que você domina seu segmento e valoriza a experiência de quem te procura.",
        
        pain3_title: "Captação Automática de Leads",
        pain3_desc: "Sua página trabalha 24 horas por dia coletando contatos e direcionando clientes qualificados direto para o seu WhatsApp, sem depender de panfletos físicos ou posts orgânicos no Instagram.",
        
        // Seção Serviços
        services_tagline: "Nossas Soluções",
        services_title: "O que criamos para impulsionar seu negócio?",
        services_desc: "Projetos sob medida focados em estética premium e facilidade de navegação.",
        
        srv1_title: "Landing Pages de Alta Conversão",
        srv1_desc: "Páginas únicas focadas na venda de um produto ou serviço. Ideais para médicos, advogados, consultórios e empresas de serviços.",
        srv1_f1: "Design 100% Responsivo (Mobile First)",
        srv1_f2: "Foco total na dor do seu cliente",
        srv1_f3: "Botões estrategicamente posicionados",
        
        srv2_title: "Flyers e Posts para Instagram",
        srv2_desc: "Criação de criativos visuais modernos e autênticos que se destacam no feed e atraem a atenção do seu público de forma imediata.",
        srv2_f1: "Alinhamento com a identidade da marca",
        srv2_f2: "Layouts magnéticos e de alta qualidade",
        srv2_f3: "Pronto para tráfego pago ou orgânico",

        // Seção Ideal Para
        ideal_tagline: "Público-Alvo",
        ideal_title: "Ideal para profissionais e empresas que querem crescer",
        ideal_medicos: "Médicos",
        ideal_clinicas: "Clínicas",
        ideal_dentistas: "Dentistas",
        ideal_advogados: "Advogados",
        ideal_corretores: "Corretores",
        ideal_contadores: "Contadores",
        ideal_servicos: "Empresas de Serviços",
        ideal_comercio: "Comércio",
        ideal_prestadores: "Prestadores de Serviço",

        // Seção Quem Somos (Perfil da Maria Gilmara)
        profile_tagline: "Quem Somos",
        profile_title: "Olá, sou Maria Gilmara",
        profile_desc: "Sou designer web e social media. Meu objetivo é ajudar empresas e profissionais a construírem uma presença digital profissional através de sites, landing pages e materiais visuais que transmitam credibilidade e confiança.<br><br>Atendo clientes em português e espanhol, desenvolvendo soluções para negócios que desejam crescer e fortalecer sua marca na internet.",
        
        // Badges Flutuantes (Estilo Card)
        badge_web_title: "Web Design",
        badge_web_desc: "Sites de Alta Performance",
        badge_social_title: "Social Media",
        badge_social_desc: "Feed & Criativos Premium",
        badge_lang_title: "Bilingue",
        badge_lang_desc: "Português & Espanhol",
        badge_creds_title: "Confiança",
        badge_creds_desc: "Design que Converte",
        hero_badge_ux_title: "UX/UI",
        hero_badge_ux_desc: "Design Intuitivo & Moderno",
        hero_badge_opt_title: "Otimização",
        hero_badge_opt_desc: "Focado em Conversão",
        hero_badge_perf_title: "Performance",
        hero_badge_perf_desc: "Carregamento Ultra Rápido",
        
        // Testemunhos
        testimonials_title: "O Que Nossos Clientes Dizem",
        testimonials_desc: "Histórias reais, resultados reais. Descubra o impacto de um design de alto padrão nos negócios.",
        test1_text: '"O site desenvolvido pela GDS triplicou o agendamento de consultas na minha clínica em Foz. A experiência do paciente no celular ficou perfeita e o design transmite muita credibilidade."',
        test1_user_role: "Dermatologista / Clínica CDE",
        test2_text: '"Excelente trabalho com os posts e criativos do Instagram. O visual ficou incrivelmente limpo, moderno e atraente, o que aumentou diretamente nossas vendas de importações no Paraguai."',
        test2_user_role: "Gerente de Importadora / CDE",
        test3_text: '"Como estudante de medicina em Cidade de Leste, precisava de um portfólio digital para oferecer serviços de assessoria a novos alunos brasileiros. O site criado pela GDS ficou impecável!"',
        test3_user_role: "Assessoria e Estudante de Medicina",
        
        // Seção Como Funciona o Processo
        process_tagline: "O Fluxo",
        process_title: "Como funciona o processo?",
        process_desc: "Do primeiro contato até o suporte contínuo: passos claros para o sucesso do seu projeto.",
        proc1_title: "1. Solicite um orçamento",
        proc1_desc: "Preencha a cotação rápida.",
        proc2_title: "2. Atendimento personalizado",
        proc2_desc: "Conversamos pelo WhatsApp.",
        proc3_title: "3. Proposta e contrato",
        proc3_desc: "Tudo alinhado com transparência.",
        proc4_title: "4. Pagamento da entrada",
        proc4_desc: "Início do projeto.",
        proc5_title: "5. Envio de informações",
        proc5_desc: "Envio de fotos, textos e preferências.",
        proc6_title: "6. Desenvolvimento",
        proc6_desc: "Criação da sua landing page.",
        proc7_title: "7. Revisão e entrega",
        proc7_desc: "Ajustes finais e publicação.",
        proc8_title: "8. Suporte opcional",
        proc8_desc: "Manutenção e atualizações quando necessário.",
        
        // Funil de Briefing
        funnel_tagline: "Fazer Orçamento",
        funnel_title: "Simule seu projeto em 1 minuto",
        funnel_desc: "Responda às etapas abaixo e me envie as especificações. Entrarei em contato com a proposta ideal para você.",
        
        // Etapas Funil
        step1_title: "Qual é o principal serviço que você deseja divulgar?",
        step1_desc: "Ex.: Direito Previdenciário, Harmonização Facial, Venda de Imóveis.",
        opt_lp: "Landing Page",
        opt_flyer: "Flyers de Instagram",
        opt_site: "Site Completo",
        opt_other: "Outro Projeto",
        
        step2_title: "Fale sobre a sua empresa",
        step2_desc: "Quem é seu público-alvo? O que sua empresa vende? Isso nos ajudará a criar a mensagem certa.",
        lbl_niche: "Nicho / Área de Atuação",
        lbl_audience: "Público-Alvo principal",
        placeholder_niche: "Ex: Clínica médica, Advocacia, Venda de eletrônicos...",
        placeholder_audience: "Ex: Estudantes de medicina, Empresas locais, Pacientes...",
        
        step3_title: "Objetivo da página",
        step3_desc: "Qual resultado você espera com o site?",
        opt_style_wpp: "Receber mensagens no WhatsApp",
        opt_style_leads: "Captar leads",
        opt_style_company: "Apresentar minha empresa",
        opt_style_schedule: "Agendamentos",
        opt_style_other: "Outro",
        
        step4_title: "Faixa de investimento do projeto",
        step4_desc: "Qual dessas opções mais se aproxima do investimento que você pretende fazer?",
        opt_budget_1: "Até R$ 1.000",
        opt_budget_2: "R$ 1.000 a R$ 2.000",
        opt_budget_3: "Acima de R$ 2.000",
        
        step5_title: "Seus dados de contato",
        step5_desc: "Onde entraremos em contato para apresentar a proposta.",
        lbl_name: "Seu Nome Completo",
        lbl_whatsapp: "WhatsApp (com DDD / DDI)",
        lbl_email: "E-mail de Contato",
        placeholder_name: "Digite seu nome",
        placeholder_whatsapp: "Ex: +55 45 99999-9999 ou +595...",
        placeholder_email: "Ex: contato@empresa.com",
        
        btn_prev: "Voltar",
        btn_next: "Próximo",
        btn_submit: "Enviar para WhatsApp",
        
        // Seção FAQ
        faq_tagline: "FAQ",
        faq_title: "Dúvidas Frequentes",
        faq_desc: "Confira as respostas para as principais dúvidas dos nossos clientes sobre a criação de sites e prazos.",
        
        faq1_q: "Quanto tempo demora para meu site ficar pronto?",
        faq1_a: "O prazo médio de entrega para uma Landing Page profissional é de 1 a 2 semanas, a partir do envio de todas as informações da página e aprovação do layout.",
        
        faq2_q: "Como funciona a forma de pagamento?",
        faq2_a: "Trabalhamos com 50% de sinal no início do projeto e os 50% restantes na aprovação e entrega do site. Aceitamos Pix, transferências no Paraguai e Guaranis.",
        
        faq3_q: "Eu preciso ter os textos e fotos prontos?",
        faq3_a: "Não se preocupe com isso! Eu te guio na elaboração do conteúdo e ajudo a estruturar os textos ideais focados em convencer o seu cliente.",
        
        faq4_q: "O site será meu após a entrega?",
        faq4_a: "Sim, 100% seu! O site é registrado no seu nome ou da sua empresa, e você recebe todos os acessos do painel e da hospedagem.",
        
        faq5_q: "Vocês fazem sites para empresas do Paraguai?",
        faq5_a: "Sim, atendemos e criamos páginas específicas focadas no público paraguaio e nas particularidades do mercado local em Cidade de Leste ou Assunção.",
        
        // Footer
        footer_brand_desc: "GDS Design — Criação de landing pages e design estratégico para empresas brasileiras e paraguaias. Elevando negócios através do design.",
        footer_quick_links: "Links Rápidos",
        footer_contact: "Contato",
        footer_faith: "Guiados pela fé, criamos com propósito. 'Tudo posso naquele que me fortalece.'",
        footer_rights: "© 2026 GDS Design. Todos os direitos reservados.",
        final_cta_title: "Você não precisa de mais um site.",
        final_cta_subtitle: "Você precisa de um sistema que vende.",
        final_cta_btn: "Quero um site que vende"
    },
    es: {
        // Navegação
        nav_logo: "GDS Design",
        nav_servicos: "Servicios",
        nav_por_que: "¿Por qué una web?",
        nav_ideal: "Ideal Para",
        nav_quem_somos: "Quiénes Somos",
        nav_testimonials: "Testimonios",
        nav_briefing: "Simular Proyecto",
        nav_admin: "Panel CRM",
        btn_start_now: "Comenzar Proyecto",
        
        // Hero Section
        hero_badge: "Estudio de Web Design & Social Media",
        hero_title: "Tu negocio merece un sitio web que <span class='grad-text'>trabaje para ti las 24 horas del día</span>",
        hero_desc: "Transforma visitantes en clientes con páginas profesionales, rápidas y pensadas para generar contactos, ventas y autoridad para tu marca.",
        hero_btn_briefing: "Quiero un sitio que venda",
        hero_btn_portfolio: "",
        btn_whatsapp: "Hablar por WhatsApp",
        
        // Seção Por Que (Dor / Copys)
        why_tagline: "Oportunidad de Mercado",
        why_title: "Mientras trabajas, tu sitio web sigue presentando tu empresa.",
        why_desc: "Muchas personas investigan antes de ponerse en contacto.<br><br>Cuando encuentran una empresa con presencia profesional en línea, la confianza aumenta y la decisión de compra se vuelve más fácil.",
        
        pain1_title: "Diferenciación en el Mercado Paraguayo",
        pain1_desc: "En Paraguay, la presencia digital aún es escasa. Tener una Landing Page profesional posiciona a tu empresa años luz por delante de la competencia local, transmitiendo autoridad y seguridad inmediatas.",
        
        pain2_title: "Credibilidad que Convierte",
        pain2_desc: "El cliente moderno busca en Google antes de comprar. Un sitio web elegante con carga rápida y diseño exclusivo demuestra que dominas tu sector y valoras la experiencia de quien te busca.",
        
        pain3_title: "Captación Automática de Leads",
        pain3_desc: "Tu página trabaja las 24 horas del día recopilando contactos y dirigiendo clientes calificados directo a tu WhatsApp, sin depender de folletos físicos o publicaciones orgánicas en Instagram.",
        
        // Seção Serviços
        services_tagline: "Nuestras Soluciones",
        services_title: "¿Qué creamos para impulsar tu negocio?",
        services_desc: "Proyectos a medida enfocados en la estética premium y facilidad de navegación.",
        
        srv1_title: "Landing Pages de Alta Conversión",
        srv1_desc: "Páginas únicas enfocadas en la venta de un producto o servicio. Ideales para médicos, abogados, consultorios y empresas de servicios.",
        srv1_f1: "Diseño 100% Responsivo (Mobile First)",
        srv1_f2: "Foco total en el dolor de tu cliente",
        srv1_f3: "Botones colocados estratégicamente",
        
        srv2_title: "Flyers y Posts para Instagram",
        srv2_desc: "Creación de piezas visuales modernas y auténticas que se destacan en el feed y atraen la atención de tu público de forma inmediata.",
        srv2_f1: "Alineación con la identidad de la marca",
        srv2_f2: "Diseños magnéticos y de alta calidad",
        srv2_f3: "Listo para marketing de pago u orgánico",
        
        // Seção Ideal Para
        ideal_tagline: "Público Objetivo",
        ideal_title: "Ideal para profesionales y empresas que quieren crecer",
        ideal_medicos: "Médicos",
        ideal_clinicas: "Clínicas",
        ideal_dentistas: "Dentistas",
        ideal_advogados: "Abogados",
        ideal_corretores: "Corredores / Brokers",
        ideal_contadores: "Contadores",
        ideal_servicos: "Empresas de Servicios",
        ideal_comercio: "Comercios",
        ideal_prestadores: "Prestadores de Servicio",

        // Seção Quem Somos (Perfil de Maria Gilmara)
        profile_tagline: "Quiénes Somos",
        profile_title: "Hola, soy Maria Gilmara",
        profile_desc: "Soy diseñadora web y social media. Mi objetivo es ayudar a empresas y profesionales a construir una presencia digital profesional a través de sitios web, landing pages y materiales visuales que transmitan credibilidad y confianza.<br><br>Atiendo a clientes en portugués y español, desarrollando soluciones para negocios que desean crecer y fortalecer su marca en internet.",

        // Badges Flutuantes (Estilo Card)
        badge_web_title: "Web Design",
        badge_web_desc: "Sitios de Alto Rendimiento",
        badge_social_title: "Social Media",
        badge_social_desc: "Feed y Creativos Premium",
        badge_lang_title: "Bilingüe",
        badge_lang_desc: "Portugués & Español",
        badge_creds_title: "Confianza",
        badge_creds_desc: "Diseño que Convierte",
        hero_badge_ux_title: "UX/UI",
        hero_badge_ux_desc: "Diseño Intuitivo y Moderno",
        hero_badge_opt_title: "Optimización",
        hero_badge_opt_desc: "Enfocado en Conversión",
        hero_badge_perf_title: "Performance",
        hero_badge_perf_desc: "Carga Ultra Rápida",
        
        // Testemunios
        testimonials_title: "Lo Que Dicen Nuestros Clientes",
        testimonials_desc: "Historias reales, resultados reales. Descubra el impacto de un diseño de alto nivel en los negocios.",
        test1_text: '"El sitio web desarrollado por GDS triplicó la programación de consultas en mi clínica en Foz. La experiencia del paciente en el móvil es perfecta y el diseño transmite mucha credibilidad."',
        test1_user_role: "Dermatóloga / Clínica CDE",
        test2_text: '"Excelente trabajo con los posts y creativos de Instagram. El aspecto visual quedó increíblemente limpio, moderno y atractivo, lo que aumentó directamente nuestras ventas de importaciones en Paraguay."',
        test2_user_role: "Gerente de Importadora / CDE",
        test3_text: '"Como estudiante de medicina en Ciudad del Este, necesitaba un portafolio digital para ofrecer servicios de asesoría a nuevos alumnos brasileños. ¡El sitio creado por GDS quedó impecable!"',
        test3_user_role: "Asesoría y Estudiante de Medicina",
        
        // Seção Como Funciona o Processo
        process_tagline: "El Proceso",
        process_title: "¿Cómo funciona el proceso?",
        process_desc: "Del primer contacto al soporte continuo: pasos claros para el éxito de tu proyecto.",
        proc1_title: "1. Solicita un presupuesto",
        proc1_desc: "Completa la cotización rápida.",
        proc2_title: "2. Atención personalizada",
        proc2_desc: "Conversamos por WhatsApp.",
        proc3_title: "3. Propuesta y contrato",
        proc3_desc: "Todo alineado con transparencia.",
        proc4_title: "4. Pago de la entrega inicial",
        proc4_desc: "Inicio del proyecto.",
        proc5_title: "5. Envío de información",
        proc5_desc: "Envío de fotos, textos y preferencias.",
        proc6_title: "6. Desarrollo",
        proc6_desc: "Creación de tu landing page.",
        proc7_title: "7. Revisión y entrega",
        proc7_desc: "Ajustes finales y publicación.",
        proc8_title: "8. Soporte opcional",
        proc8_desc: "Mantenimiento y actualizaciones cuando sea necesario.",
        
        // Funil de Briefing
        funnel_tagline: "Hacer Presupuesto",
        funnel_title: "Simula tu proyecto en 1 minuto",
        funnel_desc: "Responde los pasos a continuación y envíame las especificaciones. Te contactaré con la propuesta ideal para ti.",
        
        // Etapas Funil
        step1_title: "¿Cuál es el principal servicio que deseas divulgar?",
        step1_desc: "Ej: Derecho Previsional, Armonización Facial, Venta de Inmuebles.",
        opt_lp: "Landing Page",
        opt_flyer: "Flyers de Instagram",
        opt_site: "Sitio Completo",
        opt_other: "Otro Proyecto",
        
        step2_title: "Cuéntanos sobre tu empresa",
        step2_desc: "¿Quién es tu público objetivo? ¿Qué vende tu empresa? Esto nos ayudará a crear el mensaje correcto.",
        lbl_niche: "Nicho / Área de Actuación",
        lbl_audience: "Público Objetivo principal",
        placeholder_niche: "Ej: Clínica médica, Abogacía, Venta de productos...",
        placeholder_audience: "Ej: Estudiantes de medicina, Empresas locales, Pacientes...",
        
        step3_title: "Objetivo de la página",
        step3_desc: "¿Qué resultado esperas con el sitio web?",
        opt_style_wpp: "Recibir mensajes en WhatsApp",
        opt_style_leads: "Captar leads",
        opt_style_company: "Presentar mi empresa",
        opt_style_schedule: "Agendamientos",
        opt_style_other: "Otro",
        
        step4_title: "Rango de inversión del proyecto",
        step4_desc: "¿Cuál de estas opciones se acerca más a la inversión que pretendes hacer?",
        opt_budget_1: "Hasta R$ 1.000",
        opt_budget_2: "R$ 1.000 a R$ 2.000",
        opt_budget_3: "Más de R$ 2.000",
        
        step5_title: "Tus datos de contacto",
        step5_desc: "Dónde te contactaremos para presentar la propuesta.",
        lbl_name: "Tu Nombre Completo",
        lbl_whatsapp: "WhatsApp (con DDI / código de área)",
        lbl_email: "E-mail de Contacto",
        placeholder_name: "Escribe tu nombre",
        placeholder_whatsapp: "Ej: +595 973 123456 o +55...",
        placeholder_email: "Ej: contacto@empresa.com",
        
        btn_prev: "Volver",
        btn_next: "Siguiente",
        btn_submit: "Enviar a WhatsApp",
        
        // Seção FAQ
        faq_tagline: "FAQ",
        faq_title: "Preguntas Frecuentes",
        faq_desc: "Confira las respuestas a las principales dudas de nuestros clientes sobre a criação de sites e plazos.",
        
        faq1_q: "¿Cuánto tiempo toma tener mi sitio listo?",
        faq1_a: "El plazo promedio de entrega para una Landing Page profesional es de 1 a 2 semanas, a partir del envío de toda la información de la página y aprobación del diseño.",
        
        faq2_q: "¿Como funciona la forma de pago?",
        faq2_a: "Trabajamos con 50% de señal al inicio del proyecto y el 50% restante al aprobar y entregar la web. Aceptamos Pix, transferencias en Paraguay y Guaraníes.",
        
        faq3_q: "¿Necesito tener los textos y fotos listos?",
        faq3_a: "¡No te preocupes por eso! Yo te guío en la elaboración del contenido y te ayudo a estructurar los textos ideales enfocados en convencer a tu cliente.",
        
        faq4_q: "¿El sitio será mío tras la entrega?",
        faq4_a: "Sí, ¡100% tuyo! El sitio se registra a tu nombre o el de tu empresa, y recibes todos os acessos del panel y del hosting.",
        
        faq5_q: "¿Hacen sitios web para empresas de Paraguay?",
        faq5_a: "Sí, creamos páginas específicas adaptadas al público paraguayo y a las particularidades del mercado local en Ciudad del Este o Asunción.",
        
        // Footer
        footer_brand_desc: "GDS Design — Creación de landing pages y diseño estratégico para empresas brasileñas y paraguaias. Elevando negocios a través del diseño.",
        footer_quick_links: "Enlaces Rápidos",
        footer_contact: "Contacto",
        footer_faith: "Guiados por la fe, creamos con propósito. 'Todo lo puedo en Cristo que me fortalece.'",
        footer_rights: "© 2026 GDS Design. Todos os direitos reservados.",
        final_cta_title: "No necesitas un sitio web más.",
        final_cta_subtitle: "Necesitas un sistema que venda.",
        final_cta_btn: "Quiero un sitio que venda"
    }
};

// --- Estado Global de Idioma ---
let currentLang = localStorage.getItem('gds_lang') || 'pt';

// --- Traduzir Elementos da Página ---
function translatePage() {
    const dict = translations[currentLang];
    
    // Traduz textos normais
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            el.innerHTML = dict[key];
        }
    });

    // Traduz placeholders de inputs
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (dict[key]) {
            el.setAttribute('placeholder', dict[key]);
        }
    });

    // Atualiza botão do seletor
    const langBtnText = document.getElementById('langBtnText');
    if (langBtnText) {
        langBtnText.textContent = currentLang.toUpperCase() === 'PT' ? '🇵🇹 PT' : '🇪🇸 ES';
    }
}

// Alterna idioma
function toggleLanguage() {
    currentLang = currentLang === 'pt' ? 'es' : 'pt';
    localStorage.setItem('gds_lang', currentLang);
    translatePage();
}

// --- Lógica do Funil de Briefing ---
let currentStep = 1;
const totalSteps = 5;

// Estrutura do Briefing
const briefingData = {
    service: "",
    niche: "",
    audience: "",
    style: "",
    budget: "",
    deadline: "",
    clientName: "",
    clientWhatsapp: "",
    clientEmail: ""
};

// Seleciona tipo de serviço
function selectService(serviceKey, element) {
    briefingData.service = serviceKey;
    
    // Destaca o selecionado
    document.querySelectorAll('.service-opt-box').forEach(box => {
        box.classList.remove('selected');
    });
    element.classList.add('selected');
    
    document.getElementById('btnNext').disabled = false;
}

// Seleciona preferência de estilo visual
function selectStyle(styleKey, element) {
    briefingData.style = styleKey;
    
    // Destaca o selecionado
    document.querySelectorAll('.style-opt-box').forEach(box => {
        box.classList.remove('selected');
    });
    element.classList.add('selected');
    
    document.getElementById('btnNext').disabled = false;
}

// Seleciona orçamento
function selectBudget(budgetKey, element) {
    briefingData.budget = budgetKey;
    
    // Destaca o selecionado
    document.querySelectorAll('.budget-opt-box').forEach(box => {
        box.classList.remove('selected');
    });
    element.classList.add('selected');
    
    document.getElementById('btnNext').disabled = false;
}

// Atualiza a barra de progresso do formulário
function updateProgressBar() {
    const bar = document.getElementById('indicatorBar');
    if (bar) {
        const percentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
        bar.style.width = `${percentage}%`;
    }

    for (let i = 1; i <= totalSteps; i++) {
        const node = document.getElementById(`stepNode${i}`);
        if (node) {
            node.classList.remove('active', 'completed');
            if (i < currentStep) {
                node.classList.add('completed');
            } else if (i === currentStep) {
                node.classList.add('active');
            }
        }
    }
}

// Mostra o passo atual e oculta os outros
function showStep() {
    document.querySelectorAll('.step-pane').forEach(pane => {
        pane.classList.remove('active');
    });
    
    const currentPane = document.getElementById(`stepPane${currentStep}`);
    if (currentPane) {
        currentPane.classList.add('active');
    }
    
    const btnPrev = document.getElementById('btnPrev');
    const btnNext = document.getElementById('btnNext');
    
    if (btnPrev) {
        btnPrev.style.visibility = currentStep === 1 ? 'hidden' : 'visible';
    }
    
    if (btnNext) {
        const dict = translations[currentLang];
        if (currentStep === totalSteps) {
            btnNext.textContent = dict.btn_submit;
        } else {
            btnNext.textContent = dict.btn_next;
        }
        validateCurrentStep();
    }
    
    updateProgressBar();
}

// Valida campos do passo atual antes de permitir avançar
function validateCurrentStep() {
    const btnNext = document.getElementById('btnNext');
    if (!btnNext) return;

    let isValid = true;
    
    if (currentStep === 1) {
        isValid = briefingData.service !== "";
    } else if (currentStep === 2) {
        const nicheVal = document.getElementById('inputNiche').value.trim();
        const audienceVal = document.getElementById('inputAudience').value.trim();
        isValid = nicheVal !== "" && audienceVal !== "";
        if (isValid) {
            briefingData.niche = nicheVal;
            briefingData.audience = audienceVal;
        }
    } else if (currentStep === 3) {
        isValid = briefingData.style !== "";
    } else if (currentStep === 4) {
        isValid = briefingData.budget !== "";
    } else if (currentStep === 5) {
        const nameVal = document.getElementById('inputName').value.trim();
        const whatsappVal = document.getElementById('inputWhatsapp').value.trim();
        const emailVal = document.getElementById('inputEmail').value.trim();
        
        isValid = nameVal !== "" && whatsappVal !== "" && emailVal !== "";
        if (isValid) {
            briefingData.clientName = nameVal;
            briefingData.clientWhatsapp = whatsappVal;
            briefingData.clientEmail = emailVal;
        }
    }
    
    btnNext.disabled = !isValid;
}

// Avança para o próximo passo ou envia o formulário
async function handleNext() {
    if (currentStep === 2) {
        briefingData.niche = document.getElementById('inputNiche').value.trim();
        briefingData.audience = document.getElementById('inputAudience').value.trim();
    } else if (currentStep === 5) {
        briefingData.clientName = document.getElementById('inputName').value.trim();
        briefingData.clientWhatsapp = document.getElementById('inputWhatsapp').value.trim();
        briefingData.clientEmail = document.getElementById('inputEmail').value.trim();
        
        await submitBriefing();
        return;
    }

    if (currentStep < totalSteps) {
        currentStep++;
        showStep();
    }
}

// Volta um passo
function handlePrev() {
    if (currentStep > 1) {
        currentStep--;
        showStep();
    }
}

// Salva lead no CRM local e abre o WhatsApp
async function submitBriefing() {
    const leadId = 'lead_' + Math.random().toString(36).substr(2, 9);
    const leadEntry = {
        id: leadId,
        cliente: briefingData.clientName,
        telefone: briefingData.clientWhatsapp,
        email: briefingData.clientEmail,
        servico: briefingData.service,
        detalhes: `Nicho: ${briefingData.niche} | Público: ${briefingData.audience} | Estilo: ${briefingData.style}`,
        valor: briefingData.budget,
        prazo: briefingData.deadline || "Não especificado",
        status: "Briefing",
        createdAt: new Date().toISOString()
    };
    
    const storedLeads = JSON.parse(localStorage.getItem('gds_viagens') || '[]');
    storedLeads.push(leadEntry);
    localStorage.setItem('gds_viagens', JSON.stringify(storedLeads));
    
    const adminPhone = localStorage.getItem('gds_admin_phone') || "595973977991";
    
    let text = "";
    if (currentLang === 'pt') {
        text = `Olá, Maria! Gostaria de fazer uma cotação de projeto para minha empresa. Seguem as informações do meu projeto:
        
📋 *Dados do Projeto:*
• *Serviço:* ${briefingData.service}
• *Atuação / Nicho:* ${briefingData.niche}
• *Público-Alvo:* ${briefingData.audience}
• *Objetivo da Página:* ${briefingData.style}
• *Faixa de Investimento:* ${briefingData.budget}

👤 *Contato:*
• *Nome:* ${briefingData.clientName}
• *WhatsApp:* ${briefingData.clientWhatsapp}
• *E-mail:* ${briefingData.clientEmail}`;
    } else {
        text = `¡Hola, Maria! Me gustaría cotizar un proyecto para mi empresa. Aquí están los detalles de mi proyecto:
        
📋 *Detalles del Proyecto:*
• *Servicio:* ${briefingData.service}
• *Rubro / Nicho:* ${briefingData.niche}
• *Público Objetivo:* ${briefingData.audience}
• *Objetivo de la Página:* ${briefingData.style}
• *Rango de Inversión:* ${briefingData.budget}

👤 *Contacto:*
• *Nombre:* ${briefingData.clientName}
• *WhatsApp:* ${briefingData.clientWhatsapp}
• *E-mail:* ${briefingData.clientEmail}`;
    }
    
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${adminPhone}?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
    
    alert(currentLang === 'pt' ? 'Simulação enviada com sucesso! Abrindo WhatsApp...' : '¡Simulación enviada con éxito! Abriendo WhatsApp...');
    resetBriefingForm();
}

function resetBriefingForm() {
    currentStep = 1;
    briefingData.service = "";
    briefingData.niche = "";
    briefingData.audience = "";
    briefingData.style = "";
    briefingData.budget = "";
    briefingData.deadline = "";
    briefingData.clientName = "";
    briefingData.clientWhatsapp = "";
    briefingData.clientEmail = "";
    
    document.querySelectorAll('.service-opt-box, .style-opt-box, .budget-opt-box').forEach(box => {
        box.classList.remove('selected');
    });
    
    document.getElementById('inputNiche').value = "";
    document.getElementById('inputAudience').value = "";
    document.getElementById('inputName').value = "";
    document.getElementById('inputWhatsapp').value = "";
    document.getElementById('inputEmail').value = "";
    
    showStep();
}

// --- Menu de Rolagem do Header ---
function handleHeaderScroll() {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
}

// --- Accordion Interativo da Seção FAQ ---
function setupFaqAccordion() {
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const faqItem = button.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const isActive = faqItem.classList.contains('active');
            
            // Fecha todos os outros FAQs abertos
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-answer').style.maxHeight = null;
            });
            
            // Se não estava ativo, abre o selecionado
            if (!isActive) {
                faqItem.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
}

// --- Animações GSAP (Leves e Otimizadas) ---
function initGsapAnimations() {
    if (typeof gsap === 'undefined') return;

    // Animação de entrada do Hero
    gsap.from(".hero-content > *", {
        duration: 1,
        y: 40,
        opacity: 0,
        stagger: 0.15,
        ease: "power3.out"
    });


    // Revelação de cards à medida que rola a página (Intersection Observer leve)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gsap.from(entry.target, {
                    duration: 0.8,
                    y: 30,
                    opacity: 0,
                    ease: "power2.out"
                });
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    document.querySelectorAll('.glass-card, .ideal-card, .profile-image-frame, .profile-content').forEach(card => {
        observer.observe(card);
    });
}

// --- Menu Mobile Alternável ---
function setupMobileMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuBtn.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.className = 'fa-solid fa-xmark';
                } else {
                    icon.className = 'fa-solid fa-bars';
                }
            }
        });
        
        // Fechar menu quando clicar em um link
        navLinks.querySelectorAll('.nav-link, .btn').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuBtn.querySelector('i');
                if (icon) {
                    icon.className = 'fa-solid fa-bars';
                }
            });
        });
    }
}

// --- Inicialização Automática ---
document.addEventListener('DOMContentLoaded', () => {
    translatePage();
    setupMobileMenu();
    window.addEventListener('scroll', handleHeaderScroll);
    
    const langBtn = document.getElementById('langBtn');
    if (langBtn) {
        langBtn.addEventListener('click', toggleLanguage);
    }
    
    const btnPrev = document.getElementById('btnPrev');
    const btnNext = document.getElementById('btnNext');
    if (btnPrev) btnPrev.addEventListener('click', handlePrev);
    if (btnNext) btnNext.addEventListener('click', handleNext);
    
    document.querySelectorAll('.step-pane input, .step-pane textarea').forEach(input => {
        input.addEventListener('input', validateCurrentStep);
    });
    
    showStep();
    setupFaqAccordion();
    initGsapAnimations();

    // Observer para animação do Dashboard Hero (hero-image e badges)
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        const dashboardWrapper = document.querySelector('.dashboard-wrapper');
        const heroBadges = document.querySelectorAll('.hero-visual .floating-badge-card');
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    heroImage.classList.add('visible');
                    if (dashboardWrapper) {
                        dashboardWrapper.classList.add('visible');
                    }
                    heroBadges.forEach(badge => {
                        badge.classList.add('visible');
                    });
                    heroObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });
        heroObserver.observe(heroImage);
    }
});
