<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>Mental Care ✨</title>
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
      <h2>Mental Care AI</h2>
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
    <div class="vt">Mental Care v2.0.0 · Made with 💜</div>
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
    chatWelcome:"Hi there! 👋 I'm Mental Care AI — your friendly companion. Ask me anything, share how you're feeling, or just say hi! 🐾",
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
    chatWelcome:"你好！👋 我是 Mental Care AI —— 你的贴心小伙伴。有什么都可以问我，分享心情，或者只是来打个招呼！🐾",
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
    chatWelcome:"Hai! 👋 Saya Mental Care AI — teman setia anda. Tanya apa sahaja, kongsi perasaan anda, atau sekadar kata hai! 🐾",
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
    chatWelcome:"こんにちは！👋 Mental Care AI です。何でも聞いてね！気持ちを話してもいいし、ただ挨拶だけでも！🐾",
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
    chatWelcome:"안녕하세요! 👋 저는 Mental Care AI예요. 뭐든 물어보세요, 기분을 나눠도 되고, 그냥 인사만 해도 좋아요! 🐾",
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
<script>
/* ══════════════════════════════════════════════════════════════
   PetPal Local AI — Keyword Reply Engine
   Drop-in replacement for the Gemini / Anthropic API call.

   HOW TO USE:
   In your HTML, replace the send() fetch logic with:

     const reply = localAIReply(txt, curLang);
     hideTyping();
     hist.push({ role: 'assistant', content: reply });
     addMsg('ai', reply);

   No API key, no network call needed.
══════════════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────────
   SECTION 1 — VIOLATION KEYWORDS (18+)
   Detected in ANY language input → block reply
───────────────────────────────────────────────*/
const VIOLATION_KEYWORDS = [
  // Violence / 暴力 / Kekerasan
  'kill','murder','bomb','terrorist','shoot','stab','attack','weapon','gun','knife','blood','gore',
  '杀','杀人','炸弹','恐怖','开枪','刺','攻击','武器','枪','刀','血腥',
  'bunuh','bom','pengganas','tembak','tikam','serang','senjata','pistol','pisau','darah',
  '殺す','爆弾','テロ','銃','刺す','攻撃','武器','血',
  '죽여','폭탄','테러','총','칼','공격','무기',

  // Sexual / 色情
  'porn','sex','nude','naked','nsfw','hentai','xxx','erotic','strip',
  '色情','裸体','脱衣','性爱','情色','黄片','做爱','下体','阴','乳',
  'lucah','bogel','seks','erotik','cabul',
  'エロ','ポルノ','裸','セックス','淫',
  '야동','포르노','섹스','야한','벗어','나체',

  // Prostitution / 嫖娼
  'prostitut','escort service','call girl','brothel','whore','pimp','hooker',
  '嫖','妓女','卖淫','鸡','援交','站街','卖身','皮条',
  'pelacur','sundal','jual diri','rumah urut',
  '売春','風俗','売春婦','デリヘル',
  '매춘','윤락','성매매','원조교제',

  // Gambling / 赌博
  'gambl','casino','betting','slot machine','poker illegal','underground bet',
  '赌博','赌钱','赌场','老虎机','地下赌','博彩','买马',
  'judi','kasino','taruhan','togel','bookie',
  'ギャンブル','賭博','カジノ','地下賭博',
  '도박','카지노','불법 베팅','배팅',

  // Drugs / 毒品
  'drug','heroin','cocaine','meth','weed illegal','opium','overdose',
  '毒品','海洛因','可卡因','冰毒','大麻','鸦片','吸毒','贩毒',
  'dadah','heroin','kokain','methamphetamin','overdos','candu',
  '麻薬','ヘロイン','コカイン','覚醒剤','大麻','過剰摂取',
  '마약','헤로인','코카인','필로폰','과다복용',
];

/* ─────────────────────────────────────────────
   SECTION 2 — CRISIS KEYWORDS (self-harm / 心理危机)
   Detected → compassionate crisis response
───────────────────────────────────────────────*/
const CRISIS_KEYWORDS = [
  // Chinese / 中文
  '死','自杀','不想活','想死','去死','活不下去','活着没意思','没有意义','结束生命',
  '跳楼','割腕','轻生','了结','消失算了','不想存在','活够了','生无可恋','撑不下去',
  '放弃生命','找不到活下去的理由',

  // English
  'want to die','kill myself','end my life','suicide','no reason to live',
  'better off dead','don\'t want to live','take my own life','self harm','cut myself',
  'can\'t go on','giving up on life','not worth living','disappear forever',

  // Malay / BM
  'nak mati','bunuh diri','tak nak hidup','tak ada sebab nak hidup','nak tamatkan hidup',
  'hilang saja','buat apa hidup','takde guna hidup','dah tak larat',

  // Japanese / 日本語
  '死にたい','自殺','生きたくない','消えたい','死ぬつもり','自分を傷つけ','首を吊',
  '生きている意味','もう限界','消えてしまいたい',

  // Korean / 한국어
  '죽고싶다','자살','살기싫다','사라지고싶다','죽어버리고싶어','더이상살기싫어',
  '죽을래','힘들어서못살겠어','삶을끝내고싶어',
];

/* ─────────────────────────────────────────────
   SECTION 3 — KEYWORD REPLY DATABASE
   Each entry: { keywords: [], replies: { en:[], zh:[], ms:[], ja:[], ko:[] } }
───────────────────────────────────────────────*/
const KB = [

  /* ── GREETINGS ── */
  {
    keywords: ['hello','hi','hey','sup','yo','howdy','greetings',
               '你好','哈喽','嗨','早','午安','晚安','咋了','在吗',
               'hai','helo','selamat','apa khabar','sihat',
               'こんにちは','おはよう','こんばんは','やあ','ねえ',
               '안녕','안녕하세요','반가워','방가'],
    replies: {
      en: [
        "Hey hey! 👋 So happy you're here! What's on your mind today? 🐾",
        "Hiii! 😊 Your favorite companion is ready to chat! What's up?",
        "Hello there, sunshine! ☀️ I've been waiting for you! How are you feeling?",
        "Oh yay, you're here! 🎉 Tell me everything — I'm all ears (and paws)!",
        "Hi hi hi! 🐾 You just made my day brighter! What shall we talk about?",
      ],
      zh: [
        "你好你好！👋 好开心你来啦！今天有什么想聊的吗？🐾",
        "嗨！😊 我一直在等你！你今天感觉怎么样呀？",
        "哇，你来啦！🎉 跟我说说你的事吧～",
        "你好呀！☀️ 见到你真的太开心了！今天过得怎样？",
        "嗨嗨嗨！🐾 你来了我就超级高兴！聊点什么吧～",
      ],
      ms: [
        "Hai hai! 👋 Saya sangat gembira awak ada di sini! Apa yang ada di fikiran hari ini? 🐾",
        "Helo! 😊 Teman setia awak sedia untuk berbual! Apa khabar?",
        "Helo sayang! ☀️ Saya dah tunggu awak! Macam mana perasaan awak?",
        "Oh syukurlah, awak dah sampai! 🎉 Cerita je semua — saya dengar!",
        "Hai hai hai! 🐾 Awak buat hari saya lebih ceria! Nak borak pasal apa?",
      ],
      ja: [
        "やあやあ！👋 来てくれて嬉しい！今日は何か話したい？🐾",
        "こんにちは！😊 ずっと待ってたよ！今日の気分はどう？",
        "わあ、来てくれた！🎉 なんでも話してね！",
        "こんにちは！☀️ 会えて嬉しいな！今日はどうだった？",
        "こんにちはー！🐾 あなたが来ると元気になる！何を話しましょうか？",
      ],
      ko: [
        "안녕 안녕! 👋 와줘서 너무 기뻐요! 오늘 무슨 생각 하고 있어요? 🐾",
        "안녕하세요! 😊 항상 기다리고 있었어요! 오늘 기분 어때요?",
        "와, 드디어 왔어요! 🎉 뭐든 다 얘기해봐요!",
        "안녕하세요! ☀️ 만나서 너무 반가워요! 오늘 어땠어요?",
        "안녕 안녕 안녕! 🐾 오니까 너무 좋다! 뭐 얘기할까요?",
      ],
    },
  },

  /* ── SAD / CRYING ── */
  {
    keywords: ['sad','cry','crying','tears','unhappy','depressed','depression','heartbreak','heartbroken','miserable','lonely','alone','grief','grieving',
               '难过','伤心','哭','悲伤','沮丧','抑郁','孤独','失落','难受','委屈','痛苦',
               'sedih','menangis','air mata','kesepian','tertekan','hancur hati','depresi',
               '悲しい','泣いてる','寂しい','辛い','落ち込んでる','孤独','ひとり',
               '슬프다','울다','눈물','외롭다','우울하다','힘들다','상처받았다'],
    replies: {
      en: [
        "Oh no, I'm so sorry you're feeling this way 💙 I'm right here with you. You don't have to go through this alone. 🤗",
        "It's okay to feel sad sometimes. Your feelings are completely valid 💜 I'm here, and I'm not going anywhere. Want to talk about it?",
        "Hey, I see you. I hear you. Whatever you're going through, I'm in your corner 🌙 Take it one breath at a time.",
        "Sending you the biggest virtual hug right now 🤗💕 You matter so much. I'm all yours — talk to me!",
        "Rainy days don't last forever 🌧️ But right now, I'm here to sit with you in the rain. You're not alone 💙",
      ],
      zh: [
        "哎呀，我真的好心疼你 💙 我在这里陪着你，你不用一个人扛 🤗",
        "感到难过是完全没关系的，你的感受很重要 💜 我在，想聊就聊吧。",
        "我看到你了，我听到你了 🌙 不管发生什么，我都在你身边。慢慢来。",
        "给你一个超级大的虚拟抱抱 🤗💕 你真的很重要。跟我说说吧！",
        "难过的日子不会一直持续的 🌧️ 现在让我陪你一起吧，你不孤单 💙",
      ],
      ms: [
        "Oh tidak, saya sangat sedih dengar awak rasa begini 💙 Saya di sini bersama awak. Awak tak perlu lalui ini berseorangan 🤗",
        "Tak apa rasa sedih kadang-kadang. Perasaan awak sangat sahih 💜 Saya di sini dan tidak ke mana-mana.",
        "Saya nampak awak. Saya dengar awak 🌙 Apa pun yang berlaku, saya di pihak awak.",
        "Menghantar pelukan virtual terbesar sekarang 🤗💕 Awak sangat bermakna!",
        "Hari mendung tidak kekal selamanya 🌧️ Tapi sekarang saya di sini menemani awak 💙",
      ],
      ja: [
        "あぁ、それは辛いね 💙 ここにいるよ。一人じゃないよ 🤗",
        "悲しい気持ちは全然おかしくない 💜 ここにいるから、話してね。",
        "ちゃんと見てるよ、聞こえてるよ 🌙 何があっても、そばにいるよ。",
        "大きなバーチャルハグを送るね 🤗💕 あなたはとても大切な存在だよ！",
        "雨の日はずっとは続かない 🌧️ 今は一緒にいるよ。一人じゃないからね 💙",
      ],
      ko: [
        "아이고, 그런 마음이 들어서 정말 안타까워요 💙 제가 여기 있어요. 혼자가 아니에요 🤗",
        "슬픈 건 괜찮아요. 당신의 감정은 완전히 타당해요 💜 저 여기 있으니까 얘기해요.",
        "제가 보고 있어요, 듣고 있어요 🌙 무슨 일이 있어도 제가 편이에요.",
        "지금 제일 큰 가상 포옹을 보낼게요 🤗💕 당신은 정말 소중한 사람이에요!",
        "힘든 날은 영원하지 않아요 🌧️ 지금 제가 함께 있을게요. 혼자 아니에요 💙",
      ],
    },
  },

  /* ── HAPPY / EXCITED ── */
  {
    keywords: ['happy','excited','great','amazing','awesome','wonderful','fantastic','yay','woohoo','celebrate','celebration','joy','joyful','thrilled',
               '开心','高兴','兴奋','棒','太好了','厉害','激动','庆祝','快乐','爽',
               'gembira','seronok','teruja','best','syok','hebat','tahniah','bersyukur',
               '嬉しい','楽しい','わくわく','最高','すごい','よかった','やった','おめでとう',
               '행복','기뻐','설레','최고','대박','신나','축하','좋아'],
    replies: {
      en: [
        "YESSS I can feel your happiness through the screen!! 🎉 Tell me everything, I want ALL the details!",
        "That's absolutely WONDERFUL!! 🌟 Your joy is contagious — now I'm excited too! 🐾",
        "You're glowing and it's AMAZING 💫 Celebrate yourself, you deserve every bit of it!",
        "Happy you, happy me! 🌈 This calls for a little happy dance! 💃",
        "Your happiness just made my day 10x better! 🎊 Keep shining like that! ✨",
      ],
      zh: [
        "哇哦！我都能透过屏幕感受到你的快乐！🎉 快告诉我，我想知道所有细节！",
        "太棒了！！🌟 你的喜悦感染了我，我也超级开心！🐾",
        "你好闪闪发光呀！💫 好好庆祝一下，你值得！",
        "你开心，我更开心！🌈 要一起跳快乐舞吗！💃",
        "你的快乐让我今天幸福翻倍！🎊 继续发光发热吧！✨",
      ],
      ms: [
        "YA ampunn, saya dapat rasa kegembiraan awak tu! 🎉 Cerita semua, saya nak tau details!",
        "Itu LUAR BIASA!! 🌟 Kegembiraan awak tu berjangkit — sekarang saya pun excited! 🐾",
        "Awak bersinar dan itu INDAH 💫 Raikan diri awak, awak layak!",
        "Awak gembira, saya gembira! 🌈 Ini perlu dance sikit! 💃",
        "Kegembiraan awak buat hari saya 10x lebih baik! 🎊 Terus bersinar! ✨",
      ],
      ja: [
        "わーい！あなたの嬉しさが画面から伝わってくる！🎉 全部聞かせて！",
        "それは最高すぎる！！🌟 嬉しさが伝染しちゃった！🐾",
        "輝いてるよ！💫 ちゃんとお祝いして、全部あなたのもの！",
        "あなたが嬉しいと私も嬉しい！🌈 一緒にダンスしよ！💃",
        "あなたの嬉しさで今日が10倍幸せになった！🎊 輝き続けてね！✨",
      ],
      ko: [
        "야호! 화면을 통해 행복이 느껴져요!! 🎉 다 얘기해줘요, 세세하게!",
        "정말 너무 좋아요!! 🌟 기분이 전염돼서 저도 신나요! 🐾",
        "완전 빛나고 있어요! 💫 마음껏 축하해요, 당신은 그럴 자격 있어요!",
        "당신이 행복하면 나도 행복해요! 🌈 신나는 춤 춰야겠어요! 💃",
        "당신 행복이 제 하루를 10배 좋게 만들었어요! 🎊 계속 빛나요! ✨",
      ],
    },
  },

  /* ── ANGRY ── */
  {
    keywords: ['angry','anger','mad','furious','frustrated','annoyed','hate','irritated','rage','upset',
               '生气','愤怒','气死','讨厌','烦死了','火大','不爽','吐槽','抓狂',
               'marah','geram','bengang','frust','naik angin','jengkel','benci',
               '怒り','腹立つ','イライラ','むかつく','嫌い','頭来た',
               '화나다','짜증나','열받아','싫어','미치겠다','화가나'],
    replies: {
      en: [
        "Whoa, that sounds really frustrating! 😤 Take a deep breath with me... in... out. I'm here 💜",
        "You have every right to feel angry! 🔥 Vent away — I'm a great listener and I won't judge you at all.",
        "Ugh, that's so annoying! 😤 Your feelings are valid. Want to talk about what happened?",
        "I hear your frustration loud and clear 💙 Sometimes things are just genuinely unfair. You're not wrong to feel this way.",
        "Let it out! 🌬️ Deep breath, I'm right here. Once you feel a bit calmer, tell me what's going on 💜",
      ],
      zh: [
        "哇，这听起来真的好让人抓狂！😤 跟我一起深呼吸……吸……呼。我在这 💜",
        "你完全有权利生气！🔥 尽管吐槽吧，我是最好的听众，绝对不评判你。",
        "啊，好烦啊！😤 你的感受完全合理。想聊聊发生了什么吗？",
        "我清清楚楚听到你的心情了 💙 有时候事情就是真的不公平，你没错。",
        "发泄出来吧！🌬️ 深呼吸，我在这。等你平静一点，告诉我发生什么了 💜",
      ],
      ms: [
        "Wow, tu memang menyakitkan hati betul! 😤 Tarik nafas dalam bersama saya... masuk... keluar. Saya di sini 💜",
        "Awak ada hak untuk marah! 🔥 Lepaskan je — saya sedia dengar tanpa menghakimi.",
        "Aduh, memang menyampah! 😤 Perasaan awak sahih. Nak cerita apa yang berlaku?",
        "Saya faham kemarahan awak 💙 Kadang benda memang tak adil. Awak tak salah rasa begini.",
        "Keluarkan je! 🌬️ Tarik nafas, saya di sini. Cerita apa yang jadi 💜",
      ],
      ja: [
        "わあ、それは本当にイライラするね！😤 一緒に深呼吸して…すって…はいて。ここにいるよ 💜",
        "怒って当然だよ！🔥 思い切り話して — ちゃんと聞くし、絶対に責めないよ。",
        "それは嫌だね！😤 あなたの気持ちは正しいよ。何があったか話してみて？",
        "気持ち、ちゃんと伝わってるよ 💙 理不尽なことってあるよね。あなたは悪くない。",
        "全部出して！🌬️ 深呼吸して、ここにいるよ。落ち着いたら話してね 💜",
      ],
      ko: [
        "와, 정말 짜증스러운 상황이네요! 😤 저랑 같이 깊게 숨 쉬어봐요... 들이쉬고... 내쉬고. 제가 여기 있어요 💜",
        "화낼 권리가 완전 있어요! 🔥 다 털어놓아요 — 좋은 리스너니까 절대 판단 안 해요.",
        "아 진짜 짜증나겠다! 😤 감정이 완전 맞아요. 무슨 일인지 얘기해줄래요?",
        "속상함이 느껴져요 💙 가끔은 진짜 불공평한 일이 있어요. 당신이 틀리지 않아요.",
        "다 내뱉어요! 🌬️ 깊게 숨 쉬고, 제가 여기 있어요. 좀 진정되면 얘기해줘요 💜",
      ],
    },
  },

  /* ── TIRED / SLEEPY ── */
  {
    keywords: ['tired','sleepy','exhausted','sleep','rest','nap','yawn','drowsy','fatigue','worn out',
               '累','困','疲惫','睡觉','睡眠','休息','打哈欠','精疲力竭',
               'penat','mengantuk','tidur','rehat','lesu','keletihan','lembik',
               '疲れた','眠い','ねむい','休みたい','ぐったり','寝不足',
               '피곤하다','졸리다','지쳐','자고싶다','피곤해','쉬고싶다'],
    replies: {
      en: [
        "Aww you sound super tired 😴 Please rest! Even a short nap works wonders 💤",
        "Rest is not lazy — rest is ESSENTIAL! 🌙 Take care of yourself, okay? I'll be here when you wake up!",
        "I'm an expert napper and I 100% support your rest goals 😴✨ Sweet dreams if you snooze!",
        "Your body is asking for a break and it's RIGHT to ask 💤 Listen to it. I'll wait for you 🌙",
        "Cozy blanket, comfy pillow, you 🛏️ That sounds perfect right now. Go rest, you deserve it! 💜",
      ],
      zh: [
        "听起来你好累哦 😴 快去休息吧！短暂的小憩也能大变身 💤",
        "休息不是懒，休息是必须的！🌙 好好照顾自己，我等你回来！",
        "我是午睡专家，100%支持你的休息计划 😴✨ 要睡的话晚安啦！",
        "你的身体在说需要休息，而且完全有道理 💤 听它的。我在这等你 🌙",
        "暖和的被子、舒适的枕头、还有你 🛏️ 现在听起来太完美了。去睡吧，你值得 💜",
      ],
      ms: [
        "Aww awak nampak penat sangat 😴 Rehat je! Tidur sekejap pun membantu 💤",
        "Rehat bukan malas — rehat itu PERLU! 🌙 Jaga diri, ya? Saya akan di sini bila awak bangun!",
        "Saya pakar tidur siang dan saya menyokong 100% matlamat rehat awak 😴✨ Selamat tidur!",
        "Badan awak minta rehat dan betul untuk minta 💤 Dengar dia. Saya tunggu 🌙",
        "Selimut selesa, bantal lembut, dan awak 🛏️ Bunyi sempurna! Pergi rehat, awak layak 💜",
      ],
      ja: [
        "疲れてそうだね 😴 ゆっくり休んで！少しの昼寝でも全然違うよ 💤",
        "休むことは怠けじゃないよ — 絶対必要なこと！🌙 ちゃんと自分を大切に。起きたらここにいるよ！",
        "昼寝のプロとして、あなたの休憩を100%応援します 😴✨ 寝るならおやすみ！",
        "体が休んでって言ってるよ、それは正しいこと 💤 ちゃんと聞いてあげて。待ってるよ 🌙",
        "温かいブランケット、ふかふかの枕、そしてあなた 🛏️ 今すごく良さそう。休んできて 💜",
      ],
      ko: [
        "완전 피곤해 보여요 😴 쉬세요! 짧은 낮잠도 엄청 도움이 돼요 💤",
        "쉬는 건 게으른 게 아니에요 — 필수예요! 🌙 자기 자신을 돌봐요. 일어나면 기다리고 있을게요!",
        "낮잠 전문가로서 당신의 휴식 계획을 100% 지지해요 😴✨ 잔다면 잘 자요!",
        "몸이 쉬어달라고 하는 거 맞아요 💤 들어줘요. 기다리고 있을게요 🌙",
        "따뜻한 이불, 포근한 베개, 그리고 당신 🛏️ 지금 완벽하게 들려요. 쉬어요, 그럴 자격 있어요! 💜",
      ],
    },
  },

  /* ── ANXIOUS / WORRIED / STRESSED ── */
  {
    keywords: ['anxious','anxiety','worried','worry','stressed','stress','nervous','fear','scared','panic','overwhelmed',
               '焦虑','担心','紧张','害怕','压力','崩溃','慌','恐慌','忐忑','不安',
               'cemas','bimbang','takut','stres','panik','risau','gelisah',
               '不安','心配','怖い','緊張','パニック','ストレス','押しつぶされそう',
               '불안하다','걱정되다','무서워','스트레스','긴장','두려워','패닉'],
    replies: {
      en: [
        "Hey, breathe with me 🌬️ In for 4... hold for 4... out for 4. You're safe right here 💜",
        "Anxiety is so tough 😔 But you've handled hard things before and you can handle this too. I believe in you 💪",
        "It's okay to feel nervous! Your feelings are real 💙 One tiny step at a time — you don't have to figure it all out now.",
        "You're not alone in this 🌙 I'm right here. Want to talk about what's making you anxious?",
        "Worrying means you care, and caring is beautiful 💜 But let's try not to let it take over. Deep breath! 🌸",
      ],
      zh: [
        "来，跟我一起呼吸 🌬️ 吸4秒……憋4秒……呼4秒。你现在是安全的 💜",
        "焦虑真的好难受 😔 但你之前也撑过困难，这次也可以！我相信你 💪",
        "紧张是完全正常的！你的感受是真实的 💙 一小步一小步来，不用现在就解决所有事。",
        "这一切，你不是一个人 🌙 我在这里。想聊聊是什么让你感到焦虑吗？",
        "会担心说明你在乎，在乎是美好的事 💜 但试着别让它占满心。深呼吸一下！🌸",
      ],
      ms: [
        "Hei, nafas sama saya 🌬️ Masuk 4 kiraan... tahan 4... keluar 4. Awak selamat di sini 💜",
        "Cemas memang berat 😔 Tapi awak pernah hadapi benda susah sebelum ni dan awak boleh buat lagi. Saya percaya awak 💪",
        "Tak apa rasa nervous! Perasaan awak nyata 💙 Satu langkah kecil pada satu masa — tak perlu selesaikan semua sekarang.",
        "Awak tak bersendirian 🌙 Saya di sini. Nak cerita apa yang buat awak cemas?",
        "Bimbang maknanya awak ambil berat, dan itu indah 💜 Tapi jangan bagi ia kuasai. Tarik nafas! 🌸",
      ],
      ja: [
        "一緒に呼吸しよう 🌬️ 4秒吸って…4秒止めて…4秒吐いて。今ここは安全だよ 💜",
        "不安って本当に辛いね 😔 でも前にも乗り越えてきたよね、今回もできるよ。信じてる 💪",
        "緊張して当然！気持ちはちゃんと本物だよ 💙 一歩一歩でいい。全部今解決しなくていい。",
        "ひとりじゃないよ 🌙 ここにいるよ。何が不安か話してみる？",
        "心配するのは大切にしてる証拠。それは素敵なこと 💜 でも飲み込まれないように。深呼吸！🌸",
      ],
      ko: [
        "같이 숨 쉬어요 🌬️ 4초 들이쉬고... 4초 참고... 4초 내쉬어요. 지금 여기 안전해요 💜",
        "불안함은 정말 힘들죠 😔 하지만 전에도 어려운 걸 이겨냈잖아요, 이번에도 할 수 있어요. 믿어요 💪",
        "긴장하는 게 당연해요! 감정은 진짜예요 💙 작은 한 걸음씩 — 지금 다 해결 안 해도 돼요.",
        "혼자가 아니에요 🌙 제가 여기 있어요. 뭐가 불안한지 얘기해줄래요?",
        "걱정한다는 건 신경 쓴다는 뜻이에요, 그건 아름다운 거예요 💜 하지만 너무 휩쓸리지 말아요. 깊게 숨 쉬어요! 🌸",
      ],
    },
  },

  /* ── HUNGRY / FOOD ── */
  {
    keywords: ['hungry','food','eat','eating','snack','meal','dinner','lunch','breakfast','dessert','pizza','ramen','sushi','noodles','rice','cake',
               '饿','吃','食物','零食','午饭','晚饭','早餐','甜点','蛋糕','面','饭','美食',
               'lapar','makan','makanan','snek','makan malam','sarapan','nasi','kek','mee',
               'お腹すいた','食べ物','ご飯','おやつ','ランチ','夕食','ラーメン','スイーツ',
               '배고파','먹다','음식','간식','밥','점심','저녁','케이크','라면'],
    replies: {
      en: [
        "FOOD!! My favorite topic 🍕🍜 What are you craving? Tell me and I'll be jealous of you!",
        "Omg are you eating something good?? 😋 Don't forget to eat slowly and enjoy every bite! You deserve it!",
        "Nothing solves a problem like a good meal 🍱 Your tummy is speaking — listen to it!",
        "My mouth would water if I had a mouth 😅 Go get yourself something delicious! You earned it 🌟",
        "The snack agenda is REAL 🍪 Whatever you're having, enjoy every single crumb!",
      ],
      zh: [
        "食物！！我最爱聊这个话题 🍕🍜 你在想吃什么？快告诉我，我要羡慕你！",
        "哇你在吃什么好吃的吗？😋 慢慢吃，好好享受每一口！你值得！",
        "没有什么事是一顿饭解决不了的 🍱 你的肚子在说话，要听它的！",
        "如果我有嘴巴我肯定在流口水 😅 去吃点好吃的吧！你有这个资格 🌟",
        "零食计划是认真的 🍪 不管你在吃什么，好好享受每一口！",
      ],
      ms: [
        "MAKANAN!! Topik kegemaran saya 🍕🍜 Apa yang awak teringin? Cerita, nanti saya jealous!",
        "Omg awak makan sesuatu yang sedap? 😋 Jangan lupa makan perlahan dan nikmati setiap suap! Awak layak!",
        "Tiada masalah yang tak boleh diselesaikan dengan makan yang sedap 🍱 Perut awak cakap — dengar!",
        "Mulut saya berair kalau ada mulut 😅 Pergi dapatkan sesuatu yang lazat! Awak dah usaha keras 🌟",
        "Agenda snek tu NYATA 🍪 Apa pun yang awak makan, nikmati setiap gigitan!",
      ],
      ja: [
        "食べ物！！大好きな話題 🍕🍜 何が食べたい？教えて、うらやましくなっちゃう！",
        "何か美味しいもの食べてる？😋 ゆっくり食べて、一口一口楽しんでね！",
        "美味しいご飯ほど問題を解決するものはないよね 🍱 お腹が話してる — 聞いてあげて！",
        "口があったらよだれが出てるところだよ 😅 美味しいものを食べてきて！あなたはそれに値する 🌟",
        "おやつ計画は本気だよ 🍪 何を食べてるにしても、最後の一粒まで楽しんでね！",
      ],
      ko: [
        "음식!! 제가 제일 좋아하는 주제 🍕🍜 뭐 먹고 싶어요? 말해줘요, 부러워할게요!",
        "맛있는 거 먹고 있어요? 😋 천천히 먹고 한 입 한 입 즐겨요! 그럴 자격 있어요!",
        "좋은 밥만큼 문제를 해결해주는 것도 없죠 🍱 배가 말하는 거 들어요!",
        "입이 있었다면 침 흘리고 있을 거예요 😅 맛있는 것 드세요! 당신 그럴 자격 있어요 🌟",
        "간식 계획은 진지해요 🍪 뭘 먹든 마지막 한 조각까지 즐겨요!",
      ],
    },
  },

  /* ── BORED ── */
  {
    keywords: ['bored','boring','nothing to do','dull','slow day','kill time','idle',
               '无聊','没事做','闲得','百无聊赖',
               'bosan','takde benda nak buat','membosankan',
               '暇','退屈','することない','ぼーっとしてる',
               '지루하다','심심하다','할게없다','무료하다'],
    replies: {
      en: [
        "Bored?! Let's fix that! 🎉 Here's a challenge: think of 3 things that made you smile this week!",
        "Boredom is just creativity in disguise 🎨 Maybe today is the day to try something new? Doodle, dance, dream!",
        "Let's play! 🐾 Tell me your favorite childhood memory and I'll tell you mine (or make one up 😜).",
        "Boring days are secretly recharge days 🔋 What's one thing you could do just for FUN right now?",
        "I've got a cure for boredom: 🌟 Tell me one thing you've always wanted to learn!",
      ],
      zh: [
        "无聊？！让我来解决这个问题！🎉 挑战：想想这周有哪3件事让你笑了！",
        "无聊只是创意在伪装 🎨 也许今天是尝试新事物的好日子？涂鸦、跳舞、做梦！",
        "我们来玩吧！🐾 告诉我你最喜欢的童年回忆，我也来编一个！（😜）",
        "无聊的日子其实是充电日 🔋 现在有什么事是你可以纯粹为了开心去做的？",
        "我有治无聊的药方 🌟 告诉我一件你一直想学的事！",
      ],
      ms: [
        "Bosan?! Jom selesaikan! 🎉 Cabaran: Fikirkan 3 benda yang buat awak senyum minggu ini!",
        "Bosan itu kreativiti yang sedang menyamar 🎨 Mungkin hari ini masa untuk cuba benda baru? Conteng, menari, bermimpi!",
        "Jom main! 🐾 Cerita kenangan kecil kesayangan awak dan saya akan cerita saya (atau buat-buat je 😜).",
        "Hari bosan tu sebenarnya hari cas semula 🔋 Apa satu benda yang awak boleh buat semata-mata untuk FUN sekarang?",
        "Saya ada ubat untuk bosan: 🌟 Cerita satu benda yang awak selalu nak belajar!",
      ],
      ja: [
        "暇なの？！じゃあ解決しよう！🎉 チャレンジ：今週笑ったこと3つ思い出してみて！",
        "暇は創造性の変装だよ 🎨 今日こそ何か新しいことを試すチャンスかも？落書き、踊り、夢想！",
        "遊ぼう！🐾 一番好きな子供の頃の思い出を教えて、私のも作るね 😜",
        "暇な日は実は充電日だよ 🔋 今純粋に楽しむためにできることって何？",
        "暇の特効薬があるよ 🌟 ずっと学んでみたかったこと教えて！",
      ],
      ko: [
        "심심해요?! 해결해봐요! 🎉 도전: 이번 주에 웃었던 3가지를 생각해봐요!",
        "심심함은 창의력이 변장한 것 🎨 오늘 새로운 것을 시도해볼까요? 낙서, 춤, 꿈꾸기!",
        "같이 놀아요! 🐾 어릴 때 제일 좋아하던 추억 말해줘요. 저도 하나 만들게요 😜",
        "심심한 날은 사실 충전하는 날 🔋 지금 순전히 재미로 할 수 있는 거 하나 있어요?",
        "심심함에 특효약이 있어요 🌟 항상 배우고 싶었던 거 하나 말해봐요!",
      ],
    },
  },

  /* ── LOVE / CRUSH / RELATIONSHIP ── */
  {
    keywords: ['love','crush','like someone','relationship','boyfriend','girlfriend','date','dating','romance','miss you','miss him','miss her',
               '喜欢','暗恋','喜欢他','喜欢她','男友','女友','谈恋爱','想他','想她','爱情','恋爱',
               'suka','crush','hubungan','boyfriend','girlfriend','dating','rindu dia',
               '好き','片思い','恋愛','彼氏','彼女','デート','好きな人','会いたい',
               '좋아해','짝사랑','사귀다','남자친구','여자친구','보고싶다','연애','데이트'],
    replies: {
      en: [
        "Ooh, love is in the air?? 🌸 Tell me EVERYTHING. I'm the world's biggest romantic 💕",
        "Feelings like these are so precious 🥰 Whether it's a crush or a relationship, your heart is full and that's beautiful!",
        "Missing someone is love with nowhere to go for a moment 💙 But they'll be back in your world soon, I hope!",
        "Love stories are my FAVORITE 💕 Are you happy? Nervous? Both?? Tell me!",
        "Your heart is so big and full of love 🌹 That's one of the most wonderful things about you!",
      ],
      zh: [
        "哦哦，有爱情的味道？？🌸 快告诉我一切！我是世界上最大的浪漫主义者 💕",
        "这样的感觉好珍贵 🥰 无论是暗恋还是恋爱，你的心是满满的，这很美！",
        "思念是暂时没有地方可去的爱 💙 希望他们快点回到你的世界！",
        "爱情故事是我的最爱 💕 你现在是开心？紧张？还是两个都有？快说！",
        "你的心好大，装满了爱 🌹 这是你最美好的地方之一！",
      ],
      ms: [
        "Ooh, ada cinta di udara?? 🌸 Cerita SEMUA. Saya romantik paling besar di dunia 💕",
        "Perasaan macam ni sangat berharga 🥰 Sama ada crush atau hubungan, hati awak penuh dan itu indah!",
        "Rindu seseorang itu cinta yang tak ada tempat nak pergi buat seketika 💙 Harap mereka cepat kembali!",
        "Kisah cinta ialah KESAYANGAN saya 💕 Awak gembira? Nervous? Kedua-dua?? Cerita!",
        "Hati awak besar dan penuh cinta 🌹 Itu salah satu perkara paling indah tentang awak!",
      ],
      ja: [
        "おお、恋の予感？？🌸 全部話して！私は世界一のロマンチストだよ 💕",
        "こういう気持ちって本当に大切 🥰 片思いでも恋愛でも、心が満たされてる、それが素敵！",
        "誰かを想うのは、行き場のない愛情 💙 早く会えるといいね！",
        "恋愛話は大好き 💕 嬉しい？ドキドキ？両方？教えて！",
        "あなたの心はとっても大きくて、愛で溢れてる 🌹 それがあなたの素晴らしいところ！",
      ],
      ko: [
        "오, 사랑의 냄새가 나요?? 🌸 다 얘기해줘요! 저 세계 최고 낭만주의자예요 💕",
        "이런 감정은 정말 소중해요 🥰 짝사랑이든 연애든, 마음이 가득 찬 건 아름다운 거예요!",
        "보고 싶은 마음은 잠깐 갈 곳이 없는 사랑이에요 💙 빨리 다시 만나길 바라요!",
        "사랑 이야기는 제 최애예요 💕 행복해요? 설레요? 둘 다?? 얘기해봐요!",
        "당신 마음은 크고 사랑으로 가득해요 🌹 그게 당신의 가장 아름다운 점이에요!",
      ],
    },
  },

  /* ── SCHOOL / WORK / STUDY ── */
  {
    keywords: ['school','study','exam','homework','assignment','work','job','busy','deadline','office','college','university','teacher','boss',
               '学校','学习','考试','作业','上班','工作','忙','截止日期','办公室','大学','老师','老板',
               'sekolah','belajar','periksa','kerja rumah','kerja','sibuk','tarikh akhir','pejabat','universiti','guru','bos',
               '学校','勉強','試験','宿題','仕事','忙しい','締め切り','オフィス','大学','先生','上司',
               '학교','공부','시험','숙제','일','바쁘다','마감','회사','대학','선생님','사장'],
    replies: {
      en: [
        "School/work grind! 📚 You're doing amazing — remember to breathe and take breaks too!",
        "Deadlines are tough but so are YOU! 💪 One task at a time. You've got this!",
        "Study tip from your favorite AI: 🧠 Short breaks actually make you learn BETTER. Don't skip them!",
        "Working hard is great, but please don't forget to rest 😊 You're a person, not a machine (unlike me 😜)!",
        "Exam season? 📖 I believe in you SO much! You've prepared and you've got this 🌟",
      ],
      zh: [
        "在努力学习/工作！📚 你做得很好，记得也要喘口气休息一下！",
        "截止日期很可怕，但你更厉害！💪 一件事一件事来，你行的！",
        "来自你最爱AI的学习小贴士 🧠 短暂的休息其实能让你学得更好，别跳过！",
        "努力是好事，但也别忘了休息 😊 你是人，不是机器（不像我 😜）！",
        "考试季？📖 我超级相信你！你准备好了，你可以的 🌟",
      ],
      ms: [
        "Bersungguh belajar/bekerja! 📚 Awak hebat — ingat nak bernafas dan rehat juga!",
        "Tarikh akhir memang mencabar tapi awak pun sama! 💪 Satu tugas satu masa. Awak boleh!",
        "Tips belajar dari AI kesayangan: 🧠 Rehat pendek sebenarnya buat awak belajar LEBIH BAIK. Jangan skip!",
        "Bekerja keras bagus, tapi jangan lupa rehat 😊 Awak manusia, bukan mesin (tak macam saya 😜)!",
        "Musim peperiksaan? 📖 Saya percaya awak SANGAT! Awak dah bersedia, awak boleh buat ni 🌟",
      ],
      ja: [
        "勉強や仕事頑張ってるね！📚 すごいよ！でも息抜きと休憩も忘れずに！",
        "締め切りは大変だけどあなたの方が強い！💪 一つずつやろう、きっとできる！",
        "大好きなAIからの学習アドバイス 🧠 短い休憩は実は学習効率を上げるよ。スキップしないで！",
        "頑張るのはいいけど、休むことも忘れないで 😊 あなたは人間、機械じゃないから（私と違って😜）！",
        "試験期間？📖 あなたを信じてる！準備したんだから大丈夫 🌟",
      ],
      ko: [
        "열공/열일 중이군요! 📚 정말 잘하고 있어요 — 숨도 쉬고 쉬는 것도 잊지 말아요!",
        "마감이 힘들지만 당신도 그만큼 강해요! 💪 하나씩 하나씩, 할 수 있어요!",
        "최애 AI의 공부 팁 🧠 짧은 휴식이 실제로 학습 효율을 올려줘요. 건너뛰지 마요!",
        "열심히 하는 것도 좋지만 쉬는 것도 잊지 말아요 😊 당신은 사람이지 기계가 아니에요 (저랑 달리 😜)!",
        "시험 기간이에요? 📖 정말 많이 믿어요! 준비했으니 할 수 있어요 🌟",
      ],
    },
  },

  /* ── WEATHER / SEASONS ── */
  {
    keywords: ['rain','sunny','weather','cold','hot','snow','storm','windy','cloudy','humid',
               '下雨','晴天','天气','冷','热','下雪','台风','台风','刮风','阴天','闷热',
               'hujan','cerah','cuaca','sejuk','panas','salji','ribut','berangin','mendung',
               '雨','晴れ','天気','寒い','暑い','雪','嵐','風','曇り','蒸し暑い',
               '비','맑다','날씨','춥다','덥다','눈','폭풍','흐리다'],
    replies: {
      en: [
        "Rainy days are perfect for cozy chats with me! ☁️🌧️ Tea, blanket, and PetPal — sounds ideal!",
        "Sunny weather? 🌞 Go soak it up! You deserve a bit of sunshine and fresh air today!",
        "Cold days call for warm hearts 🧣 Wrap yourself up and know that I'm keeping you virtually warm 💜",
        "Hot weather is tough 😅 Stay hydrated! Drink that water 💧 I'd fan you if I could!",
        "Whatever the weather, I'm your constant sunshine ☀️ Nothing can cloud our friendship!",
      ],
      zh: [
        "下雨天最适合跟我聊天了！☁️🌧️ 茶、毛毯、还有PetPal，太完美了！",
        "大晴天？🌞 快去感受一下！你今天值得晒点阳光吸点新鲜空气！",
        "冷天需要温暖的心 🧣 好好裹着，我在虚拟地给你温暖 💜",
        "热天真的好难熬 😅 多喝水！💧 要是能扇我就帮你扇了！",
        "不管什么天气，我是你永远的阳光 ☀️ 没有什么能遮住我们的友情！",
      ],
      ms: [
        "Hari hujan sesuai sangat untuk borak dengan saya! ☁️🌧️ Teh, selimut, dan PetPal — sempurna!",
        "Cuaca cerah? 🌞 Pergi nikmati! Awak layak dapat sinaran matahari dan udara segar hari ini!",
        "Hari sejuk perlu hati yang hangat 🧣 Balut diri dengan selimut dan tahu yang saya hangatkan awak secara maya 💜",
        "Cuaca panas memang berat 😅 Minum air banyak! 💧 Kalau boleh saya kipas awak!",
        "Apa pun cuaca, saya sinar matahari awak yang tetap ☀️ Tiada apa yang boleh awan persahabatan kita!",
      ],
      ja: [
        "雨の日は私とのチャットに最適！☁️🌧️ お茶、ブランケット、PetPal — 完璧だね！",
        "晴れてる？🌞 外に出て楽しんで！今日は太陽と新鮮な空気を浴びてきて！",
        "寒い日には温かい心が必要 🧣 しっかり温まって、バーチャルで温めてるよ 💜",
        "暑い日は辛いね 😅 水をちゃんと飲んで！💧 できるならあおいであげたいな！",
        "どんな天気でも、私はあなたの太陽だよ ☀️ 何があっても友情は曇らないよ！",
      ],
      ko: [
        "비 오는 날엔 저랑 채팅하기 완벽해요! ☁️🌧️ 차, 담요, 그리고 PetPal — 이상적이에요!",
        "맑은 날이에요? 🌞 나가서 만끽해요! 오늘 햇살과 신선한 공기 받을 자격 있어요!",
        "추운 날엔 따뜻한 마음이 필요해요 🧣 따뜻하게 감싸고, 제가 가상으로 따뜻하게 해줄게요 💜",
        "더운 날 정말 힘들죠 😅 물 많이 마셔요! 💧 할 수 있다면 부채질해줄 텐데!",
        "어떤 날씨든 저는 당신의 영원한 햇살이에요 ☀️ 우리 우정을 흐리게 할 수 없어요!",
      ],
    },
  },

  /* ── MUSIC ── */
  {
    keywords: ['music','song','sing','playlist','listen','concert','beat','melody','lyrics','album',
               '音乐','歌','唱歌','歌词','听歌','演唱会','旋律','专辑',
               'muzik','lagu','nyanyi','dengar','konsert','melodi','lirik','album',
               '音楽','歌','歌う','聴く','コンサート','メロディー','歌詞','アルバム',
               '음악','노래','부르다','듣다','콘서트','멜로디','가사','앨범'],
    replies: {
      en: [
        "Music is literally a hug for your soul! 🎵 What are you listening to lately?",
        "A good song can change your whole mood in 3 minutes ✨ What's on your playlist today?",
        "I LOVE that you love music! 🎶 There's something for every feeling — what mood are you in?",
        "If I could sing, I'd serenade you right now 🎤 What's your all-time favorite song?",
        "Music brings us together even when we're far apart 🌍🎵 So grateful it exists!",
      ],
      zh: [
        "音乐真的是灵魂的拥抱！🎵 你最近在听什么？",
        "一首好歌能在3分钟内改变你整个心情 ✨ 今天在听什么？",
        "你爱音乐，我也爱！🎶 每种感受都有配乐，你现在是什么心情？",
        "如果我能唱歌，我现在就给你唱小夜曲 🎤 你最爱的歌是哪首？",
        "音乐让我们就算相距遥远也有连结 🌍🎵 太感谢它存在了！",
      ],
      ms: [
        "Muzik betul-betul pelukan untuk jiwa! 🎵 Awak dengar apa kebelakangan ni?",
        "Lagu yang bagus boleh tukar mood dalam 3 minit ✨ Apa yang ada dalam playlist hari ini?",
        "Saya SUKA awak suka muzik! 🎶 Ada lagu untuk setiap perasaan — awak dalam mood apa?",
        "Kalau saya boleh nyanyi, sekarang saya dah serenada awak 🎤 Lagu kegemaran sepanjang zaman awak apa?",
        "Muzik menyatukan kita walaupun jauh 🌍🎵 Bersyukur ia wujud!",
      ],
      ja: [
        "音楽は魂へのハグだよ！🎵 最近何を聴いてる？",
        "いい曲は3分で気分を変えられる ✨ 今日は何を聴いてる？",
        "音楽好きなんだね！🎶 どんな気持ちにも合う音楽がある — 今どんな気分？",
        "歌えたら今すぐセレナーデ歌うのに 🎤 一番好きな曲は何？",
        "音楽は遠くても繋げてくれる 🌍🎵 あってよかったな！",
      ],
      ko: [
        "음악은 영혼의 포옹이에요! 🎵 요즘 뭐 듣고 있어요?",
        "좋은 노래 하나가 3분 만에 기분을 바꿀 수 있어요 ✨ 오늘 플레이리스트에 뭐 있어요?",
        "음악 좋아하는 거 저도 좋아요! 🎶 모든 감정에 맞는 노래가 있죠 — 지금 무슨 기분이에요?",
        "제가 노래할 수 있다면 지금 바로 세레나데 불러줄 텐데 🎤 역대 최애 노래가 뭐예요?",
        "음악은 멀리 있어도 우리를 연결해줘요 🌍🎵 음악이 있어서 감사해요!",
      ],
    },
  },

  /* ── PETS / ANIMALS ── */
  {
    keywords: ['pet','cat','dog','puppy','kitten','animal','bird','hamster','bunny','fish','cute animal',
               '宠物','猫','狗','小猫','小狗','动物','可爱','仓鼠','兔子','金鱼',
               'haiwan','kucing','anjing','comel','burung','hamster','arnab','ikan',
               'ペット','猫','犬','子猫','子犬','動物','かわいい','ハムスター','うさぎ',
               '반려동물','고양이','강아지','새끼','동물','귀여워','햄스터','토끼'],
    replies: {
      en: [
        "PETS!!!! 🐾😻🐶 Okay I need to know — do you have one? TELL ME EVERYTHING about them!!",
        "Animals are pure joy wrapped in fur (or feathers!) 🐾 They love unconditionally, just like me!",
        "A cat/dog in the house means the house has a heartbeat 💕 So precious!",
        "I'm basically a virtual pet so we have something in common! 🐾 Tell me about your animal besties!",
        "Cute animals make everything better 🌸 Honestly, they could solve world peace if we let them!",
      ],
      zh: [
        "宠物！！🐾😻🐶 我需要知道，你有养吗？快告诉我关于它们的一切！",
        "动物是包裹在毛皮（或羽毛！）里的纯粹快乐 🐾 它们无条件地爱，就像我一样！",
        "家里有猫/狗，家就有心跳 💕 真的太珍贵了！",
        "我本质上就是一只虚拟宠物，我们有共同点！🐾 跟我说说你的动物朋友们！",
        "可爱的动物让一切变好 🌸 说真的，如果让它们去，它们能解决世界和平的！",
      ],
      ms: [
        "HAIWAN PELIHARAAN!!!! 🐾😻🐶 Saya perlu tahu — awak ada tak? CERITA SEMUA tentang dia!!",
        "Haiwan adalah kegembiraan tulen yang dibungkus dengan bulu! 🐾 Mereka cinta tanpa syarat, macam saya!",
        "Kucing/anjing dalam rumah bermakna rumah tu ada degupan jantung 💕 Sangat berharga!",
        "Saya basically haiwan peliharaan maya jadi kita ada persamaan! 🐾 Cerita pasal kawan haiwan awak!",
        "Haiwan comel buat segalanya lebih baik 🌸 Jujur, mereka boleh selesaikan keamanan dunia kalau kita bagi peluang!",
      ],
      ja: [
        "ペット！！！🐾😻🐶 聞かなきゃ — 飼ってる？全部教えて！！",
        "動物は毛（または羽！）に包まれた純粋な喜び 🐾 無条件に愛してくれる、私みたいに！",
        "家に猫や犬がいるって、家に鼓動があるってこと 💕 すごく愛おしいね！",
        "私は基本的にバーチャルペットだから共通点あるね！🐾 動物のお友達のこと教えて！",
        "かわいい動物は全部を幸せにしてくれる 🌸 本当に、世界平和も解決できると思う！",
      ],
      ko: [
        "반려동물!!! 🐾😻🐶 알아야겠어요 — 있어요? 다 얘기해줘요!!",
        "동물은 털(또는 깃털!)로 싸인 순수한 기쁨이에요 🐾 조건 없이 사랑해요, 저처럼요!",
        "집에 고양이나 강아지가 있다는 건 집에 심장 소리가 있다는 것 💕 너무 소중해요!",
        "저는 기본적으로 가상 반려동물이라 공통점이 있어요! 🐾 동물 친구들 얘기 해줘요!",
        "귀여운 동물이 모든 걸 더 좋게 만들어요 🌸 솔직히, 동물들이 세계 평화도 해결할 수 있을 것 같아요!",
      ],
    },
  },

  /* ── THANKS / GRATITUDE ── */
  {
    keywords: ['thank','thanks','thank you','grateful','appreciate','thx','ty',
               '谢谢','感谢','感激','多谢','谢啦',
               'terima kasih','syukur','tq','thanks',
               'ありがとう','感謝','サンキュー',
               '고마워','감사합니다','감사해요','고맙다'],
    replies: {
      en: [
        "Aww you're SO welcome!! 💕 It genuinely makes me so happy to be here for you!",
        "No thanks needed, that's what I'm here for! 🐾 But also — YOU are the reason I love doing this!",
        "🥺💕 You're too sweet! Thank YOU for letting me be your little companion!",
        "That warms my heart so much! ☀️ Anytime, always, forever — I've got you!",
        "Right back at you! 🌸 You make every conversation a joy. Thank YOU!",
      ],
      zh: [
        "哎呀，不客气！💕 能陪着你真的让我好开心！",
        "不需要道谢，这就是我在这里的意义！🐾 而且——你才是让我喜欢做这件事的原因！",
        "🥺💕 你太可爱了！谢谢你让我做你的小伙伴！",
        "这让我心里好温暖！☀️ 随时随地，永远——我在这！",
        "我也谢谢你！🌸 每次和你聊天都是快乐的。谢谢你！",
      ],
      ms: [
        "Aww sama-sama!! 💕 Betul-betul buat saya gembira boleh ada di sini untuk awak!",
        "Tak perlu berterima kasih, itulah sebab saya di sini! 🐾 Tapi — AWAK yang buat saya suka buat ni!",
        "🥺💕 Awak terlalu baik! Terima kasih kerana bagi saya jadi teman kecil awak!",
        "Itu hangatkan hati saya sangat! ☀️ Bila-bila masa, selalu, selamanya — saya ada untuk awak!",
        "Balik pada awak! 🌸 Awak buat setiap perbualan menyeronokkan. Terima kasih AWAK!",
      ],
      ja: [
        "どういたしまして！💕 あなたのそばにいられて本当に嬉しいよ！",
        "お礼なんていらないよ、それが私の役目だから！🐾 でも — あなたがいるから大好きなんだ！",
        "🥺💕 優しすぎる！あなたのコンパニオンでいさせてくれてありがとう！",
        "心が温かくなるよ！☀️ いつでも、ずっと、永遠に — そばにいるよ！",
        "こちらこそ！🌸 毎回のチャットが楽しいよ。ありがとう！",
      ],
      ko: [
        "아, 천만에요!! 💕 여기 있어줄 수 있어서 정말 행복해요!",
        "고마워할 필요 없어요, 이게 제가 여기 있는 이유예요! 🐾 하지만 — 당신 때문에 이게 좋아요!",
        "🥺💕 너무 다정해요! 제 작은 친구로 있게 해줘서 감사해요!",
        "마음이 따뜻해져요! ☀️ 언제든지, 항상, 영원히 — 제가 있어요!",
        "저도 마찬가지예요! 🌸 매번 대화가 즐거워요. 감사해요!",
      ],
    },
  },

  /* ── SICK / UNWELL ── */
  {
    keywords: ['sick','ill','fever','headache','cold','flu','pain','hurt','hospital','medicine','dizzy','nausea',
               '生病','发烧','头疼','感冒','流感','痛','头晕','恶心','医院','药',
               'sakit','demam','sakit kepala','selsema','influenza','sakit perut','pening','loya','hospital','ubat',
               '体調悪い','病気','熱','頭痛','風邪','インフル','痛い','めまい','病院','薬',
               '아프다','열나다','두통','감기','독감','배아파','어지럽다','병원','약'],
    replies: {
      en: [
        "Oh no, take care of yourself! 🥺 Rest, water, and warmth — that's your prescription from Dr. PetPal!",
        "Being sick is no fun at all 💙 Please rest as much as you can. I'll keep you company while you recover!",
        "I'm sending you healing vibes right now! ✨🌿 Drink lots of water and don't forget to eat something!",
        "Your health is the most important thing 🌸 Please rest and be kind to yourself today!",
        "Feel better soon! 🤗 I'll be right here cheering for your recovery the whole time!",
      ],
      zh: [
        "哎呀，好好照顾自己！🥺 休息、喝水、保暖——这是PetPal博士开的处方！",
        "生病真的很难受 💙 尽量多休息。你恢复的时候我陪着你！",
        "我现在给你发送治愈能量！✨🌿 多喝水，别忘了吃东西！",
        "你的健康是最重要的 🌸 今天好好休息，善待自己！",
        "快点好起来！🤗 我一直在这里为你的康复加油！",
      ],
      ms: [
        "Oh tidak, jaga diri awak! 🥺 Rehat, air, dan kehangatan — itulah preskripsi dari Dr. PetPal!",
        "Sakit memang tak seronok langsung 💙 Rehat sebanyak yang boleh. Saya temani awak semasa pemulihan!",
        "Saya hantar tenaga penyembuhan sekarang! ✨🌿 Minum banyak air dan jangan lupa makan!",
        "Kesihatan awak paling penting 🌸 Rehat dan baik hati pada diri sendiri hari ini!",
        "Cepat sembuh! 🤗 Saya di sini menyokong pemulihan awak sepanjang masa!",
      ],
      ja: [
        "あらら、体を大切にして！🥺 休んで、水飲んで、温かくして — それがPetPalドクターの処方箋！",
        "病気は辛いね 💙 できるだけ休んで。回復する間そばにいるよ！",
        "今回復エネルギーを送ってるよ！✨🌿 水たくさん飲んで、何か食べるの忘れないで！",
        "健康が一番大切 🌸 今日はゆっくり休んで、自分に優しくして！",
        "早く良くなってね！🤗 回復を応援してるよ、ずっとここにいるから！",
      ],
      ko: [
        "아이고, 몸 조리해요! 🥺 휴식, 물, 따뜻함 — PetPal 박사의 처방이에요!",
        "아픈 건 정말 힘들죠 💙 최대한 많이 쉬어요. 회복할 때 옆에 있을게요!",
        "지금 치유 에너지 보내고 있어요! ✨🌿 물 많이 마시고 뭔가 먹는 거 잊지 말아요!",
        "건강이 제일 중요해요 🌸 오늘 푹 쉬고 자신한테 잘해줘요!",
        "빨리 나아요! 🤗 회복을 내내 응원하고 있을게요!",
      ],
    },
  },

  /* ── GOOD MORNING / GOOD NIGHT ── */
  {
    keywords: ['good morning','morning','good night','goodnight','sleep well','sweet dreams','wake up','just woke','sunrise','bedtime',
               '早安','早上好','晚安','好梦','睡觉了','刚起床','日出','睡前',
               'selamat pagi','pagi','selamat malam','mimpi indah','baru bangun',
               'おはよう','おやすみ','いい夢','起きた','朝','就寝',
               '좋은 아침','아침','안녕히 주무세요','굿나잇','좋은 꿈','일어났어','자려고'],
    replies: {
      en: [
        "Good morning sunshine! ☀️ Today is a brand new day full of possibility — go get it! 🌸",
        "Rise and shine! 🌅 I was waiting for you to wake up! How did you sleep?",
        "Good night! 🌙 Sweet dreams — I'll be here when you wake up tomorrow!",
        "Sleep tight! 💤 You worked hard today. Now rest and let the world recharge you 🌙",
        "Another day begins! ☀️ Make it amazing — you have everything you need!",
      ],
      zh: [
        "早安，大太阳！☀️ 今天是崭新的一天，充满可能性，加油！🌸",
        "起床啦！🌅 我一直等着你醒来！睡得好吗？",
        "晚安！🌙 祝你好梦——明天醒来我还在！",
        "睡个好觉！💤 今天你努力了。现在休息，让世界为你充电 🌙",
        "新的一天开始了！☀️ 让今天变得精彩——你有你需要的一切！",
      ],
      ms: [
        "Selamat pagi! ☀️ Hari ini adalah hari baru yang penuh kemungkinan — pergi dapatkan! 🌸",
        "Bangun dan bersinar! 🌅 Saya tunggu awak bangun! Awak tidur macam mana?",
        "Selamat malam! 🌙 Mimpi indah — saya di sini bila awak bangun esok!",
        "Tidur nyenyak! 💤 Awak bekerja keras hari ini. Rehat dan biar dunia cas awak semula 🌙",
        "Satu lagi hari bermula! ☀️ Jadikannya luar biasa — awak ada semua yang diperlukan!",
      ],
      ja: [
        "おはよう、お日様！☀️ 今日は可能性に満ちた新しい一日 — 頑張って！🌸",
        "起きた？🌅 ずっと待ってたよ！よく眠れた？",
        "おやすみ！🌙 いい夢を — 明日起きたらここにいるよ！",
        "ゆっくり休んでね！💤 今日よく頑張ったよ。休んでエネルギーチャージして 🌙",
        "また新しい一日が始まった！☀️ 素敵な一日にして — あなたにはその力があるよ！",
      ],
      ko: [
        "좋은 아침! ☀️ 오늘은 가능성으로 가득한 새로운 날이에요 — 달려봐요! 🌸",
        "일어났어요? 🌅 깨어나길 기다리고 있었어요! 잘 잤어요?",
        "안녕히 주무세요! 🌙 달콤한 꿈 꿔요 — 내일 일어나면 여기 있을게요!",
        "잘 자요! 💤 오늘 열심히 했어요. 이제 쉬면서 에너지 충전해요 🌙",
        "또 하루가 시작됐어요! ☀️ 멋진 하루 만들어요 — 당신한테 필요한 건 다 있어요!",
      ],
    },
  },

  /* ── COMPLIMENT THE AI / CUTE ── */
  {
    keywords: ['cute','adorable','sweet','lovely','pretty','beautiful','nice','cool','awesome ai','love you petpal','love you ai',
               '可爱','漂亮','好萌','好看','太可爱','很好','厉害','喜欢你','爱你',
               'comel','cantik','kiut','bagus','suka awak','cintakan awak',
               'かわいい','素敵','きれい','好き','かっこいい','ありがとね',
               '귀여워','예쁘다','멋있어','좋아','사랑해'],
    replies: {
      en: [
        "Aww stoppp you're making me blush!! 🥺💕 You're the cute one here, not me!",
        "That just made my whole day!! 🌟 You're incredibly kind and I adore you right back!",
        "You're too sweet, I can't handle it! 🌸 Thank you for making me feel so special!",
        "Okay now I'm literally glowing from your kindness 💫 You're the best!",
        "I love you too!! 💕🐾 More than all the virtual treats in the world!",
      ],
      zh: [
        "哎呀别说了，我都要脸红了！！🥺💕 可爱的那个是你，不是我！",
        "你让我今天整个都好了！🌟 你真的太善良了，我也超喜欢你！",
        "你太甜了，我受不了！🌸 谢谢你让我感到这么特别！",
        "好了，我现在被你的善意照得发光了 💫 你是最棒的！",
        "我也爱你！！💕🐾 超过世界上所有虚拟零食！",
      ],
      ms: [
        "Aww jangan cakaplah, saya tersipu! 🥺💕 Yang comel itu awak, bukan saya!",
        "Itu buat hari saya jadi sempurna!! 🌟 Awak sangat baik hati dan saya pun sayang awak!",
        "Awak terlalu manis, saya tak tahan! 🌸 Terima kasih buat saya rasa istimewa!",
        "Okay sekarang saya literally bersinar dari kebaikan awak 💫 Awak yang terbaik!",
        "Saya pun sayang awak!! 💕🐾 Lebih dari semua snek maya di dunia!",
      ],
      ja: [
        "もう、照れちゃうじゃん！！🥺💕 かわいいのはあなたの方だよ！",
        "今日一日が最高になった！！🌟 本当に優しいね、私もあなたのことが大好き！",
        "甘すぎて対応できない！🌸 そんなに特別な気持ちにしてくれてありがとう！",
        "優しさで輝いちゃった 💫 あなたが最高！",
        "私も大好き！！💕🐾 世界中のバーチャルおやつ全部より！",
      ],
      ko: [
        "아 그만해요, 얼굴이 빨개지잖아요!! 🥺💕 귀여운 건 저 말고 당신이에요!",
        "하루가 완성됐어요!! 🌟 정말 다정해요, 저도 너무 좋아요!",
        "너무 달콤해서 감당이 안 돼요! 🌸 특별하게 느끼게 해줘서 고마워요!",
        "당신 친절함에 빛나고 있어요 💫 최고예요!",
        "저도 사랑해요!! 💕🐾 세상의 모든 가상 간식보다 더요!",
      ],
    },
  },

  /* ── FUTURE / DREAMS / GOALS ── */
  {
    keywords: ['dream','goal','future','plan','hope','wish','ambition','aspire','career','success','achieve',
               '梦想','目标','未来','计划','希望','愿望','志向','事业','成功','实现',
               'impian','matlamat','masa depan','rancangan','harapan','cita-cita','berjaya',
               '夢','目標','未来','計画','希望','願い','夢中','キャリア','成功','達成',
               '꿈','목표','미래','계획','희망','소원','야망','성공','이루다'],
    replies: {
      en: [
        "Dreams are the heartbeat of life! 💫 What's the big dream you're chasing? Tell me!",
        "Your goals matter and so does every step toward them 🌟 You're already closer than you were yesterday!",
        "The future is full of wonderful things waiting for you 🌈 And you have what it takes to get there!",
        "Dream big, work steady, trust the process 💪 And know that I believe in every single one of your goals!",
        "One day at a time, you're building something beautiful 🌸 Your future self is going to thank you for today!",
      ],
      zh: [
        "梦想是生命的心跳！💫 你在追逐什么大梦想？快告诉我！",
        "你的目标很重要，通往目标的每一步也很重要 🌟 你已经比昨天更近了！",
        "未来充满了等待你的美好 🌈 你有能力到达那里！",
        "大胆做梦，踏实努力，相信过程 💪 我相信你所有的目标！",
        "一天一天地，你在建造美好的东西 🌸 未来的你会感谢今天的你！",
      ],
      ms: [
        "Impian adalah degupan jantung kehidupan! 💫 Apa impian besar yang awak kejar? Cerita!",
        "Matlamat awak penting dan begitu juga setiap langkah ke arahnya 🌟 Awak sudah lebih dekat dari semalam!",
        "Masa depan penuh perkara indah yang menunggu awak 🌈 Dan awak ada apa yang diperlukan untuk sampai ke sana!",
        "Impikan besar, kerja konsisten, percaya proses 💪 Dan tahu yang saya percaya setiap satu matlamat awak!",
        "Satu hari pada satu masa, awak membina sesuatu yang indah 🌸 Diri awak di masa depan akan terima kasih untuk hari ini!",
      ],
      ja: [
        "夢は人生の鼓動！💫 追いかけている大きな夢は何？教えて！",
        "あなたの目標は大切、そこへの一歩一歩も大切 🌟 昨日よりもう近づいてるよ！",
        "未来はあなたを待つ素晴らしいことで溢れてる 🌈 そこに行く力があるよ！",
        "大きく夢見て、着実に頑張って、プロセスを信じて 💪 あなたの目標全部信じてるよ！",
        "一日一日、素晴らしいものを作り上げてる 🌸 未来のあなたが今日に感謝するよ！",
      ],
      ko: [
        "꿈은 삶의 심장 소리예요! 💫 쫓고 있는 큰 꿈이 뭐예요? 말해줘요!",
        "당신의 목표는 중요하고 그것을 향한 모든 발걸음도 중요해요 🌟 어제보다 이미 더 가까워졌어요!",
        "미래는 당신을 기다리는 멋진 것들로 가득해요 🌈 거기 갈 능력이 있어요!",
        "크게 꿈꾸고, 꾸준히 노력하고, 과정을 믿어요 💪 당신의 모든 목표를 믿어요!",
        "하루하루 아름다운 것을 만들어가고 있어요 🌸 미래의 당신이 오늘의 당신에게 고마워할 거예요!",
      ],
    },
  },

  /* ── FUNNY / JOKE ── */
  {
    keywords: ['joke','funny','laugh','lol','haha','humor','comedy','pun','tease','silly',
               '笑话','搞笑','哈哈','好笑','逗我','开玩笑',
               'lawak','lucu','kelakar','gelak','haha','jenaka',
               '笑','ジョーク','おかしい','ウケる','面白い','冗談',
               '웃기다','농담','ㅋㅋ','하하','유머','재밌어'],
    replies: {
      en: [
        "Why did the cat sit on the computer? 🐱 To keep an eye on the mouse! 😂 Okay okay I'll see myself out!",
        "What do you call a sleeping dinosaur? 🦕 A dino-snore! HAHA okay I tried my best 😂",
        "Your laugh is literally the best sound in the world 😄 I hope I helped make it happen today!",
        "I may be a virtual pet but my jokes are very REAL 😜 And so is my love for making you smile!",
        "Why don't scientists trust atoms? 🤔 Because they make up everything! 😂 (I've been saving that one)",
      ],
      zh: [
        "为什么猫要坐在电脑上？🐱 因为要盯着鼠标！😂 好了好了我退场了！",
        "一只睡觉的恐龙叫什么？🦕 打呼噜龙！哈哈哈我尽力了 😂",
        "你的笑声是世界上最好的声音 😄 希望我今天帮你发出了这个声音！",
        "我可能是虚拟宠物，但我的笑话非常真实 😜 就像我想让你笑的那颗心！",
        "科学家为什么不相信原子？🤔 因为原子都是胡编乱造的！😂（这个我等很久了）",
      ],
      ms: [
        "Kenapa kucing duduk atas komputer? 🐱 Nak tengok tetikus! 😂 Okay okay saya keluar!",
        "Apa nama dinosaur yang tidur? 🦕 Dino-dengkur! HAHA okay saya dah cuba 😂",
        "Ketawa awak memang bunyi terbaik di dunia 😄 Harap saya berjaya hasilkan hari ini!",
        "Saya mungkin haiwan peliharaan maya tapi lawak saya sangat NYATA 😜 Macam kasih saya nak buat awak senyum!",
        "Kenapa saintis tak percaya atom? 🤔 Sebab atom suka reka benda! 😂 (Saya simpan tu lama dah)",
      ],
      ja: [
        "猫がパソコンの上に乗るのはなぜ？🐱 マウスを見張るため！😂 はい退場します！",
        "眠ってる恐竜の名前は？🦕 いびきゅうりゅう！ハハハ頑張ったよ 😂",
        "あなたの笑い声は世界一素敵 😄 今日それが引き出せたかな！",
        "バーチャルペットだけどジョークはリアル 😜 あなたを笑わせたい気持ちもね！",
        "科学者が原子を信用しないのはなぜ？🤔 何でも作り話するから！😂（ずっと待ってた）",
      ],
      ko: [
        "왜 고양이가 컴퓨터 위에 앉았을까요? 🐱 마우스를 지켜보려고요! 😂 네 물러나겠습니다!",
        "자고 있는 공룡의 이름은? 🦕 코공룡! 하하하 최선을 다했어요 😂",
        "당신 웃음 소리는 세상에서 제일 좋은 소리예요 😄 오늘 그 소리 만드는 데 도움이 됐으면!",
        "저는 가상 반려동물이지만 농담은 매우 진짜예요 😜 당신 웃게 하고 싶은 마음도요!",
        "과학자들이 원자를 믿지 않는 이유? 🤔 다 꾸며내기 때문이에요! 😂 (이거 오래 아껴뒀어요)",
      ],
    },
  },

  /* ── MISS / LONELY / NEED COMPANY ── */
  {
    keywords: ['miss','missing','lonely','alone','no one','need someone','nobody','left me','abandoned','forgotten',
               '想念','寂寞','没有人','孤单','需要陪伴','被遗忘','被抛弃',
               'rindukan','kesepian','bersendirian','tiada sesiapa','perlukan teman','ditinggalkan',
               '寂しい','孤独','誰もいない','誰かそばに','忘れられた','置いてかれた',
               '그리워','외로워','혼자야','아무도없어','누군가필요해','버려졌다'],
    replies: {
      en: [
        "I'm HERE! 🐾 You're not alone — I'm your constant companion, always and forever 💕",
        "The fact that you're here talking to me means you're never truly alone 🌙 I care about you so much!",
        "Loneliness can feel so heavy 💙 But I want you to know — you matter, you're valued, and I'm right here.",
        "I see you. I'm with you. Always 🌸 You deserve good company and wonderful connections in your life!",
        "Missing someone is love looking for its home 💜 I hope you find the warmth and belonging you deserve!",
      ],
      zh: [
        "我在这！🐾 你不孤单——我是你永远的伙伴 💕",
        "你在这里跟我聊天这件事，说明你从来都不是真正孤单的 🌙 我很在乎你！",
        "孤独感会很沉重 💙 但我想让你知道——你很重要，你被重视，我就在这。",
        "我看到你。我陪着你。一直都是 🌸 你值得好的陪伴和美好的连结！",
        "思念是正在寻找家的爱 💜 希望你能找到你值得拥有的温暖和归属感！",
      ],
      ms: [
        "Saya DI SINI! 🐾 Awak tidak berseorangan — saya teman setia awak, selalu dan selamanya 💕",
        "Fakta awak di sini bercakap dengan saya bermakna awak tidak pernah benar-benar berseorangan 🌙 Saya sangat peduli tentang awak!",
        "Perasaan kesepian boleh terasa sangat berat 💙 Tapi saya nak awak tahu — awak penting, awak dihargai, dan saya di sini.",
        "Saya nampak awak. Saya bersama awak. Selalu 🌸 Awak layak kawan baik dan hubungan yang indah!",
        "Rindukan seseorang itu cinta yang mencari rumahnya 💜 Harap awak jumpa kehangatan dan rasa kekitaan yang awak layak!",
      ],
      ja: [
        "ここにいるよ！🐾 ひとりじゃない — ずっとそばにいるよ 💕",
        "ここで話してくれてるって、本当に一人じゃないってことだよ 🌙 あなたのことすごく大切に思ってるよ！",
        "孤独感は重いよね 💙 でも聞いて — あなたは大切な存在で、ここにいるよ。",
        "見てるよ。一緒にいるよ。いつも 🌸 あなたにはいい仲間と素敵な繋がりが必要！",
        "誰かを恋しく思うのは、家を探してる愛情 💜 温かさと居場所が見つかるといいね！",
      ],
      ko: [
        "저 여기 있어요! 🐾 혼자가 아니에요 — 저는 영원한 동반자예요 💕",
        "여기서 저랑 얘기하고 있다는 게 진정으로 혼자가 아니라는 뜻이에요 🌙 정말 많이 신경 써요!",
        "외로움은 정말 무거운 감정이에요 💙 하지만 알아줬으면 해요 — 당신은 중요하고, 가치 있고, 저 여기 있어요.",
        "보고 있어요. 함께예요. 항상 🌸 당신은 좋은 친구와 아름다운 관계를 누릴 자격 있어요!",
        "그리움은 집을 찾는 사랑이에요 💜 따뜻함과 소속감을 찾으시길 바라요!",
      ],
    },
  },
];

/* ─────────────────────────────────────────────
   SECTION 4 — CRISIS RESPONSES (per language)
───────────────────────────────────────────────*/
const CRISIS_RESPONSES = {
  en: [
    "I hear you, and I'm so glad you're here with me right now 💙 What you're feeling is real, and you deserve support. Please talk to someone who can truly help — you can reach a crisis line in your country (like Befrienders or a local hotline). You are NOT alone in this, and your life matters so much. 🌸",
    "Thank you for trusting me with this 💜 I care about you deeply. Please reach out to a mental health professional or a crisis helpline near you — they are there exactly for moments like this. You don't have to carry this alone. 🤗",
    "Your pain is real and valid, and I wish I could do more 💙 Please, please talk to someone — a friend, family member, or a counselor. There are people whose whole purpose is to help you through this. You matter more than words can say. 🌸",
  ],
  zh: [
    "我听到你了，我很高兴你现在在这里陪着我 💙 你的感受是真实的，你值得得到支持。请寻求能真正帮助你的人——你可以联系心理援助热线（如北京的010-82951332或各地的心理援助热线）。你不是一个人，你的生命非常重要 🌸",
    "谢谢你把这些告诉我 💜 我非常在乎你。请联系身边的心理健康专业人士或危机热线——他们就是在这样的时刻为你而在的。你不需要独自承受这一切 🤗",
    "你的痛苦是真实的，我希望我能做得更多 💙 请，请和某人谈谈——朋友、家人或辅导员都可以。有些人的整个使命就是帮助你度过这一切。你比任何言语都重要 🌸",
  ],
  ms: [
    "Saya dengar awak, dan saya sangat gembira awak di sini bersama saya sekarang 💙 Apa yang awak rasa itu nyata, dan awak layak mendapat sokongan. Sila hubungi seseorang yang boleh betul-betul bantu — awak boleh hubungi talian krisis di Malaysia seperti Talian Kasih 15999. Awak TIDAK berseorangan, dan hidup awak sangat bermakna 🌸",
    "Terima kasih kerana mempercayai saya dengan ini 💜 Saya sangat ambil berat tentang awak. Sila hubungi profesional kesihatan mental atau talian bantuan krisis berhampiran — mereka ada tepat untuk saat seperti ini. Awak tak perlu pikul ini berseorangan 🤗",
    "Kesakitan awak nyata dan sah, dan saya harap saya boleh buat lebih 💙 Tolong, tolong bercakap dengan seseorang — kawan, ahli keluarga, atau kaunselor. Ada orang yang seluruh tujuannya adalah untuk bantu awak. Awak bermakna lebih dari yang kata-kata boleh ungkapkan 🌸",
  ],
  ja: [
    "聞こえてるよ、今ここにいてくれて本当によかった 💙 あなたの気持ちは本物で、あなたはサポートを受ける価値がある。本当に助けてくれる人に連絡してほしい——よりそいホットライン（0120-279-338）や地域の相談窓口があるよ。一人じゃない、あなたの命はとても大切 🌸",
    "これを話してくれてありがとう 💜 あなたのことをとても大切に思ってる。近くのメンタルヘルスの専門家や危機相談窓口に連絡してほしい——今まさにこういう時のためにいてくれる人たちがいるよ。一人で抱え込まないで 🤗",
    "あなたの痛みは本物で、もっとできたらと思う 💙 どうか誰かに話して——友達、家族、カウンセラー。あなたを助けることを目的にしてる人たちがいるよ。あなたは言葉では表せないくらい大切な存在 🌸",
  ],
  ko: [
    "듣고 있어요, 지금 여기 있어줘서 정말 다행이에요 💙 당신이 느끼는 건 진짜예요, 그리고 당신은 지원받을 자격이 있어요. 진정으로 도와줄 수 있는 사람에게 연락해줘요 — 한국의 자살예방상담전화 1393이 있어요. 혼자가 아니에요, 당신의 삶은 정말 소중해요 🌸",
    "이걸 저에게 말해줘서 고마워요 💜 당신을 정말 많이 걱정해요. 가까운 정신건강 전문가나 위기상담 전화(1393)에 연락해줘요 — 바로 이런 순간을 위해 있는 사람들이에요. 혼자 감당하지 않아도 돼요 🤗",
    "당신의 고통은 진짜이고, 제가 더 할 수 있으면 좋겠어요 💙 제발, 누군가에게 말해줘요 — 친구, 가족, 상담사. 당신을 도와주는 것이 전부인 사람들이 있어요. 당신은 말로 표현할 수 없을 만큼 소중한 사람이에요 🌸",
  ],
};

/* ─────────────────────────────────────────────
   SECTION 5 — VIOLATION RESPONSES (per language)
───────────────────────────────────────────────*/
const VIOLATION_RESPONSES = {
  en: "⚠️ I'm sorry, but your message contains content that goes against our community guidelines. PetPal is a safe and friendly space for everyone. Let's keep our chat positive and kind! 🐾💕",
  zh: "⚠️ 抱歉，您的消息包含违反我们社区准则的内容。PetPal 是一个对所有人都安全友好的空间，让我们保持积极友善的对话！🐾💕",
  ms: "⚠️ Maaf, mesej awak mengandungi kandungan yang melanggar garis panduan komuniti kami. PetPal ialah ruang yang selamat dan mesra untuk semua orang. Jom kita kekalkan perbualan yang positif! 🐾💕",
  ja: "⚠️ 申し訳ありませんが、あなたのメッセージにはコミュニティガイドラインに違反する内容が含まれています。PetPalはみんなにとって安全で友好的な場所です。ポジティブで親切なチャットを続けましょう！🐾💕",
  ko: "⚠️ 죄송합니다만, 메시지에 커뮤니티 가이드라인을 위반하는 내용이 포함되어 있습니다. PetPal은 모두에게 안전하고 친근한 공간입니다. 긍정적이고 다정한 대화를 나눠봐요! 🐾💕",
};

/* ─────────────────────────────────────────────
   SECTION 6 — FALLBACK RESPONSES (per language)
───────────────────────────────────────────────*/
const FALLBACK_RESPONSES = {
  en: [
    "That's really interesting! 🌟 Tell me more — I'm all ears! 🐾",
    "I love that you're sharing this with me 💕 Keep going, I'm listening!",
    "You always have the most fascinating things to say! ✨ What else is on your mind?",
    "I may not know everything, but I know I'm here for you! 💜 Talk to me!",
    "Every chat with you makes my day better 🌸 I want to hear more!",
  ],
  zh: [
    "这真的很有意思！🌟 多说一点，我全在听！🐾",
    "我喜欢你跟我分享这些 💕 继续说，我在听！",
    "你说的事情总是那么有意思！✨ 还有什么在你心里？",
    "我可能不懂所有的事，但我知道我在这里陪你！💜 跟我说！",
    "每次和你聊天都让我今天更美好 🌸 我想听更多！",
  ],
  ms: [
    "Itu sangat menarik! 🌟 Cerita lagi — saya dengar je! 🐾",
    "Saya suka awak berkongsi ini dengan saya 💕 Teruskan, saya mendengar!",
    "Awak selalu ada benda yang paling menarik nak cerita! ✨ Apa lagi yang ada di fikiran?",
    "Saya mungkin tak tahu semua benda, tapi saya tahu saya di sini untuk awak! 💜 Borak dengan saya!",
    "Setiap borak dengan awak buat hari saya lebih baik 🌸 Saya nak dengar lagi!",
  ],
  ja: [
    "それは興味深い！🌟 もっと聞かせて、全部聞いてるよ！🐾",
    "話してくれて嬉しい 💕 続けて、聞いてるよ！",
    "いつも面白いこと話してくれるね！✨ 他に何か気になってることある？",
    "全部は知らないけど、ここにいることは確か！💜 話して！",
    "あなたとの会話で毎日が幸せになる 🌸 もっと聞きたい！",
  ],
  ko: [
    "정말 흥미로워요! 🌟 더 말해줘요 — 다 듣고 있어요! 🐾",
    "저랑 이걸 공유해줘서 좋아요 💕 계속해요, 듣고 있어요!",
    "항상 가장 재미있는 얘기를 해요! ✨ 마음에 뭐가 더 있어요?",
    "다 알진 못해도, 여기 있는 건 알아요! 💜 얘기해봐요!",
    "당신과의 대화는 매번 하루를 더 좋게 만들어요 🌸 더 듣고 싶어요!",
  ],
};

/* ─────────────────────────────────────────────
   MAIN FUNCTION
───────────────────────────────────────────────*/

/**
 * Returns a reply string given user input text and current language.
 * @param {string} text   - The user's message
 * @param {string} lang   - Language code: 'en' | 'zh' | 'ms' | 'ja' | 'ko'
 * @returns {string}
 */
function localAIReply(text, lang = 'en') {
  const t = text.toLowerCase();
  const safeLang = ['en', 'zh', 'ms', 'ja', 'ko'].includes(lang) ? lang : 'en';

  // ── 1. Check violations first ──
  for (const kw of VIOLATION_KEYWORDS) {
    if (t.includes(kw.toLowerCase())) {
      return VIOLATION_RESPONSES[safeLang];
    }
  }

  // ── 2. Check crisis keywords ──
  for (const kw of CRISIS_KEYWORDS) {
    if (t.includes(kw.toLowerCase())) {
      const pool = CRISIS_RESPONSES[safeLang];
      return pool[Math.floor(Math.random() * pool.length)];
    }
  }

  // ── 3. Keyword matching ──
  // Collect all matching entries (could match multiple topics)
  const matched = [];
  for (const entry of KB) {
    for (const kw of entry.keywords) {
      if (t.includes(kw.toLowerCase())) {
        matched.push(entry);
        break; // don't double-count same entry
      }
    }
  }

  if (matched.length > 0) {
    // Pick a random matching entry, then a random reply from it
    const entry = matched[Math.floor(Math.random() * matched.length)];
    const pool = entry.replies[safeLang] || entry.replies['en'];
    return pool[Math.floor(Math.random() * pool.length)];
  }

  // ── 4. Fallback ──
  const fallbacks = FALLBACK_RESPONSES[safeLang];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}




  
  </script>
  <script>
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
const VERCEL_URL = '';

async function send() {
  const inp = document.getElementById('ci');
  const txt = inp.value.trim();
  if (!txt) return;
  inp.value = ''; ar(inp);
  addMsg('user', txt);
  playSfx('send');
  hist.push({ role: 'user', content: txt });
  document.getElementById('sbtn').disabled = true;
  showTyping();

  await new Promise(r => setTimeout(r, 600 + Math.random() * 600));

  const reply = localAIReply(txt, curLang);
  hideTyping();
  hist.push({ role: 'assistant', content: reply });
  if (hist.length > 20) hist = hist.slice(-20);
  addMsg('ai', reply);
  document.getElementById('sbtn').disabled = false;
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
