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

async function destroy(...id: string[]) {
    try {
        const response = await axios.delete(route('admin.upload.destroy', id.join(',')))
        return await response.data;
    } catch (error) {
        // handle error
    }
}

export {
    store,
    destroy,
}