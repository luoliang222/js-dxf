const CONST = require('./Const');
const Writer = require('./Writer');

class Layer
{
    constructor(name, colorNumber, lineTypeName)
    {
		this.tType = CONST.TTYPE_LAYER;     /*!< enum: entity type, code 0 */
//		duint32 handle;            /*!< entity identifier, code 5 */
//		int parentHandle;          /*!< Soft-pointer ID/handle to owner object, code 330 */
		this.name = name;           /*!< entry name, code 2 */
		this.flags = 0;                 /*!< Flags relevant to entry, code 70 */
		
		this.lineType = lineTypeName || "CONTINUOUS";            /*!< line type, code 6 */
		this.color = colorNumber || CONST.ColorByLayer;  /*!< layer color, code 62 */
		this.color24 = -1;                    /*!< 24-bit color, code 420 */
		this.plotF = true;                     /*!< Plot flag, code 290 */
		this.lWeight = CONST.widthDefault; /*!< layer lineweight, code 370 */
		//std::string handlePlotS;        /*!< Hard-pointer ID/handle of plotstyle, code 390 */
		//std::string handleMaterialS;        /*!< Hard-pointer ID/handle of materialstyle, code 347 */
	/*only used for read dwg*/
		//dwgHandle lTypeH;
		this.shapes = [];
    }

    addShape(shape)
    {
        this.shapes.push(shape);
        shape.layer = this;
		shape.layerName = this.name;
    }

    getShapes()
    {
        return this.shapes;
    }

	write(writer){
		let version = writer.getVersion();
		writer.writeString(0, "LAYER");
		// 是否已经写入wlayer0
		if (!writer.wlayer0 && this.name == "0") {
			writer.wlayer0 = true;
			if (version > CONST.AC1009) {
				writer.writeString(5, "10");
			}
		} else {
			if (version > CONST.AC1009) {
				writer.writeString(5, writer.getNewHandleHex());
			}
		}
		if (version > CONST.AC1012) {
			writer.writeString(330, "2");
		}
		if (version > CONST.AC1009) {
			writer.writeString(100, "AcDbSymbolTableRecord");
			writer.writeString(100, "AcDbLayerTableRecord");
			writer.writeUtf8String(2, this.name);
		} else {
			writer.writeUtf8Caps(2, this.name);
		}
		writer.writeInt16(70, this.flags);
		writer.writeInt16(62, this.color);
		if (version > CONST.AC1015 && this.color24 >= 0) {
			writer.writeInt32(420, this.color24);
		}
		if (version > CONST.AC1009) {
			writer.writeUtf8String(6, this.lineType);
			if (! this.plotF)
				writer.writeBool(290, this.plotF);
			writer.writeInt16(370, CONST.lineWidth2dxfInt(this.lWeight));
			writer.writeString(390, "F");
		} else
			writer.writeUtf8Caps(6, this.lineType);
//		if (!this.extData.empty()){
//			writeExtData(this.extData);
//		}
	}
		
    shapesToDxf()
    {
        let s = '';
        for (let i = 0; i < this.shapes.length; ++i)
        {
            s += this.shapes[i].toDxfString();
        }
        
        return s;
    }
}

module.exports = Layer;