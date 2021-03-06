import { TSElement, unsafeCSS, html, customElementDefineHelper } from '@tradeshift/elements';
import css from './status.css';
import { STATUS_TYPE } from './utils/constants';

export class TSStatus extends TSElement {
	static get styles() {
		return [TSElement.styles, unsafeCSS(css)];
	}

	static get properties() {
		return {
			dir: { type: String, reflect: true },
			status: { type: String, reflect: true },
			text: { type: String, reflect: true }
		};
	}

	constructor() {
		super();
		this.status = '';
		this.text = '';
	}

	get direction() {
		return this.dir || this.bodyDir;
	}

	get statusClass() {
		switch (this.status.toLowerCase()) {
			case STATUS_TYPE.PRIMARY:
				return 'status-primary';
			case STATUS_TYPE.SUCCESS:
				return 'status-success';
			case STATUS_TYPE.ERROR:
				return 'status-error';
			case STATUS_TYPE.WARNING:
				return 'status-warning';
			case STATUS_TYPE.NEUTRAL:
				return 'status-neutral';
			default:
				return 'status-neutral';
		}
	}

	render() {
		return html`
			<span class="status ${this.statusClass}" dir=${this.direction}>
				${this.text || this.status}
			</span>
		`;
	}
}

customElementDefineHelper('ts-status', TSStatus);
