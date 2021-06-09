VoxEngine.addEventListener(AppEvents.CallAlerting, e => {

       const pcs_inbound = PhoneNumber.getInfo(e.destination).number;
       //const id_llamada = e.callerid;

        if (pcs_inbound == '+12029646876'){

          const inc = e.call;
          const out = VoxEngine.callUser("user_click_1", "click-to-call-web-portafolio");
        
          out.addEventListener(CallEvents.Connected, () => {
      
            inc.answer();
            
            VoxEngine.easyProcess(inc, out);
            inc.addEventListener(CallEvents.Disconnected, () => {
              VoxEngine.terminate();
            });
          
            out.addEventListener(CallEvents.Disconnected, () => {
            VoxEngine.terminate();
            });
      
          });

        }else{

          callerid = ('+56412909795');

          const number = PhoneNumber.getInfo(e.destination).number;
        
          const call = VoxEngine.callPSTN(number, callerid);

          VoxEngine.easyProcess(e.call, call);

        }

});