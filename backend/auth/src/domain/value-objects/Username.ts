export default class Username {
	value: string;

	constructor(readonly username: string) {
		if (!this.isValid(username)) {
		}
		this.value = username;
	}

	private isValid(username: string) {
		if (username && username.length > 4) {
			return true;
		}
		return false;
	}
}
