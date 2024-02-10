class move{
	constructor(enemy){
		this.intent = "??";
		this.master = enemy; // Will this reference properly?
		this.do = () => {
			this.master.health = 100000;
		}
	}

}