import { MdInsertPhoto } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import {
  Control,
  Controller,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
} from "react-hook-form";
import { StudentForm } from "../constants/schema";
import { useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import PhoneInput from "react-phone-input-2";
import { educationalLevel, gender } from "../constants/constant";

interface Props {
  register: UseFormRegister<StudentForm>;
  handleSubmit: UseFormHandleSubmit<StudentForm, undefined>;
  isSubmitting: boolean;
  //   reset: UseFormReset<StudentForm>;
  errors: FieldErrors<StudentForm>;
  control: Control<StudentForm, any>;
  onSubmitCallBack: SubmitHandler<StudentForm>;
}
const AdmissionForm = ({
  register,
  control,
  errors,
  handleSubmit,
  isSubmitting,
  //   reset,
  onSubmitCallBack,
}: Props) => {
  const [selectedCountry, setSelectedCountry] = useState("us");

  return (
    <div className="min-h-screen grid md:grid-cols-2  md:m-5">
      <div className="pl-3 md:pl-14 pt-9">
        <h1 className="font-sans font-bold text-3xl text-gray-700 mb-3">
          Admission Form
        </h1>
        <p className="text-xs text-slate-500 font-medium">
          Fill this form to enroll in madrassa
          <span className="text-green-700 font-bold pl-1">AMBAA UL ULOOM</span>
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmitCallBack)}
          className="mt-10 pt-6 pr-6 w-full max-w-xl"
        >
          {/* Student Name */}
          <div className="mb-8">
            <input
              {...register("studentName")}
              id="name"
              type="text"
              placeholder="Enter your name"
              className={`w-full px-3 py-2 border-y-2 border-t-0 focus:outline-none focus:border-blue-600 ${
                errors.studentName && "focus:border-red-500"
              }`}
            />
            {errors.studentName && (
              <p className="text-red-500 text-xs pt-1">
                {errors.studentName?.message}
              </p>
            )}
          </div>

          {/* Age & Gender */}
          <div className="mb-8 lg:flex lg:justify-between">
            <div className="mb-8 lg:mb-auto">
              <input
                {...register("age", { valueAsNumber: true })}
                id="age"
                type="number"
                placeholder="Enter your Age"
                className={`w-full lg:w-auto px-3 py-2 border-y-2 border-t-0 focus:outline-none focus:border-blue-600 ${
                  errors.age && "focus:border-red-500"
                }`}
              />
              {errors.age && (
                <p className="text-red-500 text-xs pt-1">
                  {errors.age?.message}
                </p>
              )}
            </div>

            <div className="mb-8 lg:mb-auto">
              <select
                id="gender"
                {...register("gender")}
                defaultValue=""
                className={`w-full lg:w-auto px-10 text-gray-400 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 ${
                  errors.gender && "focus:ring-red-500"
                }`}
              >
                <option value="" disabled>
                  Select Gender
                </option>
                {gender.map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
              {errors.gender && (
                <p className="text-red-500 text-xs pt-1">
                  {errors.gender?.message}
                </p>
              )}
            </div>
          </div>

          {/* Education/Qualification */}
          <div className="mb-8">
            <select
              id="education"
              {...register("education")}
              className="w-full px-3 py-2 text-gray-400 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              defaultValue=""
            >
              <option value="" disabled>
                Select Education
              </option>
              {educationalLevel.map((level) => (
                <option className="text-gray-400" value={level} key={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          {/* Parent Name */}
          <div className="mb-8">
            <input
              id="parentName"
              {...register("parentName")}
              type="text"
              placeholder="Enter your parent name"
              className={`w-full px-3 py-2 border-y-2 border-t-0 focus:outline-none focus:border-blue-600 ${
                errors.parentName && "focus:border-red-500"
              }`}
            />
            {errors.parentName && (
              <p className="text-red-500 text-xs pt-1">
                {errors.parentName?.message}
              </p>
            )}
          </div>

          {/* Country & City */}
          <div className="mb-8 lg:flex lg:justify-between">
            <div className="mb-8 lg:mb-auto">
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <ReactFlagsSelect
                    className="sd-input "
                    selected={field.value}
                    onSelect={(code) => {
                      setSelectedCountry(code);
                      field.onChange(code);
                    }}
                    searchable
                  />
                )}
              />
            </div>

            <input
              id="city"
              {...register("city")}
              type="text"
              placeholder="Enter your City"
              className={`w-full lg:w-2/4 px-3 py-2 border-y-2 border-t-0 focus:outline-none focus:border-blue-600 ${
                errors.city && "focus:border-red-500"
              }`}
            />

            {errors.city && (
              <p className="text-red-500 text-xs pt-1">
                {errors.city?.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mb-8">
            <input
              id="email"
              {...register("email")}
              type="email"
              placeholder="Enter your email id"
              className={`w-full px-3 py-2 border-y-2 border-t-0 focus:outline-none focus:border-blue-600 ${
                errors.email && "focus:border-red-500"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs pt-1">
                {errors.email?.message}
              </p>
            )}
          </div>

          {/* Phonenumber */}
          <div className="mb-8">
            {/* <input
              id="name"
              type="text"
              placeholder="Enter your phone number"
              className="w-full px-3 py-2 border-y-2 border-t-0 focus:outline-none focus:border-blue-600"
            /> */}
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <PhoneInput
                  country={selectedCountry?.toLowerCase()}
                  value={field.value}
                  onChange={(phone) => field.onChange(phone)}
                  inputClass={`w-full px-3 py-2 border-y-2 border-t-0 focus:outline-none focus:border-blue-600 ${
                    errors.phoneNumber && "focus:border-red-500"
                  }`}
                />
              )}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs pt-1">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          {/* Photo */}
          <div
            className={`flex flex-col justify-center items-center border rounded-lg border-gray-900/25 border-dashed px-3 py-5 mb-8 ${
              errors.studentPhoto && "border-red-500"
            }`}
          >
            <MdInsertPhoto className="h-12 w-12 text-gray-300" />
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <label
                className="cursor-pointer text-sm text-indigo-600 font-semibold hover:text-indigo-500"
                htmlFor="photo-upload"
              >
                <input
                  id="photo-upload"
                  {...register("studentPhoto")}
                  type="file"
                  className="pl-11 file:rounded-full file:border-0 file:text-sm file:font-semibold hover:file:bg-violet-100"
                  accept=".jpg,.jpeg,.png"
                />
              </label>
            </div>
            <p className="text-xs leading-6 text-gray-600">PNG, JPG only</p>
            {errors.studentPhoto && (
              <p className="text-red-500 text-xs pt-1">
                {errors.studentPhoto?.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`${
              isSubmitting
                ? "w-full bg-gray-600 rounded-lg text-white py-2 hover:bg-gray-500 transition-colors mb-8"
                : "w-full bg-green-600 rounded-lg text-white py-2 hover:bg-green-500 transition-colors mb-8"
            }`}
          >
            {isSubmitting ? "SUBMITTING" : "SUBMIT"}
          </button>
        </form>
      </div>
      <div className=" flex flex-col justify-around items-center pl-14 pt-10 lg:pt-40">
        <div className="w-full max-w-2xl mb-7 lg:mb-auto">
          <h1 className="mb-4 font-bold text-gray-700 text-md">
            Terms & Conditions
          </h1>
          <ul className="list-disc text-slate-500 font-medium text-sm leading-6 p-4 md:p-0">
            <li className="mb-4 lg:mb-auto">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.Quis,vel
            </li>
            <li className="mb-4 lg:mb-auto">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id,
              nemo.
            </li>
            <li className="mb-4 lg:mb-auto">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
              fugiat impedit odio.
            </li>
          </ul>
        </div>
        <div className="w-full max-w-2xl mb-10 lg:mb-auto">
          <h1 className="mb-4 font-bold text-gray-700 text-md">
            For Quick Inqueries
          </h1>
          <ul className="list-none text-slate-500 font-medium text-sm">
            <li className="flex items-center mb-6">
              <IoIosCall className="pr-1 h-8 w-8 text-blue-600" />
              <span>+91-9557202241</span>
            </li>
            <li className="flex items-center">
              <FaWhatsapp className="pr-1 h-8 w-8 text-green-600" />
              <span>+91-9552202241</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdmissionForm;
