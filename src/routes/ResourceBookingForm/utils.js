/**
 * ResourceBookingForm utils
 *
 * utility class
 */
import moment from 'moment';
import {
  STATUS_OPTIONS,
  FORM_ROW_TYPE,
  FORM_FIELD_TYPE,
} from "../../constants";

const EDIT_ResourceBooking_ROWS = [
  { type: FORM_ROW_TYPE.SINGLE, fields: ["title"] },
  { type: FORM_ROW_TYPE.SINGLE, fields: ["handle"] },
  { type: FORM_ROW_TYPE.GROUP, fields: ["startDate", "endDate"] },
  { type: FORM_ROW_TYPE.GROUP, fields: ["customerRate", "memberRate"] },
  { type: FORM_ROW_TYPE.SINGLE, fields: ["status"] },
];

/**
 * return edit ResourceBooking configuration
 * @param {func} onSubmit submit callback
 */
export const getEditResourceBookingConfig = (onSubmit) => {
  return {
    fields: [
      { readonly: true, type: FORM_FIELD_TYPE.TEXT, name: "title" },
      { readonly: true, type: FORM_FIELD_TYPE.TEXT, name: "handle" },
      {
        label: "Client Rate",
        type: FORM_FIELD_TYPE.NUMBER,
        name: "customerRate",
        minValue: 0,
        placeholder: "Client Rate",
      },
      {
        label: "Member Rate",
        type: FORM_FIELD_TYPE.NUMBER,
        name: "memberRate",
        minValue: 0,
        placeholder: "Member Rate",
      },
      {
        label: "Start Date",
        type: FORM_FIELD_TYPE.DATE,
        name: "startDate",
        placeholder: "Start Date",
        customValidator: (field, fields, values) => {
          const startDate = values[field.name];
          const endDate = values['endDate'];
          if(startDate && endDate && moment(endDate).startOf('day').isBefore(moment(startDate).startOf('day'))){
            return 'Start Date should not be after End Date';
          }
          return null;
        }
      },
      {
        label: "End Date",
        type: FORM_FIELD_TYPE.DATE,
        name: "endDate",
        placeholder: "End Date",
        customValidator: (field, fields, values) => {
          const endDate = values[field.name];
          const startDate = values['startDate'];
          if(startDate && endDate && moment(endDate).startOf('day').isBefore(moment(startDate).startOf('day'))){
            return 'End Date should not be before Start Date';
          }else if(!startDate && endDate){
            return 'End Date should not be before Start Date';
          }
          return null;
        }
      },
      {
        label: "Status",
        type: FORM_FIELD_TYPE.SELECT,
        isRequired: true,
        validationMessage: "Please, select Status",
        name: "status",
        selectOptions: STATUS_OPTIONS,
      },
    ],
    onSubmit: onSubmit,
    rows: EDIT_ResourceBooking_ROWS,
  };
};
