export default class HeadImg{
	constructor(option ={}){
		this.img = option.img;
		this.x = option.x;
		this.y = option.y;
		this.context = option.context;


		this.render();

	}

	render(){


		this.context.drawImage(this.img,this.x,this.y,10,10);


	}




}