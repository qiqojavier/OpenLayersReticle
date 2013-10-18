/** 
 * OpenLayers Reticle Control
 * Copyright (c) 2013
 * Qiqo Javier 
 * Beltier Solutions Inc. (BSI)
 * http://www.beltier.com
 * 
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 */
 
/* Beltier Solutions Inc. (BSI) respects OpenLayers codes, copyrights, and 
 * licenses which are respectively published by them as follows:
 * 
 * Copyright (c) 2006-2013 by OpenLayers Contributors (see authors.txt for
 * full list of contributors). Published under the 2-clause BSD license.
 * See license.txt in the OpenLayers distribution or repository for the
 * full text of the license. */

/**
 * USAGE:
 * (note: you should be familiar with OpenLayers API first. I won't teach it to you here ;-) )
 * 
 * Ok so after you have an instance of the "map" add then the control like:
 * 
 * map.addControl(new OpenLayers.Control.Reticle({'imgpath':'img/reticle.png'}));
 * 
 * Don't forget that in your HTML page, add the reticle.css (or the contents of it) 
 * to configure he style of this control.
 * /

/**
 * @requires OpenLayers/Control.js
 */

/**
 * Class: OpenLayers.Control.Reticle
 * The reticle control that adds central crosshair to the map display. 
 * 
 * Inherits from:
 *  - <OpenLayers.Control>
 */
OpenLayers.Control.Reticle = 
  OpenLayers.Class(OpenLayers.Control, {
    
    /**
     * APIProperty: imgpath
     * {String} String used for the reticle image uri.
     */
    imgpath: null,

    /** 
     * Method: destroy
     * Destroy control.
     */
    destroy: function() {
        this.map.events.un({
            "removelayer": this.applyReticle,
            "addlayer": this.applyReticle,
            "changelayer": this.applyReticle,
            "changebaselayer": this.applyReticle,
            scope: this
        });
        
        OpenLayers.Control.prototype.destroy.apply(this, arguments);
    },    
    
    /**
     * Method: draw
     * Initialize control.
     * 
     * Returns: 
     * {DOMElement} A reference to the DIV DOMElement containing the control
     */    
    draw: function() {
        OpenLayers.Control.prototype.draw.apply(this, arguments);
        
        this.map.events.on({
            'changebaselayer': this.applyReticle,
            'changelayer': this.applyReticle,
            'addlayer': this.applyReticle,
            'removelayer': this.applyReticle,
            scope: this
        });
        this.applyReticle();
        
        return this.div;    
    },

    /**
     * Method: applyReticle
     * Apply the reticle image.
     */
    applyReticle: function() {
        if (this.map) {
            this.div.innerHTML = "<img src='"+this.imgpath+"' />";
        }
    },

    CLASS_NAME: "OpenLayers.Control.Reticle"
});
