import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchNodes } from '../services/nodeService';
import updateNewNodes from '../actions/bankLoginActions';


class AccountList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
      loading: true
    };
  }

  componentDidMount = () => {
    this.getNodes();
  }

  getNodes = () => {
    const { props } = this;
    fetchNodes('ACH-US')
      .then((response) => {
        // sets all nodes in redux
        props.updateNewNodes(response.data.nodes);
        this.setState({ nodes: response.data.nodes, loading: false });
      });
  }


  render() {
    const { accounts } = this.props;
    const { nodes, loading } = this.state;
    return (
      <div className="account-list-container">
        <div className="title">Linked Accounts</div>
        {loading
          ? <div className="loading">Loading accounts...</div>
          : (
            <div>
              <div className="list" style={{ borderLeft: 'solid 6px #000000' }}>
                {nodes.length === 0
                  ? (
                    <div>
                      <div>
                        <span className="bank-logo-empty" />
                        <span style={{ display: 'inline-block' }}>No linked accounts</span>
                        <span>Click on Link an account </span>
                      </div>
                    </div>
                  )
                  : (
                    <div>
                      {nodes.map((node, idx) => {
                        // const name = item.bank_name;
                        let border = '';
                        let padding = '';
                        if (idx !== 0) {
                          border = 'solid 1px #868686';
                          padding = '18px';
                        }

                        return (
                          <div style={{ borderTop: border, paddingTop: padding }}>
                            <span className="bank-logo-container"><img className="bank-logo" src={node.info.bank_logo} alt="logo" /></span>
                            <span style={{ width: '580px', display: 'inline-block' }}>{node.info.account_num} - {node.info.class} - {node.info.bank_name} </span>
                            <span>Linked {moment(node.timeline[0].date).format('MM/DD/YYYY')}</span>
                          </div>
                        );
                      })
                      }
                    </div>
                  )}
              </div>
            </div>
          )}

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    nodeLinked: state.bankLoginReducer.nodeLinked,
  };
}

export default connect(mapStateToProps, { updateNewNodes })(AccountList);
