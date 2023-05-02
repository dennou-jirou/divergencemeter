    var rdm=0;
    var minus=false;
    var timer_refresh;
    var timer_refresh_f;
    var timer_change;
    var counter_changing=0;
    var end=[];
    var _on=[];
    var on=[1,0,0,4,8,5,9,6];
    var p0=[0,1,2,3,4,5,6,7,8,9];
    var p1=[0,1,2,3,4,5,6,7,8,9];
    var p2=[0,1,2,3,4,5,6,7,8,9];
    var p3=[0,1,2,3,4,5,6,7,8,9];
    var p4=[0,1,2,3,4,5,6,7,8,9];
    var p5=[0,1,2,3,4,5,6,7,8,9];
    var p6=[0,1,2,3,4,5,6,7,8,9];
    var p7=[0,1,2,3,4,5,6,7,8,9];
    var pa=[p0,p1,p2,p3,p4,p5,p6,p7];
    var flash=["flash1","flash2","flash3"];
    var delay=["0s","0.3s","0.6s","0.9s","1.2s",]
    var drc=["normal","reverse"];

    for(var i=0; i<8; i++){
      for(var j=0; j<10; j++){
        pa[i][j]=i+j*8;
      }
    }

    for(var i=0; i<8; i++){
      for(var j=0; j<10; j++){
        var p=document.getElementsByTagName("p")[pa[i][j]];
        p.style.left ="calc(50vw - 36vmin + "+i*9+"vmin)";
      }
    }

    function turn_on(){
      for(var i=0;i<8;i++){
        var p=document.getElementsByTagName("p")[pa[i][on[i]]];
        if(i!=1){
          p.setAttribute("class","on");
        }
        if(minus&&i==0){
          p.setAttribute("class","");
          minus=false;
        }
      }
    }

    function turn_off(){
      for(var i=0;i<8;i++){
        var p=document.getElementsByTagName("p");
        if(i!=1){
          p[pa[ i ][ on[i] ] ].setAttribute("class","");
        }
      }
    }

    function re_fresh(){
      clearTimeout(timer_refresh);
      timer_refresh=null;
      var _on=on.toString();
      turn_off();
      flash_update();
      divergence_update();
      if(on.toString() !== _on){
        divergence_change();
      }
      else{
        turn_on();
        if(!timer_refresh){timer_refresh=setTimeout(re_fresh,8596);}
      }
    }

    function re_fresh_flash(){
      clearTimeout(timer_refresh_f);
      timer_refresh_f=null;
      flash_update();
      if(!timer_refresh_f){timer_refresh_f=setTimeout(re_fresh_flash,596);}
    }

    function divergence_update(){
      rdm = Math.random();
      if(rdm<0.8){
        divergence_sg();
      }
      else if(rdm>=0.8&&rdm<0.98){
        rdm = Math.random();
        if(rdm<0.1){divergence_a();}
        else if(rdm>=0.1&&rdm<=0.72){divergence_b();}
        else if(rdm>0.72&&rdm<0.9){divergence_y();}
        else if(rdm>=0.9&&rdm<0.96){divergence_d();}
        else if(rdm>=0.96&&rdm<1){divergence_e();}
      }
      else{
        divergence_o();
      }
    }

    function flash_update(){
      var p=document.getElementsByClassName("on");
      for(var i=0; i<p.length;i++){
        rdm = Math.floor(Math.random()*3);
        p[i].style.animationName=flash[rdm];
        rdm = Math.floor(Math.random()*5);
        p[i].style.animationDelay=delay[rdm];
        rdm = Math.floor(Math.random()*2);
        p[i].style.animationDirection=drc[rdm];
      }
    }

    function divergence_change(){
      clearTimeout(timer_change);
      timer_change=null;
      if(counter_changing==0){
        counter_changing++;
        for(var i=0;i<8;i++){
          _on[i]=on[i];
        }
        for(var i=0;i<8;i++){
          rdm=Math.random();
          end[i]=35-Math.floor(rdm*25);
        }
        turn_off();
        if(!timer_change){timer_change=setTimeout(divergence_change,104);}
      }
      else if(counter_changing>0 && counter_changing<=35){
        counter_changing++;
        turn_off();
        for(var i=0;i<8;i++){
          on[i]=(on[i]<9)?on[i]+1:0;
          if(end[i]<=counter_changing){on[i]=_on[i];}
        }
        turn_on();
        flash_update();
        if(!timer_change){timer_change=setTimeout(divergence_change,48);}
      }
      else{
        counter_changing=0;
        for(var i=0;i<8;i++){
          on[i]=_on[i];
        }
        turn_on();
        if(!timer_refresh){timer_refresh=setTimeout(re_fresh,1048);}
      }
    }

    function divergence_sg(){
      on=[1,0,0,4,8,5,9,6];
    }

    function divergence_a(){
      on[0]=0;
      for(var i=2;i<8;i++){
        rdm = Math.random();
        on[i]=Math.floor(rdm*10);
      }
    }

    function divergence_b(){
      on[0]=1;
      for(var i=2;i<8;i++){
        rdm = Math.random();
        on[i]=Math.floor(rdm*10);
      }
    }

    function divergence_y(){
      on[0]=2;
      for(var i=2;i<8;i++){
        rdm = Math.random();
        on[i]=Math.floor(rdm*10);
      }
    }

    function divergence_d(){
      on[0]=3;
      for(var i=2;i<8;i++){
        rdm = Math.random();
        on[i]=Math.floor(rdm*10);
      }
    }

    function divergence_e(){
      on[0]=4;
      for(var i=2;i<8;i++){
        rdm = Math.random();
        on[i]=Math.floor(rdm*10);
      }
    }

    function divergence_o(){
      on[0]=0;
      minus=true;
      for(var i=2;i<8;i++){
        rdm = Math.random();
        on[i]=Math.floor(rdm*10);
      }
    }
    turn_on();
    divergence_change();
    re_fresh_flash();