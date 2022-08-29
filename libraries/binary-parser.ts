declare const Buffer
import formats from "./formats";

class BinaryParser {
    #useLittleEndian: boolean;

    constructor(endianness: boolean = false) {
        this.#useLittleEndian = endianness;
    }

    /**
    * v0.1.0 | Javier Belmonte
    * 
    * @param {*} _object -> Object to serialize
    * @param {any[]} format -> Serialization formats
    * @return {*} size -> Size of the bit frame. buffer -> Node.js Buffer.
    * @memberof BinaryParser
    * @version 
    */
    encode(_object: any, format: any[]) {
        let size = 0;
        const buffers = []
        Object.entries(_object)
            .forEach(([key, value]) => {
                const parsingFormat = format.find((obj: any) => {
                    return obj.tag === key;
                });
                switch (parsingFormat.type) {
                    case "uint": {
                        size += parsingFormat.len;
                        const allocSize = Math.ceil(parsingFormat.len / 8);
                        const buffer = Buffer.alloc(allocSize);
                        this.#useLittleEndian ? buffer.writeIntLE(value, 0, allocSize) : buffer.writeIntBE(value, 0, allocSize);
                        buffers.push(buffer);
                        break;
                    }
                    case "int": {
                        size += parsingFormat.len;
                        const allocSize = Math.ceil(parsingFormat.len / 8);
                        const buffer = Buffer.alloc(allocSize);
                        this.#useLittleEndian ? buffer.writeIntLE(value, 0, allocSize) : buffer.writeIntBE(value, 0, allocSize);
                        buffers.push(buffer);
                        break;
                    }
                    case "float": {
                        size += 32;
                        const buffer = Buffer.allocUnsafe(4);
                        this.#useLittleEndian ? buffer.writeFloatLE(value) : buffer.writeFloatBE(value);
                        buffers.push(buffer);
                        break;
                    }
                    case "ascii": {
                        size += 8;
                        buffers.push(Buffer.from(value, "ascii"));
                        break;
                    }
                    default:
                        throw new Error("Invalid format: " + JSON.stringify(parsingFormat));
                }
            });
        const buffer = Buffer.concat(buffers);
        return { size, buffer };
    }

    /**
    * v0.1.0 | Javier Belmonte
    * 
    * @param {buffer} buffer -> Buffer to deserialize
    * @param {*} formats -> Deserialization format
    * @return {*} _object -> Deserialized object
    * @memberof BinaryParser
    * @version 
    */
    decode(buffer: Buffer, formats: any[]) {
        const _object = {}
        formats.forEach(format => {
            let value;
            let offset = 0;
            switch (format.type) {
                case "uint": {
                    const size = Math.ceil(format.len / 8);
                    value = this.#useLittleEndian ? buffer.readUintLE(offset, size) : buffer.readUintBE(offset, size);
                    offset += size;
                    break
                }
                case "int": {
                    const size = Math.ceil(format.len / 8);
                    value = this.#useLittleEndian ? buffer.readIntLE(offset, size) : buffer.readIntBE(offset, size);
                    offset += size;
                    break;
                }
                case "float": {
                    value = this.#useLittleEndian ? buffer.readFloatLE(value) : buffer.readFloatBE(value);
                    offset += 4;
                    break;
                }
                case "ascii": {
                    value = buffer.subarray(offset, 1);
                    offset += 1;
                }
                default:
                    throw new Error("Invalid format: " + JSON.stringify(format.type));

            }
            _object[format.tag] = value;
        });
        return _object
    }

}

const data = {
    PTemp: 268,
    "BattVolt.value": 224,
    WaterLevel: 115
};
const format = [
    { tag: "PTemp", type: "int", len: 12 },
    { tag: "BattVolt.value", type: "int", len: 12 },
    { tag: "WaterLevel", type: "int", len: 8 },
]

var bp = new BinaryParser();
var dataEncoded = bp.encode(data, formats);
console.log(dataEncoded.buffer.toString('hex')); //prints 10C0E073
console.log(dataEncoded.size); //prints 32
var dataDecoded = bp.decode(dataEncoded.buffer, format);
console.log(dataDecoded) //prints { PTemp: 268, ‘BattVolt.value’: 224, WaterLevel: 115 }

const format2 = [
    { tag: "v0", type: "int", len: 8 },
    { tag: "v1", type: "int", len: 8 },
    { tag: "v2", type: "int", len: 8 },
]
const buffer = Buffer.from("010203", "hex");
var dataDecoded = bp.decode(buffer, format2);
console.log(dataDecoded) 
