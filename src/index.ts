// @ts-check
declare const Buffer
import format from "./interfaces"

/**
 * @file index.js is the root file for the Binary Parser
 * @author Javier Belmonte
 * @see <a href="https://github.com/javierb07/binary-parser">Binary Parser GitHub</a>
 */

/**
 * Class to create a Binary Parser object
 */
class BinaryParser {
    /**
     *
     * @param {boolean} useLittleEndian Flag to use little endian if true, otherwise use big endian
     */
    #useLittleEndian: boolean;
    constructor(endianness: boolean = false) {
        this.#useLittleEndian = endianness;
    }

    /**
    * @property {Function} encode Encodes an object into a buffer
    * @param {object} _object -> Object to serialize
    * @param {format[]} formats -> Serialization formats
    * @return {number|Buffer} size -> Size of the bit frame. buffer -> Node.js Buffer.
    * @memberof BinaryParser
    * @version 1.0.0
    */
    encode(_object: object, formats: format[]) {
        let size = 0;
        const buffers = []
        Object.entries(_object)
            .forEach(([key, value]) => {
                const parsingFormat = formats.find((obj: any) => {
                    return obj.tag === key;
                });
                switch (parsingFormat.type) {
                    case "uint": {
                        size += parsingFormat.len;
                        const allocSize = Math.ceil(parsingFormat.len / 8);
                        const buffer = Buffer.alloc(allocSize);
                        this.#useLittleEndian ? buffer.writeUintLE(value, 0, allocSize) : buffer.writeUintBE(value, 0, allocSize);
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
    * @property {Function} decode Decodes a buffer into an object
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