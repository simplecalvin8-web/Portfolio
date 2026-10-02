const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const menuToggle=$('#menuToggle'),nav=$('#nav'),toTop=$('#toTop'),year=$('#year');
year.textContent=new Date().getFullYear();
menuToggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',open)});
$$('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.1});
$$('.reveal').forEach(el=>observer.observe(el));
const sections=$$('main section[id]'),links=$$('.nav a');
addEventListener('scroll',()=>{toTop.classList.toggle('show',scrollY>550);let current='home';sections.forEach(s=>{if(scrollY>=s.offsetTop-170)current=s.id});links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${current}`))},{passive:true});
toTop.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
$$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const id=a.getAttribute('href');if(id==='#')return;const target=$(id);if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'})}}));
const glow=$('.cursor-glow');addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'},{passive:true});

const data={
fixlink:{title:'Fixlink Cameroon',desc:'Electricity services platform concept for connecting clients with quality electricians.',tags:['HTML','CSS','JavaScript','Electrical Services']},
electric:{title:"Simple's Electric Services",desc:'Professional electrician business website concept with service presentation, inquiries and digital customer communication.',tags:['HTML','CSS','JavaScript','Electrical']},
shop:{title:"Simple's Shop",desc:'E-commerce platform concept covering fashion, shoes, watches, beauty, home and living.',tags:['HTML','CSS','JavaScript','SQL','E-commerce']},
motivation:{title:'Ntaima — Motivation Site',desc:'Live motivation and inspiration website with Motivation, Success, Confidence, Study, Life and Love sections.',tags:['Live Site','Motivation','Ntaima'],live:'https://ntaima.netlify.app/'},
caminfra:{title:'CAM-INFRA',desc:'Cameroon Infrastructure Monitoring & Citizen Reporting Platform concept for reporting and tracking public infrastructure issues.',tags:['Civic Tech','HTML','CSS','JavaScript']}
};
const modal=$('#projectModal'),mTitle=$('#modalTitle'),mDesc=$('#modalDescription'),mTags=$('#modalTags'),mLive=$('#modalLive');
function openModal(key){const d=data[key];if(!d)return;mTitle.textContent=d.title;mDesc.textContent=d.desc;mTags.innerHTML=d.tags.map(t=>`<span>${t}</span>`).join('');if(d.live){mLive.hidden=false;mLive.href=d.live}else{mLive.hidden=true;mLive.removeAttribute('href')}modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow=''}
$$('.project-card').forEach(card=>card.querySelector('.details-btn').addEventListener('click',()=>openModal(card.dataset.project)));
$('#modalClose').addEventListener('click',closeModal);$('[data-close-modal]').addEventListener('click',closeModal);document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});

const canvas=$('#magicCanvas'),ctx=canvas.getContext('2d'),particles=[];
function resize(){const d=devicePixelRatio||1;canvas.width=innerWidth*d;canvas.height=innerHeight*d;canvas.style.width=innerWidth+'px';canvas.style.height=innerHeight+'px';ctx.setTransform(d,0,0,d,0,0)}
function seed(){particles.length=0;for(let i=0;i<70;i++)particles.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:.3+Math.random()*1.4,vx:(Math.random()-.5)*.18,vy:(Math.random()-.5)*.13,a:.15+Math.random()*.5})}
function loop(){ctx.clearRect(0,0,innerWidth,innerHeight);particles.forEach(p=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0)p.x=innerWidth;if(p.x>innerWidth)p.x=0;if(p.y<0)p.y=innerHeight;if(p.y>innerHeight)p.y=0;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(245,200,75,${p.a})`;ctx.fill()});requestAnimationFrame(loop)}
resize();seed();loop();addEventListener('resize',()=>{resize();seed()});

const dust=$('#goldDust');for(let i=0;i<35;i++){const s=document.createElement('i');s.className='dust';s.style.left=Math.random()*100+'%';s.style.top=(75+Math.random()*30)+'%';s.style.setProperty('--x',`${(Math.random()-.5)*220}px`);s.style.animationDelay=(-Math.random()*7)+'s';s.style.animationDuration=(5+Math.random()*6)+'s';dust.appendChild(s)}
if(matchMedia('(pointer:fine)').matches){$$('.project-card').forEach(card=>{card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(800px) rotateX(${-y*4}deg) rotateY(${x*4}deg) translateY(-7px)`});card.addEventListener('pointerleave',()=>card.style.transform='')})}
addEventListener('pointerdown',e=>{for(let i=0;i<7;i++){const s=document.createElement('i');s.className='dust';s.style.left=e.clientX+'px';s.style.top=e.clientY+'px';s.style.animation='sparkClick .8s ease-out forwards';s.style.setProperty('--x',`${(Math.random()-.5)*120}px`);s.style.setProperty('--y',`${(Math.random()-.5)*120}px`);dust.appendChild(s);setTimeout(()=>s.remove(),850)}});
const style=document.createElement('style');style.textContent='@keyframes sparkClick{0%{transform:translate(0,0) scale(1);opacity:1}100%{transform:translate(var(--x),var(--y)) scale(0);opacity:0}}';document.head.appendChild(style);
