
let inputArray=new Array();
let str='';
let indexChange=-1;

let add_element=()=>{
  let number = document.getElementById('addNumber').value;
  document.getElementById('addNumber').value='';
  console.log(number);
  if(number!==""){
  inputArray.push(number);
  disp();}
}

let replace_element=()=>{
  let number = document.getElementById('addNumber').value;
  document.getElementById('addNumber').value='';
  if(indexChange!==-1){
  inputArray.splice(indexChange,1,number);
  indexChange=-1;
  disp();}
}
let disp=()=>{
  str='';
  inputArray.map((value,i)=>{
    console.log(value);
    str+="<span>"+value+"</span>"+"&nbsp"+"<a href=# id=delete onClick='remove_element("+i+")'><i class=material-icons>delete</i></a>"+"&nbsp"+"<a href=# id=change onClick='change_element("+i+")'><i class=material-icons>edit</i></a>"+"<br>";
  })
  document.getElementById('disp').innerHTML=str;
  first_half_bar();
  second_half_bar();
}

let remove_element=(index)=>{
  document.getElementById('addNumber').value='';
  inputArray.splice(index,1);
  disp();
}

let change_element=(index)=>{
  document.getElementById('addNumber').value=inputArray[index];
  indexChange = index;
}

let first_half_bar=()=>{

let txt="";

document.getElementById('bar-graph').setAttribute('width', inputArray.length*75);

let maxElement = Math.max(...inputArray);
if(maxElement===0)
maxElement =1;

document.getElementById('bar-graph').setAttribute('height', maxElement*30);



for (let i = 0; i <inputArray.length; i++) {
  for (let j = 0; j <maxElement; j++) 
  {
    txt+=`<rect x='${i*75}' y='${j*30}' width='75' height='30' fill='gainsboro' stroke-width='2px' stroke='lightgrey' />`;
  }
}

inputArray.forEach(function(value,index){  
  for(let i=0;i<value;i++){
    txt+=`<rect x='${index*75}' y='${(maxElement-i-1)*30}' width='75' height='30' fill='lightblue'/>`;
  }
});

document.getElementById('bar-graph').innerHTML=txt;
}

let trappingRainwater = (newArray)=>{
  let n = newArray.length;
  let output=0;
  let left = new Array(n);
  let right = new Array(n);
  left[0]=newArray[0];
  for(let i=1;i<n;i++)
  {
    left[i]=Math.max(left[i-1],newArray[i]);
  }
  right[n-1]=newArray[n-1];
  for(let i=n-2;i>=0;i--)
  {
    right[i]=Math.max(right[i+1],newArray[i]);
  }

  for(let i=1;i<=n-2;i++)
  {
    let val = Math.min(left[i],right[i]);
    if(val>newArray[i])
    {
      output+=val-newArray[i];
      newArray[i]=val;
    }
  }

  return [newArray,output];
}

let second_half_bar=()=>{
  let newArray = inputArray.slice();
  let [outputArray,output] = trappingRainwater(newArray);
  let txt="";
  
  document.getElementById('second-bar-graph').setAttribute('width', outputArray.length*75);
  
  let maxElement = Math.max(...outputArray);
  if(maxElement===0)
  maxElement =1;
  
  document.getElementById('second-bar-graph').setAttribute('height', maxElement*30);
  
  
  
  for (let i = 0; i <outputArray.length; i++) {
    for (let j = 0; j <maxElement; j++) 
    {
      txt+=`<rect x='${i*75}' y='${j*30}' width='75' height='30' fill='gainsboro' stroke-width='2px' stroke='lightgrey' />`;
    }
  }
  
  outputArray.forEach(function(value,index){    
    for(let i=0;i<inputArray[index];i++){
      txt+=`<rect x='${index*75}' y='${(maxElement-i-1)*30}' width='75' height='30' fill='lightblue'/>`;
    }
    for(let i=inputArray[index];i<value;i++){
      txt+=`<rect x='${index*75}' y='${(maxElement-i-1)*30}' width='75' height='30' fill='lightyellow'/>`;
    }
  });
  
  document.getElementById('second-bar-graph').innerHTML=txt;
  document.getElementById('out-number').innerText = output;
  }