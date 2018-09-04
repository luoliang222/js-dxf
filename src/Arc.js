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