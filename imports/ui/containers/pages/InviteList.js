/* eslint-disable react/forbid-prop-types */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { createContainer } from 'meteor/react-meteor-data';

import Events from '../../../api/events';

import TableItems from '../../components/TableItems';
import EventItem from '../../components/item/EventItem';

const InviteList = ({ events, currentUser, admin }) => {
  const inviteList = (
    <div id="events" className="list page">
      <div className="container">
        <header className="header">
          {(currentUser && admin) ? <Link className="new" to="/events/new">Add An Event</Link> : undefined }
          <h1 className="title">Events</h1>
        </header>
        <table className="items table">
          <thead>
            <tr>
              <th>#</th>
              <th>name</th>
              <th>starts</th>
              <th>stops</th>
            </tr>
          </thead>
          <TableItems data={events} component={EventItem} />
        </table>
      </div>
    </div>
  );
  return inviteList;
};

InviteList.propTypes = {
  events: PropTypes.array,
  currentUser: PropTypes.object,
  admin: PropTypes.bool,
};

InviteList.defaultProps = {
};

export default createContainer(() => {
  Meteor.subscribe('events');

  const user = Meteor.user();
  let admin = false;
  if (user) {
    admin = Roles.userIsInRole(user._id, 'admin', Roles.GLOBAL_GROUP);
  }

  return {
    currentUser: user,
    admin,
    events: Events.find({}).fetch(),
  };
}, InviteList);
