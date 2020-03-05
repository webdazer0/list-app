import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Global from '../Global';

const Exercises = props => (
    <div className="col-md-4">
        <div className="card">
            <div className="card-header d-flex justify-content-between">{props.myData.username} <span className="badge badge-pill badge-success">{props.myData.duration}</span></div>
            <div className="card-body">
                <p>{props.myData.description}</p>
                
            </div>
            <div className="card-footer">
                <Link to={"/edit/" + props.myData._id} className="btn btn-success mr-2">Edit</Link>
                <Link to="/" onClick={() => props.deleteExercise(props.myData._id)} className="btn btn-danger">Delete</Link>
            </div>
        </div>
    </div>
)

class ExercisesList extends Component {

    state = {
        data: []
    }

    componentDidMount() {
        // const res = await axios.get(`/api/exercises`);
        // this.setState({ data: res.data})
    
        axios.get(`${Global.url}/api/exercises`)
        .then(res => {
            this.setState({ data: res.data});
            return console.log(this.state);
        })
        .catch(err => 'Errore!!!')
    }

    deleteExercise = (id) => {
        axios.delete(`${Global.url}/api/exercises/${id}`)
        .then(res => {
            console.log(res.data);
            return window.location = '/';
        })
        .catch(err => 'Errore!!!!')
    }

    lista = () => {
        return this.state.data.map((elem,i) => {
            return <Exercises myData={elem} deleteExercise={this.deleteExercise} key={i} />
        })
    }


    render() {
        return (
            <div className="container">
                <h1>Exercises List</h1>
                <div className="row">
                    {this.lista()}
                
                </div>
            </div>
        );
    }
}

export default ExercisesList;