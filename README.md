<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Lonely Lighthouse | Your Safe Space</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        /* Immersive deep night gradient background */
        body {
            background: linear-gradient(180deg, #1a1c29 0%, #2a2b40 50%, #3d3b54 100%);
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            overflow-x: hidden;
        }
        /* Frosted glass/Glassmorphism effect */
        .glass-panel {
            background: rgba(255, 255, 255, 0.06);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px rgba(255, 255, 255, 0.1) solid;
        }
        /* Smooth breathing animation for anxiety relief */
        @keyframes breathe {
            0%, 100% { transform: scale(1); opacity: 0.4; filter: blur(20px); }
            50% { transform: scale(1.15); opacity: 0.7; filter: blur(30px); }
        }
        .breathing-glow {
            animation: breathe 7s ease-in-out infinite;
        }
        /* Star rising animation */
        @keyframes floatUp {
            0% { transform: translateY(20px) scale(0.8); opacity: 0; }
            20% { opacity: 1; }
            100% { transform: translateY(-120px) scale(0.5); opacity: 0; }
        }
        .floating-star {
            animation: floatUp 4s ease-out forwards;
        }
    </style>
</head>
<body class="text-slate-200 min-h-screen flex flex-col justify-between p-6 relative">

    <div class="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div id="glowCircle" class="w-80 h-80 bg-amber-200/20 rounded-full breathing-glow"></div>
    </div>

    <header class="w-full max-w-4xl mx-auto flex justify-between items-center z-10">
        <div class="flex items-center space-x-3">
            <span class="text-2xl">🌙</span>
            <div>
                <h1 class="text-xl font-light tracking-wide text-amber-100/90">The Lonely Lighthouse</h1>
                <p class="text-xs text-slate-400">A light is always left on for you here tonight.</p>
            </div>
        </div>
        <div class="text-xs glass-panel px-3 py-1.5 rounded-full text-slate-300">
            🟢 1,204 kindred souls are watching the stars with you right now.
        </div>
    </header>

    <main class="w-full max-w-lg mx-auto my-auto z-10 flex flex-col items-center space-y-8">
        
        <div class="text-center space-y-2">
            <p id="mainPrompt" class="text-lg font-light text-amber-50/90 transition-all duration-1000">Whatever makes you feel lonely right now, whisper it here.</p>
            <p class="text-xs text-slate-400">It will turn into a star. No judgments, just release.</p>
        </div>

        <div class="w-full glass-panel p-6 rounded-3xl shadow-xl space-y-4 relative">
            <div id="starContainer" class="absolute -top-12 left-1/2 transform -translate-x-1/2 pointer-events-none"></div>

            <textarea id="whisperInput" rows="3" 
                class="w-full bg-transparent border-none resize-none focus:outline-none text-slate-100 placeholder-slate-500 text-sm leading-relaxed"
                placeholder="Try writing: 'Coming home to an empty room tonight felt a bit heavy...'"></textarea>
            
            <div class="flex justify-between items-center pt-2 border-t border-white/5">
                <span class="text-xs text-slate-500" id="charCount">0 / 200</span>
                <button id="sendBtn" onclick="sendWhisper()" 
                    class="bg-amber-100/10 hover:bg-amber-100/20 text-amber-200 text-xs px-5 py-2 rounded-full transition-all tracking-wider font-light">
                    Release to Stars ✨
                </button>
            </div>
        </div>

        <div class="flex space-x-3 text-xs">
            <button onclick="toggleAmbient('rain', this)" class="glass-panel px-4 py-2 rounded-full hover:bg-white/10 transition">
                🌧️ Soft Rain: <span class="text-slate-400">Off</span>
            </button>
            <button onclick="toggleAmbient('fire', this)" class="glass-panel px-4 py-2 rounded-full hover:bg-white/10 transition">
                🔥 Cozy Campfire: <span class="text-slate-400">Off</span>
            </button>
        </div>

    </main>

    <footer class="w-full max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-white/5 z-10 text-xs text-slate-500">
        <div>
            <span>This is a quiet sanctuary for your thoughts.</span>
            <a href="#" class="underline hover:text-slate-400 ml-1">Need immediate support? View professional helplines ↗</a>
        </div>
        <div class="tracking-widest font-light">
            YOU ARE NOT ALONE · 2026
        </div>
    </footer>

    <script>
        const whisperInput = document.getElementById('whisperInput');
        const charCount = document.getElementById('charCount');
        const mainPrompt = document.getElementById('mainPrompt');
        const glowCircle = document.getElementById('glowCircle');
        const starContainer = document.getElementById('starContainer');

        // Character Counter
        whisperInput.addEventListener('input', (e) => {
            const len = e.target.value.length;
            charCount.textContent = ${len} / 200;
            if(len > 200) {
                whisperInput.value = whisperInput.value.slice(0, 200);
            }
        });

        // Handle text submission
        function sendWhisper() {
            const text = whisperInput.value.trim();
            if (!text) return;

            // 1. Trigger the visual star animation
            createFloatingStar();

            // 2. Clear input fields
            whisperInput.value = '';
            charCount.textContent = '0 / 200';

            // 3. Cycle through comforting system replies
            mainPrompt.style.opacity = '0';
            setTimeout(() => {
                const replies = [
                    "It's heard. The universe is vast, but right now, this space is yours.",
                    "The world is loud, but it's quiet here. You are doing just fine. Rest well.",
                    "The words you couldn't say out loud are safe with the night sky now. 🌙",
                    "Leave the loneliness with the stars. Let the warm breeze carry you forward."
                ];
                mainPrompt.textContent = replies[Math.floor(Math.random() * replies.length)];
                mainPrompt.style.opacity = '1';
                
                // Transition the glow circle to a warmer tone as dynamic feedback
                glowCircle.style.backgroundColor = 'rgba(253, 230, 138, 0.35)';
            }, 1000);
        }

        // Dynamically inject floating star elements
        function createFloatingStar() {
            const star = document.createElement('div');
            star.className = 'floating-star text-2xl text-amber-200 absolute';
            star.textContent = '✨';
            starContainer.appendChild(star);

            // Housekeeping: Remove element after animation to prevent memory leaks
            setTimeout(() => {
                star.remove();
            }, 4000);
        }

        // Simulate ambient audio toggle states
        function toggleAmbient(type, btn) {
            const statusSpan = btn.querySelector('span');
            if (statusSpan.textContent === 'Off') {
                statusSpan.textContent = 'On';
                statusSpan.className = 'text-amber-300';
                // In production, instantiate and play your looped Web Audio API nodes here
            } else {
                statusSpan.textContent = 'Off';
                statusSpan.className = 'text-slate-400';
            }
        }
    </script>
</body>
</html>
