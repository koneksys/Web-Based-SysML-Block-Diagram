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

var CONFIG_MINIMUM_RESIZE_W = 90;
var CONFIG_MINIMUM_RESIZE_H = 40;
var CONFIG_canvas_xoffset = -3;
var CONFIG_canvas_yoffset = 8;
var CONFIG_canvas_block_xoffset = -3;
var CONFIG_canvas_block_yoffset = 88;
var CONFIG_canvas_block_yoffset_comp = 120;
var CONFIG_transparent_block_background = false;
var CONFIG_show_grid = true;
var CONFIG_connection_line_display = 'orthogonal'; //orthogonal // straight
var CONFIG_focus_connection_point_strokecolor = '#fff';
var CONFIG_focus_connection_point_fillcolor = 'red';
var CONFIG_focus_connection_point_opacity = 1;
var CONFIG_focus_connection_point_line_width = 2;
var CONFIG_focus_connection_point_mode_auto = false;
var CONFIG_focus_connection_point_text_font = 'bold 16px Tahoma';
var CONFIG_focus_connection_point_text_color = 'red';
var CONFIG_focus_connection_line_width = 1;
var CONFIG_block_color = '#1e5799'; 
var CONFIG_stereotype_font_color = '#eee';
var CONFIG_stereotype_font = 'italic 11px Tahoma';
var CONFIG_cbclick_guide_font = 'italic 11px Tahoma';
var CONFIG_block_font_color = '#eee';
var CONFIG_block_stroke_color = '#eee';
var CONFIG_focus_stroke_color = '#eee';
var CONFIG_focus_stroke_line_width = '1';
var CONFIG_focus_corner_padding = 20;
var CONFIG_focus_corner_radius = 15;
var CONFIG_focus_corner_color = 'gray';
var CONFIG_block_stroke_line_width = 1;
var CONFIG_block_font_size = 14;
var CONFIG_block_name_font = 'bold 11px Tahoma';
var CONFIG_block_name_font_color = '#eee';
var CONFIG_block_font = '11px Tahoma';
var CONFIG_block_part_header_font = '11px Tahoma';
var CONFIG_block_part_header_font_color = '#eee';
var CONFIG_block_opacity = 0.5;
var CONFIG_block_line_space = 17;
var CONFIG_note_font_color = '#fff';
var CONFIG_note_line_width = 0;
var CONFIG_note_background_color = 'red';
var CONFIG_note_opacity = 0.5;
var CONFIG_connection_font = '11px Tahoma';
var CONFIG_connection_font_color = '#eee';
var CONFIG_connection_stroke_color = '#eee';
var CONFIG_connection_stroke_line_width = '1';
var CONFIG_grid_color = '#eee';
var CONFIG_grid_line_width = '0.2';
var CONFIG_grid_step = 17;
var CONFIG_highlight_color = '#eee';
