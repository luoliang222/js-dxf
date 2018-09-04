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