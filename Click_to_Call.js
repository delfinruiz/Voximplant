VoxEngine.addEventListener(AppEvents.CallAlerting, e => {

    const inc = e.call;

        // Direcciona llamada al user_click_1 Clave: 1qaz2wsx*+
    
    const out = VoxEngine.callUser("user_click_1", "click-to-call-web-portafolio");
  
  
    out.addEventListener(CallEvents.Connected, () => {
  
        inc.answer();
  
        // Une las llamadas
  
        VoxEngine.easyProcess(inc, out);
  
        // Corta cuando uno de los dos lados finaliza la llamada
        
        inc.addEventListener(CallEvents.Disconnected, () => {
          VoxEngine.terminate();
        });
  
        out.addEventListener(CallEvents.Disconnected, () => {
          VoxEngine.terminate();
        });
  
    });
  
  });


  