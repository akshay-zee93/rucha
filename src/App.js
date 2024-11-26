import React, { createContext, useEffect, useState } from "react";
import RouteHandler from "./Route";
import { useLocation } from "react-router-dom";
import { getABTestResponse, logErrorToLogger, logInfoToLogger } from "./utils";
export const MyContext = createContext();

const App = () => {
  const [visitorId, setVisitorId] = useState("");
  const [variation, setVariation] = useState("");
  const [flag, setFlag] = useState(false);

  // const currentFlow = getCurrentFlow(pathname);
  const { pathname } = useLocation();

  const getVisitorID = () => {
    let id = "";
    const setVisitor = () => {
      id =
        typeof window !== "undefined" && sessionStorage.getItem("visitorId")
          ? sessionStorage.getItem("visitorId")
          : window.visitor.getMarketingCloudVisitorID();

      if (id === "") {
        setTimeout(() => {
          setVisitor();
        }, 1000);
      } else {
        setVisitorId(id);
      }
    };
    setTimeout(() => {
      setVisitor();
    }, 1000);
  };

  const handleFetchVariationTypeError = (error) => {
    // const { message, analysis } = getErrorFields(error);
    logErrorToLogger("VARIATION_TYPE_GENERATION_ERROR", {
      action: "Variation type generation",
      message: "Error while fetching the Variation type from AB Test Response",
    });
  };

  // Other logic (not fully visible in the image)
  useEffect(() => {
    if (visitorId === "") {
      getVisitorID();
    } else {
      const customerId = sessionStorage.getItem("riblpid");
      getABTestResponse(visitorId, customerId)
        .then((response) => {
          const responseData = response?.response;
          if (responseData?.length > 0) {
            const firstElement = responseData[0];
            setVariation(firstElement?.offerContent?.type ?? "A");
          } else {
            logInfoToLogger(
              "Fetch variation type",
              "Fetch from AB test response",
              "The response array is empty",
              "Fetch from AB test response"
            );
            // Set Default Experienc
            setVariation("A");
          }
        })
        .catch((error) => {
          handleFetchVariationTypeError(error);
          setVariation("A");
        });
    }
  }, [visitorId]);

  return (
    <>
      {flag ? null : (
        <MyContext.Provider value={{ variation }}>
          <RouteHandler variation={variation} />
        </MyContext.Provider>
      )}
    </>
  );
};

export default App;
