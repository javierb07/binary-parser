import { Buffer } from "./buffer";


class BinaryParser {
    /**
    * v0.1.0 | Javier Belmonte
    * 
    * @param {buffer} buffer -> Trama a deserializar
    * @param {*} format -> Formato de serialización (ver notas adjuntas)
    * @return {*} Objeto "composición" (trama deserializada en campos tag = valor)
    * @memberof BinaryParser
    * @version ?
    */
    decode(buffer, format) {
        let _object = {}
        

        return _object
    }

    /**
    * v0.1.0 | Javier Belmonte
    * 
    * @param {*} _object -> Objeto a frasear (serializar)
    * @param {*} format -> Formato de serialización (ver notas adjuntas)
    * @return {*} size -> tamaño en bits de la trama. buffer -> Node.js Buffer.
    * @memberof BinaryParser
    * @version ?
    */
    encode(_object, format) {
        //const buffer = Buffer.alloc(?);
        
        //return { size, buffer };
    }
}
