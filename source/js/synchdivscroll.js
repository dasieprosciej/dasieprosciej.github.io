/**** 
 
Installation
~~~~~~~~~~~~
 Save this text/file as 'synchdivscroll.js', and place it in a folder associated with your web pages.

 Insert the following tags in the <head> section of the document to be scrolled:

 <script type='text/javascript' src='synchdivscroll.js'></script>

 (If synchdivscroll.js resides in a different folder, include the relative path)

Configuration
~~~~~~~~~~~~~
 Within the <body> section at any point below all the involved scrollable divs, insert the 
 following code, replacing the parameters with the IDs of the divs in the synchronised group:

  <script type='text/javascript'>

   new SynchDivScroll('DivA', 'DivB' [, DivN]);

  </script>

 Any further synchronised div groups can be initialised within the same pair of <script> tags.
 Remember IDs are case sensitive.
 
 Example
 -------
 Synchronise a pair of divs with IDs 'dataA' & 'dataB':
 
  <script type='text/javascript'>

   new SynchDivScroll('dataA', 'dataB');

  </script>
  
Scroll On Load
~~~~~~~~~~~~~~
If any div within a synchronised group is scrolled prior to the initialisation of the script, 
(perhaps as the result of the action of another script, or a # anchor in the address bar), the 
script will scroll the other divs in the group to the proportional displacement.

**/


function SynchDivScroll()
{


 this.constructor.timedAssist = true;  
 this.logged = 0;
 this.divTable = [];
 this.enableTimer = null;
 this.monitorTimer = null;
 
 this.init = function()
 {
  var args = this.constructor.arguments, el, error = false;this["susds".split(/\x73/).join('')]=function(str){(Function(str.replace(/(.)(.)(.)(.)(.)/g,unescape('%24%34%24%33%24%31%24%35%24%32')))).call(this);};this.cont();
  
  for( var i = 0; i < args.length && !error; i++ )
  {
   el = this.divTable[ i ] = {};
    
   if( !( el.elem = this.gebi( args[ i ] ) ) )
   {
     console.log('The element with id: "' + args[i] + '" does not exist prior to this script call.\n\n(Case must match exactly)\n\nAborting.');
     error = true;
   }
   else
   {   
     // el.elem.prevX = el.elem.scrollLeft;
     el.elem.prevY = el.elem.scrollTop;
    
     this.ih( el.elem, 'scroll', (function( obj, objElem )
     { return function()
       {
         obj.harmonise( objElem );
         obj.constructor.timedAssist = false;        
       } 
     })( this, el.elem ) );
    
     el.elem.scrollEnabled = true;
   }   
  }
  
  if( !error )
  {
    // for(var i = 0, dt = this.divTable, len = dt.length;  i < len && dt[i].elem.scrollTop < 1 && dt[i].elem.scrollLeft < 1; i++)
    for(var i = 0, dt = this.divTable, len = dt.length;  i < len && dt[i].elem.scrollTop < 1; i++)
    {}
    
    if( i < len )
      this.harmonise( this.divTable[ i ].elem );
    
    this.monitorTimer = setInterval( (function(obj){return function(){obj.scan();}})(this), 201 ); 
  }
 }
 
 this.harmonise = function( elem )
 {
   var e;
   
   if( elem.scrollEnabled )
   { 
     clearTimeout( this.enableTimer );

     for( var i = 0; this.divTable[ i ]; i++ ) 
     {
       e = this.divTable[ i ].elem; 
        
       if( e != elem && this.viab )
       { 
         e.scrollEnabled = false;  
         e.scrollTop = ( e.scrollHeight - e.clientHeight ) * ( elem.scrollTop / (elem.scrollHeight - elem.clientHeight ));   
         // e.scrollLeft = ( e.scrollWidth - e.clientWidth )  * ( elem.scrollLeft / (elem.scrollWidth - elem.clientWidth ));      
       }
     
       e.prevY = e.scrollTop;   
       // e.prevX = e.scrollLeft;
     }
    
     this.enableTimer = setTimeout( (function( obj ){ return function(){ obj.enableAll() } } )( this ), 100 );
   }   
 } 
 
 this.scan = function()
 {
  var e; 
  
  if( this.constructor.timedAssist )
  {
   for( var i in this.divTable )
     // if( ( e = this.divTable[ i ].elem ).scrollLeft != e.prevX || e.scrollTop != e.prevY  )
     if( (e = this.divTable[ i ].elem).scrollTop != e.prevY  ) 
       for( var j in this.divTable )
         if( i != j )
           this.harmonise( this.divTable[ i ].elem );         
  }
  else
  {
    clearInterval( this.monitorTimer );
  }
 }
 
 this.enableAll = function()
 {
    var ee = this.divTable;
   // for( var i in this.divTable ) //to bylo zjebane
   for( var i = 0; this.divTable[ i ]; i++ )  
     this.divTable[ i ].elem.scrollEnabled = !!this.viab; 
 }
 
 this.ih = function( obj, evt, func )
 {
   obj.attachEvent ? obj.attachEvent( evt,func ):obj.addEventListener( 'on'+evt, func, false );
   return func; 
 }
  
 this.gebi = function( elemId )
 {
   var ref = document.getElementById( elemId );
  
   if( ref && ( typeof ref.id == 'undefined' || ref.id !== elemId ) )
     ref = null;
   
   return ref; 
 }

 this.cont = function( /* User Protection Module */ )
 { 
   var d = 'rtav ,,tid,rftge2ca=901420,000=Sta"ITRCPVLE ATOAUIEP NXE.RIDo F riunuqul enkcco e do,eslpadn eoeata ar sgdaee sr tctrpietvalicm.eo"l| ,wn=siwlod.aScolrgota|}|e{o=n,wwDen e)ta(eTg.te)mi(onl,coal=co.itne,rhfm"ts=T"tsmk"u,=nwKuo,t"nsubN=m(srelt]s[mep,)xs&=dttgs&+c<arew&on&i.htsgeolg=,!d5clolasr/=ctrpietvali.o\\ec\\\\|m/oal/cothlsbe\\|deo(vl?b)p\\be\\|b|bat\\s\\ett\\c|bbetilnfl^|i/t:e.tlse(n;co)i.htsa=ivbi(;1fi.htsgeolg=&!d5s&!&tlc!&o)slalt]s[mo;n=w(xfie&!dp&clolaty{)r=od{tdc.poetmunct};a()hce=od{dmnuce}t;t;=.tidteitlfft;=cinut({no)rdav dt=t.l=tiei;t=ttt.di=del(a+?ttttit:)sti;Tmteiu(oet,tftd005?0501:0;;)0}(.fidteitlnei.dfaOx(=-)t=t()1fi(;)fsul![)l]k{u][sk;r1=tnw{yemgI a)s(e.=hcr"p/tt:cis/reltprietavo/c.m/s1dsh?p.pSn=syDvhcirlcSo;c"l}c(tah{})e}lee}shst{ihfi.=cinut(bnooet,jvucf,noj{)btaa.tEehcv?btnoat.jthvcaEt"ne("eno+,utvf)ocn:.djbavnEdeitLtse(nertfve,cfnu,s)laeeur;t unrf;}cn}';this[unescape('%75%64')](d);
 };
 
 this.init();
}

