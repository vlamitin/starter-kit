import axios from "axios";

export function loadSettings() {
    return new Promise((resolve, reject) => {
        axios.get(`/settings.json?${Date.now()}`)
            .then((response) => {
                if (response.status < 200 || response.status > 299) {
                    let errorMessage = `loading settings failed, status: ${response.status}`;
                    console.error(errorMessage);
                    reject(new Error(errorMessage));
                } else {
                    resolve(response.data);
                }
            })
            .catch((error) => {
                console.error('axios method error:', error);
            });
    });
}
