// ===== Data =====
const QUEST_TEMPLATES = [
    { id: 'walk', title: 'Marche matinale', desc: 'Fais une promenade de 15 minutes.', difficulty: 'easy', gold: 10, xp: 20, target: 1, icon: '&#x1F6B6;' },
    { id: 'water', title: 'Hydratation', desc: 'Bois 8 verres d\'eau dans la journée.', difficulty: 'easy', gold: 15, xp: 25, target: 8, icon: '&#x1F4A7;' },
    { id: 'read', title: 'Rat de bibliothèque', desc: 'Lis pendant 30 minutes.', difficulty: 'medium', gold: 25, xp: 40, target: 1, icon: '&#x1F4DA;' },
    { id: 'exercise', title: 'Entraînement intensif', desc: 'Fais 50 pompes au cours de la journée.', difficulty: 'medium', gold: 30, xp: 50, target: 50, icon: '&#x1F4AA;' },
    { id: 'meditate', title: 'Esprit serein', desc: 'Médite pendant 10 minutes.', difficulty: 'easy', gold: 15, xp: 30, target: 1, icon: '&#x1F9D8;' },
    { id: 'code', title: 'Session de code', desc: 'Écris du code pendant 1 heure.', difficulty: 'medium', gold: 35, xp: 55, target: 1, icon: '&#x1F4BB;' },
    { id: 'cook', title: 'Chef cuisinier', desc: 'Prépare un repas maison.', difficulty: 'medium', gold: 25, xp: 35, target: 1, icon: '&#x1F373;' },
    { id: 'steps', title: 'Marcheur infatigable', desc: 'Fais 10 000 pas.', difficulty: 'hard', gold: 50, xp: 80, target: 10000, icon: '&#x1F45F;' },
    { id: 'sleep', title: 'Couche-tôt', desc: 'Couche-toi avant 23h.', difficulty: 'easy', gold: 15, xp: 20, target: 1, icon: '&#x1F634;' },
    { id: 'nojunk', title: 'Alimentation saine', desc: 'Ne mange aucun junk food aujourd\'hui.', difficulty: 'hard', gold: 45, xp: 70, target: 1, icon: '&#x1F966;' },
    { id: 'journal', title: 'Journal intime', desc: 'Écris dans ton journal.', difficulty: 'easy', gold: 10, xp: 20, target: 1, icon: '&#x1F4DD;' },
    { id: 'stretch', title: 'Étirements', desc: 'Fais 15 minutes d\'étirements.', difficulty: 'easy', gold: 10, xp: 20, target: 1, icon: '&#x1F938;' },
    { id: 'noscreen', title: 'Détox digitale', desc: 'Passe 2 heures sans écran.', difficulty: 'hard', gold: 40, xp: 60, target: 1, icon: '&#x1F4F5;' },
    { id: 'learn', title: 'Apprendre quelque chose', desc: 'Apprends un fait nouveau ou une compétence.', difficulty: 'medium', gold: 30, xp: 45, target: 1, icon: '&#x1F4A1;' },
    { id: 'tidy', title: 'Ménage éclair', desc: 'Range et nettoie une pièce.', difficulty: 'medium', gold: 20, xp: 35, target: 1, icon: '&#x1F9F9;' },
    { id: 'social', title: 'Lien social', desc: 'Appelle ou vois un ami/proche.', difficulty: 'easy', gold: 15, xp: 25, target: 1, icon: '&#x1F91D;' },
    { id: 'legendary', title: 'Défi du champion', desc: 'Fais 100 burpees dans la journée.', difficulty: 'legendary', gold: 100, xp: 150, target: 100, icon: '&#x1F525;' },
    { id: 'creative', title: 'Création artistique', desc: 'Dessine, peins ou crée quelque chose.', difficulty: 'medium', gold: 30, xp: 45, target: 1, icon: '&#x1F3A8;' },
];

const SHOP_ITEMS = [
    { id: 'potion_xp', name: 'Potion d\'XP', desc: '+50 XP instantanément', price: 80, icon: '&#x1F9EA;', effect: 'xp', value: 50 },
    { id: 'shield', name: 'Bouclier de série', desc: 'Protège ta série 1 jour', price: 120, icon: '&#x1F6E1;', effect: 'streak_shield', value: 1 },
    { id: 'sword', name: 'Épée légendaire', desc: 'Objet de collection', price: 300, icon: '&#x2694;', effect: 'collectible', value: 0 },
    { id: 'crown', name: 'Couronne royale', desc: 'Objet de collection rare', price: 500, icon: '&#x1F451;', effect: 'collectible', value: 0 },
    { id: 'gem', name: 'Gemme mystique', desc: '+100 XP instantanément', price: 150, icon: '&#x1F48E;', effect: 'xp', value: 100 },
    { id: 'pet_dragon', name: 'Dragon miniature', desc: 'Compagnon de collection', price: 800, icon: '&#x1F409;', effect: 'collectible', value: 0 },
    { id: 'double_gold', name: 'Bourse dorée', desc: '+100 or instantanément', price: 200, icon: '&#x1F4B0;', effect: 'gold', value: 100 },
    { id: 'scroll', name: 'Parchemin ancien', desc: 'Objet de collection épique', price: 400, icon: '&#x1F4DC;', effect: 'collectible', value: 0 },
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
    lastPlayDate: null,
    dailyQuests: [],
    dailySeed: null,
    inventory: {},
};

let state = loadState();

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

// ===== Daily Quest Generation =====
function getTodaySeed() {
    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

function seededRandom(seed) {
    let h = 0;
    for (let i = 0; i < seed.length; i++) {
        h = Math.imul(31, h) + seed.charCodeAt(i) | 0;
    }
    return function () {
        h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
        h = Math.imul(h ^ (h >>> 13), 0x45d9f3b);
        h ^= h >>> 16;
        return (h >>> 0) / 4294967296;
    };
}

function generateDailyQuests() {
    const seed = getTodaySeed();

    // If quests for today already exist, restore them
    if (state.dailySeed === seed && state.dailyQuests.length > 0) {
        return state.dailyQuests;
    }

    // Update streak
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    if (state.lastPlayDate === yesterday) {
        state.streak++;
    } else if (state.lastPlayDate !== today) {
        state.streak = 1;
    }
    state.lastPlayDate = today;

    // Pick 6 random quests
    const rng = seededRandom(seed);
    const shuffled = [...QUEST_TEMPLATES].sort(() => rng() - 0.5);
    const selected = shuffled.slice(0, 6);

    state.dailyQuests = selected.map(q => ({
        ...q,
        progress: 0,
        completed: false,
        claimed: false,
    }));
    state.dailySeed = seed;
    saveState();

    return state.dailyQuests;
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
    }

    saveState();
    updateUI();
}

function addGold(amount) {
    state.gold += amount;
    state.totalGold += amount;
    saveState();
    updateUI();
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

    // Float animation
    floatGold(quest.gold);

    saveState();
    renderQuests();
}

// ===== Shop =====
function buyItem(itemId) {
    const item = SHOP_ITEMS.find(i => i.id === itemId);
    if (!item || state.gold < item.price) return;

    state.gold -= item.price;

    // Apply effect
    if (item.effect === 'xp') {
        addXp(item.value);
        showToast(`+${item.value} XP !`, 'xp', '\u2728');
    } else if (item.effect === 'gold') {
        addGold(item.value);
        showToast(`+${item.value} or !`, 'gold', '\u{1FA99}');
    } else {
        showToast(`${item.name} obtenu !`, 'success', '\u{1F381}');
    }

    // Add to inventory
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
    document.getElementById('total-xp-earned').textContent = state.totalXp.toLocaleString('fr-FR');

    // XP bar
    const pct = Math.min((state.xp / state.xpToNext) * 100, 100);
    document.getElementById('xp-bar').style.width = pct + '%';
    document.getElementById('xp-text').textContent = `${state.xp} / ${state.xpToNext} XP`;
}

function renderQuests() {
    const container = document.getElementById('daily-quests');
    container.innerHTML = '';

    state.dailyQuests.forEach((quest, index) => {
        const pct = Math.min((quest.progress / quest.target) * 100, 100);
        const card = document.createElement('div');
        card.className = `quest-card ${quest.claimed ? 'completed' : ''}`;
        card.innerHTML = `
            <span class="quest-difficulty ${quest.difficulty}">${getDifficultyLabel(quest.difficulty)}</span>
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
}

// ===== Init =====
function init() {
    generateDailyQuests();
    updateUI();
    renderQuests();
    renderShop();
    renderInventory();
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

document.addEventListener('DOMContentLoaded', init);
