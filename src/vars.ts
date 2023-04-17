const ALIFUNC_URL = 'https://get-chat-key-chatpro-lqiokasupc.cn-chengdu.fcapp.run'
export var OPENAI_API_KEY: string

export const initKey = async () => {
    fetch(ALIFUNC_URL + '/key')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.text();
        }).then(t => {
            OPENAI_API_KEY = t
            return t
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            throw new Error(`Request failed ${error}`)
        });
}