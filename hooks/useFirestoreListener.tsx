import { useEffect, useState, useRef } from "react";
import {
  collection,
  onSnapshot,
  query,
  getFirestore,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const useFirestoreListener = () => {
  const [updates, setUpdates] = useState([]);
  const processedUpdatesRef = useRef(new Map());
  const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const ticketDonateQuery = query(collection(db, "ticketDonate"));
    const ticketRequestQuery = query(collection(db, "ticketRequest"));

    const handleUpdates = (snapshot, isRequestType = false) => {
      const newUpdates = snapshot
        .docChanges()
        .map((change) => {
          if (change.type === "added" || change.type === "modified") {
            const data = change.doc.data();
            if (data.userUID !== user.uid && data.userId !== user.uid)
              return null; // Filter by userUID

            const updateDate = data.selectedDate
              ? new Date(data.selectedDate)
              : new Date();
            const updateTime = data.selectedTime
              ? new Date(`${data.selectedDate}T${data.selectedTime}`)
              : new Date();

            const update = isRequestType
              ? {
                  id: change.doc.id,
                  type: "request",
                  status: (data.status || "Unknown").toUpperCase(),
                  message: data.message || "Unknown",
                  date: updateDate.toISOString(),
                  time: updateTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  }),
                  bloodType: data.selectedBloodType || "Unknown",
                  userUID: data.userId,
                  timestamp: new Date().getTime(), // Add timestamp
                }
              : {
                  id: change.doc.id,
                  type: "appointment",
                  status: (data.status || "Unknown").toUpperCase(),
                  message: data.message || "Unknown",
                  ticketNumber: data.ticketNumber || "Unknown",
                  date: updateDate.toISOString(),
                  time: updateTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  }),
                  hospital: data.selectedHospital || "Unknown",
                  bloodType: "N/A", // Assuming no blood type for donations
                  userUID: data.userUID,
                  timestamp: new Date().getTime(), // Add timestamp
                };

            console.log(`New ${update.type} Update:`, update);
            return { update, changeType: change.type };
          }
          return null;
        })
        .filter(Boolean);

      setUpdates((prevUpdates) => {
        const uniqueUpdates = newUpdates
          .filter((nu) => {
            const previousStatus = processedUpdatesRef.current.get(
              nu.update.id
            );
            if (
              previousStatus !== nu.update.status &&
              (nu.update.status === "accepted" ||
                nu.update.status === "rejected" ||
                nu.changeType === "added")
            ) {
              processedUpdatesRef.current.set(nu.update.id, nu.update.status);
              return true;
            }
            return false;
          })
          .map((nu) => nu.update);

        console.log("Unique updates:", uniqueUpdates);

        return [...prevUpdates, ...uniqueUpdates]; // Append new updates
      });
    };

    const unsubscribeDonate = onSnapshot(ticketDonateQuery, (snapshot) =>
      handleUpdates(snapshot)
    );
    const unsubscribeRequest = onSnapshot(ticketRequestQuery, (snapshot) =>
      handleUpdates(snapshot, true)
    );

    return () => {
      console.log("Unsubscribing from Firestore listeners");
      unsubscribeDonate();
      unsubscribeRequest();
    };
  }, [user]);

  return updates;
};

export default useFirestoreListener;
