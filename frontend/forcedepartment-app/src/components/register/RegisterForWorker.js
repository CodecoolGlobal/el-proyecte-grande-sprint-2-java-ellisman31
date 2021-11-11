import '../css/Register.css';
import {useEffect, useState} from "react";
import {Link} from 'react-router-dom'

function RegisterForWorker(props) {

    const [description, setDescription] = useState('');
    const [telephoneNumber, setTelephoneNumber] = useState('');
    const [selectedProfession, setSelectedProfession] = useState('');

    const professionsData = ["Painter", "Baker"];
    const selectedProfessionList = [];
    const navigate = props.navigate;
    const workerDataHandler = props.workerDataHandler;
    const previousData = props.previousData;
    const [latestId, setLatestId] = useState('');

    useEffect(async () => {
        const getLatestIdFetch = async () => {
        const getLatestId = await getLatestIdFromSavedData();
        setLatestId(getLatestId);
        }
        getLatestIdFetch();
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        const workerData = {description, telephoneNumber, latestId};
        workerDataHandler(workerData);
        saveDataIntoTheDatabase(workerData);
        navigate('/login');
    }

    const saveDataIntoTheDatabase = (workerData) => {
        fetch('http://localhost:8080/api/getAllWorker', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(workerData)
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.warn(responseJson);
            })
            .catch((error) => {
                console.warn(error);
            });
    }

    const getLatestIdFromSavedData =
        async () => {
            const response = await fetch(
                "http://localhost:8080/api/getLatestId"
            );
            return await response.json();
        };

    const addSelectedProfessionToList = () => {
        console.log(selectedProfession);
        if (!selectedProfessionList.includes(selectedProfession)) {
            selectedProfessionList.push(selectedProfession);
        }
        console.log(selectedProfessionList);
    }

    const removeSelectedProfessionFromList = (index) => {
        selectedProfessionList.splice(index, 1);
        console.log(index);
    }

    return (
        <div className="register-worker-panel">
            <br/>
            <h1>Just a few steps left..</h1>
            <hr/>
            <form onSubmit={submitHandler}>
                <h2>Description</h2>
                <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    required>
                </textarea>
                <h2>Phone number</h2>
                <input type="text" name="phoneNumber" placeholder="+3630..."
                       onChange={(e) => setTelephoneNumber(e.target.value)}
                       required/>
                {/*<h2>Choose your profession(s)</h2>*/}
                {/*<div className="profession-select">*/}
                {/*    <select id="professionName" name="professionName"*/}
                {/*            onChange={(e) => setSelectedProfession(e.target.value)}*/}
                {/*            required>*/}
                {/*        {professionsData.map((profession) =>*/}
                {/*            <option value={profession}>{profession}</option>*/}
                {/*        )}*/}
                {/*    </select>*/}
                {/*    <button id="addProfession"*/}
                {/*            onClick={addSelectedProfessionToList}>Add</button>*/}
                {/*</div>*/}
                {/*<br/>*/}
                {/*<ul>*/}
                {/*    {selectedProfessionList.map((selected, index) =>*/}
                {/*        <li value={selected}>{selected}*/}
                {/*            <button id="removeProfession" onClick={() => removeSelectedProfessionFromList(index)}>X</button>*/}
                {/*        </li>)}*/}
                {/* </ul>*/}
                <button id="actionButtons" type="submit">Submit</button>
            </form>
            <Link to={"/"}>
                <button type="button" id="actionButtons" value="Main page">Main page</button>
            </Link>
        </div>
    )


}

export default RegisterForWorker;