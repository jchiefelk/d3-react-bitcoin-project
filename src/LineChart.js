import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './line-chart.css';
import { select, event } from 'd3-selection'
import { selectAll, sourceEvent, clientPoint } from 'd3-selection';
import {extent, max, bisector} from 'd3-array'
import {line} from 'd3-shape'
import { scaleLinear, scaleTime } from 'd3-scale'
import {timeFormat} from 'd3-time-format'
import {format} from 'd3-format'
import {axisBottom, axisLeft} from 'd3-axis'
import {brushX} from 'd3-brush'
//import {mouse as sourceEvent} from 'd3-selection';

class LineChart extends Component {

  constructor(props){
    super(props);
      let {elementWidth, elementHeight} = props;
      this.margin = {top: 30, right: 20, bottom: 30, left: 50};
      this.x = scaleTime().range([0, elementWidth - this.margin.left - this.margin.right]);
      this.y = scaleLinear().range([elementHeight - this.margin.top - this.margin.bottom, 0]);
      this.x2 =  scaleTime().range([0, elementWidth - this.margin.left - this.margin.right]);
      this.y2 = scaleLinear().range([150 - this.margin.top - this.margin.bottom, 0]);



      this.elementWidth = elementWidth;
      this.elementHeight = elementHeight;
      this.state = {
          data: null
      };

      this.width = 960 - this.margin.left - this.margin.right;
      this.height = 500 - this.margin.top - this.margin.bottom;
      this.parseDate = timeFormat("%d-%b-%y").parse;
      this.bisectDate = bisector(function(d) { 
       // console.log(d.close);
        return d.date; 
      }).left;
      this.formatValue = format(",.2f");
     //  this.formatCurrency = function(d) { return "$" + formatValue(d); };
  }

  componentWillMount(){
      // this.dataFromTSV();
    let history_data = null;
    fetch('https://www.quandl.com/api/v3/datasets/BCHARTS/BITSTAMPUSD.json?api_key=oaWPkjrfz_aQmyPmE-WT&start_date=2012-07-30&end_date=2012-08-31',{
      method: 'get',
      mode: 'cors'
    })
    .then((response) => typeof response == 'object' ? response.json() : {} )
    .then((responseJson)=>{
      history_data = responseJson.dataset.data;

      this.dataFromTSV(history_data);
    })
    .catch((err)=>{
      console.log(err);
    });
  }

  componentDidMount(){
    select('.overlay').on("mousemove", this.mouseMove);
  }

  get xAxis(){
      return axisBottom(this.x).ticks(5);
  }

  get yAxis(){
      return axisLeft(this.y).ticks(5);
  }

  drawXAxis(){
      select(this.refs.x).call(this.xAxis);
  }

  drawYAxis(){
      select(this.refs.y).call(this.yAxis);
  }


  get xAxis2(){
      return axisBottom(this.x2).ticks(5);
  }

  get yAxis2(){
      return axisLeft(this.y2).ticks(5);
  }

  drawXAxis2(){
      select(this.refs.x2).call(this.xAxis2);
  }

  drawYAxis2(){
      select(this.refs.y2).call(this.yAxis2);
  }

  get line(){
      return line()
          .x((d)=> (this.x(d.date)))
          .y((d)=> (this.y(d.close)));
  }

  linePath(){
     return (<path className="line" d={this.line(this.state.data)}/>);
  }

  get line2(){
      return line()
          .x((d)=> (this.x2(d.date)))
          .y((d)=> (this.y2(d.close)));
  }

  get brusher(){

    return brushX()
        .extent([[0, 0], [this.props.elementWidth, 150]])
        .on("brush end", this.brushed(event));
  }

  brushed(event) {
    console.log(event);

    // if (event.sourceEvent && event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
    

    //var s = event.selection || this.x2.range();
    //this.x.domain(s.map(this.x2.invert, this.x2));
    
    /**
    focus.select(".area").attr("d", area);
    focus.select(".axis--x").call(xAxis);
    svg.select(".zoom").call(zoom.transform, d3.zoomIdentity
        .scale(width / (s[1] - s[0]))
        .translate(-s[0], 0));
    **/

  }

  linePath2(){
     return (<path className="line2" d={this.line2(this.state.data)}/>);
  }

  drawCircle(){
      return (<circle r="5"/>)
  }

  drawText(){
      return (<text x="9" dy=".35em"/>)
  }

  drawRect(){
      return (<rect d={this.line(this.state.data)} className="overlay" width={this.props.elementWidth} height={this.props.elementHeight} onMouseOver={()=> this.mouseOver()} onMouseOut={()=> this.mouseOut()} onMouseMove={(e)=> this.mouseMove(e)}  />)
  }

  mouseOver(){
 
  }

  mouseOut(){

  }

  mouseMove(e){

    //console.log('Mouse move');
    //console.log(d3.mouse().event);
    let overlay = select('.overlay').node();
    //console.log(clientPoint(e.target, e)[0]);
   //  let x0 = this.x.invert(d3.mouse(overlay));


    let x0 = this.x.invert(clientPoint(e.target, e)[0])
    let i = this.bisectDate(this.state.data, x0, 1);
    let d0 = this.state.data[i - 1];
    let d1 = this.state.data[i];
    let d = x0 - d0.date > d1.date - x0 ? d1:d0;
    select(".focus")
      .attr("transform", "translate(" + this.x(d.date) + "," + this.y(d.close) + ")")
      .select("text")
      .text(d.close)
  
  }

  dataFromTSV(history){
    let data = [];
    for(let x=history.length-1; x>=0; x--){
      data.push({close: parseFloat(history[x][5]), date:  new Date(history[x][0]) });
    };
    this.x.domain(extent(data, (d)=> d.date) );
    this.y.domain([0, max(data, (d)=> (d.close) )]);
    
    this.x2.domain(extent(data, (d)=> d.date) );
    this.y2.domain([0, max(data, (d)=> (d.close) )]);


    this.setState({data: data});
  }


  drawBrush(){

    
      select(this.refs.y2)
        .call(this.brusher)
        .call(this.brusher.move, this.x.range())
  
  }


  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
      <svg width={this.elementWidth} height={this.elementHeight}>
          <g transform={`translate(${this.margin.left}, ${this.margin.top})`}>
                  {this.state.data ? this.linePath() : null}
              <g ref="x" className="x axis" transform={`translate(0, ${this.elementHeight - this.margin.top - this.margin.bottom})`}>
                  {this.state.data ? this.drawXAxis() : null}
              </g>
              <g ref='y' className="y axis">
                  {this.state.data ? this.drawYAxis() : null}
              </g>

              <g className="focus" >
                      {this.state.data ? this.drawCircle() : null}
                      {this.state.data ? this.drawText() : null}
              </g>
                {this.state.data ? this.drawRect() : null}
          </g>
      </svg>
    

        <svg width={this.props.elementWidth} height={150}>
          <g transform={`translate(${this.margin.left}, ${this.margin.top})`}>

              {this.state.data ? this.linePath2() : null}

              <g ref="x2" className="x axis" transform={`translate(0, ${150 - this.margin.top - this.margin.bottom})`}>
                   {this.state.data ? this.drawXAxis2() : null}
              </g>

              <g ref='y2' className="y axis">
                  {this.state.data ? this.drawYAxis2() : null}
              </g>


              <g className="brush" >
                      {this.state.data ? this.drawBrush(event) : null}
                      
              </g>


          </g>
        </svg>
</div>





    );
  }
}


LineChart.propTypes = {
  elementWidth: PropTypes.number.isRequired,
  elementHeight: PropTypes.number.isRequired
};

export default LineChart;
