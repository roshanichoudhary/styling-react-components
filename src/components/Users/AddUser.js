import React, { useState } from "react";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";


const AddUser = (props) => {

    const [enteredUserName, setEnterdedUserName] = useState();
    const [enteredAge, setEnterdedAge] = useState();
    const [error, setError] = useState();

    const addUserHandler = (event) => {
        event.preventDefault();
        if (enteredUserName.trim().length === 0 || enteredAge.trim().length === 0) {
            setError({
                title: 'Invalid input',
                message: 'Please enter a valid name and age (non-empty values).',
            });
            return;
        }
        if (+enteredAge < 1) {
            setError({
                title: 'Invalid Age',
                message: 'Please enter a valid age (> 0).',
            });
            return;
        }

        props.onAddUser(enteredUserName, enteredAge);

        setEnterdedUserName('');
        setEnterdedAge('');
    };


    const usernameChangeHandler = (event) => {
        return (
            setEnterdedUserName(event.target.value)
        )
    };

    const ageChangeHandler = (event) => {
        return (
            setEnterdedAge(event.target.value)
        )
    };

    const errorhandler = () => {
        setError(null);
    };

    return (
        <>
            {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorhandler} />}
            <Card cssClass={classes.input}>
                <form onSubmit={addUserHandler}>
                    <label htmFor="username">Username</label>
                    <input id="username" type="text" value={enteredUserName} onChange={usernameChangeHandler} />

                    <label htmlFor="userage">Age</label>
                    <input id="userage" type="number" value={enteredAge} onChange={ageChangeHandler} />

                    <Button type="submit">Add User</Button>
                </form>
            </Card>
        </>
    )
};


export default AddUser;