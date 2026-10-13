/* CryptoPay in-app wallet (TESTNET ONLY). Keys are encrypted with your PIN and never leave this device. */
(function(){
var E=window.ethers;if(!E)return;
var KS="cp3_inapp_keystore",CHAIN="0x1fb7",RPC="https://api-mezame.shardeum.org",W=null;
function prov(){return new E.JsonRpcProvider(RPC,8119,{staticNetwork:true})}
var P={isCpWallet:true,
request:async function(a){var m=a.method,p=a.params||[];
if(m==="eth_chainId")return CHAIN;
switch(m){
case"eth_getBalance":return"0x"+(await prov().getBalance(p[0])).toString(16);
case"eth_call":return await prov().call(p[0]);
case"eth_blockNumber":return"0x"+(await prov().getBlockNumber()).toString(16);
case"eth_gasPrice":return await prov().send("eth_gasPrice",[]);
case"eth_estimateGas":return"0x"+(await prov().estimateGas(p[0])).toString(16)}
if(!W)throw{code:4100,message:"Wallet is locked"};
switch(m){
case"eth_requestAccounts":case"eth_accounts":return[W.address];
case"wallet_switchEthereumChain":case"wallet_addEthereumChain":if((p[0].chainId||"").toLowerCase()!==CHAIN)throw{code:4902,message:"The in-app wallet works on Shardeum Testnet only for now."};return null;
case"eth_getBalance":return"0x"+(await prov().getBalance(p[0])).toString(16);
case"eth_call":return await prov().call(p[0]);
case"eth_blockNumber":return"0x"+(await prov().getBlockNumber()).toString(16);
case"eth_gasPrice":return await prov().send("eth_gasPrice",[]);
case"eth_estimateGas":return"0x"+(await prov().estimateGas(p[0])).toString(16);
case"eth_sendTransaction":{var t=p[0],pv=prov(),gp=await pv.send("eth_gasPrice",[]),r=await W.connect(pv).sendTransaction({to:t.to,data:t.data,value:t.value,type:0,gasPrice:gp});return r.hash}
default:throw{code:-32601,message:"Not supported: "+m}}},
on:function(){},removeListener:function(){}};
function ks(){return localStorage.getItem(KS)}
window.CPW={has:function(){return!!ks()},unlocked:function(){return!!W},
address:function(){if(W)return W.address;try{return E.getAddress("0x"+JSON.parse(ks()).address)}catch(e){return""}},
create:async function(pin){var w=E.Wallet.createRandom();localStorage.setItem(KS,await w.encrypt(pin));W=w;return w.mnemonic.phrase},
imp:async function(phrase,pin){var w=E.Wallet.fromPhrase(String(phrase).trim().toLowerCase().replace(/\s+/g," "));localStorage.setItem(KS,await w.encrypt(pin));W=w},
unlock:async function(pin){W=await E.Wallet.fromEncryptedJson(ks(),pin)},
phrase:async function(pin){var w=await E.Wallet.fromEncryptedJson(ks(),pin);return w.mnemonic?w.mnemonic.phrase:""},
unlockKs:async function(js,pw,expect){var x=await E.Wallet.fromEncryptedJson(js,pw);if(expect&&x.address.toLowerCase()!==String(expect).toLowerCase())throw new Error("wrong wallet");W=x},
lock:function(){W=null},remove:function(){localStorage.removeItem(KS);W=null}};
if(!window.ethereum)window.ethereum=P;
})();
