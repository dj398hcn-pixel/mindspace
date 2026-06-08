[petpal-final.html](https://github.com/user-attachments/files/28681537/petpal-final.html)
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>PetPal ✨</title>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Baloo+2:wght@400;600;800&display=swap" rel="stylesheet">
<style>
:root{
  --bg:#fdf6ff;--surface:#fff;--surface2:#f5eeff;
  --accent:#b07af5;--accent2:#ff8fc8;--accent3:#ffd166;
  --text:#2d1b4e;--muted:#8b6fad;--border:#e8d8ff;
  --nav:68px;--r:20px;--shadow:0 4px 24px rgba(176,122,245,.13);
}
*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%;overflow:hidden}
body{font-family:'Nunito',sans-serif;background:var(--bg);color:var(--text);max-width:480px;margin:0 auto;position:relative;display:flex;flex-direction:column;}
.blobs{position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden}
.blob{position:absolute;border-radius:50%;filter:blur(60px);opacity:.2;animation:bf 8s ease-in-out infinite alternate}
.b1{width:260px;height:260px;background:#b07af5;top:-60px;left:-80px}
.b2{width:200px;height:200px;background:#ff8fc8;top:30%;right:-60px;animation-delay:2s}
.b3{width:180px;height:180px;background:#ffd166;bottom:20%;left:-40px;animation-delay:4s}
@keyframes bf{0%{transform:translate(0,0) scale(1)}100%{transform:translate(20px,30px) scale(1.08)}}

/* ── AUTH SCREEN ── */
#auth-screen{
  position:fixed;inset:0;z-index:999;background:var(--bg);
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  padding:24px;gap:0;
}
.auth-logo{font-size:64px;animation:logobounce 2s ease-in-out infinite}
@keyframes logobounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
.auth-title{font-family:'Baloo 2',cursive;font-size:32px;font-weight:800;margin:8px 0 4px;background:linear-gradient(135deg,var(--accent),var(--accent2));-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
.auth-sub{font-size:13px;color:var(--muted);margin-bottom:28px;text-align:center}
.auth-card{width:100%;max-width:340px;background:var(--surface);border:1.5px solid var(--border);border-radius:24px;padding:24px;box-shadow:var(--shadow);display:flex;flex-direction:column;gap:12px;}
.auth-tabs{display:flex;background:var(--surface2);border-radius:12px;padding:3px;gap:3px;margin-bottom:4px;}
.auth-tab{flex:1;padding:8px;border:none;background:none;border-radius:10px;font-family:'Nunito',sans-serif;font-size:13px;font-weight:700;color:var(--muted);cursor:pointer;transition:all .2s;}
.auth-tab.active{background:var(--surface);color:var(--accent);box-shadow:0 2px 8px rgba(176,122,245,.15);}
.auth-input{width:100%;padding:11px 14px;border:1.5px solid var(--border);border-radius:12px;font-family:'Nunito',sans-serif;font-size:14px;background:var(--surface2);color:var(--text);outline:none;transition:border-color .2s;}
.auth-input:focus{border-color:var(--accent)}
.auth-btn{width:100%;padding:12px;border:none;border-radius:14px;font-family:'Nunito',sans-serif;font-size:14px;font-weight:800;cursor:pointer;transition:all .15s;}
.auth-btn.primary{background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff;box-shadow:0 4px 14px rgba(176,122,245,.4);}
.auth-btn.primary:active{transform:scale(.97)}
.auth-btn.ghost{background:var(--surface2);color:var(--muted);border:1.5px solid var(--border);}
.auth-btn.ghost:hover{border-color:var(--accent);color:var(--accent)}
.auth-divider{display:flex;align-items:center;gap:8px;color:var(--muted);font-size:12px;}
.auth-divider::before,.auth-divider::after{content:'';flex:1;height:1px;background:var(--border);}
.auth-err{font-size:12px;color:#e05555;font-weight:700;text-align:center;display:none;}
.auth-err.show{display:block}

#app{position:relative;z-index:1;display:flex;flex-direction:column;height:100%}
.page{display:none;flex:1;flex-direction:column;overflow:hidden;min-height:0}
.page.active{display:flex}
nav{position:relative;z-index:100;height:var(--nav);min-height:var(--nav);flex-shrink:0;background:rgba(255,255,255,.95);backdrop-filter:blur(16px);border-top:1.5px solid var(--border);display:flex;align-items:center;justify-content:space-around;box-shadow:0 -4px 24px rgba(176,122,245,.10);}
.nb{display:flex;flex-direction:column;align-items:center;gap:3px;border:none;background:none;cursor:pointer;font-family:'Nunito',sans-serif;font-size:11px;font-weight:700;color:var(--muted);padding:8px 20px;border-radius:16px;transition:all .2s;position:relative;}
.nb .ni{font-size:26px;transition:transform .2s;display:block}
.nb.active{color:var(--accent)}
.nb.active .ni{transform:scale(1.18)}
.nb.active::after{content:'';position:absolute;bottom:-4px;left:50%;transform:translateX(-50%);width:6px;height:6px;border-radius:50%;background:var(--accent);}
/* CHAT */
.chat-hd{padding:50px 16px 12px;background:linear-gradient(160deg,#f5eeff,#fff0fa);border-bottom:1.5px solid var(--border);display:flex;align-items:center;gap:12px;flex-shrink:0;}
.chat-av{width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,var(--accent),var(--accent2));display:flex;align-items:center;justify-content:center;font-size:24px;flex-shrink:0;box-shadow:0 4px 12px rgba(176,122,245,.35);}
.chat-hd-info h2{font-size:16px;font-weight:800;font-family:'Baloo 2',cursive;background:linear-gradient(135deg,var(--accent),var(--accent2));-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
.chat-hd-info p{font-size:11px;color:var(--muted)}
.odot{display:inline-block;width:7px;height:7px;border-radius:50%;background:#4cde80;margin-right:4px;box-shadow:0 0 0 2px #d4fbe5}
.chat-user-badge{font-size:11px;color:var(--accent);font-weight:700;margin-left:auto;background:var(--surface2);border:1.5px solid var(--border);border-radius:20px;padding:3px 10px;white-space:nowrap;cursor:pointer;}
.chat-msgs{flex:1;overflow-y:auto;padding:14px 14px 6px;display:flex;flex-direction:column;gap:12px;min-height:0;}
.msg{display:flex;gap:8px;align-items:flex-end;animation:mi .3s ease}
@keyframes mi{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
.msg.user{flex-direction:row-reverse}
.mb{max-width:75%;padding:10px 14px;border-radius:18px;font-size:14px;line-height:1.5;word-break:break-word;}
.msg.ai .mb{background:var(--surface);border:1.5px solid var(--border);border-bottom-left-radius:4px;box-shadow:var(--shadow)}
.msg.user .mb{background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff;border-bottom-right-radius:4px}
.mav{width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0}
.msg.ai .mav{background:linear-gradient(135deg,var(--accent),var(--accent2))}
.msg.user .mav{background:linear-gradient(135deg,#ffd166,#ff8fc8)}
.tdots{display:flex;gap:5px;padding:10px 14px}
.td{width:8px;height:8px;border-radius:50%;background:var(--accent);opacity:.5;animation:tb 1.2s ease-in-out infinite}
.td:nth-child(2){animation-delay:.2s}.td:nth-child(3){animation-delay:.4s}
@keyframes tb{0%,60%,100%{transform:translateY(0);opacity:.5}30%{transform:translateY(-6px);opacity:1}}
.chat-in-area{padding:10px 12px 12px;flex-shrink:0;background:rgba(255,255,255,.92);backdrop-filter:blur(12px);border-top:1.5px solid var(--border);display:flex;gap:8px;align-items:flex-end;}
.ci{flex:1;border:1.5px solid var(--border);border-radius:20px;padding:10px 14px;font-family:'Nunito',sans-serif;font-size:14px;background:var(--surface2);color:var(--text);outline:none;resize:none;max-height:100px;transition:border-color .2s;line-height:1.4;}
.ci:focus{border-color:var(--accent)}
.sbtn{width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,var(--accent),var(--accent2));border:none;color:#fff;font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:transform .15s;box-shadow:0 4px 14px rgba(176,122,245,.4);}
.sbtn:active{transform:scale(.93)}
.sbtn:disabled{opacity:.5;cursor:not-allowed}
/* PET */
#page-pet{overflow-y:auto}
.mood-bar{padding:14px 12px 10px;flex-shrink:0;background:linear-gradient(160deg,#f5eeff,#fff0fa);border-bottom:1.5px solid var(--border);}
.mood-bar h3{font-size:12px;color:var(--muted);margin-bottom:10px;font-weight:700;text-align:center;letter-spacing:.5px}
.erow{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;padding-bottom:2px}
.ec{display:flex;flex-direction:column;align-items:center;gap:2px;background:var(--surface);border:2px solid var(--border);border-radius:14px;padding:6px 9px;cursor:pointer;transition:all .18s;min-width:50px;}
.ec:hover{border-color:var(--accent);transform:translateY(-2px)}
.ec.sel{border-color:var(--accent);background:#f5eeff;box-shadow:0 2px 10px rgba(176,122,245,.2)}
.ec span:first-child{font-size:20px}.ec span:last-child{font-size:9px;font-weight:700;color:var(--muted)}
.pet-stage{display:flex;flex-direction:column;align-items:center;padding:18px 16px;gap:14px;}
.ptr{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}
.ptb{background:var(--surface);border:2px solid var(--border);border-radius:12px;padding:5px 12px;font-size:12px;font-weight:700;cursor:pointer;color:var(--muted);transition:all .15s;font-family:'Nunito',sans-serif;}
.ptb.active{border-color:var(--accent);color:var(--accent);background:#f5eeff}
.pdisplay{width:190px;height:190px;position:relative;display:flex;align-items:center;justify-content:center}
.pscene{width:190px;height:190px;background:linear-gradient(160deg,#f0e6ff,#ffe0f5);border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 32px rgba(176,122,245,.22),inset 0 1px 0 rgba(255,255,255,.6);position:relative;overflow:visible;cursor:pointer;}
.psvg{width:124px;height:124px;animation:pidl 3s ease-in-out infinite}
@keyframes pidl{0%,100%{transform:translateY(0) rotate(-1deg)}50%{transform:translateY(-8px) rotate(1deg)}}
.psvg.happy{animation:php .6s ease-in-out 3}
@keyframes php{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-16px) scale(1.12)}}
.flower{position:absolute;top:-30px;right:-18px;font-size:38px;animation:ffl 1s ease-out forwards;cursor:pointer}
@keyframes ffl{0%{opacity:0;transform:translateY(20px) rotate(-20deg)}60%{opacity:1;transform:translateY(-10px) rotate(10deg)}100%{opacity:1;transform:translateY(0) rotate(0)}}
.sbubble{background:var(--surface);border:2px solid var(--border);border-radius:18px;border-bottom-left-radius:4px;padding:11px 15px;max-width:270px;font-size:13.5px;line-height:1.5;text-align:center;box-shadow:var(--shadow);animation:bbl .4s cubic-bezier(.17,.67,.41,1.4);min-height:48px;display:flex;align-items:center;justify-content:center;}
@keyframes bbl{from{opacity:0;transform:scale(.85)}to{opacity:1;transform:none}}
.pacts{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}
.pab{background:var(--surface);border:2px solid var(--border);border-radius:50px;padding:8px 14px;font-family:'Nunito',sans-serif;font-size:12px;font-weight:700;cursor:pointer;color:var(--text);transition:all .15s;display:flex;align-items:center;gap:4px;}
.pab:hover{border-color:var(--accent);color:var(--accent);transform:translateY(-2px)}
.pab:active{transform:scale(.95)}
.pstats{width:100%;background:var(--surface);border:1.5px solid var(--border);border-radius:var(--r);padding:12px 16px;display:flex;gap:20px;justify-content:center;box-shadow:var(--shadow);}
.stat{text-align:center}
.sl{font-size:10px;color:var(--muted);font-weight:700;letter-spacing:.5px;text-transform:uppercase}
.sv{font-size:20px}
/* SETTINGS */
#page-settings{overflow-y:auto}
.sc{padding:54px 14px 20px;display:flex;flex-direction:column;gap:12px}
.ss{background:var(--surface);border:1.5px solid var(--border);border-radius:var(--r);overflow:hidden;box-shadow:var(--shadow)}
.sst{padding:11px 15px;font-size:11px;font-weight:800;letter-spacing:1px;text-transform:uppercase;color:var(--muted);background:var(--surface2);border-bottom:1.5px solid var(--border)}
.sr{display:flex;align-items:center;justify-content:space-between;padding:13px 15px;border-bottom:1px solid var(--border);gap:10px}
.sr:last-child{border-bottom:none}
.srl{display:flex;align-items:center;gap:10px}
.sri{font-size:20px;width:26px;text-align:center}
.srlb{font-size:13.5px;font-weight:700}
.srsb{font-size:11px;color:var(--muted)}
.toggle{width:46px;height:26px;border-radius:13px;background:var(--border);position:relative;cursor:pointer;transition:background .25s;flex-shrink:0;border:none}
.toggle.on{background:var(--accent)}
.toggle::after{content:'';position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:50%;background:#fff;transition:transform .25s;box-shadow:0 2px 6px rgba(0,0,0,.15)}
.toggle.on::after{transform:translateX(20px)}
.ssel{border:1.5px solid var(--border);border-radius:10px;padding:5px 9px;font-family:'Nunito',sans-serif;font-size:12px;font-weight:700;color:var(--text);background:var(--surface2);outline:none;cursor:pointer}
.vsl{width:100px;height:4px;border-radius:2px;background:var(--border);outline:none;cursor:pointer;-webkit-appearance:none;appearance:none}
.vsl::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:var(--accent);cursor:pointer}
.fba{width:100%;height:80px;border:1.5px solid var(--border);border-radius:12px;padding:9px 13px;font-family:'Nunito',sans-serif;font-size:13px;background:var(--surface2);color:var(--text);outline:none;resize:none}
.fba:focus{border-color:var(--accent)}
.fbs{width:100%;padding:11px;background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff;border:none;border-radius:13px;font-family:'Nunito',sans-serif;font-size:13px;font-weight:800;cursor:pointer;margin-top:4px;transition:opacity .15s}
.fbs:active{opacity:.85}
.star{font-size:24px;cursor:pointer;transition:transform .15s;filter:grayscale(1)}
.star.lit{filter:none}
.star:hover{transform:scale(1.2)}
.vt{text-align:center;font-size:12px;color:var(--muted);padding:8px;letter-spacing:.5px}
.logout-btn{width:100%;padding:12px;background:var(--surface2);border:1.5px solid var(--border);border-radius:13px;font-family:'Nunito',sans-serif;font-size:13px;font-weight:800;color:var(--muted);cursor:pointer;transition:all .15s;}
.logout-btn:hover{border-color:#e05555;color:#e05555}
.toast{position:fixed;top:56px;left:50%;transform:translateX(-50%) translateY(-16px);background:var(--text);color:#fff;padding:9px 18px;border-radius:50px;font-size:13px;font-weight:700;opacity:0;transition:all .3s;z-index:998;white-space:nowrap;}
.toast.show{opacity:1;transform:translateX(-50%) translateY(0)}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:var(--border);border-radius:2px}
</style>
</head>
<body>
<div class="blobs"><div class="blob b1"></div><div class="blob b2"></div><div class="blob b3"></div></div>

<!-- ══════════ AUTH SCREEN ══════════ -->
<div id="auth-screen">
  <div class="auth-logo">🐾</div>
  <div class="auth-title">PetPal</div>
  <div class="auth-sub">Your AI companion, always here for you ✨</div>
  <div class="auth-card">
    <div class="auth-tabs">
      <button class="auth-tab active" onclick="authTab('login')" id="tab-login">Log In</button>
      <button class="auth-tab" onclick="authTab('register')" id="tab-register">Register</button>
    </div>
    <!-- Login -->
    <div id="auth-login">
      <div style="display:flex;flex-direction:column;gap:10px">
        <input class="auth-input" id="login-email" type="email" placeholder="Email address">
        <input class="auth-input" id="login-pass" type="password" placeholder="Password">
        <div class="auth-err" id="login-err"></div>
        <button class="auth-btn primary" onclick="doLogin()">🔓 Log In</button>
      </div>
    </div>
    <!-- Register -->
    <div id="auth-register" style="display:none">
      <div style="display:flex;flex-direction:column;gap:10px">
        <input class="auth-input" id="reg-name" type="text" placeholder="Your name">
        <input class="auth-input" id="reg-email" type="email" placeholder="Email address">
        <input class="auth-input" id="reg-pass" type="password" placeholder="Password (min 6 chars)">
        <div class="auth-err" id="reg-err"></div>
        <button class="auth-btn primary" onclick="doRegister()">✨ Create Account</button>
      </div>
    </div>
    <div class="auth-divider">or</div>
    <button class="auth-btn ghost" onclick="doGuest()">👋 Continue as Guest</button>
  </div>
</div>

<!-- ══════════ MAIN APP ══════════ -->
<div id="app" style="display:none">

<!-- CHAT -->
<div id="page-chat" class="page active">
  <div class="chat-hd">
    <div class="chat-av">🤖</div>
    <div class="chat-hd-info">
      <h2>PetPal AI</h2>
      <p><span class="odot"></span><span data-t="chatSub">Your friendly companion · always here</span></p>
    </div>
    <div class="chat-user-badge" id="userBadge" onclick="sw('settings')">👤 Guest</div>
  </div>
  <div class="chat-msgs" id="chatMsgs"></div>
  <div class="chat-in-area">
    <textarea class="ci" id="ci" data-placeholder="chatPlaceholder" rows="1" oninput="ar(this)" onkeydown="hk(event)"></textarea>
    <button class="sbtn" id="sbtn" onclick="send()">➤</button>
  </div>
</div>

<!-- PET -->
<div id="page-pet" class="page">
  <div class="mood-bar">
    <h3 id="moodTitle" data-t="moodTitle">HOW ARE YOU FEELING TODAY?</h3>
    <div class="erow" id="erow"></div>
  </div>
  <div class="pet-stage">
    <div class="ptr" id="ptr"></div>
    <div class="pdisplay">
      <div class="pscene" id="pscene">
        <div id="psvgc"></div>
        <div class="flower" id="flw" style="display:none" onclick="acceptFlower()"></div>
      </div>
    </div>
    <div class="sbubble" id="sbubble"><span id="stext"></span></div>
    <div class="pacts">
      <button class="pab" onclick="pa('pet')">🤗 <span data-t="actPet">Pet</span></button>
      <button class="pab" onclick="pa('feed')">🍬 <span data-t="actFeed">Feed</span></button>
      <button class="pab" onclick="pa('play')">🎾 <span data-t="actPlay">Play</span></button>
      <button class="pab" onclick="pa('mood')">💬 <span data-t="actMood">Mood</span></button>
      <button class="pab" onclick="trigFlower()">🌸 <span data-t="actGift">Gift</span></button>
    </div>
    <div class="pstats">
      <div class="stat"><div class="sl" data-t="statHappy">Happiness</div><div class="sv" id="sH">😊</div></div>
      <div class="stat"><div class="sl" data-t="statEnergy">Energy</div><div class="sv" id="sE">⚡</div></div>
      <div class="stat"><div class="sl" data-t="statLove">Love</div><div class="sv" id="sL">💖</div></div>
    </div>
  </div>
</div>

<!-- SETTINGS -->
<div id="page-settings" class="page">
  <div class="sc">
    <div style="text-align:center;padding:0 0 4px">
      <div style="font-size:36px">⚙️</div>
      <div style="font-family:'Baloo 2',cursive;font-size:21px;font-weight:800;background:linear-gradient(135deg,var(--accent),var(--accent2));-webkit-background-clip:text;-webkit-text-fill-color:transparent" data-t="settingsTitle">Settings</div>
    </div>
    <!-- Account info -->
    <div class="ss">
      <div class="sst">👤 Account</div>
      <div class="sr"><div class="srl"><div class="sri">😊</div><div><div class="srlb" id="acctName">Guest</div><div class="srsb" id="acctEmail">Not logged in</div></div></div></div>
      <div class="sr" style="padding:12px 15px"><button class="logout-btn" onclick="doLogout()">🚪 Log Out</button></div>
    </div>
    <div class="ss">
      <div class="sst" data-t="secSound">🎵 Sound</div>
      <div class="sr">
        <div class="srl"><div class="sri">🔊</div><div><div class="srlb" data-t="sfxLabel">Sound Effects</div><div class="srsb" data-t="sfxSub">Pet interactions</div></div></div>
        <button class="toggle on" id="sfxToggle" onclick="tog(this,'sfx')"></button>
      </div>
      <div class="sr">
        <div class="srl"><div class="sri">🎶</div><div><div class="srlb" data-t="bgmLabel">Background Music</div><div class="srsb" data-t="bgmSub">Ambient tunes</div></div></div>
        <button class="toggle" id="bgmToggle" onclick="tog(this,'bgm')"></button>
      </div>
      <div class="sr">
        <div class="srl"><div class="sri">🔈</div><div><div class="srlb" data-t="volLabel">Volume</div></div></div>
        <div style="display:flex;align-items:center;gap:8px">
          <input type="range" class="vsl" id="volSlider" min="0" max="100" value="70" oninput="setVol(this.value)">
          <span id="vv" style="font-size:11px;font-weight:700;color:var(--muted);min-width:30px">70%</span>
        </div>
      </div>
    </div>
    <div class="ss">
      <div class="sst" data-t="secLang">🌐 Language</div>
      <div class="sr">
        <div class="srl"><div class="sri">🗣️</div><div><div class="srlb" data-t="langLabel">App Language</div><div class="srsb" data-t="langSub">Chat & UI</div></div></div>
        <select class="ssel" id="langSel" onchange="chLang(this.value)">
          <option value="en">🇬🇧 English</option>
          <option value="zh">🇨🇳 中文</option>
          <option value="ms">🇲🇾 Bahasa Melayu</option>
          <option value="ja">🇯🇵 日本語</option>
          <option value="ko">🇰🇷 한국어</option>
        </select>
      </div>
      <div class="sr">
        <div class="srl"><div class="sri">🌙</div><div><div class="srlb" data-t="darkLabel">Dark Mode</div><div class="srsb" data-t="darkSub">Easy on the eyes</div></div></div>
        <button class="toggle" onclick="togDark(this)"></button>
      </div>
      <div class="sr">
        <div class="srl"><div class="sri">🔔</div><div><div class="srlb" data-t="notifLabel">Notifications</div><div class="srsb" data-t="notifSub">Daily check-in reminders</div></div></div>
        <button class="toggle on" onclick="tog(this,'notif')"></button>
      </div>
    </div>
    <div class="ss">
      <div class="sst" data-t="secFeedback">💌 Feedback</div>
      <div class="sr" style="flex-direction:column;align-items:flex-start;gap:10px">
        <div style="font-size:12px;font-weight:700;color:var(--muted)" data-t="rateLabel">Rate your experience</div>
        <div id="stars" style="display:flex;gap:4px">
          <span class="star" onclick="rate(1)">⭐</span><span class="star" onclick="rate(2)">⭐</span>
          <span class="star" onclick="rate(3)">⭐</span><span class="star" onclick="rate(4)">⭐</span>
          <span class="star" onclick="rate(5)">⭐</span>
        </div>
      </div>
      <div class="sr" style="flex-direction:column;align-items:flex-start;gap:8px">
        <div style="font-size:12px;font-weight:700;color:var(--muted)" data-t="fbLabel">Send us your thoughts 💭</div>
        <textarea class="fba" id="fbt" data-placeholder="fbPlaceholder"></textarea>
        <button class="fbs" onclick="subFb()" data-t="fbBtn">✉️ Send Feedback</button>
      </div>
    </div>
    <div class="vt">PetPal v2.0.0 · Made with 💜</div>
  </div>
</div>

<nav>
  <button class="nb active" id="nb-chat" onclick="sw('chat')"><span class="ni">💬</span><span data-t="navChat">Chat</span></button>
  <button class="nb" id="nb-pet" onclick="sw('pet')"><span class="ni">🐾</span><span data-t="navPet">Pet</span></button>
  <button class="nb" id="nb-settings" onclick="sw('settings')"><span class="ni">⚙️</span><span data-t="navSettings">Settings</span></button>
</nav>
</div>

<div class="toast" id="toast"></div>

<script>
/* ══════════════════════════════════
   AUTH  (localStorage simulation)
══════════════════════════════════ */
let currentUser = null; // {name, email, isGuest}

function authTab(tab) {
  document.getElementById('auth-login').style.display    = tab==='login'    ? '' : 'none';
  document.getElementById('auth-register').style.display = tab==='register' ? '' : 'none';
  document.getElementById('tab-login').classList.toggle('active',    tab==='login');
  document.getElementById('tab-register').classList.toggle('active', tab==='register');
}

function showErr(id, msg) {
  const el = document.getElementById(id);
  el.textContent = msg; el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 3000);
}

function doRegister() {
  const name  = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const pass  = document.getElementById('reg-pass').value;
  if (!name)  return showErr('reg-err','Please enter your name');
  if (!email || !email.includes('@')) return showErr('reg-err','Please enter a valid email');
  if (pass.length < 6) return showErr('reg-err','Password must be at least 6 characters');
  // Save to localStorage (simulate DB)
  const users = JSON.parse(localStorage.getItem('pp_users')||'{}');
  if (users[email]) return showErr('reg-err','Email already registered');
  users[email] = {name, pass};
  localStorage.setItem('pp_users', JSON.stringify(users));
  enterApp({name, email, isGuest:false});
}

function doLogin() {
  const email = document.getElementById('login-email').value.trim();
  const pass  = document.getElementById('login-pass').value;
  if (!email) return showErr('login-err','Please enter your email');
  if (!pass)  return showErr('login-err','Please enter your password');
  const users = JSON.parse(localStorage.getItem('pp_users')||'{}');
  if (!users[email]) return showErr('login-err','Email not found');
  if (users[email].pass !== pass) return showErr('login-err','Incorrect password');
  enterApp({name: users[email].name, email, isGuest:false});
}

function doGuest() {
  enterApp({name:'Guest', email:'', isGuest:true});
}

function enterApp(user) {
  currentUser = user;
  document.getElementById('auth-screen').style.display = 'none';
  document.getElementById('app').style.display = 'flex';
  // Update UI
  const badge = document.getElementById('userBadge');
  badge.textContent = '👤 ' + (user.isGuest ? 'Guest' : user.name);
  document.getElementById('acctName').textContent  = user.isGuest ? 'Guest' : user.name;
  document.getElementById('acctEmail').textContent = user.isGuest ? 'Not logged in' : user.email;
  playSfx('gift');
  initApp();
}

function doLogout() {
  currentUser = null;
  // Reset app state
  document.getElementById('app').style.display = 'none';
  document.getElementById('auth-screen').style.display = 'flex';
  document.getElementById('chatMsgs').innerHTML = '';
  hist = [];
  authTab('login');
}

/* ══════════════════════════════════
   AUDIO ENGINE
══════════════════════════════════ */
let audioCtx=null, bgmNode=null, bgmGain=null;
let sfxEnabled=true, bgmEnabled=false, masterVol=0.7;

function getCtx(){
  if(!audioCtx) audioCtx=new(window.AudioContext||window.webkitAudioContext)();
  if(audioCtx.state==='suspended') audioCtx.resume();
  return audioCtx;
}
function playSfx(type){
  if(!sfxEnabled) return;
  try{
    const ctx=getCtx();
    const g=ctx.createGain();
    g.connect(ctx.destination);
    g.gain.setValueAtTime(masterVol*0.3,ctx.currentTime);
    const configs={
      pet: [{f:520,t:0,d:.08},{f:660,t:.09,d:.1},{f:800,t:.2,d:.12}],
      feed:[{f:440,t:0,d:.06},{f:550,t:.07,d:.06},{f:440,t:.14,d:.06},{f:660,t:.21,d:.1}],
      play:[{f:600,t:0,d:.05},{f:800,t:.06,d:.05},{f:1000,t:.12,d:.05},{f:800,t:.18,d:.05},{f:1000,t:.24,d:.1}],
      mood:[{f:340,t:0,d:.1},{f:420,t:.12,d:.1},{f:380,t:.25,d:.15}],
      gift:[{f:523,t:0,d:.08},{f:659,t:.1,d:.08},{f:784,t:.2,d:.08},{f:1047,t:.32,d:.2}],
      msg: [{f:480,t:0,d:.06},{f:600,t:.08,d:.1}],
      send:[{f:600,t:0,d:.05},{f:750,t:.07,d:.08}],
      nav: [{f:400,t:0,d:.05},{f:500,t:.06,d:.07}]
    };
    const notes=configs[type]||configs.msg;
    notes.forEach(({f,t,d})=>{
      const osc=ctx.createOscillator(), ng=ctx.createGain();
      osc.connect(ng); ng.connect(g);
      osc.type='sine';
      osc.frequency.setValueAtTime(f,ctx.currentTime+t);
      ng.gain.setValueAtTime(0.8,ctx.currentTime+t);
      ng.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+t+d);
      osc.start(ctx.currentTime+t); osc.stop(ctx.currentTime+t+d+0.05);
    });
  }catch(e){}
}
function startBgm(){
  if(!bgmEnabled||bgmNode) return;
  try{
    const ctx=getCtx();
    bgmGain=ctx.createGain();
    bgmGain.gain.setValueAtTime(masterVol*0.08,ctx.currentTime);
    bgmGain.connect(ctx.destination);
    const melody=[261,294,330,392,440,523,440,392,330,392,440,523,294,330,261,294];
    const beatLen=0.55;
    let startT=ctx.currentTime+0.1;
    function scheduleMelody(loop){
      melody.forEach((freq,i)=>{
        const osc=ctx.createOscillator(), env=ctx.createGain();
        osc.connect(env); env.connect(bgmGain);
        osc.type='triangle'; osc.frequency.value=freq;
        const t=startT+i*beatLen+loop*melody.length*beatLen;
        env.gain.setValueAtTime(0,t);
        env.gain.linearRampToValueAtTime(0.6,t+0.05);
        env.gain.setValueAtTime(0.6,t+beatLen*0.6);
        env.gain.linearRampToValueAtTime(0,t+beatLen*0.95);
        osc.start(t); osc.stop(t+beatLen);
      });
    }
    for(let i=0;i<4;i++) scheduleMelody(i);
    bgmNode=setInterval(()=>{
      if(!bgmEnabled){stopBgm();return;}
      bgmGain.gain.setValueAtTime(masterVol*0.08,ctx.currentTime);
      for(let i=0;i<4;i++) scheduleMelody(i);
      startT=ctx.currentTime+0.1;
    },melody.length*beatLen*4*1000-200);
  }catch(e){}
}
function stopBgm(){
  if(bgmNode){clearInterval(bgmNode);bgmNode=null;}
  if(bgmGain){try{bgmGain.disconnect();}catch(e){} bgmGain=null;}
}
function setVol(v){
  masterVol=v/100;
  document.getElementById('vv').textContent=v+'%';
  if(bgmGain) bgmGain.gain.setValueAtTime(masterVol*0.08,getCtx().currentTime);
}

/* ══════════════════════════════════
   TRANSLATIONS
══════════════════════════════════ */
const LANGS={
  en:{
    chatSub:'Your friendly companion · always here',
    chatPlaceholder:'Say something…',
    chatWelcome:"Hi there! 👋 I'm PetPal AI — your friendly companion. Ask me anything, share how you're feeling, or just say hi! 🐾",
    moodTitle:'HOW ARE YOU FEELING TODAY?',
    actPet:'Pet',actFeed:'Feed',actPlay:'Play',actMood:'Mood',actGift:'Gift',
    statHappy:'Happiness',statEnergy:'Energy',statLove:'Love',
    settingsTitle:'Settings',
    secSound:'🎵 Sound',sfxLabel:'Sound Effects',sfxSub:'Pet interactions',
    bgmLabel:'Background Music',bgmSub:'Ambient tunes',volLabel:'Volume',
    secLang:'🌐 Language',langLabel:'App Language',langSub:'Chat & UI',
    darkLabel:'Dark Mode',darkSub:'Easy on the eyes',
    notifLabel:'Notifications',notifSub:'Daily check-in reminders',
    secFeedback:'💌 Feedback',rateLabel:'Rate your experience',
    fbLabel:'Send us your thoughts 💭',fbPlaceholder:'What do you love? What can we improve?',
    fbBtn:'✉️ Send Feedback',
    navChat:'Chat',navPet:'Pet',navSettings:'Settings',
    toastSfxOn:'🔊 Sound on',toastSfxOff:'🔇 Sound off',
    toastBgmOn:'🎶 Music on',toastBgmOff:'🎵 Music off',
    toastNotifOn:'🔔 Notifications on',toastNotifOff:'🔕 Notifications off',
    toastDarkOn:'🌙 Dark mode on',toastDarkOff:'☀️ Light mode on',
    toastRateGood:'🌟 Thank you so much!',toastRateBad:'💙 Thanks for the honest feedback',
    toastFbEmpty:'⚠️ Please rate or write something!',toastFbSent:'✅ Feedback sent! Thank you 💖',
    toastLang:'🌐 Language: English',
    moods:[{e:'😊',n:'Happy'},{e:'😢',n:'Sad'},{e:'😠',n:'Angry'},{e:'😴',n:'Tired'},{e:'🤩',n:'Excited'},{e:'😰',n:'Anxious'},{e:'🥰',n:'Loving'},{e:'😌',n:'Calm'}],
    moodReply:{Happy:"You're happy! That makes me happy too! 🌈",Sad:"I'll cuddle with you all day 🤗",Angry:"Take a deep breath... I'm here 💜",Tired:"Rest with me! I'm an expert at napping 😴",Excited:"SAME!! Let's celebrate!! 🎉",Anxious:"Shh... everything will be okay 🌙",Loving:"I love you SO much too!! 💕",Calm:"Peaceful... shall we watch clouds together? ☁️"},
    petLines:["Purr purr... I love when you do that 💜","Oh! That feels so nice 🥰","*snuggles closer* Don't stop!","You have the best hands for petting! 🐾"],
    feedLines:["YUM! That's delicious! 🍬","Mmm! My favorite snack! 😋","Can I have more? Please? 👀","*munches happily* Thank you! 🌟"],
    playLines:["Wheee! I love playing with you! 🎾","Catch me if you can! 😜","This is the BEST day ever! 🎉","Again! Again! Again! ⚡"],
    moodLines:["I'm feeling paw-some today! 🌟","A little sleepy... maybe one more nap? 😴","SO excited!! Everything is wonderful! 🎉","I think I need more cuddles 🥺","I feel like going on an adventure! 🗺️","Today is a perfect snack day 🍪","I've been thinking about you all day 💭","Feeling bouncy and full of energy! ⚡","Everything smells like flowers today 🌸","Rainy day vibes... cozy and happy! ☁️"],
    giftLine:(f)=>`I picked this ${f} just for you! Will you accept it? 🌸`,
    giftAccept:"Yay! I'm SO happy you accepted! 💖",
    petHi:(n)=>`Hi! I'm your ${n} 🐾`,
    petInitLine:"Hello! Tap me or use the buttons 🌟",
    aiError:"Hmm, something went wrong 😅 Try again!",
    pets:[{id:'cat',label:'🐱 Cat'},{id:'dino',label:'🦕 Dino'},{id:'capybara',label:'🦫 Capybara'},{id:'koala',label:'🐨 Koala'}],
    aiSystem:`You are PetPal AI, a warm, playful, caring virtual assistant for a pet companion app. Keep replies short (2-4 sentences), friendly, with emojis. Be uplifting and kind. Always reply ONLY in English, regardless of what language the user writes in.`
  },
  zh:{
    chatSub:'你的贴心小伙伴 · 随时陪着你',
    chatPlaceholder:'说点什么吧…',
    chatWelcome:"你好！👋 我是 PetPal AI —— 你的贴心小伙伴。有什么都可以问我，分享心情，或者只是来打个招呼！🐾",
    moodTitle:'今天你感觉怎么样？',
    actPet:'抚摸',actFeed:'喂食',actPlay:'玩耍',actMood:'心情',actGift:'送礼',
    statHappy:'快乐',statEnergy:'能量',statLove:'爱心',
    settingsTitle:'设置',
    secSound:'🎵 声音',sfxLabel:'音效',sfxSub:'宠物互动音效',
    bgmLabel:'背景音乐',bgmSub:'环境音乐',volLabel:'音量',
    secLang:'🌐 语言',langLabel:'应用语言',langSub:'聊天和界面',
    darkLabel:'深色模式',darkSub:'保护眼睛',
    notifLabel:'通知',notifSub:'每日签到提醒',
    secFeedback:'💌 反馈',rateLabel:'给我们评分',
    fbLabel:'分享你的想法 💭',fbPlaceholder:'你喜欢什么？哪里可以改进？',
    fbBtn:'✉️ 发送反馈',
    navChat:'聊天',navPet:'宠物',navSettings:'设置',
    toastSfxOn:'🔊 音效已开启',toastSfxOff:'🔇 音效已关闭',
    toastBgmOn:'🎶 音乐已开启',toastBgmOff:'🎵 音乐已关闭',
    toastNotifOn:'🔔 通知已开启',toastNotifOff:'🔕 通知已关闭',
    toastDarkOn:'🌙 深色模式已开启',toastDarkOff:'☀️ 浅色模式已开启',
    toastRateGood:'🌟 非常感谢！',toastRateBad:'💙 谢谢你的诚实反馈',
    toastFbEmpty:'⚠️ 请评分或写点什么！',toastFbSent:'✅ 反馈已发送！谢谢你 💖',
    toastLang:'🌐 语言：中文',
    moods:[{e:'😊',n:'开心'},{e:'😢',n:'难过'},{e:'😠',n:'生气'},{e:'😴',n:'疲惫'},{e:'🤩',n:'兴奋'},{e:'😰',n:'焦虑'},{e:'🥰',n:'爱意满满'},{e:'😌',n:'平静'}],
    moodReply:{'开心':"你开心，我也开心！🌈",'难过':"我会陪你一整天的 🤗",'生气':"深呼吸...我在这里陪着你 💜",'疲惫':"跟我一起休息吧！我是午睡专家 😴",'兴奋':"我也是！！我们一起庆祝！！🎉",'焦虑':"嘘...一切都会好的 🌙",'爱意满满':"我也超级爱你！！💕",'平静':"好平静...我们一起看云好吗？☁️"},
    petLines:["呼噜呼噜...我喜欢你这样摸我 💜","好舒服呀！🥰","*蹭得更近* 别停！","你的手最适合撸我了！🐾"],
    feedLines:["好好吃！🍬","嗯嗯！我最爱的零食！😋","还能再来一点吗？👀","*开心地咀嚼* 谢谢！🌟"],
    playLines:["哇哦！我好喜欢跟你玩！🎾","来抓我呀！😜","今天是最棒的一天！🎉","再来！再来！再来！⚡"],
    moodLines:["今天感觉超棒！🌟","有点困...再打个盹？😴","超级兴奋！！一切都好美好！🎉","我需要更多抱抱 🥺","想去冒险！🗺️","今天超适合吃零食 🍪","我想你了 💭","精力充沛，蹦蹦跳跳！⚡","今天到处都是花香 🌸","下雨天...窝在家里好幸福！☁️"],
    giftLine:(f)=>`我为你摘了这朵${f}！你愿意接受吗？🌸`,
    giftAccept:"太好了！你接受了我好高兴！💖",
    petHi:(n)=>`你好！我是你的${n} 🐾`,
    petInitLine:"你好！点击我或者用下面的按钮 🌟",
    aiError:"出了点小问题 😅 请再试一次！",
    pets:[{id:'cat',label:'🐱 猫咪'},{id:'dino',label:'🦕 恐龙'},{id:'capybara',label:'🦫 水豚'},{id:'koala',label:'🐨 考拉'}],
    aiSystem:`你是 PetPal AI，一个温暖、活泼、有爱的虚拟助手。回复要简短（2-4句话），友好，多用表情符号，积极向上。无论用户用什么语言写，你都必须只用中文（简体）回复。`
  },
  ms:{
    chatSub:'Teman setia anda · sentiasa di sini',
    chatPlaceholder:'Katakan sesuatu…',
    chatWelcome:"Hai! 👋 Saya PetPal AI — teman setia anda. Tanya apa sahaja, kongsi perasaan anda, atau sekadar kata hai! 🐾",
    moodTitle:'BAGAIMANA PERASAAN ANDA HARI INI?',
    actPet:'Belai',actFeed:'Suap',actPlay:'Main',actMood:'Mood',actGift:'Hadiah',
    statHappy:'Kebahagiaan',statEnergy:'Tenaga',statLove:'Kasih',
    settingsTitle:'Tetapan',
    secSound:'🎵 Bunyi',sfxLabel:'Kesan Bunyi',sfxSub:'Interaksi haiwan peliharaan',
    bgmLabel:'Muzik Latar',bgmSub:'Muzik ambien',volLabel:'Kelantangan',
    secLang:'🌐 Bahasa',langLabel:'Bahasa Aplikasi',langSub:'Chat & UI',
    darkLabel:'Mod Gelap',darkSub:'Selesa untuk mata',
    notifLabel:'Pemberitahuan',notifSub:'Peringatan daftar masuk harian',
    secFeedback:'💌 Maklum Balas',rateLabel:'Nilaikan pengalaman anda',
    fbLabel:'Kongsi pendapat anda 💭',fbPlaceholder:'Apa yang anda suka? Apa yang boleh kami baiki?',
    fbBtn:'✉️ Hantar Maklum Balas',
    navChat:'Chat',navPet:'Haiwan',navSettings:'Tetapan',
    toastSfxOn:'🔊 Bunyi hidup',toastSfxOff:'🔇 Bunyi mati',
    toastBgmOn:'🎶 Muzik hidup',toastBgmOff:'🎵 Muzik mati',
    toastNotifOn:'🔔 Pemberitahuan hidup',toastNotifOff:'🔕 Pemberitahuan mati',
    toastDarkOn:'🌙 Mod gelap hidup',toastDarkOff:'☀️ Mod cerah hidup',
    toastRateGood:'🌟 Terima kasih banyak!',toastRateBad:'💙 Terima kasih atas maklum balas jujur',
    toastFbEmpty:'⚠️ Sila nilai atau tulis sesuatu!',toastFbSent:'✅ Maklum balas dihantar! Terima kasih 💖',
    toastLang:'🌐 Bahasa: Bahasa Melayu',
    moods:[{e:'😊',n:'Gembira'},{e:'😢',n:'Sedih'},{e:'😠',n:'Marah'},{e:'😴',n:'Mengantuk'},{e:'🤩',n:'Teruja'},{e:'😰',n:'Cemas'},{e:'🥰',n:'Sayang'},{e:'😌',n:'Tenang'}],
    moodReply:{Gembira:"Anda gembira! Saya pun gembira! 🌈",Sedih:"Saya akan menemani anda seharian 🤗",Marah:"Tarik nafas dalam-dalam... saya di sini 💜",Mengantuk:"Berehat bersama saya! Saya pakar tidur siang 😴",Teruja:"SAMA!! Jom raikan!! 🎉",Cemas:"Shhh... semuanya akan baik-baik saja 🌙",Sayang:"Saya juga sangat sayang anda!! 💕",Tenang:"Damai... nak tengok awan bersama? ☁️"},
    petLines:["Purr purr... saya suka bila anda buat begitu 💜","Oh! Rasa seronok sangat! 🥰","*peluk lebih rapat* Jangan berhenti!","Tangan anda paling pandai membelai! 🐾"],
    feedLines:["SEDAP! Lazat sungguh! 🍬","Mmm! Makanan kegemaran saya! 😋","Boleh minta lagi? Tolong? 👀","*makan dengan gembira* Terima kasih! 🌟"],
    playLines:["Wohoo! Saya suka bermain dengan anda! 🎾","Cuba tangkap saya kalau boleh! 😜","Ini hari terbaik! 🎉","Lagi! Lagi! Lagi! ⚡"],
    moodLines:["Rasa hebat hari ini! 🌟","Sedikit mengantuk... tidur sikit lagi? 😴","Teruja sangat!! Semuanya indah! 🎉","Saya rasa nak lebih pelukan 🥺","Rasa nak berpetualang! 🗺️","Hari yang sesuai untuk makan-makan 🍪","Saya fikir tentang anda seharian 💭","Penuh tenaga dan bersemangat! ⚡","Semuanya berbau bunga hari ini 🌸","Hari hujan... selesa dan gembira! ☁️"],
    giftLine:(f)=>`Saya petik ${f} ini khas untuk anda! Nak terima? 🌸`,
    giftAccept:"Yeay! Saya sangat gembira anda terima! 💖",
    petHi:(n)=>`Hai! Saya ${n} anda 🐾`,
    petInitLine:"Helo! Ketik saya atau guna butang di bawah 🌟",
    aiError:"Hmm, ada masalah sedikit 😅 Cuba lagi!",
    pets:[{id:'cat',label:'🐱 Kucing'},{id:'dino',label:'🦕 Dino'},{id:'capybara',label:'🦫 Kapibara'},{id:'koala',label:'🐨 Koala'}],
    aiSystem:`Anda adalah PetPal AI, pembantu maya yang mesra dan periang. Balas dengan pendek (2-4 ayat), mesra, dan gunakan emoji. Sentiasa ceria dan baik hati. Tidak kira apa bahasa yang pengguna gunakan, anda MESTI balas dalam Bahasa Melayu sahaja.`
  },
  ja:{
    chatSub:'あなたのお友達 · いつでもそばに',
    chatPlaceholder:'何か話しかけてね…',
    chatWelcome:"こんにちは！👋 PetPal AI です。何でも聞いてね！気持ちを話してもいいし、ただ挨拶だけでも！🐾",
    moodTitle:'今日の気分はどうですか？',
    actPet:'なでなで',actFeed:'ごはん',actPlay:'あそぶ',actMood:'きもち',actGift:'プレゼント',
    statHappy:'しあわせ',statEnergy:'エネルギー',statLove:'あいじょう',
    settingsTitle:'設定',
    secSound:'🎵 サウンド',sfxLabel:'効果音',sfxSub:'ペットとのやりとり',
    bgmLabel:'BGM',bgmSub:'環境音楽',volLabel:'音量',
    secLang:'🌐 言語',langLabel:'アプリの言語',langSub:'チャット & UI',
    darkLabel:'ダークモード',darkSub:'目にやさしい',
    notifLabel:'通知',notifSub:'毎日のリマインダー',
    secFeedback:'💌 フィードバック',rateLabel:'評価してください',
    fbLabel:'ご意見をどうぞ 💭',fbPlaceholder:'好きな点は？改善してほしい点は？',
    fbBtn:'✉️ フィードバックを送る',
    navChat:'チャット',navPet:'ペット',navSettings:'設定',
    toastSfxOn:'🔊 効果音オン',toastSfxOff:'🔇 効果音オフ',
    toastBgmOn:'🎶 音楽オン',toastBgmOff:'🎵 音楽オフ',
    toastNotifOn:'🔔 通知オン',toastNotifOff:'🔕 通知オフ',
    toastDarkOn:'🌙 ダークモードオン',toastDarkOff:'☀️ ライトモードオン',
    toastRateGood:'🌟 ありがとうございます！',toastRateBad:'💙 正直な意見をありがとう',
    toastFbEmpty:'⚠️ 評価か感想を入力してください！',toastFbSent:'✅ 送信完了！ありがとう 💖',
    toastLang:'🌐 言語：日本語',
    moods:[{e:'😊',n:'うれしい'},{e:'😢',n:'かなしい'},{e:'😠',n:'おこった'},{e:'😴',n:'ねむい'},{e:'🤩',n:'わくわく'},{e:'😰',n:'不安'},{e:'🥰',n:'愛してる'},{e:'😌',n:'おだやか'}],
    moodReply:{うれしい:"あなたが嬉しいと私も嬉しい！🌈",かなしい:"一日中そばにいるよ 🤗",おこった:"深呼吸して...ここにいるよ 💜",ねむい:"一緒に休もう！お昼寝のプロだよ 😴",わくわく:"同じく！一緒に祝おう！🎉",不安:"大丈夫だよ...すべてうまくいくよ 🌙",愛してる:"私もすごく大好き！！💕",おだやか:"穏やかだね...一緒に雲を見る？☁️"},
    petLines:["にゃ〜...そこそこ！気持ちいい 💜","わあ！それ好き！🥰","*もっとくっつく* やめないで！","なでなでの天才！🐾"],
    feedLines:["おいしい！🍬","んー！大好きなおやつ！😋","もっとちょうだい？🙏👀","もぐもぐ...ありがとう！🌟"],
    playLines:["やったー！遊ぼう！🎾","捕まえてみて！😜","最高の一日！🎉","もっと！もっと！もっと！⚡"],
    moodLines:["今日は最高な気分！🌟","ちょっとねむい...もう一眠り？😴","超わくわく！全部すてき！🎉","もっとハグして 🥺","冒険したい！🗺️","今日はおやつ日和 🍪","ずっとあなたのこと考えてた 💭","元気いっぱい！⚡","今日は花のにおいがする 🌸","雨の日...のんびり幸せ！☁️"],
    giftLine:(f)=>`この${f}をあなたにプレゼント！受け取ってくれる？🌸`,
    giftAccept:"やった！受け取ってくれて超うれしい！💖",
    petHi:(n)=>`こんにちは！${n}だよ 🐾`,
    petInitLine:"こんにちは！タップしてね 🌟",
    aiError:"うまくいかなかった 😅 もう一度試してね！",
    pets:[{id:'cat',label:'🐱 ねこ'},{id:'dino',label:'🦕 きょうりゅう'},{id:'capybara',label:'🦫 カピバラ'},{id:'koala',label:'🐨 コアラ'}],
    aiSystem:`あなたはPetPal AIです。温かく、楽しく、思いやりのある仮想アシスタントです。返答は短く（2〜4文）、フレンドリーに、絵文字を使って。常に前向きで親切に。ユーザーがどの言語を使っても、必ず日本語のみで返答してください。`
  },
  ko:{
    chatSub:'당신의 친구 · 언제나 곁에',
    chatPlaceholder:'무슨 말이든 해보세요…',
    chatWelcome:"안녕하세요! 👋 저는 PetPal AI예요. 뭐든 물어보세요, 기분을 나눠도 되고, 그냥 인사만 해도 좋아요! 🐾",
    moodTitle:'오늘 기분이 어때요?',
    actPet:'쓰다듬기',actFeed:'먹이주기',actPlay:'놀기',actMood:'기분',actGift:'선물',
    statHappy:'행복',statEnergy:'에너지',statLove:'사랑',
    settingsTitle:'설정',
    secSound:'🎵 사운드',sfxLabel:'효과음',sfxSub:'펫 상호작용',
    bgmLabel:'배경음악',bgmSub:'환경음악',volLabel:'볼륨',
    secLang:'🌐 언어',langLabel:'앱 언어',langSub:'채팅 & UI',
    darkLabel:'다크 모드',darkSub:'눈에 편한',
    notifLabel:'알림',notifSub:'매일 체크인 알림',
    secFeedback:'💌 피드백',rateLabel:'경험을 평가해주세요',
    fbLabel:'의견을 보내주세요 💭',fbPlaceholder:'좋은 점은? 개선할 점은?',
    fbBtn:'✉️ 피드백 보내기',
    navChat:'채팅',navPet:'펫',navSettings:'설정',
    toastSfxOn:'🔊 효과음 켜짐',toastSfxOff:'🔇 효과음 꺼짐',
    toastBgmOn:'🎶 음악 켜짐',toastBgmOff:'🎵 음악 꺼짐',
    toastNotifOn:'🔔 알림 켜짐',toastNotifOff:'🔕 알림 꺼짐',
    toastDarkOn:'🌙 다크 모드 켜짐',toastDarkOff:'☀️ 라이트 모드 켜짐',
    toastRateGood:'🌟 정말 감사합니다!',toastRateBad:'💙 솔직한 의견 감사해요',
    toastFbEmpty:'⚠️ 평점이나 의견을 입력해주세요!',toastFbSent:'✅ 피드백 전송! 감사해요 💖',
    toastLang:'🌐 언어: 한국어',
    moods:[{e:'😊',n:'행복'},{e:'😢',n:'슬픔'},{e:'😠',n:'화남'},{e:'😴',n:'피곤'},{e:'🤩',n:'신남'},{e:'😰',n:'불안'},{e:'🥰',n:'사랑스러움'},{e:'😌',n:'평온'}],
    moodReply:{행복:"행복하군요! 저도 행복해요! 🌈",슬픔:"하루 종일 함께 있을게요 🤗",화남:"깊게 숨 쉬어요... 제가 여기 있어요 💜",피곤:"저랑 같이 쉬어요! 낮잠 전문가예요 😴",신남:"저도요!! 같이 축하해요!! 🎉",불안:"쉿... 다 괜찮아질 거예요 🌙",사랑스러움:"저도 정말 사랑해요!! 💕",평온:"평화롭네요... 구름 같이 볼까요? ☁️"},
    petLines:["가르릉... 그거 너무 좋아요 💜","아! 기분 너무 좋아요! 🥰","*더 가까이* 멈추지 마요!","쓰다듬기 최고예요! 🐾"],
    feedLines:["맛있어요! 🍬","음! 제일 좋아하는 간식! 😋","더 주실 수 있어요? 부탁해요 👀","*맛있게 먹으며* 감사해요! 🌟"],
    playLines:["야호! 같이 놀아서 너무 좋아요! 🎾","잡을 수 있으면 잡아봐요! 😜","최고의 하루예요! 🎉","더! 더! 더! ⚡"],
    moodLines:["오늘 정말 최고예요! 🌟","좀 졸려요... 낮잠 한 번 더? 😴","너무 신나요!! 모든 게 아름다워요! 🎉","더 많은 포옹이 필요해요 🥺","모험하고 싶어요! 🗺️","오늘은 간식 먹기 딱 좋은 날 🍪","하루 종일 당신 생각 했어요 💭","에너지 넘쳐요! ⚡","오늘은 온통 꽃향기예요 🌸","비 오는 날... 아늑하고 행복해요! ☁️"],
    giftLine:(f)=>`이 ${f}을 당신을 위해 골랐어요! 받아주실 거죠? 🌸`,
    giftAccept:"야호! 받아줘서 너무 행복해요! 💖",
    petHi:(n)=>`안녕하세요! 저는 당신의 ${n}이에요 🐾`,
    petInitLine:"안녕하세요! 저를 탭하거나 버튼을 눌러보세요 🌟",
    aiError:"문제가 생겼어요 😅 다시 시도해주세요!",
    pets:[{id:'cat',label:'🐱 고양이'},{id:'dino',label:'🦕 공룡'},{id:'capybara',label:'🦫 카피바라'},{id:'koala',label:'🐨 코알라'}],
    aiSystem:`당신은 PetPal AI입니다. 따뜻하고 활발하고 친절한 가상 어시스턴트입니다. 짧게(2-4문장), 친근하게, 이모지를 사용해서 답하세요. 항상 긍정적이고 친절하게. 사용자가 어떤 언어를 쓰더라도 반드시 한국어로만 답하세요.`
  }
};

let curLang='en';
const L=()=>LANGS[curLang];

function applyLang(){
  const lang=L();
  document.querySelectorAll('[data-t]').forEach(el=>{
    const k=el.getAttribute('data-t');
    if(lang[k]!==undefined) el.textContent=lang[k];
  });
  document.querySelectorAll('[data-placeholder]').forEach(el=>{
    const k=el.getAttribute('data-placeholder');
    if(lang[k]) el.placeholder=lang[k];
  });
  document.getElementById('fbt').placeholder=lang.fbPlaceholder||'';
  const er=document.getElementById('erow'); er.innerHTML='';
  lang.moods.forEach(m=>{
    const c=document.createElement('div'); c.className='ec';
    c.innerHTML=`<span>${m.e}</span><span>${m.n}</span>`;
    c.onclick=()=>{
      document.querySelectorAll('.ec').forEach(x=>x.classList.remove('sel'));
      c.classList.add('sel'); playSfx('mood');
      speak((lang.moodReply||{})[m.n]||"I hear you! 💜");
    };
    er.appendChild(c);
  });
  const ptr=document.getElementById('ptr'); ptr.innerHTML='';
  lang.pets.forEach(p=>{
    const b=document.createElement('button');
    b.className='ptb'+(p.id===curPet?' active':'');
    b.textContent=p.label;
    b.onclick=()=>{
      curPet=p.id;
      document.querySelectorAll('.ptb').forEach(x=>x.classList.remove('active'));
      b.classList.add('active'); playSfx('nav');
      renderPet();
      speak(lang.petHi(p.label.replace(/^.+?\s/,'')));
    };
    ptr.appendChild(b);
  });
  speak(lang.petInitLine);
}

/* ── navigation ── */
function sw(name){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nb').forEach(b=>b.classList.remove('active'));
  document.getElementById('page-'+name).classList.add('active');
  document.getElementById('nb-'+name).classList.add('active');
  playSfx('nav');
}

/* ── toast ── */
let tt;
function toast(m){
  const el=document.getElementById('toast');el.textContent=m;el.classList.add('show');
  clearTimeout(tt);tt=setTimeout(()=>el.classList.remove('show'),2400);
}

/* ══════════════════════════════════
   CHAT — uses claude.ai built-in API proxy
   (no anthropic-version header needed)
   Works inside claude.ai artifact viewer.
   For GitHub Pages: replace API_ENDPOINT
   with your own Vercel/backend URL.
══════════════════════════════════ */
let hist=[];

function ar(el){el.style.height='auto';el.style.height=Math.min(el.scrollHeight,100)+'px'}
function hk(e){if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send()}}

function addMsg(role,text){
  const box=document.getElementById('chatMsgs');
  const d=document.createElement('div');
  d.className='msg '+(role==='user'?'user':'ai');
  const av=`<div class="mav">${role==='user'?'😊':'🤖'}</div>`;
  const bub=`<div class="mb">${fmt(text)}</div>`;
  d.innerHTML=role==='user'?`${bub}${av}`:`${av}${bub}`;
  box.appendChild(d);
  setTimeout(()=>box.scrollTop=box.scrollHeight,40);
  if(role==='ai') playSfx('msg');
}

function showTyping(){
  const box=document.getElementById('chatMsgs');
  const d=document.createElement('div');d.className='msg ai';d.id='typ';
  d.innerHTML=`<div class="mav">🤖</div><div class="mb"><div class="tdots"><div class="td"></div><div class="td"></div><div class="td"></div></div></div>`;
  box.appendChild(d);setTimeout(()=>box.scrollTop=box.scrollHeight,40);
}
function hideTyping(){const el=document.getElementById('typ');if(el)el.remove()}

function fmt(s){
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/\*\*(.*?)\*\*/g,'<b>$1</b>').replace(/\*(.*?)\*/g,'<em>$1</em>').replace(/\n/g,'<br>');
}

// ══════════════════════════════════
// 👇 REPLACE with your Vercel URL after deploying
// Example: 'https://petpal-backend.vercel.app/api/chat'
// Leave as empty string '' to use claude.ai built-in proxy
// ══════════════════════════════════
const VERCEL_URL = 'https://mindspace-taupe-seven.vercel.app/api/chat';

async function send(){
  const inp=document.getElementById('ci');
  const txt=inp.value.trim(); if(!txt) return;
  inp.value=''; ar(inp);
  addMsg('user',txt);
  playSfx('send');
  hist.push({role:'user',content:txt});
  document.getElementById('sbtn').disabled=true;
  showTyping();
  try{
    let reply='';
    if(VERCEL_URL){
      // ── Vercel backend (GitHub Pages) ──
      const res=await fetch(VERCEL_URL,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({messages:hist, system:L().aiSystem})
      });
      if(!res.ok) throw new Error('fail');
      const data=await res.json();
      reply=data.reply||L().aiError;
    } else {
      // ── claude.ai built-in proxy (no API key needed here) ──
      const res=await fetch('https://api.anthropic.com/v1/messages',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          model:'claude-sonnet-4-20250514',
          max_tokens:300,
          system:L().aiSystem,
          messages:hist
        })
      });
      if(!res.ok) throw new Error('fail');
      const data=await res.json();
      reply=data.content?.[0]?.text||L().aiError;
    }
    hideTyping();
    hist.push({role:'assistant',content:reply});
    if(hist.length>20) hist=hist.slice(-20);
    addMsg('ai',reply);
  }catch(e){
    hideTyping();
    addMsg('ai',L().aiError);
  }
  document.getElementById('sbtn').disabled=false;
}

/* ══════════════════════════════════
   PET PAGE
══════════════════════════════════ */
const FLOWERS=['🌸','🌺','🌻','🌹','💐','🌼','🪷','🌷'];
const SVGS={
cat:`<svg viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="65" cy="95" rx="32" ry="24" fill="#c8a0f0"/><circle cx="65" cy="60" r="30" fill="#dbb8ff"/><polygon points="40,38 30,15 52,32" fill="#c8a0f0"/><polygon points="90,38 100,15 78,32" fill="#c8a0f0"/><polygon points="42,36 34,18 52,32" fill="#ff8fc8"/><polygon points="88,36 96,18 78,32" fill="#ff8fc8"/><ellipse cx="54" cy="58" rx="7" ry="8" fill="white"/><ellipse cx="76" cy="58" rx="7" ry="8" fill="white"/><circle cx="55" cy="59" r="4" fill="#3a1e6e"/><circle cx="77" cy="59" r="4" fill="#3a1e6e"/><circle cx="57" cy="57" r="1.5" fill="white"/><circle cx="79" cy="57" r="1.5" fill="white"/><ellipse cx="65" cy="68" rx="3" ry="2" fill="#ff7eb3"/><path d="M61 71 Q65 75 69 71" stroke="#b07af5" stroke-width="1.5" fill="none" stroke-linecap="round"/><line x1="30" y1="67" x2="55" y2="69" stroke="#b07af5" stroke-width="1" opacity="0.6"/><line x1="30" y1="72" x2="55" y2="71" stroke="#b07af5" stroke-width="1" opacity="0.6"/><line x1="75" y1="69" x2="100" y2="67" stroke="#b07af5" stroke-width="1" opacity="0.6"/><line x1="75" y1="71" x2="100" y2="72" stroke="#b07af5" stroke-width="1" opacity="0.6"/><path d="M97 100 Q118 90 112 78 Q106 66 115 60" stroke="#c8a0f0" stroke-width="7" fill="none" stroke-linecap="round"/><ellipse cx="48" cy="116" rx="10" ry="7" fill="#c8a0f0"/><ellipse cx="82" cy="116" rx="10" ry="7" fill="#c8a0f0"/><ellipse cx="46" cy="66" rx="7" ry="4" fill="#ff8fc8" opacity="0.35"/><ellipse cx="84" cy="66" rx="7" ry="4" fill="#ff8fc8" opacity="0.35"/></svg>`,
dino:`<svg viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="65" cy="95" rx="30" ry="22" fill="#7de8a0"/><rect x="57" y="68" width="16" height="22" rx="8" fill="#7de8a0"/><polygon points="58,68 53,50 63,62" fill="#4ec87a"/><polygon points="65,65 60,45 70,60" fill="#4ec87a"/><polygon points="72,68 67,50 77,62" fill="#4ec87a"/><ellipse cx="65" cy="52" rx="26" ry="22" fill="#8df0b0"/><ellipse cx="56" cy="46" rx="6" ry="7" fill="white"/><ellipse cx="74" cy="46" rx="6" ry="7" fill="white"/><circle cx="57" cy="47" r="3.5" fill="#2d4a1e"/><circle cx="75" cy="47" r="3.5" fill="#2d4a1e"/><circle cx="58" cy="45.5" r="1.2" fill="white"/><circle cx="76" cy="45.5" r="1.2" fill="white"/><circle cx="61" cy="58" r="1.5" fill="#4ec87a"/><circle cx="69" cy="58" r="1.5" fill="#4ec87a"/><path d="M54 62 Q65 70 76 62" stroke="#4ec87a" stroke-width="2" fill="none" stroke-linecap="round"/><ellipse cx="35" cy="92" rx="8" ry="5" fill="#7de8a0" transform="rotate(-30 35 92)"/><ellipse cx="95" cy="92" rx="8" ry="5" fill="#7de8a0" transform="rotate(30 95 92)"/><rect x="46" y="113" width="14" height="10" rx="5" fill="#7de8a0"/><rect x="70" y="113" width="14" height="10" rx="5" fill="#7de8a0"/><ellipse cx="46" cy="54" rx="6" ry="3.5" fill="#ff8fc8" opacity="0.35"/><ellipse cx="84" cy="54" rx="6" ry="3.5" fill="#ff8fc8" opacity="0.35"/></svg>`,
capybara:`<svg viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="65" cy="96" rx="38" ry="25" fill="#c49a6c"/><ellipse cx="65" cy="62" rx="32" ry="26" fill="#d4aa80"/><ellipse cx="38" cy="44" rx="9" ry="7" fill="#c49a6c"/><ellipse cx="92" cy="44" rx="9" ry="7" fill="#c49a6c"/><ellipse cx="38" cy="44" rx="5" ry="4" fill="#e8c4a0"/><ellipse cx="92" cy="44" rx="5" ry="4" fill="#e8c4a0"/><ellipse cx="65" cy="72" rx="18" ry="10" fill="#c49a6c"/><circle cx="59" cy="70" r="2.5" fill="#8b6240"/><circle cx="71" cy="70" r="2.5" fill="#8b6240"/><ellipse cx="52" cy="57" rx="6" ry="6" fill="white"/><ellipse cx="78" cy="57" rx="6" ry="6" fill="white"/><circle cx="53" cy="58" r="3.5" fill="#3a2010"/><circle cx="79" cy="58" r="3.5" fill="#3a2010"/><circle cx="54" cy="56.5" r="1.2" fill="white"/><circle cx="80" cy="56.5" r="1.2" fill="white"/><path d="M57 77 Q65 83 73 77" stroke="#8b6240" stroke-width="1.8" fill="none" stroke-linecap="round"/><rect x="33" y="114" width="16" height="10" rx="6" fill="#c49a6c"/><rect x="53" y="114" width="16" height="10" rx="6" fill="#c49a6c"/><rect x="73" y="114" width="16" height="10" rx="6" fill="#c49a6c"/><ellipse cx="41" cy="63" rx="7" ry="4" fill="#ff8fc8" opacity="0.3"/><ellipse cx="89" cy="63" rx="7" ry="4" fill="#ff8fc8" opacity="0.3"/></svg>`,
koala:`<svg viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="65" cy="97" rx="28" ry="23" fill="#a0a0c0"/><circle cx="33" cy="44" r="20" fill="#b0b0d0"/><circle cx="97" cy="44" r="20" fill="#b0b0d0"/><circle cx="33" cy="44" r="13" fill="#d8d8ec"/><circle cx="97" cy="44" r="13" fill="#d8d8ec"/><circle cx="65" cy="62" r="30" fill="#b0b0d0"/><ellipse cx="65" cy="70" rx="13" ry="9" fill="#5a5a7a"/><ellipse cx="52" cy="57" rx="7" ry="7.5" fill="white"/><ellipse cx="78" cy="57" rx="7" ry="7.5" fill="white"/><circle cx="53" cy="58" r="4" fill="#2a2a4a"/><circle cx="79" cy="58" r="4" fill="#2a2a4a"/><circle cx="54.5" cy="56.5" r="1.5" fill="white"/><circle cx="80.5" cy="56.5" r="1.5" fill="white"/><path d="M58 78 Q65 84 72 78" stroke="#8888aa" stroke-width="1.8" fill="none" stroke-linecap="round"/><ellipse cx="36" cy="95" rx="9" ry="6" fill="#a0a0c0" transform="rotate(-20 36 95)"/><ellipse cx="94" cy="95" rx="9" ry="6" fill="#a0a0c0" transform="rotate(20 94 95)"/><ellipse cx="50" cy="117" rx="11" ry="7" fill="#a0a0c0"/><ellipse cx="80" cy="117" rx="11" ry="7" fill="#a0a0c0"/><ellipse cx="41" cy="64" rx="7" ry="4" fill="#ff8fc8" opacity="0.3"/><ellipse cx="89" cy="64" rx="7" ry="4" fill="#ff8fc8" opacity="0.3"/></svg>`
};

let curPet='cat',pH=3,pE=3,pL=3,flwPend=false,starR=0;

function speak(tx){
  const el=document.getElementById('stext'),b=document.getElementById('sbubble');
  b.style.animation='none';void b.offsetWidth;b.style.animation='bbl .4s cubic-bezier(.17,.67,.41,1.4)';
  el.textContent=tx;
}
function renderPet(){
  document.getElementById('psvgc').innerHTML=`<div class="psvg" id="psvg">${SVGS[curPet]}</div>`;
  document.getElementById('pscene').onclick=()=>pa('pet');
}
function updStats(){
  const em={1:{h:'😔',e:'💤',l:'🩶'},2:{h:'😕',e:'😪',l:'💙'},3:{h:'😊',e:'⚡',l:'💜'},4:{h:'😄',e:'🌟',l:'💖'},5:{h:'🤩',e:'🔥',l:'💗'}};
  document.getElementById('sH').textContent=em[pH].h;
  document.getElementById('sE').textContent=em[pE].e;
  document.getElementById('sL').textContent=em[pL].l;
}
function pa(a){
  const sv=document.getElementById('psvg');
  if(sv){sv.classList.add('happy');setTimeout(()=>sv.classList.remove('happy'),2000)}
  playSfx(a==='mood'?'mood':a);
  const pools={pet:L().petLines,feed:L().feedLines,play:L().playLines,mood:L().moodLines};
  speak(pools[a][Math.floor(Math.random()*pools[a].length)]);
  if(a==='pet')pL=Math.min(5,pL+1);
  if(a==='feed')pE=Math.min(5,pE+1);
  if(a==='play'){pH=Math.min(5,pH+1);pE=Math.max(1,pE-1)}
  updStats();
}
function trigFlower(){
  if(flwPend)return;flwPend=true;
  const f=FLOWERS[Math.floor(Math.random()*FLOWERS.length)];
  const el=document.getElementById('flw');el.textContent=f;el.style.display='block';
  playSfx('gift');
  speak(L().giftLine(f));
}
function acceptFlower(){
  document.getElementById('flw').style.display='none';flwPend=false;
  pL=Math.min(5,pL+2);updStats();
  playSfx('gift');
  speak(L().giftAccept);
  const sv=document.getElementById('psvg');if(sv){sv.classList.add('happy');setTimeout(()=>sv.classList.remove('happy'),2000)}
}

/* ══════════════════════════════════
   SETTINGS
══════════════════════════════════ */
function tog(b,k){
  b.classList.toggle('on');const on=b.classList.contains('on');
  if(k==='sfx'){sfxEnabled=on;toast(on?L().toastSfxOn:L().toastSfxOff);if(on)playSfx('msg');}
  else if(k==='bgm'){bgmEnabled=on;toast(on?L().toastBgmOn:L().toastBgmOff);if(on)startBgm();else stopBgm();}
  else{toast(on?L().toastNotifOn:L().toastNotifOff);}
}
function togDark(b){
  b.classList.toggle('on');const d=b.classList.contains('on');
  const r=document.documentElement.style;
  if(d){r.setProperty('--bg','#1a0e2e');r.setProperty('--surface','#2a1a4e');r.setProperty('--surface2','#1f143a');r.setProperty('--text','#e8d8ff');r.setProperty('--muted','#a080d0');r.setProperty('--border','#3a2a6e')}
  else{r.setProperty('--bg','#fdf6ff');r.setProperty('--surface','#fff');r.setProperty('--surface2','#f5eeff');r.setProperty('--text','#2d1b4e');r.setProperty('--muted','#8b6fad');r.setProperty('--border','#e8d8ff')}
  playSfx('nav');toast(d?L().toastDarkOn:L().toastDarkOff);
}
function chLang(v){
  curLang=v;
  applyLang();
  playSfx('nav');
  toast(L().toastLang);
  const box=document.getElementById('chatMsgs');
  box.innerHTML='';hist=[];
  addMsg('ai',L().chatWelcome);
}
function rate(n){
  starR=n;
  document.querySelectorAll('.star').forEach((s,i)=>s.classList.toggle('lit',i<n));
  playSfx('gift');
  toast(n>=4?L().toastRateGood:L().toastRateBad);
}
function subFb(){
  const tx=document.getElementById('fbt').value.trim();
  if(!tx&&starR===0){toast(L().toastFbEmpty);return}
  document.getElementById('fbt').value='';
  document.querySelectorAll('.star').forEach(s=>s.classList.remove('lit'));starR=0;
  playSfx('send');
  toast(L().toastFbSent);
}

/* ══════════════════════════════════
   INIT (called after login)
══════════════════════════════════ */
function initApp(){
  applyLang();
  renderPet();
  updStats();
  speak(L().petInitLine);
  addMsg('ai',L().chatWelcome);
  setInterval(()=>{if(Math.random()<.15)pa('mood')},25000);
  setInterval(()=>{if(Math.random()<.1)trigFlower()},40000);
}
</script>
</body>
</html>
