import { Controls, Player } from "@lottiefiles/react-lottie-player";
import { useRouteError } from "react-router-dom";

function PageNotFound() {
  const error = useRouteError();
  return (
    <div className="min-h-screen grid place-items-center text-center">
      <div>
        <Player
          autoplay
          loop
          src="https://assets10.lottiefiles.com/packages/lf20_kcsr6fcp.json"
          style={{ height: "300px", width: "300px" }}
        >
          <Controls
            visible={false}
            buttons={["play", "repeat", "frame", "debug"]}
          />
        </Player>

        {/* <h1 className="text-9xl">{error.status}</h1> */}
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  );
}

export default PageNotFound;
