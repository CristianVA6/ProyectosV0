let canvas = document.getElementById("cnv");
let ctx = canvas.getContext("2d");

let w = canvas.clientWidth, h = canvas.clientHeight;
let cameraOffset = { x: w / 2, y: h / 2 };
let cameraZoom = 1;
let MAX_ZOOM = 5;
let MIN_ZOOM = 1;
let SCROLL_SENSITIVITY = 0.0005;
let input = '', Min = 0, Max = 0, Escala = 40, Potencia = '', Constate = '', sincos = '';
let valorY = 0;
var dibujar = false, C = false;



function draw() {

    var g = 0, f = Escala / 2;

    canvas.width = w;
    canvas.height = h;

    // Translate to the canvas centre before zooming - so you'll always zoom on what you're looking directly at
    ctx.translate(w / 2, h / 2);
    ctx.scale(cameraZoom, cameraZoom);
    ctx.translate(
        -w + cameraOffset.x,
        -h + cameraOffset.y
    );
    ctx.clearRect(0, 0, w, h);

    if (C) {
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        for (var i = -Escala; i < Escala; i++) {
            ctx.moveTo((w / 2) + i * (w / Escala), 0);
            ctx.lineTo((w / 2) + i * (w / Escala), h);
            ctx.moveTo((w / 2) + i * (w / Escala) + (w / Escala * 2), 0);
            ctx.lineTo((w / 2) + i * (w / Escala) + (w / Escala * 2), h);
            ctx.moveTo(0, (h / 2) + i * (h / Escala));
            ctx.lineTo(w, (h / 2) + i * (h / Escala));
            ctx.moveTo(0, (h / 2) + i * (h / Escala) + (h / Escala * 2));
            ctx.lineTo(w, (h / 2) + i * (h / Escala) + (h / Escala * 2));
        }
        ctx.closePath();
        ctx.stroke();
    } else {
        ctx.beginPath();
        ctx.strokeStyle = "#2b2f33";
        ctx.lineWidth = 1;
        for (var i = -Escala; i < Escala; i++) {
            ctx.moveTo((w / 2) + i * (w / Escala), 0);
            ctx.lineTo((w / 2) + i * (w / Escala), h);
            ctx.moveTo((w / 2) + i * (w / Escala) + (w / Escala * 2), 0);
            ctx.lineTo((w / 2) + i * (w / Escala) + (w / Escala * 2), h);
            ctx.moveTo(0, (h / 2) + i * (h / Escala));
            ctx.lineTo(w, (h / 2) + i * (h / Escala));
            ctx.moveTo(0, (h / 2) + i * (h / Escala) + (h / Escala * 2));
            ctx.lineTo(w, (h / 2) + i * (h / Escala) + (h / Escala * 2));
        }
        ctx.closePath();
        ctx.stroke();

    }

    ctx.beginPath();

    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;

    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2, h);


    ctx.font = '15px arial';

    for (var i = 0; i <= h; i += (h / Escala)) {
        ctx.moveTo((w / 2) - 5, i);
        ctx.lineTo((w / 2) + 5, i);
        if (f > 0) {
            ctx.strokeText((f).toString(), (w / 2) + 10, i + 5);
            f--;
        } else {
            ctx.strokeText((g).toString(), (w / 2) + 10, i + 5);
            g--;
        }
    }

    g = 0, f = Escala / -2

    ctx.moveTo(0, h / 2);
    ctx.lineTo(w, h / 2);

    for (var i = 0; i <= w; i += (w / Escala)) {
        ctx.moveTo(i, (h / 2) - 5);
        ctx.lineTo(i, (h / 2) + 5);
        if (f <= 0) {
            ctx.strokeText((f).toString(), i - 12, (h / 2) + 25);
            f++;
        } else {
            g++
            ctx.strokeText((g).toString(), i - 5, (h / 2) + 25);
        }

    }
    ctx.closePath();
    ctx.stroke();


    if (dibujar) {
        ctx.beginPath();
        ctx.strokeStyle = "#005c69";
        ctx.lineWidth = 5;
        ctx.lineCap = "round";
        var y = 0;
        console.log(sincos)
        if (parseInt(Potencia) == 1) {
            for (var i = Min; i < Max; i++) {

                y = (h / 2) - (parseInt(Constate) * parseInt(i) + parseInt(input)) * (h / Escala);
                ctx.moveTo((w / 2) + i * (w / Escala), y);
                i++;
                y = (h / 2) - (parseInt(Constate) * parseInt(i) + parseInt(input)) * (h / Escala);
                ctx.lineTo((w / 2) + i * (w / Escala), y);
                i--;
            }
        } else {
            if (parseInt(Potencia) == 2) {
                for (var i = Min; i < Max; i++) {

                    y = (h / 2) - (parseInt(Constate) * (i * i) + parseInt(input)) * (h / Escala);
                    ctx.moveTo((w / 2) + i * (w / Escala), y);
                    i++;
                    y = (h / 2) - (parseInt(Constate) * (i * i) + parseInt(input)) * (h / Escala);
                    ctx.lineTo((w / 2) + i * (w / Escala), y);
                    i--;
                }
            } else {
                if (parseInt(sincos) == 1) {

                    for (var i = Min; i < Max; i++) {

                        y = (h / 2) - ((parseInt(Constate) * Math.sin(i)) + parseInt(input)) * (h / Escala);
                        ctx.moveTo((w / 2) + i * (w / Escala), y);
                        i++;
                        y = (h / 2) - ((parseInt(Constate) * Math.sin(i)) + parseInt(input)) * (h / Escala);
                        ctx.lineTo((w / 2) + i * (w / Escala), y);
                        i--;

                    }
                } else {
                    if (parseInt(sincos) == 2) {

                        for (var i = Min; i < Max; i++) {

                            y = (h / 2) - ((parseInt(Constate) * Math.cos(i)) + parseInt(input)) * (h / Escala);
                            ctx.moveTo((w / 2) + i * (w / Escala), y);
                            i++;
                            y = (h / 2) - ((parseInt(Constate) * Math.cos(i)) + parseInt(input)) * (h / Escala);
                            ctx.lineTo((w / 2) + i * (w / Escala), y);
                            i--;

                        }
                    }
                }
            }
        }

        ctx.closePath();
        ctx.stroke();
    }




    requestAnimationFrame(draw);
}

// Gets the relevant location from a mouse or single touch event
function getEventLocation(e) {
    if (e.touches && e.touches.length == 1) {
        return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    } else if (e.clientX && e.clientY) {
        return { x: e.clientX, y: e.clientY };
    }
}

function drawRect(x, y, width, height) {
    ctx.fillRect(x, y, width, height);
}

function drawText(text, x, y, size, font) {
    ctx.font = `${size}px ${font}`;
    ctx.fillText(text, x, y);
}

let isDragging = false;
let dragStart = { x: 0, y: 0 };

function onPointerDown(e) {
    if (cameraZoom != 1) {
        isDragging = true;
    }

    dragStart.x = getEventLocation(e).x / cameraZoom - cameraOffset.x;
    dragStart.y = getEventLocation(e).y / cameraZoom - cameraOffset.y;
}

function onPointerUp(e) {
    isDragging = false;
    initialPinchDistance = null;
    lastZoom = cameraZoom;
}

function onPointerMove(e) {
    if (isDragging) {
        cameraOffset.x = getEventLocation(e).x / cameraZoom - dragStart.x;
        cameraOffset.y = getEventLocation(e).y / cameraZoom - dragStart.y;
    }
}

function handleTouch(e, singleTouchHandler) {
    if (e.touches.length == 1) {
        singleTouchHandler(e);
    } else if (e.type == "touchmove" && e.touches.length == 2) {
        isDragging = false;
        handlePinch(e);
    }
}

let initialPinchDistance = null;
let lastZoom = cameraZoom;

function handlePinch(e) {
    e.preventDefault();

    let touch1 = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    let touch2 = { x: e.touches[1].clientX, y: e.touches[1].clientY };

    // This is distance squared, but no need for an expensive sqrt as it's only used in ratio
    let currentDistance =
        (touch1.x - touch2.x) ** 2 + (touch1.y - touch2.y) ** 2;

    if (initialPinchDistance == null) {
        initialPinchDistance = currentDistance;
    } else {
        adjustZoom(null, currentDistance / initialPinchDistance);
    }
}

function adjustZoom(zoomAmount, zoomFactor) {
    if (!isDragging) {
        if (zoomAmount) {
            cameraZoom += zoomAmount;
        } else if (zoomFactor) {
            console.log(zoomFactor);
            cameraZoom = zoomFactor * lastZoom;
        }

        cameraZoom = Math.min(cameraZoom, MAX_ZOOM);
        cameraZoom = Math.max(cameraZoom, MIN_ZOOM);

        console.log(zoomAmount);
    }
}

canvas.addEventListener("mousedown", onPointerDown);
canvas.addEventListener("touchstart", (e) => handleTouch(e, onPointerDown));
canvas.addEventListener("mouseup", onPointerUp);
canvas.addEventListener("touchend", (e) => handleTouch(e, onPointerUp));
canvas.addEventListener("mousemove", onPointerMove);
canvas.addEventListener("touchmove", (e) => handleTouch(e, onPointerMove));
canvas.addEventListener("wheel", (e) =>
    adjustZoom(e.deltaY * SCROLL_SENSITIVITY)
);

function Dfunciones() {
    dibujar = true;
    input = '0'
    Potencia = '0';
    sincos = '0';
    Constate = '1';
    var V = 0, X = 0;
    Min = document.getElementById("Min").value;
    Max = document.getElementById("Max").value;
    var inp = document.getElementById("F").value
    for (var i = 0; i < inp.length; i++) {
        if (inp[i] == 'x') {
            Potencia++;
            X++;
        }
        if (inp[i] == 's') {
            while (inp[i] != ')'){
                i++;
            }
            sincos += '1';
        }
        if (inp[i] == 'c') {
            while(inp[i] != ')'){
                i++;
            }
            sincos += '2';
        }
        if (/^\d+$/.test(inp[i]) && X == 0) {
            Constate += inp[i];
        }
        if (inp[i] == '-' && X == 0) {
            Constate = '';
            i++;
            Constate += '-' + inp[i];
        }
        if (inp[i] == '+') {
            V++;
            input = '';
            i++;
            input += inp[i];
        } else {
            if (inp[i] == '-' && X != 0) {
                V++;
                input = '';
                i++;
                input += '-' + inp[i];
            } else {
                if (/^\d+$/.test(inp[i]) && V != 0) {
                    input += inp[i];
                }
            }
        }
    }
    console.log(inp);
    console.log(Constate);
    console.log(parseInt(sincos));
}
function Cuadricula() {
    if (C) {
        C = false;
    } else {
        C = true;
    }
}
function Home() {
    cameraZoom = 1;
    cameraOffset = { x: w / 2, y: h / 2 };
}


draw();

