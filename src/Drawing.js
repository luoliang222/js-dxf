const CONST = require('./Const');
const Writer = require('./Writer');
const Coord = require('./Coord');

const Header = require('./Header');
const Textstyle = require('./Textstyle');
const Vport = require('./Vport');
const DimStyle = require('./Dimstyle');
const Layer = require('./Layer');
const LType = require('./LType');

const Line = require('./Line');
const Arc = require('./Arc');
const Circle = require('./Circle');
const Text = require('./Text');
const Polyline = require('./Polyline');
const Face = require('./Face');

function part(code, val){
	return code + '\n' + val.toString() + '\n';
}

class Drawing
{
    constructor()
    {
        this.layers = {};
        this.activeLayer = null;
        this.lineTypes = {};
        this.textstyles = {};
		this.imageDef = [];	// 图像引用数组

        for (let i = 0; i < Drawing.LINE_TYPES.length; ++i)
        {
            this.addLineType(Drawing.LINE_TYPES[i].name,
                             Drawing.LINE_TYPES[i].description,
                             Drawing.LINE_TYPES[i].elements);
        }

        for (let i = 0; i < Drawing.STYLES.length; ++i)
        {
            this.addStyle(Drawing.STYLES[i].name,
						  Drawing.STYLES[i].fontName);
        }
		
        for (let i = 0; i < Drawing.LAYERS.length; ++i)
        {
            this.addLayer(Drawing.LAYERS[i].name,
                          Drawing.LAYERS[i].colorNumber,
                          Drawing.LAYERS[i].lineTypeName);
        }

        this.setActiveLayer('0');
    }
    
    
    /**
     * @param {string} name
     * @param {string} description
     * @param {array} elements - if elem > 0 it is a line, if elem < 0 it is gap, if elem == 0.0 it is a 
     */
    addLineType(name, description, elements)
    {
        this.lineTypes[name] = new LType(name, description, elements);
        return this;
    }

    addStyle(name, fontName)
    {
        this.textstyles[name] = new Textstyle(name, fontName);
        return this;
    }
	
    addLayer(name, colorNumber, lineTypeName)
    {
        this.layers[name] = new Layer(name, colorNumber, lineTypeName);
        return this;
    }
    
    setActiveLayer(name)
    {
        this.activeLayer = this.layers[name];
        return this;
    }

    drawLine(x1, y1, x2, y2)
    {
        this.activeLayer.addShape(new Line(x1, y1, x2, y2));
        return this;
    }
    
    drawRect(x1, y1, x2, y2)
    {
        this.activeLayer.addShape(new Line(x1, y1, x2, y1));
        this.activeLayer.addShape(new Line(x1, y2, x2, y2));
        this.activeLayer.addShape(new Line(x1, y1, x1, y2));
        this.activeLayer.addShape(new Line(x2, y1, x2, y2));
        return this;
    }

    /**
     * @param {number} x1 - Center x
     * @param {number} y1 - Center y
     * @param {number} r - radius
     * @param {number} startAngle - degree 
     * @param {number} endAngle - degree 
     */
    drawArc(x1, y1, z1, r, startAngle, endAngle)
    {
        this.activeLayer.addShape(new Arc(x1, y1, z1, r, startAngle, endAngle));
        return this;
    }

    /**
     * @param {number} x1 - Center x
     * @param {number} y1 - Center y
     * @param {number} r - radius
     */
    drawCircle(x1, y1, r)
    {
        this.activeLayer.addShape(new Circle(x1, y1, r));
        return this;
    }

    /**
     * @param {number} x1 - x
     * @param {number} y1 - y
     * @param {number} height - Text height
     * @param {number} rotation - Text rotation
     * @param {string} value - the string itself
     */
    drawText(x1, y1, height, rotation, value)
    {
        this.activeLayer.addShape(new Text(x1, y1, height, rotation, value));
        return this;
    }

    /**
     * @param {array} points - Array of points like [ [x1, y1], [x2, y2]... ] 
     */
    drawPolyline(points)
    {
        this.activeLayer.addShape(new Polyline(points));
        return this;
    }

    /**
     * @param {number} x1 - x
     * @param {number} y1 - y
     * @param {number} z1 - z
     * @param {number} x2 - x
     * @param {number} y2 - y
     * @param {number} z2 - z
     * @param {number} x3 - x
     * @param {number} y3 - y
     * @param {number} z3 - z
     * @param {number} x4 - x
     * @param {number} y4 - y
     * @param {number} z4 - z
     */
    drawFace(x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4)
    {
        this.activeLayer.addShape(new Face(x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4));
        return this;
    }
	
    writeLTypes(writer, version)
    {
        for (let lineTypeName in this.lineTypes)
        {
            this.lineTypes[lineTypeName].write(writer);
        }
    }

    writeLayers(writer, version)
    {
        for (let layerName in this.layers)
        {
            this.layers[layerName].write(writer);
        }
    }

	writeTextstyles(writer, version){
        for (let styleName in this.textstyles)
        {
            this.textstyles[styleName].write(writer, version);
        }
	}
	
	writeAppId(writer, version){
		return true;
	}
	
	writeLayerEntitis(writer, layer){
		let shapes = layer.getShapes();
        for (let i = 0; i < shapes.length; ++i)
        {
			let shape = shapes[i];
			if (shape.write)
				shape.write(writer);
			else{
				let s = shape.toDxfString();
				writer.concat(s);
			}
        }
	}
	
	writeVports(){
		
	}

	writeDimstyles(){
		
	}
	
	writeBlockRecords(){
	}
	
	writeTables(writer, version){
		writer.writeString(0, "TABLE");
		writer.writeString(2, "VPORT");
		if (version > CONST.AC1009) {
			writer.writeString(5, "8");
			if (version > CONST.AC1014) {
				writer.writeString(330, "0");
			}
			writer.writeString(100, "AcDbSymbolTable");
		}
		writer.writeInt16(70, 1); //end table def
	/*** VPORT ***/
		writer.dimstyleStd = false;
		this.writeVports();
		if (!writer.dimstyleStd) {
			let vp = new Vport;
			vp.name = "*ACTIVE";
			vp.write(writer);
		}
		writer.writeString(0, "ENDTAB");
	/*** LTYPE ***/
		writer.writeString(0, "TABLE");
		writer.writeString(2, "LTYPE");
		if (version > CONST.AC1009) {
			writer.writeString(5, "5");
			if (version > CONST.AC1014) {
				writer.writeString(330, "0");
			}
			writer.writeString(100, "AcDbSymbolTable");
		}
		writer.writeInt16(70, 4); //end table def
	//Mandatory linetypes
		writer.writeString(0, "LTYPE");
		if (version > CONST.AC1009) {
			writer.writeString(5, "14");
			if (version > CONST.AC1014) {
//!				writer.writeString(330, "5");
			}
			writer.writeString(100, "AcDbSymbolTableRecord");
			writer.writeString(100, "AcDbLinetypeTableRecord");
			writer.writeString(2, "ByBlock");
		} else
			writer.writeString(2, "BYBLOCK");
		writer.writeInt16(70, 0);
		writer.writeString(3, "");
		writer.writeInt16(72, 65);
		writer.writeInt16(73, 0);
		writer.writeDouble(40, 0.0);

		writer.writeString(0, "LTYPE");
		if (version > CONST.AC1009) {
			writer.writeString(5, "15");
			if (version > CONST.AC1014) {
//!				writer.writeString(330, "5");
			}
			writer.writeString(100, "AcDbSymbolTableRecord");
			writer.writeString(100, "AcDbLinetypeTableRecord");
			writer.writeString(2, "ByLayer");
		} else
			writer.writeString(2, "BYLAYER");
		writer.writeInt16(70, 0);
		writer.writeString(3, "");
		writer.writeInt16(72, 65);
		writer.writeInt16(73, 0);
		writer.writeDouble(40, 0.0);

		writer.writeString(0, "LTYPE");
		if (version > CONST.AC1009) {
			writer.writeString(5, "16");
			if (version > CONST.AC1014) {
//!				writer.writeString(330, "5");
			}
			writer.writeString(100, "AcDbSymbolTableRecord");
			writer.writeString(100, "AcDbLinetypeTableRecord");
			writer.writeString(2, "Continuous");
		} else {
			writer.writeString(2, "CONTINUOUS");
		}
		writer.writeInt16(70, 0);
		writer.writeString(3, "Solid line");
		writer.writeInt16(72, 65);
		writer.writeInt16(73, 0);
		writer.writeDouble(40, 0.0);
	//Aplication linetypes
		this.writeLTypes(writer, version);
		writer.writeString(0, "ENDTAB");
	/*** LAYER ***/
		writer.writeString(0, "TABLE");
		writer.writeString(2, "LAYER");
		if (version > CONST.AC1009) {
			writer.writeString(5, "2");
			if (version > CONST.AC1014) {
//!				writer.writeString(330, "0");
			}
			writer.writeString(100, "AcDbSymbolTable");
		}
		writer.writeInt16(70, 1); //end table def
		writer.wlayer0 =false;
		this.writeLayers(writer, version);
		if (!writer.wlayer0) {
			let lay0 = new Layer('0');
			lay0.write(writer);
		}
		writer.writeString(0, "ENDTAB");
	/*** STYLE ***/
		writer.writeString(0, "TABLE");
		writer.writeString(2, "STYLE");
		if (version > CONST.AC1009) {
			writer.writeString(5, "3");
			if (version > CONST.AC1014) {
//!				writer.writeString(330, "0");
			}
			writer.writeString(100, "AcDbSymbolTable");
		}
		writer.writeInt16(70, 3); //end table def
		writer.dimstyleStd =false;
		this.writeTextstyles(writer, version);
		if (!writer.dimstyleStd) {
			let tsty = new Textstyle("Standard");
			tsty.write(writer);
		}
		writer.writeString(0, "ENDTAB");

		writer.writeString(0, "TABLE");
		writer.writeString(2, "VIEW");
		if (version > CONST.AC1009) {
			writer.writeString(5, "6");
			if (version > CONST.AC1014) {
//!				writer.writeString(330, "0");
			}
			writer.writeString(100, "AcDbSymbolTable");
		}
		writer.writeInt16(70, 0); //end table def
		writer.writeString(0, "ENDTAB");

		writer.writeString(0, "TABLE");
		writer.writeString(2, "UCS");
		if (version > CONST.AC1009) {
			writer.writeString(5, "7");
			if (version > CONST.AC1014) {
//!				writer.writeString(330, "0");
			}
			writer.writeString(100, "AcDbSymbolTable");
		}
		writer.writeInt16(70, 0); //end table def
		writer.writeString(0, "ENDTAB");

		writer.writeString(0, "TABLE");
		writer.writeString(2, "APPID");
		if (version > CONST.AC1009) {
			writer.writeString(5, "9");
			if (version > CONST.AC1014) {
//!				writer.writeString(330, "0");
			}
			writer.writeString(100, "AcDbSymbolTable");
		}
		writer.writeInt16(70, 1); //end table def
		writer.writeString(0, "APPID");
		if (version > CONST.AC1009) {
			writer.writeString(5, "12");
			if (version > CONST.AC1014) {
//!				writer.writeString(330, "9");
			}
			writer.writeString(100, "AcDbSymbolTableRecord");
			writer.writeString(100, "AcDbRegAppTableRecord");
		}
		writer.writeString(2, "ACAD");
		writer.writeInt16(70, 0);
		this.writeAppId(writer, version);
		writer.writeString(0, "ENDTAB");

		writer.writeString(0, "TABLE");
		writer.writeString(2, "DIMSTYLE");
		if (version > CONST.AC1009) {
			writer.writeString(5, "A");
			if (version > CONST.AC1014) {
//!				writer.writeString(330, "0");
			}
			writer.writeString(100, "AcDbSymbolTable");
		}
		writer.writeInt16(70, 1); //end table def
		if (version > CONST.AC1014) {
			writer.writeString(100, "AcDbDimStyleTable");
			writer.writeInt16(71, 1); //end table def
		}
		writer.dimstyleStd =false;
		this.writeDimstyles();
		if (!writer.dimstyleStd) {
			let dsty = new DimStyle("Standard");
			dsty.write(writer);
		}
		writer.writeString(0, "ENDTAB");

		if (version > CONST.AC1009) {
			writer.writeString(0, "TABLE");
			writer.writeString(2, "BLOCK_RECORD");
			writer.writeString(5, "1");
			if (version > CONST.AC1014) {
//!				writer.writeString(330, "0");
			}
			writer.writeString(100, "AcDbSymbolTable");
			writer.writeInt16(70, 2); //end table def
			writer.writeString(0, "BLOCK_RECORD");
			writer.writeString(5, "1F");
			if (version > CONST.AC1014) {
//!				writer.writeString(330, "1");
			}
			writer.writeString(100, "AcDbSymbolTableRecord");
			writer.writeString(100, "AcDbBlockTableRecord");
			writer.writeString(2, "*Model_Space");
			if (version > CONST.AC1018) {
				writer.writeInt16(340, 22);
				writer.writeInt16(70, 0);
				writer.writeInt16(280, 1);
				writer.writeInt16(281, 0);
			}
			writer.writeString(0, "BLOCK_RECORD");
			writer.writeString(5, "1E");
			if (version > CONST.AC1014) {
//!				writer.writeString(330, "1");
			}
			writer.writeString(100, "AcDbSymbolTableRecord");
			writer.writeString(100, "AcDbBlockTableRecord");
			writer.writeString(2, "*Paper_Space");
			if (version > CONST.AC1018) {
				//    writer.writeInt16(340, 22);
				writer.writeInt16(70, 0);
				writer.writeInt16(280, 1);
				writer.writeInt16(281, 0);
			}
		}
		/* allways call writeBlockRecords to iface for prepare unnamed blocks */
		this.writeBlockRecords();
		if (version > CONST.AC1009) {
			writer.writeString(0, "ENDTAB");
		}
	}
	
	iFace_WriteBlocks(writer, version){
	}

	writeBlocks(writer, version){
		writer.writeString(0, "BLOCK");
		if (version > CONST.AC1009) {
			writer.writeString(5, "20");
			if (version > CONST.AC1014) {
//!				writer.writeString(330, "1F");
			}
			writer.writeString(100, "AcDbEntity");
		}
		writer.writeString(8, "0");
		if (version > CONST.AC1009) {
			writer.writeString(100, "AcDbBlockBegin");
			writer.writeString(2, "*Model_Space");
		} else
			writer.writeString(2, "$MODEL_SPACE");
		writer.writeInt16(70, 0);
		writer.writeDouble(10, 0.0);
		writer.writeDouble(20, 0.0);
		writer.writeDouble(30, 0.0);
		if (version > CONST.AC1009)
			writer.writeString(3, "*Model_Space");
		else
			writer.writeString(3, "$MODEL_SPACE");
		writer.writeString(1, "");
		writer.writeString(0, "ENDBLK");
		if (version > CONST.AC1009) {
			writer.writeString(5, "21");
			if (version > CONST.AC1014) {
//!				writer.writeString(330, "1F");
			}
			writer.writeString(100, "AcDbEntity");
		}
		writer.writeString(8, "0");
		if (version > CONST.AC1009)
			writer.writeString(100, "AcDbBlockEnd");

		writer.writeString(0, "BLOCK");
		if (version > CONST.AC1009) {
			writer.writeString(5, "1C");
			if (version > CONST.AC1014) {
//!				writer.writeString(330, "1B");
			}
			writer.writeString(100, "AcDbEntity");
		}
		writer.writeString(8, "0");
		if (version > CONST.AC1009) {
			writer.writeString(100, "AcDbBlockBegin");
			writer.writeString(2, "*Paper_Space");
		} else
			writer.writeString(2, "$PAPER_SPACE");
		writer.writeInt16(70, 0);
		writer.writeDouble(10, 0.0);
		writer.writeDouble(20, 0.0);
		writer.writeDouble(30, 0.0);
		if (version > CONST.AC1009)
			writer.writeString(3, "*Paper_Space");
		else
			writer.writeString(3, "$PAPER_SPACE");
		writer.writeString(1, "");
		writer.writeString(0, "ENDBLK");
		if (version > CONST.AC1009) {
			writer.writeString(5, "1D");
			if (version > CONST.AC1014) {
	//!			writer.writeString(330, "1F");
			}
			writer.writeString(100, "AcDbEntity");
		}
		writer.writeString(8, "0");
		if (version > CONST.AC1009)
			writer.writeString(100, "AcDbBlockEnd");
		writer.writingBlock = false;
		// iface->writeBlocks();
		this.iFace_WriteBlocks();
		if (writer.writingBlock) {
			writer.writingBlock = false;
			writer.writeString(0, "ENDBLK");
			if (version > CONST.AC1009) {
				writer.writeString(5, toHexStr(currHandle+2));
	//            writer.writeString(5, "1D");
				if (version > CONST.AC1014) {
//!					writer.writeString(330, toHexStr(currHandle));
				}
				writer.writeString(100, "AcDbEntity");
			}
			writer.writeString(8, "0");
			if (version > CONST.AC1009)
				writer.writeString(100, "AcDbBlockEnd");
		}
	}

	
	writeObjects(writer, appDictionaryName='') {
		writer.writeString(  0, "DICTIONARY");
		writer.writeIntHex(5, 0xC);
		writer.writeString(100, "AcDbDictionary");
		writer.writeInt32(280, 0);
		writer.writeInt32(281, 1);
		
		writer.writeString(  3, "ACAD_GROUP");
		writer.writeIntHex(350, 0xD);
//		writer.writeString(  3, "ACAD_LAYOUT");
//		writer.writeIntHex(350, 0x1A);
		writer.writeString(  3, "ACAD_MLINESTYLE");
		writer.writeIntHex(350, 0x17);
		writer.writeString(  3, "ACAD_PLOTSETTINGS");
		writer.writeIntHex(350, 0x19);
		writer.writeString(  3, "ACAD_PLOTSTYLENAME");
		writer.writeIntHex(350, 0xE);
		writer.writeString(  3, "AcDbVariableDictionary");
		//int acDbVariableDictionaryHandle = dw.handle(350);
		let acDbVariableDictionaryHandle = writer.getNewHandle();
		writer.writeIntHex(350, acDbVariableDictionaryHandle);

		if (appDictionaryName.length!=0) {
			writer.writeString(  3, appDictionaryName);
			//appDictionaryHandle = dw.handle(350);
			let appDictionaryHandle = writer.getNewHandle();
			writer.writeIntHex(350, appDictionaryHandle);
		}

		writer.writeString(  0, "DICTIONARY");
		writer.writeIntHex(5, 0xD);
		//dw.handle();                                    // D
		//writer.writeIntHex(330, 0xC);
		writer.writeString(100, "AcDbDictionary");
		writer.writeInt32(280, 0);
		writer.writeInt32(281, 1);


		writer.writeString(  0, "ACDBDICTIONARYWDFLT");
		writer.writeIntHex(5, 0xE);
		//dicId4 = dw.handle();                           // E
		//writer.writeIntHex(330, 0xC);                       // C
		writer.writeString(100, "AcDbDictionary");
		writer.writeInt32(281, 1);
		writer.writeString(  3, "Normal");
		writer.writeIntHex(350, 0xF);
		//writer.writeIntHex(350, dw.getNextHandle()+5);        // F
		writer.writeString(100, "AcDbDictionaryWithDefault");
		writer.writeIntHex(340, 0xF);
		//writer.writeIntHex(340, dw.getNextHandle()+5);        // F


		writer.writeString(  0, "ACDBPLACEHOLDER");
		writer.writeIntHex(5, 0xF);
		//dw.handle();                                    // F
		//writer.writeIntHex(330, dicId4);                      // E


		writer.writeString(  0, "DICTIONARY");
		//dicId3 = dw.handle();                           // 17
		writer.writeIntHex(5, 0x17);
		//writer.writeIntHex(330, 0xC);                       // C
		writer.writeString(100, "AcDbDictionary");
		writer.writeInt32(280, 0);
		writer.writeInt32(281, 1);
		writer.writeString(  3, "Standard");
		writer.writeIntHex(350, 0x18);
		//writer.writeIntHex(350, dw.getNextHandle()+5);        // 18


		writer.writeString(  0, "MLINESTYLE");
		writer.writeIntHex(5, 0x18);
		//dw.handle();                                    // 18
		//writer.writeIntHex(330, dicId3);                      // 17
		writer.writeString(100, "AcDbMlineStyle");
		writer.writeString(  2, "STANDARD");
		writer.writeInt32( 70, 0);
		writer.writeString(  3, "");
		writer.writeInt32( 62, 256);
		writer.writeDouble( 51, 90.0);
		writer.writeDouble( 52, 90.0);
		writer.writeInt32( 71, 2);
		writer.writeDouble( 49, 0.5);
		writer.writeInt32( 62, 256);
		writer.writeString(  6, "BYLAYER");
		writer.writeDouble( 49, -0.5);
		writer.writeInt32( 62, 256);
		writer.writeString(  6, "BYLAYER");


		writer.writeString(  0, "DICTIONARY");
		writer.writeIntHex(5, 0x19);
		//dw.handle();                           // 17
		//writer.writeIntHex(330, 0xC);                       // C
		writer.writeString(100, "AcDbDictionary");
		writer.writeInt32(280, 0);
		writer.writeInt32(281, 1);

/*
		writer.writeString(  0, "DICTIONARY");
		//dicId2 = dw.handle();                           // 1A
		writer.writeIntHex(5, 0x1A);
		//writer.writeIntHex(330, 0xC);
		writer.writeString(100, "AcDbDictionary");
		writer.writeInt32(281, 1);
		writer.writeString(  3, "Layout1");
		writer.writeIntHex(350, 0x27);
		//writer.writeIntHex(350, dw.getNextHandle()+2);        // 1E
		writer.writeString(  3, "Layout2");
		writer.writeIntHex(350, 0x26);
		//writer.writeIntHex(350, dw.getNextHandle()+4);        // 26
		writer.writeString(  3, "Model");
		writer.writeIntHex(350, 0x22);
		//writer.writeIntHex(350, dw.getNextHandle()+5);        // 22


		writer.writeString(  0, "LAYOUT");
		writer.writeIntHex(5, 0x27);
		//dw.handle();                                    // 1E
		//writer.writeIntHex(330, dicId2);                      // 1A
		writer.writeString(100, "AcDbPlotSettings");
		writer.writeString(  1, "");
		writer.writeString(  2, "none_device");
		writer.writeString(  4, "");
		writer.writeString(  6, "");
		writer.writeDouble( 40, 0.0);
		writer.writeDouble( 41, 0.0);
		writer.writeDouble( 42, 0.0);
		writer.writeDouble( 43, 0.0);
		writer.writeDouble( 44, 0.0);
		writer.writeDouble( 45, 0.0);
		writer.writeDouble( 46, 0.0);
		writer.writeDouble( 47, 0.0);
		writer.writeDouble( 48, 0.0);
		writer.writeDouble( 49, 0.0);
		writer.writeDouble(140, 0.0);
		writer.writeDouble(141, 0.0);
		writer.writeDouble(142, 1.0);
		writer.writeDouble(143, 1.0);
		writer.writeInt32( 70, 688);
		writer.writeInt32( 72, 0);
		writer.writeInt32( 73, 0);
		writer.writeInt32( 74, 5);
		writer.writeString(  7, "");
		writer.writeInt32( 75, 16);
		writer.writeDouble(147, 1.0);
		writer.writeDouble(148, 0.0);
		writer.writeDouble(149, 0.0);
		writer.writeString(100, "AcDbLayout");
		writer.writeString(  1, "Layout1");
		writer.writeInt32( 70, 1);
		writer.writeInt32( 71, 1);
		writer.writeDouble( 10, 0.0);
		writer.writeDouble( 20, 0.0);
		writer.writeDouble( 11, 420.0);
		writer.writeDouble( 21, 297.0);
		writer.writeDouble( 12, 0.0);
		writer.writeDouble( 22, 0.0);
		writer.writeDouble( 32, 0.0);
		writer.writeDouble( 14, 1.000000000000000E+20);
		writer.writeDouble( 24, 1.000000000000000E+20);
		writer.writeDouble( 34, 1.000000000000000E+20);
		writer.writeDouble( 15, -1.000000000000000E+20);
		writer.writeDouble( 25, -1.000000000000000E+20);
		writer.writeDouble( 35, -1.000000000000000E+20);
		writer.writeDouble(146, 0.0);
		writer.writeDouble( 13, 0.0);
		writer.writeDouble( 23, 0.0);
		writer.writeDouble( 33, 0.0);
		writer.writeDouble( 16, 1.0);
		writer.writeDouble( 26, 0.0);
		writer.writeDouble( 36, 0.0);
		writer.writeDouble( 17, 0.0);
		writer.writeDouble( 27, 1.0);
		writer.writeDouble( 37, 0.0);
		writer.writeInt32( 76, 0);
		//writer.writeIntHex(330, dw.getPaperSpaceHandle());    // 1B
		writer.writeIntHex(330, 0x1B);


		writer.writeString(  0, "LAYOUT");
		writer.writeIntHex(5, 0x22);
		//dw.handle();                                    // 22
		//writer.writeIntHex(330, dicId2);                      // 1A
		writer.writeString(100, "AcDbPlotSettings");
		writer.writeString(  1, "");
		writer.writeString(  2, "none_device");
		writer.writeString(  4, "");
		writer.writeString(  6, "");
		writer.writeDouble( 40, 0.0);
		writer.writeDouble( 41, 0.0);
		writer.writeDouble( 42, 0.0);
		writer.writeDouble( 43, 0.0);
		writer.writeDouble( 44, 0.0);
		writer.writeDouble( 45, 0.0);
		writer.writeDouble( 46, 0.0);
		writer.writeDouble( 47, 0.0);
		writer.writeDouble( 48, 0.0);
		writer.writeDouble( 49, 0.0);
		writer.writeDouble(140, 0.0);
		writer.writeDouble(141, 0.0);
		writer.writeDouble(142, 1.0);
		writer.writeDouble(143, 1.0);
		writer.writeInt32( 70, 1712);
		writer.writeInt32( 72, 0);
		writer.writeInt32( 73, 0);
		writer.writeInt32( 74, 0);
		writer.writeString(  7, "");
		writer.writeInt32( 75, 0);
		writer.writeDouble(147, 1.0);
		writer.writeDouble(148, 0.0);
		writer.writeDouble(149, 0.0);
		writer.writeString(100, "AcDbLayout");
		writer.writeString(  1, "Model");
		writer.writeInt32( 70, 1);
		writer.writeInt32( 71, 0);
		writer.writeDouble( 10, 0.0);
		writer.writeDouble( 20, 0.0);
		writer.writeDouble( 11, 12.0);
		writer.writeDouble( 21, 9.0);
		writer.writeDouble( 12, 0.0);
		writer.writeDouble( 22, 0.0);
		writer.writeDouble( 32, 0.0);
		writer.writeDouble( 14, 0.0);
		writer.writeDouble( 24, 0.0);
		writer.writeDouble( 34, 0.0);
		writer.writeDouble( 15, 0.0);
		writer.writeDouble( 25, 0.0);
		writer.writeDouble( 35, 0.0);
		writer.writeDouble(146, 0.0);
		writer.writeDouble( 13, 0.0);
		writer.writeDouble( 23, 0.0);
		writer.writeDouble( 33, 0.0);
		writer.writeDouble( 16, 1.0);
		writer.writeDouble( 26, 0.0);
		writer.writeDouble( 36, 0.0);
		writer.writeDouble( 17, 0.0);
		writer.writeDouble( 27, 1.0);
		writer.writeDouble( 37, 0.0);
		writer.writeInt32( 76, 0);
		//writer.writeIntHex(330, dw.getModelSpaceHandle());    // 1F
		writer.writeIntHex(330, 0x1F);

		writer.writeString(  0, "LAYOUT");
		//dw.handle();                                    // 26
		writer.writeIntHex(5, 0x26);
		//writer.writeIntHex(330, dicId2);                      // 1A
		writer.writeString(100, "AcDbPlotSettings");
		writer.writeString(  1, "");
		writer.writeString(  2, "none_device");
		writer.writeString(  4, "");
		writer.writeString(  6, "");
		writer.writeDouble( 40, 0.0);
		writer.writeDouble( 41, 0.0);
		writer.writeDouble( 42, 0.0);
		writer.writeDouble( 43, 0.0);
		writer.writeDouble( 44, 0.0);
		writer.writeDouble( 45, 0.0);
		writer.writeDouble( 46, 0.0);
		writer.writeDouble( 47, 0.0);
		writer.writeDouble( 48, 0.0);
		writer.writeDouble( 49, 0.0);
		writer.writeDouble(140, 0.0);
		writer.writeDouble(141, 0.0);
		writer.writeDouble(142, 1.0);
		writer.writeDouble(143, 1.0);
		writer.writeInt32( 70, 688);
		writer.writeInt32( 72, 0);
		writer.writeInt32( 73, 0);
		writer.writeInt32( 74, 5);
		writer.writeString(  7, "");
		writer.writeInt32( 75, 16);
		writer.writeDouble(147, 1.0);
		writer.writeDouble(148, 0.0);
		writer.writeDouble(149, 0.0);
		writer.writeString(100, "AcDbLayout");
		writer.writeString(  1, "Layout2");
		writer.writeInt32( 70, 1);
		writer.writeInt32( 71, 2);
		writer.writeDouble( 10, 0.0);
		writer.writeDouble( 20, 0.0);
		writer.writeDouble( 11, 12.0);
		writer.writeDouble( 21, 9.0);
		writer.writeDouble( 12, 0.0);
		writer.writeDouble( 22, 0.0);
		writer.writeDouble( 32, 0.0);
		writer.writeDouble( 14, 0.0);
		writer.writeDouble( 24, 0.0);
		writer.writeDouble( 34, 0.0);
		writer.writeDouble( 15, 0.0);
		writer.writeDouble( 25, 0.0);
		writer.writeDouble( 35, 0.0);
		writer.writeDouble(146, 0.0);
		writer.writeDouble( 13, 0.0);
		writer.writeDouble( 23, 0.0);
		writer.writeDouble( 33, 0.0);
		writer.writeDouble( 16, 1.0);
		writer.writeDouble( 26, 0.0);
		writer.writeDouble( 36, 0.0);
		writer.writeDouble( 17, 0.0);
		writer.writeDouble( 27, 1.0);
		writer.writeDouble( 37, 0.0);
		writer.writeInt32( 76, 0);
		//writer.writeIntHex(330, dw.getPaperSpace0Handle());   // 23
		writer.writeIntHex(330, 0x23);
*/
		writer.writeString(  0, "DICTIONARY");
		//writer.writeIntHex(5, 0x2C);
		//dicId5 =
		writer.writeIntHex(5, acDbVariableDictionaryHandle);
		//dw.handle();                           // 2C
		//writer.writeIntHex(330, 0xC);                       // C
		writer.writeString(100, "AcDbDictionary");
		writer.writeInt32(281, 1);
		writer.writeString(  3, "DIMASSOC");
		//writer.writeIntHex(350, 0x2F);
		writer.writeIntHex(350, writer.getNewHandle());        // 2E
		writer.writeString(  3, "HIDETEXT");
		//writer.writeIntHex(350, 0x2E);
		writer.writeIntHex(350, writer.getNewHandle());        // 2D

		writer.writeString(  0, "DICTIONARYVAR");
		//writer.writeIntHex(5, 0x2E);
		// dw.handle();                                    // 2E
		writer.writeIntHex(5, writer.getNewHandle());
		//writer.writeIntHex(330, dicId5);                      // 2C
		writer.writeString(100, "DictionaryVariables");
		writer.writeInt32(280, 0);
		writer.writeInt32(  1, 2);

		writer.writeString(  0, "DICTIONARYVAR");
		//writer.writeIntHex(5, 0x2D);
		//dw.handle();                                    // 2D
		writer.writeIntHex(5, writer.getNewHandle());
		//writer.writeIntHex(330, dicId5);                      // 2C
		writer.writeString(100, "DictionaryVariables");
		writer.writeInt32(280, 0);
		writer.writeInt32(  1, 1);
	}
	
	writeEntities(writer, version){
        for (let layerName in this.layers)
        {
            let layer = this.layers[layerName];
            this.writeLayerEntitis(writer, layer);
        }		
	}
	
	getHeader(){
		let header = new Header;
		header.addCoord('$EXTMIN', new Coord(0, 0, -1));
		header.addCoord('$EXTMAX', new Coord(500,500, 1));
		header.addCoord('$LIMMIN', new Coord(-1000, -1000, -1000));
		header.addCoord('$LIMMAX', new Coord(1200,1200, 1000));
		
		return header;
	}
	
	writeAll(writer, ver){
		let header = this.getHeader();

		writer.writeString(0, "SECTION");
		header.write(writer, ver);
		ver = writer.getVersion();
		
		writer.writeString(0, "ENDSEC");
		if (ver > CONST.AC1009) {
			writer.writeString(0, "SECTION");
			writer.writeString(2, "CLASSES");
			writer.writeString(0, "ENDSEC");
		}
		writer.writeString(0, "SECTION");
		writer.writeString(2, "TABLES");
		this.writeTables(writer, ver);
		writer.writeString(0, "ENDSEC");
		writer.writeString(0, "SECTION");
		writer.writeString(2, "BLOCKS");
		this.writeBlocks(writer, ver);
		writer.writeString(0, "ENDSEC");

		writer.writeString(0, "SECTION");
		writer.writeString(2, "ENTITIES");
		this.writeEntities(writer, ver);
		writer.writeString(0, "ENDSEC");

		if (ver > CONST.AC1009) {
			writer.writeString(0, "SECTION");
			writer.writeString(2, "OBJECTS");
			this.writeObjects(writer, '');
			writer.writeString(0, "ENDSEC");
		}
		writer.writeString(0, "EOF");
	}

    toDxfString(){
		let writer = new Writer;		
		this.writeAll(writer);//, CONST.AC1014);
        return writer.getString();
	}
}

//AutoCAD Color Index (ACI)
//http://sub-atomic.com/~moses/acadcolors.html
Drawing.ACI = 
{
    LAYER : 0,
    RED : 1,
    YELLOW : 2,
    GREEN : 3,
    CYAN : 4,
    BLUE : 5,
    MAGENTA : 6,
    WHITE : 7
}

Drawing.LINE_TYPES = 
[
    {name: 'CONTINUOUS', description: '______', elements: []},
    {name: 'DASHED',    description: '_ _ _ ', elements: [5.0, -5.0]},
    {name: 'DOTTED',    description: '. . . ', elements: [0.0, -5.0]}
]

Drawing.STYLES = 
[
    { name: 'STANDARD', fontName:'仿宋' },
]

Drawing.LAYERS = 
[
    {name: '0',  colorNumber: Drawing.ACI.WHITE, lineTypeName: 'CONTINUOUS'}
]

module.exports = Drawing;
