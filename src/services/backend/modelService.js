const baseUri = `${process.env.REACT_APP_API_URI}model`;

export class ModelService{

    static deleteModel(){
        return fetch(`${baseUri}/delete`, {
            method: 'Delete',
            headers: {
            }
        });
    }

}