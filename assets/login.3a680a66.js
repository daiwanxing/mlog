import{p as a,j as e,l,o,e as t,f as s,L as n,M as u,H as i,W as c,t as d,C as r,O as v}from"./vendor.08c6e7a1.js";import{c as p,l as m}from"./main.b20d08c0.js";a("data-v-1b87b260");const f={class:"login-content"},g={class:"login-form",name:"login-form"},b={class:"login-phone-input"},h={class:"login-password-input"},y={class:"auto-login-box"},w={class:"al-box-wrap"},x=s("label",{for:"login-auto",class:"at-login"},"自动登录",-1),k=s("a",{href:"#",class:"fgt-pwd"},"忘记密码",-1),j={key:0,class:"error-tips"};e();const C={expose:[],setup(a){const e=l(""),C=l(!0),I=l(""),U=l(""),V=l(!1);async function K(){try{V.value=!0,await function(){const a=/^1[3456789]\d{9}$/g;return new Promise(((e,l)=>{let o=I.value.toString();a.test(o)?U.value?e():l("请输入密码"):l("请输入正确的手机号")}))}(),C.value=!0,e.value=""}catch(a){e.value=a,C.value=!1}finally{C.value&&m(I.value,U.value).then((a=>{502===a.code||501===a.code?(e.value=a.message,C.value=!1):_()})),V.value=!1}}function L(a){let e=parseInt(a.target.value);I.value=isNaN(e)?"":e}const N=v();function _(){N.push("/mlog/")}const E=l(!0);return window.addEventListener("beforeunload",(function(){!1===E.value&&p()})),(a,l)=>(o(),t("main",f,[s("form",g,[s("div",b,[n(s("input",{type:"tel",placeholder:"请输入手机号","onUpdate:modelValue":l[1]||(l[1]=a=>I.value=a),onInput:L,maxlength:"11"},null,544),[[u,I.value,void 0,{trim:!0}]])]),s("div",h,[n(s("input",{type:"password",autocomplete:"",placeholder:"请输入密码","onUpdate:modelValue":l[2]||(l[2]=a=>U.value=a),onKeypress:i(K,["enter"])},null,40,["onKeypress"]),[[u,U.value,void 0,{trim:!0}]])]),s("div",y,[s("div",w,[n(s("input",{type:"checkbox",name:"autologin",id:"login-auto","onUpdate:modelValue":l[3]||(l[3]=a=>E.value=a)},null,512),[[c,E.value]]),x]),k,C.value?r("",!0):(o(),t("p",j,d(e.value),1))]),s("button",{type:"button",onClick:K,disabled:V.value,class:{"dis-btn":V.value}}," 登录 ",10,["disabled"]),s("p",{class:"back-home"},[s("a",{href:"#",onClick:_},"< 返回首页")])])]))},__scopeId:"data-v-1b87b260"};export default C;