//variables
var i,j;
var map = new Array(7);
var grid= new Array(7);
var p1buttons=1;
var p2buttons=10;
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

var pturn1=true;
var pturn2=false;
var turns=0;
p1remaining_buttons=0;
p2remaining_buttons=0;
var run_game=true;
var selected=-13;
temp1=0;
temp2=0;
var pickup_flag=false;

//initialises both grid and map for logic purposes

function initializeArray() {
    for (var i = 0; i < 7; i++) {
        map[i] = new Array(7);
        grid[i] = new Array(7);
        
    }

  grid = 
    [
        [1, 0, 0, 1, 0, 0, 1],
        [0, 1, 0, 1, 0, 1, 0],
        [0, 0, 1, 1, 1, 0, 0],
        [1, 1, 1, 0, 1, 1, 1],
        [0, 0, 1, 1, 1, 0, 0],
        [0, 1, 0, 1, 0, 1, 0],
        [1, 0, 0, 1, 0, 0, 1]
    ];

    map =
    [
        [-13, -13, -13, -13, -13, -13, -13],
        [-13, -13, -13, -13, -13, -13, -13],
        [-13, -13, -13, -13, -13, -13, -13],
        [-13, -13, -13, -13, -13, -13, -13],
        [-13, -13, -13, -13, -13, -13, -13],
        [-13, -13, -13, -13, -13, -13, -13],
        [-13, -13, -13, -13, -13, -13, -13]
    ];

 

//for troubleshooting purpose
  console.log(map);

  console.log(grid);

}

function switchTurn()
{
    if(pturn1==true)
    {pturn1=false;
     pturn2=true;
     document.getElementById("message").innerText="Player 2 Turn";
    
    }

     else{
        pturn2=false;
        pturn1=true;
        document.getElementById("message").innerText="Player 1 Turn";
     

     }

     turns++;
     
}




function checkMove(a,b,c,d)
{   var max;
    var level;
    if((a==b || a==c )||a==d)
    {max=a;}
    else if(b==c||b==d||b==a)
    {max=b;}
    else if(c==a||c==b||c==d)
    {max=c;}
    console.log("Coordinates"+a+b+c+d);
    console.log("Maximum app of"+max);
    if(max==0||max==6)
        {
            level=3;
        }
        else if(max==1 || max==5)
        {
            level=2;
        }
        else
        {level=1;}

        console.log("Level is "+level);
  

    var hops;
   hops=Math.abs(a-c)+Math.abs(b-d);
  
     

    console.log("Number of hops :"+hops);
    if(hops==level)
    {
        if((Math.abs(a-c)==1)&&(Math.abs(b-d)==1))
        {
            return false;
        }
        return true;
    }
    else
    {
        return false;
    }

}

function moveButton(x,y,id)
{  
    var parent = document.getElementById(id);
    var child = parent.childNodes[0];
    child.style.marginLeft=""+(70*x+30)+"px";
    child.style.marginTop=""+(70*y+30)+"px";
    switchTurn();
    
}

function drawButton(x, y, id) {
   
   
     var elem = document.createElement("img");
     var parent = document.createElement("a");
     if(id<10){
                 elem.setAttribute("src", "button1.png");
                 if(turns<18)
                 { p1remaining_buttons++;}
                
                }
                else{
                    elem.setAttribute("src", "button2.png");
                    if(turns<18)
                    {p2remaining_buttons++;}
                    

                }
       
        elem.setAttribute("height", "60");
        elem.setAttribute("width", "60");
        elem.setAttribute("style","margin-top:"+(y-30)+"px; margin-left: "+(x-30)+"px;");

        parent.setAttribute("class","imageAnchor");
        parent.setAttribute("id", id);
        
        parent.setAttribute("href","#");

        parent.appendChild(elem);
        document.getElementById("overlay").appendChild(parent);
        
        console.log(elem);
        
        
        switchTurn();
      }
  



function deleteButton(id) {
    // Removes an element from the document
    console.log("Going to delete an element with ID :"+ id);

    var list = document.getElementById("overlay");
    console.log(list);
    var child = document.getElementById(id);
    list.removeChild(child);
    document.getElementById("notice").style.visibility="hidden";
    if(canMove()==true)
     {
         console.log("Player can still move");

     }
     else{
        console.log("Player can not move");
        
     }
   

}

function checkBottleneck()
{  var ten;
  for(var i=0;i<7;i++)
  {
      for(var j=0;j<7;j++)
      {
         if(map[i][j]!=-13)
         {
             if(pturn1==true&&map[i][j]<10){
                 console.log("Valid Button: "+map[i][j]);
                 ten=isMill(i,j);
                 console.log(ten);
                 if(ten!=true)
                 {
                     return ten;
                 }
                
             }
             if(pturn2==true&&map[i][j]>9){
                console.log("Valid Button: "+map[i][j]);
                ten=isMill(i,j);
                console.log(ten);
                if(ten!=true)
                {
                    return ten;
                }
               
            }
         }
      }
  }

  return ten;
  console.log("At the end of the loop temp is:"+ten);

}
///click dtection function
canvas.addEventListener("click", mouseClick);


//start
function mouseClick(event) {
    if(run_game==true)
    {
    //Get the X and Y co-ordinate at the point of touch in canvas
    var X = event.clientX - (canvas.getBoundingClientRect()).left;
    var Y = event.clientY - (canvas.getBoundingClientRect()).top;
    //console.log("X:"+X+"Y:"+Y);
    //set the coordinates
    X=Math.trunc((X-25)/70);
    Y=Math.trunc((Y-25)/70);
    var tem;
    //console.log("X:"+X+"Y:"+Y);

    if(grid[X][Y]==1)
    {
        console.log("Valid click");
        //to pick an opponent's mill
        if(pickup_flag==true)
        {   tem=isMill(X,Y);
            
          
            if(tem==true && (!(turns>18&&(p1remaining_buttons==3||p2remaining_buttons==3))))
            {   console.log("Tem is true and buttons P1:P2 are"+p1remaining_buttons+":"+p2remaining_buttons);
                    
                    //needs a validation function to check  if opponent mills are secured or not
                    console.log("Invalid"); 
                    //check the bottleneck here
                    if(checkBottleneck()==true)
                    {pickup_flag=false;
                        document.getElementById("notice").style.visibility="hidden";
                        console.log("Hiding Done");
                    
                    }
                    return 0;
               
              
            }
            
            console.log("Going to pickup a mill");
            if(pturn1==true)
            {
                if(map[X][Y]<10)
                {
                    deleteButton(map[X][Y]);
                    map[X][Y]=-13;
                    pickup_flag=false;
                    p1remaining_buttons--;
                    checkGameOver();

                }
                
            }
            else if(pturn2==true)
            { 
                if(map[X][Y]>9)
                {
                    deleteButton(map[X][Y]);
                    map[X][Y]=-13;
                    pickup_flag=false;
                    p2remaining_buttons--;
                    checkGameOver();

                }
            }

        }

        
       
       else if((map[X][Y]==-13) && (turns<18)){
            if(pturn1==true)
            { map[X][Y]=p1buttons;
              drawButton((X*70+60),(Y*70+60),p1buttons);
              p1buttons++;
             
              console.log("Button created P1");
              isMill(X,Y);
            }
            else  if(pturn2==true)
            { map[X][Y]=p2buttons;
              drawButton((X*70+60),(Y*70+60),p2buttons);
              p2buttons++;
              
              console.log("Button created P2");
              isMill(X,Y);
              
            }
           
            
            
            
        }
        //selecting button for first time
        else if((map[X][Y]!=-13) && (turns>=18)&&(selected==-13))
        {   
            //validates valid turn
            if((map[X][Y]<10 && pturn1==true)||(map[X][Y]>=10 && pturn2==true))
            {
            selected=map[X][Y];
            temp1=X;
            temp2=Y;
            document.getElementById(selected).focus();
            console.log(document.getElementById(selected));
            console.log("Button  Selected:"+selected);
            }
        }
        else if(selected!=-13 && map[X][Y]!=-13){
            //for unselection and selection

            //validates valid turn
            if((map[X][Y]<10 && pturn1==true)||(map[X][Y]>=10 && pturn2==true))
            {
                selected=map[X][Y];
                temp1=X;
                temp2=Y;
                console.log("Button Unsleceted and  Selected");
                document.getElementById(selected).focus();
            }


        }

        else if(selected!=-13 && map[X][Y]==-13)
        { 
            //experiment
            var flag=checkMove(temp1,temp2,X,Y);

            //for last three pieces, moving anywhere is allowed

            if(turns>18)
            {
                if(p1remaining_buttons==3&&pturn1==true)
                {
                    flag=true;
                }
                else if(p2remaining_buttons==3&&pturn2==true)
                {
                    flag=true;
                }
            }

           

            if(flag==true)
            {
            map[temp1][temp2]=-13;
            map[X][Y]=selected;
            temp1=temp2=-13;
            // deleteButton(selected);
            // drawButton((X*70+60),(Y*70+60),selected);
            moveButton(X,Y,selected);
            isMill(X,Y);
            selected=-13;
            console.log("Button Replaced");
            console.log(map);
                     }
            

            
        }

            
      
       
    }
    else
    {console.log("Invalid Click");
    }
checkGameOver();
}

}



//main function

function main()
{ 
    initializeArray();
    

   

}


//tests a horizontal line
function checkOneLineMillH(a,b)
{ var p1=0, p2=0;
    for(i=0;i<7;i++)
    { if(map[i][b]>9&&map[i][b]!=-13)
        {
            console.log("Valid Button");
            p2++;

        }
        else if(map[i][b]<10&&map[i][b]!=-13)
        {
            p1++;

        }

    }


    if((p1==3||p2==3)&&(b!=3))
    {
        console.log("H Mill encountered ");
        pickup_flag=true;
        return true;

    }
    else  if(b==3)
    {   
        //first row

        //to be seen
        if(a<3)
        {   console.log("Less than 3 H ");
            if((map[0][3]>9&&map[1][3]>9&&map[2][3]>9) ||(   (map[0][3]<10&&map[1][3]<10&&map[2][3]<10) &&(map[0][3]!=-13&&map[1][3]!=-13&&map[2][3]!=-13)  )  )
            {
            pickup_flag=true;
            console.log("H Mill encountered at 3");
            return true;

            }
        }
        else if(a>3){
            console.log("More than than 3 H ");
           if (  ((map[4][3]<10&&map[5][3]<10&&map[6][3]<10) &&(map[4][3]!=-13&&map[5][3]!=-13&&map[6][3]!=-13) )  ||  (map[4][3]>9&&map[5][3]>9&&map[6][3]>9) ) 
        {
           

            console.log("H Mill encountered at 3");
            pickup_flag=true;
            return true;

        }
       
        }
    }
   
    
    else{
        return false;
    }   

}


//calling functions

//tests a Vertical line
function checkOneLineMillV(a,b)
{ var p1=0, p2=0;
    for(i=0;i<7;i++)
    { if(map[a][i]>9&&map[a][i]!=-13)
        {
            console.log("Valid Button");
            p2++;

        }
        else if(map[a][i]<10&&map[a][i]!=-13)
        {
            p1++;

        }

    }


    if((p1==3||p2==3)&&(a!=3))
    {
        console.log("V Mill encountered ");
        pickup_flag=true;
        return true;

    }
    else  if(a==3)
    {   
        
        if(b<3)
        {   console.log("Less than 3 V");
        //to be seen
            if((map[3][0]>9&&map[3][1]>9&&map[3][2]>9) ||  (   (map[3][0]<10&&map[3][1]<10&&map[3][2]<10) &&(map[3][0]!=-13&&map[3][1]!=-13&&map[3][2]!=-13)  )  )
            {
                pickup_flag=true;
                console.log("V Mill encountered at 3");
                return true;

            }
        }
        else if(b>3){
            console.log("More than 3 V");

                if( (map[3][4]>9&&map[3][5]>9&&map[3][6]>9)  || ((map[3][4]<10&&map[3][5]<10&&map[3][6]<10) &&(map[3][4]!=-13&&map[3][5]!=-13&&map[3][6]!=-13) ) ) 
                {
                    pickup_flag=true;
                    console.log("V Mill encountered at 3");
                    return true;

                }
        }
    
    }
   
    
    else{
        return false;
    }       

}

function isMill(x,y)
{
   var m = checkOneLineMillH(x,y);
   var l = checkOneLineMillV(x,y);

   console.log("Displaying M and L"+m+":"+l);
   if(m==true||l==true)
   {     console.log("Mill Exists");
  
      document.getElementById("notice").innerText='But a button needs to be picked';
      document.getElementById("notice").style.visibility="visible";
  
        return true;
       
   }
   else
   {
        console.log("Mill doesn't Exist");
       return false;
   }


}


function checkGameOver()
{   console.log("P1 Total:"+p1remaining_buttons+" P2 Remaining:"+p2remaining_buttons+"turns: "+turns);

    if(p1remaining_buttons<3&&turns>=18||(canMove()!=true&&pturn1==true&&turns>=18))
    {   console.log("Player 1 Lost: Game Over");
        alert("Player 1 Lost: Game Over");
        run_game=false;
    }

    else if(p2remaining_buttons<3&&turns>=18||(canMove()!=true&&pturn2==true&&turns>=18))
    {   
        alert("Player 2 Lost: Game Over");
        console.log("Player 2 Lost: Game Over");
        run_game=false;

    }

    if(canMove()==true)
     {
         console.log("Player can still move");

     }
     else{
        console.log("Player can not move");
     }
}


function canMove()
{ var flagger=false;
    for(var i=0; i<7;i++)
    {
        for(var j=0; j<7;j++)
        {  
            if(map[i][j]!=-13)
            {
                if(pturn1==true&& map[i][j]<10)
                {
                    flagger=unitMove(i,j);
                    if(flagger==true)
                    {
                        return true;
                    }
                }
    
                else  if(pturn2==true&& map[i][j]>9)
                {
                    flagger=unitMove(i,j);
                    if(flagger==true)
                    {
                        return true;
                    }
                }
            }
            
            
        }

    }

    return flagger;
}


//j are rows and i are columns
function unitMove(j,i)
{
      //Left
      if (!(j == 4 && i == 3)) {
        for (var k = j - 1; k >= 0; k--) {
            if (grid[k][i] != 0) {
                if (map[k][i] == -13) {
                    return true;
                } else {
                    //Adjacent piece is occupied by some block
                    break;
                }
            }
        }
    }

    //Top
    if (!(j == 3 && i == 4)) {
        for (var l = i - 1; l >= 0; l--) {
            if (grid[j][l] != 0) {
                if (map[j][l] == -13) {
                    return true;
                } else {
                    //Adjacent piece is occupied by some block
                    break;
                }
            }
        }
    }


    //Right
    if (!(j == 2 && i == 3)) {
        for (var m = j + 1; m < 7; m++) {
            if (grid[m][i] != 0) {
                if (map[m][i] == -13) {
                    return true;
                } else {
                    //Adjacent piece is occupied by some block
                    break;
                }
            }
        }
    }


    //Bottom
    if (!(j == 3 && i == 2)) {
        for (var n = i + 1; n < 7; n++) {
            if (grid[j][n] != 0) {
                if (map[j][n] == -13) {
                    return true;
                } else {
                    //Adjacent piece is occupied by some block
                    break;
                }
            }
        }
    }


}

main();


