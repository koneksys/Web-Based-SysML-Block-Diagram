 /*!
 * Web-based SysML Block Diagram v1.0
 * http://www.koneksys.com/
 *
 * Copyright 2016 Koneksys
 * Released under the MIT license
 *
 * @author Vorachet Jaroensawas, Koneksys (vorachet.jaroensawas@koneksys.com)
 * @author Axel Reichwein, Koneksys (axel.reichwein@koneksys.com)
 */

function clear_all_layers(context) {
	ctx_class.clearRect(0, 0, WIDTH, HEIGHT);
	ctx_top.clearRect(0, 0, WIDTH, HEIGHT);
	ctx_middle.clearRect(0, 0, WIDTH, HEIGHT);
	ctx_bottom.clearRect(0, 0, WIDTH, HEIGHT);
}

function clear_top_layer(context) {
	ctx_top.clearRect(0, 0, WIDTH, HEIGHT);
}

function clear_middle_layer(context) {
	ctx_middle.clearRect(0, 0, WIDTH, HEIGHT);
}

function clear_bottom_layer(context) {
	ctx_bottom.clearRect(0, 0, WIDTH, HEIGHT);
}

function clear(context) {
	context.clearRect(0, 0, WIDTH, HEIGHT);
}

function debug(){
	for (var i = boxes.length - 1; i >= 0; i--) {
		if(mySel != null && mySel.id == boxes[i].id){
			$("#debug").append("<a id='" + boxes[i].id + "' href='#popupMenu' data-rel='popup'><strong>" + boxes[i].name + "[" + boxes[i].id + "]</strong></a> ");
		}else{
			$("#debug").append("<a id='" + boxes[i].id + "' href='#popupMenu' data-rel='popup'>" + boxes[i].name + "[" + boxes[i].id + "]</a> ");
		}
	}
}

function setToolbarPointer(){
	if(on_toolbar_cursor) $('#bottom').css( 'cursor', 'move' );
	else if(on_toolbar_block) $('#bottom').css( 'cursor', 'move' );
	else if(on_toolbar_link) $('#bottom').css( 'cursor', 'move' );
	else if(on_toolbar_comment) $('#bottom').css( 'cursor', 'move' );
	else $('#bottom').css( 'cursor', 'move' );
}

// This method will be called when the application wants to redraw the graphic. 
// The canvasValid will be conditioned to redraw() method.
function invalidate() {
	canvasValid = false;
}

function getMouse(e) {
	var element = canvas, offsetX = 0, offsetY = 0;
	if (element.offsetParent) {
		do {
			offsetX += element.offsetLeft;
			offsetY += element.offsetTop;
		} while ((element = element.offsetParent));
	}
	// Add padding and border style widths to offset
	offsetX += stylePaddingLeft;
	offsetY += stylePaddingTop;
	offsetX += styleBorderLeft;
	offsetY += styleBorderTop;
	mx = e.pageX - offsetX;
	my = e.pageY - offsetY;
}

function getTouch(e) {
	var element = canvas, offsetX = 0, offsetY = 0;
	if (element.offsetParent) {
		do {
			offsetX += element.offsetLeft;
			offsetY += element.offsetTop;
		} while ((element = element.offsetParent));
	}
	// Add padding and border style widths to offset
	offsetX += stylePaddingLeft;
	offsetY += stylePaddingTop;
	offsetX += styleBorderLeft;
	offsetY += styleBorderTop;
	mx = e.targetTouches[0].pageX - offsetX;
	my = e.targetTouches[0].pageY - offsetY
}


function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
	if (typeof stroke == "undefined" )  stroke = true;
	if (typeof radius === "undefined") radius = 5;
	ctx.beginPath();
	ctx.moveTo(x + radius, y);
	ctx.lineTo(x + width - radius, y);
	ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
	ctx.lineTo(x + width, y + height - radius);
	ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
	ctx.lineTo(x + radius, y + height);
	ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
	ctx.lineTo(x, y + radius);
	ctx.quadraticCurveTo(x, y, x + radius, y);
	ctx.closePath();
	ctx.stroke();
}


function drawDiagarmGrid(theContext) {
	var color = CONFIG_grid_color; 
	var stepx = CONFIG_grid_step;
	var stepy = CONFIG_grid_step;
	
	theContext.save();
	theContext.shadowColor = undefined;
	theContext.shadowBlur = 0;
	theContext.shadowOffsetX = 0;
	theContext.shadowOffsetY = 0;
   
	theContext.strokeStyle = color;
	theContext.fillStyle = '#ffffff';
	theContext.lineWidth = CONFIG_grid_line_width;
	roundRect(theContext , 0, 0, theContext.canvas.width - 30, theContext.canvas.height - 150 , 5 , true , false);
	
	// vertical lines
	theContext.beginPath();
	for (var i = stepx + 0.5; i < theContext.canvas.width - 30 - 5; i += stepx) {
		theContext.moveTo(i, 0);
		theContext.lineTo(i, theContext.canvas.height - 150);
	}
	theContext.stroke();

	// horizonal lines
	theContext.beginPath();
	for (var i = stepy + 0.5; i < theContext.canvas.height - 150; i += stepy) {
		theContext.moveTo(0, i);
		theContext.lineTo(theContext.canvas.width - 30, i);
	}
	theContext.stroke();

	theContext.restore();
}


function drawDiagramFrame(theCtx) {
	var
		stepx = CONFIG_grid_step, 
		stepy = CONFIG_grid_step,
		diagramFrameText = '<diagramKind> [modelElementType] <modelElementName> [diagramName]';

	theCtx.save()
	theCtx.strokeStyle = 'black';
	theCtx.lineWidth = 0.5;
	theCtx.font = '14px Segoe UI';
	theCtx.fillText(diagramFrameText, stepx * 2, stepy + 20);
	theCtx.strokeRect(stepx, stepy, theCtx.canvas.width - (CONFIG_grid_step * 3.5) , theCtx.canvas.height - 220);
	theCtx.beginPath();
	theCtx.moveTo(stepx,stepy + 30);
	theCtx.lineTo(500 , stepy + 30);
	theCtx.moveTo(500,stepy + 30);
	theCtx.lineTo(520 , stepy + 12);
	theCtx.moveTo(520,stepy + 12);
	theCtx.lineTo(520 , stepy);
	theCtx.stroke();
}
