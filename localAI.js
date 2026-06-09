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

/* ─────────────────────────────────────────────
   HOW TO INTEGRATE INTO PetPal HTML
───────────────────────────────────────────────

1. Add this script before your closing </body> tag (or as a separate file):
   <script src="localAI.js"></script>

2. In your send() function, replace the entire try{} block with:

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

     // Small delay to simulate "thinking"
     await new Promise(r => setTimeout(r, 600 + Math.random() * 600));

     const reply = localAIReply(txt, curLang);
     hideTyping();
     hist.push({ role: 'assistant', content: reply });
     if (hist.length > 20) hist = hist.slice(-20);
     addMsg('ai', reply);
     document.getElementById('sbtn').disabled = false;
   }

3. Remove VERCEL_URL and the fetch logic — no longer needed!

───────────────────────────────────────────────*/
