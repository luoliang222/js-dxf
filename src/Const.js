
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
