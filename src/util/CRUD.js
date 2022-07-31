import axios from 'axios'

class CRUD {

    constructor() {
        this.headers = {
            'Accept': 'application/json',
            'X-CSRF-TOKEN': window.Laravel.csrfToken,
            // 'Content-Type': 'multipart/form-data'
        };
    }

    create(url, data) {
        return axios.post(url, data, {
            headers: this.headers
        })
    }

    read(url, data) {
        return axios.get(url, {
            headers: this.headers,
            params: data
        })
    }

    update(url, data, headers) {
        if (!headers) {
            headers = this.headers
        }
        if (data instanceof FormData) {
            data.append('_method', 'put')
            return axios.post(url, data, {
                headers: headers
            })
        } else {
            return axios.put(url, data, {
                headers: headers
            })
        }
    }

    delete(url) {
        return axios.delete(url, {
            headers: this.headers
        });
    }
}
export default CRUD;
