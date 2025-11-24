import CurrencyOption from "../options/optionFunctions/currency";
import LanguageOption from "../options/optionFunctions/language";

/**
 * Renders a simple UI containing language and currency selection components separated by a horizontal rule.
 *
 * @returns A JSX element containing <LanguageOption />, an <hr />, and <CurrencyOption /> in that order.
 */
export default function LanguageCurrency(){
    return(
        <div>
            
            <LanguageOption />
            <hr />
            <CurrencyOption />
        </div>
    )
}