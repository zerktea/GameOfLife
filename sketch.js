let arr = [];
let isdead=[];
let statee=1
let w=50
let l=30
let neighbourscount=0;


function setup()
{
   canvas = createCanvas(1300, 1300);
   for(var i = 0; i < l; i++){
        var tmp=[];
        var inArr = [];
        for(var j = 0; j < w; j++){
          tmp[j]=0;
          
            var rect = new Rect(j,i);
            inArr.push(rect);
        }
        isdead.push(tmp)
        arr.push(inArr)  
      } 
  //creating our end button or start
  button = createButton("START SIMULATION");
  button.size(120,60);
  button.position(300,680);
  button.style("font-family", "Bodoni");
  button.style("font-size", "17px");
  button.mousePressed(experiment); 
  function experiment(){
    statee -=1 ;
    arr=[];
    button.html('click to stop');
  }

}


function draw(){
  
  background(0); 
  if(statee==1){ 
    for(var i = 0; i < l; i++){
        for(var j = 0; j < w; j++){
            arr[i][j].show()
        }
    }
  }

  else if(!statee){
    checkisdead(); 
    frameRate(5);
      for(var j = 0; j < l; j++){
        for(var i = 0; i < w; i++){
          if(isdead[j][i]){
            fill('black');
            rect(i*18,j*18,18,18);
          }
          else{
            fill('white');
            rect(i*18,j*18,18,18);
        }
      }
     }
        
    }  
    else {

    } 
}

function checkisdead(){
let use=[]

for(var i = 0; i < l; i++){
  var tmp=[];
  
  for(var j = 0; j < w; j++){
    tmp[j]=isdead[i][j];
  }
  use.push(tmp) 
} 

  for(var i = 0; i < l; i++){
    for(var j = 0; j < w; j++){
        neighbourscount+=isdead[(i-1+l) % l][(j+w) % w];
        neighbourscount+=isdead[(i-1+l) % l][(j+1+w) % w];
        neighbourscount+=isdead[(i-1+l) % l][(j-1+w) % w];
        neighbourscount+=isdead[(i+l)% l][(j-1+w) % w];
        neighbourscount+=isdead[(i+l) % l][(j+1+w) % w];
        neighbourscount+=isdead[(i+1+l) % l][(j+w) % w];
        neighbourscount+=isdead[(i+1+l) % l][(j-1+w) % w];
        neighbourscount+=isdead[(i+1+l) % l][(j+1+w) % w];
    
        if(neighbourscount==3 && isdead[i][j]==0)
        {
          use[i][j]=1;
        }
         if(isdead[i][j]==1 &&(neighbourscount<2||neighbourscount>3))
         { 
         use[i][j]=0;
      }
  neighbourscount=0
  }
 }
 for(i=0;i<l;i++)
  {
    for(j=0;j<w;j++){
      isdead[i][j]=use[i][j]
    }
  }
}

function mousePressed(){
  if(statee){
    arr.forEach(function(e, index){
        e.forEach(function(d,index2){
            arr[index][index2].clicked()
        });
    });
  }
}

function Rect(i,j){
    this.fill = 'white'
    this.i = i;
    this.j = j;
    this.x = i * 18
    this.y = j * 18
    
    this.clicked = function(){
        let x1 = this.x, x2 = x1 + 18,
            y1 = this.y, y2 = y1 + 18;
        if( mouseX > x1 && mouseX < x2 && mouseY > y1 && mouseY < y2){
            isdead[j][i]=1
           
          
            this.fill = 'black'
          }
    }
    this.show = function(){
        fill(this.fill)
        stroke('red')
        rect(this.x, this.y,18, 18)
    }
}

