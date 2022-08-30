import BinaryParser from "../libraries/binary-parser";
import formats from "../libraries/formats";

test('Encoding measurements', () => {
    // Arrange
    const data = {
        PTemp: 268,
        "BattVolt.value": 224,
        WaterLevel: 115
    };

    // Act
    const bp = new BinaryParser();
    const dataEncoded = bp.encode(data, formats[0]);

    // Assert
    expect(dataEncoded.size).toBe(32);
    expect(dataEncoded.buffer.toString('hex')).toBe("010c00e073");
  });

test('Decoding buffer with format 1', () => {
    // Arrange
    const buffer = Buffer.from("010c00e073", "hex");
    const data = {
        PTemp: 268,
        "BattVolt.value": 224,
        WaterLevel: 115
    };

    // Act
    const bp = new BinaryParser();
    var dataDecoded = bp.decode(buffer, formats[0]);

    // Assert
    expect(dataDecoded).toEqual(data);
 });


 test('Decoding buffer with format 3', () => {
    // Arrange
    const buffer = Buffer.from("010203", "hex");

    const data = {
         v0: 1,
         v1: 2,
         v2: 3, 
    };

    // Act
    const bp = new BinaryParser();
    var dataDecoded = bp.decode(buffer, formats[2]);

    // Assert
    expect(dataDecoded).toEqual(data);
 });
