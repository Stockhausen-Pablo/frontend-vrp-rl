const baseUri = `${process.env.REACT_APP_API_URI}images`;

export class RenderStreamService {

    static getImageContextPlots(){
        return fetch(`${baseUri}/render/plt-coords`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }
}
