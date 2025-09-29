import type {JSX} from "react";
import '../css/home.css'

const Home = (): JSX.Element => (
  <div className="main camp-bg">
    
    <div style={{backgroundColor: "#03424d8c", padding: 20, margin: 30}}>
      <h1>Start your new adventure here</h1>
    </div>
    <button type="submit" className="btn btn-primary">Create new trip</button>
  </div>
);

export default Home;
