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

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function openLoadModelRepoDialog(){
	clearContextSensitiveIcons();
	$("#json").html('');
	$.mobile.changePage("#load_model_repo_dialog");
}

function exportModel(){
	clearContextSensitiveIcons();

	var model_repo = new Object();
	model_repo.id = "JR45-WER3545-TWERTWET-3453452";
	model_repo.name = 'Example Model Repo';
	model_repo.creator = 'Vorachet Jaroensawas';
	model_repo.creation_date = 'Monday 10 2014 - 10:55PM';
	model_repo.last_update = 'Monday 10 2014 - 10:55PM';

	model_repo.blocks = [];
	model_repo.connections = [];

	var numberOfBlocks = blocks.length;
	for (var i = 0; i < numberOfBlocks; i++) {
		var block_json = new Object();
		block_json.id = blocks[i].id;
		block_json.name = blocks[i].name;
		block_json.x = blocks[i].x;
		block_json.y = blocks[i].y;
		block_json.w = blocks[i].w;
		block_json.h = blocks[i].h;
		block_json.constraints = [];
		block_json.operations = [];
		block_json.parts = [];
		block_json.references = [];
		block_json.values = [];
		block_json.properties = [];

		var numberOfConstraints = blocks[i].constraints.length;
		for (var j = 0; j < numberOfConstraints; j++) {
			var elem_json = new Object();
			elem_json.name = blocks[i].constraints[j].name;
			elem_json.highlight = blocks[i].constraints[j].highlight;
			elem_json.note = blocks[i].constraints[j].note;
			
			block_json.constraints.push(elem_json);
		}

		var numberOfOperations = blocks[i].operations.length;
		for (var j = 0; j < numberOfOperations; j++) {
			var elem_json = new Object();
			elem_json.name = blocks[i].operations[j].name;
			elem_json.highlight = blocks[i].operations[j].highlight;
			elem_json.note = blocks[i].operations[j].note;
			
			block_json.operations.push(elem_json);
		}

		var numberOfParts = blocks[i].parts.length;
		for (var j = 0; j < numberOfParts; j++) {
			var elem_json = new Object();
			elem_json.name = blocks[i].parts[j].name;
			elem_json.highlight = blocks[i].parts[j].highlight;
			elem_json.note = blocks[i].parts[j].note;
			
			block_json.parts.push(elem_json);
		}

		var numberOfReferences = blocks[i].references.length;
		for (var j = 0; j < numberOfReferences; j++) {
			var elem_json = new Object();
			elem_json.name = blocks[i].references[j].name;
			elem_json.highlight = blocks[i].references[j].highlight;
			elem_json.note = blocks[i].references[j].note;
			
			block_json.references.push(elem_json);
		}

		var numberOfValues = blocks[i].values.length;
		for (var j = 0; j < numberOfValues; j++) {
			var elem_json = new Object();
			elem_json.name = blocks[i].values[j].name;
			elem_json.highlight = blocks[i].values[j].highlight;
			elem_json.note = blocks[i].values[j].note;
			
			block_json.values.push(elem_json);
		}

		var numberOfProperties = blocks[i].properties.length;
		for (var j = 0; j < numberOfProperties; j++) {
			var elem_json = new Object();
			elem_json.name = blocks[i].properties[j].name;
			elem_json.highlight = blocks[i].properties[j].highlight;
			elem_json.note = blocks[i].properties[j].note;
			
			block_json.properties.push(elem_json);
		}


		model_repo.blocks.push(block_json);


	}

	var numberOfConnection = connections.length;
	for (var i = 0; i < numberOfConnection; i++) {
		var connection_json = new Object();
		connection_json.id = connections[i].id;
		connection_json.name = connections[i].name;
		connection_json.type = connections[i].type;
		connection_json.src = connections[i].block1.id;
		connection_json.dest = connections[i].block2.id;

		model_repo.connections.push(connection_json);
	}

	var json = '{"model_repo":' + JSON.stringify(model_repo) + '}';
	console.debug(json);
	$("#exported_json").html(json);
}


function serializeToJSON(){
	clearContextSensitiveIcons();

	var model_repo = new Object();
	model_repo.id = "JR45-WER3545-TWERTWET-3453452";
	model_repo.name = 'Example Model Repo';
	model_repo.creator = 'Vorachet Jaroensawas';
	model_repo.creation_date = 'Monday 10 2014 - 10:55PM';
	model_repo.last_update = 'Monday 10 2014 - 10:55PM';

	model_repo.blocks = [];
	model_repo.connections = [];

	var numberOfBlocks = blocks.length;
	for (var i = 0; i < numberOfBlocks; i++) {
		var block_json = new Object();
		block_json.id = blocks[i].id;
		block_json.name = blocks[i].name;
		block_json.x = blocks[i].x;
		block_json.y = blocks[i].y;
		block_json.w = blocks[i].w;
		block_json.h = blocks[i].h;
		block_json.constraints = [];
		block_json.operations = [];
		block_json.parts = [];
		block_json.references = [];
		block_json.values = [];
		block_json.properties = [];

		var numberOfConstraints = blocks[i].constraints.length;
		for (var j = 0; j < numberOfConstraints; j++) {
			var elem_json = new Object();
			elem_json.name = blocks[i].constraints[j].name;
			elem_json.highlight = blocks[i].constraints[j].highlight;
			elem_json.note = blocks[i].constraints[j].note;
			
			block_json.constraints.push(elem_json);
		}

		var numberOfOperations = blocks[i].operations.length;
		for (var j = 0; j < numberOfOperations; j++) {
			var elem_json = new Object();
			elem_json.name = blocks[i].operations[j].name;
			elem_json.highlight = blocks[i].operations[j].highlight;
			elem_json.note = blocks[i].operations[j].note;
			
			block_json.operations.push(elem_json);
		}

		var numberOfParts = blocks[i].parts.length;
		for (var j = 0; j < numberOfParts; j++) {
			var elem_json = new Object();
			elem_json.name = blocks[i].parts[j].name;
			elem_json.highlight = blocks[i].parts[j].highlight;
			elem_json.note = blocks[i].parts[j].note;
			
			block_json.parts.push(elem_json);
		}

		var numberOfReferences = blocks[i].references.length;
		for (var j = 0; j < numberOfReferences; j++) {
			var elem_json = new Object();
			elem_json.name = blocks[i].references[j].name;
			elem_json.highlight = blocks[i].references[j].highlight;
			elem_json.note = blocks[i].references[j].note;
			
			block_json.references.push(elem_json);
		}

		var numberOfValues = blocks[i].values.length;
		for (var j = 0; j < numberOfValues; j++) {
			var elem_json = new Object();
			elem_json.name = blocks[i].values[j].name;
			elem_json.highlight = blocks[i].values[j].highlight;
			elem_json.note = blocks[i].values[j].note;
			
			block_json.values.push(elem_json);
		}

		var numberOfProperties = blocks[i].properties.length;
		for (var j = 0; j < numberOfProperties; j++) {
			var elem_json = new Object();
			elem_json.name = blocks[i].properties[j].name;
			elem_json.highlight = blocks[i].properties[j].highlight;
			elem_json.note = blocks[i].properties[j].note;
			
			block_json.properties.push(elem_json);
		}


		model_repo.blocks.push(block_json);


	}

	var numberOfConnection = connections.length;
	for (var i = 0; i < numberOfConnection; i++) {
		var connection_json = new Object();
		connection_json.id = connections[i].id;
		connection_json.name = connections[i].name;
		connection_json.type = connections[i].type;
		connection_json.src = connections[i].block1.id;
		connection_json.dest = connections[i].block2.id;

		model_repo.connections.push(connection_json);
	}

	var json = '{"model_repo":' + JSON.stringify(model_repo) + '}';
	console.debug(json);
	$("#exported_json").html(json);
	$.mobile.changePage("#export_page");
}



function loadModel( json ){

	if(!IsJsonString(json)){
		alert('Your JSON is not valid');
		return;
	}

	// clear the current blocks
	blocks = []; 
	mySel = null;
	connections = [];
	myConnectionSel = null;
	clearContextSensitiveIcons();

	obj = JSON.parse(json);
	//console.debug(obj.model_repo.id);
	//console.debug(obj.model_repo.name);
	//console.debug(obj.model_repo.creator);
	//console.debug(obj.model_repo.creation_date);
	//console.debug(obj.model_repo.last_update);
	
	for (var block in obj.model_repo.blocks) {

		var theBlock = new Block;
		theBlock.id = obj.model_repo.blocks[block].id;
		theBlock.name = obj.model_repo.blocks[block].name;
		theBlock.x = obj.model_repo.blocks[block].x;
		theBlock.y = obj.model_repo.blocks[block].y;
		theBlock.w = obj.model_repo.blocks[block].w;
		theBlock.h = obj.model_repo.blocks[block].h;
		theBlock.fill = obj.model_repo.blocks[block].white;

    	//console.debug(obj.model_repo.blocks[block].id);
    	//console.debug(obj.model_repo.blocks[block].name);

    	for (var constraint in obj.model_repo.blocks[block].constraints){
    		//console.debug(obj.model_repo.blocks[block].constraints[constraint].name);
    		//console.debug(obj.model_repo.blocks[block].constraints[constraint].highlight);
    		//console.debug(obj.model_repo.blocks[block].constraints[constraint].note);

    		var elobj = new Constraint;
			elobj.name  = obj.model_repo.blocks[block].constraints[constraint].name;
			elobj.highlight = obj.model_repo.blocks[block].constraints[constraint].highlight;
			elobj.note = obj.model_repo.blocks[block].constraints[constraint].note;
			theBlock.constraints.push( elobj );
    	}

    	for (var operation in obj.model_repo.blocks[block].operations){
    		//console.debug(obj.model_repo.blocks[block].operations[operation].name);
    		//console.debug(obj.model_repo.blocks[block].operations[operation].highlight);
    		//console.debug(obj.model_repo.blocks[block].operations[operation].note);

    		var elobj = new Operation;
			elobj.name = obj.model_repo.blocks[block].operations[operation].name;
			elobj.highlight = obj.model_repo.blocks[block].operations[operation].highlight;
			elobj.note = obj.model_repo.blocks[block].operations[operation].note;
			theBlock.operations.push( elobj );
    	}

    	for (var part in obj.model_repo.blocks[block].parts){
    		//console.debug(obj.model_repo.blocks[block].parts[part].name);
    		//console.debug(obj.model_repo.blocks[block].parts[part].highlight);
    		//console.debug(obj.model_repo.blocks[block].parts[part].note);

    		var elobj = new Part;
			elobj.name  = obj.model_repo.blocks[block].parts[part].name;
			elobj.highlight = obj.model_repo.blocks[block].parts[part].highlight;
			elobj.note = obj.model_repo.blocks[block].parts[part].note;
			theBlock.parts.push( elobj );
    	}

    	for (var reference in obj.model_repo.blocks[block].references){
    		//console.debug(obj.model_repo.blocks[block].references[reference].name);
    		//console.debug(obj.model_repo.blocks[block].references[reference].highlight);
    		//console.debug(obj.model_repo.blocks[block].references[reference].note);

    		var elobj = new Reference;
			elobj.name  = obj.model_repo.blocks[block].references[reference].name;
			elobj.highlight = obj.model_repo.blocks[block].references[reference].highlight;
			elobj.note = obj.model_repo.blocks[block].references[reference].note;
			theBlock.references.push( elobj );
    	}

    	for (var value in obj.model_repo.blocks[block].values){
    		//console.debug(obj.model_repo.blocks[block].values[value].name);
    		//console.debug(obj.model_repo.blocks[block].values[value].highlight);
    		//console.debug(obj.model_repo.blocks[block].values[value].note);

    		var elobj = new Value;
			elobj.name = obj.model_repo.blocks[block].values[value].name;
			elobj.highlight = obj.model_repo.blocks[block].values[value].highlight;
			elobj.note = obj.model_repo.blocks[block].values[value].note;
			theBlock.values.push( elobj );
    	}

    	for (var property in obj.model_repo.blocks[block].properties){
    		//console.debug(obj.model_repo.blocks[block].properties[property].name);
    		//console.debug(obj.model_repo.blocks[block].properties[property].highlight);
    		//console.debug(obj.model_repo.blocks[block].properties[property].note);

    		var elobj = new Property;
			elobj.name = obj.model_repo.blocks[block].properties[property].name;
			elobj.highlight = obj.model_repo.blocks[block].properties[property].highlight;
			elobj.note = obj.model_repo.blocks[block].properties[property].note;
			theBlock.properties.push( elobj );
    	}

    	blocks.push( theBlock );
 	}

 	for (var connection in obj.model_repo.connections) {

 		//console.debug(obj.model_repo.connections[connection].id);
 		//console.debug(obj.model_repo.connections[connection].name);
 		//console.debug(obj.model_repo.connections[connection].src);
 		//console.debug(obj.model_repo.connections[connection].dest);
 		//console.debug(obj.model_repo.connections[connection].type);

		var src_block =  _findObjectById( blocks , obj.model_repo.connections[connection].src );
		var dest_block =  _findObjectById( blocks , obj.model_repo.connections[connection].dest );
		var theConnection = new Connection(
				src_block,
				dest_block,
				obj.model_repo.connections[connection].type);
		theConnection.id = obj.model_repo.connections[connection].id;
		theConnection.name = obj.model_repo.connections[connection].name;
		theConnection.type = obj.model_repo.connections[connection].type;
		connections.push( theConnection );
	}

 	invalidate();
}

function loadModelRepoWithTestData(){
	var json = '{"model_repo":{"id":"JR45-WER3545-TWERTWET-3453452","name":"AutomotiveDomain","creator":"Vorachet Jaroensawas","creation_date":"Friday 21 2014 - 7:55PM","last_update":"Friday 21 2014 - 7:55PM","blocks":[{"id":"4CC36197493EF75EBF38267E9FD2A775","name":"HybridSUV","x":266,"y":28,"w":484,"h":179,"constraints":[],"operations":[],"parts":[],"references":[],"values":[],"properties":[]},{"id":"78BF19FCF61F9DB119BE6E5EF663D4A5","name":"BodySubsystem","x":383,"y":435,"w":110,"h":186,"constraints":[],"operations":[],"parts":[],"references":[],"values":[],"properties":[]},{"id":"D1914DFA428B3DF9FFCCD65161694A04","name":"InteriorSubsystem","x":526,"y":439,"w":120,"h":173,"constraints":[],"operations":[],"parts":[],"references":[],"values":[],"properties":[]},{"id":"3493B429F29944B10B40C2825F23A931","name":"LightingSubsystem","x":675,"y":440,"w":127,"h":191,"constraints":[],"operations":[],"parts":[],"references":[],"values":[],"properties":[]},{"id":"C20473DF8D7370C5603231C7980E23A8","name":"BrakeSubsystem","x":234,"y":435,"w":114,"h":183,"constraints":[],"operations":[],"parts":[],"references":[],"values":[],"properties":[]},{"id":"9BA17166D7DB4B8F134286C08FEA98E8","name":"ChassisSubsytem","x":836,"y":436,"w":113,"h":176,"constraints":[],"operations":[],"parts":[],"references":[],"values":[],"properties":[]},{"id":"E0A8F0C8D44079587134BB4DCC41D23D","name":"BrakePedal","x":145,"y":946,"w":116,"h":185,"constraints":[],"operations":[],"parts":[],"references":[],"values":[],"properties":[]},{"id":"9C2F9F5102A5FB172A72D90E3B71C816","name":"WheelHubAssembly","x":797,"y":818,"w":119,"h":180,"constraints":[],"operations":[],"parts":[],"references":[],"values":[],"properties":[]},{"id":"774A54F0040460606BEAFCB35EFC9F9E","name":"PowerSubsystem","x":50,"y":571,"w":125,"h":172,"constraints":[],"operations":[],"parts":[],"references":[],"values":[],"properties":[]}],"connections":[{"id":"94E463261EDD0010CF8AD4C7C5D61D22","name":"conn::HybridSUV::PowerSubsystem","type":"partassociation","src":"4CC36197493EF75EBF38267E9FD2A775","dest":"774A54F0040460606BEAFCB35EFC9F9E"},{"id":"8F4E51D5CA671C411289865A28CA574B","name":"conn::HybridSUV::BrakeSubsystem","type":"partassociation","src":"4CC36197493EF75EBF38267E9FD2A775","dest":"C20473DF8D7370C5603231C7980E23A8"},{"id":"29FD7FAB5C64C36BFF000E8636D3701A","name":"conn::HybridSUV::BodySubsystem","type":"partassociation","src":"4CC36197493EF75EBF38267E9FD2A775","dest":"78BF19FCF61F9DB119BE6E5EF663D4A5"},{"id":"FA00B5239CE5BD7360EDFAFA53738B3F","name":"conn::HybridSUV::InteriorSubsystem","type":"partassociation","src":"4CC36197493EF75EBF38267E9FD2A775","dest":"D1914DFA428B3DF9FFCCD65161694A04"},{"id":"C9525BDC793CC06C92C525E800E043FA","name":"conn::HybridSUV::LightingSubsystem","type":"partassociation","src":"4CC36197493EF75EBF38267E9FD2A775","dest":"3493B429F29944B10B40C2825F23A931"},{"id":"7A2D24268FA0DC41D49F6C916044DDAB","name":"conn::HybridSUV::ChassisSubsytem","type":"partassociation","src":"4CC36197493EF75EBF38267E9FD2A775","dest":"9BA17166D7DB4B8F134286C08FEA98E8"},{"id":"BBD8EEC12AC0A78AB1975F8FAA5F3F92","name":"conn::PowerSubsystem::BrakePedal","type":"sharedassociation","src":"774A54F0040460606BEAFCB35EFC9F9E","dest":"E0A8F0C8D44079587134BB4DCC41D23D"},{"id":"2BD0402F8E718D0BA23DEE72739F3FDF","name":"conn::BrakeSubsystem::BrakePedal","type":"partassociation","src":"C20473DF8D7370C5603231C7980E23A8","dest":"E0A8F0C8D44079587134BB4DCC41D23D"},{"id":"968324AD09027E08AFDACAD555521808","name":"4","type":"partassociation","src":"9BA17166D7DB4B8F134286C08FEA98E8","dest":"9C2F9F5102A5FB172A72D90E3B71C816"},{"id":"E982A9C2CAD0E7012C5D1EE9D886D831","name":"2","type":"sharedassociation","src":"774A54F0040460606BEAFCB35EFC9F9E","dest":"9C2F9F5102A5FB172A72D90E3B71C816"}]}}';

	loadModel(json);
}

function loadModelRepoWithTestData2(){
	var json = '{"model_repo":{"id":"JR45-WER3545-TWERTWET-3453452","name":"Example Model Repo","creator":"Vorachet Jaroensawas","creation_date":"Monday 10 2014 - 10:55PM","last_update":"Monday 10 2014 - 10:55PM","blocks":[{"id":"7FBBF4B9BEE2F62DF7876ACF99699892","name":1,"x":64,"y":30,"w":160,"h":180,"constraints":[],"operations":[],"parts":[],"references":[],"values":[],"properties":[]},{"id":"C604CABB3CEA5650A2EE63B50D781AB3","name":2,"x":527,"y":99,"w":160,"h":180,"constraints":[],"operations":[],"parts":[],"references":[],"values":[],"properties":[]},{"id":"6C2088AE0BB6F02F656EFB94E2FE49DE","name":4,"x":906,"y":69,"w":160,"h":180,"constraints":[],"operations":[],"parts":[],"references":[],"values":[],"properties":[]},{"id":"212C758059A44BF7DDB3D1301FE9AFC6","name":6,"x":903,"y":363,"w":160,"h":180,"constraints":[],"operations":[],"parts":[],"references":[],"values":[],"properties":[]},{"id":"84DE2659C111A428C78D8F4D2866783A","name":5,"x":126,"y":298,"w":160,"h":180,"constraints":[],"operations":[],"parts":[],"references":[],"values":[],"properties":[]},{"id":"767DD5849C667855CED63C9E92C4FC6B","name":"AutomotiveDomain","x":98,"y":588,"w":240,"h":380,"constraints":[{"name":"{ x > y }","highlight":false,"note":""},{"name":"{ a = b + c / d}","highlight":false,"note":""}],"operations":[{"name":"operation1(p1: Type1): Type2","highlight":false,"note":""},{"name":"setLightingSubsystem(p1: Type1): void","highlight":false,"note":""}],"parts":[{"name":"property1 : Engine","highlight":false,"note":""},{"name":"property2 : LightingSubsystem","highlight":false,"note":""}],"references":[{"name":"property1 : Engine[0..3] ordered","highlight":false,"note":""},{"name":"property2 : LightingSubsystem[0..3] ordered","highlight":false,"note":""}],"values":[{"name":"property1 : Integer = 99  {readonly}","highlight":false,"note":""},{"name":"property2 : Real = 10.0","highlight":false,"note":""}],"properties":[{"name":"property1 : Type1","highlight":false,"note":""},{"name":"property2 : Type2","highlight":false,"note":""}]},{"id":"0A0E406E896ACD3752EF35C820681F08","name":7,"x":573,"y":654,"w":160,"h":180,"constraints":[],"operations":[],"parts":[],"references":[],"values":[],"properties":[]},{"id":"47FEF99AA05B6B92EB7ED80BB20067CF","name":3,"x":634,"y":402,"w":160,"h":180,"constraints":[],"operations":[],"parts":[],"references":[],"values":[],"properties":[]}],"connections":[{"id":"CF54DF0F95E31445E55B0BA4B7A00370","name":"conn::2::1","type":"dependency","src":"C604CABB3CEA5650A2EE63B50D781AB3","dest":"7FBBF4B9BEE2F62DF7876ACF99699892"},{"id":"6D674CDC52F80F9DC753C3825F38A9AF","name":"conn::2::1","type":"dependency","src":"C604CABB3CEA5650A2EE63B50D781AB3","dest":"7FBBF4B9BEE2F62DF7876ACF99699892"},{"id":"58B570ACC792CFA43899CB0DBF1E169B","name":"conn::3::1","type":"sharedassociation","src":"47FEF99AA05B6B92EB7ED80BB20067CF","dest":"7FBBF4B9BEE2F62DF7876ACF99699892"},{"id":"5C84665CA106D51D632DF236A07F19BC","name":"conn::4::2","type":"dependency","src":"6C2088AE0BB6F02F656EFB94E2FE49DE","dest":"C604CABB3CEA5650A2EE63B50D781AB3"},{"id":"BC4F2EA981311CB8787E91742C8C47D6","name":"conn::3::2","type":"dependency","src":"47FEF99AA05B6B92EB7ED80BB20067CF","dest":"C604CABB3CEA5650A2EE63B50D781AB3"},{"id":"5FD4E1EBFF92CA893F6EB367D566AF46","name":"conn::3::4","type":"partassociation","src":"47FEF99AA05B6B92EB7ED80BB20067CF","dest":"6C2088AE0BB6F02F656EFB94E2FE49DE"},{"id":"5962987575A3ADC643F143C09D70CD58","name":"conn::5::2","type":"generalization","src":"84DE2659C111A428C78D8F4D2866783A","dest":"C604CABB3CEA5650A2EE63B50D781AB3"},{"id":"EE6D21D7579DFBB8CB02C6DC9C9A087C","name":"conn::6::4","type":"generalization","src":"212C758059A44BF7DDB3D1301FE9AFC6","dest":"6C2088AE0BB6F02F656EFB94E2FE49DE"},{"id":"B390827408DF7EF15F9F915C7066C206","name":"conn::6::4","type":"dependency","src":"212C758059A44BF7DDB3D1301FE9AFC6","dest":"6C2088AE0BB6F02F656EFB94E2FE49DE"},{"id":"9478CD501556E01A401416C15C99521C","name":"conn::3::5","type":"dependency","src":"47FEF99AA05B6B92EB7ED80BB20067CF","dest":"84DE2659C111A428C78D8F4D2866783A"},{"id":"F948212AFC06098D7DEFEB2BC5D76CEF","name":"conn::7::5","type":"dependency","src":"0A0E406E896ACD3752EF35C820681F08","dest":"84DE2659C111A428C78D8F4D2866783A"},{"id":"FEDB5AD75FC17EA3810DB815AE2E0F01","name":"conn::7::5","type":"dependency","src":"0A0E406E896ACD3752EF35C820681F08","dest":"84DE2659C111A428C78D8F4D2866783A"},{"id":"623B620ABE36EB8BA2A89934EFD082F4","name":"conn::7::3","type":"dependency","src":"0A0E406E896ACD3752EF35C820681F08","dest":"47FEF99AA05B6B92EB7ED80BB20067CF"},{"id":"91C4253BA5483097207D1E143CF79C42","name":"conn::7::AutomotiveDomain","type":"dependency","src":"0A0E406E896ACD3752EF35C820681F08","dest":"767DD5849C667855CED63C9E92C4FC6B"}]}}';
	
	loadModel(json);
}


function loadModelRepoWithTestData3(){
	var json = '{"model_repo":{"id":"JR45-WER3545-TWERTWET-3453452","name":"Example Model Repo","creator":"Vorachet Jaroensawas","creation_date":"Monday 10 2014 - 10:55PM","last_update":"Monday 10 2014 - 10:55PM","blocks":[{"id":"CDDE35B6094C0B9D1773BA7BCBAAE0D0","name":"untitled5","x":9,"y":296,"w":160,"h":180,"constraints":[],"operations":[],"parts":[],"references":[],"values":[],"properties":[]},{"id":"429EA1300BD18D514C6DE165EECBB295","name":"untitled9","x":1204,"y":293,"w":160,"h":180,"constraints":[],"operations":[],"parts":[],"references":[],"values":[],"properties":[]},{"id":"FC17EDD8CB783FADABDCDFAFB90CACAA","name":"untitled10","x":918,"y":610,"w":160,"h":180,"constraints":[],"operations":[],"parts":[],"references":[],"values":[],"properties":[]},{"id":"354B8C6E8429FEBE916197368E9FCF10","name":"untitled14","x":49,"y":911,"w":160,"h":180,"constraints":[],"operations":[],"parts":[],"references":[],"values":[],"properties":[]},{"id":"1562D66BA3BB0846939DA41FAC6E6F2A","name":"untitled4","x":325,"y":600,"w":160,"h":180,"constraints":[],"operations":[],"parts":[],"references":[],"values":[],"properties":[]},{"id":"83BBBAB32125BA12ACF6A4720190147C","name":"untitled6","x":911,"y":17,"w":160,"h":180,"constraints":[],"operations":[],"parts":[],"references":[],"values":[],"properties":[]},{"id":"FD9B63AD6100528094C11C8CEF2A3727","name":"untitled2","x":330,"y":20,"w":160,"h":180,"constraints":[],"operations":[],"parts":[],"references":[],"values":[],"properties":[]},{"id":"5117B692D26866C871B3FDD362D507FD","name":"untitled11","x":620,"y":920,"w":160,"h":180,"constraints":[],"operations":[],"parts":[],"references":[],"values":[],"properties":[]},{"id":"251308A6A8E26084D61D12AC0843F169","name":"untitled12","x":321,"y":1224,"w":160,"h":180,"constraints":[],"operations":[],"parts":[],"references":[],"values":[],"properties":[]},{"id":"55314D940FAF11C786AD3716852A177D","name":"untitled7","x":619,"y":295,"w":160,"h":180,"constraints":[],"operations":[],"parts":[],"references":[],"values":[],"properties":[]},{"id":"89F3423E17DA66DFE73738A434A8A239","name":"untitled2","x":1212,"y":921,"w":160,"h":180,"constraints":[],"operations":[],"parts":[],"references":[],"values":[],"properties":[]},{"id":"6B15DE80A7207BBBB06A093C399FF651","name":"AssociationTestCase","x":919,"y":922,"w":160,"h":180,"constraints":[],"operations":[],"parts":[],"references":[],"values":[],"properties":[]},{"id":"F719333440F72377396F69A06B417CD3","name":"SharedAssociationTestCase","x":321,"y":916,"w":160,"h":180,"constraints":[],"operations":[],"parts":[],"references":[],"values":[],"properties":[]},{"id":"2C453FC3F62A331CA4A6BA54AA6BD10A","name":"DependencyTestCase","x":912,"y":297,"w":160,"h":180,"constraints":[],"operations":[],"parts":[],"references":[],"values":[],"properties":[]},{"id":"FEC0EBECF359F9930C159D10A3EA08BE","name":"untitled3","x":918,"y":1202,"w":160,"h":180,"constraints":[],"operations":[],"parts":[],"references":[],"values":[],"properties":[]},{"id":"918D219C4C299F10653FEDDD4A0539EE","name":"GeneralizationTestCase","x":325,"y":295,"w":160,"h":180,"constraints":[],"operations":[],"parts":[],"references":[],"values":[],"properties":[]},{"id":"A6E9525EA357034DEE861F347991FDCB","name":"PartAssociationTestCase","x":621,"y":599,"w":160,"h":180,"constraints":[],"operations":[],"parts":[],"references":[],"values":[],"properties":[]}],"connections":[{"id":"6E33D2DA6342AEC325683E477AB68323","name":"conn::untitled1::untitled5","type":"generalization","src":"918D219C4C299F10653FEDDD4A0539EE","dest":"CDDE35B6094C0B9D1773BA7BCBAAE0D0"},{"id":"98F8AA84E5B578CF14AB791800F2CB5D","name":"conn::untitled1::untitled4","type":"generalization","src":"918D219C4C299F10653FEDDD4A0539EE","dest":"1562D66BA3BB0846939DA41FAC6E6F2A"},{"id":"39611C216D4D26B2CB06F33958DC06BA","name":"conn::untitled1::untitled2","type":"generalization","src":"918D219C4C299F10653FEDDD4A0539EE","dest":"FD9B63AD6100528094C11C8CEF2A3727"},{"id":"C95A2B704DFBA5F69766E4E64469CC11","name":"conn::untitled8::untitled6","type":"dependency","src":"2C453FC3F62A331CA4A6BA54AA6BD10A","dest":"83BBBAB32125BA12ACF6A4720190147C"},{"id":"343D6C8D71D23E687660A1DD278519E2","name":"conn::untitled8::untitled9","type":"dependency","src":"2C453FC3F62A331CA4A6BA54AA6BD10A","dest":"429EA1300BD18D514C6DE165EECBB295"},{"id":"ECECCA9CD4B3C688A5B4E8BCB99F75AA","name":"conn::untitled8::untitled7","type":"dependency","src":"2C453FC3F62A331CA4A6BA54AA6BD10A","dest":"55314D940FAF11C786AD3716852A177D"},{"id":"6C209B4C689A5C5F72B2C688912A8EFD","name":"conn::untitled8::untitled10","type":"dependency","src":"2C453FC3F62A331CA4A6BA54AA6BD10A","dest":"FC17EDD8CB783FADABDCDFAFB90CACAA"},{"id":"2635D6C7873F977478A49D904A36E93B","name":"conn::untitled1::untitled7","type":"generalization","src":"918D219C4C299F10653FEDDD4A0539EE","dest":"55314D940FAF11C786AD3716852A177D"},{"id":"D6C11DB323C48E4BB0EBC556DD46EB9B","name":"conn::untitled3::untitled7","type":"partassociation","src":"A6E9525EA357034DEE861F347991FDCB","dest":"55314D940FAF11C786AD3716852A177D"},{"id":"C5309205A9B596FD3A5BC1D42002623A","name":"conn::untitled3::untitled4","type":"partassociation","src":"A6E9525EA357034DEE861F347991FDCB","dest":"1562D66BA3BB0846939DA41FAC6E6F2A"},{"id":"15DBE0E81F88AE21AFC20F42EAC85CE1","name":"conn::untitled3::untitled10","type":"partassociation","src":"A6E9525EA357034DEE861F347991FDCB","dest":"FC17EDD8CB783FADABDCDFAFB90CACAA"},{"id":"7FBC71350EF6F7419178228042678282","name":"conn::untitled3::untitled11","type":"partassociation","src":"A6E9525EA357034DEE861F347991FDCB","dest":"5117B692D26866C871B3FDD362D507FD"},{"id":"B676F269E35894A289338712FA7F51D6","name":"conn::untitled13::untitled4","type":"sharedassociation","src":"F719333440F72377396F69A06B417CD3","dest":"1562D66BA3BB0846939DA41FAC6E6F2A"},{"id":"331B54EAB5DA23D2C42678FCB2BDABF5","name":"conn::untitled13::untitled11","type":"sharedassociation","src":"F719333440F72377396F69A06B417CD3","dest":"5117B692D26866C871B3FDD362D507FD"},{"id":"91D5349558D8C4D51FC66A654C21724A","name":"conn::untitled13::untitled14","type":"sharedassociation","src":"F719333440F72377396F69A06B417CD3","dest":"354B8C6E8429FEBE916197368E9FCF10"},{"id":"D21C894221F7CF968B19137AEF52A82C","name":"conn::untitled13::untitled12","type":"sharedassociation","src":"F719333440F72377396F69A06B417CD3","dest":"251308A6A8E26084D61D12AC0843F169"},{"id":"72235924F254CB4B57C8467ACA46396D","name":"conn::untitled1::untitled10","type":"association","src":"6B15DE80A7207BBBB06A093C399FF651","dest":"FC17EDD8CB783FADABDCDFAFB90CACAA"},{"id":"F40F4827BC0C466845C1A244CC63D9CE","name":"conn::untitled1::untitled2","type":"association","src":"6B15DE80A7207BBBB06A093C399FF651","dest":"89F3423E17DA66DFE73738A434A8A239"},{"id":"079EE2CC6C4CFD097DD739B00223300D","name":"conn::untitled1::untitled11","type":"association","src":"6B15DE80A7207BBBB06A093C399FF651","dest":"5117B692D26866C871B3FDD362D507FD"},{"id":"7418C6777FF8C905B46D3BF4E8D6D0B5","name":"conn::untitled1::untitled3","type":"association","src":"6B15DE80A7207BBBB06A093C399FF651","dest":"FEC0EBECF359F9930C159D10A3EA08BE"}]}}';
	loadModel(json);
}


function loadModelRepoWithTestData4(){
	var json = '{"model_repo":{"id":"JR45-WER3545-TWERTWET-3453452","name":"Example Model Repo","creator":"Vorachet Jaroensawas","creation_date":"Monday 10 2014 - 10:55PM","last_update":"Monday 10 2014 - 10:55PM","blocks":[{"id":"F6C3B18809E18AD6277B74E7F01D1C08","name":"untitled2","x":52,"y":69,"w":160,"h":180,"constraints":[],"operations":[],"parts":[],"references":[],"values":[],"properties":[]},{"id":"2276297258291D12C6E2D6A16474A263","name":"untitled1","x":312,"y":71,"w":160,"h":180,"constraints":[],"operations":[],"parts":[],"references":[],"values":[],"properties":[]},{"id":"6A2B6F40EDE49A058A73AAD3A0A4ABE5","name":"untitled4","x":567,"y":72,"w":160,"h":180,"constraints":[],"operations":[],"parts":[],"references":[],"values":[],"properties":[]},{"id":"21FEB18541374748B2936EA4BBB99A75","name":"untitled7","x":47,"y":305,"w":160,"h":180,"constraints":[],"operations":[],"parts":[],"references":[],"values":[],"properties":[]},{"id":"14DD681EB7EBD0E85FBB1D670F1E8FBC","name":"untitled5","x":318,"y":309,"w":160,"h":180,"constraints":[],"operations":[],"parts":[],"references":[],"values":[],"properties":[]},{"id":"7248697E427B6930D4DD2B60CD557F4A","name":"untitled6","x":574,"y":310,"w":160,"h":180,"constraints":[],"operations":[],"parts":[],"references":[],"values":[],"properties":[]},{"id":"1CDC2548B17AB4E1ECFB8CE066561EE2","name":"untitled9","x":850,"y":315,"w":160,"h":180,"constraints":[],"operations":[],"parts":[],"references":[],"values":[],"properties":[]},{"id":"1F3E0F2A4C12FE9CB1573E729B67CA94","name":"untitled10","x":1120,"y":315,"w":160,"h":180,"constraints":[],"operations":[],"parts":[],"references":[],"values":[],"properties":[]},{"id":"00C4DCC80CACBFDC41FC29375304B5A7","name":"untitled8","x":1128,"y":73,"w":160,"h":180,"constraints":[],"operations":[],"parts":[],"references":[],"values":[],"properties":[]},{"id":"A83A58F5DCF45493C916F04AB4E09D6F","name":"untitled3","x":842,"y":73,"w":160,"h":180,"constraints":[],"operations":[],"parts":[],"references":[],"values":[],"properties":[]},{"id":"E7F41167A4AFFFD5DDC3D0DC69726A9C","name":"untitled3","x":49,"y":558,"w":160,"h":180,"constraints":[],"operations":[],"parts":[],"references":[],"values":[],"properties":[]},{"id":"81E1FE5DA38E731E337B45706D9134E5","name":"untitled4","x":329,"y":553,"w":160,"h":180,"constraints":[],"operations":[],"parts":[],"references":[],"values":[],"properties":[]},{"id":"E65EBC6D6F59B41E84C5E4A32120B7EE","name":"untitled1","x":43,"y":854,"w":160,"h":180,"constraints":[],"operations":[],"parts":[],"references":[],"values":[],"properties":[]},{"id":"A704A47FB48DDF45742497901996AD4A","name":"untitled2","x":50,"y":1139,"w":160,"h":180,"constraints":[],"operations":[],"parts":[],"references":[],"values":[],"properties":[]},{"id":"FE7289DCF5D0F5571975D2EAAD112F4F","name":"untitled6","x":322,"y":1146,"w":160,"h":180,"constraints":[],"operations":[],"parts":[],"references":[],"values":[],"properties":[]},{"id":"49A9A213B4BC098EC20CB87AB972B2BE","name":"untitled5","x":327,"y":858,"w":160,"h":180,"constraints":[],"operations":[],"parts":[],"references":[],"values":[],"properties":[]},{"id":"C0633871F211B7B0D684B2766B6FA886","name":"untitled9","x":572,"y":554,"w":160,"h":180,"constraints":[],"operations":[],"parts":[],"references":[],"values":[],"properties":[]},{"id":"FC1D7C123EC2BAF8BE6F98B2D02C893D","name":"untitled7","x":582,"y":1150,"w":160,"h":180,"constraints":[],"operations":[],"parts":[],"references":[],"values":[],"properties":[]},{"id":"23D59C7CC8A4F2C064B10C8D179B3E34","name":"untitled8","x":579,"y":864,"w":160,"h":180,"constraints":[],"operations":[],"parts":[],"references":[],"values":[],"properties":[]},{"id":"306C01469CBC02A0F52CF50181A61F5C","name":"untitled11","x":860,"y":1152,"w":160,"h":180,"constraints":[],"operations":[],"parts":[],"references":[],"values":[],"properties":[]},{"id":"4E9E58A49B13D424FFB297633DC5ABFD","name":"untitled12","x":849,"y":561,"w":160,"h":180,"constraints":[],"operations":[],"parts":[],"references":[],"values":[],"properties":[]},{"id":"7C2477284AD498A12690B05D258A715B","name":"untitled10","x":857,"y":866,"w":160,"h":180,"constraints":[],"operations":[],"parts":[],"references":[],"values":[],"properties":[]}],"connections":[{"id":"D063502C1C5A1798798D16225E923495","name":"untitled","type":"dependency","src":"F6C3B18809E18AD6277B74E7F01D1C08","dest":"2276297258291D12C6E2D6A16474A263"},{"id":"4289AE0A7C7480963985EFE7FADB12D7","name":"untitled","type":"dependency","src":"2276297258291D12C6E2D6A16474A263","dest":"6A2B6F40EDE49A058A73AAD3A0A4ABE5"},{"id":"FF1D07472028EB2533C5E316CC10F6C0","name":"untitled","type":"dependency","src":"2276297258291D12C6E2D6A16474A263","dest":"6A2B6F40EDE49A058A73AAD3A0A4ABE5"},{"id":"D2C2ACA1855522E19668A9B35ED03FE8","name":"untitled","type":"dependency","src":"6A2B6F40EDE49A058A73AAD3A0A4ABE5","dest":"A83A58F5DCF45493C916F04AB4E09D6F"},{"id":"9D7DED89F079B4572A872AD872166704","name":"untitled","type":"dependency","src":"6A2B6F40EDE49A058A73AAD3A0A4ABE5","dest":"A83A58F5DCF45493C916F04AB4E09D6F"},{"id":"880ECFC9A52A2B3030C8FCB46FE2648A","name":"untitled","type":"dependency","src":"6A2B6F40EDE49A058A73AAD3A0A4ABE5","dest":"A83A58F5DCF45493C916F04AB4E09D6F"},{"id":"EE292878E8C61FB147AB17EB241F182D","name":"untitled","type":"dependency","src":"A83A58F5DCF45493C916F04AB4E09D6F","dest":"00C4DCC80CACBFDC41FC29375304B5A7"},{"id":"E276C09FD7D345E3BB38CC0ABDCE49A3","name":"untitled","type":"dependency","src":"A83A58F5DCF45493C916F04AB4E09D6F","dest":"00C4DCC80CACBFDC41FC29375304B5A7"},{"id":"E37811981C7D6F80FCDFB37CFE975B76","name":"untitled","type":"dependency","src":"A83A58F5DCF45493C916F04AB4E09D6F","dest":"00C4DCC80CACBFDC41FC29375304B5A7"},{"id":"1080A897BC92031C509887D69EF67910","name":"untitled","type":"dependency","src":"A83A58F5DCF45493C916F04AB4E09D6F","dest":"00C4DCC80CACBFDC41FC29375304B5A7"},{"id":"E4645F8FA8D6DF5280A89695708A6833","name":"untitled","type":"dependency","src":"1F3E0F2A4C12FE9CB1573E729B67CA94","dest":"1CDC2548B17AB4E1ECFB8CE066561EE2"},{"id":"60C7FBDE85F8273B66632903BCAED45A","name":"untitled","type":"dependency","src":"1CDC2548B17AB4E1ECFB8CE066561EE2","dest":"7248697E427B6930D4DD2B60CD557F4A"},{"id":"0A9EA647073C926BF2870A1DD67CC5F0","name":"untitled","type":"dependency","src":"1CDC2548B17AB4E1ECFB8CE066561EE2","dest":"7248697E427B6930D4DD2B60CD557F4A"},{"id":"47FDC295FC41E9A38BA715D93C3AB4EC","name":"untitled","type":"dependency","src":"7248697E427B6930D4DD2B60CD557F4A","dest":"14DD681EB7EBD0E85FBB1D670F1E8FBC"},{"id":"B01C89521CCD9F3BEEB02DADC24BA130","name":"untitled","type":"dependency","src":"7248697E427B6930D4DD2B60CD557F4A","dest":"14DD681EB7EBD0E85FBB1D670F1E8FBC"},{"id":"B94F84D76A78B07F16F75404D93E9DD9","name":"untitled","type":"dependency","src":"7248697E427B6930D4DD2B60CD557F4A","dest":"14DD681EB7EBD0E85FBB1D670F1E8FBC"},{"id":"DBFB4D20624DD7BA812FA994B6B4F17F","name":"untitled","type":"dependency","src":"14DD681EB7EBD0E85FBB1D670F1E8FBC","dest":"21FEB18541374748B2936EA4BBB99A75"},{"id":"315813E55C4A835562FDB6C5E758FE39","name":"untitled","type":"dependency","src":"14DD681EB7EBD0E85FBB1D670F1E8FBC","dest":"21FEB18541374748B2936EA4BBB99A75"},{"id":"E47E8BFAB9087E0F821BC06B58E0DEE3","name":"untitled","type":"dependency","src":"14DD681EB7EBD0E85FBB1D670F1E8FBC","dest":"21FEB18541374748B2936EA4BBB99A75"},{"id":"5C97C747DFBA768C28A7FCED20CA5E2A","name":"untitled","type":"dependency","src":"14DD681EB7EBD0E85FBB1D670F1E8FBC","dest":"21FEB18541374748B2936EA4BBB99A75"},{"id":"A005D79AD8DFEAD7F7C6626BB11594C9","name":"untitled","type":"dependency","src":"E65EBC6D6F59B41E84C5E4A32120B7EE","dest":"A704A47FB48DDF45742497901996AD4A"},{"id":"5D842776619C9EC2E7C1F63CDFF015E5","name":"untitled","type":"dependency","src":"E65EBC6D6F59B41E84C5E4A32120B7EE","dest":"E7F41167A4AFFFD5DDC3D0DC69726A9C"},{"id":"4B592D3A497246DC1D55D966105A8747","name":"untitled","type":"dependency","src":"49A9A213B4BC098EC20CB87AB972B2BE","dest":"81E1FE5DA38E731E337B45706D9134E5"},{"id":"880F2121A3D8D5946FA3582A8575E297","name":"untitled","type":"dependency","src":"49A9A213B4BC098EC20CB87AB972B2BE","dest":"81E1FE5DA38E731E337B45706D9134E5"},{"id":"A1393D90E390E531F724A0C047D79B15","name":"untitled","type":"dependency","src":"49A9A213B4BC098EC20CB87AB972B2BE","dest":"FE7289DCF5D0F5571975D2EAAD112F4F"},{"id":"4914F77A629A0189703786579A45E93B","name":"untitled","type":"dependency","src":"49A9A213B4BC098EC20CB87AB972B2BE","dest":"FE7289DCF5D0F5571975D2EAAD112F4F"},{"id":"86C2074EC55C467C442EF332873821E7","name":"untitled","type":"dependency","src":"23D59C7CC8A4F2C064B10C8D179B3E34","dest":"C0633871F211B7B0D684B2766B6FA886"},{"id":"54E96497F7BD5D4F9B78C568FCB1A79D","name":"untitled","type":"dependency","src":"23D59C7CC8A4F2C064B10C8D179B3E34","dest":"C0633871F211B7B0D684B2766B6FA886"},{"id":"1257AC68199C57BAC431E2F9356B470D","name":"untitled","type":"dependency","src":"23D59C7CC8A4F2C064B10C8D179B3E34","dest":"C0633871F211B7B0D684B2766B6FA886"},{"id":"94A6A7CAFF6544E95110D477E412904F","name":"untitled","type":"dependency","src":"23D59C7CC8A4F2C064B10C8D179B3E34","dest":"FC1D7C123EC2BAF8BE6F98B2D02C893D"},{"id":"8B67CBD276C1A5E7041C6483F8525E91","name":"untitled","type":"dependency","src":"23D59C7CC8A4F2C064B10C8D179B3E34","dest":"FC1D7C123EC2BAF8BE6F98B2D02C893D"},{"id":"1C4B96C3713E2A8C44483CCFF52A956E","name":"untitled","type":"dependency","src":"23D59C7CC8A4F2C064B10C8D179B3E34","dest":"FC1D7C123EC2BAF8BE6F98B2D02C893D"},{"id":"AE0C0AF7C514EE7B8B76382CFDDBBD91","name":"untitled","type":"dependency","src":"7C2477284AD498A12690B05D258A715B","dest":"4E9E58A49B13D424FFB297633DC5ABFD"},{"id":"B43904E535BE175AF96B78966CAC2CBE","name":"untitled","type":"dependency","src":"7C2477284AD498A12690B05D258A715B","dest":"4E9E58A49B13D424FFB297633DC5ABFD"},{"id":"10B7B2379B822D07471D76CB38D1F53D","name":"untitled","type":"dependency","src":"7C2477284AD498A12690B05D258A715B","dest":"4E9E58A49B13D424FFB297633DC5ABFD"},{"id":"1D7EA0A2311D34CB3519875785469225","name":"untitled","type":"dependency","src":"7C2477284AD498A12690B05D258A715B","dest":"4E9E58A49B13D424FFB297633DC5ABFD"},{"id":"3C1B38F759408E5B7F51029FE95DF4E8","name":"untitled","type":"dependency","src":"7C2477284AD498A12690B05D258A715B","dest":"306C01469CBC02A0F52CF50181A61F5C"},{"id":"D6DF67A4C51250046B1E269A30C4E48D","name":"untitled","type":"dependency","src":"7C2477284AD498A12690B05D258A715B","dest":"306C01469CBC02A0F52CF50181A61F5C"},{"id":"F81CC182791E8D2C857869924F4F24E7","name":"untitled","type":"dependency","src":"7C2477284AD498A12690B05D258A715B","dest":"306C01469CBC02A0F52CF50181A61F5C"},{"id":"D36C3F1D6D9D691964BCDD1D4364CB5E","name":"untitled","type":"dependency","src":"7C2477284AD498A12690B05D258A715B","dest":"306C01469CBC02A0F52CF50181A61F5C"}]}}';
	loadModel(json);
}


function loadModelRepo(){
	var json = $("#json").val();
	if(!IsJsonString(json)){
		alert('Your JSON is not valid');
		return;
	}

	// clear the current blocks
	blocks = []; 
	mySel = null;
	connections = [];
	myConnectionSel = null;
	clearContextSensitiveIcons();

	obj = JSON.parse(json);
	//console.debug(obj.model_repo.id);
	//console.debug(obj.model_repo.name);
	//console.debug(obj.model_repo.creator);
	console.debug(obj.model_repo.creation_date);
	console.debug(obj.model_repo.last_update);
	
	for (var block in obj.model_repo.blocks) {

		var theBlock = new Block;
		theBlock.id = obj.model_repo.blocks[block].id;
		theBlock.name = obj.model_repo.blocks[block].name;
		theBlock.x = obj.model_repo.blocks[block].x;
		theBlock.y = obj.model_repo.blocks[block].y;
		theBlock.w = obj.model_repo.blocks[block].w;
		theBlock.h = obj.model_repo.blocks[block].h;
		theBlock.fill = obj.model_repo.blocks[block].white;

    	console.debug(obj.model_repo.blocks[block].id);
    	console.debug(obj.model_repo.blocks[block].name);

    	for (var constraint in obj.model_repo.blocks[block].constraints){
    		console.debug(obj.model_repo.blocks[block].constraints[constraint].name);
    		console.debug(obj.model_repo.blocks[block].constraints[constraint].highlight);
    		console.debug(obj.model_repo.blocks[block].constraints[constraint].note);

    		var elobj = new Constraint;
			elobj.name  = obj.model_repo.blocks[block].constraints[constraint].name;
			elobj.highlight = obj.model_repo.blocks[block].constraints[constraint].highlight;
			elobj.note = obj.model_repo.blocks[block].constraints[constraint].note;
			theBlock.constraints.push( elobj );
    	}

    	for (var operation in obj.model_repo.blocks[block].operations){
    		console.debug(obj.model_repo.blocks[block].operations[operation].name);
    		console.debug(obj.model_repo.blocks[block].operations[operation].highlight);
    		console.debug(obj.model_repo.blocks[block].operations[operation].note);

    		var elobj = new Operation;
			elobj.name = obj.model_repo.blocks[block].operations[operation].name;
			elobj.highlight = obj.model_repo.blocks[block].operations[operation].highlight;
			elobj.note = obj.model_repo.blocks[block].operations[operation].note;
			theBlock.operations.push( elobj );
    	}

    	for (var part in obj.model_repo.blocks[block].parts){
    		console.debug(obj.model_repo.blocks[block].parts[part].name);
    		console.debug(obj.model_repo.blocks[block].parts[part].highlight);
    		console.debug(obj.model_repo.blocks[block].parts[part].note);

    		var elobj = new Part;
			elobj.name  = obj.model_repo.blocks[block].parts[part].name;
			elobj.highlight = obj.model_repo.blocks[block].parts[part].highlight;
			elobj.note = obj.model_repo.blocks[block].parts[part].note;
			theBlock.parts.push( elobj );
    	}

    	for (var reference in obj.model_repo.blocks[block].references){
    		console.debug(obj.model_repo.blocks[block].references[reference].name);
    		console.debug(obj.model_repo.blocks[block].references[reference].highlight);
    		console.debug(obj.model_repo.blocks[block].references[reference].note);

    		var elobj = new Reference;
			elobj.name  = obj.model_repo.blocks[block].references[reference].name;
			elobj.highlight = obj.model_repo.blocks[block].references[reference].highlight;
			elobj.note = obj.model_repo.blocks[block].references[reference].note;
			theBlock.references.push( elobj );
    	}

    	for (var value in obj.model_repo.blocks[block].values){
    		console.debug(obj.model_repo.blocks[block].values[value].name);
    		console.debug(obj.model_repo.blocks[block].values[value].highlight);
    		console.debug(obj.model_repo.blocks[block].values[value].note);

    		var elobj = new Value;
			elobj.name = obj.model_repo.blocks[block].values[value].name;
			elobj.highlight = obj.model_repo.blocks[block].values[value].highlight;
			elobj.note = obj.model_repo.blocks[block].values[value].note;
			theBlock.values.push( elobj );
    	}

    	for (var property in obj.model_repo.blocks[block].properties){
    		console.debug(obj.model_repo.blocks[block].properties[property].name);
    		console.debug(obj.model_repo.blocks[block].properties[property].highlight);
    		console.debug(obj.model_repo.blocks[block].properties[property].note);

    		var elobj = new Property;
			elobj.name = obj.model_repo.blocks[block].properties[property].name;
			elobj.highlight = obj.model_repo.blocks[block].properties[property].highlight;
			elobj.note = obj.model_repo.blocks[block].properties[property].note;
			theBlock.properties.push( elobj );
    	}

    	blocks.push( theBlock );
 	}

 	for (var connection in obj.model_repo.connections) {

 		console.debug(obj.model_repo.connections[connection].id);
 		console.debug(obj.model_repo.connections[connection].name);
 		console.debug(obj.model_repo.connections[connection].src);
 		console.debug(obj.model_repo.connections[connection].dest);
 		console.debug(obj.model_repo.connections[connection].type);

		var src_block =  _findObjectById( blocks , obj.model_repo.connections[connection].src );
		var dest_block =  _findObjectById( blocks , obj.model_repo.connections[connection].dest );
		var theConnection = new Connection(
				src_block,
				dest_block,
				obj.model_repo.connections[connection].type);
		theConnection.id = obj.model_repo.connections[connection].id;
		theConnection.name = obj.model_repo.connections[connection].name;
		theConnection.type = obj.model_repo.connections[connection].type;
		connections.push( theConnection );
	}

 	$.mobile.changePage("#main");
 	invalidate();
}


// return model[]
function loadModelFromRepoURL(repo_url, repo_username, repo_password){
}

// return model[]
function saveModelToRepoURL(model, repo_url, repo_username, repo_password){
}

// return model[]
function loadModelFromText(repo_in_json){
	// loadModelFromText('{"result":true,"count":1}');
	// '{"result":true,"count":1}'
    obj = JSON.parse(repo_in_json);
    console.debug(obj.result);
    console.debug(obj.count);
}

// return project[]
function loadProjectFromRepo(repo_url, repo_username, repo_password){
}

// return project[]
function loadProjectFromText(repo_text){
}

// return diagram[]
function loadDiagramFromRepo(repo_url, repo_username, repo_password){
}

// return diagram[]
function loadDiagramFromText(repo_text){
}

function uiindep_createDiagram(name){
	var theDiagram = new Diagram();
	theDiagram.id = nextDiagramId;
	theDiagram.name = name;
	diagrams.push();
}

function uiindep_createBlockModel(name){
	var theDiagram = new Diagram();
	theDiagram.id = nextDiagramId;
	theDiagram.name = name;
	diagrams.push();
}


function uiindep_addBlockModelToDiagram(modelObj){
	var theDiagram = new Diagram();
	theDiagram.id = nextDiagramId;
	theDiagram.name = name;
	diagrams.push();
}


// Utility to find object in an array using ID
function _findObjectById(source, id) {
	for (var i = 0; i < source.length; i++) {
		if (source[i].id == id) {
			return source[i];
		}
	  }
	  throw "Couldn't find object with id: " + id;
}

function _findObjectByName(source, name) {
	for (var i = 0; i < source.length; i++) {
		if (source[i].name == name) {
			return source[i];
		}
	  }
	  throw "Couldn't find object with id: " + id;
}


function _removeArrayObjectById(source, id){
	for (var i =0; i < source.length; i++){
		if (source[i].id == id ) {
			source.splice(i,1);
			break;
		}
	}
}

function _removeArrayObjectByName(source, name){
	for (var i =0; i < source.length; i++){
		if (source[i].name == name ) {
			source.splice(i,1);
			break;
		}
	}
}

function _moveToLastArrayObjectById(source, id){
	for (var i =0; i < source.length; i++){
		if (source[i].id === id ) {
			var tmp = source[i];
			source.splice(i,1);
			source.push(tmp);
			break;
		}
	}
}


function _moveToLastArrayObjectByName(source, name){
	for (var i =0; i < source.length; i++){
		if (source[i].name === name ) {
			var tmp = source[i];
			source.splice(i,1);
			source.push(tmp);
			break;
		}
	}
}

function createGuid(){
    var result='';
	for(var i=0; i<32; i++)
		result += Math.floor(Math.random()*16).toString(16).toUpperCase();
	return result
}
// Utiliy method to add connection between the two blocks
function addConnection(box1, box2, type) {
	var theConnection = new Connection(box1,box2,type);
	theConnection.id = createGuid(); 
	theConnection.name = 'untitled';
	box1.connections.push( theConnection );
	box2.connections.push( theConnection );
	connections.push( theConnection );
	invalidate();
     console.debug(connections);
	return theConnection;
}

function addRandomBlock(x, y, w, h) {
	var theBlock = new Block;
	theBlock.id = createGuid();
	theBlock.name = randomText();
	theBlock.x = x;
	theBlock.y = y;
	theBlock.w = 240; 
	theBlock.h = 380;
	theBlock.fill = CONFIG_block_color;
	
	var numOfConstraints = 2;
	for (var i = 0; i < numOfConstraints; i++) {
		var obj = new Constraint;
		obj.name  = constraint_texts[i];
		theBlock.constraints.push( obj );
	}
	
	var numOfOperations = 2;
	for (var i = 0; i < numOfOperations; i++) {
		var obj = new Operation;
		obj.name = operation_texts[i];
		theBlock.operations.push( obj );
	}

	var numOfParts = 2;
	for (var i = 0; i < numOfParts; i++) {
		var obj = new Part;
		obj.name  = part_texts[i];
		theBlock.parts.push( obj );
	}

	var numOfReferences = 2;
	for (var i = 0; i < numOfReferences; i++) {
		var obj = new Reference;
		obj.name  = reference_texts[i];
		theBlock.references.push( obj );
	}

	var numOfValues = 2;
	for (var i = 0; i < numOfValues; i++) {
		var obj = new Value;
		obj.name  = value_texts[i];
		theBlock.values.push( obj );
	}

	var numOfProperties = 2;
	for (var i = 0; i < numOfProperties; i++) {
		var obj = new Property;
		obj.name  = property_texts[i];
		theBlock.properties.push( obj );
	}

	// PUT THE NEW BOX OBJECT INTO EXISTING BOX ARRAY VARIABLE.
	blocks.push( theBlock );
	
	// FORCE THE CANVAS REDRAW EXITING SHAPES.
	invalidate();

	return theBlock;
}

var simpleBoxUnamed = 1;

function addSimpleBox(x, y, w, h) {
	var theBlock = new Block;
	theBlock.id = createGuid();
	theBlock.name = 'untitled' + simpleBoxUnamed;
	theBlock.x = x;
	theBlock.y = y;
	//theBlock.w = 160; 
	//theBlock.h = 180;
	theBlock.fill = CONFIG_block_color;
	theBlock.constraints_visible = true;
    theBlock.operations_visible = true;
    theBlock.parts_visible = true;
	theBlock.references_visible = true;
	theBlock.values_visible = true;
	theBlock.properties_visible = true;

	// PUT THE NEW BOX OBJECT INTO EXISTING BOX ARRAY VARIABLE.
	blocks.push( theBlock );

	// FORCE THE CANVAS REDRAW EXITING SHAPES.
	invalidate();
	
	simpleBoxUnamed++;
	return theBlock;
}
