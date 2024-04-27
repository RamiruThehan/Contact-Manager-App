import { useState } from 'react';
import Swal from "sweetalert2";
const AddTask = ({ onSave }) => {
    const [text, setText] = useState('');
    const [day, setDay] = useState('');
    const onSubmit = (e) => {
        e.preventDefault();
        if (!text && !day) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Fill in your Contact Name and E-mail or close the form!'
            })
        } else if (!text && day) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Fill in your Contact Name!'
            })
        } else if (text && !day) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Fill in your E-mail!'
            })
        } else {
            onSave({ text, day });
        }
        setText('');
        setDay('');
    }
    return (
        <form className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label>Name</label>
                <input type="text" placeholder="add your Contact Name" value={text} onChange={(e) => setText(e.target.value)} />
            </div>
            <div className="form-control">
                <label>E-mail</label>
                <input type="text" placeholder="add your Contact E-mail" value={day} onChange={(e) => setDay(e.target.value)} />
            </div>
            <input type="submit" className="btn btn-block" value="Save Contact" />
        </form>
    )
}
export default AddTask;