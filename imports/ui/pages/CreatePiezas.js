import { PureComponent } from "react";

class CreatePiezas extends PureComponent{
    constructor(props){
				super(props);
				this.state = {
					vendedor: "",
					precio: "",
					numeroDeSerie: "",
					tipo: "",
					open: false,
					message: "",
				};
		}
		
		render(){
			const {vendedor, precio, numeroDeSerie, tipo} = this.state;
			

		}
}