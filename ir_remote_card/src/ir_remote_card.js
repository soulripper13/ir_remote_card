import { LitElement, html, css } from 'lit';
import styles from './styles.css' assert { type: 'css' };

class IRRemoteCard extends LitElement {
  static properties = {
    hass: {},
    config: {}
  };

  static styles = styles;

  firstUpdated() {
    // Load Font Awesome
    const faLink = document.createElement('link');
    faLink.rel = 'stylesheet';
    faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    this.shadowRoot.appendChild(faLink);

    // Add click handlers
    this.shadowRoot.querySelectorAll('button').forEach(button => {
      button.addEventListener('click', (e) => this._handleClick(e));
    });
  }

  _handleClick(event) {
    const script = event.currentTarget.dataset.script;
    if (this.hass && script) {
      this.hass.callService('script', 'turn_on', { entity_id: script });
    }
  }

  render() {
    return html`
      <div class="remote-body">
        <!-- Power & Settings Row -->
        <div class="button-row">
          <button id="ir_power" class="remote-button large" data-script="script.projector_power">
            <i class="fa-icon fas fa-power-off"></i>
          </button>
          <button id="ir_settings" class="remote-button large" data-script="script.projector_settings">
            <i class="fa-icon fas fa-cog"></i>
          </button>
        </div>

        <!-- D-Pad Section -->
        <div class="dpadContainer">
          ${['up', 'left', 'center', 'right', 'down'].map(direction => html`
            <button
              id="${direction}-button"
              class="remote-button ${direction === 'center' ? 'centerbutton' : 'dpadbutton'}"
              data-script="script.projector_${direction === 'center' ? 'ok' : direction}"
            >
              <i class="fa-icon ${this._getIcon(direction)}"></i>
            </button>
          `)}
        </div>

        <!-- Navigation Row -->
        <div class="button-row">
          <button id="ir_back" class="remote-button large" data-script="script.projector_back">
            <i class="fa-icon fas fa-arrow-left"></i>
          </button>
          <button id="ir_home" class="remote-button large" data-script="script.projector_home">
            <i class="fa-icon fas fa-home"></i>
          </button>
        </div>

        <!-- Spacer Rows -->
        ${Array(2).fill().map(() => html`<div class="button-row spacer"></div>`)}

        <!-- Volume/Focus Controls -->
        <div class="button-row">
          <button id="volume-up-button" class="remote-button large" data-script="script.projector_vol_up">
            <i class="fa-icon fas fa-volume-up"></i>
          </button>
          <button id="menu-button" class="remote-button large" data-script="script.projector_options">
            <i class="fa-icon fas fa-bars"></i>
          </button>
          <button id="focus-up" class="remote-button large" data-script="script.projector_focus_up">
            <i class="fa-icon fa-regular fa-square-plus"></i>
          </button>
        </div>

        <!-- Spacer Rows -->
        ${Array(2).fill().map(() => html`<div class="button-row spacer"></div>`)}

        <!-- Bottom Controls -->
        <div class="button-row">
          <button id="volume-down-button" class="remote-button large" data-script="script.projector_vol_down">
            <i class="fa-icon fas fa-volume-down"></i>
          </button>
          <button id="autofocus-button" class="remote-button large" data-script="script.projector_autofocus">
            <i class="fa-icon fas fa-expand"></i>
          </button>
          <button id="focus-down-button" class="remote-button large" data-script="script.projector_focus_down">
            <i class="fa-icon fa-regular fa-square-minus"></i>
          </button>
        </div>
      </div>
    `;
  }

  _getIcon(direction) {
    const icons = {
      up: 'fas fa-chevron-up',
      down: 'fas fa-chevron-down',
      left: 'fas fa-chevron-left',
      right: 'fas fa-chevron-right',
      center: 'far fa-circle'
    };
    return icons[direction];
  }

  getCardSize() {
    return 6;
  }
}

customElements.define('ir-remote-card', IRRemoteCard);
