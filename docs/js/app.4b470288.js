(function(e){function t(t){for(var i,n,s=t[0],a=t[1],r=t[2],d=0,p=[];d<s.length;d++)n=s[d],Object.prototype.hasOwnProperty.call(o,n)&&o[n]&&p.push(o[n][0]),o[n]=0;for(i in a)Object.prototype.hasOwnProperty.call(a,i)&&(e[i]=a[i]);c&&c(t);while(p.length)p.shift()();return u.push.apply(u,r||[]),l()}function l(){for(var e,t=0;t<u.length;t++){for(var l=u[t],i=!0,s=1;s<l.length;s++){var a=l[s];0!==o[a]&&(i=!1)}i&&(u.splice(t--,1),e=n(n.s=l[0]))}return e}var i={},o={app:0},u=[];function n(t){if(i[t])return i[t].exports;var l=i[t]={i:t,l:!1,exports:{}};return e[t].call(l.exports,l,l.exports,n),l.l=!0,l.exports}n.m=e,n.c=i,n.d=function(e,t,l){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:l})},n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var l=Object.create(null);if(n.r(l),Object.defineProperty(l,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(l,i,function(t){return e[t]}.bind(null,i));return l},n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],a=s.push.bind(s);s.push=t,s=s.slice();for(var r=0;r<s.length;r++)t(s[r]);var c=a;u.push([0,"chunk-vendors"]),l()})({0:function(e,t,l){e.exports=l("56d7")},"56d7":function(e,t,l){"use strict";l.r(t);l("e260"),l("e6cf"),l("cca6"),l("a79d");var i=l("2b0e"),o=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"sidebar-ui flex align-center justify-content-center flex-direction-column",attrs:{id:"app"}},[l("h1",{staticClass:"mb-3"},[e._v(" VueSelectInputUi ")]),l("div",{staticClass:"container"},[l("VueSelectInputUi",{staticClass:"mb-3",attrs:{id:"VueSelectInput2",name:"VueSelectInput2",options:e.optionsList,label:"Choose option",color:"dodgerblue"},model:{value:e.selectedValue,callback:function(t){e.selectedValue=t},expression:"selectedValue"}}),l("VueSelectInputUi",{staticClass:"mb-3",attrs:{id:"VueSelectInput1",name:"VueSelectInput1",options:e.optionsList,label:"Choose option",color:"yellowgreen",size:"sm",required:"","item-height":20},model:{value:e.selectedValue,callback:function(t){e.selectedValue=t},expression:"selectedValue"}}),l("VueSelectInputUi",{staticClass:"mb-3",attrs:{id:"VueSelectInput3",name:"VueSelectInput3",options:e.optionsList,label:"Choose option",color:"purple",size:"lg",dark:"","item-height":40},model:{value:e.selectedValue,callback:function(t){e.selectedValue=t},expression:"selectedValue"}}),l("VueSelectInputUi",{staticClass:"mb-3",attrs:{id:"VueSelectInputBgDark",name:"VueSelectInputBgDark",options:e.optionsList,label:"With different bg dark color",color:"dodgerblue","dark-color":"#21222e",dark:""},model:{value:e.selectedValue,callback:function(t){e.selectedValue=t},expression:"selectedValue"}}),l("VueSelectInputUi",{staticClass:"mb-3",attrs:{id:"VueSelectInput4",name:"VueSelectInput5",options:e.optionsList,label:"Choose option",color:"dodgerblue",error:"",hint:"Error message shown","item-height":50},model:{value:e.selectedValue,callback:function(t){e.selectedValue=t},expression:"selectedValue"}}),l("VueSelectInputUi",{staticClass:"mb-3",attrs:{id:"VueSelectInput5",name:"VueSelectInput5",options:e.optionsList,label:"Disabled input dark",color:"orangered",disabled:"",dark:"","item-height":60},model:{value:e.selectedValue,callback:function(t){e.selectedValue=t},expression:"selectedValue"}}),l("VueSelectInputUi",{staticClass:"mb-3",attrs:{id:"VueSelectInputDisabledLight",name:"VueSelectInputDisabledLight",options:e.optionsList,label:"Disabled input light",disabled:"","item-height":70},model:{value:e.selectedValue,callback:function(t){e.selectedValue=t},expression:"selectedValue"}}),l("VueSelectInputUi",{staticClass:"mb-3",attrs:{id:"VueSelectInputValid",name:"VueSelectInputValid",options:e.optionsList,label:"Valid input",valid:""},model:{value:e.selectedValue,callback:function(t){e.selectedValue=t},expression:"selectedValue"}})],1),l("p",[e._v(" Value selected : "+e._s(e.selectedValue||"null")+" ")])])},u=[],n=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{directives:[{name:"click-outside",rawName:"v-click-outside",value:e.closeList,expression:"closeList"}],ref:"VueSelectInputUi",staticClass:"select-input-ui",class:[{"is-focused":e.isFocus,"has-value":e.value,"has-hint":e.hint,"has-error":e.error,"is-disabled":e.disabled,"is-dark":e.dark,"is-valid":e.valid},e.size],style:[e.cssTheme],attrs:{id:e.uniqueId},on:{click:e.focusInput}},[l("input",e._b({ref:"SelectInputUiInput",staticClass:"select-input-ui__input",attrs:{id:e.id,name:e.name,placeholder:e.labelShown,disabled:e.disabled,required:e.required,readonly:""},domProps:{value:e.valueShown},on:{focus:e.openList,keydown:e.keyboardNav,click:function(t){return e.$emit("click")}}},"input",e.$attrs,!1)),l("div",{staticClass:"select-input-ui__toggle",on:{click:e.focusInput}},[e._t("arrow",[l("div",{staticClass:"select-input-ui__toggle__arrow"},[e._v(" ▼ ")])])],2),l("label",{ref:"label",staticClass:"select-input-ui__label",class:e.error?"text-danger":null,attrs:{for:e.id}},[e._v(" "+e._s(e.hintValue||e.labelShown)+" ")]),l("Transition",{attrs:{name:"slide"}},[l("div",{directives:[{name:"show",rawName:"v-show",value:e.isFocus,expression:"isFocus"}],ref:"optionsList",staticClass:"select-input-ui__options-list",style:[e.itemListHeight]},e._l(e.options,(function(t,i){var o=t.label,u=t.value;return l("div",{key:i,staticClass:"flex align-center select-input-ui__options-list__item",class:[{selected:e.value===u},{"keyboard-selected":e.tmpValue===u}],style:[e.optionHeight],on:{click:function(t){return t.stopPropagation(),e.updateValue(u)}}},[l("div",{staticClass:"dots-text",class:{"text-muted":!u}},[e._v(" "+e._s(o)+" ")])])})),0)])],1)},s=[],a=(l("99af"),l("4de4"),l("c740"),l("a9e3"),l("2ca0"),l("2103")),r=l("be30"),c=l("4883"),d=function(e){var t=e.color,l=e.lightColor,i=e.darkColor,o=e.validColor,u=e.borderRadius,n=e.errorColor;return{"--vue-select-input-ui-primary-color":t,"--vue-select-input-ui-second-color-light":"#747474","--vue-select-input-ui-second-color-dark":"rgba(255, 255, 255, 0.7)","--vue-select-input-ui-third-color-light":"#CCC","--vue-select-input-ui-third-color-dark":"rgba(255, 255, 255, 0.7)","--vue-select-input-ui-bg-color-light":l,"--vue-select-input-ui-bg-color-dark":i,"--vue-select-input-ui-error-color":n,"--vue-select-input-ui-valid-color":o,"--vue-select-input-ui-hover-color-light":Object(c["ShadeColor"])(l,-8),"--vue-select-input-ui-hover-color-dark":Object(c["ShadeColor"])(i,50),"--vue-select-input-ui-muted-color-light":"#747474","--vue-select-input-ui-muted-color-dark":"rgba(255, 255, 255, 0.3)","--vue-select-input-ui-primary-color-transparency":Object(c["isColorName"])(t)?Object(c["HexToRgba"])(Object(c["colorNameToHex"])(t),.7):Object(c["HexToRgba"])(t,.7),"--vue-select-input-ui-error-color-transparency":Object(c["isColorName"])(n)?Object(c["HexToRgba"])(Object(c["colorNameToHex"])(n),.7):Object(c["HexToRgba"])(n,.7),"--vue-select-input-ui-valid-color-transparency":Object(c["isColorName"])(o)?Object(c["HexToRgba"])(Object(c["colorNameToHex"])(o),.7):Object(c["HexToRgba"])(o,.7),"--vue-select-input-ui-border-radius":"".concat(u,"px")}},p={name:"VueSelectInputUi",directives:{clickOutside:a["directive"]},props:{itemHeight:{type:Number,default:30},listHeight:{type:Number,default:210},borderRadius:{type:Number,default:4},value:{type:[String,Object],default:null},label:{type:String,default:"Select option"},hint:{type:String,default:null},size:{type:String,default:null},error:{type:Boolean,default:Boolean},disabled:{type:Boolean,default:!1},required:{type:Boolean,default:!1},valid:{type:Boolean,default:!1},validColor:{type:String,default:"yellowgreen"},color:{type:String,default:"dodgerblue"},dark:{type:Boolean,default:!1},darkColor:{type:String,default:"#424242"},id:{type:String,default:"VueSelectInputUi"},name:{type:String,default:"VueSelectInputUi"},options:{type:Array,default:Array,required:!0}},data:function(){return{isFocus:!1,selectedIndex:null,query:"",tmpValue:this.value}},computed:{uniqueId:function(){return"".concat(this.id,"-").concat(this._uid)},cssTheme:function(){var e=this.dark,t=this.color,l=this.darkColor,i=this.validColor,o=this.borderRadius;return d({dark:e,color:t,darkColor:l,validColor:i,borderRadius:o,lightColor:"#FFFFFF",errorColor:"orangered"})},optionHeight:function(){return{height:"".concat(this.itemHeight,"px")}},itemListHeight:function(){return{maxHeight:"".concat(this.listHeight,"px")}},tmpValueIndex:function(){var e=this;return this.options.findIndex((function(t){return t.value===e.tmpValue}))},selectedValueIndex:function(){var e=this;return this.value?this.options.findIndex((function(t){return t.value===e.value})):null},valueShown:function(){var e=this,t=this.options.filter((function(t){return t.value===e.value}))[0];return t?t.label:null},labelShown:function(){var e=this.label;return this.required&&e&&(e+=" *"),e},hintValue:function(){var e=this.hint;return this.required&&e&&(e+=" *"),e}},watch:{value:function(e){this.tmpValue=e}},mounted:function(){this.setCssVars()},methods:{setCssVars:function(){Object(r["a"])({variables:this.cssTheme})},focusInput:function(){this.$refs.SelectInputUiInput.focus()},openList:function(){this.disabled||(this.$emit("focus"),this.isFocus=!0,this.value&&this.scrollToSelectedOnFocus(this.selectedValueIndex))},closeList:function(){this.$refs.SelectInputUiInput.blur(),this.$emit("blur"),this.isFocus=!1},updateValue:function(e){this.tmpValue=e,this.$emit("input",e||null),this.closeList()},scrollToSelectedOnFocus:function(e){var t=this;this.$nextTick((function(){t.$refs.optionsList.scrollTop=e*t.itemHeight-3*t.itemHeight}))},keyboardNav:function(e){var t=this,l=e.keyCode;if(40===l||38===l){e.view&&e.view.event&&e.view.event.preventDefault();var i=40===l?this.tmpValueIndex+1:this.tmpValueIndex-1;(-1===i||i>=this.options.length)&&(i=-1===i?this.options.length-1:0),this.tmpValue=this.options[i].value,this.scrollToSelectedOnFocus(i)}else if(13===l)this.updateValue(this.tmpValue);else if(27===l)this.closeList();else{clearTimeout(this.queryTimer),this.queryTimer=setTimeout((function(){t.query=""}),1e3);var o=String.fromCharCode(l);if(8===l&&""!==this.query)this.query=this.query.substring(0,this.query.length-1);else if(/[a-zA-Z-e ]/.test(o)){this.query+=e.key;var u=this.options.findIndex((function(e){return t.tmpValue=e.value,e.label.toLowerCase().startsWith(t.query)}));-1!==u&&this.scrollToSelectedOnFocus(u)}}}}},h=p,f=(l("f1ac"),l("2877")),b=Object(f["a"])(h,n,s,!1,null,"0e29a3dc",null),v=b.exports,m={name:"App",components:{VueSelectInputUi:v},data:function(){return{selectedValue:null,optionsList:[{label:"None"},{label:"First option",value:"first"},{label:"Second option",value:"second"},{label:"Third option",value:"third"},{label:"Example 1",value:"ex_1"},{label:"Example 2",value:"ex_2"},{label:"Example 3",value:"ex_3"},{label:"Example 4",value:"ex_4"},{label:"Example 5",value:"ex_5"},{label:"Example 6",value:"ex_6"}]}}},g=m,V=(l("5d5b"),Object(f["a"])(g,o,u,!1,null,"953cce6e",null)),y=V.exports;i["a"].config.productionTip=!1,new i["a"]({render:function(e){return e(y)}}).$mount("#app")},"5d5b":function(e,t,l){"use strict";var i=l("e472"),o=l.n(i);o.a},a91e:function(e,t,l){},e472:function(e,t,l){},f1ac:function(e,t,l){"use strict";var i=l("a91e"),o=l.n(i);o.a}});
//# sourceMappingURL=app.4b470288.js.map