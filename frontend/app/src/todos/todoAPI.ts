import { Todo } from "./Todo";
const baseUrl = 'http://localhost:3001/api/v1';
const url = `${baseUrl}/todos`;

function translateStatusToErrorMessage(status: number) {
    switch (status) {
        case 401:
            return 'Please login again.';
        case 403:
            return 'You do not have permission to view the todos.';
        default:
            return 'There was an error retrieving the todos. Please try again.';
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

function convertToTodoModels(data: any[]): Todo[] {
    let todos: Todo[] = data.map(convertToTodoModel);
    return todos;
}

function convertToTodoModel(item: any): Todo {
    return new Todo(item);
}

const todoAPI = {
    get(page = 1, limit = 20) {
        return fetch(`${url}?_page=${page}&_limit=${limit}&_sort=name`)
            .then(delay(600))
            .then(checkStatus)
            .then(parseJSON)
            .then(convertToTodoModels)
            .catch((error: TypeError) => {
                console.log('log client error' + error);
                throw new Error('There was an error retrieving the projects. Please try again.');
            });
    },
    post(todo: Todo) {
        return fetch(`${url}`, {
            method: 'POST',
            body: JSON.stringify(todo),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(checkStatus)
        .then(parseJSON)
        .catch((error: TypeError) => {
            throw new Error('There was an error retrieving the projects. Please try again.');
        });
    },
    put(todo: Todo) {
        return fetch(`${url}/${todo.id}`, {
            method: 'PUT',
            body: JSON.stringify(todo),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(checkStatus)
        .then(parseJSON)
        .catch((error: TypeError) => {
            throw new Error('There was an error retrieving the projects. Please try again.');
        });
    },
    delete(todo: Todo) {
        return fetch(`${url}/${todo.id}`, {
            method: 'DELETE',
        })
        .then(delay(300))
        .then(checkStatus)
        .catch((error: TypeError) => {
            throw new Error('There was an error retrieving the projects. Please try again.');
        });
    },
    find(id: number) {
        return fetch(`${url}/${id}`)
            .then(checkStatus)
            .then(parseJSON)
            .then(convertToTodoModel);
    },
};

export { todoAPI };