# IoT Binary Parser

iot-binary-parser is a parser that enables you to encode objects into buffers and decode buffers into objects.
The goal is to optimize overhead in data transfers from IoT devices to IoT platforms.

Data Objects <- Format -> Buffer

Data objects should consist of key-value pairs, where the key identifies a field that needs to be coded/encoded and the value can be one of the following types:

* unit -> unsigned integer
* int -> signed integer
* float -> floating point number
* ascii -> Ascii string

Format is an array of objects, where each object corresponds to a definition of a field of the data object that is going to be encoded/decoded. The format object has the following structure:

* tag -> Name of the field that will be encoded/decoded
* type -> Data type of the data object
* len -> (Optional) length of the field in bits if applicable (signed and unsigned integers)

## Quick Start

1. Create a Binary Parser object with new BinaryParser(). Optionally, specify a constructor argument to use little or big endian. True uses little endian (default) and false uses big endian.
2. Use encode method with a data object and a format to get a buffer representation.
3. Use decode method with a buffer and an format to get an object representation.

``` typescript
// Module import
import BinaryParser from "iot-binary-parser/src";

// Some sample data an format
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

const bp = new BinaryParser();
const dataEncoded = bp.encode(data, format);
console.log(dataEncoded.buffer.toString('hex')); //prints 10C0E073
console.log(dataEncoded.size); //prints 32
const dataDecoded = bp.decode(dataEncoded.buffer, format);
console.log(dataDecoded) //prints { PTemp: 268, ‘BattVolt.value’: 224, WaterLevel: 115 }

```

## Installation
You can install iot-binary-parser via npm:

npm i iot-binary-parser

## API

### new BinaryParser()
Create a binary parser object.

``` typescript
const bp = new BinaryParser();
```

### encode(object, formats)
Encodes a data object into a buffer based off the provided formats.
``` typescript
const bp = new BinaryParser();
const dataEncoded = bp.encode(data, format);
```

### decode(buffer, formats)
Decodes a buffer into a data object based off the provided formats.
``` typescript
const bp = new BinaryParser();
const dataDecoded = bp.decode(buffer, format);
```

## Documentation

Module is documented using JSDoc. In the docs folder you can find the documentation generated with JSDoc, or you can can run the script npm run doc to generate it yourself. This runs the command jsdoc -c jsdoc.json

## Example Server

An example server that would communicate with IoT devices is provided in src/app.ts
Server endpoints:

### POST api/v1/binary-parser/encode
Receives a JSON body with the data to encode and an array of formats. Returns the encoded buffer.

### POST api/v1/binary-parser/decode
Receives a JSON body with the buffer to decode and an array of formats. Returns the decoded data.

### GET * 
All other endpoints return the JSDoc generated documentation.

In utils folder a Postman collection with example requests is provided.
