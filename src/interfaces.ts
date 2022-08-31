/**
 * Encoding / Decoding Format
 * @typedef {Format} Song
 * @property {string} tag - The tag
 * @property {string} type - The type
 * @property {number} len - The len in bits
 */
interface format {
    tag: string;
    type: string;
    len?: number;
};

export default format;