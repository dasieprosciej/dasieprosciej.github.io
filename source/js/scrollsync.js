// (function(){

function syncscroll(one, two) {

  // var master = "compare-1"; // this is id div
  // var slave = "compare-2"; // this is other id div
  var master = one;
  var slave = two;
  var master_tmp;
  var slave_tmp;
  var timer;
    
  var sync = function ()
  {
    if(this.getAttribute('id') == slave)  
    {
      master_tmp = master;
      slave_tmp = slave;
      master = slave;
      slave = master_tmp;
    }
    
    $("#" + slave).unbind("scroll");
    
    var percentage = this.scrollTop / (this.scrollHeight - this.offsetHeight);
    var x = percentage * ($("#" + slave)[0].scrollHeight - $("#" + slave)[0].offsetHeight);

    // $("#" + slave).scrollTop(x);
    document.getElementById(slave).scrollTop = x;

    if(typeof(timer) !== 'undefined')
      clearTimeout(timer);
      timer = setTimeout(function(){ $("#" + slave).on("scroll", sync) }, 200)
  }
  
  
  $('#' + master + ', #' + slave).on("scroll", sync);

// })();
}


