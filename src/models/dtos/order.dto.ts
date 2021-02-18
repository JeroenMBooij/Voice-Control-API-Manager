import * as mongoose from 'mongoose';
import { Endpoint } from '../contract-models/endpoint';


let orderSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    command: { type: String, required: true },
    language: { type: String, required: true },
    action: { type: Endpoint, required: true },
    authentication: { type: Endpoint }
});

orderSchema.path('command').validate(function(value){
     //make sure command does not contain too many spaces
     let invalidCommands: RegExpMatchArray | null = value.match(/[ ]{2}/g);
     if(invalidCommands)
     {
        this.invalidate("command", "Command contains too many spaces");
     }
     
     // Make sure command only contains letters and spaces
     invalidCommands  = value.match(/(\\|[^a-zA-z ])/g);
     if(invalidCommands)
     {
        this.invalidate("command", "A command can only contain the letters a-z and spaces");
     }

     invalidCommands = value.match(/{.*\s}/g); 
     if(invalidCommands)
     {
        this.invalidate("command", "A command parameter can not contain spaces");
     }
});

orderSchema.path('language').validate(function(value){
    switch(value)
    {
        case "ar-BH": return true;
        case "ar-EG": return true;
        case "ar-IQ": return true;
        case "ar-IL": return true;
        case "ar-JO": return true;
        case "ar-KW": return true;
        case "ar-LB": return true;
        case "ar-OM": return true;
        case "ar-QA": return true;
        case "ar-SA": return true;
        case "ar-PS": return true;
        case "ar-SY": return true;
        case "ar-AE": return true;
        case "bg-BG": return true;
        case "ca-ES": return true;
        case "zh-HK": return true;
        case "zh-CN": return true;
        case "zh-TW": return true;
        case "hr-HR": return true;
        case "cs-CZ": return true;
        case "da-DK": return true;
        case "nl-NL": return true;
        case "en-AU": return true;
        case "en-CA": return true;
        case "en-HK": return true;
        case "en-IN": return true;
        case "en-IE": return true;
        case "en-NZ": return true;
        case "en-NG": return true;
        case "en-PH": return true;
        case "en-SG": return true;
        case "en-ZA": return true;
        case "en-GB": return true;
        case "en-US": return true;
        case "et-EE": return true;
        case "fi-FI": return true;
        case "fr-CA": return true;
        case "fr-FR": return true;
        case "de-DE": return true;
        case "el-GR": return true;
        case "gu-IN": return true;
        case "hi-IN": return true;
        case "hu-HU": return true;
        case "ga-IE": return true;
        case "it-IT": return true;
        case "ja-JP": return true;
        case "ko-KR": return true;
        case "lv-LV": return true;
        case "lt-LT": return true;
        case "mt-MT": return true;
        case "mr-IN": return true;
        case "nb-NO": return true;
        case "pl-PL": return true;
        case "pt-BR": return true;
        case "pt-PT": return true;
        case "ro-RO": return true;
        case "ru-RU": return true;
        case "sk-SK": return true;
        case "sl-SI": return true;
        case "es-AR": return true;
        case "es-BO": return true;
        case "es-CL": return true;
        case "es-CO": return true;
        case "es-CR": return true;
        case "es-CU": return true;
        case "es-DO": return true;
        case "es-EC": return true;
        case "es-SV": return true;
        case "es-GQ": return true;
        case "es-GT": return true;
        case "es-HN": return true;
        case "es-MX": return true;
        case "es-NI": return true;
        case "es-PA": return true;
        case "es-PY": return true;
        case "es-PE": return true;
        case "es-PR": return true;
        case "es-ES": return true;
        case "es-UY": return true;
        case "es-US": return true;
        case "es-VE": return true;
        case "sv-SE": return true;
        case "ta-IN": return true;
        case "te-IN": return true;
        case "th-TH": return true;
        case "tr-TR": return true;
        default:
            this.invalidate("language", `${value} is not a supported language.`);




    }
});


module.exports = mongoose.model("Order", orderSchema);