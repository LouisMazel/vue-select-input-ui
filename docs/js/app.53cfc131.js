(function(e){function t(t){for(var a,r,o=t[0],s=t[1],u=t[2],d=0,f=[];d<o.length;d++)r=o[d],Object.prototype.hasOwnProperty.call(i,r)&&i[r]&&f.push(i[r][0]),i[r]=0;for(a in s)Object.prototype.hasOwnProperty.call(s,a)&&(e[a]=s[a]);c&&c(t);while(f.length)f.shift()();return n.push.apply(n,u||[]),l()}function l(){for(var e,t=0;t<n.length;t++){for(var l=n[t],a=!0,o=1;o<l.length;o++){var s=l[o];0!==i[s]&&(a=!1)}a&&(n.splice(t--,1),e=r(r.s=l[0]))}return e}var a={},i={app:0},n=[];function r(t){if(a[t])return a[t].exports;var l=a[t]={i:t,l:!1,exports:{}};return e[t].call(l.exports,l,l.exports,r),l.l=!0,l.exports}r.m=e,r.c=a,r.d=function(e,t,l){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:l})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var l=Object.create(null);if(r.r(l),Object.defineProperty(l,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(l,a,function(t){return e[t]}.bind(null,a));return l},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],s=o.push.bind(o);o.push=t,o=o.slice();for(var u=0;u<o.length;u++)t(o[u]);var c=s;n.push([0,"chunk-vendors"]),l()})({0:function(e,t,l){e.exports=l("56d7")},"4cc4":function(e,t,l){"use strict";var a=l("e905"),i=l.n(a);i.a},"56d7":function(e,t,l){"use strict";l.r(t);l("e260"),l("e6cf"),l("cca6"),l("a79d");var a=l("2b0e"),i=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"sidebar-ui flex align-center justify-content-center flex-direction-column",attrs:{id:"app"}},[l("h1",{staticClass:"mb-3"},[e._v(" VueSelectInputUi ")]),l("div",{staticClass:"container"},[l("VueSelectInputUi",{staticClass:"mb-3",attrs:{id:"VueSelectInput2",name:"VueSelectInput2",options:e.optionsList,label:"Choose option",color:"dodgerblue"},model:{value:e.selectedValue,callback:function(t){e.selectedValue=t},expression:"selectedValue"}}),l("VueSelectInputUi",{staticClass:"mb-3",attrs:{id:"VueSelectInput1",name:"VueSelectInput1",options:e.optionsList,label:"Choose option",color:"yellowgreen",size:"sm",required:"",valid:"","item-height":20},model:{value:e.selectedValue,callback:function(t){e.selectedValue=t},expression:"selectedValue"}}),l("VueSelectInputUi",{staticClass:"mb-3",attrs:{id:"VueSelectInput3",name:"VueSelectInput3",options:e.optionsList,label:"Choose option",color:"purple",size:"lg",dark:"","item-height":40},model:{value:e.selectedValue,callback:function(t){e.selectedValue=t},expression:"selectedValue"}}),l("VueSelectInputUi",{staticClass:"mb-3",attrs:{id:"VueSelectInputBgDark",name:"VueSelectInputBgDark",options:e.optionsList,label:"With different bg dark color",color:"dodgerblue","dark-color":"#21222e",dark:""},model:{value:e.selectedValue,callback:function(t){e.selectedValue=t},expression:"selectedValue"}}),l("VueSelectInputUi",{staticClass:"mb-3",attrs:{id:"VueSelectInput4",name:"VueSelectInput5",options:e.optionsList,label:"Choose option",color:"dodgerblue",error:"",hint:"Error message shown","item-height":50},model:{value:e.selectedValue,callback:function(t){e.selectedValue=t},expression:"selectedValue"}}),l("VueSelectInputUi",{staticClass:"mb-3",attrs:{id:"VueSelectInput5",name:"VueSelectInput5",options:e.optionsList,label:"Disabled input dark",color:"orangered",disabled:"",dark:"","item-height":60},model:{value:e.selectedValue,callback:function(t){e.selectedValue=t},expression:"selectedValue"}}),l("VueSelectInputUi",{staticClass:"mb-3",attrs:{id:"VueSelectInputDisabledLight",name:"VueSelectInputDisabledLight",options:e.optionsList,label:"Disabled input light",disabled:"","item-height":70},model:{value:e.selectedValue,callback:function(t){e.selectedValue=t},expression:"selectedValue"}})],1),l("p",[e._v(" Value selected : "+e._s(e.selectedValue||"null")+" ")])])},n=[],r=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{directives:[{name:"click-outside",rawName:"v-click-outside",value:e.closeList,expression:"closeList"}],ref:"VueSelectInputUi",staticClass:"select-input-ui",class:[{"is-focused":e.isFocus,"has-value":e.value,"has-hint":e.hint,"has-error":e.error,"is-disabled":e.disabled,"is-dark":e.dark},e.size],style:[e.colorVars],on:{click:e.focusInput}},[l("input",e._b({ref:"SelectInputUiInput",staticClass:"select-input-ui__input",attrs:{id:e.id,name:e.name,placeholder:e.labelShown,disabled:e.disabled,required:e.required,readonly:""},domProps:{value:e.valueShown},on:{focus:e.openList,keydown:e.keyboardNav,click:function(t){return e.$emit("click")}}},"input",e.$attrs,!1)),l("div",{staticClass:"select-input-ui__toggle",on:{click:e.focusInput}},[e._t("arrow",[l("div",{staticClass:"select-input-ui__toggle__arrow"},[e._v(" ▼ ")])])],2),l("label",{ref:"label",staticClass:"select-input-ui__label",class:e.error?"text-danger":null,attrs:{for:e.id}},[e._v(" "+e._s(e.hintValue||e.labelShown)+" ")]),l("Transition",{attrs:{name:"slide"}},[l("div",{directives:[{name:"show",rawName:"v-show",value:e.isFocus,expression:"isFocus"}],ref:"optionsList",staticClass:"select-input-ui__options-list",style:[e.itemListHeight]},e._l(e.options,(function(t,a){var i=t.label,n=t.value;return l("div",{key:a,staticClass:"flex align-center select-input-ui__options-list__item",class:[{selected:e.value===n},{"keyboard-selected":e.tmpValue===n}],style:[e.optionHeight],on:{click:function(t){return t.stopPropagation(),e.updateValue(n)}}},[l("div",{staticClass:"dots-text",class:{"text-muted":!n}},[e._v(" "+e._s(i)+" ")])])})),0)])],1)},o=[],s=(l("4de4"),l("c740"),l("a9e3"),l("2ca0"),l("2103")),u=(l("99af"),l("caad"),l("a15b"),l("0d03"),l("d3b7"),l("e25e"),l("ac1f"),l("25f0"),l("2532"),l("1276"),function(e,t){var l=parseInt(e.substring(1,3),16),a=parseInt(e.substring(3,5),16),i=parseInt(e.substring(5,7),16);l=parseInt(l*(100+t)/100),a=parseInt(a*(100+t)/100),i=parseInt(i*(100+t)/100),l=l<255?l:255,a=a<255?a:255,i=i<255?i:255;var n=1===l.toString(16).length?"0"+l.toString(16):l.toString(16),r=1===a.toString(16).length?"0"+a.toString(16):a.toString(16),o=1===i.toString(16).length?"0"+i.toString(16):i.toString(16);return"#"+n+r+o}),c=function(e,t){var l;if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(e))return l=e.substring(1).split(""),3===l.length&&(l=[l[0],l[0],l[1],l[1],l[2],l[2]]),l="0x".concat(l.join("")),"rgba(".concat([l>>16&255,l>>8&255,255&l].join(", "),", ").concat(t,")");throw new Error("Bad Hex")},d=function(e){return!e.includes("#")},f=function(e){var t={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",green:"#008000",greenyellow:"#adff2f",honeydew:"#f0fff0",hotpink:"#ff69b4","indianred ":"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgrey:"#d3d3d3",lightgreen:"#90ee90",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370d8",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#d87093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};return"undefined"!==typeof t[e.toLowerCase()]&&t[e.toLowerCase()]},p=function(e){var t=e.dark,l=e.color,a=e.lightColor,i=e.darkColor,n=e.validColor,r=e.borderRadius;return{"--primary-color":l,"--primary-color-transparency":d(l)?c(f(l),.7):c(l,.7),"--second-color":t?"rgba(255, 255, 255, 0.7)":"#747474","--third-color":t?"rgba(255, 255, 255, 0.7)":"#CCC","--bg-color":t?i:a,"--hover-color":t?u(i,20):u(a,-8),"--valid-color":n,"--muted-color":t?"rgba(255, 255, 255, 0.3)":"#747474","--border-radius":"".concat(r,"px")}},b={name:"VueSelectInputUi",directives:{clickOutside:s["directive"]},props:{itemHeight:{type:Number,default:30},listHeight:{type:Number,default:210},borderRadius:{type:Number,default:4},value:{type:[String,Object],default:null},label:{type:String,default:"Select option"},hint:{type:String,default:null},size:{type:String,default:null},error:{type:Boolean,default:Boolean},disabled:{type:Boolean,default:!1},required:{type:Boolean,default:!1},valid:{type:Boolean,default:!1},validColor:{type:String,default:"yellowgreen"},color:{type:String,default:"dodgerblue"},dark:{type:Boolean,default:!1},darkColor:{type:String,default:"#424242"},id:{type:String,default:"VueSelectInputUi"},name:{type:String,default:"VueSelectInputUi"},options:{type:Array,default:Array,required:!0}},data:function(){return{isFocus:!1,selectedIndex:null,query:"",tmpValue:this.value}},computed:{colorVars:function(){var e=this.dark,t=this.color,l=this.darkColor,a=this.validColor,i=this.borderRadius;return p({dark:e,color:t,darkColor:l,validColor:a,borderRadius:i,lightColor:"#FFFFFF"})},optionHeight:function(){return{height:"".concat(this.itemHeight,"px")}},itemListHeight:function(){return{maxHeight:"".concat(this.listHeight,"px")}},tmpValueIndex:function(){var e=this;return this.options.findIndex((function(t){return t.value===e.tmpValue}))},selectedValueIndex:function(){var e=this;return this.value?this.options.findIndex((function(t){return t.value===e.value})):null},valueShown:function(){var e=this,t=this.options.filter((function(t){return t.value===e.value}))[0];return t?t.label:null},labelShown:function(){var e=this.label;return this.required&&e&&(e+=" *"),e},hintValue:function(){var e=this.hint;return this.required&&e&&(e+=" *"),e}},watch:{value:function(e){this.tmpValue=e}},methods:{focusInput:function(){this.$refs.SelectInputUiInput.focus()},openList:function(){this.disabled||(this.$emit("focus"),this.isFocus=!0,this.value&&this.scrollToSelectedOnFocus(this.selectedValueIndex))},closeList:function(){this.$refs.SelectInputUiInput.blur(),this.$emit("blur"),this.isFocus=!1},updateValue:function(e){this.tmpValue=e,this.$emit("input",e||null),this.closeList()},scrollToSelectedOnFocus:function(e){var t=this;this.$nextTick((function(){t.$refs.optionsList.scrollTop=e*t.itemHeight-3*t.itemHeight}))},keyboardNav:function(e){var t=this,l=e.keyCode;if(40===l||38===l){e.view&&e.view.event&&e.view.event.preventDefault();var a=40===l?this.tmpValueIndex+1:this.tmpValueIndex-1;(-1===a||a>=this.options.length)&&(a=-1===a?this.options.length-1:0),this.tmpValue=this.options[a].value,this.scrollToSelectedOnFocus(a)}else if(13===l)this.updateValue(this.tmpValue);else if(27===l)this.closeList();else{clearTimeout(this.queryTimer),this.queryTimer=setTimeout((function(){t.query=""}),1e3);var i=String.fromCharCode(l);if(8===l&&""!==this.query)this.query=this.query.substring(0,this.query.length-1);else if(/[a-zA-Z-e ]/.test(i)){this.query+=e.key;var n=this.options.findIndex((function(e){return t.tmpValue=e.value,e.label.toLowerCase().startsWith(t.query)}));-1!==n&&this.scrollToSelectedOnFocus(n)}}}}},h=b,g=(l("4cc4"),l("2877")),m=Object(g["a"])(h,r,o,!1,null,"423f5ee8",null),v=m.exports,y={name:"App",components:{VueSelectInputUi:v},data:function(){return{selectedValue:null,optionsList:[{label:"None"},{label:"First option",value:"first"},{label:"Second option",value:"second"},{label:"Third option",value:"third"},{label:"Example 1",value:"ex_1"},{label:"Example 2",value:"ex_2"},{label:"Example 3",value:"ex_3"},{label:"Example 4",value:"ex_4"},{label:"Example 5",value:"ex_5"},{label:"Example 6",value:"ex_6"}]}}},k=y,V=(l("5c0b"),Object(g["a"])(k,i,n,!1,null,null,null)),S=V.exports;a["a"].config.productionTip=!1,new a["a"]({render:function(e){return e(S)}}).$mount("#app")},"5c0b":function(e,t,l){"use strict";var a=l("9c0c"),i=l.n(a);i.a},"9c0c":function(e,t,l){},e905:function(e,t,l){}});
//# sourceMappingURL=app.53cfc131.js.map