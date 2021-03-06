class Chart{
	constructor(margin,width,height,data){
		this.margin = margin
    	this.width = width
    	this.height = height
    	this.data = data
    	this.a = this.width/2 - 20;
  		this.b = this.height/2 - 90;

		this.draw()

		this.setArc()

  		this.svg()
  		this.pie()
  		this.g()

	}

	draw(){

    	this.margin = {top:this.margin,left:this.margin,right:this.margin,bottom:this.margin}
    	this.radius = Math.min(this.width-100,this.height-100)/2
    	this.color = d3.scale.category10();
	};
		
	setArc(){
    	this.arc = d3.svg.arc()  
            		.outerRadius(this.radius -230)
            		.innerRadius(this.radius - 50)
            		.cornerRadius(20);
        this.arcOver = d3.svg.arc()  
  						.outerRadius(this.radius +50)
 						.innerRadius(0);
	};

	svg(){
		 this.svg = d3.select("#svgContent").append("svg")
            			.attr("viewBox", "0 0 " + this.width + " " + this.height/2)
			            .attr("preserveAspectRatio", "xMidYMid meet")
			            .append("g")
			            .attr("transform","translate("+this.a+","+this.b+")");

		 this.div = d3.select("body")
	            		.append("div") 
	            		.attr("class", "tooltip");
	};

	pie(){
		this.pie = d3.layout.pie()
            .sort(null)
            .value((d)=>{return (d.GDP);})
        	.padAngle(.0);
	}

	g(){
		this.g = this.svg.selectAll(".arc")
          .data(this.pie(this.data))
          .enter()
          .append("g")
          .attr("class","arc")
          .on("mousemove",(d)=>{
            this.mouseVal = function(d){d3.mouse(this)};
            this.div.style("display","none");
            this.div
            .html("Country: "+d.data.country+"</br>"+"GDP of Country: $"+d.data.GDP)
              .style("left", (d3.event.pageX+12) + "px")
              .style("top", (d3.event.pageY-10) + "px")
              .style("opacity", 1)
              .style("display","block");
          })
          .on("mouseout",()=>{this.div.html(" ").style("display","none");});


        this.g.append("path")
	      .attr("d",this.arc)
	      .style("fill",(d)=>{return this.color(d.data.country);})
	      .attr("d", this.arc);;
	}

}

d3.csv("https://raw.githubusercontent.com/dwvf58/mycourseworkassignment/master/top50gdpinworld.csv", function(data){
	chart = new Chart(400,300,300,data)

	// Update the current slider value (each time you drag the slider handle)
	slider.oninput = function() {
  		document.getElementById("myRange").innerHTML = this.value;
  		slider.value = this.value;
  		d3.select("svg").remove();
  		chart = new Chart(400,slider.value,slider.value,data)
	}
})

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
document.getElementById("myRange").innerHTML = slider.value; // Display the default slider value



