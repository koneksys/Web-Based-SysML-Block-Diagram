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

function Project() {
	this.id;
	this.name;
	this.models = [];
	this.diagrams = [];
}

function ModelRepository() {
	this.id;
	this.name;
	this.models = [];
	this.notes;
	this.creator;
}


function Model() {
	this.id;
	this.name;
	this.notes;
	this.creator;
	this.creation_date;
	this.blocks = [];
	this.connections = [];
}

function ModelDisplayConfig() {
	this.id;
	this.model_id;
	this.diagram_id;
	this.block_display_configs = [];
	this.connection_display_configs = [];
}

function Diagram() {
	this.id;
	this.name;
	this.models = [];
	this.model_display_configs = [];
}

var blocks = []; 

// THE FIRST DATA ABSTRACTION DESIGN WHEN WE START PROTOTYPE DEVELOPMENT IN JULY 2013.
// WE MIGHT TO STOP USIN THIS CLASS WHNE KONEKSYS.JS IS READY TO USE.
function Block() {
	this.stereotype = '<<block>>';
	this.name = '';
	this.id = '';
	this.color = CONFIG_block_color;
	this.x = 0;
	this.y = 0;
	this.w = 0; 
	this.h = 0;
	this.init_w = 160;
	this.init_h = 180;
	this.fill = CONFIG_block_color;

	this.connections = [];
	this.conn_side1_count = 0;
	this.conn_side1_conns = [];
	this.conn_side2_count = 0;
	this.conn_side2_conns = [];
	this.conn_side3_count = 0;
	this.conn_side3_conns = [];
	this.conn_side4_count = 0;
	this.conn_side4_conns = [];
	
	this.constraints = [];
	this.operations = [];
	this.parts = [];
	this.references = [];
	this.values = [];
	this.properties = [];

	this.constraint_header_y = 0;
    this.operation_header_y = 0;
    this.part_header_y = 0;
    this.reference_header_y = 0;
    this.value_header_y = 0;
    this.property_header_y = 0;

    this.connection_toolbar_item;
    this.all_compartment_visible = true;
    
    this.constraints_visible = true;
    this.operations_visible = true;
    this.parts_visible = true;
	this.references_visible = true;
	this.values_visible = true;
	this.properties_visible = true;

	this.constraints_completely_visible_off = false;
    this.operations_completely_visible_off = false;
    this.parts_completely_visible_off = false;
	this.references_completely_visible_off = false;
	this.values_completely_visible_off = false;
	this.properties_completely_visible_off = false;
}

function BlockDisplay() {
	this.id;
	this.color = CONFIG_block_color;
	this.x = 0;
	this.y = 0;
	this.w = 200; 
	this.h = 200;
	this.fill = CONFIG_block_color;

	this.constraint_header_y = 0;
    this.operation_header_y = 0;
    this.part_header_y = 0;
    this.reference_header_y = 0;
    this.value_header_y = 0;
    this.property_header_y = 0;

    this.connection_toolbar_item;
    this.all_compartment_visible = true;
    
    this.constraints_visible = true;
    this.operations_visible = true;
    this.parts_visible = true;
	this.references_visible = true;
	this.values_visible = true;
	this.properties_visible = true;

	this.constraints_completely_visible_off = false;
    this.operations_completely_visible_off = false;
    this.parts_completely_visible_off = false;
	this.references_completely_visible_off = false;
	this.values_completely_visible_off = false;
	this.properties_completely_visible_off = false;
}

function connection_toolbar_item() {
	this.owner_block ;
	this.x = 0;
	this.y = 0;
}

var boxesIncrementalId = 0;

var connectionsIncrementalId = 0;

var connections = []; 

// See SysML spec p.57

//Dependency
//ReferenceAssociation
//PartAssociation
//SharedAssociation
//MultibranchPart Association
//MultibranchShared Association
//Generalization
//Multibranch Generalization
//GeneralizationSet
//BlockNamespace Containment
//ParticipantProperty
//ConnectorProperty

function Connection(theBlock1 , theBlock2, theType) {
	this.id;
	this.name;
	this.block1 = theBlock1;
	this.start_x;
	this.start_y;
	this.block2 = theBlock2;
	this.end_x;
	this.end_y;
	this.text_x;
	this.text_y;
	this.type = theType;
	this.src_side;
}

var side1_conns_db = [];
var side2_conns_db = [];
var side3_conns_db = [];
var side4_conns_db = [];

function clearConnectionAlignmentDatabase(){
	side1_conns_db = [];
	side2_conns_db = [];
	side3_conns_db = [];
	side4_conns_db = [];

	var numberOfBlocks = blocks.length;
	for (var i = 0; i < numberOfBlocks; i++) {
		blocks[i].conn_side1_count = 0;
		blocks[i].conn_side1_conns = [];
		blocks[i].conn_side2_count = 0;
		blocks[i].conn_side2_conns = [];
		blocks[i].conn_side3_count = 0;
		blocks[i].conn_side3_conns = [];
		blocks[i].conn_side4_count = 0;
		blocks[i].conn_side4_conns = [];
	}
}

function calculateConnectionPosition(){
	var numberOfConnections = connections.length;
	for (var i = 0; i < numberOfConnections; i++) {
		var side = checkConnectionPosition(connections[i].block1, connections[i].block2);
		if(side == 1){
			connections[i].block1.conn_side1_count ++;
			connections[i].block1.conn_side1_conns.push(connections[i]);
			//connections[i].block2.conn_side1_count ++;
			//connections[i].block2.conn_side1_conns.push(connections[i]);
		}else if(side == 2){
			connections[i].block1.conn_side2_count ++;
			connections[i].block1.conn_side2_conns.push(connections[i]);
			//connections[i].block2.conn_side2_count ++;
			//connections[i].block2.conn_side2_conns.push(connections[i]);
		}else if(side == 3){
			connections[i].block1.conn_side3_count ++;
			connections[i].block1.conn_side3_conns.push(connections[i]);
			//connections[i].block2.conn_side3_count ++;
			//connections[i].block2.conn_side3_conns.push(connections[i]);
		}else if(side == 4){
			connections[i].block1.conn_side4_count ++;
			connections[i].block1.conn_side4_conns.push(connections[i]);
			//connections[i].block2.conn_side4_count ++;
			//connections[i].block2.conn_side4_conns.push(connections[i]);
		}
	}
	
}

function checkConnectionPosition(theBlock1,theBlock2){
		var b1 = theBlock1;
		var b2 = theBlock2;
		var at_side1 = ((b2.x + b2.w) < b1.x); 
		var at_side3 = (b2.x > (b1.x + b1.w)) ; 
		var might_at_side2_or_side4 = (b2.x > b1.x + 10) && (b2.x < (b1.x + b1.w + 10));
		var at_side2 = ( b1.y > (b2.y + b2.h) );
		var at_side4 = ( b1.y < (b2.y + b2.h) );
		if(at_side1) return 1;
		else if(at_side2) return 2;
		else if(at_side3) return 3;
		else if(at_side4) return 4;
}

function calculateBiDirectionalLinkIndex(theCurrentSide, theBlock){
	var n = connections.length;
	for (var i = 0; i < n; i++) {
		if(connections[i].block2.id == theBlock.id){
			var side = checkConnectionPosition(connections[i].block2 ,theBlock);
			if(side == 1 && theCurrentSide == 3){
				connections[i].block2.conn_side3_count ++;
			}

			if(side == 3 && theCurrentSide == 1){
				connections[i].block2.conn_side1_count ++;
			}
			
		}
	}
}

function getConnectionIndexOnSide1(theBlock, theConnection){
	var count = -1;
	var n = theBlock.conn_side1_conns.length;
	for (var i = 0; i < n; i++) {
		if(theBlock.conn_side1_conns[i].id == theConnection.id){
			return i;
		}
	}
	return count;
}

function getConnectionIndexOnSide2(theBlock, theConnection){
	var count = -1;
	var n = theBlock.conn_side2_conns.length;
	for (var i = 0; i < n; i++) {
		if(theBlock.conn_side2_conns[i].id == theConnection.id){
			return i;
		}
	}
	return count;
}

function getConnectionIndexOnSide3(theBlock, theConnection){
	var count = -1;
	var n = theBlock.conn_side3_conns.length;
	for (var i = 0; i < n; i++) {
		if(theBlock.conn_side3_conns[i].id == theConnection.id){
			return i;
		}
	}
	return count;
}

function getConnectionIndexOnSide4(theBlock, theConnection){
	var count = -1;
	var n = theBlock.conn_side4_conns.length;
	for (var i = 0; i < n; i++) {
		if(theBlock.conn_side4_conns[i].id == theConnection.id){
			return i;
		}
	}
	return count;
}


Connection.prototype.render = function(theCtx){

	var header_size = 20;
	// Setup the line 
	theCtx.font = CONFIG_block_font;
	theCtx.fillStyle = CONFIG_connection_font_color;
	// Draw the line  block1.x/y to block2.x/y

	theCtx.strokeStyle = CONFIG_connection_stroke_color;
	theCtx.lineWidth = CONFIG_connection_stroke_line_width;		
	this.start_x = this.block1.x + this.block1.w / 2;
	this.start_y = this.block1.y + this.block1.h / 2;
	this.end_x = this.block2.x + this.block2.w / 2;
	this.end_y = this.block2.y + this.block2.h / 2;		

	// Calculate slope 
	var m = (this.end_y - this.start_y) / (this.end_x - this.start_x) ;

	// Center the text on the line
	var cxline = (this.start_x + this.end_x) / 2;
	var cyline = (this.start_y + this.end_y) / 2 - 5;
	var textWidth = theCtx.measureText(this.name).width;
	this.text_x = cxline - (textWidth / 2);
	this.text_y = cyline;
	//theCtx.fillText( this.name , this.text_x , this.text_y );

	// Calculate the b constaint regarding slope equation
	var b = cyline - (m * cxline);
	//ctx_top.fillRect(cxline, (m * cxline) + b, 10 ,10);

	var px1 = cxline;
	var px2 = cxline;
	// This if block is required because sometimes the block2 is located at the left side of the block1.
	
	//    2
	// 1     3
	//    4
	var py1 = (m * cxline) + b;
	var py2 = (m * cxline) + b;

	
	var px1_is_at_side1 = px1 < this.block1.x; 
	var px1_is_at_side3 = px1 > (this.block1.x + this.block1.w); 
	var px1_might_at_side2_and_4 = (px1 > this.block1.x + 10) && (px1 < (this.block1.x + this.block1.w + 10));
	var px1_is_at_side2 = px1_might_at_side2_and_4 && ( this.block1.y > this.block2.y );
	var px1_is_at_side4 = px1_might_at_side2_and_4 && ( this.block1.y < this.block2.y );
	

	/**
	var checkside = checkConnectionPosition( this.block1 ,this.block2 );
	px1_is_at_side1 = (checkside == 1) ? true : false;
	px1_is_at_side2 = (checkside == 2) ? true : false;
	px1_is_at_side3 = (checkside == 3) ? true : false;
	px1_is_at_side4 = (checkside == 4) ? true : false;
	*/

	var hx1 = 0;
	var hy1 = 0;
	var hx2 = 0;
	var hy2 = 0;

	var isD_or_G_line = this.connection_type == 'dependency' || this.connection_type == 'generalization';
	if(px1_is_at_side1){

		py1 = this.block1.y + (this.block1.h / 2);
		py2 = this.block2.y + (this.block2.h / 2);

		if( isD_or_G_line ){
			px1 =  this.block1.x - (header_size / 2);
			px2 =  this.block2.x + this.block2.w + (header_size / 2);
		}else{
			px1 =  this.block1.x - (header_size + (header_size / 2));
			px2 =  this.block2.x + this.block2.w + (header_size + (header_size / 2));
		}

		hx1 = px1;
		hy1 = py1;
		hx2 = px2 - header_size;
		hy2 = py2;
		
	// side 3
	}else if(px1_is_at_side3){

		py1 = this.block1.y + (this.block1.h / 2);
		py2 = this.block2.y + (this.block2.h / 2);

		if( isD_or_G_line ){
			px1 =  this.block1.x + this.block1.w + (header_size / 2);
			px2 =  this.block2.x - (header_size / 2);
		}else{
			px1 =  this.block1.x + this.block1.w + (header_size + (header_size / 2));
			px2 =  this.block2.x - (header_size + (header_size / 2));
		}

		hx1 = px1 - header_size;
		hy1 = py1;
		hx2 = px2;
		hy2 = py2;
	
	// side 2	
	}else if(px1_is_at_side2){

		if( isD_or_G_line ){
			py1 = this.block1.y - (header_size / 2);
			py2 = this.block2.y + this.block2.h + (header_size / 2) - 5;
		}else{
			py1 = this.block1.y - (header_size + (header_size / 2));
			py2 = this.block2.y + this.block2.h + (header_size + (header_size / 2));
		}
		
		px1 = this.block1.x + (this.block1.w / 2);
		px2 = this.block2.x + (this.block2.w / 2);

		hx1 = px1 - (header_size / 2);
		hy1 = py1 + (header_size / 2);
		hx2 = px2 - (header_size / 2);
		hy2 = py2 - (header_size / 2) - 5;

	// side 4
	}else if(px1_is_at_side4){
		if( isD_or_G_line ){
			py1 = this.block1.y + this.block1.h + (header_size / 2) - 5;
			py2 = this.block2.y - (header_size / 2);
		}else{
			py1 = this.block1.y + this.block1.h + (header_size + (header_size / 2));
			py2 = this.block2.y - (header_size + (header_size / 2));
		}
	
		px1 = this.block1.x + (this.block1.w / 2);
		px2 = this.block2.x + (this.block2.w / 2);

		hx1 = px1 - (header_size / 2);
		hy1 = py1 - (header_size / 2) - 5;
		hx2 = px2 - ( header_size / 2);
		hy2 = py2 + (header_size / 2);

	}

	var px1_start = px1;
	var py1_end = py1 + header_size / 2;
	var px2_start = px2;
	var py2_end = py2 + header_size / 2;

	theCtx.fillStyle = CONFIG_connection_font_color;
	theCtx.font = CONFIG_connection_font

	theCtx.strokeStyle = CONFIG_connection_stroke_color;
	if(this.type == 'dependency'){
		var line=new Line(px1_start,py1_end,px2_start,py2_end);
    	line.drawDependency(this, theCtx,px1_is_at_side1,px1_is_at_side2,px1_is_at_side3,px1_is_at_side4);

	}else if(this.type == 'generalization'){
      	var line=new Line(px1_start,py1_end,px2_start,py2_end);
    	line.drawGeneralization(this,theCtx,px1_is_at_side1,px1_is_at_side2,px1_is_at_side3,px1_is_at_side4);
	
	}else if(this.type == 'partassociation'){
      	var line=new Line(px1_start,py1_end,px2_start,py2_end);
    	line.drawPartAssociation(this, theCtx,px1_is_at_side1,px1_is_at_side2,px1_is_at_side3,px1_is_at_side4);
	
	}else if(this.type == 'sharedassociation'){
      	var line=new Line(px1_start,py1_end,px2_start,py2_end);
    	line.drawSharedAssociation(this, theCtx,px1_is_at_side1,px1_is_at_side2,px1_is_at_side3,px1_is_at_side4);

	}else if(this.type == 'association'){
      	var line=new Line(px1_start,py1_end,px2_start,py2_end);
    	line.drawAssociation(this, theCtx,px1_is_at_side1,px1_is_at_side2,px1_is_at_side3,px1_is_at_side4);
	}
};

function setTheBestXForMultipleConnections( side_count, cindex, x1, x2 , connectionObj){
	//console.info('-------');
	//console.info('side_count: ' + side_count);
	//console.info('cindex: ' + cindex);
	//console.info('x1: ' + x1);
	//console.info('x2: ' + x2);
	var bestX = [];
	if(side_count == 1){

				bestX[0] = connectionObj.block1.x + (connectionObj.block1.w / 2);
				bestX[1] = connectionObj.block2.x + (connectionObj.block2.w / 2);
	    
			}else if(side_count == 2){
				switch (cindex) {
			      case 1:
			      	bestX[0] = connectionObj.block1.x + (connectionObj.block1.w / 4);
					bestX[1] = connectionObj.block2.x + (connectionObj.block2.w / 4);
			        break;
			      case 2:
			      	bestX[0] = connectionObj.block1.x + (connectionObj.block1.w / 4) * 3;
					bestX[1] = connectionObj.block2.x + (connectionObj.block2.w / 4) * 3;
			        break;
			    }
			}else if(side_count == 3){
				switch (cindex) {
			      case 1:
			      	bestX[0] = connectionObj.block1.x + (connectionObj.block1.w / 6);
					bestX[1] = connectionObj.block2.x + (connectionObj.block2.w / 6);
			        break;
			      case 2:
			      	bestX[0] = connectionObj.block1.x + (connectionObj.block1.w / 6) * 3;
					bestX[1] = connectionObj.block2.x + (connectionObj.block2.w / 6) * 3;
			        break;
			      case 3:
			      	bestX[0] = connectionObj.block1.x + (connectionObj.block1.w / 6) * 5;
					bestX[1] = connectionObj.block2.x + (connectionObj.block2.w / 6) * 5;
			        break;
			    }

			}else if(side_count == 4){
				switch (cindex) {
			      case 1:
			      	bestX[0] = connectionObj.block1.x + (connectionObj.block1.w / 8);
					bestX[1] = connectionObj.block2.x + (connectionObj.block2.w / 8);
			        break;
			      case 2:
			      	bestX[0] = connectionObj.block1.x + (connectionObj.block1.w / 8) * 3;
					bestX[1] = connectionObj.block2.x + (connectionObj.block2.w / 8) * 3;
			        break;
			      case 3:
			      	bestX[0] = connectionObj.block1.x + (connectionObj.block1.w / 8) * 5;
					bestX[1] = connectionObj.block2.x + (connectionObj.block2.w / 8) * 5;
			        break;
			      case 4:
			      	bestX[0] = connectionObj.block1.x + (connectionObj.block1.w / 8) * 7;
					bestX[1] = connectionObj.block2.x + (connectionObj.block2.w / 8) * 7;
			        break;
			    }

			}

	return bestX;
}


function setTheBestYForMultipleConnections( side_count, cindex, y1, y2 , connectionObj){
	//console.info('-------');
	//console.info('side_count: ' + side_count);
	//console.info('cindex: ' + cindex);
	//console.info('y1: ' + y1);
	//console.info('y2: ' + y2);
	var bestY = [];
	if(side_count == 1){

				bestY[0] = connectionObj.block1.y + (connectionObj.block1.h / 2);
				bestY[1] = connectionObj.block2.y + (connectionObj.block2.h / 2);
	    
			}else if(side_count == 2){
				switch (cindex) {
			      case 1:
			      	bestY[0] = connectionObj.block1.y + (connectionObj.block1.h / 4);
					bestY[1] = connectionObj.block2.y + (connectionObj.block2.h / 4);
			        break;
			      case 2:
			      	bestY[0] = connectionObj.block1.y + (connectionObj.block1.h / 4) * 3;
					bestY[1] = connectionObj.block2.y + (connectionObj.block2.h / 4) * 3;
			        break;
			    }
			}else if(side_count == 3){
				switch (cindex) {
			      case 1:
			      	bestY[0] = connectionObj.block1.y + (connectionObj.block1.h / 6);
					bestY[1] = connectionObj.block2.y + (connectionObj.block2.h / 6);
			        break;
			      case 2:
			      	bestY[0] = connectionObj.block1.y + (connectionObj.block1.h / 6) * 3;
					bestY[1] = connectionObj.block2.y + (connectionObj.block2.h / 6) * 3;
			        break;
			      case 3:
			      	bestY[0] = connectionObj.block1.y + (connectionObj.block1.h / 6) * 5;
					bestY[1] = connectionObj.block2.y + (connectionObj.block2.h / 6) * 5;
			        break;
			    }

			}else if(side_count == 4){
				switch (cindex) {
			      case 1:
			      	bestY[0] = connectionObj.block1.y + (connectionObj.block1.h / 8);
					bestY[1] = connectionObj.block2.y + (connectionObj.block2.h / 8);
			        break;
			      case 2:
			      	bestY[0] = connectionObj.block1.y + (connectionObj.block1.h / 8) * 3;
					bestY[1] = connectionObj.block2.y + (connectionObj.block2.h / 8) * 3;
			        break;
			      case 3:
			      	bestY[0] = connectionObj.block1.y + (connectionObj.block1.h / 8) * 5;
					bestY[1] = connectionObj.block2.y + (connectionObj.block2.h / 8) * 5;
			        break;
			      case 4:
			      	bestY[0] = connectionObj.block1.y + (connectionObj.block1.h / 8) * 7;
					bestY[1] = connectionObj.block2.y + (connectionObj.block2.h / 8) * 7;
			        break;
			    }

			}

	return bestY;
}

function Line(x1,y1,x2,y2){
        this.x1=x1;
        this.y1=y1;
        this.x2=x2;
        this.y2=y2;
}

Line.prototype.drawDependency=function(
		connectionObj,
		ctx,
		px1_is_at_side1,
		px1_is_at_side2,
		px1_is_at_side3,
		px1_is_at_side4){

        ctx.strokeStyle = CONFIG_connection_stroke_color;
       	ctx.lineWidth=CONFIG_focus_connection_line_width;

        initDashing(ctx) ;
		ctx.dashStyle = [5,5] ;
		ctx.beginPath();

		if(px1_is_at_side1) {
			
			var cindex = getConnectionIndexOnSide1(connectionObj.block1, connectionObj);
			cindex++;
			var side_count = connectionObj.block1.conn_side1_count;

			var cindex2 = getConnectionIndexOnSide1(connectionObj.block2, connectionObj);
			cindex2++;
			var side_count2 = connectionObj.block2.conn_side1_count;


			var bestY = setTheBestYForMultipleConnections( side_count, cindex, this.y1, this.y2 , connectionObj);
			this.y1 = bestY[0];
			this.y2 = bestY[1];

			//this.y1 = this.y1 + 20 * cindex - (10 * side_count);
			//this.y2 = this.y2 + 20 * cindex2 - (10 * side_count2);
			
			connectionObj.text_x =  this.x2 + 10;
			connectionObj.text_y = this.y2 - 5;
			ctx.fillStyle = CONFIG_connection_font_color;
			ctx.fillText(connectionObj.name, connectionObj.text_x, connectionObj.text_y );
			var connectionControls  = '';
			ex = this.x1 - 20 + CONFIG_canvas_xoffset; 
			ey = this.y1 + 80 + CONFIG_canvas_yoffset; 
			dx = this.x1 - 40 + CONFIG_canvas_xoffset;
			dy = this.y1 + 80 + CONFIG_canvas_yoffset;
			connectionControls = connectionControls + '<a href="javascript:openEditConnectionDialogNoJQueryMobile(\'' + connectionObj.id + '\',\''+ connectionObj.name + '\',\'operation\');"><img src="img/edit.png" width="15" style="z-index: 6;position:absolute;top:' + ey + 'px;left:' + ex +'px;font-size:13px;"/></a>'
				+ '<a href="javascript:deleteConnection(\'' + connectionObj.id + '\');"><img src="img/delete.png" width="15" style="z-index: 6;position:absolute;top:' + dy + 'px;left:' + dx +'px;font-size:13px;"/></a>';
			$('#connectionControls').append( connectionControls );

			if(CONFIG_connection_line_display == 'orthogonal'){
				if(connectionObj.block1.y > connectionObj.block2.y){
					var mid = ((this.x2 - this.x1) / 2) + 20 + (20 * cindex); 
					ctx.dashedLine(
						this.x1 + 20, this.y1, 
						this.x1 - 20 + mid, this.y1 );
					ctx.dashedLine(
						this.x1 - 20 + mid, this.y1, 
						this.x1 - 20 + mid + 0.2, this.y2);
					ctx.dashedLine(
						this.x1 - 20 + mid, this.y2, 
						this.x2 - 20, this.y2 ); 
				}else if(connectionObj.block1.y < connectionObj.block2.y){
					var mid = ((this.x2 - this.x1) / 2) + 20 + (20 * cindex); 
					ctx.dashedLine(
						this.x1 + 20, this.y1, 
						this.x1 - 20 + mid, this.y1 );
					ctx.dashedLine(
						this.x1 - 20 + mid, this.y2, 
						this.x1 - 20 + mid + 0.2, this.y1);
					ctx.dashedLine(
						this.x1 - 20 + mid, this.y2, 
						this.x2 - 20, this.y2 ); 
				}else if(connectionObj.block1.y == connectionObj.block2.y){
					ctx.dashedLine(this.x1 + 20, this.y1, this.x2 - 20, this.y2);
				}
				ctx.stroke();
				this.drawDependencyHead(ctx,this.x2 - 20,this.y2,-1.5707963267948966);
			}else{
				ctx.dashedLine(this.x1 + 20, this.y1, this.x2 - 20, this.y2);
				ctx.stroke();
				var endRadians=Math.atan((this.y2-this.y1)/(this.x2-20-this.x1));
	        	endRadians+=((this.x2-20>this.x1)?90:-90)*Math.PI/180;
				this.drawDependencyHead(ctx,this.x2 - 20,this.y2,endRadians);
			}	

		}else if(px1_is_at_side2) {
			var cindex = getConnectionIndexOnSide2(connectionObj.block1, connectionObj);
			cindex++;
			var side_count = connectionObj.block1.conn_side2_count;

			var cindex2 = getConnectionIndexOnSide2(connectionObj.block2, connectionObj);
			cindex2++;
			var side_count2 = connectionObj.block2.conn_side2_count;

			var bestX = setTheBestXForMultipleConnections( side_count, cindex, this.x1, this.x2 , connectionObj);
			this.x1 = bestX[0];
			this.x2 = bestX[1];

			//this.x1 = this.x1 + 20 * cindex - (10 * side_count);
			//this.x2 = this.x2 + 20 * cindex2 - (10 * side_count2);

			connectionObj.text_x = (this.x1  + this.x2  ) / 2 - 100;
			connectionObj.text_y = this.y2 - 5;
			ctx.fillStyle = CONFIG_connection_font_color;
			ctx.save();
 			ctx.translate(this.x2 + 10, this.y2);
 			ctx.rotate(Math.PI/2);
			ctx.fillText(connectionObj.name, 0, 0 );
			ctx.restore();
			var connectionControls  = '';
			ex = this.x1 + 7 + CONFIG_canvas_xoffset; 
			ey = this.y1 + 60 + CONFIG_canvas_yoffset; 
			dx = this.x1 + 7 +  CONFIG_canvas_xoffset;
			dy = this.y1 + 40 + CONFIG_canvas_yoffset;
			connectionControls = connectionControls + '<a href="javascript:openEditConnectionDialogNoJQueryMobile(\'' + connectionObj.id + '\',\''+ connectionObj.name + '\',\'operation\');"><img src="img/edit.png" width="15" style="z-index: 6;position:absolute;top:' + ey + 'px;left:' + ex +'px;font-size:13px;"/></a>'
				+ '<a href="javascript:deleteConnection(\'' + connectionObj.id + '\');"><img src="img/delete.png" width="15" style="z-index: 6;position:absolute;top:' + dy + 'px;left:' + dx +'px;font-size:13px;"/></a>';
			$('#connectionControls').append( connectionControls );

			if(CONFIG_connection_line_display == 'orthogonal'){
				if(connectionObj.block1.x > connectionObj.block2.x){
					//console.debug('21 side_count= ' + side_count + ' cindex=' + cindex);
					var mid = ((this.y1 - this.y2) / 2) + (10 * cindex ); 
					ctx.dashedLine(
						this.x1, this.y1 + 20, 
						this.x1 + 0.2, this.y1 - mid);
					ctx.dashedLine(
						this.x1 + 0.2, this.y1 - mid ,
						this.x2, this.y1 - mid);
					ctx.dashedLine(
						this.x2, this.y1 - mid, 
						this.x2 + 0.2, this.y2 - 25); 
					ctx.stroke();
					this.drawDependencyHead(ctx,this.x2,this.y2 - 25,0);
				}else if(connectionObj.block1.x < connectionObj.block2.x){
					//console.debug('22 side_count= ' + side_count + ' cindex=' + cindex);
					var mid = ((this.y1 - this.y2) / 2) + (10 * cindex ); 
					ctx.dashedLine(
						this.x1, this.y1 + 20, 
						this.x1 + 0.2, this.y1 - mid);
					ctx.dashedLine(
						this.x1 + 0.2, this.y1 - mid ,
						this.x2, this.y1 - mid);
					ctx.dashedLine(
						this.x2, this.y1 - mid, 
						this.x2 + 0.2, this.y2 - 25); 
					ctx.stroke();
					this.drawDependencyHead(ctx,this.x2,this.y2 - 25,0);
				}else{
					//console.debug('23 side_count= ' + side_count + ' cindex=' + cindex);
					ctx.dashedLine(this.x1, this.y1 + 20, this.x1 + 0.2, this.y2 - 25);
					ctx.stroke();
					this.drawDependencyHead(ctx,this.x2,this.y2 - 25,0);
				}
			}else{
				ctx.dashedLine(this.x1, this.y1 + 20, this.x2, this.y2 - 25);
	      		ctx.stroke();
	      		var endRadians=Math.atan((this.y2-20-this.y1)/(this.x2-this.x1));
	        	endRadians+=((this.x2>this.x1)?90:-90)*Math.PI/180;
	      		this.drawDependencyHead(ctx,this.x2, this.y2 - 25,endRadians);
			}

		}else if(px1_is_at_side3) {

			var cindex = getConnectionIndexOnSide3(connectionObj.block1, connectionObj);
			cindex++;
			var side_count = connectionObj.block1.conn_side3_count;

			//console.info('connectionObj.block1.conn_side3_count: ' + connectionObj.block1.conn_side3_count);
			var cindex2 = getConnectionIndexOnSide3(connectionObj.block2, connectionObj);
			cindex2++;
			var side_count2 = connectionObj.block2.conn_side3_count;

			var bestY = setTheBestYForMultipleConnections( side_count, cindex, this.y1, this.y2 , connectionObj);
			this.y1 = bestY[0];
			this.y2 = bestY[1];
			
			//this.y1 = this.y1 + 20 * cindex - (10 * side_count);
			//this.y2 = this.y2 + 20 * cindex2 - (10 * side_count2);


			connectionObj.text_x = this.x1 - 5 ;
			connectionObj.text_y = this.y1 - 5;
			ctx.fillStyle = CONFIG_connection_font_color;
			ctx.fillText(connectionObj.name, connectionObj.text_x, connectionObj.text_y );
			var connectionControls  = '';
			ex = this.x1 + 30 + CONFIG_canvas_xoffset; 
			ey = this.y1 + 80 + CONFIG_canvas_yoffset; 
			dx = this.x1 + 50 + CONFIG_canvas_xoffset;
			dy = this.y1 + 80 + CONFIG_canvas_yoffset; 
			connectionControls = connectionControls + '<a href="javascript:openEditConnectionDialogNoJQueryMobile(\'' + connectionObj.id + '\',\''+ connectionObj.name + '\',\'operation\');"><img src="img/edit.png" width="15" style="z-index: 6;position:absolute;top:' + ey + 'px;left:' + ex +'px;font-size:13px;"/></a>'
				+ '<a href="javascript:deleteConnection(\'' + connectionObj.id + '\');"><img src="img/delete.png" width="15" style="z-index: 6;position:absolute;top:' + dy + 'px;left:' + dx +'px;font-size:13px;"/></a>';
			$('#connectionControls').append( connectionControls );

			if(CONFIG_connection_line_display == 'orthogonal'){
				if(connectionObj.block1.y > connectionObj.block2.y){
					var mid = ((this.x2 - this.x1) / 2) + 20 + (20 * cindex);  
					ctx.dashedLine(
						this.x1 - 20 , this.y1, 
						this.x1 - 20 + mid, this.y1 );
					ctx.dashedLine(
						this.x1 - 20 + mid, this.y1, 
						this.x1 - 20 + mid + 0.2, this.y2);
					ctx.dashedLine(
						this.x1 - 20 + mid, this.y2, 
						this.x2 + 20, this.y2 ); 
				}else if(connectionObj.block1.y < connectionObj.block2.y){
					var mid = ((this.x2 - this.x1) / 2) + 20 + (20 * cindex); 
					ctx.dashedLine(
						this.x1 - 20 , this.y1, 
						this.x1 - 20 + mid, this.y1 );
					ctx.dashedLine(
						this.x1 - 20 + mid, this.y2, 
						this.x1 - 20 + mid + 0.2, this.y1);
					ctx.dashedLine(
						this.x1 - 20 + mid, this.y2, 
						this.x2 + 20, this.y2 ); 
				}else if(connectionObj.block1.y == connectionObj.block2.y){
					ctx.dashedLine(this.x1 - 20 , this.y1, this.x2 + 20, this.y2);
				}
				ctx.stroke();
				this.drawDependencyHead(ctx,this.x2 + 20,this.y2,1.5707963267948966);
			}else{
				

	      		ctx.dashedLine(this.x1 - 20,this.y1,this.x2 + 20,this.y2);
		        ctx.stroke();
		        var endRadians=Math.atan((this.y2-this.y1)/(this.x2+20-this.x1));
	        	endRadians+=((this.x2+20>this.x1)?90:-90)*Math.PI/180;
		        this.drawDependencyHead(ctx,this.x2 + 20,this.y2,endRadians);
			}	

		}else if(px1_is_at_side4) {
			var cindex = getConnectionIndexOnSide4(connectionObj.block1, connectionObj);
			cindex++;
			var side_count = connectionObj.block1.conn_side4_count;

			var cindex2 = getConnectionIndexOnSide4(connectionObj.block2, connectionObj);
			cindex2++;
			var side_count2 = connectionObj.block2.conn_side4_count;


			var bestX = setTheBestXForMultipleConnections( side_count, cindex, this.x1, this.x2 , connectionObj);
			this.x1 = bestX[0];
			this.x2 = bestX[1];
			
			//this.x1 = this.x1 + 20 * cindex - (10 * side_count);
			//this.x2 = this.x2 + 20 * cindex2 - (10 * side_count2);

			connectionObj.text_x = (this.x1  + this.x2  ) / 2 - 50;
			connectionObj.text_y = this.y2 - 5;
			ctx.fillStyle = CONFIG_connection_font_color;
			ctx.save();
 			ctx.translate(this.x2 - 5 , this.y2);
 			ctx.rotate(-Math.PI/2);
			ctx.fillText(connectionObj.name, 0, 0 );
			ctx.restore();
			var connectionControls  = '';
			ex = this.x1 + 7 + CONFIG_canvas_xoffset; ;
			ey = this.y1 + 90 + CONFIG_canvas_yoffset; 
			dx = this.x1 + 7 + CONFIG_canvas_xoffset; ;
			dy = this.y1 + 110 + CONFIG_canvas_yoffset; 
			connectionControls = connectionControls + '<a href="javascript:openEditConnectionDialogNoJQueryMobileNoJQueryMobile(\'' + connectionObj.id + '\',\''+ connectionObj.name + '\',\'operation\');"><img src="img/edit.png" width="15" style="z-index: 6;position:absolute;top:' + ey + 'px;left:' + ex +'px;font-size:13px;"/></a>'
				+ '<a href="javascript:deleteConnection(\'' + connectionObj.id + '\');"><img src="img/delete.png" width="15" style="z-index: 6;position:absolute;top:' + dy + 'px;left:' + dx +'px;font-size:13px;"/></a>';
			$('#connectionControls').append( connectionControls );

			if(CONFIG_connection_line_display == 'orthogonal'){
				if(connectionObj.block1.x > connectionObj.block2.x){
					var mid = ((this.y2 - this.y1) / 2)+ (10 * cindex ); 
					ctx.dashedLine(
						this.x1, this.y1 - 25, 
						this.x1 + 0.2, this.y1 + mid);
					ctx.dashedLine(
						this.x1 + 0.2, this.y1 + mid ,
						this.x2, this.y1 + mid);
					ctx.dashedLine(
						this.x2, this.y1 + mid, 
						this.x2 + 0.2, this.y2  + 20); 
				}else if(connectionObj.block1.x < connectionObj.block2.x){
					var mid = ((this.y2 - this.y1) / 2)+ (10 * cindex ); 
					ctx.dashedLine(
						this.x1, this.y1 - 25, 
						this.x1 + 0.2, this.y1 + mid);
					ctx.dashedLine(
						this.x1 + 0.2, this.y1 + mid ,
						this.x2, this.y1 + mid);
					ctx.dashedLine(
						this.x2, this.y1 + mid, 
						this.x2 + 0.2, this.y2 + 20); 
				}else{
					ctx.dashedLine(this.x1, this.y1 - 25, this.x1 + 0.2, this.y2 + 20);
					//console.debug('this.x1='+this.x1);
				}
				ctx.stroke();
				this.drawDependencyHead(ctx,this.x2,this.y2 + 20,110);

			}else{
				ctx.dashedLine(this.x1, this.y1 - 25, this.x2, this.y2 + 20);
	      		ctx.stroke();
	      		var endRadians=Math.atan((this.y2+20-this.y1)/(this.x2-this.x1));
	        	endRadians+=((this.x2>this.x1)?90:-90)*Math.PI/180;
	      		this.drawDependencyHead(ctx,this.x2,this.y2 + 20,endRadians);
	      		//console.debug(endRadians);
			}	

			
		}
      	
}

Line.prototype.drawDependencyHead=function(ctx,x,y,radians){
    ctx.save();
    ctx.beginPath();
    ctx.translate(x,y);
    ctx.rotate(radians);
    ctx.moveTo(0,0);
    ctx.lineTo(8,15);
    ctx.moveTo(0,0);
    ctx.lineTo(-8,15);
    ctx.closePath();
    ctx.restore();
    ctx.stroke();
}

Line.prototype.drawGeneralization=function(
	connectionObj,
	ctx,
	px1_is_at_side1,
	px1_is_at_side2,
	px1_is_at_side3,
	px1_is_at_side4){

        // arbitrary styling
        ctx.strokeStyle = CONFIG_connection_stroke_color;
        ctx.fillStyle='white';
        ctx.lineWidth=CONFIG_focus_connection_line_width;
		ctx.beginPath();

        if(px1_is_at_side1) {
        	var cindex = getConnectionIndexOnSide1(connectionObj.block1, connectionObj);
			cindex++;
			var side_count = connectionObj.block1.conn_side1_count;

			var cindex2 = getConnectionIndexOnSide1(connectionObj.block2, connectionObj);
			cindex2++;
			var side_count2 = connectionObj.block2.conn_side1_count;

			this.y1 = this.y1 + 20 * cindex - (10 * side_count);
			this.y2 = this.y2 + 20 * cindex2 - (10 * side_count2);

			
			connectionObj.text_x =  this.x2 + 10;
			connectionObj.text_y = this.y2 - 5;
			ctx.fillStyle = CONFIG_connection_font_color;
			ctx.fillText(connectionObj.name, connectionObj.text_x, connectionObj.text_y );
			var connectionControls  = '';
			ex = this.x1 - 20 + CONFIG_canvas_xoffset; 
			ey = this.y1 + 80 + CONFIG_canvas_yoffset; 
			dx = this.x1 - 40 + CONFIG_canvas_xoffset;
			dy = this.y1 + 80 + CONFIG_canvas_yoffset;
			connectionControls = connectionControls + '<a href="javascript:openEditConnectionDialogNoJQueryMobile(\'' + connectionObj.id + '\',\''+ connectionObj.name + '\',\'operation\');"><img src="img/edit.png" width="15" style="z-index: 6;position:absolute;top:' + ey + 'px;left:' + ex +'px;font-size:13px;"/></a>'
				+ '<a href="javascript:deleteConnection(\'' + connectionObj.id + '\');"><img src="img/delete.png" width="15" style="z-index: 6;position:absolute;top:' + dy + 'px;left:' + dx +'px;font-size:13px;"/></a>';
			$('#connectionControls').append( connectionControls );

        	if(CONFIG_connection_line_display == 'orthogonal'){				
				if(connectionObj.block1.y > connectionObj.block2.y){
					var mid = ((this.x2 - this.x1) / 2) + 20 + (20 * cindex ); 
					ctx.moveTo(this.x1 + 20, this.y1);
		        	ctx.lineTo(this.x1 - 20 + mid, this.y1);
					ctx.moveTo(this.x1 - 20 + mid, this.y1);
		        	ctx.lineTo(this.x1 - 20 + mid + 0.2, this.y2);
					ctx.moveTo(this.x1 - 20 + mid, this.y2);
		        	ctx.lineTo(this.x2 - 20, this.y2 );
				}else if(connectionObj.block1.y < connectionObj.block2.y){
					var mid = ((this.x2 - this.x1) / 2) + 20 + (20 * cindex );  
					ctx.moveTo(this.x1 + 20, this.y1);
		        	ctx.lineTo(this.x1 - 20 + mid, this.y1 );
		        	ctx.moveTo(this.x1 - 20 + mid, this.y2);
		        	ctx.lineTo(this.x1 - 20 + mid + 0.2, this.y1);
					ctx.moveTo(this.x1 - 20 + mid, this.y2);
		        	ctx.lineTo(this.x2 - 20, this.y2);
				}else {
					ctx.moveTo(this.x1 + 20,this.y1);
		        	ctx.lineTo(this.x2 - 20,this.y2);
				}
				ctx.stroke();
				this.drawGeneralizationHead(ctx,this.x2 - 20,this.y2,-1.5707963267948966);
			}else{
				ctx.moveTo(this.x1 + 20,this.y1);
		        ctx.lineTo(this.x2 - 20,this.y2);
		        ctx.stroke();
		        var endRadians=Math.atan((this.y2-this.y1)/(this.x2-20-this.x1));
	        	endRadians+=((this.x2-20>this.x1)?90:-90)*Math.PI/180;
		        this.drawGeneralizationHead(ctx,this.x2 - 20,this.y2,endRadians);
			}	
        	
        }else if(px1_is_at_side2) {
        	var cindex = getConnectionIndexOnSide2(connectionObj.block1, connectionObj);
			cindex++;
			var side_count = connectionObj.block1.conn_side2_count;

			var cindex2 = getConnectionIndexOnSide2(connectionObj.block2, connectionObj);
			cindex2++;
			var side_count2 = connectionObj.block2.conn_side2_count;

			this.x1 = this.x1 + 20 * cindex - (10 * side_count);
			this.x2 = this.x2 + 20 * cindex2 - (10 * side_count2);

			connectionObj.text_x = (this.x1  + this.x2  ) / 2 - 100;
			connectionObj.text_y = this.y2 - 5;
			ctx.fillStyle = CONFIG_connection_font_color;
			ctx.save();
 			ctx.translate(this.x2 + 10, this.y2);
 			ctx.rotate(Math.PI/2);
			ctx.fillText(connectionObj.name, 0, 0 );
			ctx.restore();
			var connectionControls  = '';
			ex = this.x1 + 7 + CONFIG_canvas_xoffset; 
			ey = this.y1 + 60 + CONFIG_canvas_yoffset; 
			dx = this.x1 + 7 +  CONFIG_canvas_xoffset;
			dy = this.y1 + 40 + CONFIG_canvas_yoffset;
			connectionControls = connectionControls + '<a href="javascript:openEditConnectionDialogNoJQueryMobile(\'' + connectionObj.id + '\',\''+ connectionObj.name + '\',\'operation\');"><img src="img/edit.png" width="15" style="z-index: 6;position:absolute;top:' + ey + 'px;left:' + ex +'px;font-size:13px;"/></a>'
				+ '<a href="javascript:deleteConnection(\'' + connectionObj.id + '\');"><img src="img/delete.png" width="15" style="z-index: 6;position:absolute;top:' + dy + 'px;left:' + dx +'px;font-size:13px;"/></a>';
			$('#connectionControls').append( connectionControls );

        	if(CONFIG_connection_line_display == 'orthogonal'){
				if(connectionObj.block1.x > connectionObj.block2.x){
					var mid = ((this.y1 - this.y2) / 2) + (10 * cindex ); 
					ctx.moveTo(this.x1, this.y1 + 20);
		        	ctx.lineTo(this.x1 + 0.2, this.y1 - mid);
		        	ctx.moveTo(this.x1 + 0.2, this.y1 - mid);
		        	ctx.lineTo(this.x2, this.y1 - mid);
					ctx.moveTo(this.x2, this.y1 - mid);
		        	ctx.lineTo(this.x2 + 0.2, this.y2 - 25); 
		        	ctx.stroke();
					this.drawGeneralizationHead(ctx,this.x2,this.y2 - 25,0);
				}else if(connectionObj.block1.x < connectionObj.block2.x){
					var mid = ((this.y1 - this.y2) / 2) + (10 * cindex ); 
					ctx.moveTo(this.x1, this.y1 + 20);
		        	ctx.lineTo(this.x1 + 0.2, this.y1 - mid);
					ctx.moveTo(this.x1 + 0.2, this.y1 - mid);
		        	ctx.lineTo(this.x2, this.y1 - mid);
					ctx.moveTo(this.x2, this.y1 - mid);
		        	ctx.lineTo(this.x2 + 0.2, this.y2 - 25);
		        	ctx.stroke();
					this.drawGeneralizationHead(ctx,this.x2,this.y2 - 25,0);
				}else {
		        	ctx.moveTo(this.x1,connectionObj.block1.y);
		        	ctx.lineTo(this.x2,connectionObj.block2.y + connectionObj.block2.h + 15);
		        	ctx.stroke();
					this.drawGeneralizationHead(ctx,this.x2,(connectionObj.block2.y + connectionObj.block2.h + 15),0);
				}

			}else{
				//straight
				//console.debug( 'gs2 straight: ' );
				ctx.moveTo(this.x1,this.y1 + 20);
		        ctx.lineTo(this.x2,this.y2 - 25);
		        ctx.stroke();
		        var endRadians=Math.atan((this.y2-20-this.y1)/(this.x2-this.x1));
	        	endRadians+=((this.x2>this.x1)?90:-90)*Math.PI/180;
	        	//console.debug( 'gs2 endRadians: ' + endRadians );
	        	if(isNaN(endRadians)) this.drawGeneralizationHead(ctx,this.x2,this.y2-25,0);
	        	else this.drawGeneralizationHead(ctx,this.x2,this.y2-25,endRadians);

			}	
        }else if(px1_is_at_side3) {
        	var cindex = getConnectionIndexOnSide3(connectionObj.block1, connectionObj);
			cindex++;
			var side_count = connectionObj.block1.conn_side3_count;

			var cindex2 = getConnectionIndexOnSide3(connectionObj.block2, connectionObj);
			cindex2++;
			var side_count2 = connectionObj.block2.conn_side3_count;

			this.y1 = this.y1 + 20 * cindex - (10 * side_count);
			this.y2 = this.y2 + 20 * cindex2 - (10 * side_count2);

			connectionObj.text_x = this.x2  - 100 ;
			connectionObj.text_y = this.y2 - 5;
			ctx.fillStyle = CONFIG_connection_font_color;
			ctx.fillText(connectionObj.name, connectionObj.text_x, connectionObj.text_y );
			var connectionControls  = ''; 
			ex = this.x1 + 30 + CONFIG_canvas_xoffset; 
			ey = this.y1 + 80 + CONFIG_canvas_yoffset; 
			dx = this.x1 + 50 + CONFIG_canvas_xoffset;
			dy = this.y1 + 80 + CONFIG_canvas_yoffset; 
			connectionControls = connectionControls + '<a href="javascript:openEditConnectionDialogNoJQueryMobile(\'' + connectionObj.id + '\',\''+ connectionObj.name + '\',\'operation\');"><img src="img/edit.png" width="15" style="z-index: 6;position:absolute;top:' + ey + 'px;left:' + ex +'px;font-size:13px;"/></a>'
				+ '<a href="javascript:deleteConnection(\'' + connectionObj.id + '\');"><img src="img/delete.png" width="15" style="z-index: 6;position:absolute;top:' + dy + 'px;left:' + dx +'px;font-size:13px;"/></a>';
			$('#connectionControls').append( connectionControls );

        	if(CONFIG_connection_line_display == 'orthogonal'){
				if(connectionObj.block1.y > connectionObj.block2.y){
					var mid = ((this.x2 - this.x1) / 2) + 20 + (20 * cindex ); 
					ctx.moveTo(this.x1 - 20 , this.y1);
		        	ctx.lineTo(this.x1 - 20 + mid, this.y1);
					ctx.moveTo(this.x1 - 20 + mid, this.y1);
		        	ctx.lineTo(this.x1 - 20 + mid + 0.2, this.y2);
					ctx.moveTo(this.x1 - 20 + mid, this.y2);
		        	ctx.lineTo(this.x2 + 20, this.y2);
				}else if(connectionObj.block1.y < connectionObj.block2.y){
					var mid = ((this.x2 - this.x1) / 2) + 20 + (20 * cindex ); 
					ctx.moveTo(this.x1 - 20 , this.y1);
		        	ctx.lineTo(this.x1 - 20 + mid, this.y1);
					ctx.moveTo(this.x1 - 20 + mid, this.y2);
		        	ctx.lineTo(this.x1 - 20 + mid + 0.2, this.y1);
					ctx.moveTo(this.x1 - 20 + mid, this.y2);
		        	ctx.lineTo(this.x2 + 20, this.y2);
				}else{
					ctx.moveTo(this.x1 - 20,this.y1);
		        	ctx.lineTo(this.x2 + 20,this.y2);
				}
				ctx.stroke();
				this.drawGeneralizationHead(ctx,this.x2 + 20,this.y2,1.5707963267948966);

			}else{
				ctx.moveTo(this.x1 - 20,this.y1);
		        ctx.lineTo(this.x2 + 20,this.y2);
		        ctx.stroke();
		        var endRadians=Math.atan((this.y2-this.y1)/(this.x2+20-this.x1));
	        	endRadians+=((this.x2+20>this.x1)?90:-90)*Math.PI/180;
		        this.drawGeneralizationHead(ctx,this.x2 + 20,this.y2,endRadians);
			}	
        }else if(px1_is_at_side4) {
        	var cindex = getConnectionIndexOnSide4(connectionObj.block1, connectionObj);
			cindex++;
			var side_count = connectionObj.block1.conn_side4_count;

			var cindex2 = getConnectionIndexOnSide4(connectionObj.block2, connectionObj);
			cindex2++;
			var side_count2 = connectionObj.block2.conn_side4_count;

			this.x1 = this.x1 + 20 * cindex - (10 * side_count);
			this.x2 = this.x2 + 20 * cindex2 - (10 * side_count2);

			connectionObj.text_x = (this.x1  + this.x2  ) / 2 - 50;
			connectionObj.text_y = this.y2 - 5;
			ctx.fillStyle = CONFIG_connection_font_color;
			ctx.save();
 			ctx.translate(this.x2 - 5 , this.y2);
 			ctx.rotate(-Math.PI/2);
			ctx.fillText(connectionObj.name, 0, 0 );
			ctx.restore();
			var connectionControls  = '';
			ex = this.x1 + 7 + CONFIG_canvas_xoffset; ;
			ey = this.y1 + 90 + CONFIG_canvas_yoffset; 
			dx = this.x1 + 7 + CONFIG_canvas_xoffset; ;
			dy = this.y1 + 110 + CONFIG_canvas_yoffset; 
			connectionControls = connectionControls + '<a href="javascript:openEditConnectionDialogNoJQueryMobile(\'' + connectionObj.id + '\',\''+ connectionObj.name + '\',\'operation\');"><img src="img/edit.png" width="15" style="z-index: 6;position:absolute;top:' + ey + 'px;left:' + ex +'px;font-size:13px;"/></a>'
				+ '<a href="javascript:deleteConnection(\'' + connectionObj.id + '\');"><img src="img/delete.png" width="15" style="z-index: 6;position:absolute;top:' + dy + 'px;left:' + dx +'px;font-size:13px;"/></a>';
			$('#connectionControls').append( connectionControls );

        	if(CONFIG_connection_line_display == 'orthogonal'){
				if(connectionObj.block1.x > connectionObj.block2.x){
					var mid = ((this.y2 - this.y1) / 2) + (10 * cindex ); 
					ctx.moveTo(this.x1, this.y1 - 25);
		        	ctx.lineTo(this.x1 + 0.2, this.y1 + mid);
					ctx.moveTo(this.x1 + 0.2, this.y1 + mid);
		        	ctx.lineTo(this.x2, this.y1 + mid);
					ctx.moveTo(this.x2, this.y1 + mid);
		        	ctx.lineTo(this.x2 + 0.2, this.y2  + 20);
		        	ctx.stroke();
					this.drawGeneralizationHead(ctx,this.x2,this.y2 + 20,3.141592653589793);
				}else if(connectionObj.block1.x < connectionObj.block2.x){
					var mid = ((this.y2 - this.y1) / 2) + (10 * cindex ); 
					ctx.moveTo(this.x1, this.y1 - 25);
		        	ctx.lineTo(this.x1 + 0.2, this.y1 + mid);
					ctx.moveTo(this.x1 + 0.2, this.y1 + mid);
		        	ctx.lineTo(this.x2, this.y1 + mid);
					ctx.moveTo(this.x2, this.y1 + mid);
		        	ctx.lineTo(this.x2 + 0.2, this.y2 + 20);
		        	ctx.stroke();
					this.drawGeneralizationHead(ctx,this.x2,this.y2 + 20,3.141592653589793);
				}else{
					ctx.moveTo(this.x1,connectionObj.block1.y + connectionObj.block1.h + 15);
		        	ctx.lineTo(this.x2,connectionObj.block2.y);
		        	ctx.stroke();
					this.drawGeneralizationHead(ctx,this.x2,connectionObj.block2.y,3.141592653589793);
				}
			}else{
				ctx.moveTo(this.x1,this.y1 - 25);
		        ctx.lineTo(this.x2,this.y2 + 20);
		        ctx.stroke();
		        var endRadians=Math.atan((this.y2+20-this.y1)/(this.x2-this.x1));
	        	endRadians+=((this.x2>this.x1)?90:-90)*Math.PI/180;
		        this.drawGeneralizationHead(ctx,this.x2,this.y2 + 20,endRadians);
			}	
        	
        }

}

Line.prototype.drawGeneralizationHead=function(ctx,x,y,radians){
    ctx.save();
    ctx.beginPath();
    ctx.translate(x,y);
    ctx.rotate(radians);
    ctx.moveTo(0,0);
    ctx.lineTo(8,20);
    ctx.lineTo(-8,20);
    ctx.closePath();
    ctx.restore();
    ctx.fill();
    ctx.stroke();
}

Line.prototype.drawAssociation=function(
	connectionObj,
	ctx,
	px1_is_at_side1,
	px1_is_at_side2,
	px1_is_at_side3,
	px1_is_at_side4){

        // arbitrary styling
        ctx.strokeStyle = CONFIG_connection_stroke_color;
        ctx.lineWidth=CONFIG_focus_connection_line_width;
		ctx.beginPath();

        if(px1_is_at_side1) {
        	var cindex = getConnectionIndexOnSide1(connectionObj.block1, connectionObj);
			cindex++;
			var side_count = connectionObj.block1.conn_side1_count;

			var cindex2 = getConnectionIndexOnSide1(connectionObj.block2, connectionObj);
			cindex2++;
			var side_count2 = connectionObj.block2.conn_side1_count;

			this.y1 = this.y1 + 20 * cindex - (10 * side_count);
			this.y2 = this.y2 + 20 * cindex2 - (10 * side_count2);

			
			connectionObj.text_x =  this.x2 + 10;
			connectionObj.text_y = this.y2 - 5;
			ctx.fillStyle = CONFIG_connection_font_color;
			ctx.fillText(connectionObj.name, connectionObj.text_x, connectionObj.text_y );
			var connectionControls  = '';
			ex = this.x1 - 20 + CONFIG_canvas_xoffset; 
			ey = this.y1 + 80 + CONFIG_canvas_yoffset; 
			dx = this.x1 - 40 + CONFIG_canvas_xoffset;
			dy = this.y1 + 80 + CONFIG_canvas_yoffset;
			connectionControls = connectionControls + '<a href="javascript:openEditConnectionDialogNoJQueryMobile(\'' + connectionObj.id + '\',\''+ connectionObj.name + '\',\'operation\');"><img src="img/edit.png" width="15" style="z-index: 6;position:absolute;top:' + ey + 'px;left:' + ex +'px;font-size:13px;"/></a>'
				+ '<a href="javascript:deleteConnection(\'' + connectionObj.id + '\');"><img src="img/delete.png" width="15" style="z-index: 6;position:absolute;top:' + dy + 'px;left:' + dx +'px;font-size:13px;"/></a>';
			$('#connectionControls').append( connectionControls );

        	if(CONFIG_connection_line_display == 'orthogonal'){				
				if(connectionObj.block1.y > connectionObj.block2.y){
					var mid = ((this.x2 - this.x1) / 2) + 20 + (20 * cindex ); 
					ctx.moveTo(this.x1 + 20, this.y1);
		        	ctx.lineTo(this.x1 - 20 + mid, this.y1);
					ctx.moveTo(this.x1 - 20 + mid, this.y1);
		        	ctx.lineTo(this.x1 - 20 + mid + 0.2, this.y2);
					ctx.moveTo(this.x1 - 20 + mid, this.y2);
		        	ctx.lineTo(this.x2 - 20, this.y2 );
				}else if(connectionObj.block1.y < connectionObj.block2.y){
					var mid = ((this.x2 - this.x1) / 2) + 20 + (20 * cindex );  
					ctx.moveTo(this.x1 + 20, this.y1);
		        	ctx.lineTo(this.x1 - 20 + mid, this.y1 );
		        	ctx.moveTo(this.x1 - 20 + mid, this.y2);
		        	ctx.lineTo(this.x1 - 20 + mid + 0.2, this.y1);
					ctx.moveTo(this.x1 - 20 + mid, this.y2);
		        	ctx.lineTo(this.x2 - 20, this.y2);
				}else {
					ctx.moveTo(this.x1 + 20,this.y1);
		        	ctx.lineTo(this.x2 - 20,this.y2);
				}
				ctx.stroke();
				this.drawDependencyHead(ctx,this.x2 - 20,this.y2,-1.5707963267948966);
			}else{
				ctx.moveTo(this.x1 + 20,this.y1);
		        ctx.lineTo(this.x2 - 20,this.y2);
		        ctx.stroke();
		        var endRadians=Math.atan((this.y2-this.y1)/(this.x2-20-this.x1));
	        	endRadians+=((this.x2-20>this.x1)?90:-90)*Math.PI/180;
		        this.drawDependencyHead(ctx,this.x2 - 20,this.y2,endRadians);
			}	
        	
        }else if(px1_is_at_side2) {
        	var cindex = getConnectionIndexOnSide2(connectionObj.block1, connectionObj);
			cindex++;
			var side_count = connectionObj.block1.conn_side2_count;

			var cindex2 = getConnectionIndexOnSide2(connectionObj.block2, connectionObj);
			cindex2++;
			var side_count2 = connectionObj.block2.conn_side2_count;

			this.x1 = this.x1 + 20 * cindex - (10 * side_count);
			this.x2 = this.x2 + 20 * cindex2 - (10 * side_count2);

			connectionObj.text_x = (this.x1  + this.x2  ) / 2 - 100;
			connectionObj.text_y = this.y2 - 5;
			ctx.fillStyle = CONFIG_connection_font_color;
			ctx.save();
 			ctx.translate(this.x2 + 10, this.y2);
 			ctx.rotate(Math.PI/2);
			ctx.fillText(connectionObj.name, 0, 0 );
			ctx.restore();
			var connectionControls  = '';
			ex = this.x1 + 7 + CONFIG_canvas_xoffset; 
			ey = this.y1 + 60 + CONFIG_canvas_yoffset; 
			dx = this.x1 + 7 +  CONFIG_canvas_xoffset;
			dy = this.y1 + 40 + CONFIG_canvas_yoffset;
			connectionControls = connectionControls + '<a href="javascript:openEditConnectionDialogNoJQueryMobile(\'' + connectionObj.id + '\',\''+ connectionObj.name + '\',\'operation\');"><img src="img/edit.png" width="15" style="z-index: 6;position:absolute;top:' + ey + 'px;left:' + ex +'px;font-size:13px;"/></a>'
				+ '<a href="javascript:deleteConnection(\'' + connectionObj.id + '\');"><img src="img/delete.png" width="15" style="z-index: 6;position:absolute;top:' + dy + 'px;left:' + dx +'px;font-size:13px;"/></a>';
			$('#connectionControls').append( connectionControls );

        	if(CONFIG_connection_line_display == 'orthogonal'){
				if(connectionObj.block1.x > connectionObj.block2.x){
					var mid = ((this.y1 - this.y2) / 2) + (10 * cindex ); 
					ctx.moveTo(this.x1, this.y1 + 20);
		        	ctx.lineTo(this.x1 + 0.2, this.y1 - mid);
		        	ctx.moveTo(this.x1 + 0.2, this.y1 - mid);
		        	ctx.lineTo(this.x2, this.y1 - mid);
					ctx.moveTo(this.x2, this.y1 - mid);
		        	ctx.lineTo(this.x2 + 0.2, this.y2 - 25); 
		        	ctx.stroke();
					this.drawDependencyHead(ctx,this.x2,this.y2 - 25,0);
				}else if(connectionObj.block1.x < connectionObj.block2.x){
					var mid = ((this.y1 - this.y2) / 2) + (10 * cindex ); 
					ctx.moveTo(this.x1, this.y1 + 20);
		        	ctx.lineTo(this.x1 + 0.2, this.y1 - mid);
					ctx.moveTo(this.x1 + 0.2, this.y1 - mid);
		        	ctx.lineTo(this.x2, this.y1 - mid);
					ctx.moveTo(this.x2, this.y1 - mid);
		        	ctx.lineTo(this.x2 + 0.2, this.y2 - 25);
		        	ctx.stroke();
					this.drawDependencyHead(ctx,this.x2,this.y2 - 25,0);
				}else {
		        	ctx.moveTo(this.x1,connectionObj.block1.y);
		        	ctx.lineTo(this.x2,connectionObj.block2.y + connectionObj.block2.h + 15);
		        	ctx.stroke();
					this.drawDependencyHead(ctx,this.x2,(connectionObj.block2.y + connectionObj.block2.h + 15),0);
				}

			}else{
				//straight
				ctx.moveTo(this.x1,this.y1 + 20);
		        ctx.lineTo(this.x2,this.y2 - 25);
		        ctx.stroke();
		        var endRadians=Math.atan((this.y2-20-this.y1)/(this.x2-this.x1));
	        	endRadians+=((this.x2>this.x1)?90:-90)*Math.PI/180;
		        this.drawDependencyHead(ctx,this.x2,this.y2-25,endRadians);
			}	
        }else if(px1_is_at_side3) {
        	var cindex = getConnectionIndexOnSide3(connectionObj.block1, connectionObj);
			cindex++;
			var side_count = connectionObj.block1.conn_side3_count;

			var cindex2 = getConnectionIndexOnSide3(connectionObj.block2, connectionObj);
			cindex2++;
			var side_count2 = connectionObj.block2.conn_side3_count;

			this.y1 = this.y1 + 20 * cindex - (10 * side_count);
			this.y2 = this.y2 + 20 * cindex2 - (10 * side_count2);

			connectionObj.text_x = this.x2  - 100 ;
			connectionObj.text_y = this.y2 - 5;
			ctx.fillStyle = CONFIG_connection_font_color;
			ctx.fillText(connectionObj.name, connectionObj.text_x, connectionObj.text_y );
			var connectionControls  = '';
			ex = this.x1 + 30 + CONFIG_canvas_xoffset; 
			ey = this.y1 + 80 + CONFIG_canvas_yoffset; 
			dx = this.x1 + 50 + CONFIG_canvas_xoffset;
			dy = this.y1 + 80 + CONFIG_canvas_yoffset; 
			connectionControls = connectionControls + '<a href="javascript:openEditConnectionDialogNoJQueryMobile(\'' + connectionObj.id + '\',\''+ connectionObj.name + '\',\'operation\');"><img src="img/edit.png" width="15" style="z-index: 6;position:absolute;top:' + ey + 'px;left:' + ex +'px;font-size:13px;"/></a>'
				+ '<a href="javascript:deleteConnection(\'' + connectionObj.id + '\');"><img src="img/delete.png" width="15" style="z-index: 6;position:absolute;top:' + dy + 'px;left:' + dx +'px;font-size:13px;"/></a>';
			$('#connectionControls').append( connectionControls );

        	if(CONFIG_connection_line_display == 'orthogonal'){
				if(connectionObj.block1.y > connectionObj.block2.y){
					var mid = ((this.x2 - this.x1) / 2) + 20 + (20 * cindex ); 
					ctx.moveTo(this.x1 - 20 , this.y1);
		        	ctx.lineTo(this.x1 - 20 + mid, this.y1);
					ctx.moveTo(this.x1 - 20 + mid, this.y1);
		        	ctx.lineTo(this.x1 - 20 + mid + 0.2, this.y2);
					ctx.moveTo(this.x1 - 20 + mid, this.y2);
		        	ctx.lineTo(this.x2 + 20, this.y2);
				}else if(connectionObj.block1.y < connectionObj.block2.y){
					var mid = ((this.x2 - this.x1) / 2) + 20 + (20 * cindex ); 
					ctx.moveTo(this.x1 - 20 , this.y1);
		        	ctx.lineTo(this.x1 - 20 + mid, this.y1);
					ctx.moveTo(this.x1 - 20 + mid, this.y2);
		        	ctx.lineTo(this.x1 - 20 + mid + 0.2, this.y1);
					ctx.moveTo(this.x1 - 20 + mid, this.y2);
		        	ctx.lineTo(this.x2 + 20, this.y2);
				}else{
					ctx.moveTo(this.x1 - 20,this.y1);
		        	ctx.lineTo(this.x2 + 20,this.y2);
				}
				ctx.stroke();
				this.drawDependencyHead(ctx,this.x2 + 20,this.y2,1.5707963267948966);

			}else{
				ctx.moveTo(this.x1 - 20,this.y1);
		        ctx.lineTo(this.x2 + 20,this.y2);
		        ctx.stroke();
		        var endRadians=Math.atan((this.y2-this.y1)/(this.x2+20-this.x1));
	        	endRadians+=((this.x2+20>this.x1)?90:-90)*Math.PI/180;
		        this.drawDependencyHead(ctx,this.x2 + 20,this.y2,endRadians);
			}	
        }else if(px1_is_at_side4) {
        	var cindex = getConnectionIndexOnSide4(connectionObj.block1, connectionObj);
			cindex++;
			var side_count = connectionObj.block1.conn_side4_count;

			var cindex2 = getConnectionIndexOnSide4(connectionObj.block2, connectionObj);
			cindex2++;
			var side_count2 = connectionObj.block2.conn_side4_count;

			this.x1 = this.x1 + 20 * cindex - (10 * side_count);
			this.x2 = this.x2 + 20 * cindex2 - (10 * side_count2);

			connectionObj.text_x = (this.x1  + this.x2  ) / 2 - 50;
			connectionObj.text_y = this.y2 - 5;
			ctx.fillStyle = CONFIG_connection_font_color;
			ctx.save();
 			ctx.translate(this.x2 - 5 , this.y2);
 			ctx.rotate(-Math.PI/2);
			ctx.fillText(connectionObj.name, 0, 0 );
			ctx.restore();
			var connectionControls  = '';
			ex = this.x1 + 7 + CONFIG_canvas_xoffset; ;
			ey = this.y1 + 90 + CONFIG_canvas_yoffset; 
			dx = this.x1 + 7 + CONFIG_canvas_xoffset; ;
			dy = this.y1 + 110 + CONFIG_canvas_yoffset; 
			connectionControls = connectionControls + '<a href="javascript:openEditConnectionDialogNoJQueryMobile(\'' + connectionObj.id + '\',\''+ connectionObj.name + '\',\'operation\');"><img src="img/edit.png" width="15" style="z-index: 6;position:absolute;top:' + ey + 'px;left:' + ex +'px;font-size:13px;"/></a>'
				+ '<a href="javascript:deleteConnection(\'' + connectionObj.id + '\');"><img src="img/delete.png" width="15" style="z-index: 6;position:absolute;top:' + dy + 'px;left:' + dx +'px;font-size:13px;"/></a>';
			$('#connectionControls').append( connectionControls );

        	if(CONFIG_connection_line_display == 'orthogonal'){
				if(connectionObj.block1.x > connectionObj.block2.x){
					var mid = ((this.y2 - this.y1) / 2) + (10 * cindex ); 
					ctx.moveTo(this.x1, this.y1 - 25);
		        	ctx.lineTo(this.x1 + 0.2, this.y1 + mid);
					ctx.moveTo(this.x1 + 0.2, this.y1 + mid);
		        	ctx.lineTo(this.x2, this.y1 + mid);
					ctx.moveTo(this.x2, this.y1 + mid);
		        	ctx.lineTo(this.x2 + 0.2, this.y2  + 20);
		        	ctx.stroke();
					this.drawDependencyHead(ctx,this.x2,this.y2 + 20,3.141592653589793);
				}else if(connectionObj.block1.x < connectionObj.block2.x){
					var mid = ((this.y2 - this.y1) / 2) + (10 * cindex ); 
					ctx.moveTo(this.x1, this.y1 - 25);
		        	ctx.lineTo(this.x1 + 0.2, this.y1 + mid);
					ctx.moveTo(this.x1 + 0.2, this.y1 + mid);
		        	ctx.lineTo(this.x2, this.y1 + mid);
					ctx.moveTo(this.x2, this.y1 + mid);
		        	ctx.lineTo(this.x2 + 0.2, this.y2 + 20);
		        	ctx.stroke();
					this.drawDependencyHead(ctx,this.x2,this.y2 + 20,3.141592653589793);
				}else{
					ctx.moveTo(this.x1,connectionObj.block1.y + connectionObj.block1.h + 15);
		        	ctx.lineTo(this.x2,connectionObj.block2.y);
		        	ctx.stroke();
					this.drawDependencyHead(ctx,this.x2,connectionObj.block2.y,3.141592653589793);
				}
			}else{
				ctx.moveTo(this.x1,this.y1 - 25);
		        ctx.lineTo(this.x2,this.y2 + 20);
		        ctx.stroke();
		        var endRadians=Math.atan((this.y2+20-this.y1)/(this.x2-this.x1));
	        	endRadians+=((this.x2>this.x1)?90:-90)*Math.PI/180;
	        	//console.debug(endRadians);
		        this.drawDependencyHead(ctx,this.x2,this.y2 + 20,endRadians);
			}	
        	
        }

}


Line.prototype.drawPartAssociation=function(
	connectionObj,
	ctx,
	px1_is_at_side1,
	px1_is_at_side2,
	px1_is_at_side3,
	px1_is_at_side4){


        // arbitrary styling
        ctx.strokeStyle = CONFIG_connection_stroke_color;
        // ctx.fillStyle='black';
        ctx.lineWidth=CONFIG_focus_connection_line_width;
        
        if(px1_is_at_side1){
        	var cindex = getConnectionIndexOnSide1(connectionObj.block1, connectionObj);
			cindex++;
			var side_count = connectionObj.block1.conn_side1_count;

			var cindex2 = getConnectionIndexOnSide1(connectionObj.block2, connectionObj);
			cindex2++;
			var side_count2 = connectionObj.block2.conn_side1_count;

			this.y1 = this.y1 + 20 * cindex - (10 * side_count);
			this.y2 = this.y2 + 20 * cindex2 - (10 * side_count2);

			
			connectionObj.text_x =  this.x2 + 10;
			connectionObj.text_y = this.y2 - 5;
			ctx.fillStyle = CONFIG_connection_font_color;
			ctx.fillText(connectionObj.name, connectionObj.text_x, connectionObj.text_y );
			var connectionControls  = '';
			ex = this.x1 - 20 + CONFIG_canvas_xoffset; 
			ey = this.y1 + 80 + CONFIG_canvas_yoffset; 
			dx = this.x1 - 40 + CONFIG_canvas_xoffset;
			dy = this.y1 + 80 + CONFIG_canvas_yoffset;
			connectionControls = connectionControls + '<a href="javascript:openEditConnectionDialogNoJQueryMobile(\'' + connectionObj.id + '\',\''+ connectionObj.name + '\',\'operation\');"><img src="img/edit.png" width="15" style="z-index: 6;position:absolute;top:' + ey + 'px;left:' + ex +'px;font-size:13px;"/></a>'
				+ '<a href="javascript:deleteConnection(\'' + connectionObj.id + '\');"><img src="img/delete.png" width="15" style="z-index: 6;position:absolute;top:' + dy + 'px;left:' + dx +'px;font-size:13px;"/></a>';
			$('#connectionControls').append( connectionControls );

        	if(CONFIG_connection_line_display == 'orthogonal'){				
				if(connectionObj.block1.y > connectionObj.block2.y){
					var mid = ((this.x2 - this.x1) / 2) + 20 + (20 * cindex ); 
					ctx.moveTo(this.x1 + 20, this.y1);
		        	ctx.lineTo(this.x1 - 20 + mid, this.y1);
					ctx.moveTo(this.x1 - 20 + mid, this.y1);
		        	ctx.lineTo(this.x1 - 20 + mid + 0.2, this.y2);
					ctx.moveTo(this.x1 - 20 + mid, this.y2);
		        	ctx.lineTo(this.x2 - 20, this.y2 );
		        	ctx.stroke();
		        	this.drawDependencyHead(ctx,this.x2 - 20,this.y2,-1.5707963267948966);
	        		this.drawPartAssociationHead(px1_is_at_side1,px1_is_at_side2,px1_is_at_side3,px1_is_at_side4,ctx,this.x1 - 20,this.y1,this.x2,this.y2);
				}else if(connectionObj.block1.y < connectionObj.block2.y){
					var mid = ((this.x2 - this.x1) / 2) + 20 + (20 * cindex ); 
					ctx.moveTo(this.x1 + 20, this.y1);
		        	ctx.lineTo(this.x1 - 20 + mid, this.y1 );
		        	ctx.moveTo(this.x1 - 20 + mid, this.y2);
		        	ctx.lineTo(this.x1 - 20 + mid + 0.2, this.y1);
					ctx.moveTo(this.x1 - 20 + mid, this.y2);
		        	ctx.lineTo(this.x2 - 20, this.y2);
		        	ctx.stroke();
		        	this.drawDependencyHead(ctx,this.x2 - 20,this.y2,-1.5707963267948966);
	        		this.drawPartAssociationHead(px1_is_at_side1,px1_is_at_side2,px1_is_at_side3,px1_is_at_side4,ctx,this.x1 - 20,this.y1,this.x2,this.y2);
				}else {
					ctx.moveTo(this.x1 + 20,this.y1);
		        	ctx.lineTo(this.x2 - 20,this.y2);
		        	ctx.stroke();
		        	this.drawDependencyHead(ctx,this.x2 - 20,this.y2,-1.5707963267948966);
	        		this.drawPartAssociationHead(px1_is_at_side1,px1_is_at_side2,px1_is_at_side3,px1_is_at_side4,ctx,this.x1 - 20,this.y1,this.x2,this.y2);
				}
			}else{
				//straight
		        ctx.beginPath();
	        	ctx.moveTo(this.x1 - 10,this.y1);
	        	ctx.lineTo(this.x2 - 20,this.y2);
	        	ctx.stroke();
	        	var endRadians=Math.atan((this.y2-this.y1)/(this.x2-this.x1));
        		endRadians+=((this.x2>this.x1)?90:-90)*Math.PI/180;
	        	this.drawDependencyHead(ctx,this.x2 - 20,this.y2,endRadians);
	        	this.drawPartAssociationHead(px1_is_at_side1,px1_is_at_side2,px1_is_at_side3,px1_is_at_side4,ctx,this.x1 - 20,this.y1,this.x2,this.y2);
			}	

        }else if(px1_is_at_side3){
        	var cindex = getConnectionIndexOnSide3(connectionObj.block1, connectionObj);
			cindex++;
			var side_count = connectionObj.block1.conn_side3_count;

			var cindex2 = getConnectionIndexOnSide3(connectionObj.block2, connectionObj);
			cindex2++;
			var side_count2 = connectionObj.block2.conn_side3_count;

			this.y1 = this.y1 + 20 * cindex - (10 * side_count);
			this.y2 = this.y2 + 20 * cindex2 - (10 * side_count2);

			connectionObj.text_x = this.x2  - 100 ;
			connectionObj.text_y = this.y2 - 5;
			ctx.fillStyle = CONFIG_connection_font_color;
			ctx.fillText(connectionObj.name, connectionObj.text_x, connectionObj.text_y );
			var connectionControls  = '';
			ex = this.x1 + 30 + CONFIG_canvas_xoffset; 
			ey = this.y1 + 80 + CONFIG_canvas_yoffset; 
			dx = this.x1 + 50 + CONFIG_canvas_xoffset;
			dy = this.y1 + 80 + CONFIG_canvas_yoffset; 
			connectionControls = connectionControls + '<a href="javascript:openEditConnectionDialogNoJQueryMobile(\'' + connectionObj.id + '\',\''+ connectionObj.name + '\',\'operation\');"><img src="img/edit.png" width="15" style="z-index: 6;position:absolute;top:' + ey + 'px;left:' + ex +'px;font-size:13px;"/></a>'
				+ '<a href="javascript:deleteConnection(\'' + connectionObj.id + '\');"><img src="img/delete.png" width="15" style="z-index: 6;position:absolute;top:' + dy + 'px;left:' + dx +'px;font-size:13px;"/></a>';
			$('#connectionControls').append( connectionControls );

        	if(CONFIG_connection_line_display == 'orthogonal'){
				if(connectionObj.block1.y > connectionObj.block2.y){
					var mid = ((this.x2 - this.x1) / 2) + 20 + (20 * cindex );  
					ctx.moveTo(this.x1 - 20 , this.y1);
		        	ctx.lineTo(this.x1 - 20 + mid, this.y1);
					ctx.moveTo(this.x1 - 20 + mid, this.y1);
		        	ctx.lineTo(this.x1 - 20 + mid + 0.2, this.y2);
					ctx.moveTo(this.x1 - 20 + mid, this.y2);
		        	ctx.lineTo(this.x2 + 20, this.y2);
		        	ctx.stroke();
					this.drawDependencyHead(ctx,this.x2 + 20,this.y2,1.5707963267948966);
					this.drawPartAssociationHead(px1_is_at_side1,px1_is_at_side2,px1_is_at_side3,px1_is_at_side4,ctx,this.x1 - 20,this.y1,this.x2,this.y2);
				}else if(connectionObj.block1.y < connectionObj.block2.y){
					var mid = ((this.x2 - this.x1) / 2) + 20 + (20 * cindex ); 
					ctx.moveTo(this.x1 - 20 , this.y1);
		        	ctx.lineTo(this.x1 - 20 + mid, this.y1);
					ctx.moveTo(this.x1 - 20 + mid, this.y2);
		        	ctx.lineTo(this.x1 - 20 + mid + 0.2, this.y1);
					ctx.moveTo(this.x1 - 20 + mid, this.y2);
		        	ctx.lineTo(this.x2 + 20, this.y2);
		        	ctx.stroke();
					this.drawDependencyHead(ctx,this.x2 + 20,this.y2,1.5707963267948966);
					this.drawPartAssociationHead(px1_is_at_side1,px1_is_at_side2,px1_is_at_side3,px1_is_at_side4,ctx,this.x1 - 20,this.y1,this.x2,this.y2);
				}else{
					ctx.moveTo(this.x1 - 20,this.y1);
		        	ctx.lineTo(this.x2 + 20,this.y2);
		        	ctx.stroke();
					this.drawDependencyHead(ctx,this.x2 + 20,this.y2,1.5707963267948966);
					this.drawPartAssociationHead(px1_is_at_side1,px1_is_at_side2,px1_is_at_side3,px1_is_at_side4,ctx,this.x1 - 20,this.y1,this.x2,this.y2);
				}

			}else{
				//straight
				ctx.moveTo(this.x1 + 10,this.y1);
		        ctx.lineTo(this.x2 + 20,this.y2);
		        ctx.stroke();
		        var endRadians=Math.atan((this.y2-this.y1)/(this.x2+20-this.x1));
	        	endRadians+=((this.x2+20>this.x1)?90:-90)*Math.PI/180;
		        this.drawDependencyHead(ctx,this.x2 + 20,this.y2,endRadians);
		        this.drawPartAssociationHead(px1_is_at_side1,px1_is_at_side2,px1_is_at_side3,px1_is_at_side4,ctx,this.x1 - 20,this.y1,this.x2,this.y2);
			}	

        }else if(px1_is_at_side2){
        	var cindex = getConnectionIndexOnSide2(connectionObj.block1, connectionObj);
			cindex++;
			var side_count = connectionObj.block1.conn_side2_count;

			var cindex2 = getConnectionIndexOnSide2(connectionObj.block2, connectionObj);
			cindex2++;
			var side_count2 = connectionObj.block2.conn_side2_count;

			this.x1 = this.x1 + 20 * cindex - (10 * side_count);
			this.x2 = this.x2 + 20 * cindex2 - (10 * side_count2);

			connectionObj.text_x = (this.x1  + this.x2  ) / 2 - 100;
			connectionObj.text_y = this.y2 - 5;
			ctx.fillStyle = CONFIG_connection_font_color;
			ctx.save();
 			ctx.translate(this.x2 + 10, this.y2);
 			ctx.rotate(Math.PI/2);
			ctx.fillText(connectionObj.name, 0, 0 );
			ctx.restore();
			var connectionControls  = '';
			ex = this.x1 + 7 + CONFIG_canvas_xoffset; 
			ey = this.y1 + 60 + CONFIG_canvas_yoffset; 
			dx = this.x1 + 7 +  CONFIG_canvas_xoffset;
			dy = this.y1 + 40 + CONFIG_canvas_yoffset;
			connectionControls = connectionControls + '<a href="javascript:openEditConnectionDialogNoJQueryMobile(\'' + connectionObj.id + '\',\''+ connectionObj.name + '\',\'operation\');"><img src="img/edit.png" width="15" style="z-index: 6;position:absolute;top:' + ey + 'px;left:' + ex +'px;font-size:13px;"/></a>'
				+ '<a href="javascript:deleteConnection(\'' + connectionObj.id + '\');"><img src="img/delete.png" width="15" style="z-index: 6;position:absolute;top:' + dy + 'px;left:' + dx +'px;font-size:13px;"/></a>';
			$('#connectionControls').append( connectionControls );


        	if(CONFIG_connection_line_display == 'orthogonal'){
				if(connectionObj.block1.x > connectionObj.block2.x){
					var mid = ((this.y1 - this.y2) / 2) + (10 * cindex ); 
					ctx.moveTo(this.x1, this.y1 + 20);
		        	ctx.lineTo(this.x1 + 0.2, this.y1 - mid);
		        	ctx.moveTo(this.x1 + 0.2, this.y1 - mid);
		        	ctx.lineTo(this.x2, this.y1 - mid);
					ctx.moveTo(this.x2, this.y1 - mid);
		        	ctx.lineTo(this.x2 + 0.2, this.y2 - 25); 
		        	ctx.stroke();
					this.drawDependencyHead(ctx,this.x2,this.y2 - 25,0);
					this.drawDependencyHead(ctx,this.x2,this.y2-25,endRadians);
		        	this.drawPartAssociationHead(px1_is_at_side1,px1_is_at_side2,px1_is_at_side3,px1_is_at_side4,ctx,this.x1,this.y1,this.x2,this.y2);
				}else if(connectionObj.block1.x < connectionObj.block2.x){
					var mid = ((this.y1 - this.y2) / 2) + (10 * cindex ); 
					ctx.moveTo(this.x1, this.y1 + 20);
		        	ctx.lineTo(this.x1 + 0.2, this.y1 - mid);
					ctx.moveTo(this.x1 + 0.2, this.y1 - mid);
		        	ctx.lineTo(this.x2, this.y1 - mid);
					ctx.moveTo(this.x2, this.y1 - mid);
		        	ctx.lineTo(this.x2 + 0.2, this.y2 - 25);
		        	ctx.stroke();
					this.drawDependencyHead(ctx,this.x2,this.y2 - 25,0);
					this.drawPartAssociationHead(px1_is_at_side1,px1_is_at_side2,px1_is_at_side3,px1_is_at_side4,ctx,this.x1,this.y1,this.x2,this.y2);
				}else {
		        	ctx.moveTo(this.x1,connectionObj.block1.y);
		        	ctx.lineTo(this.x2,connectionObj.block2.y + connectionObj.block2.h + 15);
		        	ctx.stroke();
					this.drawDependencyHead(ctx,this.x2,(connectionObj.block2.y + connectionObj.block2.h + 15),0);
					this.drawPartAssociationHead(px1_is_at_side1,px1_is_at_side2,px1_is_at_side3,px1_is_at_side4,ctx,this.x1,this.y1,this.x2,this.y2);

				}
			}else{
				//straight
				ctx.moveTo(this.x1,this.y1 - 10);
		        ctx.lineTo(this.x2,this.y2 - 25);
		        ctx.stroke();
		        var endRadians=Math.atan((this.y2-20-this.y1)/(this.x2-this.x1));
	        	endRadians+=((this.x2>this.x1)?90:-90)*Math.PI/180;
		        this.drawDependencyHead(ctx,this.x2,this.y2-25,endRadians);
		       	this.drawPartAssociationHead(px1_is_at_side1,px1_is_at_side2,px1_is_at_side3,px1_is_at_side4,ctx,this.x1,this.y1,this.x2,this.y2);
			}

        }else if(px1_is_at_side4){
        	var cindex = getConnectionIndexOnSide4(connectionObj.block1, connectionObj);
			cindex++;
			var side_count = connectionObj.block1.conn_side4_count;

			var cindex2 = getConnectionIndexOnSide4(connectionObj.block2, connectionObj);
			cindex2++;
			var side_count2 = connectionObj.block2.conn_side4_count;

			this.x1 = this.x1 + 20 * cindex - (10 * side_count);
			this.x2 = this.x2 + 20 * cindex2 - (10 * side_count2);

			connectionObj.text_x = (this.x1  + this.x2  ) / 2 - 50;
			connectionObj.text_y = this.y2 - 5;
			ctx.fillStyle = CONFIG_connection_font_color;
			ctx.save();
 			ctx.translate(this.x2 - 5 , this.y2);
 			ctx.rotate(-Math.PI/2);
			ctx.fillText(connectionObj.name, 0, 0 );
			ctx.restore();
			var connectionControls  = '';
			ex = this.x1 + 7 + CONFIG_canvas_xoffset; ;
			ey = this.y1 + 90 + CONFIG_canvas_yoffset; 
			dx = this.x1 + 7 + CONFIG_canvas_xoffset; ;
			dy = this.y1 + 110 + CONFIG_canvas_yoffset; 
			connectionControls = connectionControls + '<a href="javascript:openEditConnectionDialogNoJQueryMobile(\'' + connectionObj.id + '\',\''+ connectionObj.name + '\',\'operation\');"><img src="img/edit.png" width="15" style="z-index: 6;position:absolute;top:' + ey + 'px;left:' + ex +'px;font-size:13px;"/></a>'
				+ '<a href="javascript:deleteConnection(\'' + connectionObj.id + '\');"><img src="img/delete.png" width="15" style="z-index: 6;position:absolute;top:' + dy + 'px;left:' + dx +'px;font-size:13px;"/></a>';
			$('#connectionControls').append( connectionControls );

        	if(CONFIG_connection_line_display == 'orthogonal'){
				if(connectionObj.block1.x > connectionObj.block2.x){
					var mid = ((this.y2 - this.y1) / 2) + (10 * cindex ); 
					ctx.moveTo(this.x1, this.y1 - 25);
		        	ctx.lineTo(this.x1 + 0.2, this.y1 + mid);
					ctx.moveTo(this.x1 + 0.2, this.y1 + mid);
		        	ctx.lineTo(this.x2, this.y1 + mid);
					ctx.moveTo(this.x2, this.y1 + mid);
		        	ctx.lineTo(this.x2 + 0.2, this.y2  + 20);
		        	ctx.stroke();
					this.drawDependencyHead(ctx,this.x2,this.y2 + 20,3.141592653589793);
					this.drawPartAssociationHead(px1_is_at_side1,px1_is_at_side2,px1_is_at_side3,px1_is_at_side4,ctx,this.x1,this.y1,this.x2,this.y2);
				}else if(connectionObj.block1.x < connectionObj.block2.x){
					var mid = ((this.y2 - this.y1) / 2) + (10 * cindex ); 
					ctx.moveTo(this.x1, this.y1 - 25);
		        	ctx.lineTo(this.x1 + 0.2, this.y1 + mid);
					ctx.moveTo(this.x1 + 0.2, this.y1 + mid);
		        	ctx.lineTo(this.x2, this.y1 + mid);
					ctx.moveTo(this.x2, this.y1 + mid);
		        	ctx.lineTo(this.x2 + 0.2, this.y2 + 20);
		        	ctx.stroke();
					this.drawDependencyHead(ctx,this.x2,this.y2 + 20,3.141592653589793);
					this.drawPartAssociationHead(px1_is_at_side1,px1_is_at_side2,px1_is_at_side3,px1_is_at_side4,ctx,this.x1,this.y1,this.x2,this.y2);
				}else{
					ctx.moveTo(this.x1,connectionObj.block1.y + connectionObj.block1.h + 15);
		        	ctx.lineTo(this.x2,connectionObj.block2.y);
		        	ctx.stroke();
					this.drawDependencyHead(ctx,this.x2,connectionObj.block2.y,3.141592653589793);
					this.drawPartAssociationHead(px1_is_at_side1,px1_is_at_side2,px1_is_at_side3,px1_is_at_side4,ctx,this.x1,this.y1,this.x2,this.y2);
				}
			}else{
				ctx.moveTo(this.x1,this.y1 + 5);
		        ctx.lineTo(this.x2,this.y2 + 20);
		        ctx.stroke();
		        var endRadians=Math.atan((this.y2+20-this.y1)/(this.x2-this.x1));
	        	endRadians+=((this.x2>this.x1)?90:-90)*Math.PI/180;
	        	//console.debug(endRadians);
		        this.drawDependencyHead(ctx,this.x2,this.y2 + 20,endRadians);
		        this.drawPartAssociationHead(px1_is_at_side1,px1_is_at_side2,px1_is_at_side3,px1_is_at_side4,ctx,this.x1,this.y1,this.x2,this.y2);
			}	
        }
       
       
        
}

Line.prototype.drawPartAssociationHead=function(
	px1_is_at_side1,
	px1_is_at_side2,
	px1_is_at_side3,
	px1_is_at_side4,
	ctx,x1,y1,x2,y2){

	ctx.fillStyle = 'black';

	if(px1_is_at_side1){
		ctx.save();
	    ctx.beginPath();
	    ctx.moveTo(x1 + 40,y1);
	    ctx.lineTo(x1+40-15,y1+10);
	    ctx.lineTo(x1+40-30,y1);
	    ctx.lineTo(x1+40-15,y1-10);
	    ctx.lineTo(x1 + 40,y1);
	    ctx.closePath();
	    ctx.restore();
	    ctx.fill();
	}

	if(px1_is_at_side2){
		ctx.save();
	    ctx.beginPath();
	    ctx.moveTo(x1,y1 + 20);
	    ctx.lineTo(x1+10,y1+5);
	    ctx.lineTo(x1,y1-10);
	    ctx.lineTo(x1-10,y1+5);
	    ctx.lineTo(x1,y1 + 20);
	    ctx.closePath();
	    ctx.restore();
	    ctx.fill();
	}

	if(px1_is_at_side3){
		ctx.save();
	    ctx.beginPath();
	    ctx.moveTo(x1,y1);
	    ctx.lineTo(x1+15,y1+10);
	    ctx.lineTo(x1+30,y1);
	    ctx.lineTo(x1+15,y1-10);
	    ctx.lineTo(x1,y1);
	    ctx.closePath();
	    ctx.restore();
	    ctx.fill();
	}

	if(px1_is_at_side4){
		ctx.save();
	    ctx.beginPath();
	    ctx.moveTo(x1,y1 - 25);
	    ctx.lineTo(x1-10,y1-10);
	    ctx.lineTo(x1,y1+5);
	    ctx.lineTo(x1+10,y1-10);
	    ctx.lineTo(x1,y1 - 25);
	    ctx.closePath();
	    ctx.restore();
	    ctx.fill();
	}
    
}


Line.prototype.drawSharedAssociation=function(
	connectionObj,
	ctx,
	px1_is_at_side1,
	px1_is_at_side2,
	px1_is_at_side3,
	px1_is_at_side4){

        // arbitrary styling
        ctx.strokeStyle = CONFIG_connection_stroke_color;
        ctx.lineWidth=CONFIG_focus_connection_line_width;

		if(px1_is_at_side1){
			var cindex = getConnectionIndexOnSide1(connectionObj.block1, connectionObj);
			cindex++;
			var side_count = connectionObj.block1.conn_side1_count;

			var cindex2 = getConnectionIndexOnSide1(connectionObj.block2, connectionObj);
			cindex2++;
			var side_count2 = connectionObj.block2.conn_side1_count;

			this.y1 = this.y1 + 20 * cindex - (10 * side_count);
			this.y2 = this.y2 + 20 * cindex2 - (10 * side_count2);

			
			connectionObj.text_x =  this.x2 + 10;
			connectionObj.text_y = this.y2 - 5;
			ctx.fillStyle = CONFIG_connection_font_color;
			ctx.fillText(connectionObj.name, connectionObj.text_x, connectionObj.text_y );
			var connectionControls  = '';
			ex = this.x1 - 20 + CONFIG_canvas_xoffset; 
			ey = this.y1 + 80 + CONFIG_canvas_yoffset; 
			dx = this.x1 - 40 + CONFIG_canvas_xoffset;
			dy = this.y1 + 80 + CONFIG_canvas_yoffset; 
			connectionControls = connectionControls + '<a href="javascript:openEditConnectionDialogNoJQueryMobile(\'' + connectionObj.id + '\',\''+ connectionObj.name + '\',\'operation\');"><img src="img/edit.png" width="15" style="z-index: 6;position:absolute;top:' + ey + 'px;left:' + ex +'px;font-size:13px;"/></a>'
				+ '<a href="javascript:deleteConnection(\'' + connectionObj.id + '\');"><img src="img/delete.png" width="15" style="z-index: 6;position:absolute;top:' + dy + 'px;left:' + dx +'px;font-size:13px;"/></a>';
			$('#connectionControls').append( connectionControls );

        	if(CONFIG_connection_line_display == 'orthogonal'){				
				if(connectionObj.block1.y > connectionObj.block2.y){
					var mid = ((this.x2 - this.x1) / 2) + 20 + (20 * cindex ); 
					ctx.moveTo(this.x1 + 20, this.y1);
		        	ctx.lineTo(this.x1 - 20 + mid, this.y1);
					ctx.moveTo(this.x1 - 20 + mid, this.y1);
		        	ctx.lineTo(this.x1 - 20 + mid + 0.2, this.y2);
					ctx.moveTo(this.x1 - 20 + mid, this.y2);
		        	ctx.lineTo(this.x2 - 20, this.y2 );
		        	ctx.stroke();
		        	this.drawDependencyHead(ctx,this.x2 - 20,this.y2,-1.5707963267948966);
	        		this.drawSharedAssociationHead(px1_is_at_side1,px1_is_at_side2,px1_is_at_side3,px1_is_at_side4,ctx,this.x1 - 20,this.y1,this.x2,this.y2);
				}else if(connectionObj.block1.y < connectionObj.block2.y){
					var mid = ((this.x2 - this.x1) / 2) + 20 + (20 * cindex ); 
					ctx.moveTo(this.x1 + 20, this.y1);
		        	ctx.lineTo(this.x1 - 20 + mid, this.y1 );
		        	ctx.moveTo(this.x1 - 20 + mid, this.y2);
		        	ctx.lineTo(this.x1 - 20 + mid + 0.2, this.y1);
					ctx.moveTo(this.x1 - 20 + mid, this.y2);
		        	ctx.lineTo(this.x2 - 20, this.y2);
		        	ctx.stroke();
		        	this.drawDependencyHead(ctx,this.x2 - 20,this.y2,-1.5707963267948966);
	        		this.drawSharedAssociationHead(px1_is_at_side1,px1_is_at_side2,px1_is_at_side3,px1_is_at_side4,ctx,this.x1 - 20,this.y1,this.x2,this.y2);
				}else {
					ctx.moveTo(this.x1 + 20,this.y1);
		        	ctx.lineTo(this.x2 - 20,this.y2);
		        	ctx.stroke();
		        	this.drawDependencyHead(ctx,this.x2 - 20,this.y2,-1.5707963267948966);
	        		this.drawSharedAssociationHead(px1_is_at_side1,px1_is_at_side2,px1_is_at_side3,px1_is_at_side4,ctx,this.x1 - 20,this.y1,this.x2,this.y2);
				}
			}else{
				//straight
		        ctx.beginPath();
	        	ctx.moveTo(this.x1 - 10,this.y1);
	        	ctx.lineTo(this.x2 - 20,this.y2);
	        	ctx.stroke();
	        	var endRadians=Math.atan((this.y2-this.y1)/(this.x2-this.x1));
        		endRadians+=((this.x2>this.x1)?90:-90)*Math.PI/180;
	        	this.drawDependencyHead(ctx,this.x2 - 20,this.y2,endRadians);
	        	this.drawSharedAssociationHead(px1_is_at_side1,px1_is_at_side2,px1_is_at_side3,px1_is_at_side4,ctx,this.x1 - 20,this.y1,this.x2,this.y2);
			}	

        }else if(px1_is_at_side3){
        	var cindex = getConnectionIndexOnSide3(connectionObj.block1, connectionObj);
			cindex++;
			var side_count = connectionObj.block1.conn_side3_count;

			var cindex2 = getConnectionIndexOnSide3(connectionObj.block2, connectionObj);
			cindex2++;
			var side_count2 = connectionObj.block2.conn_side3_count;

			this.y1 = this.y1 + 20 * cindex - (10 * side_count);
			this.y2 = this.y2 + 20 * cindex2 - (10 * side_count2);

			connectionObj.text_x = this.x2  - 100 ;
			connectionObj.text_y = this.y2 - 5;
			ctx.fillStyle = CONFIG_connection_font_color;
			ctx.fillText(connectionObj.name, connectionObj.text_x, connectionObj.text_y );
			var connectionControls  = '';
			ex = this.x1 + 30 + CONFIG_canvas_xoffset; 
			ey = this.y1 + 80 + CONFIG_canvas_yoffset; 
			dx = this.x1 + 50 + CONFIG_canvas_xoffset;
			dy = this.y1 + 80 + CONFIG_canvas_yoffset; 
			connectionControls = connectionControls + '<a href="javascript:openEditConnectionDialogNoJQueryMobile(\'' + connectionObj.id + '\',\''+ connectionObj.name + '\',\'operation\');"><img src="img/edit.png" width="15" style="z-index: 6;position:absolute;top:' + ey + 'px;left:' + ex +'px;font-size:13px;"/></a>'
				+ '<a href="javascript:deleteConnection(\'' + connectionObj.id + '\');"><img src="img/delete.png" width="15" style="z-index: 6;position:absolute;top:' + dy + 'px;left:' + dx +'px;font-size:13px;"/></a>';
			$('#connectionControls').append( connectionControls );

        	if(CONFIG_connection_line_display == 'orthogonal'){
				if(connectionObj.block1.y > connectionObj.block2.y){
					var mid = ((this.x2 - this.x1) / 2) + 20 + (20 * cindex ); 
					ctx.moveTo(this.x1 - 20 , this.y1);
		        	ctx.lineTo(this.x1 - 20 + mid, this.y1);
					ctx.moveTo(this.x1 - 20 + mid, this.y1);
		        	ctx.lineTo(this.x1 - 20 + mid + 0.2, this.y2);
					ctx.moveTo(this.x1 - 20 + mid, this.y2);
		        	ctx.lineTo(this.x2 + 20, this.y2);
		        	ctx.stroke();
					this.drawDependencyHead(ctx,this.x2 + 20,this.y2,1.5707963267948966);
					this.drawSharedAssociationHead(px1_is_at_side1,px1_is_at_side2,px1_is_at_side3,px1_is_at_side4,ctx,this.x1 - 20,this.y1,this.x2,this.y2);
				}else if(connectionObj.block1.y < connectionObj.block2.y){
					var mid = ((this.x2 - this.x1) / 2) + 20 + (20 * cindex ); 
					ctx.moveTo(this.x1 - 20 , this.y1);
		        	ctx.lineTo(this.x1 - 20 + mid, this.y1);
					ctx.moveTo(this.x1 - 20 + mid, this.y2);
		        	ctx.lineTo(this.x1 - 20 + mid + 0.2, this.y1);
					ctx.moveTo(this.x1 - 20 + mid, this.y2);
		        	ctx.lineTo(this.x2 + 20, this.y2);
		        	ctx.stroke();
					this.drawDependencyHead(ctx,this.x2 + 20,this.y2,1.5707963267948966);
					this.drawSharedAssociationHead(px1_is_at_side1,px1_is_at_side2,px1_is_at_side3,px1_is_at_side4,ctx,this.x1 - 20,this.y1,this.x2,this.y2);
				}else{
					ctx.moveTo(this.x1 - 20,this.y1);
		        	ctx.lineTo(this.x2 + 20,this.y2);
		        	ctx.stroke();
					this.drawDependencyHead(ctx,this.x2 + 20,this.y2,1.5707963267948966);
					this.drawSharedAssociationHead(px1_is_at_side1,px1_is_at_side2,px1_is_at_side3,px1_is_at_side4,ctx,this.x1 - 20,this.y1,this.x2,this.y2);
				}

			}else{
				//straight
				ctx.moveTo(this.x1 + 10,this.y1);
		        ctx.lineTo(this.x2 + 20,this.y2);
		        ctx.stroke();
		        var endRadians=Math.atan((this.y2-this.y1)/(this.x2+20-this.x1));
	        	endRadians+=((this.x2+20>this.x1)?90:-90)*Math.PI/180;
		        this.drawDependencyHead(ctx,this.x2 + 20,this.y2,endRadians);
		        this.drawSharedAssociationHead(px1_is_at_side1,px1_is_at_side2,px1_is_at_side3,px1_is_at_side4,ctx,this.x1 - 20,this.y1,this.x2,this.y2);
			}	

        }else if(px1_is_at_side2){
        	var cindex = getConnectionIndexOnSide2(connectionObj.block1, connectionObj);
			cindex++;
			var side_count = connectionObj.block1.conn_side2_count;

			var cindex2 = getConnectionIndexOnSide2(connectionObj.block2, connectionObj);
			cindex2++;
			var side_count2 = connectionObj.block2.conn_side2_count;

			this.x1 = this.x1 + 20 * cindex - (10 * side_count);
			this.x2 = this.x2 + 20 * cindex2 - (10 * side_count2);

			connectionObj.text_x = (this.x1  + this.x2  ) / 2 - 100;
			connectionObj.text_y = this.y2 - 5;
			ctx.fillStyle = CONFIG_connection_font_color;
			ctx.save();
 			ctx.translate(this.x2 + 10, this.y2);
 			ctx.rotate(Math.PI/2);
			ctx.fillText(connectionObj.name, 0, 0 );
			ctx.restore();
			var connectionControls  = '';
			ex = this.x1 + 7 + CONFIG_canvas_xoffset; 
			ey = this.y1 + 60 + CONFIG_canvas_yoffset; 
			dx = this.x1 + 7 +  CONFIG_canvas_xoffset;
			dy = this.y1 + 40 + CONFIG_canvas_yoffset;
			connectionControls = connectionControls + '<a href="javascript:openEditConnectionDialogNoJQueryMobile(\'' + connectionObj.id + '\',\''+ connectionObj.name + '\',\'operation\');"><img src="img/edit.png" width="15" style="z-index: 6;position:absolute;top:' + ey + 'px;left:' + ex +'px;font-size:13px;"/></a>'
				+ '<a href="javascript:deleteConnection(\'' + connectionObj.id + '\');"><img src="img/delete.png" width="15" style="z-index: 6;position:absolute;top:' + dy + 'px;left:' + dx +'px;font-size:13px;"/></a>';
			$('#connectionControls').append( connectionControls );


        	if(CONFIG_connection_line_display == 'orthogonal'){
				if(connectionObj.block1.x > connectionObj.block2.x){
					var mid = ((this.y1 - this.y2) / 2) + (10 * cindex ); 
					ctx.moveTo(this.x1, this.y1 + 20);
		        	ctx.lineTo(this.x1 + 0.2, this.y1 - mid);
		        	ctx.moveTo(this.x1 + 0.2, this.y1 - mid);
		        	ctx.lineTo(this.x2, this.y1 - mid);
					ctx.moveTo(this.x2, this.y1 - mid);
		        	ctx.lineTo(this.x2 + 0.2, this.y2 - 25); 
		        	ctx.stroke();
					this.drawDependencyHead(ctx,this.x2,this.y2 - 25,0);
					this.drawDependencyHead(ctx,this.x2,this.y2-25,endRadians);
		        	this.drawSharedAssociationHead(px1_is_at_side1,px1_is_at_side2,px1_is_at_side3,px1_is_at_side4,ctx,this.x1,this.y1,this.x2,this.y2);
				}else if(connectionObj.block1.x < connectionObj.block2.x){
					var mid = ((this.y1 - this.y2) / 2) + (10 * cindex ); 
					ctx.moveTo(this.x1, this.y1 + 20);
		        	ctx.lineTo(this.x1 + 0.2, this.y1 - mid);
					ctx.moveTo(this.x1 + 0.2, this.y1 - mid);
		        	ctx.lineTo(this.x2, this.y1 - mid);
					ctx.moveTo(this.x2, this.y1 - mid);
		        	ctx.lineTo(this.x2 + 0.2, this.y2 - 25);
		        	ctx.stroke();
					this.drawDependencyHead(ctx,this.x2,this.y2 - 25,0);
					this.drawSharedAssociationHead(px1_is_at_side1,px1_is_at_side2,px1_is_at_side3,px1_is_at_side4,ctx,this.x1,this.y1,this.x2,this.y2);
				}else {
		        	ctx.moveTo(this.x1,connectionObj.block1.y);
		        	ctx.lineTo(this.x2,connectionObj.block2.y + connectionObj.block2.h + 15);
		        	ctx.stroke();
					this.drawDependencyHead(ctx,this.x2,(connectionObj.block2.y + connectionObj.block2.h + 15),0);
					this.drawSharedAssociationHead(px1_is_at_side1,px1_is_at_side2,px1_is_at_side3,px1_is_at_side4,ctx,this.x1,this.y1,this.x2,this.y2);

				}
			}else{
				//straight
				ctx.moveTo(this.x1,this.y1 - 10);
		        ctx.lineTo(this.x2,this.y2 - 25);
		        ctx.stroke();
		        var endRadians=Math.atan((this.y2-20-this.y1)/(this.x2-this.x1));
	        	endRadians+=((this.x2>this.x1)?90:-90)*Math.PI/180;
		        this.drawDependencyHead(ctx,this.x2,this.y2-25,endRadians);
		       	this.drawSharedAssociationHead(px1_is_at_side1,px1_is_at_side2,px1_is_at_side3,px1_is_at_side4,ctx,this.x1,this.y1,this.x2,this.y2);
			}

        }else if(px1_is_at_side4){
        	var cindex = getConnectionIndexOnSide4(connectionObj.block1, connectionObj);
			cindex++;
			var side_count = connectionObj.block1.conn_side4_count;

			var cindex2 = getConnectionIndexOnSide4(connectionObj.block2, connectionObj);
			cindex2++;
			var side_count2 = connectionObj.block2.conn_side4_count;

			this.x1 = this.x1 + 20 * cindex - (10 * side_count);
			this.x2 = this.x2 + 20 * cindex2 - (10 * side_count2);

			connectionObj.text_x = (this.x1  + this.x2  ) / 2 - 50;
			connectionObj.text_y = this.y2 - 5;
			ctx.fillStyle = CONFIG_connection_font_color;
			ctx.save();
 			ctx.translate(this.x2 - 5 , this.y2);
 			ctx.rotate(-Math.PI/2);
			ctx.fillText(connectionObj.name, 0, 0 );
			ctx.restore();
			var connectionControls  = '';
			ex = this.x1 + 7 + CONFIG_canvas_xoffset; ;
			ey = this.y1 + 90 + CONFIG_canvas_yoffset; 
			dx = this.x1 + 7 + CONFIG_canvas_xoffset; ;
			dy = this.y1 + 110 + CONFIG_canvas_yoffset; 
			connectionControls = connectionControls + '<a href="javascript:openEditConnectionDialogNoJQueryMobile(\'' + connectionObj.id + '\',\''+ connectionObj.name + '\',\'operation\');"><img src="img/edit.png" width="15" style="z-index: 6;position:absolute;top:' + ey + 'px;left:' + ex +'px;font-size:13px;"/></a>'
				+ '<a href="javascript:deleteConnection(\'' + connectionObj.id + '\');"><img src="img/delete.png" width="15" style="z-index: 6;position:absolute;top:' + dy + 'px;left:' + dx +'px;font-size:13px;"/></a>';
			$('#connectionControls').append( connectionControls );

        	if(CONFIG_connection_line_display == 'orthogonal'){
				if(connectionObj.block1.x > connectionObj.block2.x){
					var mid = ((this.y2 - this.y1) / 2); 
					ctx.moveTo(this.x1, this.y1 - 25);
		        	ctx.lineTo(this.x1 + 0.2, this.y1 + mid);
					ctx.moveTo(this.x1 + 0.2, this.y1 + mid);
		        	ctx.lineTo(this.x2, this.y1 + mid);
					ctx.moveTo(this.x2, this.y1 + mid);
		        	ctx.lineTo(this.x2 + 0.2, this.y2  + 20);
		        	ctx.stroke();
					this.drawDependencyHead(ctx,this.x2,this.y2 + 20,3.141592653589793);
					this.drawSharedAssociationHead(px1_is_at_side1,px1_is_at_side2,px1_is_at_side3,px1_is_at_side4,ctx,this.x1,this.y1,this.x2,this.y2);
				}else if(connectionObj.block1.x < connectionObj.block2.x){
					var mid = ((this.y2 - this.y1) / 2); 
					ctx.moveTo(this.x1, this.y1 - 25);
		        	ctx.lineTo(this.x1 + 0.2, this.y1 + mid);
					ctx.moveTo(this.x1 + 0.2, this.y1 + mid);
		        	ctx.lineTo(this.x2, this.y1 + mid);
					ctx.moveTo(this.x2, this.y1 + mid);
		        	ctx.lineTo(this.x2 + 0.2, this.y2 + 20);
		        	ctx.stroke();
					this.drawDependencyHead(ctx,this.x2,this.y2 + 20,3.141592653589793);
					this.drawSharedAssociationHead(px1_is_at_side1,px1_is_at_side2,px1_is_at_side3,px1_is_at_side4,ctx,this.x1,this.y1,this.x2,this.y2);
				}else{
					ctx.moveTo(this.x1,connectionObj.block1.y + connectionObj.block1.h + 15);
		        	ctx.lineTo(this.x2,connectionObj.block2.y);
		        	ctx.stroke();
					this.drawDependencyHead(ctx,this.x2,connectionObj.block2.y,3.141592653589793);
					this.drawSharedAssociationHead(px1_is_at_side1,px1_is_at_side2,px1_is_at_side3,px1_is_at_side4,ctx,this.x1,this.y1,this.x2,this.y2);
				}
			}else{
				ctx.moveTo(this.x1,this.y1 + 5);
		        ctx.lineTo(this.x2,this.y2 + 20);
		        ctx.stroke();
		        var endRadians=Math.atan((this.y2+20-this.y1)/(this.x2-this.x1));
	        	endRadians+=((this.x2>this.x1)?90:-90)*Math.PI/180;
		        this.drawDependencyHead(ctx,this.x2,this.y2 + 20,endRadians);
		        this.drawSharedAssociationHead(px1_is_at_side1,px1_is_at_side2,px1_is_at_side3,px1_is_at_side4,ctx,this.x1,this.y1,this.x2,this.y2);
			}	
        }
}
       
       
Line.prototype.drawSharedAssociationHead=function(
	px1_is_at_side1,
	px1_is_at_side2,
	px1_is_at_side3,
	px1_is_at_side4,
	ctx,x1,y1,x2,y2){
	
	if(px1_is_at_side1){
		ctx.save();
	    ctx.beginPath();
	    ctx.moveTo(x1 + 40,y1);
	    ctx.lineTo(x1+40-15,y1+10);
	    ctx.lineTo(x1+40-30,y1);
	    ctx.lineTo(x1+40-15,y1-10);
	    ctx.lineTo(x1 + 40,y1);
	    ctx.closePath();
	    ctx.restore();
	    ctx.fill();
	    ctx.stroke();
	}

	if(px1_is_at_side2){
		ctx.save();
	    ctx.beginPath();
	    ctx.moveTo(x1,y1 + 20);
	    ctx.lineTo(x1+10,y1+5);
	    ctx.lineTo(x1,y1-10);
	    ctx.lineTo(x1-10,y1+5);
	    ctx.lineTo(x1,y1 + 20);
	    ctx.closePath();
	    ctx.restore();
	    ctx.fill();
	    ctx.stroke();
	}

	if(px1_is_at_side3){
		ctx.save();
	    ctx.beginPath();
	    ctx.moveTo(x1,y1);
	    ctx.lineTo(x1+15,y1+10);
	    ctx.lineTo(x1+30,y1);
	    ctx.lineTo(x1+15,y1-10);
	    ctx.lineTo(x1,y1);
	    ctx.closePath();
	    ctx.restore();
	    ctx.fill();
	    ctx.stroke();
	}

	if(px1_is_at_side4){
		ctx.save();
	    ctx.beginPath();
	    ctx.moveTo(x1,y1 - 25);
	    ctx.lineTo(x1-10,y1-10);
	    ctx.lineTo(x1,y1+5);
	    ctx.lineTo(x1+10,y1-10);
	    ctx.lineTo(x1,y1 - 25);
	    ctx.closePath();
	    ctx.restore();
	    ctx.fill();
	    ctx.stroke();
	}
}

var initDashing = function(ctx) {
 if (!ctx.dashLine) {
  ctx.dashStyle=[3,2] ;
  ctx.dashedLine = function(x1,y1,x2,y2) {
   var dashStyle = ctx.dashStyle,
    dashCount = dashStyle.length,
    sign = x2>=x1 ? 1 : -1,
       dx = x2-x1,
       dy = y2-y1,
       m = dy/dx,
       xsteps = dashStyle.map(function(len){return sign*Math.sqrt((len*len)/(1 + (m*m)));}),
       dRem =  Math.sqrt( dx*dx + dy*dy ),
       dIndex=0,
       draw=true;
   this.moveTo(x1,y1) ;
   while (dRem>=0.1){
         var dLen = dashStyle[dIndex],
             xStep = xsteps[dIndex];
         if (dLen > dRem) {
          xStep =  Math.sqrt(dRem*dRem/(1+m*m));
         }
         x1 += xStep ;
         y1 += m*xStep;
         this[draw ? 'lineTo' : 'moveTo'](x1,y1);
         dRem -= dLen;
         draw = !draw;
         dIndex = (dIndex+1) % dashCount ;
   }
  };
 };
};

function StraightConnection(theCtx,theBox1,theBox2) {
	Connection.call(theCtx,theBox1,theBox2); //Inheritance
}
// inherit 
StraightConnection.prototype = new Connection();
StraightConnection.prototype.constructor = StraightConnection;

function CurvedConnection(theCtx,theBox1,theBox2) {
	Connection.call(this); //Inheritance
}
CurvedConnection.prototype = new Connection();
CurvedConnection.prototype.constructor = CurvedConnection;

function OrthogonalConnection(theCtx,theBox1,theBox2) {
	Connection.call(this); //Inheritance
}
OrthogonalConnection.prototype = new Connection();
OrthogonalConnection.prototype.constructor = OrthogonalConnection;

function Constraint() {
	this.id = '';
    this.name = 'untitled constaint';
    this.x = 0;
    this.y = 0;
    this.highlight = false;
}

function Operation() {
	this.id = '';
    this.name = 'untitled operation';
    this.x = 0;
    this.y = 0;
    this.highlight = false;
}

function Part() {
	this.id = '';
    this.name = 'untitled part';
    this.x = 0;
    this.y = 0;
    this.highlight = false;
    this.note = 'They get the TV repaired. We called her "the dangerous janitor". I kept the room clean. Marty finds the box empty. They call him George.';
}

function Reference() {
	this.id = '';
    this.name = 'untitled reference';
    this.x = 0;
    this.y = 0;
    this.highlight = false;
    this.note = 'That bartender calls him a taxi. Those police officers paint the room green. Those thieves see him swim. Vorachet heard the girl crying. John got the watch fixed.';
}

function Value() {
	this.id = '';
    this.name = 'untitled value';
    this.x = 0;
    this.y = 0;
    this.highlight = false;
    this.note = 'That dentist heard the girl crying. Those politicians keep the room clean. We called her "the tall farmer. They call him a taxi. I called him "the lawyer".';
}

function Property() {
	this.id = '';
    this.name = 'untitled property';
    this.x = 0;
    this.y = 0;
    this.highlight = false;
    this.note = 'That fisherman keeps the milk cold. They see him swim. They made him cry. Those news announcers make him cry. They keep the room clean.';
}




var 
	r_text = new Array ();
	r_text[0] = "AutomotiveDomain";
	r_text[1] = "Breaking";
	r_text[2] = "WheelSubsystem";
	r_text[3] = "Engine";
	r_text[4] = "FuelCapacity";
	r_text[5] = "FuelEconomy";
	r_text[6] = "Rank";
	r_text[7] = "Power";
	r_text[8] = "Genrator";
	r_text[9] = "LightingSubsystem";
	r_text[10] = "BreakPedal";
	r_text[11] = "HybridgeSUV";

var 
	constraint_texts = new Array ();
	constraint_texts[0] = "{ x > y }";
	constraint_texts[1] = "{ a = b + c / d}";
	constraint_texts[2] = "{ e = mc^2}";
	constraint_texts[3] = "{ x = y^10}";
	constraint_texts[4] = "{ x > y , y > 100}";

var 
	operation_texts = new Array ();
	operation_texts[0] = "operation1(p1: Type1): Type2";
	operation_texts[1] = "setLightingSubsystem(p1: Type1): void";
	operation_texts[2] = "getAutomotiveDomain(p1: Type1): X";
	operation_texts[3] = "operation2(p1: Type1): Type2";
	operation_texts[4] = "setWheelSubsystem(p1: Type1): void";
	operation_texts[5] = "operation3(p1: Type1): Type2";
	operation_texts[6] = "getFuelCapacity(p1: Type1): Y";
	operation_texts[7] = "Engine(p1: Type1): Type2";
	operation_texts[8] = "operation5(p1: Type1): Type2";


var 
	part_texts = new Array ();
	part_texts[0] = "property1 : Engine";
	part_texts[1] = "property2 : LightingSubsystem";
	part_texts[2] = "property3 : Genrator";
	part_texts[3] = "property4 : BreakPedal";
	part_texts[4] = "property5 : HybridgeSUV";

var 
	reference_texts = new Array ();
	reference_texts[0] = "property1 : Engine[0..3] ordered";
	reference_texts[1] = "property2 : LightingSubsystem[0..3] ordered";
	reference_texts[2] = "property3 : Genrator[0..3] ordered";
	reference_texts[3] = "property4 : BreakPedal[0..3] ordered";
	reference_texts[4] = "property5 : HybridgeSUV[0..3] ordered";

var 
	value_texts = new Array ();
	value_texts[0] = "property1 : Integer = 99  {readonly}";
	value_texts[1] = "property2 : Real = 10.0";
	value_texts[2] = "property3 : String = \"gateway\"";
	value_texts[3] = "property4 : Integer = 199";
	value_texts[4] = "property5 : Real = 134.23";

var 
	property_texts = new Array ();
	property_texts[0] = "property1 : Type1";
	property_texts[1] = "property2 : Type2";
	property_texts[2] = "property3 : Type3";
	property_texts[3] = "property4 : Type4";
	property_texts[4] = "property5 : Type5";

function randomText(){
	return r_text[ Math.floor(11*Math.random())];
} 

function randomConstraint(){
	return  constraint_texts[ Math.floor(5*Math.random())];
} 

function randomOperation(){
	return  operation_texts[ Math.floor(5*Math.random())];
} 

function randomPart(){
	return  part_texts[ Math.floor(5*Math.random())];
} 

function randomReference(){
	return  reference_texts[ Math.floor(5*Math.random())];
} 

function randomValue(){
	return  value_texts[ Math.floor(5*Math.random())];
} 

function randomProperty(){
	//console.log(Math.floor(5*Math.random()));
	return  property_texts[ Math.floor(5*Math.random())];
} 

