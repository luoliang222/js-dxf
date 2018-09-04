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