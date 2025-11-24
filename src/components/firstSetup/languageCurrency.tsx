import CurrencyOption from "../options/optionFunctions/currency";
import LanguageOption from "../options/optionFunctions/language";

export default function LanguageCurrency(){
    return(
        <div>
            
            <LanguageOption />
            <hr />
            <CurrencyOption />
        </div>
    )
}