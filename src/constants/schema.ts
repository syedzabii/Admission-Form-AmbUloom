import { z } from "zod";
import { ACCEPTED_FILETYPE, educationalLevel } from "../constants/constant.ts";

export const AmbUloomFormschema = z.object({
  studentName: z
    .string()
    .min(3, "Name must contain atleast 3 characters")
    .max(30)
    .regex(/^[a-zA-Z\s]*$/, "Name must contain only letters"),
  studentPhoto: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, "Photo is required")
    .refine((files) => files.length === 1, "Please upload only one file")
    .refine(
      (files) => ACCEPTED_FILETYPE.includes(files[0]?.type),
      "Only .jpg and .png formats are supported"
    ),
  age: z
    .number({ invalid_type_error: "Age is required" })
    .min(3, { message: "Age is should be atleast 3" })
    .max(100, { message: "Invalid age" }),
  email: z.string().email({ message: "Email is required" }),
  gender: z.string().min(1, "Gender is required"),
  parentName: z
    .string()
    .min(3, "Parent Name is required")
    .regex(/^[a-zA-Z\s]*$/, "Parent name must contain only letters"),
  country: z.string(),
  city: z.string().regex(/^[a-zA-Z\s]*$/, "City must contain only letters"),
  phoneNumber: z
    .string({ required_error: "Phone number is required" })
    .min(1, "Phone number is required"),
  education: z.enum(educationalLevel).optional(),
});

export type StudentForm = z.infer<typeof AmbUloomFormschema>;
