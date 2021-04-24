import { Route, Switch } from "react-router-dom";
import Calculator from "./Calculator/Calculator";
import Catalog from "./Catalog/Catalog";
import { PlaceManeger } from "./PlaceManeger/PlaceManager";
import PortitableOrder from "./PortitableOrder/PortitableOrder";
import RootSetting from "./RootSetting/RootSetting"
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";

export function UserRoutes() {

    return (
        <>
            <Switch>
                {<Route path={`/user-cabinet/calculator`} component={Calculator}/>}
                {<Route path={`/user-cabinet/portitable-orders`} component={PortitableOrder}/>}
                {<Route path={`/user-cabinet/catalog`} component={Catalog}/>}
                {<Route path={`/user-cabinet/root-setting`} component={RootSetting}/>}
                {<Route path={`/user-cabinet/sign-in`} component={SignIn}/>}
                {<Route path={`/user-cabinet/sign-up`} component={SignUp}/>}
                {<Route path={`/user-cabinet/place-manager`} component={PlaceManeger}/>}
            </Switch>
        </>
    )
}