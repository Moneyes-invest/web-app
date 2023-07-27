import { useEffect, useState } from "react";
import { Exchange } from "../api";
import { getLocalUser, sortByName } from "../func";

export const ActifComponent = () => {
  const [actifs, setActifs] = useState<any[]>([]);

  useEffect(() => {
    const user = getLocalUser();
    if (user) {
      const { token } = user;
      Exchange.Dashboard(token)
        .then((res) => {
          console.log(res["hydra:member"]);
          let mix_actif: any[] = [];
          res["hydra:member"].forEach((item: any) => {
            mix_actif = [...mix_actif, ...item.balance];
          });
          setActifs(sortByName(mix_actif));
        })
        .catch((err) => console.log(err));
    } else {
      console.log("user", user);
    }
  }, []);
  return (
    <div className="w-100">
      <div className="fs-6 mb-4">Vos actifs</div>
      <div className="row sub-title mb-2">
        <div className="col-4 p-0">Actif</div>
        <div className="col-4 p-0">Répartition</div>
        <div className="col-4 p-0 text-end">Performance</div>
      </div>
      <div className="actif-list">
        {actifs.map((actif, index) => (
          <div key={index} className="row m-0 mb-2">
            <div className="col-4 p-0">{actif.asset}</div>
            <div className="col-4 p-0 ">{actif.balance}</div>
            <div className="col-4 p-0 text-end">{actif.asset_return}%</div>
          </div>
        ))}
      </div>
    </div>
  );
};
