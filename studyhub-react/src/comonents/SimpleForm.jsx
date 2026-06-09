import { useState } from "react";

export default function SimplerForm() {
    const [name, setName] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        alert(name);
    }

    return (
        <form onSumbit={handleSubmit}>
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
            />

            <p>Character count: {name.length}</p>

            <button type="submit">Submit</button>
        </form>
    );
}
