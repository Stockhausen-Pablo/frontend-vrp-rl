const baseUri = `${process.env.REACT_APP_API_URI}ml-service`;

export class MLService{

    static startMLTraining(){
        return fetch(`${baseUri}/training/start`, {
            method: 'GET',
            headers: {
            }
        });
    }

    static startMLTesting(){
        return fetch(`${baseUri}/testing/start`, {
            method: 'GET',
            headers: {
            }
        });
    }


}