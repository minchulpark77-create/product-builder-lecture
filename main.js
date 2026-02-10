
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

    const style = document.createElement('style');
    style.textContent = `
      .lotto-numbers {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 2rem;
      }
      .lotto-number {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        background-color: #eee;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.5rem;
        font-weight: bold;
        color: #333;
      }
      button {
        background-color: #4CAF50;
        color: white;
        padding: 1rem 2rem;
        border: none;
        border-radius: 0.5rem;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.3s;
      }
      button:hover {
        background-color: #45a049;
      }
    `;
    shadow.appendChild(style);

    this.generateNumbers();

    shadow.querySelector('button').addEventListener('click', () => {
      this.generateNumbers();
    });
  }

  generateNumbers() {
    const numbersContainer = this.shadowRoot.querySelector('.lotto-numbers');
    numbersContainer.innerHTML = '';
    const numbers = new Set();

    while (numbers.size < 6) {
      numbers.add(Math.floor(Math.random() * 45) + 1);
    }

    for (const number of [...numbers].sort((a, b) => a - b)) {
      const numberElement = document.createElement('div');
      numberElement.classList.add('lotto-number');
      numberElement.textContent = number;
      numbersContainer.appendChild(numberElement);
    }
  }
}

customElements.define('lotto-generator', LottoGenerator);
