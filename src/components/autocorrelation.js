import React, {Component} from 'react';
var API = require('../api_utls');
var GeneralStore = require('../stores/generalstore');
import { select, event } from 'd3-selection'
import { selectAll, sourceEvent, clientPoint} from 'd3-selection';
import {extent, max, bisector} from 'd3-array'
import {line, curveMonotoneX, area} from 'd3-shape'
import { scaleLinear, scaleTime,scale } from 'd3-scale'
import {timeFormat, parseTime} from 'd3-time-format'
import {format} from 'd3-format'
import {axisBottom, axisLeft} from 'd3-axis'


export default class AutoCorrelation extends Component {
	
	constructor(props){
		super(props);
		  let {elementWidth, elementHeight} = props;
      	  this.margin = {top: 5, right: 20, bottom: 30, left: 50};
	      this.xcorr = scaleLinear().range([0, elementWidth - this.margin.left - this.margin.right]);
	      this.ycorr = scaleLinear().range([elementHeight*0.26 - this.margin.top - this.margin.bottom, 0]);
	      this.state={
	          width: this.props.elementWidth,
	          height: this.props.elementHeight,
	          dataUpdated: false,
	          corrUpdated: false,
	          corrdata: null
      	  };
	}


  _onChange(){

	if(GeneralStore.getAutoCorrelation()!=null){
		let data = {
          autocorr: GeneralStore.getAutoCorrelation()
        };
        this.dataFromTSV(data);
	}

  }

   dataFromTSV(dat){

	    let corrdata = [];
	    for(let x=0; x<dat.autocorr.length; x++){
	        corrdata.push({autocorr: parseFloat(dat.autocorr[x].autocorr), tau: parseInt(dat.autocorr[x].tau) });
	    };
	    this.xcorr.domain([0, max(corrdata, function(d){ return d.tau; })])
	    this.ycorr.domain([0, max(corrdata, (d)=> (d.autocorr) )]);
	    this.setState({
	      corrdata: corrdata
	    });

  	}

	componentDidMount(){
    	window.addEventListener("resize", this.updateDimensions.bind(this));
    	GeneralStore.addChangeListener(this._onChange.bind(this));
	}

	componentWillUnmount(){
	     window.removeEventListener("resize", this.updateDimensions.bind(this));
	     GeneralStore.removeChangeListener(this._onChange.bind(this));
	}

	updateDimensions() {
	      this.setState({ 
	        width: window.innerWidth, 
	        height: window.innerHeight 
	      });
  	}

  	drawXAxisCorr(){

      select(this.refs.xcorr) 
      .call(this.xAxisCorr)
      .on('resize', this.resize);
  	}

	drawYAxisCorr(){
	      select(this.refs.ycorr)
	      .call(this.yAxisCorr)
	      .on('resize', this.resize);
	}

	get xAxisCorr(){
	    return axisBottom(this.xcorr).ticks(5);
	}

	get yAxisCorr(){
	    return axisLeft(this.ycorr).ticks(5);
	}

	get resize() {
	
	    this.xcorr = scaleLinear().range([0, this.state.width - this.margin.left - this.margin.right]);
	    this.ycorr = scaleLinear().range([this.state.height*0.26 - this.margin.top - this.margin.bottom, 0]);
	    this.xcorr.domain(extent(this.state.corrdata, (d)=> d.tau) );
	    this.ycorr.domain([0, max(this.state.corrdata, (d)=> (d.autocorr) )]);

	    select('.corrline')
	            .attr("d", this.lineCorr(this.state.corrdata) )
	    
  	} 

	get lineCorr(){
	      return line()
	          .x((d)=> (
	              this.xcorr(d.tau)
	            ))
	          .y((d)=> (
	              this.ycorr(d.autocorr)
	            ));
	 }

	lineCorrPath(){
	   return (<path className="corrline" d={this.lineCorr(this.state.corrdata)}/>);
	}

	render(){

		return(
			
		<svg width={this.state.width} height={this.state.height*0.26}>
	          <g transform={`translate(${this.margin.left}, ${this.margin.top})`}>
		              {this.state.corrdata ? this.lineCorrPath() : null}
		              <g ref="xcorr" className="x axis" transform={`translate(0, ${this.state.height*0.22})`}>
		                  {this.state.corrdata ? this.drawXAxisCorr() : null}
		              </g>
		              <g ref='ycorr' className="y axis">
		                  {this.state.corrdata ? this.drawYAxisCorr() : null}
		              </g>
	          </g>
        </svg>
 
		);
	}
}