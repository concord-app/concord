class Channel {
	constructor(data, parent) {
		this.PARENT = parent;
		this.ID = data.id;
		this.PARENT_ID = data.parent_id;
		this.NAME = data.name;
		this.LAST_MESSAGE_ID = data.last_message_id;
	}

	getParent() {
		return this.PARENT;
	}

	getID() {
		return this.ID;
	}

	getParentID() {
		return this.PARENT_ID;
	}

	getName() {
		return this.NAME;
	}

	getLastMessageID() {
		return this.LAST_MESSAGE_ID;
	}
}

module.exports = Channel;