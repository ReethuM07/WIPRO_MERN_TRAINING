import { Component } from "react";

class AuthorInfo extends Component {
  componentDidMount() {
    console.log("Author info loaded");
  }

  render() {
    const { author } = this.props;
    if (!author) return null;

    return (
      <div className="card p-3 mt-4">
        <h4>Author Details</h4>
        <p>{author.bio}</p>
        <ul>
          {author.topBooks.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default AuthorInfo;
