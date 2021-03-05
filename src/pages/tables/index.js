import { memo, useEffect, useState } from "react";
import { useRoute } from "wouter";
import QRCode from "qrcode.react";

import { Routes } from "../../constants/routes";
import { useErrorContext } from "../error-boundary";

const Tables = () => {
  const [, { tableId }] = useRoute(Routes.TABLES);
  const [isLoading, setLoading] = useState(true);
  const [tables, setTables] = useState([]);
  const { handleError } = useErrorContext();

  useEffect(() => {
    if (!tableId) {
      return handleError(new Error("tableId not provided"));
    }

    setLoading(true);
    (async () => {
      const resp = await fetch(`/api/restaurant/${tableId}/table`);
      if (!resp.ok) {
        return handleError(new Error("Can't fetch tables"));
      }
      const data = await resp.json();
      setTables(data);
      setLoading(false);
    })();
  }, [handleError, tableId]);

  return !isLoading ? (
    <>
      {tables.map((t) => (
        <div key={t._id} className="margin-bottom-one">
          <div className="text-center">{t.name}</div>
          <QRCode
            value={`${window.location.origin}/${t.restaurantId}/${t._id}`}
          />
        </div>
      ))}
    </>
  ) : (
    <div>Loading...</div>
  );
};

export default memo(Tables);
