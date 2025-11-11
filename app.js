const app = {
    calculator: createCalculator(),
    displayElement: null,

    init() {
        this.displayElement = document.querySelector('.display');
        this.setupButtons();
        this.updateDisplay();
    },

    setupButtons() {
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const text = button.textContent;
                this.handleInput(text);
            });
        });
    },

    handleInput(input) {
        if (input >= '0' && input <= '9') {
            this.calculator.inputDigit(parseInt(input));
        } else if (input === '.') {
            this.calculator.inputDecimal();
        } else if (['+', '-', '*', '/'].includes(input)) {
            this.calculator.chooseOperator(input);
        } else if (input === '=') {
            this.calculator.evaluate();
        }

        this.updateDisplay();
    },

    updateDisplay() {
        this.displayElement.textContent = this.calculator.current;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    app.init();
});