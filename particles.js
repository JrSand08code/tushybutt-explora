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

            .fusion-container {
                position: absolute;
                left: 5%;
                top: 30%;
                width: 200px;
                height: 200px;
                pointer-events: none;
                transform: scale(var(--scale, 1));
            }

            .fusion-particle {
                position: absolute;
                border-radius: 50%;
                box-shadow: 0 0 15px currentColor;
                animation-timing-function: ease-in-out;
            }

            .fusion-particle-a {
                width: 8px;
                height: 8px;
                background: #38bdf8;
                color: #38bdf8;
                left: 10px;
                top: 85px;
                animation: fusionWave1 8s ease-in-out infinite;
            }

            .fusion-particle-b {
                width: 10px;
                height: 10px;
                background: #0ea5e9;
                color: #0ea5e9;
                right: 15px;
                top: 80px;
                animation: fusionWave1 8s ease-in-out infinite;
                animation-delay: 1s;
            }

            .fusion-particle-c {
                width: 6px;
                height: 6px;
                background: #0284c7;
                color: #0284c7;
                left: 20px;
                bottom: 20px;
                animation: fusionWave2 8s ease-in-out infinite;
                animation-delay: 2s;
            }

            .fusion-particle-d {
                width: 9px;
                height: 9px;
                background: #1e40af;
                color: #1e40af;
                right: 10px;
                bottom: 25px;
                animation: fusionWave2 8s ease-in-out infinite;
                animation-delay: 3s;
            }

            .fusion-core {
                position: absolute;
                width: 15px;
                height: 15px;
                background: radial-gradient(circle, #3b82f6, #1e40af);
                border-radius: 50%;
                left: 92px;
                top: 92px;
                box-shadow: 0 0 20px #3b82f6;
                animation: fusionCore 8s ease-in-out infinite;
                transform: scale(0);
                opacity: 0;
            }

            @keyframes fusionWave1 {
                0% {
                    transform: translateX(0) translateY(0) scale(1);
                    opacity: 0.8;
                }
                5% {
                    transform: translateX(7px) translateY(-2px) scale(1.05);
                    opacity: 0.9;
                }
                10% {
                    transform: translateX(15px) translateY(-5px) scale(1.1);
                    opacity: 1;
                }
                15% {
                    transform: translateX(23px) translateY(-4px) scale(1.15);
                    opacity: 1;
                }
                20% {
                    transform: translateX(35px) translateY(-2px) scale(1.2);
                    opacity: 1;
                }
                25% {
                    transform: translateX(45px) translateY(0px) scale(1.18);
                    opacity: 0.95;
                }
                30% {
                    transform: translateX(55px) translateY(3px) scale(1.1);
                    opacity: 0.9;
                }
                35% {
                    transform: translateX(63px) translateY(5px) scale(1.05);
                    opacity: 0.8;
                }
                40% {
                    transform: translateX(75px) translateY(8px) scale(1);
                    opacity: 0.7;
                }
                45% {
                    transform: translateX(80px) translateY(9px) scale(0.9);
                    opacity: 0.5;
                }
                50% {
                    transform: translateX(85px) translateY(10px) scale(0.8);
                    opacity: 0.3;
                }
                55% {
                    transform: translateX(85px) translateY(10px) scale(0.8);
                    opacity: 0.3;
                }
                60% {
                    transform: translateX(85px) translateY(10px) scale(0.8);
                    opacity: 0.3;
                }
                65% {
                    transform: translateX(80px) translateY(9px) scale(0.85);
                    opacity: 0.4;
                }
                70% {
                    transform: translateX(75px) translateY(8px) scale(0.9);
                    opacity: 0.5;
                }
                75% {
                    transform: translateX(63px) translateY(5px) scale(0.95);
                    opacity: 0.6;
                }
                80% {
                    transform: translateX(55px) translateY(3px) scale(1);
                    opacity: 0.7;
                }
                85% {
                    transform: translateX(45px) translateY(0px) scale(1.05);
                    opacity: 0.8;
                }
                90% {
                    transform: translateX(35px) translateY(-2px) scale(1.1);
                    opacity: 0.9;
                }
                95% {
                    transform: translateX(15px) translateY(-5px) scale(1.05);
                    opacity: 0.95;
                }
                100% {
                    transform: translateX(0) translateY(0) scale(1);
                    opacity: 0.8;
                }
            }

            @keyframes fusionWave2 {
                0% {
                    transform: translateX(0) translateY(0) scale(1);
                    opacity: 0.8;
                }
                5% {
                    transform: translateX(-6px) translateY(4px) scale(1.05);
                    opacity: 0.9;
                }
                10% {
                    transform: translateX(-12px) translateY(8px) scale(1.1);
                    opacity: 1;
                }
                15% {
                    transform: translateX(-18px) translateY(12px) scale(1.15);
                    opacity: 1;
                }
                20% {
                    transform: translateX(-28px) translateY(18px) scale(1.2);
                    opacity: 1;
                }
                25% {
                    transform: translateX(-36px) translateY(21px) scale(1.18);
                    opacity: 0.95;
                }
                30% {
                    transform: translateX(-48px) translateY(25px) scale(1.1);
                    opacity: 0.9;
                }
                35% {
                    transform: translateX(-56px) translateY(26px) scale(1.05);
                    opacity: 0.8;
                }
                40% {
                    transform: translateX(-68px) translateY(28px) scale(1);
                    opacity: 0.7;
                }
                45% {
                    transform: translateX(-73px) translateY(29px) scale(0.9);
                    opacity: 0.5;
                }
                50% {
                    transform: translateX(-78px) translateY(30px) scale(0.8);
                    opacity: 0.3;
                }
                55% {
                    transform: translateX(-78px) translateY(30px) scale(0.8);
                    opacity: 0.3;
                }
                60% {
                    transform: translateX(-78px) translateY(30px) scale(0.8);
                    opacity: 0.3;
                }
                65% {
                    transform: translateX(-73px) translateY(29px) scale(0.85);
                    opacity: 0.4;
                }
                70% {
                    transform: translateX(-68px) translateY(28px) scale(0.9);
                    opacity: 0.5;
                }
                75% {
                    transform: translateX(-56px) translateY(26px) scale(0.95);
                    opacity: 0.6;
                }
                80% {
                    transform: translateX(-48px) translateY(25px) scale(1);
                    opacity: 0.7;
                }
                85% {
                    transform: translateX(-36px) translateY(21px) scale(1.05);
                    opacity: 0.8;
                }
                90% {
                    transform: translateX(-28px) translateY(18px) scale(1.1);
                    opacity: 0.9;
                }
                95% {
                    transform: translateX(-12px) translateY(8px) scale(1.05);
                    opacity: 0.95;
                }
                100% {
                    transform: translateX(0) translateY(0) scale(1);
                    opacity: 0.8;
                }
            }

            @keyframes fusionCore {
                0% {
                    transform: scale(0);
                    opacity: 0;
                }
                10% {
                    transform: scale(0.2);
                    opacity: 0.1;
                }
                15% {
                    transform: scale(0.5);
                    opacity: 0.3;
                }
                20% {
                    transform: scale(0.7);
                    opacity: 0.5;
                }
                25% {
                    transform: scale(0.9);
                    opacity: 0.6;
                }
                30% {
                    transform: scale(1);
                    opacity: 0.7;
                }
                35% {
                    transform: scale(1.2);
                    opacity: 0.8;
                    box-shadow: 0 0 25px #3b82f6, 0 0 50px rgba(59, 130, 246, 0.5);
                }
                40% {
                    transform: scale(1.4);
                    opacity: 0.9;
                    box-shadow: 0 0 28px #3b82f6, 0 0 55px rgba(59, 130, 246, 0.6);
                }
                45% {
                    transform: scale(1.5);
                    opacity: 1;
                    box-shadow: 0 0 30px #3b82f6, 0 0 60px rgba(59, 130, 246, 0.8);
                }
                50% {
                    transform: scale(1.7);
                    opacity: 1;
                    box-shadow: 0 0 35px #3b82f6, 0 0 70px rgba(59, 130, 246, 0.9);
                }
                55% {
                    transform: scale(1.8);
                    opacity: 1;
                    box-shadow: 0 0 38px #3b82f6, 0 0 75px rgba(59, 130, 246, 0.95);
                }
                60% {
                    transform: scale(2);
                    opacity: 1;
                    box-shadow: 0 0 40px #3b82f6, 0 0 80px rgba(59, 130, 246, 1);
                }
                65% {
                    transform: scale(1.9);
                    opacity: 0.95;
                    box-shadow: 0 0 38px #3b82f6, 0 0 75px rgba(59, 130, 246, 0.9);
                }
                70% {
                    transform: scale(1.8);
                    opacity: 0.9;
                    box-shadow: 0 0 35px #3b82f6, 0 0 70px rgba(59, 130, 246, 0.8);
                }
                75% {
                    transform: scale(1.8);
                    opacity: 0.9;
                    box-shadow: 0 0 35px #3b82f6, 0 0 70px rgba(59, 130, 246, 0.7);
                }
                80% {
                    transform: scale(1.6);
                    opacity: 0.8;
                    box-shadow: 0 0 30px #3b82f6, 0 0 60px rgba(59, 130, 246, 0.6);
                }
                85% {
                    transform: scale(1.4);
                    opacity: 0.7;
                    box-shadow: 0 0 28px #3b82f6, 0 0 55px rgba(59, 130, 246, 0.5);
                }
                90% {
                    transform: scale(1.2);
                    opacity: 0.6;
                    box-shadow: 0 0 25px #3b82f6, 0 0 50px rgba(59, 130, 246, 0.4);
                }
                95% {
                    transform: scale(1);
                    opacity: 0.4;
                    box-shadow: 0 0 20px #3b82f6, 0 0 40px rgba(59, 130, 246, 0.3);
                }
                100% {
                    transform: scale(0.8);
                    opacity: 0.2;
                    box-shadow: 0 0 15px #3b82f6, 0 0 30px rgba(59, 130, 246, 0.2);
                }
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
        this.createFusionAnimation(container);
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

    createFusionAnimation(container) {
        const fusionContainer = document.createElement('div');
        fusionContainer.className = 'fusion-container';

        // Create multiple fusion particles
        const particleA = document.createElement('div');
        particleA.className = 'fusion-particle fusion-particle-a';

        const particleB = document.createElement('div');
        particleB.className = 'fusion-particle fusion-particle-b';

        const particleC = document.createElement('div');
        particleC.className = 'fusion-particle fusion-particle-c';

        const particleD = document.createElement('div');
        particleD.className = 'fusion-particle fusion-particle-d';

        // Create fusion core that builds mass
        const fusionCore = document.createElement('div');
        fusionCore.className = 'fusion-core';

        fusionContainer.appendChild(particleA);
        fusionContainer.appendChild(particleB);
        fusionContainer.appendChild(particleC);
        fusionContainer.appendChild(particleD);
        fusionContainer.appendChild(fusionCore);

        container.appendChild(fusionContainer);
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
