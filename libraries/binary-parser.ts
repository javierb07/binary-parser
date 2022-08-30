declare const Buffer
import format from "../interfaces"

class BinaryParser {
    #useLittleEndian: boolean;

    constructor(endianness: boolean = false) {
        this.#useLittleEndian = endianness;
    }

    /**
    * v0.1.0 | Javier Belmonte
    * 
    * @param {object} _object -> Object to serialize
    * @param {format[]} format -> Serialization formats
    * @return {number, Buffer} size -> Size of the bit frame. buffer -> Node.js Buffer.
    * @memberof BinaryParser
    * @version 1.0.0
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
    * @param {Buffer} buffer -> Buffer to deserialize
    * @param {format[]} formats -> Deserialization format
    * @return {Object} _object -> Deserialized object
    * @memberof BinaryParser
    * @version 1.0.0
    */
    decode(buffer: Buffer, formats: format[]) {
        const _object = {}
        let value;
        let offset = 0;
        formats.forEach(format => {
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
                    console.log(value, offset, size);
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

export default BinaryParser;