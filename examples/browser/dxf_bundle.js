require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const CONST = require('./Const');
const Writer = require('./Writer');
const Entity = require('./Entity');

class Arc extends Entity 
{
    /**
     * @param {number} x1 - Center x
     * @param {number} y1 - Center y
     * @param {number} z1 - Center z
     * @param {number} r - radius
     * @param {number} startAngle - 弧度
     * @param {number} endAngle - 弧度 
     */
    constructor(x1, y1, z1, r, startAngle, endAngle, handle)
    {
		super(handle);
        this.x = x1;
        this.y = y1;
        this.z = z1;
        this.radious = r;
        this.staangle = startAngle;
        this.endangle = endAngle;
    }

	write(writer) {
		let version = writer.getVersion();
		writer.writeString(0, "ARC");
		super.write(writer);
		if (version > CONST.AC1009) {
			writer.writeString(100, "AcDbCircle");
		}
		writer.writeDouble(10, this.x);
		writer.writeDouble(20, this.y);
		if (this.z != 0.0) {
			writer.writeDouble(30, this.z);
		}
		writer.writeDouble(40, this.radious);
		if (version > CONST.AC1009) {
			writer.writeString(100, "AcDbArc");
		}
		writer.writeDouble(50, this.staangle);
		writer.writeDouble(51, this.endangle);
		return true;
	}
}

module.exports = Arc;
},{"./Const":3,"./Entity":6,"./Writer":17}],2:[function(require,module,exports){
class Circle
{
    /**
     * @param {number} x1 - Center x
     * @param {number} y1 - Center y
     * @param {number} r - radius
     */
    constructor(x1, y1, r)
    {
        this.x1 = x1;
        this.y1 = y1;
        this.r = r;
    }

    toDxfString()
    {
        //https://www.autodesk.com/techpubs/autocad/acadr14/dxf/circle_al_u05_c.htm
        let s = `0\nCIRCLE\n`;
        s += `8\n${this.layer.name}\n`;
        s += `10\n${this.x1}\n20\n${this.y1}\n30\n0\n`;
        s += `40\n${this.r}\n`;
        return s;
    }
}

module.exports = Circle;
},{}],3:[function(require,module,exports){

const CONST = {
	// 版本号
	AC1006:'AC1006',
	AC1009:'AC1009', //acad 11 & 12
	AC1012:'AC1012', //unsupported version acad 13
	AC1014:'AC1014', //acad 14
	AC1015:'AC1015', //acad 2000
	AC1018:'AC1018', //acad 2004
	AC1021:'AC1021', //acad 2007
	AC1024:'AC1024', //acad 2010
	AC1027:'AC1027', //acad 2013
	
	// 颜色枚举
	ColorByLayer : 256,
    ColorByBlock : 0,
	
	// 表类型枚举
     //enum TTYPE {
	TTYPE_UNKNOWNT: 0,
	TTYPE_LTYPE: 1,
	TTYPE_LAYER: 2,
	TTYPE_STYLE: 3,
	TTYPE_DIMSTYLE: 4,
	TTYPE_VPORT: 5,
	TTYPE_BLOCK_RECORD: 6,
	TTYPE_APPID: 7,
	TTYPE_IMAGEDEF: 8,
	
	// 线宽枚举
    // enum lineWidth {
	width00 : 0,       /*!< 0.00mm (dxf 0)*/
	width01 : 1,       /*!< 0.05mm (dxf 5)*/
	width02 : 2,       /*!< 0.09mm (dxf 9)*/
	width03 : 3,       /*!< 0.13mm (dxf 13)*/
	width04 : 4,       /*!< 0.15mm (dxf 15)*/
	width05 : 5,       /*!< 0.18mm (dxf 18)*/
	width06 : 6,       /*!< 0.20mm (dxf 20)*/
	width07 : 7,       /*!< 0.25mm (dxf 25)*/
	width08 : 8,       /*!< 0.30mm (dxf 30)*/
	width09 : 9,       /*!< 0.35mm (dxf 35)*/
	width10 : 10,      /*!< 0.40mm (dxf 40)*/
	width11 : 11,      /*!< 0.50mm (dxf 50)*/
	width12 : 12,      /*!< 0.53mm (dxf 53)*/
	width13 : 13,      /*!< 0.60mm (dxf 60)*/
	width14 : 14,      /*!< 0.70mm (dxf 70)*/
	width15 : 15,      /*!< 0.80mm (dxf 80)*/
	width16 : 16,      /*!< 0.90mm (dxf 90)*/
	width17 : 17,      /*!< 1.00mm (dxf 100)*/
	width18 : 18,      /*!< 1.06mm (dxf 106)*/
	width19 : 19,      /*!< 1.20mm (dxf 120)*/
	width20 : 20,      /*!< 1.40mm (dxf 140)*/
	width21 : 21,      /*!< 1.58mm (dxf 158)*/
	width22 : 22,      /*!< 2.00mm (dxf 200)*/
	width23 : 23,      /*!< 2.11mm (dxf 211)*/
	widthByLayer : 29, /*!< by layer (dxf -1) */
	widthByBlock : 30, /*!< by block (dxf -2) */
	widthDefault : 31,  /*!< by default (dxf -3) */
	
	lineWidth2dxfInt: function(lw){
        switch (lw){
        case CONST.widthByLayer:
            return -1;
        case CONST.widthByBlock:
            return -2;
        case CONST.widthDefault:
            return -3;
        case CONST.width00:
            return 0;
        case CONST.width01:
            return 5;
        case CONST.width02:
            return 9;
        case CONST.width03:
            return 13;
        case CONST.width04:
            return 15;
        case CONST.width05:
            return 18;
        case CONST.width06:
            return 20;
        case CONST.width07:
            return 25;
        case CONST.width08:
            return 30;
        case CONST.width09:
            return 35;
        case CONST.width10:
            return 40;
        case CONST.width11:
            return 50;
        case CONST.width12:
            return 53;
        case CONST.width13:
            return 60;
        case CONST.width14:
            return 70;
        case CONST.width15:
            return 80;
        case CONST.width16:
            return 90;
        case CONST.width17:
            return 100;
        case CONST.width18:
            return 106;
        case CONST.width19:
            return 120;
        case CONST.width20:
            return 140;
        case CONST.width21:
            return 158;
        case CONST.width22:
            return 200;
        case CONST.width23:
            return 211;
        default:
            break;
        }
        return -3;
    }
};

module.exports = CONST;

},{}],4:[function(require,module,exports){
class Coord
{
    constructor(x1=0,y1=0,z1=0)
    {
		this.x = x1;
		this.y = y1;
		this.z = z1;
    }
}

module.exports = Coord;
},{}],5:[function(require,module,exports){
const CONST = require('./Const');
const Writer = require('./Writer');
const Coord = require('./Coord');
const Point = require('./Point');

class DimStyle
{
    constructor(name)
    {
		this.name = name;
		this.flags = 0;
        this.dimasz = this.dimtxt = this.dimexe = 0.18;
        this.dimexo = 0.0625;
        this.dimgap = this.dimcen = 0.09;
        this.dimtxsty = "Standard";
        this.dimscale = this.dimlfac = this.dimtfac = this.dimfxl = 1.0;
        this.dimdli = 0.38;
        this.dimrnd = this.dimdle = this.dimtp = this.dimtm = this.dimtsz = this.dimtvp = 0.0;
        this.dimaltf = 25.4;
        this.dimtol = this.dimlim = this.dimse1 = this.dimse2 = this.dimtad = this.dimzin = 0;
        this.dimtoh = this.dimtolj = 1;
        this.dimalt = this.dimtofl = this.dimsah = this.dimtix = this.dimsoxd = this.dimfxlon = 0;
        this.dimaltd = this.dimunit = this.dimaltu = this.dimalttd = this.dimlunit = 2;
        this.dimclrd = this.dimclre = this.dimclrt = this.dimjust = this.dimupt = 0;
        this.dimazin = this.dimaltz = this.dimaltttz = this.dimtzin = this.dimfrac = 0;
        this.dimtih = this.dimadec = this.dimaunit = this.dimsd1 = this.dimsd2 = this.dimtmove = 0;
        this.dimaltrnd = 0.0;
        this.dimdec = this.dimtdec = 4;
        this.dimfit = this.dimatfit = 3;
        this.dimdsep = '.';
        this.dimlwd = this.dimlwe = -2;		
		
		//V12
		this.dimpost = '';       /*!< code 3 */
		this.dimapost = '';      /*!< code 4 */
	/* handle are code 105 */
		this.dimblk = '';        /*!< code 5, code 342 V2000+ */
		this.dimblk1 = '';       /*!< code 6, code 343 V2000+ */
		this.dimblk2 = '';       /*!< code 7, code 344 V2000+ */
		this.dimldrblk = '';     /*!< code 341 V2000+ */
    }

	write(writer){
		let version = writer.getVersion();
		writer.writeString(0, "DIMSTYLE");
		if (!writer.dimstyleStd) {
			let name = this.name.toUpperCase();
			if (name == "STANDARD")
				writer.dimstyleStd = true;
		}
		if (version > CONST.AC1009) {
			writer.writeString(105, writer.getNewHandleHex());
		}

		if (version > CONST.AC1012) {
			writer.writeString(330, "A");
		}
		if (version > CONST.AC1009) {
			writer.writeString(100, "AcDbSymbolTableRecord");
			writer.writeString(100, "AcDbDimStyleTableRecord");
			writer.writeUtf8String(2, this.name);
		} else
			writer.writeUtf8Caps(2, this.name);
		writer.writeInt16(70, this.flags);
		if ( version == CONST.AC1009 || !(this.dimpost.length == 0) )
			writer.writeUtf8String(3, this.dimpost);
		if ( version == CONST.AC1009 || !(this.dimapost.length == 0) )
			writer.writeUtf8String(4, this.dimapost);
		if ( version == CONST.AC1009 || !(this.dimblk.length == 0) )
			writer.writeUtf8String(5, this.dimblk);
		if ( version == CONST.AC1009 || !(this.dimblk1.length == 0) )
			writer.writeUtf8String(6, this.dimblk1);
		if ( version == CONST.AC1009 || !(this.dimblk2.length == 0) )
			writer.writeUtf8String(7, this.dimblk2);
		writer.writeDouble(40, this.dimscale);
		writer.writeDouble(41, this.dimasz);
		writer.writeDouble(42, this.dimexo);
		writer.writeDouble(43, this.dimdli);
		writer.writeDouble(44, this.dimexe);
		writer.writeDouble(45, this.dimrnd);
		writer.writeDouble(46, this.dimdle);
		writer.writeDouble(47, this.dimtp);
		writer.writeDouble(48, this.dimtm);
		if ( version > CONST.AC1018 || this.dimfxl !=0 )
			writer.writeDouble(49, this.dimfxl);
		writer.writeDouble(140, this.dimtxt);
		writer.writeDouble(141, this.dimcen);
		writer.writeDouble(142, this.dimtsz);
		writer.writeDouble(143, this.dimaltf);
		writer.writeDouble(144, this.dimlfac);
		writer.writeDouble(145, this.dimtvp);
		writer.writeDouble(146, this.dimtfac);
		writer.writeDouble(147, this.dimgap);
		if (version > CONST.AC1014) {
			writer.writeDouble(148, this.dimaltrnd);
		}
		writer.writeInt16(71, this.dimtol);
		writer.writeInt16(72, this.dimlim);
		writer.writeInt16(73, this.dimtih);
		writer.writeInt16(74, this.dimtoh);
		writer.writeInt16(75, this.dimse1);
		writer.writeInt16(76, this.dimse2);
		writer.writeInt16(77, this.dimtad);
		writer.writeInt16(78, this.dimzin);
		if (version > CONST.AC1014) {
			writer.writeInt16(79, this.dimazin);
		}
		writer.writeInt16(170, this.dimalt);
		writer.writeInt16(171, this.dimaltd);
		writer.writeInt16(172, this.dimtofl);
		writer.writeInt16(173, this.dimsah);
		writer.writeInt16(174, this.dimtix);
		writer.writeInt16(175, this.dimsoxd);
		writer.writeInt16(176, this.dimclrd);
		writer.writeInt16(177, this.dimclre);
		writer.writeInt16(178, this.dimclrt);
		if (version > CONST.AC1014) {
			writer.writeInt16(179, this.dimadec);
		}
		if (version > CONST.AC1009) {
			if (version < CONST.AC1015)
				writer.writeInt16(270, this.dimunit);
			writer.writeInt16(271, this.dimdec);
			writer.writeInt16(272, this.dimtdec);
			writer.writeInt16(273, this.dimaltu);
			writer.writeInt16(274, this.dimalttd);
			writer.writeInt16(275, this.dimaunit);
		}
		if (version > CONST.AC1014) {
			writer.writeInt16(276, this.dimfrac);
			writer.writeInt16(277, this.dimlunit);
			writer.writeInt16(278, this.dimdsep.charCodeAt());
			writer.writeInt16(279, this.dimtmove);
		}
		if (version > CONST.AC1009) {
			writer.writeInt16(280, this.dimjust);
			writer.writeInt16(281, this.dimsd1);
			writer.writeInt16(282, this.dimsd2);
			writer.writeInt16(283, this.dimtolj);
			writer.writeInt16(284, this.dimtzin);
			writer.writeInt16(285, this.dimaltz);
			writer.writeInt16(286, this.dimaltttz);
			if (version < CONST.AC1015)
				writer.writeInt16(287, this.dimfit);
			writer.writeInt16(288, this.dimupt);
		}
		if (version > CONST.AC1014) {
			writer.writeInt16(289, this.dimatfit);
		}
		if ( version > CONST.AC1018 && this.dimfxlon !=0 )
			writer.writeInt16(290, this.dimfxlon);
		if (version > CONST.AC1009) {
			writer.writeUtf8String(340, this.dimtxsty);
		}
		if (version > CONST.AC1014) {
			writer.writeUtf8String(341, this.dimldrblk);
			writer.writeInt16(371, this.dimlwd);
			writer.writeInt16(372, this.dimlwe);
		}
	}
}

module.exports = DimStyle;
},{"./Const":3,"./Coord":4,"./Point":12,"./Writer":17}],6:[function(require,module,exports){
const CONST = require('./Const');

class Entity 
{
    constructor(id)
    {
		this.color = 0;
		this.layerName = CONST.ColorByLayer;
		this.lineType = 'BYLAYER';
		this.handle = id;
		this.space = 0;
		this.color24 = -1;
		this.lWeight = CONST.widthByLayer;
    }

	write(writer) {
		let version = writer.getVersion();
		//if (!this.handle)
			this.handle = writer.getNewHandle();
		writer.writeString(5, this.handle.toString(16));
		if (version > CONST.AC1009) {
			writer.writeString(100, "AcDbEntity");
		}
		if (this.space == 1)
			writer.writeInt16(67, 1);
		if (version > CONST.AC1009) {
			writer.writeUtf8String(8, this.layerName);
			writer.writeUtf8String(6, this.lineType);
		} else {
			writer.writeUtf8Caps(8, this.layerName);
			writer.writeUtf8Caps(6, this.lineType);
		}
		writer.writeInt16(62, this.color);
		if (version > CONST.AC1015 && this.color24 >= 0) {
			writer.writeInt32(420, this.color24);
		}
		if (version > CONST.AC1014) {
			writer.writeInt16(370, CONST.lineWidth2dxfInt(this.lWeight));
		}
	}
}

module.exports = Entity;
},{"./Const":3}],7:[function(require,module,exports){
class Face
{
    constructor(x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4)
    {
        this.x1 = x1;
        this.y1 = y1;
        this.z1 = z1;
        this.x2 = x2;
        this.y2 = y2;
        this.z2 = z2;
        this.x3 = x3;
        this.y3 = y3;
        this.z3 = z3;
        this.x4 = x4;
        this.y4 = y4;
        this.z4 = z4;
    }

    toDxfString()
    {
        //https://www.autodesk.com/techpubs/autocad/acadr14/dxf/3dface_al_u05_c.htm
        let s = `0\n3DFACE\n`;
        s += `8\n${this.layer.name}\n`;
        s += `10\n${this.x1}\n20\n${this.y1}\n30\n${this.z1}\n`;
        s += `11\n${this.x2}\n21\n${this.y2}\n31\n${this.z2}\n`;
        s += `12\n${this.x3}\n22\n${this.y3}\n32\n${this.z3}\n`;
        s += `13\n${this.x4}\n23\n${this.y4}\n33\n${this.z4}\n`;
        return s;
    }
}

module.exports = Face;
},{}],8:[function(require,module,exports){
const CONST = require('./Const');
const Coord = require('./Coord');
//const Writer = require('./Writer');

let varDouble;
let varInt;
let varStr;
let varCoord;

let isRealNum = function(val) {
	// isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除
	if(val === "" || val ==null){
		return false;
	}
	if(!isNaN(val)){
		return true;
	}else{
		return false;
	}
}

class Header
{
    constructor()
    {
		this.vars = {};
		this.version = null;
		this.linetypeCtrl = this.layerCtrl = this.styleCtrl = this.dimstyleCtrl = this.appidCtrl = 0;
		this.blockCtrl = this.viewCtrl = this.ucsCtrl = this.vportCtrl = this.vpEntHeaderCtrl = 0;
    }

	// 写入Header
	write(writer, ver){
	/*RLZ: TODO complete all vars to AC1024*/
		writer.writeString(2, "HEADER");
		writer.writeString(9, "$ACADVER");
		switch (ver) {
		case CONST.AC1006: //unsupported version acad 10
		case CONST.AC1009: //acad 11 & 12
			varStr = "AC1009";
			break;
		case CONST.AC1012: //unsupported version acad 13
		case CONST.AC1014: //acad 14
			varStr = "AC1014";
			break;
		case CONST.AC1015: //acad 2000
			varStr = "AC1015";
			break;
		case CONST.AC1018: //acad 2004
			varStr = "AC1018";
			break;
	/*    case CONST.AC1021: //acad 2007
			varStr = "AC1021";
			break;*/
		case CONST.AC1024: //acad 2010
			varStr = "AC1024";
			break;
		case CONST.AC1027: //acad 2013
			varStr = "AC1027";
			break;
		default: //acad 2007 default version
			varStr = "AC1021";
			break;
		}
		this.version = ver = varStr;
		writer.writeString(1, varStr);
		writer.setVersion(varStr, true);

		varStr = this.getStr("$ACADVER");
		varStr = this.getStr("$ACADMAINTVER");

		if (!(varStr = this.getStr("$DWGCODEPAGE"))) {
			varStr = "ANSI_936";
			if (ver >= CONST.AC1021)
				varStr = "UTF-8";
		}
		writer.writeString(9, "$DWGCODEPAGE");
		writer.setCodePage(varStr);
		writer.writeString(3, writer.getCodePage() );
		writer.writeString(9, "$INSBASE");
		if (this.getCoord("$INSBASE", varCoord)) {
			writer.writeDouble(10, varCoord.x);
			writer.writeDouble(20, varCoord.y);
			writer.writeDouble(30, varCoord.z);
		} else {
			writer.writeDouble(10, 0.0);
			writer.writeDouble(20, 0.0);
			writer.writeDouble(30, 0.0);
		}
		writer.writeString(9, "$EXTMIN");
		if (this.getCoord("$EXTMIN", varCoord)) {
			writer.writeDouble(10, varCoord.x);
			writer.writeDouble(20, varCoord.y);
			writer.writeDouble(30, varCoord.z);
		} else {
			writer.writeDouble(10, 1.0000000000000000E+020);
			writer.writeDouble(20, 1.0000000000000000E+020);
			writer.writeDouble(30, 1.0000000000000000E+020);
		}
		writer.writeString(9, "$EXTMAX");
		if (this.getCoord("$EXTMAX", varCoord)) {
			writer.writeDouble(10, varCoord.x);
			writer.writeDouble(20, varCoord.y);
			writer.writeDouble(30, varCoord.z);
		} else {
			writer.writeDouble(10, -1.0000000000000000E+020);
			writer.writeDouble(20, -1.0000000000000000E+020);
			writer.writeDouble(30, -1.0000000000000000E+020);
		}
		writer.writeString(9, "$LIMMIN");
		if (this.getCoord("$LIMMIN", varCoord)) {
			writer.writeDouble(10, varCoord.x);
			writer.writeDouble(20, varCoord.y);
		} else {
			writer.writeDouble(10, 0.0);
			writer.writeDouble(20, 0.0);
		}
		writer.writeString(9, "$LIMMAX");
		if (this.getCoord("$LIMMAX", varCoord)) {
			writer.writeDouble(10, varCoord.x);
			writer.writeDouble(20, varCoord.y);
		} else {
			writer.writeDouble(10, 420.0);
			writer.writeDouble(20, 297.0);
		}
		writer.writeString(9, "$ORTHOMODE");
		if (this.getInt("$ORTHOMODE"))
			writer.writeInt16(70, varInt);
		else
			writer.writeInt16(70, 0);
		writer.writeString(9, "$REGENMODE");
		if (this.getInt("$REGENMODE"))
			writer.writeInt16(70, varInt);
		else
			writer.writeInt16(70, 1);
		writer.writeString(9, "$FILLMODE");
		if (this.getInt("$FILLMODE"))
			writer.writeInt16(70, varInt);
		else
			writer.writeInt16(70, 1);
		writer.writeString(9, "$QTEXTMODE");
		if (this.getInt("$QTEXTMODE"))
			writer.writeInt16(70, varInt);
		else
			writer.writeInt16(70, 0);
		writer.writeString(9, "$MIRRTEXT");
		if (this.getInt("$MIRRTEXT"))
			writer.writeInt16(70, varInt);
		else
			writer.writeInt16(70, 0);
		if (ver == CONST.AC1009){
			writer.writeString(9, "$DRAGMODE");
			if (this.getInt("$DRAGMODE"))
				writer.writeInt16(70, varInt);
			else
				writer.writeInt16(70, 2);
		}
		writer.writeString(9, "$LTSCALE");
		if (this.getDouble("$LTSCALE"))
			writer.writeDouble(40, varDouble);
		else
			writer.writeDouble(40, 1.0);
		if (ver == CONST.AC1009){
			writer.writeString(9, "$OSMODE");
			if (this.getInt("$OSMODE"))
				writer.writeInt16(70, varInt);
			else
				writer.writeInt16(70, 0);
		}
		writer.writeString(9, "$ATTMODE");
		if (this.getInt("$ATTMODE"))
			writer.writeInt16(70, varInt);
		else
			writer.writeInt16(70, 0);
		writer.writeString(9, "$TEXTSIZE");
		if (this.getDouble("$TEXTSIZE"))
			writer.writeDouble(40, varDouble);
		else
			writer.writeDouble(40, 2.5);
		writer.writeString(9, "$TRACEWID");
		if (this.getDouble("$TRACEWID"))
			writer.writeDouble(40, varDouble);
		else
			writer.writeDouble(40, 15.68);
		writer.writeString(9, "$TEXTSTYLE");
		if (varStr = this.getStr("$TEXTSTYLE"))
			if (ver == CONST.AC1009)
				writer.writeUtf8Caps(7, varStr);
			else
				writer.writeUtf8String(7, varStr);
		else
			writer.writeString(7, "STANDARD");
		writer.writeString(9, "$CLAYER");
		if (varStr = this.getStr("$CLAYER"))
			if (ver == CONST.AC1009)
				writer.writeUtf8Caps(8, varStr);
			else
				writer.writeUtf8String(8, varStr);
		else
			writer.writeString(8, "0");
		writer.writeString(9, "$CELTYPE");
		if (varStr = this.getStr("$CELTYPE"))
			if (ver == CONST.AC1009)
				writer.writeUtf8Caps(6, varStr);
			else
				writer.writeUtf8String(6, varStr);
		else
			writer.writeString(6, "BYLAYER");
		writer.writeString(9, "$CECOLOR");
		if (this.getInt("$CECOLOR"))
			writer.writeInt16(62, varInt);
		else
			writer.writeInt16(62, 256);
		if (ver > CONST.AC1009){
			writer.writeString(9, "$CELTSCALE");
			if (this.getDouble("$CELTSCALE"))
				writer.writeDouble(40, varDouble);
			else
				writer.writeDouble(40, 1.0);
			writer.writeString(9, "$DISPSILH");
			if (this.getInt("$DISPSILH"))
				writer.writeInt16(70, varInt);
			else
				writer.writeInt16(70, 0);
		}

		writer.writeString(9, "$DIMSCALE");
		if (this.getDouble("$DIMSCALE"))
			writer.writeDouble(40, varDouble);
		else
			writer.writeDouble(40, 2.5);
		writer.writeString(9, "$DIMASZ");
		if (this.getDouble("$DIMASZ"))
			writer.writeDouble(40, varDouble);
		else
			writer.writeDouble(40, 2.5);
		writer.writeString(9, "$DIMEXO");
		if (this.getDouble("$DIMEXO"))
			writer.writeDouble(40, varDouble);
		else
			writer.writeDouble(40, 0.625);
		writer.writeString(9, "$DIMDLI");
		if (this.getDouble("$DIMDLI"))
			writer.writeDouble(40, varDouble);
		else
			writer.writeDouble(40, 3.75);
		writer.writeString(9, "$DIMRND");
		if (this.getDouble("$DIMRND"))
			writer.writeDouble(40, varDouble);
		else
			writer.writeDouble(40, 0.0);
		writer.writeString(9, "$DIMDLE");
		if (this.getDouble("$DIMDLE"))
			writer.writeDouble(40, varDouble);
		else
			writer.writeDouble(40, 0.0);
		writer.writeString(9, "$DIMEXE");
		if (this.getDouble("$DIMEXE"))
			writer.writeDouble(40, varDouble);
		else
			writer.writeDouble(40, 1.25);
		writer.writeString(9, "$DIMTP");
		if (this.getDouble("$DIMTP"))
			writer.writeDouble(40, varDouble);
		else
			writer.writeDouble(40, 0.0);
		writer.writeString(9, "$DIMTM");
		if (this.getDouble("$DIMTM"))
			writer.writeDouble(40, varDouble);
		else
			writer.writeDouble(40, 0.0);
		writer.writeString(9, "$DIMTXT");
		if (this.getDouble("$DIMTXT"))
			writer.writeDouble(40, varDouble);
		else
			writer.writeDouble(40, 2.5);
		writer.writeString(9, "$DIMCEN");
		if (this.getDouble("$DIMCEN"))
			writer.writeDouble(40, varDouble);
		else
			writer.writeDouble(40, 2.5);
		writer.writeString(9, "$DIMTSZ");
		if (this.getDouble("$DIMTSZ"))
			writer.writeDouble(40, varDouble);
		else
			writer.writeDouble(40, 0.0);
		writer.writeString(9, "$DIMTOL");
		if (this.getInt("$DIMTOL"))
			writer.writeInt16(70, varInt);
		else
			writer.writeInt16(70, 0);
		writer.writeString(9, "$DIMLIM");
		if (this.getInt("$DIMLIM"))
			writer.writeInt16(70, varInt);
		else
			writer.writeInt16(70, 0);
		writer.writeString(9, "$DIMTIH");
		if (this.getInt("$DIMTIH"))
			writer.writeInt16(70, varInt);
		else
			writer.writeInt16(70, 0);
		writer.writeString(9, "$DIMTOH");
		if (this.getInt("$DIMTOH"))
			writer.writeInt16(70, varInt);
		else
			writer.writeInt16(70, 0);
		writer.writeString(9, "$DIMSE1");
		if (this.getInt("$DIMSE1"))
			writer.writeInt16(70, varInt);
		else
			writer.writeInt16(70, 0);
		writer.writeString(9, "$DIMSE2");
		if (this.getInt("$DIMSE2"))
			writer.writeInt16(70, varInt);
		else
			writer.writeInt16(70, 0);
		writer.writeString(9, "$DIMTAD");
		if (this.getInt("$DIMTAD"))
			writer.writeInt16(70, varInt);
		else
			writer.writeInt16(70, 1);
		writer.writeString(9, "$DIMZIN");
		if (this.getInt("$DIMZIN"))
			writer.writeInt16(70, varInt);
		else
			writer.writeInt16(70, 8);
		writer.writeString(9, "$DIMBLK");
		if (varStr = this.getStr("$DIMBLK"))
			if (ver == CONST.AC1009)
				writer.writeUtf8Caps(1, varStr);
			else
				writer.writeUtf8String(1, varStr);
		else
			writer.writeString(1, "");
		writer.writeString(9, "$DIMASO");
		if (this.getInt("$DIMASO"))
			writer.writeInt16(70, varInt);
		else
			writer.writeInt16(70, 1);
		writer.writeString(9, "$DIMSHO");
		if (this.getInt("$DIMSHO"))
			writer.writeInt16(70, varInt);
		else
			writer.writeInt16(70, 1);
		writer.writeString(9, "$DIMPOST");
		if (varStr = this.getStr("$DIMPOST"))
			if (ver == CONST.AC1009)
				writer.writeUtf8Caps(1, varStr);
			else
				writer.writeUtf8String(1, varStr);
		else
			writer.writeString(1, "");
		writer.writeString(9, "$DIMAPOST");
		if (varStr = this.getStr("$DIMAPOST"))
			if (ver == CONST.AC1009)
				writer.writeUtf8Caps(1, varStr);
			else
				writer.writeUtf8String(1, varStr);
		else
			writer.writeString(1, "");
		writer.writeString(9, "$DIMALT");
		if (this.getInt("$DIMALT"))
			writer.writeInt16(70, varInt);
		else
			writer.writeInt16(70, 0);
		writer.writeString(9, "$DIMALTD");
		if (this.getInt("$DIMALTD"))
			writer.writeInt16(70, varInt);
		else
			writer.writeInt16(70, 3);
		writer.writeString(9, "$DIMALTF");
		if (this.getDouble("$DIMALTF"))
			writer.writeDouble(40, varDouble);
		else
			writer.writeDouble(40, 0.03937);
		writer.writeString(9, "$DIMLFAC");
		if (this.getDouble("$DIMLFAC"))
			writer.writeDouble(40, varDouble);
		else
			writer.writeDouble(40, 1.0);
		writer.writeString(9, "$DIMTOFL");
		if (this.getInt("$DIMTOFL"))
			writer.writeInt16(70, varInt);
		else
			writer.writeInt16(70, 1);
		writer.writeString(9, "$DIMTVP");
		if (this.getDouble("$DIMTVP"))
			writer.writeDouble(40, varDouble);
		else
			writer.writeDouble(40, 0.0);
		writer.writeString(9, "$DIMTIX");
		if (this.getInt("$DIMTIX"))
			writer.writeInt16(70, varInt);
		else
			writer.writeInt16(70, 0);
		writer.writeString(9, "$DIMSOXD");
		if (this.getInt("$DIMSOXD"))
			writer.writeInt16(70, varInt);
		else
			writer.writeInt16(70, 0);
			writer.writeString(9, "$DIMSAH");
			if (this.getInt("$DIMSAH"))
				writer.writeInt16(70, varInt);
			else
				writer.writeInt16(70, 0);
		writer.writeString(9, "$DIMBLK1");
		if (varStr = this.getStr("$DIMBLK1"))
			if (ver == CONST.AC1009)
				writer.writeUtf8Caps(1, varStr);
			else
				writer.writeUtf8String(1, varStr);
		else
			writer.writeString(1, "");
		writer.writeString(9, "$DIMBLK2");
		if (varStr = this.getStr("$DIMBLK2"))
			if (ver == CONST.AC1009)
				writer.writeUtf8Caps(1, varStr);
			else
				writer.writeUtf8String(1, varStr);
		else
			writer.writeString(1, "");
		writer.writeString(9, "$DIMSTYLE");
		if (varStr = this.getStr("$DIMSTYLE"))
			if (ver == CONST.AC1009)
				writer.writeUtf8Caps(2, varStr);
			else
				writer.writeUtf8String(2, varStr);
		else
			writer.writeString(2, "STANDARD");
		writer.writeString(9, "$DIMCLRD");
		if (this.getInt("$DIMCLRD"))
			writer.writeInt16(70, varInt);
		else
			writer.writeInt16(70, 0);
		writer.writeString(9, "$DIMCLRE");
		if (this.getInt("$DIMCLRE"))
			writer.writeInt16(70, varInt);
		else
			writer.writeInt16(70, 0);
		writer.writeString(9, "$DIMCLRT");
		if (this.getInt("$DIMCLRT"))
			writer.writeInt16(70, varInt);
		else
			writer.writeInt16(70, 0);
		writer.writeString(9, "$DIMTFAC");
		if (this.getDouble("$DIMTFAC"))
			writer.writeDouble(40, varDouble);
		else
			writer.writeDouble(40, 1.0);
		writer.writeString(9, "$DIMGAP");
		if (this.getDouble("$DIMGAP"))
			writer.writeDouble(40, varDouble);
		else
			writer.writeDouble(40, 0.625);
		//post r12 dim vars
		if (ver > CONST.AC1009) {
			writer.writeString(9, "$DIMJUST");
			if (this.getInt("$DIMJUST"))
				writer.writeInt16(70, varInt);
			else
				writer.writeInt16(70, 0);
			writer.writeString(9, "$DIMSD1");
			if (this.getInt("$DIMSD1"))
				writer.writeInt16(70, varInt);
			else
				writer.writeInt16(70, 0);
			writer.writeString(9, "$DIMSD2");
			if (this.getInt("$DIMSD2"))
				writer.writeInt16(70, varInt);
			else
				writer.writeInt16(70, 0);
			writer.writeString(9, "$DIMTOLJ");
			if (this.getInt("$DIMTOLJ"))
				writer.writeInt16(70, varInt);
			else
				writer.writeInt16(70, 0);
			writer.writeString(9, "$DIMTZIN");
			if (this.getInt("$DIMTZIN"))
				writer.writeInt16(70, varInt);
			else
				writer.writeInt16(70, 8);
			writer.writeString(9, "$DIMALTZ");
			if (this.getInt("$DIMALTZ"))
				writer.writeInt16(70, varInt);
			else
				writer.writeInt16(70, 0);
			writer.writeString(9, "$DIMALTTZ");
			if (this.getInt("$DIMALTTZ"))
				writer.writeInt16(70, varInt);
			else
				writer.writeInt16(70, 0);
			writer.writeString(9, "$DIMUPT");
			if (this.getInt("$DIMUPT"))
				writer.writeInt16(70, varInt);
			else
				writer.writeInt16(70, 0);
			writer.writeString(9, "$DIMDEC");
			if (this.getInt("$DIMDEC"))
				writer.writeInt16(70, varInt);
			else
				writer.writeInt16(70, 2);
			writer.writeString(9, "$DIMTDEC");
			if (this.getInt("$DIMTDEC"))
				writer.writeInt16(70, varInt);
			else
				writer.writeInt16(70, 2);
			writer.writeString(9, "$DIMALTU");
			if (this.getInt("$DIMALTU"))
				writer.writeInt16(70, varInt);
			else
				writer.writeInt16(70, 2);
			writer.writeString(9, "$DIMALTTD");
			if (this.getInt("$DIMALTTD"))
				writer.writeInt16(70, varInt);
			else
				writer.writeInt16(70, 3);
			writer.writeString(9, "$DIMTXSTY");
			if (varStr = this.getStr("$DIMTXSTY"))
				if (ver == CONST.AC1009)
					writer.writeUtf8Caps(7, varStr);
				else
					writer.writeUtf8String(7, varStr);
			else
				writer.writeString(7, "STANDARD");
			writer.writeString(9, "$DIMAUNIT");
			if (this.getInt("$DIMAUNIT"))
				writer.writeInt16(70, varInt);
			else
				writer.writeInt16(70, 0);
			writer.writeString(9, "$DIMADEC");
			if (this.getInt("$DIMADEC"))
				writer.writeInt16(70, varInt);
			else
				writer.writeInt16(70, 0);
			writer.writeString(9, "$DIMALTRND");
			if (this.getDouble("$DIMALTRND"))
				writer.writeDouble(40, varDouble);
			else
				writer.writeDouble(40, 0.0);
			writer.writeString(9, "$DIMAZIN");
			if (this.getInt("$DIMAZIN"))
				writer.writeInt16(70, varInt);
			else
				writer.writeInt16(70, 0);
			writer.writeString(9, "$DIMDSEP");
			if (this.getInt("$DIMDSEP"))
				writer.writeInt16(70, varInt);
			else
				writer.writeInt16(70, 44);
			writer.writeString(9, "$DIMATFIT");
			if (this.getInt("$DIMATFIT"))
				writer.writeInt16(70, varInt);
			else
				writer.writeInt16(70, 3);
			writer.writeString(9, "$DIMFRAC");
			if (this.getInt("$DIMFRAC"))
				writer.writeInt16(70, varInt);
			else
				writer.writeInt16(70, 0);
			writer.writeString(9, "$DIMLDRBLK");
			if (varStr = this.getStr("$DIMLDRBLK"))
				if (ver == CONST.AC1009)
					writer.writeUtf8Caps(1, varStr);
				else
					writer.writeUtf8String(1, varStr);
			else
				writer.writeString(1, "STANDARD");
		//verify if exist "$DIMLUNIT" or obsolete "$DIMUNIT" (pre v2000)
			if ( !this.getInt("$DIMLUNIT") ){
				if (!this.getInt("$DIMUNIT"))
					varInt = 2;
			}
			//verify valid values from 1 to 6
			if (varInt<1 || varInt>6)
				varInt = 2;
			if (ver > CONST.AC1014) {
				writer.writeString(9, "$DIMLUNIT");
				writer.writeInt16(70, varInt);
			} else {
				writer.writeString(9, "$DIMUNIT");
				writer.writeInt16(70, varInt);
			}
			writer.writeString(9, "$DIMLWD");
			if (this.getInt("$DIMLWD"))
				writer.writeInt16(70, varInt);
			else
				writer.writeInt16(70, -2);
			writer.writeString(9, "$DIMLWE");
			if (this.getInt("$DIMLWE"))
				writer.writeInt16(70, varInt);
			else
				writer.writeInt16(70, -2);
			writer.writeString(9, "$DIMTMOVE");
			if (this.getInt("$DIMTMOVE"))
				writer.writeInt16(70, varInt);
			else
				writer.writeInt16(70, 0);

			if (ver > CONST.AC1018) {// and post v2004 dim vars
				writer.writeString(9, "$DIMFXL");
				if (this.getDouble("$DIMFXL"))
					writer.writeDouble(40, varDouble);
				else
					writer.writeDouble(40, 1.0);
				writer.writeString(9, "$DIMFXLON");
				if (this.getInt("$DIMFXLON"))
					writer.writeInt16(70, varInt);
				else
					writer.writeInt16(70, 0);
				writer.writeString(9, "$DIMJOGANG");
				if (this.getDouble("$DIMJOGANG"))
					writer.writeDouble(40, varDouble);
				else
					writer.writeDouble(40, 0.7854);
				writer.writeString(9, "$DIMTFILL");
				if (this.getInt("$DIMTFILL"))
					writer.writeInt16(70, varInt);
				else
					writer.writeInt16(70, 0);
				writer.writeString(9, "$DIMTFILLCLR");
				if (this.getInt("$DIMTFILLCLR"))
					writer.writeInt16(70, varInt);
				else
					writer.writeInt16(70, 0);
				writer.writeString(9, "$DIMARCSYM");
				if (this.getInt("$DIMARCSYM"))
					writer.writeInt16(70, varInt);
				else
					writer.writeInt16(70, 0);
				writer.writeString(9, "$DIMLTYPE");
				if (varStr = this.getStr("$DIMLTYPE"))
					if (ver == CONST.AC1009)
						writer.writeUtf8Caps(6, varStr);
					else
						writer.writeUtf8String(6, varStr);
				else
					writer.writeString(6, "");
				writer.writeString(9, "$DIMLTEX1");
				if (varStr = this.getStr("$DIMLTEX1"))
					if (ver == CONST.AC1009)
						writer.writeUtf8Caps(6, varStr);
					else
						writer.writeUtf8String(6, varStr);
				else
					writer.writeString(6, "");
				writer.writeString(9, "$DIMLTEX2");
				if (varStr = this.getStr("$DIMLTEX2"))
					if (ver == CONST.AC1009)
						writer.writeUtf8Caps(6, varStr);
					else
						writer.writeUtf8String(6, varStr);
				else
					writer.writeString(6, "");
				if (ver > CONST.AC1021) {// and post v2007 dim vars
					writer.writeString(9, "$DIMTXTDIRECTION");
					if (this.getInt("$DIMTXTDIRECTION"))
						writer.writeInt16(70, varInt);
					else
						writer.writeInt16(70, 0);
				}
			}// end post v2004 dim vars
		}//end post r12 dim vars

		writer.writeString(9, "$LUNITS");
		if (this.getInt("$LUNITS"))
			writer.writeInt16(70, varInt);
		else
			writer.writeInt16(70, 2);
		writer.writeString(9, "$LUPREC");
		if (this.getInt("$LUPREC"))
			writer.writeInt16(70, varInt);
		else
			writer.writeInt16(70, 4);
		writer.writeString(9, "$SKETCHINC");
		if (this.getDouble("$SKETCHINC"))
			writer.writeDouble(40, varDouble);
		else
			writer.writeDouble(40, 1.0);
		writer.writeString(9, "$FILLETRAD");
		if (this.getDouble("$FILLETRAD"))
			writer.writeDouble(40, varDouble);
		else
			writer.writeDouble(40, 0.0);
		writer.writeString(9, "$AUNITS");
		if (this.getInt("$AUNITS"))
			writer.writeInt16(70, varInt);
		else
			writer.writeInt16(70, 0);
		writer.writeString(9, "$AUPREC");
		if (this.getInt("$AUPREC"))
			writer.writeInt16(70, varInt);
		else
			writer.writeInt16(70, 2);
		writer.writeString(9, "$MENU");
		if (varStr = this.getStr("$MENU"))
			if (ver == CONST.AC1009)
				writer.writeUtf8Caps(1, varStr);
			else
				writer.writeUtf8String(1, varStr);
		else
			writer.writeString(1, ".");
		writer.writeString(9, "$ELEVATION");
		if (this.getDouble("$ELEVATION"))
			writer.writeDouble(40, varDouble);
		else
			writer.writeDouble(40, 0.0);
		writer.writeString(9, "$PELEVATION");
		if (this.getDouble("$PELEVATION"))
			writer.writeDouble(40, varDouble);
		else
			writer.writeDouble(40, 0.0);
		writer.writeString(9, "$THICKNESS");
		if (this.getDouble("$THICKNESS"))
			writer.writeDouble(40, varDouble);
		else
			writer.writeDouble(40, 0.0);
		writer.writeString(9, "$LIMCHECK");
		if (this.getInt("$LIMCHECK"))
			writer.writeInt16(70, varInt);
		else
			writer.writeInt16(70, 0);
		if (ver < CONST.AC1015) {
			writer.writeString(9, "$BLIPMODE");
			if (this.getInt("$BLIPMODE"))
				writer.writeInt16(70, varInt);
			else
				writer.writeInt16(70, 0);
		}
		writer.writeString(9, "$CHAMFERA");
		if (this.getDouble("$CHAMFERA"))
			writer.writeDouble(40, varDouble);
		else
			writer.writeDouble(40, 0.0);
		writer.writeString(9, "$CHAMFERB");
		if (this.getDouble("$CHAMFERB"))
			writer.writeDouble(40, varDouble);
		else
			writer.writeDouble(40, 0.0);
		if (ver > CONST.AC1009) {
			writer.writeString(9, "$CHAMFERC");
			if (this.getDouble("$CHAMFERC"))
				writer.writeDouble(40, varDouble);
			else
				writer.writeDouble(40, 0.0);
			writer.writeString(9, "$CHAMFERD");
			if (this.getDouble("$CHAMFERD"))
				writer.writeDouble(40, varDouble);
			else
				writer.writeDouble(40, 0.0);
		}
		writer.writeString(9, "$SKPOLY");
		if (this.getInt("$SKPOLY")) {
			writer.writeInt16(70, varInt);
		} else
			writer.writeInt16(70, 0);
		//rlz: todo, times
		writer.writeString(9, "$USRTIMER");
		if (this.getInt("$USRTIMER")) {
			writer.writeInt16(70, varInt);
		} else
			writer.writeInt16(70, 1);
		writer.writeString(9, "$ANGBASE");
		if (this.getDouble("$ANGBASE"))
			writer.writeDouble(50, varDouble);
		else
			writer.writeDouble(50, 0.0);
		writer.writeString(9, "$ANGDIR");
		if (this.getInt("$ANGDIR")) {
			writer.writeInt16(70, varInt);
		} else
			writer.writeInt16(70, 0);
		writer.writeString(9, "$PDMODE");
		if (this.getInt("$PDMODE")) {
			writer.writeInt16(70, varInt);
		} else
			writer.writeInt16(70, 34);
		writer.writeString(9, "$PDSIZE");
		if (this.getDouble("$PDSIZE"))
			writer.writeDouble(40, varDouble);
		else
			writer.writeDouble(40, 0.0);
		writer.writeString(9, "$PLINEWID");
		if (this.getDouble("$PLINEWID"))
			writer.writeDouble(40, varDouble);
		else
			writer.writeDouble(40, 0.0);
		if (ver < CONST.AC1012) {
			writer.writeString(9, "$COORDS");
			if (this.getInt("$COORDS")) {
				writer.writeInt16(70, varInt);
			} else
				writer.writeInt16(70, 2);
		}
		writer.writeString(9, "$SPLFRAME");
		if (this.getInt("$SPLFRAME")) {
			writer.writeInt16(70, varInt);
		} else
			writer.writeInt16(70, 0);
		writer.writeString(9, "$SPLINETYPE");
		if (this.getInt("$SPLINETYPE")) {
			writer.writeInt16(70, varInt);
		} else
			writer.writeInt16(70, 2);
		writer.writeString(9, "$SPLINESEGS");
		if (this.getInt("$SPLINESEGS")) {
			writer.writeInt16(70, varInt);
		} else
			writer.writeInt16(70, 8);
		if (ver < CONST.AC1012) {
			writer.writeString(9, "$ATTDIA");
			if (this.getInt("$ATTDIA")) {
				writer.writeInt16(70, varInt);
			} else
				writer.writeInt16(70, 1);
			writer.writeString(9, "$ATTREQ");
			if (this.getInt("$ATTREQ")) {
				writer.writeInt16(70, varInt);
			} else
				writer.writeInt16(70, 1);
			writer.writeString(9, "$HANDLING");
			if (this.getInt("$HANDLING")) {
				writer.writeInt16(70, varInt);
			} else
				writer.writeInt16(70, 1);
		}
		writer.writeString(9, "$HANDSEED");
		//RLZ        dxfHex(5, 0xFFFF);
		writer.writeString(5, "20000");
		writer.writeString(9, "$SURFTAB1");
		if (this.getInt("$SURFTAB1")) {
			writer.writeInt16(70, varInt);
		} else
			writer.writeInt16(70, 6);
		writer.writeString(9, "$SURFTAB2");
		if (this.getInt("$SURFTAB2")) {
			writer.writeInt16(70, varInt);
		} else
			writer.writeInt16(70, 6);
		writer.writeString(9, "$SURFTYPE");
		if (this.getInt("$SURFTYPE")) {
			writer.writeInt16(70, varInt);
		} else
			writer.writeInt16(70, 6);
		writer.writeString(9, "$SURFU");
		if (this.getInt("$SURFU")) {
			writer.writeInt16(70, varInt);
		} else
			writer.writeInt16(70, 6);
		writer.writeString(9, "$SURFV");
		if (this.getInt("$SURFV")) {
			writer.writeInt16(70, varInt);
		} else
			writer.writeInt16(70, 6);
		if (ver > CONST.AC1009) {
		writer.writeString(9, "$UCSBASE");
		if (varStr = this.getStr("$UCSBASE"))
			if (ver == CONST.AC1009)
				writer.writeUtf8Caps(2, varStr);
			else
				writer.writeUtf8String(2, varStr);
		else
			writer.writeString(2, "");
	}
		writer.writeString(9, "$UCSNAME");
		if (varStr = this.getStr("$UCSNAME"))
			if (ver == CONST.AC1009)
				writer.writeUtf8Caps(2, varStr);
			else
				writer.writeUtf8String(2, varStr);
		else
			writer.writeString(2, "");
		writer.writeString(9, "$UCSORG");
		if (this.getCoord("$UCSORG", varCoord)) {
			writer.writeDouble(10, varCoord.x);
			writer.writeDouble(20, varCoord.y);
			writer.writeDouble(30, varCoord.z);
		} else {
			writer.writeDouble(10, 0.0);
			writer.writeDouble(20, 0.0);
			writer.writeDouble(30, 0.0);
		}
		writer.writeString(9, "$UCSXDIR");
		if (this.getCoord("$UCSXDIR", varCoord)) {
			writer.writeDouble(10, varCoord.x);
			writer.writeDouble(20, varCoord.y);
			writer.writeDouble(30, varCoord.z);
		} else {
			writer.writeDouble(10, 1.0);
			writer.writeDouble(20, 0.0);
			writer.writeDouble(30, 0.0);
		}
		writer.writeString(9, "$UCSYDIR");
		if (this.getCoord("$UCSYDIR", varCoord)) {
			writer.writeDouble(10, varCoord.x);
			writer.writeDouble(20, varCoord.y);
			writer.writeDouble(30, varCoord.z);
		} else {
			writer.writeDouble(10, 0.0);
			writer.writeDouble(20, 1.0);
			writer.writeDouble(30, 0.0);
		}
		if (ver > CONST.AC1009) { //begin post r12 UCS vars
			writer.writeString(9, "$UCSORTHOREF");
			if (varStr = this.getStr("$UCSORTHOREF"))
				if (ver == CONST.AC1009)
					writer.writeUtf8Caps(2, varStr);
				else
					writer.writeUtf8String(2, varStr);
			else
				writer.writeString(2, "");
			writer.writeString(9, "$UCSORTHOVIEW");
			if (this.getInt("$UCSORTHOVIEW"))
				writer.writeInt16(70, varInt);
			else
				writer.writeInt16(70, 0);
			writer.writeString(9, "$UCSORGTOP");
			if (this.getCoord("$UCSORGTOP", varCoord)) {
				writer.writeDouble(10, varCoord.x);
				writer.writeDouble(20, varCoord.y);
				writer.writeDouble(30, varCoord.z);
			} else {
				writer.writeDouble(10, 0.0);
				writer.writeDouble(20, 0.0);
				writer.writeDouble(30, 0.0);
			}
			writer.writeString(9, "$UCSORGBOTTOM");
			if (this.getCoord("$UCSORGBOTTOM", varCoord)) {
				writer.writeDouble(10, varCoord.x);
				writer.writeDouble(20, varCoord.y);
				writer.writeDouble(30, varCoord.z);
			} else {
				writer.writeDouble(10, 0.0);
				writer.writeDouble(20, 0.0);
				writer.writeDouble(30, 0.0);
			}
			writer.writeString(9, "$UCSORGLEFT");
			if (this.getCoord("$UCSORGLEFT", varCoord)) {
				writer.writeDouble(10, varCoord.x);
				writer.writeDouble(20, varCoord.y);
				writer.writeDouble(30, varCoord.z);
			} else {
				writer.writeDouble(10, 0.0);
				writer.writeDouble(20, 0.0);
				writer.writeDouble(30, 0.0);
			}
			writer.writeString(9, "$UCSORGRIGHT");
			if (this.getCoord("$UCSORGRIGHT", varCoord)) {
				writer.writeDouble(10, varCoord.x);
				writer.writeDouble(20, varCoord.y);
				writer.writeDouble(30, varCoord.z);
			} else {
				writer.writeDouble(10, 0.0);
				writer.writeDouble(20, 0.0);
				writer.writeDouble(30, 0.0);
			}
			writer.writeString(9, "$UCSORGFRONT");
			if (this.getCoord("$UCSORGFRONT", varCoord)) {
				writer.writeDouble(10, varCoord.x);
				writer.writeDouble(20, varCoord.y);
				writer.writeDouble(30, varCoord.z);
			} else {
				writer.writeDouble(10, 0.0);
				writer.writeDouble(20, 0.0);
				writer.writeDouble(30, 0.0);
			}
			writer.writeString(9, "$UCSORGBACK");
			if (this.getCoord("$UCSORGBACK", varCoord)) {
				writer.writeDouble(10, varCoord.x);
				writer.writeDouble(20, varCoord.y);
				writer.writeDouble(30, varCoord.z);
			} else {
				writer.writeDouble(10, 0.0);
				writer.writeDouble(20, 0.0);
				writer.writeDouble(30, 0.0);
			}
			writer.writeString(9, "$PUCSBASE");
			if (varStr = this.getStr("$PUCSBASE"))
				if (ver == CONST.AC1009)
					writer.writeUtf8Caps(2, varStr);
				else
					writer.writeUtf8String(2, varStr);
			else
				writer.writeString(2, "");
		} //end post r12 UCS vars
		writer.writeString(9, "$PUCSNAME");
		if (varStr = this.getStr("$PUCSNAME"))
			if (ver == CONST.AC1009)
				writer.writeUtf8Caps(2, varStr);
			else
				writer.writeUtf8String(2, varStr);
		else
			writer.writeString(2, "");
		writer.writeString(9, "$PUCSORG");
		if (this.getCoord("$PUCSORG", varCoord)) {
			writer.writeDouble(10, varCoord.x);
			writer.writeDouble(20, varCoord.y);
			writer.writeDouble(30, varCoord.z);
		} else {
			writer.writeDouble(10, 0.0);
			writer.writeDouble(20, 0.0);
			writer.writeDouble(30, 0.0);
		}
		writer.writeString(9, "$PUCSXDIR");
		if (this.getCoord("$PUCSXDIR", varCoord)) {
			writer.writeDouble(10, varCoord.x);
			writer.writeDouble(20, varCoord.y);
			writer.writeDouble(30, varCoord.z);
		} else {
			writer.writeDouble(10, 1.0);
			writer.writeDouble(20, 0.0);
			writer.writeDouble(30, 0.0);
		}
		writer.writeString(9, "$PUCSYDIR");
		if (this.getCoord("$PUCSYDIR", varCoord)) {
			writer.writeDouble(10, varCoord.x);
			writer.writeDouble(20, varCoord.y);
			writer.writeDouble(30, varCoord.z);
		} else {
			writer.writeDouble(10, 0.0);
			writer.writeDouble(20, 1.0);
			writer.writeDouble(30, 0.0);
		}
		if (ver > CONST.AC1009) { //begin post r12 PUCS vars
			writer.writeString(9, "$PUCSORTHOREF");
			if (varStr = this.getStr("$PUCSORTHOREF"))
				if (ver == CONST.AC1009)
					writer.writeUtf8Caps(2, varStr);
				else
					writer.writeUtf8String(2, varStr);
			else
				writer.writeString(2, "");
			writer.writeString(9, "$PUCSORTHOVIEW");
			if (this.getInt("$PUCSORTHOVIEW"))
				writer.writeInt16(70, varInt);
			else
				writer.writeInt16(70, 0);
			writer.writeString(9, "$PUCSORGTOP");
			if (this.getCoord("$PUCSORGTOP", varCoord)) {
				writer.writeDouble(10, varCoord.x);
				writer.writeDouble(20, varCoord.y);
				writer.writeDouble(30, varCoord.z);
			} else {
				writer.writeDouble(10, 0.0);
				writer.writeDouble(20, 0.0);
				writer.writeDouble(30, 0.0);
			}
			writer.writeString(9, "$PUCSORGBOTTOM");
			if (this.getCoord("$PUCSORGBOTTOM", varCoord)) {
				writer.writeDouble(10, varCoord.x);
				writer.writeDouble(20, varCoord.y);
				writer.writeDouble(30, varCoord.z);
			} else {
				writer.writeDouble(10, 0.0);
				writer.writeDouble(20, 0.0);
				writer.writeDouble(30, 0.0);
			}
			writer.writeString(9, "$PUCSORGLEFT");
			if (this.getCoord("$PUCSORGLEFT", varCoord)) {
				writer.writeDouble(10, varCoord.x);
				writer.writeDouble(20, varCoord.y);
				writer.writeDouble(30, varCoord.z);
			} else {
				writer.writeDouble(10, 0.0);
				writer.writeDouble(20, 0.0);
				writer.writeDouble(30, 0.0);
			}
			writer.writeString(9, "$PUCSORGRIGHT");
			if (this.getCoord("$PUCSORGRIGHT", varCoord)) {
				writer.writeDouble(10, varCoord.x);
				writer.writeDouble(20, varCoord.y);
				writer.writeDouble(30, varCoord.z);
			} else {
				writer.writeDouble(10, 0.0);
				writer.writeDouble(20, 0.0);
				writer.writeDouble(30, 0.0);
			}
			writer.writeString(9, "$PUCSORGFRONT");
			if (this.getCoord("$PUCSORGFRONT", varCoord)) {
				writer.writeDouble(10, varCoord.x);
				writer.writeDouble(20, varCoord.y);
				writer.writeDouble(30, varCoord.z);
			} else {
				writer.writeDouble(10, 0.0);
				writer.writeDouble(20, 0.0);
				writer.writeDouble(30, 0.0);
			}
			writer.writeString(9, "$PUCSORGBACK");
			if (this.getCoord("$PUCSORGBACK", varCoord)) {
				writer.writeDouble(10, varCoord.x);
				writer.writeDouble(20, varCoord.y);
				writer.writeDouble(30, varCoord.z);
			} else {
				writer.writeDouble(10, 0.0);
				writer.writeDouble(20, 0.0);
				writer.writeDouble(30, 0.0);
			}
		} //end post r12 PUCS vars

		writer.writeString(9, "$USERI1");
		if (this.getInt("$USERI1"))
			writer.writeInt16(70, varInt);
		else
			writer.writeInt16(70, 0);
		writer.writeString(9, "$USERI2");
		if (this.getInt("$USERI2"))
			writer.writeInt16(70, varInt);
		else
			writer.writeInt16(70, 0);
		writer.writeString(9, "$USERI3");
		if (this.getInt("$USERI3"))
			writer.writeInt16(70, varInt);
		else
			writer.writeInt16(70, 0);
		writer.writeString(9, "$USERI4");
		if (this.getInt("$USERI4"))
			writer.writeInt16(70, varInt);
		else
			writer.writeInt16(70, 0);
		writer.writeString(9, "$USERI5");
		if (this.getInt("$USERI5"))
			writer.writeInt16(70, varInt);
		else
			writer.writeInt16(70, 0);
		writer.writeString(9, "$USERR1");
		if (this.getDouble("$USERR1"))
			writer.writeDouble(40, varDouble);
		else
			writer.writeDouble(40, 0.0);
		writer.writeString(9, "$USERR2");
		if (this.getDouble("$USERR2"))
			writer.writeDouble(40, varDouble);
		else
			writer.writeDouble(40, 0.0);
		writer.writeString(9, "$USERR3");
		if (this.getDouble("$USERR3"))
			writer.writeDouble(40, varDouble);
		else
			writer.writeDouble(40, 0.0);
		writer.writeString(9, "$USERR4");
		if (this.getDouble("$USERR4"))
			writer.writeDouble(40, varDouble);
		else
			writer.writeDouble(40, 0.0);
		writer.writeString(9, "$USERR5");
		if (this.getDouble("$USERR5"))
			writer.writeDouble(40, varDouble);
		else
			writer.writeDouble(40, 0.0);
		writer.writeString(9, "$WORLDVIEW");
		if (this.getInt("$WORLDVIEW"))
			writer.writeInt16(70, varInt);
		else
			writer.writeInt16(70, 1);
		writer.writeString(9, "$SHADEDGE");
		if (this.getInt("$SHADEDGE"))
			writer.writeInt16(70, varInt);
		else
			writer.writeInt16(70, 3);
		writer.writeString(9, "$SHADEDIF");
		if (this.getInt("$SHADEDIF"))
			writer.writeInt16(70, varInt);
		else
			writer.writeInt16(70, 70);
		writer.writeString(9, "$TILEMODE");
		if (this.getInt("$TILEMODE"))
			writer.writeInt16(70, varInt);
		else
			writer.writeInt16(70, 1);
		writer.writeString(9, "$MAXACTVP");
		if (this.getInt("$MAXACTVP"))
			writer.writeInt16(70, varInt);
		else
			writer.writeInt16(70, 64);
		if (ver > CONST.AC1009) { //begin post r12 PUCS vars
			writer.writeString(9, "$PINSBASE");
			if (this.getCoord("$PINSBASE", varCoord)) {
				writer.writeDouble(10, varCoord.x);
				writer.writeDouble(20, varCoord.y);
				writer.writeDouble(30, varCoord.z);
			} else {
				writer.writeDouble(10, 0.0);
				writer.writeDouble(20, 0.0);
				writer.writeDouble(30, 0.0);
			}
		}
		writer.writeString(9, "$PLIMCHECK");
		if (this.getInt("$PLIMCHECK"))
			writer.writeInt16(70, varInt);
		else
			writer.writeInt16(70, 0);
		writer.writeString(9, "$PEXTMIN");
		if (this.getCoord("$PEXTMIN", varCoord)) {
			writer.writeDouble(10, varCoord.x);
			writer.writeDouble(20, varCoord.y);
			writer.writeDouble(30, varCoord.z);
		} else {
			writer.writeDouble(10, 0.0);
			writer.writeDouble(20, 0.0);
			writer.writeDouble(30, 0.0);
		}
		writer.writeString(9, "$PEXTMAX");
		if (this.getCoord("$PEXTMAX", varCoord)) {
			writer.writeDouble(10, varCoord.x);
			writer.writeDouble(20, varCoord.y);
			writer.writeDouble(30, varCoord.z);
		} else {
			writer.writeDouble(10, 0.0);
			writer.writeDouble(20, 0.0);
			writer.writeDouble(30, 0.0);
		}

	/* RLZ: moved to active VPORT, but can write in header if present*/
		if (this.getInt("$GRIDMODE")) {
			writer.writeString(9, "$GRIDMODE");
			writer.writeInt16(70, varInt);
		}
		if (this.getInt("$SNAPSTYLE")) {
			writer.writeString(9, "$SNAPSTYLE");
			writer.writeInt16(70, varInt);
		}
		if (this.getCoord("$GRIDUNIT", varCoord)) {
			writer.writeString(9, "$GRIDUNIT");
			writer.writeDouble(10, varCoord.x);
			writer.writeDouble(20, varCoord.y);
		}
		if (this.getCoord("$VIEWCTR", varCoord)) {
			writer.writeString(9, "$VIEWCTR");
			writer.writeDouble(10, varCoord.x);
			writer.writeDouble(20, varCoord.y);
		}
	/* RLZ: moved to active VPORT, but can write in header if present*/

		writer.writeString(9, "$PLIMMIN");
		if (this.getCoord("$PLIMMIN", varCoord)) {
			writer.writeDouble(10, varCoord.x);
			writer.writeDouble(20, varCoord.y);
		} else {
			writer.writeDouble(10, 0.0);
			writer.writeDouble(20, 0.0);
		}
		writer.writeString(9, "$PLIMMAX");
		if (this.getCoord("$PLIMMAX", varCoord)) {
			writer.writeDouble(10, varCoord.x);
			writer.writeDouble(20, varCoord.y);
		} else {
			writer.writeDouble(10, 297.0);
			writer.writeDouble(20, 210.0);
		}
		writer.writeString(9, "$UNITMODE");
		if (this.getInt("$UNITMODE"))
			writer.writeInt16(70, varInt);
		else
			writer.writeInt16(70, 0);
		writer.writeString(9, "$VISRETAIN");
		if (this.getInt("$VISRETAIN"))
			writer.writeInt16(70, varInt);
		else
			writer.writeInt16(70, 1);
		writer.writeString(9, "$PLINEGEN");
		if (this.getInt("$PLINEGEN"))
			writer.writeInt16(70, varInt);
		else
			writer.writeInt16(70, 0);
		writer.writeString(9, "$PSLTSCALE");
		if (this.getInt("$PSLTSCALE"))
			writer.writeInt16(70, varInt);
		else
			writer.writeInt16(70, 1);
		if (ver > CONST.AC1009){//start port r12 vars
			writer.writeString(9, "$TREEDEPTH");
			if (this.getInt("$TREEDEPTH"))
				writer.writeInt16(70, varInt);
			else
				writer.writeInt16(70, 3020);
			writer.writeString(9, "$CMLSTYLE");
			if (varStr = this.getStr("$CMLSTYLE"))
				if (ver == CONST.AC1009)
					writer.writeUtf8Caps(2, varStr);
				else
					writer.writeUtf8String(2, varStr);
			else
				writer.writeString(2, "Standard");
			writer.writeString(9, "$CMLJUST");
			if (this.getInt("$CMLJUST"))
				writer.writeInt16(70, varInt);
			else
				writer.writeInt16(70, 0);
			writer.writeString(9, "$CMLSCALE");
			if (this.getDouble("$CMLSCALE"))
				writer.writeDouble(40, varDouble);
			else
				writer.writeDouble(40, 20.0);
			writer.writeString(9, "$PROXYGRAPHICS");
			if (this.getInt("$PROXYGRAPHICS"))
				writer.writeInt16(70, varInt);
			else
				writer.writeInt16(70, 1);
			writer.writeString(9, "$MEASUREMENT");
			if (this.getInt("$MEASUREMENT"))
				writer.writeInt16(70, varInt);
			else
				writer.writeInt16(70, 1);
			writer.writeString(9, "$CELWEIGHT");
			if (this.getInt("$CELWEIGHT"))
				writer.writeInt16(370, varInt);
			else
				writer.writeInt16(370, -1);
			writer.writeString(9, "$ENDCAPS");
			if (this.getInt("$ENDCAPS"))
				writer.writeInt16(280, varInt);
			else
				writer.writeInt16(280, 0);
			writer.writeString(9, "$JOINSTYLE");
			if (this.getInt("$JOINSTYLE"))
				writer.writeInt16(280, varInt);
			else
				writer.writeInt16(280, 0);
			writer.writeString(9, "$LWDISPLAY"); //RLZ bool flag, verify in bin version
			if (this.getInt("$LWDISPLAY"))
				writer.writeInt16(290, varInt);
			else
				writer.writeInt16(290, 0);
			if (ver > CONST.AC1014) {
				writer.writeString(9, "$INSUNITS");
				if (this.getInt("$INSUNITS"))
					writer.writeInt16(70, varInt);
				else
					writer.writeInt16(70, 0);
			}
			writer.writeString(9, "$HYPERLINKBASE");
			if (varStr = this.getStr("$HYPERLINKBASE"))
				if (ver == CONST.AC1009)
					writer.writeUtf8Caps(1, varStr);
				else
					writer.writeUtf8String(1, varStr);
			else
				writer.writeString(1, "");
			writer.writeString(9, "$STYLESHEET");
			if (varStr = this.getStr("$STYLESHEET"))
				if (ver == CONST.AC1009)
					writer.writeUtf8Caps(1, varStr);
				else
					writer.writeUtf8String(1, varStr);
			else
				writer.writeString(1, "");
			writer.writeString(9, "$XEDIT"); //RLZ bool flag, verify in bin version
			if (this.getInt("$XEDIT"))
				writer.writeInt16(290, varInt);
			else
				writer.writeInt16(290, 1);
			writer.writeString(9, "$CEPSNTYPE");
			if (this.getInt("$CEPSNTYPE"))
				writer.writeInt16(380, varInt);
			else
				writer.writeInt16(380, 0);
			writer.writeString(9, "$PSTYLEMODE"); //RLZ bool flag, verify in bin version
			if (this.getInt("$PSTYLEMODE"))
				writer.writeInt16(290, varInt);
			else
				writer.writeInt16(290, 1);
	//RLZ: here $FINGERPRINTGUID and $VERSIONGUID, do not add?
			writer.writeString(9, "$EXTNAMES"); //RLZ bool flag, verify in bin version
			if (this.getInt("$EXTNAMES"))
				writer.writeInt16(290, varInt);
			else
				writer.writeInt16(290, 1);
			writer.writeString(9, "$PSVPSCALE");
			if (this.getDouble("$PSVPSCALE"))
				writer.writeDouble(40, varDouble);
			else
				writer.writeDouble(40, 0.0);
			writer.writeString(9, "$OLESTARTUP"); //RLZ bool flag, verify in bin version
			if (this.getInt("$OLESTARTUP"))
				writer.writeInt16(290, varInt);
			else
				writer.writeInt16(290, 0);
		}
		if (ver > CONST.AC1015) {// and post v2004 vars
			writer.writeString(9, "$SORTENTS");
			if (this.getInt("$SORTENTS"))
				writer.writeInt16(280, varInt);
			else
				writer.writeInt16(280, 127);
			writer.writeString(9, "$INDEXCTL");
			if (this.getInt("$INDEXCTL"))
				writer.writeInt16(280, varInt);
			else
				writer.writeInt16(280, 0);
			writer.writeString(9, "$HIDETEXT");
			if (this.getInt("$HIDETEXT"))
				writer.writeInt16(280, varInt);
			else
				writer.writeInt16(280, 1);
			writer.writeString(9, "$XCLIPFRAME"); //RLZ bool flag, verify in bin version
			if (ver > CONST.AC1021) {
				if (this.getInt("$XCLIPFRAME"))
					writer.writeInt16(280, varInt);
				else
					writer.writeInt16(280, 0);
			} else {
				if (this.getInt("$XCLIPFRAME"))
					writer.writeInt16(290, varInt);
				else
					writer.writeInt16(290, 0);
			}
			writer.writeString(9, "$HALOGAP");
			if (this.getInt("$HALOGAP"))
				writer.writeInt16(280, varInt);
			else
				writer.writeInt16(280, 0);
			writer.writeString(9, "$OBSCOLOR");
			if (this.getInt("$OBSCOLOR"))
				writer.writeInt16(70, varInt);
			else
				writer.writeInt16(70, 257);
			writer.writeString(9, "$OBSLTYPE");
			if (this.getInt("$OBSLTYPE"))
				writer.writeInt16(280, varInt);
			else
				writer.writeInt16(280, 0);
			writer.writeString(9, "$INTERSECTIONDISPLAY");
			if (this.getInt("$INTERSECTIONDISPLAY"))
				writer.writeInt16(280, varInt);
			else
				writer.writeInt16(280, 0);
			writer.writeString(9, "$INTERSECTIONCOLOR");
			if (this.getInt("$INTERSECTIONCOLOR"))
				writer.writeInt16(70, varInt);
			else
				writer.writeInt16(70, 257);
			writer.writeString(9, "$DIMASSOC");
			if (this.getInt("$DIMASSOC"))
				writer.writeInt16(280, varInt);
			else
				writer.writeInt16(280, 1);
			writer.writeString(9, "$PROJECTNAME");
			if (varStr = this.getStr("$PROJECTNAME"))
				writer.writeUtf8String(1, varStr);
			else
				writer.writeString(1, "");
		}
		if (ver > CONST.AC1018) {// and post v2007 vars
			writer.writeString(9, "$CAMERADISPLAY"); //RLZ bool flag, verify in bin version
			if (this.getInt("$CAMERADISPLAY"))
				writer.writeInt16(290, varInt);
			else
				writer.writeInt16(290, 0);
			writer.writeString(9, "$LENSLENGTH");
			if (this.getDouble("$LENSLENGTH"))
				writer.writeDouble(40, varDouble);
			else
				writer.writeDouble(40, 50.0);
			writer.writeString(9, "$CAMERAHEIGHT");
			if (this.getDouble("$CAMERAHEIGTH"))
				writer.writeDouble(40, varDouble);
			else
				writer.writeDouble(40, 0.0);
			writer.writeString(9, "$STEPSPERSEC");
			if (this.getDouble("$STEPSPERSEC"))
				writer.writeDouble(40, varDouble);
			else
				writer.writeDouble(40, 2.0);
			writer.writeString(9, "$STEPSIZE");
			if (this.getDouble("$STEPSIZE"))
				writer.writeDouble(40, varDouble);
			else
				writer.writeDouble(40, 50.0);
			writer.writeString(9, "$3DDWFPREC");
			if (this.getDouble("$3DDWFPREC"))
				writer.writeDouble(40, varDouble);
			else
				writer.writeDouble(40, 2.0);
			writer.writeString(9, "$PSOLWIDTH");
			if (this.getDouble("$PSOLWIDTH"))
				writer.writeDouble(40, varDouble);
			else
				writer.writeDouble(40, 5.0);
			writer.writeString(9, "$PSOLHEIGHT");
			if (this.getDouble("$PSOLHEIGHT"))
				writer.writeDouble(40, varDouble);
			else
				writer.writeDouble(40, 80.0);
			writer.writeString(9, "$LOFTANG1");
			let M_PI_2 = Math.PI*2;
			if (this.getDouble("$LOFTANG1"))
				writer.writeDouble(40, varDouble);
			else
				writer.writeDouble(40, M_PI_2);
			writer.writeString(9, "$LOFTANG2");
			if (this.getDouble("$LOFTANG2"))
				writer.writeDouble(40, varDouble);
			else
				writer.writeDouble(40, M_PI_2);
			writer.writeString(9, "$LOFTMAG1");
			if (this.getDouble("$LOFTMAG1"))
				writer.writeDouble(40, varDouble);
			else
				writer.writeDouble(40, 0.0);
			writer.writeString(9, "$LOFTMAG2");
			if (this.getDouble("$LOFTMAG2"))
				writer.writeDouble(40, varDouble);
			else
				writer.writeDouble(40, 0.0);
			writer.writeString(9, "$LOFTPARAM");
			if (this.getInt("$LOFTPARAM"))
				writer.writeInt16(70, varInt);
			else
				writer.writeInt16(70, 7);
			writer.writeString(9, "$LOFTNORMALS");
			if (this.getInt("$LOFTNORMALS"))
				writer.writeInt16(280, varInt);
			else
				writer.writeInt16(280, 1);
			writer.writeString(9, "$LATITUDE");
			if (this.getDouble("$LATITUDE"))
				writer.writeDouble(40, varDouble);
			else
				writer.writeDouble(40, 1.0);
			writer.writeString(9, "$LONGITUDE");
			if (this.getDouble("$LONGITUDE"))
				writer.writeDouble(40, varDouble);
			else
				writer.writeDouble(40, 1.0);
			writer.writeString(9, "$NORTHDIRECTION");
			if (this.getDouble("$LONGITUDE"))
				writer.writeDouble(40, varDouble);
			else
				writer.writeDouble(40, 0.0);
			writer.writeString(9, "$TIMEZONE");
			if (this.getInt("$TIMEZONE"))
				writer.writeInt16(70, varInt);
			else
				writer.writeInt16(70, -8000);
			writer.writeString(9, "$LIGHTGLYPHDISPLAY");
			if (this.getInt("$LIGHTGLYPHDISPLAY"))
				writer.writeInt16(280, varInt);
			else
				writer.writeInt16(280, 1);
			writer.writeString(9, "$TILEMODELIGHTSYNCH");
			if (this.getInt("$TILEMODELIGHTSYNCH"))
				writer.writeInt16(280, varInt);
			else
				writer.writeInt16(280, 1);
		//$CMATERIAL is a handle
			writer.writeString(9, "$SOLIDHIST");
			if (this.getInt("$SOLIDHIST"))
				writer.writeInt16(280, varInt);
			else
				writer.writeInt16(280, 1);
			writer.writeString(9, "$SHOWHIST");
			if (this.getInt("$SHOWHIST"))
				writer.writeInt16(280, varInt);
			else
				writer.writeInt16(280, 1);
			writer.writeString(9, "$DWFFRAME");
			if (this.getInt("$DWFFRAME"))
				writer.writeInt16(280, varInt);
			else
				writer.writeInt16(280, 2);
			writer.writeString(9, "$DGNFRAME");
			if (this.getInt("$DGNFRAME"))
				writer.writeInt16(280, varInt);
			else
				writer.writeInt16(280, 0);
			writer.writeString(9, "$REALWORLDSCALE"); //RLZ bool flag, verify in bin version
			if (this.getInt("$REALWORLDSCALE"))
				writer.writeInt16(290, varInt);
			else
				writer.writeInt16(290, 1);
			writer.writeString(9, "$INTERFERECOLOR");
			if (this.getInt("$INTERFERECOLOR"))
				writer.writeInt16(62, varInt);
			else
				writer.writeInt16(62, 1);
			//$INTERFEREOBJVS is a handle
			//$INTERFEREVPVS is a handle
			writer.writeString(9, "$CSHADOW");
			if (this.getInt("$CSHADOW"))
				writer.writeInt16(280, varInt);
			else
				writer.writeInt16(280, 0);
			writer.writeString(9, "$SHADOWPLANELOCATION");
			if (this.getDouble("$SHADOWPLANELOCATION"))
				writer.writeDouble(40, varDouble);
			else
				writer.writeDouble(40, 0.0);
		}
/*
	#ifdef DRW_DBG
		std::map<,DRW_Variant *>::const_iterator it;
		for ( it=vars.begin() ; it != vars.end(); ++it ){
			DRW_DBG((*it).first); DRW_DBG("\n");
		}
	#endif
*/
	}

	addDouble(key, value, code){
		this.vars[key] = { code:code, val:value };
	}

	addInt(key, value, code){
		this.vars[key] = { code:code, val:value };
	}

	addStr(key,  value, code){
		this.vars[key] = { code:code, val:value };
	}

	addCoord(key, value, code){
		this.vars[key] = { code:code, val:value };
	}
	
	getStr(key){
		var v = this.vars[key];
		varStr = v ? v.val : undefined;
		return v;
	}
	
	getCoord(key){
		let cd = this.vars[key];
		varCoord = undefined;
		if (cd)
		{
			varCoord = cd = cd.val;
		}
		return cd;
	}
	
	getDouble(key){
		varDouble = undefined;
		let v = this.vars[key];
		if (v){
			varDouble = v.val;
			return isRealNum(v.val);
		}
		return null;
	}
	
	getInt(key){
		varInt = undefined;
		var v = this.vars[key];
		if (v){
			varInt = v.val;
			return isRealNum(v.val);
		}
		return null;
	}
	
    /**
     * @link https://www.autodesk.com/techpubs/autocad/acadr14/dxf/ltype_al_u05_c.htm
     */
    toDxfString()
    {
//		let writer = new Writer;
	//	write(writer);
      //  return writer.getString();
    }
}

module.exports = Header;
},{"./Const":3,"./Coord":4}],9:[function(require,module,exports){
const CONST = require('./Const');
const Writer = require('./Writer');
const Coord = require('./Coord');
const Point = require('./Point');

class LType
{
    constructor(name, description, path)
    {
		this.name = name;
		this.flags = 0;
		
        this.desc = description;
        this.length = 0.0;
        this.pathIdx = 0;
		this.path = path||[];  /*!< trace, point or space length sequence, code 49 */
    }

	update(){
		let d =0;
		let size = this.path.length;
		for (let i = 0;  i< size; i++){
			d += Math.abs(this.path[i]);
		}
		this.length = d;
	}	
	
	write(writer){
		let version = writer.getVersion();
		let strname = this.name.toUpperCase();

		//do not write linetypes handled by library
		if (strname == "BYLAYER" || strname == "BYBLOCK" || strname == "CONTINUOUS") {
			return;
		}
		
		writer.writeString(0, "LTYPE");
		if (version > CONST.AC1009) {
			writer.writeString(5, writer.getNewHandleHex());
			if (version > CONST.AC1012) {
				writer.writeString(330, "5");
			}
			writer.writeString(100, "AcDbSymbolTableRecord");
			writer.writeString(100, "AcDbLinetypeTableRecord");
			writer.writeUtf8String(2, this.name);
		} else
			writer.writeUtf8Caps(2, this.name);
		writer.writeInt16(70, this.flags);
		writer.writeUtf8String(3, this.desc);
		this.update();
		writer.writeInt16(72, 65);
		writer.writeInt16(73, this.path.length);
		writer.writeDouble(40, this.length);

		for (var i = 0;  i< this.path.length; i++){
			writer.writeDouble(49, this.path[i]);
			if (version > CONST.AC1009) {
				writer.writeInt16(74, 0);
			}
		}
	}
}

module.exports = LType;
},{"./Const":3,"./Coord":4,"./Point":12,"./Writer":17}],10:[function(require,module,exports){
const CONST = require('./Const');
const Writer = require('./Writer');

class Layer
{
    constructor(name, colorNumber, lineTypeName)
    {
		this.tType = CONST.TTYPE_LAYER;     /*!< enum: entity type, code 0 */
//		duint32 handle;            /*!< entity identifier, code 5 */
//		int parentHandle;          /*!< Soft-pointer ID/handle to owner object, code 330 */
		this.name = name;           /*!< entry name, code 2 */
		this.flags = 0;                 /*!< Flags relevant to entry, code 70 */
		
		this.lineType = lineTypeName || "CONTINUOUS";            /*!< line type, code 6 */
		this.color = colorNumber || CONST.ColorByLayer;  /*!< layer color, code 62 */
		this.color24 = -1;                    /*!< 24-bit color, code 420 */
		this.plotF = true;                     /*!< Plot flag, code 290 */
		this.lWeight = CONST.widthDefault; /*!< layer lineweight, code 370 */
		//std::string handlePlotS;        /*!< Hard-pointer ID/handle of plotstyle, code 390 */
		//std::string handleMaterialS;        /*!< Hard-pointer ID/handle of materialstyle, code 347 */
	/*only used for read dwg*/
		//dwgHandle lTypeH;
		this.shapes = [];
    }

    addShape(shape)
    {
        this.shapes.push(shape);
        shape.layer = this;
		shape.layerName = this.name;
    }

    getShapes()
    {
        return this.shapes;
    }

	write(writer){
		let version = writer.getVersion();
		writer.writeString(0, "LAYER");
		// 是否已经写入wlayer0
		if (!writer.wlayer0 && this.name == "0") {
			writer.wlayer0 = true;
			if (version > CONST.AC1009) {
				writer.writeString(5, "10");
			}
		} else {
			if (version > CONST.AC1009) {
				writer.writeString(5, writer.getNewHandleHex());
			}
		}
		if (version > CONST.AC1012) {
			writer.writeString(330, "2");
		}
		if (version > CONST.AC1009) {
			writer.writeString(100, "AcDbSymbolTableRecord");
			writer.writeString(100, "AcDbLayerTableRecord");
			writer.writeUtf8String(2, this.name);
		} else {
			writer.writeUtf8Caps(2, this.name);
		}
		writer.writeInt16(70, this.flags);
		writer.writeInt16(62, this.color);
		if (version > CONST.AC1015 && this.color24 >= 0) {
			writer.writeInt32(420, this.color24);
		}
		if (version > CONST.AC1009) {
			writer.writeUtf8String(6, this.lineType);
			if (! this.plotF)
				writer.writeBool(290, this.plotF);
			writer.writeInt16(370, CONST.lineWidth2dxfInt(this.lWeight));
			writer.writeString(390, "F");
		} else
			writer.writeUtf8Caps(6, this.lineType);
//		if (!this.extData.empty()){
//			writeExtData(this.extData);
//		}
	}
		
    shapesToDxf()
    {
        let s = '';
        for (let i = 0; i < this.shapes.length; ++i)
        {
            s += this.shapes[i].toDxfString();
        }
        
        return s;
    }
}

module.exports = Layer;
},{"./Const":3,"./Writer":17}],11:[function(require,module,exports){
class Line
{
    constructor(x1, y1, x2, y2)
    {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    toDxfString()
    {
        //https://www.autodesk.com/techpubs/autocad/acadr14/dxf/line_al_u05_c.htm
        let s = `0\nLINE\n`;
        s += `8\n${this.layer.name}\n`;
        s += `10\n${this.x1}\n20\n${this.y1}\n30\n0\n`;
        s += `11\n${this.x2}\n21\n${this.y2}\n31\n0\n`;
        return s;
    }
}

module.exports = Line;
},{}],12:[function(require,module,exports){
const CONST = require('./Const');
const Writer = require('./Writer');
const Entity = require('./Entity');
const Coord = require('./Coord');

class Point extends Entity 
{
    constructor(x1, y1, z1)
    {
		super();
		this.basePoint = new Coord(x1, y1, z1);
    }

	write(writer) {
		let version = writer.getVersion();
		writer.writeString(0, "POINT");
		super.write(writer);
		if (version > CONST.AC1009) {
			writer.writeString(100, "AcDbPoint");
		}
		writer.writeDouble(10, this.basePoint.x);
		writer.writeDouble(20, this.basePoint.y);
		if (this.basePoint.z != 0.0) {
			writer.writeDouble(30, this.basePoint.z);
		}
	}
}

module.exports = Point;
},{"./Const":3,"./Coord":4,"./Entity":6,"./Writer":17}],13:[function(require,module,exports){
class Polyline
{
    /**
     * @param {array} points - Array of points like [ [x1, y1], [x2, y2]... ]
     */
    constructor(points)
    {
        this.points = points;
    }

    toDxfString()
    {
        //https://www.autodesk.com/techpubs/autocad/acad2000/dxf/polyline_dxf_06.htm
        //https://www.autodesk.com/techpubs/autocad/acad2000/dxf/vertex_dxf_06.htm
        let s = `0\nPOLYLINE\n`;
        s += `8\n${this.layer.name}\n`;
        s += `66\n1\n70\n0\n`;

        for (let i = 0; i < this.points.length; ++i)
        {
            s += `0\nVERTEX\n`;
            s += `8\n${this.layer.name}\n`;
            s += `70\n0\n`;
            s += `10\n${this.points[i][0]}\n20\n${this.points[i][1]}\n`;
        }
        
        s += `0\nSEQEND\n`;
        return s;
    }
}

module.exports = Polyline;
},{}],14:[function(require,module,exports){
class Text
{
    /**
     * @param {number} x1 - x
     * @param {number} y1 - y
     * @param {number} height - Text height
     * @param {number} rotation - Text rotation
     * @param {string} value - the string itself
     */
    constructor(x1, y1, height, rotation, value)
    {
        this.x1 = x1;
        this.y1 = y1;
        this.height = height;
        this.rotation = rotation;
        this.value = value;
    }

    toDxfString()
    {
        //https://www.autodesk.com/techpubs/autocad/acadr14/dxf/text_al_u05_c.htm
        let s = `0\nTEXT\n`;
        s += `8\n${this.layer.name}\n`;
        s += `1\n${this.value}\n`;
        s += `10\n${this.x1}\n20\n${this.y1}\n30\n0\n`;
        s += `40\n${this.height}\n50\n${this.rotation}\n`;
        return s;
    }
}

module.exports = Text;
},{}],15:[function(require,module,exports){
const CONST = require('./Const');
const Writer = require('./Writer');

let part = function(code, val){
	return code + '\n' + val + '\n';
}

class Textstyle
{
    /**
     * @param {string} name
     * @param {string} description
     * @param {array} elements - if elem > 0 it is a line, if elem < 0 it is gap, if elem == 0.0 it is a 
     */
    constructor(name, fontName)
    {
		this.name = name;
		this.flags = 0;
		this.height = 0;          /*!< Fixed text height (0 not set), code 40 */
		this.width = 0;           /*!< Width factor, code 41 */
		this.oblique = 0;         /*!< Oblique angle, code 50 */
		this.genFlag = 0;            /*!< Text generation flags, code 71 */
		this.lastHeight = 0;      /*!< Last height used, code 42 */
		this.font = fontName;        /*!< primary font file name, code 3 */
		this.bigFont = '';     /*!< bigfont file name or blank if none, code 4 */
		this.fontFamily = 0;         /*!< ttf font family, italic and bold flags, code 1071 */		
    }
		
	write(writer, version){
		writer.writeString(0, "STYLE");
		if (!writer.dimstyleStd) {
			//stringstream cause crash in OS/X, bug#3597944
			let name=this.name.toUpperCase();
			if (name == "STANDARD")
				writer.dimstyleStd = true;
		}

		if (version > CONST.AC1009) {
			writer.writeString(5, writer.getNewHandleHex());
		}

		if (version > CONST.AC1012) {
			writer.writeString(330, "2");
		}
		if (version > CONST.AC1009) {
			writer.writeString(100, "AcDbSymbolTableRecord");
			writer.writeString(100, "AcDbTextStyleTableRecord");
			writer.writeUtf8String(2, this.name);
		} else {
			writer.writeUtf8Caps(2, this.name);
		}
		writer.writeInt16(70, this.flags);
		writer.writeDouble(40, this.height);
		writer.writeDouble(41, this.width);
		writer.writeDouble(50, this.oblique);
		writer.writeInt16(71, this.genFlag);
		writer.writeDouble(42, this.lastHeight);
		if (version > CONST.AC1009) {
			writer.writeUtf8String(3, this.font);
			writer.writeUtf8String(4, this.bigFont);
			if (this.fontFamily != 0)
				writer.writeInt32(1071, this.fontFamily);
		} else {
			writer.writeUtf8Caps(3, this.font);
			writer.writeUtf8Caps(4, this.bigFont);
		}
		return true;
	}
		
    /**
     * @link https://www.autodesk.com/techpubs/autocad/acadr14/dxf/ltype_al_u05_c.htm
     */
    toDxfString()
    {
		let writer = new Writer;
		write(write);
        return write.getString();
    }
}

module.exports = Textstyle;
},{"./Const":3,"./Writer":17}],16:[function(require,module,exports){
const CONST = require('./Const');
const Writer = require('./Writer');
const Coord = require('./Coord');
const Point = require('./Point');

class Vport extends Point
{
    constructor(name)
    {
		super();
		this.name = name;
		this.flags = 0;
		this.lowerLeft = new Coord();     /*!< Lower left corner, code 10 & 20 */
		this.UpperRight = new Coord(1,1,0);    /*!< Upper right corner, code 11 & 21 */
		this.center = new Coord(0.651828, - 0.16);        /*!< center point in WCS, code 12 & 22 */
		this.snapBase = new Coord();      /*!< snap base point in DCS, code 13 & 23 */
		this.snapSpacing = new Coord();   /*!< snap Spacing, code 14 & 24 */
		this.gridSpacing = new Coord();   /*!< grid Spacing, code 15 & 25 */
		this.viewDir = new Coord(0, 0, 1);       /*!< view direction from target point, code 16, 26 & 36 */
		this.viewTarget = new Coord();    /*!< view target point, code 17, 27 & 37 */
		this.height = 450.13732;           /*!< view height, code 40 */
		this.ratio = 2.4426877;;            /*!< viewport aspect ratio, code 41 */
		this.lensHeight = 50;       /*!< lens height, code 42 */
		this.frontClip = 0;        /*!< front clipping plane, code 43 */
		this.backClip = 0;         /*!< back clipping plane, code 44 */
		this.snapAngle = 0;        /*!< snap rotation angle, code 50 */
		this.twistAngle = 0;       /*!< view twist angle, code 51 */
		this.viewMode = 0;            /*!< view mode, code 71 */
		this.circleZoom = 1000;          /*!< circle zoom percent, code 72 */
		this.fastZoom = 1;            /*!< fast zoom setting, code 73 */
		this.ucsIcon = 3;             /*!< UCSICON setting, code 74 */
		this.snap = 0;                /*!< snap on/off, code 75 */
		this.grid = 0;                /*!< grid on/off, code 76 */
		this.snapStyle = 0;           /*!< snap style, code 77 */
		this.snapIsopair = 0;         /*!< snap isopair, code 78 */
		this.gridBehavior = 7;        /*!< grid behavior, code 60, undocummented */
		/** code 60, bit coded possible value are
		* bit 1 (1) show out of limits
		* bit 2 (2) adaptive grid
		* bit 3 (4) allow subdivision
		* bit 4 (8) follow dinamic SCP
		**/		
    }

	write(writer){
		let version = writer.getVersion();
		if (!writer.dimstyleStd) {
			this.name = "*ACTIVE";
			writer.dimstyleStd = true;
		}
		writer.writeString(0, "VPORT");
		if (version > CONST.AC1009) {
			writer.writeString(5, writer.getNewHandleHex());
			if (version > CONST.AC1012)
				writer.writeString(330, "2");
			writer.writeString(100, "AcDbSymbolTableRecord");
			writer.writeString(100, "AcDbViewportTableRecord");
			writer.writeUtf8String(2, this.name);
		} else
			writer.writeUtf8Caps(2, this.name);
		writer.writeInt16(70, this.flags);
		writer.writeDouble(10, this.lowerLeft.x);
		writer.writeDouble(20, this.lowerLeft.y);
		writer.writeDouble(11, this.UpperRight.x);
		writer.writeDouble(21, this.UpperRight.y);
		writer.writeDouble(12, this.center.x);
		writer.writeDouble(22, this.center.y);
		writer.writeDouble(13, this.snapBase.x);
		writer.writeDouble(23, this.snapBase.y);
		writer.writeDouble(14, this.snapSpacing.x);
		writer.writeDouble(24, this.snapSpacing.y);
		writer.writeDouble(15, this.gridSpacing.x);
		writer.writeDouble(25, this.gridSpacing.y);
		writer.writeDouble(16, this.viewDir.x);
		writer.writeDouble(26, this.viewDir.y);
		writer.writeDouble(36, this.viewDir.z);
		writer.writeDouble(17, this.viewTarget.z);
		writer.writeDouble(27, this.viewTarget.z);
		writer.writeDouble(37, this.viewTarget.z);
		writer.writeDouble(40, this.height);
		writer.writeDouble(41, this.ratio);
		writer.writeDouble(42, this.lensHeight);
		writer.writeDouble(43, this.frontClip);
		writer.writeDouble(44, this.backClip);
		writer.writeDouble(50, this.snapAngle);
		writer.writeDouble(51, this.twistAngle);
		writer.writeInt16(71, this.viewMode);
		writer.writeInt16(72, this.circleZoom);
		writer.writeInt16(73, this.fastZoom);
		writer.writeInt16(74, this.ucsIcon);
		writer.writeInt16(75, this.snap);
		writer.writeInt16(76, this.grid);
		writer.writeInt16(77, this.snapStyle);
		writer.writeInt16(78, this.snapIsopair);
		if (version > CONST.AC1014) {
			writer.writeInt16(281, 0);
			writer.writeInt16(65, 1);
			writer.writeDouble(110, 0.0);
			writer.writeDouble(120, 0.0);
			writer.writeDouble(130, 0.0);
			writer.writeDouble(111, 1.0);
			writer.writeDouble(121, 0.0);
			writer.writeDouble(131, 0.0);
			writer.writeDouble(112, 0.0);
			writer.writeDouble(122, 1.0);
			writer.writeDouble(132, 0.0);
			writer.writeInt16(79, 0);
			writer.writeDouble(146, 0.0);
			if (version > CONST.AC1018) {
				writer.writeString(348, "10020");
				writer.writeInt16(60, this.gridBehavior);//v2007 undocummented see DRW_Vport class
				writer.writeInt16(61, 5);
				writer.writeBool(292, 1);
				writer.writeInt16(282, 1);
				writer.writeDouble(141, 0.0);
				writer.writeDouble(142, 0.0);
				writer.writeInt16(63, 250);
				writer.writeInt32(421, 3358443);
			}
		}
	}
}

module.exports = Vport;
},{"./Const":3,"./Coord":4,"./Point":12,"./Writer":17}],17:[function(require,module,exports){

class Writer{
    constructor()
    {
		let FIRSTHANDLE = 48;
		this.buf = '';
		this.cp = 'UTF-8';
		this.counter = FIRSTHANDLE;
		this.version = null;
    }

	setVersion(ver){
		this.version = ver;
	}

	getVersion(){
		return this.version;
	}
	
	setCodePage(codepage){
		this.cp = codepage;
	}

	getCodePage(codepage){
		return this.cp;
	}
	
	getNewHandle(){
		return this.counter ++;
	}

	getNewHandleHex(){
		let count = this.getNewHandle();
		return count.toString(16);
	}
	
	writeString(code, val){
		this.buf += code;
		this.buf += '\n' + val + '\n';
	}

	writeDouble(code, val){
		this.writeString(code, val);
	}
	
	writeIntHex(code, val){
		this.writeString(code, val.toString(16));
	}
	
	writeInt16(code, val){
		this.writeString(code, val);
	}
	
	writeInt32(code, val){
		this.writeString(code, val);
	}
	
	writeUtf8Caps(code, val){
		this.writeString(code, val);
	}
	
	writeUtf8String(code, val){
		this.writeString(code, val);
	}
	
	writeBool(code, val){
		this.writeString(code, val?1:0);
	}
	
	concat(s){
		this.buf += s;
	}
	
	getString(){
		return this.buf;
	}
	
    /**
     * @link https://www.autodesk.com/techpubs/autocad/acadr14/dxf/ltype_al_u05_c.htm
     */
    toDxfString()
    {
        return this.buf;
    }
}

module.exports = Writer;
},{}],"Drawing":[function(require,module,exports){
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

},{"./Arc":1,"./Circle":2,"./Const":3,"./Coord":4,"./Dimstyle":5,"./Face":7,"./Header":8,"./LType":9,"./Layer":10,"./Line":11,"./Polyline":13,"./Text":14,"./Textstyle":15,"./Vport":16,"./Writer":17}]},{},[]);
