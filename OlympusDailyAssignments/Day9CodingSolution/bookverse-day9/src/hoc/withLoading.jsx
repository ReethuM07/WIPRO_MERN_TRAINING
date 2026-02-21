import { useState } from "react";
import Loader from "../components/Loader";

function withLoading(Component) {
  return function WrappedComponent(props) {
    const [loading, setLoading] = useState(true);

    return (
      <>
        {loading && <Loader />}
        <Component {...props} stopLoading={() => setLoading(false)} />
      </>
    );
  };
}


export default withLoading;
