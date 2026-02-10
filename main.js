
class LottoGenerator extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <div class="lotto-numbers"></div>
      <button>Generate</button>
    `;

    shadow.appendChild(wrapper);

    // Link to the main stylesheet to inherit CSS variables
    const linkElem = document.createElement('link');
    linkElem.setAttribute('rel', 'stylesheet');
    linkElem.setAttribute('href', 'style.css');
    shadow.appendChild(linkElem);

    this.generateNumbers();

    shadow.querySelector('button').addEventListener('click', () => {
      this.generateNumbers();
    });
  }

  generateNumbers() {
    const numbersContainer = this.shadowRoot.querySelector('.lotto-numbers');
    numbersContainer.innerHTML = ''; // Clear previous numbers

    for (let i = 0; i < 5; i++) { // Generate 5 sets of numbers
      const lottoSet = document.createElement('div');
      lottoSet.classList.add('lotto-set');

      const numbers = new Set();
      while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
      }

      for (const number of [...numbers].sort((a, b) => a - b)) {
        const numberElement = document.createElement('div');
        numberElement.classList.add('lotto-number');
        numberElement.textContent = number;
        lottoSet.appendChild(numberElement);
      }
      numbersContainer.appendChild(lottoSet);
    }
  }
}

customElements.define('lotto-generator', LottoGenerator);

// Theme toggle logic
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Function to apply theme
    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    }

    // Check for saved theme preference or system preference
    let currentTheme = localStorage.getItem('theme');
    if (currentTheme === null) {
        // If no preference, check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            currentTheme = 'dark';
        } else {
            currentTheme = 'light';
        }
    }

    // Apply initial theme
    applyTheme(currentTheme);

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            applyTheme('light');
        } else {
            applyTheme('dark');
        }
    });
});
