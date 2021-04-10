import React, {  useState } from 'react'
import './Card.css'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Button, CardActions, Container, IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '30%',
        margin: 20
    },
    media: {
        height: 250,
    },
}));

const formImageUrls = (images, keys) => {
    return keys.map((key) => {
        let baseUrl = "https://cdn.riastatic.com/photos/"
        const image = images[key].file.split(".")
        return baseUrl+image[0]+"b."+image[1]
    })
}

export default function CardAppartment(props) {
    const [imgIndex, setIndex] = useState(0);
    const app = props.appartment
    const classes = useStyles();
    const domUrl = "https://dom.ria.com/uk/" + app.beautiful_url
    const totalSquare = app.total_square_meters
    const floor = app.floor
    const districtName = app.district_name
    const roomsCount = app.rooms_count
    const photos_keys = Object.keys(app.photos)
    const  images = formImageUrls(app.photos, photos_keys)
    
    const indexIncrement = () => {
        if (imgIndex >= images.length - 1) {
            setIndex(0);
        } else {
            setIndex(imgIndex + 1)
        }
    }
    const indexDecrement = () => {
        if (imgIndex <= 0) {
            setIndex(images.length - 1)
        } else {
            setIndex(imgIndex - 1)
        }
    }

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={images[imgIndex]}
                    title="Contemplative Reptile"
                />
                <Container className='containerArrow'>
                    <IconButton className='leftArrow' size="medium" onClick={indexDecrement}>
                        <ArrowBackIcon fontSize="medium" />
                    </IconButton>
                    <IconButton className='rightArrow' size='medium' onClick={indexIncrement}>
                        <ArrowForwardIcon fontSize="medium" />
                    </IconButton>
                </Container>
                <CardContent className='content'>
                    <Typography gutterBottom variant="h5" component="h2">
                        Інформація
                    </Typography>
                    <p>Район <span>{districtName}</span></p>
                    <p>Загальна площа <span>{totalSquare}</span></p>
                    <p>Кількість кімнат <span>{roomsCount}</span></p>
                    <p>Нормер етажа <span>{floor}</span></p>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <a href={domUrl} target="_blank" rel="noreferrer">
                    <Button size="small" color="primary">
                        перейти на DOM.RIA
                    </Button>
                </a>
            </CardActions>
        </Card>
    );
}