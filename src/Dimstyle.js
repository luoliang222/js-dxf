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