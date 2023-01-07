const Person = ({person, deleteNote}) => (
    <div>
        <span>
            {person.name} --- {person.number}
        </span>
        <button onClick={deleteNote}>delete</button>
    </div>
)

export default Person