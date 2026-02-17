document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Slider Logic
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentSlide = 0;

    // Create dots
    slides.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if(i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function goToSlide(n) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide = n;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    setInterval(() => {
        let next = (currentSlide + 1) % slides.length;
        goToSlide(next);
    }, 6000);

    // 2. Intelligent Chatbot Logic
    const chatToggle = document.getElementById('chat-toggle');
    const chatWidget = document.getElementById('chat-widget');
    const closeChat = document.getElementById('close-chat');
    const sendBtn = document.getElementById('send-chat');
    const chatInput = document.getElementById('chat-input');
    const chatBody = document.getElementById('chat-body');

    chatToggle.onclick = () => chatWidget.classList.toggle('active');
    closeChat.onclick = () => chatWidget.classList.remove('active');

    const responses = {
        wedding: "Ricardo offers three wedding packages: Full-Day (£2195), Half-Day (£1295), and Ceremony Only (£795). All include an online gallery!",
        portrait: "Portrait sessions start at £195 for families/birthdays. Personal branding is £495, and professional headshots are just £99.",
        style: "Ricardo's style is 'unapologetically real.' He focuses on light on skin, movement, and the pauses between moments.",
        location: "Based in North East England, Ricardo loves open coastlines and industrial textures.",
        contact: "You can reach us at booking@richistudio.com to discuss your project!",
        price: "Prices range from £99 for headshots to £2195 for full-day wedding storytelling.",
        hello: "Hi there! I'm Ricardo's assistant. How can I help you with your photography needs today?"
    };

    function getBotResponse(msg) {
        const input = msg.toLowerCase();
        if (input.includes("wedding") || input.includes("marry")) return responses.wedding;
        if (input.includes("portrait") || input.includes("family") || input.includes("headshot")) return responses.portrait;
        if (input.includes("style") || input.includes("how")) return responses.style;
        if (input.includes("price") || input.includes("cost") || input.includes("much")) return responses.price;
        if (input.includes("contact") || input.includes("email")) return responses.contact;
        if (input.includes("where") || input.includes("location")) return responses.location;
        return "That's a great question! For specific details on that, it's best to email Ricardo at booking@richistudio.com.";
    }

    function sendMessage() {
        const text = chatInput.value.trim();
        if(!text) return;

        // User Message
        const uMsg = document.createElement('div');
        uMsg.className = 'user-msg';
        uMsg.textContent = text;
        chatBody.appendChild(uMsg);
        chatInput.value = '';

        // Bot Response
        setTimeout(() => {
            const bMsg = document.createElement('div');
            bMsg.className = 'bot-msg';
            bMsg.textContent = getBotResponse(text);
            chatBody.appendChild(bMsg);
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 800);
    }

    sendBtn.onclick = sendMessage;
    chatInput.onkeypress = (e) => { if(e.key === 'Enter') sendMessage(); };
});