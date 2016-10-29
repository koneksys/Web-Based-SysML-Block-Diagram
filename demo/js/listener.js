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


var isNotFocusOnBlockResizePoints;
var isMoving = false;
var isSelectedNotation = false;
var source_connsnap_x,source_connsnap_y;
var isReadyToMakeAConnection = false;;
var isPointedToMakeAConnection = false;
var IS_TOUCHED_OTHER_BLOCK;
var ID_OF_THE_TOUCHED_BLOCK;

function touchUp(e) {
	getTouch(e);
	myUp(e);
}

function touchDown(e) {
	getTouch(e);
	mouseDown(e);
}

function touchMove(e) {
	if (!e) var e = event;
	e.preventDefault();
	getTouch(e);
	myMove(e);
}

function mouseDown(e) {
	var l,i,
		imageData,
		CLICK_IN_THE_SHAPE_AREA;

	e.preventDefault();
	getMouse(e);

	if (mySel != null) {
		clearContextSensitiveIcons();
	}

	clear(gctx);
	isSelectedNotation = false;
	l = blocks.length;
	for (i = l-1; i >= 0; i--) {
		drawBlock(gctx, blocks[i]);
		imageData = gctx.getImageData( mx, my, 1, 1);
		CLICK_IN_THE_SHAPE_AREA = imageData.data[3] > 0;

		if (CLICK_IN_THE_SHAPE_AREA) {
			isSelectedNotation = true;
			mySel = blocks[i];
			mySelOrder = i;
			offsetx = mx - mySel.x;
			offsety = my - mySel.y;
			mySel.x = mx - offsetx;
			mySel.y = my - offsety;
			isDrag = true;
			canvas_glass.onmousemove = myMove;
			invalidate();
			clear(gctx);
			return;
		}else{
			mySel = null;
		}
	}
	clear(gctx);
	invalidate();
}

function makeConnection(theBlock , x , y) {
	source_connsnap_x = x;
	source_connsnap_y = y;
	canvas_glass.onmousemove = myConnectionMove;
}

function resizeBlock2(theBlock) {
	expectResize = 2;
	isResizeDrag = true;
}

function resizeBlock4(theBlock) {
	expectResize = 4;
	isResizeDrag = true;
}

function resizeBlock7(theBlock) {
	expectResize = 7;
	isResizeDrag = true;
}

function resizeBlock0(theBlock) {
	expectResize = 0;
	isResizeDrag = true;
}

function resizeBlock3(theBlock) {
	expectResize = 3;
	isResizeDrag = true;
}

function resizeBlock5(theBlock) {
	expectResize = 5;
	isResizeDrag = true;
}

function stopResizeBlock() {
	console.debug( 'stopResizeBlock' );
	//$('*').css('cursor','auto');
	expectResize = -1;
	isResizeDrag = false;
}

function myMove(e) {
	e.preventDefault(); 
	getMouse(e);

	if(isResizeDrag) {
		clear_glass_layer();
		resizeTheBlockByDrag();
		return;
	}else{
		isResizeDrag = false;
			expectResize = -1;
			$('*').css('cursor','auto');
	}

	if(isDrag) {
		if(isReadyToMakeAConnection) {
			if(!CONFIG_focus_connection_point_mode_auto) {
				canvas_glass.onmousemove = myConnectionMove;
				return;
			}	
		}else{
			canvas_glass.onmousemove = myMove;
			moveBlock();
			return;
		}
		
	}
}

function myUp() {
	console.debug('mouseUp()');
	isDrag = false;
	isResizeDrag = false;
	isReadyToMakeAConnection = false;
	isPointedToMakeAConnection = false;
	expectResize = -1;
	canvas_top.onmousemove = null;
	
	clear_glass_layer();
	canvas_glass.onmousemove = myMove

	if(mySel != null ) { 
		_moveToLastArrayObjectById( blocks , mySel.id);
		invalidate();
	}

	var createConnectionNow =  mySel != null && IS_TOUCHED_OTHER_BLOCK;
	if( createConnectionNow ) {
		sourceBlock = mySel;
		targetBlock = blocks[ ID_OF_THE_TOUCHED_BLOCK ];
		addConnection( sourceBlock , targetBlock, 'dependency' );
		//partassociation
		//generalization
		//dependency
		//sharedassociation
		invalidate();
		IS_TOUCHED_OTHER_BLOCK = false;
	}
}

function myDblClick(e) {
	console.debug('mouse double click');
}

function moveBlock() {
	console.debug('moveBlock()');
	if(mySel != null) {
		console.debug('isDrag');
		mySel.x = mx - offsetx;
		mySel.y = my - offsety;
		invalidate();
		return;
	}
}

function resizeTheBlockByDrag() {
	console.debug('resizeTheBlockByDrag()');
	if(mySel != null) {
			var oldx = mySel.x ;
			var oldy = mySel.y;
			var oldw = mySel.w;
			var oldh = mySel.h;
			// 0  1  2
			// 3     4
			// 5  6  7
			switch (expectResize) {	
				case 0:
					mySel.x = mx;
					mySel.y = my;
					mySel.w += oldx - mx;
					mySel.h += oldy - my;
					if(mySel.w < CONFIG_MINIMUM_RESIZE_W) mySel.w = CONFIG_MINIMUM_RESIZE_W;
					if(mySel.h < CONFIG_MINIMUM_RESIZE_H) mySel.h = CONFIG_MINIMUM_RESIZE_H;
					invalidate();
					break;
				case 1:
					mySel.y = my;
					mySel.h += oldy - my;
					if(mySel.w < CONFIG_MINIMUM_RESIZE_W) mySel.w = CONFIG_MINIMUM_RESIZE_W;
					if(mySel.h < CONFIG_MINIMUM_RESIZE_H) mySel.h = CONFIG_MINIMUM_RESIZE_H;
					invalidate();
					break;
				case 2:
					mySel.y = my;
					mySel.w = mx - oldx;
					mySel.h += oldy - my;
					if(mySel.w < CONFIG_MINIMUM_RESIZE_W) mySel.w = CONFIG_MINIMUM_RESIZE_W;
					if(mySel.h < CONFIG_MINIMUM_RESIZE_H) mySel.h = CONFIG_MINIMUM_RESIZE_H;
					invalidate();
					break;
				case 3:
					mySel.x = mx;
					mySel.w += oldx - mx;
					if(mySel.w < CONFIG_MINIMUM_RESIZE_W) mySel.w = CONFIG_MINIMUM_RESIZE_W;
					if(mySel.h < CONFIG_MINIMUM_RESIZE_H) mySel.h = CONFIG_MINIMUM_RESIZE_H;
					invalidate();
					break;
				case 4:
					mySel.w = mx - oldx;
					if(mySel.w < CONFIG_MINIMUM_RESIZE_W) mySel.w = CONFIG_MINIMUM_RESIZE_W;
					if(mySel.h < CONFIG_MINIMUM_RESIZE_H) mySel.h = CONFIG_MINIMUM_RESIZE_H;
					invalidate();
					break;
				case 5:
					mySel.x = mx;
					mySel.w += oldx - mx;
					mySel.h = my - oldy;
					if(mySel.w < CONFIG_MINIMUM_RESIZE_W) mySel.w = CONFIG_MINIMUM_RESIZE_W;
					if(mySel.h < CONFIG_MINIMUM_RESIZE_H) mySel.h = CONFIG_MINIMUM_RESIZE_H;
					invalidate();
					break;
				case 6:
					mySel.h = my - oldy;
					if(mySel.w < CONFIG_MINIMUM_RESIZE_W) mySel.w = CONFIG_MINIMUM_RESIZE_W;
					if(mySel.h < CONFIG_MINIMUM_RESIZE_H) mySel.h = CONFIG_MINIMUM_RESIZE_H;
					invalidate();
					break;
				case 7:
					mySel.w = mx - oldx;
					mySel.h = my - oldy;
					if(mySel.w < CONFIG_MINIMUM_RESIZE_W) mySel.w = CONFIG_MINIMUM_RESIZE_W;
					if(mySel.h < CONFIG_MINIMUM_RESIZE_H) mySel.h = CONFIG_MINIMUM_RESIZE_H;
					invalidate();
					break;
			}
	}
}

function myConnectionMove(e) {
	e.preventDefault(); 
	getMouse(e);
	draftConnection();
}

function draftConnection() {
	if(mySel != null) {
		clear_glass_layer();
		ctx_glass.beginPath();
		ctx_glass.lineWidth = CONFIG_connection_stroke_line_width;
		ctx_glass.moveTo(source_connsnap_x , source_connsnap_y);
		ctx_glass.lineTo(mx, my);
		ctx_glass.stroke();

		var l = blocks.length;
		var target;
		for (var i = l-1; i >= 0; i--) {
			target = blocks[i];

			if(mySel.name != blocks[i].name) {
				if( mx >= target.x && mx <= (target.x + target.w)
					 && my >= target.y && my <= (target.y + target.h) ) {
					IS_TOUCHED_OTHER_BLOCK = true;
					ID_OF_THE_TOUCHED_BLOCK = i;
					break;
				}else{
					IS_TOUCHED_OTHER_BLOCK = false;
					ID_OF_THE_TOUCHED_BLOCK = 0;
				}
			}	
		}

		if(IS_TOUCHED_OTHER_BLOCK) {
			ctx_glass.fillStyle = CONFIG_focus_connection_point_text_color;
			ctx_glass.font = CONFIG_focus_connection_point_text_font;
			// ctx_glass.fillText('Drop to make a conenction to block:' + blocks[ID_OF_THE_TOUCHED_BLOCK].name, mx ,my - 20);
			ctx_glass.strokeStyle = 'red';
			ctx_glass.strokeRect(blocks[i].x - 15,blocks[i].y - 5,blocks[i].w + 30,blocks[i].h + 25);
		}else{
			IS_TOUCHED_OTHER_BLOCK = false;
			ID_OF_THE_TOUCHED_BLOCK = 0;
		}
	}
}



function highlightCompartmentElement() {
	//console.debug('highlightCompartmentElement()');
	// highlight the compartment element 
		if( mySel !== null) {
			var numberOfConstraints, numberOfOperations, numberOfParts, numberOfReferences, numberOfValues;
			var cydiff;
			numberOfConstraints = mySel.constraints.length;

			for (var i = 0; i < numberOfConstraints; i++) {
				cydiff = (my - mySel.constraints[i].y + 10);
				if( mx >= mySel.x && mx <= (mySel.x + mySel.w) && Math.abs(cydiff) <= 5 ) {
						mySel.constraints[i].highlight = true;
						invalidate();
				}else{
					mySel.constraints[i].highlight = false;
				}
			}

			numberOfOperations = mySel.operations.length;
			for (var i = 0; i < numberOfOperations; i++) {
				cydiff = (my - mySel.operations[i].y + 10);
				if( mx >= mySel.x && mx <= (mySel.x + mySel.w) && Math.abs(cydiff) <= 5 ) {
						mySel.operations[i].highlight = true;
						invalidate();
				}else{
					mySel.operations[i].highlight = false;
				}
			}

			numberOfParts = mySel.parts.length;
			for (var i = 0; i < numberOfParts; i++) {
				cydiff = (my - mySel.parts[i].y + 10);
				if( mx >= mySel.x && mx <= (mySel.x + mySel.w) && Math.abs(cydiff) <= 5 ) {
						mySel.parts[i].highlight = true;
						invalidate();
				}else{
					mySel.parts[i].highlight = false;
				}
			}

			numberOfReferences = mySel.references.length;
			for (var i = 0; i < numberOfReferences; i++) {
				cydiff = (my - mySel.references[i].y + 10);
				if( mx >= mySel.x && mx <= (mySel.x + mySel.w) && Math.abs(cydiff) <= 5 ) {
						mySel.references[i].highlight = true;
						invalidate();
				}else{
					mySel.references[i].highlight = false;
				}
			}

			numberOfValues = mySel.values.length;
			for (var i = 0; i < numberOfValues; i++) {
				cydiff = (my - mySel.values[i].y + 10);
				if( mx >= mySel.x && mx <= (mySel.x + mySel.w) && Math.abs(cydiff) <= 5 ) {
						mySel.values[i].highlight = true;
						invalidate();
				}else{
					mySel.values[i].highlight = false;
				}
			}

			numberOfProperties = mySel.properties.length;
			for (var i = 0; i < numberOfProperties; i++) {
				cydiff = (my - mySel.properties[i].y + 10);
				if( mx >= mySel.x && mx <= (mySel.x + mySel.w) && Math.abs(cydiff) <= 5 ) {
						mySel.properties[i].highlight = true;
						invalidate();
				}else{
					mySel.properties[i].highlight = false;
				}
			}
		}
}

function show_connection_dialog() {
	ctx_glass.globalAlpha = 0.4;
	ctx_glass.lineWidth = CONFIG_block_stroke_line_width;
	ctx_glass.fillStyle = 'red';
	ctx_glass.fillRect(mySel.x - 10,mySel.y - 50,200,30);
	//ctx_glass.lineWidth = CONFIG_block_stroke_line_width;
	//ctx_glass.strokeStyle = CONFIG_block_stroke_color;
	//ctx_glass.strokeRect(mySel.x - 10,mySel.y - 50,200,30);
	//ctx_glass.fillStyle = 'white';
	ctx_glass.fillRect(mySel.x + 5,mySel.y - 40,10,10);
}

function clear_connection_dialog() {
	ctx_glass.clearRect(0, 0, WIDTH, HEIGHT);
}
