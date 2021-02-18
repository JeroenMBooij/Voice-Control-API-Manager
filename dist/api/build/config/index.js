"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    port: parseInt(process.env.PORT || '3010', 10),
    MONGO_CONNECTION: process.env.MONGO_CONNECTION || 'mongodb://localhost:27017/voicecommandsdb',
    MsSpeechKey: process.env.MsSpeechKey || "cf8858a6bdf34db0b3f17e793d80870f",
    MsSpeechLocation: "westeurope"
};
//# sourceMappingURL=index.js.map