import {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { formTwentyOrders, getTwentyOrders } from "../store/partials/culculator/actions";

export function useTextField(init, name) {
    const [value, setValue] = useState(init);
    return {
        value: value,
        name: name,
        onChange: (e) => setValue(e.target.value)
    };
}

export function usePaginator(init) {
    const [page, setPage] = useState(parseInt(init));
    const dispatch = useDispatch();
    const catalogList = useSelector(state => state.predict.catalogList)
    return {
        page: page,
        onChange: (e, newValue) => {
            setPage(parseInt(newValue))
            console.log(catalogList);
            dispatch(formTwentyOrders(getTwentyOrders(catalogList, newValue)));
            console.log(newValue)
        }
    };
}