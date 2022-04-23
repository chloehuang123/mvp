import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Work = (props) => (
  <tr>
    <td>{props.work.username}</td>
    <td>{props.work.description}</td>
    <td>{props.work.duration}</td>
    <td>{props.work.date.substring(0, 10)}</td>
    <td>
      <Link to={'/edit/' + props.work._id}>edit</Link> |
      <a
        href='#'
        onClick={() => {
          props.deleteWork(props.work._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class WorkList extends Component {
  constructor(props) {
    super(props);

    this.deleteWork = this.deleteWork.bind(this);

    this.state = {
      works: [],
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:8080/work/')
      .then((response) => {
        this.setState({ works: response.data });
      })
      .catch((err) => console.log(err));
  }

  deleteWork(id) {
    axios.delete('http://localhost:8080/work/' + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      works: this.state.works.filter((el) => el._id !== id),
    });
  }

  workList() {
    return this.state.works.map((currentwork) => {
      return (
        <Work
          work={currentwork}
          deleteWork={this.deleteWork}
          key={currentwork._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Logged Work</h3>
        <table className='table'>
          <thead className='thead-light'>
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.workList()}</tbody>
        </table>
      </div>
    );
  }
}
