// ===== Data =====
const QUEST_SUGGESTIONS = [
    { title: 'Marche matinale', desc: 'Fais une promenade de 15 minutes.', difficulty: 'easy', target: 1, icon: '\u{1F6B6}' },
    { title: 'Hydratation', desc: 'Bois 8 verres d\'eau.', difficulty: 'easy', target: 8, icon: '\u{1F4A7}' },
    { title: 'Rat de bibliothèque', desc: 'Lis pendant 30 minutes.', difficulty: 'medium', target: 1, icon: '\u{1F4DA}' },
    { title: 'Entraînement intensif', desc: 'Fais 50 pompes.', difficulty: 'medium', target: 50, icon: '\u{1F4AA}' },
    { title: 'Esprit serein', desc: 'Médite pendant 10 minutes.', difficulty: 'easy', target: 1, icon: '\u{1F9D8}' },
    { title: 'Session de code', desc: 'Code pendant 1 heure.', difficulty: 'medium', target: 1, icon: '\u{1F4BB}' },
    { title: 'Chef cuisinier', desc: 'Prépare un repas maison.', difficulty: 'medium', target: 1, icon: '\u{1F373}' },
    { title: 'Marcheur infatigable', desc: 'Fais 10 000 pas.', difficulty: 'hard', target: 10000, icon: '\u{1F45F}' },
    { title: 'Couche-tôt', desc: 'Couche-toi avant 23h.', difficulty: 'easy', target: 1, icon: '\u{1F634}' },
    { title: 'Alimentation saine', desc: 'Pas de junk food aujourd\'hui.', difficulty: 'hard', target: 1, icon: '\u{1F966}' },
    { title: 'Journal intime', desc: 'Écris dans ton journal.', difficulty: 'easy', target: 1, icon: '\u{1F4DD}' },
    { title: 'Étirements', desc: '15 minutes d\'étirements.', difficulty: 'easy', target: 1, icon: '\u{1F938}' },
    { title: 'Détox digitale', desc: '2 heures sans écran.', difficulty: 'hard', target: 1, icon: '\u{1F4F5}' },
    { title: 'Apprendre quelque chose', desc: 'Un fait ou une compétence.', difficulty: 'medium', target: 1, icon: '\u{1F4A1}' },
    { title: 'Ménage éclair', desc: 'Range une pièce.', difficulty: 'medium', target: 1, icon: '\u{1F9F9}' },
    { title: 'Lien social', desc: 'Appelle ou vois un proche.', difficulty: 'easy', target: 1, icon: '\u{1F91D}' },
    { title: 'Défi du champion', desc: '100 burpees dans la journée.', difficulty: 'legendary', target: 100, icon: '\u{1F525}' },
    { title: 'Création artistique', desc: 'Dessine ou crée quelque chose.', difficulty: 'medium', target: 1, icon: '\u{1F3A8}' },
];

const DIFFICULTY_REWARDS = {
    easy: { gold: 10, xp: 20 },
    medium: { gold: 25, xp: 40 },
    hard: { gold: 45, xp: 70 },
    legendary: { gold: 100, xp: 150 },
};

const BOSSES = [
    { name: 'Gobelin Furieux', icon: '\u{1F47A}', hp: 150, atk: 8, goldReward: 80, xpReward: 100 },
    { name: 'Squelette Guerrier', icon: '\u{1F480}', hp: 250, atk: 12, goldReward: 120, xpReward: 160 },
    { name: 'Loup Spectral', icon: '\u{1F43A}', hp: 300, atk: 15, goldReward: 150, xpReward: 200 },
    { name: 'Dragon Ancien', icon: '\u{1F409}', hp: 500, atk: 20, goldReward: 250, xpReward: 350 },
    { name: 'Liche Noire', icon: '\u{1F9D9}', hp: 400, atk: 25, goldReward: 300, xpReward: 400 },
    { name: 'Titan de Lave', icon: '\u{1F525}', hp: 600, atk: 18, goldReward: 280, xpReward: 380 },
    { name: 'Hydre des Abysses', icon: '\u{1F40D}', hp: 700, atk: 22, goldReward: 350, xpReward: 500 },
    { name: 'Roi Démon', icon: '\u{1F479}', hp: 1000, atk: 30, goldReward: 500, xpReward: 700 },
];

const SHOP_ITEMS = [
    { id: 'potion_xp', name: 'Potion d\'XP', desc: '+50 XP instantanément', price: 80, icon: '\u{1F9EA}', effect: 'xp', value: 50 },
    { id: 'shield', name: 'Bouclier de série', desc: 'Protège ta série 1 jour', price: 120, icon: '\u{1F6E1}', effect: 'streak_shield', value: 1 },
    { id: 'sword', name: 'Épée légendaire', desc: 'Objet de collection', price: 300, icon: '\u2694', effect: 'collectible', value: 0 },
    { id: 'crown', name: 'Couronne royale', desc: 'Objet de collection rare', price: 500, icon: '\u{1F451}', effect: 'collectible', value: 0 },
    { id: 'gem', name: 'Gemme mystique', desc: '+100 XP instantanément', price: 150, icon: '\u{1F48E}', effect: 'xp', value: 100 },
    { id: 'pet_dragon', name: 'Dragon miniature', desc: 'Compagnon de collection', price: 800, icon: '\u{1F409}', effect: 'collectible', value: 0 },
    { id: 'double_gold', name: 'Bourse dorée', desc: '+100 or instantanément', price: 200, icon: '\u{1F4B0}', effect: 'gold', value: 100 },
    { id: 'scroll', name: 'Parchemin ancien', desc: 'Objet de collection épique', price: 400, icon: '\u{1F4DC}', effect: 'collectible', value: 0 },
];

// ===== State =====
const DEFAULT_STATE = {
    gold: 0,
    xp: 0,
    level: 1,
    xpToNext: 100,
    questsCompleted: 0,
    streak: 0,
    totalGold: 0,
    totalXp: 0,
    bossesDefeated: 0,
    lastPlayDate: null,
    dailyQuests: [],
    dailySeed: null,
    inventory: {},
    nextBossLevel: 3,       // Boss appears at this level
    bossPending: false,      // True when boss is waiting to be fought
};

let state = loadState();

// Boss fight state (not persisted)
let bossState = null;

// ===== Persistence =====
function loadState() {
    try {
        const saved = localStorage.getItem('questboard_state');
        if (saved) {
            return { ...DEFAULT_STATE, ...JSON.parse(saved) };
        }
    } catch (e) {
        console.warn('Failed to load state', e);
    }
    return { ...DEFAULT_STATE };
}

function saveState() {
    localStorage.setItem('questboard_state', JSON.stringify(state));
}

// ===== Daily Reset Check =====
function getTodaySeed() {
    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

function checkDayReset() {
    const seed = getTodaySeed();
    if (state.dailySeed && state.dailySeed !== seed) {
        // New day: update streak, reset quests
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();

        if (state.lastPlayDate === yesterday) {
            state.streak++;
        } else if (state.lastPlayDate !== today) {
            state.streak = 1;
        }

        state.dailyQuests = [];
        state.bossDefeatedToday = false;
        state.dailySeed = seed;
        state.lastPlayDate = today;
        saveState();
    } else if (!state.dailySeed) {
        state.dailySeed = seed;
        state.lastPlayDate = new Date().toDateString();
        if (!state.streak) state.streak = 1;
        saveState();
    }
}

// ===== Custom Quest Management =====
function addCustomQuest() {
    const nameEl = document.getElementById('quest-name');
    const descEl = document.getElementById('quest-description');
    const targetEl = document.getElementById('quest-target');
    const diffEl = document.getElementById('quest-difficulty');
    const iconEl = document.getElementById('quest-icon');

    const name = nameEl.value.trim();
    const desc = descEl.value.trim();
    const target = parseInt(targetEl.value) || 1;
    const difficulty = diffEl.value;
    const icon = iconEl.value;

    if (!name) {
        showToast('Donne un nom à ta quête !', 'danger', '\u26A0');
        nameEl.focus();
        return;
    }

    const rewards = DIFFICULTY_REWARDS[difficulty];

    const quest = {
        id: 'custom_' + Date.now(),
        title: name,
        desc: desc || 'Quête personnalisée',
        difficulty,
        gold: rewards.gold,
        xp: rewards.xp,
        target,
        icon,
        progress: 0,
        completed: false,
        claimed: false,
    };

    state.dailyQuests.push(quest);
    saveState();

    // Reset form
    nameEl.value = '';
    descEl.value = '';
    targetEl.value = '1';

    showToast('Quête ajoutée !', 'success', '\u{1F4DC}');
    renderQuests();
    renderSuggestions();
}

function addSuggestedQuest(index) {
    const suggestion = QUEST_SUGGESTIONS[index];
    if (!suggestion) return;

    // Check if already added
    if (state.dailyQuests.some(q => q.title === suggestion.title && !q.claimed)) {
        showToast('Quête déjà ajoutée !', 'info', '\u2139');
        return;
    }

    const rewards = DIFFICULTY_REWARDS[suggestion.difficulty];

    const quest = {
        id: 'sug_' + Date.now(),
        title: suggestion.title,
        desc: suggestion.desc,
        difficulty: suggestion.difficulty,
        gold: rewards.gold,
        xp: rewards.xp,
        target: suggestion.target,
        icon: suggestion.icon,
        progress: 0,
        completed: false,
        claimed: false,
    };

    state.dailyQuests.push(quest);
    saveState();

    showToast(`${suggestion.icon} ${suggestion.title} ajoutée !`, 'success', '\u2705');
    renderQuests();
    renderSuggestions();
}

function removeQuest(index) {
    const quest = state.dailyQuests[index];
    if (quest && quest.claimed) return; // Can't remove completed
    state.dailyQuests.splice(index, 1);
    saveState();
    renderQuests();
    renderSuggestions();
}

// ===== XP & Level =====
function xpForLevel(level) {
    return Math.floor(100 * Math.pow(1.3, level - 1));
}

function addXp(amount) {
    state.xp += amount;
    state.totalXp += amount;

    while (state.xp >= state.xpToNext) {
        state.xp -= state.xpToNext;
        state.level++;
        state.xpToNext = xpForLevel(state.level);
        state.gold += 50;
        state.totalGold += 50;
        showLevelUp(state.level);

        // Check if boss should appear at this level
        if (state.level >= state.nextBossLevel) {
            state.bossPending = true;
        }
    }

    saveState();
    updateUI();
    updateBossBanner();
}

function addGold(amount) {
    state.gold += amount;
    state.totalGold += amount;
    saveState();
    updateUI();
    renderShop();
}

// ===== Quest Actions =====
function progressQuest(index) {
    const quest = state.dailyQuests[index];
    if (!quest || quest.completed) return;

    if (quest.target === 1) {
        quest.progress = 1;
    } else {
        quest.progress = Math.min(quest.progress + Math.ceil(quest.target * 0.2), quest.target);
    }

    if (quest.progress >= quest.target) {
        quest.completed = true;
    }

    saveState();
    renderQuests();
}

function claimReward(index) {
    const quest = state.dailyQuests[index];
    if (!quest || !quest.completed || quest.claimed) return;

    quest.claimed = true;
    state.questsCompleted++;

    showToast(`+${quest.gold}`, 'gold', '\u{1FA99}');
    setTimeout(() => showToast(`+${quest.xp} XP`, 'xp', '\u2B50'), 300);

    addGold(quest.gold);
    addXp(quest.xp);
    floatGold(quest.gold);

    saveState();
    renderQuests();
}

// ===== Boss System =====
function updateBossBanner() {
    const banner = document.getElementById('boss-banner');
    const bossInfo = document.getElementById('boss-banner-level');

    if (state.bossPending) {
        banner.classList.remove('hidden');
        if (bossInfo) bossInfo.textContent = `Niveau ${state.nextBossLevel}`;
    } else {
        banner.classList.add('hidden');
    }
}

function getBossForLevel() {
    // Pick a boss based on nextBossLevel
    const bossNum = Math.floor(state.nextBossLevel / 3); // 1, 2, 3...
    const bossIndex = Math.min(bossNum - 1, BOSSES.length - 1);
    const base = BOSSES[bossIndex];

    // Scale with player level
    const scale = 1 + (state.level - 1) * 0.18;
    return {
        ...base,
        hp: Math.floor(base.hp * scale),
        maxHp: Math.floor(base.hp * scale),
        atk: Math.floor(base.atk * scale),
        goldReward: Math.floor(base.goldReward * scale),
        xpReward: Math.floor(base.xpReward * scale),
    };
}

function startBossFight() {
    if (!state.bossPending) return;

    const boss = getBossForLevel();
    const playerMaxHp = 80 + state.level * 20;

    bossState = {
        boss,
        playerHp: playerMaxHp,
        playerMaxHp,
        specialUsed: false,
        defendNext: false,
        turn: 0,
    };

    // Setup UI
    document.getElementById('boss-name').textContent = boss.name;
    document.getElementById('boss-subtitle').textContent = `Boss de niveau ${state.nextBossLevel}`;
    document.getElementById('boss-sprite').textContent = boss.icon;
    document.getElementById('boss-hp-text').textContent = `${boss.hp} / ${boss.maxHp}`;
    document.getElementById('boss-hp-bar').style.width = '100%';
    document.getElementById('player-hp-text').textContent = `${playerMaxHp} / ${playerMaxHp}`;
    document.getElementById('player-hp-bar').style.width = '100%';
    document.getElementById('boss-combat-log').innerHTML = '';
    document.getElementById('boss-arena').style.display = 'block';
    document.getElementById('boss-result').classList.add('hidden');
    document.getElementById('boss-attack-btn').disabled = false;
    document.getElementById('boss-defend-btn').disabled = false;
    document.getElementById('boss-special-btn').disabled = false;

    addCombatLog(`${boss.icon} ${boss.name} apparaît ! (${boss.hp} PV, ${boss.atk} ATK)`, 'info');
    addCombatLog(`Votre or en jeu : ${state.gold} \u{1FA99}`, 'info');
    addCombatLog('Choisissez votre action !', 'info');

    document.getElementById('boss-modal').classList.remove('hidden');
}

function addCombatLog(text, type) {
    const log = document.getElementById('boss-combat-log');
    const line = document.createElement('div');
    line.className = `log-${type}`;
    line.textContent = text;
    log.appendChild(line);
    log.scrollTop = log.scrollHeight;
}

function disableActions() {
    document.getElementById('boss-attack-btn').disabled = true;
    document.getElementById('boss-defend-btn').disabled = true;
    document.getElementById('boss-special-btn').disabled = true;
}

function enableActions() {
    document.getElementById('boss-attack-btn').disabled = false;
    document.getElementById('boss-defend-btn').disabled = false;
    document.getElementById('boss-special-btn').disabled = !bossState.specialUsed ? false : true;
}

function updateBossUI() {
    const b = bossState.boss;
    const hpPct = Math.max(0, (b.hp / b.maxHp) * 100);
    document.getElementById('boss-hp-bar').style.width = hpPct + '%';
    document.getElementById('boss-hp-text').textContent = `${Math.max(0, b.hp)} / ${b.maxHp}`;

    const pHpPct = Math.max(0, (bossState.playerHp / bossState.playerMaxHp) * 100);
    document.getElementById('player-hp-bar').style.width = pHpPct + '%';
    document.getElementById('player-hp-text').textContent = `${Math.max(0, bossState.playerHp)} / ${bossState.playerMaxHp}`;
}

function bossAttack() {
    if (!bossState) return;
    disableActions();

    const baseDmg = 15 + state.level * 3;
    const dmg = baseDmg + Math.floor(Math.random() * 10);
    bossState.boss.hp -= dmg;

    addCombatLog(`\u2694 Vous attaquez pour ${dmg} dégâts !`, 'player');
    document.getElementById('boss-sprite').classList.add('hit');
    setTimeout(() => document.getElementById('boss-sprite').classList.remove('hit'), 300);

    updateBossUI();

    if (bossState.boss.hp <= 0) {
        setTimeout(() => bossVictory(), 600);
        return;
    }

    bossState.defendNext = false;
    setTimeout(() => bossTurn(), 800);
}

function bossDefend() {
    if (!bossState) return;
    disableActions();

    bossState.defendNext = true;
    addCombatLog('\u{1F6E1} Vous vous mettez en garde ! (dégâts réduits de 50%)', 'player');
    document.getElementById('boss-sprite').classList.add('defend-anim');
    setTimeout(() => document.getElementById('boss-sprite').classList.remove('defend-anim'), 400);

    setTimeout(() => bossTurn(), 600);
}

function bossSpecial() {
    if (!bossState || bossState.specialUsed) return;
    disableActions();

    bossState.specialUsed = true;
    const dmg = 30 + state.level * 5 + Math.floor(Math.random() * 20);
    bossState.boss.hp -= dmg;

    addCombatLog(`\u{2728} Attaque spéciale ! ${dmg} dégâts critiques !`, 'player');
    document.getElementById('boss-sprite').classList.add('hit');
    setTimeout(() => document.getElementById('boss-sprite').classList.remove('hit'), 300);

    updateBossUI();

    if (bossState.boss.hp <= 0) {
        setTimeout(() => bossVictory(), 600);
        return;
    }

    bossState.defendNext = false;
    setTimeout(() => bossTurn(), 800);
}

function bossTurn() {
    if (!bossState) return;

    const boss = bossState.boss;
    const roll = Math.random();

    if (roll < 0.2) {
        // Boss misses
        addCombatLog(`${boss.icon} ${boss.name} rate son attaque !`, 'boss');
    } else {
        let dmg = boss.atk + Math.floor(Math.random() * 8);
        if (bossState.defendNext) {
            dmg = Math.floor(dmg * 0.5);
            addCombatLog(`${boss.icon} ${boss.name} attaque ! ${dmg} dégâts (bloqué)`, 'boss');
        } else {
            addCombatLog(`${boss.icon} ${boss.name} attaque pour ${dmg} dégâts !`, 'boss');
        }
        bossState.playerHp -= dmg;
    }

    bossState.defendNext = false;
    bossState.turn++;
    updateBossUI();

    if (bossState.playerHp <= 0) {
        setTimeout(() => bossDefeat(), 600);
        return;
    }

    enableActions();
}

function bossVictory() {
    const boss = bossState.boss;
    state.bossesDefeated = (state.bossesDefeated || 0) + 1;
    state.bossPending = false;
    state.nextBossLevel = state.nextBossLevel + 3; // Next boss in 3 levels

    document.getElementById('boss-arena').style.display = 'none';
    document.getElementById('boss-result').classList.remove('hidden');
    document.getElementById('boss-result-icon').textContent = '\u{1F3C6}';
    document.getElementById('boss-result-title').textContent = `${boss.name} vaincu !`;
    document.getElementById('boss-result-title').style.color = 'var(--accent-glow)';
    document.getElementById('boss-result-rewards').innerHTML =
        `+${boss.goldReward} \u{1FA99} Or &nbsp;&nbsp; +${boss.xpReward} \u2B50 XP<br><small>Prochain boss au niveau ${state.nextBossLevel}</small>`;

    addGold(boss.goldReward);
    addXp(boss.xpReward);
    saveState();
    updateBossBanner();
}

function bossDefeat() {
    const boss = bossState.boss;
    const lostGold = state.gold;

    // Lose ALL gold
    state.gold = 0;

    // Boss comes back 1 level later (not now, must level up once)
    state.bossPending = false;
    state.nextBossLevel = state.level + 1; // Retry after gaining 1 level

    document.getElementById('boss-arena').style.display = 'none';
    document.getElementById('boss-result').classList.remove('hidden');
    document.getElementById('boss-result-icon').textContent = '\u{1F480}';
    document.getElementById('boss-result-title').textContent = 'Défaite...';
    document.getElementById('boss-result-title').style.color = 'var(--danger)';
    document.getElementById('boss-result-rewards').innerHTML =
        `<span style="color:var(--danger)">-${lostGold} \u{1FA99} Tout votre or est perdu !</span><br>` +
        `<small>${boss.name} reviendra au niveau ${state.nextBossLevel}.</small><br>` +
        `<small>Gagnez de l'XP pour monter de niveau et retenter votre chance !</small>`;

    saveState();
    updateUI();
    updateBossBanner();
    renderShop();
}

function closeBoss() {
    document.getElementById('boss-modal').classList.add('hidden');
    bossState = null;
    updateUI();
    updateBossBanner();
}

// ===== Shop =====
function buyItem(itemId) {
    const item = SHOP_ITEMS.find(i => i.id === itemId);
    if (!item || state.gold < item.price) return;

    state.gold -= item.price;

    if (item.effect === 'xp') {
        addXp(item.value);
        showToast(`+${item.value} XP !`, 'xp', '\u2728');
    } else if (item.effect === 'gold') {
        addGold(item.value);
        showToast(`+${item.value} or !`, 'gold', '\u{1FA99}');
    } else {
        showToast(`${item.name} obtenu !`, 'success', '\u{1F381}');
    }

    state.inventory[item.id] = (state.inventory[item.id] || 0) + 1;

    saveState();
    updateUI();
    renderShop();
    renderInventory();
}

// ===== UI Rendering =====
function updateUI() {
    document.getElementById('player-level').textContent = state.level;
    document.getElementById('gold-amount').textContent = state.gold.toLocaleString('fr-FR');
    document.getElementById('quests-completed').textContent = state.questsCompleted;
    document.getElementById('current-streak').textContent = state.streak;
    document.getElementById('total-gold-earned').textContent = state.totalGold.toLocaleString('fr-FR');
    document.getElementById('bosses-defeated').textContent = state.bossesDefeated || 0;

    const pct = Math.min((state.xp / state.xpToNext) * 100, 100);
    document.getElementById('xp-bar').style.width = pct + '%';
    document.getElementById('xp-text').textContent = `${state.xp} / ${state.xpToNext} XP`;
}

function renderQuests() {
    const container = document.getElementById('daily-quests');
    container.innerHTML = '';

    if (state.dailyQuests.length === 0) {
        container.innerHTML = `
            <div class="empty-quests">
                <p>\u{1F4DC} Aucune quête pour l'instant.</p>
                <p>Ajoutez des quêtes ci-dessus ou choisissez une suggestion !</p>
            </div>`;
        document.getElementById('quest-count').textContent = '0 quête(s)';
        return;
    }

    document.getElementById('quest-count').textContent =
        `${state.dailyQuests.filter(q => q.claimed).length} / ${state.dailyQuests.length} terminée(s)`;

    state.dailyQuests.forEach((quest, index) => {
        const pct = Math.min((quest.progress / quest.target) * 100, 100);
        const card = document.createElement('div');
        card.className = `quest-card ${quest.claimed ? 'completed' : ''}`;
        card.innerHTML = `
            <div class="quest-card-header">
                <span class="quest-difficulty ${quest.difficulty}">${getDifficultyLabel(quest.difficulty)}</span>
                ${!quest.claimed ? `<button class="quest-delete" onclick="removeQuest(${index})" title="Supprimer">\u2715</button>` : ''}
            </div>
            <div class="quest-title">${quest.icon} ${quest.title}</div>
            <div class="quest-desc">${quest.desc}</div>
            <div class="quest-rewards">
                <span class="quest-reward gold">\u{1FA99} ${quest.gold} or</span>
                <span class="quest-reward xp">\u2B50 ${quest.xp} XP</span>
            </div>
            <div class="quest-progress-container">
                <div class="quest-progress-bar" style="width:${pct}%"></div>
            </div>
            <div class="quest-progress-text">${quest.progress} / ${quest.target}</div>
            ${quest.claimed
                ? '<button class="btn btn-success" disabled>\u2713 Terminée</button>'
                : quest.completed
                    ? `<button class="btn btn-success" onclick="claimReward(${index})">Récupérer la récompense</button>`
                    : `<button class="btn btn-primary" onclick="progressQuest(${index})">Progresser</button>`
            }
        `;
        container.appendChild(card);
    });
}

function renderSuggestions() {
    const container = document.getElementById('suggested-quests-list');
    container.innerHTML = '';

    // Show today's suggestions (pick 6 based on day seed)
    const seed = getTodaySeed();
    let h = 0;
    for (let i = 0; i < seed.length; i++) {
        h = Math.imul(31, h) + seed.charCodeAt(i) | 0;
    }
    const rng = function () {
        h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
        h = Math.imul(h ^ (h >>> 13), 0x45d9f3b);
        h ^= h >>> 16;
        return (h >>> 0) / 4294967296;
    };

    const indices = [];
    const pool = [...Array(QUEST_SUGGESTIONS.length).keys()];
    for (let i = 0; i < 8 && pool.length > 0; i++) {
        const pick = Math.floor(rng() * pool.length);
        indices.push(pool.splice(pick, 1)[0]);
    }

    indices.forEach(idx => {
        const sug = QUEST_SUGGESTIONS[idx];
        const alreadyAdded = state.dailyQuests.some(q => q.title === sug.title && !q.claimed);

        const chip = document.createElement('button');
        chip.className = `suggested-chip ${alreadyAdded ? 'used' : ''}`;
        chip.textContent = `${sug.icon} ${sug.title}`;
        chip.onclick = () => addSuggestedQuest(idx);
        container.appendChild(chip);
    });
}

function renderShop() {
    const container = document.getElementById('shop-items');
    container.innerHTML = '';

    SHOP_ITEMS.forEach(item => {
        const canAfford = state.gold >= item.price;
        const card = document.createElement('div');
        card.className = 'shop-card';
        card.innerHTML = `
            <span class="shop-item-icon">${item.icon}</span>
            <div class="shop-item-name">${item.name}</div>
            <div class="shop-item-desc">${item.desc}</div>
            <div class="shop-item-price">\u{1FA99} ${item.price}</div>
            <button class="btn-buy" ${canAfford ? '' : 'disabled'} onclick="buyItem('${item.id}')">
                ${canAfford ? 'Acheter' : 'Pas assez d\'or'}
            </button>
        `;
        container.appendChild(card);
    });
}

function renderInventory() {
    const container = document.getElementById('inventory');
    const items = Object.entries(state.inventory);

    if (items.length === 0) {
        container.innerHTML = '<p class="empty-inventory">Aucun objet pour l\'instant. Visitez la boutique !</p>';
        return;
    }

    container.innerHTML = '';
    items.forEach(([id, count]) => {
        const item = SHOP_ITEMS.find(i => i.id === id);
        if (!item) return;

        const el = document.createElement('div');
        el.className = 'inventory-item';
        el.innerHTML = `
            <span class="inventory-item-icon">${item.icon}</span>
            <div class="inventory-item-name">${item.name}</div>
            <div class="inventory-item-count">x${count}</div>
        `;
        container.appendChild(el);
    });
}

function getDifficultyLabel(diff) {
    const labels = { easy: 'Facile', medium: 'Moyen', hard: 'Difficile', legendary: 'Légendaire' };
    return labels[diff] || diff;
}

// ===== Toasts =====
function showToast(message, type, icon) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span class="toast-icon">${icon}</span><span class="toast-message">${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// ===== Level Up =====
function showLevelUp(level) {
    const modal = document.getElementById('level-up-modal');
    document.getElementById('new-level').textContent = level;
    modal.classList.remove('hidden');

    document.getElementById('close-level-up').onclick = () => {
        modal.classList.add('hidden');
    };
}

// ===== Gold Float Animation =====
function floatGold(amount) {
    const el = document.createElement('div');
    el.className = 'gold-float';
    el.textContent = `+${amount} \u{1FA99}`;
    el.style.left = Math.random() * (window.innerWidth - 100) + 50 + 'px';
    el.style.top = Math.random() * 200 + 200 + 'px';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1200);
}

// ===== Countdown Timer =====
function updateCountdown() {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const diff = tomorrow - now;
    const h = String(Math.floor(diff / 3600000)).padStart(2, '0');
    const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
    const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');

    document.getElementById('countdown-timer').textContent = `${h}:${m}:${s}`;

    // Check for day reset
    checkDayReset();
}

// ===== Init =====
function init() {
    checkDayReset();
    updateUI();
    renderQuests();
    renderSuggestions();
    renderShop();
    renderInventory();
    updateBossBanner();
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

document.addEventListener('DOMContentLoaded', init);
