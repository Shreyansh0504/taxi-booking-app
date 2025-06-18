import { useEffect, useState } from "react";
import Authpage from "./component/Authpage";
import Footer from "./component/Footer";
import Loader from "./component/Loader";
import MyProfile from "./component/MyProfile";
import Navbar from "./component/Navbar";
import PageNotFound from "./component/PageNotFound";
import RideHistory from "./component/RideHistory";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookRideHome from "./component/BookRideHome";
import PublicComponent from "./component/PublicComponent";
import PrivateComponent from "./component/PrivateComponent";
import BookingFinal from "./component/BookingFinal";
import AvailableRides from "./component/AvailableRides";
import SearchingRide from "./component/SearchingRide";
import Chat from "./component/Chat";

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [user, setUser] = useState({})
  const [distance, setDistance] = useState(null)
  const [price, setPrice] = useState(null)
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [isLogin, setIsLogin] = useState(false)
  const [customer, setCustomer] = useState(null)
  const [rideId, setRideId] = useState("")

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")))
    }
  }, [localStorage.getItem("user")])

  return (
    <div className="App">
      <Router>
        <Navbar setIsLoading={setIsLoading} setUser={setUser} user={user} />
        {isLoading && <Loader />}
        <Routes>
          <Route
            exact
            path="/auth"
            element={
              <PublicComponent>
                <Authpage
                  setNotificationMessage={setNotificationMessage}
                  setIsLoading={setIsLoading}
                  setUser={setUser}
                />
              </PublicComponent>
            }
          ></Route>
          <Route
            exact
            path="/ride-history"
            element={
              <PrivateComponent>
                <RideHistory setIsLoading={setIsLoading} user={user} />
              </PrivateComponent>
            }
          ></Route>
          <Route
            exact
            path="/"
            element={
              <PrivateComponent>
                {user.userType === "Customer" ? (
                  <BookRideHome
                    setRideId={setRideId}
                    origin={origin}
                    setOrigin={setOrigin}
                    destination={destination}
                    setDestination={setDestination}
                    distance={distance}
                    price={price}
                    setPrice={setPrice}
                    setDistance={setDistance}
                    setIsLoading={setIsLoading}
                    user={user}
                  />
                ) : (
                  <AvailableRides
                    customer={customer}
                    setCustomer={setCustomer}
                    setIsLoading={setIsLoading}
                    user={user}
                  />
                )}
              </PrivateComponent>
            }
          ></Route>
          <Route
            exact
            path="/searching-ride"
            element={
              <PrivateComponent>
                <SearchingRide
                  rideId={rideId}
                  to={origin}
                  from={destination}
                  dist={distance}
                  fare={price}
                  setIsLoading={setIsLoading}
                  user={user}
                />
              </PrivateComponent>
            }
          ></Route>
          <Route
            exact
            path="/booked"
            element={
              <PrivateComponent>
                <BookingFinal
                  rideId={rideId}
                  to={origin}
                  from={destination}
                  dist={distance}
                  fare={price}
                  setIsLoading={setIsLoading}
                  user={user}
                />
              </PrivateComponent>
            }
          ></Route>
          <Route
            exact
            path="/profile"
            element={
              <PrivateComponent>
                <MyProfile setIsLoading={setIsLoading} user={user} />
              </PrivateComponent>
            }
          ></Route>
          <Route
            exact
            path="/support"
            element={
              <PrivateComponent>
                <Chat />
              </PrivateComponent>
            }
          ></Route>
          <Route exact path="*" element={<PageNotFound />}></Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
