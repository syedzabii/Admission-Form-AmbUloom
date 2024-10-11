import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AmbUloomFormschema, StudentForm } from "../constants/schema";
import AdmissionForm from "../components/AdmissionForm";
import apiClient from "../services/api-client";
import { useNavigate } from "react-router-dom";
const AmbUloomForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    control,
  } = useForm<StudentForm>({
    resolver: zodResolver(AmbUloomFormschema),
  });
  const onSubmitCallBack: SubmitHandler<StudentForm> = (data) => {
    const { studentPhoto, ...dataWithoutPhoto } = data;
    console.log(dataWithoutPhoto);
    //It works!!
    apiClient
      .post("/student/new", dataWithoutPhoto, {
        withCredentials: true,
      })
      .then(() => {
        console.log("form sucessfully submitted!!");
        navigate("/onSubmit");
        // reset();
      })
      .catch((error) => console.log(error.response.data.message));
  };
  return (
    <AdmissionForm
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
      control={control}
      onSubmitCallBack={onSubmitCallBack}
      isSubmitting={isSubmitting}
    />
  );
};

export default AmbUloomForm;
