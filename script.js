
const $=id=>document.getElementById(id);
const ls={get:(k,d)=>{try{const v=localStorage.getItem('cp3_'+k);return v===null?d:JSON.parse(v)}catch(e){return d}},set:(k,v)=>{try{localStorage.setItem('cp3_'+k,JSON.stringify(v))}catch(e){}}};

const NETWORKS={
  "shardeum-testnet":{name:"Shardeum Testnet",chainId:"0x1fb7",chainIdDec:8119,symbol:"SHM",rpc:"https://api-mezame.shardeum.org",explorer:"https://explorer-mezame.shardeum.org"},
  shardeum:{name:"Shardeum Mainnet",chainId:"0x1fb6",chainIdDec:8118,symbol:"SHM",rpc:"https://api.shardeum.org",explorer:"https://explorer.shardeum.org"},
  ethereum:{name:"Ethereum",chainId:"0x1",chainIdDec:1,symbol:"ETH",rpc:"https://cloudflare-eth.com",explorer:"https://etherscan.io"},
  bsc:{name:"BNB Chain",chainId:"0x38",chainIdDec:56,symbol:"BNB",rpc:"https://bsc-dataseed.binance.org",explorer:"https://bscscan.com"}
};

const LOGOS={
  SHM:"data:image/png;base64,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",
  USDT:"https://assets.coingecko.com/coins/images/325/small/Tether.png",
  BTC:"https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
  ETH:"https://assets.coingecko.com/coins/images/279/small/ethereum.png",
  BNB:"https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png"
};

let currentNet="shardeum-testnet",addr="",fx=89.5,lastBal=null,lastOk=0,cur="INR",lang=ls.get("lang","en"),soundOn=ls.get("sound",true),hideBal=ls.get("hide",false),txs=ls.get("txs",[]),contacts=ls.get("contacts",[]);

const T={SHM:{bal:"0.0000",p:null},USDT:{bal:"0.00",p:null},BTC:{bal:"0.000000",p:null},ETH:{bal:"0.0000",p:null},BNB:{bal:"0.0000",p:null}};

const I18N={
  en:{
    total:"Total Balance",send:"Send",recv:"Receive",req:"Request",assets:"Crypto Assets",home:"Home",book:"Contacts",tools:"Services",settings:"Settings",
    disc:"⚠ Crypto is risky. Only use what you can afford to lose. Keys stay in your wallet. Non-custodial. Not financial advice.",tx:"Recent",
    cryptoSec:"CRYPTO",calcSec:"CALCULATORS (REAL MATH)",gas:"⛽ Estimate network fee",price:"🔁 Price converter",csv:"📥 Export history CSV",
    explorer:"🔗 Open block explorer",addTok:"➕ Add custom token",close:"Close",
    sip:"📈 SIP Calculator",emi:"🏦 EMI Calculator",yield:"🏠 Rental Yield",frac:"🏢 Fractional Ownership",roi:"💹 ROI Calculator",comp:"📊 Compound Interest",
    calc:"Calculate",edu:"Educational only. Not financial advice.",
    sipM:"Monthly investment ₹",sipR:"Expected return % / year",sipY:"Years",
    emiP:"Loan amount ₹",emiR:"Interest % / year",emiN:"Tenure (months)",
    yV:"Property value ₹",yR:"Annual rent ₹",yE:"Annual expenses ₹",
    fV:"Property value ₹",fI:"Your investment ₹",fT:"Total tokens (optional)",
    rI:"Invested ₹",rC:"Current / returned ₹",
    cP:"Principal ₹",cR:"Rate % / year",cY:"Years",
    toolsTitle:"Tools",settingsTitle:"Settings"
  },
  hi:{
    total:"कुल बैलेंस",send:"भेजें",recv:"प्राप्त",req:"अनुरोध",assets:"एसेट्स",home:"होम",book:"संपर्क",tools:"सेवाएँ",settings:"सेटिंग्स",
    disc:"⚠ क्रिप्टो जोखिम भरा है। केवल उतना ही उपयोग करें जितना खो सकें। कुंजियाँ आपके वॉलेट में रहती हैं। नॉन-कस्टोडियल।",tx:"हालिया",
    cryptoSec:"क्रिप्टो",calcSec:"कैलकुलेटर (असली गणित)",gas:"⛽ नेटवर्क शुल्क अनुमान",price:"🔁 कीमत कन्वर्टर",csv:"📥 इतिहास CSV निर्यात",
    explorer:"🔗 ब्लॉक एक्सप्लोरर खोलें",addTok:"➕ कस्टम टोकन जोड़ें",close:"बंद करें",
    sip:"📈 SIP कैलकुलेटर",emi:"🏦 EMI कैलकुलेटर",yield:"🏠 किराया यील्ड",frac:"🏢 आंशिक स्वामित्व",roi:"💹 ROI कैलकुलेटर",comp:"📊 चक्रवृद्धि ब्याज",
    calc:"गणना करें",edu:"केवल शैक्षिक। वित्तीय सलाह नहीं।",
    sipM:"मासिक निवेश ₹",sipR:"अपेक्षित रिटर्न % / वर्ष",sipY:"वर्ष",
    emiP:"ऋण राशि ₹",emiR:"ब्याज % / वर्ष",emiN:"अवधि (महीने)",
    yV:"संपत्ति मूल्य ₹",yR:"वार्षिक किराया ₹",yE:"वार्षिक खर्च ₹",
    fV:"संपत्ति मूल्य ₹",fI:"आपका निवेश ₹",fT:"कुल टोकन (वैकल्पिक)",
    rI:"निवेशित ₹",rC:"वर्तमान / वापसी ₹",
    cP:"मूलधन ₹",cR:"दर % / वर्ष",cY:"वर्ष",
    toolsTitle:"टूल्स",settingsTitle:"सेटिंग्स"
  },
  mr:{
    total:"एकूण शिल्लक",send:"पाठवा",recv:"स्वीकारा",req:"विनंती",assets:"मालमत्ता",home:"होम",book:"संपर्क",tools:"सेवा",settings:"सेटिंग्ज",
    disc:"⚠ क्रिप्टो जोखमीचे. फक्त गमावता येईल इतकेच वापरा. की तुमच्या वॉलेटमध्ये राहतात. नॉन-कस्टोडियल.",tx:"अलीकडील",
    cryptoSec:"क्रिप्टो",calcSec:"कॅल्क्युलेटर (खरे गणित)",gas:"⛽ नेटवर्क शुल्क अंदाज",price:"🔁 किंमत कन्व्हर्टर",csv:"📥 इतिहास CSV निर्यात",
    explorer:"🔗 ब्लॉक एक्सप्लोरर उघडा",addTok:"➕ कस्टम टोकन जोडा",close:"बंद करा",
    sip:"📈 SIP कॅल्क्युलेटर",emi:"🏦 EMI कॅल्क्युलेटर",yield:"🏠 भाडे यील्ड",frac:"🏢 अंशतः मालकी",roi:"💹 ROI कॅल्क्युलेटर",comp:"📊 चक्रवाढ व्याज",
    calc:"गणना करा",edu:"फक्त शैक्षणिक. आर्थिक सल्ला नाही.",
    sipM:"मासिक गुंतवणूक ₹",sipR:"अपेक्षित परतावा % / वर्ष",sipY:"वर्षे",
    emiP:"कर्ज रक्कम ₹",emiR:"व्याज % / वर्ष",emiN:"कालावधी (महिने)",
    yV:"मालमत्ता मूल्य ₹",yR:"वार्षिक भाडे ₹",yE:"वार्षिक खर्च ₹",
    fV:"मालमत्ता मूल्य ₹",fI:"तुमची गुंतवणूक ₹",fT:"एकूण टोकन्स (ऐच्छिक)",
    rI:"गुंतवले ₹",rC:"सध्याचे / परत ₹",
    cP:"मुद्दल ₹",cR:"दर % / वर्ष",cY:"वर्षे",
    toolsTitle:"टूल्स",settingsTitle:"सेटिंग्ज"
  }
};

function toast(m,ms){const t=$("toast");t.textContent=m;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),ms||2200)}
function fmt(n){if(!n&&n!==0)return"0.00";if(n<0.0001)return n.toFixed(8);if(n<0.01)return n.toFixed(5);if(n<1)return n.toFixed(4);return n.toLocaleString("en-IN",{maximumFractionDigits:2})}
function pfx(){return cur==="INR"?"₹":"$"}
function rate(p){return p?(cur==="INR"?p.inr:p.usd):0}

function changeCurrency(c){cur=c;paint()}
function changeLang(l){
  lang=l;ls.set("lang",l);const d=I18N[l]||I18N.en;
  const set=(id,v)=>{const el=$(id);if(el)el.textContent=v};
  set("lblTotal",d.total);set("btnSend",d.send);set("btnRecv",d.recv);set("btnReq",d.req);
  set("tabAssets",d.assets);set("navHome",d.home);set("navBook",d.book);
  set("navTools",d.tools);set("navSettings",d.settings);set("disclaimer",d.disc);set("txtTx",d.tx);
  if($("toolsTitle"))$("toolsTitle").textContent=d.toolsTitle;
  if($("cryptoSec"))$("cryptoSec").textContent=d.cryptoSec;
  if($("calcSec"))$("calcSec").textContent=d.calcSec;
  if($("btnGas"))$("btnGas").textContent=d.gas;
  if($("btnPrice"))$("btnPrice").textContent=d.price;
  if($("btnCsv"))$("btnCsv").textContent=d.csv;
  if($("btnExp"))$("btnExp").textContent=d.explorer;
  if($("btnTok"))$("btnTok").textContent=d.addTok;
  if($("btnSip"))$("btnSip").textContent=d.sip;
  if($("btnEmi"))$("btnEmi").textContent=d.emi;
  if($("btnYield"))$("btnYield").textContent=d.yield;
  if($("btnFrac"))$("btnFrac").textContent=d.frac;
  if($("btnRoi"))$("btnRoi").textContent=d.roi;
  if($("btnComp"))$("btnComp").textContent=d.comp;
  if($("btnToolsClose"))$("btnToolsClose").textContent=d.close;
  const lsEl=$("langSelect");if(lsEl)lsEl.value=l;
}
function changeNetwork(key){
  currentNet=key;const n=NETWORKS[key];
  const set=(id,v)=>{const el=$(id);if(el)el.textContent=v};
  set("netLabel",n.name);set("setNet",n.name);
  set("sendUnit",n.symbol);set("recvUnit",n.symbol);set("reqUnit",n.symbol);
  set("sendTitle","Send "+n.symbol);set("recvTitle","Receive "+n.symbol);
  set("recvCap","Only send "+n.symbol+" on "+n.name);
  const fb=$("faucetBtn");if(fb)fb.style.display=key==="shardeum-testnet"?"block":"none";
  if(addr)ensureNetwork().then(()=>readBal(false));
  paint();
}

let AC;
function chime(){
  if(!soundOn)return;
  try{
    AC=AC||new(window.AudioContext||window.webkitAudioContext)();
    if(AC.state==="suspended")AC.resume();
    [523.25,659.25,783.99].forEach((f,i)=>{
      const o=AC.createOscillator(),g=AC.createGain(),t=AC.currentTime+i*.12;
      o.type="sine";o.frequency.value=f;
      g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.18,t+.02);g.gain.exponentialRampToValueAtTime(.001,t+.4);
      o.connect(g);g.connect(AC.destination);o.start(t);o.stop(t+.45);
    });
  }catch(e){}
}
function speakAlert(amount,symbol){
  if(!soundOn||!("speechSynthesis"in window))return;
  try{
    window.speechSynthesis.cancel();
    const r=T[symbol]&&T[symbol].p?rate(T[symbol].p):0;
    const inr=r?Math.round(parseFloat(amount)*r):0;
    let msg;
    if(lang==="hi")msg="क्रिप्टो पे पर "+amount+" "+symbol+(inr?" यानी लगभग "+inr+" रुपये":"")+" प्राप्त हुए।";
    else if(lang==="mr")msg="क्रिप्टो पे वर "+amount+" "+symbol+(inr?" म्हणजे सुमारे "+inr+" रुपये":"")+" मिळाले.";
    else msg="Crypto Pay received "+amount+" "+symbol+(inr?", about "+inr+" rupees":"")+".";
    const u=new SpeechSynthesisUtterance(msg);
    u.lang=lang==="hi"?"hi-IN":lang==="mr"?"mr-IN":"en-IN";u.rate=.95;
    window.speechSynthesis.speak(u);
  }catch(e){}
}
function applySound(){$("soundBtn").className="snd"+(soundOn?" on":"");$("soundBtn").textContent=soundOn?"🔊":"🔇";if($("setSound"))$("setSound").textContent=soundOn?"On":"Off"}
function toggleSound(){soundOn=!soundOn;ls.set("sound",soundOn);applySound()}
function togglePriv(){hideBal=!hideBal;ls.set("hide",hideBal);if($("setPriv"))$("setPriv").textContent=hideBal?"On":"Off";paint()}
function testVoice(){speakAlert("5","SHM")}

function toWei(s){
  if(!/^\d*\.?\d*$/.test(s)||s===""||s===".")return null;
  const[i,f=""]=s.split(".");
  return(BigInt(i||"0")*10n**18n+BigInt((f+"0".repeat(18)).slice(0,18))).toString();
}

function getCustoms(){
  return (ls.get("customTokens",[])||[]).map(x=>typeof x==="string"?{addr:x,symbol:"TOKEN"}:x).filter(x=>x&&x.addr);
}
function buildList(){
  const order=["SHM","USDT","BTC","ETH","BNB"];
  let html=order.map(k=>`<div class="row" onclick="XA.tap('${k}')"><div class="ic"><img src="${LOGOS[k]}" alt="${k}" onerror="this.parentElement.textContent='${k[0]}'"></div><div class="mid"><div class="sym">${k}</div><div class="sub" id="s-${k}">—</div></div><div class="rt"><div class="amt" id="b-${k}">0</div><div class="sub" id="v-${k}">—</div></div></div>`).join("");
  getCustoms().forEach((t,i)=>{
    const id="ct"+i;
    html+=`<div class="row" onclick="XA.tap('${t.symbol}')"><div class="ic">${t.symbol==="CPAY"?CPLOGO:(t.symbol||"T")[0]}</div><div class="mid"><div class="sym">${t.symbol||"TOKEN"}</div><div class="sub" id="s-${id}">Custom token</div></div><div class="rt"><div class="amt" id="b-${id}">…</div><div class="sub" id="v-${id}">on-chain</div></div></div>`;
  });
  $("list").innerHTML=html;
}
function paint(){
  let total=0;const H="••••";const native=NETWORKS[currentNet].symbol;
  Object.keys(T).forEach(k=>{
    const t=T[k],bal=parseFloat(t.bal)||0,rt=rate(t.p);
    if(bal>0&&rt)total+=bal*rt;
    let chg="";
    if(t.p&&typeof t.p.chg==="number"){const c=t.p.chg<0?"var(--r)":"var(--g)";chg=` <span style="color:${c}">${t.p.chg>=0?"+":""}${t.p.chg.toFixed(2)}%</span>`}
    if($("s-"+k))$("s-"+k).innerHTML=t.p?pfx()+fmt(rt)+chg:pfx()+"--";
    if($("b-"+k))$("b-"+k).textContent=hideBal?H:(k===native?t.bal:"—");
    if($("v-"+k))$("v-"+k).textContent=hideBal?H:(t.p&&k===native?pfx()+fmt(bal*rt):"—");
  });
  getCustoms().forEach((t,i)=>{
    const id="ct"+i,bal=t.bal!=null?parseFloat(t.bal):null;
    if($("b-"+id))$("b-"+id).textContent=hideBal?H:(bal!=null?fmt(bal):"—");
    if($("s-"+id))$("s-"+id).textContent=(t.symbol||"TOKEN")+" · custom";
  });
  $("total").textContent=hideBal?pfx()+H:pfx()+fmt(total);
  const live=Date.now()-lastOk<45000;
  $("feed").className="feed"+(live?"":" bad");
  $("feedText").textContent=live?"Live Market Connected":"Prices delayed";
}
async function ethCall(to,data){
  return ethereum.request({method:"eth_call",params:[{to,data},"latest"]});
}
async function readCustomBalances(){
  if(!addr||!window.ethereum)return;
  const list=getCustoms();
  if(!list.length)return;
  const updated=[];
  for(const t of list){
    try{
      const data="0x70a08231"+addr.slice(2).toLowerCase().padStart(64,"0");
      const raw=await ethCall(t.addr,data);
      let decimals=18;
      try{
        const draw=await ethCall(t.addr,"0x313ce567");
        decimals=parseInt(draw,16)||18;
      }catch(e){}
      const bal=Number(BigInt(raw||"0x0"))/Math.pow(10,decimals);
      updated.push({...t,bal:bal.toFixed(Math.min(6,decimals)),decimals});
    }catch(e){
      updated.push({...t,bal:null});
    }
  }
  ls.set("customTokens",updated);
  buildList();
  paint();
}

async function fetchPrices(){
  try{
    const cg=await(await fetch("https://api.coingecko.com/api/v3/simple/price?ids=shardeum,ethereum,binancecoin,bitcoin,tether&vs_currencies=usd,inr&include_24hr_change=true")).json();
    if(cg.shardeum)T.SHM.p={usd:cg.shardeum.usd,inr:cg.shardeum.inr||cg.shardeum.usd*fx,chg:cg.shardeum.usd_24h_change||0};
    if(cg.ethereum)T.ETH.p={usd:cg.ethereum.usd,inr:cg.ethereum.inr||cg.ethereum.usd*fx,chg:cg.ethereum.usd_24h_change||0};
    if(cg.binancecoin)T.BNB.p={usd:cg.binancecoin.usd,inr:cg.binancecoin.inr||cg.binancecoin.usd*fx,chg:cg.binancecoin.usd_24h_change||0};
    if(cg.bitcoin)T.BTC.p={usd:cg.bitcoin.usd,inr:cg.bitcoin.inr||cg.bitcoin.usd*fx,chg:cg.bitcoin.usd_24h_change||0};
    if(cg.tether)T.USDT.p={usd:cg.tether.usd,inr:cg.tether.inr||fx,chg:0};
    lastOk=Date.now();
  }catch(e){}
  paint();
}
async function usdToInr(){try{const d=await(await fetch("https://open.er-api.com/v6/latest/USD")).json();if(d?.rates?.INR)fx=d.rates.INR}catch(e){}}
function refreshAll(){usdToInr();fetchPrices();toast("Refreshing…")}

function ensureNetwork(){
  const n=NETWORKS[currentNet];
  return ethereum.request({method:"wallet_switchEthereumChain",params:[{chainId:n.chainId}]}).catch(e=>{
    if(e.code===4902||e.code===-32603){
      return ethereum.request({method:"wallet_addEthereumChain",params:[{chainId:n.chainId,chainName:n.name,nativeCurrency:{name:n.symbol,symbol:n.symbol,decimals:18},rpcUrls:[n.rpc],blockExplorerUrls:[n.explorer]}]});
    }
    throw e;
  });
}

async function connectWallet(){
  if(!window.ethereum){
    toast("Install MetaMask");
    if(confirm("MetaMask not found. Open download page?"))window.open("https://metamask.io/download/","_blank");
    return;
  }
  try{
    const accounts=await ethereum.request({method:"eth_requestAccounts"});
    addr=accounts[0];
    await ensureNetwork();
    const chainId=await ethereum.request({method:"eth_chainId"});
    const ok=chainId===NETWORKS[currentNet].chainId;
    if(ok){await readBal(false);await readCustomBalances()}
    $("recvWarn").style.display=ok?"none":"block";
    const chip=$("chip");
    chip.innerHTML="";
    chip.classList.add("on");
    const t=document.createElement("span");
    t.id="chipText";
    t.textContent=addr.slice(0,6)+"…"+addr.slice(-4);
    chip.appendChild(t);
    chip.onclick=null;
    buildList();paint();toast("Wallet connected");
  }catch(e){if(e.code!==4001)toast(e.message||"Failed")}
}

async function readBal(detect){
  if(!addr)return;
  try{
    const n=NETWORKS[currentNet];
    const h=await ethereum.request({method:"eth_getBalance",params:[addr,"latest"]});
    const val=Number(BigInt(h))/1e18;
    const key=n.symbol;
    if(detect&&lastBal!==null&&val>lastBal+1e-9){
      const got=(val-lastBal).toFixed(4);
      logTx("in",got,key,"");
      chime();speakAlert(got,key);toast("+"+got+" "+key+" received");
    }
    lastBal=val;T[key].bal=val.toFixed(4);
    ["SHM","ETH","BNB"].forEach(k=>{if(k!==key)T[k].bal="0.0000"});
    paint();
  }catch(e){}
}
function pollBal(){if(!addr||!window.ethereum)return;ethereum.request({method:"eth_chainId"}).then(id=>{if(id===NETWORKS[currentNet].chainId)readBal(true)}).catch(()=>{})}

function logTx(type,amt,symbol,hash){txs.unshift({type,amt,symbol,hash:hash||"",time:Date.now()});txs=txs.slice(0,40);ls.set("txs",txs);renderTx()}
function renderTx(){
  const box=$("txHistory");if(!box)return;
  if(!txs.length){box.innerHTML='<div style="font-size:12px;color:var(--mut);text-align:center;padding:6px">No transactions yet</div>';return}
  box.innerHTML=txs.map(x=>{
    const d=new Date(x.time).toLocaleString("en-IN",{day:"numeric",month:"short",hour:"numeric",minute:"2-digit"});
    const col=x.type==="in"?"var(--g)":"var(--r)";const sign=x.type==="in"?"+":"-";
    const link=x.hash?` · <a href="${NETWORKS[currentNet].explorer}/tx/${x.hash}" target="_blank" style="color:var(--y);text-decoration:none">View</a>`:"";
    return`<div class="txi"><div><b>${x.type==="in"?"In":"Out"} ${x.symbol}</b><div style="color:var(--mut);font-size:10px">${d}${link}</div></div><div style="color:${col};font-weight:800">${sign}${x.amt}</div></div>`;
  }).join("");
}
function clearTxs(){if(!confirm("Clear history?"))return;txs=[];ls.set("txs",[]);renderTx()}

function closeAll(){stopScan();document.querySelectorAll(".shade").forEach(s=>s.classList.remove("open"))}
function sendMsg(t,ok){const m=$("sendMsg");m.textContent=t;m.className="msg"+(ok?" ok":"")}

async function openSend(){if(!addr){await connectWallet();if(!addr)return}sendMsg("");$("sheetSend").classList.add("open")}
async function doSend(){
  const to=$("sendTo").value.trim(),amt=$("sendAmt").value.trim(),wei=toWei(amt),n=NETWORKS[currentNet];
  if(!/^0x[0-9a-fA-F]{40}$/.test(to))return sendMsg("Invalid address");
  if(!wei)return sendMsg("Invalid amount");
  if(parseFloat(amt)>parseFloat(T[n.symbol].bal)+0.0001)return sendMsg("Insufficient balance");
  if(!confirm(`Send ${amt} ${n.symbol} to\n${to}?`))return;
  try{
    const chainId=await ethereum.request({method:"eth_chainId"});
    if(chainId!==n.chainId)return sendMsg("Wrong network");
    $("sendBtn").disabled=true;sendMsg("Confirm in wallet…");
    const hash=await ethereum.request({method:"eth_sendTransaction",params:[{from:addr,to,value:"0x"+BigInt(wei).toString(16)}]});
    sendMsg("Sent ✓ "+hash.slice(0,12)+"…",true);chime();logTx("out",amt,n.symbol,hash);$("sendAmt").value="";setTimeout(pollBal,5000);toast("Sent");
  }catch(e){sendMsg(e.code===4001?"Cancelled":(e.message||"Failed"))}
  $("sendBtn").disabled=false;
}

async function openReceive(){if(!addr){await connectWallet();if(!addr)return}
  const n=NETWORKS[currentNet];$("recvTitle").textContent="Receive "+n.symbol;$("recvUnit").textContent=n.symbol;
  $("recvCap").textContent="Only send "+n.symbol+" on "+n.name;$("addrBox").textContent=addr;$("sheetRecv").classList.add("open");drawQR()}
function drawQR(){
  if(!addr)return;const box=$("qrcode");box.innerHTML="";const n=NETWORKS[currentNet];
  let text=addr;const amount=$("payAmount").value.trim(),wei=toWei(amount);
  if(wei)text=`ethereum:${addr}@${n.chainIdDec}?value=${wei}`;
  if(typeof QRCode!=="undefined")new QRCode(box,{text,width:168,height:168,colorDark:"#000",colorLight:"#fff",correctLevel:QRCode.CorrectLevel.H});
  const pl=$("payLink");if(wei){pl.style.display="block";pl.textContent=text}else pl.style.display="none";
}
function copyAddress(){if(!addr)return;navigator.clipboard.writeText(addr).then(()=>{toast("Address copied");$("copyBtn").textContent="✓ Copied";setTimeout(()=>$("copyBtn").textContent="Copy Address",1500)})}
function copyPayLink(){const t=$("payLink").textContent||addr;navigator.clipboard.writeText(t).then(()=>toast("Payment link copied"))}
function shareWhatsApp(){
  if(!addr)return;const n=NETWORKS[currentNet],amount=$("payAmount").value.trim();
  let msg=`Pay me on CryptoPay%0ANetwork: ${n.name}%0AToken: ${n.symbol}%0AAddress: ${addr}`;
  if(amount)msg+=`%0AAmount: ${amount} ${n.symbol}`;
  window.open("https://wa.me/?text="+msg,"_blank");
}

async function openRequest(){if(!addr){await connectWallet();if(!addr)return}
  $("reqUnit").textContent=NETWORKS[currentNet].symbol;$("reqAddr").textContent=addr;$("sheetReq").classList.add("open");drawReqQR()}
function drawReqQR(){
  if(!addr)return;const box=$("reqQR");box.innerHTML="";const n=NETWORKS[currentNet];
  const amount=$("reqAmt").value.trim(),wei=toWei(amount);
  const text=wei?`ethereum:${addr}@${n.chainIdDec}?value=${wei}`:addr;
  if(typeof QRCode!=="undefined")new QRCode(box,{text,width:180,height:180,colorDark:"#000",colorLight:"#fff",correctLevel:QRCode.CorrectLevel.H});
}
function copyReqLink(){
  if(!addr)return;const n=NETWORKS[currentNet],amount=$("reqAmt").value.trim(),wei=toWei(amount);
  const text=wei?`ethereum:${addr}@${n.chainIdDec}?value=${wei}`:addr;
  navigator.clipboard.writeText(text).then(()=>toast("Request link copied"));
}
function shareReqWA(){
  if(!addr)return;const n=NETWORKS[currentNet],amount=$("reqAmt").value.trim(),note=$("reqNote").value.trim();
  let msg=`CryptoPay payment request%0A${n.name} · ${n.symbol}%0A`;
  if(amount)msg+=`Amount: ${amount} ${n.symbol}%0A`;
  if(note)msg+=`Note: ${note}%0A`;
  msg+=`Address: ${addr}`;
  window.open("https://wa.me/?text="+encodeURIComponent(msg.replace(/%0A/g,"\n")),"_blank");
}

let scanning=false,scanStream=null;
function stopScan(){scanning=false;if(scanStream){scanStream.getTracks().forEach(t=>t.stop());scanStream=null}$("scanVid").style.display="none"}
async function scanQR(){
  if(!("BarcodeDetector"in window)){sendMsg("QR scan not supported — paste address");return}
  try{
    scanStream=await navigator.mediaDevices.getUserMedia({video:{facingMode:"environment"}});
    const v=$("scanVid");v.srcObject=scanStream;v.style.display="block";await v.play();
    const det=new BarcodeDetector({formats:["qr_code"]});scanning=true;
    while(scanning){try{const r=await det.detect(v);if(r.length){handleScan(r[0].rawValue);break}}catch(e){}await new Promise(r=>setTimeout(r,300))}
  }catch(e){sendMsg("Camera permission needed");stopScan()}
}
function handleScan(text){stopScan();const m=text.match(/0x[0-9a-fA-F]{40}/);if(!m)return sendMsg("No address found");$("sendTo").value=m[0];sendMsg("Scanned ✓",true)}

function openBook(){renderBook();$("sheetBook").classList.add("open")}
function renderBook(){
  const box=$("bookList");
  if(!contacts.length){box.innerHTML='<div class="cap">No contacts yet</div>';return}
  box.innerHTML=contacts.map((c,i)=>`<div class="srow"><span><b>${c.n}</b><br><span style="font-size:11px;color:var(--mut)">${c.a.slice(0,8)}…${c.a.slice(-6)}</span></span><span><u style="color:var(--y);cursor:pointer" onclick="useContact(${i})">Send</u> · <u style="color:var(--r);cursor:pointer" onclick="delContact(${i})">✕</u></span></div>`).join("");
}
function saveContact(){
  const n=$("bookName").value.trim(),a=$("bookAddr").value.trim();
  if(!n||!/^0x[0-9a-fA-F]{40}$/.test(a)){toast("Name + valid address");return}
  contacts.push({n,a});ls.set("contacts",contacts);$("bookName").value="";$("bookAddr").value="";renderBook();toast("Saved");
}
function useContact(i){closeAll();$("sendTo").value=contacts[i].a;openSend()}
function delContact(i){contacts.splice(i,1);ls.set("contacts",contacts);renderBook()}

async function toolGas(){
  const out=$("toolOut");out.textContent="Fetching…";
  try{
    const n=NETWORKS[currentNet];
    const r=await fetch(n.rpc,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({jsonrpc:"2.0",id:1,method:"eth_gasPrice",params:[]})});
    const d=await r.json();const fe=parseInt(d.result,16)*21000/1e18;const p=rate(T[n.symbol].p);
    out.textContent=`≈ ${fe.toFixed(8)} ${n.symbol}`+(p?` (₹${(fe*p).toFixed(4)})`:"");
  }catch(e){out.textContent="Could not fetch fee"}
}
function toolConvert(){
  const n=NETWORKS[currentNet].symbol,p=rate(T[n].p);
  $("toolOut").textContent=p?`1 ${n} ≈ ${pfx()}${fmt(p)}`:"Price not loaded yet";
}
function toolExport(){
  const c="type,amount,symbol,hash,time\n"+txs.map(x=>[x.type,x.amt,x.symbol,x.hash,new Date(x.time).toISOString()].join(",")).join("\n");
  const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([c],{type:"text/csv"}));a.download="cryptopay-history.csv";a.click();toast("CSV downloaded");
}
function openExplorer(){const n=NETWORKS[currentNet];window.open(addr?n.explorer+"/address/"+addr:n.explorer,"_blank")}
function openFaucet(){window.open("https://docs.shardeum.org/docs/developer/faucet","_blank")}

function openTools(){$("toolOut").textContent="";$("calcBox").style.display="none";$("sheetTools").classList.add("open")}
function toolAddToken(){
  $("toolOut").textContent="";
  const box=$("calcBox");
  box.style.display="block";
  const list=ls.get("customTokens",[]);
  const saved=list.length?`<div style="margin-top:10px;font-size:11px;color:var(--mut);text-align:left">Saved (${list.length}):<br>`+list.map(x=>{const a=typeof x==="string"?x:x.addr;const s=typeof x==="object"&&x.symbol?x.symbol+" ":"";return `<code style="color:var(--y)">${s}${a.slice(0,10)}…${a.slice(-6)}</code>`}).join("<br>")+`</div>`:"";
  box.innerHTML=`
    <b style="display:block;margin-bottom:8px">➕ Add custom token</b>
    <p style="font-size:12px;color:var(--mut);margin-bottom:10px;line-height:1.4">Paste the token <b style="color:#fff">contract address</b> (0x…). This is NOT your wallet address.</p>
    <input id="tokAddr" type="text" placeholder="0x..." spellcheck="false" style="width:100%;margin:4px 0;padding:12px;border-radius:12px;border:1px solid var(--ln);background:var(--bg);color:#fff;font-size:13px;font-family:monospace">
    <input id="tokSym" type="text" placeholder="Symbol (e.g. USDT)" style="width:100%;margin:4px 0;padding:12px;border-radius:12px;border:1px solid var(--ln);background:var(--bg);color:#fff;font-size:14px">
    <button class="btn" style="margin-top:10px" onclick="saveCustomToken()">Save token</button>
    <p style="font-size:10px;color:var(--mut);margin-top:8px;line-height:1.4">For live balance, also add the same token in MetaMask (Import tokens).</p>
    ${saved}`;
}
async function saveCustomToken(){
  const a=($("tokAddr").value||"").trim();
  const sym=($("tokSym").value||"").trim()||"TOKEN";
  if(!/^0x[0-9a-fA-F]{40}$/.test(a)){
    toast("Invalid contract address — need 0x + 40 hex characters");
    return;
  }
  const list=getCustoms();
  if(list.some(x=>x.addr.toLowerCase()===a.toLowerCase())){toast("Already saved");return}
  if(!addr){
    toast("Connect MetaMask first, then add token");
    return;
  }
  toast("Reading on-chain balance…");
  list.push({addr:a,symbol:sym,time:Date.now()});
  ls.set("customTokens",list);
  buildList();
  await readCustomBalances();
  toast("Token added: "+sym);
  toolAddToken();
  $("toolOut").textContent=sym+" added. Balance shows on Home if contract is on current network.";
}
function showCalc(type){
  const d=I18N[lang]||I18N.en;
  const box=$("calcBox");box.style.display="block";$("toolOut").textContent="";
  const inp=(id,ph,val)=>`<input id="${id}" type="number" placeholder="${ph}" value="${val||""}" style="width:100%;margin:4px 0;padding:10px;border-radius:8px;border:1px solid var(--ln);background:var(--bg);color:#fff;font-size:14px">`;
  const btn=(fn)=>`<button class="btn" style="margin-top:8px" onclick="${fn}">${d.calc}</button>`;
  const out=`<div id="calcRes" style="margin-top:10px;font-size:14px;font-weight:700;color:var(--y);line-height:1.5"></div><div style="font-size:10px;color:var(--mut);margin-top:6px">${d.edu}</div>`;
  if(type==="sip"){
    box.innerHTML=`<b>${d.sip}</b>${inp("c1",d.sipM,5000)}${inp("c2",d.sipR,12)}${inp("c3",d.sipY,10)}${btn("runSIP()")}${out}`;
  }else if(type==="emi"){
    box.innerHTML=`<b>${d.emi}</b>${inp("c1",d.emiP,500000)}${inp("c2",d.emiR,10)}${inp("c3",d.emiN,60)}${btn("runEMI()")}${out}`;
  }else if(type==="yield"){
    box.innerHTML=`<b>${d.yield}</b>${inp("c1",d.yV,5000000)}${inp("c2",d.yR,300000)}${inp("c3",d.yE,50000)}${btn("runYield()")}${out}`;
  }else if(type==="frac"){
    box.innerHTML=`<b>${d.frac}</b>${inp("c1",d.fV,10000000)}${inp("c2",d.fI,500000)}${inp("c3",d.fT,1000)}${btn("runFrac()")}${out}`;
  }else if(type==="roi"){
    box.innerHTML=`<b>${d.roi}</b>${inp("c1",d.rI,100000)}${inp("c2",d.rC,125000)}${btn("runROI()")}${out}`;
  }else if(type==="comp"){
    box.innerHTML=`<b>${d.comp}</b>${inp("c1",d.cP,100000)}${inp("c2",d.cR,8)}${inp("c3",d.cY,5)}${btn("runComp()")}${out}`;
  }
}
function runSIP(){
  const m=+$("c1").value,r=+$("c2").value/100/12,n=+$("c3").value*12;
  if(!m||!n){$("calcRes").textContent="Enter values";return}
  const fv=r?m*((Math.pow(1+r,n)-1)/r)*(1+r):m*n;
  $("calcRes").innerHTML=`Invested: ₹${(m*n).toLocaleString("en-IN")}<br>Maturity ≈ ₹${Math.round(fv).toLocaleString("en-IN")}<br>Gain ≈ ₹${Math.round(fv-m*n).toLocaleString("en-IN")}`;
}
function runEMI(){
  const p=+$("c1").value,r=+$("c2").value/100/12,n=+$("c3").value;
  if(!p||!n){$("calcRes").textContent="Enter values";return}
  const emi=r?p*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1):p/n;
  $("calcRes").innerHTML=`EMI ≈ ₹${Math.round(emi).toLocaleString("en-IN")}/month<br>Total ≈ ₹${Math.round(emi*n).toLocaleString("en-IN")}<br>Interest ≈ ₹${Math.round(emi*n-p).toLocaleString("en-IN")}`;
}
function runYield(){
  const v=+$("c1").value,rent=+$("c2").value,exp=+$("c3").value||0;
  if(!v||!rent){$("calcRes").textContent="Enter values";return}
  const net=rent-exp,y=(net/v)*100;
  $("calcRes").innerHTML=`Net annual income: ₹${net.toLocaleString("en-IN")}<br>Gross yield: ${((rent/v)*100).toFixed(2)}%<br>Net yield: ${y.toFixed(2)}%`;
}
function runFrac(){
  const v=+$("c1").value,inv=+$("c2").value,tok=+$("c3").value;
  if(!v||!inv){$("calcRes").textContent="Enter values";return}
  const pct=(inv/v)*100;
  let t=`Your share: ${pct.toFixed(4)}%`;
  if(tok)t+=`<br>Tokens ≈ ${((inv/v)*tok).toFixed(4)}<br>1 token ≈ ₹${(v/tok).toLocaleString("en-IN")}`;
  $("calcRes").innerHTML=t;
}
function runROI(){
  const a=+$("c1").value,b=+$("c2").value;
  if(!a){$("calcRes").textContent="Enter values";return}
  const roi=((b-a)/a)*100;
  $("calcRes").innerHTML=`Profit/Loss: ₹${(b-a).toLocaleString("en-IN")}<br>ROI: ${roi.toFixed(2)}%`;
}
function runComp(){
  const p=+$("c1").value,r=+$("c2").value/100,y=+$("c3").value;
  if(!p||!y){$("calcRes").textContent="Enter values";return}
  const fv=p*Math.pow(1+r,y);
  $("calcRes").innerHTML=`After ${y} yrs ≈ ₹${Math.round(fv).toLocaleString("en-IN")}<br>Interest ≈ ₹${Math.round(fv-p).toLocaleString("en-IN")}`;
}

function openSettings(){$("setAddr").textContent=addr||"Not connected";$("setNet").textContent=NETWORKS[currentNet].name;applySound();$("faucetBtn").style.display=currentNet==="shardeum-testnet"?"block":"none";$("sheetSet").classList.add("open")}
function goHome(){closeAll()}

if(window.ethereum){ethereum.on("chainChanged",()=>{try{readBal(false);readCustomBalances()}catch(e){}});ethereum.on("accountsChanged",()=>location.reload())}

window.onload=()=>{
  try{
    applySound();buildList();paint();renderTx();changeLang(lang);changeNetwork(currentNet);
    if("speechSynthesis"in window){speechSynthesis.getVoices();speechSynthesis.onvoiceschanged=()=>speechSynthesis.getVoices()}
    usdToInr().then(fetchPrices);
    setInterval(fetchPrices,15000);setInterval(usdToInr,600000);setInterval(pollBal,8000);
  }catch(e){console.error(e)}
  setTimeout(()=>{const s=$("splash");if(s)s.classList.add("hide")},3400);
};


(function(){
var K=function(k,d){return ls.get("xt_"+k,d)},S=function(k,v){ls.set("xt_"+k,v)};
var R=document.documentElement,A=document.querySelector(".app"),V={},cur="",last=Date.now(),XT=window.XT={};
var esc=function(s){return String(s).replace(/[&<>"']/g,function(c){return"&#"+c.charCodeAt(0)+";"})};
var g=function(i){return $("x_"+i)},nv=function(i){return parseFloat(g(i).value)||0};
var f=function(n){return n.toLocaleString("en-IN",{maximumFractionDigits:2})};
var I=function(id,ph,t){return'<input id="x_'+id+'" placeholder="'+ph+'" type="'+(t||"number")+'" step="any" oninput="XT.u()">'};
var B=function(l,fn){return'<button class="btn ghost" onclick="'+fn+'">'+l+'</button>'};
var O=function(id){return'<div id="x_'+id+'" class="xt-r"></div>'};
var C=function(id){return'<select id="x_'+id+'" onchange="XT.u()">'+Object.keys(T).map(function(k){return"<option>"+k+"</option>"}).join("")+"</select>"};
var inr=function(s){var p=T[s]&&T[s].p;return p?(p.inr||p.usd*fxCache):0};
var ADDR=/^0x[a-fA-F0-9]{40}$/;
function tz(m){var d=document.createElement("div");d.className="xt-tz";d.textContent=m;document.body.appendChild(d);setTimeout(function(){d.remove()},3500)}
function nf(m){var n=K("nt",[]);n.unshift({m:m,t:Date.now()});S("nt",n.slice(0,50));tz(m);try{if(soundOn)chime()}catch(e){}}
function ta(){R.classList.toggle("xt-light",!!K("light",0));document.body.style.zoom=K("zoom",1)}
function rpc(m,p){return fetch(NETWORKS[currentNet].rpc,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({jsonrpc:"2.0",id:1,method:m,params:p})}).then(function(r){return r.json()})}
function list(key,fn,del){return K(key,[]).map(function(x,i){return'<div class="xt-o">'+fn(x,i)+(del?' <b style="float:right" onclick="XT.dl(\''+key+"',"+i+')">✕</b>':"")+"</div>"}).join("")}
XT.dl=function(k,i){var a=K(k,[]);a.splice(i,1);S(k,a);XT.go(cur)};
XT.ad=function(k,o){var a=K(k,[]);a.push(o);S(k,a);XT.go(cur)};
XT.u=function(){if(V[cur]&&V[cur].u)V[cur].u()};
XT.go=function(n){cur=n;$("xtT").textContent=V[n].t;$("xtB").innerHTML=V[n].h();if(V[n].u)V[n].u();$("xtSheet").classList.add("open")};

var sh=document.createElement("div");sh.className="shade";sh.id="xtSheet";
sh.innerHTML='<div class="panel xt-p"><div class="grab"></div><div class="ttl" id="xtT"></div><div id="xtB"></div></div>';
sh.onclick=function(e){if(e.target===sh)closeAll()};A.appendChild(sh);

/* ---- Menu ---- */
var ICO={"set": "<path d=\"M4 7h9m4 0h3M4 17h3m4 0h9\"/><circle cx=\"15\" cy=\"7\" r=\"2\"/><circle cx=\"9\" cy=\"17\" r=\"2\"/>", "al": "<circle cx=\"12\" cy=\"13\" r=\"8\"/><path d=\"M12 9v4l3 2M5 4l-2 2M19 4l2 2\"/>", "nt": "<path d=\"M12 3a6 6 0 0 0-6 6v4l-2 3h16l-2-3V9a6 6 0 0 0-6-6zM10 20h4\"/>", "pl": "<path d=\"M4 19V5M4 19h16M7 15l4-4 3 3 5-6\"/>", "bs": "<circle cx=\"8\" cy=\"12\" r=\"4.5\"/><circle cx=\"16\" cy=\"12\" r=\"4.5\"/>", "tx": "<circle cx=\"11\" cy=\"11\" r=\"6\"/><path d=\"M16 16l4 4\"/>", "st": "<path d=\"M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-6 1-9z\"/>", "qz": "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 1-1 1.7M12 17v.1\"/>", "sec": "<path d=\"M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z\"/><path d=\"M9 12l2 2 4-4\"/>", "ra": "<path d=\"M5 21V5h9v16M14 10h5v11M8 9h3M8 13h3M8 17h3\"/>", "rr": "<path d=\"M4 6h16v14H4zM4 10h16M8 3v4M16 3v4\"/>", "ck": "<path d=\"M9 6h11M9 12h11M9 18h11M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2\"/>", "sc": "<path d=\"M6 21V4M6 5h11l-2 4 2 4H6\"/>", "ln": "<path d=\"M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19h15\"/>"};var ic=function(k){return'<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="url(#gold)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="display:block;margin:0 auto 6px">'+ICO[k]+"</svg>"};

V.home={t:"✨ More tools",h:function(){var m=[["al","Price Alarm"],["nt","Notifications"],["pl","Profit / Loss"],["bs","Bill Split"],["tx","History Search"],["st","Daily Streak"],["qz","Crypto Quiz"],["sec","Security Tips"]],r=[["ra","My RWA Assets"],["rr","Rent Records"],["ck","Docs Checklist"],["sc","Scam Check"],["ln","Learn RWA"]];
var b=function(a){return'<div class="xt-g">'+a.map(function(x){return"<button onclick=\"XT.go('"+x[0]+"')\">"+ic(x[0])+x[1]+"</button>"}).join("")+"</div>"};
return b(m)+'<div class="ttl" style="margin:12px 0 8px">RWA tools</div>'+b(r)}};

/* ---- Settings: theme, font, PIN, blur, auto-lock, backup ---- */
V.set={t:"Settings & Lock",h:function(){return'<div class="xt-g"><button onclick="XT.th()">🌗 Light/Dark</button><button onclick="XT.bl()">Blur: '+(K("bl",1)?"On":"Off")+'</button><button onclick="XT.zm(.1)">A +</button><button onclick="XT.zm(-.1)">A −</button></div>'+I("pin","New PIN (4-6 digits)","password")+B("Set PIN","XT.pin()")+B("Remove PIN","XT.rp()")+I("am","Auto-lock minutes (now "+K("am",2)+")")+B("Save auto-lock","XT.am()")+'<textarea id="x_bk" rows="3" placeholder="Backup / restore data"></textarea>'+B("Backup (show data)","XT.bk()")+B("Restore from box","XT.rs()")}};
XT.th=function(){S("light",!K("light",0));ta()};
XT.zm=function(d){S("zoom",Math.min(1.3,Math.max(.8,+(K("zoom",1)+d).toFixed(2))));ta()};
XT.bl=function(){S("bl",!K("bl",1));XT.go("set")};
XT.pin=function(){var v=g("pin").value;if(!/^\d{4,6}$/.test(v))return tz("PIN must be 4-6 digits");S("pin",btoa(v+"cp"));tz("PIN set")};
XT.rp=function(){S("pin","");tz("PIN removed")};
XT.am=function(){S("am",nv("am")||2);XT.go("set")};
XT.bk=function(){var o={};for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);o[k]=localStorage.getItem(k)}g("bk").value=JSON.stringify(o)};
XT.rs=function(){try{var o=JSON.parse(g("bk").value);Object.keys(o).forEach(function(k){localStorage.setItem(k,o[k])});location.reload()}catch(e){tz("Invalid backup data")}};

/* ---- PIN lock, background blur, auto-lock ---- */
var lk=document.createElement("div");lk.id="xtLock";lk.innerHTML='<div style="font-size:42px">🔒</div><input id="xtPin" type="password" inputmode="numeric" placeholder="PIN"><button class="btn" style="width:200px" onclick="XT.un()">Unlock</button>';document.body.appendChild(lk);
function lock(){if(K("pin","")){lk.style.display="flex";$("xtPin").value=""}}
XT.un=function(){if(btoa($("xtPin").value+"cp")===K("pin","")){lk.style.display="none";last=Date.now()}else tz("Wrong PIN")};
["click","touchstart","keydown"].forEach(function(e){document.addEventListener(e,function(){last=Date.now()})});
var hid=0;document.addEventListener("visibilitychange",function(){if(document.hidden){hid=Date.now();if(K("bl",1))A.style.filter="blur(16px)"}else{A.style.filter="";if(hid&&Date.now()-hid>30000)lock()}});
setInterval(function(){if(K("pin","")&&Date.now()-last>K("am",2)*60000)lock()},5000);

/* ---- Alarm & notifications ---- */
V.al={t:"⏰ Price Alarm",h:function(){return C("c")+'<select id="x_d"><option value="a">Above ≥</option><option value="b">Below ≤</option></select>'+I("p","Price in USD")+B("Add alarm","XT.aa()")+list("al",function(a){return a.s+(a.d=="a"?" ≥ ":" ≤ ")+"$"+a.p+(a.x?" ✅":"")},1)}};
XT.aa=function(){if(nv("p")>0)XT.ad("al",{s:g("c").value,d:g("d").value,p:nv("p")})};
setInterval(function(){var a=K("al",[]),ch=0;a.forEach(function(x){var p=T[x.s]&&T[x.s].p;if(!p||x.x)return;if(x.d=="a"?p.usd>=x.p:p.usd<=x.p){x.x=1;ch=1;nf("⏰ "+x.s+(x.d=="a"?" reached $":" fell to $")+x.p)}});if(ch)S("al",a)},15000);
V.nt={t:"🔔 Notifications",h:function(){return(list("nt",function(n){return esc(n.m)+'<div style="color:var(--mut);font-size:10px">'+new Date(n.t).toLocaleString("en-IN")+"</div>"})||"No alerts yet")+B("Clear all","S('nt',[]);XT.go('nt')".replace("S(","XT.cl(").replace(/'nt',\[\]\)/,"'nt')"))}};
XT.cl=function(k){S(k,[]);XT.go(cur)};

/* ---- Address book ---- */

/* ---- Calculators ---- */
V.bs={t:"🧾 Bill Split",h:function(){return I("t","Total bill ₹")+I("p","People")+I("tp","Tip %")+O("o")},u:function(){var p=nv("p");g("o").textContent=p?"Each pays ₹"+f(nv("t")*(1+nv("tp")/100)/p):""}};
V.pl={t:"💹 Profit / Loss",h:function(){return C("c")+I("q","Quantity")+I("b","Buy price ₹ per coin")+B("Add","XT.pa()")+O("o")+list("pl",function(x){var cv=x.q*inr(x.s),cs=x.q*x.b,d=cv-cs;return x.s+" × "+x.q+' — <b style="color:'+(d>=0?"var(--g)":"var(--r)")+'">'+(inr(x.s)?(d>=0?"+":"")+"₹"+f(d):"price n/a")+"</b>"},1)},u:function(){}};
XT.pa=function(){if(nv("q")>0)XT.ad("pl",{s:g("c").value,q:nv("q"),b:nv("b")})};

/* ---- Merchant QR, fee, history ---- */
V.tx={t:"🔍 History / CSV",h:function(){return I("s","Search coin / in / out / hash","text")+'<div id="x_l"></div>'},u:function(){var q=(g("s").value||"").toLowerCase();g("l").innerHTML=txs.filter(function(x){return(x.symbol+x.type+x.hash).toLowerCase().indexOf(q)>-1}).map(function(x){return'<div class="xt-o">'+(x.type=="in"?"+":"-")+x.amt+" "+x.symbol+' <span style="color:var(--mut)">'+new Date(x.time).toLocaleString("en-IN")+"</span></div>"}).join("")||"No match"}};

/* ---- Streak & quiz & tips ---- */
var td=new Date().toISOString().slice(0,10),st=K("st",{d:"",n:0});
if(st.d!=td){var yd=new Date(Date.now()-864e5).toISOString().slice(0,10);st={d:td,n:st.d==yd?st.n+1:1};S("st",st)}
V.st={t:"🔥 Daily Streak",h:function(){return'<div style="text-align:center;font-size:44px">🔥 '+K("st",st).n+'</div><p style="text-align:center">day(s) in a row — open the app daily!</p>'}};
var Q=[["What does 'non-custodial' mean?",["App holds your keys","You hold your keys","Bank holds funds"],1],["Sending to the wrong network usually…",["Gets refunded","Can lose funds","Is free"],1],["Should you share your seed phrase?",["Yes, with support","Never","Only on WhatsApp"],1],["RWA stands for…",["Real World Assets","Random Wallet Address","Rapid Web App"],0],["A 'guaranteed' very high return is usually…",["Safe","A red flag","Government backed"],1]],qi=0,qs=0;
V.qz={t:"🧠 Crypto Quiz",h:function(){if(qi>=Q.length){var r="Score: "+qs+"/"+Q.length+B("Retry","qi=0;qs=0;XT.go('qz')".replace("qi=0;qs=0;","XT.qr();"));return r}var q=Q[qi];return"<b>"+(qi+1)+". "+q[0]+"</b>"+q[1].map(function(o,i){return B(o,"XT.qa("+i+")")}).join("")}};
XT.qa=function(i){if(i==Q[qi][2]){qs++;tz("✅ Correct")}else tz("❌ Wrong");qi++;XT.go("qz")};XT.qr=function(){qi=0;qs=0;XT.go("qz")};
V.sec={t:"🛡 Security Tips",h:function(){return["Never share seed phrase or private key — nobody from support will ask.","Check network and address before every send.","Test with a small amount first.","Avoid unknown links and fake airdrops.","Use a PIN and keep your phone updated.","If it promises guaranteed profit, walk away."].map(function(x){return'<div class="xt-o">🛡 '+x+"</div>"}).join("")}};

/* ---- RWA ---- */
V.ra={t:"🏠 My RWA Assets",h:function(){var tot=K("ra",[]).reduce(function(a,x){return a+x.v},0);return I("n","Asset name","text")+'<select id="x_k"><option>Flat</option><option>Land</option><option>Shop</option><option>Gold token</option><option>Other</option></select>'+I("v","Value ₹")+B("Add","XT.ra()")+'<div class="xt-r">Total ₹'+f(tot)+"</div>"+list("ra",function(x){return esc(x.n)+" ("+x.k+") — ₹"+f(x.v)},1)}};
XT.ra=function(){if(g("n").value&&nv("v")>0)XT.ad("ra",{n:g("n").value,k:g("k").value,v:nv("v")})};
V.rr={t:"📅 Rent Records",h:function(){return I("n","Tenant name","text")+I("a","Rent ₹")+'<input id="x_d" type="date">'+B("Add","XT.rr()")+list("rr",function(x,i){var od=!x.p&&x.d<td;return esc(x.n)+" ₹"+f(x.a)+" · due "+x.d+' <u onclick="XT.rt('+i+')" style="color:'+(x.p?"var(--g)":od?"var(--r)":"var(--y)")+'">'+(x.p?"Paid ✓":od?"Overdue!":"Mark paid")+"</u>"},1)}};
XT.rr=function(){if(g("n").value&&g("d").value)XT.ad("rr",{n:g("n").value,a:nv("a"),d:g("d").value,p:0})};
XT.rt=function(i){var a=K("rr",[]);a[i].p=!a[i].p;S("rr",a);XT.go("rr")};
setTimeout(function(){var o=K("rr",[]).filter(function(x){return!x.p&&x.d<td}).length;if(o)nf("📅 "+o+" rent payment(s) overdue")},3000);
var CK=["7/12 extract (land)","Sale / title deed","Property tax receipts","Electricity & water bills","Society NOC","Encumbrance certificate","Rent agreement","Owner ID & PAN"];
V.ck={t:"📋 Docs Checklist",h:function(){var c=K("ck",{});return CK.map(function(x,i){return'<div class="xt-o" onclick="XT.ct('+i+')">'+(c[i]?"☑":"☐")+" "+x+"</div>"}).join("")+O("o")},u:function(){}};
XT.ct=function(i){var c=K("ck",{});c[i]=!c[i];S("ck",c);XT.go("ck")};
var SC=["Promises guaranteed / very high returns","No legal documents shown","Pressure to invest quickly","Owner or company can't be verified","Asked to pay to a personal account","Title / 7-12 not verified","Token contract not public","No rent or income proof"];
V.sc={t:"🚩 Scam Check",h:function(){return SC.map(function(x,i){return'<label class="xt-o" style="display:block"><input type="checkbox" id="x_c'+i+'" onchange="XT.u()">'+x+"</label>"}).join("")+O("o")},u:function(){var n=SC.filter(function(x,i){return g("c"+i).checked}).length;g("o").textContent=n+" red flag(s) — "+(n<=1?"Lower risk, still verify":n<=3?"⚠ Medium risk — be careful":"🚨 High risk — avoid")}};
V.ln={t:"📚 Learn RWA",h:function(){return["<b>RWA</b> = Real World Assets (property, gold, etc.) represented as digital tokens.","<b>Fractional ownership</b> lets many people own small shares of one asset.","<b>Benefits:</b> small entry amount, easy records, transparent history.","<b>Risks:</b> legal rules, fake projects, low liquidity, price swings.","Always verify documents and legality before investing."].map(function(x){return'<div class="xt-o">'+x+"</div>"}).join("")}};

A.insertAdjacentHTML("afterbegin",'<svg width="0" height="0" style="position:absolute"><defs><linearGradient id="gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6EA2FF"/><stop offset="1" stop-color="#2B6DF6"/></linearGradient></defs></svg>');
var tp=document.querySelector("#sheetTools .ttl");if(tp){var mb=document.createElement("button");mb.className="btn";mb.style.cssText="margin:8px 0";mb.textContent="✨ More tools & RWA";mb.onclick=function(){XT.go("home")};tp.after(mb)}
setInterval(function(){var c=$("chip"),t=$("chipText");if(c)c.classList.toggle("on",!!addr);if(t&&!addr&&t.textContent=="MetaMask")t.textContent="Connect Wallet"},800);
ta();lock();
})();

/* CryptoPay extras: runs after index.html. If this file fails, the main app still works. */
(function(){
"use strict";
var NL={"shardeum-testnet":["#2563EB","S","Testnet · test coins"],shardeum:["#2563EB","S","Mainnet · real money"],ethereum:["#627EEA","E","Mainnet · real money"],bsc:["#F0B90B","B","Mainnet · real money"],polygon:["#8247E5","P","Mainnet · real money"],base:["#0052FF","B","Mainnet · real money"],optimism:["#FF0420","O","Mainnet · real money"],arbitrum:["#28A0F0","A","Mainnet · real money"]};
var NU={"shardeum-testnet":LOGOS.SHM,shardeum:LOGOS.SHM,ethereum:LOGOS.ETH,bsc:LOGOS.BNB,polygon:"https://assets.coingecko.com/coins/images/4713/small/polygon.png",optimism:"https://assets.coingecko.com/coins/images/25244/small/Optimism.png",arbitrum:"https://assets.coingecko.com/coins/images/16547/small/arb.jpg"};
var lg=function(k){var l=NL[k]||["#555","?"],u=NU[k];return'<span class="nlg" style="background:'+l[0]+(k==="bsc"?";color:#111":"")+'">'+l[1]+(u?'<img src="'+u+'" alt="" onerror="this.remove()">':"")+"</span>"};
var S=function(p){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">'+p+"</svg>"};
var A=document.querySelector(".app");

/* fix: name used by older add-on */
try{Object.defineProperty(window,"fxCache",{get:function(){return fx}})}catch(e){}

/* ---- Function icons (own drawings) replace emoji ---- */
var P={gas:'<path d="M5 20V5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v15M5 20h9M5 10h9M14 9h2a2 2 0 0 1 2 2v5a1.5 1.5 0 0 0 3 0V8l-3-3"/>',price:'<path d="M7 7h11l-3-3M17 17H6l3 3"/>',csv:'<path d="M12 4v11M7 11l5 5 5-5M5 20h14"/>',exp:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',tok:'<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>',sip:'<path d="M4 19V5M4 19h16M7 15l4-4 3 3 5-6"/>',emi:'<path d="M3 10l9-6 9 6M5 10v8M9 10v8M15 10v8M19 10v8M3 20h18"/>',yld:'<path d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zM10 21v-6h4v6"/>',frac:'<path d="M12 3a9 9 0 1 0 9 9h-9z"/><path d="M15 3.5A9 9 0 0 1 20.5 9H15z"/>',roi:'<path d="M19 5L5 19"/><circle cx="7" cy="7" r="2.5"/><circle cx="17" cy="17" r="2.5"/>',comp:'<path d="M12 3l9 5-9 5-9-5zM3 13l9 5 9-5"/>',scan:'<path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M4 12h16"/>',share:'<path d="M12 15V4M8 8l4-4 4 4M5 13v6a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-6"/>',vol:'<path d="M4 10v4h4l5 4V6l-5 4zM16 9a4 4 0 0 1 0 6"/>',drop:'<path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11z"/>'};
var M={"#btnGas":"gas","#btnPrice":"price","#btnCsv":"csv","#btnExp":"exp","#btnTok":"tok","#btnSip":"sip","#btnEmi":"emi","#btnYield":"yld","#btnFrac":"frac","#btnRoi":"roi","#btnComp":"comp",'[onclick="scanQR()"]':"scan",'[onclick="shareReqWA()"]':"share",'[onclick="testVoice()"]':"vol","#faucetBtn":"drop"};
var css="";Object.keys(P).forEach(function(k){var u='url("data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">'+P[k]+"</svg>")+'")';css+='[data-xi="'+k+'"]::before{-webkit-mask-image:'+u+';mask-image:'+u+"}"});
var st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
var strip=function(s){return s.replace(/^[^\p{L}\p{N}]+/u,"")};
try{Object.keys(I18N).forEach(function(l){["gas","price","csv","explorer","addTok","sip","emi","yield","frac","roi","comp"].forEach(function(k){if(I18N[l][k])I18N[l][k]=strip(I18N[l][k])})})}catch(e){}
Object.keys(M).forEach(function(s){var e=document.querySelector(s);if(e){e.setAttribute("data-xi",M[s]);e.textContent=strip(e.textContent)}});

/* ---- Real network picker (switches the actual network) ---- */
var nm=function(){return NETWORKS[currentNet].name};
var chip=function(){return'<div class="xnc" onclick="XN.open()">'+lg(currentNet)+"<span>"+nm()+"</span></div>"};
var ns=document.createElement("div");ns.className="shade";ns.id="xnSheet";
ns.onclick=function(e){if(e.target===ns)ns.classList.remove("open")};
ns.innerHTML='<div class="panel"><div class="grab"></div><div class="ttl">Select Network</div><div id="xnList"></div><div class="cap" style="margin-top:12px">Mainnet networks use real money. Test first on Testnet.</div></div>';
A.appendChild(ns);
var XN=window.XN={open:function(){$("xnList").innerHTML=Object.keys(NETWORKS).map(function(k){return'<div class="xni'+(k===currentNet?" on":"")+'" onclick="XN.pick(\''+k+"')\">"+lg(k)+"<div>"+NETWORKS[k].name+"<small>"+(NL[k]?NL[k][2]:"")+"</small></div></div>"}).join("");ns.classList.add("open")},
pick:function(k){var s=$("netSelect");if(s)s.value=k;changeNetwork(k);ns.classList.remove("open");if(k!=="shardeum-testnet")toast("Mainnet: real money. Double-check before sending.",3200)}};
function upd(){var n=NETWORKS[currentNet];document.querySelectorAll(".xnc-slot").forEach(function(e){e.innerHTML=chip()});
var c=$("recvCap");if(c)c.textContent="Only send "+n.name+" assets to this address. Other assets will be lost forever.";
if($("sheetRecv")&&$("sheetRecv").classList.contains("open"))drawQR()}
var _cn=changeNetwork;changeNetwork=function(k){_cn(k);upd()};

/* Send sheet: slot instead of the fake dropdown */
var sp=document.querySelector("#sheetSend .ttl");if(sp){var d=document.createElement("div");d.className="xnc-slot";sp.after(d)}

/* ---- Receive sheet (Trust-style) ---- */
var rp=document.querySelector("#sheetRecv .panel");
if(rp)rp.innerHTML='<div class="grab"></div><div class="rc-h"><button class="rc-x bkb" onclick="BK(this)" aria-label="Back">'+S('<path d="M15 5l-7 7 7 7"/>')+'</button><div class="ttl" id="recvTitle">Receive</div><i></i></div><div class="xnc-slot"></div><div class="warn" id="recvWarn">Switch to the correct network in your wallet</div><div class="inp"><input type="number" id="payAmount" placeholder="Amount (optional)" oninput="drawQR()" step="any" min="0"><b id="recvUnit">SHM</b></div><div class="qrbox" id="qrcode"></div><div class="addr" id="addrBox"></div><div class="cap" style="font-size:11px">One address works on all EVM networks (Ethereum, BNB, Polygon, Base…).</div><div class="paylink" id="payLink" style="display:none"></div><div class="xwarn">'+S('<circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16v.1"/>')+'<span id="recvCap"></span></div><div class="xbtns"><button onclick="copyAddress()">'+S('<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h8"/>')+'<span id="copyBtn">Copy</span></button><button onclick="xShare()">'+S(P.share)+'<span>Share</span></button></div><button class="btn ghost" onclick="copyPayLink()">Copy payment link</button>';
window.xShare=function(){if(navigator.share&&addr){navigator.share({title:"CryptoPay",text:nm()+" address:\n"+addr}).catch(function(){})}else shareWhatsApp()};

/* ---- Styled QR: round dots, round corner eyes, logo in the middle ---- */
function rr(x,X,Y,w,h,r){x.beginPath();x.moveTo(X+r,Y);x.arcTo(X+w,Y,X+w,Y+h,r);x.arcTo(X+w,Y+h,X,Y+h,r);x.arcTo(X,Y+h,X,Y,r);x.arcTo(X,Y,X+w,Y,r);x.closePath();x.fill()}
function sq(el,text,Z){if(!el||typeof QRCode==="undefined")return;
var t=document.createElement("div"),o=new QRCode(t,{text:text,width:64,height:64,correctLevel:QRCode.CorrectLevel.H}),m=o._oQRCode,N=m.getModuleCount(),d=window.devicePixelRatio||1,c=document.createElement("canvas");
c.width=c.height=Z*d;c.style.cssText="width:"+Z+"px;height:"+Z+"px";var x=c.getContext("2d");x.scale(d,d);x.fillStyle="#fff";x.fillRect(0,0,Z,Z);
var u=Z/(N+2),mid=N/2,h=N*.13,dk="#0A0F1A";x.fillStyle=dk;
for(var r=0;r<N;r++)for(var q=0;q<N;q++){if((r<7&&q<7)||(r<7&&q>=N-7)||(r>=N-7&&q<7))continue;if(Math.abs(r+.5-mid)<h&&Math.abs(q+.5-mid)<h)continue;if(m.isDark(r,q)){x.beginPath();x.arc(u*(q+1.5),u*(r+1.5),u*.46,0,6.2832);x.fill()}}
[[0,0],[0,N-7],[N-7,0]].forEach(function(p){var X=u*(p[1]+1),Y=u*(p[0]+1);x.fillStyle=dk;rr(x,X,Y,7*u,7*u,2.4*u);x.fillStyle="#fff";rr(x,X+u,Y+u,5*u,5*u,1.7*u);x.fillStyle=dk;rr(x,X+2*u,Y+2*u,3*u,3*u,1.2*u)});
var L=Z*.2,l=NL[currentNet]||["#555","?"],cx=Z/2-L/2;x.fillStyle="#fff";rr(x,cx-L*.12,cx-L*.12,L*1.24,L*1.24,L*.3);x.fillStyle=l[0];rr(x,cx,cx,L,L,L*.26);
x.fillStyle=currentNet==="bsc"?"#111":"#fff";x.font="900 "+L*.58+"px Arial";x.textAlign="center";x.textBaseline="middle";x.fillText(l[1],Z/2,Z/2+L*.03);
el.innerHTML="";el.appendChild(c)}
drawQR=function(){if(!addr)return;var n=NETWORKS[currentNet],w=toWei($("payAmount").value.trim()),t=w?"ethereum:"+addr+"@"+n.chainIdDec+"?value="+w:addr;sq($("qrcode"),t,236);var p=$("payLink");if(w){p.style.display="block";p.textContent=t}else p.style.display="none"};
drawReqQR=function(){if(!addr)return;var n=NETWORKS[currentNet],w=toWei($("reqAmt").value.trim());sq($("reqQR"),w?"ethereum:"+addr+"@"+n.chainIdDec+"?value="+w:addr,200)};
var _or=openReceive;openReceive=async function(){await _or.apply(this,arguments);upd();if(addr)drawQR()};
changeLang(lang);upd();
})();

/* ===== Part 1: fixed layout, 3-way theme, Settings hub, 6-box PIN, Back stack ===== */
(function(){
"use strict";
var sv=function(p){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">'+p+"</svg>"};
var AR=sv('<path d="M15 5l-7 7 7 7"/>'),CH=sv('<path d="M9 5l7 7-7 7"/>');
var IC={w:'<path d="M4 8a2 2 0 0 1 2-2h12v3M4 8v9a2 2 0 0 0 2 2h14V9H6a2 2 0 0 1-2-2"/><path d="M16 14h2"/>',n:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',a:'<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/>',s:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',b:'<path d="M12 3a6 6 0 0 0-6 6v4l-2 3h16l-2-3V9a6 6 0 0 0-6-6zM10 20h4"/>',d:'<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>',r:'<path d="M20 12a8 8 0 1 1-2.3-5.7M20 4v4h-4"/>',i:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8v.1"/>',x:'<path d="M5 4h3.5L19 20h-3.5zM19 4L5 20"/>'};
var L=function(k,d){return ls.get(k,d)};

/* ---- Theme: auto / dark / light ---- */
function applyTheme(){var m=L("theme","auto"),mq=matchMedia("(prefers-color-scheme: light)").matches,l=m==="light"||(m==="auto"&&mq);document.documentElement.setAttribute("data-theme",l?"light":"dark");var c=document.querySelector("meta[name=theme-color]");if(c)c.content=l?"#f5f6f8":"#0A0F1A"}
try{matchMedia("(prefers-color-scheme: light)").addEventListener("change",applyTheme)}catch(e){}
applyTheme();

/* ---- Layout: only the token list scrolls ---- */
var sc=document.querySelector(".scroll"),ds=$("disclaimer");if(sc&&ds)sc.appendChild(ds);

/* ---- 6-box PIN ---- */
var pinHTML=function(id){return'<div class="pinw" onclick="$(\''+id+'\').focus()"><div class="pbs"><i></i><i></i><i></i><i></i><i></i><i></i></div><input id="'+id+'" class="pin-h" type="password" inputmode="numeric" maxlength="6" autocomplete="off" oninput="PB(this)"></div>'};
window.PB=function(el){var n=el.value.replace(/\D/g,"");el.value=n;var b=el.parentNode.querySelectorAll("i");for(var i=0;i<6;i++)b[i].className=i<n.length?"f":i===n.length?"c":"";if(n.length===6){var f=PB.h[el.id];setTimeout(function(){if(f)f(n);el.value="";PB(el)},150)}};PB.h={};
var lk=$("xtLock");if(lk){lk.innerHTML='<div class="lkic">'+sv('<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>')+'</div><div class="pt">Enter PIN</div>'+pinHTML("xtPin")+'<a class="forgot" onclick="XT.fp()">Forgot PIN?</a>';PB.h.xtPin=function(){XT.un()};
new MutationObserver(function(){if(lk.style.display==="flex")setTimeout(function(){$("xtPin").focus()},80)}).observe(lk,{attributes:true,attributeFilter:["style"]})}
var pa=document.createElement("div");pa.id="pinAsk";pa.className="shade";pa.innerHTML='<div class="panel"><div class="bkh"><button class="bkb" onclick="BK(this)" aria-label="Back">'+AR+'</button><div class="ttl" id="paT"></div></div><div style="padding:24px 0">'+pinHTML("paIn")+"</div></div>";
document.querySelector(".app").appendChild(pa);
function pinAsk(t,cb){$("paT").textContent=t;PB.h.paIn=function(v){pa.classList.remove("open");cb(v)};pa.classList.add("open");setTimeout(function(){$("paIn").focus()},120)}
var hasPin=function(){return!!L("xt_pin","")},chk=function(v){return btoa(v+"cp")===L("xt_pin","")};
function setPin(done){pinAsk("Enter new PIN",function(a){setTimeout(function(){pinAsk("Confirm PIN",function(b){if(a===b){ls.set("xt_pin",btoa(a+"cp"));toast("PIN saved");}else toast("PINs did not match");SB.r()})},200)})}

/* ---- Settings hub with its own Back steps ---- */
var stk=["root"],mins=function(){return L("xt_am",2)};
var R=function(i,l,v,c){return'<div class="sr" onclick="'+c+'"><span class="si">'+sv(IC[i])+'</span><span class="sl">'+l+'</span><span class="sv">'+(v||"")+"</span>"+CH+"</div>"};
var T=function(l,on,c){return'<div class="sr" onclick="'+c+'"><span class="sl">'+l+'</span><span class="sw'+(on?" on":"")+'"></span></div>'};
var O=function(l,on,c){return'<div class="sr" onclick="'+c+'"><span class="sl">'+l+'</span><span class="rd'+(on?" on":"")+'"></span></div>'};
var XL='<a class="xl" href="https://x.com/cryptopay_shm" target="_blank" rel="noopener" aria-label="X">'+sv(IC.x)+"</a>";
var PG={
root:["Settings",function(){var a=addr?addr.slice(0,6)+"…"+addr.slice(-4):"Not connected";return R("w","Wallet",a,"addr||connectWallet()")+R("n","Network",NETWORKS[currentNet].name,"XN.open()")+R("a","Appearance",{auto:"Auto",dark:"Dark",light:"Light"}[L("theme","auto")],"SB.g('app')")+R("s","Security",hasPin()?"PIN on":"Off","SB.g('sec')")+R("b","Notifications","","SB.g('noti')")+R("d","Display","","SB.g('disp')")+R("r","Data & help","","SB.g('dat')")+R("i","About","","SB.g('abt')")+'<div class="xw">'+XL+"</div>"}],
app:["Appearance",function(){var m=L("theme","auto");return O("Automatic (follows phone)",m==="auto","SB.th('auto')")+O("Dark",m==="dark","SB.th('dark')")+O("Light",m==="light","SB.th('light')")}],
sec:["Security",function(){return R("s","PIN lock",hasPin()?"On":"Off","SB.g('pin')")+'<div class="sr"><span class="sl">Auto-lock after</span><select onchange="ls.set(\'xt_am\',+this.value)">'+[1,2,5,10].map(function(x){return'<option value="'+x+'"'+(x==mins()?" selected":"")+">"+x+" min</option>"}).join("")+"</select></div>"+T("Blur screen in background",L("xt_bl",1),"SB.bl()")+'<div class="cap" style="padding:10px 4px">PIN protects this app on your phone. It does not replace your wallet password.</div>'}],
pin:["PIN lock",function(){return hasPin()?'<div class="sr" onclick="SB.chg()"><span class="sl">Change PIN</span>'+CH+'</div><div class="sr" onclick="SB.rm()"><span class="sl" style="color:var(--r)">Remove PIN</span></div>':'<div class="sr" onclick="SB.set()"><span class="sl">Set 6-digit PIN</span>'+CH+"</div>"}],
noti:["Notifications",function(){return T("Sound & voice alerts",soundOn,"toggleSound();SB.r()")+'<div class="sr" onclick="XT.go(\'al\')"><span class="sl">Price alarms</span>'+CH+'</div><div class="sr" onclick="XT.go(\'nt\')"><span class="sl">Notification centre</span>'+CH+"</div>"}],
disp:["Display",function(){return T("Hide balance",hideBal,"togglePriv();SB.r()")+'<div class="sr"><span class="sl">Text size</span><span><button class="mini" onclick="XT.zm(-.1)">A−</button> <button class="mini" onclick="XT.zm(.1)">A+</button></span></div>'}],
dat:["Data & help",function(){return'<div class="sr" onclick="refreshAll()"><span class="sl">Refresh prices</span></div><div class="sr" onclick="testVoice()"><span class="sl">Test voice alert</span></div>'+(currentNet==="shardeum-testnet"?'<div class="sr" onclick="openFaucet()"><span class="sl">Testnet faucet</span></div>':"")+'<div class="sr" onclick="PC.run()"><span class="sl">Check SHM price sources</span></div><div id="pcout" class="cap" style="padding:8px 4px;text-align:left"></div><div class="sr" onclick="location.reload()"><span class="sl">Reload app</span></div>'}],
abt:["About",function(){return'<div style="text-align:center;padding:18px 6px"><div style="margin:0 auto 12px"><svg viewBox="0 0 512 512" style="width:96px;height:96px"><path d="M378.1 110.4A190 190 0 1 0 378.1 401.6" fill="none" stroke="#2B6DF6" stroke-width="38"/><path d="M405.7 139A190 190 0 0 1 405.7 373" fill="none" stroke="#2DD4BF" stroke-width="38"/><rect x="196" y="150" width="56" height="212" rx="28" fill="#F4F6FA"/><path fill-rule="evenodd" fill="#F4F6FA" d="M300 138a76 76 0 1 0 0 152a76 76 0 1 0 0-152zM300 184a30 30 0 1 1 0 60a30 30 0 1 1 0-60z"/></svg></div><b>CryptoPay</b><div class="cap">Version 5.0<br>Non-custodial. We never hold your keys.</div><div class="xw">'+XL+'</div><div class="cap" style="margin-top:12px">Crypto is risky. Not financial advice.<br>© 2026 CryptoPay</div></div>'}]};
var SB=window.SB={r:function(){var p=PG[stk[stk.length-1]];$("stt").textContent=p[0];$("sbody").innerHTML=p[1]()},g:function(i){stk.push(i);SB.r()},back:function(){if(stk.length>1){stk.pop();SB.r();return true}return false},
th:function(m){ls.set("theme",m);applyTheme();SB.r()},bl:function(){ls.set("xt_bl",L("xt_bl",1)?0:1);SB.r()},
set:function(){setPin()},chg:function(){pinAsk("Enter current PIN",function(v){if(chk(v))setPin();else toast("Wrong PIN")})},rm:function(){pinAsk("Enter current PIN",function(v){if(chk(v)){ls.set("xt_pin","");toast("PIN removed");SB.r()}else toast("Wrong PIN")})}};
var sp=document.querySelector("#sheetSet .panel");sp.innerHTML='<div class="bkh"><button class="bkb" onclick="BK(this)" aria-label="Back">'+AR+'</button><div class="ttl" id="stt">Settings</div></div><div id="sbody"></div>';
openSettings=function(){stk=["root"];SB.r();$("sheetSet").classList.add("open")};

/* ---- Back buttons instead of Close ---- */
document.querySelectorAll(".shade .panel").forEach(function(p){if(p.querySelector(".bkh,.rc-h"))return;var t=p.querySelector(".ttl"),g=p.querySelector(".grab");if(g)g.remove();var h=document.createElement("div");h.className="bkh";h.innerHTML='<button class="bkb" onclick="BK(this)" aria-label="Back">'+AR+"</button>";if(t)h.appendChild(t);p.insertBefore(h,p.firstChild)});
document.querySelectorAll('.btn.ghost[onclick="closeAll()"]').forEach(function(b){b.remove()});
window.BK=function(b){BK.go(b.closest(".shade"))};
BK.go=function(s){if(!s)return;if(s.id==="sheetSet"&&SB.back())return;if(s.id==="sheetSend")stopScan();s.classList.remove("open")};
document.querySelectorAll(".shade").forEach(function(s){s.onclick=function(e){if(e.target===s)BK.go(s)}});

/* ---- Phone Back button = one step back ---- */
var ST=[],skip=0,pop=0;
var ob=new MutationObserver(function(ms){var n=0;ms.forEach(function(m){var e=m.target,o=e.classList.contains("open"),i=ST.indexOf(e);if(o&&i<0){ST.push(e);history.pushState({cp:1},"")}else if(!o&&i>=0){ST.splice(i,1);n++}});if(n&&!pop){skip=1;history.go(-n)}});
document.querySelectorAll(".shade").forEach(function(s){ob.observe(s,{attributes:true,attributeFilter:["class"]})});
window.addEventListener("popstate",function(){if(skip){skip=0;return}var t=ST[ST.length-1];if(!t)return;pop=1;var c=ST.length;BK.go(t);setTimeout(function(){pop=0;if(ST.length>=c&&ST.indexOf(t)>-1)history.pushState({cp:1},"")},0)});

/* ---- No WhatsApp: native share or copy ---- */
var sh=function(t){if(navigator.share)navigator.share({title:"CryptoPay",text:t}).catch(function(){});else navigator.clipboard.writeText(t).then(function(){toast("Copied")})};
shareWhatsApp=function(){if(addr)sh(NETWORKS[currentNet].name+" address:\n"+addr)};
shareReqWA=function(){if(!addr)return;var n=NETWORKS[currentNet],a=$("reqAmt").value.trim(),t=$("reqNote").value.trim(),m="CryptoPay payment request\n"+n.name+" · "+n.symbol+"\n";if(a)m+="Amount: "+a+" "+n.symbol+"\n";if(t)m+="Note: "+t+"\n";sh(m+"Address: "+addr)};
XT.fp=function(){if(confirm("Remove the PIN lock? Your wallet and funds are not affected.")){ls.set("xt_pin","");lk.style.display="none"}};(function(){var p=ls.get("xt_pin",""),ok=false;try{ok=/^\d{6}cp$/.test(atob(p))}catch(e){}if(p&&!ok)ls.set("xt_pin","");if(lk)lk.style.display=ok?"flex":"none"})();
})();

/* ===== Part 1-C: logo, more networks, single Add-token entry ===== */
(function(){
var GL='<svg viewBox="0 0 512 512"><path d="M358.5 176A130 130 0 1 0 358.5 336" fill="none" stroke="#3B7BFF" stroke-width="64"/><circle cx="342" cy="256" r="34" fill="#3B7BFF"/></svg>';
document.querySelectorAll(".cmark").forEach(function(e){e.innerHTML=GL});
var sp=$("splash");if(sp){if(sessionStorage.getItem("cp_s"))sp.remove();else sessionStorage.setItem("cp_s","1")}
var X={polygon:{name:"Polygon",chainId:"0x89",chainIdDec:137,symbol:"POL",rpc:"https://polygon-rpc.com",explorer:"https://polygonscan.com"},base:{name:"Base",chainId:"0x2105",chainIdDec:8453,symbol:"ETH",rpc:"https://mainnet.base.org",explorer:"https://basescan.org"},optimism:{name:"Optimism",chainId:"0xa",chainIdDec:10,symbol:"ETH",rpc:"https://mainnet.optimism.io",explorer:"https://optimistic.etherscan.io"},arbitrum:{name:"Arbitrum One",chainId:"0xa4b1",chainIdDec:42161,symbol:"ETH",rpc:"https://arb1.arbitrum.io/rpc",explorer:"https://arbiscan.io"}};
Object.keys(X).forEach(function(k){NETWORKS[k]=X[k];var o=document.createElement("option");o.value=k;o.textContent=X[k].name;$("netSelect").appendChild(o)});
T.POL={bal:"0.0000",p:null};
var tb=$("btnTok");if(tb)tb.remove();
document.querySelector(".tabs").insertAdjacentHTML("beforeend",'<button class="addtok" aria-label="Add token" onclick="$(\'sheetTok\').classList.add(\'open\')"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></button>');
async function autoSym(){var a=$("tokAddr").value.trim();if(!/^0x[0-9a-fA-F]{40}$/.test(a)||!window.ethereum)return;try{var r=await ethereum.request({method:"eth_call",params:[{to:a,data:"0x95d89b41"},"latest"]}),h=r.slice(2),n=parseInt(h.slice(64,128),16),s=(h.slice(128,128+n*2).match(/../g)||[]).map(function(b){return String.fromCharCode(parseInt(b,16))}).join("");if(s&&!$("tokSym").value)$("tokSym").value=s}catch(e){}}
$("tokAddr").addEventListener("input",autoSym);
window.pasteTok=function(){navigator.clipboard.readText().then(function(t){$("tokAddr").value=t.trim();autoSym()}).catch(function(){toast("Paste manually")})};
window.saveTok=async function(){var a=$("tokAddr").value.trim(),s=($("tokSym").value||"").trim()||"TOKEN";if(!/^0x[0-9a-fA-F]{40}$/.test(a))return toast("Invalid contract address");var l=getCustoms();if(l.some(function(x){return x.addr.toLowerCase()===a.toLowerCase()}))return toast("Already added");if(!addr){await connectWallet();if(!addr)return}l.push({addr:a,symbol:s,time:Date.now()});ls.set("customTokens",l);buildList();await readCustomBalances();$("sheetTok").classList.remove("open");$("tokAddr").value="";$("tokSym").value="";toast(s+" added")};
})();

/* ===== Part 2: brand (blue/teal), splash only ===== */
(function(){var s=$("splash");if(!s)return;s.innerHTML='<svg viewBox="0 0 512 512" width="150" height="150"><style>.sa{stroke-dasharray:1300;stroke-dashoffset:1300;animation:spd 1s ease-out forwards}.sg{opacity:0;animation:spf .4s 1s forwards}.ss{transform-box:fill-box;transform-origin:bottom;transform:scaleY(0);animation:spu .5s 1.2s ease-out forwards}.sk{transform:translateY(-330px);animation:spdr .9s 1.7s cubic-bezier(.3,1.3,.5,1) forwards}.ssp{transform-box:fill-box;transform-origin:center;animation:spsp .9s 1.7s ease-in-out}@keyframes spd{to{stroke-dashoffset:0}}@keyframes spf{to{opacity:1}}@keyframes spu{to{transform:scaleY(1)}}@keyframes spdr{to{transform:none}}@keyframes spsp{0%{transform:scaleX(1)}25%{transform:scaleX(-1)}50%{transform:scaleX(1)}75%{transform:scaleX(-1)}100%{transform:scaleX(1)}}</style><path class="sa" d="M378.1 110.4A190 190 0 1 0 378.1 401.6" fill="none" stroke="#2B6DF6" stroke-width="38"/><g class="sg"><path d="M405.7 139A190 190 0 0 1 405.7 373" fill="none" stroke="#2DD4BF" stroke-width="38"/></g><g class="ss"><rect x="196" y="150" width="56" height="212" rx="28" fill="#F4F6FA"/></g><g class="sk"><g class="ssp"><path fill-rule="evenodd" fill="#F4F6FA" d="M300 138a76 76 0 1 0 0 152a76 76 0 1 0 0-152zM300 184a30 30 0 1 1 0 60a30 30 0 1 1 0-60z"/></g></g></svg><div class="sn" style="animation-delay:2.4s"><span style="color:#fff">Crypto</span><span style="color:var(--y)">Pay</span></div>'})();

/* ===== Part 3: Services page (Binance-style grid) ===== */
(function(){
var P={send:'<path d="M7 17L17 7M9 7h8v8"/>',recv:'<path d="M17 7L7 17M15 17H7V9"/>',req:'<path d="M7 4h10a1 1 0 0 1 1 1v15l-3-2-3 2-3-2-3 2V5a1 1 0 0 1 1-1zM9 9h6M9 13h4"/>',tok:'<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>',gas:'<path d="M5 20V5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v15M5 20h9M5 10h9M14 9h2a2 2 0 0 1 2 2v5a1.5 1.5 0 0 0 3 0V8l-3-3"/>',cv:'<path d="M7 7h11l-3-3M17 17H6l3 3"/>',csv:'<path d="M12 4v11M7 11l5 5 5-5M5 20h14"/>',exp:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',al:'<circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M5 4l-2 2M19 4l2 2"/>',sip:'<path d="M4 19V5M4 19h16M7 15l4-4 3 3 5-6"/>',emi:'<path d="M3 10l9-6 9 6M5 10v8M9 10v8M15 10v8M19 10v8M3 20h18"/>',yld:'<path d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zM10 21v-6h4v6"/>',frac:'<path d="M12 3a9 9 0 1 0 9 9h-9z"/><path d="M15 3.5A9 9 0 0 1 20.5 9H15z"/>',roi:'<path d="M19 5L5 19"/><circle cx="7" cy="7" r="2.5"/><circle cx="17" cy="17" r="2.5"/>',comp:'<path d="M12 3l9 5-9 5-9-5zM3 13l9 5 9-5"/>',bs:'<circle cx="8" cy="12" r="4.5"/><circle cx="16" cy="12" r="4.5"/>',pl:'<path d="M4 17l5-5 4 4 7-8M15 8h5v5"/>',ra:'<path d="M5 21V5h9v16M14 10h5v11M8 9h3M8 13h3M8 17h3"/>',rr:'<path d="M4 6h16v14H4zM4 10h16M8 3v4M16 3v4"/>',ck:'<path d="M9 6h11M9 12h11M9 18h11M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2"/>',sc:'<path d="M6 21V4M6 5h11l-2 4 2 4H6"/>',ln:'<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19h15"/>',sec:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',qz:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 1-1 1.7M12 17v.1"/>',st:'<path d="M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-6 1-9z"/>',nt:'<path d="M12 3a6 6 0 0 0-6 6v4l-2 3h16l-2-3V9a6 6 0 0 0-6-6zM10 20h4"/>',tx:'<circle cx="11" cy="11" r="6"/><path d="M16 16l4 4"/>'};
var ic=function(k){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+P[k]+"</svg>"};
var D=function(t,f){return function(){$("toolOut").textContent="";$("calcBox").style.display="none";$("sheetTools").classList.add("open");$("toolsTitle").textContent=t;f()}};
var C=function(k,t){return D(t,function(){showCalc(k)})},X=function(k){return function(){XT.go(k)}},H=function(f){return function(){closeAll();f()}};
var G=[["Crypto",[["Network fee","gas",D("Network fee",toolGas)],["Price converter","cv",D("Price converter",toolConvert)],["History CSV","csv",toolExport],["Block explorer","exp",openExplorer],["Price alarm","al",X("al")]]],
["Calculators",[["SIP","sip",C("sip","SIP calculator")],["EMI","emi",C("emi","EMI calculator")],["Rental yield","yld",C("yield","Rental yield")],["Fractional","frac",C("frac","Fractional ownership")],["ROI","roi",C("roi","ROI calculator")],["Compound","comp",C("comp","Compound interest")],["Bill split","bs",X("bs")],["Profit / Loss","pl",X("pl")]]],
["RWA",[["My assets","ra",X("ra")],["Rent records","rr",X("rr")],["Docs checklist","ck",X("ck")],["Scam check","sc",X("sc")],["Learn RWA","ln",X("ln")]]],
["Safety",[["Security tips","sec",X("sec")],["Crypto quiz","qz",X("qz")],["Daily streak","st",X("st")],["Notifications","nt",X("nt")],["History search","tx",X("tx")]]]];
function render(q){q=(q||"").toLowerCase();var h='<div class="svq"><input id="svqi" placeholder="Search services" autocomplete="off" oninput="SV.q(this.value)"></div>';if(!q)h+='<div class="svc-chips">'+G.map(function(g,i){return'<button onclick="SV.j('+i+')">'+g[0]+"</button>"}).join("")+"</div>";
G.forEach(function(g,gi){var t=g[1].filter(function(x){return x[0].toLowerCase().indexOf(q)>-1});if(!t.length)return;h+='<div class="svg-h" id="svg'+gi+'">'+g[0]+'</div><div class="svg-g">'+t.map(function(x){return'<button onclick="SV.go('+gi+","+g[1].indexOf(x)+')"><span class="svi">'+ic(x[1])+'</span><span class="svl">'+x[0]+"</span></button>"}).join("")+"</div>"});$("svcBody").innerHTML=h}
window.SV={q:function(v){render(v);var i=$("svqi");i.value=v;i.focus()},j:function(i){$("svg"+i).scrollIntoView({behavior:"smooth",block:"start"})},go:function(g,i){G[g][1][i][2]()}};
openTools=function(){render("");$("sheetSvc").classList.add("open")};
})();

/* ===== Part 4: assets (CPAY), token send, scan icon, scrolling home ===== */
(function(){
var DEF={addr:"0xeB24350E1117083d27ab0fef346D2d25f03E380a",symbol:"CPAY",chain:"shardeum-testnet",decimals:18};
var CPL='<svg viewBox="0 0 512 512"><path d="M378.1 110.4A190 190 0 1 0 378.1 401.6" fill="none" stroke="#2B6DF6" stroke-width="38"/><path d="M405.7 139A190 190 0 0 1 405.7 373" fill="none" stroke="#2DD4BF" stroke-width="38"/><rect x="196" y="150" width="56" height="212" rx="28" fill="#F4F6FA"/><path fill-rule="evenodd" fill="#F4F6FA" d="M300 138a76 76 0 1 0 0 152a76 76 0 1 0 0-152zM300 184a30 30 0 1 1 0 60a30 30 0 1 1 0-60z"/></svg>';
window.CPLOGO=CPL;
var _g=getCustoms;getCustoms=function(){var l=_g();if(!l.some(function(x){return x.addr.toLowerCase()===DEF.addr.toLowerCase()}))l.unshift(Object.assign({},DEF));return l.filter(function(x){return!x.chain||x.chain===currentNet})};
var XA=window.XA={sel:null},nat=function(){return NETWORKS[currentNet].symbol};
function assets(){var a=[{s:nat(),n:1}];getCustoms().forEach(function(t){a.push({s:t.symbol||"TOKEN",t:t})});return a}
function cur(){var a=assets();for(var i=0;i<a.length;i++)if(a[i].s===XA.sel)return a[i];XA.sel=nat();return a[0]}
function alg(a){if(a.n){var u=LOGOS[a.s];return'<span class="nlg" style="background:#2B3A55">'+a.s[0]+(u?'<img src="'+u+'" alt="" onerror="this.remove()">':"")+"</span>"}if(a.s==="CPAY")return'<span class="nlg cpl">'+CPL+"</span>";return'<span class="nlg" style="background:#2B3A55">'+a.s[0]+"</span>"}
document.querySelectorAll("#sheetSend .xnc-slot,#sheetRecv .xnc-slot").forEach(function(s){var d=document.createElement("div");d.className="xas-slot";s.after(d)});
function upd2(){var c=cur(),n=NETWORKS[currentNet],s=function(i,v){var e=$(i);if(e)e.textContent=v};
document.querySelectorAll(".xas-slot").forEach(function(e){e.innerHTML='<div class="xnc" onclick="XA.open()">'+alg(c)+"<span>"+c.s+"</span></div>"});
s("sendTitle","Send "+c.s);s("sendUnit",c.s);s("recvTitle","Receive "+c.s);s("recvUnit",c.s);
s("recvCap","Only send "+c.s+" ("+n.name+") to this address. Other assets will be lost forever.");
var r=document.querySelector("#sheetSend .risk");if(r)r.textContent="Only send "+c.s+" on "+n.name+". Wrong token or network = permanent loss.";
var pa=$("payAmount");if(pa&&pa.parentNode)pa.parentNode.style.display=c.t?"none":""}
XA.open=function(){var cs=cur().s;$("xaList").innerHTML=assets().map(function(a){var b=a.n?(T[a.s]&&T[a.s].bal):a.t.bal;return'<div class="xni'+(a.s===cs?" on":"")+'" onclick="XA.pick(\''+a.s+'\')">'+alg(a)+"<div>"+a.s+"<small>"+(a.n?NETWORKS[currentNet].name+" · native":a.t.addr.slice(0,8)+"…"+a.t.addr.slice(-6))+'</small></div><span style="margin-left:auto;color:var(--mut)">'+(b!=null?b:"—")+"</span></div>"}).join("");$("xaSheet").classList.add("open")};
XA.pick=function(s){XA.sel=s;$("xaSheet").classList.remove("open");upd2();if($("sheetRecv").classList.contains("open"))drawQR()};
XA.tap=function(s){var a=assets().filter(function(x){return x.s===s})[0];if(!a){toast(s+": price only here")}else{XA.sel=s;openReceive()}};
XA.tok=function(){return cur().t||null};
var _cn=changeNetwork;changeNetwork=function(k){_cn(k);XA.sel=null;upd2()};
var _os=openSend;openSend=async function(){await _os.apply(this,arguments);upd2()};
var _or=openReceive;openReceive=async function(){await _or.apply(this,arguments);upd2();if(addr)drawQR()};
var _dq=drawQR;drawQR=function(){var e=$("payAmount"),v=e.value;if(XA.tok())e.value="";_dq();e.value=v};
var _ds=doSend;doSend=async function(){var t=XA.tok();if(!t)return _ds.apply(this,arguments);
var to=$("sendTo").value.trim(),amt=$("sendAmt").value.trim(),d=t.decimals||18,n=NETWORKS[currentNet];
if(!/^0x[0-9a-fA-F]{40}$/.test(to))return sendMsg("Invalid address");
if(!/^\d*\.?\d+$/.test(amt)||+amt<=0)return sendMsg("Invalid amount");
if(t.bal!=null&&+amt>+t.bal)return sendMsg("Insufficient "+t.symbol+" balance");
var p=amt.split("."),w=(BigInt(p[0]||"0")*10n**BigInt(d)+BigInt(((p[1]||"")+"0".repeat(d)).slice(0,d))).toString(16);
if(!confirm("Send "+amt+" "+t.symbol+" to\n"+to+"?"))return;
try{var c=await ethereum.request({method:"eth_chainId"});if(c!==n.chainId)return sendMsg("Wrong network");$("sendBtn").disabled=true;sendMsg("Confirm in wallet…");
var h=await ethereum.request({method:"eth_sendTransaction",params:[{from:addr,to:t.addr,data:"0xa9059cbb"+to.slice(2).toLowerCase().padStart(64,"0")+w.padStart(64,"0")}]});
sendMsg("Sent ✓ "+h.slice(0,12)+"…",true);logTx("out",amt,t.symbol,h);$("sendAmt").value="";setTimeout(readCustomBalances,6000);toast("Sent")}catch(e){sendMsg(e.code===4001?"Cancelled":(e.message||"Failed"))}
$("sendBtn").disabled=false};
/* scan icon (top right), shown only here */
var sb=$("soundBtn"),rb=document.createElement("div");rb.style.cssText="display:flex;gap:2px";sb.before(rb);rb.appendChild(sb);
rb.insertAdjacentHTML("beforeend",'<button class="snd" aria-label="Scan QR" onclick="homeScan()"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M4 12h16"/></svg></button>');
window.homeScan=async function(){await openSend();if(addr)scanQR()};
/* balance, buttons and tabs scroll together with the token list */
var sc=document.querySelector(".scroll");[document.querySelector(".tabs"),document.querySelector(".acts"),document.querySelector(".hero")].forEach(function(e){if(e)sc.prepend(e)});
upd2();
})();

/* ===== Part 5: SHM price from several sources + price check ===== */
(function(){
var SRC=[["KuCoin",function(){return fetch("https://api.kucoin.com/api/v1/market/orderbook/level1?symbol=SHM-USDT").then(function(r){return r.json()}).then(function(d){return+d.data.price})}],
["MEXC",function(){return fetch("https://api.mexc.com/api/v3/ticker/price?symbol=SHMUSDT").then(function(r){return r.json()}).then(function(d){return+d.price})}],
["CoinGecko",function(){return fetch("https://api.coingecko.com/api/v3/simple/price?ids=shardeum&vs_currencies=usd").then(function(r){return r.json()}).then(function(d){return+d.shardeum.usd})}]];
var ok=function(x){return isFinite(x)&&x>0};
function med(a){a=a.slice().sort(function(x,y){return x-y});var m=a.length>>1;return a.length%2?a[m]:(a[m-1]+a[m])/2}
function all(){return Promise.all(SRC.map(function(s){return s[1]().then(function(v){return{n:s[0],v:v}}).catch(function(e){return{n:s[0],e:String(e&&e.message||e).slice(0,40)}})}))}
var last=0,_fp=fetchPrices;
fetchPrices=async function(){await _fp();if(Date.now()-last<60000)return;last=Date.now();
try{var r=await all(),v=r.filter(function(x){return ok(x.v)}).map(function(x){return x.v}),c=T.SHM.p;
if(v.length>=2||(v.length===1&&!c)){var m=med(v);T.SHM.p={usd:m,inr:m*fx,chg:(c&&c.chg)||0};lastOk=Date.now();paint()}}catch(e){}};
window.PC={run:async function(){var o=$("pcout");if(o)o.textContent="Checking…";var r=await all(),c=T.SHM.p;
if(o)o.innerHTML=r.map(function(x){return x.n+": "+(x.v!=null?"$"+x.v:"failed ("+x.e+")")}).join("<br>")+"<br>App shows: "+(c?"$"+c.usd:"—")}};
})();
