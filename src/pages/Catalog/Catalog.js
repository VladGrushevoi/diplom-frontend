import { Button, Container, TextField } from '@material-ui/core'
import { CloudUpload } from '@material-ui/icons'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardAppartment from '../../Component/Card/Card'
import Paginator from '../../Component/Paginator/Paginator'
import Range from '../../Component/Range/Range'
import ComboBox from '../../Component/Select/Select'
import { usePaginator, useTextField } from '../../hooks/hookInput'
import { useRange } from '../../hooks/rangeHook'
import { useComboBoxField } from '../../hooks/selectHook';
import { catalogOrder } from '../../store/partials/culculator/actions'
import './Catalog.css'

export default function Catalog() {
    const totalSquareRange = useRange([1, 499])
    const floorRange = useRange([0, 20])
    const priceRange = useRange([1000, 299999])
    const roomsCountText = useTextField("", "RoomsCount")
    const districtName = useComboBoxField("", "DistrictName");
    const paginator = usePaginator(1);
    const dispatch = useDispatch();
    const catalogState = useSelector(state => state.predict)

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            totalSquareFrom: parseInt(totalSquareRange.value[0]),
            totalSquareTo: parseInt(totalSquareRange.value[1]),
            roomsCount: parseInt(roomsCountText.value),
            FloorFrom: parseInt(floorRange.value[0]),
            FloorTo: parseInt(floorRange.value[1]),
            PriceFrom: parseInt(priceRange.value[0]),
            PriceTo: parseInt(priceRange.value[1]),
            DistrictName: districtName.value
        }
        dispatch(catalogOrder(data))
    }

    return (
        <>
            <h1>Каталог</h1>
            <Container>
                <form className="form" onSubmit={handleSubmit}>
                            <Range set={totalSquareRange} text="Загальна площа" min={1} max={499} step={5} className="range"/>
                            <Range set={floorRange} text="Етажі" min={0} max={20} className="range"/>
                            <Range set={priceRange} text="Ціна" min={1000} max={299999} step={500} className="range"/>
                            <TextField
                                id="outlined"
                                label="Кількість кімнат"
                                defaultValue=""
                                {...roomsCountText}
                                variant="outlined"
                                type='number'
                                className="input-catalog"
                            />
                            <ComboBox className='combo-box' set={districtName} required={false}/>
                            <Button
                                variant="contained"
                                color="primary"
                                className="button-catalog"
                                type="submit"
                                size='large'
                                startIcon={<CloudUpload />}
                            >
                                Upload
                    </Button>
                </form>
            </Container>
            <div className='parent'>
                {
                    catalogState.catalog.length !== 0? catalogState.catalog.map((item, index) => {
                        return <CardAppartment key={index} appartment={item}/>
                    })
                    :
                    <h1>ПУСТО</h1>
                }

            </div>
            <Paginator count={Math.ceil(catalogState.catalogList.length/20)} page={paginator.page} onChange={paginator.onChange} />
        </>
    )
}