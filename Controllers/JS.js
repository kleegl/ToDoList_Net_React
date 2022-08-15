
class FirstClass extends React.Component {
    constructor(props, context) {
        super(props);
        this.state = {
            name: "",
            num: 0,
        }
    }

    render() {
        const fullName = this.state.name;

        return (
            <div>
                <h1>{fullName}</h1>
            </div>
        );
    };
}