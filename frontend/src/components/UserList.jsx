import React from 'react';
import useUsers from '../hooks/useUsers';
import { Link } from 'react-router-dom';

export default function UserList() {
  const users = useUsers();

  return (
    <div className="container">
      <div className="d-flex justify-content-between py-4 align-items-center">
        <h4 className="mb-0">Project members</h4>
        <Link className="btn alert-success" to="/user/create">
          <i className="fa fa-add pr-1" aria-hidden="true"></i> Add User
        </Link>
      </div>

      <div className="row row-gap">
        <ItemList items={users} />
      </div>
    </div>
  );
}

// COMPONENTS

function ItemList(props) {
  return props.items.map((user, i) => {
    return (
      <div className="col-4" key={user.trim()}>
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-start align-items-center">
              <span
                className="avatar-lg bg-secondary text-white mr-3"
                data-name={user?.slice(0, 2)?.toUpperCase()}
                data-toggle="tooltip"
                data-placement="top"
                title={user}
              ></span>
              <div>
                <h5 className="card-title mb-0">{user}</h5>
                <small className="card-subtitle text-muted">Web designer</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });
}
