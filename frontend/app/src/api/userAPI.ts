import { User } from "models/User";
const baseUrl = 'http://localhost:3001/api/v1';
const url = `${baseUrl}/users`;

function translateStatusToErrorMessage(status: number) {
    switch (status) {
        case 401:
            return 'Please login again.';
        case 403:
            return 'You do not have permission to view the users.';
        default:
            return 'There was an error retrieving the users. Please try again.';
    }
}

function checkStatus(response: any) {
    if(response.ok) {
        return response;
    } else {
        const httpErrorInfo = {
            status: response.status,
            statusText: response.statusText,
            url: response.url,
        };
        console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);

        let errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
        throw new Error(errorMessage);
    }
}

function parseJSON(response: Response) {
    return response.json();
}

function delay(ms: number) {
    return function (x: any): Promise<any> {
        return new Promise((resolve) => setTimeout(() => resolve(x), ms));
    };
}

function convertToUserModels(data: any[]): User[] {
    let users: User[] = data.map(convertToUserModel);
    return users;
}

function convertToUserModel(item: any): User {
    return new User(item);
}

const userAPI = {
    get() {
        return fetch(`${url}`)
            .then(delay(600))
            .then(checkStatus)
            .then(parseJSON)
            .then(convertToUserModels)
            .catch((error: TypeError) => {
                console.log('log client error' + error);
                throw new Error('There was an error retrieving the projects. Please try again.');
            });
    },
    find(id: number) {
        return fetch(`${url}/${id}`)
            .then(checkStatus)
            .then(parseJSON)
            .then(convertToUserModel);
    },
};

export { userAPI };