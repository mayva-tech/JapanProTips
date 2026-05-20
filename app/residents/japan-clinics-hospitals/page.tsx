import { permanentRedirect } from "next/navigation";

export default function JapanClinicsHospitalsRedirect() {
  permanentRedirect("/residents/clinics-vs-hospitals-in-japan");
}
