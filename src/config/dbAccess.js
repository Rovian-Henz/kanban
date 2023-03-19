const fetchAddress = "http://localhost:8002";

export const fetchItem = async (itemToFetch, itemId) => {
    let returnedValue = [];

    const requestOptions = {
        method: "GET",
    };

    await fetch(`${fetchAddress}/${itemToFetch}/${itemId}`, requestOptions)
        .then((res) => res.json())
        .then((data) => {
            returnedValue = data;
        })
        .catch((err) => console.log("error"));

    return returnedValue;
};

export const fetchData = async (itemToFetch) => {
    let returnedValue = [];

    const requestOptions = {
        method: "GET",
    };

    await fetch(`${fetchAddress}/${itemToFetch}`, requestOptions)
        .then((res) => res.json())
        .then((data) => {
            returnedValue = data;
        })
        .catch((err) => console.log("error"));

    return returnedValue;
};

export const saveData = async (itemToFetch, content, method, id = null) => {
    let returnedValue = [];

    const requestOptions = {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
    };

    if (id) {
        await fetch(`${fetchAddress}/${itemToFetch}/${id}`, requestOptions)
            .then((data) => {
                returnedValue = data;
            })
            .catch((err) => console.log("error"));
    } else {
        await fetch(`${fetchAddress}/${itemToFetch}`, requestOptions)
            .then((data) => {
                returnedValue = data;
            })
            .catch((err) => console.log("error"));
    }

    return returnedValue;
};
