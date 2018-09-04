const CONST = require('./Const');
const Writer = require('./Writer');
const Point = require('./Point');

class Block extends Point
{
    /**
     * @param {number} x1 - Center x
     * @param {number} y1 - Center y
     * @param {number} z1 - Center z
     * @param {number} r - radius
     * @param {number} startAngle - 弧度
     * @param {number} endAngle - 弧度 
     */
    constructor(name, handle)
    {
		super(handle);
        this.flags = 0;
        this.name = "*U0";
	}

	write(writer) {
		if (writer.writingBlock) {
			writer.writeString(0, "ENDBLK");
			if (version > CONST.AC1009) {
				writer.writeString(5, toHexStr(currHandle+2));
				if (version > CONST.AC1014) {
					writer.writeString(330, toHexStr(currHandle));
				}
				writer.writeString(100, "AcDbEntity");
			}
			writer.writeString(8, "0");
			if (version > CONST.AC1009) {
				writer.writeString(100, "AcDbBlockEnd");
			}
		}
		writer.writingBlock = true;
		writer.writeString(0, "BLOCK");
		if (version > CONST.AC1009) {
			currHandle = (*(blockMap.find(bk->name))).second;
			writer.writeString(5, toHexStr(currHandle+1));
			if (version > CONST.AC1014) {
				writer.writeString(330, toHexStr(currHandle));
			}
			writer.writeString(100, "AcDbEntity");
		}
		writer.writeString(8, "0");
		if (version > CONST.AC1009) {
			writer.writeString(100, "AcDbBlockBegin");
			writer.writeUtf8String(2, bk->name);
		} else
			writer.writeUtf8Caps(2, bk->name);
		writer.writeInt16(70, bk->flags);
		writer.writeDouble(10, bk->basePoint.x);
		writer.writeDouble(20, bk->basePoint.y);
		if (bk->basePoint.z != 0.0) {
			writer.writeDouble(30, bk->basePoint.z);
		}
		if (version > CONST.AC1009)
			writer.writeUtf8String(3, bk->name);
		else
			writer.writeUtf8Caps(3, bk->name);
		writer.writeString(1, "");

	}
}

module.exports = Block;