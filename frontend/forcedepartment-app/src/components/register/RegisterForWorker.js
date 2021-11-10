import '../css/Register.css';
import {useEffect, useState} from "react";

//TODO: sent data to the database, get data from database

function RegisterForWorker(props) {

    const [description, setDescription] = useState('');
    const [telephoneNumber, setTelephoneNumber] = useState('');
    const [selectedProfession, setSelectedProfession] = useState('');

    const professionsData = ["Painter", "Baker"];
    const selectedProfessionList = [];
    const navigate = props.navigate;
    const workerDataHandler = props.workerDataHandler;
    const workerData = [description, telephoneNumber];

    const submitHandler = (e) => {
        e.preventDefault();
        workerDataHandler(workerData);
        navigate('/');
    }

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
            <div className="mainPageHref">
                <a href="/">
                    <button type="button" id="actionButtons" value="Main page">Main page</button>
                </a>
            </div>
        </div>
    )


}

export default RegisterForWorker;