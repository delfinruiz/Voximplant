//solicitante: numero de persona a la cual solicita que lo contacten

let call1, call2, data;
const callerId = '+56582353603'; //Numero que se mostrara al solicitante

VoxEngine.addEventListener(AppEvents.Started, handleScenarioStart);

function handleScenarioStart(e) {

    // data= numero que se inserta en formulario

    data = VoxEngine.customData();
    data = data.split(':');
    // start scenario - llamada al solicitante mostrando el numero por pantalla (callerid)

    call1 = VoxEngine.callPSTN(data[0], callerId);

    // si la llamada es exitosa llama a la funcion (handleCall1Connected)

    call1.addEventListener(CallEvents.Connected, handleCall1Connected);

    // si la llamada es fallida se termina la llamada

    call1.addEventListener(CallEvents.Failed, function (e) {
        VoxEngine.terminate();
    });
    call1.addEventListener(CallEvents.Disconnected, function (e) {
        VoxEngine.terminate();
    });
}

function handleCall1Connected(e) {

    // si la llamada es exitosa, corre mensaje

    call1.say('.......Hola esta llamada es del servicio de devolución de llamada de pipolbipiou, intentando contactar con un agente disponible, espere por favor', {
        "language": VoiceList.Amazon.es_MX_Mia
    });

    // cuando finaliza el mensaje

    call1.addEventListener(CallEvents.PlaybackFinished, function (e1) {

        // llama al usuario configurado en bitrix
        
        call2 = VoxEngine.callUser("user2", data)

        // Si la llamada conecta se dirije a la funcion (handleCall2Connected) si no conecta reproduce mensaje y finaliza conexion

        call2.addEventListener(CallEvents.Connected, handleCall2Connected);
        call2.addEventListener(CallEvents.Failed, function (e2) {
            call1.say('Desafortunadamente no se puede establecer la conexión.', {
                "language": VoiceList.Amazon.es_MX_Mia
            });
            call1.addEventListener(CallEvents.PlaybackFinished, function (e3) {
                VoxEngine.terminate();
            });
        });
        call2.addEventListener(CallEvents.Disconnected, function (e2) {
            VoxEngine.terminate();
        });
    });
}

function handleCall2Connected(e) {
    call1.answer();
    // Conecta las dos llamadas
    VoxEngine.sendMediaBetween(call1, call2);

    VoxEngine.easyProcess(call1, call2);
}