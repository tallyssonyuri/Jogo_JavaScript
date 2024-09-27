var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var y_obj = 200;
var y_obj2 = 400;
var x_obj = 70;
var x_obj2 = 900;
var tecla = {};
var controle = 0;
var controle2 = 0;
var stop = 0;

var player = {
    x: 25,
    y: 30,
    larg: 30,
    alt: 30,
    cor: "blue"
}
function mover_player() {
    //condicoes de parada
    var msm_y = 0
    var msm_y2 = 0
    var msm_x = 0
    var pxlarg = player.x + player.larg
    var pyalt = player.y + player.alt

    // comparando o player com os objs
    if ((player.x > (x_obj - 30) && player.x < (x_obj + 30)) || (player.x > (x_obj2 - 30) && player.x < (x_obj2 + 30))) {
        msm_x = 1
    }
    if ((player.y > (y_obj - 30) && player.y < (y_obj + 30)) || (player.y > (y_obj2 - 30) && player.y < (y_obj2 + 30))) {
        msm_y = 1
    }
    if ((player.y >= 0 && player.y < 30) || (player.y > 255 && player.y < 315) || (player.y >= 540)) {
        msm_y2 = 1
    }

    //parando o player
    if (((pxlarg >= 185 && player.x < 215) || (pxlarg >= 385 && player.x < 415) || (pxlarg >= 585 && player.x < 615) || (pxlarg >= 785 && player.x < 815)) && msm_y == 1) {
        stop = 1;
    }
    if (((pyalt >= 85 && player.y < 115) || (pyalt >= 285 && player.y < 315) || (pyalt>= 485 && player.y < 515)) && msm_x == 1) {
        stop = 1;
    }
    if ((pxlarg >= 485 && player.x < 515) && msm_y2 == 1) {
        stop = 1;
    }


    //aumentando o x e y
    if (stop == 2) {
    if (stop != 1 && player.x > 0 && ( tecla.KeyA || tecla.ArrowLeft )){
       player.x -= 5;
    } if (stop != 1 && player.y > 0 && ( tecla.KeyW || tecla.ArrowUp )){
        player.y -= 5;
    } if (stop != 1 && player.x < 970 && ( tecla.KeyD || tecla.ArrowRight )){
        player.x += 5;
    } if (stop != 1 && player.y < 570 && ( tecla.KeyS || tecla.ArrowDown )){
        player.y += 5;
    }
    }

    //reiniciando a localização do player
    if (stop == 1) {
        player.x = 25;
        player.y = 30;
        stop = 2;
    }

    if (stop == 4) {
        ctx.fillStyle = "green"
        ctx.font = '25px Arial';
        ctx.fillText('Jogo pausado. Aperte Space para continuar!', 250, 240);
    }

    if (stop == 0) {
        player.x = 25;
        player.y = 30;
        y_obj = 200;
        y_obj2 = 400;
        x_obj = 70;
        x_obj2 = 900;
        controle = 0;
        controle2 = 0;
        ctx.fillStyle = "green"
        ctx.font = '25px Arial';
        ctx.fillText('Olá!!! Aperte Space para iniciar!', 315, 140);
    }
}

function desenhar_player() {

    mover_player();

    ctx.fillStyle = player.cor;
    ctx.fillRect(player.x,player.y,player.larg,player.alt);

}

function desenhar_safe() {
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(825,525,175,75);

    if(player.x > 825 && player.y > 525){
        win()
    }
}

function win(){
    if (stop == 2){
        stop = 3;
    }
    ctx.fillStyle = "green"
    ctx.font = '25px Arial';
    ctx.fillText('Parabéns!!! Aperte r para reiniciar!', 315, 287);
}
function mover_objs() {

    largura = 30;
    altura = 30;
    cor = "red";

    ctx.fillStyle = cor;
    ctx.fillRect(185,y_obj,largura,altura);
    ctx.fillRect(385,y_obj,largura,altura);
    ctx.fillRect(585,y_obj,largura,altura);
    ctx.fillRect(785,y_obj,largura,altura);

    ctx.fillRect(185,y_obj2,largura,altura);
    ctx.fillRect(385,y_obj2,largura,altura);
    ctx.fillRect(585,y_obj2,largura,altura);
    ctx.fillRect(785,y_obj2,largura,altura);

    ctx.fillRect(x_obj,85,largura,altura);
    ctx.fillRect(x_obj,285,largura,altura);
    ctx.fillRect(x_obj,485,largura,altura);

    ctx.fillRect(x_obj2,85,largura,altura);
    ctx.fillRect(x_obj2,285,largura,altura);
    ctx.fillRect(x_obj2,485,largura,altura);

    ctx.fillRect(485,0,largura,altura);
    ctx.fillRect(485,285,largura,altura);
    ctx.fillRect(485,570,largura,altura);

    if (stop == 2) {
        if (y_obj == 10) {
            controle = 1;
        } else if (y_obj2 == 330) {
            controle = 0;
        }
        if (controle == 0) {
            y_obj -= 5;
            y_obj2 += 5;
        } else if (controle == 1) {
            y_obj += 5;
            y_obj2 -= 5;
        }
        if (x_obj == 10) {
            controle2 = 1;
        } else if (x_obj2 == 530) {
            controle2 = 0;
        }
        if (controle2 == 0) {
            x_obj -= 5;
            x_obj2 += 5;
        } else if (controle2 == 1) {
            x_obj += 5;
            x_obj2 -= 5;
        }
    }

}

function animacoes(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    mover_objs();
    desenhar_safe();
    desenhar_player();
    requestAnimationFrame(animacoes)
}




document.addEventListener("keydown", (evento) => {
    tecla[evento.code] = true;
    if( evento.code == 'Space'){
        stop = 2;
    }

    if( evento.code == 'Escape'){
        stop = 4;
    }

    if (tecla.KeyR){
        stop = 0
    }
    console.log(tecla);
});
document.addEventListener("keyup", (evento) => {
   delete tecla[evento.code];
    console.log(tecla);
});

animacoes();
