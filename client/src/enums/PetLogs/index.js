import { createColumnHelper } from '@tanstack/react-table';

export const LogsCategoryType = Object.freeze({
    HEALTH: "health",
    GROWTH: "growth"
})

export const LogsType = Object.freeze({
    VACCINATION: "vaccination",
    MEDICATION: "medication",
    MEDICAL_HISTORY: "medical",
    GROOMING: "grooming",
    WEIGHT: "weight"
})

export const categoryLogTypes = {
    [LogsCategoryType.HEALTH]: [LogsType.VACCINATION, LogsType.MEDICAL_HISTORY, LogsType.MEDICATION],
    [LogsCategoryType.GROWTH]: [LogsType.GROOMING, LogsType.WEIGHT],
  };

const columnHelper = createColumnHelper();
  export const logsColDefinitions = {
    [LogsType.VACCINATION]: [
      columnHelper.accessor('vaccineName', {
        header: () => 'Vaccine Name',
        cell: info => info.getValue(),
        footer: info => info.column.id,
        inputType: 'text', 
        required: true,
      }),
      columnHelper.accessor('dateGiven', {
        header: () => 'Received On',
        cell: info => info.getValue(),
        footer: info => info.column.id,
        inputType: 'date', 
        required: true,
      }),
      columnHelper.accessor('dateDue', {
        header: () => 'Due Date',
        cell: info => info.getValue(),
        footer: info => info.column.id,
        inputType: 'date',
        required: true,
      }),
      columnHelper.accessor('administeredBy', {
        header: () => 'Administered By',
        cell: info => info.getValue(),
        footer: info => info.column.id,
        inputType: 'text', 
        required: true,
      }),
      columnHelper.accessor('clinic', {
        header: () => 'Clinic',
        cell: info => info.getValue(),
        footer: info => info.column.id,
        inputType: 'text', 
        required: true,
      }),
    ],
    [LogsType.MEDICAL_HISTORY]: [
      columnHelper.accessor('condition', {
        header: () => 'Condition',
        cell: info => info.getValue(),
        footer: info => info.column.id,
        inputType: 'text',
        required: true,
      }),
      columnHelper.accessor('treatment', {
        header: () => 'Treatment',
        cell: info => info.getValue(),
        footer: info => info.column.id,
        inputType: 'text',
        required: true,
      }),
      columnHelper.accessor('dateDiagnosed', {
        header: () => 'Diagnosed On',
        cell: info => info.getValue(),
        footer: info => info.column.id,
        inputType: 'date',
        required: true,
      }),
      columnHelper.accessor('diagnosedBy', {
        header: () => 'Diagnosed By',
        cell: info => info.getValue(),
        footer: info => info.column.id,
        inputType: 'text', 
        required: false,
      }),
      columnHelper.accessor('clinic', {
        header: () => 'Clinic',
        cell: info => info.getValue(),
        footer: info => info.column.id,
        inputType: 'text', 
        required: false
      }),
    ],
    [LogsType.MEDICATION]: [
      columnHelper.accessor('medicationName', {
        header: () => 'Medication Name',
        cell: info => info.getValue(),
        footer: info => info.column.id,
        inputType: 'text',
        required: true
      }),
      columnHelper.accessor('medicationType', {
        header: () => 'Type',
        cell: info => info.getValue(),
        footer: info => info.column.id,
        inputType: 'text',
        required: true
      }),
      columnHelper.accessor('dosage', {
        header: () => 'Dosage',
        cell: info => info.getValue(),
        footer: info => info.column.id,
        inputType: 'text', 
        required: false
      }),
      columnHelper.accessor('startDate', {
        header: () => 'Start Date',
        cell: info => info.getValue(),
        footer: info => info.column.id,
        inputType: 'date',
        required: true
      }),
      columnHelper.accessor('endDate', {
        header: () => 'End Date',
        cell: info => info.getValue(),
        footer: info => info.column.id,
        inputType: 'date',
        required: false
      }),
    ],
    [LogsType.GROOMING]: [
      columnHelper.accessor('type', {
        header: () => 'Grooming Type',
        cell: info => info.getValue(),
        footer: info => info.column.id,
        inputType: 'text',
        required: true
      }),
      columnHelper.accessor('dateGrooming', {
        header: () => 'Grooming Date',
        cell: info => info.getValue(),
        footer: info => info.column.id,
        inputType: 'date',
        required: true
      }),
      columnHelper.accessor('groomer', {
        header: () => 'Groomer',
        cell: info => info.getValue(),
        footer: info => info.column.id,
        inputType: 'text',
        required: true
      }),
    ],
    [LogsType.WEIGHT]: [
      columnHelper.accessor('weight', {
        header: () => 'Weight (kg)',
        cell: info => info.getValue(),
        footer: info => info.column.id,
        inputType: 'number',
        required: true
      }),
      columnHelper.accessor('date', {
        header: () => 'Date',
        cell: info => info.getValue(),
        footer: info => info.column.id,
        inputType: 'date',
        required: true
      }),
      columnHelper.accessor('notes', {
        header: () => 'Notes',
        cell: info => info.getValue(),
        footer: info => info.column.id,
        inputType: 'textarea',
        required: false
      }),
    ],
  };