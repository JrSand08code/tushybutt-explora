// Nuclear Fusion Particle Effect
class NuclearParticleEffect {
    constructor(options = {}) {
        this.particleCount = options.particleCount || 100;
        this.colors = options.colors || ['#38bdf8', '#0ea5e9', '#0284c7', '#1e40af', '#3b82f6'];
        this.minSize = options.minSize || 5;
        this.maxSize = options.maxSize || 15;
        this.minDuration = options.minDuration || 2;
        this.maxDuration = options.maxDuration || 4;
        this.glowIntensity = options.glowIntensity || 0.8;
        this.rotationSpeed = options.rotationSpeed || 360; // degrees per 10s
        
        this.particles = [];
        this.init();
    }

    init() {
        this.setupStyles();
        this.createParticles();
        this.startRotation();
    }

    setupStyles() {
        const style = document.createElement('style');
        style.innerHTML = `
            .nuclear-particle-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                pointer-events: none;
                z-index: -1;
            }

            .nuclear-particle {
                position: absolute;
                border-radius: 50%;
                box-shadow: 0 0 20px currentColor;
                animation: particleFloat var(--duration) infinite ease-in-out;
            }

            .floating-particle {
                position: absolute;
                border-radius: 50%;
                box-shadow: 0 0 15px currentColor;
                animation: drift var(--drift-duration) infinite linear;
            }

            @keyframes particleFloat {
                0% {
                    transform: translateY(0px) scale(1);
                    opacity: 0.8;
                }
                50% {
                    transform: translateY(-30px) scale(1.2);
                    opacity: 1;
                }
                100% {
                    transform: translateY(0px) scale(1);
                    opacity: 0.8;
                }
            }

            @keyframes drift {
                0% {
                    transform: translateX(0) translateY(0);
                    opacity: 0;
                }
                10% {
                    opacity: 0.6;
                }
                90% {
                    opacity: 0.6;
                }
                100% {
                    transform: translateX(var(--drift-x)) translateY(var(--drift-y));
                    opacity: 0;
                }
            }

            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }

            .particle-field {
                animation: spin var(--spin-duration) linear infinite;
                transform-origin: center;
                position: absolute;
                width: 100%;
                height: 100%;
            }

            .uranium-atom {
                position: absolute;
                width: 120px;
                height: 120px;
            }

            .uranium-nucleus {
                position: absolute;
                width: 20px;
                height: 20px;
                background: radial-gradient(circle, #ffff00, #ffcc00);
                border-radius: 50%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                box-shadow: 0 0 30px #ffff00, inset 0 0 10px rgba(255, 255, 255, 0.5);
            }

            .electron-orbit {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                border: 1px solid rgba(255, 100, 0, 0.4);
                border-radius: 50%;
            }

            .electron {
                position: absolute;
                width: 8px;
                height: 8px;
                background: #ff6600;
                border-radius: 50%;
                box-shadow: 0 0 10px #ff6600;
                top: -4px;
                left: 50%;
                transform: translateX(-50%);
            }

            @keyframes orbitSlow {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }

    createParticles() {
        const container = document.createElement('div');
        container.className = 'nuclear-particle-container';
        
        // Removed central spinning particle field
        
        this.createFloatingParticles(container);
        this.createUraniumAtom(container);
        document.body.insertBefore(container, document.body.firstChild);
    }

    createFloatingParticles(container) {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            
            const size = Math.random() * 4 + 2;
            const color = this.colors[Math.floor(Math.random() * this.colors.length)];
            const driftDuration = Math.random() * 8 + 12;
            const startX = Math.random() * window.innerWidth;
            const startY = Math.random() * window.innerHeight;
            const driftX = (Math.random() - 0.5) * 300;
            const driftY = (Math.random() - 0.5) * 300;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${startX}px`;
            particle.style.top = `${startY}px`;
            particle.style.backgroundColor = color;
            particle.style.color = color;
            particle.style.setProperty('--drift-duration', `${driftDuration}s`);
            particle.style.setProperty('--drift-x', `${driftX}px`);
            particle.style.setProperty('--drift-y', `${driftY}px`);
            particle.style.animationDelay = `${Math.random() * driftDuration}s`;
            
            container.appendChild(particle);
        }
    }

    createUraniumAtom(container) {
        const atom = document.createElement('div');
        atom.className = 'uranium-atom';
        atom.style.right = '10%';
        atom.style.top = '20%';
        
        // Nucleus
        const nucleus = document.createElement('div');
        nucleus.className = 'uranium-nucleus';
        atom.appendChild(nucleus);
        
        // Create 3 electron orbits
        const orbitRadii = [35, 55, 75];
        const orbitDurations = [8, 10, 12];
        
        for (let orbit = 0; orbit < 3; orbit++) {
            const orbitDiv = document.createElement('div');
            orbitDiv.className = 'electron-orbit';
            orbitDiv.style.width = `${orbitRadii[orbit] * 2}px`;
            orbitDiv.style.height = `${orbitRadii[orbit] * 2}px`;
            orbitDiv.style.animation = `orbitSlow ${orbitDurations[orbit]}s linear infinite`;
            
            // Add electrons to orbit
            const electronCount = 2 + orbit;
            for (let e = 0; e < electronCount; e++) {
                const electron = document.createElement('div');
                electron.className = 'electron';
                electron.style.animation = `orbitSlow ${orbitDurations[orbit]}s linear infinite`;
                electron.style.animationDelay = `${(e / electronCount) * -orbitDurations[orbit]}s`;
                orbitDiv.appendChild(electron);
            }
            
            atom.appendChild(orbitDiv);
        }
        
        container.appendChild(atom);
    }

    startRotation() {
        // The rotation is handled by CSS animation via the particle-field
    }
}

// Initialize the effect when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new NuclearParticleEffect({
        particleCount: 120,
        colors: ['#38bdf8', '#0ea5e9', '#0284c7', '#1e40af', '#3b82f6'],
        minSize: 4,
        maxSize: 12,
        minDuration: 2,
        maxDuration: 4,
        glowIntensity: 0.85,
        rotationSpeed: 45 // 45 degrees per 10 seconds
    });
});
