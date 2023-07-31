import { useEffect, useState } from "react";
import { Auth } from "../api";
import "../assets/css/dashboard.css";
import { ActifComponent, DashboardDetailComponent } from "../components";
import { getLocalUser } from "../func";
type LeftState = "Dashboard" | "Déposer" | "Paramètres";
const default_user = {
  name: "Alex meian",
  type: "Premium user",
  photo:
    "https://images.unsplash.com/photo-1499057625772-bafa601ee80c?ixlib=rb-0.3.5&amp;q=85&amp;fm=jpg&amp;crop=faces&amp;fit=crop&amp;cs=srgb&amp;s=136e035a7d5740f54f2acaa940c07f0b&amp;w=150&amp;h=150",
};
export const DashboardScreen = () => {
  const [User, setUser] = useState(default_user);
  useEffect(() => {
    const user = getLocalUser();
    if (user) {
      const { token } = user;
      Auth.User(token)
        .then((res) => {
          const { name, lastname } = res;
          setUser({ ...User, name: `${name} ${lastname}` });
        })
        .catch(() => {});
    }
  }, []);
  const [menuOpen, setMenuOpen] = useState<Boolean>(true);
  const [activeLeft, setActiveLeft] = useState<LeftState>("Dashboard");
  return (
    <div className="h-100 row m-0">
      <div
        className={
          menuOpen
            ? "col-sm-12 col-md-2 col-lg-2 dashoard-left p-0"
            : "dashoard-left close p-0"
        }
      >
        <div className="logo-head position-relative">
          <div
            className="menu-close pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <i className="bi bi-chevron-left"></i>
            ) : (
              <i className="bi bi-chevron-right"></i>
            )}
          </div>
        </div>
        {menuOpen && (
          <div className="d-flex flex-column align-items-center">
            <div
              className={activeLeft === "Dashboard" ? "active item" : "item"}
              onClick={() => setActiveLeft("Dashboard")}
            >
              <i className="bi bi-speedometer2"></i>
              <span className="ml-3">Dashboard</span>
            </div>
            <div
              className={activeLeft === "Déposer" ? "active item" : "item"}
              onClick={() => setActiveLeft("Déposer")}
            >
              <i className="bi bi-briefcase-fill"></i>
              <span className="ml-3">Déposer</span>
            </div>
            <div
              className={activeLeft === "Paramètres" ? "active item" : "item"}
              onClick={() => setActiveLeft("Paramètres")}
            >
              <i className="bi bi-gear"></i>
              <span className="ml-3">Paramètres</span>
            </div>
          </div>
        )}
      </div>
      <div
        className={
          "dashoard-rigth p-0 " +
          (menuOpen ? "col-sm-12 col-md-10 col-lg-10" : "close p-0")
        }
      >
        <div className="dashboard-header d-flex align-items-center justify-content-between">
          <div className="fs-4">{activeLeft}</div>
          <div className="d-flex">
            <div className="seach-block">
              <input
                type="text"
                placeholder="Rechercher ..."
                className="seach-input"
              />
            </div>
            <div className="ml-3 profil d-flex align-items-center">
              <div>
                <img alt="logo" className="user-logo" src={User.photo} />
              </div>
              <div className="mx-2 d-flex flex-column">
                <span className="user-name text-truncate">{User.name}</span>
                <span className="use-type">{User.type}</span>
              </div>
              <i className="bi bi-chevron-down use-chevron"></i>
            </div>
          </div>
        </div>
        <div className="dashoard-container">
          <div className="row m-0 gap-3  flex-md-nowrap">
            <div className="col-md-7 col-lg-8 col-sm-12 item">
              <DashboardDetailComponent />
            </div>
            <div className="col-md-5 col-lg-4 col-sm-12 class-actifs item">
              <ActifComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
