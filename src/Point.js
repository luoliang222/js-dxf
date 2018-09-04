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