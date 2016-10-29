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

var _x = 10,_y = 100,_y2 = 500;

function view_conn_show_connection_creation_guide_model(){
	_x = _x + 20;
	if(_x > 900) {
		_x = 0;
		ctx_middle.clearRect(0,0,WIDTH,HEIGHT);
	}
}

function view_conn_show_connection_creation_guide_clear(){
	
}

function view_conn_show_connection_creation_guide_draw(){
	
	ctx_middle.fillStyle = 'red';
	ctx_middle.fillRect(10,_y,_x,30);

	ctx_middle.fillStyle = 'blue';
	ctx_middle.fillRect(10,_y2,_x,30);
}
