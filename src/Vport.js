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