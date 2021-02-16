const INITIAL_COLOR = "##2c2c2c";
const CANVAS_SIZE = 700;
const canvas = document.getElementById("jsCanvas");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

const ctx = canvas.getContext("2d"); // 캔버스의 context (픽셀)

ctx.fillStyle = "white";
ctx.fillRect(0 ,0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
    console.log("not painting");
}
function startPainting(){
    painting = true;
    console.log("painting");
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        console.log("moveTO : " + x + " - " + y);
        ctx.moveTo(x, y); //  path는 만들어지지만 사용되어지지는 않는다
    }
    else{
        ctx.lineTo(x, y);
        console.log("lineTO : " + x + " - " + y);
        ctx.stroke();       //그리기
    }

}
function onMouseDown(event){
    startPainting(); // start painting
}
function onMouseUp(event){
    stopPainting();
}
function onMouseLeave(event){
    stopPainting();
}
function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    console.log(color);
    ctx.strokeStyle = color;  //override
    ctx.fillStyle = color;
}
function handleRangeChange(event){
    console.log(event.target.value);
    const size = event.target.value;
    ctx.lineWidth = size;     //override
}
function handleModeClick(event){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    }
    else{
        filling = true;
        mode.innerText = "Paint";
    }
}
function handleCanvasClick(){
    if(filling){
        //x, y, width, heigth
        ctx.fillRect(0 ,0, canvas.width, canvas.height);
    }
}
function handleCM(event){
    alert("우클릭은 할수 없습니다.");
    event.preventDefault();
}
function handleSaveClick(){
    const image = canvas.toDataURL("image/jpeg"); // 이미지를 data화 시키기
    const link = document.createElement("a"); // a태그에  download 링크 넣기
    link.herf = image;
    link.download = "PaintJS[Export]";
    link.click();
}
if(canvas){ 
    canvas.addEventListener("mousemove" , onMouseMove);      // move
    canvas.addEventListener("mousedown" , onMouseDown);      // click
    canvas.addEventListener("mouseup"   , onMouseUp);        // click finished
    canvas.addEventListener("mouseleave", onMouseLeave);     // mouse leave canvas
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}
if(colors){
    Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick))
    console.log(Array.from(colors));
}
if(range){
    range.addEventListener("input", handleRangeChange);
}
if(mode){
    mode.addEventListener("click", handleModeClick);
}
if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}