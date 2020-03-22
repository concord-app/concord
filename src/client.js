const EventEmitter = require('events');
const got = require('got');
const WebSocketClient = require('./wsclient');
const Guild = require('./guild');

class ConcordClient extends EventEmitter {
	constructor() {
		super();

		this.GUILDS = []
		this.FRIENDS = []

		this.TOKEN;

		this.URL_BASE = 'https://discordapp.com/api/v6';
		this.URL_LOGIN = 'auth/login';
		this.URL_2FA = 'auth/mfa/totp';

		this.API_CLIENT = got.extend({
			throwHttpErrors: false,
			prefixUrl: this.URL_BASE,
			headers: {
				'Content-Type': 'application/json',
			}
		});

		this.WS_CLIENT = new WebSocketClient();

		this.webSocket().on('connected', () => {
			this.webSocket().identify(this.TOKEN);
		});

		// Setup internal handlers for Discord dispatch events
		this.webSocket().on('d-ready', data => {
			const { guilds } = data;
			this.GUILDS = guilds.map(data => new Guild(data));
		});
	}

	webSocket() {
		return this.WS_CLIENT;
	}

	async login(email, password) {
		const response = await this.API_CLIENT.post(this.URL_LOGIN, {
			body: JSON.stringify({
				email, password
			})
		});

		const responseData = JSON.parse(response.body);

		if (responseData.mfa) {
			this.emit('2fa');
		} else {
			this.emit('loggedin');
		}

		this.ticket = responseData.ticket;
	}

	async mfa(code) {
		const response = await this.API_CLIENT.post(this.URL_2FA, {
			body: JSON.stringify({
				code,
				ticket: this.ticket
			})
		});

		const responseData = JSON.parse(response.body);

		this.TOKEN = responseData.token;

		this.emit('loggedin');
	}
}

module.exports = ConcordClient;