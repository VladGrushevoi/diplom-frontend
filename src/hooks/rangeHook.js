import {useState} from "react";

export function useRange(init) {
    const [value, setValue] = useState(init);
    return {
        value: value,
        onChange: (e) => setValue(e.target.value)
    };
}