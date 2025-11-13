const app = {
    calculator: createCalculator(),
    mode: 'calculator',
    theme: 'dark',
    displayElement: null,
    expressionElement: null,
    historyElement: null,
    tapeModal: null,
    tapeList: null,

    init() {
        this.displayElement = document.getElementById('display');
        this.expressionElement = document.getElementById('expression');
        this.historyElement = document.getElementById('history');
        this.tapeModal = document.getElementById('tapeModal');
        this.tapeList = document.getElementById('tapeList');
        
        this.loadTheme();
        this.setupButtons();
        this.setupModeToggle();
        this.setupThemeToggle();
        this.setupHistoryClear();
        this.setupTapeView();
        this.setupKeyboard();
        this.updateDisplay();
        this.updateHistory();
    },

    setupButtons() {
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const action = button.dataset.action;
                this.handleAction(action);
            });
        });
    },

    setupModeToggle() {
        const modeButtons = document.querySelectorAll('.mode-btn');
        modeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const mode = button.dataset.mode;
                this.setMode(mode);
            });
        });
    },

    setupThemeToggle() {
        const themeBtn = document.getElementById('themeToggle');
        themeBtn.addEventListener('click', () => {
            this.toggleTheme();
        });
    },

    setupHistoryClear() {
        const clearBtn = document.getElementById('clearHistory');
        clearBtn.addEventListener('click', () => {
            this.calculator.clearHistory();
            this.updateHistory();
        });
    },

    setupTapeView() {
        const tapeBtn = document.getElementById('tapeView');
        const closeTapeBtn = document.getElementById('closeTape');
        
        tapeBtn.addEventListener('click', () => {
            this.showTapeView();
        });
        
        closeTapeBtn.addEventListener('click', () => {
            this.hideTapeView();
        });
        
        this.tapeModal.addEventListener('click', (e) => {
            if (e.target === this.tapeModal) {
                this.hideTapeView();
            }
        });
    },

    setMode(mode) {
        this.mode = mode;
        
        const modeButtons = document.querySelectorAll('.mode-btn');
        modeButtons.forEach(btn => {
            const isActive = btn.dataset.mode === mode;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', isActive);
        });

        if (mode === 'calculator') {
            this.updateDisplay();
        }
    },

    toggleTheme() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        document.body.classList.toggle('light-theme', this.theme === 'light');
        
        const themeIcon = document.querySelector('.theme-icon');
        themeIcon.textContent = this.theme === 'dark' ? '☀️' : '🌙';
        
        localStorage.setItem('calculatorTheme', this.theme);
    },

    loadTheme() {
        const savedTheme = localStorage.getItem('calculatorTheme');
        if (savedTheme) {
            this.theme = savedTheme;
            document.body.classList.toggle('light-theme', this.theme === 'light');
            
            const themeIcon = document.querySelector('.theme-icon');
            themeIcon.textContent = this.theme === 'dark' ? '☀️' : '🌙';
        }
    },

    showTapeView() {
        this.updateTapeView();
        this.tapeModal.classList.add('show');
        this.tapeModal.setAttribute('aria-hidden', 'false');
    },

    hideTapeView() {
        this.tapeModal.classList.remove('show');
        this.tapeModal.setAttribute('aria-hidden', 'true');
    },

    updateTapeView() {
        const {history} = this.calculator;
        
        if (history.length === 0) {
            this.tapeList.innerHTML = '<div class="empty-history">No calculations in tape</div>';
            return;
        }

        this.tapeList.innerHTML = [...history].reverse().map((item, index) => `
            <div class="tape-item">
                <div class="tape-calc">
                    <div class="tape-expression">${item.expression}</div>
                    <div class="tape-result">= ${item.result}</div>
                </div>
                <button class="replay-btn" data-index="${history.length - 1 - index}" aria-label="Replay calculation">
                    ▶ Replay
                </button>
            </div>
        `).join('');

        const replayButtons = this.tapeList.querySelectorAll('.replay-btn');
        replayButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const index = parseInt(btn.dataset.index);
                this.replayCalculation(index);
            });
        });
    },

    replayCalculation(index) {
        const historyItem = this.calculator.history[index];
        if (historyItem) {
            this.hideTapeView();
            const result = this.calculator.replayCalculation(historyItem);
            if (result && !result.success) {
                this.showError(result.error);
            } else {
                this.updateHistory();
            }
            this.updateDisplay();
        }
    },

    handleAction(action) {
        const calc = this.calculator;

        if (action >= '0' && action <= '9') {
            calc.inputDigit(parseInt(action));
        } else if (action === '.') {
            calc.inputDecimal();
        } else if (['+', '-', '*', '/', '^'].includes(action)) {
            calc.chooseOperator(action);
        } else if (action === '=') {
            const isAidarMode = this.mode === 'aidar';
            const result = calc.evaluate(isAidarMode);
            
            if (!result.success) {
                this.showError(result.error);
                return;
            }
            this.updateHistory();
        } else if (action === 'C') {
            calc.clear();
        } else if (action === 'AC') {
            calc.allClear();
        } else if (action === 'backspace') {
            calc.backspace();
        } else if (action === 'percent') {
            calc.percent();
        } else if (action === 'negate') {
            calc.negate();
        } else if (action === 'sqrt') {
            const result = calc.sqrt();
            if (result && !result.success) {
                this.showError(result.error);
                return;
            }
            this.updateHistory();
        } else if (action === 'power') {
            calc.chooseOperator('^');
        }

        this.updateDisplay();
    },

    showError(message) {
        this.displayElement.textContent = message;
        this.displayElement.classList.add('error');
        this.expressionElement.textContent = '';
        
        setTimeout(() => {
            this.displayElement.classList.remove('error');
            this.calculator.allClear();
            this.updateDisplay();
        }, 2000);
    },

    updateDisplay() {
        const calc = this.calculator;
        this.displayElement.textContent = calc.current;
        this.expressionElement.textContent = calc.getCurrentExpression();
    },

    updateHistory() {
        const {history} = this.calculator;
        
        if (history.length === 0) {
            this.historyElement.innerHTML = '<div class="empty-history">No calculations yet</div>';
            return;
        }

        this.historyElement.innerHTML = history.map((item, index) => `
            <div class="history-item" data-index="${index}" tabindex="0" role="button" aria-label="Click to replay: ${item.expression}">
                <div class="history-expression">${item.expression}</div>
                <div class="history-result">= ${item.result}</div>
            </div>
        `).join('');

        const historyItems = this.historyElement.querySelectorAll('.history-item');
        historyItems.forEach(item => {
            item.addEventListener('click', () => {
                const index = parseInt(item.dataset.index);
                this.replayCalculation(index);
            });
            
            item.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    const index = parseInt(item.dataset.index);
                    this.replayCalculation(index);
                }
            });
        });
    },

    setupKeyboard() {
        document.addEventListener('keydown', (e) => {
            const key = e.key;
            
            if (this.tapeModal.classList.contains('show') && key === 'Escape') {
                this.hideTapeView();
                return;
            }
            
            if (key >= '0' && key <= '9') {
                this.handleAction(key);
            } else if (key === '.') {
                this.handleAction('.');
            } else if (['+', '-', '*', '/'].includes(key)) {
                this.handleAction(key);
            } else if (key === '^') {
                this.handleAction('^');
            } else if (key === 'Enter' || key === '=') {
                e.preventDefault();
                this.handleAction('=');
            } else if (key === 'Backspace') {
                e.preventDefault();
                this.handleAction('backspace');
            } else if (key === 'Escape') {
                this.handleAction('AC');
            } else if (key.toLowerCase() === 'c') {
                this.handleAction('C');
            } else if (key === '%') {
                this.handleAction('percent');
            }
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    app.init();
});