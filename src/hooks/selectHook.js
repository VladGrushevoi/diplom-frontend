import {useState} from "react";

export function useComboBoxField(init) {
    const [value, setValue] = useState(init);
    const [inputValue, setInputValue] = useState('');
    return {
        value: value,
        inputValue: inputValue,
        onChange: (event, newValue) => {setValue(newValue)},
        onInputChange: (event, newInputValue) => {
            setInputValue(newInputValue);
          }
    };
}