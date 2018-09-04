
class Writer{
    constructor()
    {
		let FIRSTHANDLE = 48;
		this.buf = '';
		this.cp = 'UTF-8';
		this.counter = FIRSTHANDLE;
		this.version = null;
    }

	setVersion(ver){
		this.version = ver;
	}

	getVersion(){
		return this.version;
	}
	
	setCodePage(codepage){
		this.cp = codepage;
	}

	getCodePage(codepage){
		return this.cp;
	}
	
	getNewHandle(){
		return this.counter ++;
	}

	getNewHandleHex(){
		let count = this.getNewHandle();
		return count.toString(16);
	}
	
	writeString(code, val){
		this.buf += code;
		this.buf += '\n' + val + '\n';
	}

	writeDouble(code, val){
		this.writeString(code, val);
	}
	
	writeIntHex(code, val){
		this.writeString(code, val.toString(16));
	}
	
	writeInt16(code, val){
		this.writeString(code, val);
	}
	
	writeInt32(code, val){
		this.writeString(code, val);
	}
	
	writeUtf8Caps(code, val){
		this.writeString(code, val);
	}
	
	writeUtf8String(code, val){
		this.writeString(code, val);
	}
	
	writeBool(code, val){
		this.writeString(code, val?1:0);
	}
	
	concat(s){
		this.buf += s;
	}
	
	getString(){
		return this.buf;
	}
	
    /**
     * @link https://www.autodesk.com/techpubs/autocad/acadr14/dxf/ltype_al_u05_c.htm
     */
    toDxfString()
    {
        return this.buf;
    }
}

module.exports = Writer;