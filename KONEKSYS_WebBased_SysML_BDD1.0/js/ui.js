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

var nextId = 1;
var nextDiagramId = 1;

function build_model_tree(blockName) {
	return '<li class="liOpen"><span class="bullet">' + blockName + '</span>' + 
					'<ul>' + 
						'<li class="liBullet"><span class="bullet"></span>delete_me.txt</li>' + 
					'</ul>' + 
				'</li>';
}

function clickAddNewBlock() {
	mySel = null;
	var width = 0; 
	var height = 0;
	newModel_startX = newModel_startX + 10; // if we did not +10, the model will be rendered outside the canvas area
	newModel_startY = newModel_startY + 10; // if we did not +10, the model will be rendered outside the canvas area
	var theBlock = addSimpleBox( newModel_startX, newModel_startY , width, height);
	invalidate();
  clearContextSensitiveIcons(); 
}

function clickAddRandomBlock() {
	mySel = null;
	var width = 0; 
	var height = 0;
	newModel_startX = newModel_startX + 10; // if we did not +10, the model will be rendered outside the canvas area
	newModel_startY = newModel_startY + 10; // if we did not +10, the model will be rendered outside the canvas area
	var theBlock = addRandomBlock( newModel_startX, newModel_startY , width, height);
	invalidate();
	clearContextSensitiveIcons(); 
}


function loadModelRepo() {
	var modelName = 'ModelName'
	var modelId = createGuid();
   clearContextSensitiveIcons(); 
}

function exportDiagram() {
	var numberOfBlocks = blocks.length;
	var textFile = '';
	for (var i = 0; i < numberOfBlocks; i++) {
		textFile = textFile + serializeBlockToText( blocks[i] );
	}

	var now = new Date();
  var windowTitle = now;
	window.open(  "data:text/csv;charset=utf-8," + encodeURIComponent( textFile ) , windowTitle );
}

function serializeBlockToText( theBlock ) {
	var text = '';
	text += theBlock.id + ',';
	text += theBlock.name + ',';
	text += theBlock.x + ',';
	text += theBlock.y + ',';
	text += theBlock.color + ',';
	text += theBlock.all_compartment_visible + ',';
	text += theBlock.constraints_visible + ',';
	text += theBlock.operations_visible + ',';
	text += theBlock.parts_visible + ',';
	text += theBlock.references_visible + ',';
	text += theBlock.values_visible + ',';
	text += theBlock.properties_visible + ',';
	text += theBlock.constraints_completely_visible_off + ',';
	text += theBlock.operations_completely_visible_off + ',';
	text += theBlock.parts_completely_visible_off + ',';
	text += theBlock.references_completely_visible_off + ',';
	text += theBlock.values_completely_visible_off + ',';
	text += theBlock.properties_completely_visible_off + ',';

	text += theBlock.constraints.length + ',';
	for (var i = 0; i < theBlock.constraints.length; i++) {
		text += theBlock.constraints[i].id + ',';
	    text += theBlock.constraints[i].name + ',';
	    text += theBlock.constraints[i].x + ',';
	    text += theBlock.constraints[i].y + ',';
	    text += theBlock.constraints[i].highlight + ',';
	    text += theBlock.constraints[i].note + ','; 
	}

	text += theBlock.operations.length + ',';
	for (var i = 0; i < theBlock.operations.length; i++) {
		text += theBlock.operations[i].id + ',';
	    text += theBlock.operations[i].name + ',';
	    text += theBlock.operations[i].x + ',';
	    text += theBlock.operations[i].y + ',';
	    text += theBlock.operations[i].highlight + ',';
	    text += theBlock.operations[i].note + ','; 
	}

	text += theBlock.parts.length + ',';
	for (var i = 0; i < theBlock.parts.length; i++) {
		text += theBlock.parts[i].id + ',';
	    text += theBlock.parts[i].name + ',';
	    text += theBlock.parts[i].x + ',';
	    text += theBlock.parts[i].y + ',';
	    text += theBlock.parts[i].highlight + ',';
	    text += theBlock.parts[i].note + ','; 
	}

	text += theBlock.references.length + ',';
	for (var i = 0; i < theBlock.references.length; i++) {
		text += theBlock.references[i].id + ',';
	    text += theBlock.references[i].name + ',';
	    text += theBlock.references[i].x + ',';
	    text += theBlock.references[i].y + ',';
	    text += theBlock.references[i].highlight + ',';
	    text += theBlock.references[i].note + ','; 
	}

	text += theBlock.values.length + ',';
	for (var i = 0; i < theBlock.values.length; i++) {
		text += theBlock.values[i].id + ',';
	    text += theBlock.values[i].name + ',';
	    text += theBlock.values[i].x + ',';
	    text += theBlock.values[i].y + ',';
	    text += theBlock.values[i].highlight + ',';
	    text += theBlock.values[i].note + ','; 
	}

	text += theBlock.properties.length + ',';
	for (var i = 0; i < theBlock.properties.length; i++) {
		text += theBlock.properties[i].id + ',';
	    text += theBlock.properties[i].name + ',';
	    text += theBlock.properties[i].x + ',';
	    text += theBlock.properties[i].y + ',';
	    text += theBlock.properties[i].highlight + ',';
	    text += theBlock.properties[i].note + ','; 
	}

	text += '\r\n';
	return text;
}

$('#addDependency').click(function() {
	console.debug('addConnection');
	if ( blocks.length >= 2 ) addConnection( blocks[0] , blocks[1], 'dependency' );
	invalidate();
});

$('#addGeneralization').click(function() {
	console.debug('addConnection');
	if ( blocks.length >= 4 ) addConnection( blocks[2] , blocks[3], 'generalization' );
	invalidate();
});

$('#saveAsImage').click(function() {
	var image = canvas.toDataURL("image/png");  
	window.open(image);
});


$('#addNewDiagram').click(function() {
	$("#popupDiagramName").popup("open");
	nextDiagramId++;
	var content = "<div data-role='collapsible' id='set" + nextDiagramId + "'><h3>&nbsp;&nbsp;&nbsp;&nbsp;BDD</h3><p> <canvas id='canvas' width='2000' height='2000'></canvas></p></div>";
	$("#diagram_edit_set").append( content ).collapsibleset('refresh');

	var pabelcontent = "<div data-role='collapsible' id='set" + nextDiagramId + "'><h3>&nbsp;&nbsp;&nbsp;&nbsp;BDD</h3><p>" + "BDD" + "</p></div>";
	$("#diagramset").append( pabelcontent ).collapsibleset('refresh');
	 init();
});

$('#changeBlockColor').click(function() {
	console.log('click currentBlockColor');
	mySel.fill = $('#currentBlockColor').val();
	invalidate();
});

$('#changeBlockName').click(function() {
	console.log('click changeBlockName');
	mySel.name = $('#currentBlockName').val();
	invalidate();
});

$('#deleteBlock').click(function() {
	console.log('click deleteBlock');
	var targetName = mySel.name;
	blocks.splice(mySelOrder,1);
	mySel = null;
	invalidate();
	$('#myModal').modal('hide')
});

$('#deleteBlockModal').click(function() {
	$('#myModalLabel').html( 'You want to delete model "' +  mySel.name + '" ?');
});

function openPanel() {
	$("#left-panel").panel("open");
}

function showInfoControls( blockId ) {
	var html = generateControlHTML( blockId );
	$('#infoControls').html( html );
}

function generateControlHTML( blockId ) {
	var block =  _findObjectById( blocks , blockId );
	var constraint_x = block.x;
	var constraint_y = block.y + 50;
	var operation_x = block.x;
	var operation_y = block.y + 70;
	var part_x = block.x;
	var part_y = block.y + 90;
	var reference_x = block.x + 90;
	var reference_y = block.y + 50;
	var value_x = block.x + 90;
	var value_y = block.y + 70;
	var property_x = block.x + 90;
	var property_y = block.y + 90;
	var html = '';

	var checked = '';

	// constraint
	if ( block.constraints_completely_visible_off == true ) checked = '';
	else checked = 'checked';
	html = html + '<div style="z-index: 4;position:absolute;top:' + constraint_y + 'px;left:' + constraint_x +'px;font-size:13px;"><input onclick="toggleCompletelyOffCompartmentDisplay(' + block.id + ',\'constraint\');" name="your_name" value="your_value" type="checkbox" ' + checked + '> constraints</div>';

	// operation
	if ( block.operations_completely_visible_off == true ) checked = '';
	else checked = 'checked';
	html = html + '<div style="z-index: 4;position:absolute;top:' + operation_y + 'px;left:' + operation_x+'px;font-size:13px;"><input onclick="toggleCompletelyOffCompartmentDisplay(' + block.id + ',\'operation\');" name="your_name" value="your_value" type="checkbox" ' + checked + '> operations</div>';

	// part
	if ( block.parts_completely_visible_off == true ) checked = '';
	else checked = 'checked';
	html = html + '<div style="z-index: 4;position:absolute;top:' + part_y + 'px;left:' + part_x+'px;font-size:13px;"><input onclick="toggleCompletelyOffCompartmentDisplay(' + block.id + ',\'part\');" name="your_name" value="your_value" type="checkbox" ' + checked + '> parts</div>';

	// reference
	if ( block.references_completely_visible_off == true ) checked = '';
	else checked = 'checked';
	html = html + '<div style="z-index: 4;position:absolute;top:' + reference_y + 'px;left:' + reference_x+'px;font-size:13px;"><input onclick="toggleCompletelyOffCompartmentDisplay(' + block.id + ',\'reference\');" name="your_name" value="your_value" type="checkbox" ' + checked + '> references</div>';

	// value
	if ( block.values_completely_visible_off == true ) checked = '';
	else checked = 'checked';
	html = html + '<div style="z-index: 4;position:absolute;top:' + value_y + 'px;left:' + value_x+'px;font-size:13px;"><input onclick="toggleCompletelyOffCompartmentDisplay(' + block.id + ',\'value\');" name="your_name" value="your_value" type="checkbox" ' + checked + '> values</div>';

	// property
	if ( block.properties_completely_visible_off == true ) checked = '';
	else checked = 'checked';
	html = html + '<div style="z-index: 4;position:absolute;top:' + property_y + 'px;left:' + property_x+'px;font-size:13px;"><input onclick="toggleCompletelyOffCompartmentDisplay(' + block.id + ',\'property\');" name="your_name" value="your_value" type="checkbox" ' + checked + '> properties</div>';

	return html;
}

function changeAllConnectionType( theConnectionType ) {
	CONFIG_connection_line_display = theConnectionType;
	/**
	var numberOfConnections = connections.length;
	for (var i = 0; i < numberOfConnections; i++) {
		connections[i].type = theConnectionType ;
	}	*/
	invalidate();
}


function changeBlockColor( blockId , color ) {
	var block =  _findObjectById( blocks , blockId );
	block.color = color;
	console.log(block.color);
	invalidate();
}

function openDialog( blockId ) {
	var block =  _findObjectById( blocks , blockId );
	clearContextSensitiveIcons();


	var html = '';
	var checked = '';

	html += '<div style="padding:0px;margin:0px;">';
 	html += '<b>' + block.name + ' <small><a href="javascript:editBlockName(\'' + blockId + '\');">edit name</a></small></b> ';
 	// constraint
	if ( block.constraints_completely_visible_off == true ) checked = '';
	else checked = 'checked';
	html = html + '<input onclick="toggleCompletelyOffCompartmentDisplay(\'' + block.id + '\',\'constraint\');" name="your_name" value="your_value" type="checkbox" ' + checked + '> constraints &nbsp;&nbsp;';

	// operation
	if ( block.operations_completely_visible_off == true ) checked = '';
	else checked = 'checked';
	html = html + '<input onclick="toggleCompletelyOffCompartmentDisplay(\'' + block.id + '\',\'operation\');" name="your_name" value="your_value" type="checkbox" ' + checked + '> operations &nbsp;&nbsp;';

	// part
	if ( block.parts_completely_visible_off == true ) checked = '';
	else checked = 'checked';
	html = html + '<input onclick="toggleCompletelyOffCompartmentDisplay(\'' + block.id + '\',\'part\');" name="your_name" value="your_value" type="checkbox" ' + checked + '> parts &nbsp;&nbsp;';

	// reference
	if ( block.references_completely_visible_off == true ) checked = '';
	else checked = 'checked';
	html = html + '<input onclick="toggleCompletelyOffCompartmentDisplay(\'' + block.id + '\',\'reference\');" name="your_name" value="your_value" type="checkbox" ' + checked + '> references &nbsp;&nbsp;';

	// value
	if ( block.values_completely_visible_off == true ) checked = '';
	else checked = 'checked';
	html = html + '<input onclick="toggleCompletelyOffCompartmentDisplay(\'' + block.id + '\',\'value\');" name="your_name" value="your_value" type="checkbox" ' + checked + '> values &nbsp;&nbsp;';

	// property
	if ( block.properties_completely_visible_off == true ) checked = '';
	else checked = 'checked';
	html = html + '<input onclick="toggleCompletelyOffCompartmentDisplay(\'' + block.id + '\',\'property\');" name="your_name" value="your_value" type="checkbox" ' + checked + '> properties &nbsp;&nbsp;';

	html += '</div>';
	TINY.box.show({html:html,animate:true,close:false,boxid:'error',top:block.y});
}

function openImage(file) {
	TINY.box.show({image:file,animate:true,close:true,boxid:'frameless',top:50});
}


function openEditConnectionDialogNoJQueryMobile( connId ) {
	var connection =  _findObjectById( connections , connId );
	var content = '';

	content += '<div style="padding:0px;margin:0px;">';
	content += '<b>' + connection.name + '<small><br><a href="javascript:editConnectionName(\'' + connection.id + '\');">Edit name</a></small></b><br><br> ';
	content += '<b>change connection type</b><br>';
	content += '<small>';
 	content += '<a href="javascript:changeConnectionTypeNoJQueryMobile(\'' + connection.id + '\',\'dependency\');">Dependency</a><br>';
	content += '<a href="javascript:changeConnectionTypeNoJQueryMobile(\'' + connection.id + '\',\'generalization\');">Generalization</a><br>';
	content += '<a href="javascript:changeConnectionTypeNoJQueryMobile(\'' + connection.id + '\',\'association\');">Association</a><br>';
	content += '<a href="javascript:changeConnectionTypeNoJQueryMobile(\'' + connection.id + '\',\'partassociation\');">PartAssociation</a><br>';
	content += '<a href="javascript:changeConnectionTypeNoJQueryMobile(\'' + connection.id + '\',\'sharedassociation\');">SharedAssociation</a><br>';
	content += '</small>';
	content += '</div>';

	TINY.box.show({html:content,animate:true,close:false,boxid:'error',top:connection.y});
}


function changeConnectionTypeNoJQueryMobile( connId , connType) {
	var connection =  _findObjectById( connections , connId );
	connection.type = connType;
	invalidate();
	TINY.box.hide();
}


function changeConnectionType( connId , connType) {
	var connection =  _findObjectById( connections , connId );
	connection.type = connType;
	$('#connection_dialog').popup("close");
	invalidate();
}

function deleteConnection( connId ) {
	if (confirm('Delete this connection from the diagram?')) {
			_removeArrayObjectById( connections , connId );
			invalidate();
			$('#connection_dialog').popup("close");
	}
}


function editConnectionName( connId ) {
	var connection =  _findObjectById( connections , connId );
	var new_connection_name = prompt('Enter new connection name',connection.name);
	if (new_connection_name == '') return;
	connection.name = new_connection_name;
	invalidate();
	$('#connection_dialog').popup("close");
}

function guid() {
  return Math.floor((1 + Math.random()) * 0x10000)
             .toString(16)
             .substring(1);
}

//function guid() {
//  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
//        s4() + '-' + s4() + s4() + s4();
//}


function clearContextSensitiveIcons() {
	//console.debug('clearContextSensitiveIcons()');
	$( '#infoControls' ).html('');
	$( '#connectionControls' ).html('');
	$( '#blockControls' ).html('');
	$( '#constraintControls' ).html('');
	$( '#operationControls' ).html('');
	$( '#partControls' ).html('');
	$( '#referenceControls' ).html('');
	$( '#valueControls' ).html('');
	$( '#propertyControls' ).html('');
	$( '#properties' ).hide();
	$( '#blockName' ).html( '' );
}

function toggleCompartmentDisplay( theBlockId ) {
	var block =  _findObjectById( blocks , theBlockId );
	block.all_compartment_visible = !block.all_compartment_visible;
	if (block.all_compartment_visible) {
		block.constraints_visible = true;
	    block.operations_visible = true;
	    block.parts_visible = true;
		block.references_visible = true;
		block.values_visible = true;
		block.properties_visible = true;
	}
	invalidate();
	clearContextSensitiveIcons();
}

function toggleConstraintCompartmentDisplay( theBlockId ) {
	var block =  _findObjectById( blocks , theBlockId );
	block.constraints_visible = !block.constraints_visible;
	invalidate();
	clearContextSensitiveIcons();
}

function toggleOperationCompartmentDisplay( theBlockId ) {
	var block =  _findObjectById( blocks , theBlockId );
	block.operations_visible = !block.operations_visible;
	invalidate();
	clearContextSensitiveIcons();
}

function togglePartCompartmentDisplay( theBlockId ) {
	var block =  _findObjectById( blocks , theBlockId );
	block.parts_visible = !block.parts_visible;
	invalidate();
	clearContextSensitiveIcons();
}

function toggleReferenceCompartmentDisplay( theBlockId ) {
	var block =  _findObjectById( blocks , theBlockId );
	block.references_visible = !block.references_visible;
	invalidate();
	clearContextSensitiveIcons();
}

function toggleValueCompartmentDisplay( theBlockId ) {
	var block =  _findObjectById( blocks , theBlockId );
	block.values_visible = !block.values_visible;
	invalidate();
	clearContextSensitiveIcons();
}

function togglePropertyCompartmentDisplay( theBlockId ) {
	var block =  _findObjectById( blocks , theBlockId );
	block.properties_visible = !block.properties_visible;
	invalidate();
	clearContextSensitiveIcons();
}


function editBlockName( theEditingBlockId ) {
	var block =  _findObjectById( blocks , theEditingBlockId );
	var new_block_name = prompt('Enter new block name',block.name);
	if (new_block_name == '') return;
	block.name = new_block_name;
	invalidate();
	mySel = null;
	$('#popupMenu').popup("close");
}

function deleteBlock( theDeletingBlockId , useConfirmDialog ) {

	if (useConfirmDialog) {
		if (confirm('Delete this model from the diagram?')) {

			// modified at Monday 24 2014 - 4:52PM
			// start to delete all connections that assoicaed to this block.
			var target = [];
			var numberOfConnections = connections.length;
			for (var i = 0; i < numberOfConnections; i++) {
				if ( connections[i].block1.id == theDeletingBlockId  || 
					connections[i].block2.id == theDeletingBlockId )
				{
					target.push(connections[i].id);
				}			
			}

			var numberOfTargets = target.length;
			for (var i = 0; i < numberOfTargets; i++) {
				_removeArrayObjectById( connections , target[i] );	
			}
			///////////////////////////////////////////////////////////////

			_removeArrayObjectById( blocks , theDeletingBlockId );	

		}
	}

	mySel = null;
	invalidate();
}

function toggleCompletelyOffCompartmentDisplay( theBlockId , partType ) {
	var block =  _findObjectById( blocks , theBlockId );
	if (partType == 'constraint') {
		block.constraints_completely_visible_off = !block.constraints_completely_visible_off;
	}else if (partType == 'operation') {
		block.operations_completely_visible_off = !block.operations_completely_visible_off;
	}else if (partType == 'part') {
		block.parts_completely_visible_off = !block.parts_completely_visible_off;
	}else if (partType == 'reference') {
		block.references_completely_visible_off = !block.references_completely_visible_off;
	}else if (partType == 'value') {
		block.values_completely_visible_off = !block.values_completely_visible_off;
	}else if (partType == 'property') {
		block.properties_completely_visible_off = !block.properties_completely_visible_off;
	}    
	invalidate();
	clearContextSensitiveIcons();
}

function addBlockAttribute( theBlockId , partType ) {
	var block =  _findObjectById( blocks , theBlockId );
	var new_part_name = prompt('Enter new ' + partType,'');
	if (new_part_name == null || new_part_name == '') return;
	if (partType == 'constraint') {
		var obj = new Constraint;
		obj.id = guid();
		obj.name  = new_part_name;
		obj.note = '';
		block.constraints.push( obj );
	}else if (partType == 'operation') {
		var obj = new Operation;
		obj.id = guid();
		obj.name  = new_part_name;
		obj.note = '';
		block.operations.push( obj );
	}else if (partType == 'part') {
		var obj = new Part;
		obj.id = guid();
		obj.name  = new_part_name;
		obj.note = '';
		block.parts.push( obj );
	}else if (partType == 'reference') {
		var obj = new Reference;
		obj.id = guid();
		obj.name  = new_part_name;
		obj.note = '';
		block.references.push( obj );
	}else if (partType == 'value') {
		var obj = new Value;
		obj.id = guid();
		obj.name  = new_part_name;
		obj.note = '';
		block.values.push( obj );
	}else if (partType == 'property') {
		var obj = new Property;
		obj.id = guid();
		obj.name  = new_part_name;
		obj.note = '';
		block.properties.push( obj );
	}    
	mySel = null;
	invalidate();
	$('#popupMenu').popup("close");
}

function editBlockAttribute( theBlockId , theAttributeName, partType ) {
	var theBlock =  _findObjectById( blocks , theBlockId );

	if (partType == 'constraint') {
		var theAttribute =  _findObjectByName( theBlock.constraints , theAttributeName );		
	}else if (partType == 'operation') {
		var theAttribute =  _findObjectByName( theBlock.operations , theAttributeName );
	}else if (partType == 'part') {
		var theAttribute =  _findObjectByName( theBlock.parts , theAttributeName );
	}else if (partType == 'reference') {
		var theAttribute =  _findObjectByName( theBlock.references , theAttributeName );
	}else if (partType == 'value') {
		var theAttribute =  _findObjectByName( theBlock.values , theAttributeName );
	}else if (partType == 'property') {
		var theAttribute =  _findObjectByName( theBlock.properties , theAttributeName );
	}     

	var new_attribute_name = prompt('Enter new ' + partType + ' name', theAttribute.name);
	if (new_attribute_name == '') return;
	theAttribute.name = new_attribute_name;
	mySel = null;
	invalidate();
	$('#popupMenu').popup("close");
}

function editCompartmentNote( theBlockId , theAttributeName, partType ) {
	var theBlock =  _findObjectById( blocks , theBlockId );

	if (partType == 'constraint') {
		var theAttribute =  _findObjectByName( theBlock.constraints , theAttributeName );		
	}else if (partType == 'operation') {
		var theAttribute =  _findObjectByName( theBlock.operations , theAttributeName );
	}else if (partType == 'part') {
		var theAttribute =  _findObjectByName( theBlock.parts , theAttributeName );
	}else if (partType == 'reference') {
		var theAttribute =  _findObjectByName( theBlock.references , theAttributeName );
	}else if (partType == 'value') {
		var theAttribute =  _findObjectByName( theBlock.values , theAttributeName );
	}else if (partType == 'property') {
		var theAttribute =  _findObjectByName( theBlock.properties , theAttributeName );
	}     

	var new_attribute_note = prompt('Enter new ' + partType + ' note', theAttribute.note);
	theAttribute.note = new_attribute_note;
	invalidate();
	$('#popupMenu').popup("close");
}

function deleteBlockAttribute( theBlockId , theAttributeName, partType, useConfirmDialog ) {
	var theBlock =  _findObjectById( blocks , theBlockId );

	if (partType == 'constraint') {
		if (useConfirmDialog) {
			if (confirm('Delete this ' + partType + ' from the block?')) {
				_removeArrayObjectByName( theBlock.constraints , theAttributeName );
				$('#popupMenu').popup("close");
			}
		}else{
			_removeArrayObjectByName( theBlock.constraints , theAttributeName );
		}	
	}else if (partType == 'operation') {
		if (useConfirmDialog) {
			if (confirm('Delete this ' + partType + ' from the block?')) {
				_removeArrayObjectByName( theBlock.operations , theAttributeName );
				$('#popupMenu').popup("close");
			}
		}else{
			_removeArrayObjectByName( theBlock.operations , theAttributeName );
		}	
	}else if (partType == 'part') {
		if (useConfirmDialog) {
			if (confirm('Delete this ' + partType + ' from the block?')) {
				_removeArrayObjectByName( theBlock.parts , theAttributeName );
				$('#popupMenu').popup("close");
			}
		}else{
			_removeArrayObjectByName( theBlock.operations , theAttributeName );
		}	
	}else if (partType == 'reference') {
		if (useConfirmDialog) {
			if (confirm('Delete this ' + partType + ' from the block?')) {
				_removeArrayObjectByName( theBlock.references , theAttributeName );
				$('#popupMenu').popup("close");
			}
		}else{
			_removeArrayObjectByName( theBlock.operations , theAttributeName );
		}	
	}else if (partType == 'value') {
		if (useConfirmDialog) {
			if (confirm('Delete this ' + partType + ' from the block?')) {
				_removeArrayObjectByName( theBlock.values , theAttributeName );
				$('#popupMenu').popup("close");
			}
		}else{
			_removeArrayObjectByName( theBlock.operations , theAttributeName );
		}	
	}else if (partType == 'property') {
		if (useConfirmDialog) {
			if (confirm('Delete this ' + partType + ' from the block?')) {
				_removeArrayObjectByName( theBlock.properties , theAttributeName );
				$('#popupMenu').popup("close");
			}
		}else{
			_removeArrayObjectByName( theBlock.operations , theAttributeName );
		}	
	}     
	mySel = null;
	invalidate();
	
}
