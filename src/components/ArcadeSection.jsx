import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

// ─────────────────────────────────────────
// GAME 1: DUNGEON TOWER DEFENSE
// ─────────────────────────────────────────
const GRID_COLS = 20;
const GRID_ROWS = 12;
const CELL = 36;
const PATH_CELLS = [
  [0,5],[1,5],[2,5],[3,5],[4,5],[4,4],[4,3],[4,2],[5,2],[6,2],[7,2],[8,2],[8,3],[8,4],[8,5],[8,6],[8,7],
  [9,7],[10,7],[11,7],[11,6],[11,5],[11,4],[11,3],[12,3],[13,3],[14,3],[14,4],[14,5],[14,6],[14,7],[14,8],
  [15,8],[16,8],[17,8],[18,8],[19,8]
];
const PATH_SET = new Set(PATH_CELLS.map(([c,r]) => `${c},${r}`));

const TOWER_TYPES = {
  ranger:  { name:'Ranger',    cost:100, color:'#4ade80', dmg:10, range:3,   rate:60,  emoji:'🏹' },
  ignis:   { name:'Ignis',     cost:150, color:'#f97316', dmg:25, range:2,   rate:90,  emoji:'🔥' },
  cryo:    { name:'Cryo',      cost:120, color:'#38bdf8', dmg:8,  range:2.5, rate:50, slow:0.4, emoji:'❄️' },
};

const WAVE_DEFS = [
  { count:6,  type:'goblin', hp:50,  speed:1.2, reward:20, color:'#a3e635' },
  { count:5,  type:'orc',    hp:120, speed:0.8, reward:35, color:'#fb923c' },
  { count:3,  type:'lich',   hp:300, speed:0.6, reward:80, color:'#c084fc', isBoss:true },
];

function distTD(a, b) { return Math.hypot((a[0]-b[0])*CELL+(CELL/2), (a[1]-b[1])*CELL+(CELL/2)); }

function DungeonTowerDefense() {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    towers: [], monsters: [], projectiles: [], particles: [],
    gold: 400, lives: 20, score: 0, waveIdx: 0, waveActive: false,
    spawnTimer: 0, spawnCount: 0, selectedTower: null,
    frame: 0, gameOver: false, victory: false, monsterIdCounter: 0,
  });
  const [ui, setUi] = useState({ gold:400, lives:20, score:0, waveIdx:0, waveActive:false, selectedTower:null, gameOver:false, victory:false });
  const rafRef = useRef(null);
  const syncUi = () => {
    const s = stateRef.current;
    setUi({ gold:s.gold, lives:s.lives, score:s.score, waveIdx:s.waveIdx, waveActive:s.waveActive, selectedTower:s.selectedTower, gameOver:s.gameOver, victory:s.victory });
  };

  const spawnMonster = useCallback((type) => {
    const def = WAVE_DEFS.find(w => w.type === type) || WAVE_DEFS[stateRef.current.waveIdx];
    stateRef.current.monsterIdCounter++;
    return {
      id: stateRef.current.monsterIdCounter,
      pathIdx: 0, progress: 0,
      maxHp: def.hp, hp: def.hp, speed: def.speed, reward: def.reward,
      color: def.color, isBoss: !!def.isBoss, slowTimer: 0,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const drawPath = () => {
      ctx.strokeStyle = '#44403c'; ctx.lineWidth = CELL; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.beginPath();
      PATH_CELLS.forEach(([c,r], i) => { const x=c*CELL+CELL/2, y=r*CELL+CELL/2; i===0?ctx.moveTo(x,y):ctx.lineTo(x,y); });
      ctx.stroke();
      ctx.strokeStyle = '#292524'; ctx.lineWidth = CELL-4;
      ctx.beginPath();
      PATH_CELLS.forEach(([c,r], i) => { const x=c*CELL+CELL/2, y=r*CELL+CELL/2; i===0?ctx.moveTo(x,y):ctx.lineTo(x,y); });
      ctx.stroke();
    };
    const drawGrid = () => {
      for (let r=0;r<GRID_ROWS;r++) for (let c=0;c<GRID_COLS;c++) {
        const onPath = PATH_SET.has(`${c},${r}`);
        if (!onPath) { ctx.fillStyle='rgba(11,11,20,0.85)'; ctx.fillRect(c*CELL,r*CELL,CELL,CELL); }
        ctx.strokeStyle='rgba(255,255,255,0.04)'; ctx.lineWidth=0.5; ctx.strokeRect(c*CELL,r*CELL,CELL,CELL);
      }
    };
    const drawTowers = () => {
      stateRef.current.towers.forEach(t => {
        const x=t.col*CELL, y=t.row*CELL, def=TOWER_TYPES[t.type];
        ctx.fillStyle='#0b0b14'; ctx.fillRect(x+2,y+2,CELL-4,CELL-4);
        ctx.strokeStyle=def.color; ctx.lineWidth=2; ctx.strokeRect(x+2,y+2,CELL-4,CELL-4);
        ctx.font=`${CELL*0.55}px serif`; ctx.textAlign='center'; ctx.textBaseline='middle';
        ctx.fillText(def.emoji,x+CELL/2,y+CELL/2);
      });
    };
    const drawMonsters = () => {
      stateRef.current.monsters.forEach(m => {
        if (m.pathIdx >= PATH_CELLS.length-1) return;
        const [c0,r0]=PATH_CELLS[m.pathIdx], [c1,r1]=PATH_CELLS[m.pathIdx+1];
        const mx=(c0+(c1-c0)*m.progress)*CELL+CELL/2, my=(r0+(r1-r0)*m.progress)*CELL+CELL/2;
        const radius = m.isBoss ? CELL*0.45 : CELL*0.3;
        ctx.beginPath(); ctx.arc(mx,my,radius,0,Math.PI*2); ctx.fillStyle=m.color; ctx.fill();
        ctx.strokeStyle='#fff'; ctx.lineWidth=m.isBoss?2:1; ctx.stroke();
        const bw=CELL*0.8, bh=4, bx=mx-bw/2, by=my-radius-7;
        ctx.fillStyle='#ef4444'; ctx.fillRect(bx,by,bw,bh);
        ctx.fillStyle='#22c55e'; ctx.fillRect(bx,by,bw*(m.hp/m.maxHp),bh);
        if (m.isBoss) { ctx.font='bold 8px monospace'; ctx.fillStyle='#c084fc'; ctx.textAlign='center'; ctx.fillText('LICH',mx,my+1); }
      });
    };
    const drawProjectiles = () => {
      stateRef.current.projectiles.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x,p.y,3,0,Math.PI*2); ctx.fillStyle=p.color; ctx.fill();
        ctx.shadowColor=p.color; ctx.shadowBlur=6; ctx.fill(); ctx.shadowBlur=0;
      });
    };
    const drawParticles = () => {
      stateRef.current.particles.forEach(p => {
        ctx.globalAlpha=p.life/p.maxLife; ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=p.color; ctx.fill(); ctx.globalAlpha=1;
      });
    };

    const loop = () => {
      const s = stateRef.current;
      if (s.gameOver || s.victory) { syncUi(); return; }
      ctx.clearRect(0,0,canvas.width,canvas.height);
      drawPath(); drawGrid(); drawTowers();
      s.frame++;
      if (s.waveActive && s.waveIdx < WAVE_DEFS.length) {
        const wdef = WAVE_DEFS[s.waveIdx]; s.spawnTimer++;
        if (s.spawnTimer%60===0 && s.spawnCount<wdef.count) { s.monsters.push(spawnMonster(wdef.type)); s.spawnCount++; }
        if (s.spawnCount>=wdef.count && s.monsters.length===0) {
          s.waveActive=false; s.waveIdx++; s.spawnCount=0;
          if (s.waveIdx>=WAVE_DEFS.length) { s.victory=true; syncUi(); return; }
          syncUi();
        }
      }
      s.monsters = s.monsters.filter(m => {
        const spd = m.slowTimer>0 ? m.speed*0.4 : m.speed;
        m.progress += spd*0.012;
        if (m.slowTimer>0) m.slowTimer--;
        if (m.progress>=1) {
          m.pathIdx++; m.progress=0;
          if (m.pathIdx>=PATH_CELLS.length-1) {
            s.lives=Math.max(0,s.lives-(m.isBoss?5:1));
            if (s.lives<=0) { s.gameOver=true; syncUi(); return false; }
            return false;
          }
        }
        return true;
      });
      s.towers.forEach(t => {
        t.cooldown=(t.cooldown||0)-1;
        if (t.cooldown>0) return;
        const def=TOWER_TYPES[t.type];
        const tx=t.col*CELL+CELL/2, ty=t.row*CELL+CELL/2;
        const target=s.monsters.find(m => {
          if (m.pathIdx>=PATH_CELLS.length-1) return false;
          const [c0,r0]=PATH_CELLS[m.pathIdx], [c1,r1]=PATH_CELLS[m.pathIdx+1];
          const mx=(c0+(c1-c0)*m.progress)*CELL+CELL/2, my=(r0+(r1-r0)*m.progress)*CELL+CELL/2;
          return Math.hypot(tx-mx,ty-my)<def.range*CELL;
        });
        if (target) {
          t.cooldown=def.rate;
          const [c0,r0]=PATH_CELLS[target.pathIdx], [c1,r1]=PATH_CELLS[target.pathIdx+1]||PATH_CELLS[target.pathIdx];
          s.projectiles.push({ x:tx, y:ty, tx:(c0+(c1-c0)*target.progress)*CELL+CELL/2, ty:(r0+(r1-r0)*target.progress)*CELL+CELL/2, targetId:target.id, dmg:def.dmg+(t.level||0)*5, slow:def.slow||0, color:def.color, speed:8 });
        }
      });
      s.projectiles = s.projectiles.filter(p => {
        const dx=p.tx-p.x, dy=p.ty-p.y, d=Math.hypot(dx,dy);
        if (d<p.speed) {
          const m=s.monsters.find(m=>m.id===p.targetId);
          if (m) {
            m.hp-=p.dmg; if (p.slow) m.slowTimer=80;
            if (m.hp<=0) {
              s.gold+=m.reward; s.score+=m.reward;
              for (let i=0;i<8;i++) s.particles.push({ x:p.tx,y:p.ty,r:3+Math.random()*3,vx:(Math.random()-0.5)*5,vy:(Math.random()-0.5)*5,color:m.color,life:30,maxLife:30 });
              s.monsters=s.monsters.filter(mo=>mo.id!==m.id);
            }
          }
          return false;
        }
        p.x+=(dx/d)*p.speed; p.y+=(dy/d)*p.speed;
        return true;
      });
      s.particles=s.particles.filter(p => { p.x+=p.vx; p.y+=p.vy; p.life--; return p.life>0; });
      drawMonsters(); drawProjectiles(); drawParticles();
      if (s.frame%10===0) syncUi();
      rafRef.current=requestAnimationFrame(loop);
    };
    rafRef.current=requestAnimationFrame(loop);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [spawnMonster]);

  const handleCanvasClick = useCallback((e) => {
    const s=stateRef.current;
    if (!s.selectedTower||s.gameOver||s.victory) return;
    const rect=canvasRef.current.getBoundingClientRect();
    const scaleX=(GRID_COLS*CELL)/rect.width, scaleY=(GRID_ROWS*CELL)/rect.height;
    const col=Math.floor((e.clientX-rect.left)*scaleX/CELL), row=Math.floor((e.clientY-rect.top)*scaleY/CELL);
    if (col<0||col>=GRID_COLS||row<0||row>=GRID_ROWS) return;
    if (PATH_SET.has(`${col},${row}`)) return;
    if (s.towers.find(t=>t.col===col&&t.row===row)) return;
    const def=TOWER_TYPES[s.selectedTower];
    if (s.gold<def.cost) return;
    s.gold-=def.cost; s.towers.push({ col,row,type:s.selectedTower,cooldown:0,level:0 });
    syncUi();
  }, []);

  const selectTower=(type)=>{ stateRef.current.selectedTower=stateRef.current.selectedTower===type?null:type; syncUi(); };
  const startWave=()=>{
    const s=stateRef.current;
    if (!s.waveActive&&s.waveIdx<WAVE_DEFS.length&&!s.gameOver&&!s.victory) {
      s.waveActive=true; s.spawnTimer=0; syncUi();
    }
  };
  const resetTD=()=>{
    const s=stateRef.current;
    Object.assign(s,{ towers:[],monsters:[],projectiles:[],particles:[],gold:400,lives:20,score:0,waveIdx:0,waveActive:false,spawnTimer:0,spawnCount:0,selectedTower:null,frame:0,gameOver:false,victory:false });
    syncUi();
    if (!rafRef.current) { const loop2=()=>{ rafRef.current=requestAnimationFrame(loop2); }; rafRef.current=requestAnimationFrame(()=>{}); }
  };

  return (
    <div className="space-y-2 w-full">
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <div className="flex gap-1 flex-wrap">
          {Object.entries(TOWER_TYPES).map(([k,v])=>(
            <button key={k} onClick={()=>selectTower(k)}
              className={`px-3 py-1.5 border-2 font-mono text-xs font-bold transition-all ${ui.selectedTower===k?'bg-[#ccff00] text-black border-[#ccff00]':'border-zinc-700 text-zinc-300 hover:border-[#ccff00]'}`}>
              {v.emoji} {v.name} [{v.cost}g]
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={startWave} disabled={ui.waveActive||ui.gameOver||ui.victory}
            className="px-3 py-1.5 border-2 border-[#ccff00] text-[#ccff00] font-mono text-xs font-bold hover:bg-[#ccff00] hover:text-black disabled:opacity-40 transition-all">
            {ui.waveActive?'▶ WAVE ACTIVE':'⚔ SEND WAVE'}
          </button>
          <button onClick={resetTD} className="px-3 py-1.5 border-2 border-zinc-600 text-zinc-400 font-mono text-xs font-bold hover:border-white hover:text-white transition-all">↺</button>
        </div>
      </div>
      <div className="flex gap-3 font-mono text-xs">
        <span className="text-yellow-400">💰 {ui.gold}g</span>
        <span className="text-red-400">❤ {ui.lives}</span>
        <span className="text-[#ccff00]">✦ {ui.score}</span>
        <span className="text-zinc-400">WAVE {Math.min(ui.waveIdx+1,WAVE_DEFS.length)}/{WAVE_DEFS.length}</span>
        {ui.selectedTower && <span className="text-cyan-400">▶ PLACE {TOWER_TYPES[ui.selectedTower]?.name.toUpperCase()}</span>}
      </div>
      <div className="relative overflow-x-auto">
        <canvas ref={canvasRef} width={GRID_COLS*CELL} height={GRID_ROWS*CELL} onClick={handleCanvasClick}
          className="block w-full cursor-crosshair border border-zinc-800" style={{ background:'#0b0b14', maxWidth:'100%' }} />
        {(ui.gameOver||ui.victory) && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-3">
            <div className={`font-black text-3xl ${ui.victory?'text-[#ccff00]':'text-red-400'}`}>
              {ui.victory?'✦ DUNGEON CLEARED':'✖ FORTRESS FALLEN'}
            </div>
            <div className="text-white text-sm font-mono">SCORE: {ui.score}</div>
            <button onClick={resetTD} className="px-8 py-3 bg-[#ccff00] text-black font-bold text-sm hover:bg-white transition-colors">↺ REBUILD</button>
          </div>
        )}
      </div>
      <div className="text-zinc-600 text-xs font-mono">click tower type → click grid to place • send wave when ready</div>
    </div>
  );
}

// ─────────────────────────────────────────
// GAME 2: CYBER TETRIS MATRIX
// ─────────────────────────────────────────
const T_COLS = 10;
const T_ROWS = 20;
const T_CELL = 24;

const TETROMINOES = {
  I: { shape:[[0,0],[1,0],[2,0],[3,0]], color:'#00f5ff' },
  O: { shape:[[0,0],[1,0],[0,1],[1,1]], color:'#ffd700' },
  T: { shape:[[1,0],[0,1],[1,1],[2,1]], color:'#c800ff' },
  S: { shape:[[1,0],[2,0],[0,1],[1,1]], color:'#00ff41' },
  Z: { shape:[[0,0],[1,0],[1,1],[2,1]], color:'#ff2d78' },
  J: { shape:[[0,0],[0,1],[1,1],[2,1]], color:'#ff8c00' },
  L: { shape:[[2,0],[0,1],[1,1],[2,1]], color:'#ccff00' },
};
const TETRO_KEYS = Object.keys(TETROMINOES);

function rotatePiece(shape) {
  const maxX = Math.max(...shape.map(([x])=>x));
  return shape.map(([x,y]) => [y, maxX-x]);
}

function newTetro() {
  const key = TETRO_KEYS[Math.floor(Math.random()*TETRO_KEYS.length)];
  const def = TETROMINOES[key];
  return { key, shape:[...def.shape.map(c=>[...c])], color:def.color, x:3, y:0 };
}

function CyberTetrisMatrix() {
  const canvasRef = useRef(null);
  const previewRef = useRef(null);
  const gameRef = useRef(null);
  const rafRef = useRef(null);
  const [ui, setUi] = useState({ score:0, lines:0, level:1, gameOver:false, paused:false, started:false, held:null });

  const initState = () => ({
    board: Array.from({length:T_ROWS}, ()=>Array(T_COLS).fill(null)),
    current: newTetro(),
    next: newTetro(),
    held: null,
    canHold: true,
    score: 0, lines: 0, level: 1,
    dropTimer: 0,
    gameOver: false,
    paused: false,
    started: false,
    lastTime: 0,
  });

  const syncUi = (g) => {
    const s = g || gameRef.current;
    if (!s) return;
    setUi({ score:s.score, lines:s.lines, level:s.level, gameOver:s.gameOver, paused:s.paused, started:s.started, held:s.held?.key||null });
  };

  const isValid = (shape, ox, oy, board) => {
    return shape.every(([x,y]) => {
      const nx=x+ox, ny=y+oy;
      return nx>=0 && nx<T_COLS && ny<T_ROWS && (ny<0 || !board[ny][nx]);
    });
  };

  const lockPiece = useCallback((g) => {
    const { current:p, board } = g;
    p.shape.forEach(([x,y]) => {
      const ny=y+p.y, nx=x+p.x;
      if (ny>=0) board[ny][nx] = p.color;
    });
    // clear lines
    let cleared=0;
    for (let r=T_ROWS-1;r>=0;) {
      if (board[r].every(c=>c)) { board.splice(r,1); board.unshift(Array(T_COLS).fill(null)); cleared++; }
      else r--;
    }
    const pts = [0,100,300,500,800][cleared] * g.level;
    g.score += pts; g.lines += cleared;
    g.level = Math.floor(g.lines/10)+1;
    g.current = g.next; g.next = newTetro(); g.canHold = true;
    if (!isValid(g.current.shape, g.current.x, g.current.y, board)) { g.gameOver=true; }
  }, []);

  const dropInterval = (level) => Math.max(80, 800 - (level-1)*70);

  const drawBoard = useCallback((ctx, g) => {
    // bg
    ctx.fillStyle = '#030310';
    ctx.fillRect(0,0,T_COLS*T_CELL,T_ROWS*T_CELL);
    // grid
    ctx.strokeStyle='rgba(0,245,255,0.05)'; ctx.lineWidth=0.5;
    for (let c=0;c<=T_COLS;c++) { ctx.beginPath(); ctx.moveTo(c*T_CELL,0); ctx.lineTo(c*T_CELL,T_ROWS*T_CELL); ctx.stroke(); }
    for (let r=0;r<=T_ROWS;r++) { ctx.beginPath(); ctx.moveTo(0,r*T_CELL); ctx.lineTo(T_COLS*T_CELL,r*T_CELL); ctx.stroke(); }
    // locked
    g.board.forEach((row,r)=>row.forEach((color,c)=>{
      if (!color) return;
      ctx.fillStyle=color; ctx.fillRect(c*T_CELL+1,r*T_CELL+1,T_CELL-2,T_CELL-2);
      ctx.strokeStyle='rgba(255,255,255,0.3)'; ctx.lineWidth=1; ctx.strokeRect(c*T_CELL+1,r*T_CELL+1,T_CELL-2,T_CELL-2);
    }));
    // ghost
    if (g.current) {
      let gy=g.current.y;
      while (isValid(g.current.shape, g.current.x, gy+1, g.board)) gy++;
      g.current.shape.forEach(([x,y])=>{
        const gx=(x+g.current.x)*T_CELL, gyy=(y+gy)*T_CELL;
        if (y+gy>=0) { ctx.strokeStyle=g.current.color+'66'; ctx.lineWidth=1; ctx.strokeRect(gx+1,gyy+1,T_CELL-2,T_CELL-2); }
      });
      // current
      g.current.shape.forEach(([x,y])=>{
        const cx=(x+g.current.x)*T_CELL, cy=(y+g.current.y)*T_CELL;
        if (y+g.current.y>=0) {
          ctx.fillStyle=g.current.color; ctx.fillRect(cx+1,cy+1,T_CELL-2,T_CELL-2);
          ctx.strokeStyle='rgba(255,255,255,0.4)'; ctx.lineWidth=1.5; ctx.strokeRect(cx+1,cy+1,T_CELL-2,T_CELL-2);
          ctx.shadowColor=g.current.color; ctx.shadowBlur=8; ctx.fillRect(cx+1,cy+1,T_CELL-2,T_CELL-2); ctx.shadowBlur=0;
        }
      });
    }
  }, [isValid]);

  const drawPreview = useCallback((ctx, piece, label) => {
    ctx.fillStyle='#030310'; ctx.fillRect(0,0,4*T_CELL,4*T_CELL);
    ctx.strokeStyle='rgba(0,245,255,0.08)'; ctx.lineWidth=0.5;
    for (let c=0;c<=4;c++) { ctx.beginPath(); ctx.moveTo(c*T_CELL,0); ctx.lineTo(c*T_CELL,4*T_CELL); ctx.stroke(); }
    for (let r=0;r<=4;r++) { ctx.beginPath(); ctx.moveTo(0,r*T_CELL); ctx.lineTo(4*T_CELL,r*T_CELL); ctx.stroke(); }
    if (piece) {
      const minX=Math.min(...piece.shape.map(([x])=>x)), minY=Math.min(...piece.shape.map(([,y])=>y));
      const maxX=Math.max(...piece.shape.map(([x])=>x)), maxY=Math.max(...piece.shape.map(([,y])=>y));
      const offX=Math.floor((4-(maxX-minX+1))/2)-minX, offY=Math.floor((4-(maxY-minY+1))/2)-minY;
      piece.shape.forEach(([x,y])=>{
        const cx=(x+offX)*T_CELL, cy=(y+offY)*T_CELL;
        ctx.fillStyle=piece.color; ctx.fillRect(cx+1,cy+1,T_CELL-2,T_CELL-2);
        ctx.shadowColor=piece.color; ctx.shadowBlur=6; ctx.fillRect(cx+1,cy+1,T_CELL-2,T_CELL-2); ctx.shadowBlur=0;
      });
    }
  }, []);

  const handleStart = useCallback(() => {
    const g = initState();
    g.started = true;
    gameRef.current = g;
    syncUi(g);
  }, []);

  useEffect(() => {
    gameRef.current = initState();
    const GAME_KEYS = new Set(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','KeyW','KeyS','Space','KeyC','KeyP','Escape']);
    const onKey = (e) => {
      if (GAME_KEYS.has(e.code)) e.preventDefault();
      const g = gameRef.current;
      if (!g || g.gameOver) {
        if (e.code==='Space'||e.code==='Enter') { handleStart(); }
        return;
      }
      if (e.code==='KeyP'||e.code==='Escape') { g.paused=!g.paused; syncUi(g); return; }
      if (!g.started) { if (e.code==='Space'||e.code==='Enter') { handleStart(); } return; }
      if (g.paused) return;
      const p=g.current;
      if (e.code==='ArrowLeft') { if (isValid(p.shape,p.x-1,p.y,g.board)) p.x--; }
      else if (e.code==='ArrowRight') { if (isValid(p.shape,p.x+1,p.y,g.board)) p.x++; }
      else if (e.code==='ArrowDown'||e.code==='KeyS') { if (isValid(p.shape,p.x,p.y+1,g.board)) { p.y++; g.score+=1; } }
      else if (e.code==='ArrowUp'||e.code==='KeyW') {
        const rot=rotatePiece(p.shape);
        const kicks=[0,-1,1,-2,2];
        for (const kick of kicks) { if (isValid(rot,p.x+kick,p.y,g.board)) { p.shape=rot; p.x+=kick; break; } }
      }
      else if (e.code==='Space') {
        while (isValid(p.shape,p.x,p.y+1,g.board)) { p.y++; g.score+=2; }
        lockPiece(g);
      }
      else if (e.code==='KeyC') {
        if (!g.canHold) return;
        const prevHeld=g.held;
        g.held={ key:p.key, shape:[...TETROMINOES[p.key].shape.map(c=>[...c])], color:p.color };
        g.canHold=false;
        if (prevHeld) { g.current={ key:prevHeld.key, shape:[...TETROMINOES[prevHeld.key].shape.map(c=>[...c])], color:prevHeld.color, x:3, y:0 }; }
        else { g.current=g.next; g.next=newTetro(); }
      }
      syncUi(g);
    };
    window.addEventListener('keydown', onKey);

    let lastTime=0;
    const loop = (ts) => {
      const g=gameRef.current;
      if (!g) return;
      const canvas=canvasRef.current, pCanvas=previewRef.current;
      if (!canvas||!pCanvas) { rafRef.current=requestAnimationFrame(loop); return; }
      const ctx=canvas.getContext('2d'), pCtx=pCanvas.getContext('2d');

      if (!g.started||g.paused||g.gameOver) {
        drawBoard(ctx,g);
        ctx.fillStyle='rgba(3,3,16,0.85)'; ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.font='bold 22px monospace'; ctx.fillStyle='#ccff00'; ctx.textAlign='center'; ctx.textBaseline='middle';
        ctx.shadowColor='#ccff00'; ctx.shadowBlur=20;
        if (g.gameOver) ctx.fillText('GAME OVER',canvas.width/2,canvas.height/2-20);
        else if (g.paused) ctx.fillText('PAUSED',canvas.width/2,canvas.height/2-20);
        else ctx.fillText('CYBER TETRIS',canvas.width/2,canvas.height/2-20);
        ctx.shadowBlur=0;
        ctx.font='12px monospace'; ctx.fillStyle='#a3a3a3';
        ctx.fillText(g.gameOver?`SCORE: ${g.score}  [SPACE] restart`:'[SPACE] to start  [P] pause  [C] hold',canvas.width/2,canvas.height/2+16);
        rafRef.current=requestAnimationFrame(loop);
        return;
      }

      const dt=ts-lastTime; lastTime=ts;
      g.dropTimer=(g.dropTimer||0)+dt;
      if (g.dropTimer>=dropInterval(g.level)) {
        g.dropTimer=0;
        if (isValid(g.current.shape,g.current.x,g.current.y+1,g.board)) g.current.y++;
        else lockPiece(g);
        syncUi(g);
      }
      drawBoard(ctx,g);
      drawPreview(pCtx,g.next,'NEXT');
      if (g.gameOver) { syncUi(g); return; }
      rafRef.current=requestAnimationFrame(loop);
    };
    rafRef.current=requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('keydown',onKey);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [drawBoard, drawPreview, isValid, lockPiece, handleStart]);

  const handleMobileBtn = (action) => {
    const g = gameRef.current;
    if (!g||g.gameOver||!g.started||g.paused) return;
    const p=g.current;
    if (action==='left') { if (isValid(p.shape,p.x-1,p.y,g.board)) p.x--; }
    else if (action==='right') { if (isValid(p.shape,p.x+1,p.y,g.board)) p.x++; }
    else if (action==='rotate') { const rot=rotatePiece(p.shape); for (const k of [0,-1,1,-2,2]) { if (isValid(rot,p.x+k,p.y,g.board)) { p.shape=rot; p.x+=k; break; } } }
    else if (action==='down') { if (isValid(p.shape,p.x,p.y+1,g.board)) { p.y++; g.score+=1; } }
    else if (action==='drop') { while (isValid(p.shape,p.x,p.y+1,g.board)) { p.y++; g.score+=2; } lockPiece(g); }
    syncUi(g);
  };

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <div className="flex gap-3 flex-wrap justify-center">
        {/* Board */}
        <div className="flex flex-col gap-1 relative">
          <canvas ref={canvasRef} width={T_COLS*T_CELL} height={T_ROWS*T_CELL}
            className="border-2 border-[#00f5ff] block cursor-pointer" style={{ boxShadow:'0 0 20px rgba(0,245,255,0.3)' }}
            onClick={handleStart} />
          {/* Visual START / PLAY AGAIN overlay button — only when not running */}
          {(!ui.started || ui.gameOver) && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none">
              <button
                className="pointer-events-auto px-6 py-3 bg-[#ccff00] text-black font-mono font-black text-sm border-2 border-[#ccff00] hover:bg-white hover:border-white transition-all shadow-[0_0_20px_rgba(204,255,0,0.5)] active:scale-95"
                onClick={(e) => { e.stopPropagation(); handleStart(); }}
              >
                {ui.gameOver ? '↺ PLAY AGAIN' : '▶ START GAME'}
              </button>
            </div>
          )}
        </div>
        {/* Side panel */}
        <div className="flex flex-col gap-3 min-w-[110px]">
          <div>
            <div className="font-mono text-[10px] text-zinc-500 mb-1">NEXT</div>
            <canvas ref={previewRef} width={4*T_CELL} height={4*T_CELL} className="border border-zinc-700 block" />
          </div>
          {ui.held && (
            <div>
              <div className="font-mono text-[10px] text-zinc-500 mb-1">HOLD [C]</div>
              <div className="w-[112px] h-[112px] border border-zinc-700 bg-[#030310] flex items-center justify-center">
                <span className="font-mono text-xs" style={{ color:TETROMINOES[ui.held]?.color }}>{ui.held}</span>
              </div>
            </div>
          )}
          <div className="font-mono text-xs space-y-2 mt-2">
            <div><div className="text-zinc-500 text-[10px]">SCORE</div><div className="text-[#ccff00] text-base font-black">{ui.score}</div></div>
            <div><div className="text-zinc-500 text-[10px]">LINES</div><div className="text-cyan-400 font-bold">{ui.lines}</div></div>
            <div><div className="text-zinc-500 text-[10px]">LEVEL</div><div className="text-magenta-400 font-bold" style={{color:'#c800ff'}}>{ui.level}</div></div>
          </div>
        </div>
      </div>
      {/* Mobile controls */}
      <div className="flex flex-col items-center gap-1">
        <button onPointerDown={()=>handleMobileBtn('rotate')} className="w-9 h-9 border-2 border-zinc-600 bg-zinc-900 text-[#ccff00] font-bold hover:border-[#ccff00] active:bg-zinc-800 flex items-center justify-center text-xs">↑ROT</button>
        <div className="flex gap-1">
          <button onPointerDown={()=>handleMobileBtn('left')}  className="w-9 h-9 border-2 border-zinc-600 bg-zinc-900 text-[#ccff00] font-bold hover:border-[#ccff00] active:bg-zinc-800 flex items-center justify-center text-lg">◄</button>
          <button onPointerDown={()=>handleMobileBtn('down')}  className="w-9 h-9 border-2 border-zinc-600 bg-zinc-900 text-[#ccff00] font-bold hover:border-[#ccff00] active:bg-zinc-800 flex items-center justify-center text-lg">▼</button>
          <button onPointerDown={()=>handleMobileBtn('right')} className="w-9 h-9 border-2 border-zinc-600 bg-zinc-900 text-[#ccff00] font-bold hover:border-[#ccff00] active:bg-zinc-800 flex items-center justify-center text-lg">►</button>
        </div>
        <button onPointerDown={()=>handleMobileBtn('drop')} className="px-6 h-9 border-2 border-[#ccff00] bg-zinc-900 text-[#ccff00] font-bold hover:bg-[#ccff00] hover:text-black active:bg-zinc-800 text-xs font-mono">HARD DROP</button>
      </div>
      <div className="text-zinc-600 font-mono text-[10px] text-center">
        ←/→ move  •  ↑/W rotate  •  ↓/S soft drop  •  SPACE hard drop  •  C hold  •  P pause
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// GAME 3: CYBER DINO RUNNER
// ─────────────────────────────────────────
const DINO_W = 700;
const DINO_H = 200;
const GROUND_Y = 158;
const DINO_X = 80;
const JUMP_VEL = -13;
const GRAVITY = 0.55;
const DUCK_H = 22;
const STAND_H = 38;
const STAND_W = 26;
const DUCK_W = 38;

function CyberDinoRunner() {
  const canvasRef = useRef(null);
  const gameRef = useRef(null);
  const rafRef = useRef(null);
  const [ui, setUi] = useState({ score:0, highScore:0, alive:true, started:false, speed:6 });

  const initState = () => ({
    dinoY: GROUND_Y - STAND_H,
    dinoVy: 0,
    ducking: false,
    onGround: true,
    jumpCount: 0,
    score: 0,
    highScore: 0,
    dist: 0,
    speed: 6,
    alive: true,
    started: false,
    obstacles: [],
    particles: [],
    stars: Array.from({length:40},()=>({ x:Math.random()*DINO_W, y:Math.random()*80, r:Math.random()*1.5+0.3, twinkle:Math.random()*Math.PI*2 })),
    frame: 0,
    nightPhase: 0,
    nextObsIn: 90,
  });

  const syncUi=(g)=>{ const s=g||gameRef.current; if(!s)return; setUi({score:Math.floor(s.score),highScore:Math.floor(s.highScore),alive:s.alive,started:s.started,speed:s.speed.toFixed(1)}); };

  const jump=(g)=>{
    if (g.jumpCount<2) { g.dinoVy=JUMP_VEL; g.onGround=false; g.jumpCount++; g.ducking=false;
      // landing particles
      for(let i=0;i<6;i++) g.particles.push({x:DINO_X+STAND_W/2,y:GROUND_Y,vx:(Math.random()-0.5)*4,vy:-Math.random()*3,life:18,maxLife:18,color:'#ccff00'});
    }
  };

  useEffect(() => {
    gameRef.current = initState();
    const GAME_KEYS = new Set(['Space','ArrowUp','ArrowDown','KeyW','KeyS']);
    const onKey = (e) => {
      if (GAME_KEYS.has(e.code)) e.preventDefault();
      const g=gameRef.current; if(!g) return;
      if (!g.started||!g.alive) { if (e.code==='Space'||e.code==='ArrowUp') { const prev=g.highScore; gameRef.current=initState(); gameRef.current.highScore=prev; gameRef.current.started=true; syncUi(gameRef.current); } return; }
      if (e.code==='Space'||e.code==='ArrowUp'||e.code==='KeyW') jump(g);
      if (e.code==='ArrowDown'||e.code==='KeyS') { if (!g.onGround) { g.dinoVy+=4; } else { g.ducking=true; } }
    };
    const onKeyUp = (e) => {
      if (GAME_KEYS.has(e.code)) e.preventDefault();
      const g=gameRef.current; if(!g) return;
      if (e.code==='ArrowDown'||e.code==='KeyS') g.ducking=false;
    };
    window.addEventListener('keydown',onKey);
    window.addEventListener('keyup',onKeyUp);

    const loop = () => {
      const g=gameRef.current; if(!g) return;
      const canvas=canvasRef.current; if(!canvas) { rafRef.current=requestAnimationFrame(loop); return; }
      const ctx=canvas.getContext('2d');

      const nightAlpha=0.5+0.5*Math.sin(g.nightPhase);

      // bg sky
      const sky1=`rgba(3,3,16,1)`, sky2=`rgba(10,5,30,${0.5+nightAlpha*0.5})`;
      const grad=ctx.createLinearGradient(0,0,0,GROUND_Y);
      grad.addColorStop(0,sky2); grad.addColorStop(1,sky1);
      ctx.fillStyle=grad; ctx.fillRect(0,0,DINO_W,DINO_H);

      // stars
      g.stars.forEach(s=>{ s.twinkle+=0.05; const alpha=0.3+0.7*Math.abs(Math.sin(s.twinkle))*nightAlpha; ctx.fillStyle=`rgba(200,220,255,${alpha})`; ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fill(); s.x-=g.speed*0.15; if(s.x<0)s.x=DINO_W; });

      // neon grid ground
      ctx.strokeStyle='rgba(0,245,255,0.12)'; ctx.lineWidth=0.5;
      const gridOff=(g.dist*g.speed)%40;
      for(let x=-gridOff;x<DINO_W;x+=40) { ctx.beginPath(); ctx.moveTo(x,GROUND_Y); ctx.lineTo(x+20,DINO_H-10); ctx.stroke(); }
      // ground line
      ctx.strokeStyle='#00f5ff'; ctx.lineWidth=2;
      ctx.shadowColor='#00f5ff'; ctx.shadowBlur=8;
      ctx.beginPath(); ctx.moveTo(0,GROUND_Y); ctx.lineTo(DINO_W,GROUND_Y); ctx.stroke();
      ctx.shadowBlur=0;
      // second ground line
      ctx.strokeStyle='rgba(0,245,255,0.3)'; ctx.lineWidth=1;
      ctx.beginPath(); ctx.moveTo(0,GROUND_Y+4); ctx.lineTo(DINO_W,GROUND_Y+4); ctx.stroke();

      if (!g.started||!g.alive) {
        // overlay
        ctx.fillStyle='rgba(3,3,16,0.7)'; ctx.fillRect(0,0,DINO_W,DINO_H);
        ctx.font='bold 28px monospace'; ctx.fillStyle='#ccff00'; ctx.textAlign='center'; ctx.textBaseline='middle';
        ctx.shadowColor='#ccff00'; ctx.shadowBlur=20;
        ctx.fillText(g.alive?'CYBER DINO RUNNER':'GAME OVER',DINO_W/2,DINO_H/2-22);
        ctx.shadowBlur=0;
        ctx.font='13px monospace'; ctx.fillStyle='#a3a3a3';
        if (!g.alive) { ctx.fillStyle='#ff2d78'; ctx.fillText(`SCORE: ${Math.floor(g.score)}  HI: ${Math.floor(g.highScore)}`,DINO_W/2,DINO_H/2+4); ctx.fillStyle='#a3a3a3'; }
        ctx.fillText('[SPACE] / [↑] to start',DINO_W/2,DINO_H/2+24);
        rafRef.current=requestAnimationFrame(loop); return;
      }

      g.frame++; g.dist+=0.016; g.nightPhase+=0.003;
      g.score+=g.speed*0.1;
      g.speed=Math.min(18, 6+g.dist*0.08);

      // physics
      if (!g.onGround) { g.dinoVy+=GRAVITY; g.dinoY+=g.dinoVy; }
      if (g.dinoY>=GROUND_Y-STAND_H) { g.dinoY=GROUND_Y-STAND_H; g.dinoVy=0; g.onGround=true; g.jumpCount=0;
        for(let i=0;i<3;i++) g.particles.push({x:DINO_X+STAND_W/2,y:GROUND_Y,vx:(Math.random()-0.5)*3,vy:-Math.random()*2,life:12,maxLife:12,color:'rgba(0,245,255,0.8)'});
      }
      const dinoH=g.ducking?DUCK_H:STAND_H, dinoW=g.ducking?DUCK_W:STAND_W;
      const dinoTop=g.ducking?GROUND_Y-DUCK_H:g.dinoY;

      // obstacles
      g.nextObsIn--;
      if (g.nextObsIn<=0) {
        const type=Math.random()<0.25?'ptero':'cactus';
        if (type==='cactus') {
          const h=30+Math.floor(Math.random()*25), w=12+Math.floor(Math.random()*10);
          g.obstacles.push({ type:'cactus', x:DINO_W+10, y:GROUND_Y-h, w, h, color:Math.random()<0.5?'#ccff00':'#00f5ff' });
        } else {
          g.obstacles.push({ type:'ptero', x:DINO_W+10, y:GROUND_Y-65-Math.random()*40, w:34, h:16, flap:0, color:'#c800ff' });
        }
        g.nextObsIn=Math.floor(60/g.speed*15)+Math.floor(Math.random()*50);
      }
      g.obstacles.forEach(o=>{ o.x-=g.speed; if(o.type==='ptero') o.flap+=0.18; });
      g.obstacles=g.obstacles.filter(o=>o.x>-60);

      // collision
      const pad=4;
      const hit=g.obstacles.some(o=>{
        return (DINO_X+pad < o.x+o.w-pad && DINO_X+dinoW-pad > o.x+pad && dinoTop+pad < o.y+o.h-pad && dinoTop+dinoH-pad > o.y+pad);
      });
      if (hit) { g.alive=false; g.highScore=Math.max(g.highScore,g.score); syncUi(g); rafRef.current=requestAnimationFrame(loop); return; }

      // draw dino
      const legOff = g.onGround && !g.ducking ? (g.frame%12<6?2:-2) : 0;
      ctx.fillStyle='#ccff00';
      ctx.shadowColor='#ccff00'; ctx.shadowBlur=12;
      // body
      ctx.fillRect(DINO_X, dinoTop, dinoW, dinoH);
      ctx.shadowBlur=0;
      // eye
      ctx.fillStyle='#030310'; ctx.fillRect(DINO_X+dinoW-7, dinoTop+4, 5, 5);
      ctx.fillStyle='#00f5ff'; ctx.fillRect(DINO_X+dinoW-6, dinoTop+5, 3, 3);
      // legs (running animation)
      if (!g.ducking) {
        ctx.fillStyle='#ccff00';
        ctx.fillRect(DINO_X+4, dinoTop+dinoH, 7, 6+legOff);
        ctx.fillRect(DINO_X+14, dinoTop+dinoH, 7, 6-legOff);
      }
      // arm-like detail
      ctx.fillStyle='rgba(204,255,0,0.5)';
      ctx.fillRect(DINO_X+dinoW, dinoTop+8, 8, 5);

      // obstacles draw
      g.obstacles.forEach(o=>{
        ctx.fillStyle=o.color;
        ctx.shadowColor=o.color; ctx.shadowBlur=10;
        if (o.type==='cactus') {
          ctx.fillRect(o.x,o.y,o.w,o.h);
          ctx.fillRect(o.x-5,o.y+8,5,o.h*0.6);
          ctx.fillRect(o.x+o.w,o.y+10,5,o.h*0.5);
        } else {
          // pterodactyl
          const fy=Math.sin(o.flap)*5;
          ctx.fillRect(o.x+8,o.y+8,18,8);
          ctx.fillRect(o.x,o.y+4+fy,12,6);
          ctx.fillRect(o.x+22,o.y+4-fy,12,6);
          ctx.fillRect(o.x+12,o.y+12,10,6);
        }
        ctx.shadowBlur=0;
      });

      // particles
      g.particles=g.particles.filter(p=>{
        p.x+=p.vx; p.y+=p.vy; p.life--;
        ctx.globalAlpha=p.life/p.maxLife;
        ctx.fillStyle=p.color; ctx.fillRect(p.x-2,p.y-2,4,4);
        ctx.globalAlpha=1;
        return p.life>0;
      });

      // HUD
      ctx.font='bold 14px monospace'; ctx.fillStyle='#ccff00'; ctx.textAlign='right'; ctx.textBaseline='top';
      ctx.shadowColor='#ccff00'; ctx.shadowBlur=6;
      ctx.fillText(`${String(Math.floor(g.score)).padStart(5,'0')}`,DINO_W-10,10);
      ctx.shadowBlur=0;
      ctx.font='11px monospace'; ctx.fillStyle='#a3a3a3';
      ctx.fillText(`HI ${String(Math.floor(g.highScore)).padStart(5,'0')}`,DINO_W-10,28);
      ctx.fillStyle='rgba(0,245,255,0.7)'; ctx.textAlign='left';
      ctx.fillText(`SPD:${g.speed.toFixed(1)}`,10,10);

      if (g.frame%10===0) syncUi(g);
      rafRef.current=requestAnimationFrame(loop);
    };
    rafRef.current=requestAnimationFrame(loop);
    return ()=>{
      window.removeEventListener('keydown',onKey);
      window.removeEventListener('keyup',onKeyUp);
      if(rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleTap = useCallback((e) => {
    e.preventDefault();
    const g=gameRef.current; if(!g) return;
    if (!g.started||!g.alive) { const prev=g.highScore; gameRef.current=initState(); gameRef.current.highScore=prev; gameRef.current.started=true; syncUi(gameRef.current); return; }
    jump(g);
  }, []);

  const handleDuckStart = useCallback((e) => { e.preventDefault(); const g=gameRef.current; if(g&&g.started&&g.alive) g.ducking=true; }, []);
  const handleDuckEnd   = useCallback((e) => { e.preventDefault(); const g=gameRef.current; if(g) g.ducking=false; }, []);

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <div className="relative overflow-hidden" style={{ width:'100%', maxWidth:DINO_W }}>
        <canvas ref={canvasRef} width={DINO_W} height={DINO_H}
          className="block w-full border-2 border-[#00f5ff] cursor-pointer"
          style={{ boxShadow:'0 0 24px rgba(0,245,255,0.25)', touchAction:'none' }}
          onPointerDown={handleTap} />
        {/* Visual START overlay when not running */}
        {(!ui.started || !ui.alive) && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <button
              className="pointer-events-auto px-8 py-3 bg-[#ccff00] text-black font-mono font-black text-base border-2 border-[#ccff00] hover:bg-white hover:border-white transition-all shadow-[0_0_24px_rgba(204,255,0,0.5)] active:scale-95"
              onPointerDown={(e) => { e.stopPropagation(); handleTap(e); }}
            >
              {!ui.alive ? '↺ PLAY AGAIN' : '▶ START GAME'}
            </button>
          </div>
        )}
      </div>
      <div className="flex gap-3">
        <button onPointerDown={handleTap} className="px-5 py-2 border-2 border-[#ccff00] text-[#ccff00] font-mono text-xs font-bold hover:bg-[#ccff00] hover:text-black transition-all">▲ JUMP</button>
        <button onPointerDown={handleDuckStart} onPointerUp={handleDuckEnd} className="px-5 py-2 border-2 border-zinc-600 text-zinc-300 font-mono text-xs font-bold hover:border-[#00f5ff] transition-all">▼ DUCK</button>
      </div>
      <div className="text-zinc-600 font-mono text-xs text-center">
        SPACE/↑/Tap: jump (double-jump ok)  •  ↓/S: duck  •  dodge cyber-cacti &amp; drones
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// GAME 4: PACKET CIRCUIT RUNNER (Snake)
// ─────────────────────────────────────────
const SNAKE_COLS = 28;
const SNAKE_ROWS = 18;
const SNAKE_CELL = 22;

function PacketCircuitRunner() {
  const canvasRef = useRef(null);
  const gameRef = useRef({
    snake: [[7,9],[6,9],[5,9]],
    dir: [1,0], nextDir: [1,0],
    packet: null, traps: [],
    score: 0, highScore: 0,
    alive: true, started: false, frame: 0, speed: 8,
  });
  const [ui, setUi] = useState({ score:0, highScore:0, alive:true, started:false });
  const rafRef = useRef(null);

  const syncUi = () => { const g=gameRef.current; setUi({ score:g.score, highScore:g.highScore, alive:g.alive, started:g.started }); };

  const randCell = useCallback(() => {
    const g=gameRef.current;
    let pos;
    do { pos=[Math.floor(Math.random()*SNAKE_COLS),Math.floor(Math.random()*SNAKE_ROWS)]; }
    while (g.snake.some(([sx,sy])=>sx===pos[0]&&sy===pos[1]));
    return pos;
  }, []);

  const resetGame = useCallback(() => {
    const g=gameRef.current;
    g.snake=[[7,9],[6,9],[5,9]]; g.dir=[1,0]; g.nextDir=[1,0];
    g.packet=randCell(); g.traps=[randCell(),randCell()];
    g.score=0; g.alive=true; g.started=true; g.frame=0; g.speed=8;
    syncUi();
  }, [randCell]);

  useEffect(() => {
    const GAME_KEYS=new Set(['Space','Enter','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','KeyW','KeyA','KeyS','KeyD']);
    const onKey=(e)=>{
      if (GAME_KEYS.has(e.code)) e.preventDefault();
      const g=gameRef.current;
      const dirs={ArrowUp:[0,-1],ArrowDown:[0,1],ArrowLeft:[-1,0],ArrowRight:[1,0],KeyW:[0,-1],KeyS:[0,1],KeyA:[-1,0],KeyD:[1,0]};
      const d=dirs[e.code];
      if (d&&!(d[0]===-g.dir[0]&&d[1]===-g.dir[1])) g.nextDir=d;
      if ((e.code==='Space'||e.code==='Enter')&&(!g.started||!g.alive)) resetGame();
    };
    window.addEventListener('keydown',onKey);
    return ()=>window.removeEventListener('keydown',onKey);
  }, [resetGame]);

  useEffect(() => {
    const canvas=canvasRef.current; if(!canvas) return;
    const ctx=canvas.getContext('2d');

    const drawBg=()=>{
      ctx.fillStyle='#030310'; ctx.fillRect(0,0,canvas.width,canvas.height);
      ctx.strokeStyle='rgba(0,255,80,0.05)'; ctx.lineWidth=0.5;
      for(let c=0;c<SNAKE_COLS;c++) { ctx.beginPath(); ctx.moveTo(c*SNAKE_CELL,0); ctx.lineTo(c*SNAKE_CELL,canvas.height); ctx.stroke(); }
      for(let r=0;r<SNAKE_ROWS;r++) { ctx.beginPath(); ctx.moveTo(0,r*SNAKE_CELL); ctx.lineTo(canvas.width,r*SNAKE_CELL); ctx.stroke(); }
    };
    const drawSnake=(snake)=>{
      snake.forEach(([x,y],i)=>{
        const bx=x*SNAKE_CELL+1, by=y*SNAKE_CELL+1, bs=SNAKE_CELL-2;
        if(i===0){ ctx.fillStyle='#ccff00'; ctx.shadowColor='#ccff00'; ctx.shadowBlur=12; }
        else{ const t=1-i/snake.length; ctx.fillStyle=`rgba(${Math.round(80+t*60)},${Math.round(180+t*75)},0,${0.5+t*0.5})`; ctx.shadowColor='#4ade80'; ctx.shadowBlur=4; }
        ctx.fillRect(bx,by,bs,bs); ctx.shadowBlur=0;
        if(i<snake.length-1){ ctx.fillStyle='rgba(204,255,0,0.3)'; ctx.fillRect(bx+bs/2-1,by+bs/2-1,2,2); }
      });
    };
    const drawPacket=(p)=>{
      if(!p) return;
      const [px,py]=p, cx=px*SNAKE_CELL+SNAKE_CELL/2, cy=py*SNAKE_CELL+SNAKE_CELL/2;
      ctx.shadowColor='#fbbf24'; ctx.shadowBlur=16; ctx.fillStyle='#fbbf24';
      ctx.beginPath(); ctx.arc(cx,cy,SNAKE_CELL*0.35,0,Math.PI*2); ctx.fill(); ctx.shadowBlur=0;
      ctx.font=`bold ${SNAKE_CELL*0.5}px monospace`; ctx.fillStyle='#030310'; ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText('⬡',cx,cy);
    };
    const drawTraps=(traps)=>{
      traps.forEach(([tx,ty])=>{
        const cx=tx*SNAKE_CELL+SNAKE_CELL/2, cy=ty*SNAKE_CELL+SNAKE_CELL/2;
        ctx.shadowColor='#ef4444'; ctx.shadowBlur=10; ctx.strokeStyle='#ef4444'; ctx.lineWidth=2;
        ctx.strokeRect(tx*SNAKE_CELL+3,ty*SNAKE_CELL+3,SNAKE_CELL-6,SNAKE_CELL-6);
        ctx.font=`${SNAKE_CELL*0.5}px monospace`; ctx.fillStyle='#ef4444'; ctx.textAlign='center'; ctx.textBaseline='middle';
        ctx.fillText('✕',cx,cy); ctx.shadowBlur=0;
      });
    };

    const loop=()=>{
      const g=gameRef.current;
      drawBg();
      if (!g.started||!g.alive) {
        ctx.fillStyle='rgba(0,0,0,0.7)'; ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.font='bold 28px monospace'; ctx.fillStyle='#ccff00'; ctx.textAlign='center'; ctx.textBaseline='middle';
        ctx.shadowColor='#ccff00'; ctx.shadowBlur=20;
        ctx.fillText(g.started?'PACKET LOST':'CIRCUIT RUNNER',canvas.width/2,canvas.height/2-24); ctx.shadowBlur=0;
        ctx.font='14px monospace'; ctx.fillStyle='#a3a3a3';
        if (!g.started) ctx.fillText('Arrow/WASD to move  •  [SPACE] to start',canvas.width/2,canvas.height/2+10);
        else { ctx.fillStyle='#f87171'; ctx.fillText(`SCORE: ${g.score}  •  HI: ${g.highScore}`,canvas.width/2,canvas.height/2+10); ctx.fillStyle='#a3a3a3'; ctx.fillText('[SPACE] to retry',canvas.width/2,canvas.height/2+32); }
        rafRef.current=requestAnimationFrame(loop); return;
      }
      g.frame++;
      if (g.frame%Math.max(3,10-Math.floor(g.score/50))===0) {
        g.dir=[...g.nextDir];
        const head=[g.snake[0][0]+g.dir[0],g.snake[0][1]+g.dir[1]];
        head[0]=(head[0]+SNAKE_COLS)%SNAKE_COLS; head[1]=(head[1]+SNAKE_ROWS)%SNAKE_ROWS;
        if (g.snake.some(([sx,sy])=>sx===head[0]&&sy===head[1])) { g.alive=false; g.highScore=Math.max(g.highScore,g.score); syncUi(); rafRef.current=requestAnimationFrame(loop); return; }
        if (g.traps.some(([tx,ty])=>tx===head[0]&&ty===head[1])) { g.alive=false; g.highScore=Math.max(g.highScore,g.score); syncUi(); rafRef.current=requestAnimationFrame(loop); return; }
        let grew=false;
        if (g.packet&&head[0]===g.packet[0]&&head[1]===g.packet[1]) { g.score+=10; g.packet=randCell(); grew=true; if(g.score%30===0) g.traps.push(randCell()); syncUi(); }
        g.snake.unshift(head); if (!grew) g.snake.pop();
      }
      drawTraps(g.traps); drawPacket(g.packet); drawSnake(g.snake);
      // HUD
      ctx.font='bold 13px monospace'; ctx.fillStyle='#ccff00'; ctx.textAlign='left'; ctx.textBaseline='top';
      ctx.fillText(`SCORE: ${g.score}`,8,6);
      ctx.fillStyle='#a3a3a3'; ctx.fillText(`HI: ${g.highScore}`,8,22);
      rafRef.current=requestAnimationFrame(loop);
    };
    rafRef.current=requestAnimationFrame(loop);
    return ()=>{ if(rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [randCell]);

  const onScreenDir=(dx,dy)=>{
    const g=gameRef.current;
    if (!g.started||!g.alive) { resetGame(); return; }
    if (!(dx===-g.dir[0]&&dy===-g.dir[1])) g.nextDir=[dx,dy];
  };

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <div className="relative">
        <canvas ref={canvasRef} width={SNAKE_COLS*SNAKE_CELL} height={SNAKE_ROWS*SNAKE_CELL}
          className="block border border-zinc-700" style={{ maxWidth:SNAKE_COLS*SNAKE_CELL, background:'#030310' }} />
        {/* Visual START / RETRY overlay */}
        {(!ui.started || !ui.alive) && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <button
              className="pointer-events-auto px-8 py-3 bg-[#ccff00] text-black font-mono font-black text-base border-2 border-[#ccff00] hover:bg-white hover:border-white transition-all shadow-[0_0_24px_rgba(204,255,0,0.5)] active:scale-95"
              onPointerDown={(e) => { e.stopPropagation(); onScreenDir(1,0); }}
              onClick={() => resetGame()}
            >
              {ui.started && !ui.alive ? '↺ RETRY' : '▶ START GAME'}
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center gap-1">
        <button onPointerDown={()=>onScreenDir(0,-1)} className="w-10 h-10 border-2 border-zinc-600 bg-zinc-900 text-[#ccff00] font-bold hover:border-[#ccff00] active:bg-zinc-800 flex items-center justify-center text-lg">▲</button>
        <div className="flex gap-1">
          <button onPointerDown={()=>onScreenDir(-1,0)} className="w-10 h-10 border-2 border-zinc-600 bg-zinc-900 text-[#ccff00] font-bold hover:border-[#ccff00] active:bg-zinc-800 flex items-center justify-center text-lg">◄</button>
          <button onPointerDown={()=>onScreenDir(0,1)}  className="w-10 h-10 border-2 border-zinc-600 bg-zinc-900 text-[#ccff00] font-bold hover:border-[#ccff00] active:bg-zinc-800 flex items-center justify-center text-lg">▼</button>
          <button onPointerDown={()=>onScreenDir(1,0)}  className="w-10 h-10 border-2 border-zinc-600 bg-zinc-900 text-[#ccff00] font-bold hover:border-[#ccff00] active:bg-zinc-800 flex items-center justify-center text-lg">►</button>
        </div>
        <div className="mt-1 text-zinc-600 text-xs font-mono">Arrow/WASD • collect ⬡ packets • avoid ✕ traps</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// MAIN ARCADE SECTION
// ─────────────────────────────────────────
const TABS = [
  { id:'td',  icon:'🏰', label:'1. DUNGEON TOWER DEFENSE', component: DungeonTowerDefense },
  { id:'tet', icon:'🧱', label:'2. CYBER TETRIS MATRIX',   component: CyberTetrisMatrix   },
  { id:'dino',icon:'🦖', label:'3. CYBER DINO RUNNER',     component: CyberDinoRunner     },
  { id:'pcr', icon:'⚡', label:'4. PACKET CIRCUIT RUNNER', component: PacketCircuitRunner },
];

export default function ArcadeSection() {
  const [activeTab, setActiveTab] = useState('td');
  const ActiveGame = TABS.find(t => t.id === activeTab)?.component;

  return (
    <section id="arcade" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background:'linear-gradient(180deg,transparent 0%,rgba(11,11,20,0.95) 10%,rgba(11,11,20,0.98) 90%,transparent 100%)', zIndex:0 }} />

      <motion.div
        className="relative max-w-5xl mx-auto"
        style={{ zIndex:1 }}
        initial={{ opacity:0, y:40 }}
        whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true, amount:0.1 }}
        transition={{ duration:0.6, ease:'easeOut' }}
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between flex-wrap gap-3 mb-2">
            <div>
              <div className="font-mono text-xs text-zinc-500 tracking-widest mb-1 uppercase">
                //06_INTERACTIVE_LABS
              </div>
              <h2 className="font-mono font-black text-2xl sm:text-3xl text-white tracking-tight leading-none">
                SYS_ARCADE{' '}
                <span className="text-zinc-500 text-xl font-normal">// EXPERIMENTAL PLAYGROUND</span>
              </h2>
            </div>
            <div className="font-mono text-xs text-[#ccff00] border border-[#ccff00] px-2 py-1 bg-[#ccff00]/5 animate-pulse">
              ● LIVE
            </div>
          </div>
          <div className="h-px bg-gradient-to-r from-[#ccff00] via-zinc-700 to-transparent mt-4" />
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap gap-0 mb-6 border-2 border-white overflow-hidden">
          {TABS.map((tab, idx) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[120px] flex items-center justify-center gap-1.5 px-3 py-2.5 font-mono font-bold text-xs transition-all duration-150 border-r-2 border-white last:border-r-0 ${
                activeTab === tab.id
                  ? 'bg-[#ccff00] text-black shadow-inner'
                  : 'bg-[#0b0b14] text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <span>{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden text-[10px]">{idx+1}</span>
            </button>
          ))}
        </div>

        {/* Game Container — fixed 600px, never shifts between tabs */}
        <motion.div
          key={activeTab}
          initial={{ opacity:0, y:10 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:0.25 }}
          className="border-2 border-white bg-[#0b0b14] flex flex-col"
          style={{ height: 600 }}
        >
          {/* Game header bar */}
          <div className="flex items-center gap-2 px-4 py-2 border-b border-zinc-800 flex-shrink-0">
            <div className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse" />
            <span className="font-mono font-bold text-xs text-white">
              {TABS.find(t=>t.id===activeTab)?.icon}{' '}
              {TABS.find(t=>t.id===activeTab)?.label}
            </span>
            <div className="ml-auto font-mono text-[10px] text-zinc-600">CANVAS_ENGINE_v2.0</div>
          </div>

          {/* Rendered Game — fills remaining height, clips overflow */}
          <div className="flex-1 overflow-hidden flex flex-col items-center justify-center px-4 py-3">
            {ActiveGame && <ActiveGame />}
          </div>
        </motion.div>

        {/* Footer note */}
        <div className="mt-3 text-zinc-600 font-mono text-xs text-right">
          // BUILT WITH HTML5 CANVAS + REACT STATE // NO GAME ENGINE DEPS //
        </div>
      </motion.div>
    </section>
  );
}
