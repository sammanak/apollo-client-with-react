import React, { Component } from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from 'react-apollo';
import gql from 'graphql-tag';

import logo from './logo.svg';
import './App.css';

const client = new ApolloClient({
  uri: "https://api-apeast.graphcms.com/v1/cjnizp0ym27kn01gl2pv77ar9/master"
});

// Writing Query
const POSTS_QUERY = gql`
  {
    posts {
      id
      title
      body
      featureImage {
        id
        fileName
        mimeType
      }
    }
  }
`;

// Running Query outside of React
client.query({
  query: POSTS_QUERY
}).then(res => console.log(res))

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            {/* <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a> */}
            <Query query={POSTS_QUERY}>
              {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;
                const { posts } = data;
                return posts.map(({ id, title, body, featureImage }) => (
                  <div key={id}>
                    <p>
                      <b>{`${title}`}</b>
                      <br/>
                      {`${body}`}
                      <br/>
                      {/* <img 
                        src={`https://www.filestackapi.com/api/store/S3?key=AY2EbhcuR8SUpZfcUoaFYz&path=/9e95dc6fe83245b8a56f038eedcb83f4-master/${featureImage.id}`} 
                        alt="Post Image" /> */}
                    </p>
                  </div>
                ));
              }}
            </Query>
          </header>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
