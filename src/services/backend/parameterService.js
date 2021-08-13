const baseUri = `${process.env.REACT_APP_API_URI}parameters`;

export class ParameterService {

    static getParameterGroups(){
        return fetch(`${baseUri}/groups`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }

    static updateParameterGroups(updatedParameterGroups){
        return fetch(`${baseUri}/groups/update`, {
            method: 'POST',
            body: JSON.stringify(updatedParameterGroups),
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }

}
