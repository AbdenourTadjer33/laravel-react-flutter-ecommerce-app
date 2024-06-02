import axios from "axios";
import { router } from "@inertiajs/react";
import dayjs from "dayjs";
import fr from "dayjs/locale/fr";
import localData from "dayjs/plugin/localeData";
import objectSupport from "dayjs/plugin/objectSupport";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.locale(fr);
dayjs.extend(objectSupport);
dayjs.extend(relativeTime);
dayjs.extend(localData);

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers.common["Content-Type"] = "application/json";

axios.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        if (response.status === 204) {
            window.location.reload();
        }
        return response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    }
);

window.axios = axios;

router.on("invalid", (event) => {
    event.preventDefault();
});
