let money = 0;
let upgrades = {
    upgrade1: { cost: 10, level: 0, autoIncome: 1 },
    upgrade2: { cost: 50, level: 0, autoIncome: 5 },
    upgrade3: { cost: 100, level: 0, autoIncome: 10 },
    upgrade4: { cost: 500, level: 0, autoIncome: 20 },
    upgrade5: { cost: 2000, level: 0, autoIncome: 50 },
    };

function loadGame() {
    if (localStorage.getItem('money')) {
        money = parseInt(localStorage.getItem('money'));
    }

    if (localStorage.getItem('upgrades')) {
        upgrades = JSON.parse(localStorage.getItem('upgrades'));
    }

    updateMoneyDisplay();
    updateCurrentUpgrades();
}

function saveGame() {
    localStorage.setItem('money', money);
    localStorage.setItem('upgrades', JSON.stringify(upgrades));
}

document.getElementById('clicker-image').addEventListener('click', function() {
    money += 1;
    updateMoneyDisplay();
    saveGame();
});

Object.keys(upgrades).forEach(function(upgradeKey) {
    document.getElementById(upgradeKey).addEventListener('click', function() {
        let upgrade = upgrades[upgradeKey];
        if (money >= upgrade.cost) {
            money -= upgrade.cost;
            upgrade.level += 1;
            upgrade.cost = Math.floor(upgrade.cost * 1.5);
            activateAutoIncome(upgrade);
            updateMoneyDisplay();
            updateCurrentUpgrades();
            saveGame();
        }
    });
});

function activateAutoIncome(upgrade) {
    setInterval(() => {
        money += upgrade.autoIncome * upgrade.level;
        updateMoneyDisplay();
        saveGame();
    }, 1000);
}

function updateMoneyDisplay() {
    document.getElementById('money').textContent = `Rahaa: $${money}`;
}

function updateCurrentUpgrades() {
    let currentUpgradesDiv = document.getElementById('current-upgrades');
    currentUpgradesDiv.innerHTML = '';

    Object.keys(upgrades).forEach(function(upgradeKey) {
        let upgrade = upgrades[upgradeKey];
        if (upgrade.level > 0) {
            let upgradeElement = document.createElement('p');
            upgradeElement.textContent = `${upgradeKey.replace('upgrade', 'Päivitys ')} - Taso: ${upgrade.level}`;
            currentUpgradesDiv.appendChild(upgradeElement);
        }
    });
}

loadGame();
