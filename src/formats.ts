/**
 * First format
 * @type {Array<Format>}
 */
const format1 = [
    { tag: "PTemp", type: "int", len: 12 },
    { tag: "BattVolt.value", type: "int", len: 12 },
    { tag: "WaterLevel", type: "int", len: 8 },
];

/**
 * Second format
 * @type {Array<Format>}
 */
const format2 = [
    { tag: "var0.value", type: "uint", len: 2 },
    { tag: "var1.value", type: "uint", len: 2 },
    { tag: "var2.value", type: "uint", len: 7 },
    { tag: "var3.value", type: "uint", len: 11 },
    { tag: "var4.value", type: "int", len: 10 },
    { tag: "var5.value", type: "uint", len: 16 },
    { tag: "var6.value", type: "float" },
    { tag: "var7.value", type: "uint", len: 16 },
    { tag: "var8.value", type: "uint", len: 32 },
    { tag: "var9.value", type: "uint", len: 8 },
    { tag: "var0.Temp_C_2_Avg", type: "float" },
    { tag: "var0.DOppm", type: "float" },
    { tag: "var0.TurbNTU", type: "float" },
    { tag: "var0.Lvl_corr_Avg", type: "float" },
    { tag: "var0.Cond_Avg", type: "float" },
    { tag: "var0.pH_Avg", type: "float" },
    { tag: "var0.TimeStamp", type: "float" },
    { tag: "var0.BattV_Avg", type: "float" },
    { tag: "var0.BattV_Min", type: "float" },
    { tag: "var1.Temp_C_2_Avg", type: "float" },
    { tag: "var1.DOppm", type: "float" },
    { tag: "var1.TurbNTU", type: "float" },
    { tag: "var1.Lvl_corr_Avg", type: "float" },
    { tag: "var1.Cond_Avg", type: "float" },
    { tag: "var1.pH_Avg", type: "float" },
    { tag: "var1.TimeStamp", type: "float" },
    { tag: "var1.BattV_Avg", type: "float" },
    { tag: "var1.BattV_Min", type: "float" },
];

/**
 * Third format
 * @type {Array<Format>}
 */
const format3 = [
    { tag: "v0", type: "int", len: 8 },
    { tag: "v1", type: "int", len: 8 },
    { tag: "v2", type: "int", len: 8 },
];

export default [format1, format2, format3];