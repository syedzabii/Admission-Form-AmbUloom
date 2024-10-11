import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AmbUloomFormschema, StudentForm } from "../constants/schema";
import AdmissionForm from "../components/AdmissionForm";
import apiClient from "../services/api-client";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const AmbUloomForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setisSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<StudentForm>({
    resolver: zodResolver(AmbUloomFormschema),
  });
  const onSubmitCallBack: SubmitHandler<StudentForm> = (data) => {
    setisSubmitting(true);
    const { studentPhoto, ...dataWithoutPhoto } = data;
    console.log(dataWithoutPhoto);
    //It works!!
    apiClient
      .post("/student/new", dataWithoutPhoto, {
        withCredentials: true,
      })
      .then(() => {
        setisSubmitting(false);
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
