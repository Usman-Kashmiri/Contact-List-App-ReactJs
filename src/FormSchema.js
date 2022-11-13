import * as yup from "yup";

const supportedFormats = ["image/jpg", "image/jpeg", "image/png", "image/gif", "image/svg+xml"];

export const FormSchema = yup.object({
    first_name:yup.string().required("First name is required..!"),
    last_name:yup.string(),
    phone_no:yup.number().typeError("That doesn't look like a phone number").min(11).positive("A phone number can't start with a minus").integer("A phone number can't include a decimal point").required('A phone number is required'),
    email_address:yup.string().email("Invalid Email Format").required("Email address is required"),
    file:yup.mixed().required()
    .test("FILE_SIZE", "Selected file is too big",(value) => !value || (value && value.size <= 1024 * 1024 * 3))
    .test("FILE_FORMAT", "Invalid file format (supported formats: jpg, jpeg, png, gif, svg)", (value) => !value || (value && supportedFormats.includes(value?.type))),
    contact_address:yup.string().required("Address is required")
});