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