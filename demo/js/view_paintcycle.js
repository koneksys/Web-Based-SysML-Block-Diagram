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

window.requestAnimFrame = (function(){  // <----- New code
	return  window.requestAnimationFrame       ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame    ||
		window.oRequestAnimationFrame       ||
		window.msRequestAnimationFrame     ||
		function( callback ){
			window.setTimeout(callback, 1000/60);
		};
})();


var newModel_startX  = 300;
var newModel_startY = 50;

var animate_start = false;
var global_connection_guide_canvas;
var global_connection_guide_ctx;
var global_ConnectionGuideTargets = [];
var global_ConnectionGuideAnimateX ,global_ConnectionGuideAnimateY= [];

var on_toolbar_cursor = false;
var on_toolbar_block = false;
var on_toolbar_link = false;
var on_toolbar_comment = false;

var ctx_glass;
var ctx_top;
var ctx_middle;
var ctx_bottom;
var canvas_glass;
var canvas_top;
var canvas_middle;
var canvas_bottom;
var canvas;

var ctx, globalCtx;
var WIDTH;
var HEIGHT;
var INTERVAL = 20;  // how often, in milliseconds, we check to see if a redraw is needed

var scale = 1.0;
var scaleMultiplier = 0.8;

var isDrag = false;
var isResizeDrag = false;
var expectResize = -1; 
var mx, my; // mouse coordinates

 // when set to true, the canvas will redraw everything
 // invalidate() just sets this to false right now
 // we want to call invalidate() whenever we make a change
 var canvasValid = false;

// The node (if any) being selected.
// If in the future we want to select multiple objects, this will get turned into an array
var 
	mySel,
	mySelColor = '#fff',
	mySelWidth = 2,
	mySelOrder = 0;

var
	myConnectionSel,
	myConnectionSelColor = '#fff',
	myConnectionSelWidth = 2,
	myConnectionSelOrder = 0;

// A technique to detect object in the canvas in using ghost canvas.
var ghostcanvas;
var gctx; 

// since we can drag from anywhere in a node
// instead of just its x/y corner, we need to save
// the offset of the mouse when we start dragging.
var offsetx, offsety;

// Padding and border style widths for mouse offsets
var stylePaddingLeft, stylePaddingTop, styleBorderLeft, styleBorderTop;


var icon_width = '15';


// initialize our canvas, add a ghost canvas, set draw loop
// then add everything we want to intially exist on the canvas

function init() {
	console.log('init()');

	canvas_glass = document.getElementById("glass");
	ctx_glass = canvas_glass.getContext("2d");

	canvas_top = document.getElementById("top");
	ctx_top = canvas_top.getContext("2d");

	canvas_middle = document.getElementById("middle");
	ctx_middle = canvas_middle.getContext("2d");

	canvas_bottom = document.getElementById("bottom");
	ctx_bottom = canvas_bottom.getContext("2d");

	canvas = canvas_top;
  
  	var container = document.getElementById('container');
	HEIGHT =  canvas_top.height;
	WIDTH =  canvas_top.width;

	ctx = ctx_top;   // redraw setup
	globalCtx = ctx_top; // redraw setup

	// used for checl click area
	ghostcanvas = document.createElement('canvas');
	ghostcanvas.height = HEIGHT;
	ghostcanvas.width = WIDTH;
	gctx = ghostcanvas.getContext('2d');

	if(CONFIG_show_grid) drawDiagarmGrid(ctx_bottom);
  
	//fixes a problem where double clicking causes text to get selected on the canvas
	canvas.onselectstart = function () { return false; }
  
	// fixes mouse co-ordinate problems when there's a border or padding
	// see getMouse for more detail
	if (document.defaultView && document.defaultView.getComputedStyle) {
		stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingLeft'], 10)      || 0;
		stylePaddingTop  = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingTop'], 10)       || 0;
		styleBorderLeft  = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderLeftWidth'], 10)  || 0;
		styleBorderTop   = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderTopWidth'], 10)   || 0;
	}

	loop();
	//animate();
  
	// To install mouse events
	canvas_glass.onmousedown = mouseDown;

	// Monday 24, February 2014 - 7:55PM  
	// We changed the level of the mouse up event from the specific event on the canvas to gloal event for whole document.
	// if we don't change this, the specific mouseup on the canvas cannot be detected by the resize icon.
	//canvas_glass.onmouseup = myUp;
	document.onmouseup = myUp;

	canvas_glass.ondblclick = myDblClick;

	// To install touch events
	canvas_glass.ontouchstart = touchDown;
	canvas_glass.ontouchmove = touchMove;
	canvas_glass.ontouchend = touchUp;
	
	// we will consider the retina issue later
	// Tuesday 1 October 2013 Vorachet Jaroensawas
	// this might not works at this moment
	//window.addEventListener('resize', resizeCanvas, false);
	//resizeCanvas();

/**
	$(document.body).on('keydown', function(e) {
		e.preventDefault(); 
	    switch (e.which) {
	        // key code for left arrow
	        case 37:
	            console.log('left arrow key pressed!');
	             $('#right-panel').panel("open");
	            break;
	        
	        // key code for right arrow
	        case 39:
	            console.log('right arrow key pressed!');
	            $('#left-panel').panel("open");
	            break;

	        // key code for 'c'
	        case 67:
	        	if(interval == null) {
	        		called = false;
	        		interval = setInterval(function() {
			            doSomething(e.keyCode);
			            called = true;
			        }, 1000);
	        	}
	          
	            break;

	        // key code for space
	        case 32:
	            console.log('space key pressed!');
	            $('#right-panel').panel("close");
	            $('#left-panel').panel("close");
	            mySel = null;
	            invalidate();
	            break;

	         // key code for n
	        case 78:
	            console.log('space n pressed!');
	            if(mySel != null){
	            	editBlockName( mySel.id );
	            }
	            break;
	    }
	});




	$(document.body).on('keyup', function(e) {
		e.preventDefault(); 
	    switch (e.which) {
	        // key code for 'c'
	        case 67:
	            console.log('hold c is deactivated');
	            clearInterval(interval); 
    			interval = null;
	            isPointedToMakeAConnection = false;
	            clear_glass_layer();
	            break;
	    }
	});


*/
}

function doSomething(keyCode) {
    console.log('hold c is activated');
    if(mySel != null){
    	console.log('do function on the block');
		isPointedToMakeAConnection = true;
		ctx_glass.fill();
	}else{
		isPointedToMakeAConnection = false;
		console.log('No block is selected');
	}
}

var interval;
var called = false;


function resizeCanvas() {
	var devicePixelRatio = window.devicePixelRatio || 1;
	var backingStoreRatio = canvas_top.webkitBackingStorePixelRatio ||
				canvas_top.mozBackingStorePixelRatio ||
				canvas_top.msBackingStorePixelRatio ||
				canvas_top.oBackingStorePixelRatio ||
				canvas_top.backingStorePixelRatio || 1;

	var ratio = devicePixelRatio / backingStoreRatio;
	var oldWidth = canvas_top.width;
	var oldHeight = canvas_top.height;

	canvas_glass.width = oldWidth * ratio;
	canvas_glass.height = oldHeight * ratio;
	canvas_glass.style.width = oldWidth + 'px';
	canvas_glass.style.height = oldHeight + 'px';

	canvas_top.width = oldWidth * ratio;
	canvas_top.height = oldHeight * ratio;
	canvas_top.style.width = oldWidth + 'px';
	canvas_top.style.height = oldHeight + 'px';

	canvas_middle.width = oldWidth * ratio;
	canvas_middle.height = oldHeight * ratio;
	canvas_middle.style.width = oldWidth + 'px';
	canvas_middle.style.height = oldHeight + 'px';

	canvas_bottom.width = oldWidth * ratio;
	canvas_bottom.height = oldHeight * ratio;
	canvas_bottom.style.width = oldWidth + 'px';
	canvas_bottom.style.height = oldHeight + 'px';

	ctx_glass.scale(ratio, ratio);
	ctx_top.scale(ratio, ratio);
	ctx_middle.scale(ratio, ratio);
	ctx_bottom.scale(ratio, ratio);
   
   	if(CONFIG_show_grid) drawDiagarmGrid(ctx_bottom);
	invalidate();
}

/** 
This method will be called by the loop controller 'setInterval(draw, INTERVAL)'
The method will observe variable 'canvasValid'. When the program calls 'invalidate()', the loop controller will be noticed that canvas status is not valid and the program need to validate that status by execute the code under   if (canvasValid == false) { ... }
*/

function loop() {
	redraw();
	requestAnimFrame(function() {     // <----- New code
		loop();
	});
}

function clear_glass_layer(){
	clear(ctx_glass);
}

function animate() {
	//if(animate_start){
		console.debug('animate_start = true');
		view_conn_show_connection_creation_guide_model();
		view_conn_show_connection_creation_guide_clear();
		view_conn_show_connection_creation_guide_draw();
	//}
	requestAnimFrame(function() {     // <----- New code
			animate();
	});
	
}

var overcut_constraints = true;
var overcut_operations = true;
var overcut_parts = true;
var overcut_values = true;
var overcut_references = true;
var overcut_properties = true;
function redraw() {

	if( canvasValid == false ) {
		clear(ctx_top);
		clear(ctx_middle);

		$('#connectionControls').html('');
		 
		// **************************************
		// Start background Layer  - only single canvas implementation
		// **************************************
		// Add stuff you want drawn in the background all the time here

		//ctx.textAlign = 'left';
		//ctx.font = '14px Segoe UI';
		//ctx.fillText('This text uses background layer', 20,50);

		

		// **************************************
		// End of backgroud layer
		// **************************************
 
		

		// Draw blocks
		var numberOfBlocks = blocks.length;
		for (var i = 0; i < numberOfBlocks; i++) {
			drawBlock(ctx_top, blocks[i]);
		}

		// Draw connections      
		clearConnectionAlignmentDatabase();
		calculateConnectionPosition();

		var numberOfConnections = connections.length;
		for (var i = 0; i < numberOfConnections; i++) {
			connections[i].render(ctx_middle);
		}	

		// draw the stroke for the mouse focus shape
		// right now this is just a stroke along the edge of the selected box
		var SOME_BLOCKS_ARE_SELECTED = mySel != null;
		if ( SOME_BLOCKS_ARE_SELECTED ) {

			if (isDrag) return;

			ctx.lineWidth = CONFIG_focus_stroke_line_width;
			ctx.strokeStyle = CONFIG_focus_stroke_color;


			ctx.save();
			
			// Draw edit/delete icon

			var icon_width = '15';

			var bex = mySel.x + 30 + CONFIG_canvas_block_xoffset;
			var bey = mySel.y + CONFIG_canvas_block_yoffset; 
			var bdx = mySel.x + 10 + CONFIG_canvas_block_xoffset;
			var bdy = mySel.y + CONFIG_canvas_block_yoffset; 

		
			// all_compartment_visible_icon
			var all_compartment_visible_icon = '';
			
			if( mySel.all_compartment_visible == true){
				all_compartment_visible_icon = 'img/up.png';
			}else{
				all_compartment_visible_icon = 'img/download.png';
			}
			var bcpvx = mySel.x + mySel.w + 5 + CONFIG_canvas_block_xoffset;
			var bcpvy = mySel.y + CONFIG_canvas_block_yoffset; 

			var bprocx = mySel.x + 50 + CONFIG_canvas_block_xoffset;
			var bprocy = mySel.y + CONFIG_canvas_block_yoffset; 

			var bconnx = mySel.x + 10 + CONFIG_canvas_block_xoffset;
			var bconny = mySel.y + CONFIG_canvas_block_yoffset; 


			var bconn_next_x_before_offset = mySel.x + mySel.w + 40;
			var bconn_next_x = bconn_next_x_before_offset + CONFIG_canvas_block_xoffset;
			var bconn_next_y_before_offset = mySel.y + (mySel.h / 2);
			var bconn_next_y = bconn_next_y_before_offset + CONFIG_canvas_block_yoffset; 

			var bconn_back_x_before_offset = mySel.x - 30;
			var bconn_back_x = bconn_back_x_before_offset + CONFIG_canvas_block_xoffset;
			var bconn_back_y_before_offset = mySel.y + (mySel.h / 2);
			var bconn_back_y = bconn_back_y_before_offset + CONFIG_canvas_block_yoffset; 

			var bconn_up_x_before_offset = mySel.x + (mySel.w / 2);
			var bconn_up_x = bconn_up_x_before_offset;
			var bconn_up_y_before_offset = mySel.y - 20;
			var bconn_up_y = bconn_up_y_before_offset + CONFIG_canvas_block_yoffset; 

			var bconn_down_x_before_offset = mySel.x + (mySel.w / 2);
			var bconn_down_x = bconn_down_x_before_offset;
			var bconn_down_y_before_offset = mySel.y + mySel.h + 30;
			var bconn_down_y = bconn_down_y_before_offset + CONFIG_canvas_block_yoffset; 

			//2
			var resize_x_2 = mySel.x + mySel.w + 5 + CONFIG_canvas_block_xoffset + 15;
			var resize_y_2 = bcpvy;
			//4
			var resize_x_4 = resize_x_2;
			var resize_y_4 = mySel.y + (mySel.h / 2) + CONFIG_canvas_block_yoffset +5;
			//7
			var resize_x_7 = resize_x_2;
			var resize_y_7 = mySel.y + mySel.h + 15 +  CONFIG_canvas_block_yoffset;

			//2
			var resize_x_0 = mySel.x - 2 + CONFIG_canvas_block_xoffset;
			var resize_y_0 = bcpvy;
			//4
			var resize_x_3 = resize_x_0;
			var resize_y_3 = resize_y_4;
			//7
			var resize_x_5 = resize_x_0;
			var resize_y_5 = resize_y_7;

			var blockControls = '';

			blockControls = blockControls 
			+ '<a href="javascript:editBlockName(\'' + mySel.id + '\');"><img width="' + icon_width + '"  src="img/edit.png" style="z-index: 6;position:absolute;top:' + bey + 'px;left:' + bex +'px;"/></a> '
			+ '<a href="javascript:deleteBlock(\'' + mySel.id + '\',true);"><img width="' + icon_width + '"  src="img/delete.png" style="z-index: 6;position:absolute;top:' + bdy + 'px;left:' + bdx +'px;"/></a>'
			+ '<a href="javascript:toggleCompartmentDisplay(\'' + mySel.id + '\');"><img width="' + icon_width + '" src="' + all_compartment_visible_icon + '" style="z-index: 6;position:absolute;top:' + bcpvy + 'px;left:' + bcpvx +'px;"/></a>'
			+ '<a href="javascript:openDialog(\'' + mySel.id + '\');"><img width="' + icon_width + '" src="img/process.png" style="z-index: 6;position:absolute;top:' + bprocy + 'px;left:' + bprocx +'px;"/></a> '
			
			+ '<a onmousedown="makeConnection(\'' + mySel.id + '\',' + bconn_next_x_before_offset + ',' + bconn_next_y_before_offset + ');return false;"><img width="' + icon_width + '"  src="img/next.png" style="z-index: 6;position:absolute;top:' + bconn_next_y + 'px;left:' + bconn_next_x +'px;"/></a> '
			
			+ '<a onmousedown="makeConnection(\'' + mySel.id + '\',' + bconn_back_x_before_offset + ',' + bconn_back_y_before_offset + ');return false;"><img width="' + icon_width + '"  src="img/back.png" style="z-index: 6;position:absolute;top:' + bconn_back_y + 'px;left:' + bconn_back_x +'px;"/></a> '
			
			+ '<a onmousedown="makeConnection(\'' + mySel.id + '\',' + bconn_up_x_before_offset + ',' + bconn_up_y_before_offset + ');return false;"><img width="' + icon_width + '"  src="img/up.png" style="z-index: 6;position:absolute;top:' + bconn_up_y + 'px;left:' + bconn_up_x +'px;"/></a> '
			
			+ '<a onmousedown="makeConnection(\'' + mySel.id + '\',' + bconn_down_x_before_offset + ',' + bconn_down_y_before_offset + ');return false;"><img width="' + icon_width + '"  src="img/download.png" style="z-index: 6;position:absolute;top:' + bconn_down_y + 'px;left:' + bconn_down_x +'px;"/></a> '

			+ '<a onmousedown="resizeBlock2(\'' + mySel.id + '\');return false;"><img width="12"  src="img/transpRed90.png"  style="z-index: 6;position:absolute;top:' + resize_y_2 + 'px;left:' + resize_x_2 +'px;"/></a> '

			+ '<a onmousedown="resizeBlock4(\'' + mySel.id + '\');return false;"><img width="12"  src="img/transpRed90.png" style="z-index: 6;position:absolute;top:' + resize_y_4 + 'px;left:' + resize_x_4 +'px;"/></a> '

			+ '<a onmousedown="resizeBlock7(\'' + mySel.id + '\');return false;"><img width="12"  src="img/transpRed90.png" style="z-index: 6;position:absolute;top:' + resize_y_7 + 'px;left:' + resize_x_7 +'px;"/></a> '

			+ '<a onmousedown="resizeBlock0(\'' + mySel.id + '\');return false;"><img width="12"  src="img/transpRed90.png"  style="z-index: 6;position:absolute;top:' + resize_y_0 + 'px;left:' + resize_x_0 +'px;"/></a> '

			+ '<a onmousedown="resizeBlock3(\'' + mySel.id + '\');return false;"><img width="12"  src="img/transpRed90.png" style="z-index: 6;position:absolute;top:' + resize_y_3 + 'px;left:' + resize_x_3 +'px;"/></a> '

			+ '<a onmousedown="resizeBlock5(\'' + mySel.id + '\');return false;"><img width="12"  src="img/transpRed90.png" style="z-index: 6;position:absolute;top:' + resize_y_5 + 'px;left:' + resize_x_5 +'px;"/></a> ';
;

			if( mySel.all_compartment_visible == true){


				//constraints_visible 
				if(mySel.constraints_completely_visible_off == false && overcut_constraints == false){
					if( mySel.constraints_visible == true){
						constraints_visible_icon = 'img/up.png';
					}else{
						constraints_visible_icon = 'img/download.png';
					}

					var x = mySel.x + mySel.w - 15 + CONFIG_canvas_block_xoffset;
					var y = mySel.constraint_header_y - 5 + CONFIG_canvas_block_yoffset; 
					var x_add = x + 20;

					blockControls = blockControls + '<a href="javascript:toggleConstraintCompartmentDisplay(\'' + mySel.id + '\');"><img width="' + icon_width + '"  src="' + constraints_visible_icon + '" style="z-index: 6;position:absolute;top:' + y + 'px;left:' + x +'px;"/></a>';
					blockControls = blockControls + '<a href="javascript:addBlockAttribute(\'' + mySel.id + '\',\'constraint\');"><img width="' + icon_width + '" src="img/add.png" style="z-index: 6;position:absolute;top:' + y + 'px;left:' + x_add +'px;"/></a>';	
				}
				

				//operations_visible 
				if(mySel.operations_completely_visible_off == false && overcut_operations == false){
					if( mySel.operations_visible == true){
						operations_visible_icon = 'img/up.png';
					}else{
						operations_visible_icon = 'img/download.png';
					}

					x = mySel.x + mySel.w - 15 + CONFIG_canvas_block_xoffset;
					y = mySel.operation_header_y - 5 + CONFIG_canvas_block_yoffset; 
					x_add = x + 20;

					blockControls = blockControls + '<a href="javascript:toggleOperationCompartmentDisplay(\'' + mySel.id + '\');"><img width="' + icon_width + '"  src="' + operations_visible_icon + '" style="z-index: 6;position:absolute;top:' + y + 'px;left:' + x +'px;"/></a>';
					blockControls = blockControls + '<a href="javascript:addBlockAttribute(\'' + mySel.id + '\',\'operation\');"><img width="' + icon_width + '" src="img/add.png" style="z-index: 6;position:absolute;top:' + y + 'px;left:' + x_add +'px;"/></a>';	

				}
				

				//parts_visible 
				if(mySel.parts_completely_visible_off == false && overcut_parts == false){
					if( mySel.parts_visible == true){
						parts_visible_icon = 'img/up.png';
					}else{
						parts_visible_icon = 'img/download.png';
					}

					x = mySel.x + mySel.w - 15  + CONFIG_canvas_block_xoffset;
					y = mySel.part_header_y - 5 + CONFIG_canvas_block_yoffset; 
					x_add = x + 20;

					blockControls = blockControls + '<a href="javascript:togglePartCompartmentDisplay(\'' + mySel.id + '\');"><img width="' + icon_width + '"  src="' + parts_visible_icon + '" style="z-index: 6;position:absolute;top:' + y + 'px;left:' + x +'px;"/></a>';
					blockControls = blockControls + '<a href="javascript:addBlockAttribute(\'' + mySel.id + '\',\'part\');"><img width="' + icon_width + '" src="img/add.png" style="z-index: 6;position:absolute;top:' + y + 'px;left:' + x_add +'px;"/></a>';	
				}
				

				//references_visible 
				if(mySel.references_completely_visible_off == false && overcut_references == false){
					if( mySel.references_visible == true){
						references_visible_icon = 'img/up.png';
					}else{
						references_visible_icon = 'img/download.png';
					}

					x = mySel.x + mySel.w - 15 + CONFIG_canvas_block_xoffset;
					y = mySel.reference_header_y - 5 + CONFIG_canvas_block_yoffset; 
					x_add = x + 20;

					blockControls = blockControls + '<a href="javascript:toggleReferenceCompartmentDisplay(\'' + mySel.id + '\');"><img width="' + icon_width + '"  src="' + references_visible_icon + '" style="z-index: 6;position:absolute;top:' + y + 'px;left:' + x +'px;"/></a>';
					blockControls = blockControls + '<a href="javascript:addBlockAttribute(\'' + mySel.id + '\',\'reference\');"><img width="' + icon_width + '" src="img/add.png" style="z-index: 6;position:absolute;top:' + y + 'px;left:' + x_add +'px;"/></a>';	
				}
				
				//values_visible 
				if(mySel.values_completely_visible_off == false && overcut_values == false){
					if( mySel.values_visible == true){
						values_visible_icon = 'img/up.png';
					}else{
						values_visible_icon = 'img/download.png';
					}

					x = mySel.x + mySel.w - 15 + CONFIG_canvas_block_xoffset;
					y = mySel.value_header_y - 5 + CONFIG_canvas_block_yoffset; 
					x_add = x + 20;

					blockControls = blockControls + '<a href="javascript:toggleValueCompartmentDisplay(\'' + mySel.id + '\');"><img width="' + icon_width + '"  src="' + values_visible_icon + '" style="z-index: 6;position:absolute;top:' + y + 'px;left:' + x +'px;"/></a>';
					blockControls = blockControls + '<a href="javascript:addBlockAttribute(\'' + mySel.id + '\',\'value\');"><img width="' + icon_width + '" src="img/add.png" style="z-index: 6;position:absolute;top:' + y + 'px;left:' + x_add +'px;"/></a>';	

				}
				
				//properties_visible 
				if(mySel.properties_completely_visible_off == false && overcut_properties == false){
					if( mySel.properties_visible == true){
						properties_visible_icon = 'img/up.png';
					}else{
						properties_visible_icon = 'img/download.png';
					}

					
					x = mySel.x + mySel.w - 15  + CONFIG_canvas_block_xoffset;
					y = mySel.property_header_y - 5 + CONFIG_canvas_block_yoffset; 
					x_add = x + 20;

					blockControls = blockControls + '<a href="javascript:togglePropertyCompartmentDisplay(\'' + mySel.id + '\');"><img width="' + icon_width + '"  src="' + properties_visible_icon + '" style="z-index: 6;position:absolute;top:' + y + 'px;left:' + x +'px;"/></a>';
					blockControls = blockControls + '<a href="javascript:addBlockAttribute(\'' + mySel.id + '\',\'property\');"><img width="' + icon_width + '" src="img/add.png" style="z-index: 6;position:absolute;top:' + y + 'px;left:' + x_add +'px;"/></a>';	
				}
				
			}

			//console.debug( blockControls );
			$('#blockControls').html( blockControls );
	
		}else{
			clear_connection_dialog();
			clearContextSensitiveIcons();
		}

		// **************************************
		// Start foregroud layer  - only single canvas implementation
		// **************************************

		// Add stuff you want drawn on top all the time here
		//ctx.textAlign = 'left';
		//ctx.font = '14px Segoe UI';
		//ctx.fillText('This text uses fackground layer', 20,200);

		// **************************************
		// End of foregroud layer
		// **************************************


		// Set canvasValid back to true


		
		//boxes.splice(mySelOrder,1);
        //boxes.splice(mySelOrder,1);

		canvasValid = true;
	}else{
		// Be careful to put any codes here. This line will run every INTERVAL milliseconds
		//console.log('redraw() with canvasValid == true ');
	}
}

function wrapTextForConnection(context, text, x, y, maxWidth, lineHeight) {
		var _y = y; 
        var words = text.split(' ');
        var line = '';

        context.save();
        
        context.fillStyle = CONFIG_note_font_color;	

        for(var n = 0; n < words.length; n++) {
          var textLine = line + words[n] + ' ';
          var metrics = context.measureText(textLine);
          var testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
          }
          else {
            line = textLine;
          }
        }
        context.fillText(line, x, y);
        context.restore();
}

function wrapTextUsingDotCutting(context, text, x, y, maxWidth) {
		var _y = y; 
        var words = text.split('');
        var line = '';
        context.save();
        for(var n = 0; n < words.length; n++) {
        	var metrics = context.measureText(line);
        	var testWidth = metrics.width;
        	if (testWidth > maxWidth && n > 0) {
        		//line += '.';
        	}else{
        		line  += words[n];
        	}
        }
        context.fillText(line, x, y);
        context.restore();
}



function drawBlock(theCtx, theBox) {
	
	var DONT_NEED_TO_DRAW_THE_BLOCK = false;
	DONT_NEED_TO_DRAW_THE_BLOCK = (theBox.x > WIDTH || theBox.y > HEIGHT ) 
									|| (theBox.x + theBox.w < 0 || theBox.y + theBox.h < 0);
	if( DONT_NEED_TO_DRAW_THE_BLOCK ) return; 

	var numberOfConstraints = theBox.constraints.length;
	var numberOfOperations = theBox.operations.length;
	var numberOfParts = theBox.parts.length;
	var numberOfReferences = theBox.references.length;
	var numberOfValues = theBox.values.length;
	var numberOfProperties = theBox.properties.length;
	
	var _numberOfConstraints = numberOfConstraints;
	var _numberOfOperations = numberOfOperations;
	var _numberOfParts = numberOfParts;
	var _numberOfReferences = numberOfReferences;
	var _numberOfValues = numberOfValues;
	var _numberOfProperties = numberOfProperties;

	if( theBox.constraints_completely_visible_off == true || theBox.constraints_visible == false ) numberOfConstraints = 0;
	if( theBox.operations_completely_visible_off == true || theBox.operations_visible == false ) numberOfOperations = 0;
	if( theBox.parts_completely_visible_off == true || theBox.parts_visible == false ) numberOfParts = 0;
	if( theBox.references_completely_visible_off == true || theBox.references_visible == false ) numberOfReferences = 0;
	if( theBox.values_completely_visible_off == true || theBox.values_visible == false ) numberOfValues = 0;
	if( theBox.properties_completely_visible_off == true || theBox.properties_visible == false ) numberOfProperties = 0;
	
	if(theBox.w == 0) {
		theBox.w = theBox.init_w;
	}

	if(theBox.h == 0) {
		theBox.h = theBox.init_h;
	}

	var bestShapeWidth =  theBox.w;
	theBox.w = bestShapeWidth; // update the w for stroking the block's edge.

	var bestStartBlockStereotypeXPoint =  theBox.x + bestShapeWidth / 2; 
	var bestStartBlockNameXPoint = theBox.x + bestShapeWidth / 2; 
	var yOfTheLineAfterBlockName = theBox.y + 40;  
	var total_high;


	total_high = 0; 
	for (var i = 0; i < numberOfConstraints + 1; i++) total_high = total_high +  20;
	var yOfTheLineAfterTheLastConstraintElement = yOfTheLineAfterBlockName + total_high; 

	total_high = 0; 
	for (var i = 0; i < numberOfOperations + 1; i++) total_high = total_high +  25;
	var yOfTheLineAfterTheLastOperationElement = yOfTheLineAfterTheLastConstraintElement + total_high;

	total_high = 0; 
	for (var i = 0; i < numberOfParts + 1; i++) total_high = total_high +  25;
	var yOfTheLineAfterTheLastPartElement = yOfTheLineAfterTheLastOperationElement + total_high;

	total_high = 0; 
	for (var i = 0; i < numberOfReferences + 1; i++) total_high = total_high +  25;
	var yOfTheLineAfterTheLastReferenceElement = yOfTheLineAfterTheLastPartElement + total_high;

	total_high = 0; 
	for (var i = 0; i < numberOfValues + 1; i++) total_high = total_high +  25;
	var yOfTheLineAfterTheLastValueElement = yOfTheLineAfterTheLastReferenceElement + total_high;

	total_high = 0; 
	for (var i = 0; i < numberOfProperties + 1; i++) total_high = total_high + 25;
	var yOfTheLineAfterTheLastPropertyElement = yOfTheLineAfterTheLastValueElement + total_high;

	var start_constraints_y = yOfTheLineAfterBlockName + 15;
	var start_operations_y = yOfTheLineAfterTheLastConstraintElement + 15;
	var start_parts_y = yOfTheLineAfterTheLastOperationElement + 15;
	var start_references_y = yOfTheLineAfterTheLastPartElement + 15;
	var start_values_y = yOfTheLineAfterTheLastReferenceElement + 15;
	var start_properties_y = yOfTheLineAfterTheLastValueElement + 15;

	theBox.constraint_header_y = start_constraints_y;
	theBox.operation_header_y = start_operations_y;
	theBox.part_header_y = start_parts_y;
	theBox.reference_header_y = start_references_y;
	theBox.value_header_y = start_values_y;
	theBox.property_header_y = start_properties_y;
	
	
	theCtx.lineWidth = CONFIG_block_stroke_line_width;
	theCtx.fillStyle = theBox.color;

	if(CONFIG_transparent_block_background){
		if( mySel != null){
			if( mySel.id == theBox.id ){
				theCtx.globalAlpha = 1.0;
			}else{
				theCtx.globalAlpha = CONFIG_block_opacity;
			}
		}else{
			theCtx.globalAlpha = 1.0;
		}
	}
	
	theCtx.fillRect( theBox.x - 10, theBox.y, theBox.w + 20 ,theBox.h + 15);
	

	theCtx.lineWidth = CONFIG_block_stroke_line_width;
	theCtx.strokeStyle = CONFIG_block_stroke_line_width;

	// Fill the texts
	theCtx.textAlign = 'center';

	// Stereotype name
	theCtx.fillStyle = CONFIG_stereotype_font_color;
	theCtx.font = CONFIG_stereotype_font;
	theCtx.fillText(   theBox.stereotype,
			bestStartBlockStereotypeXPoint,
			theBox.y + 15);

	// We may move this code block to function if the current code is complex to maintain.
	// drawBlockName( theCtx , theBox , bestStartBlockNameXPoint)
	// {
		theCtx.fillStyle = CONFIG_block_name_font_color;
		theCtx.font = CONFIG_block_name_font;
		theCtx.fillText(   theBox.name,
				bestStartBlockNameXPoint,
				theBox.y + 30 );
		theCtx.fillStyle = CONFIG_block_font_color;
	// }		

	
	var high_space = yOfTheLineAfterBlockName;
	var offset_comp = CONFIG_canvas_block_yoffset_comp;

	if( theBox.all_compartment_visible == true ) {
		
		var comp_show_param1 = theBox.y + theBox.h;
		var comp_show_param2 = CONFIG_canvas_block_yoffset + 90;
	
		// ************************************************************************
		// CONSTRAINT COMPARTMENT
		// ************************************************************************
		if(theBox.constraints_completely_visible_off == false){

			if( (theBox.y + theBox.h) > (high_space - CONFIG_canvas_block_yoffset + offset_comp) ) {
				theCtx.beginPath();
				theCtx.moveTo( theBox.x - 10, high_space );
				theCtx.lineTo( theBox.x + 10 + theBox.w ,high_space );
				theCtx.stroke();

				theCtx.font = CONFIG_block_part_header_font;
				theCtx.textAlign = 'center';
				var ctext = '';
				if( theBox.constraints_visible == true ) ctext = 'constraints';
				else ctext = 'constraints ... (' + theBox.constraints.length + ')';
				high_space = high_space + 15; 
				theCtx.fillStyle = CONFIG_block_part_header_font_color;
				theCtx.fillText(
					ctext,
					bestStartBlockStereotypeXPoint,
					high_space
				);
				theCtx.fillStyle = CONFIG_block_font_color;
				theBox.constraint_header_y = high_space - 10;
				high_space = high_space + 5;
				overcut_constraints = false;
			}else{
				overcut_constraints = true;
			}

			if((theBox.y + theBox.h) > (high_space - CONFIG_canvas_block_yoffset + offset_comp) ) {
				if( theBox.constraints_visible == true ){
					theCtx.font = CONFIG_block_font;
					theCtx.textAlign = 'left';

					var constraintControls = '';
					var chx = theBox.x - 20;
					var chy = theBox.constraint_header_y + 95; 

					for (var i = 0; i < numberOfConstraints; i++) {
						high_space = high_space + CONFIG_block_line_space;
						theCtx.fillStyle = CONFIG_block_font_color;
						wrapTextUsingDotCutting(
							theCtx, theBox.constraints[i].name, theBox.x + 5, high_space -5, bestShapeWidth) ;
						// For edit/delete icons
						theBox.constraints[i].x = theBox.x + theBox.w;
						theBox.constraints[i].y = high_space;

					}

				} 
				overcut_constraints = false;
			}else{
				overcut_constraints = true;
			}
			
		}

	
		// ************************************************************************
		// OPERATION COMPARTMENT
		// ************************************************************************
		if(theBox.operations_completely_visible_off == false){
			if( (theBox.y + theBox.h) > (high_space - CONFIG_canvas_block_yoffset + offset_comp)  ) {
				high_space = high_space + 3;
				theCtx.beginPath();
				theCtx.moveTo( theBox.x - 10, high_space );
				theCtx.lineTo( theBox.x + 10 + theBox.w ,high_space );
				theCtx.stroke();

				theCtx.font = CONFIG_block_part_header_font;
				theCtx.textAlign = 'center';
				var optext = '';
				if( theBox.operations_visible == true ) optext = 'operations';
				else optext = 'operations ... (' + _numberOfOperations + ')';

				high_space = high_space + 15;
				theCtx.fillStyle = CONFIG_block_part_header_font_color;
				theCtx.fillText(    optext,
									bestStartBlockStereotypeXPoint,
									high_space );
				theCtx.fillStyle = CONFIG_block_font_color;
				theBox.operation_header_y = high_space - 10;
				overcut_operations = false;
			}else{
				overcut_operations = true;
			}
			

			if( (theBox.y + theBox.h) > (high_space - CONFIG_canvas_block_yoffset + offset_comp)  ) {
				if( theBox.operations_visible == true ) {
					theCtx.font = CONFIG_block_font;
					theCtx.textAlign = 'left';
					var operationControls  = '';
					var ohx = theBox.x - 20;
					var ohy = theBox.operation_header_y + 95; 
					
					for (var i = 0; i < numberOfOperations; i++) {
						high_space = high_space + CONFIG_block_line_space;
						theCtx.fillStyle = CONFIG_block_font_color;
						wrapTextUsingDotCutting(
							theCtx, theBox.operations[i].name, theBox.x + 5, high_space -5, bestShapeWidth) ;

						// For edit/delete icons
						theBox.operations[i].x = theBox.x + theBox.w;
						theBox.operations[i].y = high_space;
					}
				} 
				overcut_operations = false;
			}else{
				overcut_operations = true;
			}
			
		}
		


		// ************************************************************************
		// PART COMPARTMENT
		// ************************************************************************
		if(theBox.parts_completely_visible_off == false){
			if( (theBox.y + theBox.h) > (high_space - CONFIG_canvas_block_yoffset + offset_comp)  ) {
				high_space = high_space + 8;
				theCtx.beginPath();
				theCtx.moveTo( theBox.x - 10, high_space );
				theCtx.lineTo( theBox.x + 10 + theBox.w ,high_space );
				theCtx.stroke();

				theCtx.font = CONFIG_block_part_header_font;
				theCtx.textAlign = 'center';
				var optext = '';
				if( theBox.parts_visible == true ) optext = 'parts';
				else optext = 'parts ... (' + _numberOfParts + ')';
				high_space = high_space + 15;
				theCtx.fillStyle = CONFIG_block_part_header_font_color;
				theCtx.fillText(    optext,
									bestStartBlockStereotypeXPoint,
									high_space );
				theCtx.fillStyle = CONFIG_block_font_color;
				theBox.part_header_y = high_space  - 10;
				overcut_parts = false;
			}else{
				overcut_parts = true;	
			}
			

			if( (theBox.y + theBox.h) > (high_space - CONFIG_canvas_block_yoffset + offset_comp)  ) {
				if( theBox.parts_visible == true ) {
					// operation items
					theCtx.font = CONFIG_block_font;
					theCtx.textAlign = 'left';
					var partControls  = '';
					var ohx = theBox.x - 20;
					var ohy = theBox.part_header_y + 95; 
					
					for (var i = 0; i < numberOfParts; i++) {
						high_space = high_space + CONFIG_block_line_space;
						theCtx.fillStyle = CONFIG_block_font_color;
						wrapTextUsingDotCutting(
							theCtx, theBox.parts[i].name, theBox.x + 5, high_space -5, bestShapeWidth) ;

						// For edit/delete icons
						theBox.parts[i].x = theBox.x + theBox.w;
						theBox.parts[i].y = high_space;
					}
				} 
				overcut_parts = false;
			}else{
				overcut_parts = true;
			}
			
		}
		

		// ************************************************************************
		// REFERENCE COMPARTMENT
		// ************************************************************************
		if(theBox.references_completely_visible_off == false){

			if( (theBox.y + theBox.h) > (high_space - CONFIG_canvas_block_yoffset + offset_comp)  ) {
				high_space = high_space + 8;
				theCtx.beginPath();
				theCtx.moveTo( theBox.x - 10, high_space );
				theCtx.lineTo( theBox.x + 10 + theBox.w ,high_space );
				theCtx.stroke();

				theCtx.font = CONFIG_block_part_header_font;
				theCtx.textAlign = 'center';
				var optext = '';
				if( theBox.references_visible == true ) optext = 'references';
				else optext = 'references ... (' + _numberOfReferences + ')';
				high_space = high_space + 15;
				theCtx.fillStyle = CONFIG_block_part_header_font_color;
				theCtx.fillText(    optext,
									bestStartBlockStereotypeXPoint,
									high_space );
				theCtx.fillStyle = CONFIG_block_font_color;
				theBox.reference_header_y = high_space - 10;
				overcut_references = false;
			}else{
				overcut_references = true;
			}
			

			if( (theBox.y + theBox.h) > (high_space - CONFIG_canvas_block_yoffset + offset_comp)  ) {
				if( theBox.references_visible == true ) {
					theCtx.font = CONFIG_block_font;
					theCtx.textAlign = 'left';
					var referenceControls  = '';
					var ohx = theBox.x - 20;
					var ohy = theBox.reference_header_y + 95; 
					
					for (var i = 0; i < numberOfReferences; i++) {
						high_space = high_space + CONFIG_block_line_space;
						theCtx.fillStyle = CONFIG_block_font_color;
						wrapTextUsingDotCutting(
							theCtx, theBox.references[i].name, theBox.x + 5, high_space -5, bestShapeWidth) ;
						// For edit/delete icons
						theBox.references[i].x = theBox.x + theBox.w;
						theBox.references[i].y = high_space;
					}
				} 
				overcut_references = false;
			}else{
				overcut_references = true;
			}

			
		}
		

		// ************************************************************************
		// VALUE COMPARTMENT
		// ************************************************************************
		if(theBox.values_completely_visible_off == false){
			

			if( (theBox.y + theBox.h) > (high_space - CONFIG_canvas_block_yoffset + offset_comp)  ) {
				high_space = high_space + 8;
				theCtx.beginPath();
				theCtx.moveTo( theBox.x - 10, high_space );
				theCtx.lineTo( theBox.x + 10 + theBox.w ,high_space );
				theCtx.stroke();

				theCtx.font = CONFIG_block_part_header_font;
				theCtx.textAlign = 'center';
				var optext = '';
				if( theBox.values_visible == true ) optext = 'values';
				else optext = 'values ... (' + _numberOfValues + ')';

				high_space = high_space + 15;
				theCtx.fillStyle = CONFIG_block_part_header_font_color;
				theCtx.fillText(    optext,
									bestStartBlockStereotypeXPoint,
									high_space );
				theCtx.fillStyle = CONFIG_block_font_color;
				theBox.value_header_y = high_space - 10;
				overcut_values = false;
			}else{
				overcut_values = true;
			}
			


			if( theBox.values_visible == true ) {

				if( (theBox.y + theBox.h) > (high_space - CONFIG_canvas_block_yoffset + offset_comp)  ) {
					theCtx.font = CONFIG_block_font;
					theCtx.textAlign = 'left';
					var valueControls  = '';
					var ohx = theBox.x - 20;
					var ohy = theBox.value_header_y + 95; 
					
					for (var i = 0; i < numberOfValues; i++) {
						high_space = high_space + CONFIG_block_line_space;
						theCtx.fillStyle = CONFIG_block_font_color;
						wrapTextUsingDotCutting(
							theCtx, theBox.values[i].name, theBox.x + 5, high_space -5, bestShapeWidth) ;

						// For edit/delete icons
						theBox.values[i].x = theBox.x + theBox.w;
						theBox.values[i].y = high_space;
					}
					overcut_values = false;
				}else{
					overcut_values = true;
				}
				
			} 
		}
		

		// ************************************************************************
		// PROPERTY COMPARTMENT
		// ************************************************************************
		if(theBox.properties_completely_visible_off == false){
			

			if( (theBox.y + theBox.h) > (high_space - CONFIG_canvas_block_yoffset + offset_comp)  ) {
				high_space = high_space + 8;
				theCtx.beginPath();
				theCtx.moveTo( theBox.x - 10, high_space );
				theCtx.lineTo( theBox.x + 10 + theBox.w ,high_space );
				theCtx.stroke();

				theCtx.font = CONFIG_block_part_header_font;
				theCtx.textAlign = 'center';
				var optext = '';
				if( theBox.properties_visible == true ) optext = 'properties';
				else optext = 'properties ... (' + _numberOfProperties + ')';

				high_space = high_space + 15;
				theCtx.fillStyle = CONFIG_block_part_header_font_color;
				theCtx.fillText(    optext,
									bestStartBlockStereotypeXPoint,
									high_space );
				theCtx.fillStyle = CONFIG_block_font_color;
				theBox.property_header_y = high_space - 10;
				overcut_properties = false;
			}else{
				overcut_properties = true;
			}
			


			if( theBox.properties_visible == true ) {
				if( (theBox.y + theBox.h) > (high_space - CONFIG_canvas_block_yoffset + offset_comp)  ) {

					theCtx.font = CONFIG_block_font;
					theCtx.textAlign = 'left';
					var propertyControls  = '';
					var ohx = theBox.x - 20;
					var ohy = theBox.property_header_y + 95; 
					
					for (var i = 0; i < numberOfProperties; i++) {
						high_space = high_space + CONFIG_block_line_space;
						theCtx.fillStyle = CONFIG_block_font_color;
						wrapTextUsingDotCutting(
							theCtx, theBox.properties[i].name, theBox.x + 5, high_space -5, bestShapeWidth) ;

						// For edit/delete icons
						theBox.properties[i].x = theBox.x + theBox.w;
						theBox.properties[i].y = high_space;
					}

					overcut_properties = false;
				}else{
					overcut_properties = true;
				}
			}
		}

	}
		
	

	// Draw Edge of this block
	theCtx.lineWidth = CONFIG_block_stroke_line_width;
	theCtx.strokeStyle = CONFIG_block_stroke_color;
	theCtx.strokeRect(theBox.x - 10 ,theBox.y,theBox.w + 20,theBox.h + 15);

	//theCtx.fillStyle = 'white';
	//theCtx.fillText( 'database  x:'+  theBox.x + ' , y:' + theBox.y + ' , w:' + theBox.w + ' ,h:' + theBox.h,
	//		theBox.x - 10,
	//		theBox.y + theBox.h + 20);
}

