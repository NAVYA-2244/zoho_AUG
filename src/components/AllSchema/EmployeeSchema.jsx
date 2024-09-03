// import Joi from "joi";
// import { FaInfo } from "react-icons/fa";
// import { MdWork } from "react-icons/md";
// import { VscTypeHierarchySub } from "react-icons/vsc";
// import { GrContact } from "react-icons/gr";
// import { MdPermIdentity } from "react-icons/md";
// import { FaPhoneAlt } from "react-icons/fa";
// import { ImBooks } from "react-icons/im";
// import { IoIosTrendingUp } from "react-icons/io";
// import { TbCirclesRelation } from "react-icons/tb";

// export const addEmployeeForm = {
//   // banner: "",
//   // profilePhoto: "",
//   // organisation_id:"",
//   employee_id: "",
//   first_name: "",
//   last_name: "",
//   nick_name: "",
//   email: "",
//   department_id: "",
//   role_id: "",
//   designation_id: "",
//   employment_type: "",
//   employee_status: "",
//   source_of_hire: "",
//   // shift_id: "",
//   date_of_join: "",
//   reporting_manager: "",
//   // location_id: "",
//   date_of_birth: "",
//   expertise: "",
//   gender: "",
//   marital_status: "",
//   about_me: "",
//   uan: "",
//   pan: "",
//   passport: "",
//   aadhaar: "",
//   work_phone_number: "",
//   personal_mobile_number: "",
//   personal_email_address: "",
//   seating_location: "",

//   present_address: "",
//   permanent_address: "",
//   work_experience: [
//     {
//       company_name: "",
//       job_title: "",
//       from_date: "",
//       to_date: "",
//       job_description: "",
//       experience: "",
//     },
//   ],
//   educational_details: [
//     {
//       institute_name: "",
//       degree: "",
//       specialization: "",
//       year_of_completion: "",
//     },
//   ],

//   dependent_details: [
//     {
//       name: "",
//       relation: "",
//       dependent_date_of_birth: "",
//     },
//   ],
// };

// const eighteenYearsAgo = new Date();
// eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

// export const ExpirementSchema = {
//   // profilePhoto: Joi.string()
//   //   .allow("")

//   //   .label("Profile Photo"),
//   // banner: Joi.string()
//   //   .allow("")

//   //   .label("Banner"),

//   employee_id: Joi.string()
//     .min(5)
//     .max(10)
//     .required()
//     .messages({
//       "string.pattern.base":
//         '"Employee Id" should not include special characters',
//       "any.required": '"Employee Id" is required',
//     })
//     .label("Employee Id"),

//   email: Joi.string()
//     .min(10)
//     .max(55)
//     .email({ tlds: { allow: ["com", "net", "org"] } })
//     .required()
//     .messages({
//       "string.pattern.base": '"Email" should not include special characters',
//       "any.required": '"Email" is required',
//     })
//     .label("Email"),

//   first_name: Joi.string()
//     .min(3)
//     .max(15)
//     .required()
//     .messages({
//       "string.pattern.base":
//         '"FirstName" should not include special characters',
//       "any.required": '"firstName" is required',
//     })
//     .label("First Name"),

//   last_name: Joi.string()
//     .min(3)
//     .max(15)
//     .required()
//     .messages({
//       "string.pattern.base": '"LastName" should not include special characters',
//       "any.required": '"LastName" is required',
//     })
//     .label("LastName"),

//   nick_name: Joi.string()
//     .allow("")
//     .max(15)
//     .messages({
//       "string.pattern.base": '"NickName" should not include special characters',
//     })
//     .label("NickName"),

//   // location_id: Joi.string().required().label("Location"),

//   department_id: Joi.string().required().min(3).max(15).label("Department"),
//   role_id: Joi.string().required().min(3).max(15).label("Role"),
//   designation_id: Joi.string().min(3).max(15).required().label("Designation"),
//   employment_type: Joi.string()
//     .min(3)
//     .max(15)
//     .required()
//     .label("Employment Type"),
//   employee_status: Joi.string()
//     .valid("active", "disable", "terminated")
//     .min(3)
//     .max(15)
//     .required()
//     .label("Employee Status"),
//   source_of_hire: Joi.string()
//     .min(3)
//     .max(15)
//     .required("")
//     .label("Source of hire"),
//   // shift_id: Joi.string().required().label("Shift"),
//   // reporting_manager: Joi.string()
//   //   .min(1)
//   //   .max(20)
//   //   .pattern(/^[a-zA-Z0-9 ]*$/, "special characters")
//   //   .required()
//   //   .label("Reporting Manager"),
//   reporting_manager: Joi.string()
//         .min(10)
//         .max(25)
//         .email({ tlds: { allow: ["com", "net", "org"] } })
//         .required()
//         .label("reporting manager"),
//   date_of_join: Joi.date().required().messages({
//     "date.base": `"dateOfJoining" should be a valid date`,
//     "date.max": `"dateOfJoining" cannot be in the future`,
//   }),

//   date_of_birth: Joi.date()
//     .max("now")
//     .less(eighteenYearsAgo)
//     .required()
//     .messages({
//       "date.base": `"Date Of Birth" should be a valid date`,
//       "date.max": `"Date Of Birth" cannot be in the future`,
//       "date.less": `"Date Of Birth" must be at least 18 years ago`,
//       "any.required": `"Date Of Birth" is a required field`,
//     }),
//   expertise: Joi.string().allow("").optional().label("Expertise"),

//   gender: Joi.string().required().label("Gender"),
//   marital_status: Joi.string().required().label("Marital Status"),

//   present_address: Joi.string()
//     .min(10)
//     .max(250)
//     .required()
//     .messages({
//       "string.pattern.base":
//         '"Present Address" should not include special characters',
//       "any.required": '"Present Address" is required',
//     })
//     .label("Present Address"),

//   dateOfExit: Joi.date().allow("").messages({
//     "date.base": `"dateOfExit" should be a valid date`,
//   }),

//   permanent_address: Joi.string()
//     .min(10)
//     .max(250)
//     .required()

//     .messages({
//       "string.pattern.base":
//         '"Permanent Address" should not include special characters',
//       "any.required": '"Permanent Address" is required',
//     })
//     .label("Permanent Address"),

//   about_me: Joi.string()
//     .min(5)
//     .max(250)
//     .allow("")
//     .messages({
//       "string.pattern.base": '"About Me" should not include special characters',
//       "any.required": '"About Me" is required',
//     })
//     .label("About Me"),

//   //identity info
//   uan: Joi.string()
//     .min(12)
//     .max(12)
//     .allow("")
//     .messages({
//       "string.pattern.base": '"UAN" should not include special characters',
//       "any.required": '"UAN" is required',
//     })
//     .label("UAN"),

//   pan: Joi.string()
//     .min(10)
//     .max(10)

//     .allow("")
//     .messages({
//       "string.pattern.base":
//         '"PAN" should consist of 5 letters followed by 4 digits and 1 letter, and should not include special characters',

//       "any.required": '"PAN" is required',
//     })

//     .label("PAN"),

//   aadhaar: Joi.string()
//     .min(12)
//     .max(12)
//     .allow("")
//     .messages({
//       "string.pattern.base": '"Aadhaar" should not include special characters',
//       "any.required": '"Aadhaar" is required',
//     })
//     .label("Aadhaar"),

//   passport: Joi.string()
//     .min(12)
//     .max(12)
//     .allow("")
//     .messages({
//       "string.pattern.base": '"Passport" should not include special characters',
//       "any.required": '"Passport" is required',
//     })
//     .label("Passport"),

//   work_phone_number: Joi.string()
//     .min(10)
//     .max(10)
//     .pattern(/^[6-9]\d{9}$/)
//     .messages({
//       "string.pattern.base":
//         '"Phone Number" should start with digits 6-9 and not include special characters',
//     })
//     .label("Phone Number"),

//   personal_mobile_number: Joi.string()
//     .min(10)
//     .max(10)
//     .required()
//     .pattern(/^[6-9]\d{9}$/)
//     .messages({
//       "string.pattern.base":
//         '"Personal Phone Number" should start with digits 6-9 and not include special characters',
//       "any.required": '"Personal Phone Number" is required',
//     })
//     .label("Personal Phone Number"),

//   personal_email_address: Joi.string()
//     .min(10)
//     .max(55)
//     .required()
//     .email({ tlds: { allow: ["com", "net", "org"] } })
//     .messages({
//       "string.pattern.base":
//         '"Personal Email" should not include special characters',
//       "any.required": '"Personal Email" is required',
//     })
//     .label("Personal Email"),

//   seating_location: Joi.string()
//     .min(2)
//     .max(10)
//     // .allow("")
//     .required()
//     .messages({
//       "string.pattern.base":
//         '"Seating Location" should not include special characters',
//       "any.required": '"Seating Location" is required',
//     })
//     .label("Seating Location"),

//   work_experience: Joi.array()
//     .items(
//       Joi.object({
//         company_name: Joi.string()
//           .min(10)
//           .max(30)
//           .allow("")
//           .messages({
//             "string.pattern.base":
//               '"company" should not include special characters',
//           })
//           .label("Company Name"),
//         job_title: Joi.string()
//           .min(3)
//           .max(25)
//           .allow("")
//           .messages({
//             "string.pattern.base":
//               '"jobTitle" should not include special characters',
//           })
//           .label("Job Title"),

//         from_date: Joi.date().allow("").label("From Date"),
//         to_date: Joi.date().allow("").label("End Date"),
//         job_description: Joi.string()
//           .min(5)
//           .max(100)
//           .allow("")
//           .messages({
//             "string.pattern.base":
//               '"jobDescription" should not include special characters',
//           })
//           .label("Job Description"),
//         experience: Joi.number()
//           .positive()
//           .allow("")
//           .label("Relevant Experience"),
//       })
//     )
//     .label("Work Experience"),

//   educational_details: Joi.array()
//     .items(
//       Joi.object({
//         institute_name: Joi.string()
//           .min(5)
//           .max(30)
//           .allow("")
//           .messages({
//             "string.pattern.base":
//               '"instituteName" should not include special characters',
//           })
//           .label("Institute Name"),
//         degree: Joi.string()
//           .min(5)
//           .max(15)
//           .allow("")
//           .messages({
//             "string.pattern.base":
//               '"degreeOrDiploma" should not include special characters',
//           })
//           .label("Degree or Diploma"),
//         specialization: Joi.string()
//           .min(3)
//           .max(15)
//           .allow("")
//           .messages({
//             "string.pattern.base":
//               '" Locationspecialization" should not include special characters',
//           })
//           .label("Specialization"),
//         year_of_completion: Joi.date()
//           .max("now")
//           .allow("")
//           .label("Date of Completion"),
//       })
//     )
//     .label("Education Details"),

//   dependent_details: Joi.array()
//     .items(
//       Joi.object({
//         name: Joi.string()
//           .min(3)
//           .max(50)
//           .allow("")

//           .messages({
//             "string.pattern.base":
//               '"dependentName" should not include special characters',
//           })
//           .label("Dependent Name"),

//         relation: Joi.string()
//           .min(3)
//           .max(50)
//           .allow("")
//           .messages({
//             "string.pattern.base":
//               '"dependentName" should not include special characters',
//           })
//           .label("Dependent Name")
//           .label("Relation"),
//         dependent_date_of_birth: Joi.date()
//           .max("now")
//           .less(eighteenYearsAgo)
//           .allow("")
//           .messages({
//             "date.base": `"Date Of Birth" should be a valid date`,
//             "date.max": `"Date Of Birth" cannot be in the future`,
//             "date.less": `"Date Of Birth" must be at least 18 years ago`,
//             "any.required": `"Date Of Birth" is a required field`,
//           }),
//       })
//     )
//     .label("Education Details"),
// };

// const EmployeeDataSchema = {
//   profilePhoto: Joi.string().allow("").label("Profile Photo"),
//   banner: Joi.string().allow("").label("Banner"),

//   employee_id: Joi.string()
//     .min(5)
//     .max(10)
//     .required()
//     .messages({
//       "string.pattern.base":
//         '"Employee Id" should not include special characters',
//       "any.required": '"Employee Id" is required',
//     })
//     .label("Employee Id"),

//   email: Joi.string()
//     .min(10)
//     .max(55)
//     .email({ tlds: { allow: ["com", "net", "org"] } })
//     .required()
//     .messages({
//       "string.pattern.base": '"Email" should not include special characters',
//       "any.required": '"Email" is required',
//     })
//     .label("Email"),
//   first_name: Joi.string()
//     .min(3)
//     .max(15)
//     .required()
//     .messages({
//       "string.pattern.base":
//         '"FirstName" should not include special characters',
//       "any.required": '"firstName" is required',
//     })
//     .label("First Name"),

//   last_name: Joi.string()
//     .min(3)
//     .max(15)
//     .required()
//     .messages({
//       "string.pattern.base": '"LastName" should not include special characters',
//       "any.required": '"LastName" is required',
//     })
//     .label("LastName"),

//   nick_name: Joi.string()
//     .allow("")
//     .max(15)
//     .messages({
//       "string.pattern.base": '"NickName" should not include special characters',
//     })
//     .label("NickName"),

//   // location_id: Joi.string().required().label("Location"),

//   department_id: Joi.string().required().label("Department"),
//   role_id: Joi.string().required().label("Role"),
//   designation_id: Joi.string().required().label("Designation"),
//   employment_type: Joi.string().required().label("Employment Type"),
//   employee_status: Joi.string()
//     .min(3)
//     .max(15)
//     .required()
//     .label("Employee Status"),
//   source_of_hire: Joi.string()
//     .min(3)
//     .max(15)
//     .required("")
//     .label("Source of hire"),
//   // shift_id: Joi.string().required().label("Shift"),

//   reporting_manager: Joi.string()
//     .min(1)
//     .max(20)
//     .pattern(/^[a-zA-Z0-9 ]*$/, "special characters")
//     .required()
//     .label("Reporting Manager"),

//   date_of_join: Joi.date().required().messages({
//     "date.base": `"dateOfJoining" should be a valid date`,
//     "date.max": `"dateOfJoining" cannot be in the future`,
//   }),

//   date_of_birth: Joi.date()
//     .max("now")
//     .less(eighteenYearsAgo)
//     .required()
//     .messages({
//       "date.base": `"Date Of Birth" should be a valid date`,
//       "date.max": `"Date Of Birth" cannot be in the future`,
//       "date.less": `"Date Of Birth" must be at least 18 years ago`,
//       "any.required": `"Date Of Birth" is a required field`,
//     }),
//   expertise: Joi.string().allow("").optional().label("Expertise"),

//   gender: Joi.string().required().label("Gender"),

//   permanantAddress: Joi.string()
//     .min(5)
//     .max(250)
//     .pattern(/^[a-zA-Z0-9 ,]*$/, {
//       name: "alphanumeric with spaces and commas",
//     })
//     .messages({
//       "string.pattern.base":
//         '"Permanent Address" should not include special characters',
//       "any.required": '"Permanent Address" is required',
//     })
//     .label("Permanent Address"),

//   marital_status: Joi.string().required().label("Marital Status"),

//   about_me: Joi.string()
//     .min(5)
//     .max(250)
//     .pattern(/^[a-zA-Z0-9 ,]*$/, {
//       name: "alphanumeric with spaces and commas",
//     })
//     .messages({
//       "string.pattern.base": '"About Me" should not include special characters',
//       "any.required": '"About Me" is required',
//     })
//     .label("About Me"),

//   //identity info
//   uan: Joi.string()
//     .min(12)
//     .max(12)
//     .allow("")
//     .messages({
//       "string.pattern.base": '"UAN" should not include special characters',
//       "any.required": '"UAN" is required',
//     })
//     .label("UAN"),

//   pan: Joi.string()
//     .min(10)
//     .max(10)
//     .allow("")
//     .messages({
//       "string.pattern.base":
//         '"PAN" should consist of 5 letters followed by 4 digits and 1 letter, and should not include special characters',

//       "any.required": '"PAN" is required',
//     })
//     // .required()
//     .label("PAN"),
//   aadhaar: Joi.string()
//     .min(12)
//     .max(12)
//     .allow("")
//     .messages({
//       "string.pattern.base": '"Aadhaar" should not include special characters',
//       "any.required": '"Aadhaar" is required',
//     })
//     .label("Aadhaar"),

//   passport: Joi.string()
//     .min(12)
//     .max(12)
//     .allow("")
//     .messages({
//       "string.pattern.base": '"Passport" should not include special characters',
//       "any.required": '"Passport" is required',
//     })
//     .label("Passport"),

//   //identity infp ending
//   work_phone_number: Joi.string()
//     .min(10)
//     .max(10)
//     .pattern(/^[6-9]\d{9}$/)
//     .messages({
//       "string.pattern.base":
//         '"Phone Number" should start with digits 6-9 and not include special characters',
//     })
//     .label("Phone Number Work"),

//   personal_mobile_number: Joi.string()
//     .min(10)
//     .max(10)
//     .required()
//     .pattern(/^[6-9]\d{9}$/)
//     .messages({
//       "string.pattern.base":
//         '"Personal Phone Number" should start with digits 6-9 and not include special characters',
//       "any.required": '"Personal Phone Number" is required',
//     })
//     .label("Personal Phone Number"),

//   personal_email_address: Joi.string()
//     .min(10)
//     .max(55)
//     .required()
//     .email({ tlds: { allow: ["com", "net", "org"] } })
//     .messages({
//       "string.pattern.base":
//         '"Personal Email" should not include special characters',
//       "any.required": '"Personal Email" is required',
//     })
//     .label("Personal Email"),
//   seating_location: Joi.string()
//     .min(2)
//     .max(10)
//     // .allow("")
//     .required()
//     .messages({
//       "string.pattern.base":
//         '"Seating Location" should not include special characters',
//       "any.required": '"Seating Location" is required',
//     })
//     .label("Seating Location"),

//   // tags: Joi.string().allow("").optional().label("Tags"),

//   present_address: Joi.string()

//     .min(10)
//     .max(250)
//     .required()
//     .pattern(/^[a-zA-Z0-9 ,.]*$/, {
//       name: "'alphanumeric with spaces, commas, and dots'",
//     })
//     .messages({
//       "string.pattern.base":
//         '"Present Address" should only include alphanumeric characters, spaces, commas, and dots',
//       "any.required": '"Present Address" is required',
//     })
//     .label("Present Address"),
//   // dateOfExit: Joi.date().allow("").messages({
//   //   "date.base": `"dateOfExit" should be a valid date`,
//   // }),

//   permanent_address: Joi.string()
//     // .min(10)
//     // .max(250)
//     // .required()
//     // .pattern(/^[a-zA-Z0-9 ,]*$/, {
//     //   name: "'alphanumeric with spaces, commas, and dots'",
//     // })
//     // .messages({
//     //   "string.pattern.base":
//     //     '"Permanent Address" should not include special characters',
//     //   "any.required": '"Permanent Address" is required',
//     // })
//     // .label("Permanent Address"),
//     .min(10)
//     .max(250)
//     .required()
//     .pattern(/^[a-zA-Z0-9 ,.]*$/, {
//       name: "'alphanumeric with spaces, commas, and dots'",
//     })
//     .messages({
//       "string.pattern.base":
//         '"Permanent Address" should only include alphanumeric characters, spaces, commas, and dots',
//       "any.required": '"Permanent Address" is required',
//     })
//     .label("Permanent Address"),

//   company_name: Joi.string()
//     .min(10)
//     .max(30)
//     .allow("")
//     .messages({
//       "string.pattern.base": '"company" should not include special characters',
//     })
//     .label("Company Name"),
//   job_title: Joi.string()
//     .min(3)
//     .max(30)
//     .allow("")
//     .messages({
//       "string.pattern.base": '"jobTitle" should not include special characters',
//     })
//     .label("Job Title"),

//   from_date: Joi.date().max("now").allow("").label("From Date"),
//   to_date: Joi.date().max("now").allow("").label("End Date"),
//   job_description: Joi.string()
//     .min(3)
//     .max(250)
//     .allow("")
//     .messages({
//       "string.pattern.base":
//         '"jobDescription" should not include special characters',
//     })
//     .label("Job Description"),
//   experience: Joi.number().max(50).allow("").label("Relevant Experience"),

//   institute_name: Joi.string()
//     .min(10)
//     .max(50)
//     .allow("")
//     .messages({
//       "string.pattern.base":
//         '"instituteName" should not include special characters',
//     })
//     .label("Institute Name"),
//   degree: Joi.string()
//     .min(5)
//     .max(15)
//     .allow("")
//     .messages({
//       "string.pattern.base":
//         '"degreeOrDiploma" should not include special characters',
//     })
//     .label("Degree or Diploma"),
//   specialization: Joi.string()
//     .min(5)
//     .max(100)
//     .allow("")
//     .messages({
//       "string.pattern.base":
//         '" Locationspecialization" should not include special characters',
//     })
//     .label("Specialization"),
//   year_of_completion: Joi.date()
//     .max("now")
//     .allow("")
//     .label("Date of Completion"),

//   name: Joi.string()
//     .min(3)
//     .max(50)
//     .allow("")

//     .messages({
//       "string.pattern.base":
//         '"dependentName" should not include special characters',
//     })
//     .label("Dependent Name"),

//   relation: Joi.string()
//     .min(3)
//     .max(50)
//     .allow("")
//     .messages({
//       "string.pattern.base":
//         '"dependentName" should not include special characters',
//     })
//     .label("Dependent Name")
//     .label("Relation"),
//   dependent_date_of_birth: Joi.date()
//     .max("now")
//     .less(eighteenYearsAgo)
//     .required()
//     .messages({
//       "date.base": `"Date Of Birth" should be a valid date`,
//       "date.max": `"Date Of Birth" cannot be in the future`,
//       "date.less": `"Date Of Birth" must be at least 18 years ago`,
//       "any.required": `"Date Of Birth" is a required field`,
//     }),
// };

// export default EmployeeDataSchema;

// export const inputStepMap = {
//   firstName: 0,
//   lastName: 0,
//   nickName: 0,
//   email: 0,
//   department: 0,
//   // location: 0,
//   designation: 0,
//   role: 0,
//   employmentType: 0,
//   sourceOfHire: 0,
//   dateOfJoining: 0,
//   reportingManager: 1,
//   dob: 1,
//   maritalStatus: 1,
//   aboutMe: 1,
//   uan: 1,
//   pan: 1,
//   aadhaar: 1,
//   phoneNumber_work: 2,
//   phoneNumber_personal: 2,
//   email_personal: 2,
//   seatingLocation: 2,
//   company: 2,
//   jobTitle: 2,
//   startDate: 2,
//   endDate: 2,
//   jobDescription: 2,
//   relavantExp: 2,
//   instituteName: 3,
//   degreeOrDiploma: 3,
//   specialization: 3,
//   dateOfCompletion: 3,
//   dependentName: 3,
//   dependentRelation: 3,
//   dependentDob: 3,
// };

// export let brr = [
//   {
//     step: 0,
//     info: "Step 1",
//     icon: <FaInfo />,
//     move: false,
//   },
//   {
//     step: 1,
//     info: "Step2",
//     icon: <VscTypeHierarchySub />,
//     move: false,
//     message: "Please Fill the First form",
//   },
//   {
//     step: 2,
//     info: "Step 3",
//     icon: <GrContact />,
//     move: false,
//     message: "Please Fill Second Form",
//   },
//   {
//     step: 3,
//     info: "Step 4",
//     icon: <ImBooks />,
//     move: false,
//     message: "Please Fill Third step",
//   },
// ];

// export let brrs = [
//   {
//     step: 0,
//     info: "Basic",
//     icon: <FaInfo />,
//     move: Object.keys(addEmployeeForm)
//       .slice(0, 4)
//       .every((item) => {
//         return addEmployeeForm[item].length > 0;
//       }),
//     message: "please complete the basic information",
//   },
//   {
//     step: 1,
//     info: "Work",
//     icon: <MdWork />,
//     move: Object.keys(addEmployeeForm)
//       .slice(0, 4)
//       .every((item) => {
//         return addEmployeeForm[item].length > 0;
//       }),
//     message: "Please Fill the first Step",
//   },
//   {
//     step: 2,
//     info: "Hierarchy",
//     icon: <VscTypeHierarchySub />,
//     move: Object.keys(addEmployeeForm)
//       .slice(0, 11)
//       .every((item) => {
//         return addEmployeeForm[item].length > 0;
//       }),
//     message: "Please Fill 2nd step",
//   },
//   {
//     step: 3,
//     info: "Persoanl",
//     icon: <GrContact />,
//     move: Object.keys(addEmployeeForm)
//       .slice(0, 12)
//       .every((item) => {
//         return addEmployeeForm[item].length > 0;
//       }),
//     message: "Please Fill 3rd step",
//   },
//   {
//     step: 4,
//     info: "Identity",
//     icon: <MdPermIdentity />,
//     move: Object.keys(addEmployeeForm)
//       .slice(0, 15)
//       .every((item) => {
//         return addEmployeeForm[item].length > 0;
//       }),
//     message: "Please Fill 4rth step",
//   },
//   {
//     step: 5,
//     info: "Contact",
//     icon: <FaPhoneAlt />,
//     move: Object.keys(addEmployeeForm)
//       .slice(0, 18)
//       .every((item) => {
//         return addEmployeeForm[item].length > 0;
//       }),
//   },
//   {
//     step: 6,
//     info: "Experience",
//     icon: <IoIosTrendingUp />,
//     move: Object.keys(addEmployeeForm)
//       .slice(0, 22)
//       .every((item) => {
//         return addEmployeeForm[item].length > 0;
//       }),
//     message: "Please Fill 6th step",
//   },
//   {
//     step: 7,
//     info: "Education",
//     icon: <ImBooks />,
//     move: Object.keys(addEmployeeForm)
//       .slice(0, 28)
//       .every((item) => {
//         return addEmployeeForm[item].length > 0;
//       }),
//     message: "Please Fill 7th step",
//   },
//   {
//     step: 8,
//     info: "Dependent",
//     icon: <TbCirclesRelation />,
//     move: Object.keys(addEmployeeForm)
//       .slice(0, 28)
//       .every((item) => {
//         return addEmployeeForm[item].length > 0;
//       }),
//     message: "Please Fill 8th step",
//   },
// ];

// export { FaInfo } from "react-icons/fa";
// export { MdWork } from "react-icons/md";
// export { VscTypeHierarchySub } from "react-icons/vsc";
// export { GrContact } from "react-icons/gr";
// export { MdPermIdentity } from "react-icons/md";
// export { FaPhoneAlt } from "react-icons/fa";
// export { ImBooks } from "react-icons/im";
// export { IoIosTrendingUp } from "react-icons/io";
// export { TbCirclesRelation } from "react-icons/tb";

// export const fileSchema = {
//   file: Joi.string()
//     .required()
//     .messages({
//       "any.required": '"File" is required',
//     })
//     .label("File"),
//   fileName: Joi.string()
//     .min(3)
//     .max(20)
//     .required()
//     .messages({
//       "string.pattern.base": '"FileName" should not include special characters',
//       "any.required": '"FileName" is required',
//     })
//     .label("FileName"),
//   employeeId: Joi.string()
//     .required()
//     .messages({
//       "string.pattern.base":
//         '"EmployeeId" should not include special characters',
//       "any.required": '"EmployeeId" is required',
//     })
//     .label("Employee Id"),
//   description: Joi.string()
//     .min(3)
//     .max(20)
//     .required()
//     .messages({
//       "string.pattern.base":
//         '"Description" should not include special characters',
//       "any.required": '"Description" is required',
//     })
//     .label("Description"),
//   employeeView: Joi.boolean().label("Employee View"),

//   reportingManagerView: Joi.boolean().label("Reporting Manager"),

//   employeeDownload: Joi.boolean().label("Employee File Download"),
//   reportingManagerDownload: Joi.boolean().label(
//     "Reporting Manager File Download"
//   ),
// };
import Joi from "joi";
import { FaInfo } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { VscTypeHierarchySub } from "react-icons/vsc";
import { GrContact } from "react-icons/gr";
import { MdPermIdentity } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { IoIosTrendingUp } from "react-icons/io";
import { TbCirclesRelation } from "react-icons/tb";

export const addEmployeeForm = {
  // banner: "",
  // profilePhoto: "",
  // organisation_id:"",
  employee_id: "",
  first_name: "",
  last_name: "",
  nick_name: "",
  email: "",
  department_id: "",
  role_id: "",
  designation_id: "",
  employment_type: "",
  employee_status: "",
  source_of_hire: "",
  // shift_id: "",
  date_of_join: "",
  reporting_manager: "",
  // location_id: "",
  date_of_birth: "",
  expertise: "",
  gender: "",
  marital_status: "",
  about_me: "",
  uan: "",
  pan: "",
  passport: "",
  aadhaar: "",
  work_phone_number: "",
  personal_mobile_number: "",
  personal_email_address: "",
  seating_location: "",

  present_address: "",
  permanent_address: "",
  work_experience: [
    {
      company_name: "",
      job_title: "",
      from_date: "",
      to_date: "",
      job_description: "",
      experience: "",
    },
  ],
  educational_details: [
    {
      institute_name: "",
      degree: "",
      specialization: "",
      year_of_completion: "",
    },
  ],

  dependent_details: [
    {
      name: "",
      relation: "",
      dependent_date_of_birth: "",
    },
  ],
};

const eighteenYearsAgo = new Date();
eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

export const ExpirementSchema = {
  // profilePhoto: Joi.string()
  //   .allow("")

  //   .label("Profile Photo"),
  // banner: Joi.string()
  //   .allow("")

  //   .label("Banner"),

  employee_id: Joi.string()
    .min(5)
    .max(10)
    .required()
    .messages({
      "string.pattern.base":
        '"Employee Id" should not include special characters',
      "any.required": '"Employee Id" is required',
    })
    .label("Employee Id"),

  email: Joi.string()
    .min(10)
    .max(55)
    .email({ tlds: { allow: ["com", "net", "org"] } })
    .required()
    .messages({
      "string.pattern.base": '"Email" should not include special characters',
      "any.required": '"Email" is required',
    })
    .label("Email"),

  first_name: Joi.string()
    .min(3)
    .max(15)
    .required()
    .messages({
      "string.pattern.base":
        '"FirstName" should not include special characters',
      "any.required": '"firstName" is required',
    })
    .label("First Name"),

  last_name: Joi.string()
    .min(3)
    .max(15)
    .required()
    .messages({
      "string.pattern.base": '"LastName" should not include special characters',
      "any.required": '"LastName" is required',
    })
    .label("LastName"),

  nick_name: Joi.string()
    .allow("")
    .max(15)
    .messages({
      "string.pattern.base": '"NickName" should not include special characters',
    })
    .label("NickName"),

  // location_id: Joi.string().required().label("Location"),

  department_id: Joi.string().required().min(3).max(15).label("Department"),
  role_id: Joi.string().required().min(3).max(15).label("Role"),
  designation_id: Joi.string().min(3).max(15).required().label("Designation"),
  employment_type: Joi.string()
    .min(3)
    .max(15)
    .required()
    .label("Employment Type"),
  employee_status: Joi.string()
    .valid("active", "disable", "terminated")
    .min(3)
    .max(15)
    .required()
    .label("Employee Status"),
  source_of_hire: Joi.string()
    .min(3)
    .max(15)
    .required("")
    .label("Source of hire"),
  // shift_id: Joi.string().required().label("Shift"),
  reporting_manager: Joi.string()
    .min(1)
    .max(20)
    // .email({ tlds: { allow: ["com", "net", "org"] } })
    // .pattern(/^[a-zA-Z0-9@._-]*$/, "valid characters")
    // .required()
    .optional()
    .label("Reporting Manager"),

  date_of_join: Joi.date().required().messages({
    "date.base": `"dateOfJoining" should be a valid date`,
    "date.max": `"dateOfJoining" cannot be in the future`,
  }),

  date_of_birth: Joi.date()
    .max("now")
    .less(eighteenYearsAgo)
    .required()
    .messages({
      "date.base": `"Date Of Birth" should be a valid date`,
      "date.max": `"Date Of Birth" cannot be in the future`,
      "date.less": `"Date Of Birth" must be at least 18 years ago`,
      "any.required": `"Date Of Birth" is a required field`,
    })
    .label("Date Of Birth"),
  expertise: Joi.string().allow("").optional().label("Expertise"),

  gender: Joi.string().required().label("Gender"),
  marital_status: Joi.string().required().label("Marital Status"),

  present_address: Joi.string()
    .min(10)
    .max(100)
    .required()
    .messages({
      "string.pattern.base":
        '"Present Address" should not include special characters',
      "any.required": '"Present Address" is required',
    })
    .label("Present Address"),

  dateOfExit: Joi.date().allow("").messages({
    "date.base": `"dateOfExit" should be a valid date`,
  }),

  permanent_address: Joi.string()
    .min(10)
    .max(100)
    .required()

    .messages({
      "string.pattern.base":
        '"Permanent Address" should not include special characters',
      "any.required": '"Permanent Address" is required',
    })
    .label("Permanent Address"),

  about_me: Joi.string()
    .min(5)
    .max(250)
    .allow("")
    .messages({
      "string.pattern.base": '"About Me" should not include special characters',
      "any.required": '"About Me" is required',
    })
    .label("About Me"),

  //identity info
  uan: Joi.string()
    .min(12)
    .max(12)
    .allow("")
    .messages({
      "string.pattern.base": '"UAN" should not include special characters',
      "any.required": '"UAN" is required',
    })
    .label("UAN"),

  pan: Joi.string()
    .min(10)
    .max(10)

    .allow("")
    .messages({
      "string.pattern.base":
        '"PAN" should consist of 5 letters followed by 4 digits and 1 letter, and should not include special characters',

      "any.required": '"PAN" is required',
    })

    .label("PAN"),

  aadhaar: Joi.string()
    .min(12)
    .max(12)
    .allow("")
    .messages({
      "string.pattern.base": '"Aadhaar" should not include special characters',
      "any.required": '"Aadhaar" is required',
    })
    .label("Aadhaar"),

  passport: Joi.string()
    .min(12)
    .max(12)
    .allow("")
    .messages({
      "string.pattern.base": '"Passport" should not include special characters',
      "any.required": '"Passport" is required',
    })
    .label("Passport"),

  work_phone_number: Joi.string()
    .min(10)
    .max(10)
    .pattern(/^[6-9]\d{9}$/)
    .messages({
      "string.pattern.base":
        '"Phone Number" should start with digits 6-9 and not include special characters',
    })
    .label("Phone Number"),

  personal_mobile_number: Joi.string()
    .min(10)
    .max(10)
    .required()
    .pattern(/^[6-9]\d{9}$/)
    .messages({
      "string.pattern.base":
        '"Personal Phone Number" should start with digits 6-9 and not include special characters',
      "any.required": '"Personal Phone Number" is required',
    })
    .label("Personal Phone Number"),

  personal_email_address: Joi.string()
    .min(10)
    .max(55)
    .required()
    .email({ tlds: { allow: ["com", "net", "org"] } })
    .messages({
      "string.pattern.base":
        '"Personal Email" should not include special characters',
      "any.required": '"Personal Email" is required',
    })
    .label("Personal Email"),

  seating_location: Joi.string()
    .min(2)
    .max(10)
    // .allow("")
    .required()
    .messages({
      "string.pattern.base":
        '"Seating Location" should not include special characters',
      "any.required": '"Seating Location" is required',
    })
    .label("Seating Location"),

  work_experience: Joi.array()
    .items(
      Joi.object({
        company_name: Joi.string()
          .min(10)
          .max(30)
          .allow("")
          .messages({
            "string.pattern.base":
              '"company" should not include special characters',
          })
          .label("Company Name"),
        job_title: Joi.string()
          .min(3)
          .max(25)
          .allow("")
          .messages({
            "string.pattern.base":
              '"jobTitle" should not include special characters',
          })
          .label("Job Title"),

        from_date: Joi.date().allow("").label("From Date"),
        to_date: Joi.date().allow("").label("End Date"),
        job_description: Joi.string()
          .min(5)
          .max(100)
          .allow("")
          .messages({
            "string.pattern.base":
              '"jobDescription" should not include special characters',
          })
          .label("Job Description"),
        experience: Joi.number()
          .positive()
          .allow("")
          .label("Relevant Experience"),
      })
    )
    .label("Work Experience"),

  educational_details: Joi.array()
    .items(
      Joi.object({
        institute_name: Joi.string()
          .min(5)
          .max(30)
          .allow("")
          .messages({
            "string.pattern.base":
              '"instituteName" should not include special characters',
          })
          .label("Institute Name"),
        degree: Joi.string()
          .min(5)
          .max(15)
          .allow("")
          .messages({
            "string.pattern.base":
              '"degreeOrDiploma" should not include special characters',
          })
          .label("Degree or Diploma"),
        specialization: Joi.string()
          .min(4)
          .max(4)
          .allow("")
          .messages({
            "string.pattern.base":
              '" Locationspecialization" should not include special characters',
          })
          .label("Specialization"),
        year_of_completion: Joi.date()
          .max("now")
          .allow("")
          .label("Year of Completion"),
      })
    )
    .label("Education Details"),

  dependent_details: Joi.array()
    .items(
      Joi.object({
        name: Joi.string()
          .min(3)
          .max(50)
          .allow("")

          .messages({
            "string.pattern.base":
              '"dependentName" should not include special characters',
          })
          .label("Dependent Name"),

        relation: Joi.string()
          .min(3)
          .max(50)
          .allow("")
          .messages({
            "string.pattern.base":
              '"dependentName" should not include special characters',
          })
          .label("Dependent Name")
          .label("Relation"),
        dependent_date_of_birth: Joi.date()
          .max("now")
          // .less(eighteenYearsAgo)
          .allow("")
          .messages({
            "date.base": `"Date Of Birth" should be a valid date`,
            "date.max": `"Date Of Birth" cannot be in the future`,
            "date.less": `"Date Of Birth" must be at least 18 years ago`,
            "any.required": `"Date Of Birth" is a required field`,
          }),
      })
    )
    .label("Education Details"),
};

const EmployeeDataSchema = {
  profilePhoto: Joi.string().allow("").label("Profile Photo"),
  banner: Joi.string().allow("").label("Banner"),

  employee_id: Joi.string()
    .min(5)
    .max(10)
    .required()
    .messages({
      "string.pattern.base":
        '"Employee Id" should not include special characters',
      "any.required": '"Employee Id" is required',
    })
    .label("Employee Id"),

  email: Joi.string()
    .min(10)
    .max(55)
    .email({ tlds: { allow: ["com", "net", "org"] } })
    .required()
    .messages({
      "string.pattern.base": '"Email" should not include special characters',
      "any.required": '"Email" is required',
    })
    .label("Email"),
  first_name: Joi.string()
    .min(3)
    .max(15)
    .required()
    .messages({
      "string.pattern.base":
        '"FirstName" should not include special characters',
      "any.required": '"firstName" is required',
    })
    .label("First Name"),

  last_name: Joi.string()
    .min(3)
    .max(15)
    .required()
    .messages({
      "string.pattern.base": '"LastName" should not include special characters',
      "any.required": '"LastName" is required',
    })
    .label("LastName"),

  nick_name: Joi.string()
    .allow("")
    .max(15)
    .messages({
      "string.pattern.base": '"NickName" should not include special characters',
    })
    .label("NickName"),

  // location_id: Joi.string().required().label("Location"),

  department_id: Joi.string().required().label("Department"),
  role_id: Joi.string().required().label("Role"),
  designation_id: Joi.string().required().label("Designation"),
  employment_type: Joi.string().required().label("Employment Type"),
  employee_status: Joi.string()
    .min(3)
    .max(15)
    .required()
    .label("Employee Status"),
  source_of_hire: Joi.string()
    .min(3)
    .max(15)
    .required("")
    .label("Source of hire"),
  // shift_id: Joi.string().required().label("Shift"),

  reporting_manager: Joi.string()
    .min(1)
    .max(20)
    // .email({ tlds: { allow: ["com", "net", "org"] } })
    // .pattern(/^[a-zA-Z0-9@._-]*$/, "valid characters")
    .required()
    // .optional()
    .label("Reporting Manager"),

  date_of_join: Joi.date().required().messages({
    "date.base": `"dateOfJoining" should be a valid date`,
    "date.max": `"dateOfJoining" cannot be in the future`,
  }),

  date_of_birth: Joi.date()
    .max("now")
    .less(eighteenYearsAgo)
    .required()
    .messages({
      "date.base": `"Date Of Birth" should be a valid date`,
      "date.max": `"Date Of Birth" cannot be in the future`,
      "date.less": `"Date Of Birth" must be at least 18 years ago`,
      "any.required": `"Date Of Birth" is a required field`,
    })
    .label("Date Of Birth"),
  expertise: Joi.string().allow("").optional().label("Expertise"),

  gender: Joi.string().required().label("Gender"),

  permanantAddress: Joi.string()
    .min(5)
    .max(250)
    .pattern(/^[a-zA-Z0-9 ,]*$/, {
      name: "alphanumeric with spaces and commas",
    })
    .messages({
      "string.pattern.base":
        '"Permanent Address" should not include special characters',
      "any.required": '"Permanent Address" is required',
    })
    .label("Permanent Address"),

  marital_status: Joi.string().required().label("Marital Status"),

  about_me: Joi.string()
    .min(5)
    .max(250)
    .pattern(/^[a-zA-Z0-9 ,]*$/, {
      name: "alphanumeric with spaces and commas",
    })
    .messages({
      "string.pattern.base": '"About Me" should not include special characters',
      "any.required": '"About Me" is required',
    })
    .label("About Me"),

  //identity info
  uan: Joi.string()
    .min(12)
    .max(12)
    .allow("")
    .messages({
      "string.pattern.base": '"UAN" should not include special characters',
      "any.required": '"UAN" is required',
    })
    .label("UAN"),

  pan: Joi.string()
    .min(10)
    .max(10)
    .allow("")
    .messages({
      "string.pattern.base":
        '"PAN" should consist of 5 letters followed by 4 digits and 1 letter, and should not include special characters',

      "any.required": '"PAN" is required',
    })
    // .required()
    .label("PAN"),
  aadhaar: Joi.string()
    .min(12)
    .max(12)
    .allow("")
    .messages({
      "string.pattern.base": '"Aadhaar" should not include special characters',
      "any.required": '"Aadhaar" is required',
    })
    .label("Aadhaar"),

  passport: Joi.string()
    .min(12)
    .max(12)
    .allow("")
    .messages({
      "string.pattern.base": '"Passport" should not include special characters',
      "any.required": '"Passport" is required',
    })
    .label("Passport"),

  //identity infp ending
  work_phone_number: Joi.string()
    .min(10)
    .max(10)
    .pattern(/^[6-9]\d{9}$/)
    .messages({
      "string.pattern.base":
        '"Phone Number" should start with digits 6-9 and not include special characters',
    })
    .label("Phone Number Work"),

  personal_mobile_number: Joi.string()
    .min(10)
    .max(10)
    .required()
    .pattern(/^[6-9]\d{9}$/)
    .messages({
      "string.pattern.base":
        '"Personal Phone Number" should start with digits 6-9 and not include special characters',
      "any.required": '"Personal Phone Number" is required',
    })
    .label("Personal Phone Number"),

  personal_email_address: Joi.string()
    .min(10)
    .max(55)
    .required()
    .email({ tlds: { allow: ["com", "net", "org"] } })
    .messages({
      "string.pattern.base":
        '"Personal Email" should not include special characters',
      "any.required": '"Personal Email" is required',
    })
    .label("Personal Email"),
  seating_location: Joi.string()
    .min(2)
    .max(10)
    // .allow("")
    .required()
    .messages({
      "string.pattern.base":
        '"Seating Location" should not include special characters',
      "any.required": '"Seating Location" is required',
    })
    .label("Seating Location"),

  // tags: Joi.string().allow("").optional().label("Tags"),

  present_address: Joi.string()
    .min(10)
    .max(100)
    .required()
    .messages({
      "string.pattern.base":
        '"Present Address" should not include special characters',
      "any.required": '"Present Address" is required',
    })
    .label("Present Address"),
  // dateOfExit: Joi.date().allow("").messages({
  //   "date.base": `"dateOfExit" should be a valid date`,
  // }),

  permanent_address: Joi.string()
  .min(10)
  .max(100)
  .required()

  .messages({
    "string.pattern.base":
      '"Permanent Address" should not include special characters',
    "any.required": '"Permanent Address" is required',
  })
  .label("Permanent Address"),

  company_name: Joi.string()
    .min(10)
    .max(30)
    .allow("")
    .messages({
      "string.pattern.base": '"company" should not include special characters',
    })
    .label("Company Name"),
  job_title: Joi.string()
    .min(3)
    .max(30)
    .allow("")
    .messages({
      "string.pattern.base": '"jobTitle" should not include special characters',
    })
    .label("Job Title"),

  from_date: Joi.date().max("now").allow("").label("From Date"),
  to_date: Joi.date().max("now").allow("").label("End Date"),
  job_description: Joi.string()
    .min(3)
    .max(250)
    .allow("")
    .messages({
      "string.pattern.base":
        '"jobDescription" should not include special characters',
    })
    .label("Job Description"),
  experience: Joi.number().max(50).allow("").label("Relevant Experience"),

  institute_name: Joi.string()
    .min(10)
    .max(50)
    .allow("")
    .messages({
      "string.pattern.base":
        '"instituteName" should not include special characters',
    })
    .label("Institute Name"),
  degree: Joi.string()
    .min(5)
    .max(15)
    .allow("")
    .messages({
      "string.pattern.base":
        '"degreeOrDiploma" should not include special characters',
    })
    .label("Degree or Diploma"),
  specialization: Joi.string()
    .min(4)
    .max(4)
    .allow("")
    .messages({
      "string.pattern.base":
        '" Locationspecialization" should not include special characters',
    })
    .label("Specialization"),
  year_of_completion: Joi.date()
    .max("now")
    .allow("")
    .label("Year of Completion"),

  name: Joi.string()
    .min(3)
    .max(50)
    .allow("")

    .messages({
      "string.pattern.base":
        '"dependentName" should not include special characters',
    })
    .label("Dependent Name"),

  relation: Joi.string()
    .min(3)
    .max(50)
    .allow("")
    .messages({
      "string.pattern.base":
        '"dependentName" should not include special characters',
    })
    .label("Dependent Name")
    .label("Relation"),
  dependent_date_of_birth: Joi.date()
    .max("now")
    // .less(eighteenYearsAgo)
    .required()
    .messages({
      "date.base": `"Date Of Birth" should be a valid date`,
      "date.max": `"Date Of Birth" cannot be in the future`,
      "date.less": `"Date Of Birth" must be at least 18 years ago`,
      "any.required": `"Date Of Birth" is a required field`,
    }),
};

export default EmployeeDataSchema;

export const inputStepMap = {
  firstName: 0,
  lastName: 0,
  nickName: 0,
  email: 0,
  department: 0,
  // location: 0,
  designation: 0,
  role: 0,
  employmentType: 0,
  sourceOfHire: 0,
  dateOfJoining: 0,
  reportingManager: 1,
  dob: 1,
  maritalStatus: 1,
  aboutMe: 1,
  uan: 1,
  pan: 1,
  aadhaar: 1,
  phoneNumber_work: 2,
  phoneNumber_personal: 2,
  email_personal: 2,
  seatingLocation: 2,
  company: 2,
  jobTitle: 2,
  startDate: 2,
  endDate: 2,
  jobDescription: 2,
  relavantExp: 2,
  instituteName: 3,
  degreeOrDiploma: 3,
  specialization: 3,
  dateOfCompletion: 3,
  dependentName: 3,
  dependentRelation: 3,
  dependentDob: 3,
};

export let brr = [
  {
    step: 0,
    info: "Step 1",
    icon: <FaInfo />,
    move: false,
  },
  {
    step: 1,
    info: "Step2",
    icon: <VscTypeHierarchySub />,
    move: false,
    message: "Please Fill the First form",
  },
  {
    step: 2,
    info: "Step 3",
    icon: <GrContact />,
    move: false,
    message: "Please Fill Second Form",
  },
  {
    step: 3,
    info: "Step 4",
    icon: <ImBooks />,
    move: false,
    message: "Please Fill Third step",
  },
];

export let brrs = [
  {
    step: 0,
    info: "Basic",
    icon: <FaInfo />,
    move: Object.keys(addEmployeeForm)
      .slice(0, 4)
      .every((item) => {
        return addEmployeeForm[item].length > 0;
      }),
    message: "please complete the basic information",
  },
  {
    step: 1,
    info: "Work",
    icon: <MdWork />,
    move: Object.keys(addEmployeeForm)
      .slice(0, 4)
      .every((item) => {
        return addEmployeeForm[item].length > 0;
      }),
    message: "Please Fill the first Step",
  },
  {
    step: 2,
    info: "Hierarchy",
    icon: <VscTypeHierarchySub />,
    move: Object.keys(addEmployeeForm)
      .slice(0, 11)
      .every((item) => {
        return addEmployeeForm[item].length > 0;
      }),
    message: "Please Fill 2nd step",
  },
  {
    step: 3,
    info: "Persoanl",
    icon: <GrContact />,
    move: Object.keys(addEmployeeForm)
      .slice(0, 12)
      .every((item) => {
        return addEmployeeForm[item].length > 0;
      }),
    message: "Please Fill 3rd step",
  },
  {
    step: 4,
    info: "Identity",
    icon: <MdPermIdentity />,
    move: Object.keys(addEmployeeForm)
      .slice(0, 15)
      .every((item) => {
        return addEmployeeForm[item].length > 0;
      }),
    message: "Please Fill 4rth step",
  },
  {
    step: 5,
    info: "Contact",
    icon: <FaPhoneAlt />,
    move: Object.keys(addEmployeeForm)
      .slice(0, 18)
      .every((item) => {
        return addEmployeeForm[item].length > 0;
      }),
  },
  {
    step: 6,
    info: "Experience",
    icon: <IoIosTrendingUp />,
    move: Object.keys(addEmployeeForm)
      .slice(0, 22)
      .every((item) => {
        return addEmployeeForm[item].length > 0;
      }),
    message: "Please Fill 6th step",
  },
  {
    step: 7,
    info: "Education",
    icon: <ImBooks />,
    move: Object.keys(addEmployeeForm)
      .slice(0, 28)
      .every((item) => {
        return addEmployeeForm[item].length > 0;
      }),
    message: "Please Fill 7th step",
  },
  {
    step: 8,
    info: "Dependent",
    icon: <TbCirclesRelation />,
    move: Object.keys(addEmployeeForm)
      .slice(0, 28)
      .every((item) => {
        return addEmployeeForm[item].length > 0;
      }),
    message: "Please Fill 8th step",
  },
];

export { FaInfo } from "react-icons/fa";
export { MdWork } from "react-icons/md";
export { VscTypeHierarchySub } from "react-icons/vsc";
export { GrContact } from "react-icons/gr";
export { MdPermIdentity } from "react-icons/md";
export { FaPhoneAlt } from "react-icons/fa";
export { ImBooks } from "react-icons/im";
export { IoIosTrendingUp } from "react-icons/io";
export { TbCirclesRelation } from "react-icons/tb";

export const fileSchema = {
  file: Joi.string()
    .required()
    .messages({
      "any.required": '"File" is required',
    })
    .label("File"),
  fileName: Joi.string()
    .min(3)
    .max(20)
    .required()
    .messages({
      "string.pattern.base": '"FileName" should not include special characters',
      "any.required": '"FileName" is required',
    })
    .label("FileName"),
  employeeId: Joi.string()
    .required()
    .messages({
      "string.pattern.base":
        '"EmployeeId" should not include special characters',
      "any.required": '"EmployeeId" is required',
    })
    .label("Employee Id"),
  description: Joi.string()
    .min(3)
    .max(20)
    .required()
    .messages({
      "string.pattern.base":
        '"Description" should not include special characters',
      "any.required": '"Description" is required',
    })
    .label("Description"),
  employeeView: Joi.boolean().label("Employee View"),

  reportingManagerView: Joi.boolean().label("Reporting Manager"),

  employeeDownload: Joi.boolean().label("Employee File Download"),
  reportingManagerDownload: Joi.boolean().label(
    "Reporting Manager File Download"
  ),
};
