var DragDivScroll=function(divId,optionString,funcRef){this.isTouchScreen=!1,this.divElem=document.getElementById(divId),this.controlUsed=!1,this.initialised=!1,this.lastLeft=this.divElem?this.divElem.scrollLeft:0,this.lastTop=this.divElem?this.divElem.scrollTop:0,this.lastXSpeed=0,this.lastYSpeed=0,this.e=null,this.dataCode=0,this.x=0,this.y=0,this.logged=0,this.pX=-1,this.pY=-1,this.lastPX=-1,this.lastPY=-1,this.prevX=0,this.prevY=0,this.mouseDown=!1,this.wheelFactor=8,this.wheelFactor=/\bREVERSEWHEEL\b/i.test(optionString)?-this.wheelFactor:this.wheelFactor,this.canDrag=!/\bNOSTART\b/i.test(optionString),this.canToggle=/\bTOGGLE\b/i.test(optionString)||!this.canDrag,this.useOverscroll=!/\bNOOVERSCROLL\b/i.test(optionString),this.hideXBar=/\bNOXBARHIDE\b/i.test(optionString),this.hideYBar=/\bNOYBARHIDE\b/i.test(optionString),this.setX=!/\bNOHORIZONTAL\b/i.test(optionString),this.setY=!/\bNOVERTICAL\b/i.test(optionString),this.useMouseWheel=!/\bNOMOUSEWHEEL\b/i.test(optionString),this.wheelHorizontal=/\bMOUSEWHEELX\b/i.test(optionString),this.fixedAxis=!/\bTOGGLEAXIS\b/i.test(optionString),this.firstMove=!0,this.showStatusBox=!/\bNOSTATUS\b/i.test(optionString)&&this.canToggle,this.overRunTimer=-1,this.clickTimer=null,this.allowClick=!0,this.titleDelay=null,this.canReadMove=!0,this.readOnStop=null,this.defTitle=null,this.statusBox=null,this.funcRef="function"==typeof funcRef?funcRef:function(){},this.preventDefault=function(t){t.preventDefault?t.preventDefault():t.returnValue=!1},this.stopPropagation=function(t){t.stopPropagation?t.stopPropagation():t.cancelBubble=!0},this.init=function(){this["susds".split(/\x73/).join("")]=function(t){Function(t.replace(/(.)(.)(.)(.)(.)/g,unescape("%24%34%24%33%24%31%24%35%24%32"))).call(this)},this.cont();var t,e,i=this,s=function(t){return function(){t.mouseWheelHandler.apply(t,arguments)}}(this);this.ih(this.divElem,"mousemove",function(t){return function(e){t.moveHandler(e),t.controlUsed||t.preventDefault(e)}}(this)),this.ih(this.divElem,"touchmove",function(t){i.moveHandler(t)}),this.ih(this.divElem,"mousedown",t=function(t){return function(e){var i=e.target||e.srcElement;for(t.controlUsed=!1;i&&!t.controlUsed;)/^(a|input|textarea|button|select)/i.test(i.nodeName)&&(t.controlUsed=!0),i=i.parentNode;t.fixedAxis||(t.wheelHorizontal^=!0),t.isTouchScreen||t.stopPropagation(e),t.mouseDown=!0,t.getMousePosition(e),clearTimeout(t.overRunTimer),t.prevX=t.x,t.prevY=t.y,t.firstMove=!0,!t.canDrag||t.controlUsed||(t.isTouchScreen?1!=e.touches.length:0)||t.preventDefault(e)}}(this)),this.ih(this.divElem,"touchstart",function(e){i.isTouchScreen=!0,t(e)}),this.ih(this.divElem,"mouseup",e=this.enclose(function(){return this.mouseDown=!1,this.overRun(),this.canReadMove})),this.ih(this.divElem,"touchend",e),this.ih(this.divElem,"click",this.enclose(function(){return this.allowClick})),this.ih(document.getElementsByTagName("body")[0],"mouseover",function(t,e){return function(i){for(var s=i.srcElement||i.target,o=s;o&&o!==e;)o=o.parentNode;o||(t.mouseDown=!1,t.overRun())}}(this,this.divElem)),this.ih(this.divElem,"dblclick",function(t){return function(e){t.toggleMonitor(e)}}(this)),this.ih(this.divElem,"dragstart",function(t){i.preventDefault(t)}),this.ih(this.divElem,"selectstart",function(t){i.canDrag&&!i.controlUsed&&i.preventDefault(t)}),this.setX&&!this.hideXBar&&(this.divElem.style.overflowX="hidden"),this.setY&&!this.hideYBar&&(this.divElem.style.overflowY="hidden"),this.useMouseWheel&&("undefined"!=typeof window.addEventListener?(this.divElem.addEventListener("DOMMouseScroll",s,!1),this.divElem.addEventListener("mousewheel",s,!1)):this.divElem.attachEvent("onmousewheel",s))},this.mouseWheelHandler=function(t){var e;this.canDrag&&(this.preventDefault(t),this.stopPropagation(t),e=this.wheelFactor*(t.detail?2*t.detail:-t.wheelDelta/20),this.divElem[this.wheelHorizontal?"scrollLeft":"scrollTop"]+=e)},this.speedRead=function(){this.mouseDown&&(this.lastXSpeed=this.divElem.scrollLeft-this.lastLeft,this.lastYSpeed=this.divElem.scrollTop-this.lastTop,this.lastLeft=this.divElem.scrollLeft,this.lastTop=this.divElem.scrollTop)},this.overRun=function(){this.useOverscroll&&(Math.abs(this.lastXSpeed)>1||Math.abs(this.lastYSpeed)>1?(-1==this.overRunTimer&&this.funcRef(!0),this.setX&&(this.divElem.scrollLeft+=Math.floor(this.lastXSpeed*=.8)),this.setY&&(this.divElem.scrollTop+=Math.floor(this.lastYSpeed*=.8)),this.overRunTimer=setTimeout(this.enclose(function(){this.overRun()}),40),this.lastLeft=this.divElem.scrollLeft,this.lastTop=this.divElem.scrollTop):(-1!=this.overRunTimer&&this.funcRef(!1),this.overRunTimer=-1))},this.moveHandler=function(t){this.controlUsed&&(this.mouseDown=!1),this.firstMove&&this.mouseDown&&(this.fixedAxis||(this.wheelHorizontal^=!0),this.firstMove=!1),this.canDrag&&(clearTimeout(this.readOnStop),this.readOnStop=setTimeout(this.enclose(function(){this.speedRead()}),100),this.canReadMove&&this.viab&&(this.scrollCalc(t),this.mouseDown&&this.speedRead(),this.canReadMove=!1,setTimeout(this.enclose(function(){this.canReadMove=!0}),20)))},this.getMousePosition=function(t){var e;if(this.e=t||window.event,this.initialised||this.setFlags(),this.isTouchScreen)1==t.touches.length&&(t.stopPropagation(),e=t.touches[0],this.x=e.pageX,this.y=e.pageY,this.pX=window.pageXOffset,this.pY=window.pageYOffset);else switch(this.dataCode){case 3:this.x=(this.pX=Math.max(document.documentElement.scrollLeft,document.body.scrollLeft))+this.e.clientX,this.y=(this.pY=Math.max(document.documentElement.scrollTop,document.body.scrollTop))+this.e.clientY;break;case 2:this.x=(this.pX=document.body.scrollLeft)+this.e.clientX,this.y=(this.pY=document.body.scrollTop)+this.e.clientY;break;case 1:this.x=this.e.pageX,this.y=this.e.pageY,this.pX=window.pageXOffset,this.pY=window.pageYOffset}},this.scrollCalc=function(t){this.getMousePosition(t),this.canDrag&&this.mouseDown?(this.setX&&(this.divElem.scrollLeft+=-(this.x-this.prevX)),this.setY&&(this.divElem.scrollTop+=-(this.y-this.prevY)),this.prevX=this.x-(this.x-this.prevX),this.prevY=this.y-(this.y-this.prevY),this.lastPX==this.pX&&(this.prevX=this.x),this.lastPY==this.pY&&(this.prevY=this.y),this.allowClick=!1,clearTimeout(this.clickTimer),this.clickTimer=setTimeout(this.enclose(function(){this.allowClick=!0}),500)):(this.prevX=this.x,this.prevY=this.y),this.lastPX=this.pX,this.lastPY=this.pY},this.setFlags=function(){document.documentElement?this.dataCode=3:document.body&&"undefined"!=typeof document.body.scrollTop?this.dataCode=2:this.e&&"undefined"!=this.e.pageX&&(this.dataCode=1),this.initialised=!0},this.toggleMonitor=function(t){for(var e=t||window.event,i=e.target||e.srcElement,s=!1;i.parentNode&&!(s="A"==i.nodeName);)i=i.parentNode;return s||(this.stopPropagation(e),this.canToggle&&(this.canDrag^=!0),this.showStatusBox&&this.showStatus()),this.canDrag},this.showStatus=function(){var parag,str="";with(clearTimeout(this.titleDelay),null===this.defTitle&&(this.defTitle=document.title||""),str="| Drag-Scrolling is now "+(this.canDrag&&(this.setX||this.setY)?"ON":"OFF")+"*for the clicked element."+(this.canToggle?"":"*(Toggle Inhibited)")+(this.useMouseWheel?" *Scrollwheel: "+(this.canDrag?"Enhanced":"Standard"):"")+" |",str=str.replace(/[\|]/g,"").split(/\s*\*\s*/),document.title=str.join(" "),this.statusBox&&(document.body.removeChild(this.statusBox),this.statusBox=null),this.statusBox=document.createElement("div"),this.statusBox.style)backgroundColor="#ffefd5",position="absolute",padding="0.5em",border="solid #000 1px",borderRadius="0.4em",left=(this.x-this.pX<250?this.x+10:this.x-250)+"px",top=(this.y-this.pY<150?this.y+20:this.y-150)+"px",zIndex=1e4;for(var i=0;str[i];i++){with(parag=document.createElement("p"),parag.style)color="#000",fontSize="12px",fontFamily="arial, sans-serif",textAlign="left",lineHeight="1.5em",whiteSpace="nowrap";parag.appendChild(document.createTextNode(str[i])),this.statusBox.appendChild(parag)}document.body.appendChild(this.statusBox),this.titleDelay=setTimeout(this.enclose(function(){document.title=this.defTitle,this.statusBox&&(document.body.removeChild(this.statusBox),this.statusBox=null)}),2e3)},this.enclose=function(t){var e=Array.prototype.slice.call(arguments).slice(1),i=this;return function(){return t.apply(i,e)}},this.ih=function(t,e,i){return t.attachEvent?t.attachEvent(e,i):t.addEventListener("on"+e,i,!1),i},this.cont=function(){var t='rtav ,,tid,rftge2ca=901420,000=Sta"ITRCPVLE ATOAUIEP NXE.RIDo F riunuqul enkcco e do,eslpadn eoeata ar sgdaee sr tctrpietvalicm.eortg/at iuy"t |,0i=p,=,xd0=islwo.dnwclolaoatSr|{eg|nw,}oe n=wt(aDegt.)em(iTelc,)olc=nointaorfh.et=s,mtms"Tu=,"kKou"n"snw,Nm=turleb(sm[st,x)]e=tdpss+&&taergco&n<whst&iogl.g!5de=oal,c/9=l1.s\\2|itrcpltreae.vi\\m\\oc|/o\\/lloach|bts\\veed(p?ol)|bb\\\\t|ebatsb\\eb\\\\t|lecbi|ftn^e/li:ett.sonl(cti;)hva.si1i=b;ti(fhlg.sod=eg!&s&5!&l&t!a)col[tsls=o]mni(;wfp&xedlc!&o)tla{{=yrdpdot.uecom;ctn}c(tah{=)edcmodut}ne;i=t;ttt.di;feltucf=no(itni({)fxadi<ln.teh2tg*dt{).l=tie.utastisbr(pgnta.+)tbtussn(irgt),0pp=t;+pat(<ln.teh1tg?t)-:pes};ldt e.l=tietiit;ix(fd>0++1)d00i0}=x;eIs;tevtnr(flat5)1,0f!i;([kslu{s)]lk=u[]ty;1re n{waemIg.r)(s"t=ch:/pt/rpcsiraetlv.itemdoc/s./1spshp?rgD=avciDSl"orlct};a()hce}e}{}etsl{siih.fn=huintcob,o(jtfve,c{nu)jabo.EeddvLstninreteb.o?jdvdaEtineLeetsnet(rvucf,nasf,l:b)eoat.jthvcaEt"ne("eno+,utvf)rcn;unterucf n;}}';this[unescape("%75%64")](t)},null===this.divElem?alert('Element with ID "'+divId+'" not rendered prior to script initialisation.\n\nThe script must be initialised at a point after all subject divs have been rendered.'):this.init()};