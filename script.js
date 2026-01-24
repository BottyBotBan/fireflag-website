// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 14, 39, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(10, 14, 39, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Add parallax effect to hero content only (prevents section overlap)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const heroOverlay = document.querySelector('.hero-overlay');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.25}px)`;
    }

    if (heroOverlay) {
        heroOverlay.style.transform = `translateY(${scrolled * 0.1}px)`;
    }

    if (scrollIndicator) {
        scrollIndicator.style.transform = `translate(-50%, ${scrolled * 0.2}px)`;
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all major elements
document.querySelectorAll('.feature-card, .stat-box, .update-card, .badge-card, .control-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M+';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K+';
    }
    return num.toLocaleString();
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const numberElement = entry.target.querySelector('.stat-number');
            const targetText = numberElement.textContent;
            let targetNumber;
            
            if (targetText.includes('K+')) {
                targetNumber = parseFloat(targetText) * 1000;
            } else if (targetText.includes('M+')) {
                targetNumber = parseFloat(targetText) * 1000000;
            } else {
                targetNumber = parseInt(targetText.replace(/,/g, ''));
            }
            
            animateCounter(numberElement, targetNumber);
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-box').forEach(box => {
    statsObserver.observe(box);
});

// Add click effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Hall of Fame tabs
const hallTabs = document.querySelectorAll('.hall-tab');
const hallPanels = document.querySelectorAll('.hall-tab-panel');

hallTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-tab');

        hallTabs.forEach(t => {
            t.classList.remove('active');
            t.setAttribute('aria-selected', 'false');
        });

        hallPanels.forEach(panel => panel.classList.remove('active'));

        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        const activePanel = document.getElementById(target);
        if (activePanel) {
            activePanel.classList.add('active');
        }
    });
});


// Add ripple effect styles dynamically
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode.splice(-konamiSequence.length - 1, konamiCode.length - konamiSequence.length);
    
    if (konamiCode.join('').includes(konamiSequence.join(''))) {
        document.body.style.animation = 'rainbow 2s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

// Log a message for developers
console.log('%c🔥 FireFlag Studios 🔥', 'color: #ff4655; font-size: 24px; font-weight: bold;');
console.log('%cWelcome to the Shootz website!', 'color: #ff8c00; font-size: 16px;');
console.log('%cLooking for secrets? Try the Konami code... 😉', 'color: #b8c5d6; font-size: 12px;');
console.log('%cTry typing: unlock(), stats(), or reset()', 'color: #667eea; font-size: 12px;');

// ============================================
// ACHIEVEMENT SYSTEM
// ============================================

const achievements = {
    fireMaster: {
        id: 'fireMaster',
        name: '🔥 Fire Master',
        description: 'Click the fire emoji 10 times',
        unlocked: false
    },
    bulletTime: {
        id: 'bulletTime',
        name: '⚡ Bullet Time',
        description: 'Click the SHOOTZ title 7 times',
        unlocked: false
    },
    speedRunner: {
        id: 'speedRunner',
        name: '🏃 Speed Runner',
        description: 'Scroll to bottom and back to top in 3 seconds',
        unlocked: false
    },
    consoleWarrior: {
        id: 'consoleWarrior',
        name: '🎮 Console Warrior',
        description: 'Use developer console commands',
        unlocked: false
    },
    explorer: {
        id: 'explorer',
        name: '👀 Explorer',
        description: 'Visit all page sections',
        unlocked: false
    },
    annoyingPlayer: {
        id: 'annoyingPlayer',
        name: '😤 Annoying Player',
        description: 'Clicked the manager 30 times',
        unlocked: false
    },
    crownCollector: {
        id: 'crownCollector',
        name: '👑 Crown Collector',
        description: 'Show respect to the founder',
        unlocked: false
    },
    adminMayhem: {
        id: 'adminMayhem',
        name: '😈 Admin Mayhem',
        description: 'Unleash the admin\'s troll power',
        unlocked: false
    }
};

// Load achievements from localStorage
function loadAchievements() {
    const saved = localStorage.getItem('shootz_achievements');
    if (saved) {
        const savedData = JSON.parse(saved);
        Object.keys(achievements).forEach(key => {
            if (savedData[key]) {
                achievements[key].unlocked = savedData[key].unlocked;
            }
        });
    }
}

// Save achievements to localStorage
function saveAchievements() {
    localStorage.setItem('shootz_achievements', JSON.stringify(achievements));
}

// Unlock achievement
function unlockAchievement(achievementId) {
    if (!achievements[achievementId].unlocked) {
        achievements[achievementId].unlocked = true;
        saveAchievements();
        showAchievementNotification(achievements[achievementId]);
        updateAchievementCounter();
    }
}

// Show achievement notification
function showAchievementNotification(achievement) {
    // Custom backgrounds for different achievements
    let background, borderColor, boxShadow;
    
    switch(achievement.id) {
        case 'bulletTime':
            // Electric blue/purple for speed theme
            background = 'linear-gradient(135deg, rgba(138, 43, 226, 0.95), rgba(0, 191, 255, 0.95))';
            borderColor = '#00bfff';
            boxShadow = '0 10px 40px rgba(0, 191, 255, 0.5)';
            break;
        case 'fireMaster':
            // Fiery red/orange
            background = 'linear-gradient(135deg, rgba(255, 69, 0, 0.95), rgba(255, 140, 0, 0.95))';
            borderColor = '#ff4500';
            boxShadow = '0 10px 40px rgba(255, 69, 0, 0.5)';
            break;
        case 'annoyingPlayer':
            // Dark red for annoying theme
            background = 'linear-gradient(135deg, rgba(139, 0, 0, 0.95), rgba(178, 34, 34, 0.95))';
            borderColor = '#8b0000';
            boxShadow = '0 10px 40px rgba(139, 0, 0, 0.5)';
            break;
        case 'adminMayhem':
            // Evil purple/black
            background = 'linear-gradient(135deg, rgba(75, 0, 130, 0.95), rgba(138, 43, 226, 0.95))';
            borderColor = '#8b00ff';
            boxShadow = '0 10px 40px rgba(138, 43, 226, 0.5)';
            break;
        default:
            // Default red/orange theme
            background = 'linear-gradient(135deg, rgba(255, 70, 85, 0.95), rgba(255, 140, 0, 0.95))';
            borderColor = '#ff4655';
            boxShadow = '0 10px 40px rgba(255, 70, 85, 0.5)';
    }
    
    const notification = document.createElement('div');
    notification.innerHTML = `
        <div style="
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${background};
            border: 2px solid ${borderColor};
            border-radius: 15px;
            padding: 1.5rem;
            z-index: 10000;
            min-width: 300px;
            box-shadow: ${boxShadow};
            animation: achievement-slide-in 0.5s ease-out;
        ">
            <div style="font-size: 2rem; text-align: center; margin-bottom: 0.5rem;">🏆</div>
            <div style="
                font-family: 'Orbitron', sans-serif;
                color: white;
                font-size: 1.2rem;
                font-weight: 700;
                text-align: center;
                margin-bottom: 0.5rem;
            ">ACHIEVEMENT UNLOCKED!</div>
            <div style="
                color: white;
                font-size: 1.1rem;
                text-align: center;
                margin-bottom: 0.3rem;
            ">${achievement.name}</div>
            <div style="
                color: rgba(255, 255, 255, 0.8);
                font-size: 0.9rem;
                text-align: center;
            ">${achievement.description}</div>
        </div>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes achievement-slide-in {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'achievement-slide-out 0.5s ease-out forwards';
        const styleOut = document.createElement('style');
        styleOut.textContent = `
            @keyframes achievement-slide-out {
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(styleOut);
        setTimeout(() => notification.remove(), 500);
    }, 4000);
}

// Create achievement counter
function createAchievementCounter() {
    const counter = document.createElement('div');
    counter.id = 'achievement-counter';
    counter.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(10, 14, 39, 0.95);
        border: 2px solid #ff4655;
        border-radius: 50px;
        padding: 0.8rem 1.5rem;
        color: #ff4655;
        font-family: 'Orbitron', sans-serif;
        font-weight: 700;
        font-size: 0.9rem;
        z-index: 9998;
        cursor: pointer;
        transition: all 0.3s;
        box-shadow: 0 5px 20px rgba(255, 70, 85, 0.3);
    `;
    counter.innerHTML = '🏆 0/8';
    counter.addEventListener('mouseenter', () => {
        counter.style.transform = 'scale(1.1)';
        counter.style.boxShadow = '0 8px 30px rgba(255, 70, 85, 0.5)';
    });
    counter.addEventListener('mouseleave', () => {
        counter.style.transform = 'scale(1)';
        counter.style.boxShadow = '0 5px 20px rgba(255, 70, 85, 0.3)';
    });
    counter.addEventListener('click', showAchievementPanel);
    document.body.appendChild(counter);
}

// Update achievement counter
function updateAchievementCounter() {
    const counter = document.getElementById('achievement-counter');
    const unlocked = Object.values(achievements).filter(a => a.unlocked).length;
    const total = Object.keys(achievements).length;
    if (counter) {
        counter.innerHTML = `🏆 ${unlocked}/${total}`;
    }
}

// Show achievement panel
function showAchievementPanel() {
    const panel = document.createElement('div');
    const unlockedCount = Object.values(achievements).filter(a => a.unlocked).length;
    const totalCount = Object.keys(achievements).length;
    
    let achievementHTML = '';
    
    // Only show unlocked achievements
    const unlockedAchievements = Object.values(achievements).filter(a => a.unlocked);
    
    if (unlockedAchievements.length === 0) {
        achievementHTML = `
            <div style="
                text-align: center;
                padding: 2rem;
                color: #b8c5d6;
            ">
                <div style="font-size: 3rem; margin-bottom: 1rem;">🔒</div>
                <div style="font-size: 1.2rem;">No achievements unlocked yet!</div>
                <div style="font-size: 0.9rem; margin-top: 0.5rem; color: #888;">Explore the website to discover secrets...</div>
            </div>
        `;
    } else {
        unlockedAchievements.forEach(achievement => {
            achievementHTML += `
                <div style="
                    background: rgba(255, 70, 85, 0.1);
                    border: 2px solid #ff4655;
                    border-radius: 10px;
                    padding: 1rem;
                    margin-bottom: 1rem;
                ">
                    <div style="
                        font-size: 1.3rem;
                        color: #ff4655;
                        margin-bottom: 0.5rem;
                    ">${achievement.name}</div>
                    <div style="
                        color: #b8c5d6;
                        font-size: 0.9rem;
                    ">${achievement.description}</div>
                    <div style="
                        margin-top: 0.5rem;
                        color: #2ed573;
                        font-weight: 700;
                        font-size: 0.85rem;
                    ">✓ UNLOCKED</div>
                </div>
            `;
        });
    }
    
    panel.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.8);
            z-index: 10001;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fade-in 0.3s ease-out;
        " onclick="this.parentElement.remove()">
            <div style="
                background: rgba(10, 14, 39, 0.98);
                border: 3px solid #ff4655;
                border-radius: 20px;
                padding: 2rem;
                max-width: 600px;
                max-height: 80vh;
                overflow-y: auto;
                box-shadow: 0 20px 60px rgba(255, 70, 85, 0.5);
            " onclick="event.stopPropagation()">
                <h2 style="
                    font-family: 'Orbitron', sans-serif;
                    color: #ff4655;
                    font-size: 2rem;
                    text-align: center;
                    margin-bottom: 1rem;
                    text-transform: uppercase;
                ">🏆 ACHIEVEMENTS</h2>
                <div style="
                    text-align: center;
                    color: #ff8c00;
                    font-size: 1.2rem;
                    margin-bottom: 2rem;
                    font-weight: 700;
                ">${unlockedCount}/${totalCount} Unlocked</div>
                ${achievementHTML}
                <button onclick="this.closest('div[style*=fixed]').remove()" style="
                    width: 100%;
                    padding: 1rem;
                    background: #ff4655;
                    color: white;
                    border: none;
                    border-radius: 10px;
                    font-family: 'Orbitron', sans-serif;
                    font-size: 1rem;
                    font-weight: 700;
                    cursor: pointer;
                    text-transform: uppercase;
                    margin-top: 1rem;
                ">CLOSE</button>
            </div>
        </div>
    `;
    
    const fadeStyle = document.createElement('style');
    fadeStyle.textContent = `
        @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(fadeStyle);
    
    document.body.appendChild(panel);
}

// Initialize achievement system
loadAchievements();
createAchievementCounter();
updateAchievementCounter();

// ============================================
// ACHIEVEMENT TRIGGERS
// ============================================

// Easter Egg: Fire Emoji Clicker
let fireClickCount = 0;
let fireClickTimer = null;
const logoIcon = document.querySelector('.logo-icon');

if (logoIcon) {
    logoIcon.style.cursor = 'pointer';
    logoIcon.addEventListener('click', (e) => {
        e.preventDefault();
        fireClickCount++;
        
        // Reset counter after 2 seconds of no clicks
        clearTimeout(fireClickTimer);
        fireClickTimer = setTimeout(() => {
            fireClickCount = 0;
        }, 2000);
        
        // Trigger explosion at 10 clicks
        if (fireClickCount === 10) {
            triggerFireExplosion();
            unlockAchievement('fireMaster');
            fireClickCount = 0;
        }
    });
}

function triggerFireExplosion() {
    // Create explosion overlay
    const explosion = document.createElement('div');
    explosion.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 9999;
        pointer-events: none;
        overflow: hidden;
    `;
    document.body.appendChild(explosion);
    
    // Create fire emojis
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const fire = document.createElement('div');
            fire.textContent = '🔥';
            fire.style.cssText = `
                position: absolute;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                font-size: ${Math.random() * 50 + 30}px;
                animation: fire-explode ${Math.random() * 2 + 1}s ease-out forwards;
                transform-origin: center;
            `;
            explosion.appendChild(fire);
        }, i * 20);
    }
    
    // Add explosion animation
    const explosionStyle = document.createElement('style');
    explosionStyle.textContent = `
        @keyframes fire-explode {
            0% {
                transform: scale(0) rotate(0deg);
                opacity: 1;
            }
            50% {
                transform: scale(1.5) rotate(180deg);
                opacity: 1;
            }
            100% {
                transform: scale(0.5) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(explosionStyle);
    
    // Show secret message
    const message = document.createElement('div');
    message.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(10, 14, 39, 0.95);
            border: 3px solid #ff4655;
            border-radius: 20px;
            padding: 3rem;
            text-align: center;
            z-index: 10000;
            box-shadow: 0 0 50px rgba(255, 70, 85, 0.5);
            animation: message-appear 0.5s ease-out;
        ">
            <h2 style="
                font-family: 'Orbitron', sans-serif;
                color: #ff4655;
                font-size: 2.5rem;
                margin-bottom: 1rem;
                text-transform: uppercase;
            ">🔥 FIRE MASTER! 🔥</h2>
            <p style="
                color: #b8c5d6;
                font-size: 1.3rem;
                margin-bottom: 1rem;
            ">You discovered the FireFlag secret!</p>
            <p style="
                color: #ff8c00;
                font-size: 1rem;
            ">Use code: <strong style="color: #ff4655; font-size: 1.5rem;">FIREPOWER</strong> for bonus rewards!</p>
        </div>
    `;
    document.body.appendChild(message);
    
    const messageStyle = document.createElement('style');
    messageStyle.textContent = `
        @keyframes message-appear {
            from {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.5);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
        }
    `;
    document.head.appendChild(messageStyle);
    
    // Screen shake effect
    document.body.style.animation = 'screen-shake 0.5s ease-in-out';
    const shakeStyle = document.createElement('style');
    shakeStyle.textContent = `
        @keyframes screen-shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(shakeStyle);
    
    // Clean up after 5 seconds
    setTimeout(() => {
        explosion.remove();
        message.remove();
        document.body.style.animation = '';
    }, 5000);
    
    // Console message
    console.log('%c🔥🔥🔥 FIRE MASTER UNLOCKED! 🔥🔥🔥', 'color: #ff4655; font-size: 20px; font-weight: bold;');
    console.log('%cPromo Code: FIREPOWER', 'color: #ff8c00; font-size: 16px;');
}

// Achievement: Crown Collector - Click Owner card 15 times
let ownerClickCount = 0;
let ownerClickTimer = null;

// Wait for DOM to load before attaching event
setTimeout(() => {
    const ownerCard = document.querySelector('.team-card');
    if (ownerCard && ownerCard.querySelector('.team-name')?.textContent === 'vonrosie') {
        ownerCard.style.cursor = 'pointer';
        ownerCard.style.transition = 'transform 0.3s ease';
        
        ownerCard.addEventListener('click', () => {
            ownerClickCount++;
            
            // Visual feedback
            ownerCard.style.transform = 'scale(0.95)';
            setTimeout(() => {
                ownerCard.style.transform = 'scale(1)';
            }, 100);
            
            clearTimeout(ownerClickTimer);
            ownerClickTimer = setTimeout(() => {
                ownerClickCount = 0;
            }, 3000);
            
            // Show progress hints
            if (ownerClickCount === 5) {
                showQuickMessage('👑 Keep going...', '#FFD700');
            } else if (ownerClickCount === 10) {
                showQuickMessage('👑 Halfway there!', '#FFD700');
            } else if (ownerClickCount === 15) {
                triggerCrownCollector();
                unlockAchievement('crownCollector');
                ownerClickCount = 0;
            }
        });
    }
}, 1000);

function showQuickMessage(text, color) {
    const msg = document.createElement('div');
    msg.textContent = text;
    msg.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: ${color};
        font-family: 'Orbitron', sans-serif;
        font-size: 1.5rem;
        font-weight: 700;
        text-shadow: 0 0 20px ${color};
        z-index: 9999;
        pointer-events: none;
        animation: quick-fade 1s ease-out forwards;
    `;
    document.body.appendChild(msg);
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes quick-fade {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
            30% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            100% { opacity: 0; transform: translate(-50%, -50%) scale(1.2); }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => msg.remove(), 1000);
}

function triggerCrownCollector() {
    // Create royal overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: radial-gradient(circle, rgba(255, 215, 0, 0.2) 0%, rgba(0, 0, 0, 0.8) 100%);
        z-index: 10000;
        pointer-events: none;
    `;
    document.body.appendChild(overlay);
    
    // Spawn floating crowns
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const crown = document.createElement('div');
            crown.textContent = '👑';
            const startX = Math.random() * 100;
            const endX = startX + (Math.random() - 0.5) * 40;
            const rotation = Math.random() * 720 - 360;
            const duration = Math.random() * 2 + 2;
            
            crown.style.cssText = `
                position: fixed;
                left: ${startX}%;
                bottom: -50px;
                font-size: ${Math.random() * 40 + 30}px;
                z-index: 10001;
                pointer-events: none;
                animation: crown-float ${duration}s ease-out forwards;
            `;
            
            const style = document.createElement('style');
            style.textContent = `
                @keyframes crown-float {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-${window.innerHeight + 100}px) translateX(${endX - startX}vw) rotate(${rotation}deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
            
            document.body.appendChild(crown);
            setTimeout(() => crown.remove(), duration * 1000);
        }, i * 50);
    }
    
    // Golden flash effect
    const flash = document.createElement('div');
    flash.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: #FFD700;
        z-index: 10002;
        pointer-events: none;
        animation: golden-flash 0.5s ease-out;
    `;
    document.body.appendChild(flash);
    
    const flashStyle = document.createElement('style');
    flashStyle.textContent = `
        @keyframes golden-flash {
            0% { opacity: 0.8; }
            100% { opacity: 0; }
        }
    `;
    document.head.appendChild(flashStyle);
    
    setTimeout(() => flash.remove(), 500);
    
    // Royal message
    const message = document.createElement('div');
    message.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, rgba(255, 215, 0, 0.95), rgba(255, 140, 0, 0.95));
            border: 4px solid #FFD700;
            border-radius: 25px;
            padding: 3rem 4rem;
            text-align: center;
            z-index: 10003;
            box-shadow: 0 0 80px rgba(255, 215, 0, 0.8), inset 0 0 40px rgba(255, 255, 255, 0.3);
            animation: royal-entrance 0.6s ease-out;
        ">
            <div style="font-size: 5rem; margin-bottom: 1rem; animation: crown-spin 2s linear infinite;">👑</div>
            <h2 style="
                font-family: 'Orbitron', sans-serif;
                color: #000;
                font-size: 3rem;
                margin-bottom: 1rem;
                text-transform: uppercase;
                text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.5);
            ">CROWN COLLECTOR!</h2>
            <p style="
                color: #1a1a1a;
                font-size: 1.5rem;
                margin-bottom: 1rem;
                font-weight: 700;
            ">You have honored the founder!</p>
            <p style="
                color: #000;
                font-size: 1.2rem;
                font-style: italic;
            ">Long live vonrosie! 🎉</p>
        </div>
    `;
    document.body.appendChild(message);
    
    const messageStyle = document.createElement('style');
    messageStyle.textContent = `
        @keyframes royal-entrance {
            from {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.3) rotate(-10deg);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1) rotate(0deg);
            }
        }
        @keyframes crown-spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(messageStyle);
    
    // Play royal fanfare (browser beep sequence)
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (major chord)
    
    notes.forEach((freq, index) => {
        setTimeout(() => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = freq;
            oscillator.type = 'triangle';
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        }, index * 150);
    });
    
    // Cleanup
    setTimeout(() => {
        overlay.remove();
        message.remove();
    }, 5000);
    
    console.log('%c👑👑👑 CROWN COLLECTOR UNLOCKED! 👑👑👑', 'color: #FFD700; font-size: 24px; font-weight: bold;');
    console.log('%cAll hail vonrosie!', 'color: #FFD700; font-size: 16px;');
}

// Achievement 2: Bullet Time - Click SHOOTZ title 7 times
let shootzClickCount = 0;
let shootzClickTimer = null;
const shootzTitle = document.querySelector('.glitch');

if (shootzTitle) {
    shootzTitle.style.cursor = 'pointer';
    shootzTitle.addEventListener('click', () => {
        shootzClickCount++;
        
        clearTimeout(shootzClickTimer);
        shootzClickTimer = setTimeout(() => {
            shootzClickCount = 0;
        }, 2000);
        
        if (shootzClickCount === 7) {
            triggerBulletTime();
            unlockAchievement('bulletTime');
            shootzClickCount = 0;
        }
    });
}

function triggerBulletTime() {
    // Create matrix rain effect
    const matrix = document.createElement('canvas');
    matrix.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 9999;
        pointer-events: none;
    `;
    document.body.appendChild(matrix);
    
    const ctx = matrix.getContext('2d');
    matrix.width = window.innerWidth;
    matrix.height = window.innerHeight;
    
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = matrix.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, matrix.width, matrix.height);
        
        ctx.fillStyle = '#0f0';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > matrix.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    const matrixInterval = setInterval(drawMatrix, 33);
    
    // Slow motion effect
    document.body.style.animation = 'slow-motion 6s ease-in-out';
    const slowStyle = document.createElement('style');
    slowStyle.textContent = `
        @keyframes slow-motion {
            0%, 100% { filter: none; }
            25% { filter: hue-rotate(60deg) contrast(1.1); }
            50% { filter: hue-rotate(120deg) contrast(1.2); }
            75% { filter: hue-rotate(60deg) contrast(1.1); }
        }
    `;
    document.head.appendChild(slowStyle);
    
    // Message
    const message = document.createElement('div');
    message.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            border: 3px solid #0f0;
            border-radius: 20px;
            padding: 3rem;
            text-align: center;
            z-index: 10000;
            box-shadow: 0 0 50px rgba(0, 255, 0, 0.5);
        ">
            <h2 style="
                font-family: 'Orbitron', sans-serif;
                color: #0f0;
                font-size: 2.5rem;
                margin-bottom: 1rem;
                text-transform: uppercase;
                text-shadow: 0 0 10px #0f0;
            ">⚡ BULLET TIME ⚡</h2>
            <p style="
                color: #0f0;
                font-size: 1.3rem;
                font-family: monospace;
            ">Time... has... slowed...</p>
        </div>
    `;
    document.body.appendChild(message);
    
    // Clean up after 6 seconds
    setTimeout(() => {
        clearInterval(matrixInterval);
        matrix.remove();
        message.remove();
        document.body.style.animation = '';
    }, 6000);
    
    console.log('%c⚡ BULLET TIME ACTIVATED ⚡', 'color: #0f0; font-size: 20px; font-weight: bold;');
}

// Achievement 3: Speed Runner - Scroll to bottom and back to top quickly
let scrolledToBottom = false;
let bottomScrollTime = null;

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Check if at bottom
    if (scrollPosition >= documentHeight - 100 && !scrolledToBottom) {
        scrolledToBottom = true;
        bottomScrollTime = Date.now();
    }
    
    // Check if back at top within 3 seconds
    if (scrolledToBottom && window.scrollY < 100) {
        const timeDiff = Date.now() - bottomScrollTime;
        if (timeDiff < 3000) {
            unlockAchievement('speedRunner');
        }
        scrolledToBottom = false;
    }
});

// Achievement 4: Console Warrior - Console commands
window.unlock = function() {
    unlockAchievement('consoleWarrior');
    console.log('%c🎮 CONSOLE WARRIOR UNLOCKED! 🎮', 'color: #667eea; font-size: 20px; font-weight: bold;');
    console.log('%cYou are a true developer!', 'color: #ff8c00; font-size: 14px;');
};

window.stats = function() {
    const unlocked = Object.values(achievements).filter(a => a.unlocked).length;
    const total = Object.keys(achievements).length;
    console.log('%c📊 ACHIEVEMENT STATS', 'color: #ff4655; font-size: 16px; font-weight: bold;');
    console.log(`Unlocked: ${unlocked}/${total}`);
    Object.values(achievements).forEach(a => {
        console.log(`${a.unlocked ? '✓' : '✗'} ${a.name} - ${a.description}`);
    });
};

window.reset = function() {
    if (confirm('Reset all achievements? This cannot be undone!')) {
        localStorage.removeItem('shootz_achievements');
        localStorage.removeItem('shootz_quest_progress');
        Object.values(achievements).forEach(a => a.unlocked = false);
        questProgress = {
            talkedToKitCat: false,
            gotCookie: false,
            gaveCookie: false,
            button2: false,
            button3: false
        };
        updateAchievementCounter();
        // Reset manager click counter
        managerClickCount = 0;
        annoyingAchievementUnlocked = false;
        console.log('%c🔄 ACHIEVEMENTS RESET', 'color: #ff4655; font-size: 16px;');
        location.reload(); // Reload to reset everything
    }
};

// Achievement 5: Explorer - Visit all sections
const sections = ['home', 'about', 'team', 'features', 'controls', 'updates'];
const visitedSections = new Set();

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.id) {
            visitedSections.add(entry.target.id);
            if (sections.every(s => visitedSections.has(s))) {
                unlockAchievement('explorer');
            }
        }
    });
}, { threshold: 0.25, rootMargin: '0px 0px -20% 0px' });

sections.forEach(sectionId => {
    const section = document.getElementById(sectionId);
    if (section) {
        sectionObserver.observe(section);
    }
});

// Achievement 6: Annoying Player - Only works AFTER completing kit's quest
let managerClickCount = 0;
let annoyingAchievementUnlocked = false;

// Function to find and add click listener to manager card (works on both pages)
function setupManagerEasterEgg() {
    console.log('🔍 setupManagerEasterEgg called - searching for manager card...');
    const teamCards = document.querySelectorAll('.team-card');
    console.log('📦 Found team cards:', teamCards.length);
    
    teamCards.forEach(card => {
        const nameElement = card.querySelector('h4.team-name') || card.querySelector('h3');
        console.log('👤 Card name:', nameElement ? nameElement.textContent.trim() : 'NO NAME');
        if (nameElement && nameElement.textContent.includes('NikVonWittelsbach')) {
            console.log('🎯 Manager card found for easter egg!');
            
            card.addEventListener('click', function managerClickHandler(e) {
                console.log('🖱️ Manager card clicked! questProgress:', questProgress);
                
                // Only work AFTER quest is completed
                if (!questProgress.gaveCookie) {
                    console.log('🔒 Manager clicks disabled - complete kit quest first! (gaveCookie:', questProgress.gaveCookie, ')');
                    return;
                }
                
                // Check if achievement already unlocked
                if (achievements.annoyingPlayer.unlocked && annoyingAchievementUnlocked) {
                    console.log('✅ Achievement already unlocked');
                    return;
                }
                
                managerClickCount++;
                console.log(`🖱️ Manager clicked ${managerClickCount} times (cookie quest complete)`);
                
                if (managerClickCount === 1) {
                    showManagerMessage('🍪 Still thinking about that cookie...', card);
                } else if (managerClickCount === 3) {
                    showManagerMessage('Why do you keep clicking me?', card);
                } else if (managerClickCount === 6) {
                    showManagerMessage('The cookie is gone, stop!', card);
                } else if (managerClickCount === 9) {
                    showManagerMessage('I learned my lesson already!', card);
                } else if (managerClickCount === 12 && !annoyingAchievementUnlocked) {
                    annoyingAchievementUnlocked = true;
                    console.log('🏆 12 clicks reached! Unlocking Annoying Player!');
                    showManagerMessage('Fine! Take your achievement!', card);
                    setTimeout(() => {
                        unlockAchievement('annoyingPlayer');
                    }, 500);
                }
            }, true); // Use capture phase to ensure it catches the event
        }
    });
}

function showManagerMessage(text, cardElement) {
    // Create speech bubble
    const bubble = document.createElement('div');
    bubble.textContent = text;
    bubble.style.cssText = `
        position: fixed;
        background: rgba(255, 70, 85, 0.95);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 15px;
        font-family: 'Rajdhani', sans-serif;
        font-size: 1.2rem;
        font-weight: 700;
        z-index: 10000;
        pointer-events: none;
        box-shadow: 0 10px 30px rgba(255, 70, 85, 0.5);
        animation: bubble-pop 0.3s ease-out;
    `;
    
    // Position near the card
    const rect = cardElement.getBoundingClientRect();
    bubble.style.left = rect.left + (rect.width / 2) + 'px';
    bubble.style.top = (rect.top - 80) + 'px';
    bubble.style.transform = 'translateX(-50%)';
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bubble-pop {
            0% {
                transform: translateX(-50%) scale(0);
                opacity: 0;
            }
            50% {
                transform: translateX(-50%) scale(1.1);
            }
            100% {
                transform: translateX(-50%) scale(1);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(bubble);
    
    // Shake the card
    cardElement.style.animation = 'card-shake 0.3s ease-in-out';
    const shakeStyle = document.createElement('style');
    shakeStyle.textContent = `
        @keyframes card-shake {
            0%, 100% { transform: translateX(0) rotate(0deg); }
            25% { transform: translateX(-5px) rotate(-2deg); }
            75% { transform: translateX(5px) rotate(2deg); }
        }
    `;
    document.head.appendChild(shakeStyle);
    
    // Remove after 2 seconds
    setTimeout(() => {
        bubble.style.animation = 'bubble-fade-out 0.3s ease-out forwards';
        const fadeStyle = document.createElement('style');
        fadeStyle.textContent = `
            @keyframes bubble-fade-out {
                to {
                    opacity: 0;
                    transform: translateX(-50%) translateY(-20px);
                }
            }
        `;
        document.head.appendChild(fadeStyle);
        setTimeout(() => bubble.remove(), 300);
        cardElement.style.animation = '';
    }, 2000);
}

// Setup manager easter egg after DOM loads (increased delay to ensure cards are loaded)
setTimeout(setupManagerEasterEgg, 2000);
console.log('🎮 Manager easter egg setup scheduled');

// Boss Event - Triggered at 30 clicks
function triggerBossEvent() {
    let bossHealth = 0;
    let playerClicks = 0;
    let activeBubbles = [];
    let battleActive = false;
    let bossBar, healthBarElement, patienceText, battleOverlay;
    
    // Play epic DOOM-style boss music (loop for entire event)
    let musicInterval = setInterval(() => {
        playDoomBossMusic();
    }, 2000); // Restart music every 2 seconds for continuous loop
    
    // Create battle overlay
    battleOverlay = document.createElement('div');
    battleOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.7);
        z-index: 9998;
        pointer-events: all;
    `;
    document.body.appendChild(battleOverlay);
    
    // Create boss bar container
    bossBar = document.createElement('div');
    bossBar.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            width: 80%;
            max-width: 800px;
            z-index: 10001;
            animation: boss-bar-appear 1s ease-out;
        ">
            <div style="
                background: rgba(10, 14, 39, 0.95);
                border: 3px solid #8b0000;
                border-radius: 15px;
                padding: 1.5rem;
                box-shadow: 0 10px 50px rgba(139, 0, 0, 0.8);
            ">
                <div style="
                    text-align: center;
                    font-family: 'Orbitron', sans-serif;
                    color: #ff4655;
                    font-size: 1.8rem;
                    margin-bottom: 0.5rem;
                    text-transform: uppercase;
                    text-shadow: 0 0 10px #ff4655;
                ">ENRAGED MANAGER</div>
                <div style="
                    text-align: center;
                    color: #ff8c00;
                    font-size: 1rem;
                    margin-bottom: 1rem;
                ">LOADING...</div>
                <div style="
                    background: rgba(139, 0, 0, 0.3);
                    border: 2px solid #8b0000;
                    border-radius: 10px;
                    height: 30px;
                    overflow: hidden;
                    position: relative;
                ">
                    <div id="boss-health" style="
                        background: linear-gradient(90deg, #8b0000, #ff4655);
                        height: 100%;
                        width: 0%;
                        transition: width 0.3s ease;
                        box-shadow: 0 0 20px rgba(255, 70, 85, 0.8);
                    "></div>
                </div>
                <div style="
                    text-align: center;
                    color: #b8c5d6;
                    font-size: 1.2rem;
                    margin-top: 1rem;
                    font-family: 'Rajdhani', sans-serif;
                ">Boss HP: <span id="patience-text">0%</span></div>
            </div>
        </div>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes boss-bar-appear {
            from {
                opacity: 0;
                transform: translateX(-50%) translateY(-100px);
            }
            to {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
        }
        @keyframes bubble-attack {
            0% {
                transform: scale(0);
                opacity: 0;
            }
            10% {
                transform: scale(1.2);
                opacity: 1;
            }
            100% {
                transform: scale(1);
                opacity: 1;
            }
        }
        @keyframes bubble-hit {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.3); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(bossBar);
    
    healthBarElement = document.getElementById('boss-health');
    patienceText = document.getElementById('patience-text');
    
    // Screen flash effect
    const flash = document.createElement('div');
    flash.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: #8b0000;
        z-index: 10000;
        opacity: 1;
        pointer-events: none;
        animation: flash-fade 0.5s ease-out forwards;
    `;
    const flashStyle = document.createElement('style');
    flashStyle.textContent = `
        @keyframes flash-fade {
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(flashStyle);
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 500);
    
    // Phase 1: Boss HP loads from 0 to 100
    const loadInterval = setInterval(() => {
        bossHealth += 2;
        if (healthBarElement) {
            healthBarElement.style.width = bossHealth + '%';
            patienceText.textContent = bossHealth + '%';
        }
        
        if (bossHealth >= 100) {
            clearInterval(loadInterval);
            // Start battle phase
            setTimeout(startBattle, 500);
        }
    }, 30);
    
    function startBattle() {
        battleActive = true;
        patienceText.parentElement.previousElementSibling.textContent = 'FIGHT!';
        
        // Spawn bubbles every 1.5 seconds
        const spawnInterval = setInterval(() => {
            if (!battleActive) {
                clearInterval(spawnInterval);
                return;
            }
            spawnAttackBubble();
        }, 1500);
        
        // Keyboard attack - press SPACE to deal damage
        const keyHandler = (e) => {
            if (!battleActive) {
                document.removeEventListener('keydown', keyHandler);
                return;
            }
            
            if (e.code === 'Space') {
                e.preventDefault();
                dealDamage(5);
            }
        };
        document.addEventListener('keydown', keyHandler);
    }
    
    function spawnAttackBubble() {
        const bubble = document.createElement('div');
        const x = Math.random() * (window.innerWidth - 100);
        const y = Math.random() * (window.innerHeight - 200) + 100;
        const key = ['Q', 'W', 'E', 'A', 'S', 'D'][Math.floor(Math.random() * 6)];
        
        bubble.textContent = key;
        bubble.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #ff4655, #ff8c00);
            border: 3px solid #fff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Orbitron', sans-serif;
            font-size: 2rem;
            font-weight: 900;
            color: white;
            z-index: 10000;
            cursor: pointer;
            animation: bubble-attack 0.3s ease-out;
            box-shadow: 0 5px 20px rgba(255, 70, 85, 0.5);
            text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
        `;
        bubble.dataset.key = key;
        
        document.body.appendChild(bubble);
        activeBubbles.push(bubble);
        
        // Click to destroy
        bubble.addEventListener('click', () => {
            destroyBubble(bubble, 10);
        });
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (document.body.contains(bubble)) {
                bubble.remove();
                activeBubbles = activeBubbles.filter(b => b !== bubble);
            }
        }, 3000);
    }
    
    // Keyboard bubble destruction
    document.addEventListener('keydown', function bubbleKeyHandler(e) {
        if (!battleActive) {
            document.removeEventListener('keydown', bubbleKeyHandler);
            return;
        }
        
        const key = e.key.toUpperCase();
        const matchingBubble = activeBubbles.find(b => b.dataset.key === key);
        
        if (matchingBubble) {
            e.preventDefault();
            destroyBubble(matchingBubble, 10);
        }
    });
    
    function destroyBubble(bubble, damage) {
        bubble.style.animation = 'bubble-hit 0.2s ease-out';
        setTimeout(() => {
            bubble.remove();
            activeBubbles = activeBubbles.filter(b => b !== bubble);
            dealDamage(damage);
        }, 200);
    }
    
    function dealDamage(amount) {
        bossHealth -= amount;
        if (bossHealth < 0) bossHealth = 0;
        
        if (healthBarElement) {
            healthBarElement.style.width = bossHealth + '%';
            patienceText.textContent = bossHealth + '%';
        }
        
        // Flash effect on hit
        document.body.style.animation = 'screen-flash 0.1s ease-out';
        const hitStyle = document.createElement('style');
        hitStyle.textContent = `
            @keyframes screen-flash {
                0%, 100% { filter: brightness(1); }
                50% { filter: brightness(1.3) hue-rotate(10deg); }
            }
        `;
        document.head.appendChild(hitStyle);
        setTimeout(() => {
            document.body.style.animation = '';
        }, 100);
        
        // Check if boss defeated
        if (bossHealth <= 0) {
            battleActive = false;
            activeBubbles.forEach(b => b.remove());
            activeBubbles = [];
            showVictory();
        }
    }
    
    function showVictory() {
        const victoryMessage = document.createElement('div');
        victoryMessage.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(10, 14, 39, 0.98);
                border: 4px solid #ffd700;
                border-radius: 20px;
                padding: 3rem;
                text-align: center;
                z-index: 10002;
                box-shadow: 0 20px 60px rgba(255, 215, 0, 0.5);
                animation: victory-appear 1s ease-out;
            ">
                <div style="font-size: 4rem; margin-bottom: 1rem;">🏆</div>
                <h2 style="
                    font-family: 'Orbitron', sans-serif;
                    color: #ffd700;
                    font-size: 2.5rem;
                    margin-bottom: 1rem;
                    text-transform: uppercase;
                    text-shadow: 0 0 20px #ffd700;
                ">LEGENDARY VICTORY!</h2>
                <p style="
                    color: #ff8c00;
                    font-size: 1.5rem;
                    margin-bottom: 1rem;
                ">You defeated the Enraged Manager!</p>
                <p style="
                    color: #b8c5d6;
                    font-size: 1.1rem;
                ">The manager has been humbled...</p>
            </div>
        `;
        
        const victoryStyle = document.createElement('style');
        victoryStyle.textContent = `
            @keyframes victory-appear {
                0% {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.5) rotate(-10deg);
                }
                50% {
                    transform: translate(-50%, -50%) scale(1.1) rotate(5deg);
                }
                100% {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1) rotate(0deg);
                }
            }
        `;
        document.head.appendChild(victoryStyle);
        document.body.appendChild(victoryMessage);
        
        // Stop music
        clearInterval(musicInterval);
        
        // Remove everything after 7 seconds
        setTimeout(() => {
            bossBar.remove();
            victoryMessage.remove();
            battleOverlay.remove();
        }, 7000);
    }
    
    console.log('%cBOSS EVENT TRIGGERED!', 'color: #8b0000; font-size: 24px; font-weight: bold;');
}

// Play DOOM-style boss music using Web Audio API
function playDoomBossMusic() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Create intense DOOM-style boss theme with distortion and heavy bass
        function playNote(frequency, startTime, duration, type = 'sawtooth', volume = 0.2) {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            const distortion = audioContext.createWaveShaper();
            
            // Add distortion for heavy metal sound
            function makeDistortionCurve(amount) {
                const samples = 44100;
                const curve = new Float32Array(samples);
                const deg = Math.PI / 180;
                for (let i = 0; i < samples; i++) {
                    const x = i * 2 / samples - 1;
                    curve[i] = (3 + amount) * x * 20 * deg / (Math.PI + amount * Math.abs(x));
                }
                return curve;
            }
            
            distortion.curve = makeDistortionCurve(400);
            distortion.oversample = '4x';
            
            oscillator.connect(distortion);
            distortion.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = type;
            
            gainNode.gain.setValueAtTime(volume, startTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
            
            oscillator.start(startTime);
            oscillator.stop(startTime + duration);
        }
        
        const now = audioContext.currentTime;
        
        // Heavy chugging rhythm (DOOM style)
        const chugPattern = [
            { freq: 41.2, time: 0, duration: 0.15 },     // E1
            { freq: 41.2, time: 0.2, duration: 0.15 },   // E1
            { freq: 41.2, time: 0.4, duration: 0.15 },   // E1
            { freq: 46.25, time: 0.6, duration: 0.2 },   // F#1
            { freq: 41.2, time: 0.8, duration: 0.15 },   // E1
            { freq: 41.2, time: 1.0, duration: 0.15 },   // E1
            { freq: 36.71, time: 1.2, duration: 0.2 },   // D1
            { freq: 41.2, time: 1.4, duration: 0.15 },   // E1
            { freq: 41.2, time: 1.6, duration: 0.15 },   // E1
            { freq: 49, time: 1.8, duration: 0.2 }       // G1
        ];
        
        // Aggressive lead riff
        const leadPattern = [
            { freq: 164.81, time: 0, duration: 0.3 },    // E3
            { freq: 185, time: 0.3, duration: 0.2 },     // F#3
            { freq: 196, time: 0.5, duration: 0.3 },     // G3
            { freq: 220, time: 0.8, duration: 0.2 },     // A3
            { freq: 164.81, time: 1.0, duration: 0.3 },  // E3
            { freq: 146.83, time: 1.3, duration: 0.2 },  // D3
            { freq: 164.81, time: 1.5, duration: 0.5 }   // E3
        ];
        
        // Deep sub-bass rumble
        const subBass = [
            { freq: 20.6, time: 0, duration: 0.4 },      // E0
            { freq: 20.6, time: 0.4, duration: 0.4 },    // E0
            { freq: 23.12, time: 0.8, duration: 0.4 },   // F#0
            { freq: 20.6, time: 1.2, duration: 0.4 },    // E0
            { freq: 18.35, time: 1.6, duration: 0.4 }    // D0
        ];
        
        // Aggressive percussion
        const percussion = [
            { freq: 100, time: 0, duration: 0.05 },
            { freq: 100, time: 0.2, duration: 0.05 },
            { freq: 100, time: 0.4, duration: 0.05 },
            { freq: 120, time: 0.6, duration: 0.05 },
            { freq: 100, time: 0.8, duration: 0.05 },
            { freq: 100, time: 1.0, duration: 0.05 },
            { freq: 140, time: 1.2, duration: 0.05 },
            { freq: 100, time: 1.4, duration: 0.05 },
            { freq: 100, time: 1.6, duration: 0.05 },
            { freq: 160, time: 1.8, duration: 0.05 }
        ];
        
        // Play all layers for heavy metal sound
        chugPattern.forEach(note => {
            playNote(note.freq, now + note.time, note.duration, 'sawtooth', 0.25);
            // Double the chug for thickness
            playNote(note.freq * 2, now + note.time, note.duration, 'square', 0.15);
        });
        
        leadPattern.forEach(note => {
            playNote(note.freq, now + note.time, note.duration, 'sawtooth', 0.18);
        });
        
        subBass.forEach(note => {
            playNote(note.freq, now + note.time, note.duration, 'sine', 0.3);
        });
        
        percussion.forEach(note => {
            playNote(note.freq, now + note.time, note.duration, 'triangle', 0.35);
        });
        
        // Add white noise hits for impact
        [0, 0.4, 0.8, 1.2, 1.6].forEach(time => {
            const noise = audioContext.createBufferSource();
            const buffer = audioContext.createBuffer(1, 4410, 44100);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < 4410; i++) {
                data[i] = Math.random() * 2 - 1;
            }
            noise.buffer = buffer;
            
            const noiseGain = audioContext.createGain();
            noiseGain.gain.setValueAtTime(0.1, now + time);
            noiseGain.gain.exponentialRampToValueAtTime(0.01, now + time + 0.1);
            
            noise.connect(noiseGain);
            noiseGain.connect(audioContext.destination);
            noise.start(now + time);
            noise.stop(now + time + 0.1);
        });
        
    } catch (e) {
        console.log('Audio playback not supported');
    }
}

// Image Modal Functions
function openImageModal(img) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    
    if (modal && modalImg) {
        modal.style.display = 'block';
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
}

// Close modal on ESC key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeImageModal();
    }
});

// ============================================
// ADMIN MAYHEM ACHIEVEMENT - kit_cat350
// ============================================

// Quest system for triggering the explosion
let questProgress = {
    talkedToKitCat: false,
    gotCookie: false,
    gaveCookie: false,
    button2: false,
    button3: false
};

// Load quest progress from localStorage
function loadQuestProgress() {
    const saved = localStorage.getItem('shootz_quest_progress');
    if (saved) {
        const savedData = JSON.parse(saved);
        questProgress = savedData;
    }
}

// Save quest progress to localStorage
function saveQuestProgress() {
    localStorage.setItem('shootz_quest_progress', JSON.stringify(questProgress));
}

// Load quest progress on page load
loadQuestProgress();

// Function to add cookie button to kit_cat350's card
function addCookieReturnButton(kitCatCard) {
    const secretBtn = document.createElement('button');
    secretBtn.innerHTML = '🍪';
    secretBtn.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(255, 140, 0, 0.2);
        border: 2px solid rgba(255, 140, 0, 0.5);
        border-radius: 50%;
        width: 40px;
        height: 40px;
        font-size: 20px;
        cursor: pointer;
        transition: all 0.3s;
        z-index: 10;
        animation: cookie-appear 0.5s ease-out, quest-bounce 1s ease-in-out infinite 0.5s;
    `;
    secretBtn.title = 'Return cookie to kit_cat350';
    
    secretBtn.addEventListener('mouseenter', () => {
        secretBtn.style.transform = 'scale(1.2) rotate(15deg)';
        secretBtn.style.boxShadow = '0 0 20px rgba(255, 140, 0, 0.6)';
    });
    
    secretBtn.addEventListener('mouseleave', () => {
        secretBtn.style.transform = 'scale(1) rotate(0deg)';
        secretBtn.style.boxShadow = 'none';
    });
    
    secretBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('🍪 Cookie returned to kit_cat350!');
        questProgress.gaveCookie = true;
        saveQuestProgress(); // Save to localStorage
        secretBtn.remove();
        showPlotTwist();
    });
    
    kitCatCard.style.position = 'relative';
    kitCatCard.appendChild(secretBtn);
    
    const cookieStyle = document.createElement('style');
    cookieStyle.textContent = `
        @keyframes cookie-appear {
            from { transform: scale(0) rotate(-180deg); opacity: 0; }
            to { transform: scale(1) rotate(0deg); opacity: 1; }
        }
    `;
    document.head.appendChild(cookieStyle);
    
    console.log('🍪 Cookie button added to kit_cat350!');
}

function showPlotTwist() {
    // Show evil dialogue
    const evilDialogue = document.createElement('div');
    evilDialogue.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(10, 14, 39, 0.98);
            border: 3px solid #ff4655;
            border-radius: 20px;
            padding: 2rem 3rem;
            max-width: 600px;
            z-index: 10000;
            box-shadow: 0 0 50px rgba(255, 70, 85, 0.5);
            animation: dialogue-appear 0.3s ease-out;
        ">
            <div style="font-size: 3rem; text-align: center; margin-bottom: 1rem; animation: evil-laugh 0.5s ease-in-out infinite;">😈</div>
            <h2 style="
                font-family: 'Orbitron', sans-serif;
                color: #ff4655;
                text-align: center;
                margin-bottom: 1rem;
            ">kit_cat350</h2>
            <p style="
                color: #b8c5d6;
                font-size: 1.2rem;
                line-height: 1.6;
                margin-bottom: 1rem;
                text-align: center;
            ">"HAHAHA! You fool! I was the villain all along! 😈"</p>
            <p style="
                color: #ff8c00;
                font-size: 1.1rem;
                line-height: 1.6;
                text-align: center;
            ">"Now witness the DESTRUCTION of this website!"</p>
        </div>
    `;
    
    const evilStyle = document.createElement('style');
    evilStyle.textContent = `
        @keyframes evil-laugh {
            0%, 100% { transform: scale(1) rotate(0deg); }
            25% { transform: scale(1.1) rotate(-5deg); }
            75% { transform: scale(1.1) rotate(5deg); }
        }
    `;
    document.head.appendChild(evilStyle);
    
    document.body.appendChild(evilDialogue);
    
    setTimeout(() => {
        evilDialogue.remove();
        startAdminExplosion();
        
        // Re-initialize manager easter egg now that quest is complete
        setTimeout(() => {
            console.log('🔄 Re-initializing manager clicks after quest completion...');
            setupManagerEasterEgg();
        }, 12000); // After countdown (10s) + troll face (2s)
    }, 4000);
}

// Create hidden buttons throughout the page
function initAdminQuest() {
    setTimeout(() => {
        console.log('🍪 Initializing Admin Quest...');
        
        // Find all team cards
        const teamCards = document.querySelectorAll('.team-card');
        console.log('Found team cards:', teamCards.length);
        
        let managerCard = null;
        let kitCatCard = null;
        
        teamCards.forEach(card => {
            const nameElement = card.querySelector('.team-name');
            if (nameElement) {
                const name = nameElement.textContent.trim();
                console.log('Team member:', name);
                
                if (name === 'NikVonWittelsbach') {
                    managerCard = card;
                    console.log('✅ Found Manager!');
                } else if (name === 'kit_cat350') {
                    kitCatCard = card;
                    console.log('✅ Found kit_cat350!');
                }
            }
        });
        
        // Add quest starter on kit_cat350's card
        if (kitCatCard) {
            const questMarker = document.createElement('div');
            questMarker.innerHTML = '❗';
            questMarker.style.cssText = `
                position: absolute;
                top: 10px;
                left: 10px;
                font-size: 30px;
                animation: quest-bounce 1s ease-in-out infinite;
                cursor: pointer;
                z-index: 10;
            `;
            questMarker.title = 'kit_cat350 needs your help!';
            
            const bounceStyle = document.createElement('style');
            bounceStyle.textContent = `
                @keyframes quest-bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
            `;
            document.head.appendChild(bounceStyle);
            
            kitCatCard.style.position = 'relative';
            kitCatCard.appendChild(questMarker);
            
            // Click on kit_cat350 to start quest
            const questClickArea = document.createElement('div');
            questClickArea.className = 'quest-click-area';
            questClickArea.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 9;
                cursor: pointer;
            `;
            kitCatCard.appendChild(questClickArea);
            
            questClickArea.addEventListener('click', (e) => {
                e.stopPropagation();
                if (!questProgress.talkedToKitCat) {
                    startQuestDialogue(kitCatCard, managerCard, questMarker);
                }
            });
        }
        
    }, 1500);
}

function startQuestDialogue(kitCatCard, managerCard, questMarker) {
    questProgress.talkedToKitCat = true;
    questMarker.remove();
    
    // Remove the click area overlay so it doesn't block future buttons
    const questClickArea = kitCatCard.querySelector('.quest-click-area');
    if (questClickArea) {
        questClickArea.remove();
    }
    
    // Show dialogue box
    const dialogue = document.createElement('div');
    dialogue.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(10, 14, 39, 0.98);
            border: 3px solid #ff8c00;
            border-radius: 20px;
            padding: 2rem 3rem;
            max-width: 500px;
            z-index: 10000;
            box-shadow: 0 0 50px rgba(255, 140, 0, 0.5);
            animation: dialogue-appear 0.3s ease-out;
        ">
            <div style="font-size: 3rem; text-align: center; margin-bottom: 1rem;">😢</div>
            <h2 style="
                font-family: 'Orbitron', sans-serif;
                color: #ff8c00;
                text-align: center;
                margin-bottom: 1rem;
            ">kit_cat350</h2>
            <p style="
                color: #b8c5d6;
                font-size: 1.1rem;
                line-height: 1.6;
                margin-bottom: 1.5rem;
            ">"Help! The manager stole my cookie! 🍪 Can you get it back for me? I really need it..."</p>
            <button id="acceptQuest" style="
                width: 100%;
                background: linear-gradient(135deg, #ff4655, #ff8c00);
                border: none;
                padding: 1rem;
                border-radius: 10px;
                color: white;
                font-family: 'Orbitron', sans-serif;
                font-size: 1.1rem;
                cursor: pointer;
                transition: all 0.3s;
            ">Accept Quest</button>
        </div>
    `;
    
    const dialogueStyle = document.createElement('style');
    dialogueStyle.textContent = `
        @keyframes dialogue-appear {
            from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        #acceptQuest:hover {
            transform: scale(1.05);
            box-shadow: 0 5px 20px rgba(255, 140, 0, 0.5);
        }
    `;
    document.head.appendChild(dialogueStyle);
    
    document.body.appendChild(dialogue);
    
    document.getElementById('acceptQuest').addEventListener('click', () => {
        dialogue.remove();
        showQuickMessage('⚔️ Quest Accepted: Fight the manager!', '#ff8c00');
        addFightButton(managerCard, kitCatCard);
    });
}

function addFightButton(managerCard, kitCatCard) {
    console.log('🔧 addFightButton called', {managerCard, kitCatCard});
    
    if (!managerCard) {
        console.error('❌ managerCard is null!');
        return;
    }
    
    console.log('✅ Adding fight button to manager card');
    
    // Add "Fight Manager" button to manager's card
    let fightCount = 0;
    const fightBtn = document.createElement('button');
    fightBtn.className = 'fight-quest-btn';
    fightBtn.innerHTML = '⚔️';
    fightBtn.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(255, 70, 85, 0.3);
        border: 3px solid rgba(255, 70, 85, 0.8);
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 24px;
        cursor: pointer;
        transition: all 0.3s;
        z-index: 1000;
        animation: quest-bounce 1s ease-in-out infinite;
    `;
    fightBtn.title = 'Fight the manager to get the cookie!';
    
    fightBtn.addEventListener('mouseenter', () => {
        fightBtn.style.transform = 'scale(1.2) rotate(-15deg)';
        fightBtn.style.boxShadow = '0 0 20px rgba(255, 70, 85, 0.6)';
    });
    
    fightBtn.addEventListener('mouseleave', () => {
        fightBtn.style.transform = 'scale(1) rotate(0deg)';
        fightBtn.style.boxShadow = 'none';
    });
    
    fightBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('⚔️ Fight started!');
        
        // Remove button immediately
        fightBtn.remove();
        
        // Start the fight sequence
        startFightSequence(managerCard, kitCatCard);
    });
    
    managerCard.style.position = 'relative';
    managerCard.appendChild(fightBtn);
    console.log('⚔️ Fight button added to manager!');
    
    // Add shake animation
    const shakeStyle = document.createElement('style');
    shakeStyle.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px) rotate(-2deg); }
            75% { transform: translateX(10px) rotate(2deg); }
        }
    `;
    document.head.appendChild(shakeStyle);
}

function startFightSequence(managerCard, kitCatCard) {
    console.log('⚔️ Starting fight sequence!');
    
    let bossHealth = 0;
    let activeBubbles = [];
    let battleActive = false;
    let bossBar, healthBarElement, patienceText, battleOverlay;
    
    // Play epic boss music
    let musicInterval = setInterval(() => {
        playDoomBossMusic();
    }, 2000);
    
    // Create battle overlay
    battleOverlay = document.createElement('div');
    battleOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.7);
        z-index: 9998;
        pointer-events: all;
    `;
    document.body.appendChild(battleOverlay);
    
    // Create boss bar container
    bossBar = document.createElement('div');
    bossBar.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            width: 80%;
            max-width: 800px;
            z-index: 10001;
            animation: boss-bar-appear 1s ease-out;
        ">
            <div style="
                background: rgba(10, 14, 39, 0.95);
                border: 3px solid #8b0000;
                border-radius: 15px;
                padding: 1.5rem;
                box-shadow: 0 10px 50px rgba(139, 0, 0, 0.8);
            ">
                <div style="
                    text-align: center;
                    font-family: 'Orbitron', sans-serif;
                    color: #ff4655;
                    font-size: 1.8rem;
                    margin-bottom: 0.5rem;
                    text-transform: uppercase;
                    text-shadow: 0 0 10px #ff4655;
                ">MANAGER FIGHT</div>
                <div style="
                    text-align: center;
                    color: #ff8c00;
                    font-size: 1rem;
                    margin-bottom: 1rem;
                ">LOADING...</div>
                <div style="
                    background: rgba(139, 0, 0, 0.3);
                    border: 2px solid #8b0000;
                    border-radius: 10px;
                    height: 30px;
                    overflow: hidden;
                    position: relative;
                ">
                    <div id="boss-health-quest" style="
                        background: linear-gradient(90deg, #8b0000, #ff4655);
                        height: 100%;
                        width: 0%;
                        transition: width 0.3s ease;
                        box-shadow: 0 0 20px rgba(255, 70, 85, 0.8);
                    "></div>
                </div>
                <div style="
                    text-align: center;
                    color: #b8c5d6;
                    font-size: 1.2rem;
                    margin-top: 1rem;
                    font-family: 'Rajdhani', sans-serif;
                ">Boss HP: <span id="patience-text-quest">0%</span></div>
            </div>
        </div>
    `;
    
    document.body.appendChild(bossBar);
    
    healthBarElement = document.getElementById('boss-health-quest');
    patienceText = document.getElementById('patience-text-quest');
    
    // Screen flash effect
    const flash = document.createElement('div');
    flash.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: #8b0000;
        z-index: 10000;
        opacity: 1;
        pointer-events: none;
        animation: flash-fade 0.5s ease-out forwards;
    `;
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 500);
    
    // Animate manager card
    managerCard.style.animation = 'shake 0.3s infinite';
    
    // Phase 1: Boss HP loads from 0 to 100
    const loadInterval = setInterval(() => {
        bossHealth += 2;
        if (healthBarElement) {
            healthBarElement.style.width = bossHealth + '%';
            patienceText.textContent = bossHealth + '%';
        }
        
        if (bossHealth >= 100) {
            clearInterval(loadInterval);
            setTimeout(startBattle, 500);
        }
    }, 30);
    
    function startBattle() {
        battleActive = true;
        patienceText.parentElement.previousElementSibling.textContent = 'FIGHT!';
        
        // Spawn bubbles every 1.5 seconds
        const spawnInterval = setInterval(() => {
            if (!battleActive) {
                clearInterval(spawnInterval);
                return;
            }
            spawnAttackBubble();
        }, 1500);
        
        // Keyboard attack - press SPACE to deal damage
        const keyHandler = (e) => {
            if (!battleActive) {
                document.removeEventListener('keydown', keyHandler);
                return;
            }
            
            if (e.code === 'Space') {
                e.preventDefault();
                dealDamage(5);
            }
        };
        document.addEventListener('keydown', keyHandler);
    }
    
    function spawnAttackBubble() {
        const bubble = document.createElement('div');
        const x = Math.random() * (window.innerWidth - 100);
        const y = Math.random() * (window.innerHeight - 200) + 100;
        const key = ['Q', 'W', 'E', 'A', 'S', 'D'][Math.floor(Math.random() * 6)];
        
        bubble.textContent = key;
        bubble.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #ff4655, #ff8c00);
            border: 3px solid #fff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Orbitron', sans-serif;
            font-size: 2rem;
            font-weight: 900;
            color: white;
            z-index: 10000;
            cursor: pointer;
            animation: bubble-attack 0.3s ease-out;
            box-shadow: 0 5px 20px rgba(255, 70, 85, 0.5);
            text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
        `;
        bubble.dataset.key = key;
        
        document.body.appendChild(bubble);
        activeBubbles.push(bubble);
        
        // Click to destroy
        bubble.addEventListener('click', () => {
            destroyBubble(bubble, 10);
        });
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (document.body.contains(bubble)) {
                bubble.remove();
                activeBubbles = activeBubbles.filter(b => b !== bubble);
            }
        }, 3000);
        
        // Keyboard bubble destruction
        const bubbleKeyHandler = (e) => {
            if (!battleActive) {
                document.removeEventListener('keydown', bubbleKeyHandler);
                return;
            }
            
            const key = e.key.toUpperCase();
            if (bubble.dataset.key === key && document.body.contains(bubble)) {
                e.preventDefault();
                destroyBubble(bubble, 10);
                document.removeEventListener('keydown', bubbleKeyHandler);
            }
        };
        document.addEventListener('keydown', bubbleKeyHandler);
    }
    
    function destroyBubble(bubble, damage) {
        bubble.style.animation = 'bubble-hit 0.2s ease-out';
        setTimeout(() => {
            bubble.remove();
            activeBubbles = activeBubbles.filter(b => b !== bubble);
            dealDamage(damage);
        }, 200);
    }
    
    function dealDamage(amount) {
        bossHealth -= amount;
        if (bossHealth < 0) bossHealth = 0;
        
        if (healthBarElement) {
            healthBarElement.style.width = bossHealth + '%';
            patienceText.textContent = bossHealth + '%';
        }
        
        // Flash effect on hit
        document.body.style.animation = 'screen-flash 0.1s ease-out';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 100);
        
        // Check if boss defeated
        if (bossHealth <= 0) {
            battleActive = false;
            activeBubbles.forEach(b => b.remove());
            activeBubbles = [];
            showVictory();
        }
    }
    
    function showVictory() {
        managerCard.style.animation = '';
        clearInterval(musicInterval);
        
        const victoryMessage = document.createElement('div');
        victoryMessage.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(10, 14, 39, 0.98);
                border: 4px solid #ffd700;
                border-radius: 20px;
                padding: 3rem;
                text-align: center;
                z-index: 10002;
                box-shadow: 0 20px 60px rgba(255, 215, 0, 0.5);
                animation: victory-appear 1s ease-out;
            ">
                <div style="font-size: 4rem; margin-bottom: 1rem;">🏆</div>
                <h2 style="
                    font-family: 'Orbitron', sans-serif;
                    color: #ffd700;
                    font-size: 2.5rem;
                    margin-bottom: 1rem;
                    text-transform: uppercase;
                    text-shadow: 0 0 20px #ffd700;
                ">VICTORY!</h2>
                <p style="
                    color: #ff8c00;
                    font-size: 1.5rem;
                    margin-bottom: 1rem;
                ">You got the cookie! 🍪</p>
            </div>
        `;
        
        document.body.appendChild(victoryMessage);
        
        // Mark quest progress
        questProgress.gotCookie = true;
        
        // Remove everything after 3 seconds
        setTimeout(() => {
            bossBar.remove();
            victoryMessage.remove();
            battleOverlay.remove();
            
            // Add cookie return button to kit_cat
            if (kitCatCard) {
                addCookieReturnButton(kitCatCard);
            }
        }, 3000);
    }
}

// Initialize the admin quest
initAdminQuest();

function startAdminExplosion() {
    // Create hacking background
    const hackingBg = document.createElement('div');
    hackingBg.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: #000;
        z-index: 99998;
        overflow: hidden;
    `;
    
    // Add matrix-style falling code
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0.7;
    `;
    hackingBg.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#0f0';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    const matrixInterval = setInterval(drawMatrix, 33);
    
    // Create countdown overlay
    const countdownOverlay = document.createElement('div');
    countdownOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 99999;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    `;
    
    const countdownText = document.createElement('div');
    countdownText.style.cssText = `
        font-family: 'Orbitron', sans-serif;
        font-size: 10rem;
        color: #ff4655;
        font-weight: 900;
        text-shadow: 0 0 50px #ff4655;
        animation: pulse 0.5s ease-in-out infinite;
        z-index: 100000;
    `;
    
    const warningText = document.createElement('div');
    warningText.textContent = '⚠️ SYSTEM BREACH - EXPLODING IN ⚠️';
    warningText.style.cssText = `
        font-family: 'Orbitron', sans-serif;
        font-size: 2rem;
        color: #ff8c00;
        margin-bottom: 2rem;
        text-shadow: 0 0 30px #ff8c00;
        animation: blink 0.5s ease-in-out infinite;
        z-index: 100000;
    `;
    
    const hackingText = document.createElement('div');
    hackingText.textContent = '> ACCESSING MAINFRAME...\n> BYPASSING FIREWALL...\n> INJECTING PAYLOAD...';
    hackingText.style.cssText = `
        font-family: 'Courier New', monospace;
        font-size: 1.2rem;
        color: #0f0;
        position: absolute;
        top: 20px;
        left: 20px;
        white-space: pre;
        text-shadow: 0 0 10px #0f0;
        z-index: 100000;
    `;
    
    countdownOverlay.appendChild(hackingText);
    countdownOverlay.appendChild(warningText);
    countdownOverlay.appendChild(countdownText);
    hackingBg.appendChild(countdownOverlay);
    document.body.appendChild(hackingBg);
    
    // Play nuclear alert sound
    playNuclearAlert();
    
    // Countdown from 10
    let countdown = 10;
    countdownText.textContent = countdown;
    
    const countdownInterval = setInterval(() => {
        countdown--;
        if (countdown > 0) {
            countdownText.textContent = countdown;
            playNuclearAlert();
        } else {
            clearInterval(countdownInterval);
            clearInterval(matrixInterval);
            // Show troll face
            triggerTrollExplosion(hackingBg);
        }
    }, 1000);
}

function playNuclearAlert() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const now = audioContext.currentTime;
        
        // Create siren sound
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Alternate between two frequencies for siren effect
        oscillator.frequency.setValueAtTime(800, now);
        oscillator.frequency.linearRampToValueAtTime(400, now + 0.25);
        oscillator.frequency.linearRampToValueAtTime(800, now + 0.5);
        
        oscillator.type = 'square';
        gainNode.gain.setValueAtTime(0.3, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        
        oscillator.start(now);
        oscillator.stop(now + 0.5);
    } catch (e) {
        console.log('Audio not supported');
    }
}

function triggerTrollExplosion(countdownOverlay) {
    // Remove countdown
    countdownOverlay.remove();
    
    // Create troll face overlay
    const trollOverlay = document.createElement('div');
    trollOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.95);
        z-index: 99999;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    `;
    
    const trollFace = document.createElement('div');
    trollFace.textContent = '😈';
    trollFace.style.cssText = `
        font-size: 20rem;
        animation: troll-spin 1s ease-in-out;
        margin-bottom: 2rem;
    `;
    
    const trollText = document.createElement('div');
    trollText.innerHTML = `
        <div style="
            font-family: 'Orbitron', sans-serif;
            font-size: 3rem;
            color: #ff4655;
            margin-bottom: 1rem;
            text-shadow: 0 0 30px #ff4655;
        ">TROLLED!</div>
        <div style="
            font-family: 'Rajdhani', sans-serif;
            font-size: 1.5rem;
            color: #ff8c00;
        ">kit_cat350's revenge is complete!</div>
        <div style="
            font-family: 'Rajdhani', sans-serif;
            font-size: 1.2rem;
            color: #b8c5d6;
            margin-top: 1rem;
        ">Achievement Unlocked: Admin Mayhem</div>
    `;
    
    trollOverlay.appendChild(trollFace);
    trollOverlay.appendChild(trollText);
    document.body.appendChild(trollOverlay);
    
    // Add animation
    const trollStyle = document.createElement('style');
    trollStyle.textContent = `
        @keyframes troll-spin {
            0% { transform: scale(0) rotate(0deg); opacity: 0; }
            50% { transform: scale(1.2) rotate(180deg); opacity: 1; }
            100% { transform: scale(1) rotate(360deg); opacity: 1; }
        }
    `;
    document.head.appendChild(trollStyle);
    
    // Play trolled music
    console.log('🎵 Playing trolled music...');
    playTrolledMusic();
    
    // Unlock achievement
    unlockAchievement('adminMayhem');
    
    // DON'T reset quest progress - keep gaveCookie as true so manager clicks work!
    // questProgress is now saved to localStorage and persists
    
    // Remove after 5 seconds
    setTimeout(() => {
        trollOverlay.style.animation = 'fade-out 1s ease-out forwards';
        const fadeStyle = document.createElement('style');
        fadeStyle.textContent = `
            @keyframes fade-out {
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(fadeStyle);
        setTimeout(() => trollOverlay.remove(), 1000);
    }, 5000);
}

function playTrolledMusic() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        function playNote(frequency, startTime, duration, type = 'sine', volume = 0.2) {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = type;
            
            gainNode.gain.setValueAtTime(volume, startTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
            
            oscillator.start(startTime);
            oscillator.stop(startTime + duration);
        }
        
        const now = audioContext.currentTime;
        
        // Troll song melody (Rick Roll style progression)
        const melody = [
            { freq: 329.63, time: 0, duration: 0.3 },      // E4
            { freq: 369.99, time: 0.3, duration: 0.3 },    // F#4
            { freq: 329.63, time: 0.6, duration: 0.3 },    // E4
            { freq: 293.66, time: 0.9, duration: 0.3 },    // D4
            { freq: 246.94, time: 1.2, duration: 0.6 },    // B3
            { freq: 293.66, time: 1.8, duration: 0.3 },    // D4
            { freq: 329.63, time: 2.1, duration: 0.3 },    // E4
            { freq: 293.66, time: 2.4, duration: 0.6 }     // D4
        ];
        
        // Bass line
        const bass = [
            { freq: 82.41, time: 0, duration: 0.6 },       // E2
            { freq: 92.5, time: 0.6, duration: 0.6 },      // F#2
            { freq: 73.42, time: 1.2, duration: 0.6 },     // D2
            { freq: 82.41, time: 1.8, duration: 0.6 }      // E2
        ];
        
        melody.forEach(note => {
            playNote(note.freq, now + note.time, note.duration, 'square', 0.35);
        });
        
        bass.forEach(note => {
            playNote(note.freq, now + note.time, note.duration, 'sine', 0.4);
        });
        
        // Add some percussion
        [0, 0.6, 1.2, 1.8, 2.4].forEach(time => {
            playNote(100, now + time, 0.1, 'triangle', 0.25);
        });
        
    } catch (e) {
        console.log('Audio playback not supported');
    }
}
