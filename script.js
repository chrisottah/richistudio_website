document.addEventListener('DOMContentLoaded', () => {

    // ─────────────────────────────────────────────────────────
    // 1. HERO SLIDER — driven by slider-images.json
    //    Ricardo can swap images by editing that file alone.
    // ─────────────────────────────────────────────────────────
    const sliderContainer = document.getElementById('slider-container');
    const dotsContainer   = document.querySelector('.slider-dots');

    if (sliderContainer && dotsContainer) {

        function buildSlider(data) {
            let currentSlide = 0;

            // Build slide elements from JSON data
            data.forEach((item, i) => {
                const slide = document.createElement('div');
                slide.className = 'slide' + (i === 0 ? ' active' : '');
                slide.innerHTML = `
                    <div class="slide-bg" style="background-image: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${item.src}')"></div>
                    <div class="hero-content">
                        <h1>${item.headline}</h1>
                        <p>${item.sub}</p>
                        <div class="hero-btns">
                            <a href="portfolio.html" class="btn-outline-hero">View Portfolio</a>
                            <a href="bookings.html" class="btn-outline-hero">Book Now</a>
                        </div>
                    </div>`;
                sliderContainer.appendChild(slide);

                // Dot
                const dot = document.createElement('span');
                dot.classList.add('dot');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            });

            const slides = document.querySelectorAll('.slide');
            const dots   = document.querySelectorAll('.dot');

            function goToSlide(n) {
                slides[currentSlide].classList.remove('active');
                dots[currentSlide].classList.remove('active');
                currentSlide = n;
                slides[currentSlide].classList.add('active');
                dots[currentSlide].classList.add('active');
            }

            setInterval(() => {
                goToSlide((currentSlide + 1) % slides.length);
            }, 6000);
        }

        // Fetch slider data from slider-images.json
        fetch('slider-images.json')
            .then(res => {
                if (!res.ok) throw new Error('Could not load slider-images.json');
                return res.json();
            })
            .then(data => buildSlider(data))
            .catch(() => {
                // Fallback: if JSON can't be fetched (e.g. opened as a local
                // file:// without a server), build from these defaults instead.
                buildSlider([
                    { src: 'images/hero/hero1.webp', headline: 'Capturing the <em>Soul</em> of Light',   sub: 'Editorial photography based in North East England.' },
                    { src: 'images/hero/hero2.webp', headline: 'Lived-in &amp; <em>Textured</em>',       sub: 'Portraits that celebrate confidence and individuality.' },
                    { src: 'images/hero/hero3.webp', headline: 'The <em>Electricity</em> in the Air',    sub: 'Event photography chasing rare, unmissable moments.' },
                ]);
            });
    }


    // ─────────────────────────────────────────────────────────
    // 2. MOBILE MENU (All pages)
    // ─────────────────────────────────────────────────────────
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('is-active');
            // Prevent page scrolling when menu is open
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('is-active');
                document.body.style.overflow = '';
            });
        });
    }


    // ─────────────────────────────────────────────────────────
    // 3. BOOKING AUTO-SELECT (Services → Bookings flow)
    // ─────────────────────────────────────────────────────────
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    if (serviceParam) {
        const selectElement = document.getElementById('job-type');
        if (selectElement) selectElement.value = serviceParam;
    }


    // ─────────────────────────────────────────────────────────
    // 4. CONVERSATIONAL CHATBOT (All pages)
    // ─────────────────────────────────────────────────────────
    const chatToggle = document.getElementById('chat-toggle');
    const chatWidget = document.getElementById('chat-widget');
    const closeChat  = document.getElementById('close-chat');
    const sendBtn    = document.getElementById('send-chat');
    const chatInput  = document.getElementById('chat-input');
    const chatBody   = document.getElementById('chat-body');

    if (!chatToggle || !chatWidget) return;

    // ── Open / Close ──
    chatToggle.addEventListener('click', () => {
        chatWidget.classList.toggle('active');
        if (chatWidget.classList.contains('active')) {
            chatInput.focus();
        }
    });
    closeChat.addEventListener('click', () => chatWidget.classList.remove('active'));


    // ═══════════════════════════════════════════════════════
    // KNOWLEDGE BASE — sourced from Ricardo's About & Services
    // ═══════════════════════════════════════════════════════
    const KB = {
        about: {
            bio: "Ricardo Afrika is a portrait, lifestyle, event and beauty photographer based in North East England. He's been photographing since 2015 — with a style that feels lived-in, textured, and unapologetically real.",
            style: "Ricardo's style is all about authenticity. He doesn't overcomplicate shoots — he creates space, guides softly, and lets people settle into themselves. He focuses on light on skin, movement in a room, and the pauses between moments. His work lives in the in-between: bold meets calm, direction meets spontaneity.",
            location: "Ricardo is based in North East England. The open coastlines, industrial textures, and shifting skies of the North East heavily influence his work — there's grit and softness there, and he carries both into every frame.",
            approach: "Ricardo guides softly on shoots. He creates space and lets people settle into themselves — 'that's when the magic happens, when the camera disappears and what's left is honesty.' He doesn't overcomplicate things.",
            contact: "You can reach Ricardo directly at booking@richistudio.com — he'd love to hear about your project.",
        },

        weddings: {
            overview: "Ricardo offers three wedding packages to suit different celebrations — from intimate registry ceremonies to full-day editorial storytelling.",
            fullDay: {
                name: "Full-Day Wedding",
                price: "£2,195",
                hours: "Up to 10 hours",
                includes: ["Full day from bridal prep to afterparty", "400–600+ fully edited images", "Private online gallery", "Flash drive with high-res photos", "Cinematic highlight slideshow", "Pre-wedding consultation", "Optional golden hour couple shoot"],
            },
            halfDay: {
                name: "Half-Day Moments",
                price: "£1,295",
                hours: "Up to 6 hours",
                includes: ["Bridal preparation through to reception", "All edited images in a private gallery", "Cinematic highlight slideshow", "Pre-wedding consultation"],
            },
            ceremony: {
                name: "Ceremony Only",
                price: "£795",
                hours: "Up to 3 hours",
                includes: ["Guest arrival through post-ceremony portraits", "All edited images in an online gallery", "Pre-wedding consultation"],
            },
        },

        engagement: {
            name: "Engagement / Pre-Wedding Shoot",
            price: "£395",
            duration: "60–90 minutes",
            includes: ["Style consultation", "1–2 locations of your choice", "Private online gallery", "60+ fully edited images"],
            bestFor: "Save-the-dates, wedding websites, and announcements. Also great for couples who want to feel comfortable in front of the camera before the big day.",
        },

        portraits: {
            overview: "Ricardo offers three portrait session types — family/birthday, personal branding, and professional headshots.",
            family: {
                name: "Birthday & Family Sessions",
                price: "£195",
                style: "Authentic, lifestyle-focused imagery that captures connection, joy, and real personality.",
            },
            branding: {
                name: "Personal Branding",
                price: "£495",
                style: "Strategic imagery for entrepreneurs, creatives, and professionals who want cohesive visual storytelling across digital platforms.",
            },
            headshots: {
                name: "Professional / Graduation Headshots",
                price: "£99",
                style: "Clean, modern portraits for LinkedIn, corporate profiles, speaking engagements, and graduation milestones.",
            },
        },

        commercial: {
            overview: "Ricardo takes on commercial and editorial work including product photography, lifestyle brand campaigns, editorial features, and creative direction.",
            pricing: "Commercial projects are quoted individually — because no two brand stories are the same. Get in touch via booking@richistudio.com to discuss your brief.",
        },
    };

    // ═══════════════════════════════════════════════════════
    // CONVERSATION STATE
    // ═══════════════════════════════════════════════════════
    let state = {
        step: 'start',       // conversation step tracker
        askedAbout: null,    // what they last enquired about
        userName: null,      // if they give their name
    };

    // ═══════════════════════════════════════════════════════
    // RESPONSE ENGINE
    // ═══════════════════════════════════════════════════════
    function getBotResponse(msg) {
        const input = msg.toLowerCase().trim();

        // ── Greetings ──
        if (/^(hi|hey|hello|hiya|good morning|good evening|good afternoon|howdy|sup|what'?s up|yo)\b/.test(input)) {
            return `Hey there! 👋 Great to have you here. I'm Ricardo's virtual assistant — I can tell you about sessions, pricing, Ricardo's style, or help you figure out which package fits best. What brings you in today?`;
        }

        // ── Name exchange ──
        if (/my name is (.+)|i'?m (.+)|i am (.+)/i.test(input)) {
            const match = input.match(/my name is (.+)|i'?m (.+)|i am (.+)/i);
            state.userName = (match[1] || match[2] || match[3]).split(' ')[0];
            state.userName = state.userName.charAt(0).toUpperCase() + state.userName.slice(1);
            return `Lovely to meet you, ${state.userName}! 😊 So, what can I help you with today? Are you thinking about a wedding, portraits, or something else entirely?`;
        }

        // ── Thank you ──
        if (/thank|thanks|cheers|appreciate/.test(input)) {
            return `You're very welcome${state.userName ? ', ' + state.userName : ''}! Is there anything else you'd like to know? 😊`;
        }

        // ── Goodbye ──
        if (/bye|goodbye|see you|talk later|ciao/.test(input)) {
            return `It was great chatting${state.userName ? ', ' + state.userName : ''}! Don't hesitate to reach out at booking@richistudio.com whenever you're ready to book. Speak soon! 📷`;
        }

        // ── About Ricardo / Who is he ──
        if (/who is|about ricardo|about you|tell me about|photographer|biography/.test(input)) {
            return `${KB.about.bio}\n\nHe's based in ${KB.about.location.split('.')[0].replace('Ricardo is based in ', '')} and works across weddings, portraits, lifestyle, events, and beauty. Want to know more about his style or his packages?`;
        }

        // ── Style / Approach ──
        if (/style|approach|how do you|what is your|technique|aesthetic|vibe|feel|look/.test(input)) {
            return `${KB.about.style}\n\n"When the camera disappears and what's left is honesty" — that's the goal on every shoot. Would you like to know about a specific session type?`;
        }

        // ── Location ──
        if (/where|location|based|north east|newcastle|sunderland|durham|travel/.test(input)) {
            return `${KB.about.location}\n\nIf you're outside the North East, get in touch at booking@richistudio.com — Ricardo does travel for the right projects!`;
        }

        // ── WEDDINGS (general) ──
        if (/wedding|marry|married|bride|groom|ceremony|reception|nuptial/.test(input) && !/engagement|pre.wed/.test(input)) {
            state.askedAbout = 'wedding';
            return `Ricardo offers three beautiful wedding packages:\n\n• **Full-Day** (${KB.weddings.fullDay.price}) — Up to 10 hours, the complete story\n• **Half-Day** (${KB.weddings.halfDay.price}) — Up to 6 hours, perfect for smaller celebrations\n• **Ceremony Only** (${KB.weddings.ceremony.price}) — Up to 3 hours, just the key moments\n\nAll packages include edited images in a private gallery and a pre-wedding consultation. Which one sounds closest to what you're imagining?`;
        }

        // ── Full Day Wedding ──
        if (/full.?day|full day|10 hour|all day|everything/.test(input) && (state.askedAbout === 'wedding' || /wedding/.test(input))) {
            return `The **Full-Day Wedding** package (${KB.weddings.fullDay.price}) is Ricardo's most comprehensive offering:\n\n${KB.weddings.fullDay.includes.map(i => '• ' + i).join('\n')}\n\nIt's his most popular package — designed for couples who want every meaningful moment captured with editorial precision. Shall I help you book this one?`;
        }

        // ── Half Day Wedding ──
        if (/half.?day|half day|6 hour/.test(input) && (state.askedAbout === 'wedding' || /wedding/.test(input))) {
            return `The **Half-Day Moments** package (${KB.weddings.halfDay.price}) covers:\n\n${KB.weddings.halfDay.includes.map(i => '• ' + i).join('\n')}\n\nIt's perfect for smaller celebrations or destination vows. Shall I point you to the booking page?`;
        }

        // ── Ceremony Only ──
        if (/ceremony only|registry|intimate|small wedding|3 hour/.test(input)) {
            return `The **Ceremony Only** package (${KB.weddings.ceremony.price}) is perfect for intimate weddings and registry ceremonies. It covers:\n\n${KB.weddings.ceremony.includes.map(i => '• ' + i).join('\n')}\n\nClean, focused, and beautifully edited. Interested in booking?`;
        }

        // ── ENGAGEMENT / PRE-WEDDING ──
        if (/engagement|pre.wed|save.the.date|announcement|before.?wed/.test(input)) {
            state.askedAbout = 'engagement';
            return `The **Engagement / Pre-Wedding Shoot** (${KB.engagement.price}) is a lovely relaxed session to celebrate your story before the big day. It includes:\n\n${KB.engagement.includes.map(i => '• ' + i).join('\n')}\n\nBest for: ${KB.engagement.bestFor}\n\nWant to find out more or get booked in?`;
        }

        // ── PORTRAITS (general) ──
        if (/portrait|photo session|photoshoot|family|birthday|individual/.test(input) && !/wedding|engagement/.test(input)) {
            state.askedAbout = 'portrait';
            return `Ricardo does three types of portrait sessions:\n\n• **Birthday & Family** (${KB.portraits.family.price}) — Authentic lifestyle imagery capturing real connection\n• **Personal Branding** (${KB.portraits.branding.price}) — Strategic content for entrepreneurs & creatives\n• **Headshots & Graduation** (${KB.portraits.headshots.price}) — Clean, professional portraits for LinkedIn & corporate profiles\n\nWhich of these sounds like you?`;
        }

        // ── Family / Birthday ──
        if (/family|birthday|kids|children|baby|newborn/.test(input)) {
            return `**Birthday & Family Sessions** start at ${KB.portraits.family.price}. ${KB.portraits.family.style}\n\nRicardo guides everyone softly — even little ones! — so the images feel natural rather than staged. Want to go ahead and book?`;
        }

        // ── Personal Branding ──
        if (/brand|branding|business|entrepreneur|creative|social media|content|linkedin|professional/.test(input) && !/headshot/.test(input)) {
            return `**Personal Branding** sessions start at ${KB.portraits.branding.price}. ${KB.portraits.branding.style}\n\nYou'll get images ready for your website, Instagram, and any platform you're building on. Shall I help you book this?`;
        }

        // ── Headshots / Graduation ──
        if (/headshot|graduation|grad|corporate|linkedin|cv|resume/.test(input)) {
            return `**Professional Headshots & Graduation** portraits start at just ${KB.portraits.headshots.price}! ${KB.portraits.headshots.style}\n\nQuick, efficient, and polished — ideal if you just need something that looks sharp and professional. Want to book?`;
        }

        // ── COMMERCIAL ──
        if (/commercial|editorial|product|campaign|brand shoot|advertising/.test(input)) {
            state.askedAbout = 'commercial';
            return `Ricardo takes on commercial and editorial work including:\n\n• Product Photography\n• Lifestyle Brand Campaigns\n• Editorial Features\n• Creative Direction\n\n${KB.commercial.pricing}\n\nWould you like me to point you to the contact page?`;
        }

        // ── PRICING (general) ──
        if (/price|cost|how much|pricing|rate|fee|budget|expensive|cheap|afford/.test(input)) {
            return `Here's a quick overview of pricing:\n\n📷 **Weddings** — ${KB.weddings.ceremony.price} to ${KB.weddings.fullDay.price}\n💑 **Engagement Shoot** — ${KB.engagement.price}\n👥 **Portraits & Family** — from ${KB.portraits.headshots.price}\n🎓 **Headshots** — from ${KB.portraits.headshots.price}\n🏷️ **Personal Branding** — from ${KB.portraits.branding.price}\n🎬 **Commercial** — Custom quote\n\nWhich session are you most interested in? I can give you the full details.`;
        }

        // ── HOW TO BOOK ──
        if (/book|booking|schedule|reserve|appointment|how do i|get started|next step/.test(input)) {
            return `Booking is simple! Head over to the **Book Now** page at the top of the menu, choose your session type, and fill in the details. You can also email Ricardo directly at booking@richistudio.com to have a chat first — he loves getting to know people before the shoot. 📅`;
        }

        // ── WHAT TO WEAR / PREP ──
        if (/wear|outfit|dress|prepare|what should i|look like|how to prepare/.test(input)) {
            return `Great question! Ricardo does a style consultation before most sessions — so you'll talk through looks, colours, and what works best for your shoot. Generally, classic over trendy works well, and layering gives variety. Don't stress it though — Ricardo's job is to make you feel at ease, not to judge your wardrobe! 😄`;
        }

        // ── TURNAROUND / DELIVERY ──
        if (/turnaround|how long|when|deliver|ready|gallery|get photos|receive/.test(input)) {
            return `Great question! Edited images are delivered to a private online gallery. Turnaround time varies by session — for detailed timelines, it's best to ask Ricardo directly at booking@richistudio.com or in the booking form. He'll give you a clear timeline during your consultation.`;
        }

        // ── WHAT HAPPENS ON THE DAY ──
        if (/day of|on the day|what happens|what to expect|nervous|anxious|shy/.test(input)) {
            return `Totally understandable to feel a little nervous! Here's the thing — Ricardo's whole approach is built around making you forget the camera's even there. He creates space, guides you softly, and never rushes. People are usually surprised by how relaxed they feel once they settle in. The magic tends to happen naturally. 😊\n\nAnything specific you'd like to know about the session format?`;
        }

        // ── CONTACT ──
        if (/contact|email|reach|get in touch|talk to|message|call/.test(input)) {
            return `You can reach Ricardo directly at **booking@richistudio.com** — he's always happy to have a conversation before committing to anything. Alternatively, use the **Book Now** page in the menu to send an enquiry with your details. 📧`;
        }

        // ── Compare packages ──
        if (/difference|compare|which one|best for|recommend|should i|versus|vs/.test(input)) {
            if (state.askedAbout === 'wedding' || /wedding/.test(input)) {
                return `Here's a quick comparison of the wedding packages:\n\n• **Full-Day (${KB.weddings.fullDay.price})** — You want every moment documented. A long day with a large gallery (400-600+ images). Best for traditional weddings.\n• **Half-Day (${KB.weddings.halfDay.price})** — A shorter, more intimate celebration. 6 hours, still includes prep and reception.\n• **Ceremony Only (${KB.weddings.ceremony.price})** — Just the ceremony and portraits. Perfect for elopements or registry weddings.\n\nWhat does your wedding day look like? I can help narrow it down!`;
            }
            return `I'd love to help you compare! Are you looking at wedding packages, portrait sessions, or something else? Just let me know what you're weighing up and I'll break it down for you.`;
        }

        // ── Fallback (still conversational) ──
        const fallbacks = [
            `That's a great question! I want to make sure I give you the right answer — for anything specific, Ricardo is best reached at booking@richistudio.com. Is there anything else I can help with in the meantime?`,
            `Hmm, I want to make sure I get that right for you! The best way to get a precise answer is to drop Ricardo a line at booking@richistudio.com. He's really responsive. Anything else I can help with?`,
            `I might need Ricardo's input on that one! You can reach him at booking@richistudio.com or use the Book Now form. In the meantime, can I tell you about any of the sessions or packages?`,
        ];
        return fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }


    // ═══════════════════════════════════════════════════════
    // SEND & RENDER MESSAGES
    // ═══════════════════════════════════════════════════════

    // Render simple markdown-ish formatting
    function formatMessage(text) {
        return text
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')  // **bold**
            .replace(/\n/g, '<br>');                             // line breaks
    }

    function addMessage(text, sender) {
        const msg = document.createElement('div');
        msg.className = sender === 'bot' ? 'bot-msg' : 'user-msg';
        msg.innerHTML = sender === 'bot' ? formatMessage(text) : escapeHtml(text);
        chatBody.appendChild(msg);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function escapeHtml(str) {
        return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    }

    function showTyping() {
        const typing = document.createElement('div');
        typing.className = 'bot-msg typing-indicator';
        typing.innerHTML = '<span></span><span></span><span></span>';
        typing.id = 'typing';
        chatBody.appendChild(typing);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function removeTyping() {
        const t = document.getElementById('typing');
        if (t) t.remove();
    }

    function sendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        addMessage(text, 'user');
        chatInput.value = '';

        showTyping();
        // Variable delay — short messages reply faster
        const delay = 600 + Math.min(text.length * 10, 900);
        setTimeout(() => {
            removeTyping();
            const response = getBotResponse(text);
            addMessage(response, 'bot');
        }, delay);
    }

    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') sendMessage();
    });

});