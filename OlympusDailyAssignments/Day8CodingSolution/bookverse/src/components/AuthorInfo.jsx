import { Component } from "react";

class AuthorInfo extends Component {
  componentDidMount() {
    console.log("Author information loaded");
  }

  render() {
    const { author } = this.props;

    if (!author) {
      return <p className="mt-3">Click on a book to see author details.</p>;
    }

    return (
      <div className="card mt-4 p-3">
        <h4>Author Details</h4>
        <p><strong>Bio:</strong> {author.bio}</p>
        <p><strong>Top 3 Books:</strong></p>
        <ul>
          {author.topBooks.map((book, index) => (
            <li key={index}>{book}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default AuthorInfo;
