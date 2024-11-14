import { useDispatch, useSelector } from "react-redux";
import {
  incrementDonation,
  incrementHospitalReports,
} from "rtx/slices/reports";
import { RootState } from "app/store";

export default function useIncrementHospitalReport() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  dispatch(incrementDonation());
  incrementHospitalReports(user.hospitalName, true);
}
