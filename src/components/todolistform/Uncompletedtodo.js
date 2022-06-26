import React, { useState, useEffect } from "react";

function UncompletedToDo() {
    const [loadedtodolist, setLoadedEvents] = useState([]);

    useEffect(() => {
    //setIsLoading(true);
    fetch(
        'https://the-last-coffee-default-rtdb.asia-southeast1.firebasedatabase.app/todolist.json'
    )
        .then((response) => {
        return response.json();
        })
        .then((data) => {
        const todos = [];

        for (const key in data) {
            const tuple = data[key]
            //console.log(tuple.completed)
            if (tuple.completed) {
                console.log('load')
                const todo = {
                    id: key,
                    ...tuple
                };
            todos.push(todo);
            } 
        }

        //setIsLoading(false);
        setLoadedEvents(todos);
        });
    }, []);
}

export default UncompletedToDo;