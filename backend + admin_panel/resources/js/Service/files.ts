import axios from "axios";

async function store(formData: FormData) {
    try {
        const response = await axios.post(route('admin.upload.store'), formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return await response.data?.path;
    } catch (error) {

    }
}

export {
    store as storeImages,
}