const url = new URL(process.env.REACT_APP_BD_ADDRESS);

export const fetchItem = async (itemToFetch, itemId) => {
    let returnedValue = [];
    url.pathname = itemToFetch + "/" + itemId;

    const requestOptions = {
        method: "GET",
    };

    await fetch(url, requestOptions)
        .then((res) => res.json())
        .then((data) => {
            returnedValue = data;
        })
        .catch((err) => console.log("error"));

    return returnedValue;
};

export const fetchData = async (itemToFetch) => {
    let returnedValue = [];
    url.pathname = itemToFetch;

    const requestOptions = {
        method: "GET",
    };

    await fetch(url, requestOptions)
        .then((res) => res.json())
        .then((data) => {
            returnedValue = data;
        })
        .catch((err) => console.log("error"));

    return returnedValue;
};

export const saveData = async (itemToFetch, content, method, id = null) => {
    let returnedValue = [];
    url.pathname = id ? itemToFetch + "/" + id : itemToFetch;

    const requestOptions = {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
    };

    if (id) {
        await fetch(url, requestOptions)
            .then((data) => {
                returnedValue = data;
            })
            .catch((err) => console.log("error"));
    } else {
        await fetch(url, requestOptions)
            .then((data) => {
                returnedValue = data;
            })
            .catch((err) => console.log("error"));
    }

    return returnedValue;
};

export const deleteData = (item) => {
    url.pathname = item;

    const requestOptions = {
        method: "DELETE",
    };

    fetch(url, requestOptions)
        .then((res) => res.json())
        .catch((err) => console.log("error"));
};
