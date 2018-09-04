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