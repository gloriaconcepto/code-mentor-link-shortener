import "./App.css";
import ManagedUrl from "./ManageLink";
function App() {
    return (
        <div className="App App-header">
            <h1 className="welcomeTitle">Welcome to Link Shortened App</h1>
            <div style={{ marginTop: "-31rem" }}>
                <ManagedUrl />
            </div>
        </div>
    );
}

export default App;
