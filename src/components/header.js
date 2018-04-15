import React, {Component} from 'react';



export default class Header extends Component {
	
	constructor(){
		super();
		this.state={
			clicked: false,
            navClass: 'nav'
		};
	}
    
    componentDidMount() {
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    clickNav(){
        if(this.state.clicked===false){
                this.setState({
                        navClass: 'nav open',
                        clicked: true
                });
        } else {
                this.setState({
                        navClass: 'nav',
                        clicked: false
                });
        }



    }



    hashClicked(){

		    var x = document.getElementById("myTopnav");
		    if (x.className === "topnav") {
		        x.className += " responsive";
		    } else {
		        x.className = "topnav";
		    }



    }


    handleResize(e){
        this.setState({ windowWidth: window.innerWidth});
        if(this.state.windowWidth > 500) {
            this.setState({
                navClass: 'nav',
                clicked: false
            });
        }
    }
	render(){

		return(
			<header className="header">
				<h1>Kaneh Kings</h1>

                <div className="topnav" id="myTopnav">
          

          		 	<a href="javascript:void(0);" className="icon" onClick={this.hashClicked.bind(this)}>&#9776;</a>
            		
            		<div className="headeritems">
            		 <a href="#">Finance</a>

                     <a href="#">Computers</a>
        
                     <a href="#">Science</a>
                     </div>
  					
                </div>
			</header>
		);
	}

}