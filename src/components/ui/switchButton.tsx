import {useState} from "react";

export default function SwitchButton({start = false, onChange}: {start : boolean, onChange?: (checked: boolean) => void}) {
    const [checked, setChecked] = useState(start);

    const toggleSwitch = () => {
        const newChecked = !checked;
        setChecked(newChecked);
        if (onChange) {
            onChange(newChecked);
        }
    };
    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                checked={checked}
                onChange={toggleSwitch}
                className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer
                            peer-checked:bg-green-500 transition-colors duration-300"></div>
            <div className="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full
                            transition-transform duration-300 peer-checked:translate-x-5"></div>
        </label>
    );
}