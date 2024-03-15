const root=document.getElementById("root")
const play=document.querySelector('#play')
const speedElement=document.getElementById('speed')
const success=document.querySelector('#success')

let speed=2000

const windowWidth = (document.documentElement.clientWidth || window.innerWidth) -150;
const windowHeight = (document.documentElement.clientHeight || window.innerHeight) -200;

const makeGrid=()=>{
    // console.log(windowHeight,windowWidth)
    const row=windowHeight/50
    const col=windowWidth/50
    // console.log(row,col);
    for(let i=1;i<=row;i++)
    {
        const rowDiv=document.createElement('div')
        rowDiv.style.display='flex'
        rowDiv.style.alignItems='center'
        rowDiv.className='rowDiv'
        for(let j=1;j<=col;j++)
        {
            const colDiv=document.createElement('div')
            colDiv.style.margin='2px'
            const id=String(i) + String(j)
            colDiv.id=id
            colDiv.style.height='50px'
            colDiv.style.width='50px'
            colDiv.style.borderRadius='50%'
            rowDiv.appendChild(colDiv)
        }
        root.appendChild(rowDiv)
    }
}

makeGrid()

let start;
let row,col;
let prevId;

play.addEventListener('click',()=>{
    success.style.display='none'
    if(play.textContent==="Next level")
    {
        speed*=4;
        speed/=5;
        speed=Math.ceil(speed)
        play.textContent="Play"
    }
    else if(play.textContent==="Play")
    {
        if(start)
        {
            clearInterval(start)
            play.textContent="Play"
            start=null;
        }
        else
        {
            start=setInterval(()=>{
                if(prevId)
                {
                    const prevDiv=document.getElementById(prevId);
                    prevDiv.style.backgroundColor='white'
                }
                const rowsiz=windowHeight/50
                const colsiz=windowWidth/50
                row=Math.floor(Math.random()*rowsiz)+1
                col=Math.floor(Math.random()*colsiz)+1
                const generated_id=String(row)+String(col)
                console.log(generated_id);
                const div=document.getElementById(generated_id);
                const r=Math.floor(Math.random()*256)
                const g=Math.floor(Math.random()*256)
                const b=Math.floor(Math.random()*256)
                div.style.backgroundColor=`rgb(${r},${g},${b})`
                console.log(div);
                prevId=generated_id
            },speed)
            play.textContent="Pause"
        }   
    }
    else
    {
        clearInterval(start);
        start=null;
        play.textContent="Play"
        if(prevId)
        {
            const prevDiv=document.getElementById(prevId);
            prevDiv.style.backgroundColor='white'
            prevId=null
        }
    }
})

root.addEventListener('click',(e)=>{
    if(start)
    {
        const clicked_id=String(e.target.id);
        const generated_id=String(row)+String(col)
        console.log(generated_id,clicked_id);
        if(clicked_id===generated_id)
        {
            console.log(("YES"));
            clearInterval(start)
            start=null
            if(prevId)
            {
                const prevDiv=document.getElementById(prevId);
                prevDiv.style.backgroundColor='white'
                prevId=null
                play.textContent="Next level"
            }
            success.style.display='block'
        }
    }
})