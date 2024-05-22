import { AxiosInstance } from "axios";
import {route as ZiggyRoute} from "ziggy-js"

declare global {
    interface Window {
        axios: AxiosInstance;
    }

    var route: typeof ZiggyRoute;
    var Ziggy: Object;
}