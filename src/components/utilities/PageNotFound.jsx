import { useRouteError } from "react-router-dom";

function PageNotFound() {
  const error = useRouteError();
  return (
    <div className="min-h-screen grid place-items-center text-center">
      <div>
        <h1 className="text-9xl">{error.status}</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  );
}

export default PageNotFound;
