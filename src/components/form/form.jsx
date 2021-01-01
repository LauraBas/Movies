const Form = function(props) {
    return (
        <div>
            <form>
                <input placeholder={props.title}/>
            </form>
        </div>
    )
};

export default Form;