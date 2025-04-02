// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.md\\:hidden button');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            const menu = this.parentElement.querySelector('.hidden.md\\:flex');
            if (menu) {
                menu.classList.toggle('hidden');
                menu.classList.toggle('flex');
                menu.classList.toggle('flex-col');
                menu.classList.toggle('absolute');
                menu.classList.toggle('top-16');
                menu.classList.toggle('left-0');
                menu.classList.toggle('right-0');
                menu.classList.toggle('bg-blue-700');
                menu.classList.toggle('p-4');
                menu.classList.toggle('space-y-4');
                menu.classList.toggle('space-x-0');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission handling
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically add form submission logic
            alert('Form submitted! (This is a demo)');
        });
    });

    // AI Assistant chat functionality (if on that page)
    if (document.getElementById('chatWindow')) {
        const chatWindow = document.getElementById('chatWindow');
        const messageInput = document.querySelector('input[type="text"]');
        const sendButton = document.querySelector('button i.fa-paper-plane')?.parentNode;
        
        function scrollToBottom() {
            chatWindow.scrollTop = chatWindow.scrollHeight;
        }
        
        function addMessage(content, isUser) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `flex items-start ${isUser ? 'justify-end' : ''}`;
            
            const avatarDiv = document.createElement('div');
            avatarDiv.className = `w-8 h-8 rounded-full ${isUser ? 'bg-gray-200 ml-3' : 'bg-blue-100 mr-3'} flex items-center justify-center`;
            
            const avatarIcon = document.createElement('i');
            avatarIcon.className = `fas ${isUser ? 'fa-user text-gray-600' : 'fa-robot text-blue-600'}`;
            avatarDiv.appendChild(avatarIcon);
            
            const contentDiv = document.createElement('div');
            contentDiv.className = `${isUser ? 'bg-blue-100' : 'bg-blue-50'} rounded-lg p-3 max-w-[80%]`;
            contentDiv.innerHTML = `<p>${content}</p>`;
            
            if (isUser) {
                messageDiv.appendChild(contentDiv);
                messageDiv.appendChild(avatarDiv);
            } else {
                messageDiv.appendChild(avatarDiv);
                messageDiv.appendChild(contentDiv);
            }
            
            chatWindow.appendChild(messageDiv);
            scrollToBottom();
        }
        
        if (sendButton && messageInput) {
            sendButton.addEventListener('click', sendMessage);
            messageInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
            
            function sendMessage() {
                const message = messageInput.value.trim();
                if (message) {
                    addMessage(message, true);
                    messageInput.value = '';
                    
                    // Show typing indicator
                    const typingDiv = document.createElement('div');
                    typingDiv.className = 'flex items-start';
                    typingDiv.innerHTML = `
                        <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                            <i class="fas fa-robot text-blue-600"></i>
                        </div>
                        <div class="bg-blue-50 rounded-lg p-3 max-w-[80%]">
                            <p class="typing-indicator">EduBot is typing</p>
                        </div>
                    `;
                    chatWindow.appendChild(typingDiv);
                    scrollToBottom();
                    
                    // Simulate bot response after delay
                    setTimeout(() => {
                        chatWindow.removeChild(typingDiv);
                        const responses = [
                            "I'm analyzing your question... Here's what I found.",
                            "Great question! Let me explain that concept.",
                            "That's an interesting topic! Would you like me to focus on any particular aspect?"
                        ];
                        addMessage(responses[Math.floor(Math.random() * responses.length)], false);
                    }, 1500);
                }
            }
        }
    }
});