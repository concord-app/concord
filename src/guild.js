const Channel = require('./channel');

class Guild {
	constructor(data) {
		this.ID = data.id;
		this.NAME = data.name;
		this.CHANNELS = data.channels.map(data => new Channel(data, this));
	}

	getID() {
		return this.ID;
	}

	getName() {
		return this.NAME;
	}

	getChannels() {
		return this.CHANNELS;
	}

	getChannel(id) {
		return this.CHANNELS.find(channel => channel.getID() === id);
	}
}

module.exports = Guild;